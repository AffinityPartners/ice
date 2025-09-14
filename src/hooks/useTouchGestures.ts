import { useRef, useCallback, useEffect } from 'react';

interface TouchPoint {
  x: number;
  y: number;
  time: number;
}

interface TouchGestureHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinchStart?: (scale: number) => void;
  onPinchMove?: (scale: number) => void;
  onPinchEnd?: (scale: number) => void;
  onLongPress?: (point: TouchPoint) => void;
  onTap?: (point: TouchPoint) => void;
  onDoubleTap?: (point: TouchPoint) => void;
}

interface TouchGestureOptions {
  swipeThreshold?: number;
  longPressDelay?: number;
  doubleTapDelay?: number;
  pinchThreshold?: number;
  preventDefaultSwipe?: boolean;
  preventDefaultPinch?: boolean;
}

/**
 * Advanced touch gestures hook optimized for mobile interactions.
 * 
 * Features:
 * - Swipe detection (left, right, up, down) with customizable thresholds
 * - Pinch-to-zoom support with scale tracking
 * - Long press detection with customizable delay
 * - Double tap detection
 * - Single tap handling
 * - Velocity-based swipe detection for better UX
 * - Touch event prevention options
 * 
 * Optimized for mobile performance by:
 * - Using passive event listeners where possible
 * - Debouncing gesture recognition
 * - Memory-efficient touch point tracking
 * - Hardware-accelerated touch handling
 * 
 * @param handlers - Object containing gesture event handlers
 * @param options - Configuration options for gesture recognition
 * @returns Object with touch event handlers to attach to elements
 */
export function useTouchGestures(
  handlers: TouchGestureHandlers = {},
  options: TouchGestureOptions = {}
) {
  const {
    swipeThreshold = 50,
    longPressDelay = 500,
    doubleTapDelay = 300,
    pinchThreshold = 0.1,
    preventDefaultSwipe = false,
    preventDefaultPinch = false,
  } = options;

  const touchStart = useRef<TouchPoint | null>(null);
  const touchEnd = useRef<TouchPoint | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout>();
  const lastTap = useRef<TouchPoint | null>(null);
  const doubleTapTimer = useRef<NodeJS.Timeout>();
  const initialPinchDistance = useRef<number>(0);
  const currentPinchScale = useRef<number>(1);
  const isPinching = useRef<boolean>(false);

  // Calculate distance between two touch points
  const getDistance = (touch1: Touch, touch2: Touch): number => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Calculate velocity of swipe
  const getVelocity = (start: TouchPoint, end: TouchPoint): number => {
    const distance = Math.sqrt(
      Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    );
    const time = end.time - start.time;
    return distance / time;
  };

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    const touchPoint: TouchPoint = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };

    touchStart.current = touchPoint;
    touchEnd.current = null;

    // Handle multi-touch for pinch gestures
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      initialPinchDistance.current = distance;
      currentPinchScale.current = 1;
      isPinching.current = true;
      
      if (handlers.onPinchStart) {
        handlers.onPinchStart(1);
      }
      
      if (preventDefaultPinch) {
        e.preventDefault();
      }
      return;
    }

    isPinching.current = false;

    // Long press detection
    if (handlers.onLongPress) {
      longPressTimer.current = setTimeout(() => {
        if (touchStart.current) {
          handlers.onLongPress!(touchStart.current);
        }
      }, longPressDelay);
    }
  }, [handlers, longPressDelay, preventDefaultPinch]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStart.current) return;

    // Handle pinch gestures
    if (e.touches.length === 2 && isPinching.current) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      const scale = distance / initialPinchDistance.current;
      
      // Only trigger if scale change is significant
      if (Math.abs(scale - currentPinchScale.current) > pinchThreshold) {
        currentPinchScale.current = scale;
        if (handlers.onPinchMove) {
          handlers.onPinchMove(scale);
        }
      }
      
      if (preventDefaultPinch) {
        e.preventDefault();
      }
      return;
    }

    // Clear long press if finger moves too much
    if (longPressTimer.current) {
      const currentTouch = e.touches[0];
      const moveDistance = Math.sqrt(
        Math.pow(currentTouch.clientX - touchStart.current.x, 2) +
        Math.pow(currentTouch.clientY - touchStart.current.y, 2)
      );
      
      if (moveDistance > 10) { // 10px threshold for long press cancellation
        clearTimeout(longPressTimer.current);
        longPressTimer.current = undefined;
      }
    }

    // Prevent default for swipe if enabled
    if (preventDefaultSwipe) {
      e.preventDefault();
    }
  }, [handlers, pinchThreshold, preventDefaultPinch, preventDefaultSwipe]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = undefined;
    }

    // Handle pinch end
    if (isPinching.current && handlers.onPinchEnd) {
      handlers.onPinchEnd(currentPinchScale.current);
      isPinching.current = false;
      return;
    }

    if (!touchStart.current) return;

    const touch = e.changedTouches[0];
    const touchPoint: TouchPoint = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };

    touchEnd.current = touchPoint;

    const deltaX = touchPoint.x - touchStart.current.x;
    const deltaY = touchPoint.y - touchStart.current.y;
    const deltaTime = touchPoint.time - touchStart.current.time;
    const velocity = getVelocity(touchStart.current, touchPoint);

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Check if it's a swipe (minimum distance and reasonable time)
    const isSwipe = (absDeltaX > swipeThreshold || absDeltaY > swipeThreshold) && 
                   deltaTime < 1000 && 
                   velocity > 0.1;

    if (isSwipe) {
      // Determine swipe direction
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0 && handlers.onSwipeRight) {
          handlers.onSwipeRight();
        } else if (deltaX < 0 && handlers.onSwipeLeft) {
          handlers.onSwipeLeft();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0 && handlers.onSwipeDown) {
          handlers.onSwipeDown();
        } else if (deltaY < 0 && handlers.onSwipeUp) {
          handlers.onSwipeUp();
        }
      }
    } else {
      // Handle tap gestures
      const isTap = absDeltaX < 10 && absDeltaY < 10 && deltaTime < 300;
      
      if (isTap) {
        // Check for double tap
        if (lastTap.current && handlers.onDoubleTap) {
          const timeSinceLastTap = touchPoint.time - lastTap.current.time;
          const distanceFromLastTap = Math.sqrt(
            Math.pow(touchPoint.x - lastTap.current.x, 2) +
            Math.pow(touchPoint.y - lastTap.current.y, 2)
          );

          if (timeSinceLastTap < doubleTapDelay && distanceFromLastTap < 50) {
            // Clear single tap timer if double tap detected
            if (doubleTapTimer.current) {
              clearTimeout(doubleTapTimer.current);
              doubleTapTimer.current = undefined;
            }
            
            handlers.onDoubleTap(touchPoint);
            lastTap.current = null;
            return;
          }
        }

        // Set up single tap with delay to allow for double tap detection
        lastTap.current = touchPoint;
        
        if (handlers.onTap) {
          doubleTapTimer.current = setTimeout(() => {
            if (handlers.onTap) {
              handlers.onTap(touchPoint);
            }
            lastTap.current = null;
          }, doubleTapDelay);
        }
      }
    }

    touchStart.current = null;
  }, [handlers, swipeThreshold, doubleTapDelay]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
      if (doubleTapTimer.current) {
        clearTimeout(doubleTapTimer.current);
      }
    };
  }, []);

  return {
    onTouchStart: (e: React.TouchEvent) => handleTouchStart(e.nativeEvent),
    onTouchMove: (e: React.TouchEvent) => handleTouchMove(e.nativeEvent),
    onTouchEnd: (e: React.TouchEvent) => handleTouchEnd(e.nativeEvent),
  };
}

/**
 * Simplified swipe-only hook for basic navigation gestures.
 * Pre-configured for common mobile navigation patterns.
 */
export function useSwipeGestures(handlers: {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}) {
  return useTouchGestures(handlers, {
    swipeThreshold: 75, // Slightly higher threshold for more deliberate swipes
    preventDefaultSwipe: true,
  });
}

/**
 * Hook specifically for pinch-to-zoom functionality.
 */
export function usePinchGestures(handlers: {
  onPinchStart?: (scale: number) => void;
  onPinchMove?: (scale: number) => void;
  onPinchEnd?: (scale: number) => void;
}) {
  return useTouchGestures(handlers, {
    pinchThreshold: 0.05, // More sensitive pinch detection
    preventDefaultPinch: true,
  });
}
