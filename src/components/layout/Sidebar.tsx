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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();

  const isAdmin =
    user?.publicMetadata?.role === "admin" || user?.emailAddresses?.[0]?.emailAddress === "ecccomedical@gmail.com";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out
          z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">ECCCO</span>
              <p className="text-xs text-gray-500">Emergency Care</p>
            </div>
          </Link>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {/* Home & Dashboard */}
            <div className="space-y-1">
              <NavLink href="/" icon={Home} label="Home" isActive={isActive("/")} onClick={onClose} />
              <NavLink
                href="/dashboard"
                icon={BarChart3}
                label="Dashboard"
                isActive={isActive("/dashboard")}
                onClick={onClose}
              />
            </div>

            {/* Practice */}
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">PRACTICE</p>
              <div className="space-y-1">
                <NavLink
                  href="/practice"
                  icon={BookOpen}
                  label="All Questions"
                  isActive={isActive("/practice")}
                  onClick={onClose}
                />
                <NavLink
                  href="/practice/random"
                  icon={Zap}
                  label="Random Practice"
                  isActive={isActive("/practice/random")}
                  onClick={onClose}
                />
                <NavLink
                  href="/practice/acls"
                  icon={Activity}
                  label="ACLS Training"
                  isActive={isActive("/practice/acls")}
                  onClick={onClose}
                />
                <NavLink
                  href="/practice/pals"
                  icon={Heart}
                  label="PALS Training"
                  isActive={isActive("/practice/pals")}
                  onClick={onClose}
                />
              </div>
            </div>

            {/* Exams */}
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">EXAMS</p>
              <div className="space-y-1">
                <NavLink
                  href="/exam"
                  icon={Clock}
                  label="Full Timed Exam"
                  isActive={isActive("/exam")}
                  onClick={onClose}
                />
                <NavLink
                  href="/exam/custom"
                  icon={Target}
                  label="Custom Exam"
                  isActive={isActive("/exam/custom")}
                  onClick={onClose}
                />
              </div>
            </div>

            {/* Quick Access */}
            <div className="space-y-1">
              <NavLink
                href="/quiz-arena"
                icon={Trophy}
                label="Quiz Arena"
                badge="Live"
                isActive={isActive("/quiz-arena")}
                onClick={onClose}
              />
              <NavLink
                href="/learning-analytics"
                icon={BarChart3}
                label="Analytics"
                isActive={isActive("/learning-analytics")}
                onClick={onClose}
              />
              <NavLink
                href="/evidence-search"
                icon={Search}
                label="Evidence Search"
                badge="New"
                isActive={isActive("/evidence-search")}
                onClick={onClose}
              />
              <NavLink
                href="/clinical-notes"
                icon={FileText}
                label="Clinical Notes"
                isActive={isActive("/clinical-notes")}
                onClick={onClose}
              />
            </div>

            {/* Personal */}
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">PERSONAL</p>
              <div className="space-y-1">
                <NavLink
                  href="/profile"
                  icon={User}
                  label="Profile"
                  isActive={isActive("/profile")}
                  onClick={onClose}
                />
                <NavLink
                  href="/settings"
                  icon={Settings}
                  label="Settings"
                  isActive={isActive("/settings")}
                  onClick={onClose}
                />
              </div>
            </div>

            {/* Admin */}
            {isAdmin && (
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">ADMIN</p>
                <NavLink
                  href="/admin"
                  icon={Shield}
                  label="Admin Panel"
                  badge="Admin"
                  isActive={isActive("/admin")}
                  onClick={onClose}
                />
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}

interface NavLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: string;
  isActive: boolean;
  onClick: () => void;
}

function NavLink({ href, icon: Icon, label, badge, isActive, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
        ${
          isActive
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }
      `}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="flex-1 font-medium">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full">{badge}</span>
      )}
    </Link>
  );
}
