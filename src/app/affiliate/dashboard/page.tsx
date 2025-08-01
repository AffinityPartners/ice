'use client';

import { useEffect, useState } from 'react';
import {
  FaChartLine,
  FaUsers,
  FaDollarSign,
  FaPercentage,
  FaLink,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaArrowUp,
  FaArrowDown,
  FaChartBar,
  FaCoins,
  FaTrophy,
  FaHandshake,
  FaDownload,
  FaMapMarkedAlt,
  FaUserTie,
  FaCreditCard,
  FaExternalLinkAlt,
  FaCopy,
  FaBullseye,
  FaRocket,
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface AffiliateStats {
  totalEarnings: number;
  monthlyEarnings: number;
  conversionRate: string;
  totalReferrals: number;
  convertedReferrals: number;
  pendingCommission: number;
  averageCommission: number;
  pageViews: number;
}

// Mock data for charts
const earningsData = [
  { month: 'Jan', earnings: 1200, referrals: 8 },
  { month: 'Feb', earnings: 1800, referrals: 12 },
  { month: 'Mar', earnings: 1500, referrals: 10 },
  { month: 'Apr', earnings: 2400, referrals: 16 },
  { month: 'May', earnings: 2100, referrals: 14 },
  { month: 'Jun', earnings: 2700, referrals: 18 },
];

const conversionData = [
  { name: 'Converted', value: 23, color: '#10B981' },
  { name: 'Pending', value: 12, color: '#F59E0B' },
  { name: 'Lost', value: 8, color: '#CA0015' },
];

const topSources = [
  { source: 'Blog Posts', referrals: 45, revenue: 6750 },
  { source: 'Social Media', referrals: 32, revenue: 4800 },
  { source: 'Email Campaign', referrals: 28, revenue: 4200 },
  { source: 'Direct Links', referrals: 18, revenue: 2700 },
];

export default function AffiliateDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<AffiliateStats>({
    totalEarnings: 0,
    monthlyEarnings: 0,
    conversionRate: '0',
    totalReferrals: 0,
    convertedReferrals: 0,
    pendingCommission: 0,
    averageCommission: 0,
    pageViews: 0,
  });

  useEffect(() => {
    // Fetch affiliate stats
    fetch('/api/affiliate/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
      })
      .catch(() => {
        // Set mock data if API fails
        setStats({
          totalEarnings: 12450,
          monthlyEarnings: 2700,
          conversionRate: '53.5',
          totalReferrals: 43,
          convertedReferrals: 23,
          pendingCommission: 1350,
          averageCommission: 150,
          pageViews: 1243,
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {session?.user?.name || 'Partner'}!
              </h1>
              <p className="mt-1 text-gray-600">
                Here's how your ICE Tracer affiliate program is performing
              </p>
            </div>
            <Link
              href="/affiliate/campaigns"
              className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-md shadow-md text-sm font-semibold text-white bg-[#235486] hover:bg-[#235486]/90 hover:shadow-lg transition-all"
            >
              <FaRocket className="mr-2" />
              New Campaign
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.totalEarnings.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <FaArrowUp className="mr-1" />
                  +12.5% from last month
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FaDollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
                <p className="text-sm text-[#245789] flex items-center mt-1">
                  <FaArrowUp className="mr-1" />
                  +5.3% improvement
                </p>
              </div>
              <div className="p-3 bg-[#245789]/10 rounded-lg">
                <FaPercentage className="h-6 w-6 text-[#245789]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700">Total Referrals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalReferrals}</p>
                <p className="text-sm text-gray-600 font-medium mt-1">
                  {stats.convertedReferrals} converted
                </p>
              </div>
              <div className="p-3 bg-[#CA0015]/10 rounded-lg">
                <FaUsers className="h-6 w-6 text-[#CA0015]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700">Page Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pageViews.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 font-medium mt-1">
                  This month
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaEye className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Earnings Chart */}
          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FaChartLine className="mr-2 text-[#245789]" />
              Earnings Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: any) => [`$${value}`, 'Earnings']}
                  contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#245789"
                  fill="#245789"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Conversion Breakdown */}
          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FaChartBar className="mr-2 text-[#245789]" />
              Referral Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={conversionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/affiliate/profile"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaUserTie className="h-8 w-8 text-[#245789] mr-3" />
              <div>
                <p className="font-medium text-gray-900">Edit Profile</p>
                <p className="text-sm text-gray-500">Update your business info</p>
              </div>
            </Link>
            
            <Link
              href="/affiliate/campaigns"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaLink className="h-8 w-8 text-[#CA0015] mr-3" />
              <div>
                <p className="font-medium text-gray-900">Get Links</p>
                <p className="text-sm text-gray-500">Generate tracking links</p>
              </div>
            </Link>
            
            <a
              href="https://stripe.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaCreditCard className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">View Payouts</p>
                <p className="text-sm text-gray-500">Check payment status</p>
              </div>
            </a>
          </div>
        </div>

        {/* Top Sources Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Referral Sources</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Referrals
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topSources.map((source) => (
                  <tr key={source.source}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {source.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {source.referrals}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${source.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}