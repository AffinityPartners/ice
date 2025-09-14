import { useState, useRef, useCallback, useEffect } from 'react';

interface PullToRefreshOptions {
  refreshThreshold?: number;
  maxPullDistance?: number;
  resistance?: number;
  onRefresh?: () => Promise<void> | void;
  disabled?: boolean;
}

interface PullToRefreshState {
  isPulling: boolean;
  isRefreshing: boolean;
  pullDistance: number;
  pullProgress: number; // 0 to 1
  canRefresh: boolean;
}

/**
 * Pull-to-refresh hook optimized for mobile web applications.
 * 
 * Features:
 * - Native-like pull-to-refresh behavior
 * - Customizable threshold and resistance
 * - Smooth animations with progress tracking
 * - Automatic scroll position detection
 * - Memory-efficient touch handling
 * - Support for async refresh operations
 * 
 * The hook provides a mobile-first refresh experience by:
 * - Only activating when scrolled to top
 * - Providing visual feedback during pull
 * - Handling edge cases like rapid scrolling
 * - Preventing conflicts with native scroll behavior
 * 
 * @param options Configuration options for pull-to-refresh behavior
 * @returns State and handlers for implementing pull-to-refresh UI
 */
export function usePullToRefresh({
  refreshThreshold = 80,
  maxPullDistance = 120,
  resistance = 0.6,
  onRefresh,
  disabled = false,
}: PullToRefreshOptions = {}) {
  const [state, setState] = useState<PullToRefreshState>({
    isPulling: false,
    isRefreshing: false,
    pullDistance: 0,
    pullProgress: 0,
    canRefresh: false,
  });

  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const containerRef = useRef<HTMLElement | null>(null);

  // Check if element is scrolled to top
  const isScrolledToTop = useCallback(() => {
    if (!containerRef.current) {
      return window.scrollY === 0;
    }
    return containerRef.current.scrollTop === 0;
  }, []);

  // Calculate pull distance with resistance
  const calculatePullDistance = useCallback((rawDistance: number): number => {
    if (rawDistance <= 0) return 0;
    
    // Apply resistance curve - more resistance as pull distance increases
    const resistanceMultiplier = Math.max(0.1, resistance - (rawDistance / maxPullDistance) * 0.4);
    const distance = Math.min(rawDistance * resistanceMultiplier, maxPullDistance);
    
    return distance;
  }, [maxPullDistance, resistance]);

  // Update state based on pull distance
  const updatePullState = useCallback((distance: number) => {
    const pullProgress = Math.min(distance / refreshThreshold, 1);
    const canRefresh = distance >= refreshThreshold;

    setState(prev => ({
      ...prev,
      pullDistance: distance,
      pullProgress,
      canRefresh,
      isPulling: distance > 0,
    }));
  }, [refreshThreshold]);

  // Handle touch start
  const handleTouchStart = useCallback((e: Event) => {
    const touchEvent = e as TouchEvent;
    if (disabled || !isScrolledToTop()) return;

    startY.current = touchEvent.touches[0].clientY;
    currentY.current = startY.current;
    isDragging.current = true;
  }, [disabled, isScrolledToTop]);

  // Handle touch move
  const handleTouchMove = useCallback((e: Event) => {
    const touchEvent = e as TouchEvent;
    if (disabled || !isDragging.current) return;

    currentY.current = touchEvent.touches[0].clientY;
    const rawDistance = currentY.current - startY.current;

    // Only handle downward pulls when at top
    if (rawDistance > 0 && isScrolledToTop()) {
      e.preventDefault(); // Prevent native scroll behavior
      
      const pullDistance = calculatePullDistance(rawDistance);
      updatePullState(pullDistance);
    } else if (rawDistance <= 0) {
      // Reset if pulling up or scrolling
      updatePullState(0);
    }
  }, [disabled, calculatePullDistance, updatePullState, isScrolledToTop]);

  // Handle touch end
  const handleTouchEnd = useCallback(async () => {
    if (disabled || !isDragging.current) return;

    isDragging.current = false;

    if (state.canRefresh && onRefresh) {
      setState(prev => ({
        ...prev,
        isRefreshing: true,
        isPulling: false,
      }));

      try {
        await onRefresh();
      } catch (error) {
        console.error('Pull to refresh error:', error);
      } finally {
        setState(prev => ({
          ...prev,
          isRefreshing: false,
          pullDistance: 0,
          pullProgress: 0,
          canRefresh: false,
        }));
      }
    } else {
      // Animate back to original position
      setState(prev => ({
        ...prev,
        isPulling: false,
        pullDistance: 0,
        pullProgress: 0,
        canRefresh: false,
      }));
    }
  }, [disabled, state.canRefresh, onRefresh]);

  // Set up touch event listeners
  useEffect(() => {
    const element = containerRef.current || document;

    if (element) {
      element.addEventListener('touchstart', handleTouchStart, { passive: false });
      element.addEventListener('touchmove', handleTouchMove, { passive: false });
      element.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Ref setter for container element
  const setContainerRef = useCallback((element: HTMLElement | null) => {
    containerRef.current = element;
  }, []);

  return {
    ...state,
    setContainerRef,
    // Helper methods for UI implementation
    getRefreshIconRotation: () => state.pullProgress * 180,
    getRefreshOpacity: () => Math.min(state.pullProgress * 1.5, 1),
    shouldShowRefreshIndicator: () => state.isPulling || state.isRefreshing,
  };
}

/**
 * Simplified pull-to-refresh hook for basic refresh functionality.
 * Pre-configured with sensible defaults for most use cases.
 */
export function useSimplePullToRefresh(onRefresh: () => Promise<void> | void) {
  return usePullToRefresh({
    refreshThreshold: 60,
    maxPullDistance: 100,
    resistance: 0.7,
    onRefresh,
  });
}
