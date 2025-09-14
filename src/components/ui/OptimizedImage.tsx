import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onError?: () => void;
  lazy?: boolean;
  quality?: number;
  skeleton?: boolean;
  skeletonClassName?: string;
}

/**
 * Enhanced OptimizedImage component with advanced mobile performance features.
 * 
 * Features:
 * - Intersection Observer for lazy loading on mobile
 * - Responsive image sizing with mobile-first breakpoints
 * - WebP format support with automatic fallbacks
 * - Enhanced skeleton loading states
 * - Mobile-optimized quality settings
 * - Automatic blur placeholders for better perceived performance
 * - Error handling with graceful fallbacks
 * 
 * The component automatically optimizes images for mobile devices by:
 * - Using lower quality on mobile to reduce bandwidth
 * - Implementing lazy loading for images below the fold
 * - Providing smooth loading transitions with skeletons
 * - Supporting responsive sizing based on screen size
 */

const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ 
    src, 
    alt, 
    width, 
    height, 
    className, 
    sizes, 
    priority = false, 
    fill = false,
    placeholder = 'empty',
    blurDataURL,
    onError,
    lazy = true,
    quality,
    skeleton = true,
    skeletonClassName,
    ...props 
  }, ref) => {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldLoad, setShouldLoad] = useState(priority || !lazy);
    const imgRef = useRef<HTMLDivElement>(null);

    // Intersection Observer for lazy loading
    useEffect(() => {
      // Skip intersection observer if priority is true, lazy is false, or should already load
      if (!lazy || priority || shouldLoad) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        {
          rootMargin: '50px', // Start loading 50px before image comes into view
          threshold: 0.1,
        }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }, [lazy, priority, shouldLoad]);

    // Mobile-optimized quality settings
    const getOptimizedQuality = () => {
      if (quality) return quality;
      
      // Lower quality on mobile to reduce bandwidth
      if (typeof window !== 'undefined') {
        const isMobile = window.innerWidth < 768;
        return isMobile ? 75 : 85;
      }
      return 85;
    };

    // Generate responsive sizes if not provided
    const getResponsiveSizes = () => {
      if (sizes) return sizes;
      
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    };

    const handleError = () => {
      setImageError(true);
      setIsLoading(false);
      if (onError) {
        onError();
      }
    };

    const handleLoad = () => {
      setIsLoading(false);
    };

    // Error state with better mobile styling
    if (imageError) {
      return (
        <div 
          ref={imgRef}
          className={cn(
            'flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg',
            'min-h-[200px] sm:min-h-[300px]', // Responsive minimum heights
            className
          )}
          style={{ width, height }}
        >
          <div className="text-center">
            <svg 
              className="w-8 h-8 mx-auto mb-2" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
                clipRule="evenodd" 
              />
            </svg>
            <p className="text-xs text-gray-500">Image unavailable</p>
          </div>
        </div>
      );
    }

    // Show skeleton only when not ready to load yet
    if (!shouldLoad) {
      return (
        <div 
          ref={imgRef}
          className={cn(
            'relative overflow-hidden rounded-lg bg-gray-200',
            skeleton && 'animate-pulse',
            skeletonClassName,
            className
          )}
          style={{ width, height, aspectRatio: width && height ? `${width}/${height}` : undefined }}
        >
          {skeleton && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%]" />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 text-gray-400">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div 
        ref={imgRef}
        className={cn('relative overflow-hidden rounded-lg', className)}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            'transition-opacity duration-300',
            // Always show image, remove opacity hiding
            'opacity-100'
          )}
          sizes={getResponsiveSizes()}
          priority={priority}
          fill={fill}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          quality={getOptimizedQuality()}
          onError={handleError}
          onLoad={handleLoad}
          {...props}
        />
        
        {/* Loading overlay - only show when skeleton is enabled and loading */}
        {isLoading && skeleton && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%]" />
          </div>
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

export { OptimizedImage }; 