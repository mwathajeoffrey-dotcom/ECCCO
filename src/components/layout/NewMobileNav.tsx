"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Menu,
  Home,
  BookOpen,
  FileText,
  Gamepad2,
  User,
  Settings,
  HelpCircle,
  Zap,
  Activity,
  Heart,
  Clock,
  Target,
  BarChart3,
  Bookmark,
  StickyNote,
  Trophy,
  Swords,
  Users,
  Library,
  GitBranch,
  Search,
  Users2,
  AlertCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  X,
  LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavSection {
  title: string;
  items: NavItem[];
  icon?: LucideIcon;
}

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  description?: string;
}

export function NewMobileNav() {
  const pathname = usePathname();
  const { user } = useUser();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["Quick Access"])
  );
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Check if user is admin
  const isAdmin = user?.publicMetadata?.role === "admin";

  // Close drawer when pathname changes
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  // Lock scroll when drawer is open
  useEffect(() => {
    let didLock = false;
    if (isDrawerOpen) {
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
  }, [isDrawerOpen]);

  // Hide/show nav on scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
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

  const toggleSection = (sectionTitle: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionTitle)) {
      newExpanded.delete(sectionTitle);
    } else {
      newExpanded.add(sectionTitle);
    }
    setExpandedSections(newExpanded);
  };

  const quickAccessItems: NavItem[] = [
    {
      label: "Evidence Search",
      href: "/evidence-search",
      icon: Search,
      badge: "Featured",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
      description: "Your progress",
    },
    {
      label: "Clinical Notes",
      href: "/clinical-notes",
      icon: FileText,
      badge: "NEW",
    },
  ];

  const practiceItems: NavItem[] = [
    { label: "All Questions", href: "/practice", icon: FileText },
    {
      label: "Random Practice",
      href: "/practice?mode=random",
      icon: Zap,
    },
    { label: "ACLS Training", href: "/practice/acls", icon: Activity },
    { label: "PALS Training", href: "/practice/pals", icon: Heart },
  ];

  const examItems: NavItem[] = [
    { label: "Full Timed Exam", href: "/exam", icon: Clock },
    {
      label: "Custom Exam",
      href: "/exam?mode=custom",
      icon: Target,
    },
  ];

  const quizItems: NavItem[] = [
    { label: "Quiz Arena Home", href: "/quiz-arena", icon: Trophy },
    { label: "Create Quiz", href: "/quiz-arena/create", icon: Swords, badge: "New" },
    { label: "Join Quiz (Live)", href: "/quiz-arena/join", icon: Users },
  ];

  const learningItems: NavItem[] = [
    {
      label: "Learning Analytics",
      href: "/learning-analytics",
      icon: BarChart3,
    },
    { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
    { label: "My Notes", href: "/notes", icon: StickyNote },
  ];

  const resourceItems: NavItem[] = [
    {
      label: "Clinical Guidelines",
      href: "/guidelines",
      icon: BookOpen,
    },
    {
      label: "Guidelines Search",
      href: "/guidelines-search",
      icon: Search,
    },
    {
      label: "Emergency References",
      href: "/emergency-references",
      icon: AlertCircle,
    },
    { label: "Flowcharts", href: "/flowcharts", icon: GitBranch },
  ];

  const adminItems: NavItem[] = isAdmin
    ? [
        {
          label: "Admin Dashboard",
          href: "/admin/dashboard",
          icon: Users,
        },
        {
          label: "User Management",
          href: "/admin/users",
          icon: Users2,
          description: "Monitor & manage users",
        },
        {
          label: "Evidence Management",
          href: "/admin/evidence",
          icon: Library,
        },
        {
          label: "Feedback & Reports",
          href: "/admin/feedback",
          icon: MessageSquare,
        },
      ]
    : [];

  const accountItems: NavItem[] = [
    { label: "Profile", href: "/profile", icon: User },
    { label: "Settings", href: "/settings", icon: Settings },
    { label: "Support", href: "/support", icon: HelpCircle },
  ];

  const sections: NavSection[] = [
    { title: "Quick Access", items: quickAccessItems },
    { title: "Practice & Exams", items: [...practiceItems, ...examItems] },
    { title: "Quiz Arena", items: quizItems },
    { title: "Learning & Progress", items: learningItems },
    { title: "Resources", items: resourceItems },
    ...(isAdmin ? [{ title: "Admin Tools", items: adminItems }] : []),
    { title: "Account", items: accountItems },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const bottomNavItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: BookOpen, label: "Practice", href: "/practice" },
    { icon: Gamepad2, label: "Quiz", href: "/quiz-arena" },
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <>
      {/* Overlay Backdrop */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Slide-out Drawer */}
      <motion.aside
        initial={false}
        animate={{ x: isDrawerOpen ? 0 : "-100%" }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
          mass: 0.8,
        }}
        className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-40 md:hidden overflow-y-auto shadow-xl"
      >
        {/* Drawer Header */}
        <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 px-4 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="px-4 py-4 pb-32">
          {sections.map((section) => (
            <div key={section.title} className="mb-2">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide"
              >
                <span className="flex items-center gap-2">
                  {section.icon && (
                    <section.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  )}
                  {section.title}
                </span>
                {expandedSections.has(section.title) ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {/* Section Items */}
              <AnimatePresence>
                {expandedSections.has(section.title) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsDrawerOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg ml-4 transition-colors ${
                          isActive(item.href)
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="flex-1 text-sm">{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-1 bg-blue-600 dark:bg-blue-500 text-white text-xs rounded-full font-semibold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.aside>

      {/* Bottom Navigation */}
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-30 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        role="navigation"
        aria-label="Mobile bottom navigation"
      >
        <div className="flex justify-around items-center safe-area-bottom px-2">
          {/* Menu Button - Opens Drawer */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex flex-col items-center justify-center flex-1 py-3 px-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="Open menu"
            aria-expanded={isDrawerOpen}
          >
            <Menu className="w-6 h-6 mb-1" />
            <span className="text-xs font-semibold">Menu</span>
          </button>

          {/* Other Bottom Nav Items */}
          {bottomNavItems.map(({ icon: Icon, label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center flex-1 py-3 px-2 transition-colors ${
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="w-6 h-6 mb-1" strokeWidth={active ? 2.5 : 2} />
                <span className={`text-xs ${active ? "font-semibold" : "font-normal"}`}>
                  {label}
                </span>
              </Link>
            );
          })}

          {/* User Profile Button */}
          <Link
            href="/profile"
            className={`flex flex-col items-center justify-center flex-1 py-3 px-2 transition-colors ${
              isActive("/profile")
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
            aria-current={isActive("/profile") ? "page" : undefined}
          >
            <User className="w-6 h-6 mb-1" strokeWidth={isActive("/profile") ? 2.5 : 2} />
            <span className={`text-xs ${isActive("/profile") ? "font-semibold" : "font-normal"}`}>
              Profile
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}
