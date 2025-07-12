"use client";

import React, { useState, memo } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackSrc?: string;
  fallbackAlt?: string;
  showLoader?: boolean;
  containerClassName?: string;
  onError?: (error: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

// Default fallback image
const DEFAULT_FALLBACK = {
  src: "/icons/logo.webp",
  alt: "SI<3> Ecosystem",
} as const;

export const OptimizedImage = memo<OptimizedImageProps>(function OptimizedImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK.src,
  fallbackAlt = DEFAULT_FALLBACK.alt,
  showLoader = true,
  containerClassName,
  className,
  onError,
  onLoad,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.(event);
  };

  const handleError = (error: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    setHasError(true);
    
    // Try fallback image if not already using it
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }
    
    onError?.(error);
  };

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Loading skeleton */}
      {isLoading && showLoader && (
        <div className="absolute inset-0 animate-pulse bg-gray-200">
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && currentSrc === fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="mt-2 text-sm">Image unavailable</p>
          </div>
        </div>
      )}

      <Image
        {...props}
        src={currentSrc}
        alt={hasError ? fallbackAlt : alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        // Optimize loading based on priority
        loading={props.priority ? "eager" : "lazy"}
        // Add default sizes if not provided
        sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      />
    </div>
  );
});

// Specialized components for common use cases
export const HeroImage = memo<OptimizedImageProps>(function HeroImage(props) {
  return (
    <OptimizedImage
      {...props}
      priority
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
      className={cn("object-cover object-center", props.className)}
    />
  );
});

export const ThumbnailImage = memo<OptimizedImageProps>(function ThumbnailImage(props) {
  return (
    <OptimizedImage
      {...props}
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px"
      className={cn("object-cover object-center", props.className)}
    />
  );
});

export const AvatarImage = memo<OptimizedImageProps>(function AvatarImage(props) {
  return (
    <OptimizedImage
      {...props}
      sizes="(max-width: 768px) 20vw, 100px"
      className={cn("rounded-full object-cover object-center", props.className)}
    />
  );
});

export const LogoImage = memo<OptimizedImageProps>(function LogoImage(props) {
  return (
    <OptimizedImage
      {...props}
      priority
      sizes="(max-width: 768px) 30vw, 200px"
      className={cn("object-contain", props.className)}
    />
  );
});

// Hook for preloading images
export function useImagePreloader(urls: string[]) {
  React.useEffect(() => {
    const preloadImages = urls.map((url) => {
      const img = new window.Image();
      img.src = url;
      return img;
    });

    return () => {
      preloadImages.forEach((img) => {
        img.src = "";
      });
    };
  }, [urls]);
}

// Utility function to generate responsive image sizes
export function generateImageSizes(breakpoints: { [key: string]: string }) {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(max-width: ${breakpoint}) ${size}`)
    .join(", ");
}

// Image optimization utilities
export const imageOptimization = {
  // Common responsive sizes
  hero: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px",
  thumbnail: "(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px",
  avatar: "(max-width: 768px) 20vw, 100px",
  logo: "(max-width: 768px) 30vw, 200px",
  fullWidth: "100vw",
  
  // Quality settings
  quality: {
    high: 90,
    medium: 75,
    low: 60,
  },
  
  // Format preferences
  formats: ["image/avif", "image/webp", "image/jpeg"] as const,
} as const;
