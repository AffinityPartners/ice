import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { role } = body;

    if (!['USER', 'AFFILIATE', 'ADMIN'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Update user role
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { role },
    });

    // If changing to AFFILIATE and no affiliate profile exists, create one
    if (role === 'AFFILIATE') {
      const existingAffiliate = await prisma.affiliate.findUnique({
        where: { userId: id },
      });

      if (!existingAffiliate) {
        const slug = `affiliate-${id.slice(-8)}`;
        await prisma.affiliate.create({
          data: {
            userId: id,
            slug,
            companyName: updatedUser.name || 'New Affiliate',
            contactEmail: updatedUser.email!,
            isActive: true,
            primaryColor: '#245789',
            heroHeading: 'Protect Your Emergency Information',
            heroSubtext: 'Get ICE Tracer today',
            ctaText: 'Get Started',
          },
        });
      }
    }

    // Log the action
    const adminUser = await prisma.user.findUnique({
      where: { email: session.user.email! }
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