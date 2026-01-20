import { logger } from '@/lib/logger';
/**
 * Clinical Evidence Synthesis Engine
 * Generates OpenEvidence-style multi-paragraph summaries with inline citations
 *
 * Uses Meditron (medical AI) to synthesize evidence from top journals
 * into actionable clinical guidance with proper citations.
 *
 * Enhanced with full-text analysis from Europe PMC for detailed dosing protocols
 */

import { callMeditron, isMeditronAvailable } from "../ai/meditron-client";
import { callGroq, isGroqAvailable } from "../ai/groq-client";
import { calculateClinicalQuality, filterForClinicalUse, inferEvidenceLevel } from "./clinical-quality-scorer";
import { getJournalBadge, getJournalColor, getJournalTier } from "./journal-database";
import { fetchFullText } from "../europepmc";

export interface ClinicalSynthesis {
  query: string;
  sections: ClinicalSection[];
  references: Reference[];
  metadata: SynthesisMetadata;
}

export interface ClinicalSection {
  heading: string;
  paragraphs: ClinicalParagraph[];
}

export interface ClinicalParagraph {
  text: string;
  citations: InlineCitation[];
}

export interface InlineCitation {
  position: number;
  journalBadge: string;
  count: number;
  referenceIds: string[];
  color: "blue" | "red" | "green" | "purple" | "indigo" | "orange";
}

export interface Reference {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  pmid?: string;
  url: string;
  qualityScore: number;
  evidenceLevel: string;
  citationCount?: number; // For "Highly Cited" badge
}

export interface SynthesisMetadata {
  confidenceScore: number;
  articlesAnalyzed: number;
  tier1Count: number;
  tier2Count: number;
  avgQualityScore: number;
  lastUpdated: string;
  usedAI: boolean;
  isResearchSummary?: boolean; // Flag for lower-quality research summaries
  warning?: string; // Quality warning message
}

export interface ArticleInput {
  id?: string;
  title: string;
  authors: string[];
  journal: string;
  published?: string;
  abstract?: string;
  doi?: string;
  pmid?: string;
  url: string;
  citationCount?: number;
  type?: string;
}

/**
 * Generate clinical evidence synthesis
 * Main entry point for creating OpenEvidence-style summaries
 */
export async function generateClinicalSynthesis(
  query: string,
  articles: ArticleInput[],
  options?: {
    minQualityScore?: number;
    useAI?: boolean;
    maxArticles?: number;
  }
): Promise<ClinicalSynthesis> {
  const { minQualityScore = 75, useAI = true, maxArticles = 15 } = options || {};

  // PATIENT SAFETY: Strict minimum requirements for clinical recommendations
  const MINIMUM_ARTICLES_FOR_CLINICAL_USE = 3; // At least 3 quality articles
  const MINIMUM_QUALITY_SCORE = 50; // At least "Good" quality
  const MAXIMUM_TIER = 2; // Only Tier 1-2 journals (JAMA, NEJM, Lancet, specialty journals)
  const MAXIMUM_AGE_YEARS = 10; // Last 10 years for current evidence

  // Step 1: Filter for clinical-grade evidence with STRICT safety thresholds
  const clinicalArticles = filterForClinicalUse(articles as any, {
    minScore: Math.max(minQualityScore, MINIMUM_QUALITY_SCORE), // Never go below 50
    maxTier: MAXIMUM_TIER, // Only Tier 1-2
    maxAge: MAXIMUM_AGE_YEARS,
    requireAbstract: true, // MUST have abstract for verification
  });

  // PATIENT SAFETY CHECK: Ensure minimum article count
  if (clinicalArticles.length < MINIMUM_ARTICLES_FOR_CLINICAL_USE) {
    // DO NOT show single-article recommendations - patient safety risk!
    throw new Error(
      `Insufficient high-quality evidence for safe clinical recommendations. ` +
        `Found ${clinicalArticles.length} high-quality article(s), but need at least ${MINIMUM_ARTICLES_FOR_CLINICAL_USE} from top-tier journals. ` +
        `This ensures recommendations are based on reliable, peer-reviewed evidence rather than single studies. ` +
        `Try a broader search term or consult specialized medical databases.`
    );
  }

  logger.debug(
    `✅ SAFETY CHECK PASSED: ${clinicalArticles.length} high-quality articles (minimum: ${MINIMUM_ARTICLES_FOR_CLINICAL_USE})`
  );

  // Step 2: Sort by evidence type priority, then quality
  const qualityScored = clinicalArticles.map((a) => ({
    ...a,
    _quality: calculateClinicalQuality(a as any),
    _evidenceType: getEvidenceTypePriority(a),
  }));

  const sortedArticles = qualityScored
    .sort((a, b) => {
      // First: Evidence type (meta-analysis/guideline > RCT > other)
      if (a._evidenceType !== b._evidenceType) {
        return b._evidenceType - a._evidenceType; // Higher = better
      }
      // Second: Journal tier
      if (a._quality.tier !== b._quality.tier) {
        return a._quality.tier - b._quality.tier; // Lower tier number = better
      }
      // Third: Quality score
      return b._quality.totalScore - a._quality.totalScore;
    })
    .slice(0, Math.min(maxArticles, 8)); // Limit to 8 max (OpenEvidence style)

  // Step 3: Prepare references (show only top 4-6 like OpenEvidence)
  const topReferences = sortedArticles.slice(0, 6); // Max 6 references
  const references: Reference[] = topReferences.map((article, i) => ({
    id: `ref-${i + 1}`,
    title: (article as any).title || "Untitled",
    authors: (article as any).authors?.slice(0, 5) || [],
    journal: article.journal,
    year: parseInt((article as any).published?.split("-")[0] || new Date().getFullYear().toString()),
    doi: (article as any).doi,
    pmid: (article as any).pmid,
    url: (article as any).url || "",
    qualityScore: article._quality.totalScore,
    evidenceLevel: inferEvidenceLevel(article as any),
    citationCount: (article as any).citationCount || 0,
  }));

  // Step 4: Check if AI is available and requested
  let usedAI = false;
  let sections: ClinicalSection[] = [];

  if (useAI) {
    try {
      // Try Groq first (faster, free), then Meditron as fallback
      const groqAvailable = isGroqAvailable();
      const meditronAvailable = await isMeditronAvailable();

      logger.debug(`[Evidence Synthesis] 🔍 AI Check:`);
      logger.debug(`  - Groq Available: ${groqAvailable}`);
      logger.debug(`  - GROQ_API_KEY exists: ${!!process.env.GROQ_API_KEY}`);
      logger.debug(`  - GROQ_API_KEY length: ${process.env.GROQ_API_KEY?.length || 0}`);
      logger.debug(`  - Meditron Available: ${meditronAvailable}`);

      if (groqAvailable) {
        logger.debug("[Evidence Synthesis] ✅ Using Groq AI for synthesis");
        sections = await generateGroqSynthesis(query, sortedArticles as any, references);
        usedAI = true;
      } else if (meditronAvailable) {
        logger.debug("[Evidence Synthesis] Using Meditron AI for synthesis");
        sections = await generateAISynthesis(query, sortedArticles as any, references);
        usedAI = true;
      } else {
        logger.warn(
          "[Evidence Synthesis] ⚠️ No AI available (tried Groq, Meditron), falling back to structured summary"
        );
        logger.warn("Get free Groq API key at: https://console.groq.com");
        logger.warn("Add to .env.local: GROQ_API_KEY=your_key_here");
        sections = await generateStructuredSummary(query, sortedArticles as any, references);
      }
    } catch (error: any) {
      logger.error("[Evidence Synthesis] ❌ AI synthesis failed:", error?.message || error);
      logger.error("Falling back to structured summary");
      sections = await generateStructuredSummary(query, sortedArticles as any, references);
    }
  } else {
    sections = await generateStructuredSummary(query, sortedArticles as any, references);
  }

  // Step 5: Calculate metadata
  const metadata: SynthesisMetadata = {
    confidenceScore: calculateConfidenceScore(sortedArticles.map((a) => a._quality)),
    articlesAnalyzed: sortedArticles.length,
    tier1Count: sortedArticles.filter((a) => a._quality.tier === 1).length,
    tier2Count: sortedArticles.filter((a) => a._quality.tier === 2).length,
    avgQualityScore: Math.round(
      sortedArticles.reduce((sum, a) => sum + a._quality.totalScore, 0) / sortedArticles.length
    ),
    lastUpdated: new Date().toISOString(),
    usedAI,
  };

  return {
    query,
    sections,
    references,
    metadata,
  };
}

/**
 * Generate AI-powered synthesis using Groq (fast, free)
 */
async function generateGroqSynthesis(
  query: string,
  articles: any[],
  references: Reference[]
): Promise<ClinicalSection[]> {
  // Prepare evidence context for AI with full-text data
  const evidenceContextPromises = articles
    .slice(0, 6) // Use top 6 articles (guidelines + meta-analyses + key RCTs)
    .map(async (article, i) => {
      const refId = references[i]?.id;
      if (!refId) return null; // Skip if no reference

      // Determine evidence type
      const title = (article.title || "").toLowerCase();
      const abstract = (article.abstract || "").toLowerCase();
      const text = title + " " + abstract;

      let evidenceType = "Study";
      if (text.includes("guideline")) evidenceType = "🏛️ CLINICAL GUIDELINE";
      else if (text.includes("meta-analysis")) evidenceType = "📊 META-ANALYSIS";
      else if (text.includes("systematic review")) evidenceType = "📚 SYSTEMATIC REVIEW";
      else if (text.includes("randomized controlled")) evidenceType = "🔬 RCT";

      // Try to get full-text if available
      let contentToAnalyze = article.abstract || "Not available";

      if (article.pmcid) {
        logger.debug(`[Groq Synthesis] Fetching full text for PMC${article.pmcid}...`);
        const fullText = await fetchFullText(article.pmcid);

        if (fullText?.results) {
          // Use Results section (best for dosing, outcomes, protocols)
          contentToAnalyze = fullText.results.slice(0, 1500); // More text for guidelines/meta-analyses
          logger.debug(`[Groq Synthesis] Using RESULTS section for PMC${article.pmcid}`);
        } else if (fullText?.discussion) {
          contentToAnalyze = fullText.discussion.slice(0, 1500);
          logger.debug(`[Groq Synthesis] Using DISCUSSION section for PMC${article.pmcid}`);
        } else if (fullText?.methods) {
          contentToAnalyze = fullText.methods.slice(0, 1200);
          logger.debug(`[Groq Synthesis] Using METHODS section for PMC${article.pmcid}`);
        }
      }

      return `
[Reference ${i + 1}] {${refId}} ${evidenceType}
Title: ${article.title}
Journal: ${article.journal} (${references[i].year})
Evidence Level: ${references[i].evidenceLevel}
Quality Score: ${references[i].qualityScore}/100
Citations: ${article.citationCount || "N/A"}

Key Evidence:
${contentToAnalyze}
`;
    });

  const evidenceItems = await Promise.all(evidenceContextPromises);
  const evidenceContext = evidenceItems.filter((item) => item !== null).join("\n" + "=".repeat(80) + "\n");

  // Create medical-grade prompt with OpenEvidence citation style
  const systemPrompt = `You are a senior emergency medicine physician writing clinical treatment protocols for other physicians.

YOUR MISSION: Write ACTIONABLE clinical protocols, NOT research summaries. Physicians need to know WHAT TO DO, not what studies found.

❌ NEVER WRITE LIKE THIS (research summary style):
"Of the 145 pre-existing PLIs of category 2, 89 (61.4%) healed..."
"Most participants were diabetic (n=549, 80%) and had a single SWHSI..."
"Further research is needed to elucidate these findings..."

✅ ALWAYS WRITE LIKE THIS (clinical protocol style):
"For patients with acute coronary syndrome (ACS), administer aspirin 162-325 mg orally immediately, followed by 81-100 mg daily. Additionally, give clopidogrel 600 mg loading dose followed by 75 mg daily, or ticagrelor 180 mg loading dose followed by 90 mg twice daily."

"In diabetic foot ulcers, use custom therapeutic footwear for high-risk patients with significant neuropathy, foot deformities, or previous amputation. Risk stratification based on three major factors: Wound severity, Ischemia, and foot Infection (WIfI classification)."

CRITICAL REQUIREMENTS:
1. START WITH ACTION VERBS: "Administer", "Give", "Initiate", "Monitor", "Avoid"
2. INCLUDE SPECIFIC DOSAGES: "aspirin 162-325 mg" not "aspirin therapy"
3. STATE TIMING: "within 90 minutes", "q6h", "for 7-10 days"
4. NAME SPECIFIC DRUGS/PROCEDURES: "norepinephrine 0.05 mcg/kg/min", "PCI", "ceftriaxone 1g IV"
5. PROVIDE CLINICAL CONTEXT: "For patients with STEMI", "In septic shock"
6. GROUP CITATIONS AT END: Write full paragraph, then {ref-1} {ref-2} at the very end

EVIDENCE HIERARCHY (prioritize in this order):
1. 🏛️ CLINICAL GUIDELINES - Extract exact recommendations
2. 📊 META-ANALYSES - Use for treatment efficacy data
3. 🔬 MAJOR RCTs - Extract specific protocols used
4. 📚 SYSTEMATIC REVIEWS - For comprehensive approaches

CITATION STYLE (OpenEvidence Format):
- Write complete paragraphs (4-6 sentences each)
- NO citations within the text
- Place ALL citations at END: {ref-1} {ref-3} {ref-5}

FORMAT:
- Use ## for section headings
- Write 2-4 actionable paragraphs per section
- Each paragraph must include SPECIFIC clinical actions
- Citations {ref-N} ONLY at end of paragraphs

REMEMBER: You are writing a TREATMENT PROTOCOL, not a literature review!`;

  const userPrompt = `Clinical Question: ${query}

High-Quality Evidence (Guidelines, Meta-Analyses, Major RCTs):
${evidenceContext}

TASK: Write clinical treatment protocols that tell physicians EXACTLY what to do.

SECTION HEADINGS - Make them SPECIFIC to the query topic:
✅ GOOD (query-specific):
- "Berlin Criteria for ARDS Diagnosis" (not "Diagnostic Criteria")
- "Septic Shock Initial Resuscitation" (not "Initial Management")
- "STEMI Antiplatelet Therapy" (not "Drug Therapy")
- "CAP Risk Stratification" (not "Assessment")

❌ BAD (generic):
- "Summary" / "Overview" / "Background"
- "Treatment" / "Management" / "Therapy"
- "Diagnosis" / "Assessment" / "Evaluation"

GENERATE 3-4 SECTIONS WITH HEADINGS LIKE:
- "## [Specific Topic] Diagnostic Criteria" (for diagnostic queries)
- "## [Specific Topic] Initial Management Protocol" (for treatment queries)
- "## [Drug/Intervention] Dosing and Administration" (for therapy queries)
- "## [Condition] Risk Stratification" (for prognosis queries)
- "## Performance and Limitations" (for validation/accuracy queries)

REQUIREMENTS:
- Each section heading MUST include the specific topic from the query
- Each paragraph must start with action verbs (Administer, Give, Monitor, etc.)
- Include specific drug names, dosages, routes, and timing
- State WHO gets the treatment ("For patients with STEMI...", "In septic shock...")
- End each paragraph with citations {ref-1} {ref-2}

DO NOT write research summaries or study descriptions. Write treatment protocols!`;

  try {
    // Call Groq with medical-optimized Llama 3.3 70B
    const aiResponse = await callGroq(systemPrompt, userPrompt, {
      temperature: 0.05, // Very low for protocol accuracy
      maxTokens: 3500, // More tokens for detailed protocols
      model: "llama-3.3-70b-versatile",
    });

    logger.debug(`[Groq] Synthesis generated: ${aiResponse.length} characters`);

    // Parse AI response into structured sections
    return parseSynthesisResponse(aiResponse, references);
  } catch (error) {
    logger.error("[Groq] Synthesis failed:", error);
    throw error;
  }
}

/**
 * Generate AI-powered synthesis using Meditron
 */
async function generateAISynthesis(
  query: string,
  articles: any[],
  references: Reference[]
): Promise<ClinicalSection[]> {
  // Prepare evidence context for AI
  const evidenceContext = articles
    .map((article, i) => {
      const refId = references[i].id;
      return `
[Reference ${i + 1}] {${refId}}
Title: ${article.title}
Journal: ${article.journal} (${references[i].year})
Evidence Level: ${references[i].evidenceLevel}
Citations: ${article.citationCount || 0}
Quality Score: ${references[i].qualityScore}/100

Abstract:
${article.abstract || "Not available"}
`;
    })
    .join("\n" + "=".repeat(80) + "\n");

  // Create medical-grade prompt
  const systemPrompt = `You are a senior emergency medicine physician synthesizing clinical evidence for other physicians.

CRITICAL RULES:
1. ACCURACY IS PARAMOUNT - Only state facts from the provided evidence
2. CITE EVERY CLINICAL CLAIM - Use {ref-N} format immediately after each claim
3. WRITE MULTIPLE PARAGRAPHS - 3-5 sentences per paragraph, 2-4 paragraphs per section
4. ORGANIZE BY CLINICAL RELEVANCE - Group by severity, population, or treatment approach
5. INCLUDE SAFETY - Contraindications, monitoring, adverse effects
6. NOTE VARIATIONS - Geographic resistance, resource settings, special populations
7. ACKNOWLEDGE UNCERTAINTY - If evidence conflicts, state it clearly
8. USE CLINICAL LANGUAGE - Write for physicians, be specific with dosing/timing

FORMAT YOUR RESPONSE:
Use clear section headings with ## markers.
Write multiple paragraphs per section (2-4 paragraphs).
Insert {ref-N} citations inline where claims are made.
Multiple citations can be grouped: {ref-1} {ref-3} {ref-5}

EXAMPLE FORMAT:

## First-Line Treatment

Artemisinin-based combination therapy (ACT) is the recommended first-line treatment for uncomplicated malaria caused by P. falciparum {ref-1} {ref-3}. Artemether-lumefantrine is the most widely used ACT, with dosing adjusted for age and weight {ref-1}. Administration with fatty food or milk is recommended to optimize absorption and improve bioavailability {ref-2}.

Alternative ACT regimens include artesunate-mefloquine, dihydroartemisinin-piperaquine, and artesunate-amodiaquine {ref-4}. Selection depends on local resistance patterns and patient factors {ref-3}. In regions with artemisinin resistance, extended 6-day ACT courses may be required {ref-5}.

## Special Populations

Treatment considerations differ for pregnant women and young children {ref-2} {ref-6}...`;

  const userPrompt = `Clinical Question: ${query}

High-Quality Evidence (${articles.length} sources from top medical journals):
${evidenceContext}

Synthesize this evidence into a comprehensive clinical answer. Use multiple sections with descriptive headings. Write 2-4 paragraphs per section. Cite sources inline using {ref-N} format.`;

  // Call Meditron
  const aiResponse = await callMeditron(`${systemPrompt}\n\n${userPrompt}`, { temperature: 0.2, maxTokens: 2500 });

  // Parse AI response into structured sections
  return parseSynthesisResponse(aiResponse, references);
}

/**
 * Parse AI response into structured sections with citations
 */
function parseSynthesisResponse(aiResponse: string, references: Reference[]): ClinicalSection[] {
  const sections: ClinicalSection[] = [];

  // Split by section headers (##)
  const sectionRegex = /##\s+(.+?)(?=\n|$)/g;
  const sectionMatches = [...aiResponse.matchAll(sectionRegex)];

  if (sectionMatches.length === 0) {
    // No sections found, treat entire text as one section
    return [
      {
        heading: "Clinical Synthesis",
        paragraphs: parseParagraphs(aiResponse, references),
      },
    ];
  }

  sectionMatches.forEach((match, idx) => {
    const heading = match[1].trim();
    const startPos = match.index! + match[0].length;
    const endPos = idx < sectionMatches.length - 1 ? sectionMatches[idx + 1].index! : aiResponse.length;

    const sectionText = aiResponse.slice(startPos, endPos).trim();
    const paragraphs = parseParagraphs(sectionText, references);

    if (paragraphs.length > 0) {
      sections.push({ heading, paragraphs });
    }
  });

  return sections;
}

/**
 * Parse paragraphs and extract inline citations
 */
function parseParagraphs(text: string, references: Reference[]): ClinicalParagraph[] {
  // Split by double newlines
  const paragraphTexts = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 20); // Skip very short paragraphs

  return paragraphTexts.map((paraText) => {
    const citations: InlineCitation[] = [];

    // Find all {ref-N} patterns
    const citationRegex = /\{ref-(\d+)\}/g;
    let match;

    while ((match = citationRegex.exec(paraText)) !== null) {
      const refNum = parseInt(match[1]);
      const ref = references[refNum - 1];

      // Only add citation if reference exists and has required properties
      if (ref && ref.id && ref.journal) {
        citations.push({
          position: match.index,
          journalBadge: getJournalBadge(ref.journal),
          count: 1,
          referenceIds: [ref.id],
          color: getJournalColor(ref.journal),
        });
      } else {
        logger.warn(
          `[Parse Citations] Reference ${refNum} not found or missing data. Total refs: ${references.length}`
        );
      }
    }

    // Remove {ref-N} from display text
    const cleanText = paraText.replace(/\{ref-\d+\}\s*/g, "");

    // Merge consecutive citations to same journal
    const mergedCitations = mergeCitations(citations);

    return {
      text: cleanText,
      citations: mergedCitations,
    };
  });
}

/**
 * Merge consecutive citations (JAMA +1, JAMA +1 → JAMA +2)
 */
function mergeCitations(citations: InlineCitation[]): InlineCitation[] {
  const merged: InlineCitation[] = [];

  citations.forEach((cite) => {
    // Find existing citation for same journal within 50 characters
    const existing = merged.find(
      (m) => Math.abs(m.position - cite.position) < 50 && m.journalBadge === cite.journalBadge
    );

    if (existing) {
      existing.count++;
      existing.referenceIds.push(...cite.referenceIds);
    } else {
      merged.push({ ...cite });
    }
  });

  return merged;
}

/**
 * Generate structured summary without AI (fallback)
 * Extracts actionable clinical information from abstracts and full-text
 */
async function generateStructuredSummary(
  query: string,
  articles: any[],
  references: Reference[]
): Promise<ClinicalSection[]> {
  const sections: ClinicalSection[] = [];

  // Extract clinical insights from abstracts AND full-text
  const clinicalFindings = await extractClinicalInsights(articles, references);

  if (clinicalFindings.treatments.length > 0) {
    sections.push({
      heading: "Treatment Recommendations",
      paragraphs: clinicalFindings.treatments,
    });
  }

  if (clinicalFindings.diagnosis.length > 0) {
    sections.push({
      heading: "Diagnostic Approaches",
      paragraphs: clinicalFindings.diagnosis,
    });
  }

  if (clinicalFindings.management.length > 0) {
    sections.push({
      heading: "Clinical Management",
      paragraphs: clinicalFindings.management,
    });
  }

  if (clinicalFindings.outcomes.length > 0) {
    sections.push({
      heading: "Clinical Outcomes & Evidence",
      paragraphs: clinicalFindings.outcomes,
    });
  }

  // If no specific insights found, fall back to abstract excerpts
  if (sections.length === 0) {
    const mainParagraphs = articles.slice(0, 4).map((article, i) => {
      // Extract most informative sentences from abstract
      const abstract = article.abstract || article.title;
      const sentences = extractKeyAbstractSentences(abstract);

      return {
        text: sentences,
        citations: [
          {
            position: 0,
            journalBadge: getJournalBadge(article.journal),
            count: 1,
            referenceIds: [references[i].id],
            color: getJournalColor(article.journal),
          },
        ],
      };
    });

    sections.push({
      heading: "Key Evidence from Medical Literature",
      paragraphs: mainParagraphs,
    });
  }

  return sections;
}

/**
 * Extract actionable clinical insights from article abstracts AND full-text when available
 * Focuses on RESULTS and CONCLUSIONS sections, avoiding generic BACKGROUND
 * Enhanced: Fetches full-text from Europe PMC for articles with PMCID
 */
async function extractClinicalInsights(articles: any[], references: Reference[]) {
  const insights = {
    treatments: [] as ClinicalParagraph[],
    diagnosis: [] as ClinicalParagraph[],
    management: [] as ClinicalParagraph[],
    outcomes: [] as ClinicalParagraph[],
  };

  // SKIP these generic background phrases
  const skipPatterns = [
    /^\s*(objective|background|introduction|context|aim|purpose|goal):/i,
    /\b(is a common|is a major|is a significant|is an important|has been|have been)\b/i,
    /\b(this (study|review|article|paper) (aims|examines|investigates|describes))\b/i,
    /\b(the goal of this|the purpose of this|the objective of this)\b/i,
    /\b(worldwide|in the united states|common cause of)\b/i,
  ];

  // PRIORITIZE these actionable patterns
  const actionablePatterns = {
    // Specific drugs with dosages
    treatment:
      /\b(aspirin|clopidogrel|ticagrelor|prasugrel|heparin|warfarin|rivaroxaban|apixaban|dabigatran|ACT|artemether|lumefantrine|quinine|mefloquine|doxycycline|primaquine|chloroquine|atovaquone|proguanil|amoxicillin|ceftriaxone|azithromycin|levofloxacin|vancomycin|piperacillin|meropenem|imipenem)\s+\d+\s*(mg|mcg|units|IU)/i,

    // Dosing regimens
    regimen:
      /\b(twice daily|once daily|three times daily|every \d+ hours|for \d+ days|for \d+ weeks|loading dose|maintenance dose|initial dose)\b/i,

    // Specific protocols with timing
    protocol:
      /\b(within \d+\s*(minutes|hours|days)|at \d+\s*(minutes|hours|days)|after \d+\s*(minutes|hours|days)|before \d+\s*(minutes|hours|days))\b/i,

    // Outcome data with percentages/numbers
    outcomes:
      /\b(\d+%|\d+\.\d+%|reduced (by|from|to)|increased (by|from|to)|mortality (rate|of)|survival (rate|of)|cure rate|efficacy (of|rate)|sensitivity (of|was)|specificity (of|was))\b/i,

    // Specific procedures
    procedures:
      /\b(PCI|percutaneous coronary intervention|CABG|coronary artery bypass|thrombolysis|fibrinolysis|angiography|angioplasty|stent|catheterization|intubation|mechanical ventilation|hemodialysis|ECMO)\b/i,

    // Risk stratification
    risk: /\b(high-risk|low-risk|intermediate-risk|TIMI score|GRACE score|risk stratification|troponin|elevated|ECG changes|ST-elevation|non-ST-elevation|NSTEMI|STEMI)\b/i,
  };

  // Process each article - fetch full-text if available
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const abstract = article.abstract || "";

    // Try to fetch full-text from Europe PMC if PMCID available
    let fullTextSections = null;
    if (article.pmcid) {
      logger.debug(`Fetching full text for PMC${article.pmcid}...`);
      try {
        fullTextSections = await fetchFullText(article.pmcid);
        if (fullTextSections) {
          logger.debug(`✓ Full text retrieved for PMC${article.pmcid}`);
        }
      } catch (error) {
        logger.error(`Failed to fetch full text for PMC${article.pmcid}:`, error);
      }
    }

    // Analyze full-text Results section if available (best for specific dosing)
    let textToAnalyze = abstract;
    if (fullTextSections?.results) {
      logger.debug(`Using full-text RESULTS section for PMC${article.pmcid}`);
      textToAnalyze = fullTextSections.results;
    } else if (fullTextSections?.discussion) {
      // Discussion often has clinical recommendations
      textToAnalyze = fullTextSections.discussion;
    } else {
      // Fall back to abstract RESULTS/CONCLUSIONS
      const resultsSection = extractSection(abstract, ["results", "findings", "conclusions", "recommendations"]);
      textToAnalyze = resultsSection || abstract;
    }

    const sentences = textToAnalyze.split(/\.\s+/);

    sentences.forEach((sentence: string, idx: number) => {
      if (!sentence.trim() || sentence.length < 40) return;

      // SKIP generic background sentences
      if (skipPatterns.some((pattern) => pattern.test(sentence))) {
        return;
      }

      // Calculate actionability score
      let score = 0;
      let category: "treatments" | "diagnosis" | "management" | "outcomes" | null = null;

      // Check for treatment patterns (high priority)
      if (actionablePatterns.treatment.test(sentence) || actionablePatterns.regimen.test(sentence)) {
        score += 10;
        category = "treatments";
      }

      // Check for protocol/timing
      if (actionablePatterns.protocol.test(sentence)) {
        score += 8;
        category = category || "management";
      }

      // Check for procedures
      if (actionablePatterns.procedures.test(sentence)) {
        score += 7;
        category = category || "management";
      }

      // Check for outcomes with numbers
      if (actionablePatterns.outcomes.test(sentence)) {
        score += 9;
        category = category || "outcomes";
      }

      // Check for risk stratification
      if (actionablePatterns.risk.test(sentence)) {
        score += 6;
        category = category || "diagnosis";
      }

      // Generic clinical terms (lower priority)
      if (/\b(recommended|should be|is indicated|contraindicated|preferred|first-line|second-line)\b/i.test(sentence)) {
        score += 5;
        category = category || "treatments";
      }

      // Prefer sentences from later in abstract (results/conclusions)
      if (idx > sentences.length / 2) {
        score += 2;
      }

      // Only include sentences with actionability score >= 5
      if (score >= 5 && category) {
        const citation: InlineCitation = {
          position: 0,
          journalBadge: getJournalBadge(article.journal),
          count: 1,
          referenceIds: [references[i].id],
          color: getJournalColor(article.journal),
        };

        const paragraph = {
          text: sentence.trim() + ".",
          citations: [citation],
        };

        // Add to appropriate category (max 6 per category)
        if (insights[category].length < 6) {
          insights[category].push(paragraph);
        }
      }
    });
  }

  return insights;
}

/**
 * Extract specific sections from structured abstracts
 */
function extractSection(abstract: string, sectionNames: string[]): string | null {
  // Try to find labeled sections (RESULTS:, CONCLUSIONS:, etc.)
  for (const name of sectionNames) {
    const regex = new RegExp(
      `\\b${name}\\s*:(.+?)(?=\\b(background|methods|results|conclusions|introduction|objectives)\\s*:|$)`,
      "is"
    );
    const match = abstract.match(regex);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  // If no labeled sections, return second half of abstract (usually results/conclusions)
  const sentences = abstract.split(/\.\s+/);
  if (sentences.length > 4) {
    return sentences.slice(Math.floor(sentences.length / 2)).join(". ");
  }

  return null;
}

/**
 * Extract the most informative sentences from an abstract
 * Prioritizes actionable clinical data over background information
 */
function extractKeyAbstractSentences(abstract: string): string {
  // Try to extract RESULTS/CONCLUSIONS sections first
  const resultsSection = extractSection(abstract, ["results", "findings", "conclusions", "recommendations"]);
  const textToScore = resultsSection || abstract;

  const sentences = textToScore.split(/\.\s+/);

  // Skip patterns (background/introduction fluff)
  const skipPatterns = [
    /^\s*(objective|background|introduction|context|aim|purpose|goal):/i,
    /\b(is a common|is a major|is a significant|is an important|has been|have been)\b/i,
    /\b(this (study|review|article|paper|analysis))\b/i,
    /\b(the goal|the purpose|the objective|to (investigate|examine|describe|review|evaluate))\b/i,
    /\b(worldwide|globally|in many countries|common cause of|leading cause of)\b/i,
  ];

  const scoredSentences = sentences.map((sentence, idx) => {
    let score = 0;

    // SKIP background sentences entirely
    if (skipPatterns.some((pattern) => pattern.test(sentence))) {
      return { sentence, score: -100 };
    }

    // HIGH PRIORITY: Specific drugs with dosages
    if (
      /\b(aspirin|clopidogrel|ticagrelor|prasugrel|heparin|enoxaparin|warfarin|rivaroxaban|apixaban|dabigatran|atorvastatin|rosuvastatin|metoprolol|carvedilol|lisinopril|enalapril|ramipril|ACT|artemether|lumefantrine|quinine|chloroquine|primaquine|doxycycline|mefloquine|atovaquone|proguanil|ceftriaxone|azithromycin|levofloxacin|vancomycin|piperacillin|meropenem)\s+\d+\s*(mg|mcg|g|units|IU)/i.test(
        sentence
      )
    ) {
      score += 15;
    }

    // HIGH PRIORITY: Timing and protocols
    if (/\b(within \d+|at \d+|after \d+|before \d+|every \d+)\s*(minutes|hours|days|weeks|months)/i.test(sentence)) {
      score += 12;
    }

    // HIGH PRIORITY: Percentages and outcome numbers
    if (
      /\b(\d+\.\d+%|\d+%|p\s*[<>=]\s*0\.\d+|95% CI|odds ratio|hazard ratio|relative risk|RR\s*=|OR\s*=|HR\s*=)/i.test(
        sentence
      )
    ) {
      score += 10;
    }

    // HIGH PRIORITY: Specific procedures
    if (
      /\b(PCI|percutaneous coronary intervention|CABG|coronary artery bypass|thrombolysis|fibrinolysis|primary angioplasty|balloon angioplasty|stent|bare-metal stent|drug-eluting stent|catheterization|angiography)\b/i.test(
        sentence
      )
    ) {
      score += 10;
    }

    // MEDIUM PRIORITY: Clinical recommendations
    if (
      /\b(recommended|should be (given|administered|performed|initiated)|is indicated|first-line|second-line|preferred|class I|class IIA|class IIB|level A|level B)\b/i.test(
        sentence
      )
    ) {
      score += 8;
    }

    // MEDIUM PRIORITY: Dosing regimens
    if (
      /\b(loading dose|maintenance dose|initial dose|twice daily|once daily|three times daily|bid|tid|qid|q\d+h)\b/i.test(
        sentence
      )
    ) {
      score += 7;
    }

    // MEDIUM PRIORITY: Risk stratification
    if (
      /\b(TIMI score|GRACE score|risk stratification|high-risk|low-risk|intermediate-risk|troponin|elevated|ECG changes|ST-elevation|ST-segment elevation|non-ST-elevation|NSTEMI|STEMI|unstable angina)\b/i.test(
        sentence
      )
    ) {
      score += 7;
    }

    // MEDIUM PRIORITY: Monitoring parameters
    if (
      /\b(monitor|monitoring|blood pressure|heart rate|oxygen saturation|SpO2|INR|aPTT|creatinine|electrolytes|troponin|BNP|NT-proBNP)\b/i.test(
        sentence
      )
    ) {
      score += 6;
    }

    // MEDIUM PRIORITY: Contraindications and warnings
    if (
      /\b(contraindicated|contraindication|should not|avoid|caution|bleeding risk|renal impairment|hepatic impairment|adverse effect|side effect)\b/i.test(
        sentence
      )
    ) {
      score += 6;
    }

    // MEDIUM PRIORITY: Diagnostic criteria
    if (
      /\b(sensitivity of|specificity of|diagnostic accuracy|positive predictive value|negative predictive value|PPV|NPV|diagnostic criteria|diagnostic test)\b/i.test(
        sentence
      )
    ) {
      score += 8;
    }

    // Prefer later sentences (results/conclusions over methods)
    if (idx > sentences.length * 0.6) {
      score += 5;
    } else if (idx < sentences.length * 0.3) {
      score -= 3; // Penalize early sentences (likely background)
    }

    // Penalize very short or very long sentences
    if (sentence.length < 50) score -= 5;
    if (sentence.length > 300) score -= 3;

    // Penalize vague terms
    if (
      /\b(various|several|many|some|multiple|numerous|often|frequently|commonly|generally|typically|usually)\b/i.test(
        sentence
      )
    ) {
      score -= 2;
    }

    return { sentence, score };
  });

  // Get top 3-4 sentences with score > 0
  const topSentences = scoredSentences
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((s) => s.sentence.trim())
    .filter((s) => s.length > 40);

  // If no good sentences found, try to at least avoid the worst background fluff
  if (topSentences.length === 0) {
    const betterSentences = sentences
      .filter((s) => !skipPatterns.some((p) => p.test(s)))
      .filter((s) => s.length > 50 && s.length < 250)
      .slice(0, 2);

    return betterSentences.join(". ") + ".";
  }

  return topSentences.join(". ") + ".";
}

/**
 * Get evidence type priority score (higher = better evidence)
 * OpenEvidence prioritizes: Guidelines > Meta-analyses > RCTs > Observational
 */
function getEvidenceTypePriority(article: any): number {
  const title = (article.title || "").toLowerCase();
  const abstract = (article.abstract || "").toLowerCase();
  const text = title + " " + abstract;

  // Highest priority: Clinical practice guidelines
  if (
    text.includes("guideline") ||
    text.includes("clinical practice guideline") ||
    text.includes("consensus statement") ||
    text.includes("expert consensus")
  ) {
    return 1000; // Guidelines (like Surviving Sepsis Campaign)
  }

  // Second priority: Meta-analyses and systematic reviews
  if (text.includes("meta-analysis") || text.includes("meta analysis")) {
    return 900; // Meta-analyses
  }

  if (text.includes("systematic review")) {
    return 850; // Systematic reviews
  }

  // Third priority: Major RCTs
  if (
    text.includes("randomized controlled trial") ||
    text.includes("randomized trial") ||
    text.includes(" rct ") ||
    (text.includes("randomized") && text.includes("multicenter"))
  ) {
    return 700; // RCTs
  }

  // Fourth: Cohort and observational studies
  if (text.includes("cohort") || text.includes("prospective")) {
    return 500;
  }

  // Default: Other evidence
  return 100;
}

/**
 * Calculate confidence score based on evidence quality
 */
function calculateConfidenceScore(qualities: any[]): number {
  const tier1Count = qualities.filter((q) => q.tier === 1).length;
  const tier2Count = qualities.filter((q) => q.tier === 2).length;
  const totalCount = qualities.length;
  const avgScore = qualities.reduce((sum, q) => sum + q.totalScore, 0) / qualities.length;
  const avgAge = qualities.reduce((sum, q) => sum + q.recencyScore, 0) / qualities.length;

  let score = 50; // Base

  // Tier 1 journal boost (up to +30) - More reward for top journals
  score += Math.min(30, tier1Count * 6);

  // Tier 2 journal boost (up to +15) - Reward for good quality journals
  score += Math.min(15, tier2Count * 3);

  // Article count boost (up to +15) - More articles = higher confidence
  // 4-6 articles: +5-8, 7-10 articles: +10-13, 11+ articles: +15
  const countBonus = Math.min(15, Math.floor(totalCount / 0.75));
  score += countBonus;

  // Quality score boost (up to +10)
  score += Math.min(10, (avgScore - 70) / 3);

  // Recency boost (up to +10)
  score += Math.min(10, avgAge / 2);

  return Math.min(95, Math.max(65, Math.round(score))); // Cap between 65-95
}
