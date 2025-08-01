import Stripe from 'stripe';

// Make Stripe optional - only initialize if key is provided
let stripe: Stripe | null = null;

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-07-30.basil',
    typescript: true,
  });
} else {
  console.warn('⚠️ Stripe is not configured. Payment features will be disabled.');
}

// Helper to check if Stripe is configured
export function isStripeConfigured(): boolean {
  return stripe !== null;
}

// Export stripe instance (will be null if not configured)
export { stripe };

/**
 * Create a Stripe Connect account for an affiliate
 */
export async function createConnectAccount(
  email: string,
  businessName?: string,
  firstName?: string,
  lastName?: string
) {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY.');
  }
  
  const account = await stripe.accounts.create({
    type: 'express',
    email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    business_profile: {
      name: businessName,
    },
    individual: {
      first_name: firstName,
      last_name: lastName,
      email,
    },
  });

  return account;
}

/**
 * Create an account link for Stripe Connect onboarding
 */
export async function createAccountLink(
  accountId: string,
  refreshUrl: string,
  returnUrl: string
) {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY.');
  }
  
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: refreshUrl,
    return_url: returnUrl,
    type: 'account_onboarding',
  });

  return accountLink;
}

/**
 * Retrieve a Stripe Connect account
 */
export async function retrieveAccount(accountId: string) {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY.');
  }
  
  const account = await stripe.accounts.retrieve(accountId);
  return account;
}

/**
 * Create a payout to an affiliate
 */
export async function createPayout(
  stripeAccountId: string,
  amountCents: number,
  description: string
) {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY.');
  }
  
  const transfer = await stripe.transfers.create({
    amount: amountCents,
    currency: 'usd',
    destination: stripeAccountId,
    description,
  });

  return transfer;
}

/**
 * Create a login link for the Express dashboard
 */
export async function createLoginLink(accountId: string) {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY.');
  }
  
  const loginLink = await stripe.accounts.createLoginLink(accountId);
  return loginLink;
}