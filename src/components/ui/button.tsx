'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation',
  {
    variants: {
      variant: {
        default: 'bg-[#CA0015] text-white hover:bg-red-700 shadow-lg hover:shadow-xl focus-visible:ring-red-500',
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
        outline: 'border-2 border-[#245789] bg-transparent text-[#245789] hover:bg-[#245789] hover:text-white',
        secondary: 'bg-[#245789] text-white hover:bg-blue-700 focus-visible:ring-blue-500',
        ghost: 'hover:bg-gray-100 hover:text-gray-900',
        link: 'text-[#245789] underline-offset-4 hover:underline',
        action: 'bg-[#245789] text-white hover:bg-blue-700 focus-visible:ring-blue-500',
      },
      size: {
        default: 'h-9 sm:h-10 px-3 sm:px-4 py-2 text-sm sm:text-base',
        sm: 'h-8 sm:h-9 rounded-md px-2 sm:px-3 text-xs',
        lg: 'h-11 sm:h-12 rounded-lg px-6 sm:px-8 text-base sm:text-lg',
        icon: 'h-9 w-9 sm:h-10 sm:w-10',
        touch: 'min-h-[44px] min-w-[44px] px-4 py-2 text-sm sm:text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

/**
 * Button component with enhanced mobile touch support and accessibility.
 * 
 * Features:
 * - Mobile-optimized touch targets with 44px minimum size ('touch' variant)
 * - Smooth animations with Framer Motion for better user feedback
 * - Proper focus management for screen readers and keyboard navigation
 * - Loading states with spinner animation
 * - Responsive sizing that adapts to screen size
 * 
 * The 'touch' size variant ensures WCAG 2.1 AA compliance by providing
 * minimum 44x44px touch targets for improved mobile accessibility.
 */
export interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, loading = false, children, ...props }, ref) => {
    if (asChild) {
      return <Slot className={className} {...props}>{children}</Slot>
    }

    return (
      <motion.button
        className={cn(
          'relative overflow-hidden',
          buttonVariants({ variant, size }),
          className
        )}
        whileHover={{ scale: variant !== 'link' ? 1.02 : 1 }}
        whileTap={{ scale: variant !== 'link' ? 0.98 : 1 }}
        ref={ref}
        disabled={loading || props.disabled}
        {...(props as any)}
      >
        {loading ? (
          <motion.div
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : null}
        
        <span className="relative z-10">{children}</span>
      </motion.button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }