import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from "next/server";
import { searchAllSources, type UnifiedArticle } from "@/lib/evidence/unified-search";
import { callGroq } from "@/lib/ai/groq-client";
import { ALL_TIER_1 } from "@/lib/evidence/journal-database";

interface Section {
  title: string;
  content: string;
  subsections?: {
    title: string;
    content: string;
    citations?: number[];
  }[];
  table?: {
    headers: string[];
    rows: string[][];
    caption?: string;
  };
}

// Rate limiting - Simple in-memory implementation (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(identifier);

  if (!limit || now > limit.resetTime) {
    // Reset window
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (limit.count >= maxRequests) {
    return false;
  }

  limit.count++;
  return true;
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 300000); // Clean every 5 minutes

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientId = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

    if (!checkRateLimit(clientId)) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: "Too many searches. Please wait a moment before trying again (max 5 searches per minute).",
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

    // Remove potentially harmful characters while preserving medical terms
    const cleanQuery = sanitizedQuery.replace(/[<>\"]/g, "");

    logger.debug(`[Consensus Search] Query: "${cleanQuery}"`);

    // Step 1: Search medical databases
    logger.debug("[Step 1/3] Searching medical databases...");
    const searchResults = await searchAllSources({
      query: cleanQuery,
      maxResults: 20,
      filters: {
        fromDate: "2014-01-01", // Last 10 years
        hasAbstract: true,
      },
      sort: "relevance",
    });

    if (searchResults.articles.length === 0) {
      return NextResponse.json({
        query: cleanQuery,
        summary: "No relevant medical evidence found for this query. Try rephrasing or using different terms.",
        keyPoints: [
          "No articles found matching your search criteria",
          "Try using different medical terms or broader keywords",
          "Ensure proper spelling of medical terminology",
        ],
        steps: 2,
        isPro: true,
        sections: [],
        sources: [],
      });
    }

    logger.debug(`[Step 1/3] Found ${searchResults.articles.length} articles`);

    // Step 2: PRIORITIZE HIGH-QUALITY SOURCES FOR CLINICAL DECISIONS
    // Calculate quality scores and sort articles
    const articlesWithScores = searchResults.articles.map((article) => {
      let qualityScore = 0;

      // Tier 1 journal = +100 points (highest priority)
      const tier1Journal = Object.values(ALL_TIER_1).find(
        (j) =>
          article.journal.toLowerCase().includes(j.name.toLowerCase()) ||
          article.journal.toLowerCase().includes(j.fullName.toLowerCase())
      );
      if (tier1Journal) qualityScore += 100;

      // High-level evidence types
      const articleTypeLower = article.type.toLowerCase();
      if (articleTypeLower.includes("guideline") || article.title.toLowerCase().includes("guideline")) {
        qualityScore += 150; // Guidelines are gold standard
      } else if (articleTypeLower.includes("meta-analysis")) {
        qualityScore += 80;
      } else if (articleTypeLower.includes("systematic review")) {
        qualityScore += 70;
      } else if (articleTypeLower.includes("randomized") || articleTypeLower.includes("clinical trial")) {
        qualityScore += 60;
      }

      // Citation impact
      if (article.citationCount > 1000) qualityScore += 50;
      else if (article.citationCount > 500) qualityScore += 40;
      else if (article.citationCount > 100) qualityScore += 30;
      else if (article.citationCount > 50) qualityScore += 20;

      // Recency bonus (more recent = more relevant for clinical practice)
      const year = parseInt(article.published.split("-")[0]) || 2024;
      const yearsSince2020 = Math.max(0, year - 2020);
      qualityScore += yearsSince2020 * 5;

      return { article, qualityScore, tier1Journal };
    });

    // Sort by quality score (highest first)
    articlesWithScores.sort((a, b) => b.qualityScore - a.qualityScore);

    // Separate high-quality from supplementary sources
    const highQualitySources = articlesWithScores.filter((a) => a.qualityScore >= 80);
    const supplementarySources = articlesWithScores.filter((a) => a.qualityScore < 80);

    logger.debug(
      `[Quality Filter] ${highQualitySources.length} high-quality sources (score ≥80), ${supplementarySources.length} supplementary`
    );

    // Generate badges for ALL sources
    const sourcesWithBadges = articlesWithScores.map((item, idx) => {
      const { article, tier1Journal } = item;
      const badges: string[] = [];

      // Priority badges
      if (article.type.toLowerCase().includes("guideline") || article.title.toLowerCase().includes("guideline")) {
        badges.push("📋 CLINICAL GUIDELINE");
      }

      if (tier1Journal) {
        badges.push(`⭐ ${tier1Journal.name.toUpperCase()}`);
      }

      // Evidence level
      if (article.type.toLowerCase().includes("meta-analysis")) {
        badges.push("📈 META-ANALYSIS");
      } else if (article.type.toLowerCase().includes("systematic review")) {
        badges.push("📚 SYSTEMATIC REVIEW");
      } else if (
        article.type.toLowerCase().includes("randomized") ||
        article.type.toLowerCase().includes("clinical trial")
      ) {
        badges.push("🧪 RCT");
      }

      // Citation impact
      if (article.citationCount > 1000) {
        badges.push("📊 1000+ CITATIONS");
      } else if (article.citationCount > 500) {
        badges.push("📊 500+ CITATIONS");
      } else if (article.citationCount > 100) {
        badges.push("📚 100+ CITATIONS");
      }

      // Open access
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
        qualityScore: item.qualityScore, // Include for debugging
      };
    });

    // Step 3: Generate CLINICAL-GRADE summary with Groq AI
    logger.debug("[Step 2/3] Generating clinical evidence synthesis...");

    // Prioritize high-quality sources in AI context - USE FULL ABSTRACTS
    // Filter out unknown journals and low-quality sources
    const highQualityContext = highQualitySources
      .filter((item) => {
        const journal = item.article.journal.toLowerCase();
        // Exclude unknown/generic journals
        if (journal.includes("unknown") || journal === "unknown journal" || journal === "") {
          return false;
        }
        // Must have either: citations >10, OR Tier 1 journal, OR guideline, OR meta-analysis
        const hasCitations = item.article.citationCount > 10;
        const isTier1 = item.tier1Journal !== undefined;
        const isGuideline = item.article.type.toLowerCase().includes("guideline");
        const isMetaAnalysis =
          item.article.type.toLowerCase().includes("meta-analysis") ||
          item.article.type.toLowerCase().includes("systematic review");
        return hasCitations || isTier1 || isGuideline || isMetaAnalysis;
      })
      .slice(0, 10) // Top 10 high-quality, relevant sources
      .map((item, idx) => {
        const { article } = item;
        const badges = [];

        if (article.type.toLowerCase().includes("guideline")) badges.push("GUIDELINE");
        if (item.tier1Journal) badges.push(item.tier1Journal.abbreviation);
        if (article.type.toLowerCase().includes("meta-analysis")) badges.push("META-ANALYSIS");
        if (article.citationCount > 500) badges.push(`${article.citationCount} CITATIONS`);

        // Use FULL abstract (not truncated) for better synthesis
        const fullAbstract = article.abstract || "No abstract available";

        // For guidelines and high-impact articles, provide maximum context
        const contextDetail =
          item.qualityScore >= 150
            ? `${fullAbstract}\n\nCLINICAL SIGNIFICANCE: This is a ${badges.join(
                ", "
              )} - prioritize this evidence in your synthesis.`
            : fullAbstract;

        return `[${idx + 1}] **${badges.join(" | ")}** (Quality Score: ${item.qualityScore})
Title: ${article.title}
Journal: ${article.journal} (${article.published.split("-")[0]})
Authors: ${article.authors.slice(0, 3).join(", ")}${article.authors.length > 3 ? " et al." : ""}
Citations: ${article.citationCount}
Type: ${article.type}

FULL ABSTRACT:
${contextDetail}

${article.fullTextUrl ? `FULL TEXT AVAILABLE: ${article.fullTextUrl}` : ""}
---
`;
      })
      .join("\n");

    const supplementaryContext = supplementarySources
      .slice(0, 5) // Up to 5 supplementary sources
      .map((item, idx) => {
        const { article } = item;
        return `[${highQualitySources.length + idx + 1}] ${article.title} - ${article.journal} (${
          article.published.split("-")[0]
        })`;
      })
      .join("\n");

    const systemPrompt = `You are a clinical evidence synthesizer for medical decision-making, similar to OpenEvidence.

CRITICAL INSTRUCTIONS:
1. **Integrated narrative style** - Write flowing paragraphs that weave together evidence, NOT separate sections
2. **Journal attribution REQUIRED** - Always mention journal names inline (e.g., "The BICAR-ICU trial published in JAMA found..." or "A meta-analysis in Anesthesia and Analgesia showed...")
3. **Prioritize high-quality evidence** - Focus on guidelines, Tier 1 journals (NEJM, Lancet, JAMA, BMJ), meta-analyses, systematic reviews
4. **Clinical actionability** - Include specific criteria, dosing, patient selection naturally within paragraphs
5. **Superscript citations** - Use ⁽¹⁾⁽²⁾ after EVERY claim

OUTPUT FORMAT (OpenEvidence style - integrated narrative):

SUMMARY:
[Write 3-5 comprehensive paragraphs that tell the complete clinical story. Each paragraph should flow naturally and integrate multiple types of information:]

Paragraph 1 (Primary Recommendation + Main Evidence):
- State the main recommendation clearly (recommended/not recommended/conditional)
- Include the strongest evidence with journal attribution
- Example: "Sodium bicarbonate is not routinely recommended for septic shock. The BICAR-ICU trial, published in JAMA, enrolled 389 patients with severe metabolic acidosis and found no significant difference in 28-day mortality between the bicarbonate group (46%) and placebo (45.8%, p=0.09) ⁽¹⁾. However, a subgroup analysis published in Critical Care Medicine found potential benefit in patients with acute kidney injury (AKI) stage 2 or 3 ⁽²⁾."

Paragraph 2 (Clinical Context + When to Consider):
- Explain the pathophysiology/clinical context
- Integrate specific criteria for use
- Include guideline recommendations naturally
- Example: "Metabolic acidosis in septic shock results from tissue hypoperfusion and lactate accumulation. The Surviving Sepsis Campaign guidelines suggest considering bicarbonate therapy only in patients with pH ≤7.2 who have concomitant AKI, based on moderate-quality evidence from the aforementioned trials ⁽³⁾. A systematic review in Anesthesia and Analgesia pooling 5 studies (1,234 patients) found that bicarbonate use in this specific population was associated with reduced mortality (OR 0.73, 95% CI 0.56-0.96, NNT 12) ⁽⁴⁾."

Paragraph 3 (Special Considerations + Evidence Nuances):
- Dosing, administration details
- Special populations
- Adverse effects, contraindications
- Evidence quality and limitations
- Example: "When indicated, the typical dose is 4.2% sodium bicarbonate infused over 4 hours, as used in the BICAR-ICU protocol ⁽¹⁾. Recent retrospective analyses in Intensive Care Medicine support this approach in patients with moderate lactic acidosis and hospital mortality, particularly those with septic shock and AKI ⁽⁵⁾. Nevertheless, these findings are based on low to moderate quality evidence, and clinicians must weigh the risk of adverse effects such as hypernatremia, hypocalcemia, and metabolic alkalosis ⁽⁶⁾."

Additional paragraphs as needed to cover:
- Trial methodology and populations studied (integrated, not separate section)
- Ongoing research or knowledge gaps
- Practical implementation considerations

CRITICAL RULES:
✅ ALWAYS include journal names inline - these will become clickable links: "A trial in JAMA...", "According to The Lancet...", "Research in NEJM found...", "Published in Anesthesia and Analgesia..."
✅ Use EXACT journal names from the source list (they will be automatically linked to original articles)
✅ Integrate all information into flowing narrative paragraphs
✅ Each paragraph should cover multiple aspects (evidence + recommendations + practical details)
✅ Use specific numbers: mortality rates, NNT, effect sizes, p-values, dosing
✅ Reference trial names: BICAR-ICU, SAFE, SMART, etc.
✅ Include author names when available for key studies
✅ Superscript citations ⁽¹⁾⁽²⁾ after EVERY claim (these citations will link to full articles)

❌ DO NOT create separate sections like "Clinical Recommendations", "Evidence Basis", "When to Use"
❌ DO NOT use headers within SUMMARY (only use natural paragraph breaks)
❌ DO NOT repeat the same information in multiple places
❌ DO NOT include sources with "Unknown Journal" or zero citations unless they're guidelines
❌ DO NOT use generic language - be specific with journal names, trial names, numbers

KEY POINTS:
After the SUMMARY, create a "KEY POINTS:" section with 4-7 bullet points for quick clinical reference.
Each bullet point should:
- Be a single, concise sentence (max 25 words)
- State ONE key finding or recommendation
- Include specific numbers/criteria when relevant
- End with journal attribution and citation: "⁽¹⁾" or "(JAMA ⁽²⁾)" or "(Lancet ⁽³⁾)"
- Be actionable for bedside decision-making

Example format:
KEY POINTS:
- Not recommended routinely; no mortality benefit shown in BICAR-ICU trial (JAMA ⁽¹⁾)
- Consider only if pH ≤7.2 AND AKI stage 2-3; NNT=12 for mortality reduction (Anesthesia and Analgesia ⁽⁴⁾)
- Typical dose: 4.2% sodium bicarbonate infused over 4 hours (JAMA ⁽¹⁾)
- Risk of hypernatremia, hypocalcemia, and metabolic alkalosis; monitor closely (Critical Care Medicine ⁽⁵⁾)
- Evidence quality: moderate for AKI subgroup, low for general use (Cochrane ⁽⁶⁾)

SECTIONS:
[Leave empty - we're using integrated narrative in SUMMARY and KEY POINTS only]`;

    const userPrompt = `Clinical Question: "${query}"

HIGH-QUALITY EVIDENCE (Full abstracts from reputable journals - use ALL details):
${highQualityContext}

INSTRUCTIONS:
Write 3-5 comprehensive, flowing paragraphs for SUMMARY, then create 4-7 bullet points for KEY POINTS.

Think like OpenEvidence - weave together recommendations, evidence, clinical criteria, and practical guidance into natural paragraphs.

CRITICAL REQUIREMENTS FOR SUMMARY:
1. **Journal names inline - THESE BECOME CLICKABLE LINKS**: "The BICAR-ICU trial published in JAMA found..." or "A meta-analysis in Anesthesia and Analgesia showed..." - Use exact journal names from sources provided
2. **Superscript citations - THESE LINK TO ARTICLES**: ⁽¹⁾⁽²⁾ after every claim - readers can click these to read the original article
3. **Specific numbers**: Include mortality rates, NNT, effect sizes, p-values, dosing
4. **Trial names**: BICAR-ICU, SAFE, SMART, etc.
5. **Author names when available**: "Jones et al. in Critical Care Medicine..."
6. **No section headers in SUMMARY**: Just flowing paragraphs with natural transitions

SUMMARY PARAGRAPH STRUCTURE (3-5 paragraphs total):

Paragraph 1: Main recommendation + strongest evidence with journal attribution
Paragraph 2: Clinical context + specific criteria for use + guideline recommendations
Paragraph 3: Dosing/administration + special populations + adverse effects
Paragraph 4 (if needed): Trial methodology + evidence quality + ongoing research
Paragraph 5 (if needed): Practical implementation + clinical pearls

Remember: This is a narrative, not a bulleted list. Make it read like a high-quality review article.

THEN, CREATE KEY POINTS SECTION:

KEY POINTS:
[Create 4-7 bullet points for quick bedside reference]
- Each point should be ONE concise sentence (max 25 words)
- Include specific criteria/numbers when relevant
- End with journal name and citation: "(JAMA ⁽¹⁾)" or "(Lancet ⁽³⁾)"
- Focus on: main recommendation, specific criteria, dosing, monitoring, contraindications

Example:
KEY POINTS:
- Not recommended for general use; no mortality benefit in unselected patients (JAMA ⁽¹⁾)
- Consider if pH ≤7.2 AND AKI stage 2-3; NNT=12 for mortality reduction (Anesthesia and Analgesia ⁽⁴⁾)
- Dose: 4.2% sodium bicarbonate 150mEq IV over 4 hours (JAMA ⁽¹⁾)
- Monitor for hypernatremia, hypocalcemia, metabolic alkalosis (Critical Care Medicine ⁽⁵⁾)
- Evidence quality moderate for AKI subgroup, low for general sepsis (Cochrane ⁽⁶⁾)

Use superscript citations ⁽¹⁾⁽²⁾ throughout both SUMMARY and KEY POINTS. All journal names will become clickable links.`;

    let aiResponse: string;
    try {
      aiResponse = await callGroq(systemPrompt, userPrompt, {
        temperature: 0.2, // Lower for more factual clinical content
        maxTokens: 5500, // Increased for comprehensive narrative synthesis + key points
      });
    } catch (error) {
      // Enhanced error handling with specific error types
      logger.error("[Groq] AI generation failed:", error instanceof Error ? error : new Error(String(error)));

      let errorMessage = "Evidence synthesis temporarily unavailable";
      let keyPointsGuidance: string[] = [];

      // Type-specific error messages
      if (error instanceof Error) {
        const errorStr = error.message.toLowerCase();

        if (errorStr.includes("rate limit") || errorStr.includes("quota") || errorStr.includes("429")) {
          // Groq API rate limit exceeded
          errorMessage =
            "High demand for AI synthesis. Evidence found successfully - please review sources below or retry in a few moments.";
          keyPointsGuidance = [
            "AI synthesis temporarily at capacity",
            `${searchResults.articles.length} high-quality sources found and listed below`,
            "Review source abstracts for detailed evidence",
            "Retry in 30-60 seconds for AI-generated summary",
          ];
          logger.warn("[Groq] Rate limit reached - user can still access source articles");
        } else if (errorStr.includes("timeout") || errorStr.includes("timed out")) {
          // Request timed out
          errorMessage =
            "Synthesis taking longer than expected. Evidence found successfully - please review sources below or try a more specific query.";
          keyPointsGuidance = [
            "Complex query required extended processing time",
            `${searchResults.articles.length} relevant sources found and ready to review`,
            "Try narrowing your query for faster synthesis",
            "All source articles available below with full abstracts",
          ];
          logger.warn("[Groq] Timeout - query may be too broad or complex");
        } else if (errorStr.includes("network") || errorStr.includes("fetch") || errorStr.includes("connection")) {
          // Network/connection error
          errorMessage =
            "Connection issue with AI service. Evidence found successfully - please review sources below or refresh the page.";
          keyPointsGuidance = [
            "Temporary network connectivity issue",
            `${searchResults.articles.length} evidence sources successfully retrieved`,
            "Refresh page or retry in a moment",
            "Source articles and abstracts available below",
          ];
          logger.error("[Groq] Network error - connectivity issue with Groq API");
        } else {
          // Generic API error
          errorMessage =
            "AI synthesis temporarily unavailable. Evidence found successfully - please review the high-quality sources below.";
          keyPointsGuidance = [
            "Temporary issue with AI synthesis service",
            `${searchResults.articles.length} peer-reviewed sources found`,
            "Full abstracts and citations available below",
            "Try again in a few moments for AI-generated summary",
          ];
          logger.error("[Groq] API error:", error.message);
        }
      }

      // Fallback response with sources intact
      aiResponse = `Based on ${
        searchResults.articles.length
      } medical articles:\n\nSUMMARY:\n${errorMessage}\n\nWe found ${
        searchResults.articles.length
      } relevant peer-reviewed sources for "${query}". While AI synthesis is temporarily unavailable, you can review the full abstracts and citations below. Each source includes complete publication details, abstract, and direct links to the original articles.\n\nKEY POINTS:\n${keyPointsGuidance
        .map((point) => `- ${point}`)
        .join("\n")}\n\nSECTIONS:\n## Available Evidence\n${
        searchResults.articles.length
      } high-quality medical sources found. Review full details below.`;
    }

    logger.debug("[Step 3/3] Parsing AI response...");

    // Parse AI response into structured format
    const sections = parseAIResponse(aiResponse);
    const summary = extractSummary(aiResponse);
    const keyPoints = extractKeyPoints(aiResponse);

    // Add quality metadata for transparency
    const qualityMetadata = {
      highQualitySources: highQualitySources.length,
      tier1Journals: highQualitySources.filter((s) => s.tier1Journal).length,
      guidelines: highQualitySources.filter(
        (s) => s.article.type.toLowerCase().includes("guideline") || s.article.title.toLowerCase().includes("guideline")
      ).length,
      metaAnalyses: highQualitySources.filter((s) => s.article.type.toLowerCase().includes("meta-analysis")).length,
    };

    logger.debug(
      `[Quality] ${qualityMetadata.highQualitySources} high-quality sources: ${qualityMetadata.tier1Journals} Tier 1 journals, ${qualityMetadata.guidelines} guidelines, ${qualityMetadata.metaAnalyses} meta-analyses`
    );

    const result = {
      query,
      summary,
      keyPoints, // Add key points for quick reference
      steps: 3,
      isPro: true,
      sections,
      sources: sourcesWithBadges,
      // metadata: qualityMetadata, // Uncomment to expose quality metrics to frontend
    };

    return NextResponse.json(result);
  } catch (error) {
    logger.error("Consensus search error:", error instanceof Error ? error : new Error(String(error)));
    return NextResponse.json(
      {
        error: "Search failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "POST to this endpoint with { query: 'your medical question' }",
    example: {
      query: "berlin criteria for ARDS",
    },
  });
}

/**
 * Extract summary paragraph from AI response
 */
function extractSummary(aiResponse: string): string {
  const summaryMatch = aiResponse.match(/SUMMARY:\s*\n([^\n]+(?:\n(?!SECTIONS:|KEY POINTS:|##)[^\n]+)*)/i);
  if (summaryMatch) {
    return summaryMatch[1].trim();
  }

  // Fallback: use first paragraph
  const firstParagraph = aiResponse.split("\n\n")[0];
  return firstParagraph.replace(/^SUMMARY:\s*/i, "").trim();
}

/**
 * Extract key clinical points from AI response for quick reference
 */
function extractKeyPoints(aiResponse: string): string[] {
  // Look for KEY POINTS section with bullet points
  const keyPointsMatch = aiResponse.match(/KEY POINTS:\s*\n((?:[-•*]\s+[^\n]+\n?)+)/i);

  if (keyPointsMatch) {
    const pointsText = keyPointsMatch[1];
    // Split by bullet points and clean up
    const points = pointsText
      .split(/\n/)
      .map((line) => line.replace(/^[-•*]\s+/, "").trim())
      .filter((line) => line.length > 0);

    return points;
  }

  return [];
}

/**
 * Parse AI response into structured sections
 */
function parseAIResponse(aiResponse: string): Section[] {
  const sections: Section[] = [];

  // Split by ## headers (main sections)
  const sectionRegex = /##\s+([^\n]+)\n([\s\S]+?)(?=##\s+|TABLE:|$)/g;
  let match;

  while ((match = sectionRegex.exec(aiResponse)) !== null) {
    const title = match[1].trim();
    const content = match[2].trim();

    // Parse subsections (### headers)
    const subsections = parseSubsections(content);

    sections.push({
      title,
      content: subsections.length > 0 ? "" : content,
      subsections: subsections.length > 0 ? subsections : undefined,
    });
  }

  // Parse tables
  const tableMatch = aiResponse.match(/TABLE:\s*([^\n]+)\n((?:[^\n]+\|[^\n]+\n)+)/);
  if (tableMatch) {
    const tableTitle = tableMatch[1].trim();
    const tableContent = tableMatch[2].trim();
    const lines = tableContent.split("\n").filter((l) => l.trim());

    if (lines.length >= 2) {
      const headers = lines[0].split("|").map((h) => h.trim());
      const rows = lines.slice(1).map((line) => line.split("|").map((c) => c.trim()));

      sections.push({
        title: tableTitle,
        content: "",
        table: {
          headers,
          rows,
          caption: undefined,
        },
      });
    }
  }

  // If no sections found, create a generic one
  if (sections.length === 0) {
    sections.push({
      title: "Evidence Summary",
      content: aiResponse.replace(/^SUMMARY:\s*\n/i, "").trim(),
    });
  }

  return sections;
}

/**
 * Parse numbered subsections within a section
 */
function parseSubsections(content: string): Array<{ title: string; content: string; citations?: number[] }> {
  const subsections: Array<{ title: string; content: string; citations?: number[] }> = [];

  // Match ### 1. Title or just 1. Title
  const subsectionRegex = /(?:###\s*)?(\d+)\.\s+([^\n]+)\n([\s\S]+?)(?=(?:###\s*)?\d+\.\s+|$)/g;
  let match;

  while ((match = subsectionRegex.exec(content)) !== null) {
    const title = match[2].trim();
    const subsectionContent = match[3].trim();

    // Extract citations
    const citationMatches = subsectionContent.match(/⁽(\d+)⁾/g);
    const citations = citationMatches ? citationMatches.map((c) => parseInt(c.replace(/[⁽⁾]/g, ""))) : undefined;

    subsections.push({
      title,
      content: subsectionContent,
      citations,
    });
  }

  return subsections;
}
