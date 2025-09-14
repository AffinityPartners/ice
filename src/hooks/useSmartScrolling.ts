import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollState {
  scrollY: number;
  scrollDirection: 'up' | 'down' | 'idle';
  isScrolling: boolean;
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollProgress: number; // 0 to 1
}

interface SmartScrollingOptions {
  threshold?: number;
  debounceMs?: number;
  showScrollToTop?: boolean;
  scrollToTopThreshold?: number;
  hideHeaderThreshold?: number;
  smoothScrollBehavior?: boolean;
}

/**
 * Smart scrolling hook optimized for mobile performance and UX.
 * 
 * Features:
 * - Scroll direction detection with momentum tracking
 * - Scroll-to-top functionality with smooth animations
 * - Header hiding/showing based on scroll behavior
 * - Scroll progress tracking for progress indicators
 * - Performance optimized with requestAnimationFrame
 * - Mobile-specific momentum scrolling support
 * 
 * The hook enhances mobile experience by:
 * - Providing native-like scroll behavior
 * - Optimizing performance with debounced updates
 * - Supporting iOS momentum scrolling
 * - Enabling smart UI hiding/showing patterns
 * - Tracking scroll progress for visual feedback
 * 
 * @param options Configuration options for scroll behavior
 * @returns Scroll state and control functions
 */
export function useSmartScrolling({
  threshold = 5,
  debounceMs = 16, // ~60fps
  showScrollToTop = true,
  scrollToTopThreshold = 400,
  hideHeaderThreshold = 100,
  smoothScrollBehavior = true,
}: SmartScrollingOptions = {}) {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollDirection: 'idle',
    isScrolling: false,
    isAtTop: true,
    isAtBottom: false,
    scrollProgress: 0,
  });

  const lastScrollY = useRef(0);
  const scrollTimer = useRef<NodeJS.Timeout>();
  const ticking = useRef(false);

  // Calculate scroll progress (0 to 1)
  const calculateScrollProgress = useCallback(() => {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const trackLength = docHeight - winHeight;
    
    return Math.min(scrollTop / trackLength, 1);
  }, []);

  // Update scroll state with performance optimization
  const updateScrollState = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScrollY = window.pageYOffset;
        const scrollDelta = currentScrollY - lastScrollY.current;
        
        // Determine scroll direction
        let direction: 'up' | 'down' | 'idle' = 'idle';
        if (Math.abs(scrollDelta) > threshold) {
          direction = scrollDelta > 0 ? 'down' : 'up';
        }

        // Calculate scroll boundaries
        const isAtTop = currentScrollY <= 10;
        const isAtBottom = 
          currentScrollY + window.innerHeight >= 
          document.documentElement.scrollHeight - 10;

        const scrollProgress = calculateScrollProgress();

        setScrollState(prev => ({
          ...prev,
          scrollY: currentScrollY,
          scrollDirection: direction,
          isScrolling: true,
          isAtTop,
          isAtBottom,
          scrollProgress,
        }));

        lastScrollY.current = currentScrollY;
        ticking.current = false;

        // Clear scrolling state after debounce period
        if (scrollTimer.current) {
          clearTimeout(scrollTimer.current);
        }
        
        scrollTimer.current = setTimeout(() => {
          setScrollState(prev => ({
            ...prev,
            isScrolling: false,
            scrollDirection: 'idle',
          }));
        }, debounceMs * 3); // 3x debounce for idle state
      });
      
      ticking.current = true;
    }
  }, [threshold, debounceMs, calculateScrollProgress]);

  // Smooth scroll to top function
  const scrollToTop = useCallback(() => {
    if (smoothScrollBehavior) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      // Fallback for browsers without smooth scroll support
      const scrollStep = -window.scrollY / (300 / 15); // 300ms duration
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15);
    }
  }, [smoothScrollBehavior]);

  // Smooth scroll to element
  const scrollToElement = useCallback((
    element: HTMLElement | string,
    offset: number = 0
  ) => {
    const targetElement = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement
      : element;

    if (!targetElement) return;

    const targetPosition = targetElement.offsetTop - offset;

    if (smoothScrollBehavior) {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, targetPosition);
    }
  }, [smoothScrollBehavior]);

  // Set up scroll event listeners
  useEffect(() => {
    // Initial state
    updateScrollState();

    // Passive scroll listener for better performance
    const handleScroll = () => updateScrollState();
    
    window.addEventListener('scroll', handleScroll, { 
      passive: true,
      capture: false 
    });

    // Handle resize to recalculate scroll progress
    const handleResize = () => updateScrollState();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, [updateScrollState]);

  // Derived states for common UI patterns
  const shouldShowScrollToTop = showScrollToTop && 
    scrollState.scrollY > scrollToTopThreshold;
  
  const shouldHideHeader = scrollState.scrollDirection === 'down' && 
    scrollState.scrollY > hideHeaderThreshold && 
    scrollState.isScrolling;

  return {
    ...scrollState,
    scrollToTop,
    scrollToElement,
    shouldShowScrollToTop,
    shouldHideHeader,
    // Helper functions
    isScrollingDown: scrollState.scrollDirection === 'down',
    isScrollingUp: scrollState.scrollDirection === 'up',
    scrollPercentage: Math.round(scrollState.scrollProgress * 100),
  };
}

/**
 * Simplified scroll hook for basic scroll-to-top functionality
 */
export function useScrollToTop(threshold: number = 400) {
  const { scrollY, scrollToTop, shouldShowScrollToTop } = useSmartScrolling({
    scrollToTopThreshold: threshold,
    showScrollToTop: true,
  });

  return {
    scrollY,
    scrollToTop,
    shouldShow: shouldShowScrollToTop,
  };
}

/**
 * Hook for scroll-based header hiding
 */
export function useScrollHeader(hideThreshold: number = 100) {
  const { scrollDirection, scrollY, shouldHideHeader } = useSmartScrolling({
    hideHeaderThreshold: hideThreshold,
  });

  return {
    scrollDirection,
    scrollY,
    shouldHide: shouldHideHeader,
    isScrollingDown: scrollDirection === 'down',
    isScrollingUp: scrollDirection === 'up',
  };
}

/**
 * Hook for scroll progress tracking
 */
export function useScrollProgress() {
  const { scrollProgress, scrollPercentage, isAtTop, isAtBottom } = useSmartScrolling();

  return {
    progress: scrollProgress,
    percentage: scrollPercentage,
    isAtTop,
    isAtBottom,
  };
}
