/**
 * User Role Management API Route
 * 
 * Handles user role changes.
 * PUT: Update a user's role (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { eq } from 'drizzle-orm';
import { authOptions } from '@/lib/auth-options';
import { db, users, affiliates, type Role } from '@/db';

/**
 * PUT /api/admin/users/[id]/role
 * Updates a user's role. Requires admin authentication.
 * Creates an affiliate profile if changing role to AFFILIATE.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { role } = body as { role: Role };

    // Validate role
    if (!['USER', 'AFFILIATE', 'ADMIN'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Update user role
    const [updatedUser] = await db.update(users)
      .set({ role })
      .where(eq(users.id, id))
      .returning();

    // If changing to AFFILIATE and no affiliate profile exists, create one
    if (role === 'AFFILIATE') {
      const existingAffiliate = await db.query.affiliates.findFirst({
        where: eq(affiliates.userId, id),
      });

      if (!existingAffiliate) {
        const slug = `affiliate-${id.slice(-8)}`;
        await db.insert(affiliates).values({
          userId: id,
          slug,
          companyName: updatedUser.name || 'New Affiliate',
          contactEmail: updatedUser.email!,
          isActive: true,
          primaryColor: '#245789',
          heroHeading: 'Protect Your Emergency Information',
          heroSubtext: 'Get ICE Tracer today',
          ctaText: 'Get Started',
        });
      }
    }

    // Log the action
    const adminUser = await db.query.users.findFirst({
      where: eq(users.email, session.user.email!)
    });

    if (adminUser) {
      const { ActivityLogger } = await import('@/lib/activity-logger');
      await ActivityLogger.user.roleChanged(
        adminUser.id,
        id,
        role,
        updatedUser.email || undefined
      );
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Failed to update user role' },
      { status: 500 }
    );
  }
}
