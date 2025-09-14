'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  refreshThreshold?: number;
  maxPullDistance?: number;
  resistance?: number;
}

/**
 * Pull-to-refresh component that provides native-like refresh functionality.
 * 
 * Features:
 * - Native-like pull-to-refresh behavior on mobile
 * - Smooth animations with visual feedback
 * - Customizable threshold and resistance
 * - Automatic scroll position detection
 * - Loading states with progress indication
 * - Works seamlessly with touch gestures
 * 
 * The component enhances mobile UX by:
 * - Providing familiar refresh interaction pattern
 * - Showing clear visual feedback during pull
 * - Handling edge cases like rapid scrolling
 * - Preventing conflicts with native scroll
 * - Supporting both sync and async refresh operations
 * 
 * @param props Configuration props for pull-to-refresh behavior
 */
export function PullToRefresh({
  onRefresh,
  children,
  disabled = false,
  className,
  refreshThreshold = 80,
  maxPullDistance = 120,
  resistance = 0.6,
}: PullToRefreshProps) {
  const {
    isPulling,
    isRefreshing,
    pullDistance,
    pullProgress,
    canRefresh,
    setContainerRef,
    getRefreshIconRotation,
    getRefreshOpacity,
    shouldShowRefreshIndicator,
  } = usePullToRefresh({
    onRefresh,
    disabled,
    refreshThreshold,
    maxPullDistance,
    resistance,
  });

  return (
    <div
      ref={setContainerRef}
      className={cn('relative overflow-hidden', className)}
    >
      {/* Pull-to-refresh indicator */}
      {shouldShowRefreshIndicator() && (
        <motion.div
          className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center bg-gradient-to-b from-white to-white/90 backdrop-blur-sm"
          style={{
            height: Math.max(pullDistance, isRefreshing ? 60 : 0),
            opacity: getRefreshOpacity(),
          }}
          initial={false}
          animate={{
            height: Math.max(pullDistance, isRefreshing ? 60 : 0),
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        >
          <div className="flex flex-col items-center justify-center py-4">
            {/* Refresh icon */}
            <motion.div
              className={cn(
                'w-6 h-6 mb-2 transition-colors duration-200',
                canRefresh || isRefreshing ? 'text-[#245789]' : 'text-gray-400'
              )}
              animate={{
                rotate: isRefreshing ? 360 : getRefreshIconRotation(),
                scale: isPulling ? 1.1 : 1,
              }}
              transition={{
                rotate: {
                  duration: isRefreshing ? 1 : 0.3,
                  repeat: isRefreshing ? Infinity : 0,
                  ease: isRefreshing ? 'linear' : 'easeOut',
                },
                scale: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                },
              }}
            >
              {isRefreshing ? (
                <svg
                  className="w-full h-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              ) : (
                <svg
                  className="w-full h-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7-7m0 0l-7 7m7-7v18"
                  />
                </svg>
              )}
            </motion.div>

            {/* Status text */}
            <motion.p
              className="text-xs font-medium text-center"
              animate={{
                color: canRefresh || isRefreshing ? '#245789' : '#9CA3AF',
              }}
            >
              {isRefreshing
                ? 'Refreshing...'
                : canRefresh
                ? 'Release to refresh'
                : 'Pull to refresh'
              }
            </motion.p>

            {/* Progress indicator */}
            {(isPulling || isRefreshing) && (
              <motion.div
                className="w-16 h-1 bg-gray-200 rounded-full mt-2 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className={cn(
                    'h-full rounded-full transition-colors duration-200',
                    canRefresh || isRefreshing ? 'bg-[#245789]' : 'bg-gray-400'
                  )}
                  animate={{
                    width: isRefreshing ? '100%' : `${Math.min(pullProgress * 100, 100)}%`,
                  }}
                  transition={{
                    width: {
                      duration: isRefreshing ? 0.3 : 0.1,
                      ease: 'easeOut',
                    },
                  }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        animate={{
          y: isPulling ? pullDistance * 0.5 : 0, // Subtle content movement
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Simplified pull-to-refresh wrapper for common use cases
 */
export function SimplePullToRefresh({
  onRefresh,
  children,
  className,
}: {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <PullToRefresh
      onRefresh={onRefresh}
      className={className}
      refreshThreshold={60}
      maxPullDistance={100}
      resistance={0.7}
    >
      {children}
    </PullToRefresh>
  );
}

/**
 * Pull-to-refresh for page-level refresh
 */
export function PagePullToRefresh({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const handleRefresh = async () => {
    // Reload the current page
    window.location.reload();
  };

  return (
    <SimplePullToRefresh onRefresh={handleRefresh} className={className}>
      {children}
    </SimplePullToRefresh>
  );
}
