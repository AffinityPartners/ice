'use client'

import Link from 'next/link'

export function TopBar() {
  return (
    <div className="bg-[#245789] text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
        {/* Left side - Contact Info */}
        <div className="flex items-center space-x-6">
          <a 
            href="tel:+18002134803" 
            className="flex items-center space-x-2 hover:text-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>(800) 213-4803</span>
          </a>
          <a 
            href="mailto:support@icetracer.com" 
            className="flex items-center space-x-2 hover:text-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>support@icetracer.com</span>
          </a>
        </div>

        {/* Right side - Auth Links */}
        <div className="flex items-center space-x-4">
          <Link 
            href="/login" 
            className="flex items-center space-x-1 hover:text-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Log In</span>
          </Link>
          <Link 
            href="/register" 
            className="bg-[#CA0015] hover:bg-red-700 px-3 py-1 rounded text-white transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
} 