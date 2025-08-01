import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { createPayout } from '@/lib/stripe';

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
    const affiliate = await prisma.affiliate.findUnique({
      where: { id: affiliateId },
      include: {
        commissionLogs: {
          where: { is_paid: false }
        },
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

    // Calculate total unpaid amount
    const totalUnpaid = affiliate.commissionLogs.reduce(
      (sum, log) => sum + (log.amount_cents || 0),
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
    const payoutLog = await prisma.payout_log.create({
      data: {
        affiliate_id: affiliateId,
        stripe_transfer_id: transfer.id,
        amount_cents: amount,
        status: 'COMPLETED',
        notes: `Payout for ${affiliate.commissionLogs.length} commissions`
      }
    });

    // Mark commissions as paid
    await prisma.commission_log.updateMany({
      where: {
        affiliate_id: affiliateId,
        is_paid: false
      },
      data: {
        is_paid: true
      }
    });

    // Update affiliate totals
    await prisma.affiliate.update({
      where: { id: affiliateId },
      data: {
        totalEarnedCents: { increment: amount },
        unpaidBalanceCents: { decrement: amount },
        lastPayoutDate: new Date(),
        lastPayoutAmountCents: amount
      }
    });

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