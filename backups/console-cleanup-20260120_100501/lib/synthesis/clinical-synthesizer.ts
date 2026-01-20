/**
 * Clinical Evidence Synthesizer
 * 
 * Generates actionable clinical decision summaries from research evidence.
 * Instead of abstract overviews, provides specific recommendations that help
 * clinicians make treatment decisions.
 * 
 * Style: Clinical Practice Guidelines (GRADE approach)
 * - Bottom-line recommendation
 * - Strength of recommendation (Strong/Weak)
 * - Quality of evidence (High/Moderate/Low)
 * - Specific details (dosing, timing, patient selection)
 * - When to use and when to avoid
 */

// Use inline type definition to avoid import issues
interface Article {
  id: string;
  title: string;
  abstract?: string;
  qualityScore?: { overallScore: number };
}

export interface ClinicalSynthesis {
  // Main actionable recommendation
  bottomLine: string; // "Use early antibiotics within 1 hour for septic shock"
  
  // Evidence strength (GRADE-style)
  recommendationStrength: 'strong' | 'weak' | 'conditional' | 'insufficient';
  evidenceQuality: 'high' | 'moderate' | 'low' | 'very-low';
  
  // Clinical details
  keyDetails: {
    intervention?: string; // "Broad-spectrum antibiotics"
    timing?: string; // "Within 1 hour of recognition"
    dosing?: string; // "Piperacillin-tazobactam 4.5g IV"
    duration?: string; // "7-10 days"
    patientSelection?: string; // "Adults with septic shock"
  };
  
  // Practical guidance
  whenToUse: string[]; // ["Confirmed septic shock", "Suspected bacterial infection"]
  whenToAvoid: string[]; // ["Viral sepsis", "Known allergy"]
  
  // Evidence basis
  evidenceBasis: {
    totalStudies: number;
    rcts: number; // Randomized controlled trials
    metaAnalyses: number;
    cohortStudies: number;
    topStudy: string; // Title of most influential study
  };
  
  // Confidence and limitations
  confidence: number; // 0-100
  limitations: string[]; // ["Limited data in pediatrics", "Mostly European studies"]
  
  // Consensus integration
  consensus?: {
    level: 'strong' | 'moderate' | 'weak' | 'none';
    percentage: number;
  };
}

interface EvidencePoint {
  finding: string;
  studyType: string;
  quality: number;
  sampleSize?: number;
}

/**
 * Extract actionable clinical findings from an article
 */
function extractClinicalFindings(article: Article): EvidencePoint[] {
  const findings: EvidencePoint[] = [];
  const text = (article.abstract || '') + ' ' + (article.title || '');
  const lowerText = text.toLowerCase();
  
  // Determine study type
  let studyType = 'observational';
  if (lowerText.includes('randomized') || lowerText.includes('rct')) {
    studyType = 'RCT';
  } else if (lowerText.includes('meta-analysis') || lowerText.includes('systematic review')) {
    studyType = 'meta-analysis';
  } else if (lowerText.includes('cohort')) {
    studyType = 'cohort';
  }
  
  // Extract key findings (look for outcome statements)
  const patterns = {
    mortality: /mortality (reduced|decreased|improved|increased|no change) by (\d+)%/i,
    improvement: /(significant|marked) improvement in ([^.]+)/i,
    timing: /within (\d+) (hours?|minutes?|days?)/i,
    dosing: /(\d+\.?\d*)\s*(mg|g|mcg|units?)(?:\/kg)?/i,
    effectiveness: /(effective|superior|inferior) (?:to|for|in) ([^.]+)/i,
  };
  
  // Mortality findings
  const mortalityMatch = text.match(patterns.mortality);
  if (mortalityMatch) {
    findings.push({
      finding: `Mortality ${mortalityMatch[1]} by ${mortalityMatch[2]}%`,
      studyType,
      quality: article.qualityScore?.overallScore || 5,
    });
  }
  
  // Timing findings
  const timingMatch = text.match(patterns.timing);
  if (timingMatch) {
    findings.push({
      finding: `Optimal timing: within ${timingMatch[1]} ${timingMatch[2]}`,
      studyType,
      quality: article.qualityScore?.overallScore || 5,
    });
  }
  
  // Dosing findings
  const dosingMatch = text.match(patterns.dosing);
  if (dosingMatch) {
    findings.push({
      finding: `Dose: ${dosingMatch[1]}${dosingMatch[2]}`,
      studyType,
      quality: article.qualityScore?.overallScore || 5,
    });
  }
  
  // If no specific findings, extract general conclusion
  if (findings.length === 0) {
    // Look for conclusion in abstract
    const conclusionMatch = text.match(/conclusion[s]?:?\s*([^.]+\.)/i);
    if (conclusionMatch) {
      findings.push({
        finding: conclusionMatch[1].trim(),
        studyType,
        quality: article.qualityScore?.overallScore || 5,
      });
    }
  }
  
  return findings;
}

/**
 * Determine recommendation strength based on evidence
 */
function calculateRecommendationStrength(
  articles: Article[],
  evidenceQuality: 'high' | 'moderate' | 'low' | 'very-low',
  consensusPercentage: number
): 'strong' | 'weak' | 'conditional' | 'insufficient' {
  const rctCount = articles.filter(a => 
    (a.title + a.abstract).toLowerCase().includes('randomized')
  ).length;
  
  const metaAnalysisCount = articles.filter(a => 
    (a.title + a.abstract).toLowerCase().includes('meta-analysis')
  ).length;
  
  // Strong recommendation criteria:
  // - High quality evidence
  // - Strong consensus (>75%)
  // - Multiple RCTs or meta-analyses
  if (evidenceQuality === 'high' && consensusPercentage >= 75 && (rctCount >= 2 || metaAnalysisCount >= 1)) {
    return 'strong';
  }
  
  // Weak recommendation criteria:
  // - Moderate quality with good consensus
  // - Or high quality with weaker consensus
  if (
    (evidenceQuality === 'moderate' && consensusPercentage >= 60) ||
    (evidenceQuality === 'high' && consensusPercentage >= 50)
  ) {
    return 'weak';
  }
  
  // Conditional recommendation:
  // - Low quality but some consensus
  if (evidenceQuality === 'low' && consensusPercentage >= 50) {
    return 'conditional';
  }
  
  // Insufficient evidence
  return 'insufficient';
}

/**
 * Determine overall evidence quality (GRADE approach)
 */
function assessEvidenceQuality(articles: Article[]): 'high' | 'moderate' | 'low' | 'very-low' {
  if (articles.length === 0) return 'very-low';
  
  const avgQuality = articles.reduce((sum, a) => sum + (a.qualityScore?.overallScore || 0), 0) / articles.length;
  
  const hasRCTs = articles.some(a => 
    (a.title + a.abstract).toLowerCase().includes('randomized')
  );
  
  const hasMetaAnalysis = articles.some(a => 
    (a.title + a.abstract).toLowerCase().includes('meta-analysis')
  );
  
  // High quality: Meta-analyses or multiple high-quality RCTs
  if (hasMetaAnalysis && avgQuality >= 8.0) {
    return 'high';
  }
  
  // Moderate quality: RCTs with good quality
  if (hasRCTs && avgQuality >= 7.0) {
    return 'moderate';
  }
  
  // Low quality: Observational studies with decent quality
  if (avgQuality >= 6.0) {
    return 'low';
  }
  
  // Very low quality
  return 'very-low';
}

/**
 * Extract timing recommendations from studies
 */
function extractTiming(articles: Article[]): string | undefined {
  for (const article of articles) {
    const text = (article.abstract || '') + ' ' + (article.title || '');
    
    // Look for time-specific recommendations
    const patterns = [
      /within (\d+)\s*(hours?|minutes?|days?)/i,
      /first (\d+)\s*(hours?|minutes?|days?)/i,
      /early \(within (\d+)\s*(hours?|minutes?|days?)\)/i,
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return `Within ${match[1]} ${match[2]}`;
      }
    }
  }
  
  return undefined;
}

/**
 * Generate clinical bottom-line recommendation
 */
function generateBottomLine(
  articles: Article[],
  query: string,
  consensusPercentage: number,
  evidenceQuality: string
): string {
  // Analyze overall direction of evidence
  const positiveCount = articles.filter(a => {
    const text = (a.abstract + a.title).toLowerCase();
    return text.includes('effective') || 
           text.includes('improved') || 
           text.includes('reduced mortality') ||
           text.includes('superior');
  }).length;
  
  const negativeCount = articles.filter(a => {
    const text = (a.abstract + a.title).toLowerCase();
    return text.includes('not effective') || 
           text.includes('no significant') || 
           text.includes('failed to') ||
           text.includes('inferior');
  }).length;
  
  const isPositive = positiveCount > negativeCount;
  const strength = consensusPercentage >= 75 ? 'strongly' : consensusPercentage >= 60 ? 'generally' : 'may';
  
  // Extract intervention from query or top article
  let intervention = query;
  const topArticle = articles[0];
  if (topArticle) {
    // Try to extract intervention name
    const interventionMatch = (topArticle.title || '').match(/(\w+(?:\s+\w+){0,2})\s+(?:for|in|treatment)/i);
    if (interventionMatch) {
      intervention = interventionMatch[1];
    }
  }
  
  // Generate recommendation
  if (isPositive) {
    if (evidenceQuality === 'high') {
      return `${intervention} is ${strength} recommended based on high-quality evidence`;
    } else if (evidenceQuality === 'moderate') {
      return `${intervention} is ${strength} supported by moderate-quality evidence`;
    } else {
      return `${intervention} may be considered, though evidence quality is limited`;
    }
  } else {
    if (evidenceQuality === 'high') {
      return `${intervention} is not recommended based on current high-quality evidence`;
    } else {
      return `${intervention} shows limited benefit; evidence quality is ${evidenceQuality}`;
    }
  }
}

/**
 * Main synthesis function - generates clinical decision summary
 */
export function synthesizeClinicalEvidence(
  articles: Article[],
  query: string,
  consensusData?: { percentage: number; level: 'strong' | 'moderate' | 'weak' | 'none' }
): ClinicalSynthesis {
  // Filter to high-quality studies for synthesis
  const qualityArticles = articles
    .filter(a => (a.qualityScore?.overallScore || 0) >= 6.0)
    .sort((a, b) => (b.qualityScore?.overallScore || 0) - (a.qualityScore?.overallScore || 0))
    .slice(0, 10); // Top 10 for synthesis
  
  if (qualityArticles.length === 0) {
    return {
      bottomLine: 'Insufficient high-quality evidence to make a recommendation',
      recommendationStrength: 'insufficient',
      evidenceQuality: 'very-low',
      keyDetails: {},
      whenToUse: [],
      whenToAvoid: ['Insufficient evidence'],
      evidenceBasis: {
        totalStudies: articles.length,
        rcts: 0,
        metaAnalyses: 0,
        cohortStudies: 0,
        topStudy: articles[0]?.title || 'N/A',
      },
      confidence: 0,
      limitations: ['Very limited evidence available'],
    };
  }
  
  // Assess evidence quality
  const evidenceQuality = assessEvidenceQuality(qualityArticles);
  
  // Calculate consensus
  const consensusPercentage = consensusData?.percentage || 50;
  
  // Determine recommendation strength
  const recommendationStrength = calculateRecommendationStrength(
    qualityArticles,
    evidenceQuality,
    consensusPercentage
  );
  
  // Count study types
  const rcts = qualityArticles.filter(a => 
    (a.title + a.abstract).toLowerCase().includes('randomized')
  ).length;
  
  const metaAnalyses = qualityArticles.filter(a => 
    (a.title + a.abstract).toLowerCase().includes('meta-analysis')
  ).length;
  
  const cohortStudies = qualityArticles.filter(a => 
    (a.title + a.abstract).toLowerCase().includes('cohort')
  ).length;
  
  // Extract timing
  const timing = extractTiming(qualityArticles);
  
  // Generate bottom line
  const bottomLine = generateBottomLine(
    qualityArticles,
    query,
    consensusPercentage,
    evidenceQuality
  );
  
  // Extract limitations
  const limitations: string[] = [];
  if (qualityArticles.length < 5) {
    limitations.push('Limited number of high-quality studies');
  }
  if (rcts === 0) {
    limitations.push('No randomized controlled trials available');
  }
  if (consensusPercentage < 60) {
    limitations.push('Conflicting evidence across studies');
  }
  
  // Calculate confidence
  let confidence = 50;
  if (evidenceQuality === 'high') confidence += 25;
  if (evidenceQuality === 'moderate') confidence += 15;
  if (consensusPercentage >= 75) confidence += 20;
  if (consensusPercentage >= 60) confidence += 10;
  if (rcts >= 2) confidence += 10;
  if (metaAnalyses >= 1) confidence += 15;
  confidence = Math.min(100, confidence);
  
  return {
    bottomLine,
    recommendationStrength,
    evidenceQuality,
    keyDetails: {
      timing,
      patientSelection: 'Based on inclusion criteria from top studies',
    },
    whenToUse: [
      'Patient meets criteria from studies',
      'Benefits likely outweigh risks',
    ],
    whenToAvoid: [
      'Patient contraindications present',
      'Alternative treatments preferred',
    ],
    evidenceBasis: {
      totalStudies: qualityArticles.length,
      rcts,
      metaAnalyses,
      cohortStudies,
      topStudy: qualityArticles[0]?.title || 'N/A',
    },
    confidence,
    limitations,
    consensus: consensusData ? {
      level: consensusData.level,
      percentage: consensusData.percentage,
    } : undefined,
  };
}
