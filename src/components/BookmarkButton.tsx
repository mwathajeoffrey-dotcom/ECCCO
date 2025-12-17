// Bookmark Button Component
'use client';

import { useState } from 'react';
import { Star, StickyNote } from 'lucide-react';

interface BookmarkButtonProps {
  questionId: string;
  userId: string;
  category?: string;
  initialBookmarked?: boolean;
  initialNotes?: string;
}

export default function BookmarkButton({
  questionId,
  userId,
  category,
  initialBookmarked = false,
  initialNotes = '',
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [notes, setNotes] = useState(initialNotes);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBookmark = async () => {
    setLoading(true);
    try {
      if (isBookmarked) {
        // Remove bookmark
        const response = await fetch(`/api/bookmarks?userId=${userId}&questionId=${questionId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setIsBookmarked(false);
          setNotes('');
        }
      } else {
        // Add bookmark
        const response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            questionId,
            category,
            notes: notes || null,
          }),
        });

        if (response.ok) {
          setIsBookmarked(true);
        }
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      alert('Failed to update bookmark. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    setLoading(true);
    try {
      if (isBookmarked) {
        // Update existing bookmark notes
        const response = await fetch('/api/bookmarks', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            questionId,
            notes,
          }),
        });

        if (response.ok) {
          setShowNotesModal(false);
        }
      } else {
        // Create bookmark with notes
        const response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            questionId,
            category,
            notes,
          }),
        });

        if (response.ok) {
          setIsBookmarked(true);
          setShowNotesModal(false);
        }
      }
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Failed to save notes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Bookmark Button */}
      <button
        onClick={handleBookmark}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          isBookmarked
            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <Star
          className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`}
        />
        <span className="text-sm font-medium">
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </span>
      </button>

      {/* Notes Button */}
      <button
        onClick={() => setShowNotesModal(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all"
      >
        <StickyNote className="w-5 h-5" />
        <span className="text-sm font-medium">
          {notes ? 'Edit Notes' : 'Add Notes'}
        </span>
      </button>

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {notes ? 'Edit Notes' : 'Add Notes'}
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your personal notes about this question..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowNotesModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
