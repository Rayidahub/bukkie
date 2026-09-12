/**
 * Referral tracking utility
 * Tracks referral sources via URL parameters and stores them
 */

export interface ReferralData {
  source: string;
  medium: string;
  campaign: string;
  timestamp: number;
  landingPage: string;
}

const REFERRAL_STORAGE_KEY = 'portfolio_referral_data';

/**
 * Parse UTM parameters from URL
 */
export function parseReferralParams(): Partial<ReferralData> {
  const params = new URLSearchParams(window.location.search);
  
  return {
    source: params.get('utm_source') || params.get('ref') || document.referrer || 'direct',
    medium: params.get('utm_medium') || 'none',
    campaign: params.get('utm_campaign') || '',
  };
}

/**
 * Track referral data
 */
export function trackReferral(): ReferralData | null {
  // Check if we already have referral data for this session
  const existing = sessionStorage.getItem(REFERRAL_STORAGE_KEY);
  if (existing) {
    return JSON.parse(existing);
  }

  const params = parseReferralParams();
  
  if (!params.source || params.source === 'direct') {
    return null;
  }

  const referralData: ReferralData = {
    source: params.source || 'unknown',
    medium: params.medium || 'none',
    campaign: params.campaign || '',
    timestamp: Date.now(),
    landingPage: window.location.pathname,
  };

  // Store in session storage
  sessionStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(referralData));

  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('Referral tracked:', referralData);
  }

  // Send to analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'referral', {
      event_category: 'acquisition',
      event_label: referralData.source,
      value: referralData.campaign,
    });
  }

  return referralData;
}

/**
 * Get current referral data
 */
export function getReferralData(): ReferralData | null {
  const stored = sessionStorage.getItem(REFERRAL_STORAGE_KEY);
  if (!stored) return null;
  return JSON.parse(stored);
}

/**
 * Clear referral data
 */
export function clearReferralData(): void {
  sessionStorage.removeItem(REFERRAL_STORAGE_KEY);
}

/**
 * Hook to track referral on mount
 */
export function useReferralTracking() {
  if (typeof window !== 'undefined') {
    trackReferral();
  }
}
