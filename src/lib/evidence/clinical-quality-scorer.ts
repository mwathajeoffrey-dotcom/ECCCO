/**
 * Clinical Quality Scorer for Evidence
 * Prioritizes safety and accuracy for clinical decision-making
 */

import { getJournalTier, isTopTierJournal } from "./journal-database";

export interface QualityMetrics {
  journalScore: number; // 0-40 points
  citationScore: number; // 0-25 points
  recencyScore: number; // 0-20 points
  studyTypeScore: number; // 0-15 points
  totalScore: number; // 0-100 points
  grade: "A+" | "A" | "B+" | "B" | "C" | "D";
  tier: 1 | 2 | 3 | 4;
  isHighQuality: boolean;
  isClinicalGrade: boolean; // Safe for clinical decisions
}

export interface ArticleForScoring {
  journal: string;
  citationCount?: number;
  published?: string;
  title?: string;
  type?: string;
  abstract?: string;
}

/**
 * Calculate comprehensive quality score for evidence
 * Based on journal quality, citations, recency, and study design
 */
export function calculateClinicalQuality(article: ArticleForScoring): QualityMetrics {
  const journalScore = calculateJournalScore(article.journal);
  const citationScore = calculateCitationScore(article.citationCount || 0);
  const recencyScore = calculateRecencyScore(article.published);
  const studyTypeScore = calculateStudyTypeScore(article);

  const totalScore = journalScore + citationScore + recencyScore + studyTypeScore;
  const tier = getJournalTier(article.journal);

  return {
    journalScore,
    citationScore,
    recencyScore,
    studyTypeScore,
    totalScore,
    grade: getQualityGrade(totalScore),
    tier,
    isHighQuality: totalScore >= 70,
    isClinicalGrade: totalScore >= 75 && tier <= 2, // Strict for clinical use
  };
}

/**
 * Calculate journal quality score (0-40 points)
 * Highest weight - journal reputation matters most
 */
function calculateJournalScore(journalName: string): number {
  const tier = getJournalTier(journalName);

  switch (tier) {
    case 1:
      return 40; // NEJM, Lancet, JAMA, BMJ, top specialty
    case 2:
      return 30; // High-quality specialty journals
    case 3:
      return 20; // Reputable journals
    case 4:
      return 10; // Unknown/lower tier
  }
}

/**
 * Calculate citation score (0-25 points)
 * Indicates community validation and impact
 */
function calculateCitationScore(citationCount: number): number {
  if (citationCount >= 1000) return 25;
  if (citationCount >= 500) return 22;
  if (citationCount >= 200) return 19;
  if (citationCount >= 100) return 16;
  if (citationCount >= 50) return 13;
  if (citationCount >= 20) return 10;
  if (citationCount >= 10) return 7;
  if (citationCount >= 5) return 4;
  return 1;
}

/**
 * Calculate recency score (0-20 points)
 * Recent evidence more relevant for current practice
 */
function calculateRecencyScore(published?: string): number {
  if (!published) return 5;

  const year = parseInt(published.split("-")[0] || "2000");
  const age = new Date().getFullYear() - year;

  if (age <= 1) return 20; // Within 1 year
  if (age <= 2) return 18; // Within 2 years
  if (age <= 3) return 16; // Within 3 years
  if (age <= 5) return 13; // Within 5 years
  if (age <= 7) return 10; // Within 7 years
  if (age <= 10) return 7; // Within 10 years
  if (age <= 15) return 4; // Within 15 years
  return 1; // Older than 15 years
}

/**
 * Calculate study type score (0-15 points)
 * Evidence hierarchy: Meta-analysis > RCT > Cohort > Case series
 */
function calculateStudyTypeScore(article: ArticleForScoring): number {
  const title = (article.title || "").toLowerCase();
  const type = (article.type || "").toLowerCase();
  const abstract = (article.abstract || "").toLowerCase();

  const text = `${title} ${type} ${abstract}`;

  // Systematic reviews and meta-analyses (highest quality)
  if (text.includes("meta-analysis") || text.includes("meta analysis") || text.includes("systematic review")) {
    if (text.includes("randomized") || text.includes("rct")) {
      return 15; // Meta-analysis of RCTs
    }
    return 13; // Other systematic reviews
  }

  // Randomized controlled trials
  if (
    text.includes("randomized controlled trial") ||
    text.includes("randomized trial") ||
    text.includes("rct") ||
    (text.includes("randomized") && text.includes("placebo"))
  ) {
    if (text.includes("multicenter") || text.includes("multi-center")) {
      return 13; // Multicenter RCT
    }
    return 11; // Single-center RCT
  }

  // Cohort studies
  if (text.includes("cohort study") || text.includes("prospective") || text.includes("cohort analysis")) {
    return 9;
  }

  // Case-control studies
  if (text.includes("case-control") || text.includes("case control")) {
    return 7;
  }

  // Guidelines and consensus statements
  if (text.includes("guideline") || text.includes("consensus statement") || text.includes("clinical practice")) {
    return 10;
  }

  // Review articles (not systematic)
  if (text.includes("review") && !text.includes("systematic")) {
    return 6;
  }

  // Case series and case reports
  if (text.includes("case series") || text.includes("case report") || text.includes("case study")) {
    return 4;
  }

  // Observational or cross-sectional
  if (text.includes("observational") || text.includes("cross-sectional") || text.includes("survey")) {
    return 5;
  }

  // Unknown/other
  return 3;
}

/**
 * Convert numeric score to letter grade
 */
function getQualityGrade(score: number): "A+" | "A" | "B+" | "B" | "C" | "D" {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B+";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  return "D";
}

/**
 * Infer evidence level (for citations)
 */
export function inferEvidenceLevel(article: ArticleForScoring): string {
  const title = (article.title || "").toLowerCase();
  const type = (article.type || "").toLowerCase();
  const text = `${title} ${type}`;

  if (text.includes("meta-analysis") && text.includes("randomized")) {
    return "IA"; // Systematic review of RCTs
  }

  if (text.includes("randomized controlled trial") || text.includes("rct")) {
    return "IB"; // Individual RCT
  }

  if (text.includes("systematic review") || text.includes("meta-analysis")) {
    return "IIA"; // Systematic review of non-randomized studies
  }

  if (text.includes("cohort") || text.includes("prospective")) {
    return "IIB"; // Cohort study
  }

  if (text.includes("case-control")) {
    return "IIB"; // Case-control study
  }

  if (text.includes("case series") || text.includes("case report")) {
    return "III"; // Case series/report
  }

  return "III"; // Default to lowest level
}

/**
 * Filter articles for clinical decision support
 * Strict criteria: Only high-quality, recent evidence from top journals
 */
export function filterForClinicalUse(
  articles: ArticleForScoring[],
  options?: {
    minScore?: number;
    maxTier?: 1 | 2 | 3;
    maxAge?: number;
    requireAbstract?: boolean;
  }
): ArticleForScoring[] {
  const {
    minScore = 50, // More lenient - accept good quality
    maxTier = 3, // Accept tier 3 journals too
    maxAge = 15, // Last 15 years (more articles)
    requireAbstract = false, // Don't require abstract
  } = options || {};

  return articles.filter((article) => {
    const quality = calculateClinicalQuality(article);

    // Quality threshold
    if (quality.totalScore < minScore) return false;

    // Journal tier
    if (quality.tier > maxTier) return false;

    // Recency
    if (article.published) {
      const year = parseInt(article.published.split("-")[0] || "2000");
      const age = new Date().getFullYear() - year;
      if (age > maxAge) return false;
    }

    // Abstract requirement
    if (requireAbstract && !article.abstract) return false;

    return true;
  });
}

/**
 * Sort articles by clinical quality
 */
export function sortByClinicalQuality(articles: ArticleForScoring[]): ArticleForScoring[] {
  return [...articles].sort((a, b) => {
    const scoreA = calculateClinicalQuality(a);
    const scoreB = calculateClinicalQuality(b);

    // Primary: Total score
    if (scoreA.totalScore !== scoreB.totalScore) {
      return scoreB.totalScore - scoreA.totalScore;
    }

    // Secondary: Journal tier (lower tier number = better)
    if (scoreA.tier !== scoreB.tier) {
      return scoreA.tier - scoreB.tier;
    }

    // Tertiary: Citation count
    return (b.citationCount || 0) - (a.citationCount || 0);
  });
}

/**
 * Get color for UI display based on quality
 */
export function getQualityColor(score: number): string {
  if (score >= 90) return "green"; // Excellent
  if (score >= 80) return "blue"; // Very good
  if (score >= 70) return "indigo"; // Good
  if (score >= 60) return "purple"; // Fair
  if (score >= 50) return "orange"; // Moderate
  return "red"; // Low quality
}
