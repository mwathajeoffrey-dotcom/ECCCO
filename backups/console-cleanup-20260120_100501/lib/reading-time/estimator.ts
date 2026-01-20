/**
 * Reading Time Estimator
 * Calculates estimated reading time for abstracts and full-text articles
 */

export interface ReadingTimeEstimate {
  minutes: number;
  words: number;
  formattedTime: string;
}

// Average reading speeds (words per minute)
const READING_SPEEDS = {
  abstract: 200, // Slower for dense scientific text
  fullText: 180, // Even slower for detailed methodology
  skim: 400 // Fast skimming
};

/**
 * Calculate reading time for text
 */
export function calculateReadingTime(
  text: string,
  mode: 'abstract' | 'fullText' | 'skim' = 'abstract'
): ReadingTimeEstimate {
  if (!text || text.trim().length === 0) {
    return {
      minutes: 0,
      words: 0,
      formattedTime: '< 1 min'
    };
  }

  // Count words (split by whitespace and filter empty strings)
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;

  // Calculate minutes based on reading speed
  const wpm = READING_SPEEDS[mode];
  const minutes = Math.ceil(words / wpm);

  // Format the time nicely
  let formattedTime: string;
  if (minutes < 1) {
    formattedTime = '< 1 min';
  } else if (minutes === 1) {
    formattedTime = '1 min';
  } else if (minutes < 60) {
    formattedTime = `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    formattedTime = remainingMinutes > 0 
      ? `${hours}h ${remainingMinutes}m` 
      : `${hours}h`;
  }

  return {
    minutes,
    words,
    formattedTime
  };
}

/**
 * Calculate total reading time for an article (abstract + full text estimate)
 */
export function calculateArticleReadingTime(article: {
  abstract?: string;
  fullTextUrl?: string;
}): {
  abstract: ReadingTimeEstimate;
  fullText: ReadingTimeEstimate;
  total: ReadingTimeEstimate;
} {
  const abstractTime = article.abstract 
    ? calculateReadingTime(article.abstract, 'abstract')
    : { minutes: 0, words: 0, formattedTime: 'N/A' };

  // Estimate full text based on abstract (typical full text is 8-12x abstract length)
  const estimatedFullTextWords = article.fullTextUrl 
    ? abstractTime.words * 10 
    : 0;

  const fullTextTime = estimatedFullTextWords > 0
    ? {
        minutes: Math.ceil(estimatedFullTextWords / READING_SPEEDS.fullText),
        words: estimatedFullTextWords,
        formattedTime: `~${Math.ceil(estimatedFullTextWords / READING_SPEEDS.fullText)} min`
      }
    : { minutes: 0, words: 0, formattedTime: 'N/A' };

  const totalMinutes = abstractTime.minutes + fullTextTime.minutes;
  const totalWords = abstractTime.words + fullTextTime.words;

  return {
    abstract: abstractTime,
    fullText: fullTextTime,
    total: {
      minutes: totalMinutes,
      words: totalWords,
      formattedTime: totalMinutes > 0 
        ? (totalMinutes < 60 ? `${totalMinutes} min` : `${Math.floor(totalMinutes/60)}h ${totalMinutes%60}m`)
        : 'N/A'
    }
  };
}

/**
 * Get reading time category for UI styling
 */
export function getReadingTimeCategory(minutes: number): {
  category: 'quick' | 'moderate' | 'lengthy' | 'extensive';
  color: string;
  icon: string;
} {
  if (minutes <= 3) {
    return {
      category: 'quick',
      color: 'text-green-600',
      icon: '⚡'
    };
  } else if (minutes <= 8) {
    return {
      category: 'moderate',
      color: 'text-blue-600',
      icon: '📖'
    };
  } else if (minutes <= 15) {
    return {
      category: 'lengthy',
      color: 'text-yellow-600',
      icon: '📚'
    };
  } else {
    return {
      category: 'extensive',
      color: 'text-orange-600',
      icon: '📜'
    };
  }
}

/**
 * Format reading time for display with icon
 */
export function formatReadingTimeWithIcon(minutes: number): string {
  const { icon, category } = getReadingTimeCategory(minutes);
  const { formattedTime } = calculateReadingTime(' '.repeat(minutes * 200)); // Approximate
  
  return `${icon} ${formattedTime}`;
}
