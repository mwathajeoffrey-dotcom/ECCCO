# 🎯 Building an OpenEvidence-Style Medical Search System

## What Makes OpenEvidence Special?

### Key Features:

1. **AI-Powered Consensus** - Synthesizes multiple sources into one answer
2. **Top Journal Focus** - NEJM, Lancet, JAMA, BMJ priority
3. **Clean Citations** - Every claim linked to source
4. **Evidence Grading** - Quality scores for each source
5. **Clinical Bottom Line** - Plain-language summary
6. **Conflicting Evidence** - Shows disagreements transparently

---

## 🚀 Implementation Strategy

### Phase 1: Enhanced Journal Filtering (Week 1)

**Top Medical Journals to Prioritize:**

```typescript
// src/lib/evidence/top-journals.ts

export const TOP_TIER_JOURNALS = {
  // General Medicine (Tier 1)
  NEJM: {
    name: "New England Journal of Medicine",
    issn: ["0028-4793", "1533-4406"],
    impactFactor: 176.079,
    tier: 1,
    specialty: ["general"],
    color: "#1a365d",
  },
  Lancet: {
    name: "The Lancet",
    issn: ["0140-6736", "1474-547X"],
    impactFactor: 168.9,
    tier: 1,
    specialty: ["general"],
    color: "#dc143c",
  },
  JAMA: {
    name: "JAMA",
    issn: ["0098-7484", "1538-3598"],
    impactFactor: 120.7,
    tier: 1,
    specialty: ["general"],
    color: "#2c5282",
  },
  BMJ: {
    name: "BMJ",
    issn: ["0959-8138", "1756-1833"],
    impactFactor: 105.7,
    tier: 1,
    specialty: ["general"],
    color: "#2d3748",
  },

  // Emergency Medicine (Tier 1)
  Annals_Emergency_Medicine: {
    name: "Annals of Emergency Medicine",
    issn: ["0196-0644", "1097-6760"],
    impactFactor: 7.0,
    tier: 1,
    specialty: ["emergency"],
    color: "#c53030",
  },
  Academic_Emergency_Medicine: {
    name: "Academic Emergency Medicine",
    issn: ["1069-6563", "1553-2712"],
    impactFactor: 3.5,
    tier: 1,
    specialty: ["emergency"],
    color: "#9c4221",
  },

  // Critical Care (Tier 1)
  NEJM_Evidence: {
    name: "NEJM Evidence",
    issn: ["2766-5534"],
    impactFactor: 0, // New journal
    tier: 1,
    specialty: ["critical-care"],
    color: "#1a365d",
  },
  Intensive_Care_Medicine: {
    name: "Intensive Care Medicine",
    issn: ["0342-4642", "1432-1238"],
    impactFactor: 36.1,
    tier: 1,
    specialty: ["critical-care"],
    color: "#2c7a7b",
  },
  JAMA_Surgery: {
    name: "JAMA Surgery",
    issn: ["2168-6254"],
    impactFactor: 17.5,
    tier: 1,
    specialty: ["surgery", "trauma"],
    color: "#805ad5",
  },

  // OB/GYN (Tier 1)
  Obstetrics_Gynecology: {
    name: "Obstetrics & Gynecology",
    issn: ["0029-7844", "1873-233X"],
    impactFactor: 7.7,
    tier: 1,
    specialty: ["obgyn"],
    color: "#d53f8c",
  },
  AJOG: {
    name: "American Journal of Obstetrics and Gynecology",
    issn: ["0002-9378", "1097-6868"],
    impactFactor: 9.8,
    tier: 1,
    specialty: ["obgyn"],
    color: "#ed64a6",
  },

  // Pediatrics (Tier 1)
  Pediatrics: {
    name: "Pediatrics",
    issn: ["0031-4005", "1098-4275"],
    impactFactor: 8.0,
    tier: 1,
    specialty: ["pediatrics"],
    color: "#38b2ac",
  },
  JAMA_Pediatrics: {
    name: "JAMA Pediatrics",
    issn: ["2168-6203", "2168-6211"],
    impactFactor: 23.5,
    tier: 1,
    specialty: ["pediatrics"],
    color: "#4299e1",
  },
};

export const TIER_2_JOURNALS = {
  // Add 20-30 more high-quality journals
  Chest: {
    name: "Chest",
    issn: ["0012-3692", "1931-3543"],
    impactFactor: 11.6,
    tier: 2,
    specialty: ["pulmonary", "critical-care"],
    color: "#718096",
  },
  // ... more
};

export function getJournalTier(journalName: string): number {
  const allJournals = { ...TOP_TIER_JOURNALS, ...TIER_2_JOURNALS };

  for (const [key, journal] of Object.entries(allJournals)) {
    if (journalName.toLowerCase().includes(journal.name.toLowerCase())) {
      return journal.tier;
    }
  }

  return 3; // Unknown journal
}

export function isTopJournal(journalName: string): boolean {
  return getJournalTier(journalName) === 1;
}

export function getJournalsBySpecialty(specialty: string) {
  const allJournals = { ...TOP_TIER_JOURNALS, ...TIER_2_JOURNALS };

  return Object.values(allJournals).filter(
    (j) => j.specialty.includes(specialty) || j.specialty.includes("general")
  );
}
```

---

### Phase 2: AI-Powered Consensus (Week 2)

**Create the Consensus Engine:**

```typescript
// src/lib/ai/consensus-engine.ts

import OpenAI from "openai";
import type { UnifiedArticle } from "../evidence/unified-search";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ConsensusResult {
  query: string;
  answer: string; // Main clinical answer
  consensus: "strong" | "moderate" | "weak" | "conflicting";
  confidenceScore: number; // 0-100
  supportingEvidence: EvidencePoint[];
  conflictingEvidence: EvidencePoint[];
  clinicalBottomLine: string;
  limitations: string[];
  lastUpdated: string;
}

export interface EvidencePoint {
  claim: string;
  source: {
    title: string;
    journal: string;
    year: string;
    doi?: string;
    quality: "high" | "medium" | "low";
  };
  evidenceLevel: string; // IA, IB, IIA, etc.
  quote?: string; // Direct quote from source
}

/**
 * Generate OpenEvidence-style consensus from multiple articles
 */
export async function generateConsensus(
  query: string,
  articles: UnifiedArticle[]
): Promise<ConsensusResult> {
  // Filter for high-quality sources only
  const topArticles = articles
    .filter((a) => a.citationCount > 10 || isTopJournal(a.journal))
    .sort((a, b) => {
      const scoreA = getQualityScore(a);
      const scoreB = getQualityScore(b);
      return scoreB - scoreA;
    })
    .slice(0, 15); // Top 15 highest quality articles

  // Prepare evidence for AI
  const evidenceContext = topArticles
    .map(
      (article, i) => `
[Source ${i + 1}]
Title: ${article.title}
Journal: ${article.journal} (${article.published})
Citations: ${article.citationCount}
DOI: ${article.doi || "N/A"}
Abstract: ${article.abstract?.slice(0, 500) || "Not available"}
`
    )
    .join("\n---\n");

  const systemPrompt = `You are an expert emergency medicine physician synthesizing clinical evidence.

Instructions:
1. Analyze ALL provided sources critically
2. Prioritize high-quality journals (NEJM, Lancet, JAMA, BMJ)
3. Identify consensus vs. conflicting findings
4. Assign evidence levels (IA, IB, IIA, IIB, III)
5. Provide direct quotes to support claims
6. Be transparent about limitations and conflicts
7. Use clear, actionable clinical language

Return a JSON object with this structure:
{
  "answer": "Direct answer to the clinical question",
  "consensus": "strong|moderate|weak|conflicting",
  "confidenceScore": 0-100,
  "supportingEvidence": [
    {
      "claim": "Specific clinical claim",
      "source": { "title": "...", "journal": "...", "year": "...", "doi": "...", "quality": "high|medium|low" },
      "evidenceLevel": "IA|IB|IIA|IIB|III",
      "quote": "Direct quote from abstract/results"
    }
  ],
  "conflictingEvidence": [ /* same structure */ ],
  "clinicalBottomLine": "One-sentence clinical recommendation",
  "limitations": ["List of study limitations or evidence gaps"]
}`;

  const userPrompt = `Clinical Question: ${query}

Available Evidence:
${evidenceContext}

Please synthesize this evidence and provide a comprehensive clinical answer.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3, // Lower temperature for more consistent medical advice
      max_tokens: 2000,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      query,
      ...result,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Consensus generation error:", error);
    throw new Error("Failed to generate evidence consensus");
  }
}

function getQualityScore(article: UnifiedArticle): number {
  let score = 0;

  // Journal quality (0-50 points)
  if (isTopJournal(article.journal)) {
    score += 50;
  } else if (getJournalTier(article.journal) === 2) {
    score += 30;
  } else {
    score += 10;
  }

  // Citation count (0-30 points)
  if (article.citationCount > 1000) score += 30;
  else if (article.citationCount > 500) score += 25;
  else if (article.citationCount > 100) score += 20;
  else if (article.citationCount > 50) score += 15;
  else if (article.citationCount > 10) score += 10;
  else score += 5;

  // Recency (0-20 points)
  const year = parseInt(article.published.split("-")[0]);
  const age = new Date().getFullYear() - year;
  if (age <= 1) score += 20;
  else if (age <= 3) score += 15;
  else if (age <= 5) score += 10;
  else if (age <= 10) score += 5;

  return score;
}
```

---

### Phase 3: OpenEvidence-Style UI (Week 3)

```typescript
// src/app/evidence-ai/page.tsx

"use client";

import { useState } from "react";
import {
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ExternalLink,
  Copy,
  Share2,
} from "lucide-react";
import {
  generateConsensus,
  type ConsensusResult,
} from "@/lib/ai/consensus-engine";
import { searchAllSources } from "@/lib/evidence/unified-search";

export default function EvidenceAIPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [consensus, setConsensus] = useState<ConsensusResult | null>(null);
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      // Step 1: Search all sources
      const searchResults = await searchAllSources({
        query,
        maxResults: 50,
        filters: {
          hasAbstract: true,
          minCitations: 5,
        },
        sort: "relevance",
      });

      // Step 2: Generate AI consensus
      const result = await generateConsensus(query, searchResults.articles);
      setConsensus(result);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyCitation = (evidence: any, format: "AMA" | "APA" = "AMA") => {
    let citation = "";

    if (format === "AMA") {
      citation = `${evidence.source.title}. ${evidence.source.journal}. ${
        evidence.source.year
      }. ${evidence.source.doi ? `doi:${evidence.source.doi}` : ""}`;
    }

    navigator.clipboard.writeText(citation);
    setCopiedCitation(evidence.source.doi);
    setTimeout(() => setCopiedCitation(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header - OpenEvidence Style */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Sparkles className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-5xl font-black">Evidence AI</h1>
              <p className="text-blue-100 text-lg mt-2">
                Ask any clinical question. Get AI-synthesized answers from top
                journals.
              </p>
            </div>
          </div>

          {/* Search Bar - Clean and Prominent */}
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="e.g., What is the best fluid strategy for septic shock?"
              className="w-full pl-16 pr-6 py-5 rounded-2xl text-gray-900 text-lg shadow-2xl focus:ring-4 focus:ring-blue-300 outline-none"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </div>
              ) : (
                "Search Evidence"
              )}
            </button>
          </div>

          {/* Example Queries */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="text-sm text-blue-100">Try:</span>
            {[
              "TXA in trauma hemorrhage",
              "Restrictive vs liberal fluids in sepsis",
              "Calcium for hyperkalemia with ECG changes",
            ].map((example) => (
              <button
                key={example}
                onClick={() => setQuery(example)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-sm transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results - OpenEvidence Style */}
      {consensus && (
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Consensus Badge */}
          <div className="flex items-center gap-3 mb-8">
            {consensus.consensus === "strong" && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                Strong Consensus ({consensus.confidenceScore}% confidence)
              </div>
            )}
            {consensus.consensus === "moderate" && (
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
                <Info className="w-5 h-5" />
                Moderate Consensus ({consensus.confidenceScore}% confidence)
              </div>
            )}
            {consensus.consensus === "conflicting" && (
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold">
                <AlertTriangle className="w-5 h-5" />
                Conflicting Evidence ({consensus.confidenceScore}% confidence)
              </div>
            )}
          </div>

          {/* Main Answer - OpenEvidence Style Box */}
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 p-10 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Clinical Answer
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {consensus.answer}
                </p>
              </div>
            </div>

            {/* Clinical Bottom Line */}
            <div className="mt-8 pt-8 border-t-2 border-gray-100">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-3">
                  ⚡ Clinical Bottom Line
                </h3>
                <p className="text-xl font-semibold text-gray-900">
                  {consensus.clinicalBottomLine}
                </p>
              </div>
            </div>
          </div>

          {/* Supporting Evidence - Clean Citation Cards */}
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
              Supporting Evidence
            </h2>

            {consensus.supportingEvidence.map((evidence, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
              >
                {/* Evidence Level Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      evidence.evidenceLevel.startsWith("I")
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    Level {evidence.evidenceLevel} Evidence
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      evidence.source.quality === "high"
                        ? "bg-purple-100 text-purple-800"
                        : evidence.source.quality === "medium"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {evidence.source.quality.toUpperCase()} QUALITY
                  </div>
                </div>

                {/* Claim */}
                <p className="text-lg font-semibold text-gray-900 mb-3">
                  {evidence.claim}
                </p>

                {/* Quote */}
                {evidence.quote && (
                  <blockquote className="border-l-4 border-blue-400 pl-4 py-2 italic text-gray-700 bg-blue-50 rounded-r-lg mb-4">
                    "{evidence.quote}"
                  </blockquote>
                )}

                {/* Citation */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {evidence.source.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {evidence.source.journal} • {evidence.source.year}
                      {evidence.source.doi && ` • DOI: ${evidence.source.doi}`}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyCitation(evidence)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copy citation"
                    >
                      <Copy
                        className={`w-4 h-4 ${
                          copiedCitation === evidence.source.doi
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                    {evidence.source.doi && (
                      <a
                        href={`https://doi.org/${evidence.source.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View full article"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-600" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Conflicting Evidence (if any) */}
          {consensus.conflictingEvidence.length > 0 && (
            <div className="space-y-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full" />
                Conflicting Evidence
              </h2>

              {consensus.conflictingEvidence.map((evidence, index) => (
                <div
                  key={index}
                  className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6"
                >
                  {/* Same structure as supporting evidence but with warning styling */}
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                    <p className="text-lg font-semibold text-gray-900">
                      {evidence.claim}
                    </p>
                  </div>

                  {evidence.quote && (
                    <blockquote className="border-l-4 border-yellow-400 pl-4 py-2 italic text-gray-700 bg-white rounded-r-lg mb-4 ml-8">
                      "{evidence.quote}"
                    </blockquote>
                  )}

                  <div className="ml-8 pt-4 border-t border-yellow-200">
                    <p className="font-semibold text-gray-900">
                      {evidence.source.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {evidence.source.journal} • {evidence.source.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Limitations */}
          {consensus.limitations.length > 0 && (
            <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-gray-600" />
                Limitations & Considerations
              </h3>
              <ul className="space-y-2">
                {consensus.limitations.map((limitation, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="text-gray-400 mt-1">•</span>
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Last Updated */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Evidence synthesized on{" "}
            {new Date(consensus.lastUpdated).toLocaleDateString()}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!consensus && !loading && (
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl mx-auto mb-8 flex items-center justify-center">
            <Search className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ask Your Clinical Question
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get AI-powered answers synthesized from NEJM, Lancet, JAMA, BMJ, and
            other top medical journals.
          </p>
        </div>
      )}
    </div>
  );
}
```

---

### Phase 4: API Routes (Week 3)

```typescript
// src/app/api/evidence/consensus/route.ts

import { NextRequest, NextResponse } from "next/server";
import { generateConsensus } from "@/lib/ai/consensus-engine";
import { searchAllSources } from "@/lib/evidence/unified-search";

export async function POST(request: NextRequest) {
  try {
    const { query, filters } = await request.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // Search for evidence
    const searchResults = await searchAllSources({
      query,
      maxResults: 50,
      filters: {
        hasAbstract: true,
        minCitations: filters?.minCitations || 5,
        ...filters,
      },
      sort: "relevance",
    });

    // Generate consensus
    const consensus = await generateConsensus(query, searchResults.articles);

    return NextResponse.json({
      success: true,
      consensus,
      articlesAnalyzed: searchResults.articles.length,
    });
  } catch (error) {
    console.error("Consensus API error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate consensus",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
```

---

## 🎯 Key Differences from Your Current System

| Feature       | Current             | OpenEvidence-Style       |
| ------------- | ------------------- | ------------------------ |
| **Search**    | List of articles    | AI-synthesized answer    |
| **Results**   | 30+ separate papers | 1 consensus + citations  |
| **Quality**   | All sources equal   | Top journals prioritized |
| **Citations** | Basic links         | Inline quotes + levels   |
| **Conflicts** | Not shown           | Explicitly highlighted   |
| **UX**        | Academic            | Clinical & actionable    |

---

## 🚀 Implementation Timeline

**Week 1:** Top journal filtering + quality scoring
**Week 2:** AI consensus engine (OpenAI integration)
**Week 3:** UI/UX redesign (OpenEvidence-style)
**Week 4:** Testing + polish

**Want me to start implementing this? Which week should we tackle first?** 🎯
