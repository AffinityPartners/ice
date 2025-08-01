import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ActivityLogger } from '@/lib/activity-logger';

export async function PUT(request: NextRequest) {
  try {
    // Check authentication and admin role
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Get the first config or create it
    let config = await prisma.globalConfig.findFirst();
    
    if (!config) {
      config = await prisma.globalConfig.create({
        data: body,
      });
    } else {
      config = await prisma.globalConfig.update({
        where: { id: config.id },
        data: body,
      });
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