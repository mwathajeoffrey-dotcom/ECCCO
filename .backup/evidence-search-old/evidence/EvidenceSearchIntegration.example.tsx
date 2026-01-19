/**
 * Evidence Search Integration Example
 *
 * This shows how to integrate the new AI synthesis feature
 * into your existing evidence-search page.
 */

"use client";

import { useState } from "react";
import ClinicalSynthesisView from "@/components/evidence/ClinicalSynthesisView";
import type { ClinicalSynthesis } from "@/lib/evidence/clinical-synthesis-engine";

export default function EvidenceSearchWithSynthesis() {
  const [query, setQuery] = useState("");
  const [synthesis, setSynthesis] = useState<ClinicalSynthesis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useSynthesis, setUseSynthesis] = useState(true);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      if (useSynthesis) {
        // NEW: Call synthesis API
        const response = await fetch("/api/evidence/synthesize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
            useAI: true,
            minQualityScore: 75,
            maxArticles: 15,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to generate synthesis");
        }

        const data = await response.json();
        setSynthesis(data);
      } else {
        // EXISTING: Your current article list search
        // ... your existing search logic here
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Clinical Evidence Search</h1>

        <div className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Enter clinical question (e.g., 'treatment for uncomplicated malaria')"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Toggle between synthesis and article list */}
        <div className="mt-4 flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useSynthesis}
              onChange={(e) => setUseSynthesis(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700">Use AI Synthesis (recommended)</span>
          </label>

          {useSynthesis && (
            <div className="flex items-center gap-2 text-sm text-purple-600">
              <span className="inline-block w-2 h-2 bg-purple-600 rounded-full"></span>
              <span>Powered by Meditron</span>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-800">
            {useSynthesis ? "Searching top journals and generating clinical synthesis..." : "Searching articles..."}
          </p>
        </div>
      )}

      {/* Results Display */}
      {synthesis && !loading && useSynthesis && <ClinicalSynthesisView synthesis={synthesis} />}

      {!useSynthesis && !loading && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* YOUR EXISTING ARTICLE LIST COMPONENT HERE */}
          <p className="text-gray-600">Article list view (your existing code)</p>
        </div>
      )}
    </div>
  );
}
