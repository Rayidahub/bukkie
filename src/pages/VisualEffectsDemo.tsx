import { useState } from 'react';
import { ImageComparison } from '../components/ImageComparison';
import { ParallaxSection } from '../components/ParallaxSection';
import { TextReveal } from '../components/TextReveal';
import { MagneticButton } from '../components/MagneticButton';
import { ParticleBackground } from '../components/ParticleBackground';
import { CountUp } from '../lib';
import { yearsOfExperience } from '../data';

export function VisualEffectsDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-mist">
      {/* Particle Background Demo */}
      <section className="relative h-[60vh] bg-pine overflow-hidden">
        <ParticleBackground particleCount={80} particleColor="#f7b900" speed={0.8} />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <TextReveal type="word" stagger={150} className="font-display text-5xl font-black">
              Particle Background Effects
            </TextReveal>
            <p className="mt-4 text-xl text-white/70">
              Interactive particles with connections
            </p>
          </div>
        </div>
      </section>

      {/* Text Reveal Demo */}
      <section className="container-x py-20">
        <h2 className="font-display text-4xl font-black text-ink mb-8">
          Text Reveal Animations
        </h2>
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-soft">
            <p className="text-sm font-bold text-pine mb-2">Word by Word:</p>
            <p className="text-2xl font-bold text-ink">
              <TextReveal type="word" stagger={100}>
                Each word appears one by one with a smooth animation
              </TextReveal>
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-soft">
            <p className="text-sm font-bold text-pine mb-2">Letter by Letter:</p>
            <p className="text-2xl font-bold text-ink">
              <TextReveal type="letter" stagger={30}>
                Individual letters create a typewriter effect
              </TextReveal>
            </p>
          </div>
        </div>
      </section>

      {/* Parallax Demo */}
      <section className="container-x py-20">
        <h2 className="font-display text-4xl font-black text-ink mb-8">
          Parallax Scrolling
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ParallaxSection speed={0.2}>
            <div className="bg-gold p-8 rounded-2xl shadow-soft">
              <p className="text-sm font-bold text-pine mb-2">Slow (0.2)</p>
              <p className="text-ink font-bold">This moves slowly</p>
            </div>
          </ParallaxSection>
          <ParallaxSection speed={0.5}>
            <div className="bg-pine p-8 rounded-2xl shadow-soft text-white">
              <p className="text-sm font-bold text-gold mb-2">Medium (0.5)</p>
              <p className="font-bold">This moves at medium speed</p>
            </div>
          </ParallaxSection>
          <ParallaxSection speed={0.8}>
            <div className="bg-white p-8 rounded-2xl shadow-soft">
              <p className="text-sm font-bold text-pine mb-2">Fast (0.8)</p>
              <p className="text-ink font-bold">This moves quickly</p>
            </div>
          </ParallaxSection>
        </div>
      </section>

      {/* Magnetic Buttons Demo */}
      <section className="container-x py-20">
        <h2 className="font-display text-4xl font-black text-ink mb-8">
          Magnetic Buttons
        </h2>
        <p className="text-slate mb-8">Hover over the buttons to see the magnetic effect</p>
        <div className="flex flex-wrap gap-6">
          <MagneticButton strength={0.3}>
            <button className="btn btn-pine">
              Magnetic Button 1
            </button>
          </MagneticButton>
          <MagneticButton strength={0.5}>
            <button className="btn btn-gold">
              Stronger Pull
            </button>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <button className="btn btn-outline">
              Subtle Effect
            </button>
          </MagneticButton>
        </div>
      </section>

      {/* Image Comparison Demo */}
      <section className="container-x py-20">
        <h2 className="font-display text-4xl font-black text-ink mb-8">
          Before/After Image Comparison
        </h2>
        <p className="text-slate mb-8">Drag the slider to compare before and after</p>
        <div className="max-w-4xl mx-auto">
          <ImageComparison
            beforeImage="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop"
            afterImage="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop&sat=-100"
            beforeLabel="Original"
            afterLabel="Enhanced"
            className="aspect-video rounded-2xl shadow-lift"
          />
        </div>
      </section>

      {/* Animated Counters Demo */}
      <section className="container-x py-20">
        <h2 className="font-display text-4xl font-black text-ink mb-8">
          Animated Counters
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-soft text-center">
            <p className="font-display text-5xl font-black text-pine">
              <CountUp to={yearsOfExperience()} suffix="+" duration={2000} />
            </p>
            <p className="mt-2 text-sm font-bold text-slate">Years Experience</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-soft text-center">
            <p className="font-display text-5xl font-black text-pine">
              <CountUp to={150} suffix="+" duration={2000} />
            </p>
            <p className="mt-2 text-sm font-bold text-slate">Projects Done</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-soft text-center">
            <p className="font-display text-5xl font-black text-pine">
              <CountUp to={98} suffix="%" duration={2000} />
            </p>
            <p className="mt-2 text-sm font-bold text-slate">Client Satisfaction</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-soft text-center">
            <p className="font-display text-5xl font-black text-pine">
              <CountUp to={24} suffix="/7" duration={2000} />
            </p>
            <p className="mt-2 text-sm font-bold text-slate">Support Available</p>
          </div>
        </div>
      </section>

      {/* Custom Cursor Info */}
      <section className="container-x py-20">
        <h2 className="font-display text-4xl font-black text-ink mb-8">
          Custom Cursor
        </h2>
        <div className="bg-white p-8 rounded-2xl shadow-soft">
          <p className="text-slate mb-4">
            Move your mouse around to see the custom cursor effect. The cursor changes when hovering over interactive elements.
          </p>
          <div className="flex gap-4">
            <button className="btn btn-pine">Hover Me</button>
            <a href="#" className="btn btn-outline">Or Me</a>
          </div>
        </div>
      </section>
    </div>
  );
}
