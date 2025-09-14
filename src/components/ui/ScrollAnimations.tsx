'use client';

import React from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useIntersectionObserver';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
}

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  offset?: number;
}

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: string;
  position?: 'top' | 'bottom';
}

/**
 * Scroll-triggered animation components optimized for mobile performance.
 * 
 * Features:
 * - Multiple animation directions and types
 * - Intersection Observer for performance
 * - Reduced motion support for accessibility
 * - Hardware-accelerated transforms
 * - Customizable thresholds and timing
 * - Mobile-optimized animation distances
 * 
 * The components enhance mobile UX by:
 * - Using efficient intersection observers
 * - Respecting user motion preferences
 * - Providing smooth 60fps animations
 * - Minimizing layout thrashing
 * - Supporting touch-friendly interactions
 */

/**
 * Scroll reveal component that animates elements into view
 */
export function ScrollReveal({
  children,
  className,
  direction = 'up',
  distance = 30,
  duration = 0.6,
  delay = 0,
  threshold = 0.2,
  once = true,
}: ScrollRevealProps) {
  const { ref, shouldAnimate, prefersReducedMotion } = useScrollAnimation();

  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      case 'scale':
        return { scale: 0.8, opacity: 0 };
      case 'fade':
      default:
        return { opacity: 0 };
    }
  };

  const getAnimateTransform = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      case 'scale':
        return { scale: 1, opacity: 1 };
      case 'fade':
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn('will-change-transform', className)}
      initial={getInitialTransform()}
      animate={shouldAnimate ? getAnimateTransform() : getInitialTransform()}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parallax scrolling component for subtle depth effects
 */
export function ParallaxScroll({
  children,
  className,
  speed = 0.5,
  direction = 'vertical',
  offset = 0,
}: ParallaxProps) {
  const { scrollY } = useScroll();
  
  // Transform scroll position based on speed and direction
  const transform = useTransform(
    scrollY,
    [0, 1000], // Input range
    direction === 'vertical' 
      ? [offset, offset + (1000 * speed)] // Vertical parallax
      : [offset, offset + (1000 * speed)] // Horizontal parallax
  );

  return (
    <motion.div
      className={cn('will-change-transform', className)}
      style={{
        [direction === 'vertical' ? 'y' : 'x']: transform,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll progress indicator component
 */
export function ScrollProgress({
  className,
  color = '#245789',
  height = '3px',
  position = 'top',
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={cn(
        'fixed left-0 right-0 z-50 origin-left bg-current',
        position === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
      style={{
        height,
        color,
        scaleX: scrollYProgress,
      }}
    />
  );
}

/**
 * Staggered reveal for lists and grids
 */
export function StaggeredReveal({
  children,
  className,
  staggerDelay = 0.1,
  direction = 'up',
  distance = 20,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}) {
  const { ref, shouldAnimate, prefersReducedMotion } = useScrollAnimation();

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          initial={getInitialTransform()}
          animate={shouldAnimate ? { x: 0, y: 0, opacity: 1 } : getInitialTransform()}
          transition={{
            duration: 0.5,
            delay: shouldAnimate ? index * staggerDelay : 0,
            ease: 'easeOut',
          }}
          className="will-change-transform"
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Text reveal animation for headings
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  duration = 0.8,
  staggerDelay = 0.05,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
}) {
  const { ref, shouldAnimate, prefersReducedMotion } = useScrollAnimation();

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{text}</div>;
  }

  const words = text.split(' ');

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2 will-change-transform"
          initial={{ y: 50, opacity: 0 }}
          animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{
            duration,
            delay: delay + (index * staggerDelay),
            ease: 'easeOut',
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

/**
 * Counter animation that counts up when in view
 */
export function CounterReveal({
  from = 0,
  to,
  duration = 2,
  className,
  suffix = '',
  prefix = '',
}: {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}) {
  const { ref, shouldAnimate } = useScrollAnimation();
  const [currentValue, setCurrentValue] = React.useState(from);

  React.useEffect(() => {
    if (!shouldAnimate) {
      setCurrentValue(from);
      return;
    }

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const value = from + (to - from) * easeOutQuart;
      
      setCurrentValue(Math.round(value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [shouldAnimate, from, to, duration]);

  return (
    <div ref={ref} className={className}>
      <span>
        {prefix}
        <span>{currentValue}</span>
        {suffix}
      </span>
    </div>
  );
}
