import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component scrolls the page to the top whenever the route changes.
 * It listens to changes in the current location's pathname and triggers `window.scrollTo(0, 0)` to reset the scroll position.
 *
 * @component
 * @example
 * // Usage:
 * <ScrollToTop />
 *
 * @returns {null} This component does not render anything in the DOM.
 */

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
