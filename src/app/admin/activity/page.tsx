/**
 * Admin Activity Page
 * 
 * Displays activity logs and statistics for monitoring user actions.
 * Provides insights into system usage by role and action type.
 */

import { desc, gte, count, eq } from 'drizzle-orm';
import { db, activityLogs, type Role } from '@/db';
import ActivityTable from './ActivityTable';
import { 
  History, 
  User, 
  Shield,
  Activity,
  UserCheck,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const dynamic = 'force-dynamic';

/**
 * Fetches activity logs with optional filters.
 * Returns logs with actor information, limited to prevent performance issues.
 */
async function getActivityLogs(filters?: {
  actorRole?: string;
  action?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  // Build the query based on filters
  const logs = await db.query.activityLogs.findMany({
    where: filters?.actorRole && filters.actorRole !== 'all' 
      ? eq(activityLogs.actorRole, filters.actorRole as Role)
      : undefined,
    orderBy: [desc(activityLogs.createdAt)],
    with: {
      actor: true
    },
    limit: 500, // Limit to prevent performance issues
  });

  // Transform to include only necessary actor fields
  return logs.map(log => ({
    ...log,
    actor: log.actor ? {
      name: log.actor.name,
      email: log.actor.email,
      image: log.actor.image,
    } : null
  }));
}

/**
 * Calculates activity statistics including today's count,
 * total events, unique users, and breakdown by role.
 */
async function getActivityStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get today's activity count
  const [todayCountResult] = await db
    .select({ count: count() })
    .from(activityLogs)
    .where(gte(activityLogs.createdAt, today));

  // Get total count
  const [totalCountResult] = await db
    .select({ count: count() })
    .from(activityLogs);

  // Get unique actors
  const uniqueActors = await db
    .selectDistinct({ actorId: activityLogs.actorId })
    .from(activityLogs);

  // Get activity by role using raw counts
  const adminCount = await db
    .select({ count: count() })
    .from(activityLogs)
    .where(eq(activityLogs.actorRole, 'ADMIN'));
  
  const affiliateCount = await db
    .select({ count: count() })
    .from(activityLogs)
    .where(eq(activityLogs.actorRole, 'AFFILIATE'));
  
  const userCount = await db
    .select({ count: count() })
    .from(activityLogs)
    .where(eq(activityLogs.actorRole, 'USER'));

  const activityByRole = [
    { actorRole: 'ADMIN' as Role, _count: adminCount[0]?.count || 0 },
    { actorRole: 'AFFILIATE' as Role, _count: affiliateCount[0]?.count || 0 },
    { actorRole: 'USER' as Role, _count: userCount[0]?.count || 0 },
  ].filter(r => r._count > 0)
   .sort((a, b) => b._count - a._count);

  return {
    todayCount: todayCountResult?.count || 0,
    totalCount: totalCountResult?.count || 0,
    uniqueUsers: uniqueActors.length,
    activityByRole
  };
}

/**
 * Returns the appropriate icon component for a given role.
 */
const getRoleIcon = (role: string) => {
  switch (role) {
    case 'ADMIN':
      return Shield;
    case 'AFFILIATE':
      return TrendingUp;
    case 'USER':
      return User;
    default:
      return User;
  }
};

/**
 * Main admin activity page component.
 * Displays activity statistics and a searchable log table.
 */
export default async function AdminActivityPage() {
  const [logs, stats] = await Promise.all([
    getActivityLogs(),
    getActivityStats()
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <History className="h-6 w-6 text-primary" />
          Activity Logs
        </h1>
        <p className="text-muted-foreground">
          Monitor user actions and system activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today&apos;s Activity
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Actions logged today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Events
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All time activity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <UserCheck className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Unique actors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Admin Actions
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Shield className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.activityByRole.find(r => r.actorRole === 'ADMIN')?._count || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Administrative events
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity by Role */}
      <Card>
        <CardHeader>
          <CardTitle>Activity by Role</CardTitle>
          <CardDescription>
            Breakdown of actions performed by each user role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.activityByRole.map((roleData) => {
              const Icon = getRoleIcon(roleData.actorRole);
              const percentage = stats.totalCount > 0 
                ? (roleData._count / stats.totalCount * 100).toFixed(1)
                : '0';
              
              return (
                <div key={roleData.actorRole} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{roleData.actorRole}</p>
                      <p className="text-sm text-muted-foreground">
                        {roleData._count.toLocaleString()} actions
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{percentage}%</p>
                    <div className="mt-1 h-2 w-24 rounded-full bg-secondary/20">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Detailed log of all user actions and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityTable initialLogs={logs} />
        </CardContent>
      </Card>

      {/* Info Alert */}
      <Alert>
        <Activity className="h-4 w-4" />
        <AlertTitle>Activity Logging</AlertTitle>
        <AlertDescription>
          Activity logs are automatically recorded for all user actions. Logs are retained for 
          90 days for security and compliance purposes. Export logs regularly if you need to 
          maintain longer records.
        </AlertDescription>
      </Alert>
    </div>
  );
}
