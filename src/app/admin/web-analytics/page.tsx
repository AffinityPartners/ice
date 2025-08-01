'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  ExternalLink,
  CheckCircle,
  Info,
  ArrowRight,
  Globe,
  Users,
  Monitor,
  Smartphone,
  Clock,
  Eye,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

interface AnalyticsConfig {
  googleAnalytics?: {
    enabled: boolean;
    measurementId?: string;
  };
  vercelAnalytics?: {
    enabled: boolean;
  };
  posthog?: {
    enabled: boolean;
    apiKey?: string;
  };
}

export default function WebAnalyticsPage() {
  const [isProduction, setIsProduction] = useState(false);
  const [analyticsConfig, setAnalyticsConfig] = useState<AnalyticsConfig>({
    googleAnalytics: { enabled: false },
    vercelAnalytics: { enabled: false },
    posthog: { enabled: false },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we're on a production deployment
    setIsProduction(
      typeof window !== 'undefined' &&
      (window.location.hostname.includes('vercel.app') ||
        window.location.hostname.includes('icetracer.com') ||
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'production')
    );

    // Simulate loading analytics config
    setTimeout(() => {
      // Check for analytics in the environment
      setAnalyticsConfig({
        googleAnalytics: {
          enabled: !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
          measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
        },
        vercelAnalytics: {
          enabled: isProduction,
        },
        posthog: {
          enabled: !!process.env.NEXT_PUBLIC_POSTHOG_KEY,
          apiKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
        },
      });
      setLoading(false);
    }, 1000);
  }, [isProduction]);

  const mockMetrics = {
    pageViews: '12,543',
    uniqueVisitors: '3,421',
    avgSessionDuration: '2m 34s',
    bounceRate: '42%',
    topPages: [
      { page: '/', views: '4,321', percentage: 34.5 },
      { page: '/blog', views: '2,156', percentage: 17.2 },
      { page: '/about', views: '1,843', percentage: 14.7 },
      { page: '/faq', views: '1,234', percentage: 9.8 },
    ],
    devices: {
      desktop: 65,
      mobile: 30,
      tablet: 5,
    },
    referrers: [
      { source: 'Google', visits: '2,345', percentage: 45 },
      { source: 'Direct', visits: '1,234', percentage: 24 },
      { source: 'Facebook', visits: '876', percentage: 17 },
      { source: 'Twitter', visits: '543', percentage: 10 },
    ],
  };

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Analytics Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Analytics Configuration
            {isProduction ? (
              <Badge variant="default">
                <CheckCircle className="mr-1 h-3 w-3" />
                Production
              </Badge>
            ) : (
              <Badge variant="secondary">
                <Info className="mr-1 h-3 w-3" />
                Development
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Configure and monitor your analytics providers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google Analytics */}
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Google Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  {analyticsConfig.googleAnalytics?.enabled
                    ? `Connected (${analyticsConfig.googleAnalytics.measurementId})`
                    : 'Not configured'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {analyticsConfig.googleAnalytics?.enabled ? (
                <>
                  <Badge variant="default">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Active
                  </Badge>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href="https://analytics.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-3 w-3" />
                      View Dashboard
                    </a>
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="outline" asChild>
                  <a
                    href="https://analytics.google.com/analytics/web/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Setup
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Vercel Analytics */}
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Vercel Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  {analyticsConfig.vercelAnalytics?.enabled
                    ? 'Automatically enabled in production'
                    : 'Available in production deployments'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {analyticsConfig.vercelAnalytics?.enabled ? (
                <>
                  <Badge variant="default">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Active
                  </Badge>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href="https://vercel.com/analytics"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-3 w-3" />
                      View Dashboard
                    </a>
                  </Button>
                </>
              ) : (
                <Badge variant="secondary">
                  Development Mode
                </Badge>
              )}
            </div>
          </div>

          {/* PostHog */}
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">PostHog</h3>
                <p className="text-sm text-muted-foreground">
                  {analyticsConfig.posthog?.enabled
                    ? 'Connected for product analytics'
                    : 'Not configured'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {analyticsConfig.posthog?.enabled ? (
                <>
                  <Badge variant="default">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Active
                  </Badge>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href="https://app.posthog.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-3 w-3" />
                      View Dashboard
                    </a>
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="outline" asChild>
                  <a
                    href="https://posthog.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Setup
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Analytics Data */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="referrers">Referrers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Page Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockMetrics.pageViews}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Unique Visitors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockMetrics.uniqueVisitors}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +8.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg. Session
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockMetrics.avgSessionDuration}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +5s from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Bounce Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockMetrics.bounceRate}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  -2.3% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Sample Data</AlertTitle>
            <AlertDescription>
              This is sample analytics data. Connect your analytics provider to see real metrics.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMetrics.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Eye className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{page.page}</p>
                        <p className="text-sm text-muted-foreground">
                          {page.views} views
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{page.percentage}%</p>
                      <div className="mt-1 h-2 w-24 rounded-full bg-secondary/20">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${page.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices">
          <Card>
            <CardHeader>
              <CardTitle>Device Distribution</CardTitle>
              <CardDescription>Visitor breakdown by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Monitor className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Desktop</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {mockMetrics.devices.desktop}%
                    </span>
                    <div className="h-3 w-32 rounded-full bg-secondary/20">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${mockMetrics.devices.desktop}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Mobile</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {mockMetrics.devices.mobile}%
                    </span>
                    <div className="h-3 w-32 rounded-full bg-secondary/20">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${mockMetrics.devices.mobile}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Monitor className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Tablet</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {mockMetrics.devices.tablet}%
                    </span>
                    <div className="h-3 w-32 rounded-full bg-secondary/20">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${mockMetrics.devices.tablet}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrers">
          <Card>
            <CardHeader>
              <CardTitle>Top Referrers</CardTitle>
              <CardDescription>Where your traffic comes from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMetrics.referrers.map((referrer, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{referrer.source}</p>
                        <p className="text-sm text-muted-foreground">
                          {referrer.visits} visits
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{referrer.percentage}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Setup Guide</CardTitle>
          <CardDescription>
            Follow these steps to enable analytics for your website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-medium">1. Google Analytics</h3>
            <ol className="ml-6 space-y-2 text-sm text-muted-foreground">
              <li>• Create a Google Analytics 4 property</li>
              <li>• Add your Measurement ID to <code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_GA_MEASUREMENT_ID</code></li>
              <li>• Deploy your changes</li>
            </ol>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium">2. Vercel Analytics</h3>
            <ol className="ml-6 space-y-2 text-sm text-muted-foreground">
              <li>• Deploy your app to Vercel</li>
              <li>• Enable Analytics in your Vercel dashboard</li>
              <li>• Analytics will automatically work in production</li>
            </ol>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium">3. PostHog (Optional)</h3>
            <ol className="ml-6 space-y-2 text-sm text-muted-foreground">
              <li>• Create a PostHog account</li>
              <li>• Add your API key to <code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_POSTHOG_KEY</code></li>
              <li>• Configure feature flags and experiments</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}