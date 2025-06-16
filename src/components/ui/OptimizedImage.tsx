import React, { useState } from 'react';
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
}

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
    ...props 
  }, ref) => {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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

    if (imageError) {
      return (
        <div 
          className={cn(
            'flex items-center justify-center bg-gray-100 text-gray-400',
            className
          )}
          style={{ width, height }}
        >
          <svg 
            className="w-8 h-8" 
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
      );
    }

    return (
      <div className={cn('relative', isLoading && 'animate-pulse bg-gray-200')}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(className, isLoading && 'opacity-0')}
          sizes={sizes}
          priority={priority}
          fill={fill}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onError={handleError}
          onLoad={handleLoad}
          {...props}
        />
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

export { OptimizedImage }; 