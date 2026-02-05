"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  X,
  Home,
  BarChart3,
  BookOpen,
  Zap,
  Activity,
  Heart,
  Clock,
  Target,
  Trophy,
  Search,
  FileText,
  Settings,
  User,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Professional, clean sidebar with flat structure

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string;
  badgeColor?: "blue" | "green" | "red";
}

interface NavSection {
  label?: string;
  items: NavItem[];
}

export function NewSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();

  // Check if user is admin
  const isAdmin =
    user?.publicMetadata?.role === "admin" || user?.emailAddresses?.[0]?.emailAddress === "ecccomedical@gmail.com";

  // Navigation structure - Simple and flat
  const navSections: NavSection[] = [
    {
      // Primary navigation - no label
      items: [
        { icon: Home, label: "Home", href: "/" },
        { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
      ],
    },
    {
      label: "PRACTICE",
      items: [
        { icon: BookOpen, label: "All Questions", href: "/practice" },
        { icon: Zap, label: "Random Practice", href: "/practice/random" },
        { icon: Activity, label: "ACLS Training", href: "/practice/acls" },
        { icon: Heart, label: "PALS Training", href: "/practice/pals" },
      ],
    },
    {
      label: "EXAMS",
      items: [
        { icon: Clock, label: "Full Timed Exam", href: "/exam" },
        { icon: Target, label: "Custom Exam", href: "/exam/custom" },
      ],
    },
    {
      // Quick access items - no label
      items: [
        { icon: Trophy, label: "Quiz Arena", href: "/quiz-arena", badge: "Live", badgeColor: "green" },
        { icon: BarChart3, label: "Analytics", href: "/learning-analytics" },
        { icon: Search, label: "Evidence Search", href: "/evidence-search", badge: "New", badgeColor: "blue" },
        { icon: FileText, label: "Clinical Notes", href: "/clinical-notes" },
      ],
    },
    {
      label: "PERSONAL",
      items: [
        { icon: User, label: "Profile", href: "/profile" },
        { icon: Settings, label: "Settings", href: "/settings" },
      ],
    },
  ];

  // Add admin section if user is admin
  if (isAdmin) {
    navSections.push({
      label: "ADMIN",
      items: [{ icon: Shield, label: "Admin Panel", href: "/admin", badge: "Admin", badgeColor: "red" }],
    });
  }

  const isActive = (href: string) => {
    if (href === "/" || href === "/dashboard") {
      return pathname === "/" || pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Backdrop - Shows when sidebar is open */}
      {isOpen && <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} aria-hidden="true" />}

      {/* Sidebar - Hidden by default, shows only when hamburger clicked */}
      <aside
        suppressHydrationWarning
        className={`
          fixed top-0 left-0 h-screen w-64
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-700
          flex flex-col
          transition-transform duration-300 ease-in-out
          z-50
          -translate-x-full
          ${isOpen ? "!translate-x-0" : ""}
        `}
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-900 dark:text-white leading-tight">ECCCO</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">Emergency Care</span>
            </div>
          </Link>

          {/* Close button - Always visible */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          {navSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={sectionIndex > 0 ? "mt-6" : ""}>
              {/* Section Label */}
              {section.label && (
                <div className="px-3 mb-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {section.label}
                  </span>
                </div>
              )}

              {/* Section Items */}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg
                        transition-all duration-150 ease-in-out
                        group relative
                        ${
                          active
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                        }
                      `}
                      aria-current={active ? "page" : undefined}
                    >
                      {/* Active indicator bar */}
                      {active && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 dark:bg-blue-400 rounded-r" />
                      )}

                      {/* Icon */}
                      <Icon
                        className={`w-5 h-5 flex-shrink-0 ${active ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"}`}
                        strokeWidth={active ? 2.5 : 2}
                      />

                      {/* Label */}
                      <span className={`text-sm flex-1 ${active ? "font-semibold" : "font-medium"}`}>{item.label}</span>

                      {/* Badge */}
                      {item.badge && (
                        <span
                          className={`
                            text-[10px] font-bold px-2 py-0.5 rounded uppercase
                            ${
                              item.badgeColor === "blue"
                                ? "bg-blue-500 text-white"
                                : item.badgeColor === "green"
                                  ? "bg-green-500 text-white"
                                  : item.badgeColor === "red"
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-500 text-white"
                            }
                          `}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          {user && (
            <div className="mb-3 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">
                    {user.firstName?.[0] || user.emailAddresses?.[0]?.emailAddress?.[0] || "U"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                    {user.firstName || "User"}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                    {user.emailAddresses?.[0]?.emailAddress}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="text-[10px] text-gray-500 dark:text-gray-400 text-center">
            ECCCO Medical Platform
            <br />© 2026 All rights reserved
          </div>
        </div>
      </aside>
    </>
  );
}
