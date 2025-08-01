import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const range = searchParams.get('range') || '7days';

    // Calculate date range
    let dateFrom = new Date();
    switch (range) {
      case '24hours':
        dateFrom.setHours(dateFrom.getHours() - 24);
        break;
      case '7days':
        dateFrom.setDate(dateFrom.getDate() - 7);
        break;
      case '30days':
        dateFrom.setDate(dateFrom.getDate() - 30);
        break;
      case '90days':
        dateFrom.setDate(dateFrom.getDate() - 90);
        break;
      case 'all':
        dateFrom = new Date(0); // Beginning of time
        break;
    }

    // Fetch affiliate-related activities
    const activities = await prisma.activityLog.findMany({
      where: {
        createdAt: { gte: dateFrom },
        OR: [
          { actorRole: 'AFFILIATE' },
          { action: { startsWith: 'affiliate_' } },
          { action: { startsWith: 'stripe_' } },
          { action: { startsWith: 'payout_' } },
          { action: { startsWith: 'referral_' } },
          { action: 'profile_updated' },
          { action: 'page_customized' },
          { action: 'landing_page_viewed' },
        ],
      },
      include: {
        actor: {
          include: {
            affiliate: {
              select: {
                id: true,
                companyName: true,
                slug: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 1000, // Limit to prevent overwhelming response
    });

    // Calculate stats
    const stats = {
      totalActions: activities.length,
      activeAffiliates: new Set(activities.map(a => a.actor?.affiliate?.id).filter(Boolean)).size,
      profileUpdates: activities.filter(a => a.action === 'profile_updated').length,
      pageEdits: activities.filter(a => a.action === 'page_customized').length,
      logins: activities.filter(a => a.action === 'affiliate_login').length,
    };

    return NextResponse.json({
      activities,
      stats,
    });
  } catch (error) {
    console.error('Error fetching affiliate activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}