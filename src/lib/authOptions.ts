import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import { verifyPassword } from './auth';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user || !user.hashedPassword) return null;
        const valid = await verifyPassword(credentials.password, user.hashedPassword);
        if (!valid) return null;
        return { id: user.id, name: user.name, email: user.email, role: user.role } as any;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
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
