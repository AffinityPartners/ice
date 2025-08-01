'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Users,
  Newspaper,
  HelpCircle,
  Clock,
  CheckCircle,
  Eye,
  Calendar,
  TrendingUp,
  TrendingDown,
  UserPlus,
  FileText,
  Settings,
  Activity,
  Sparkles,
  BarChart3,
  CircleDot,
  ArrowUpRight,
  MoreHorizontal,
  PlusCircle,
  AlertCircle,
  MessageSquare,
  Handshake,
} from 'lucide-react';
import Link from 'next/link';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import StatsCard from '@/components/admin/StatsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface DashboardStats {
  usersCount: number;
  blogPostsCount: number;
  publishedPostsCount: number;
  faqCount: number;
  activeFaqCount: number;
  recentActivity: number;
}

// Enhanced mock data for charts
const userGrowthData = [
  { month: 'Jan', users: 120, target: 100 },
  { month: 'Feb', users: 145, target: 130 },
  { month: 'Mar', users: 165, target: 160 },
  { month: 'Apr', users: 185, target: 180 },
  { month: 'May', users: 210, target: 200 },
  { month: 'Jun', users: 260, target: 240 },
];

const contentData = [
  { month: 'Jan', posts: 12, faqs: 8 },
  { month: 'Feb', posts: 15, faqs: 10 },
  { month: 'Mar', posts: 18, faqs: 12 },
  { month: 'Apr', posts: 22, faqs: 15 },
  { month: 'May', posts: 25, faqs: 18 },
  { month: 'Jun', posts: 30, faqs: 22 },
];

// Activity feed data
const activityData = [
  {
    id: 1,
    type: 'user',
    action: 'New user registered',
    user: 'John Doe',
    avatar: '/api/placeholder/32/32',
    time: '2 hours ago',
    icon: UserPlus,
    color: 'blue',
  },
  {
    id: 2,
    type: 'blog',
    action: 'Blog post published',
    title: 'Emergency Preparedness Guide',
    time: '5 hours ago',
    icon: FileText,
    color: 'green',
  },
  {
    id: 3,
    type: 'faq',
    action: 'FAQ updated',
    title: 'How to update emergency contacts?',
    time: 'Yesterday',
    icon: HelpCircle,
    color: 'purple',
  },
  {
    id: 4,
    type: 'comment',
    action: 'New comment on blog post',
    user: 'Sarah Smith',
    time: '3 days ago',
    icon: MessageSquare,
    color: 'orange',
  },
];

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    usersCount: 0,
    blogPostsCount: 0,
    publishedPostsCount: 0,
    faqCount: 0,
    activeFaqCount: 0,
    recentActivity: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real stats from API
    // For now, using mock data
    setTimeout(() => {
      setStats({
        usersCount: 245,
        blogPostsCount: 30,
        publishedPostsCount: 25,
        faqCount: 22,
        activeFaqCount: 20,
        recentActivity: 15,
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.usersCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Blog Posts
            </CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.blogPostsCount}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stats.publishedPostsCount}</span> published
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              FAQs
            </CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.faqCount}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stats.activeFaqCount}</span> active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Activity
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.recentActivity}</div>
            <p className="text-xs text-muted-foreground">
              In the last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Overview & Analytics */}
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
        {/* User Growth Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>User Growth</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>
              Monthly user registration vs target
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTarget)"
                  name="Target"
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  name="Actual Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Content Overview */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Content Overview</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>
              Blog posts and FAQs published over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={contentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend 
                  wrapperStyle={{
                    paddingTop: '20px',
                  }}
                  iconType="rect"
                />
                <Bar
                  dataKey="posts"
                  fill="#8b5cf6"
                  radius={[8, 8, 0, 0]}
                  name="Blog Posts"
                />
                <Bar
                  dataKey="faqs"
                  fill="#ec4899"
                  radius={[8, 8, 0, 0]}
                  name="FAQs"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
        {/* Recent Activity */}
        <Card className="col-span-1 xl:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Link href="/admin/activity">
                <Button variant="ghost" size="sm" className="gap-1">
                  View all
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activityData.map((item) => {
                const Icon = item.icon;
                const iconColorClass = {
                  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
                  green: 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400',
                  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
                  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
                }[item.color || 'blue'];

                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg",
                      iconColorClass
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {item.action}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.user && <span className="font-medium text-foreground">{item.user}</span>}
                        {item.title && <span className="font-medium text-foreground">"{item.title}"</span>}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Link href="/admin/blog/new">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Create New Blog Post
              </Button>
            </Link>
            <Link href="/admin/faq">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <HelpCircle className="mr-2 h-4 w-4" />
                Manage FAQs
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Users className="mr-2 h-4 w-4" />
                View All Users
              </Button>
            </Link>
            <Link href="/admin/affiliates">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Handshake className="mr-2 h-4 w-4" />
                Manage Affiliates
              </Button>
            </Link>
            <Link href="/admin/global-settings">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Global Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}