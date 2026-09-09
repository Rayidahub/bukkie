import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { IcSpark, IcCheck, IcArrowRight } from '../lib';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setErrorMessage('Please enter your email address');
      setStatus('error');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          { 
            email: email.toLowerCase().trim(),
            name: name.trim() || null,
            source: 'website'
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          setErrorMessage('This email is already subscribed!');
        } else {
          setErrorMessage('Something went wrong. Please try again.');
        }
        setStatus('error');
      } else {
        setStatus('success');
        setEmail('');
        setName('');
      }
    } catch (err) {
      setErrorMessage('Network error. Please check your connection.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-pine p-8 text-center text-white">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold">
          <IcCheck className="h-8 w-8 text-pine" />
        </div>
        <h3 className="mb-2 font-display text-2xl font-bold">You're subscribed!</h3>
        <p className="text-white/70">
          Thanks for joining. You'll receive updates about new projects and insights.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-gold hover:text-honey transition-colors"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-pine p-8 text-white">
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <IcSpark className="h-5 w-5 text-gold" />
          <span className="text-xs font-bold uppercase tracking-wider text-gold">
            Newsletter
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold mb-2">
          Stay in the loop
        </h3>
        <p className="text-white/70 text-sm">
          Get updates on new projects, design insights, and creative tips. No spam, unsubscribe anytime.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {name || status === 'idle' ? (
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
              disabled={status === 'loading'}
            />
          </div>
        ) : null}
        
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') {
                setStatus('idle');
                setErrorMessage('');
              }
            }}
            placeholder="your@email.com"
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
            disabled={status === 'loading'}
            required
          />
        </div>

        {status === 'error' && errorMessage && (
          <p className="text-sm text-red-300">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-lg bg-gold px-6 py-3 font-bold text-pine transition-all hover:bg-honey disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-pine/20 border-t-pine"></div>
              Subscribing...
            </>
          ) : (
            <>
              Subscribe
              <IcArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-4 text-xs text-white/50">
        By subscribing, you agree to receive emails from Esther Bukola. You can unsubscribe at any time.
      </p>
    </div>
  );
}
