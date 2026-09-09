import { useRef, useCallback } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

interface SwipeOptions {
  threshold?: number;
  restraint?: number;
  timeout?: number;
}

export function useSwipe(
  handlers: SwipeHandlers,
  options: SwipeOptions = {}
) {
  const { threshold = 50, restraint = 100, timeout = 500 } = options;
  
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
      time: Date.now(),
    };
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return;

    const distX = touchStart.current.x - touchEnd.current.x;
    const distY = touchStart.current.y - touchEnd.current.y;
    const time = Date.now() - touchStart.current.time;

    // Check if swipe was fast enough
    if (time > timeout) return;

    // Check if movement was primarily horizontal or vertical
    const isHorizontal = Math.abs(distX) > Math.abs(distY);
    const isVertical = Math.abs(distY) > Math.abs(distX);

    // Check if swipe exceeded threshold
    if (isHorizontal && Math.abs(distX) > threshold) {
      if (distX > 0) {
        handlers.onSwipeLeft?.();
      } else {
        handlers.onSwipeRight?.();
      }
    } else if (isVertical && Math.abs(distY) > threshold) {
      if (distY > 0) {
        handlers.onSwipeUp?.();
      } else {
        handlers.onSwipeDown?.();
      }
    }

    touchStart.current = null;
    touchEnd.current = null;
  }, [handlers, threshold, timeout]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
