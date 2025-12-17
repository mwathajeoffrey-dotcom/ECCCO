import Link from 'next/link';
import { BookOpen, Clock, Trophy, BarChart3, FileText, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ECCCO</h1>
                <p className="text-sm text-gray-600">Emergency & Critical Care Comprehensive Online</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/practice" className="text-gray-700 hover:text-blue-600 font-medium">
                Practice
              </Link>
              <Link href="/exam" className="text-gray-700 hover:text-blue-600 font-medium">
                Exams
              </Link>
              <Link href="/review" className="text-gray-700 hover:text-blue-600 font-medium">
                Review
              </Link>
              <Link href="/bookmarks" className="text-gray-700 hover:text-blue-600 font-medium">
                Bookmarks
              </Link>
              <Link href="/cases" className="text-gray-700 hover:text-blue-600 font-medium">
                Cases
              </Link>
              <Link href="/learning-analytics" className="text-gray-700 hover:text-blue-600 font-medium">
                Analytics
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Master Emergency &
            <span className="text-blue-600"> Critical Care</span>
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive question bank with over 2,000 evidence-based questions covering all emergency
            and critical care topics. Practice with timed exams, detailed explanations, and performance tracking.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/practice"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Practicing
            </Link>
            <Link
              href="/exam"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Take Full Exam
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">2,000+ Questions</h3>
            <p className="text-gray-600">
              Comprehensive question bank covering all emergency and critical care topics with evidence-based explanations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Timed Exams</h3>
            <p className="text-gray-600">
              Simulate real exam conditions with timed sessions and proper pacing for optimal preparation.
            </p>
          </div>

          <Link href="/learning-analytics" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Learning Analytics</h3>
            <p className="text-gray-600">
              Advanced AI-powered insights, adaptive recommendations, and personalized study plans for optimal learning.
            </p>
          </Link>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Explanations</h3>
            <p className="text-gray-600">
              Every question includes comprehensive explanations with references to current guidelines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Topic Mastery</h3>
            <p className="text-gray-600">
              Focus on specific topics with 30-question packs designed for targeted learning.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Content</h3>
            <p className="text-gray-600">
              Questions developed by emergency and critical care experts based on current best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Topics Overview */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Topics Covered
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              'Airway Management',
              'Mechanical Ventilation',
              'Sepsis Management',
              'Shock & Resuscitation',
              'Cardiac Emergencies',
              'Neurological Emergencies',
              'Toxicology',
              'Trauma Management',
              'Respiratory Emergencies',
              'Renal Emergencies',
              'Endocrine Emergencies',
              'Critical Care Pharmacology',
              'Procedures',
              'Infection Control',
              'Ethical & Legal Issues'
            ].map((topic) => (
              <div key={topic} className="bg-gray-50 p-4 rounded-lg text-center">
                <span className="text-sm font-medium text-gray-700">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Excel in Emergency & Critical Care?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of healthcare professionals who have improved their knowledge and skills with our comprehensive platform.
          </p>
          <Link
            href="/practice"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-6 h-6" />
                <span className="text-xl font-bold">ECCCO</span>
              </div>
              <p className="text-gray-400">
                Emergency & Critical Care Comprehensive Online platform for medical education.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/practice" className="hover:text-white">Practice Questions</Link></li>
                <li><Link href="/exam" className="hover:text-white">Timed Exams</Link></li>
                <li><Link href="/learning-analytics" className="hover:text-white">Learning Analytics</Link></li>
                <li><Link href="/guidelines" className="hover:text-white">Medical Guidelines</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Topics</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Emergency Medicine</li>
                <li>Critical Care</li>
                <li>Trauma Management</li>
                <li>Pharmacology</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ECCCO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}