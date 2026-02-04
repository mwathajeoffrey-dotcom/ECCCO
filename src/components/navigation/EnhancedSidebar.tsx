"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, SignOutButton } from "@clerk/nextjs";
import {
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
  LogOut,
  User,
  Gamepad2,
  Swords,
  Search,
  AlertCircle,
  MessageSquare,
  Users2,
  X,
} from "lucide-react";
import { logger } from "@/lib/logger";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  description?: string;
}

interface NavSection {
  title: string;
  icon: React.ElementType;
  items: NavItem[];
}

export default function EnhancedSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["🚀 Quick Access", "📚 Practice & Exams", "🎮 Quiz Arena"])
  );
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin status
  useEffect(() => {
    const checkRoles = async () => {
      if (!isSignedIn) {
        return;
      }

      try {
        const adminRes = await fetch("/api/auth/check-admin");
        if (adminRes.ok) {
          const adminData = await adminRes.json();
          setIsAdmin(adminData.isAdmin);
        }
      } catch (error) {
        logger.error("Error checking roles:", error instanceof Error ? error : new Error(String(error)));
      }
    };

    checkRoles();
  }, [isSignedIn]);

  const toggleSection = (sectionTitle: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionTitle)) {
      newExpanded.delete(sectionTitle);
    } else {
      newExpanded.add(sectionTitle);
    }
    setExpandedSections(newExpanded);
  };

  // Lock scroll when sidebar is open on mobile
  useEffect(() => {
    let didLock = false;
    if (isOpen) {
      import("@/lib/scrollLock").then((mod) => {
        mod.lockScroll();
        didLock = true;
      });
    }

    return () => {
      if (didLock) {
        import("@/lib/scrollLock").then((mod) => mod.unlockScroll());
      }
    };
  }, [isOpen]);

  // Quick access items (pinned at top)
  const quickAccessItems: NavItem[] = [
    {
      label: "Evidence Search",
      href: "/evidence-search",
      icon: Search,
      badge: "Featured",
      description: "170M+ research database",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
      description: "Your progress & stats",
    },
    {
      label: "Clinical Notes",
      href: "/clinical-notes",
      icon: FileText,
      badge: "NEW",
      description: "Clinical resources",
    },
  ];

  // All navigation sections
  const navigationSections: NavSection[] = [
    {
      title: "🚀 Quick Access",
      icon: Zap,
      items: quickAccessItems,
    },
    {
      title: "📚 Practice & Exams",
      icon: FileText,
      items: [
        {
          label: "All Questions",
          href: "/practice",
          icon: FileText,
          description: "5000+ questions",
        },
        {
          label: "Random Practice",
          href: "/practice?mode=random",
          icon: Zap,
          description: "Mixed topics",
        },
        {
          label: "ACLS Training",
          href: "/practice/acls",
          icon: Activity,
          description: "ACLS scenarios",
        },
        {
          label: "PALS Training",
          href: "/practice/pals",
          icon: Heart,
          description: "PALS scenarios",
        },
        {
          label: "Full Timed Exam",
          href: "/exam",
          icon: Clock,
          description: "45 min comprehensive",
        },
        {
          label: "Custom Exam",
          href: "/exam?mode=custom",
          icon: Target,
          description: "Build your own",
        },
      ],
    },
    {
      title: "🎮 Quiz Arena",
      icon: Gamepad2,
      items: [
        {
          label: "Quiz Arena Home",
          href: "/quiz-arena",
          icon: Trophy,
          description: "Browse quizzes",
        },
        {
          label: "Create Quiz",
          href: "/quiz-arena/create",
          icon: Swords,
          badge: "New",
          description: "Host live quiz",
        },
        {
          label: "Join Quiz (Live)",
          href: "/quiz-arena/join",
          icon: Users,
          description: "Play with others",
        },
      ],
    },
    {
      title: "📊 Learning & Progress",
      icon: Brain,
      items: [
        {
          label: "Learning Analytics",
          href: "/learning-analytics",
          icon: BarChart3,
          description: "Track your growth",
        },
        {
          label: "Bookmarks",
          href: "/bookmarks",
          icon: Bookmark,
          description: "Saved questions",
        },
        {
          label: "My Notes",
          href: "/notes",
          icon: StickyNote,
          description: "Personal notes",
        },
      ],
    },
    {
      title: "📚 Resources & References",
      icon: Library,
      items: [
        {
          label: "Clinical Guidelines",
          href: "/guidelines",
          icon: BookOpen,
          description: "Evidence-based",
        },
        {
          label: "Guidelines Search",
          href: "/guidelines-search",
          icon: Search,
          description: "Quick lookup",
        },
        {
          label: "Emergency References",
          href: "/emergency-references",
          icon: AlertCircle,
          description: "Quick reference",
        },
        {
          label: "Flowcharts",
          href: "/flowcharts",
          icon: GitBranch,
          description: "Decision trees",
        },
      ],
    },
    ...(isAdmin
      ? [
          {
            title: "⚙️ Admin Tools",
            icon: Users2,
            items: [
              {
                label: "Admin Dashboard",
                href: "/admin/dashboard",
                icon: User,
                description: "Overview & stats",
              },
              {
                label: "User Management",
                href: "/admin/users",
                icon: Users2,
                badge: "Priority",
                description: "Monitor & manage users",
              },
              {
                label: "Evidence Management",
                href: "/admin/evidence",
                icon: Library,
                description: "Manage database",
              },
              {
                label: "Feedback & Reports",
                href: "/admin/feedback",
                icon: MessageSquare,
                description: "User feedback",
              },
            ],
          },
        ]
      : []),
    {
      title: "👤 Account",
      icon: User,
      items: [
        {
          label: "Profile",
          href: "/profile",
          icon: User,
          description: "Your account",
        },
        {
          label: "Settings",
          href: "/settings",
          icon: Settings,
          description: "Preferences",
        },
        {
          label: "Support",
          href: "/support",
          icon: HelpCircle,
          description: "Help & support",
        },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Overlay - ONLY visible on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-200"
          onClick={() => {
            onClose?.();
          }}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Always visible on desktop (>=768px), drawer on mobile (<768px) */}
      <aside
        className={`
          fixed md:static left-0 top-0 bottom-0 w-80
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-700
          z-40 overflow-y-auto overflow-x-hidden shadow-xl
          transform transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900 dark:text-white">ECCCO</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Emergency Care</p>
              </div>
            </div>
            {/* X Button - ONLY visible on mobile */}
            <button
              onClick={() => {
                onClose?.();
              }}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Content */}
        <div className="px-4 py-4 pb-32">
          {navigationSections.map((section) => (
            <div key={section.title} className="mb-2">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors text-left"
              >
                <span className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  {section.title}
                </span>
                {expandedSections.has(section.title) ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {/* Section Items */}
              {expandedSections.has(section.title) && (
                <div className="ml-3 border-l border-gray-200 dark:border-gray-700 pl-3 space-y-1 transition-all duration-200">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        onClose?.();
                      }}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${
                        isActive(item.href)
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200"
                      }`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{item.label}</div>
                        {item.description && <div className="text-xs opacity-70 truncate">{item.description}</div>}
                      </div>
                      {item.badge && (
                        <span className="px-2 py-1 bg-blue-600 dark:bg-blue-500 text-white text-xs rounded-full font-semibold flex-shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Separator */}
          <div className="my-6 border-t border-gray-200 dark:border-gray-700" />

          {/* Sign Out Button */}
          {isSignedIn && (
            <SignOutButton>
              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </SignOutButton>
          )}
        </div>
      </aside>
    </>
  );
}
