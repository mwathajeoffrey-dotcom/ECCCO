"use client";
import { logger } from "@/lib/logger";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import QuestionSearch from "./QuestionSearch";
import {
  Home,
  Trophy,
  FileText,
  Zap,
  Activity,
  Heart,
  Brain,
  Clock,
  Target,
  Users,
  BarChart3,
  Library,
  BookOpen,
  GitBranch,
  HelpCircle,
  Settings,
  ChevronDown,
  ChevronRight,
  Bookmark,
  StickyNote,
  LogIn,
  LogOut,
  User,
  Shield,
  UserCog,
  Gamepad2,
  Swords,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavSection {
  title: string;
  icon: React.ElementType;
  items: NavItem[];
  defaultOpen?: boolean;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { isSignedIn, user, isLoaded } = useUser();
  const [expandedSections, setExpandedSections] = useState<string[]>(["Practice", "Study Tools", "Resources"]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(true);

  // Check admin/developer status
  useEffect(() => {
    const checkRoles = async () => {
      if (!isSignedIn) {
        setRolesLoading(false);
        return;
      }

      try {
        const [adminRes, devRes] = await Promise.all([
          fetch("/api/auth/check-admin"),
          fetch("/api/auth/check-developer"),
        ]);

        if (adminRes.ok) {
          const adminData = await adminRes.json();
          setIsAdmin(adminData.isAdmin);
        }

        if (devRes.ok) {
          const devData = await devRes.json();
          setIsDeveloper(devData.isDeveloper);
        }
      } catch (error) {
        logger.error("Error checking roles:", error instanceof Error ? error : new Error(String(error)));
      } finally {
        setRolesLoading(false);
      }
    };

    checkRoles();
  }, [isSignedIn]);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionTitle) ? prev.filter((title) => title !== sectionTitle) : [...prev, sectionTitle]
    );
  };

  // Lock body scroll when mouse is over sidebar
  const handleMouseEnter = () => {
    document.body.style.overflow = "hidden";
  };

  const handleMouseLeave = () => {
    document.body.style.overflow = "unset";
  };

  const navigationSections: NavSection[] = [
    {
      title: "Practice",
      icon: FileText,
      items: [
        {
          label: "All Questions",
          href: "/practice",
          icon: FileText,
        },
        {
          label: "Random Practice",
          href: "/practice?mode=random",
          icon: Zap,
        },
        {
          label: "ACLS Practice",
          href: "/practice/acls",
          icon: Activity,
        },
        {
          label: "PALS Practice",
          href: "/practice/pals",
          icon: Heart,
        },
      ],
    },
    {
      title: "Study Tools",
      icon: Brain,
      items: [
        {
          label: "Full Timed Exam",
          href: "/exam",
          icon: Clock,
        },
        {
          label: "Custom Exam",
          href: "/exam?mode=custom",
          icon: Target,
        },
        {
          label: "Learning Analytics",
          href: "/learning-analytics",
          icon: BarChart3,
        },
        {
          label: "Saved Questions",
          href: "/bookmarks",
          icon: Bookmark,
          badge: "New",
        },
        {
          label: "My Notes",
          href: "/notes",
          icon: StickyNote,
        },
      ],
    },
    {
      title: "Quiz Arena",
      icon: Gamepad2,
      items: [
        {
          label: "Quiz Arena Home",
          href: "/quiz-arena",
          icon: Trophy,
        },
        {
          label: "Create Quiz",
          href: "/quiz-arena/create",
          icon: Swords,
          badge: "New",
        },
        {
          label: "Join Quiz",
          href: "/quiz-arena/join",
          icon: Users,
        },
      ],
    },
    {
      title: "Resources",
      icon: Library,
      items: [
        {
          label: "Clinical Notes",
          href: "/clinical-notes",
          icon: FileText,
          badge: "NEW",
        },
        {
          label: "Evidence Search",
          href: "/evidence-search",
          icon: Library,
        },
        {
          label: "Clinical Guidelines",
          href: "/guidelines",
          icon: BookOpen,
        },
        {
          label: "Guidelines Search",
          href: "/guidelines-search",
          icon: BookOpen,
        },
        {
          label: "Flowcharts",
          href: "/flowcharts",
          icon: GitBranch,
        },
      ],
    },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Backdrop - Shows when sidebar is open on all devices */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Slide in/out on ALL devices */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 overflow-y-auto overflow-x-hidden shadow-lg sidebar-scroll-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onWheel={(e) => {
          // Prevent scroll from propagating to body
          e.stopPropagation();
        }}
      >
        <nav className="p-4 space-y-2">
          {/* Home Link */}
          <Link
            href="/"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              pathname === "/"
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold shadow-sm"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            <span>Home</span>
          </Link>

          {/* Dashboard Link - Only for signed-in users */}
          {isSignedIn && (
            <Link
              href="/dashboard"
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                pathname === "/dashboard"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold shadow-sm"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Trophy className="w-5 h-5 flex-shrink-0" />
              <span>🏆 Dashboard</span>
            </Link>
          )}

          {/* Profile Link - Only for signed-in users */}
          {isSignedIn && (
            <Link
              href="/profile"
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                pathname === "/profile"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold shadow-sm"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <User className="w-5 h-5 flex-shrink-0" />
              <span>👤 My Profile</span>
            </Link>
          )}

          {/* Admin Section - Only visible to admins */}
          {!rolesLoading && isAdmin && (
            <>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

              <Link
                href="/admin/dashboard"
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  pathname === "/admin/dashboard"
                    ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 font-semibold shadow-sm"
                    : "text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-900 dark:hover:text-purple-300"
                }`}
              >
                <Shield className="w-5 h-5 flex-shrink-0" />
                <span>🛡️ Admin Dashboard</span>
              </Link>

              <Link
                href="/admin/users"
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  pathname === "/admin/users"
                    ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 font-semibold shadow-sm"
                    : "text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-900 dark:hover:text-purple-300"
                }`}
              >
                <UserCog className="w-5 h-5 flex-shrink-0" />
                <span>👥 User Management</span>
              </Link>

              <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
            </>
          )}

          {/* Collapsible Sections */}
          {navigationSections.map((section) => {
            const isExpanded = expandedSections.includes(section.title);
            const SectionIcon = section.icon;

            return (
              <div key={section.title} className="space-y-1">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <SectionIcon className="w-5 h-5 flex-shrink-0 text-gray-500 group-hover:text-gray-700" />
                    <span className="font-semibold">
                      {section.title === "Practice" && "📝 "}
                      {section.title === "Study Tools" && "🧠 "}
                      {section.title === "Resources" && "📚 "}
                      {section.title}
                      {section.title === "Resources" && (
                        <span className="ml-2 px-2 py-0.5 text-xs font-bold text-blue-600 bg-blue-100 rounded-full">
                          New
                        </span>
                      )}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400 transition-transform duration-200" />
                  )}
                </button>

                {/* Section Items */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 space-y-1 py-1">
                        {/* Question Search - Only in Practice Section */}
                        {section.title === "Practice" && (
                          <div className="px-4 pb-3 pt-1">
                            <QuestionSearch onSelect={onClose} />
                          </div>
                        )}

                        {section.items.map((item) => {
                          const ItemIcon = item.icon;
                          const isActive = isActiveLink(item.href);

                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={onClose}
                              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                                isActive
                                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium shadow-sm"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                            >
                              <div className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                              <ItemIcon className="w-4 h-4 flex-shrink-0" />
                              <span className="flex-1">{item.label}</span>
                              {item.badge && (
                                <span className="px-2 py-0.5 text-xs font-bold text-blue-600 bg-blue-100 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Support Link */}
          <Link
            href="/support"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              pathname === "/support"
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold shadow-sm"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <HelpCircle className="w-5 h-5 flex-shrink-0" />
            <span>❓ Support</span>
          </Link>

          {/* Settings Link */}
          <Link
            href="/settings"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              pathname === "/settings"
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold shadow-sm"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span>⚙️ Settings</span>
          </Link>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

          {/* Authentication Section */}
          {!isLoaded ? (
            <div className="px-4 py-3">
              <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
          ) : isSignedIn ? (
            /* Signed In User */
            <div className="px-4 py-3 space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-800">
                {user?.imageUrl ? (
                  <img
                    src={user?.imageUrl}
                    alt={user?.firstName || "User"}
                    className="w-10 h-10 rounded-full border-2 border-blue-300 dark:border-blue-600 flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {user?.firstName || "User"} {user?.lastName || ""}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>

              <SignOutButton>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-md">
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <span>🚪 Sign Out</span>
                </button>
              </SignOutButton>
            </div>
          ) : (
            /* Not Signed In */
            <Link
              href="/auth/signin"
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md ${
                pathname === "/auth/signin" ? "ring-2 ring-blue-300" : ""
              }`}
            >
              <LogIn className="w-5 h-5 flex-shrink-0" />
              <span>🔐 Sign In</span>
            </Link>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">ECCCO Platform</p>
            <p>Emergency & Critical Care</p>
            <p className="mt-2">© 2025 All rights reserved</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
