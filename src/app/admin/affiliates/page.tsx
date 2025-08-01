import { requireRole } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import AffiliateTableWithSearch from '@/components/admin/AffiliateTableWithSearch';
import {
  Users,
  UserCheck,
  Handshake,
  TrendingUp,
  Eye,
  ExternalLink,
  Edit,
  Info,
  Megaphone,
  Shield,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

async function deleteAffiliate(formData: FormData) {
  'use server';

  await requireRole('ADMIN');

  const affiliateId = formData.get('affiliateId') as string;

  await prisma.affiliate.delete({
    where: { id: affiliateId },
  });

  revalidatePath('/admin/affiliates');
}

export default async function AdminAffiliatesPage() {
  await requireRole('ADMIN');

  const affiliates = await prisma.affiliate.findMany({
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
      referrals: {
        select: {
          id: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    totalAffiliates: affiliates.length,
    activeAffiliates: affiliates.filter(a => a.isActive).length,
    totalReferrals: affiliates.reduce((sum, a) => sum + a.referrals.length, 0),
    approvedAffiliates: affiliates.filter(a => a.isActive).length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Affiliates
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAffiliates}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All registered affiliates
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center">
              <UserCheck className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAffiliates}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approvedAffiliates}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Verified partners
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Referrals
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReferrals}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All time referrals
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Commission Structure Alert */}
      <Alert>
        <Handshake className="h-4 w-4" />
        <AlertTitle>Commission Structure</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>Current commission settings:</p>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Standard Rate</Badge>
              <span className="text-sm">20% commission on successful referrals</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Cookie Duration</Badge>
              <span className="text-sm">30 days tracking period</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Payout Threshold</Badge>
              <span className="text-sm">$50 minimum for withdrawals</span>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Affiliates Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Affiliates</CardTitle>
          <CardDescription>
            View and manage all affiliate accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AffiliateTableWithSearch 
            affiliates={affiliates}
            deleteAction={deleteAffiliate}
          />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common affiliate management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                Monitor Performance
              </h3>
              <p className="text-sm text-muted-foreground">
                Track affiliate sales and conversion rates
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/affiliate-activity">
                  View Activity
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-muted-foreground" />
                Marketing Resources
              </h3>
              <p className="text-sm text-muted-foreground">
                Provide affiliates with promotional materials
              </p>
              <Button variant="outline" size="sm" disabled>
                Coming Soon
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <Edit className="h-4 w-4 text-muted-foreground" />
                Commission Settings
              </h3>
              <p className="text-sm text-muted-foreground">
                Configure rates and payout rules
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/settings">
                  Edit Settings
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Security Reminder</AlertTitle>
        <AlertDescription>
          Always verify affiliate identities before approving accounts. Monitor for suspicious activity 
          and ensure compliance with your terms of service.
        </AlertDescription>
      </Alert>
    </div>
  );
}