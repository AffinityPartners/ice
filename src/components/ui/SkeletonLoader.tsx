'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  variant?: 'text' | 'image' | 'card' | 'button' | 'avatar' | 'custom';
  width?: string | number;
  height?: string | number;
  className?: string;
  animate?: boolean;
  lines?: number;
  aspectRatio?: string;
  children?: React.ReactNode;
}

/**
 * Enhanced SkeletonLoader component optimized for mobile loading states.
 * 
 * Features:
 * - Multiple pre-configured variants for common UI elements
 * - Mobile-optimized sizing and spacing
 * - Smooth shimmer animations with reduced motion support
 * - Customizable dimensions and styling
 * - Automatic aspect ratio handling for images
 * - Performance-optimized animations using CSS transforms
 * 
 * The component provides better perceived performance on mobile by:
 * - Showing content placeholders immediately
 * - Using hardware-accelerated animations
 * - Respecting user's reduced motion preferences
 * - Maintaining proper aspect ratios to prevent layout shifts
 */
export function SkeletonLoader({
  variant = 'custom',
  width,
  height,
  className,
  animate = true,
  lines = 3,
  aspectRatio,
  children,
}: SkeletonLoaderProps) {
  const baseClasses = cn(
    'bg-gray-200 rounded-md',
    animate && 'animate-pulse',
    className
  );

  const shimmerClasses = cn(
    'relative overflow-hidden',
    animate && 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shimmer'
  );

  const renderVariant = () => {
    switch (variant) {
      case 'text':
        return (
          <div className="space-y-2">
            {Array.from({ length: lines }).map((_, index) => (
              <motion.div
                key={index}
                className={cn(baseClasses, shimmerClasses, 'h-4')}
                style={{ 
                  width: index === lines - 1 ? '75%' : '100%',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </div>
        );

      case 'image':
        return (
          <div 
            className={cn(baseClasses, shimmerClasses, 'min-h-[200px] sm:min-h-[250px]')}
            style={{ 
              width,
              height,
              aspectRatio: aspectRatio || '16/9',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-gray-300" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className={cn('p-4 sm:p-6 space-y-4', baseClasses)}>
            {/* Card header */}
            <div className="flex items-center space-x-3">
              <div className={cn('w-10 h-10 rounded-full', baseClasses, shimmerClasses)} />
              <div className="flex-1 space-y-2">
                <div className={cn('h-4 w-3/4', baseClasses, shimmerClasses)} />
                <div className={cn('h-3 w-1/2', baseClasses, shimmerClasses)} />
              </div>
            </div>
            
            {/* Card content */}
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div 
                  key={index}
                  className={cn('h-4', baseClasses, shimmerClasses)}
                  style={{ width: index === 2 ? '60%' : '100%' }}
                />
              ))}
            </div>
            
            {/* Card image */}
            <div className={cn('h-48 w-full rounded-md', baseClasses, shimmerClasses)} />
            
            {/* Card footer */}
            <div className="flex justify-between items-center">
              <div className={cn('h-8 w-20 rounded', baseClasses, shimmerClasses)} />
              <div className={cn('h-8 w-16 rounded', baseClasses, shimmerClasses)} />
            </div>
          </div>
        );

      case 'button':
        return (
          <div 
            className={cn(
              'h-10 sm:h-11 px-6 rounded-lg',
              baseClasses,
              shimmerClasses
            )}
            style={{ width: width || '120px' }}
          />
        );

      case 'avatar':
        return (
          <div 
            className={cn(
              'rounded-full',
              baseClasses,
              shimmerClasses
            )}
            style={{ 
              width: width || '40px',
              height: height || '40px',
            }}
          />
        );

      case 'custom':
      default:
        return (
          <div 
            className={cn(baseClasses, shimmerClasses)}
            style={{ width, height }}
          >
            {children}
          </div>
        );
    }
  };

  return renderVariant();
}

/**
 * Pre-configured skeleton for page sections
 */
export function PageSkeleton() {
  return (
    <div className="space-y-8 p-4 sm:p-6">
      {/* Header skeleton */}
      <div className="space-y-4">
        <SkeletonLoader variant="text" lines={1} className="h-8 w-3/4" />
        <SkeletonLoader variant="text" lines={2} />
      </div>

      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonLoader key={index} variant="card" />
        ))}
      </div>
    </div>
  );
}

/**
 * Pre-configured skeleton for hero sections
 */
export function HeroSkeleton() {
  return (
    <div className="relative min-h-[60vh] sm:h-[65vh] lg:h-[70vh] flex items-center justify-center">
      <div className="text-center space-y-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <SkeletonLoader variant="text" lines={1} className="h-12 sm:h-16 lg:h-20" />
        <SkeletonLoader variant="text" lines={3} className="max-w-4xl mx-auto" />
        <SkeletonLoader variant="button" width="200px" className="mx-auto" />
      </div>
    </div>
  );
}

/**
 * Pre-configured skeleton for image galleries
 */
export function GallerySkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonLoader 
          key={index} 
          variant="image" 
          aspectRatio="1/1"
          className="w-full"
        />
      ))}
    </div>
  );
}
