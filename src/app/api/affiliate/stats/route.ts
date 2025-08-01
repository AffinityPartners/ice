import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user and their affiliate profile
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { affiliate: true }
    });

    if (!user?.affiliate) {
      return NextResponse.json({ error: 'Not an affiliate' }, { status: 403 });
    }

    // Get affiliate stats
    const [referrals, commissions] = await Promise.all([
      // Get all referrals
      prisma.referral.findMany({
        where: { affiliateId: user.affiliate.id }
      }),
      // Get commission logs
      prisma.commission_log.findMany({
        where: { affiliate_id: user.affiliate.id }
      })
    ]);

    // Calculate stats
    const totalReferrals = referrals.length;
    const convertedReferrals = referrals.filter(r => r.status === 'CONVERTED').length;
    const conversionRate = totalReferrals > 0 
      ? ((convertedReferrals / totalReferrals) * 100).toFixed(1)
      : '0';

    const totalEarnings = commissions.reduce((sum, c) => sum + (c.amount_cents || 0), 0) / 100;
    const unpaidCommissions = commissions
      .filter(c => !c.is_paid)
      .reduce((sum, c) => sum + (c.amount_cents || 0), 0) / 100;

    // Calculate monthly earnings (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const monthlyCommissions = commissions.filter(c => 
      c.created_at && c.created_at > thirtyDaysAgo
    );
    const monthlyEarnings = monthlyCommissions
      .reduce((sum, c) => sum + (c.amount_cents || 0), 0) / 100;

    const averageCommission = totalReferrals > 0
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