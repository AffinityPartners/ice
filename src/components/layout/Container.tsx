import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

/**
 * Container component that provides consistent responsive width constraints and padding.
 * Implements mobile-first design with standardized breakpoint behavior across the site.
 * Uses consistent horizontal padding that scales appropriately on different screen sizes.
 */
export function Container({ children, size = 'lg', className }: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  }

  return (
    <div className={cn('mx-auto px-[15px] sm:px-6 lg:px-8', sizeClasses[size], className)}>
      {children}
    </div>
  )
} 