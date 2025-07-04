'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EmergencyMedicalProfileModal from '../ui/EmergencyMedicalProfileModal'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const openModal = () => {
    console.log('Opening modal...')
    setIsModalOpen(true)
    setIsMenuOpen(false) // Close mobile menu if open
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
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
              href="/about" 
              className="text-gray-700 hover:text-[#245789] px-3 py-2 text-sm font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-[#245789] px-3 py-2 text-sm font-medium transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="#features" 
              className="text-gray-700 hover:text-[#245789] px-3 py-2 text-sm font-medium transition-colors"
            >
              Features
            </Link>
            <Link 
              href="#plans" 
              className="text-gray-700 hover:text-[#245789] px-3 py-2 text-sm font-medium transition-colors"
            >
              Plans
            </Link>
            <Link 
              href="/faq" 
              className="text-gray-700 hover:text-[#245789] px-3 py-2 text-sm font-medium transition-colors"
            >
              FAQ
            </Link>
            <button 
              onClick={openModal}
              className="bg-[#CA0015] hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
              ACCESS MEDICAL PROFILE
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-[#245789] focus:outline-none p-2"
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
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 bg-white">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link 
                    href="/about" 
                    className="block text-gray-700 hover:text-[#245789] hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.125 }}
                >
                  <Link 
                    href="/blog" 
                    className="block text-gray-700 hover:text-[#245789] hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <Link 
                    href="#features" 
                    className="block text-gray-700 hover:text-[#245789] hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.175 }}
                >
                  <Link 
                    href="#plans" 
                    className="block text-gray-700 hover:text-[#245789] hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
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
                    href="/faq" 
                    className="block text-gray-700 hover:text-[#245789] hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.225 }}
                >
                  <button 
                    onClick={openModal}
                    className="block bg-[#CA0015] hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium transition-colors text-center mt-4 shadow-md w-full"
                  >
                    ACCESS MEDICAL PROFILE
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Emergency Medical Profile Modal */}
      <EmergencyMedicalProfileModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </nav>
  )
} 