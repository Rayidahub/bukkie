import { useState, useEffect } from 'react';
import { IcChevronLeft, IcChevronRight } from '../lib';
import { Testimonial } from '../store';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export function TestimonialCarousel({ 
  testimonials, 
  autoPlay = true, 
  interval = 5000 
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoPlay || isPaused || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Testimonial Card */}
      <div className="relative overflow-hidden">
        <div 
          className="transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div className="flex">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="card p-8 md:p-12">
                  <div className="flex flex-col h-full">
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <svg className="h-12 w-12 text-gold opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Quote Text */}
                    <blockquote className="flex-1 mb-8">
                      <p className="text-lg md:text-xl text-ink leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-14 w-14 rounded-full object-cover border-2 border-gold"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-full bg-pine flex items-center justify-center text-white font-bold text-xl">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-ink">{testimonial.name}</p>
                        <p className="text-sm text-slate">{testimonial.role}</p>
                        <p className="text-xs text-gold font-semibold">{testimonial.org}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {testimonials.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110"
            aria-label="Previous testimonial"
          >
            <IcChevronLeft className="h-6 w-6 text-pine" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110"
            aria-label="Next testimonial"
          >
            <IcChevronRight className="h-6 w-6 text-pine" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-gold'
                  : 'w-2 bg-pine/20 hover:bg-pine/40'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {autoPlay && testimonials.length > 1 && !isPaused && (
        <div className="mt-4 h-1 bg-pine/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold rounded-full transition-all"
            style={{
              animation: `progress ${interval}ms linear`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
