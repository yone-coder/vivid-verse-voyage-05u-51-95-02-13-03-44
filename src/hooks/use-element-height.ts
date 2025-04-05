
import { useState, useEffect, RefObject } from 'react';

export function useElementHeight(ref: RefObject<HTMLElement>): number {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight);
      }
    };

    // Initial measurement
    updateHeight();

    // Set up resize observer to detect changes
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(ref.current);

    // Cleanup
    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
      resizeObserver.disconnect();
    };
  }, [ref]);

  return height;
}
