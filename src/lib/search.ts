// Fuzzy search utility using simple string matching
export interface SearchResult {
  id: string;
  type: 'question' | 'evidence' | 'guideline' | 'case';
  title: string;
  description: string;
  category?: string;
  url: string;
  score: number;
}

/**
 * Calculate fuzzy match score
 * Higher score = better match
 */
function calculateScore(text: string, query: string): number {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  // Exact match
  if (lowerText === lowerQuery) return 100;
  
  // Starts with query
  if (lowerText.startsWith(lowerQuery)) return 90;
  
  // Contains exact query
  if (lowerText.includes(lowerQuery)) return 80;
  
  // Word-by-word matching
  const words = lowerQuery.split(' ');
  const matchedWords = words.filter(word => lowerText.includes(word));
  
  if (matchedWords.length === words.length) return 70;
  if (matchedWords.length > 0) return 50 + (matchedWords.length / words.length) * 20;
  
  // Character-by-character fuzzy match
  let score = 0;
  let position = 0;
  
  for (const char of lowerQuery) {
    const index = lowerText.indexOf(char, position);
    if (index >= 0) {
      score += 1;
      position = index + 1;
    }
  }
  
  return (score / lowerQuery.length) * 30;
}

/**
 * Search across multiple data sources
 */
export function searchAll(
  query: string,
  questions: any[],
  evidence: any[],
  guidelines: any[],
  cases: any[]
): SearchResult[] {
  if (!query.trim()) return [];
  
  const results: SearchResult[] = [];
  
  // Search questions
  questions.forEach(q => {
    const titleScore = calculateScore(q.question || '', query);
    const explanationScore = calculateScore(q.explanation || '', query);
    const categoryScore = calculateScore(q.category || '', query);
    
    const maxScore = Math.max(titleScore, explanationScore, categoryScore);
    
    if (maxScore > 30) {
      results.push({
        id: q.id,
        type: 'question',
        title: q.question,
        description: q.explanation?.substring(0, 150) + '...',
        category: q.category,
        url: `/practice/question/${q.id}`,
        score: maxScore,
      });
    }
  });
  
  // Search evidence library
  evidence.forEach(e => {
    const titleScore = calculateScore(e.title || '', query);
    const abstractScore = calculateScore(e.abstract || '', query);
    const authorScore = calculateScore(e.authors || '', query);
    
    const maxScore = Math.max(titleScore, abstractScore, authorScore);
    
    if (maxScore > 30) {
      results.push({
        id: e.id,
        type: 'evidence',
        title: e.title,
        description: `${e.journal} (${e.year}) - ${e.abstract?.substring(0, 100)}...`,
        category: e.specialty,
        url: `/evidence-library/${e.specialty.toLowerCase()}`,
        score: maxScore,
      });
    }
  });
  
  // Search guidelines
  guidelines.forEach(g => {
    const titleScore = calculateScore(g.title || '', query);
    const contentScore = calculateScore(g.content || '', query);
    
    const maxScore = Math.max(titleScore, contentScore);
    
    if (maxScore > 30) {
      results.push({
        id: g.id,
        type: 'guideline',
        title: g.title,
        description: g.content?.substring(0, 150) + '...',
        category: 'Guidelines',
        url: '/emergency-references',
        score: maxScore,
      });
    }
  });
  
  // Search cases
  cases.forEach(c => {
    const titleScore = calculateScore(c.title || '', query);
    const presentationScore = calculateScore(c.presentation || '', query);
    
    const maxScore = Math.max(titleScore, presentationScore);
    
    if (maxScore > 30) {
      results.push({
        id: c.id,
        type: 'case',
        title: c.title,
        description: c.presentation?.substring(0, 150) + '...',
        category: c.category,
        url: `/cases/${c.id}`,
        score: maxScore,
      });
    }
  });
  
  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Get type-specific icon emoji
 */
export function getTypeIcon(type: SearchResult['type']): string {
  switch (type) {
    case 'question': return '❓';
    case 'evidence': return '📄';
    case 'guideline': return '📋';
    case 'case': return '🏥';
    default: return '📌';
  }
}

/**
 * Get type-specific color
 */
export function getTypeColor(type: SearchResult['type']): string {
  switch (type) {
    case 'question': return 'bg-blue-100 text-blue-700';
    case 'evidence': return 'bg-green-100 text-green-700';
    case 'guideline': return 'bg-purple-100 text-purple-700';
    case 'case': return 'bg-orange-100 text-orange-700';
    default: return 'bg-gray-100 text-gray-700';
  }
}
