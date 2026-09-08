import { useState, useEffect, useRef, type ImgHTMLAttributes, type SyntheticEvent } from "react";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  srcSet?: string;
  sizes?: string;
  placeholder?: string;
  rootMargin?: string;
  threshold?: number;
}

export function LazyImage({ 
  src, 
  alt, 
  className = "", 
  fallback, 
  srcSet,
  sizes,
  placeholder,
  rootMargin = "200px",
  threshold = 0.01,
  onError, 
  ...props 
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  return (
    <div ref={imgRef} className="relative overflow-hidden">
      {/* Blur-up placeholder */}
      {placeholder && isLoading && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-105 object-cover blur-lg transition-opacity duration-500"
          style={{ opacity: isLoading ? 1 : 0 }}
        />
      )}

      {/* Loading skeleton */}
      {isLoading && !placeholder && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800" />
      )}

      {/* Error state */}
      {hasError && !fallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-600"
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
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Actual image - only render when in view */}
      {isInView && (
        <img
          src={hasError && fallback ? fallback : src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-all duration-500 ${
            isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
}
