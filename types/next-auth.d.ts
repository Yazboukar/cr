import type { Role } from '@prisma/client';
import type { DefaultSession } from 'next-auth';

// Augments NextAuth so `session.user.id` / `session.user.role` are typed and the
// pervasive `(session.user as any)` casts can be removed.
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession['user'];
  }

  interface User {
    role: Role;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: Role;
  }
}
