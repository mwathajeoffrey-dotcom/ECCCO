"use client";

import { BookOpen, FileText, Gamepad2, User, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NewMobileNavProps {
  onMenuClick: () => void;
}

export function NewMobileNav({ onMenuClick }: NewMobileNavProps) {
  const pathname = usePathname();

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
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-30"
      role="navigation"
      aria-label="Mobile bottom navigation"
    >
      <div className="flex items-center safe-area-bottom">
        {/* Hamburger Menu - Left Corner */}
        <button
          onClick={onMenuClick}
          className="flex flex-col items-center justify-center flex-1 py-2 px-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 mb-1" strokeWidth={2} />
          <span className="text-xs font-normal">Menu</span>
        </button>

        {/* Nav Items */}
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
  );
}
