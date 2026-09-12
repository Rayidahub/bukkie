import { useState, useEffect } from 'react';
import { IcClose, IcSpark } from '../lib';

interface SocialProof {
  id: string;
  type: 'signup' | 'project' | 'testimonial' | 'achievement';
  message: string;
  timestamp: number;
}

const DEFAULT_PROOFS: SocialProof[] = [
  { id: '1', type: 'achievement', message: '🎉 Portfolio just hit 1,000+ views this month!', timestamp: Date.now() - 60000 },
  { id: '2', type: 'project', message: '✨ New project added: Volunteer Summit Campaign', timestamp: Date.now() - 180000 },
  { id: '3', type: 'testimonial', message: '💬 "Esther gave our campaigns a visual voice!" — Bramble Network', timestamp: Date.now() - 300000 },
  { id: '4', type: 'signup', message: '📧 Someone just subscribed to the newsletter', timestamp: Date.now() - 420000 },
  { id: '5', type: 'achievement', message: '🏆 Featured on Behance this week', timestamp: Date.now() - 600000 },
];

export function SocialProofPopup({ enabled = true }: { enabled?: boolean }) {
  const [currentProof, setCurrentProof] = useState<SocialProof | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [proofIndex, setProofIndex] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const showNextProof = () => {
      const proof = DEFAULT_PROOFS[proofIndex % DEFAULT_PROOFS.length];
      setCurrentProof(proof);
      setIsVisible(true);
      setProofIndex(prev => prev + 1);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Show first popup after 10 seconds
    const initialTimer = setTimeout(showNextProof, 10000);

    // Then show every 30 seconds
    const interval = setInterval(showNextProof, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [enabled, proofIndex]);

  const dismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || !currentProof) return null;

  return (
    <div
      className="fixed bottom-4 left-4 z-[9998] max-w-sm animate-slide-up"
      role="alert"
      aria-live="polite"
    >
      <div className="rounded-xl bg-white p-4 shadow-2xl border border-line">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20">
              <IcSpark className="h-5 w-5 text-gold" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-pine mb-1">
              Just now
            </p>
            <p className="text-sm text-ink leading-snug">
              {currentProof.message}
            </p>
          </div>
          <button
            onClick={dismiss}
            className="flex-shrink-0 text-slate hover:text-ink transition-colors"
            aria-label="Dismiss notification"
          >
            <IcClose className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
