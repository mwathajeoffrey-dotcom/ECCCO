/**
 * API Route: Evidence Synthesis
 * POST /api/evidence/synthesize
 *
 * Generates clinical evidence synthesis with AI-powered summaries
 */

import { NextRequest, NextResponse } from "next/server";
import { generateClinicalSynthesis } from "@/lib/evidence/clinical-synthesis-engine";
import { searchStrategicEvidence } from "@/lib/evidence/unified-search";
import { getCachedSynthesis, cacheSynthesis } from "@/lib/evidence/cache";
import { generateDecisionSupport } from "@/lib/evidence/decision-support";
import { PatientContext } from "@/lib/evidence/patient-context";

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const {
      query,
      filters = {},
      useAI = true,
      minQualityScore = 50, // Lower default for better results
      maxArticles = 15,
      skipCache = false, // Allow bypassing cache for testing
      patientContext, // NEW: Patient-specific context
      includeDecisionSupport = false, // NEW: Generate clinical protocol
    } = body;

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return NextResponse.json({ error: "Query is required and must be a non-empty string" }, { status: 400 });
    }

    // Build cache key including patient context if provided
    const cacheKey = patientContext ? `${query}:${JSON.stringify(patientContext)}` : query;

    // Step 1: Check cache first (unless skipCache is true)
    if (!skipCache) {
      const cached = await getCachedSynthesis(cacheKey);
      if (cached) {
        const duration = Date.now() - startTime;
        console.log(`[Evidence Synthesis] Returned cached result in ${duration}ms ⚡`);
        return NextResponse.json(
          {
            ...cached,
            _meta: {
              ...cached._meta,
              cached: true,
              cacheAge: Date.now() - cached._meta?.generatedAt,
            },
          },
          { status: 200 }
        );
      }
    }

    // Step 2: STRATEGIC SEARCH (Guidelines → Meta-analyses → RCTs)
    console.log(`[Evidence Synthesis] Searching for: "${query}"${patientContext ? " (patient-specific)" : ""}`);
    const searchResponse = await searchStrategicEvidence(query, maxArticles * 2); // Get 2x for filtering
    const searchResults = searchResponse.articles || [];

    if (!searchResults || searchResults.length === 0) {
      return NextResponse.json({ error: "No articles found matching your query" }, { status: 404 });
    }

    console.log(`[Evidence Synthesis] Found ${searchResults.length} articles, generating synthesis...`);

    // Step 3: Generate clinical synthesis
    const synthesis = await generateClinicalSynthesis(query, searchResults, {
      minQualityScore,
      useAI,
      maxArticles,
    });

    console.log(
      `[Evidence Synthesis] Generated synthesis with ${synthesis.sections.length} sections, ${synthesis.references.length} references`
    );

    // Step 4: Generate clinical decision support if requested
    let decisionTree = undefined;
    if (includeDecisionSupport) {
      console.log("[Decision Support] Generating clinical protocol...");
      decisionTree = await generateDecisionSupport(synthesis, patientContext as PatientContext);
      console.log(`[Decision Support] Generated protocol with ${decisionTree.steps.length} steps`);
    }

    // Step 5: Cache the result for future requests
    const duration = Date.now() - startTime;
    const synthesisWithMeta = {
      ...synthesis,
      decisionSupport: decisionTree,
      patientContext: patientContext,
      _meta: {
        cached: false,
        generatedAt: Date.now(),
        durationMs: duration,
      },
    };

    // Cache asynchronously (don't wait) - use custom cache key with patient context
    cacheSynthesis(cacheKey, synthesisWithMeta).catch((err) =>
      console.error("[Cache] Failed to cache synthesis:", err)
    );

    console.log(`[Evidence Synthesis] Complete in ${duration}ms`);

    return NextResponse.json(synthesisWithMeta, { status: 200 });
  } catch (error: any) {
    console.error("[Evidence Synthesis Error]", error);

    // Handle specific error types
    if (error.message?.includes("Insufficient high-quality evidence")) {
      return NextResponse.json(
        {
          error: "Not enough high-quality evidence found",
          details: error.message,
          suggestion: "Try broadening your search or lowering quality requirements",
        },
        { status: 404 }
      );
    }

    if (error.message?.includes("Meditron") || error.message?.includes("Ollama")) {
      return NextResponse.json(
        {
          error: "AI synthesis unavailable",
          details: error.message,
          suggestion: "Structured summary generated instead. To enable AI synthesis, install Ollama and Meditron.",
          fallback: true,
        },
        { status: 200 } // Still return 200 because fallback works
      );
    }

    return NextResponse.json(
      {
        error: "Failed to generate synthesis",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Evidence Synthesis API",
    endpoint: "POST /api/evidence/synthesize",
    parameters: {
      query: "string (required) - Clinical question to search for",
      filters: "object (optional) - Search filters (specialty, dateRange, etc.)",
      useAI: "boolean (optional) - Use Meditron AI for synthesis (default: true)",
      minQualityScore: "number (optional) - Minimum quality score 0-100 (default: 75)",
      maxArticles: "number (optional) - Maximum articles to analyze (default: 15)",
    },
    example: {
      query: "What is the treatment for uncomplicated malaria?",
      useAI: true,
      minQualityScore: 75,
      maxArticles: 15,
    },
    response: {
      query: "string",
      sections: [
        {
          heading: "string",
          paragraphs: [
            {
              text: "string",
              citations: [
                {
                  position: "number",
                  journalBadge: "string",
                  count: "number",
                  referenceIds: ["string"],
                  color: "string",
                },
              ],
            },
          ],
        },
      ],
      references: [
        {
          id: "string",
          title: "string",
          authors: ["string"],
          journal: "string",
          year: "number",
          doi: "string",
          pmid: "string",
          url: "string",
          qualityScore: "number",
          evidenceLevel: "string",
        },
      ],
      metadata: {
        confidenceScore: "number",
        articlesAnalyzed: "number",
        tier1Count: "number",
        tier2Count: "number",
        avgQualityScore: "number",
        lastUpdated: "string",
        usedAI: "boolean",
      },
    },
  });
}
