import { useEffect, useState } from 'react';
import { IcClose, IcCheck } from '../lib';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie-consent');
    
    if (!consent) {
      // Show banner after 2 seconds
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      setConsentGiven(consent === 'accepted');
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setConsentGiven(true);
    setShowBanner(false);
    
    // Initialize analytics if consent given
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      import('../utils/analytics').then(({ initAnalytics }) => {
        initAnalytics();
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setConsentGiven(false);
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl border border-line p-4 md:p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-sm md:text-base font-bold text-ink mb-2">
              🍪 We use cookies
            </h3>
            <p className="text-xs md:text-sm text-slate mb-4">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies. Read our{' '}
              <a href="/privacy-policy" className="text-pine hover:text-pine-dark underline">
                Privacy Policy
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleAccept}
                className="px-4 py-2 bg-pine text-white text-xs md:text-sm font-bold rounded-full hover:bg-pine-dark transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="px-4 py-2 bg-mist text-slate text-xs md:text-sm font-bold rounded-full hover:bg-line transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
          <button
            onClick={handleDecline}
            className="flex-shrink-0 text-slate hover:text-ink transition-colors"
            aria-label="Close cookie banner"
          >
            <IcClose className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
