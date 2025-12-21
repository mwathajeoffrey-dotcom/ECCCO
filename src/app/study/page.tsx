'use client';

import { useState, useEffect } from 'react';
import { Brain, BookOpen, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

export default function StudyPage() {
  const [stats, setStats] = useState({
    dueToday: 0,
    reviewed: 0,
    totalCards: 0
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Spaced Repetition Study</h1>
          </div>
          <p className="text-gray-600">
            Master emergency medicine with scientifically proven learning techniques
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">Due Today</h3>
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.dueToday}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">Reviewed</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.reviewed}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">Total Cards</h3>
              <BookOpen className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalCards}</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/study/review"
            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-white hover:shadow-xl transition-all"
          >
            <h2 className="text-2xl font-bold mb-2">Start Review Session</h2>
            <p className="opacity-90">Review your due cards and reinforce your knowledge</p>
          </Link>

          <Link
            href="/practice"
            className="bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-blue-600 hover:shadow-xl transition-all"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Add New Cards</h2>
            <p className="text-gray-600">Practice questions to add to your study deck</p>
          </Link>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">How Spaced Repetition Works</h3>
          <p className="text-gray-600 text-sm">
            Our platform uses spaced repetition to help you retain information longer. 
            Questions are scheduled for review at optimal intervals based on your performance, 
            ensuring efficient and effective learning.
          </p>
        </div>
      </div>
    </div>
  );
}
