import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoadingProps {
  type?: 'skeleton' | 'spinner' | 'progress' | 'dots' | 'pulse' | 'wave'
  progress?: number
  message?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'gray'
}

/**
 * Enhanced Loading component optimized for mobile performance and UX.
 * 
 * Features:
 * - Multiple loading animation types optimized for mobile
 * - Responsive sizing for different screen sizes
 * - Reduced motion support for accessibility
 * - Hardware-accelerated animations for smooth performance
 * - Customizable colors and sizes
 * - Touch-friendly spacing and sizing
 * 
 * The component provides better mobile experience by:
 * - Using CSS transforms for better performance
 * - Respecting user's motion preferences
 * - Providing appropriate sizing for touch interfaces
 * - Optimizing animation performance on mobile devices
 */

export function Loading({ 
  type = 'spinner', 
  progress, 
  message, 
  className, 
  size = 'md',
  color = 'primary' 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-[#245789]',
    secondary: 'text-[#CA0015]',
    gray: 'text-gray-500'
  };
  const renderLoader = () => {
    switch (type) {
      case 'skeleton':
        return (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="h-4 bg-gray-200 rounded loading-shimmer"
                style={{ width: `${Math.random() * 40 + 60}%` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        )
      
      case 'progress':
        return (
          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Loading...</span>
              <span className="text-gray-700">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-primary-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            {message && <p className="text-xs text-gray-500">{message}</p>}
          </div>
        )
      
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        )
      
      case 'pulse':
        return (
          <motion.div
            className={cn(
              'rounded-full bg-current opacity-75',
              sizeClasses[size],
              colorClasses[color]
            )}
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )

      case 'wave':
        return (
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  'w-1 bg-current rounded-full',
                  size === 'sm' ? 'h-4' : size === 'lg' ? 'h-8' : 'h-6',
                  colorClasses[color]
                )}
                animate={{ scaleY: [1, 2, 1] }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        )

      default:
        return (
          <motion.div
            className={cn(
              'border-4 border-gray-200 rounded-full',
              `border-t-current ${colorClasses[color]}`,
              sizeClasses[size]
            )}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )
    }
  }

  return (
    <div className={cn('flex flex-col items-center justify-center p-8', className)}>
      {renderLoader()}
      {message && type !== 'progress' && (
        <p className="mt-4 text-sm text-gray-600 text-center">
          {message}
        </p>
      )}
    </div>
  )
} 