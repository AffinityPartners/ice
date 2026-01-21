/**
 * Affiliate Stats API Route
 * 
 * Retrieves statistics for the current affiliate including:
 * - Total and monthly earnings
 * - Conversion rates
 * - Referral counts
 * - Pending commissions
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { eq } from 'drizzle-orm';
import { authOptions } from '@/lib/auth-options';
import { db, users, referrals, commissionLogs } from '@/db';

/**
 * GET /api/affiliate/stats
 * Calculates and returns comprehensive affiliate statistics.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user and their affiliate profile
    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
      with: { affiliate: true }
    });

    if (!user?.affiliate) {
      return NextResponse.json({ error: 'Not an affiliate' }, { status: 403 });
    }

    // Get affiliate stats using parallel queries
    const [allReferrals, commissions] = await Promise.all([
      // Get all referrals
      db.query.referrals.findMany({
        where: eq(referrals.affiliateId, user.affiliate.id)
      }),
      // Get commission logs
      db.query.commissionLogs.findMany({
        where: eq(commissionLogs.affiliateId, user.affiliate.id)
      })
    ]);

    // Calculate stats
    const totalReferrals = allReferrals.length;
    const convertedReferrals = allReferrals.filter(r => r.status === 'CONVERTED').length;
    const conversionRate = totalReferrals > 0 
      ? ((convertedReferrals / totalReferrals) * 100).toFixed(1)
      : '0';

    const totalEarnings = commissions.reduce((sum, c) => sum + (c.amountCents || 0), 0) / 100;
    const unpaidCommissions = commissions
      .filter(c => !c.isPaid)
      .reduce((sum, c) => sum + (c.amountCents || 0), 0) / 100;

    // Calculate monthly earnings (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const monthlyCommissions = commissions.filter(c => 
      c.createdAt && c.createdAt > thirtyDaysAgo
    );
    const monthlyEarnings = monthlyCommissions
      .reduce((sum, c) => sum + (c.amountCents || 0), 0) / 100;

    const averageCommission = convertedReferrals > 0
      ? totalEarnings / convertedReferrals
      : 0;

    return NextResponse.json({
      totalEarnings,
      monthlyEarnings,
      conversionRate,
      totalReferrals,
      convertedReferrals,
      pendingCommission: unpaidCommissions,
      averageCommission,
      pageViews: user.affiliate.visits || 0,
    });
  } catch (error) {
    console.error('Error fetching affiliate stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
