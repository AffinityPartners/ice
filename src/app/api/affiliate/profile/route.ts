import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

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

export async function PUT(request: NextRequest) {
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

    const body = await request.json();
    
    // Update affiliate profile
    const updatedAffiliate = await prisma.affiliate.update({
      where: { id: user.affiliate.id },
      data: {
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
      }
    });

    // Also update user's first and last name
    if (body.firstName || body.lastName) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
        }
      });
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