'use client'

import Link from 'next/link'
import { FaPhone, FaEnvelope, FaUser, FaUserPlus } from 'react-icons/fa'

/**
 * TopBar component that displays contact information and authentication links.
 * Provides responsive layout that adapts to mobile screens by hiding/showing
 * appropriate elements and adjusting spacing for optimal mobile experience.
 */
export function TopBar() {
  return (
    <div className="bg-[#245789] text-white py-2 px-[15px] sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
        {/* Left side - Contact Info */}
        <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
          <a 
            href="tel:+18002134803" 
            className="flex items-center space-x-1 sm:space-x-2 hover:text-gray-200 transition-colors min-h-[44px] py-2 px-1"
          >
            <FaPhone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 transform scale-x-[-1]" />
            <span>(800) 213-4803</span>
          </a>
          <a 
            href="mailto:support@icetracer.com" 
            className="hidden md:flex items-center space-x-1 sm:space-x-2 hover:text-gray-200 transition-colors min-h-[44px] py-2 px-1"
          >
            <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>support@icetracer.com</span>
          </a>
        </div>

        {/* Right side - Auth Links */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link 
            href="/member-login" 
            className="flex items-center space-x-1 hover:text-gray-200 transition-colors min-h-[44px] py-2 px-1"
          >
            <FaUser className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="sm:inline">Log In</span>
          </Link>
          <Link 
            href="/choose-plan" 
            className="flex items-center space-x-1 bg-[#CA0015] hover:bg-red-700 min-h-[44px] px-3 py-2 sm:px-4 sm:py-2 rounded text-white transition-colors text-xs sm:text-sm font-medium touch-manipulation"
          >
            <FaUserPlus className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>Register</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 