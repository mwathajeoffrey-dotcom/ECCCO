/**
 * Consensus Detection for Evidence Search
 * Analyzes multiple studies to determine if there's scientific consensus
 * Similar to Consensus AI
 */

export interface ConsensusAnalysis {
  consensusPercentage: number; // 0-100
  consensusLevel: 'Strong Consensus' | 'Moderate Consensus' | 'Mixed Evidence' | 'No Consensus';
  agreementCount: number;
  disagreementCount: number;
  uncertainCount: number;
  mainFindings: string[];
  conflictingFindings: string[];
  consensusStatement: string;
  confidenceLevel: 'High' | 'Moderate' | 'Low';
}

interface StudyConclusion {
  positive: boolean; // Does study support the conclusion?
  neutral: boolean;
  negative: boolean;
  quality: number;
}

/**
 * Analyze abstracts and titles to determine consensus
 */
export function detectConsensus(articles: Array<{
  title: string;
  abstract?: string;
  qualityScore?: { overallScore: number };
}>): ConsensusAnalysis {
  
  if (articles.length === 0) {
    return {
      consensusPercentage: 0,
      consensusLevel: 'No Consensus',
      agreementCount: 0,
      disagreementCount: 0,
      uncertainCount: 0,
      mainFindings: [],
      conflictingFindings: [],
      consensusStatement: 'Insufficient evidence to determine consensus.',
      confidenceLevel: 'Low'
    };
  }

  // Analyze each study's conclusion
  const conclusions: StudyConclusion[] = articles.map(article => {
    const text = `${article.title} ${article.abstract || ''}`.toLowerCase();
    const quality = article.qualityScore?.overallScore || 0;
    
    return analyzeConclusion(text, quality);
  });

  // Count agreements (weighted by quality)
  let totalWeight = 0;
  let positiveWeight = 0;
  let negativeWeight = 0;
  let neutralWeight = 0;

  conclusions.forEach((conclusion, idx) => {
    const weight = articles[idx].qualityScore?.overallScore || 5;
    totalWeight += weight;
    
    if (conclusion.positive) {
      positiveWeight += weight;
    } else if (conclusion.negative) {
      negativeWeight += weight;
    } else {
      neutralWeight += weight;
    }
  });

  // Calculate consensus percentage
  const maxWeight = Math.max(positiveWeight, negativeWeight, neutralWeight);
  const consensusPercentage = totalWeight > 0 
    ? Math.round((maxWeight / totalWeight) * 100)
    : 0;

  // Determine consensus level
  let consensusLevel: ConsensusAnalysis['consensusLevel'];
  if (consensusPercentage >= 80) {
    consensusLevel = 'Strong Consensus';
  } else if (consensusPercentage >= 60) {
    consensusLevel = 'Moderate Consensus';
  } else if (consensusPercentage >= 40) {
    consensusLevel = 'Mixed Evidence';
  } else {
    consensusLevel = 'No Consensus';
  }

  // Determine main position
  const mainPosition = 
    positiveWeight > negativeWeight && positiveWeight > neutralWeight ? 'positive' :
    negativeWeight > positiveWeight && negativeWeight > neutralWeight ? 'negative' :
    'uncertain';

  // Generate consensus statement
  const consensusStatement = generateConsensusStatement(
    articles.length,
    consensusPercentage,
    mainPosition,
    consensusLevel
  );

  // Determine confidence level
  const confidenceLevel = 
    articles.length >= 5 && consensusPercentage >= 70 ? 'High' :
    articles.length >= 3 && consensusPercentage >= 60 ? 'Moderate' :
    'Low';

  return {
    consensusPercentage,
    consensusLevel,
    agreementCount: conclusions.filter(c => c.positive).length,
    disagreementCount: conclusions.filter(c => c.negative).length,
    uncertainCount: conclusions.filter(c => c.neutral).length,
    mainFindings: extractMainFindings(articles, mainPosition),
    conflictingFindings: extractConflictingFindings(articles, mainPosition),
    consensusStatement,
    confidenceLevel
  };
}

/**
 * Analyze a study's conclusion from text
 */
function analyzeConclusion(text: string, quality: number): StudyConclusion {
  // Positive indicators
  const positiveKeywords = [
    'effective', 'beneficial', 'improved', 'reduces', 'significant improvement',
    'decreased mortality', 'better outcomes', 'recommended', 'superior',
    'positive effect', 'associated with improved', 'significantly better'
  ];

  // Negative indicators
  const negativeKeywords = [
    'ineffective', 'no benefit', 'no significant', 'not recommended',
    'increased risk', 'worse outcomes', 'harmful', 'contraindicated',
    'no difference', 'failed to show', 'no improvement', 'not superior'
  ];

  // Neutral/uncertain indicators
  const uncertainKeywords = [
    'unclear', 'uncertain', 'inconclusive', 'further research needed',
    'more studies required', 'limited evidence', 'preliminary',
    'requires validation', 'warrants investigation'
  ];

  const positiveCount = positiveKeywords.filter(kw => text.includes(kw)).length;
  const negativeCount = negativeKeywords.filter(kw => text.includes(kw)).length;
  const uncertainCount = uncertainKeywords.filter(kw => text.includes(kw)).length;

  return {
    positive: positiveCount > negativeCount && positiveCount > uncertainCount,
    negative: negativeCount > positiveCount && negativeCount > uncertainCount,
    neutral: uncertainCount > positiveCount && uncertainCount > negativeCount ||
             (positiveCount === negativeCount && positiveCount > 0),
    quality: quality
  };
}

/**
 * Generate consensus statement
 */
function generateConsensusStatement(
  studyCount: number,
  percentage: number,
  position: string,
  level: string
): string {
  if (level === 'Strong Consensus') {
    if (position === 'positive') {
      return `Strong consensus (${percentage}%) across ${studyCount} studies supports this intervention.`;
    } else if (position === 'negative') {
      return `Strong consensus (${percentage}%) across ${studyCount} studies does not support this intervention.`;
    } else {
      return `Strong consensus (${percentage}%) across ${studyCount} studies shows inconclusive results.`;
    }
  } else if (level === 'Moderate Consensus') {
    if (position === 'positive') {
      return `Moderate consensus (${percentage}%) across ${studyCount} studies suggests benefit.`;
    } else if (position === 'negative') {
      return `Moderate consensus (${percentage}%) across ${studyCount} studies suggests no benefit.`;
    } else {
      return `Moderate consensus (${percentage}%) across ${studyCount} studies shows mixed results.`;
    }
  } else if (level === 'Mixed Evidence') {
    return `Mixed evidence (${percentage}% agreement) across ${studyCount} studies. Further research needed.`;
  } else {
    return `No clear consensus across ${studyCount} studies. Evidence is conflicting.`;
  }
}

/**
 * Extract main findings
 */
function extractMainFindings(articles: Array<{title: string; abstract?: string}>, position: string): string[] {
  // For now, return titles of studies that match the consensus position
  // In a full implementation, this would use NLP to extract actual findings
  return articles.slice(0, 3).map(a => a.title);
}

/**
 * Extract conflicting findings
 */
function extractConflictingFindings(articles: Array<{title: string; abstract?: string}>, position: string): string[] {
  // For now, return titles of studies that contradict the consensus
  // In a full implementation, this would identify actual conflicting results
  return articles.slice(-2).map(a => a.title);
}

/**
 * Get color for consensus level
 */
export function getConsensusColor(level: string): string {
  switch (level) {
    case 'Strong Consensus':
      return 'text-green-700 bg-green-100 border-green-300';
    case 'Moderate Consensus':
      return 'text-blue-700 bg-blue-100 border-blue-300';
    case 'Mixed Evidence':
      return 'text-yellow-700 bg-yellow-100 border-yellow-300';
    case 'No Consensus':
      return 'text-gray-700 bg-gray-100 border-gray-300';
    default:
      return 'text-gray-700 bg-gray-100 border-gray-300';
  }
}
