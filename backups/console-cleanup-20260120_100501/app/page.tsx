"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import Sidebar from "@/components/navigation/Sidebar";
import {
  BookOpen,
  Clock,
  Trophy,
  BarChart3,
  FileText,
  Users,
  Brain,
  HeartPulse,
  Activity,
  FlaskConical,
  Zap,
  BookMarked,
  Sparkles,
  Target,
  MessageSquare,
  Calendar,
  Menu,
  LogOut,
  User,
} from "lucide-react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Header - Scrolls with page */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left Side: Menu Button + Logo Icon + Text */}
            <div className="flex items-center gap-3">
              {/* Menu Toggle Button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>

              {/* Logo Icon + Text */}
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">ECCCO</h1>
                  <p className="text-xs text-gray-600 hidden sm:block">
                    Emergency & Critical Care Comprehensive Online
                  </p>
                </div>
              </Link>
            </div>

            {/* Right Side: User Menu or Sign In Button */}
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                {/* User Profile Button */}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress[0] || "U"}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-900">{user?.firstName || "User"}</p>
                    <p className="text-xs text-gray-600">Dashboard</p>
                  </div>
                </Link>

                {/* Sign Out Button */}
                <SignOutButton>
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                    <LogOut className="w-5 h-5" />
                  </button>
                </SignOutButton>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
                <span className="sm:hidden">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>New: AI-Powered Learning Analytics & Live Quiz Mode</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 sm:text-6xl lg:text-7xl">
            Master Emergency &
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Critical Care Medicine
            </span>
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Complete evidence-based learning platform with 5,000+ questions, real-time quizzes, comprehensive
            guidelines, and AI-powered analytics to help you excel.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              Go to Dashboard →
            </Link>
            <Link
              href="/exam?count=10&mode=quick"
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Quick Practice (10 Questions)
            </Link>
            <Link
              href="/emergency-references"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              Browse Evidence Library
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-blue-600">5,000+</div>
              <div className="text-sm text-gray-600 mt-1">Practice Questions</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-indigo-600">30+</div>
              <div className="text-sm text-gray-600 mt-1">Evidence References</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-purple-600">15+</div>
              <div className="text-sm text-gray-600 mt-1">Topic Categories</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-pink-600">24/7</div>
              <div className="text-sm text-gray-600 mt-1">Live Quiz Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Excel</h3>
          <p className="text-xl text-gray-600">Comprehensive tools for emergency and critical care mastery</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Practice Mode */}
          <Link
            href="/practice"
            className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Practice Mode</h3>
            <p className="text-gray-600 mb-4">
              5,000+ evidence-based questions with detailed explanations and references.
            </p>
            <span className="text-blue-600 font-semibold group-hover:underline">Start Practicing →</span>
          </Link>

          {/* Evidence Library */}
          <Link
            href="/emergency-references"
            className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookMarked className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Evidence Library</h3>
            <p className="text-gray-600 mb-4">
              30+ curated guidelines, trials, and clinical pearls with DOI references.
            </p>
            <span className="text-emerald-600 font-semibold group-hover:underline">Browse References →</span>
          </Link>

          {/* AI Analytics */}
          <Link
            href="/learning-analytics"
            className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Learning Analytics</h3>
            <p className="text-gray-600 mb-4">
              Advanced insights, adaptive recommendations, and personalized study plans.
            </p>
            <span className="text-purple-600 font-semibold group-hover:underline">View Analytics →</span>
          </Link>

          {/* Timed Exams */}
          <Link
            href="/exam"
            className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Timed Exams</h3>
            <p className="text-gray-600 mb-4">Simulate real exam conditions with full-length timed assessments.</p>
            <span className="text-orange-600 font-semibold group-hover:underline">Take Exam →</span>
          </Link>

          {/* Performance Tracking */}
          <Link
            href="/dashboard"
            className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Performance Tracking</h3>
            <p className="text-gray-600 mb-4">
              Detailed progress tracking, topic mastery scores, and improvement trends.
            </p>
            <span className="text-cyan-600 font-semibold group-hover:underline">View Dashboard →</span>
          </Link>
        </div>
      </section>

      {/* Topics Overview */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center text-white mb-4">Comprehensive Topic Coverage</h3>
          <p className="text-center text-blue-100 text-lg mb-12 max-w-2xl mx-auto">
            Master all critical domains of emergency and critical care medicine
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Airway Management", icon: Activity },
              { name: "Mechanical Ventilation", icon: Activity },
              { name: "Sepsis & Shock", icon: HeartPulse },
              { name: "Cardiac Emergencies", icon: HeartPulse },
              { name: "Neurological Care", icon: Brain },
              { name: "Trauma Management", icon: Activity },
              { name: "Toxicology", icon: FlaskConical },
              { name: "Critical Pharmacology", icon: FlaskConical },
              { name: "Procedures", icon: Target },
              { name: "Respiratory Emergencies", icon: Activity },
              { name: "Renal Emergencies", icon: Activity },
              { name: "Endocrine Emergencies", icon: Activity },
              { name: "Infection Control", icon: Activity },
              { name: "Ethical & Legal", icon: BookMarked },
              { name: "Evidence-Based Care", icon: BookMarked },
            ].map((topic) => {
              const Icon = topic.icon;
              return (
                <div
                  key={topic.name}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl text-center hover:bg-white/20 transition-all"
                >
                  <Icon className="w-6 h-6 text-white mx-auto mb-2" />
                  <span className="text-sm font-medium text-white">{topic.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center shadow-2xl">
            <h3 className="text-4xl font-bold text-white mb-4">Ready to Excel in Emergency & Critical Care?</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of healthcare professionals improving their knowledge and clinical skills with our
              comprehensive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all inline-block"
              >
                Get Started Free
              </Link>
              <Link
                href="/support"
                className="bg-blue-500/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-blue-500/30 transition-all inline-block"
              >
                <MessageSquare className="w-5 h-5 inline mr-2" />
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ECCCO</span>
              </div>
              <p className="text-gray-400 text-sm">
                Emergency & Critical Care Comprehensive Online platform for medical education excellence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/practice" className="hover:text-white transition-colors">
                    Practice Questions
                  </Link>
                </li>
                <li>
                  <Link href="/learning-analytics" className="hover:text-white transition-colors">
                    AI Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/emergency-references" className="hover:text-white transition-colors">
                    Evidence Library
                  </Link>
                </li>
                <li>
                  <Link href="/exam" className="hover:text-white transition-colors">
                    Timed Exams
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/emergency-references" className="hover:text-white transition-colors">
                    Clinical Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/learning-analytics" className="hover:text-white transition-colors">
                    Performance Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Send Feedback
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 ECCCO. All rights reserved. Emergency & Critical Care Comprehensive Online.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
