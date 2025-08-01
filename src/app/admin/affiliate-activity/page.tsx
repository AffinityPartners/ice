'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { optimizeGoogleImage } from '@/lib/utils';
import {
  FaUser,
  FaClock,
  FaFilter,
  FaSearch,
  FaHandshake,
  FaEdit,
  FaSignInAlt,
  FaDesktop,
  FaUserEdit,
  FaPalette,
  FaChartLine,
  FaCreditCard,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaEye,
  FaCalendarAlt,
  FaGlobe,
  FaInfoCircle,
  FaHistory,
  FaUserShield,
  FaSpinner,
  FaExclamationTriangle,
  FaTimes,
  FaCog,
  FaUsers
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import ExportButton from '@/components/ui/ExportButton';

interface ActivityLog {
  id: string;
  actorId: string;
  actorRole: string;
  action: string;
  target?: string;
  metadata?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  actor?: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    affiliate?: {
      id: string;
      companyName?: string;
      slug?: string;
    };
  };
}

interface ActivityStats {
  totalActions: number;
  activeAffiliates: number;
  profileUpdates: number;
  pageEdits: number;
  logins: number;
}

const actionIcons: { [key: string]: JSX.Element } = {
  'affiliate_login': <FaSignInAlt className="text-green-500" />,
  'landing_page_viewed': <FaEye className="text-blue-500" />,
  'profile_updated': <FaUserEdit className="text-purple-500" />,
  'page_customized': <FaPalette className="text-pink-500" />,
  'stripe_account_created': <FaCreditCard className="text-green-600" />,
  'stripe_onboarding_started': <FaCreditCard className="text-yellow-500" />,
  'stripe_onboarding_completed': <FaCreditCard className="text-green-500" />,
  'payout_processed': <FaMoneyBillWave className="text-green-500" />,
  'referral_created': <FaHandshake className="text-blue-600" />,
  'referral_converted': <FaExchangeAlt className="text-green-600" />,
};

const actionDescriptions: { [key: string]: string } = {
  'affiliate_login': 'Logged in',
  'landing_page_viewed': 'Landing page viewed',
  'profile_updated': 'Updated profile',
  'page_customized': 'Customized page',
  'stripe_account_created': 'Created Stripe account',
  'stripe_onboarding_started': 'Started Stripe onboarding',
  'stripe_onboarding_completed': 'Completed Stripe onboarding',
  'payout_processed': 'Payout processed',
  'referral_created': 'Created referral',
  'referral_converted': 'Referral converted',
};

export default function AffiliateActivityPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityLog[]>([]);
  const [stats, setStats] = useState<ActivityStats>({
    totalActions: 0,
    activeAffiliates: 0,
    profileUpdates: 0,
    pageEdits: 0,
    logins: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAffiliate, setSelectedAffiliate] = useState<string>('all');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('7days');
  const [uniqueAffiliates, setUniqueAffiliates] = useState<any[]>([]);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.role !== 'ADMIN') {
      router.push('/unauthorized');
      return;
    }
    fetchActivities();
  }, [session, status, dateRange]);

  useEffect(() => {
    filterActivities();
  }, [activities, searchTerm, selectedAffiliate, selectedAction]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/affiliate-activity?range=${dateRange}`);
      const data = await response.json();
      
      if (data.activities) {
        setActivities(data.activities);
        setStats(data.stats || {
          totalActions: data.activities.length,
          activeAffiliates: 0,
          profileUpdates: 0,
          pageEdits: 0,
          logins: 0,
        });
        
        // Extract unique affiliates
        const affiliateMap = new Map();
        data.activities.forEach((activity: ActivityLog) => {
          if (activity.actor?.affiliate) {
            affiliateMap.set(activity.actor.affiliate.id, {
              id: activity.actor.affiliate.id,
              name: activity.actor.affiliate.companyName || activity.actor.name || activity.actor.email,
              image: activity.actor.image,
            });
          }
        });
        setUniqueAffiliates(Array.from(affiliateMap.values()));
      }
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterActivities = () => {
    let filtered = [...activities];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(activity => {
        const searchLower = searchTerm.toLowerCase();
        return (
          activity.actor?.name?.toLowerCase().includes(searchLower) ||
          activity.actor?.email?.toLowerCase().includes(searchLower) ||
          activity.actor?.affiliate?.companyName?.toLowerCase().includes(searchLower) ||
          activity.action.toLowerCase().includes(searchLower) ||
          activity.target?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Affiliate filter
    if (selectedAffiliate !== 'all') {
      filtered = filtered.filter(activity => activity.actor?.affiliate?.id === selectedAffiliate);
    }

    // Action filter
    if (selectedAction !== 'all') {
      filtered = filtered.filter(activity => activity.action === selectedAction);
    }

    setFilteredActivities(filtered);
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - activityDate.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return activityDate.toLocaleDateString();
  };

  const getActionIcon = (action: string) => {
    return actionIcons[action] || <FaHistory className="text-gray-500" />;
  };

  const getActionDescription = (action: string) => {
    return actionDescriptions[action] || action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const prepareDataForExport = (data: ActivityLog[]) => {
    return data.map(activity => ({
      'Date': new Date(activity.createdAt).toLocaleString(),
      'Affiliate': activity.actor?.affiliate?.companyName || activity.actor?.name || 'Unknown',
      'Email': activity.actor?.email || '',
      'Action': getActionDescription(activity.action),
      'Target': activity.target || '',
      'IP Address': activity.ipAddress || '',
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <FaSpinner className="animate-spin text-4xl text-[#245789]" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FaHistory className="mr-3 text-[#245789]" />
            Affiliate Activity
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Monitor all affiliate actions and engagement
          </p>
        </div>
        <ExportButton
          data={filteredActivities}
          filename={`affiliate-activity-${new Date().toISOString().split('T')[0]}`}
          prepareData={prepareDataForExport}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Actions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalActions}</p>
            </div>
            <FaChartLine className="text-3xl text-[#245789]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Affiliates</p>
              <p className="text-2xl font-bold text-gray-900">{uniqueAffiliates.length}</p>
            </div>
            <FaUsers className="text-3xl text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Profile Updates</p>
              <p className="text-2xl font-bold text-gray-900">
                {activities.filter(a => a.action === 'profile_updated').length}
              </p>
            </div>
            <FaUserEdit className="text-3xl text-purple-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Page Edits</p>
              <p className="text-2xl font-bold text-gray-900">
                {activities.filter(a => a.action === 'page_customized').length}
              </p>
            </div>
            <FaPalette className="text-3xl text-pink-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Logins</p>
              <p className="text-2xl font-bold text-gray-900">
                {activities.filter(a => a.action === 'affiliate_login').length}
              </p>
            </div>
            <FaSignInAlt className="text-3xl text-blue-600" />
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
            />
          </div>

          {/* Affiliate Filter */}
          <select
            value={selectedAffiliate}
            onChange={(e) => setSelectedAffiliate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
          >
            <option value="all">All Affiliates</option>
            {uniqueAffiliates.map(affiliate => (
              <option key={affiliate.id} value={affiliate.id}>
                {affiliate.name}
              </option>
            ))}
          </select>

          {/* Action Filter */}
          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
          >
            <option value="all">All Actions</option>
            {Object.keys(actionDescriptions).map(action => (
              <option key={action} value={action}>
                {actionDescriptions[action]}
              </option>
            ))}
          </select>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
          >
            <option value="24hours">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Activity Timeline</h2>
        </div>
        
        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
          {filteredActivities.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FaInfoCircle className="mx-auto text-4xl mb-4" />
              <p>No activities found for the selected filters.</p>
            </div>
          ) : (
            filteredActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getActionIcon(activity.action)}
                  </div>

                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {activity.actor?.image ? (
                      <img
                        src={optimizeGoogleImage(activity.actor.image, 40) || ''}
                        alt={activity.actor.name || 'User'}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#245789] flex items-center justify-center text-white font-medium">
                        {(activity.actor?.name || activity.actor?.email || '?')[0].toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {activity.actor?.affiliate?.companyName || activity.actor?.name || activity.actor?.email || 'Unknown'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {getActionDescription(activity.action)}
                          {activity.target && (
                            <span className="text-gray-500"> • {activity.target}</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        {activity.ipAddress && (
                          <span className="flex items-center">
                            <FaGlobe className="mr-1" />
                            {activity.ipAddress}
                          </span>
                        )}
                        <span className="flex items-center">
                          <FaClock className="mr-1" />
                          {formatTimeAgo(activity.createdAt)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Metadata */}
                    {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        {Object.entries(activity.metadata).map(([key, value]) => (
                          <span key={key} className="mr-3">
                            {key}: <span className="font-medium">{String(value)}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}