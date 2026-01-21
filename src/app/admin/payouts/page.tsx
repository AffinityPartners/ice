/**
 * Admin Payouts Page
 * 
 * Dashboard for managing affiliate commission payouts.
 * Currently displays placeholder data as the full payout system
 * requires additional configuration (Stripe Connect integration).
 */

import { 
  DollarSign, 
  Clock, 
  CheckCircle, 
  Info,
  Send,
  FileText,
  AlertCircle,
  Download,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

/**
 * Retrieves payout statistics.
 * Currently returns placeholder data until commission tracking is set up.
 */
async function getPayoutStats() {
  // For now, return placeholder data since commission tracking may not be set up
  return {
    totalPaid: 0,
    pendingAmount: 0,
    lastPayoutDate: null,
    totalPayouts: 0
  };
}

/**
 * Main admin payouts page component.
 * Displays payout management interface with stats and transaction tables.
 */
export default async function AdminPayoutsPage() {
  const stats = await getPayoutStats();

  // Mock payout data for demonstration
  const mockPayouts = [
    {
      id: '1',
      affiliate: 'John Doe',
      amount: 250.00,
      status: 'pending',
      period: 'March 2024',
      referrals: 5,
      createdAt: new Date('2024-03-30'),
    },
    {
      id: '2',
      affiliate: 'Jane Smith',
      amount: 150.00,
      status: 'paid',
      period: 'February 2024',
      referrals: 3,
      createdAt: new Date('2024-02-28'),
      paidAt: new Date('2024-03-05'),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Affiliate Payouts</h1>
          <p className="text-muted-foreground">
            Manage and process affiliate commission payouts
          </p>
        </div>
        <Button disabled>
          <Send className="mr-2 h-4 w-4" />
          Process Payouts
        </Button>
      </div>

      {/* Setup Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Payouts System Setup Required</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>The payouts system requires additional setup:</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="flex items-start gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
              Commission tracking system needs to be configured
            </li>
            <li className="flex items-start gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
              Stripe Connect integration for affiliates
            </li>
            <li className="flex items-start gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
              Commission log and payout log database tables
            </li>
          </ul>
          <p className="mt-3">
            See the <Link href="/admin/settings" className="font-medium text-primary hover:underline">
              Settings page
            </Link> to configure the commission structure.
          </p>
        </AlertDescription>
      </Alert>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Paid Out
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalPaid.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All time payouts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Amount
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Ready to process
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Payouts
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPayouts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Completed transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Payout
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.lastPayoutDate ? 
                new Date(stats.lastPayoutDate).toLocaleDateString() : 
                'N/A'
              }
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Most recent payout
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payouts Table */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Payouts</TabsTrigger>
          <TabsTrigger value="history">Payout History</TabsTrigger>
          <TabsTrigger value="settings">Commission Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Payouts</CardTitle>
              <CardDescription>
                Affiliate commissions ready to be processed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Affiliate</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Referrals</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayouts.filter(p => p.status === 'pending').map((payout) => (
                      <TableRow key={payout.id}>
                        <TableCell className="font-medium">{payout.affiliate}</TableCell>
                        <TableCell>{payout.period}</TableCell>
                        <TableCell>{payout.referrals}</TableCell>
                        <TableCell className="font-semibold">${payout.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            <Clock className="mr-1 h-3 w-3" />
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" disabled>
                            Process
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {mockPayouts.filter(p => p.status === 'pending').length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No pending payouts
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Payout History</CardTitle>
                <CardDescription>
                  Completed payout transactions
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" disabled>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Affiliate</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Referrals</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Paid Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayouts.filter(p => p.status === 'paid').map((payout) => (
                      <TableRow key={payout.id}>
                        <TableCell className="font-medium">{payout.affiliate}</TableCell>
                        <TableCell>{payout.period}</TableCell>
                        <TableCell>{payout.referrals}</TableCell>
                        <TableCell className="font-semibold">${payout.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          {payout.paidAt && new Date(payout.paidAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Paid
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {mockPayouts.filter(p => p.status === 'paid').length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No payout history
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Commission Settings</CardTitle>
              <CardDescription>
                Configure commission rates and payout rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-medium">Commission Rate</h3>
                  <p className="text-sm text-muted-foreground">
                    Standard commission percentage for affiliates
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-lg px-3 py-1">20%</Badge>
                    <span className="text-sm text-muted-foreground">of sale value</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Payout Threshold</h3>
                  <p className="text-sm text-muted-foreground">
                    Minimum balance required for payout
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-lg px-3 py-1">$50.00</Badge>
                    <span className="text-sm text-muted-foreground">minimum</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Cookie Duration</h3>
                  <p className="text-sm text-muted-foreground">
                    How long referral tracking lasts
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-lg px-3 py-1">30 days</Badge>
                    <span className="text-sm text-muted-foreground">tracking period</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Payment Schedule</h3>
                  <p className="text-sm text-muted-foreground">
                    When payouts are processed
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-lg px-3 py-1">Monthly</Badge>
                    <span className="text-sm text-muted-foreground">on the 1st</span>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Configuration Required</AlertTitle>
                <AlertDescription>
                  These settings need to be configured in your application settings and integrated 
                  with your payment processing system.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
