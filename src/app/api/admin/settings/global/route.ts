/**
 * Global Settings API Route
 * 
 * Handles updates to the global application configuration.
 * PUT: Update global settings (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { db, globalConfig } from '@/db';
import { ActivityLogger } from '@/lib/activity-logger';

/**
 * PUT /api/admin/settings/global
 * Updates the global application configuration.
 * Creates the config if it doesn't exist.
 * Requires admin authentication.
 */
export async function PUT(request: NextRequest) {
  try {
    // Check authentication and admin role
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Get the first config or create it
    let config = await db.query.globalConfig.findFirst();
    
    if (!config) {
      // Create new config
      const [newConfig] = await db.insert(globalConfig).values(body).returning();
      config = newConfig;
    } else {
      // Update existing config
      const [updatedConfig] = await db.update(globalConfig)
        .set(body)
        .where(eq(globalConfig.id, config.id))
        .returning();
      config = updatedConfig;
    }

    // Log the activity
    await ActivityLogger.globalSettings.updated(session.user.id, {
      updatedFields: Object.keys(body),
    });

    return NextResponse.json({
      success: true,
      config,
    });
  } catch (error) {
    console.error('Error updating global config:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
