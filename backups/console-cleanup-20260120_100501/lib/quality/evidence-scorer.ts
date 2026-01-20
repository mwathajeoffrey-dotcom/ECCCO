/**
 * Evidence Quality Scoring System
 * Automatically rates studies using GRADE-inspired methodology
 * Scores based on study design, sample size, journal quality, and methodology
 */

export interface QualityScore {
  overallScore: number; // 0-10 scale
  grade: 'High' | 'Moderate' | 'Low' | 'Very Low';
  confidence: 'High' | 'Moderate' | 'Low';
  studyDesign: {
    type: string;
    score: number;
    description: string;
  };
  sampleSize: {
    n: number | null;
    score: number;
    category: 'Large' | 'Medium' | 'Small' | 'Very Small' | 'Unknown';
  };
  journalQuality: {
    tier: 'Top' | 'High' | 'Moderate' | 'Standard';
    score: number;
  };
  methodologyFactors: {
    randomization: boolean;
    blinding: boolean;
    multiCenter: boolean;
    prospective: boolean;
    controlGroup: boolean;
  };
  riskOfBias: 'Low' | 'Moderate' | 'High' | 'Unclear';
  citationImpact: {
    count: number;
    score: number;
  };
}

// Top-tier medical journals
const TOP_TIER_JOURNALS = [
  'New England Journal of Medicine',
  'NEJM',
  'The Lancet',
  'Lancet',
  'JAMA',
  'Journal of the American Medical Association',
  'BMJ',
  'British Medical Journal'
];

const HIGH_TIER_JOURNALS = [
  'Annals of Emergency Medicine',
  'Emergency Medicine Journal',
  'Academic Emergency Medicine',
  'Circulation',
  'Journal of Emergency Medicine',
  'Resuscitation',
  'Critical Care Medicine',
  'Intensive Care Medicine',
  'Chest'
];

/**
 * Determine study design type and assign base score
 */
function analyzeStudyDesign(abstract: string): {
  type: string;
  score: number;
  description: string;
} {
  const text = abstract.toLowerCase();
  
  // Systematic Review / Meta-Analysis (Highest quality)
  if (text.includes('meta-analysis') || text.includes('systematic review')) {
    return {
      type: 'Meta-Analysis/Systematic Review',
      score: 4,
      description: 'Highest level of evidence'
    };
  }
  
  // Randomized Controlled Trial
  if (text.includes('randomized') || text.includes('randomised') || 
      text.includes('rct') || text.includes('randomized controlled trial')) {
    return {
      type: 'Randomized Controlled Trial',
      score: 3.5,
      description: 'High-quality experimental study'
    };
  }
  
  // Prospective Cohort
  if (text.includes('prospective') && text.includes('cohort')) {
    return {
      type: 'Prospective Cohort Study',
      score: 2.5,
      description: 'Good observational evidence'
    };
  }
  
  // Cohort Study
  if (text.includes('cohort')) {
    return {
      type: 'Cohort Study',
      score: 2,
      description: 'Moderate observational evidence'
    };
  }
  
  // Case-Control
  if (text.includes('case-control') || text.includes('case control')) {
    return {
      type: 'Case-Control Study',
      score: 1.5,
      description: 'Retrospective observational'
    };
  }
  
  // Case Series/Report
  if (text.includes('case series') || text.includes('case report')) {
    return {
      type: 'Case Series/Report',
      score: 0.5,
      description: 'Low-level evidence'
    };
  }
  
  // Default: Observational
  return {
    type: 'Observational/Other',
    score: 1,
    description: 'Standard study design'
  };
}

/**
 * Extract and score sample size
 */
function analyzeSampleSize(abstract: string): {
  n: number | null;
  score: number;
  category: 'Large' | 'Medium' | 'Small' | 'Very Small' | 'Unknown';
} {
  // Look for sample size patterns
  const patterns = [
    /n\s*=\s*(\d+,?\d*)/i,
    /n\s*(\d+,?\d*)/i,
    /(\d+,?\d*)\s*patients/i,
    /(\d+,?\d*)\s*participants/i,
    /(\d+,?\d*)\s*subjects/i
  ];
  
  for (const pattern of patterns) {
    const match = abstract.match(pattern);
    if (match) {
      const n = parseInt(match[1].replace(/,/g, ''));
      
      if (n >= 1000) {
        return { n, score: 2, category: 'Large' };
      } else if (n >= 300) {
        return { n, score: 1.5, category: 'Medium' };
      } else if (n >= 100) {
        return { n, score: 1, category: 'Small' };
      } else {
        return { n, score: 0.5, category: 'Very Small' };
      }
    }
  }
  
  return { n: null, score: 0, category: 'Unknown' };
}

/**
 * Score journal quality/impact
 */
function analyzeJournalQuality(journal: string): {
  tier: 'Top' | 'High' | 'Moderate' | 'Standard';
  score: number;
} {
  if (TOP_TIER_JOURNALS.some(j => journal.includes(j))) {
    return { tier: 'Top', score: 2 };
  }
  
  if (HIGH_TIER_JOURNALS.some(j => journal.includes(j))) {
    return { tier: 'High', score: 1.5 };
  }
  
  // Check for "Journal of..." which are usually reputable
  if (journal.startsWith('Journal of') || journal.includes('Journal')) {
    return { tier: 'Moderate', score: 1 };
  }
  
  return { tier: 'Standard', score: 0.5 };
}

/**
 * Analyze methodology quality factors
 */
function analyzeMethodology(abstract: string): {
  randomization: boolean;
  blinding: boolean;
  multiCenter: boolean;
  prospective: boolean;
  controlGroup: boolean;
} {
  const text = abstract.toLowerCase();
  
  return {
    randomization: text.includes('randomized') || text.includes('randomised'),
    blinding: text.includes('blind') || text.includes('masked'),
    multiCenter: text.includes('multicenter') || text.includes('multi-center') || text.includes('multicentre'),
    prospective: text.includes('prospective'),
    controlGroup: text.includes('control') || text.includes('placebo')
  };
}

/**
 * Calculate methodology bonus
 */
function calculateMethodologyBonus(factors: ReturnType<typeof analyzeMethodology>): number {
  let bonus = 0;
  if (factors.randomization) bonus += 0.5;
  if (factors.blinding) bonus += 0.5;
  if (factors.multiCenter) bonus += 0.3;
  if (factors.prospective) bonus += 0.2;
  if (factors.controlGroup) bonus += 0.3;
  return bonus;
}

/**
 * Score citation impact
 */
function analyzeCitationImpact(citationCount: number): {
  count: number;
  score: number;
} {
  if (citationCount >= 100) return { count: citationCount, score: 1 };
  if (citationCount >= 50) return { count: citationCount, score: 0.7 };
  if (citationCount >= 10) return { count: citationCount, score: 0.4 };
  return { count: citationCount, score: 0 };
}

/**
 * Determine risk of bias
 */
function assessRiskOfBias(
  studyDesign: string,
  methodology: ReturnType<typeof analyzeMethodology>
): 'Low' | 'Moderate' | 'High' | 'Unclear' {
  // Meta-analysis/RCT with good methodology = Low risk
  if ((studyDesign.includes('Meta-Analysis') || studyDesign.includes('RCT')) &&
      methodology.randomization && methodology.blinding) {
    return 'Low';
  }
  
  // RCT without blinding or prospective cohort = Moderate risk
  if (studyDesign.includes('RCT') || studyDesign.includes('Prospective')) {
    return 'Moderate';
  }
  
  // Case-control, retrospective = High risk
  if (studyDesign.includes('Case')) {
    return 'High';
  }
  
  return 'Unclear';
}

/**
 * Main function: Calculate overall quality score
 */
export function calculateQualityScore(article: {
  abstract?: string;
  title: string;
  journal: string;
  citationCount: number;
}): QualityScore {
  const abstract = article.abstract || article.title;
  
  // Component scores
  const studyDesign = analyzeStudyDesign(abstract);
  const sampleSize = analyzeSampleSize(abstract);
  const journalQuality = analyzeJournalQuality(article.journal);
  const methodology = analyzeMethodology(abstract);
  const methodologyBonus = calculateMethodologyBonus(methodology);
  const citationImpact = analyzeCitationImpact(article.citationCount);
  
  // Calculate total score (out of 10)
  const rawScore = 
    studyDesign.score +        // 0-4 points
    sampleSize.score +         // 0-2 points
    journalQuality.score +     // 0-2 points
    methodologyBonus +         // 0-1.8 points
    citationImpact.score;      // 0-1 point
  
  const overallScore = Math.min(10, Math.round(rawScore * 10) / 10);
  
  // Determine GRADE-style rating
  let grade: QualityScore['grade'];
  if (overallScore >= 7.5) grade = 'High';
  else if (overallScore >= 5.5) grade = 'Moderate';
  else if (overallScore >= 3.5) grade = 'Low';
  else grade = 'Very Low';
  
  // Confidence level
  let confidence: QualityScore['confidence'];
  if (sampleSize.n && sampleSize.n >= 500 && studyDesign.score >= 3) {
    confidence = 'High';
  } else if (sampleSize.n && sampleSize.n >= 100) {
    confidence = 'Moderate';
  } else {
    confidence = 'Low';
  }
  
  const riskOfBias = assessRiskOfBias(studyDesign.type, methodology);
  
  return {
    overallScore,
    grade,
    confidence,
    studyDesign,
    sampleSize,
    journalQuality,
    methodologyFactors: methodology,
    riskOfBias,
    citationImpact
  };
}

/**
 * Get color scheme for quality score
 */
export function getQualityColor(score: number): {
  bg: string;
  text: string;
  border: string;
} {
  if (score >= 7.5) {
    return {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300'
    };
  } else if (score >= 5.5) {
    return {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-300'
    };
  } else if (score >= 3.5) {
    return {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-300'
    };
  } else {
    return {
      bg: 'bg-orange-100',
      text: 'text-orange-800',
      border: 'border-orange-300'
    };
  }
}
