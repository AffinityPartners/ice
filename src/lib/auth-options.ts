import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { ActivityLogger } from './activity-logger';
import { optimizeGoogleImage } from './utils';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions['adapter'],
  session: {
    strategy: 'jwt',
  },
  providers: [
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
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

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
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      // For OAuth providers, let the adapter handle user creation
      if (account?.provider !== 'credentials') {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (dbUser) {
          // Update Google image if user hasn't uploaded a custom one and Google image has changed
          if (user.image && dbUser.image !== user.image) {
            try {
              const optimizedImage = optimizeGoogleImage(user.image, 400) || user.image;
              await prisma.user.update({
                where: { id: dbUser.id },
                data: { image: optimizedImage },
              });
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
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        token.role = dbUser?.role || 'USER';
        token.id = dbUser?.id || user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
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
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
};