import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/lib/utils';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { affiliate: true }
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
    await prisma.user.update({
      where: { id: user.id },
      data: { role: 'AFFILIATE' }
    });

    // Create affiliate profile
    const slug = generateSlug(user.name || user.email?.split('@')[0] || 'affiliate');
    
    const affiliate = await prisma.affiliate.create({
      data: {
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
      }
    });

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