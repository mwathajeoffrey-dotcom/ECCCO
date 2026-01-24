"use client";

import { Menu, BookOpen, FileText, Gamepad2, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MobileMenuDrawer } from "./MobileMenuDrawer";

export function MobileBottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Show nav when scrolling up, hide when scrolling down
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

  const navItems = [
    { icon: BookOpen, label: "Practice", href: "/practice" },
    { icon: FileText, label: "Exam", href: "/exam" },
    { icon: Gamepad2, label: "Quiz", href: "/quiz-arena" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Mobile Bottom Navigation - Only visible on mobile (<768px) */}
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-30 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        role="navigation"
        aria-label="Mobile bottom navigation"
      >
        <div className="flex justify-around items-center safe-area-bottom">
          {/* Menu Button - First position */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center justify-center flex-1 py-2 px-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 mb-1" strokeWidth={2} />
            <span className="text-xs font-normal">Menu</span>
          </button>

          {/* Other nav items */}
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center flex-1 py-2 px-1 transition-colors ${
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
                aria-label={label}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="w-6 h-6 mb-1" strokeWidth={active ? 2.5 : 2} />
                <span className={`text-xs ${active ? "font-semibold" : "font-normal"}`}>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
