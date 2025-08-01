import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { createConnectAccount, createAccountLink } from '@/lib/stripe';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { affiliate: true }
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
      await prisma.affiliate.update({
        where: { id: user.affiliate.id },
        data: { stripeAccountId }
      });
    }

    // Create account link for onboarding
    const accountLink = await createAccountLink(
      stripeAccountId,
      refreshUrl,
      returnUrl
    );

    // Update onboarding URL
    await prisma.affiliate.update({
      where: { id: user.affiliate.id },
      data: { stripeOnboardingUrl: accountLink.url }
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error('Stripe onboarding error:', error);
    return NextResponse.json(
      { error: 'Failed to create onboarding link' },
      { status: 500 }
    );
  }
}