/**
 * NextAuth Type Augmentations
 * 
 * Extends the default NextAuth types to include custom user properties.
 * This ensures TypeScript recognizes our custom fields (id, role) on session and JWT objects.
 */

import { type Role } from '@/db';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Extends the Session type to include user id and role.
   * These fields are populated by the session callback in auth-options.ts.
   */
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession['user'];
  }

  /**
   * Extends the User type to include role.
   * Used during sign-in callbacks.
   */
  interface User {
    role: Role;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extends the JWT type to include id and role.
   * These fields are populated by the jwt callback in auth-options.ts.
   */
  interface JWT {
    id: string;
    role: Role;
  }
}
