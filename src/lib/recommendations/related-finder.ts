/**
 * Related Studies Finder
 * Finds similar articles based on keyword similarity and content analysis
 */

interface Article {
  id: string;
  title: string;
  abstract?: string;
  journal: string;
  authors: string[];
  published: string;
  citationCount: number;
}

interface RelatedStudy {
  article: Article;
  similarityScore: number;
  matchingKeywords: string[];
  reason: string;
}

/**
 * Extract keywords from text using simple NLP
 */
export function extractKeywords(text: string): string[] {
  if (!text) return [];

  // Common stop words to filter out
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
    'we', 'they', 'i', 'you', 'he', 'she', 'it', 'study', 'studies', 'using',
    'used', 'use', 'also', 'however', 'therefore', 'thus', 'found', 'showed',
    'show', 'demonstrated', 'demonstrate', 'suggest', 'suggests', 'indicated',
    'indicate', 'associated', 'association', 'between', 'among'
  ]);

  // Extract words, filter stop words, and get unique keywords
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ') // Remove special chars except hyphens
    .split(/\s+/)
    .filter(word => 
      word.length > 3 && // Minimum 4 characters
      !stopWords.has(word) &&
      !/^\d+$/.test(word) // Not just numbers
    );

  // Count word frequency
  const wordCounts = new Map<string, number>();
  words.forEach(word => {
    wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
  });

  // Sort by frequency and return top keywords
  return Array.from(wordCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word]) => word);
}

/**
 * Calculate similarity score between two sets of keywords
 * Uses Jaccard similarity coefficient
 */
export function calculateSimilarity(keywords1: string[], keywords2: string[]): number {
  if (keywords1.length === 0 || keywords2.length === 0) return 0;

  const set1 = new Set(keywords1);
  const set2 = new Set(keywords2);

  // Calculate intersection
  const intersection = new Set([...set1].filter(x => set2.has(x)));

  // Calculate union
  const union = new Set([...set1, ...set2]);

  // Jaccard similarity = intersection / union
  return intersection.size / union.size;
}

/**
 * Find related studies based on keyword similarity
 */
export function findRelatedStudies(
  currentArticle: Article,
  allArticles: Article[],
  limit: number = 5
): RelatedStudy[] {
  // Extract keywords from current article
  const currentKeywords = extractKeywords(
    `${currentArticle.title} ${currentArticle.abstract || ''}`
  );

  // Calculate similarity for all other articles
  const similarities = allArticles
    .filter(article => article.id !== currentArticle.id)
    .map(article => {
      const articleKeywords = extractKeywords(
        `${article.title} ${article.abstract || ''}`
      );

      const similarityScore = calculateSimilarity(currentKeywords, articleKeywords);

      // Find matching keywords
      const matchingKeywords = currentKeywords.filter(kw =>
        articleKeywords.includes(kw)
      );

      // Determine reason for recommendation
      let reason = '';
      if (similarityScore > 0.5) {
        reason = 'Highly similar topic';
      } else if (similarityScore > 0.3) {
        reason = 'Similar research area';
      } else if (matchingKeywords.length > 3) {
        reason = 'Related keywords';
      } else if (article.journal === currentArticle.journal) {
        reason = 'Same journal';
      } else {
        reason = 'Related content';
      }

      // Boost score for same journal or high citation count
      let boostedScore = similarityScore;
      if (article.journal === currentArticle.journal) {
        boostedScore += 0.05;
      }
      if (article.citationCount > 50) {
        boostedScore += 0.03;
      }
      if (article.citationCount > 100) {
        boostedScore += 0.05;
      }

      return {
        article,
        similarityScore: boostedScore,
        matchingKeywords: matchingKeywords.slice(0, 5),
        reason
      };
    })
    .filter(rel => rel.similarityScore > 0.1) // Only include if some similarity
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, limit);

  return similarities;
}

/**
 * Get related studies by author overlap
 */
export function findStudiesByAuthor(
  currentArticle: Article,
  allArticles: Article[],
  limit: number = 3
): Article[] {
  const currentAuthors = new Set(
    currentArticle.authors.map(a => a.toLowerCase())
  );

  return allArticles
    .filter(article => {
      if (article.id === currentArticle.id) return false;

      // Check if any author matches
      return article.authors.some(author =>
        currentAuthors.has(author.toLowerCase())
      );
    })
    .sort((a, b) => b.citationCount - a.citationCount)
    .slice(0, limit);
}

/**
 * Get color for similarity score
 */
export function getSimilarityColor(score: number): {
  bg: string;
  text: string;
  border: string;
} {
  if (score >= 0.5) {
    return {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200'
    };
  } else if (score >= 0.3) {
    return {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200'
    };
  } else {
    return {
      bg: 'bg-gray-50',
      text: 'text-gray-700',
      border: 'border-gray-200'
    };
  }
}

/**
 * Format similarity percentage
 */
export function formatSimilarityPercentage(score: number): string {
  return `${Math.round(score * 100)}% match`;
}
