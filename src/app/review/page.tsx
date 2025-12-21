'use client';

import { BookOpen, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Review Session</h1>
          </div>
          <p className="text-gray-600">
            Review your bookmarked questions and previously answered items
          </p>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/bookmarks"
            className="bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-blue-600 hover:shadow-xl transition-all"
          >
            <BookOpen className="w-8 h-8 text-blue-600 mb-4" />
            <h2 className="text-xl font-bold mb-2 text-gray-900">Bookmarked Questions</h2>
            <p className="text-gray-600">Review questions you've saved for later</p>
          </Link>

          <Link
            href="/study"
            className="bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-purple-600 hover:shadow-xl transition-all"
          >
            <RefreshCw className="w-8 h-8 text-purple-600 mb-4" />
            <h2 className="text-xl font-bold mb-2 text-gray-900">Spaced Repetition</h2>
            <p className="text-gray-600">Review cards due today for optimal retention</p>
          </Link>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Review Tips</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>• Review regularly for better retention</li>
            <li>• Focus on questions you found challenging</li>
            <li>• Take notes on key concepts</li>
            <li>• Track your progress over time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
