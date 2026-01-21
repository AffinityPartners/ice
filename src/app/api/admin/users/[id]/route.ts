/**
 * User Management API Route (Single User)
 * 
 * Handles operations for individual users.
 * DELETE: Remove a user (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { eq } from 'drizzle-orm';
import { authOptions } from '@/lib/auth-options';
import { db, users } from '@/db';

/**
 * DELETE /api/admin/users/[id]
 * Deletes a user account. Requires admin authentication.
 * Prevents admins from deleting their own account.
 * Related records are deleted via cascade.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the admin user
    const adminUser = await db.query.users.findFirst({
      where: eq(users.email, session.user.email!)
    });

    // Don't allow deleting your own account
    if (adminUser?.id === id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    // Get user details before deletion for logging
    const userToDelete = await db.query.users.findFirst({
      where: eq(users.id, id),
      with: { affiliate: true }
    });

    if (!userToDelete) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete user (cascades will handle related records)
    await db.delete(users).where(eq(users.id, id));

    // Log the action
    if (adminUser) {
      const { ActivityLogger } = await import('@/lib/activity-logger');
      await ActivityLogger.user.deleted(
        adminUser.id,
        id,
        userToDelete.email || undefined,
        userToDelete.name || undefined
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
