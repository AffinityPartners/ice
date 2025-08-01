'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  FaChartLine,
  FaUser,
  FaBullhorn,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaLink,
  FaDollarSign,
} from 'react-icons/fa';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function AffiliateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const navigation: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/affiliate/dashboard',
      icon: <FaChartLine className="w-5 h-5" />,
    },
    {
      name: 'Campaigns',
      href: '/affiliate/campaigns',
      icon: <FaBullhorn className="w-5 h-5" />,
    },
    {
      name: 'Referral Links',
      href: '/affiliate/links',
      icon: <FaLink className="w-5 h-5" />,
    },
    {
      name: 'Earnings',
      href: '/affiliate/earnings',
      icon: <FaDollarSign className="w-5 h-5" />,
    },
    {
      name: 'Profile',
      href: '/affiliate/profile',
      icon: <FaUser className="w-5 h-5" />,
    },
    {
      name: 'Settings',
      href: '/affiliate/settings',
      icon: <FaCog className="w-5 h-5" />,
    },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-300 bg-gradient-to-r from-gray-50 to-white">
          <Link href="/affiliate/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-[#235486]">ICE Affiliate</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-700 hover:text-gray-900"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 mb-2 text-sm font-semibold rounded-lg transition-all ${
                isActive(item.href)
                  ? 'bg-[#235486] text-white shadow-md'
                  : 'bg-[#235486] text-white hover:bg-[#235486]/90 hover:shadow-sm'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-300 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 w-10 h-10 bg-[#235486] rounded-full flex items-center justify-center text-white font-medium">
              {session?.user?.name?.[0] || 'A'}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session?.user?.name || 'Affiliate'}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {session?.user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200 hover:shadow-sm transition-all"
          >
            <FaSignOutAlt className="mr-2" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaBars className="w-6 h-6" />
          </button>
          <span className="text-lg font-semibold text-[#235486]">ICE Affiliate</span>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}