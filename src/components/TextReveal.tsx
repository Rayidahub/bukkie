import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from '../lib';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  type?: 'word' | 'letter' | 'line';
}

export function TextReveal({
  children,
  className = '',
  delay = 0,
  stagger = 50,
  type = 'word',
}: TextRevealProps) {
  const [ref, isInView] = useInView<HTMLSpanElement>(0.3);
  const reducedMotion = useReducedMotion();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const items = type === 'word' 
    ? children.split(' ')
    : type === 'letter'
    ? children.split('')
    : [children];

  useEffect(() => {
    if (!isInView || reducedMotion) {
      if (reducedMotion) {
        setVisibleItems(items.map((_, i) => i));
      }
      return;
    }

    setVisibleItems([]);
    
    items.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, delay + index * stagger);
    });
  }, [isInView, delay, stagger, items.length, reducedMotion]);

  if (type === 'line') {
    return (
      <span ref={ref} className={`inline-block ${className}`}>
        <span
          className="inline-block transition-all duration-700 ease-out"
          style={{
            opacity: visibleItems.includes(0) ? 1 : 0,
            transform: visibleItems.includes(0) ? 'translateY(0)' : 'translateY(100%)',
          }}
        >
          {children}
        </span>
      </span>
    );
  }

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {items.map((item, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-500 ease-out"
          style={{
            opacity: visibleItems.includes(index) ? 1 : 0,
            transform: visibleItems.includes(index) ? 'translateY(0)' : 'translateY(100%)',
            marginRight: type === 'word' ? '0.25em' : '0',
          }}
        >
          {item}
        </span>
      ))}
    </span>
  );
}
