'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen,
  FileText,
  Clock,
  Trophy,
  BarChart3,
  Library,
  Users,
  Heart,
  Activity,
  Zap,
  Target,
  ChevronRight,
  Home,
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuSections = [
    {
      title: 'Practice',
      icon: FileText,
      items: [
        { label: 'Topic Practice', href: '/practice', icon: FileText },
        { label: 'Random Practice', href: '/practice', icon: Zap },
        { label: 'ACLS', href: '/practice/acls', icon: Activity },
        { label: 'PALS', href: '/practice/pals', icon: Heart },
      ],
    },
    {
      title: 'Study Tools',
      icon: Trophy,
      items: [
        { label: 'Full Timed Exam', href: '/exam', icon: Clock },
        { label: 'Custom Exam', href: '/exam', icon: Target },
        { label: 'Learning Analytics', href: '/learning-analytics', icon: BarChart3 },
      ],
    },
    {
      title: 'Resources',
      icon: Library,
      items: [
        { label: 'Evidence Library', href: '/emergency-references', icon: Library },
        { label: 'Clinical Guidelines', href: '/guidelines', icon: BookOpen },
        { label: 'Dashboard', href: '/dashboard', icon: Trophy },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-16 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/auth/signin"
                  onClick={onClose}
                  className="px-4 py-3 text-center border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={onClose}
                  className="px-4 py-3 text-center bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>

              {/* Home Link */}
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-semibold text-gray-900">Home</span>
              </Link>

              {/* Menu Sections */}
              {menuSections.map((section) => (
                <div key={section.title} className="space-y-2">
                  <div className="flex items-center gap-2 px-2 py-1">
                    <section.icon className="w-5 h-5 text-gray-400" />
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                      {section.title}
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                          <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                            {item.label}
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Additional Links */}
              <div className="pt-6 border-t border-gray-200 space-y-2">
                <Link
                  href="/terms"
                  onClick={onClose}
                  className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Terms & Conditions
                </Link>
                <Link
                  href="/privacy"
                  onClick={onClose}
                  className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
