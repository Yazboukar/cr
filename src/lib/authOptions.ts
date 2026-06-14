import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import { verifyPassword } from './auth';
import type { NextAuthOptions } from 'next-auth';
import { normalizeEmail } from './validation';
import { isRateLimited, recordFailure, resetAttempts } from './rateLimit';

// Fail fast rather than ship a guessable JWT secret in production.
if (
  process.env.NODE_ENV === 'production' &&
  (!process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET === 'change-me')
) {
  throw new Error('NEXTAUTH_SECRET doit être défini avec une valeur forte en production.');
}

// Only emit Secure / __Host- cookies when actually served over HTTPS.
const useSecureCookies = (process.env.NEXTAUTH_URL || '').startsWith('https://');

function clientIp(req: any): string {
  const xff = req?.headers?.['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length) return xff.split(',')[0].trim();
  if (Array.isArray(xff) && xff.length) return String(xff[0]);
  return (req?.headers?.['x-real-ip'] as string) || 'unknown';
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Mot de passe', type: 'password' }
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        const email = normalizeEmail(credentials.email);
        if (!email || !credentials.password) {
          return null;
        }

        // Throttle by client IP + email to slow down credential stuffing.
        const key = `${clientIp(req)}:${email}`;
        if (isRateLimited(key)) {
          throw new Error('Trop de tentatives de connexion. Veuillez réessayer dans quelques minutes.');
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.hashedPassword) {
          recordFailure(key);
          return null;
        }
        const valid = await verifyPassword(credentials.password, user.hashedPassword);
        if (!valid) {
          recordFailure(key);
          return null;
        }
        resetAttempts(key);
        return { id: user.id, name: user.name, email: user.email, role: user.role } as any;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies,
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }: any) {
      session.user = session.user || ({} as any);
      session.user.role = token.role;
      session.user.id = token.sub;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
};

export default authOptions;
