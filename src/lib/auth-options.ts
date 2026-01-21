/**
 * NextAuth Configuration Options
 * 
 * This module configures NextAuth.js with:
 * - Drizzle adapter for database persistence
 * - Google OAuth provider for social login
 * - Credentials provider for email/password authentication
 * - JWT session strategy with role-based access control
 * - Activity logging for audit trails
 * 
 * The configuration supports both OAuth and credential-based authentication,
 * with automatic role assignment and session enrichment.
 */

import { NextAuthOptions } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { eq } from 'drizzle-orm';
import { db, users, type Role } from '@/db';
import bcrypt from 'bcryptjs';
import { ActivityLogger } from './activity-logger';
import { optimizeGoogleImage } from './utils';

export const authOptions: NextAuthOptions = {
  // Use Drizzle adapter for database persistence of users, accounts, sessions
  adapter: DrizzleAdapter(db) as NextAuthOptions['adapter'],
  
  // Use JWT strategy for stateless sessions
  session: {
    strategy: 'jwt',
  },
  
  providers: [
    // Google OAuth provider for social login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    
    // Credentials provider for email/password login
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      
      /**
       * Validates user credentials against the database.
       * Returns user object if valid, null otherwise.
       */
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user by email using Drizzle
        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });

        if (!user || !user.password) {
          return null;
        }

        // Verify password hash
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  
  // NextAuth secret for JWT signing
  secret: process.env.NEXTAUTH_SECRET!,
  
  callbacks: {
    /**
     * Sign-in callback - handles OAuth login, image updates, and activity logging.
     * Called when a user signs in via any provider.
     */
    async signIn({ user, account }) {
      if (!user.email) return false;

      // For OAuth providers, handle user updates and logging
      if (account?.provider !== 'credentials') {
        const dbUser = await db.query.users.findFirst({
          where: eq(users.email, user.email),
        });

        if (dbUser) {
          // Update Google image if user hasn't uploaded a custom one and Google image has changed
          if (user.image && dbUser.image !== user.image) {
            try {
              const optimizedImage = optimizeGoogleImage(user.image, 400) || user.image;
              await db.update(users)
                .set({ image: optimizedImage })
                .where(eq(users.id, dbUser.id));
            } catch (error) {
              console.error('Failed to update user image:', error);
            }
          }

          // Log the login activity based on user role
          try {
            if (dbUser.role === 'ADMIN') {
              await ActivityLogger.auth.adminLogin(dbUser.id, dbUser.email!);
            } else if (dbUser.role === 'AFFILIATE') {
              await ActivityLogger.auth.affiliateLogin(dbUser.id, dbUser.email!);
            } else {
              await ActivityLogger.auth.userLogin(dbUser.id, dbUser.email!);
            }
          } catch (error) {
            console.error('Failed to log login activity:', error);
            // Don't block login if logging fails
          }
        }
      }

      return true;
    },
    
    /**
     * JWT callback - enriches the JWT token with user role and ID from database.
     * Called whenever a JWT is created or updated.
     */
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await db.query.users.findFirst({
          where: eq(users.email, user.email!),
        });
        token.role = dbUser?.role || 'USER';
        token.id = dbUser?.id || user.id;
      }
      return token;
    },
    
    /**
     * Session callback - adds role and ID to the session object.
     * Called whenever a session is checked.
     */
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
    
    /**
     * Redirect callback - handles post-login redirects.
     * Redirects to admin dashboard by default after successful login.
     */
    async redirect({ url, baseUrl }) {
      // Redirect to admin dashboard after login if no specific URL was requested
      if (url === baseUrl || url === baseUrl + '/') {
        return baseUrl + '/admin';
      }
      // Allow relative URLs
      if (url.startsWith('/')) {
        return baseUrl + url;
      }
      // Allow callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl + '/admin';
    },
  },
  
  // Custom pages for authentication flows
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  
  // Enable debug mode in development
  debug: process.env.NODE_ENV === 'development',
};
