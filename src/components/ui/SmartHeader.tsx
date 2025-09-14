'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useScrollHeader } from '@/hooks/useSmartScrolling';

interface SmartHeaderProps {
  children: React.ReactNode;
  className?: string;
  hideThreshold?: number;
  hideOnScrollDown?: boolean;
  showOnScrollUp?: boolean;
  alwaysShowAtTop?: boolean;
  animationDuration?: number;
  position?: 'sticky' | 'fixed';
}

/**
 * Smart header component that automatically hides/shows based on scroll behavior.
 * 
 * Features:
 * - Automatic hiding when scrolling down
 * - Automatic showing when scrolling up
 * - Smooth animations optimized for mobile
 * - Configurable scroll thresholds
 * - Always visible at page top option
 * - Performance optimized with transform animations
 * 
 * The component enhances mobile UX by:
 * - Maximizing content visibility when scrolling down
 * - Providing easy navigation access when scrolling up
 * - Using hardware-accelerated transforms
 * - Maintaining proper z-index stacking
 * - Supporting both sticky and fixed positioning
 * 
 * @param props Configuration props for the smart header
 */
export function SmartHeader({
  children,
  className,
  hideThreshold = 100,
  hideOnScrollDown = true,
  showOnScrollUp = true,
  alwaysShowAtTop = true,
  animationDuration = 0.3,
  position = 'sticky',
}: SmartHeaderProps) {
  const { shouldHide, isScrollingDown, isScrollingUp, scrollY } = useScrollHeader(hideThreshold);

  // Determine if header should be visible
  const shouldShow = () => {
    // Always show at top if enabled
    if (alwaysShowAtTop && scrollY <= hideThreshold) {
      return true;
    }

    // Hide on scroll down if enabled
    if (hideOnScrollDown && isScrollingDown && scrollY > hideThreshold) {
      return false;
    }

    // Show on scroll up if enabled
    if (showOnScrollUp && isScrollingUp) {
      return true;
    }

    // Default to visible
    return true;
  };

  const isVisible = shouldShow();

  return (
    <motion.header
      className={cn(
        'top-0 left-0 right-0 z-50 transition-all duration-300',
        position === 'sticky' ? 'sticky' : 'fixed',
        className
      )}
      animate={{
        y: isVisible ? 0 : '-100%',
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: animationDuration,
        ease: 'easeInOut',
      }}
      style={{
        // Use transform3d for hardware acceleration
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)',
      }}
    >
      {children}
    </motion.header>
  );
}

/**
 * Smart navigation wrapper that enhances existing navbar with scroll behavior
 */
export function SmartNavWrapper({
  children,
  className,
  hideThreshold = 100,
}: {
  children: React.ReactNode;
  className?: string;
  hideThreshold?: number;
}) {
  return (
    <SmartHeader
      hideThreshold={hideThreshold}
      hideOnScrollDown={true}
      showOnScrollUp={true}
      alwaysShowAtTop={true}
      position="sticky"
      className={className}
    >
      {children}
    </SmartHeader>
  );
}

/**
 * Progress indicator that shows scroll progress in header
 */
export function ScrollProgressBar({
  className,
  color = '#245789',
  height = '2px',
}: {
  className?: string;
  color?: string;
  height?: string;
}) {
  const { scrollY } = useScrollHeader();
  
  // Calculate scroll progress (client-side only)
  const scrollProgress = React.useMemo(() => {
    if (typeof window === 'undefined') return 0;
    
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = scrollY;
    const trackLength = docHeight - winHeight;
    
    return Math.min(scrollTop / trackLength, 1);
  }, [scrollY]);

  return (
    <div
      className={cn('w-full bg-gray-200', className)}
      style={{ height }}
    >
      <motion.div
        className="h-full origin-left"
        style={{ backgroundColor: color }}
        animate={{ scaleX: scrollProgress }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      />
    </div>
  );
}

/**
 * Header with integrated scroll progress
 */
export function SmartHeaderWithProgress({
  children,
  className,
  progressColor = '#245789',
  hideThreshold = 100,
}: {
  children: React.ReactNode;
  className?: string;
  progressColor?: string;
  hideThreshold?: number;
}) {
  return (
    <SmartHeader
      hideThreshold={hideThreshold}
      className={className}
    >
      <div className="relative">
        {children}
        <ScrollProgressBar
          color={progressColor}
          className="absolute bottom-0 left-0 right-0"
        />
      </div>
    </SmartHeader>
  );
}
