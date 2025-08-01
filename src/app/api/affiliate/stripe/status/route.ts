import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { retrieveAccount } from '@/lib/stripe';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { affiliate: true }
    });

    if (!user?.affiliate?.stripeAccountId) {
      return NextResponse.json({ 
        connected: false,
        onboardingComplete: false,
        chargesEnabled: false,
        payoutsEnabled: false
      });
    }

    // Get account details from Stripe
    const account = await retrieveAccount(user.affiliate.stripeAccountId);

    const updateData: any = {
      stripeOnboardingComplete: account.details_submitted,
      stripeChargesEnabled: account.charges_enabled,
      stripePayoutsEnabled: account.payouts_enabled,
    };

    if (account.requirements?.disabled_reason) {
      updateData.stripeDisabledReason = account.requirements.disabled_reason;
    }

    // Update local database with Stripe status
    await prisma.affiliate.update({
      where: { id: user.affiliate.id },
      data: updateData
    });

    return NextResponse.json({
      connected: true,
      onboardingComplete: account.details_submitted,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      disabledReason: account.requirements?.disabled_reason,
      currentlyDue: account.requirements?.currently_due || [],
      pastDue: account.requirements?.past_due || [],
    });
  } catch (error) {
    console.error('Stripe status error:', error);
    return NextResponse.json(
      { error: 'Failed to check Stripe status' },
      { status: 500 }
    );
  }
}