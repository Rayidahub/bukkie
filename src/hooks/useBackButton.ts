import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hook to handle browser back button smoothly
 * Scrolls to top when navigating back
 */
export function useBackButtonHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      // Scroll to top smoothly when navigating back
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return navigate;
}
