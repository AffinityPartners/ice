'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AdaptiveContainerProps {
  children: React.ReactNode;
  className?: string;
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  spacing?: 'auto' | 'tight' | 'normal' | 'relaxed' | 'loose';
  columns?: 'auto' | 1 | 2 | 3 | 4 | 6;
  gap?: 'auto' | 'sm' | 'md' | 'lg' | 'xl';
  minItemWidth?: number;
  maxItemWidth?: number;
  animate?: boolean;
}

interface ContainerState {
  width: number;
  height: number;
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  columns: number;
  gap: string;
  spacing: string;
}

/**
 * Adaptive container component that responds to its own size rather than viewport.
 * 
 * Features:
 * - Container query-like behavior using ResizeObserver
 * - Dynamic column calculation based on content width
 * - Automatic spacing adjustment for optimal density
 * - Smooth transitions between layout states
 * - Mobile-first responsive behavior
 * - Performance optimized with debounced updates
 * 
 * The component provides truly adaptive layouts by:
 * - Responding to container size, not viewport size
 * - Calculating optimal column counts automatically
 * - Adjusting spacing based on available space
 * - Providing smooth transitions between states
 * - Supporting both CSS Grid and Flexbox patterns
 * 
 * @param props Configuration props for adaptive behavior
 */
export function AdaptiveContainer({
  children,
  className,
  breakpoints = {
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  spacing = 'auto',
  columns = 'auto',
  gap = 'auto',
  minItemWidth = 250,
  maxItemWidth = 400,
  animate = true,
}: AdaptiveContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeObserver = useRef<ResizeObserver>();
  const updateTimeout = useRef<NodeJS.Timeout>();

  const [containerState, setContainerState] = useState<ContainerState>({
    width: 0,
    height: 0,
    breakpoint: 'xs',
    columns: 1,
    gap: 'md',
    spacing: 'normal',
  });

  // Calculate optimal columns based on container width
  const calculateColumns = useCallback((width: number): number => {
    if (columns !== 'auto') return columns;

    const availableWidth = width - 32; // Account for padding
    const minColumns = 1;
    const maxColumns = 6;

    // Calculate how many items can fit
    const possibleColumns = Math.floor(availableWidth / minItemWidth);
    
    // Ensure items don't get too wide
    const maxColumnsForWidth = Math.ceil(availableWidth / maxItemWidth);
    
    return Math.max(minColumns, Math.min(possibleColumns, maxColumnsForWidth, maxColumns));
  }, [columns, minItemWidth, maxItemWidth]);

  // Determine breakpoint based on container width
  const getBreakpoint = useCallback((width: number): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
    if (width >= breakpoints.xl!) return 'xl';
    if (width >= breakpoints.lg!) return 'lg';
    if (width >= breakpoints.md!) return 'md';
    if (width >= breakpoints.sm!) return 'sm';
    return 'xs';
  }, [breakpoints]);

  // Calculate optimal gap based on container size
  const calculateGap = useCallback((width: number, cols: number): string => {
    if (gap !== 'auto') return gap;

    const density = width / cols;
    
    if (density < 200) return 'sm';
    if (density < 300) return 'md';
    if (density < 500) return 'lg';
    return 'xl';
  }, [gap]);

  // Calculate optimal spacing
  const calculateSpacing = useCallback((width: number): string => {
    if (spacing !== 'auto') return spacing;

    if (width < 480) return 'tight';
    if (width < 768) return 'normal';
    if (width < 1024) return 'relaxed';
    return 'loose';
  }, [spacing]);

  // Update container state with debouncing
  const updateContainerState = useCallback((entries: ResizeObserverEntry[]) => {
    if (updateTimeout.current) {
      clearTimeout(updateTimeout.current);
    }

    updateTimeout.current = setTimeout(() => {
      const entry = entries[0];
      if (!entry) return;

      const { width, height } = entry.contentRect;
      const breakpoint = getBreakpoint(width);
      const calculatedColumns = calculateColumns(width);
      const calculatedGap = calculateGap(width, calculatedColumns);
      const calculatedSpacing = calculateSpacing(width);

      setContainerState({
        width,
        height,
        breakpoint,
        columns: calculatedColumns,
        gap: calculatedGap,
        spacing: calculatedSpacing,
      });
    }, 16); // ~60fps debouncing
  }, [getBreakpoint, calculateColumns, calculateGap, calculateSpacing]);

  // Set up ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;

    resizeObserver.current = new ResizeObserver(updateContainerState);
    resizeObserver.current.observe(containerRef.current);

    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current);
      }
    };
  }, [updateContainerState]);

  // Generate CSS classes based on current state
  const getGridClasses = () => {
    const { columns: cols, gap: gapSize, spacing: spacingSize } = containerState;

    const columnClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    }[cols] || 'grid-cols-1';

    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    }[gapSize] || 'gap-4';

    const spacingClasses = {
      tight: 'p-2',
      normal: 'p-4',
      relaxed: 'p-6',
      loose: 'p-8',
    }[spacingSize] || 'p-4';

    return cn('grid', columnClasses, gapClasses, spacingClasses);
  };

  // Generate flex classes for alternative layout
  const getFlexClasses = () => {
    const { gap: gapSize, spacing: spacingSize } = containerState;

    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4', 
      lg: 'gap-6',
      xl: 'gap-8',
    }[gapSize] || 'gap-4';

    const spacingClasses = {
      tight: 'p-2',
      normal: 'p-4',
      relaxed: 'p-6',
      loose: 'p-8',
    }[spacingSize] || 'p-4';

    return cn('flex flex-wrap', gapClasses, spacingClasses);
  };

  const containerProps = {
    ref: containerRef,
    className: cn(
      'transition-all duration-300 ease-out',
      animate && 'transform-gpu', // Hardware acceleration hint
      className
    ),
    style: {
      '--container-width': `${containerState.width}px`,
      '--container-height': `${containerState.height}px`,
      '--container-columns': containerState.columns,
    } as React.CSSProperties,
  };

  return {
    // State
    containerState,
    
    // Props for container element
    containerProps,
    
    // CSS class generators
    getGridClasses,
    getFlexClasses,
    
    // Utilities
    isReady: containerState.width > 0,
    isMobile: containerState.breakpoint === 'xs' || containerState.breakpoint === 'sm',
    isTablet: containerState.breakpoint === 'md',
    isDesktop: containerState.breakpoint === 'lg' || containerState.breakpoint === 'xl',
  };
}

/**
 * Pre-configured adaptive grid component
 */
export function AdaptiveGrid({
  children,
  className,
  minItemWidth = 250,
  maxItemWidth = 400,
  animate = true,
}: {
  children: React.ReactNode;
  className?: string;
  minItemWidth?: number;
  maxItemWidth?: number;
  animate?: boolean;
}) {
  const { containerProps, getGridClasses, isReady } = useAdaptiveContainer({
    minItemWidth,
    maxItemWidth,
    animate,
  });

  return (
    <div {...containerProps} className={cn(getGridClasses(), className)}>
      {animate && isReady ? (
        <motion.div
          className="contents"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </div>
  );
}

/**
 * Adaptive masonry-like layout
 */
export function AdaptiveMasonry({
  children,
  className,
  minItemWidth = 200,
}: {
  children: React.ReactNode;
  className?: string;
  minItemWidth?: number;
}) {
  const { containerProps, containerState, isReady } = useAdaptiveContainer({
    minItemWidth,
    columns: 'auto',
    gap: 'auto',
  });

  const columnStyle = {
    columnCount: containerState.columns,
    columnGap: containerState.gap === 'sm' ? '0.5rem' : 
                containerState.gap === 'md' ? '1rem' :
                containerState.gap === 'lg' ? '1.5rem' : '2rem',
    columnFill: 'balance' as const,
  };

  return (
    <div 
      {...containerProps} 
      className={cn('transition-all duration-300', className)}
      style={{
        ...containerProps.style,
        ...columnStyle,
      }}
    >
      {isReady && children}
    </div>
  );
}

// Helper function that actually implements the adaptive container logic
function useAdaptiveContainer(options: Omit<AdaptiveContainerProps, 'children'>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeObserver = useRef<ResizeObserver>();
  const updateTimeout = useRef<NodeJS.Timeout>();

  const [containerState, setContainerState] = useState<ContainerState>({
    width: 0,
    height: 0,
    breakpoint: 'xs',
    columns: 1,
    gap: 'md',
    spacing: 'normal',
  });

  const {
    breakpoints = { sm: 480, md: 768, lg: 1024, xl: 1280 },
    spacing = 'auto',
    columns = 'auto',
    gap = 'auto',
    minItemWidth = 250,
    maxItemWidth = 400,
    animate = true,
  } = options;

  // Calculate optimal columns based on container width
  const calculateColumns = useCallback((width: number): number => {
    if (columns !== 'auto') return columns;

    const availableWidth = width - 32; // Account for padding
    const minColumns = 1;
    const maxColumns = 6;

    // Calculate how many items can fit
    const possibleColumns = Math.floor(availableWidth / minItemWidth);
    
    // Ensure items don't get too wide
    const maxColumnsForWidth = Math.ceil(availableWidth / maxItemWidth);
    
    return Math.max(minColumns, Math.min(possibleColumns, maxColumnsForWidth, maxColumns));
  }, [columns, minItemWidth, maxItemWidth]);

  // Determine breakpoint based on container width
  const getBreakpoint = useCallback((width: number): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
    if (width >= breakpoints.xl!) return 'xl';
    if (width >= breakpoints.lg!) return 'lg';
    if (width >= breakpoints.md!) return 'md';
    if (width >= breakpoints.sm!) return 'sm';
    return 'xs';
  }, [breakpoints]);

  // Calculate optimal gap based on container size
  const calculateGap = useCallback((width: number, cols: number): string => {
    if (gap !== 'auto') return gap;

    const density = width / cols;
    
    if (density < 200) return 'sm';
    if (density < 300) return 'md';
    if (density < 500) return 'lg';
    return 'xl';
  }, [gap]);

  // Calculate optimal spacing
  const calculateSpacing = useCallback((width: number): string => {
    if (spacing !== 'auto') return spacing;

    if (width < 480) return 'tight';
    if (width < 768) return 'normal';
    if (width < 1024) return 'relaxed';
    return 'loose';
  }, [spacing]);

  // Update container state with debouncing
  const updateContainerState = useCallback((entries: ResizeObserverEntry[]) => {
    if (updateTimeout.current) {
      clearTimeout(updateTimeout.current);
    }

    updateTimeout.current = setTimeout(() => {
      const entry = entries[0];
      if (!entry) return;

      const { width, height } = entry.contentRect;
      const breakpoint = getBreakpoint(width);
      const calculatedColumns = calculateColumns(width);
      const calculatedGap = calculateGap(width, calculatedColumns);
      const calculatedSpacing = calculateSpacing(width);

      setContainerState({
        width,
        height,
        breakpoint,
        columns: calculatedColumns,
        gap: calculatedGap,
        spacing: calculatedSpacing,
      });
    }, 16); // ~60fps debouncing
  }, [getBreakpoint, calculateColumns, calculateGap, calculateSpacing]);

  // Set up ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;

    resizeObserver.current = new ResizeObserver(updateContainerState);
    resizeObserver.current.observe(containerRef.current);

    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current);
      }
    };
  }, [updateContainerState]);

  // Generate CSS classes based on current state
  const getGridClasses = () => {
    const { columns: cols, gap: gapSize, spacing: spacingSize } = containerState;

    const columnClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    }[cols] || 'grid-cols-1';

    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    }[gapSize] || 'gap-4';

    const spacingClasses = {
      tight: 'p-2',
      normal: 'p-4',
      relaxed: 'p-6',
      loose: 'p-8',
    }[spacingSize] || 'p-4';

    return cn('grid', columnClasses, gapClasses, spacingClasses);
  };

  const containerProps = {
    ref: containerRef,
    className: cn(
      'transition-all duration-300 ease-out',
      animate && 'transform-gpu', // Hardware acceleration hint
    ),
    style: {
      '--container-width': `${containerState.width}px`,
      '--container-height': `${containerState.height}px`,
      '--container-columns': containerState.columns,
    } as React.CSSProperties,
  };

  return {
    containerState,
    containerProps,
    getGridClasses,
    isReady: containerState.width > 0,
    isMobile: containerState.breakpoint === 'xs' || containerState.breakpoint === 'sm',
    isTablet: containerState.breakpoint === 'md',
    isDesktop: containerState.breakpoint === 'lg' || containerState.breakpoint === 'xl',
  };
}
