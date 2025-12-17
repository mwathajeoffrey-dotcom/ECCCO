// My Bookmarks Page
'use client';

import { useState, useEffect } from 'react';
import { Star, Search, Filter, Book, ChevronLeft, StickyNote, X } from 'lucide-react';
import Link from 'next/link';
import { allQuestions, questionsByCategory, getCategoryList } from '@/lib/questions';

interface Bookmark {
  id: string;
  userId: string;
  questionId: string;
  notes: string | null;
  category: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userId, setUserId] = useState<string>('');

  // Get or create session ID
  useEffect(() => {
    let sessionId = localStorage.getItem('eccco_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('eccco_session_id', sessionId);
    }
    setUserId(sessionId);
  }, []);

  // Fetch bookmarks
  useEffect(() => {
    if (userId) {
      fetchBookmarks();
    }
  }, [userId, selectedCategory]);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const url = selectedCategory === 'all'
        ? `/api/bookmarks?userId=${userId}`
        : `/api/bookmarks?userId=${userId}&category=${selectedCategory}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setBookmarks(data.bookmarks);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (questionId: string) => {
    if (!confirm('Remove this bookmark?')) return;

    try {
      const response = await fetch(
        `/api/bookmarks?userId=${userId}&questionId=${questionId}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        setBookmarks(bookmarks.filter((b) => b.questionId !== questionId));
      }
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  // Get question details by ID
  const getQuestionDetails = (questionId: string) => {
    return allQuestions.find((q) => q.id === questionId);
  };

  // Filter bookmarks by search query
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const question = getQuestionDetails(bookmark.questionId);
    if (!question) return false;

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      question.question.toLowerCase().includes(searchLower) ||
      question.explanation.toLowerCase().includes(searchLower) ||
      (bookmark.notes?.toLowerCase().includes(searchLower) ?? false);

    return matchesSearch;
  });

  const categories = ['all', ...getCategoryList()];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back</span>
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl">
                  <Star className="w-6 h-6 text-white fill-current" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">My Bookmarks</h1>
                  <p className="text-sm text-gray-600">
                    {filteredBookmarks.length} bookmarked question{filteredBookmarks.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookmarks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bookmarks List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bookmarks...</p>
          </div>
        ) : filteredBookmarks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookmarks found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your filters'
                : 'Start bookmarking questions to review them later'}
            </p>
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Practicing
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookmarks.map((bookmark) => {
              const question = getQuestionDetails(bookmark.questionId);
              if (!question) return null;

              return (
                <div key={bookmark.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Category Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                          {question.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          Bookmarked {new Date(bookmark.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Question */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {question.question}
                      </h3>

                      {/* Personal Notes */}
                      {bookmark.notes && (
                        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <StickyNote className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-amber-800 mb-1">Your Notes:</p>
                              <p className="text-sm text-gray-700">{bookmark.notes}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Quick Preview of Explanation */}
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {question.explanation.substring(0, 200)}...
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleRemoveBookmark(bookmark.questionId)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove bookmark"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Review Button */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        // In a real implementation, this would navigate to a question review interface
                        alert('Review mode coming soon! This would show the full question with answer options.');
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Review Question →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
