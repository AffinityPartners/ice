/**
 * Affiliate Activity API Route
 * 
 * Retrieves affiliate-related activity logs with statistics.
 * Supports filtering by date range.
 */

import { NextRequest, NextResponse } from 'next/server';
import { gte, or, eq, like, desc } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { db, activityLogs } from '@/db';

/**
 * GET /api/admin/affiliate-activity
 * Retrieves affiliate-related activities within a specified date range.
 * Returns activities and aggregate statistics.
 */
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

    // Fetch affiliate-related activities with relations
    const activities = await db.query.activityLogs.findMany({
      where: gte(activityLogs.createdAt, dateFrom),
      with: {
        actor: {
          with: {
            affiliate: true,
          },
        },
      },
      orderBy: [desc(activityLogs.createdAt)],
      limit: 1000, // Limit to prevent overwhelming response
    });

    // Filter for affiliate-related activities
    const affiliateActivities = activities.filter(a => 
      a.actorRole === 'AFFILIATE' ||
      a.action.startsWith('affiliate_') ||
      a.action.startsWith('stripe_') ||
      a.action.startsWith('payout_') ||
      a.action.startsWith('referral_') ||
      a.action === 'profile_updated' ||
      a.action === 'page_customized' ||
      a.action === 'landing_page_viewed'
    );

    // Calculate stats
    const stats = {
      totalActions: affiliateActivities.length,
      activeAffiliates: new Set(
        affiliateActivities
          .map(a => a.actor?.affiliate?.id)
          .filter(Boolean)
      ).size,
      profileUpdates: affiliateActivities.filter(a => a.action === 'profile_updated').length,
      pageEdits: affiliateActivities.filter(a => a.action === 'page_customized').length,
      logins: affiliateActivities.filter(a => a.action === 'affiliate_login').length,
    };

    return NextResponse.json({
      activities: affiliateActivities,
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
