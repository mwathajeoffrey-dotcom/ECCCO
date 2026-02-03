"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { MobileMenuDrawer } from "../layout/MobileMenuDrawer";
import { useMediaQuery } from "@/lib/useMediaQuery";

export function DesktopMenuButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Menu Button - Only visible on desktop (>=768px) - Fixed position, no animations */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="hidden md:flex fixed top-6 left-6 z-40 items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" strokeWidth={2} />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Menu</span>
      </button>

      {/* Menu Drawer - ONLY FOR DESKTOP - Hidden on mobile to avoid conflicts */}
      {useMediaQuery("(min-width: 768px)") && (
        <div>
          <MobileMenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} source="desktop" />
        </div>
      )}
    </>
  );
}
