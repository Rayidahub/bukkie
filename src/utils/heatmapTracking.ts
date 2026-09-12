/**
 * Heatmap tracking utility
 * Tracks clicks, scrolls, and mouse movements for analytics
 */

export interface HeatmapEvent {
  type: 'click' | 'scroll' | 'mousemove';
  x: number;
  y: number;
  timestamp: number;
  page: string;
  viewport: {
    width: number;
    height: number;
  };
}

const HEATMAP_STORAGE_KEY = 'portfolio_heatmap_data';
const MAX_EVENTS = 1000; // Limit stored events

/**
 * Track click event
 */
export function trackClick(event: MouseEvent): void {
  const heatmapEvent: HeatmapEvent = {
    type: 'click',
    x: event.clientX,
    y: event.clientY,
    timestamp: Date.now(),
    page: window.location.pathname,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  };

  saveEvent(heatmapEvent);

  // Send to analytics if available
  if ((window as any).gtag) {
    const target = event.target as HTMLElement;
    (window as any).gtag('event', 'click', {
      event_category: 'interaction',
      event_label: `${target?.tagName || 'unknown'} at ${event.clientX},${event.clientY}`,
    });
  }
}

/**
 * Track scroll position
 */
export function trackScroll(): void {
  const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  
  const heatmapEvent: HeatmapEvent = {
    type: 'scroll',
    x: 0,
    y: scrollPercent,
    timestamp: Date.now(),
    page: window.location.pathname,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  };

  saveEvent(heatmapEvent);
}

/**
 * Save event to storage
 */
function saveEvent(event: HeatmapEvent): void {
  const stored = localStorage.getItem(HEATMAP_STORAGE_KEY);
  const events: HeatmapEvent[] = stored ? JSON.parse(stored) : [];

  events.push(event);

  // Keep only last MAX_EVENTS
  if (events.length > MAX_EVENTS) {
    events.splice(0, events.length - MAX_EVENTS);
  }

  localStorage.setItem(HEATMAP_STORAGE_KEY, JSON.stringify(events));

  // Log in development
  if (import.meta.env.DEV) {
    console.log('Heatmap event:', event);
  }
}

/**
 * Get all heatmap events
 */
export function getHeatmapEvents(page?: string): HeatmapEvent[] {
  const stored = localStorage.getItem(HEATMAP_STORAGE_KEY);
  if (!stored) return [];

  const events: HeatmapEvent[] = JSON.parse(stored);

  if (page) {
    return events.filter(e => e.page === page);
  }

  return events;
}

/**
 * Get click heatmap data for a page
 */
export function getClickHeatmap(page: string): HeatmapEvent[] {
  return getHeatmapEvents(page).filter(e => e.type === 'click');
}

/**
 * Get scroll heatmap data for a page
 */
export function getScrollHeatmap(page: string): HeatmapEvent[] {
  return getHeatmapEvents(page).filter(e => e.type === 'scroll');
}

/**
 * Clear heatmap data
 */
export function clearHeatmapData(page?: string): void {
  if (page) {
    const events = getHeatmapEvents().filter(e => e.page !== page);
    localStorage.setItem(HEATMAP_STORAGE_KEY, JSON.stringify(events));
  } else {
    localStorage.removeItem(HEATMAP_STORAGE_KEY);
  }
}

/**
 * Export heatmap data as JSON
 */
export function exportHeatmapData(): string {
  const events = getHeatmapEvents();
  return JSON.stringify(events, null, 2);
}

/**
 * Initialize heatmap tracking
 */
export function initHeatmapTracking(): () => void {
  // Track clicks
  document.addEventListener('click', trackClick);

  // Track scroll (throttled)
  let scrollTimeout: ReturnType<typeof setTimeout>;
  const handleScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(trackScroll, 500);
  };
  window.addEventListener('scroll', handleScroll);

  // Return cleanup function
  return () => {
    document.removeEventListener('click', trackClick);
    window.removeEventListener('scroll', handleScroll);
  };
}

/**
 * Hook to use heatmap tracking
 */
export function useHeatmapTracking(): void {
  if (typeof window !== 'undefined') {
    initHeatmapTracking();
  }
}

/**
 * Integration with external heatmap services
 * Supports Hotjar, FullStory, etc.
 */
export function integrateExternalHeatmap(service: 'hotjar' | 'fullstory', id: string): void {
  if (service === 'hotjar') {
    // Hotjar integration
    (function(h: any, o: any, t: any, j: any) {
      h.hj = h.hj || function() { (h.hj.q = h.hj.q || []).push(arguments) };
      h._hjSettings = { hjid: id, hjsv: 6 };
      const a = o.getElementsByTagName('head')[0];
      const r = o.createElement('script');
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
  }

  if (service === 'fullstory') {
    // FullStory integration
    (function(m: any) {
      const script = m.createElement('script');
      script.src = `https://edge.fullstory.com/s/fs.js`;
      script.async = true;
      m.head.appendChild(script);
      (window as any)._fs_org = id;
    })(document);
  }
}
