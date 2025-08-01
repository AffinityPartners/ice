import { prisma } from '@/lib/prisma';
import ActivityTable from './ActivityTable';
import { 
  History, 
  User, 
  Shield,
  DollarSign,
  FileText,
  Settings,
  Activity,
  UserCheck,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const dynamic = 'force-dynamic';

async function getActivityLogs(filters?: {
  actorRole?: string;
  action?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  const where: any = {};

  if (filters?.actorRole && filters.actorRole !== 'all') {
    where.actorRole = filters.actorRole;
  }

  if (filters?.action && filters.action !== 'all') {
    where.action = filters.action;
  }

  if (filters?.startDate || filters?.endDate) {
    where.createdAt = {};
    if (filters.startDate) {
      where.createdAt.gte = filters.startDate;
    }
    if (filters.endDate) {
      where.createdAt.lte = filters.endDate;
    }
  }

  const logs = await prisma.activityLog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      actor: {
        select: {
          name: true,
          email: true,
          image: true,
        }
      }
    },
    take: 500, // Limit to prevent performance issues
  });

  return logs;
}

async function getActivityStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [todayCount, totalCount, uniqueUsers] = await Promise.all([
    // Today's activity count
    prisma.activityLog.count({
      where: {
        createdAt: {
          gte: today
        }
      }
    }),
    // Total activity count
    prisma.activityLog.count(),
    // Unique users
    prisma.activityLog.groupBy({
      by: ['actorId'],
      _count: true,
    })
  ]);

  // Get activity by role
  const activityByRole = await prisma.activityLog.groupBy({
    by: ['actorRole'],
    _count: true,
    orderBy: {
      _count: {
        actorRole: 'desc'
      }
    }
  });

  return {
    todayCount,
    totalCount,
    uniqueUsers: uniqueUsers.length,
    activityByRole
  };
}

const getActionIcon = (action: string) => {
  if (action.includes('payment') || action.includes('commission')) return DollarSign;
  if (action.includes('blog') || action.includes('post')) return FileText;
  if (action.includes('settings') || action.includes('config')) return Settings;
  if (action.includes('user') || action.includes('profile')) return User;
  if (action.includes('admin')) return Shield;
  return Activity;
};

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
              Today's Activity
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
              const percentage = (roleData._count / stats.totalCount * 100).toFixed(1);
              
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