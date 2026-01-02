'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionSearch from './QuestionSearch';
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
  User,
} from 'lucide-react';

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
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'Practice',
    'Study Tools',
    'Resources',
  ]);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionTitle)
        ? prev.filter((title) => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  // Lock body scroll when mouse is over sidebar
  const handleMouseEnter = () => {
    document.body.style.overflow = 'hidden';
  };

  const handleMouseLeave = () => {
    document.body.style.overflow = 'unset';
  };

  const navigationSections: NavSection[] = [
    {
      title: 'Practice',
      icon: FileText,
      items: [
        {
          label: 'All Questions',
          href: '/practice',
          icon: FileText,
        },
        {
          label: 'Random Practice',
          href: '/practice?mode=random',
          icon: Zap,
        },
        {
          label: 'ACLS Practice',
          href: '/practice/acls',
          icon: Activity,
        },
        {
          label: 'PALS Practice',
          href: '/practice/pals',
          icon: Heart,
        },
      ],
    },
    {
      title: 'Study Tools',
      icon: Brain,
      items: [
        {
          label: 'Full Timed Exam',
          href: '/exam',
          icon: Clock,
        },
        {
          label: 'Custom Exam',
          href: '/exam?mode=custom',
          icon: Target,
        },
        {
          label: 'Live Quiz',
          href: '/live-quiz',
          icon: Users,
        },
        {
          label: 'Learning Analytics',
          href: '/learning-analytics',
          icon: BarChart3,
        },
        {
          label: 'My Bookmarks',
          href: '/bookmarks',
          icon: Bookmark,
          badge: 'New',
        },
        {
          label: 'My Notes',
          href: '/bookmarks?tab=notes',
          icon: StickyNote,
        },
      ],
    },
    {
      title: 'Resources',
      icon: Library,
      items: [
        {
          label: 'Evidence Library',
          href: '/emergency-references',
          icon: Library,
        },
        {
          label: 'Clinical Guidelines',
          href: '/guidelines',
          icon: BookOpen,
        },
        {
          label: 'Flowcharts',
          href: '/flowcharts',
          icon: GitBranch,
        },
      ],
    },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Always visible on desktop, toggleable on mobile */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-gray-200 z-40 overflow-y-auto overflow-x-hidden shadow-lg sidebar-scroll-container lg:translate-x-0"
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
              pathname === '/'
                ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            <span>Home</span>
          </Link>

          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              pathname === '/dashboard'
                ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Trophy className="w-5 h-5 flex-shrink-0" />
            <span>🏆 Dashboard</span>
          </Link>

          {/* Collapsible Sections */}
          {navigationSections.map((section) => {
            const isExpanded = expandedSections.includes(section.title);
            const SectionIcon = section.icon;

            return (
              <div key={section.title} className="space-y-1">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <SectionIcon className="w-5 h-5 flex-shrink-0 text-gray-500 group-hover:text-gray-700" />
                    <span className="font-semibold">
                      {section.title === 'Practice' && '📝 '}
                      {section.title === 'Study Tools' && '🧠 '}
                      {section.title === 'Resources' && '📚 '}
                      {section.title}
                      {section.title === 'Resources' && (
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
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 space-y-1 py-1">
                        {/* Question Search - Only in Practice Section */}
                        {section.title === 'Practice' && (
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
                                  ? 'bg-blue-50 text-blue-700 font-medium shadow-sm'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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

          {/* Bookmarks Link */}
          <Link
            href="/bookmarks"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              pathname === '/bookmarks'
                ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Bookmark className="w-5 h-5 flex-shrink-0" />
            <span>🔖 Bookmarks</span>
          </Link>

          {/* Notes Link */}
          <Link
            href="/notes"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              pathname === '/notes'
                ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <StickyNote className="w-5 h-5 flex-shrink-0" />
            <span>📝 Notes</span>
          </Link>

          {/* Support Link */}
          <Link
            href="/support"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              pathname === '/support'
                ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
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
              pathname === '/settings'
                ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span>⚙️ Settings</span>
          </Link>

          {/* Divider */}
          <div className="border-t border-gray-200 my-2" />

          {/* Sign In Link - December 19th working auth */}
          <Link
            href="/auth/signin"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md ${
              pathname === '/auth/signin'
                ? 'ring-2 ring-blue-300'
                : ''
            }`}
          >
            <LogIn className="w-5 h-5 flex-shrink-0" />
            <span>🔐 Sign In</span>
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <div className="text-xs text-gray-500 text-center">
            <p className="font-semibold text-gray-700 mb-1">ECCCO Platform</p>
            <p>Emergency & Critical Care</p>
            <p className="mt-2">© 2025 All rights reserved</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
