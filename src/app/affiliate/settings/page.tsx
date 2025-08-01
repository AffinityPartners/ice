'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import {
  FaCreditCard,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
  FaExternalLinkAlt,
  FaDollarSign,
  FaBell,
} from 'react-icons/fa';

interface StripeStatus {
  connected: boolean;
  onboardingComplete: boolean;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  disabledReason?: string;
  currentlyDue?: string[];
  pastDue?: string[];
}

export default function AffiliateSettingsPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [stripeStatus, setStripeStatus] = useState<StripeStatus | null>(null);
  const [creatingLink, setCreatingLink] = useState(false);
  const [notifications, setNotifications] = useState({
    notifyOnPayout: true,
    notifyOnReferral: true,
  });

  useEffect(() => {
    fetchStripeStatus();
    
    // Check if returning from Stripe onboarding
    if (searchParams.get('stripe_onboarding') === 'complete') {
      // Re-check status after a delay
      setTimeout(fetchStripeStatus, 2000);
    }
  }, [searchParams]);

  const fetchStripeStatus = async () => {
    try {
      const response = await fetch('/api/affiliate/stripe/status');
      if (response.ok) {
        const data = await response.json();
        setStripeStatus(data);
      }
    } catch (error) {
      console.error('Error fetching Stripe status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStripeOnboarding = async () => {
    setCreatingLink(true);
    try {
      const response = await fetch('/api/affiliate/stripe/onboarding', {
        method: 'POST',
      });
      
      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating onboarding link:', error);
    } finally {
      setCreatingLink(false);
    }
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
    // TODO: Save to backend
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-[#245789]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-gray-600">
            Manage your payment settings and preferences
          </p>
        </div>

        {/* Stripe Connect Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <FaCreditCard className="mr-2 text-[#245789]" />
            Payment Settings
          </h2>

          {!stripeStatus?.connected ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaDollarSign className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Connect Your Stripe Account
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                To receive payouts for your referrals, you need to connect a Stripe account. 
                This will allow us to send your commissions directly to your bank account.
              </p>
              <button
                onClick={handleStripeOnboarding}
                disabled={creatingLink}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#245789] hover:bg-[#1a3e5f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#245789] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creatingLink ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Creating Link...
                  </>
                ) : (
                  <>
                    Connect with Stripe
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Status Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    stripeStatus.connected ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {stripeStatus.connected ? (
                      <FaCheckCircle className="text-green-600" />
                    ) : (
                      <FaExclamationCircle className="text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Account Connected</p>
                    <p className="text-xs text-gray-500">
                      {stripeStatus.connected ? 'Connected' : 'Not connected'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    stripeStatus.onboardingComplete ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    {stripeStatus.onboardingComplete ? (
                      <FaCheckCircle className="text-green-600" />
                    ) : (
                      <FaExclamationCircle className="text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Onboarding</p>
                    <p className="text-xs text-gray-500">
                      {stripeStatus.onboardingComplete ? 'Complete' : 'Incomplete'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    stripeStatus.payoutsEnabled ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {stripeStatus.payoutsEnabled ? (
                      <FaCheckCircle className="text-green-600" />
                    ) : (
                      <FaExclamationCircle className="text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Payouts</p>
                    <p className="text-xs text-gray-500">
                      {stripeStatus.payoutsEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Required */}
              {(!stripeStatus.onboardingComplete || (stripeStatus.currentlyDue && stripeStatus.currentlyDue.length > 0)) && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex">
                    <FaExclamationCircle className="text-yellow-400 mt-0.5" />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-yellow-800">
                        Action Required
                      </h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        {!stripeStatus.onboardingComplete
                          ? 'Please complete your Stripe onboarding to start receiving payouts.'
                          : 'Stripe requires additional information to keep your account active.'}
                      </p>
                      <button
                        onClick={handleStripeOnboarding}
                        className="mt-3 text-sm font-medium text-yellow-800 hover:text-yellow-900"
                      >
                        Continue to Stripe →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Stripe Dashboard Link */}
              {stripeStatus.onboardingComplete && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <a
                    href="#"
                    className="inline-flex items-center text-sm text-[#245789] hover:text-[#1a3e5f] font-medium"
                  >
                    View Stripe Dashboard
                    <FaExternalLinkAlt className="ml-1" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <FaBell className="mr-2 text-[#245789]" />
            Email Notifications
          </h2>

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-gray-900">Payout Notifications</p>
                <p className="text-xs text-gray-500">
                  Receive an email when you receive a payout
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.notifyOnPayout}
                onChange={() => handleNotificationChange('notifyOnPayout')}
                className="h-4 w-4 text-[#245789] focus:ring-[#245789] border-gray-300 rounded"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-gray-900">Referral Notifications</p>
                <p className="text-xs text-gray-500">
                  Receive an email when you get a new referral
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.notifyOnReferral}
                onChange={() => handleNotificationChange('notifyOnReferral')}
                className="h-4 w-4 text-[#245789] focus:ring-[#245789] border-gray-300 rounded"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}