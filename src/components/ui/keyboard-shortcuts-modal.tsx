/**
 * Keyboard Shortcuts Help Modal
 * Shows all available keyboard shortcuts to users
 * Triggered by Shift+? or from Command Palette
 */

'use client';

import { Badge } from '@/components/ui/badge';
import { ShortcutCategory, formatShortcut } from '@/lib/services/keyboard-shortcuts';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortcuts: ShortcutCategory[];
}

export function KeyboardShortcutsModal({
  isOpen,
  onClose,
  shortcuts,
}: KeyboardShortcutsModalProps) {
  if (!isOpen) return null;

  // Handle Escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-modal-title"
    >
      <div className="w-full max-w-4xl max-h-[80vh] overflow-hidden bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Keyboard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2
                id="shortcuts-modal-title"
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                Keyboard Shortcuts
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                Power-user features for quick navigation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close shortcuts modal"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-120px)] p-6">
          {shortcuts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Keyboard className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>No keyboard shortcuts available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shortcuts.map((category) => (
                <div key={category.name} className="space-y-3">
                  {/* Category Header */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                    {category.name}
                  </h3>

                  {/* Shortcuts List */}
                  <div className="space-y-2">
                    {category.shortcuts.map((shortcut, index) => (
                      <div
                        key={`${category.name}-${index}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                          {shortcut.description}
                        </span>
                        <Badge
                          variant="secondary"
                          className="font-mono text-xs ml-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1"
                        >
                          {formatShortcut(shortcut)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Badge variant="outline" className="px-2 py-0.5 text-xs">
              Shift + ?
            </Badge>
            <span>to show this dialog</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Badge variant="outline" className="px-2 py-0.5 text-xs">
              esc
            </Badge>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
