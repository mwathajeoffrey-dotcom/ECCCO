"use client";

import { useState } from "react";
import { Search, Sparkles, Loader2, AlertCircle, CheckCircle2, BookOpen } from "lucide-react";
import ClinicalSynthesisView from "@/components/evidence/ClinicalSynthesisView";
import type { ClinicalSynthesis } from "@/lib/evidence/clinical-synthesis-engine";

interface ErrorWithSuggestions {
  error: string;
  message?: string;
  suggestions?: string[];
  tips?: string[];
  expandedTerms?: string[];
  articlesFound?: number;
  articles?: any[]; // Articles that were found but didn't meet quality threshold
}

export default function EvidenceSearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [synthesis, setSynthesis] = useState<ClinicalSynthesis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<ErrorWithSuggestions | null>(null);
  const [useAI, setUseAI] = useState(true);

  const suggestedQueries = [
    "treatment for uncomplicated malaria",
    "management of septic shock",
    "diagnosis of acute appendicitis",
    "antibiotic choice for pneumonia",
    "treatment of acute coronary syndrome",
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setErrorDetails(null);
    setSynthesis(null);

    try {
      const response = await fetch("/api/evidence/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query.trim(),
          useAI,
          minQualityScore: 50,
          maxArticles: 15,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if we have suggestions from the server
        if (data.suggestions || data.tips) {
          setErrorDetails(data);
          setError(data.message || data.error || "Search failed");
        } else {
          throw new Error(data.error || "Failed to generate synthesis");
        }
        return;
      }

      // Check if we got an error response with articles (quality threshold not met)
      if (data.error && data.articles) {
        setErrorDetails(data);
        setError(data.message || data.error);
        return;
      }

      console.log("✅ Synthesis received:", data);
      setSynthesis(data);
    } catch (err) {
      console.error("Synthesis error:", err);
      setError(err instanceof Error ? err.message : "An error occurred while searching");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedQuery = (suggested: string) => {
    setQuery(suggested);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Clinical Evidence Search</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-3xl">
            Search across 35+ million medical articles from PubMed, CrossRef, Europe PMC, and Semantic Scholar. Get
            instant evidence synthesis with quality scoring and journal tier classification.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Box */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter clinical question (e.g., treatment for septic shock)"
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Search
                </>
              )}
            </button>
          </div>

          {/* AI Toggle */}
          <div className="flex items-center gap-3 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useAI}
                onChange={(e) => setUseAI(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-700">
                Enable AI Synthesis (requires Ollama - falls back to structured summary if unavailable)
              </span>
            </label>
          </div>

          {/* Suggested Queries */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 font-medium">Suggested queries:</span>
            {suggestedQueries.map((suggested) => (
              <button
                key={suggested}
                onClick={() => handleSuggestedQuery(suggested)}
                disabled={loading}
                className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors disabled:opacity-50"
              >
                {suggested}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message with Suggestions */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 mb-1">Search Error</h3>
                <p className="text-red-700 mb-3">{error}</p>

                {/* Search Suggestions */}
                {errorDetails?.suggestions && errorDetails.suggestions.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <p className="text-sm font-medium text-red-800">Try these related searches:</p>
                    <div className="flex flex-wrap gap-2">
                      {errorDetails.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setQuery(suggestion);
                            setError(null);
                            setErrorDetails(null);
                          }}
                          className="px-4 py-2 bg-white text-red-700 rounded-lg text-sm hover:bg-red-100 transition-colors border border-red-200 font-medium"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Tips */}
                {errorDetails?.tips && errorDetails.tips.length > 0 && (
                  <div className="mt-4 p-4 bg-white/50 rounded-lg">
                    <p className="text-sm font-medium text-red-800 mb-2">💡 Search Tips:</p>
                    <ul className="space-y-1 text-sm text-red-700">
                      {errorDetails.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-red-400 mt-0.5">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Articles Found Info */}
                {errorDetails?.articlesFound !== undefined && errorDetails.articlesFound > 0 && (
                  <div className="mt-3 text-sm text-red-600">
                    📊 Found {errorDetails.articlesFound} article{errorDetails.articlesFound !== 1 ? 's' : ''}, but not enough met quality standards for clinical
                    use.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Display articles that were found but didn't meet strict quality threshold */}
        {errorDetails?.articles && errorDetails.articles.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">
                  Articles Found ({errorDetails.articles.length})
                </h3>
                <p className="text-sm text-amber-800">
                  These articles were found but don't meet our strict quality thresholds (minimum 3 high-quality
                  articles from Tier 1-2 journals). Review them for reference, but be aware they may not represent
                  strong clinical consensus.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {errorDetails.articles.map((article: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-4 border border-amber-200 hover:border-amber-300 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 mb-2 leading-snug">{article.title || "Untitled"}</h4>

                  <p className="text-sm text-gray-600 mb-2">
                    {article.authors?.slice(0, 3).join(", ")}
                    {article.authors?.length > 3 && " et al."} •{" "}
                    <span className="font-medium">{article.journal || "Unknown Journal"}</span> •{" "}
                    {article.published?.split("-")[0] || "Unknown Year"}
                  </p>

                  {article.abstract && (
                    <p className="text-sm text-gray-700 line-clamp-2 mb-2">{article.abstract}</p>
                  )}

                  <div className="flex items-center gap-2 flex-wrap">
                    {article.citationCount !== undefined && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {article.citationCount} citations
                      </span>
                    )}

                    {article.doi && (
                      <a
                        href={`https://doi.org/${article.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors"
                      >
                        View Article →
                      </a>
                    )}

                    {!article.doi && article.url && (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors"
                      >
                        View Article →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-amber-100 rounded-lg">
              <p className="text-xs text-amber-900">
                <strong>⚠️ Patient Safety Notice:</strong> These results don't meet our strict evidence-based
                medicine standards (minimum 3 articles, quality score ≥50, Tier 1-2 journals, last 10 years). For
                clinical decisions, consider broadening your search or consulting specialized databases.
              </p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {synthesis && !loading && (
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-800 mb-1">
                  {synthesis.metadata.usedAI ? "✓ AI Synthesis Generated" : "✓ Structured Summary Generated"}
                </h3>
                <p className="text-green-700">
                  Analyzed {synthesis.metadata.articlesAnalyzed} high-quality articles from top medical journals
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {synthesis && (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Debug: Synthesis has {synthesis.sections.length} sections and {synthesis.references.length} references
            </div>
            <ClinicalSynthesisView synthesis={synthesis} />
          </>
        )}

        {/* Empty State */}
        {!synthesis && !loading && !error && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Search Medical Literature</h3>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Enter a clinical question to search across millions of peer-reviewed articles. Get instant evidence
              synthesis with quality scores, journal badges, and clickable references.
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            What makes this search different?
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div>
              <strong className="block mb-1">🎯 Quality Filtering</strong>
              Only shows high-quality evidence from peer-reviewed journals with progressive filtering
            </div>
            <div>
              <strong className="block mb-1">🏅 Journal Tiers</strong>
              Color-coded badges: 🔵 Tier 1 (NEJM, Lancet), 🔴 Tier 2 (specialty), 🟢 Tier 3 (other)
            </div>
            <div>
              <strong className="block mb-1">🔗 Clickable Sources</strong>
              Click any journal badge to open the original article (DOI/PubMed links)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
