'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface QuestionRatingProps {
  questionId: string;
}

export default function QuestionRating({ questionId }: QuestionRatingProps) {
  const { user, isSignedIn } = useUser();
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Show sign-in prompt if not authenticated
  if (!isSignedIn || !user) {
    return (
      <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <Star className="w-5 h-5 text-amber-600" />
        <p className="text-sm text-amber-900">
          <a href="/sign-in" className="font-medium underline hover:text-amber-700">Sign in</a> to rate questions and provide feedback
        </p>
      </div>
    );
  }

  const handleRatingSubmit = async () => {
    if (!rating) return;

    setLoading(true);
    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          questionId,
          stars: rating,
          feedback: feedback || null
        })
      });

      if (response.ok) {
        console.log('📊 Rating submitted successfully');
        setSubmitted(true);
        
        // Reset submitted state after 3 seconds to allow re-rating
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        throw new Error('Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFeedback = async (helpful: boolean) => {
    setLoading(true);
    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          questionId,
          stars: helpful ? 5 : 2, // Quick feedback: helpful = 5 stars, not helpful = 2 stars
          helpful
        })
      });

      if (response.ok) {
        console.log('👍 Quick feedback submitted');
        setSubmitted(true);
        
        // Reset submitted state after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
          <p className="text-green-800 text-sm font-medium">
            ✓ Thank you for your feedback!
          </p>
        </div>
        
        {/* Show the rating again */}
        <div className="opacity-60">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Your Rating</h4>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Quality:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= (rating || 0)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            {rating && (
              <span className="text-xs text-gray-600 ml-2">
                {rating === 5 ? 'Excellent' : rating === 4 ? 'Good' : rating === 3 ? 'Fair' : rating === 2 ? 'Poor' : 'Very Poor'}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h4 className="text-sm font-semibold text-gray-900 mb-3">Rate this Question</h4>
      
      {/* Star Rating */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-gray-600">Quality:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(null)}
              className="transition-transform hover:scale-110 focus:outline-none"
              disabled={loading}
            >
              <Star
                className={`w-5 h-5 ${
                  star <= (hoveredRating || rating || 0)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        {rating && (
          <span className="text-xs text-gray-600 ml-2">
            {rating === 5 ? 'Excellent' : rating === 4 ? 'Good' : rating === 3 ? 'Fair' : rating === 2 ? 'Poor' : 'Very Poor'}
          </span>
        )}
      </div>

      {/* Quick Feedback */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs text-gray-600">Helpful?</span>
        <button
          onClick={() => handleQuickFeedback(true)}
          disabled={loading}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="text-xs font-medium">Yes</span>
        </button>
        <button
          onClick={() => handleQuickFeedback(false)}
          disabled={loading}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ThumbsDown className="w-4 h-4" />
          <span className="text-xs font-medium">No</span>
        </button>
      </div>

      {/* Optional Feedback Text */}
      {rating && (
        <div className="mb-3">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Optional: Share what could be improved..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={2}
            disabled={loading}
          />
        </div>
      )}

      {/* Submit Button */}
      {rating && (
        <button
          onClick={handleRatingSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Rating'}
        </button>
      )}
    </div>
  );
}
