/**
 * Activity Logs API Route
 * 
 * Retrieves activity logs for admin review.
 * Supports filtering by role and pagination.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { eq, desc, count } from 'drizzle-orm';
import { authOptions } from '@/lib/auth-options';
import { db, activityLogs, type Role } from '@/db';

/**
 * GET /api/admin/activity-logs
 * Retrieves paginated activity logs with optional role filtering.
 * Includes actor information for each log entry.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get('role') as Role | null;
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Fetch logs with user information
    const logs = await db.query.activityLogs.findMany({
      where: role ? eq(activityLogs.actorRole, role) : undefined,
      with: {
        actor: true,
      },
      orderBy: [desc(activityLogs.createdAt)],
      limit: limit,
      offset: offset,
    });

    // Transform to include only necessary actor fields
    const transformedLogs = logs.map(log => ({
      ...log,
      actor: log.actor ? {
        id: log.actor.id,
        name: log.actor.name,
        email: log.actor.email,
        image: log.actor.image,
      } : null
    }));

    // Count total logs
    const [totalResult] = await db
      .select({ count: count() })
      .from(activityLogs)
      .where(role ? eq(activityLogs.actorRole, role) : undefined);

    return NextResponse.json({ 
      logs: transformedLogs, 
      total: totalResult?.count || 0 
    });
  } catch (error) {
    console.error('Failed to fetch activity logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activity logs' },
      { status: 500 }
    );
  }
}
