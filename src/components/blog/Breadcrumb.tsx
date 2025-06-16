'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.nav 
      className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link 
        href="/" 
        className="text-[#245789] hover:text-[#CA0015] transition-colors font-medium"
      >
        Home
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <svg 
            className="w-4 h-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          
          {index === items.length - 1 ? (
            <span className="text-gray-900 font-medium">{item.label}</span>
          ) : (
            <Link 
              href={item.href}
              className="text-[#245789] hover:text-[#CA0015] transition-colors font-medium"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </motion.nav>
  )
} 