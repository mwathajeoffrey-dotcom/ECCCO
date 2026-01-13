"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  Menu,
  X,
  FileText,
  BarChart3,
  Clock,
  Trophy,
  Users,
  Library,
  Heart,
  Activity,
  Zap,
  Target,
} from "lucide-react";

interface StickyHeaderProps {
  onSidebarToggle?: () => void;
  isSidebarOpen?: boolean;
}

export default function StickyHeader({ onSidebarToggle, isSidebarOpen }: StickyHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const practiceMenuItems = [
    { icon: FileText, label: "Topic Practice", description: "30 questions per topic", href: "/practice" },
    { icon: Zap, label: "Random Practice", description: "Unlimited questions", href: "/practice" },
    { icon: Activity, label: "ACLS Practice", description: "Advanced Cardiac Life Support", href: "/practice/acls" },
    { icon: Heart, label: "PALS Practice", description: "Pediatric Advanced Life Support", href: "/practice/pals" },
  ];

  const studyToolsItems = [
    { icon: Clock, label: "Full Timed Exam", description: "300 questions - real conditions", href: "/exam" },
    { icon: Target, label: "Custom Exam", description: "Build your own exam", href: "/exam" },
    { icon: BarChart3, label: "Learning Analytics", description: "AI-powered insights", href: "/learning-analytics" },
  ];

  const resourcesItems = [
    { icon: Library, label: "Evidence Library", description: "30+ landmark trials", href: "/emergency-references" },
    {
      icon: BookOpen,
      label: "Clinical Guidelines",
      description: "Latest evidence-based guidelines",
      href: "/guidelines",
    },
    { icon: Trophy, label: "Dashboard", description: "Track your progress", href: "/dashboard" },
  ];

  const DropdownMenu = ({ items, title }: { items: typeof practiceMenuItems; title: string }) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden z-50"
      onMouseEnter={() => setActiveDropdown(title)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="p-2">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
              <item.icon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                {item.label}
              </div>
              <div className="text-xs text-gray-600 mt-0.5">{item.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Sidebar Toggle + Logo */}
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle Button */}
            {onSidebarToggle && (
              <button
                onClick={onSidebarToggle}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:block hidden"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
            )}

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">ECCCO</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Emergency & Critical Care</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Practice Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("practice")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                Practice
                <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {activeDropdown === "practice" && <DropdownMenu items={practiceMenuItems} title="practice" />}
              </AnimatePresence>
            </div>

            {/* Study Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("study")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                Study Tools
                <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {activeDropdown === "study" && <DropdownMenu items={studyToolsItems} title="study" />}
              </AnimatePresence>
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("resources")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                Resources
                <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {activeDropdown === "resources" && <DropdownMenu items={resourcesItems} title="resources" />}
              </AnimatePresence>
            </div>

            {/* Direct Links */}
            <Link
              href="/dashboard"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              Dashboard
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/signin"
              className="hidden sm:block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="hidden sm:block px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>

            {/* Sidebar Toggle Button (Mobile & Desktop) */}
            {onSidebarToggle && (
              <button
                onClick={onSidebarToggle}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
