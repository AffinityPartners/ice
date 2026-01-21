/**
 * Make Me Affiliate API Route
 * 
 * Development/testing endpoint that converts the current user to an affiliate.
 * Creates an affiliate profile and updates the user's role.
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { eq } from 'drizzle-orm';
import { authOptions } from '@/lib/auth-options';
import { db, users, affiliates } from '@/db';
import { generateSlug } from '@/lib/utils';

/**
 * GET /api/admin/make-me-affiliate
 * Converts the current authenticated user to an affiliate.
 * Creates affiliate profile with default settings.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Check if user exists with affiliate profile
    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
      with: { affiliate: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if already an affiliate
    if (user.affiliate) {
      return NextResponse.json({ 
        message: 'Already an affiliate',
        affiliate: user.affiliate
      });
    }

    // Update user role to AFFILIATE
    await db.update(users)
      .set({ role: 'AFFILIATE' })
      .where(eq(users.id, user.id));

    // Create affiliate profile with default settings
    const slug = generateSlug(user.name || user.email?.split('@')[0] || 'affiliate');
    
    const [affiliate] = await db.insert(affiliates).values({
      userId: user.id,
      slug: slug,
      companyName: user.name || 'My Company',
      firstName: user.firstName,
      lastName: user.lastName,
      contactEmail: user.email!,
      isActive: true,
      primaryColor: '#245789',
      heroHeading: 'Protect Your Emergency Information',
      heroSubtext: 'Get ICE Tracer today and ensure your medical information is always accessible',
      ctaText: 'Get Started Now',
    }).returning();

    return NextResponse.json({
      message: 'Success! You are now an affiliate. Please sign out and sign back in.',
      affiliate: {
        id: affiliate.id,
        slug: affiliate.slug,
        role: 'AFFILIATE',
      },
    });
  } catch (error) {
    console.error('Make affiliate error:', error);
    return NextResponse.json(
      { error: 'Failed to create affiliate profile' },
      { status: 500 }
    );
  }
}
