'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Brain, Calendar, TrendingUp, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface Bookmark {
  id: string;
  questionId: string;
  notes: string | null;
  category: string | null;
  nextReviewDate: string | null;
  reviewCount: number;
  easeFactor: number;
  interval: number;
  lastReviewGrade: number | null;
}

interface ReviewStats {
  total: number;
  reviewed: number;
  dueToday: number;
  upToDate: number;
}

export default function ReviewPage() {
  const [bookmarksDue, setBookmarksDue] = useState<Bookmark[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId] = useState(() => {
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('userId');
      if (!id) {
        id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('userId', id);
      }
      return id;
    }
    return 'anonymous';
  });

  useEffect(() => {
    loadReviewBookmarks();
  }, []);

  const loadReviewBookmarks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bookmarks/review?userId=${userId}`);
      const result = await response.json();

      if (result.success) {
        setBookmarksDue(result.data.bookmarksDue);
        setStats(result.data.stats);
      }
    } catch (error) {
      console.error('Error loading review bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (grade: number) => {
    try {
      const currentBookmark = bookmarksDue[currentIndex];
      
      const response = await fetch('/api/bookmarks/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookmarkId: currentBookmark.id,
          grade
        })
      });

      const result = await response.json();

      if (result.success) {
        // Move to next bookmark
        if (currentIndex < bookmarksDue.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setShowAnswer(false);
        } else {
          // All reviews complete
          loadReviewBookmarks(); // Reload to get updated stats
        }
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const gradeOptions = [
    { grade: 5, label: 'Perfect', emoji: '🎯', description: 'Perfect recall, immediate answer' },
    { grade: 4, label: 'Good', emoji: '✅', description: 'Correct after brief thought' },
    { grade: 3, label: 'OK', emoji: '🤔', description: 'Correct with some difficulty' },
    { grade: 2, label: 'Hard', emoji: '😰', description: 'Incorrect but remembered something' },
    { grade: 1, label: 'Forgot', emoji: '😵', description: 'Vague memory, mostly wrong' },
    { grade: 0, label: 'Blank', emoji: '❌', description: 'Complete blackout' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading review session...</p>
        </div>
      </div>
    );
  }

  if (bookmarksDue.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">ECCCO</h1>
                  <p className="text-sm text-gray-600">Spaced Repetition Review</p>
                </div>
              </Link>
              <nav className="flex space-x-6">
                <Link href="/bookmarks" className="text-gray-700 hover:text-blue-600 font-medium">
                  All Bookmarks
                </Link>
                <Link href="/practice" className="text-gray-700 hover:text-blue-600 font-medium">
                  Practice
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-12">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Caught Up! 🎉</h2>
            <p className="text-xl text-gray-600 mb-8">
              You have no bookmarks due for review today. Great job staying on track!
            </p>

            {stats && (
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
                  <div className="text-sm text-blue-800">Total Bookmarks</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-600">{stats.upToDate}</div>
                  <div className="text-sm text-green-800">Up to Date</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-purple-600">{stats.reviewed}</div>
                  <div className="text-sm text-purple-800">Total Reviewed</div>
                </div>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <Link
                href="/practice"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Practice More Questions
              </Link>
              <Link
                href="/bookmarks"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50"
              >
                View Bookmarks
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentBookmark = bookmarksDue[currentIndex];
  const progress = ((currentIndex + 1) / bookmarksDue.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ECCCO</h1>
                <p className="text-sm text-gray-600">Spaced Repetition Review</p>
              </div>
            </Link>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{currentIndex + 1} / {bookmarksDue.length}</div>
                <div className="text-sm text-gray-600">Questions Reviewed</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-2">
        <div className="bg-blue-600 h-2 transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Review Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">Review Count</div>
            <div className="text-2xl font-bold text-gray-900">{currentBookmark.reviewCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">Ease Factor</div>
            <div className="text-2xl font-bold text-gray-900">{currentBookmark.easeFactor.toFixed(1)}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">Interval</div>
            <div className="text-2xl font-bold text-gray-900">{currentBookmark.interval}d</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <Brain className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">Last Grade</div>
            <div className="text-2xl font-bold text-gray-900">
              {currentBookmark.lastReviewGrade !== null ? currentBookmark.lastReviewGrade : '-'}
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {currentBookmark.category || 'General'}
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Question ID:</h3>
            <p className="text-lg text-gray-900 font-mono">{currentBookmark.questionId}</p>
          </div>

          {currentBookmark.notes && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="text-sm font-medium text-amber-900 mb-2">Your Notes:</h3>
              <p className="text-amber-800">{currentBookmark.notes}</p>
            </div>
          )}

          <div className="text-center mb-6">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
          </div>

          {showAnswer && (
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg mb-6">
              <p className="text-blue-900 text-center mb-4">
                This is where you would see the question content and explanation.
                <br />
                <span className="text-sm text-blue-700">
                  (Integrate with your actual question data)
                </span>
              </p>
              <Link
                href={`/exam?questionId=${currentBookmark.questionId}`}
                className="block text-center text-blue-600 hover:text-blue-700 font-medium"
              >
                View Full Question →
              </Link>
            </div>
          )}
        </div>

        {/* Grading Buttons */}
        {showAnswer && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              How well did you recall this?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gradeOptions.map(({ grade, label, emoji, description }) => (
                <button
                  key={grade}
                  onClick={() => handleReview(grade)}
                  className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
                >
                  <div className="text-3xl mb-2">{emoji}</div>
                  <div className="font-semibold text-gray-900 mb-1">{label}</div>
                  <div className="text-xs text-gray-600">{description}</div>
                  <div className="text-xs text-blue-600 mt-2">Grade: {grade}</div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">📚 SM-2 Spaced Repetition</h4>
              <p className="text-xs text-gray-600">
                Your rating determines when you'll see this question again. Higher grades (4-5) mean longer intervals.
                Lower grades (0-2) reset the interval to help you learn better.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
