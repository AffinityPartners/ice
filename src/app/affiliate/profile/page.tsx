'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaPalette,
  FaImage,
  FaSave,
  FaSpinner,
  FaCheckCircle,
} from 'react-icons/fa';

interface AffiliateProfile {
  id: string;
  slug: string;
  companyName: string;
  firstName: string;
  lastName: string;
  contactEmail: string;
  phoneNumber: string;
  website: string;
  bio: string;
  logoUrl: string;
  primaryColor: string;
  heroHeading: string;
  heroSubtext: string;
  ctaText: string;
  ctaButtonLink: string;
}

export default function AffiliateProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<Partial<AffiliateProfile>>({
    primaryColor: '#245789',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/affiliate/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const response = await fetch('/api/affiliate/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
          <h1 className="text-3xl font-bold text-gray-900">Affiliate Profile</h1>
          <p className="mt-1 text-gray-600">
            Manage your affiliate information and customize your landing page
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <FaUser className="mr-2 text-[#245789]" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profile.firstName || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profile.lastName || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  <FaEnvelope className="inline mr-1" />
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={profile.contactEmail || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  <FaPhone className="inline mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={profile.phoneNumber || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <FaBuilding className="mr-2 text-[#245789]" />
              Business Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={profile.companyName || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                  <FaGlobe className="inline mr-1" />
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={profile.website || ''}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={profile.bio || ''}
                  onChange={handleChange}
                  placeholder="Tell us about your business..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Landing Page Customization */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <FaPalette className="mr-2 text-[#245789]" />
              Landing Page Customization
            </h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="heroHeading" className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Heading
                </label>
                <input
                  type="text"
                  id="heroHeading"
                  name="heroHeading"
                  value={profile.heroHeading || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="heroSubtext" className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Subtext
                </label>
                <input
                  type="text"
                  id="heroSubtext"
                  name="heroSubtext"
                  value={profile.heroSubtext || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="ctaText" className="block text-sm font-medium text-gray-700 mb-2">
                  Call-to-Action Text
                </label>
                <input
                  type="text"
                  id="ctaText"
                  name="ctaText"
                  value={profile.ctaText || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    id="primaryColor"
                    name="primaryColor"
                    value={profile.primaryColor || '#245789'}
                    onChange={handleChange}
                    className="h-10 w-20"
                  />
                  <span className="text-sm text-gray-500">{profile.primaryColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Link */}
          {profile.slug && (
            <div className="bg-[#245789]/10 rounded-xl p-4 border border-[#245789]/20">
              <p className="text-sm font-medium text-gray-700 mb-2">Your Landing Page URL:</p>
              <a
                href={`/affiliate/${profile.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#245789] hover:text-[#1a3e5f] font-mono text-sm break-all"
              >
                {typeof window !== 'undefined' && `${window.location.origin}/affiliate/${profile.slug}`}
              </a>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4">
            {saved && (
              <div className="flex items-center text-green-600">
                <FaCheckCircle className="mr-2" />
                <span className="text-sm font-medium">Profile saved successfully!</span>
              </div>
            )}
            
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#245789] hover:bg-[#1a3e5f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#245789] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Save Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}