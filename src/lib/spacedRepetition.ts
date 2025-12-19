/**
 * Spaced Repetition Algorithm (SM-2)
 * 
 * Based on SuperMemo SM-2 algorithm
 * Reference: https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
 */

export interface ReviewResult {
  nextReviewDate: Date;
  easeFactor: number;
  interval: number;
  reviewCount: number;
}

/**
 * Calculate next review using SM-2 algorithm
 * 
 * @param grade - Quality of recall (0-5):
 *   5 - Perfect recall
 *   4 - Correct after slight hesitation
 *   3 - Correct with serious difficulty
 *   2 - Incorrect but familiar
 *   1 - Incorrect, seems familiar
 *   0 - Complete blackout
 * 
 * @param currentEaseFactor - Current ease factor (starts at 2.5)
 * @param currentInterval - Current interval in days
 * @param currentReviewCount - Number of times reviewed
 * 
 * @returns Next review date, new ease factor, new interval, review count
 */
export function calculateNextReview(
  grade: number,
  currentEaseFactor: number = 2.5,
  currentInterval: number = 1,
  currentReviewCount: number = 0
): ReviewResult {
  // Ensure grade is between 0 and 5
  const normalizedGrade = Math.max(0, Math.min(5, grade));
  
  // Calculate new ease factor
  let newEaseFactor = currentEaseFactor + (0.1 - (5 - normalizedGrade) * (0.08 + (5 - normalizedGrade) * 0.02));
  
  // Ease factor should not fall below 1.3
  newEaseFactor = Math.max(1.3, newEaseFactor);
  
  let newInterval: number;
  const newReviewCount = currentReviewCount + 1;
  
  // If grade < 3, reset interval (failed recall)
  if (normalizedGrade < 3) {
    newInterval = 1; // Start over with 1 day
  } else {
    // Successful recall
    if (newReviewCount === 1) {
      newInterval = 1; // First review after 1 day
    } else if (newReviewCount === 2) {
      newInterval = 6; // Second review after 6 days
    } else {
      // Subsequent reviews: multiply previous interval by ease factor
      newInterval = Math.round(currentInterval * newEaseFactor);
    }
  }
  
  // Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);
  
  return {
    nextReviewDate,
    easeFactor: newEaseFactor,
    interval: newInterval,
    reviewCount: normalizedGrade < 3 ? 0 : newReviewCount, // Reset count if failed
  };
}

/**
 * Check if a bookmark is due for review
 */
export function isDueForReview(nextReviewDate: Date | null): boolean {
  if (!nextReviewDate) return true; // Not reviewed yet
  return new Date() >= new Date(nextReviewDate);
}

/**
 * Get review priority (higher = more urgent)
 * Used for sorting review queue
 */
export function getReviewPriority(nextReviewDate: Date | null): number {
  if (!nextReviewDate) return 1000; // Never reviewed = highest priority
  
  const now = new Date();
  const reviewDate = new Date(nextReviewDate);
  const daysOverdue = (now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24);
  
  if (daysOverdue > 0) {
    // Overdue - priority increases with days overdue
    return 100 + daysOverdue;
  } else {
    // Not due yet - negative priority
    return -Math.abs(daysOverdue);
  }
}

/**
 * Get suggested grade based on whether user answered correctly and time taken
 */
export function suggestGrade(wasCorrect: boolean, timeSpentSeconds: number, averageTimeSeconds: number = 30): number {
  if (!wasCorrect) {
    // Incorrect answers
    if (timeSpentSeconds < averageTimeSeconds * 0.5) {
      return 0; // Quick wrong answer = complete blackout
    } else {
      return 2; // Took time but still wrong = somewhat familiar
    }
  } else {
    // Correct answers
    if (timeSpentSeconds < averageTimeSeconds * 0.5) {
      return 5; // Quick and correct = perfect recall
    } else if (timeSpentSeconds < averageTimeSeconds * 1.5) {
      return 4; // Correct with slight hesitation
    } else {
      return 3; // Correct but took a while = serious difficulty
    }
  }
}

/**
 * Calculate study streak
 */
export function calculateStreak(studySessions: Array<{ createdAt: Date }>): number {
  if (studySessions.length === 0) return 0;
  
  // Sort by date descending
  const sorted = studySessions.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  for (const session of sorted) {
    const sessionDate = new Date(session.createdAt);
    sessionDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor(
      (currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysDiff === streak) {
      streak++;
    } else if (daysDiff > streak) {
      break; // Gap in streak
    }
  }
  
  return streak;
}

/**
 * Get study statistics
 */
export interface StudyStats {
  totalReviews: number;
  todayReviews: number;
  weekReviews: number;
  averageGrade: number;
  streak: number;
  dueCount: number;
}

export function getStudyStats(
  studySessions: Array<{ createdAt: Date; reviewGrade: number }>,
  bookmarks: Array<{ nextReviewDate: Date | null }>
): StudyStats {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const todayReviews = studySessions.filter(s => 
    new Date(s.createdAt) >= today
  ).length;
  
  const weekReviews = studySessions.filter(s => 
    new Date(s.createdAt) >= weekAgo
  ).length;
  
  const averageGrade = studySessions.length > 0
    ? studySessions.reduce((sum, s) => sum + s.reviewGrade, 0) / studySessions.length
    : 0;
  
  const dueCount = bookmarks.filter(b => isDueForReview(b.nextReviewDate)).length;
  
  return {
    totalReviews: studySessions.length,
    todayReviews,
    weekReviews,
    averageGrade: Math.round(averageGrade * 10) / 10,
    streak: calculateStreak(studySessions),
    dueCount,
  };
}
