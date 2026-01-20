/**
 * Keyboard Shortcuts Service
 * Provides power-user features through keyboard shortcuts
 * Essential for medical professionals who need quick navigation
 */

'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { logger } from '@/lib/services/logger';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  description: string;
  action: () => void;
  category: string;
}

export interface ShortcutCategory {
  name: string;
  shortcuts: KeyboardShortcut[];
}

/**
 * Check if keyboard event matches shortcut definition
 */
function matchesShortcut(event: KeyboardEvent, shortcut: KeyboardShortcut): boolean {
  return (
    event.key.toLowerCase() === shortcut.key.toLowerCase() &&
    !!event.ctrlKey === !!shortcut.ctrl &&
    !!event.shiftKey === !!shortcut.shift &&
    !!event.altKey === !!shortcut.alt &&
    !!event.metaKey === !!shortcut.meta
  );
}

/**
 * Format shortcut for display
 */
export function formatShortcut(shortcut: KeyboardShortcut): string {
  const parts: string[] = [];
  
  if (shortcut.ctrl) parts.push('Ctrl');
  if (shortcut.meta) parts.push('⌘');
  if (shortcut.alt) parts.push('Alt');
  if (shortcut.shift) parts.push('Shift');
  parts.push(shortcut.key.toUpperCase());
  
  return parts.join(' + ');
}

/**
 * Hook to register and use keyboard shortcuts
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }
      
      for (const shortcut of shortcuts) {
        if (matchesShortcut(event, shortcut)) {
          event.preventDefault();
          logger.debug('Keyboard shortcut triggered', {
            shortcut: formatShortcut(shortcut),
            description: shortcut.description,
          });
          shortcut.action();
          break;
        }
      }
    },
    [shortcuts]
  );
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

/**
 * Get default shortcuts for the application
 */
export function useDefaultShortcuts(): ShortcutCategory[] {
  const router = useRouter();
  
  return [
    {
      name: 'Navigation',
      shortcuts: [
        {
          key: 'h',
          ctrl: true,
          description: 'Go to Dashboard',
          action: () => router.push('/dashboard'),
          category: 'navigation',
        },
        {
          key: 'p',
          ctrl: true,
          description: 'Go to Practice',
          action: () => router.push('/practice'),
          category: 'navigation',
        },
        {
          key: 'e',
          ctrl: true,
          description: 'Go to Evidence Search',
          action: () => router.push('/evidence'),
          category: 'navigation',
        },
        {
          key: 'm',
          ctrl: true,
          description: 'Go to Modules',
          action: () => router.push('/modules'),
          category: 'navigation',
        },
        {
          key: 'b',
          ctrl: true,
          description: 'Go to Bookmarks',
          action: () => router.push('/bookmarks'),
          category: 'navigation',
        },
      ],
    },
    {
      name: 'Actions',
      shortcuts: [
        {
          key: '/',
          ctrl: true,
          description: 'Focus Search',
          action: () => {
            const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
            searchInput?.focus();
          },
          category: 'actions',
        },
        {
          key: 'k',
          ctrl: true,
          description: 'Open Command Palette',
          action: () => {
            // Trigger command palette (implement this component)
            logger.debug('Command palette requested');
          },
          category: 'actions',
        },
        {
          key: 'n',
          ctrl: true,
          description: 'New Quiz Session',
          action: () => router.push('/practice'),
          category: 'actions',
        },
      ],
    },
    {
      name: 'Quiz Controls',
      shortcuts: [
        {
          key: '1',
          alt: true,
          description: 'Select Answer A',
          action: () => {
            const answerA = document.querySelector('[data-answer="a"]') as HTMLElement;
            answerA?.click();
          },
          category: 'quiz',
        },
        {
          key: '2',
          alt: true,
          description: 'Select Answer B',
          action: () => {
            const answerB = document.querySelector('[data-answer="b"]') as HTMLElement;
            answerB?.click();
          },
          category: 'quiz',
        },
        {
          key: '3',
          alt: true,
          description: 'Select Answer C',
          action: () => {
            const answerC = document.querySelector('[data-answer="c"]') as HTMLElement;
            answerC?.click();
          },
          category: 'quiz',
        },
        {
          key: '4',
          alt: true,
          description: 'Select Answer D',
          action: () => {
            const answerD = document.querySelector('[data-answer="d"]') as HTMLElement;
            answerD?.click();
          },
          category: 'quiz',
        },
        {
          key: 'Enter',
          description: 'Submit Answer',
          action: () => {
            const submitBtn = document.querySelector('[data-action="submit"]') as HTMLElement;
            submitBtn?.click();
          },
          category: 'quiz',
        },
        {
          key: 'n',
          description: 'Next Question',
          action: () => {
            const nextBtn = document.querySelector('[data-action="next"]') as HTMLElement;
            nextBtn?.click();
          },
          category: 'quiz',
        },
      ],
    },
    {
      name: 'General',
      shortcuts: [
        {
          key: '?',
          shift: true,
          description: 'Show Keyboard Shortcuts',
          action: () => {
            // Show shortcuts modal (implement this)
            logger.debug('Shortcuts help requested');
          },
          category: 'general',
        },
        {
          key: 'Escape',
          description: 'Close Modal/Dialog',
          action: () => {
            const closeBtn = document.querySelector('[data-action="close"]') as HTMLElement;
            closeBtn?.click();
          },
          category: 'general',
        },
      ],
    },
  ];
}

/**
 * Keyboard shortcuts help modal component
 */
export function KeyboardShortcutsHelp({ 
  categories, 
  onClose 
}: { 
  categories: ShortcutCategory[];
  onClose: () => void;
}) {
  useKeyboardShortcuts([
    {
      key: 'Escape',
      description: 'Close shortcuts help',
      action: onClose,
      category: 'general',
    },
  ]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Keyboard Shortcuts
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Use these shortcuts to navigate and interact with ECCCO more efficiently
          </p>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category.name}>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {category.name}
                </h3>
                <div className="space-y-2">
                  {category.shortcuts.map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-700">
                        {shortcut.description}
                      </span>
                      <kbd className="px-3 py-1.5 text-sm font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg">
                        {formatShortcut(shortcut)}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default useKeyboardShortcuts;
