import React, { useCallback, useEffect, useRef, useState } from 'react';
import './styles.scss';

export const Fullscreen = () => {
  const ref = useRef<HTMLDivElement>(null);

  // State variables to manage UI
  const [maxPortraitHeight, setMaxPortraitHeight] = useState(0);
  const [maxLandscapeHeight, setMaxLandscapeHeight] = useState(0);
  const [showSwipeUp, setShowSwipeUp] = useState(true);
  
  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo(0, window.innerHeight / 2);
  };

  // Function to check swipe up condition
  const onCheckSwipeUp = useCallback(() => {
    const wInnerHeight = window.innerHeight;
    const wInnerWidth = window.innerWidth;
    const isPortrait = wInnerHeight > wInnerWidth;

    const maxHeight = isPortrait ? maxPortraitHeight : maxLandscapeHeight;

    if (wInnerHeight >= maxHeight - 40) {
      if (isPortrait) {
        setMaxPortraitHeight(Math.max(wInnerHeight, maxPortraitHeight));
        setMaxLandscapeHeight(Math.max(wInnerWidth, maxLandscapeHeight));
      } else {
        setMaxLandscapeHeight(Math.max(wInnerHeight, maxLandscapeHeight));
        setMaxPortraitHeight(Math.max(wInnerWidth, maxPortraitHeight));
      }
      setShowSwipeUp(false);
    } else {
      setShowSwipeUp(true);
      scrollToTop();
    }
  }, [maxPortraitHeight, maxLandscapeHeight]);

  // Attach event listeners
  useEffect(() => {
    const handleResize = () => onCheckSwipeUp();
    const handleTouchEnd = () => {
      if (showSwipeUp) {
        onCheckSwipeUp();
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('touchend', handleTouchEnd, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('touchend', handleTouchEnd, true);
    };
  }, [maxPortraitHeight, maxLandscapeHeight, showSwipeUp, onCheckSwipeUp]);

  return (
    <>
      <div className="invisible-treadmill" />
      <div className="fullscreen-page text-center position-relative m-auto h-100 w-100">
        <section className="w-100 h-100">
          <div className="h-100 fullscreen-content">
            <div
              className={`h-100 w-100 text-white bg-dark ${
                showSwipeUp ? 'no-swipe' : ''
              }`}
              ref={ref}
            >
              fullscreen
            </div>
          </div>
          <div className={showSwipeUp ? 'swipe-up show' : 'swipe-up'}>
            <span>swipe up</span>
          </div>
        </section>
      </div>
    </>
  );
};
