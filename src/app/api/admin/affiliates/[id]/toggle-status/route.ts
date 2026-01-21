/**
 * Affiliate Status Toggle API Route
 * 
 * Toggles an affiliate's active status (activate/deactivate).
 * Logs the action for audit purposes.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { eq } from 'drizzle-orm';
import { authOptions } from '@/lib/auth-options';
import { db, users, affiliates } from '@/db';

/**
 * POST /api/admin/affiliates/[id]/toggle-status
 * Toggles the active status of an affiliate.
 * Requires admin authentication.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current affiliate status with user info
    const affiliate = await db.query.affiliates.findFirst({
      where: eq(affiliates.id, id),
      with: { user: true }
    });

    if (!affiliate) {
      return NextResponse.json(
        { error: 'Affiliate not found' },
        { status: 404 }
      );
    }

    // Toggle status
    const newStatus = !affiliate.isActive;
    
    const [updatedAffiliate] = await db.update(affiliates)
      .set({ isActive: newStatus })
      .where(eq(affiliates.id, id))
      .returning();

    // Log the action
    const adminUser = await db.query.users.findFirst({
      where: eq(users.email, session.user.email!)
    });

    if (adminUser) {
      const { ActivityLogger } = await import('@/lib/activity-logger');
      if (newStatus) {
        await ActivityLogger.affiliate.activated(
          adminUser.id,
          id,
          affiliate.companyName || affiliate.user.name || undefined
        );
      } else {
        await ActivityLogger.affiliate.deactivated(
          adminUser.id,
          id,
          affiliate.companyName || affiliate.user.name || undefined
        );
      }
    }

    return NextResponse.json({ 
      success: true, 
      affiliate: updatedAffiliate,
      message: newStatus ? 'Affiliate activated' : 'Affiliate deactivated'
    });
  } catch (error) {
    console.error('Error toggling affiliate status:', error);
    return NextResponse.json(
      { error: 'Failed to toggle affiliate status' },
      { status: 500 }
    );
  }
}
