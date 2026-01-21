'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { motion } from 'framer-motion'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
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
          'inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-[#CA0015] text-white hover:bg-red-700 shadow-lg hover:shadow-xl focus-visible:ring-red-500': variant === 'default',
            'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500': variant === 'destructive',
            'border-2 border-[#245789] bg-transparent text-[#245789] hover:bg-[#245789] hover:text-white': variant === 'outline',
            'bg-[#245789] text-white hover:bg-blue-700 focus-visible:ring-blue-500': variant === 'secondary',
            'hover:bg-gray-100 hover:text-gray-900': variant === 'ghost',
            'text-[#245789] underline-offset-4 hover:underline': variant === 'link',
          },
          {
            'h-9 sm:h-10 px-3 sm:px-4 py-2 text-sm sm:text-base': size === 'default',
            'h-8 sm:h-9 rounded-md px-2 sm:px-3 text-xs': size === 'sm',
            'h-11 sm:h-12 rounded-lg px-6 sm:px-8 text-base sm:text-lg': size === 'lg',
            'h-9 w-9 sm:h-10 sm:w-10': size === 'icon',
          },
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
        {children}
      </motion.button>
    )
  }
)
Button.displayName = 'Button'

export { Button } 