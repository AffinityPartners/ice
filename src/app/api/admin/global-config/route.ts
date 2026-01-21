/**
 * Global Config API Route
 * 
 * Retrieves the global configuration for the application.
 * Creates a default configuration if none exists.
 */

import { NextResponse } from 'next/server';
import { db, globalConfig } from '@/db';

/**
 * GET /api/admin/global-config
 * Retrieves the global configuration, creating default values if needed.
 */
export async function GET() {
  try {
    // Get existing config
    let config = await db.query.globalConfig.findFirst();

    if (!config) {
      // Create default config if none exists
      const [newConfig] = await db.insert(globalConfig).values({
        defaultHeroHeading: 'Your Emergency Information When It Matters Most',
        defaultHeroSubtext: 'Secure, instant access to critical medical and contact information',
        defaultCtaText: 'Get Started Today',
        defaultPrimaryColor: '#3b82f6',
        bannerActive: false,
      }).returning();
      
      config = newConfig;
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error('Error fetching global config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch global configuration' },
      { status: 500 }
    );
  }
}
