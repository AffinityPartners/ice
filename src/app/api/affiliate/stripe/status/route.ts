/**
 * Stripe Status API Route
 * 
 * Retrieves the current Stripe Connect account status for an affiliate.
 * Syncs the status from Stripe to the local database.
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { eq } from 'drizzle-orm';
import { authOptions } from '@/lib/auth-options';
import { db, users, affiliates } from '@/db';
import { retrieveAccount } from '@/lib/stripe';

/**
 * GET /api/affiliate/stripe/status
 * Checks Stripe Connect account status and syncs with local database.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user with affiliate profile
    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
      with: { affiliate: true }
    });

    // Return not connected if no Stripe account
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

    // Build update data
    const updateData: Record<string, unknown> = {
      stripeOnboardingComplete: account.details_submitted,
      stripeChargesEnabled: account.charges_enabled,
      stripePayoutsEnabled: account.payouts_enabled,
    };

    if (account.requirements?.disabled_reason) {
      updateData.stripeDisabledReason = account.requirements.disabled_reason;
    }

    // Update local database with Stripe status
    await db.update(affiliates)
      .set(updateData)
      .where(eq(affiliates.id, user.affiliate.id));

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
