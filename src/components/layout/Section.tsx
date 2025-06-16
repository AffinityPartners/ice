'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Container } from './Container'

interface SectionProps {
  children: ReactNode
  className?: string
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'white' | 'gray' | 'gray-light' | 'blue' | 'blue-light' | 'blue-soft' | 'transparent'
  animate?: boolean
  id?: string
  separator?: boolean
}

export function Section({
  children,
  className,
  containerSize = 'xl',
  padding = 'lg',
  background = 'transparent',
  animate = false,
  separator = false,
  id,
}: SectionProps) {
  const paddingClasses = {
    none: '',
    sm: 'py-8 px-4',
    md: 'py-12 px-4',
    lg: 'py-20 px-4',
    xl: 'py-24 px-4',
  }

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    'gray-light': 'bg-[#f9f9f9]',
    blue: 'bg-[#245789]',
    'blue-light': 'bg-blue-50',
    'blue-soft': 'bg-gradient-to-br from-blue-50 to-slate-50',
    transparent: 'bg-transparent',
  }

  const sectionClasses = cn(
    paddingClasses[padding],
    backgroundClasses[background],
    {
      'border-t border-gray-100': separator && (background === 'white' || background === 'gray-light'),
      'border-t border-blue-100': separator && (background === 'blue-light' || background === 'blue-soft'),
      'shadow-sm': background === 'white' || background === 'gray-light',
      'shadow-md': background === 'blue-light' || background === 'blue-soft',
    },
    className
  )

  const sectionContent = (
    <section
      id={id}
      className={sectionClasses}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        {sectionContent}
      </motion.div>
    )
  }

  return sectionContent
} 