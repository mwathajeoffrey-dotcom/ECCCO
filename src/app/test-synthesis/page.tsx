"use client";
import { logger } from '@/lib/logger';

import { useState } from "react";
import ClinicalSynthesisView from "@/components/evidence/ClinicalSynthesisView";
import type { ClinicalSynthesis } from "@/lib/evidence/clinical-synthesis-engine";
import { Sparkles, AlertCircle, Loader2 } from "lucide-react";

export default function TestSynthesisPage() {
  const [query, setQuery] = useState("");
  const [synthesis, setSynthesis] = useState<ClinicalSynthesis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useAI, setUseAI] = useState(false); // Start with AI disabled

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSynthesis(null);

    try {
      logger.debug("Searching for", { value: query });

      const response = await fetch("/api/evidence/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          useAI,
          minQualityScore: 75,
          maxArticles: 15,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate synthesis");
      }

      const data = await response.json();
      logger.debug("Synthesis received", { value: data });
      setSynthesis(data);
    } catch (err: any) {
      logger.error("Search error:", err instanceof Error ? err : new Error(String(err)));
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Suggested queries
  const suggestions = [
    "treatment for uncomplicated malaria",
    "management of septic shock",
    "diagnosis of acute appendicitis",
    "antibiotic choice for pneumonia",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Clinical Evidence Synthesis Test</h1>
              <p className="text-gray-600 mt-1">OpenEvidence-quality results • 100% free • Top journals only</p>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Testing Mode Active</p>
                <p>
                  {useAI ? (
                    <span className="text-blue-800">
                      <strong>AI Mode:</strong> Using Meditron for clinical synthesis (requires Ollama running). If
                      Ollama is not available, will auto-fallback to structured summary.
                    </span>
                  ) : (
                    <span className="text-green-800">
                      <strong>Structured Mode:</strong> Using rule-based summaries (no Ollama needed). Still provides
                      high-quality, journal-filtered results!
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Search Input */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Enter clinical question (e.g., 'treatment for uncomplicated malaria')"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
              />

              <button
                onClick={handleSearch}
                disabled={loading || !query.trim()}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed font-medium transition-all shadow-lg hover:shadow-xl disabled:shadow-none flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Search"
                )}
              </button>
            </div>

            {/* AI Toggle */}
            <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useAI}
                  onChange={(e) => setUseAI(e.target.checked)}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                />
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Enable AI Synthesis</span>
                </div>
              </label>

              <span className="text-sm text-gray-600">
                {useAI ? "(Requires Ollama + Meditron)" : "(Structured summaries only)"}
              </span>
            </div>

            {/* Suggested Queries */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Try:</span>
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(suggestion)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4 shadow-md">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-900">Error</p>
                <p className="text-red-800 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white border-2 border-purple-200 rounded-lg p-12 text-center shadow-lg">
            <Loader2 className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-spin" />
            <p className="text-lg text-gray-900 font-medium">
              {useAI
                ? "Searching top journals and generating AI clinical synthesis..."
                : "Searching top journals and generating structured summary..."}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {useAI ? "This may take 15-20 seconds (search + AI generation)" : "This should complete in 5-10 seconds"}
            </p>
          </div>
        )}

        {/* Results Display */}
        {synthesis && !loading && (
          <div className="space-y-4">
            {/* Success Banner */}
            <div
              className={`border-l-4 rounded-r-lg p-4 shadow-md ${
                synthesis.metadata.usedAI ? "bg-purple-50 border-purple-500" : "bg-green-50 border-green-500"
              }`}
            >
              <div className="flex items-start gap-3">
                <Sparkles
                  className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    synthesis.metadata.usedAI ? "text-purple-600" : "text-green-600"
                  }`}
                />
                <div>
                  <p className={`font-medium ${synthesis.metadata.usedAI ? "text-purple-900" : "text-green-900"}`}>
                    {synthesis.metadata.usedAI ? "✨ AI Synthesis Generated" : "✓ Structured Summary Generated"}
                  </p>
                  <p className={`text-sm mt-1 ${synthesis.metadata.usedAI ? "text-purple-800" : "text-green-800"}`}>
                    Analyzed {synthesis.metadata.articlesAnalyzed} articles from top journals (
                    {synthesis.metadata.tier1Count} tier-1 sources) • Average quality:{" "}
                    {synthesis.metadata.avgQualityScore}/100
                  </p>
                </div>
              </div>
            </div>

            {/* Synthesis Display */}
            <ClinicalSynthesisView synthesis={synthesis} />
          </div>
        )}

        {/* No Results Yet */}
        {!synthesis && !loading && !error && (
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Enter a clinical question above to get started</p>
            <p className="text-gray-500 text-sm mt-2">Try one of the suggested queries or enter your own</p>
          </div>
        )}
      </div>
    </div>
  );
}
