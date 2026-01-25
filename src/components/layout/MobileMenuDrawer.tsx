"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Home, BookOpen, FileText, Gamepad2, User, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuDrawer({ isOpen, onClose }: MobileMenuDrawerProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();

  // ✅ REMOVED: The problematic useEffect that auto-closed on pathname change
  // It was causing issues because onClose reference changed on every render
  // Now we handle closes explicitly via onClick handlers

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const mainMenuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", description: "Your progress & stats" },
    { icon: BookOpen, label: "Practice", href: "/practice", description: "ACLS & PALS questions" },
    { icon: FileText, label: "Exam Mode", href: "/exam", description: "Timed practice exams" },
    { icon: Gamepad2, label: "Quiz Arena", href: "/quiz-arena", description: "Multiplayer quizzes" },
    { icon: User, label: "Profile", href: "/profile", description: "Your account settings" },
  ];

  const secondaryMenuItems = [
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: HelpCircle, label: "Support", href: "/support" },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/" || pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  // ❌ REMOVED: Don't auto-close when clicking links
  // Menu should only close via X button or Menu button toggle

  return (
    <>
      {/* Backdrop - Does NOT close menu when clicked */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Drawer - COMPLETELY HIDDEN when closed */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-[280px] bg-white dark:bg-gray-900 z-[70] transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none invisible"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {user?.imageUrl && (
              <img
                src={user.imageUrl}
                alt={user.firstName || "User"}
                className="w-10 h-10 rounded-full ring-2 ring-blue-500"
              />
            )}
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{user?.firstName || "Student"}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-[80]"
            aria-label="Close menu"
            type="button"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Main Menu Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2">
            <div className="space-y-1">
              {mainMenuItems.map(({ icon: Icon, label, href, description }) => {
                const active = isActive(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                      ${
                        active
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }
                    `}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={active ? 2.5 : 2} />
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${active ? "font-semibold" : ""}`}>{label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
                    </div>
                    {active && <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200 dark:border-gray-700" />

            {/* Secondary Menu Items */}
            <div className="space-y-1">
              {secondaryMenuItems.map(({ icon: Icon, label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Footer - Sign Out */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
