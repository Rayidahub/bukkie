import { useState, useEffect } from 'react';
import { IcClose, IcMail, IcSpark } from '../lib';

export function ExitIntentNewsletter() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const seen = sessionStorage.getItem('exit-intent-shown');
    if (seen) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect when mouse leaves the viewport (exit intent)
      if (e.clientY <= 0 && !hasShown && !isVisible) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exit-intent-shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown, isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }, 1000);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="relative mx-4 max-w-md w-full bg-white rounded-2xl shadow-2xl animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate hover:text-ink transition-colors"
          aria-label="Close"
        >
          <IcClose className="h-5 w-5" />
        </button>

        <div className="p-8">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-gold/20">
            <IcMail className="h-8 w-8 text-gold" />
          </div>

          <h2 className="text-2xl font-bold text-center text-ink mb-2">
            Wait! Don't miss out ✨
          </h2>
          
          <p className="text-center text-slate mb-6">
            Get exclusive design tips, project updates, and creative insights delivered to your inbox.
          </p>

          {status === 'success' ? (
            <div className="text-center py-4">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-green-100">
                <IcSpark className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-ink font-semibold">You're subscribed!</p>
              <p className="text-sm text-slate mt-1">Check your inbox for a welcome email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-line rounded-lg focus:outline-none focus:border-pine transition-colors"
                  disabled={status === 'loading'}
                  required
                />
                {status === 'error' && (
                  <p className="text-sm text-red-600 mt-1">Please enter a valid email</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full btn btn-gold disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
              </button>

              <p className="text-xs text-center text-slate">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
