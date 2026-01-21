/**
 * Affiliate Profile API Route
 * 
 * Handles affiliate profile operations.
 * GET: Retrieve the current user's affiliate profile
 * PUT: Update the current user's affiliate profile
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { eq } from 'drizzle-orm';
import { authOptions } from '@/lib/auth-options';
import { db, users, affiliates } from '@/db';

/**
 * GET /api/affiliate/profile
 * Retrieves the current user's affiliate profile.
 * Returns 403 if the user is not an affiliate.
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

    if (!user?.affiliate) {
      return NextResponse.json({ error: 'Not an affiliate' }, { status: 403 });
    }

    return NextResponse.json(user.affiliate);
  } catch (error) {
    console.error('Error fetching affiliate profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/affiliate/profile
 * Updates the current user's affiliate profile.
 * Also updates user's first and last name if provided.
 */
export async function PUT(request: NextRequest) {
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

    const body = await request.json();
    
    // Update affiliate profile
    const [updatedAffiliate] = await db.update(affiliates)
      .set({
        companyName: body.companyName,
        firstName: body.firstName,
        lastName: body.lastName,
        contactEmail: body.contactEmail,
        phoneNumber: body.phoneNumber,
        website: body.website,
        bio: body.bio,
        logoUrl: body.logoUrl,
        primaryColor: body.primaryColor,
        heroHeading: body.heroHeading,
        heroSubtext: body.heroSubtext,
        ctaText: body.ctaText,
        ctaButtonLink: body.ctaButtonLink,
      })
      .where(eq(affiliates.id, user.affiliate.id))
      .returning();

    // Also update user's first and last name
    if (body.firstName || body.lastName) {
      await db.update(users)
        .set({
          firstName: body.firstName,
          lastName: body.lastName,
        })
        .where(eq(users.id, user.id));
    }

    return NextResponse.json(updatedAffiliate);
  } catch (error) {
    console.error('Error updating affiliate profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
