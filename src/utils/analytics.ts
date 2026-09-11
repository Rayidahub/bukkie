// Analytics utility for tracking page views and events
// Supports Google Analytics 4 (GA4)

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export function initAnalytics() {
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID not configured');
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: true
  });

  console.log('Google Analytics initialized');
}

// Track page view
export function trackPageView(path: string, title?: string) {
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (!GA_MEASUREMENT_ID || !window.gtag) {
    return;
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title
  });
}

// Track custom event
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (!GA_MEASUREMENT_ID || !window.gtag) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
}

// Track contact form submission
export function trackContactFormSubmission(service?: string) {
  trackEvent('submit', 'contact_form', service);
}

// Track newsletter signup
export function trackNewsletterSignup() {
  trackEvent('subscribe', 'newsletter');
}

// Track project view
export function trackProjectView(projectId: string, projectTitle: string) {
  trackEvent('view', 'project', `${projectId}: ${projectTitle}`);
}

// Track blog post view
export function trackBlogPostView(postId: string, postTitle: string) {
  trackEvent('view', 'blog_post', `${postId}: ${postTitle}`);
}

// Track service click
export function trackServiceClick(serviceName: string) {
  trackEvent('click', 'service', serviceName);
}

// Track external link click
export function trackExternalLink(url: string) {
  trackEvent('click', 'external_link', url);
}

// Track social media click
export function trackSocialClick(platform: string) {
  trackEvent('click', 'social_media', platform);
}

// Track CTA click
export function trackCTAClick(ctaName: string) {
  trackEvent('click', 'cta', ctaName);
}

// Track PWA install
export function trackPWAInstall() {
  trackEvent('install', 'pwa');
}

// Track theme change
export function trackThemeChange(theme: 'light' | 'dark') {
  trackEvent('change', 'theme', theme);
}

// Track language change
export function trackLanguageChange(language: string) {
  trackEvent('change', 'language', language);
}

// Track search query
export function trackSearch(query: string) {
  trackEvent('search', 'site_search', query);
}

// Track error
export function trackError(errorMessage: string, errorType?: string) {
  trackEvent('error', errorType || 'general', errorMessage);
}

// Track performance metrics
export function trackPerformance(metric: string, value: number) {
  trackEvent('performance', metric, undefined, value);
}
