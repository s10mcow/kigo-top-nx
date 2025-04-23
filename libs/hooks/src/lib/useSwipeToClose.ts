'use client';

import { useCallback, useEffect, useState } from 'react';
import { SwipeEventData, useSwipeable } from 'react-swipeable';

interface SwipeToCloseResult {
  swipeOffset: number;
  handlers: ReturnType<typeof useSwipeable>;
}

/**
 * A hook that provides swipe-to-close functionality for modals and drawers
 * @param onClose - Callback function to close the modal/drawer
 * @param enabled - Whether the swipe functionality is enabled
 * @returns Object containing swipe offset and handlers for the swipeable element
 */
export const useSwipeToClose = (
  onClose?: () => void,
  enabled = false,
): SwipeToCloseResult => {
  const [swipeOffset, setSwipeOffset] = useState(0);

  useEffect(() => {
    // Reset swipe offset when disabled
    if (!enabled) {
      setSwipeOffset(0);
    }
  }, [enabled]);

  const handlers = useSwipeable({
    onSwiping: useCallback(
      (eventData: SwipeEventData) => {
        if (enabled && eventData.deltaY > 0) {
          eventData.event.preventDefault();
          eventData.event.stopPropagation();
          setSwipeOffset(Math.min(eventData.deltaY, 200));
        }
      },
      [enabled],
    ),

    onSwipedDown: useCallback(() => {
      if (enabled && onClose && swipeOffset > 50) {
        onClose();
      }
      setSwipeOffset(0);
    }, [enabled, onClose, swipeOffset]),

    onTouchEndOrOnMouseUp: useCallback(() => {
      setSwipeOffset(0);
    }, []),

    preventScrollOnSwipe: true,
    trackMouse: false,
    trackTouch: true,
  });

  return { swipeOffset, handlers };
};
