/**
 * ECCCO Lazy Loading and Image Optimization
 * 
 * Intelligent lazy loading with intersection observer,
 * progressive image loading, and resource prioritization.
 */

import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  priority?: 'high' | 'normal' | 'low';
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({
  src,
  alt,
  className = '',
  placeholder,
  priority = 'normal',
  onLoad,
  onError,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: priority === 'high' ? '100px' : priority === 'normal' ? '50px' : '0px',
        threshold: 0.1,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const shouldLoad = priority === 'high' || isInView;

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          {placeholder ? (
            <img src={placeholder} alt="" className="w-full h-full object-cover opacity-50" />
          ) : (
            <div className="animate-pulse bg-gray-300 w-full h-full"></div>
          )}
        </div>
      )}

      {/* Actual Image */}
      {shouldLoad && !hasError && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority === 'high' ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs">Image failed to load</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface LazyComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

export function LazyComponent({
  children,
  fallback,
  rootMargin = '50px',
  threshold = 0.1,
  className = '',
}: LazyComponentProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={ref} className={className}>
      {isInView ? children : fallback || <div className="animate-pulse bg-gray-200 h-32 rounded"></div>}
    </div>
  );
}

interface ProgressiveImageProps {
  src: string;
  lowQualitySrc?: string;
  alt: string;
  className?: string;
  priority?: 'high' | 'normal' | 'low';
}

export function ProgressiveImage({
  src,
  lowQualitySrc,
  alt,
  className = '',
  priority = 'normal',
}: ProgressiveImageProps) {
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || src);
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView && priority !== 'high') return;

    // Load high quality image
    if (lowQualitySrc && src !== lowQualitySrc) {
      const highQualityImg = new Image();
      highQualityImg.onload = () => {
        setCurrentSrc(src);
        setIsHighQualityLoaded(true);
      };
      highQualityImg.src = src;
    }
  }, [isInView, src, lowQualitySrc, priority]);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      <img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-500 ${
          !isHighQualityLoaded && lowQualitySrc ? 'filter blur-sm' : ''
        }`}
        loading={priority === 'high' ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
}

// Hook for lazy loading with intersection observer
export function useLazyLoading(options: {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
} = {}) {
  const {
    rootMargin = '50px',
    threshold = 0.1,
    triggerOnce = true,
  } = options;

  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [rootMargin, threshold, triggerOnce]);

  return { ref, isInView };
}

// Preload images utility
export const preloadImages = (imageSrcs: string[]): Promise<void[]> => {
  const promises = imageSrcs.map(src => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  });

  return Promise.allSettled(promises).then(() => []);
};

// Image optimization utility
export const optimizeImageUrl = (
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png';
    fit?: 'cover' | 'contain' | 'fill';
  } = {}
): string => {
  // This would integrate with your image optimization service
  // For now, return the original source
  // In production, you might use Next.js Image Optimization,
  // Cloudinary, or similar service
  
  const { width, height, quality = 80, format, fit = 'cover' } = options;
  
  // Example URL generation for an image optimization service
  // if (src.startsWith('http')) {
  //   const params = new URLSearchParams();
  //   if (width) params.set('w', width.toString());
  //   if (height) params.set('h', height.toString());
  //   params.set('q', quality.toString());
  //   if (format) params.set('f', format);
  //   params.set('fit', fit);
  //   
  //   return `${src}?${params.toString()}`;
  // }
  
  return src;
};

// Responsive image utilities
export const generateSrcSet = (
  baseSrc: string,
  breakpoints: number[] = [320, 640, 768, 1024, 1280, 1536]
): string => {
  return breakpoints
    .map(width => `${optimizeImageUrl(baseSrc, { width })} ${width}w`)
    .join(', ');
};

export const generateSizes = (
  breakpoints: Array<{ minWidth: number; size: string }>
): string => {
  return breakpoints
    .map(({ minWidth, size }) => `(min-width: ${minWidth}px) ${size}`)
    .join(', ');
};