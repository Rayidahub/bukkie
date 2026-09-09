/**
 * Resource preloading and prefetching utilities
 */

/**
 * Preload an image
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Preload multiple images
 */
export async function preloadImages(srcs: string[]): Promise<void> {
  await Promise.allSettled(srcs.map(preloadImage));
}

/**
 * Prefetch a route's code split chunk
 */
export function prefetchRoute(importFn: () => Promise<any>): void {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      importFn();
    });
  } else {
    setTimeout(() => {
      importFn();
    }, 200);
  }
}

/**
 * Preload critical CSS
 */
export function preloadCSS(href: string): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Preload a font
 */
export function preloadFont(url: string, type: 'woff' | 'woff2' | 'ttf' | 'otf' = 'woff2'): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.type = `font/${type}`;
  link.href = url;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

/**
 * Add dns-prefetch for external domains
 */
export function dnsPrefetch(domain: string): void {
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = domain;
  document.head.appendChild(link);
}

/**
 * Add preconnect for external domains
 */
export function preconnect(domain: string, crossOrigin = true): void {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = domain;
  if (crossOrigin) {
    link.crossOrigin = 'anonymous';
  }
  document.head.appendChild(link);
}

/**
 * Preload critical resources on app init
 */
export function preloadCriticalResources(): void {
  // Preconnect to external domains
  preconnect('https://fonts.googleapis.com');
  preconnect('https://fonts.gstatic.com');
  
  // Preload critical fonts
  preloadFont('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700;900&display=swap');
}

/**
 * Check if connection is slow
 */
export function isSlowConnection(): boolean {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return (
      connection.saveData ||
      connection.effectiveType === 'slow-2g' ||
      connection.effectiveType === '2g' ||
      (connection.downlink && connection.downlink < 1.5)
    );
  }
  return false;
}

/**
 * Get connection quality
 */
export function getConnectionQuality(): 'slow' | 'medium' | 'fast' | 'unknown' {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    const effectiveType = connection.effectiveType;
    
    if (effectiveType === '4g') return 'fast';
    if (effectiveType === '3g') return 'medium';
    if (effectiveType === '2g' || effectiveType === 'slow-2g') return 'slow';
  }
  return 'unknown';
}

/**
 * Adjust image quality based on connection
 */
export function getOptimalImageQuality(): number {
  const quality = getConnectionQuality();
  
  switch (quality) {
    case 'slow':
      return 0.6;
    case 'medium':
      return 0.75;
    case 'fast':
      return 0.85;
    default:
      return 0.8;
  }
}
