/**
 * Authentication Utilities
 * 
 * This module provides helper functions for authentication and authorization.
 * Used throughout the application to check user sessions and enforce role-based access.
 * 
 * Functions:
 * - getSession: Get the current user session
 * - getCurrentUser: Get the current user from session
 * - requireAuth: Require authentication, redirect if not logged in
 * - requireRole: Require specific role, redirect if unauthorized
 */

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { type Role } from '@/db';

/**
 * Gets the current user session from NextAuth.
 * Returns null if user is not authenticated.
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Gets the current user from the session.
 * Convenience wrapper around getSession for accessing user data.
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

/**
 * Requires authentication to access a resource.
 * Redirects to sign-in page if user is not authenticated.
 * 
 * @returns The authenticated user
 * @throws Redirects to /auth/signin if not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/auth/signin');
  }
  return user;
}

/**
 * Requires a specific role to access a resource.
 * Redirects to unauthorized page if user doesn't have the required role.
 * 
 * @param role - The required role (ADMIN, USER, or AFFILIATE)
 * @returns The authenticated user with the required role
 * @throws Redirects to /unauthorized if role doesn't match
 */
export async function requireRole(role: Role) {
  const user = await requireAuth();
  if (user.role !== role) {
    redirect('/unauthorized');
  }
  return user;
}
