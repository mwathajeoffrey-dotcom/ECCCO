/**
 * Content Extractor for Evidence Search
 * Extracts key findings, relevant paragraphs, and references from articles
 * Similar to OpenEvidence AI-powered search
 */

export interface ExtractedParagraph {
  text: string;
  context: string; // e.g., "Methods", "Results", "Conclusion"
  relevanceScore?: number;
}

export interface ExtractedContent {
  aiSummary: string; // OpenEvidence-style summary
  keyFindings: string[];
  relevantParagraphs: ExtractedParagraph[];
}

/**
 * Generate AI-style summary from abstract (OpenEvidence approach)
 * Creates a clear, direct answer to the search query
 */
export function generateAISummary(abstract: string, title: string, query: string): string {
  if (!abstract) {
    return `This study examines ${title.toLowerCase()}.`;
  }
  
  // Extract conclusion/final sentence which usually has the main finding
  const sentences = abstract
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 30);
  
  // Look for conclusion keywords
  const conclusionSentence = sentences.find(s => {
    const lower = s.toLowerCase();
    return (
      lower.includes('conclude') ||
      lower.includes('found that') ||
      lower.includes('demonstrate') ||
      lower.includes('suggest') ||
      lower.includes('show') ||
      lower.includes('indicate')
    );
  });
  
  if (conclusionSentence) {
    // Clean up and return
    const cleaned = conclusionSentence
      .replace(/^(in conclusion|we conclude|this study|our study|we found|we demonstrate),?\s*/i, '')
      .replace(/^(that|the)\s+/i, '')
      .trim();
    
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1) + '.';
  }
  
  // Fallback: use last 1-2 sentences
  const lastSentences = sentences.slice(-2).join('. ');
  return lastSentences + (lastSentences.endsWith('.') ? '' : '.');
}

/**
 * Extract key findings from abstract
 * Looks for conclusion, results, and key statements
 */
export function extractKeyFindings(abstract: string): string[] {
  if (!abstract) return [];
  
  const findings: string[] = [];
  
  // Split abstract into sentences
  const sentences = abstract
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20); // Filter out short fragments
  
  // Look for conclusion indicators
  const conclusionIndicators = [
    'conclude',
    'found that',
    'demonstrate',
    'show that',
    'indicate',
    'suggest',
    'result',
    'significant',
    'association',
    'reduction',
    'improvement',
    'increase',
    'decrease',
    'effective',
    'superior',
    'inferior',
  ];
  
  sentences.forEach(sentence => {
    const lowerSentence = sentence.toLowerCase();
    
    // Check if sentence contains key indicators
    const hasIndicator = conclusionIndicators.some(indicator => 
      lowerSentence.includes(indicator)
    );
    
    if (hasIndicator) {
      // Clean up sentence
      const cleaned = sentence
        .replace(/^(however|moreover|furthermore|additionally|therefore|thus),?\s*/i, '')
        .trim();
      
      if (cleaned.length > 30 && findings.length < 5) {
        findings.push(cleaned + '.');
      }
    }
  });
  
  // If no findings found, use last 2-3 sentences (usually conclusion)
  if (findings.length === 0 && sentences.length > 0) {
    const lastSentences = sentences.slice(-Math.min(3, sentences.length));
    findings.push(...lastSentences.map(s => s + '.'));
  }
  
  return findings.slice(0, 5); // Return max 5 findings
}

/**
 * Extract relevant paragraphs from abstract based on query
 */
export function extractRelevantParagraphs(
  abstract: string,
  query: string
): ExtractedParagraph[] {
  if (!abstract) return [];
  
  const paragraphs: ExtractedParagraph[] = [];
  
  // Detect sections in abstract (structured abstracts)
  const sectionPatterns = [
    { name: 'Background', regex: new RegExp('(?:^|\\n)(background|introduction):?\\s*(.*?)(?=\\n(?:methods|objective|results)|$)', 'i') },
    { name: 'Objective', regex: new RegExp('(?:^|\\n)(objective|aim|purpose):?\\s*(.*?)(?=\\n(?:methods|results)|$)', 'i') },
    { name: 'Methods', regex: new RegExp('(?:^|\\n)(methods|methodology|design):?\\s*(.*?)(?=\\n(?:results|findings)|$)', 'i') },
    { name: 'Results', regex: new RegExp('(?:^|\\n)(results|findings):?\\s*(.*?)(?=\\n(?:conclusion|discussion)|$)', 'i') },
    { name: 'Conclusion', regex: new RegExp('(?:^|\\n)(conclusion|conclusions):?\\s*(.*?)$', 'i') },
  ];
  
  sectionPatterns.forEach(({ name, regex }) => {
    const match = abstract.match(regex);
    if (match && match[2]) {
      const text = match[2].trim();
      if (text.length > 50) {
        const relevanceScore = calculateRelevance(text, query);
        paragraphs.push({
          text,
          context: name,
          relevanceScore,
        });
      }
    }
  });
  
  // If no structured sections, split by double newlines or long sentences
  if (paragraphs.length === 0) {
    const parts = abstract
      .split(/\n\n+/)
      .map(p => p.trim())
      .filter(p => p.length > 50);
    
    parts.forEach((text, idx) => {
      const relevanceScore = calculateRelevance(text, query);
      if (relevanceScore > 0.3) { // Only include relevant paragraphs
        paragraphs.push({
          text,
          context: idx === 0 ? 'Introduction' : idx === parts.length - 1 ? 'Conclusion' : 'Content',
          relevanceScore,
        });
      }
    });
  }
  
  // Sort by relevance and return top 5
  return paragraphs
    .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
    .slice(0, 5);
}

/**
 * Calculate relevance score between text and query
 * Returns 0-1 score based on term matching
 */
function calculateRelevance(text: string, query: string): number {
  const textLower = text.toLowerCase();
  const queryTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 3);
  
  if (queryTerms.length === 0) return 0.5;
  
  let matches = 0;
  queryTerms.forEach(term => {
    if (textLower.includes(term)) {
      matches++;
    }
  });
  
  return matches / queryTerms.length;
}

/**
 * Extract mock references from article
 * In a real implementation, this would parse the actual reference list
 * For now, we'll generate placeholder references
 */
export function extractReferences(article: {
  title: string;
  authors: string[];
  journal: string;
  citationCount: number;
}): Array<{ title: string; authors: string; url: string; doi?: string }> {
  // Return empty for now - would need full-text access for real references
  // This is a placeholder for the UI structure
  return [];
}

/**
 * Enhance article with extracted content
 */
export function enhanceArticleWithContent(
  article: {
    title: string;
    abstract?: string;
    authors: string[];
    journal: string;
    citationCount: number;
  },
  query: string
): {
  aiSummary: string;
  keyFindings: string[];
  relevantParagraphs: ExtractedParagraph[];
  references: Array<{ title: string; authors: string; url: string; doi?: string }>;
} {
  const abstract = article.abstract || '';
  
  return {
    aiSummary: generateAISummary(abstract, article.title, query),
    keyFindings: extractKeyFindings(abstract),
    relevantParagraphs: extractRelevantParagraphs(abstract, query),
    references: extractReferences(article),
  };
}
