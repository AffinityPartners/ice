import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current affiliate status
    const affiliate = await prisma.affiliate.findUnique({
      where: { id: id },
      include: { user: true }
    });

    if (!affiliate) {
      return NextResponse.json(
        { error: 'Affiliate not found' },
        { status: 404 }
      );
    }

    // Toggle status
    const newStatus = !affiliate.isActive;
    
    const updatedAffiliate = await prisma.affiliate.update({
      where: { id: id },
      data: { isActive: newStatus },
    });

    // Log the action
    const adminUser = await prisma.user.findUnique({
      where: { email: session.user.email! }
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