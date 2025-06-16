'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/ICE-Tracer-Logo.png"
                alt="ICE Tracer Logo"
                width={200}
                height={60}
                priority
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#features" 
              className="text-gray-700 dark:text-gray-300 hover:text-[#245789] dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              Features
            </Link>
            <Link 
              href="#plans" 
              className="text-gray-700 dark:text-gray-300 hover:text-[#245789] dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              Plans
            </Link>
            <ThemeToggle />
            <Link 
              href="/access-medical-profile" 
              className="bg-[#CA0015] hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
              ACCESS MEDICAL PROFILE
            </Link>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-[#245789] dark:hover:text-blue-400 focus:outline-none p-2"
              aria-label="Toggle navigation menu"
            >
              <motion.svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link 
                    href="#features" 
                    className="block text-gray-700 dark:text-gray-300 hover:text-[#245789] dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <Link 
                    href="#plans" 
                    className="block text-gray-700 dark:text-gray-300 hover:text-[#245789] dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Plans
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link 
                    href="/access-medical-profile" 
                    className="block bg-[#CA0015] hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium transition-colors text-center mt-4 shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ACCESS MEDICAL PROFILE
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
} 