'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import StickyHeader from '@/components/navigation/StickyHeader';
import MobileMenu from '@/components/navigation/MobileMenu';
import Hero from '@/components/homepage/Hero';
import QuickActions from '@/components/homepage/QuickActions';
import EvidenceShowcase from '@/components/homepage/EvidenceShowcase';
import InteractiveTopicExplorer from '@/components/homepage/InteractiveTopicExplorer';
import Testimonials from '@/components/homepage/Testimonials';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <StickyHeader
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Hero Section */}
      <Hero />

      {/* Quick Actions */}
      <QuickActions />

      {/* Evidence Showcase */}
      <EvidenceShowcase />

      {/* Interactive Topic Explorer */}
      <InteractiveTopicExplorer />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Excel in Emergency & Critical Care?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join 10,000+ healthcare professionals who have improved their knowledge and skills with our comprehensive, evidence-based platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/practice"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Start Practicing Free
            </Link>
            <Link
              href="/exam"
              className="px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white/10 transition-all duration-300"
            >
              Take Full Exam
            </Link>
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
              <p className="text-gray-400 text-sm leading-relaxed">
                Emergency & Critical Care Comprehensive Online platform for evidence-based medical education.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/practice" className="hover:text-white transition-colors">Practice Questions</Link></li>
                <li><Link href="/exam" className="hover:text-white transition-colors">Timed Exams</Link></li>
                <li><Link href="/learning-analytics" className="hover:text-white transition-colors">Learning Analytics</Link></li>
                <li><Link href="/emergency-references" className="hover:text-white transition-colors">Evidence Library</Link></li>
                <li><Link href="/guidelines" className="hover:text-white transition-colors">Clinical Guidelines</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Topics</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/practice/acls" className="hover:text-white transition-colors">ACLS</Link></li>
                <li><Link href="/practice/pals" className="hover:text-white transition-colors">PALS</Link></li>
                <li><Link href="/practice" className="hover:text-white transition-colors">Emergency Medicine</Link></li>
                <li><Link href="/practice" className="hover:text-white transition-colors">Critical Care</Link></li>
                <li><Link href="/practice" className="hover:text-white transition-colors">Trauma</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 ECCCO. All rights reserved. Evidence-based medical education platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}