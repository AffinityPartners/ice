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
  background?: 'white' | 'gray' | 'blue' | 'transparent'
  animate?: boolean
  id?: string
}

export function Section({
  children,
  className,
  containerSize = 'xl',
  padding = 'lg',
  background = 'transparent',
  animate = false,
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
    blue: 'bg-[#245789]',
    transparent: 'bg-transparent',
  }

  const sectionContent = (
    <section
      id={id}
      className={cn(
        paddingClasses[padding],
        backgroundClasses[background],
        className
      )}
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