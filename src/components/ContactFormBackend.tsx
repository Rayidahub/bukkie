import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { IcCheck, IcArrowRight, IcSpark } from '../lib';

export function ContactFormBackend() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name');
      setStatus('error');
      return;
    }

    if (!formData.email) {
      setErrorMessage('Please enter your email');
      setStatus('error');
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    if (!formData.message.trim()) {
      setErrorMessage('Please enter a message');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.toLowerCase().trim(),
            organization: formData.organization.trim() || null,
            service: formData.service || null,
            message: formData.message.trim(),
            status: 'new'
          }
        ]);

      if (error) {
        setErrorMessage('Something went wrong. Please try again or email directly.');
        setStatus('error');
      } else {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          organization: '',
          service: '',
          message: ''
        });
      }
    } catch (err) {
      setErrorMessage('Network error. Please check your connection.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold">
          <IcCheck className="h-8 w-8 text-pine" />
        </div>
        <h3 className="mb-2 font-display text-2xl font-bold text-ink">Message sent!</h3>
        <p className="text-slate mb-6">
          Thanks for reaching out. I'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm font-bold text-pine hover:text-pine-dark transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8">
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <IcSpark className="h-5 w-5 text-gold" />
          <span className="text-xs font-bold uppercase tracking-wider text-pine">
            Send a message
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold text-ink mb-2">
          Let's work together
        </h3>
        <p className="text-slate text-sm">
          Fill out the form below and I'll get back to you within 24 hours.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="input-base"
              disabled={status === 'loading'}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="input-base"
              disabled={status === 'loading'}
              required
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="organization" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate">
              Organization
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Company name (optional)"
              className="input-base"
              disabled={status === 'loading'}
            />
          </div>
          <div>
            <label htmlFor="service" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate">
              Service needed
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="input-base cursor-pointer"
              disabled={status === 'loading'}
            >
              <option value="">Select a service</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Social Media Design">Social Media Design</option>
              <option value="Branding">Branding</option>
              <option value="Print Design">Print Design</option>
              <option value="Digital Media">Digital Media</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            rows={5}
            className="input-base resize-none"
            disabled={status === 'loading'}
            required
          />
        </div>

        {status === 'error' && errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-lg bg-pine px-6 py-3 font-bold text-white transition-all hover:bg-pine-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <IcArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
