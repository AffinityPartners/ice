'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useScrollToTop } from '@/hooks/useSmartScrolling';

interface ScrollToTopProps {
  threshold?: number;
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'minimal';
  showProgress?: boolean;
}

/**
 * Scroll-to-top button component with smooth animations and progress indicator.
 * 
 * Features:
 * - Automatic show/hide based on scroll position
 * - Smooth scroll-to-top animation
 * - Optional progress indicator showing scroll position
 * - Multiple size and variant options
 * - Mobile-optimized touch targets
 * - Hardware-accelerated animations
 * 
 * The component enhances mobile UX by:
 * - Providing easy navigation back to top
 * - Using familiar circular progress pattern
 * - Positioning to avoid navigation conflicts
 * - Smooth entrance/exit animations
 * - Touch-friendly sizing and positioning
 * 
 * @param props Configuration props for the scroll-to-top button
 */
export function ScrollToTop({
  threshold = 400,
  className,
  position = 'bottom-right',
  size = 'md',
  variant = 'primary',
  showProgress = true,
}: ScrollToTopProps) {
  const { scrollToTop, shouldShow, scrollY } = useScrollToTop(threshold);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2',
  };

  const variantClasses = {
    primary: 'bg-[#245789] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25',
    secondary: 'bg-white hover:bg-gray-50 text-[#245789] shadow-lg border border-gray-200',
    minimal: 'bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm',
  };

  // Calculate scroll progress for the progress ring (client-side only)
  const scrollProgress = React.useMemo(() => {
    if (typeof window === 'undefined') return 0;
    
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = docHeight - winHeight - threshold;
    
    return Math.min(Math.max((scrollY - threshold) / maxScroll, 0), 1);
  }, [scrollY, threshold]);
  
  const circumference = 2 * Math.PI * 16; // radius of 16
  const strokeDashoffset = circumference - (scrollProgress * circumference);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.button
          className={cn(
            'fixed z-40 rounded-full transition-all duration-200',
            'flex items-center justify-center touch-manipulation',
            'focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500',
            sizeClasses[size],
            positionClasses[position],
            variantClasses[variant],
            className
          )}
          onClick={scrollToTop}
          initial={{ 
            scale: 0, 
            opacity: 0,
            y: 20,
          }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: 0,
          }}
          exit={{ 
            scale: 0, 
            opacity: 0,
            y: 20,
          }}
          whileHover={{ 
            scale: 1.05,
            y: -2,
          }}
          whileTap={{ 
            scale: 0.95,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          aria-label="Scroll to top"
        >
          {/* Progress ring */}
          {showProgress && (
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 36 36"
            >
              {/* Background circle */}
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.2"
              />
              {/* Progress circle */}
              <motion.circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.1 }}
                opacity="0.8"
              />
            </svg>
          )}

          {/* Arrow icon */}
          <motion.div
            className="relative z-10"
            animate={{ y: [-1, 1, -1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg
              className={cn(
                'transform transition-transform',
                size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/**
 * Minimal scroll-to-top button without progress indicator
 */
export function SimpleScrollToTop({
  threshold = 400,
  className,
}: {
  threshold?: number;
  className?: string;
}) {
  return (
    <ScrollToTop
      threshold={threshold}
      className={className}
      variant="minimal"
      showProgress={false}
      size="md"
    />
  );
}

/**
 * Scroll-to-top button with text label (for desktop)
 */
export function ScrollToTopWithLabel({
  threshold = 400,
  label = 'Back to top',
  className,
}: {
  threshold?: number;
  label?: string;
  className?: string;
}) {
  const { scrollToTop, shouldShow } = useScrollToTop(threshold);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.button
          className={cn(
            'fixed bottom-6 right-6 z-40',
            'flex items-center space-x-2 px-4 py-2',
            'bg-[#245789] hover:bg-blue-700 text-white',
            'rounded-full shadow-lg transition-all duration-200',
            'touch-manipulation focus:outline-none focus:ring-4 focus:ring-blue-500',
            className
          )}
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="text-sm font-medium hidden sm:inline">{label}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
