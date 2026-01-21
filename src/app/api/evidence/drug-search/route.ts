import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from "next/server";
import { searchAllSources, type UnifiedArticle } from "@/lib/evidence/unified-search";
import { callGroq } from "@/lib/ai/groq-client";

/**
 * Drug-specific search endpoint
 * Specialized for medication queries: indications, dosing, contraindications, interactions
 */

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(identifier);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (limit.count >= maxRequests) {
    return false;
  }

  limit.count++;
  return true;
}

// Clean up old rate limit entries
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 300000);

// Detect if query is drug-related
function isDrugQuery(query: string): boolean {
  const drugKeywords = [
    'dosing', 'dose', 'dosage', 'indication', 'contraindication',
    'interaction', 'adverse effect', 'side effect', 'monitoring',
    'drug', 'medication', 'pharmacology', 'therapeutic', 'treatment',
    'mg', 'mcg', 'units', 'administration', 'route', 'frequency'
  ];
  
  const lowerQuery = query.toLowerCase();
  return drugKeywords.some(keyword => lowerQuery.includes(keyword));
}

// Extract drug name from query
function extractDrugName(query: string): string | null {
  // Simple extraction - could be enhanced with NLP or drug name database
  const words = query.split(' ');
  
  // Common drug name patterns
  const drugIndicators = ['for', 'in', 'with', 'during', 'after', 'before'];
  const queryWords = ['dosing', 'dose', 'indication', 'contraindication', 'interaction'];
  
  // Find potential drug name (usually before indicators or query words)
  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase();
    if (drugIndicators.includes(word) || queryWords.includes(word)) {
      if (i > 0) {
        return words[i - 1];
      }
    }
  }
  
  // If no pattern found, return first word (often the drug name)
  return words[0] || null;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = request.headers.get("x-forwarded-for") || 
                     request.headers.get("x-real-ip") || 
                     "unknown";

    if (!checkRateLimit(clientId)) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: "Too many searches. Please wait a moment (max 5 searches per minute).",
          retryAfter: 60,
        },
        { status: 429 }
      );
    }

    // Input validation
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Invalid query", message: "Query is required and must be a string" },
        { status: 400 }
      );
    }

    const sanitizedQuery = query.trim();

    if (sanitizedQuery.length < 3) {
      return NextResponse.json(
        { error: "Query too short", message: "Please enter at least 3 characters" },
        { status: 400 }
      );
    }

    if (sanitizedQuery.length > 500) {
      return NextResponse.json(
        { error: "Query too long", message: "Please limit your query to 500 characters" },
        { status: 400 }
      );
    }

    const cleanQuery = sanitizedQuery.replace(/[<>\"]/g, "");
    logger.debug(`[Drug Search] Query: "${cleanQuery}"`);

    // Extract drug name
    const drugName = extractDrugName(cleanQuery);
    logger.debug(`[Drug Search] Detected drug: ${drugName || 'unknown'}`);

    // Search medical databases with drug-specific filters
    logger.debug("[Drug Search] Searching medical databases...");
    const searchResults = await searchAllSources({
      query: cleanQuery,
      maxResults: 25,
      filters: {
        fromDate: "2014-01-01", // Last 10 years
        hasAbstract: true,
      },
      sort: "relevance",
    });

    if (searchResults.articles.length === 0) {
      return NextResponse.json({
        query: cleanQuery,
        drugName,
        type: 'drug',
        summary: `No medical evidence found for "${cleanQuery}". Try rephrasing with the generic drug name or check spelling.`,
        keyPoints: [
          "No articles found matching your drug query",
          "Try using the generic (non-brand) drug name",
          "Check spelling of medication name",
          "Try broader search terms (e.g., 'beta blocker' instead of specific drug)",
        ],
        sections: [],
        sources: [],
        isPro: true,
        steps: 2,
      });
    }

    logger.debug(`[Drug Search] Found ${searchResults.articles.length} articles`);

    // Prioritize drug-specific evidence
    const articlesWithScores = searchResults.articles.map((article) => {
      let qualityScore = 0;

      // Guideline priority
      const articleTypeLower = article.type.toLowerCase();
      const titleLower = article.title.toLowerCase();
      
      if (articleTypeLower.includes("guideline") || titleLower.includes("guideline")) {
        qualityScore += 150;
      } else if (articleTypeLower.includes("meta-analysis")) {
        qualityScore += 100;
      } else if (articleTypeLower.includes("systematic review")) {
        qualityScore += 90;
      } else if (articleTypeLower.includes("randomized") || articleTypeLower.includes("clinical trial")) {
        qualityScore += 80;
      } else if (articleTypeLower.includes("review")) {
        qualityScore += 60;
      }

      // Pharmacy/clinical pharmacology journals bonus
      const journal = article.journal.toLowerCase();
      if (journal.includes("pharmacolog") || journal.includes("pharmacy") || 
          journal.includes("therapeutic") || journal.includes("drug")) {
        qualityScore += 30;
      }

      // Citation impact
      if (article.citationCount > 1000) qualityScore += 50;
      else if (article.citationCount > 500) qualityScore += 40;
      else if (article.citationCount > 100) qualityScore += 30;

      // Recency
      const year = parseInt(article.published.split("-")[0]) || 2024;
      const yearsSince2020 = Math.max(0, year - 2020);
      qualityScore += yearsSince2020 * 5;

      return { article, qualityScore };
    });

    articlesWithScores.sort((a, b) => b.qualityScore - a.qualityScore);

    // Generate drug monograph with AI
    logger.debug("[Drug Search] Generating drug monograph...");

    const topArticles = articlesWithScores
      .slice(0, 12)
      .map((item, idx) => {
        const { article } = item;
        const badges = [];
        
        if (article.type.toLowerCase().includes("guideline")) badges.push("GUIDELINE");
        if (article.type.toLowerCase().includes("meta-analysis")) badges.push("META-ANALYSIS");
        if (article.type.toLowerCase().includes("systematic review")) badges.push("SYSTEMATIC REVIEW");
        if (article.citationCount > 500) badges.push(`${article.citationCount} CITATIONS`);

        return `[${idx + 1}] **${badges.join(" | ")}** (Quality: ${item.qualityScore})
Title: ${article.title}
Journal: ${article.journal} (${article.published.split("-")[0]})
Authors: ${article.authors.slice(0, 3).join(", ")}${article.authors.length > 3 ? " et al." : ""}
Citations: ${article.citationCount}

ABSTRACT:
${article.abstract || "No abstract available"}
---
`;
      })
      .join("\n");

    const systemPrompt = `You are a clinical pharmacist providing evidence-based drug information for medical professionals.

OUTPUT STRUCTURE:

SUMMARY:
Write 4-6 comprehensive paragraphs covering the complete drug profile:

Paragraph 1 (Drug Class & Mechanism):
- Drug class/category
- Mechanism of action
- Pharmacokinetics basics (absorption, metabolism, excretion)
- Always cite sources ⁽¹⁾⁽²⁾

Paragraph 2 (Indications - FDA & Off-Label):
- FDA-approved indications with specifics
- Common off-label uses
- Evidence quality for each indication
- Patient selection criteria
- Include journal names inline: "...as shown in JAMA..." or "...according to The Lancet..."

Paragraph 3 (Dosing - Adult & Pediatric):
- Adult dosing (initial, maintenance, maximum)
- Route of administration
- Renal dose adjustments (specify CrCl thresholds)
- Hepatic dose adjustments (Child-Pugh criteria)
- Pediatric dosing (if applicable, with age/weight ranges)
- Include specific numbers and cite sources

Paragraph 4 (Contraindications & Cautions):
- Absolute contraindications
- Relative contraindications
- Black box warnings
- Special populations (pregnancy, lactation, elderly)
- Evidence-based cautions

Paragraph 5 (Adverse Effects & Monitoring):
- Common adverse effects (>10% incidence)
- Serious adverse effects requiring monitoring
- Required laboratory monitoring (what and when)
- Clinical monitoring parameters
- Drug-drug interactions (major ones)

Paragraph 6 (Clinical Pearls):
- Practical prescribing tips
- When to use vs avoid
- Evidence quality summary
- Recent guideline updates

CRITICAL RULES:
✅ Use exact journal names inline - these become clickable: "Published in JAMA...", "A study in The Lancet..."
✅ Superscript citations ⁽¹⁾⁽²⁾ after EVERY claim
✅ Specific numbers: mg/day, dosing intervals, adjustment percentages
✅ Evidence grading: "strong evidence", "moderate quality", "limited data"
✅ Cite trial names when available (e.g., BICAR-ICU, SAFE, etc.)

KEY POINTS:
Create 6-8 bullet points for quick bedside reference:
- FDA-approved indication(s) with journal citation
- Standard adult dosing with route
- Key renal/hepatic adjustments
- Major contraindication(s)
- Most important adverse effect(s) to monitor
- Critical drug interaction(s)
- Essential monitoring parameter(s)
- Clinical pearl or prescribing tip

Example bullet:
- Approved for hypertension and heart failure; reduces mortality in HFrEF (NEJM ⁽¹⁾)
- Adult dose: 2.5-10mg PO daily; start low in elderly or volume-depleted patients (Lancet ⁽²⁾)

SECTIONS:
[Leave empty - using integrated narrative]`;

    const userPrompt = `Drug/Medication Query: "${cleanQuery}"

EVIDENCE FROM MEDICAL LITERATURE:
${topArticles}

Generate a comprehensive, evidence-based drug monograph.

INSTRUCTIONS:
1. Write 4-6 flowing paragraphs for SUMMARY covering: class/mechanism, indications, dosing, contraindications, adverse effects/monitoring, clinical pearls
2. Include ALL dosing details: adult, pediatric, renal adjustment, hepatic adjustment
3. Specify monitoring parameters (what labs, how often)
4. List major drug interactions
5. Include pregnancy/lactation category if available
6. Then create 6-8 KEY POINTS for quick reference
7. Use inline journal names and superscript citations ⁽¹⁾⁽²⁾ throughout

Focus on clinically actionable information that helps with safe prescribing.`;

    let aiResponse: string;
    try {
      aiResponse = await callGroq(systemPrompt, userPrompt, {
        temperature: 0.15, // Very low for factual drug information
        maxTokens: 6000,
      });
    } catch (error) {
      logger.error("[Drug Search] AI generation failed:", error instanceof Error ? error : new Error(String(error)));

      aiResponse = `Drug information for "${cleanQuery}"

SUMMARY:
Evidence synthesis temporarily unavailable. ${searchResults.articles.length} peer-reviewed articles found about this medication. Please review the source abstracts below for detailed pharmacological information.

KEY POINTS:
- ${searchResults.articles.length} medical references found
- Full abstracts and citations available below
- Retry in a moment for AI-generated drug monograph
- Consult primary literature for dosing and safety information

SECTIONS:
## Available Evidence
Review ${searchResults.articles.length} sources below for detailed drug information.`;
    }

    // Parse response
    const summaryMatch = aiResponse.match(/SUMMARY:([\s\S]*?)(?:KEY POINTS:|SECTIONS:|$)/i);
    const keyPointsMatch = aiResponse.match(/KEY POINTS:([\s\S]*?)(?:SECTIONS:|$)/i);

    const summary = summaryMatch ? summaryMatch[1].trim() : aiResponse;
    const keyPointsText = keyPointsMatch ? keyPointsMatch[1].trim() : "";
    const keyPoints = keyPointsText
      .split("\n")
      .map((line) => line.replace(/^[-•*]\s*/, "").trim())
      .filter((line) => line.length > 0);

    // Format sources
    const sources = articlesWithScores.slice(0, 20).map((item, idx) => {
      const { article } = item;
      const badges: string[] = [];

      if (article.type.toLowerCase().includes("guideline")) {
        badges.push("📋 GUIDELINE");
      }
      if (article.type.toLowerCase().includes("meta-analysis")) {
        badges.push("📈 META-ANALYSIS");
      }
      if (article.type.toLowerCase().includes("systematic review")) {
        badges.push("📚 SYSTEMATIC REVIEW");
      }
      if (article.citationCount > 1000) {
        badges.push("📊 1000+ CITATIONS");
      } else if (article.citationCount > 100) {
        badges.push("📚 100+ CITATIONS");
      }

      // Add drug/pharmacy journal badge
      const journal = article.journal.toLowerCase();
      if (journal.includes("pharmacolog") || journal.includes("pharmacy") ||
          journal.includes("therapeutic")) {
        badges.push("💊 PHARMACOLOGY");
      }

      if (article.isOpenAccess) {
        badges.push("🔓 OPEN ACCESS");
      }

      return {
        id: idx + 1,
        title: article.title,
        authors: article.authors.slice(0, 3).join(", ") + (article.authors.length > 3 ? " et al." : ""),
        journal: article.journal,
        year: parseInt(article.published.split("-")[0]) || 2024,
        citations: article.citationCount,
        badges,
        url: article.url,
        qualityScore: item.qualityScore,
      };
    });

    return NextResponse.json({
      query: cleanQuery,
      drugName,
      type: 'drug',
      summary,
      keyPoints,
      sections: [], // Using integrated narrative
      sources,
      totalResults: searchResults.articles.length,
      isPro: true,
      steps: 3,
    });

  } catch (error) {
    logger.error("Drug search error:", error instanceof Error ? error : new Error(String(error)));
    return NextResponse.json(
      {
        error: "Failed to search drug information",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
