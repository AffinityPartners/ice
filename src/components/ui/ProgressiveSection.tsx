'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { SkeletonLoader } from './SkeletonLoader';

interface ProgressiveSectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  animateOnLoad?: boolean;
  skeletonVariant?: 'text' | 'image' | 'card' | 'custom';
  skeletonLines?: number;
}

/**
 * ProgressiveSection component that loads content when it comes into view.
 * 
 * Optimized for mobile performance by:
 * - Only rendering content when needed (intersection observer)
 * - Providing skeleton loading states for better perceived performance
 * - Supporting custom loading delays for staggered animations
 * - Using hardware-accelerated animations
 * - Respecting reduced motion preferences
 * 
 * This component significantly improves mobile performance by reducing
 * initial render time and only loading content as users scroll.
 */
export function ProgressiveSection({
  children,
  fallback,
  className,
  threshold = 0.1,
  rootMargin = '100px',
  delay = 0,
  animateOnLoad = true,
  skeletonVariant = 'card',
  skeletonLines = 3,
}: ProgressiveSectionProps) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { ref, isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true,
  });

  // Trigger loading when intersecting
  React.useEffect(() => {
    if (isIntersecting && !hasLoaded) {
      const timer = setTimeout(() => {
        setHasLoaded(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isIntersecting, hasLoaded, delay]);

  const shouldShowContent = hasIntersected && hasLoaded;
  const shouldShowSkeleton = hasIntersected && !hasLoaded;

  return (
    <div ref={ref} className={cn('min-h-[100px]', className)}>
      {shouldShowContent && (
        <motion.div
          initial={animateOnLoad ? { opacity: 0, y: 20 } : false}
          animate={animateOnLoad ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
      
      {shouldShowSkeleton && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {fallback || (
            <SkeletonLoader 
              variant={skeletonVariant}
              lines={skeletonLines}
              className="w-full"
            />
          )}
        </motion.div>
      )}
    </div>
  );
}

/**
 * Progressive loading wrapper for image galleries
 */
export function ProgressiveImageGrid({
  children,
  columns = 3,
  gap = 4,
  className,
}: {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
}) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }[columns] || 'grid-cols-3';

  const gapClass = `gap-${gap}`;

  return (
    <ProgressiveSection
      className={cn('grid', gridCols, gapClass, className)}
      skeletonVariant="image"
      fallback={
        <div className={cn('grid', gridCols, gapClass)}>
          {Array.from({ length: columns * 2 }).map((_, index) => (
            <SkeletonLoader key={index} variant="image" aspectRatio="1/1" />
          ))}
        </div>
      }
    >
      {children}
    </ProgressiveSection>
  );
}

/**
 * Progressive loading wrapper for text content
 */
export function ProgressiveTextSection({
  children,
  className,
  lines = 5,
}: {
  children: React.ReactNode;
  className?: string;
  lines?: number;
}) {
  return (
    <ProgressiveSection
      className={className}
      skeletonVariant="text"
      skeletonLines={lines}
      animateOnLoad={true}
    >
      {children}
    </ProgressiveSection>
  );
}

/**
 * Progressive loading wrapper for card layouts
 */
export function ProgressiveCardGrid({
  children,
  columns = 3,
  className,
}: {
  children: React.ReactNode;
  columns?: number;
  className?: string;
}) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }[columns] || 'grid-cols-3';

  return (
    <ProgressiveSection
      className={cn('grid', gridCols, 'gap-6', className)}
      skeletonVariant="card"
      fallback={
        <div className={cn('grid', gridCols, 'gap-6')}>
          {Array.from({ length: columns }).map((_, index) => (
            <SkeletonLoader key={index} variant="card" />
          ))}
        </div>
      }
    >
      {children}
    </ProgressiveSection>
  );
}
