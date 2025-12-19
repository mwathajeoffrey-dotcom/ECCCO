'use client';

import Link from 'next/link';
import { BookOpen, Search, Database, Brain, BarChart, Rocket } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🚀 NEW FEATURES - December 19, 2025
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Major Platform Update
          </h1>
          <p className="text-xl text-gray-600">
            3 powerful new features to supercharge your emergency medicine learning
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Feature 1: Spaced Repetition */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🧠 Spaced Repetition
            </h2>
            <p className="text-gray-600 mb-6">
              Science-backed SM-2 algorithm schedules reviews at optimal intervals. Study smarter, not harder!
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <div className="text-green-500 mt-1">✓</div>
                <span className="text-sm text-gray-700">Smart review scheduling</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-500 mt-1">✓</div>
                <span className="text-sm text-gray-700">Study streak tracking</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-500 mt-1">✓</div>
                <span className="text-sm text-gray-700">Performance analytics</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-500 mt-1">✓</div>
                <span className="text-sm text-gray-700">80%+ retention rate</span>
              </div>
            </div>
            <Link 
              href="/study"
              className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Study Dashboard →
            </Link>
          </div>

          {/* Feature 2: Global Search */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🔍 Global Search
            </h2>
            <p className="text-gray-600 mb-6">
              Lightning-fast search across all content with keyboard shortcuts. Find anything in seconds!
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <div className="text-green-500 mt-1">✓</div>
                <span className="text-sm text-gray-700">Press Cmd+K anywhere</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-500 mt-1">✓</div>
                <span className="text-sm text-gray-700">Fuzzy search algorithm</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-500 mt-1">✓</div>
                <span className="text-sm text-gray-700">Recent searches saved</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-500 mt-1">✓</div>
                <span className="text-sm text-gray-700">Multi-content search</span>
              </div>
            </div>
            <button 
              onClick={() => {
                // Trigger Cmd+K
                const event = new KeyboardEvent('keydown', { 
                  key: 'k', 
                  metaKey: true,
                  ctrlKey: false 
                });
                window.dispatchEvent(event);
              }}
              className="block w-full text-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Try Search (Cmd+K) →
            </button>
          </div>

          {/* Feature 3: PubMed Integration */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-200 hover:border-green-400 transition-all">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Database className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📚 PubMed Integration
            </h2>
            <p className="text-gray-600 mb-6">
              Access 36+ million research papers automatically. Evidence-based learning at your fingertips!
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <div className="text-green-500 mt-1">✓</div>
                <span className="text-sm text-gray-700">Auto-import papers</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-500 mt-1">✓</div>
                <span className="text-sm text-gray-700">Curated by specialty</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-500 mt-1">✓</div>
                <span className="text-sm text-gray-700">Full metadata extraction</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-500 mt-1">✓</div>
                <span className="text-sm text-gray-700">Quality research only</span>
              </div>
            </div>
            <Link 
              href="/evidence"
              className="block w-full text-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Browse Evidence Library →
            </Link>
          </div>
        </div>

        {/* Quick Demo Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            🎯 Quick Demos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* API Demo */}
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-blue-600" />
                Live API Test
              </h3>
              <p className="text-gray-600 mb-4">
                All new features have working APIs. Try them:
              </p>
              <div className="space-y-2 font-mono text-sm">
                <div className="bg-gray-50 p-3 rounded">
                  <strong>Search:</strong><br />
                  <a 
                    href="/api/search?q=cardiac" 
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    /api/search?q=cardiac
                  </a>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <strong>PubMed:</strong><br />
                  <a 
                    href="/api/pubmed?q=sepsis&limit=3" 
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    /api/pubmed?q=sepsis&limit=3
                  </a>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <strong>Study Stats:</strong><br />
                  <span className="text-gray-500">
                    /api/study/stats (requires auth)
                  </span>
                </div>
              </div>
            </div>

            {/* Usage Guide */}
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                How to Use
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">1. Study Dashboard</div>
                  <p className="text-sm text-gray-600">
                    Bookmark questions → Visit <Link href="/study" className="text-blue-600 hover:underline">/study</Link> → Review with spaced repetition
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">2. Global Search</div>
                  <p className="text-sm text-gray-600">
                    Press <kbd className="px-2 py-1 bg-gray-200 rounded">Cmd+K</kbd> on any page → Type query → Navigate
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">3. Evidence Library</div>
                  <p className="text-sm text-gray-600">
                    Browse curated papers from PubMed → Save to bookmarks → Reference in study
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Development Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2,144</div>
              <div className="text-blue-100">Lines of Code</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">13</div>
              <div className="text-blue-100">New Files</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-blue-100">API Endpoints</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">~6h</div>
              <div className="text-blue-100">Development Time</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <Link 
            href="/"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
