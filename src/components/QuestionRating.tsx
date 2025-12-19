// Question Rating & Comments Component
'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { ThumbsUp, ThumbsDown, MessageSquare, Flag } from 'lucide-react';

interface QuestionRatingProps {
  questionId: string;
}

interface RatingStats {
  helpful: number;
  notHelpful: number;
  total: number;
  helpfulPercentage: number;
  flaggedCount: number;
}

interface Comment {
  id: string;
  userId?: string;
  comment: string;
  isHelpful: boolean;
  createdAt: string;
}

export default function QuestionRating({ questionId }: QuestionRatingProps) {
  const { user, isSignedIn } = useUser();
  const [stats, setStats] = useState<RatingStats | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [userRating, setUserRating] = useState<boolean | null>(null);
  const [userComment, setUserComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiBase = process.env.NEXT_PUBLIC_USE_MOCK_DB === 'true' 
    ? `/api/questions/${questionId}/rating-mock` 
    : `/api/questions/${questionId}/rating`;

  const fetchRatings = async () => {
    try {
      const response = await fetch(apiBase);
      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
        setComments(data.comments);
        
        // Check if current user has rated this question
        if (isSignedIn && user) {
          const userRatingComment = data.comments?.find((c: Comment) => c.userId === user.id);
          if (userRatingComment) {
            setUserRating(userRatingComment.isHelpful);
            setUserComment(userRatingComment.comment || '');
          }
        }
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  // Fetch ratings and comments
  useEffect(() => {
    fetchRatings();
    // Reset user rating state when question changes
    setUserRating(null);
    setUserComment('');
    setShowCommentForm(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);

  const handleRating = async (isHelpful: boolean, skipConfirmation = false) => {
    if (!isSignedIn || !user) {
      alert('Please sign in to rate questions');
      return;
    }
    
    // If clicking the same rating, allow them to remove it (but skip if submitting comment)
    if (userRating === isHelpful && !skipConfirmation) {
      if (!confirm('Remove your rating?')) {
        return;
      }
      // For now, just update to opposite to simulate removal
      // In a real app, you'd add a DELETE endpoint
    }
    
    setLoading(true);
    try {
      const response = await fetch(apiBase, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          isHelpful,
          comment: userComment || null,
        }),
      });

      if (response.ok) {
        setUserRating(isHelpful);
        setUserComment('');
        setShowCommentForm(false);
        // Refresh ratings
        await fetchRatings();
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFlag = async () => {
    if (!isSignedIn || !user) {
      alert('Please sign in to flag questions');
      return;
    }
    
    if (!confirm('Flag this explanation as outdated or incorrect? This will be reviewed by our team.')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(apiBase, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          isHelpful: false,
          flagged: true,
          comment: 'Flagged for review',
        }),
      });

      if (response.ok) {
        alert('Thank you! This question has been flagged for review.');
        await fetchRatings();
      }
    } catch (error) {
      console.error('Error flagging question:', error);
      alert('Failed to flag question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      {/* Helpful Rating */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Was this explanation helpful?
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleRating(true)}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              userRating === true
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <ThumbsUp className="w-5 h-5" />
            <span className="text-sm font-medium">Helpful</span>
          </button>

          <button
            onClick={() => handleRating(false)}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              userRating === false
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <ThumbsDown className="w-5 h-5" />
            <span className="text-sm font-medium">Not Helpful</span>
          </button>

          <button
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-medium">Comment</span>
          </button>

          <button
            onClick={handleFlag}
            disabled={loading}
            className="ml-auto flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 transition-all"
            title="Flag as outdated or incorrect"
          >
            <Flag className="w-4 h-4" />
            <span className="text-xs font-medium">Flag</span>
          </button>
        </div>
      </div>

      {/* Comment Form */}
      {showCommentForm && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <textarea
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            placeholder="Share your thoughts about this explanation..."
            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setShowCommentForm(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-all text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => handleRating(userRating ?? true, true)}
              disabled={!userComment.trim() || loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 text-sm"
            >
              Submit Comment
            </button>
          </div>
        </div>
      )}

      {/* Stats Display */}
      {stats && stats.total > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {stats.helpful} of {stats.total} found this helpful ({stats.helpfulPercentage}%)
            </span>
            {stats.flaggedCount > 0 && (
              <span className="text-orange-600 text-xs">
                {stats.flaggedCount} flag{stats.flaggedCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Comments Display */}
      {comments.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Comments ({comments.length})
          </h4>
          <div className="space-y-3">
            {(showAllComments ? comments : comments.slice(0, 3)).map((comment) => (
              <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-2">
                  {comment.isHelpful ? (
                    <ThumbsUp className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  ) : (
                    <ThumbsDown className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{comment.comment}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {comments.length > 3 && !showAllComments && (
            <button
              onClick={() => setShowAllComments(true)}
              className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Show all {comments.length} comments
            </button>
          )}
          {showAllComments && (
            <button
              onClick={() => setShowAllComments(false)}
              className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
}
