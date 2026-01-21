/**
 * Stripe Onboarding API Route
 * 
 * Handles Stripe Connect onboarding for affiliates.
 * Creates a Stripe Connect account if one doesn't exist,
 * then generates an onboarding link.
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { eq } from 'drizzle-orm';
import { authOptions } from '@/lib/auth-options';
import { db, users, affiliates } from '@/db';
import { createConnectAccount, createAccountLink } from '@/lib/stripe';

/**
 * POST /api/affiliate/stripe/onboarding
 * Creates or retrieves a Stripe Connect account and returns an onboarding URL.
 */
export async function POST() {
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

    if (!user?.affiliate) {
      return NextResponse.json({ error: 'Not an affiliate' }, { status: 403 });
    }

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const refreshUrl = `${baseUrl}/affiliate/settings`;
    const returnUrl = `${baseUrl}/affiliate/settings?stripe_onboarding=complete`;

    let stripeAccountId = user.affiliate.stripeAccountId;

    // Create Stripe account if it doesn't exist
    if (!stripeAccountId) {
      const account = await createConnectAccount(
        user.email!,
        user.affiliate.companyName || user.affiliate.businessName || undefined,
        user.affiliate.firstName || user.firstName || undefined,
        user.affiliate.lastName || user.lastName || undefined
      );
      
      stripeAccountId = account.id;

      // Update affiliate with Stripe account ID
      await db.update(affiliates)
        .set({ stripeAccountId })
        .where(eq(affiliates.id, user.affiliate.id));
    }

    // Create account link for onboarding
    const accountLink = await createAccountLink(
      stripeAccountId,
      refreshUrl,
      returnUrl
    );

    // Update onboarding URL
    await db.update(affiliates)
      .set({ stripeOnboardingUrl: accountLink.url })
      .where(eq(affiliates.id, user.affiliate.id));

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error('Stripe onboarding error:', error);
    return NextResponse.json(
      { error: 'Failed to create onboarding link' },
      { status: 500 }
    );
  }
}
