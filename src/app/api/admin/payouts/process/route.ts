/**
 * Payout Processing API Route
 * 
 * Processes commission payouts to affiliates via Stripe Connect.
 * Handles the entire payout flow including validation, transfer creation,
 * and database updates.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { eq, sql } from 'drizzle-orm';
import { authOptions } from '@/lib/auth-options';
import { db, affiliates, commissionLogs, payoutLogs } from '@/db';
import { createPayout } from '@/lib/stripe';

/**
 * POST /api/admin/payouts/process
 * Processes a payout for an affiliate.
 * Validates amount against unpaid commissions before processing.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { affiliateId, amount } = body;

    if (!affiliateId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get affiliate with unpaid commissions
    const affiliate = await db.query.affiliates.findFirst({
      where: eq(affiliates.id, affiliateId),
      with: {
        commissionLogs: true,
        user: true
      }
    });

    if (!affiliate) {
      return NextResponse.json(
        { error: 'Affiliate not found' },
        { status: 404 }
      );
    }

    if (!affiliate.stripeAccountId || !affiliate.stripePayoutsEnabled) {
      return NextResponse.json(
        { error: 'Affiliate Stripe account not properly configured' },
        { status: 400 }
      );
    }

    // Filter unpaid commissions
    const unpaidCommissions = affiliate.commissionLogs.filter(log => !log.isPaid);

    // Calculate total unpaid amount
    const totalUnpaid = unpaidCommissions.reduce(
      (sum, log) => sum + (log.amountCents || 0),
      0
    );

    if (totalUnpaid !== amount) {
      return NextResponse.json(
        { error: 'Amount mismatch with unpaid commissions' },
        { status: 400 }
      );
    }

    // Create Stripe transfer
    const transfer = await createPayout(
      affiliate.stripeAccountId,
      amount,
      `Commission payout for ${affiliate.companyName || affiliate.user.name}`
    );

    // Create payout log
    const [payoutLog] = await db.insert(payoutLogs).values({
      affiliateId: affiliateId,
      stripeTransferId: transfer.id,
      amountCents: amount,
      status: 'COMPLETED',
      notes: `Payout for ${unpaidCommissions.length} commissions`
    }).returning();

    // Mark commissions as paid
    await db.update(commissionLogs)
      .set({ isPaid: true })
      .where(eq(commissionLogs.affiliateId, affiliateId));

    // Update affiliate totals using SQL increment
    await db.update(affiliates)
      .set({
        totalEarnedCents: sql`${affiliates.totalEarnedCents} + ${amount}`,
        unpaidBalanceCents: sql`${affiliates.unpaidBalanceCents} - ${amount}`,
        lastPayoutDate: new Date(),
        lastPayoutAmountCents: amount
      })
      .where(eq(affiliates.id, affiliateId));

    // TODO: Send email notification to affiliate if enabled

    return NextResponse.json({
      success: true,
      payoutId: payoutLog.id,
      transferId: transfer.id
    });
  } catch (error) {
    console.error('Payout processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process payout' },
      { status: 500 }
    );
  }
}
