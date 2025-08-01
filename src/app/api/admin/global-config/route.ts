import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get existing config or create default one
    let globalConfig = await prisma.globalConfig.findFirst();

    if (!globalConfig) {
      // Create default config if none exists
      globalConfig = await prisma.globalConfig.create({
        data: {
          defaultHeroHeading: 'Your Emergency Information When It Matters Most',
          defaultHeroSubtext: 'Secure, instant access to critical medical and contact information',
          defaultCtaText: 'Get Started Today',
          defaultPrimaryColor: '#3b82f6',
          bannerActive: false,
        },
      });
    }

    return NextResponse.json(globalConfig);
  } catch (error) {
    console.error('Error fetching global config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch global configuration' },
      { status: 500 }
    );
  }
}