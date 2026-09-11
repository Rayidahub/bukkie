import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
  description: string;
}

/**
 * Hook to register keyboard shortcuts
 * @param shortcuts - Array of keyboard shortcuts to register
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      shortcuts.forEach((shortcut) => {
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrlKey ? e.ctrlKey || e.metaKey : true;
        const shiftMatch = shortcut.shiftKey ? e.shiftKey : true;
        const altMatch = shortcut.altKey ? e.altKey : true;

        if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
          e.preventDefault();
          shortcut.action();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

/**
 * Default keyboard shortcuts for the portfolio
 */
export function usePortfolioShortcuts() {
  const navigate = useNavigate();

  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'h',
      action: () => navigate('/'),
      description: 'Go to Home',
    },
    {
      key: 's',
      action: () => navigate('/services'),
      description: 'Go to Services',
    },
    {
      key: 'a',
      action: () => navigate('/about'),
      description: 'Go to About',
    },
    {
      key: 'p',
      action: () => navigate('/projects'),
      description: 'Go to Projects',
    },
    {
      key: 'b',
      action: () => navigate('/blog'),
      description: 'Go to Blog',
    },
    {
      key: 't',
      action: () => navigate('/testimonials'),
      description: 'Go to Testimonials',
    },
    {
      key: 'c',
      action: () => navigate('/contact'),
      description: 'Go to Contact',
    },
    {
      key: '/',
      action: () => {
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      },
      description: 'Focus search',
    },
    {
      key: 'Escape',
      action: () => {
        // Close any open modals or lightboxes
        const closeButtons = document.querySelectorAll('[aria-label="Close"]');
        if (closeButtons.length > 0) {
          (closeButtons[0] as HTMLButtonElement).click();
        }
      },
      description: 'Close modal',
    },
  ];

  useKeyboardShortcuts(shortcuts);
}
