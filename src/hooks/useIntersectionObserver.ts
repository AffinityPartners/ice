import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  freezeOnceVisible?: boolean;
  initialIsIntersecting?: boolean;
}

/**
 * Custom hook for Intersection Observer API optimized for mobile performance.
 * 
 * This hook is designed to improve mobile performance by:
 * - Lazy loading content when it enters the viewport
 * - Reducing unnecessary re-renders with freezeOnceVisible option
 * - Supporting mobile-optimized root margins for better UX
 * - Providing clean cleanup to prevent memory leaks
 * 
 * @param options - Configuration options for the intersection observer
 * @returns Object containing ref to attach to element and intersection state
 */
export function useIntersectionObserver<T extends Element = HTMLDivElement>({
  root = null,
  rootMargin = '50px',
  threshold = 0.1,
  freezeOnceVisible = false,
  initialIsIntersecting = false,
}: UseIntersectionObserverOptions = {}) {
  const elementRef = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(initialIsIntersecting);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If frozen and already intersected, don't observe
    if (freezeOnceVisible && hasIntersected) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isCurrentlyIntersecting = entry.isIntersecting;
        
        setIsIntersecting(isCurrentlyIntersecting);
        
        if (isCurrentlyIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, freezeOnceVisible, hasIntersected]);

  return {
    ref: elementRef,
    isIntersecting,
    hasIntersected,
  };
}

/**
 * Specialized hook for lazy loading images and content on mobile.
 * Pre-configured with mobile-optimized settings.
 */
export function useLazyLoading<T extends Element = HTMLDivElement>() {
  return useIntersectionObserver<T>({
    rootMargin: '100px', // Start loading earlier on mobile
    threshold: 0,
    freezeOnceVisible: true,
  });
}

/**
 * Hook for triggering animations when elements come into view.
 * Optimized for mobile performance with reduced motion support.
 */
export function useScrollAnimation<T extends Element = HTMLDivElement>() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleChange);

      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const intersection = useIntersectionObserver<T>({
    rootMargin: '50px',
    threshold: 0.2,
    freezeOnceVisible: true,
  });

  return {
    ...intersection,
    shouldAnimate: intersection.isIntersecting && !prefersReducedMotion,
    prefersReducedMotion,
  };
}
