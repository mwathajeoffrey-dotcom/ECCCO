"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingPracticeButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Show button when scrolling up, hide when scrolling down (except at top)
          if (currentScrollY < lastScrollY || currentScrollY < 100) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Link
      href="/exam?count=10&mode=quick"
      className={`
        fixed z-40 group transition-all duration-300

        /* IMPORTANT: Hidden on mobile - Practice is already in bottom nav */
        hidden md:flex

        /* Desktop only: Top left corner, fixed position */
        md:top-6 md:left-6

        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      aria-label="Quick Practice - 10 Random Questions"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Button - Compact and elegant */}
      <div
        className="
        relative
        bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600
        text-white
        p-4
        rounded-full
        shadow-lg
        hover:shadow-blue-500/50
        hover:from-blue-700
        hover:via-indigo-700
        hover:to-purple-700
        transition-all
        duration-300
        hover:scale-110
        active:scale-95
        flex
        items-center
        justify-center
        ring-2
        ring-white/20
        dark:ring-gray-900/20
      "
      >
        <Zap className="w-6 h-6 drop-shadow-lg" fill="currentColor" />

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
      </div>

      {/* Desktop Tooltip - Appears on right side */}
      <div
        className={`
          absolute left-full top-1/2 -translate-y-1/2 ml-3
          hidden md:block
          transition-all duration-200
          ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
        `}
      >
        <div className="bg-gray-900 dark:bg-gray-800 text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap shadow-2xl border border-gray-700">
          <span className="font-semibold">⚡ Quick Practice</span>
          <span className="text-gray-300 ml-2">• 10 Questions</span>
        </div>
        {/* Arrow - pointing left */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-t-transparent border-b-transparent border-r-gray-900 dark:border-r-gray-800" />
      </div>

      {/* Subtle pulse effect */}
      <div className="absolute inset-0 rounded-full bg-blue-400 animate-pulse opacity-10" />
    </Link>
  );
}
