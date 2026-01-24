/**
 * Keyboard Shortcuts Provider
 * Manages state and shortcuts for the keyboard shortcuts modal
 */

"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { KeyboardShortcutsModal } from "@/components/ui/keyboard-shortcuts-modal";
import { useDefaultShortcuts, ShortcutCategory } from "@/lib/services/keyboard-shortcuts";
import { logger } from "@/lib/services/logger";

interface KeyboardShortcutsContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextType | undefined>(undefined);

export function useKeyboardShortcutsModal() {
  const context = useContext(KeyboardShortcutsContext);
  if (!context) {
    throw new Error("useKeyboardShortcutsModal must be used within KeyboardShortcutsProvider");
  }
  return context;
}

interface KeyboardShortcutsProviderProps {
  children: React.ReactNode;
}

export function KeyboardShortcutsProvider({ children }: KeyboardShortcutsProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shortcuts = useDefaultShortcuts();

  const open = useCallback(() => {
    logger.debug("Opening keyboard shortcuts modal");
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    logger.debug("Closing keyboard shortcuts modal");
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Global keyboard shortcut (Shift+?)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "?") {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  return (
    <KeyboardShortcutsContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
      <KeyboardShortcutsModal isOpen={isOpen} onClose={close} shortcuts={shortcuts} />
    </KeyboardShortcutsContext.Provider>
  );
}
