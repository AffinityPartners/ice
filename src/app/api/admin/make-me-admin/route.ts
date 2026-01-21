/**
 * Make Me Admin API Route
 * 
 * Setup route for creating the initial admin user.
 * Uses ADMIN_EMAILS environment variable for authorization.
 * 
 * IMPORTANT: Secure or remove after initial admin creation in production.
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { eq, count } from 'drizzle-orm';
import { authOptions } from '@/lib/auth-options';
import { db, users } from '@/db';

/**
 * GET /api/admin/make-me-admin
 * Promotes the current user to admin role.
 * Authorization is controlled by ADMIN_EMAILS environment variable.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get allowed emails from environment variable
    const allowedEmails = process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];
    
    // If no ADMIN_EMAILS are set, allow the first user to become admin
    if (allowedEmails.length === 0) {
      const [adminCountResult] = await db
        .select({ count: count() })
        .from(users)
        .where(eq(users.role, 'ADMIN'));
      
      if ((adminCountResult?.count || 0) > 0) {
        return NextResponse.json({ 
          error: 'Admin already exists. Only the first user can become admin when ADMIN_EMAILS is not set.' 
        }, { status: 403 });
      }
    } else if (!allowedEmails.includes(session.user.email)) {
      return NextResponse.json({ 
        error: 'Not authorized. Your email must be in the ADMIN_EMAILS environment variable.' 
      }, { status: 403 });
    }

    // Check if already admin
    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    });

    if (user?.role === 'ADMIN') {
      return NextResponse.json({ message: 'Already an admin' });
    }

    // Update to admin
    const [updatedUser] = await db.update(users)
      .set({ role: 'ADMIN' })
      .where(eq(users.email, session.user.email))
      .returning();

    return NextResponse.json({
      message: 'Success! You are now an admin. Please sign out and sign back in.',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error('Make admin error:', error);
    return NextResponse.json(
      { error: 'Failed to update role' },
      { status: 500 }
    );
  }
}
