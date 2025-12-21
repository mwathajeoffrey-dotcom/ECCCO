'use client';

import { useState } from 'react';
import Hero from '@/components/homepage/Hero';
import QuickActions from '@/components/homepage/QuickActions';
import EvidenceShowcase from '@/components/homepage/EvidenceShowcase';
import InteractiveTopicExplorer from '@/components/homepage/InteractiveTopicExplorer';
import Testimonials from '@/components/homepage/Testimonials';
import StickyHeader from '@/components/navigation/StickyHeader';
import Sidebar from '@/components/navigation/Sidebar';
import Link from 'next/link';
import { 
  BookOpen, 
  Brain, 
  Zap, 
  Shield, 
  Award, 
  Clock,
  Target,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Library,
  BarChart3,
  Trophy,
  FileText,
  Menu
} from 'lucide-react';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start closed by default

  // Key platform features for showcase
  const platformFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Personalized study recommendations based on your performance patterns and weak areas',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      icon: Library,
      title: 'Evidence-Based Content',
      description: '30+ curated landmark trials and guidelines with DOI references for deep learning',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Zap,
      title: 'Live Multiplayer Quiz',
      description: 'Real-time competitive quizzes with friends or colleagues, instant leaderboards',
      color: 'from-orange-500 to-red-600',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Detailed performance tracking with topic mastery scores and improvement trends',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Shield,
      title: 'Exam Simulation',
      description: 'Full-length timed exams that replicate real board exam conditions',
      color: 'from-rose-500 to-pink-600',
    },
    {
      icon: Target,
      title: 'Focused Practice',
      description: 'Topic-specific practice with 5,000+ questions and detailed explanations',
      color: 'from-violet-500 to-purple-600',
    },
  ];

  // Why choose ECCCO
  const benefits = [
    {
      title: 'Comprehensive Coverage',
      description: 'All emergency and critical care topics in one place',
      icon: BookOpen,
    },
    {
      title: 'Time-Saving',
      description: 'Curated content eliminates hours of research',
      icon: Clock,
    },
    {
      title: 'Proven Results',
      description: '95% pass rate among active users',
      icon: Trophy,
    },
    {
      title: 'Continuous Updates',
      description: 'Regular updates with latest guidelines and evidence',
      icon: TrendingUp,
    },
  ];

  // Stats for credibility
  const stats = [
    { value: '5,000+', label: 'Practice Questions', icon: FileText },
    { value: '30+', label: 'Landmark Trials', icon: Library },
    { value: '15+', label: 'Topic Categories', icon: BookOpen },
    { value: '10,000+', label: 'Active Learners', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation Header */}
      <StickyHeader 
        onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Left Sidebar Navigation - ONLY ONE SIDEBAR */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content - No margin shift, sidebar is overlay */}
      <div className="transition-all duration-300">
        {/* Hero Section - Full screen with animations */}
        <Hero />

      {/* Quick Actions - 6 Interactive Cards */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Would You Like to Do Today?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our powerful learning tools designed to help you master emergency and critical care medicine
            </p>
          </div>
          <QuickActions />
        </div>
      </section>

      {/* Platform Features Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
              <Star className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">Premium Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and resources designed for medical professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:border-transparent transition-all duration-300 hover:-translate-y-2"
              >
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl`}></div>
                
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Library Showcase */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EvidenceShowcase />
        </div>
      </section>

      {/* Interactive Topic Explorer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Topic Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master every critical domain of emergency and critical care medicine
            </p>
          </div>
          <InteractiveTopicExplorer />
        </div>
      </section>

      {/* Why Choose ECCCO */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Healthcare Professionals Choose ECCCO
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of medical professionals advancing their knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all"
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-blue-100 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-200 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transform hover:-translate-y-1 transition-all text-lg"
            >
              Start Learning Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/emergency-references"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all text-lg"
            >
              <Library className="w-5 h-5" />
              Browse Evidence Library
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Testimonials />
        </div>
      </section>

      {/* Feature Comparison / Unique Value Props */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Makes ECCCO Different?
            </h2>
            <p className="text-xl text-gray-600">
              We're not just another question bank—we're a complete learning ecosystem
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: 'Curated Evidence Library',
                description: 'Direct access to 30+ landmark trials with DOI links—no endless searching required',
              },
              {
                title: 'Real-Time Multiplayer Learning',
                description: 'First platform to offer live collaborative quiz sessions with instant feedback',
              },
              {
                title: 'AI-Powered Personalization',
                description: 'Adaptive learning paths that evolve with your performance and identify weak areas',
              },
              {
                title: 'Comprehensive Clinical Guidelines',
                description: 'Latest evidence-based guidelines organized by specialty and easy to search',
              },
              {
                title: 'Performance Analytics Dashboard',
                description: 'Deep insights into your learning patterns with actionable recommendations',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group"
              >
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-lg border border-blue-400/30 rounded-full mb-6">
            <Award className="w-5 h-5 text-blue-300" />
            <span className="text-sm font-semibold text-blue-200">Trusted by 10,000+ Healthcare Professionals</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Master Emergency & Critical Care?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Start your journey today with our comprehensive learning platform. Free to get started, no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-10 py-5 rounded-xl font-bold hover:bg-blue-700 hover:shadow-2xl transform hover:-translate-y-1 transition-all text-lg"
            >
              Get Started Free
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold hover:bg-white/20 transition-all text-lg"
            >
              <MessageSquare className="w-6 h-6" />
              Contact Support
            </Link>
          </div>

          <p className="text-sm text-gray-400">
            No credit card required • Free tier available • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">ECCCO</h3>
                  <p className="text-xs text-gray-400">Emergency & Critical Care Comprehensive Online</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                The comprehensive learning platform for emergency and critical care medicine professionals. 
                Evidence-based content, AI-powered analytics, and collaborative learning tools.
              </p>
              <div className="flex gap-4">
                <Link href="/support" className="text-gray-400 hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Practice */}
            <div>
              <h4 className="font-bold mb-4">Practice</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/practice" className="hover:text-white transition-colors">Topic Practice</Link></li>
                <li><Link href="/practice" className="hover:text-white transition-colors">Random Questions</Link></li>
                <li><Link href="/practice/acls" className="hover:text-white transition-colors">ACLS</Link></li>
                <li><Link href="/practice/pals" className="hover:text-white transition-colors">PALS</Link></li>
              </ul>
            </div>

            {/* Study Tools */}
            <div>
              <h4 className="font-bold mb-4">Study Tools</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/exam" className="hover:text-white transition-colors">Full Timed Exam</Link></li>
                <li><Link href="/exam" className="hover:text-white transition-colors">Custom Exam</Link></li>
                <li><Link href="/live-quiz" className="hover:text-white transition-colors">Live Quiz</Link></li>
                <li><Link href="/learning-analytics" className="hover:text-white transition-colors">Analytics</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/emergency-references" className="hover:text-white transition-colors">Evidence Library</Link></li>
                <li><Link href="/guidelines" className="hover:text-white transition-colors">Clinical Guidelines</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © 2025 ECCCO. All rights reserved. Built for healthcare professionals.
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/support" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div> {/* Close main content div */}
    </div>
  );
}
