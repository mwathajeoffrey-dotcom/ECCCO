// Bookmark Button Component
'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Star, StickyNote } from 'lucide-react';

interface BookmarkButtonProps {
  questionId: string;
  category?: string;
  initialBookmarked?: boolean;
  initialNotes?: string;
}

export default function BookmarkButton({
  questionId,
  category,
  initialBookmarked = false,
  initialNotes = '',
}: BookmarkButtonProps) {
  const { user, isSignedIn } = useUser();
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [notes, setNotes] = useState(initialNotes);
  const [loading, setLoading] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);

  if (!isSignedIn || !user) return null;

  const apiBase = process.env.NEXT_PUBLIC_USE_MOCK_DB === 'true' ? '/api/bookmarks-mock' : '/api/bookmarks';

  // Fetch bookmark status when question changes
  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const res = await fetch(`${apiBase}?userId=${user.id}`);
        if (res.ok) {
          const data = await res.json();
          const bookmark = data.bookmarks?.find((b: any) => b.questionId === questionId);
          setIsBookmarked(!!bookmark);
          setNotes(bookmark?.notes || '');
        }
      } catch (e) {
        console.error('Error fetching bookmark:', e);
      }
    };
    fetchBookmark();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId, user.id]);

  const handleBookmark = async () => {
    setLoading(true);
    try {
      if (isBookmarked) {
        const res = await fetch(`${apiBase}?userId=${user.id}&questionId=${questionId}`, { method: 'DELETE' });
        if (res.ok) {
          setIsBookmarked(false);
          setNotes('');
        }
      } else {
        const res = await fetch(apiBase, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, questionId, category, notes: notes || null }),
        });
        if (res.ok) setIsBookmarked(true);
      }
    } catch (e) {
      console.error('Error toggling bookmark', e);
      alert('Failed to update bookmark');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    setLoading(true);
    try {
      if (isBookmarked) {
        const res = await fetch(apiBase, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, questionId, notes }),
        });
        if (res.ok) setShowNotesModal(false);
      } else {
        const res = await fetch(apiBase, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, questionId, category, notes }),
        });
        if (res.ok) {
          setIsBookmarked(true);
          setShowNotesModal(false);
        }
      }
    } catch (e) {
      console.error('Error saving notes', e);
      alert('Failed to save notes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleBookmark}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          isBookmarked ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } disabled:opacity-50 disabled:cursor-not-allowed`}>
        <Star className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
        <span className="text-sm font-medium">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
      </button>

      <button onClick={() => setShowNotesModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all">
        <StickyNote className="w-5 h-5" />
        <span className="text-sm font-medium">{notes ? 'Edit Notes' : 'Add Notes'}</span>
      </button>

      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{notes ? 'Edit Notes' : 'Add Notes'}</h3>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add your personal notes about this question..." className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowNotesModal(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all">Cancel</button>
              <button onClick={handleSaveNotes} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50">{loading ? 'Saving...' : 'Save Notes'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
