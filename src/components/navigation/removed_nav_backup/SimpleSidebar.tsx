"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { X, Home, Trophy, BookOpen, Gamepad2, User as UserIcon, LogIn } from "lucide-react";

interface SimpleSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SimpleSidebar({ isOpen, onClose }: SimpleSidebarProps) {
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    ...(isSignedIn
      ? [
          { href: "/dashboard", label: "Dashboard", icon: Trophy },
          { href: "/practice", label: "Practice", icon: BookOpen },
          { href: "/quiz-arena", label: "Quiz Arena", icon: Gamepad2 },
          { href: "/profile", label: "Profile", icon: UserIcon },
        ]
      : [{ href: "/sign-in", label: "Sign In", icon: LogIn }]),
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[9997]"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Only render when open or animating */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 z-[9998] shadow-2xl overflow-y-auto"
          >
        {/* Header with close button */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-red-500 hover:bg-red-600 active:bg-red-700 text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        {isSignedIn && user && (
          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              {user.imageUrl && (
                <img src={user.imageUrl} alt={user.firstName || "User"} className="w-10 h-10 rounded-full" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
