/**
 * Performance monitoring utilities
 */

export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  tti?: number; // Time to Interactive
}

/**
 * Measure Core Web Vitals
 */
export function measureWebVitals(): PerformanceMetrics {
  const metrics: PerformanceMetrics = {};

  // First Contentful Paint (FCP)
  const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
  if (fcpEntry) {
    metrics.fcp = fcpEntry.startTime;
  }

  // Largest Contentful Paint (LCP)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    metrics.lcp = lastEntry.startTime;
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // First Input Delay (FID)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      metrics.fid = entry.processingStart - entry.startTime;
    });
  }).observe({ entryTypes: ['first-input'] });

  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        metrics.cls = clsValue;
      }
    });
  }).observe({ entryTypes: ['layout-shift'] });

  // Time to First Byte (TTFB)
  const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigationEntry) {
    metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
  }

  return metrics;
}

/**
 * Report performance metrics
 */
export function reportPerformance(metrics: PerformanceMetrics): void {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('Performance Metrics:', metrics);
  }

  // Send to analytics service in production
  if (import.meta.env.PROD) {
    // Example: send to Google Analytics
    // gtag('event', 'performance_metrics', metrics);
    
    // Example: send to custom endpoint
    // fetch('/api/performance', {
    //   method: 'POST',
    //   body: JSON.stringify(metrics)
    // });
  }
}

/**
 * Measure component render time
 */
export function measureRenderTime(componentName: string): () => void {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (import.meta.env.DEV) {
      console.log(`${componentName} rendered in ${duration.toFixed(2)}ms`);
    }
  };
}

/**
 * Monitor long tasks
 */
export function monitorLongTasks(callback?: (duration: number) => void): void {
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      const duration = entry.duration;
      
      if (import.meta.env.DEV) {
        console.warn(`Long task detected: ${duration.toFixed(2)}ms`);
      }
      
      if (callback) {
        callback(duration);
      }
    });
  }).observe({ entryTypes: ['longtask'] });
}

/**
 * Get memory usage
 */
export function getMemoryUsage(): { used: number; total: number; limit: number } | null {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
    };
  }
  return null;
}

/**
 * Format bytes to human readable
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring(): void {
  // Wait for page to load
  window.addEventListener('load', () => {
    const metrics = measureWebVitals();
    reportPerformance(metrics);
    
    // Log memory usage
    const memory = getMemoryUsage();
    if (memory && import.meta.env.DEV) {
      console.log('Memory Usage:', {
        used: formatBytes(memory.used),
        total: formatBytes(memory.total),
        limit: formatBytes(memory.limit),
      });
    }
  });

  // Monitor long tasks
  if (import.meta.env.DEV) {
    monitorLongTasks();
  }
}

/**
 * Check if device is low-end
 */
export function isLowEndDevice(): boolean {
  // Check hardware concurrency (CPU cores)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return true;
  }

  // Check device memory
  if ('deviceMemory' in navigator && (navigator as any).deviceMemory < 4) {
    return true;
  }

  return false;
}

/**
 * Adjust animations based on device capability
 */
export function shouldReduceAnimations(): boolean {
  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  // Check if low-end device
  if (isLowEndDevice()) {
    return true;
  }

  // Check if slow connection
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection.saveData || connection.effectiveType === '2g') {
      return true;
    }
  }

  return false;
}
