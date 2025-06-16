import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoadingProps {
  type?: 'skeleton' | 'spinner' | 'progress' | 'dots'
  progress?: number
  message?: string
  className?: string
}

export function Loading({ type = 'spinner', progress, message, className }: LoadingProps) {
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
      
      default:
        return (
          <motion.div
            className="w-8 h-8 border-4 border-gray-200 border-t-primary-500 rounded-full"
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