"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, BookOpen, ExternalLink, Clock, Trash2, X, Menu } from "lucide-react";

interface SearchResult {
  query: string;
  summary: string;
  keyPoints?: string[]; // New: Quick reference bullet points
  sections: Section[];
  sources: Source[];
  steps: number;
  isPro: boolean;
}

interface Section {
  title: string;
  content: string;
  subsections?: Subsection[];
  table?: Table;
}

interface Subsection {
  title: string;
  content: string;
  citations?: number[];
}

interface Table {
  headers: string[];
  rows: string[][];
  caption?: string;
}

interface Source {
  id: number;
  title: string;
  year: number;
  citations: number;
  authors: string;
  journal: string;
  badges: string[];
  url?: string;
}

interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

export default function EvidenceSearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load search history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("evidenceSearchHistory");
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load search history:", e);
      }
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem("evidenceSearchHistory", JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  const addToHistory = (searchQuery: string) => {
    const newItem: SearchHistoryItem = {
      query: searchQuery,
      timestamp: Date.now(),
    };

    // Remove duplicates and add to front, keep last 20
    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item.query.toLowerCase() !== searchQuery.toLowerCase());
      return [newItem, ...filtered].slice(0, 20);
    });
  };

  const removeFromHistory = (timestamp: number) => {
    setSearchHistory((prev) => prev.filter((item) => item.timestamp !== timestamp));
  };

  const clearAllHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("evidenceSearchHistory");
  };

  const handleSearch = async (searchQuery?: string) => {
    const queryToSearch = searchQuery || query.trim();
    if (!queryToSearch) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setQuery(queryToSearch);

    // Add to history
    addToHistory(queryToSearch);

    try {
      const response = await fetch("/api/evidence/consensus-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryToSearch }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Search failed" }));
        throw new Error(errorData.message || "Search failed");
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex">
      {/* Left Sidebar - Search History */}
      <div
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } transition-all duration-300 border-r border-slate-200 bg-white flex-shrink-0 overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-600" />
              <h2 className="font-semibold text-slate-900">Recent Searches</h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 hover:bg-slate-200 rounded-md transition-colors lg:hidden"
              title="Close sidebar"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>
          </div>

          {/* Search History List */}
          <div className="flex-1 overflow-y-auto">
            {searchHistory.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-sm">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No search history yet</p>
                <p className="text-xs mt-1">Your searches will appear here</p>
              </div>
            ) : (
              <div className="py-2">
                {searchHistory.map((item) => (
                  <div
                    key={item.timestamp}
                    className="group px-4 py-3 hover:bg-slate-50 border-b border-slate-100 cursor-pointer transition-colors relative"
                    onClick={() => handleSearch(item.query)}
                  >
                    <div className="pr-6">
                      <p className="text-sm text-slate-800 line-clamp-2 leading-snug">{item.query}</p>
                      <p className="text-xs text-slate-500 mt-1">{formatTimeAgo(item.timestamp)}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromHistory(item.timestamp);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                      title="Remove from history"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clear All Button */}
          {searchHistory.length > 0 && (
            <div className="p-3 border-t border-slate-200 bg-slate-50">
              <button
                onClick={clearAllHistory}
                className="w-full py-2 px-3 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All History
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Mobile Sidebar Toggle */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-4 left-4 z-10 p-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all lg:hidden"
            title="Open search history"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
        )}

        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-slate-900">Evidence Search</h1>
            </div>
            <p className="text-slate-600 text-lg">AI-powered clinical evidence synthesis</p>
          </div>

          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Ask a clinical question..."
                className="w-full px-6 py-4 pr-14 text-lg border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              />
              <button
                onClick={() => handleSearch()}
                disabled={loading || !query.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}
          {result && <ConsensusResult result={result} />}
          {!result && !loading && !error && (
            <div className="text-center py-12 text-slate-500">
              <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>Enter a clinical question to search evidence-based literature</p>
              {searchHistory.length > 0 && <p className="text-sm mt-2">Or select a recent search from the sidebar</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ConsensusResult({ result }: { result: SearchResult }) {
  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">{result.query}</h2>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          {result.isPro && <span className="font-semibold text-blue-600">Pro</span>}
          <span>·</span>
          <span>{result.steps} steps</span>
          <span>·</span>
          <span>{result.sources.length} sources</span>
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="text-slate-800 leading-relaxed prose prose-blue max-w-none">
          {renderSummaryWithLinks(result.summary, result.sources)}
        </div>
      </div>

      {/* Key Clinical Points - Quick Reference */}
      {result.keyPoints && result.keyPoints.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-bold text-emerald-900">Key Clinical Points</h3>
            <span className="text-xs bg-emerald-600 text-white px-2 py-1 rounded-full font-semibold">
              Quick Reference
            </span>
          </div>
          <ul className="space-y-3">
            {result.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-800">
                <span className="text-emerald-600 font-bold mt-0.5">•</span>
                <span className="flex-1 leading-relaxed">{renderSummaryWithLinks(point, result.sources)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-8">
        {result.sections.map((section, idx) => (
          <SectionView key={idx} section={section} />
        ))}
      </div>
      <div className="border-t border-slate-200 pt-8">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Sources ({result.sources.length})</h3>
        <SourcesList sources={result.sources} />
      </div>
    </div>
  );
}

function SectionView({ section }: { section: Section }) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-slate-900">{section.title}</h3>
      {section.content && <p className="text-slate-700 leading-relaxed">{section.content}</p>}
      {section.subsections && (
        <div className="space-y-4 pl-4 border-l-2 border-blue-200">
          {section.subsections.map((subsection, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="font-semibold text-slate-800 flex items-start gap-2">
                <span className="text-blue-600">{idx + 1}.</span>
                <span>{subsection.title}</span>
              </h4>
              <p className="text-slate-700 leading-relaxed pl-5">
                {renderWithCitations(subsection.content, subsection.citations)}
              </p>
            </div>
          ))}
        </div>
      )}
      {section.table && <TableView table={section.table} />}
    </div>
  );
}

function TableView({ table }: { table: Table }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-slate-300 rounded-lg overflow-hidden">
        <thead className="bg-slate-100">
          <tr>
            {table.headers.map((header, idx) => (
              <th key={idx} className="px-4 py-3 text-left font-semibold text-slate-700 border-b border-slate-300">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-slate-50 transition-colors border-b border-slate-200 last:border-0">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-4 py-3 text-slate-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.caption && <p className="text-sm text-slate-500 mt-2 italic">{table.caption}</p>}
    </div>
  );
}

function SourcesList({ sources }: { sources: Source[] }) {
  return (
    <div className="space-y-4">
      {sources.map((source) => (
        <div
          key={source.id}
          className="border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all"
        >
          {source.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {source.badges.map((badge, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                  {badge}
                </span>
              ))}
            </div>
          )}
          <h4 className="font-semibold text-slate-900 mb-2 flex items-start gap-2">
            <span className="text-blue-600">⁽{source.id}⁾</span>
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                {source.title}
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <span>{source.title}</span>
            )}
          </h4>
          <p className="text-sm text-slate-600">
            {source.year} · {source.citations} citations · {source.authors} · {source.journal}
          </p>
        </div>
      ))}
    </div>
  );
}

function renderWithCitations(text: string, citations?: number[]) {
  if (!citations || citations.length === 0) return text;
  return (
    <>
      {text}{" "}
      <sup className="text-blue-600">
        {citations.map((c, idx) => (
          <span key={idx}>
            ⁽{c}⁾{idx < citations.length - 1 && " "}
          </span>
        ))}
      </sup>
    </>
  );
}

function renderSummaryWithLinks(summary: string, sources: Source[]) {
  // Parse the summary to find citation patterns like ⁽¹⁾ and create a mapping
  const parts: (string | React.ReactElement)[] = [];

  // Split by superscript citations pattern
  const citationRegex = /⁽(\d+)⁾/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = citationRegex.exec(summary)) !== null) {
    // Add text before citation
    if (match.index > lastIndex) {
      const textBefore = summary.slice(lastIndex, match.index);
      parts.push(textBefore);
    }

    // Add clickable citation
    const citationNum = parseInt(match[1]);
    const source = sources.find((s) => s.id === citationNum);

    if (source?.url) {
      parts.push(
        <sup key={`cite-${key++}`}>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline no-underline"
            title={`${source.title} - ${source.journal} (${source.year})`}
          >
            ⁽{citationNum}⁾
          </a>
        </sup>
      );
    } else {
      parts.push(
        <sup key={`cite-${key++}`} className="text-blue-600">
          ⁽{citationNum}⁾
        </sup>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < summary.length) {
    parts.push(summary.slice(lastIndex));
  }

  // Now parse for journal name links - look for patterns like "JAMA", "The Lancet", etc.
  // We'll create clickable links for journal names that appear before citations
  return (
    <div className="space-y-4">
      {parts.map((part, idx) => {
        if (typeof part === "string") {
          // Split by common separators to create paragraphs
          const paragraphs = part.split(/\n\n+/);
          return paragraphs.map((p, pIdx) => {
            if (!p.trim()) return null;
            return <p key={`p-${idx}-${pIdx}`}>{highlightJournalNames(p, sources)}</p>;
          });
        }
        return part;
      })}
    </div>
  );
}

function highlightJournalNames(text: string, sources: Source[]) {
  // Create a comprehensive mapping of journal names to source URLs
  const journalMap = new Map<string, { url: string; priority: number }>();

  sources.forEach((source) => {
    if (
      source.url &&
      source.journal &&
      source.journal.toLowerCase() !== "unknown" &&
      source.journal !== "Unknown Journal"
    ) {
      const journalLower = source.journal.toLowerCase();

      // Add the exact journal name (highest priority)
      journalMap.set(source.journal, { url: source.url, priority: 10 });

      // Add common variations and abbreviations
      if (journalLower.includes("new england journal of medicine") || journalLower.includes("n engl j med")) {
        journalMap.set("NEJM", { url: source.url, priority: 9 });
        journalMap.set("New England Journal of Medicine", { url: source.url, priority: 10 });
        journalMap.set("N Engl J Med", { url: source.url, priority: 9 });
      }

      if (journalLower.includes("jama") && !journalLower.includes("jamanetwork")) {
        journalMap.set("JAMA", { url: source.url, priority: 9 });
        if (journalLower.includes("jama internal medicine")) {
          journalMap.set("JAMA Internal Medicine", { url: source.url, priority: 10 });
        }
      }

      if (journalLower.includes("lancet")) {
        journalMap.set("The Lancet", { url: source.url, priority: 10 });
        journalMap.set("Lancet", { url: source.url, priority: 9 });
        if (journalLower.includes("lancet respiratory")) {
          journalMap.set("Lancet Respiratory Medicine", { url: source.url, priority: 10 });
        }
      }

      if (journalLower.includes("bmj") || journalLower.includes("british medical journal")) {
        journalMap.set("BMJ", { url: source.url, priority: 9 });
        journalMap.set("British Medical Journal", { url: source.url, priority: 10 });
      }

      if (journalLower.includes("critical care medicine")) {
        journalMap.set("Critical Care Medicine", { url: source.url, priority: 10 });
        journalMap.set("Crit Care Med", { url: source.url, priority: 9 });
      }

      if (journalLower.includes("intensive care medicine")) {
        journalMap.set("Intensive Care Medicine", { url: source.url, priority: 10 });
      }

      if (journalLower.includes("anesthesia") && journalLower.includes("analgesia")) {
        journalMap.set("Anesthesia and Analgesia", { url: source.url, priority: 10 });
        journalMap.set("Anesthesia & Analgesia", { url: source.url, priority: 10 });
      }

      if (journalLower.includes("cochrane")) {
        journalMap.set("Cochrane", { url: source.url, priority: 9 });
        journalMap.set("Cochrane Database of Systematic Reviews", { url: source.url, priority: 10 });
      }

      if (journalLower.includes("annals of internal medicine")) {
        journalMap.set("Annals of Internal Medicine", { url: source.url, priority: 10 });
      }

      if (journalLower.includes("chest")) {
        journalMap.set("Chest", { url: source.url, priority: 9 });
        journalMap.set("CHEST", { url: source.url, priority: 9 });
      }
    }
  });

  // If no journal mappings, return text as-is
  if (journalMap.size === 0) return text;

  // Sort journal names by length (longest first) to avoid partial matches
  const sortedJournals = Array.from(journalMap.entries()).sort((a, b) => {
    // First by length (longer matches first)
    const lenDiff = b[0].length - a[0].length;
    if (lenDiff !== 0) return lenDiff;
    // Then by priority
    return b[1].priority - a[1].priority;
  });

  // Build a single regex that matches all journal names
  const journalPatterns = sortedJournals.map(([name]) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");

  const combinedRegex = new RegExp(`\\b(${journalPatterns})\\b`, "g");

  // Find all matches
  const matches: Array<{ text: string; start: number; end: number; url: string }> = [];
  let match;

  while ((match = combinedRegex.exec(text)) !== null) {
    const matchedText = match[0];
    const journalData = journalMap.get(matchedText);

    if (journalData) {
      matches.push({
        text: matchedText,
        start: match.index,
        end: match.index + matchedText.length,
        url: journalData.url,
      });
    }
  }

  // If no matches found, return text as-is
  if (matches.length === 0) return text;

  // Build the result with clickable links
  const result: (string | React.ReactElement)[] = [];
  let lastIndex = 0;

  matches.forEach((match, idx) => {
    // Add text before this match
    if (match.start > lastIndex) {
      result.push(text.slice(lastIndex, match.start));
    }

    // Add clickable journal link
    result.push(
      <a
        key={`journal-${idx}`}
        href={match.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-900 underline decoration-blue-400 hover:decoration-blue-600 font-medium transition-colors"
        title={`View article in ${match.text}`}
      >
        {match.text}
      </a>
    );

    lastIndex = match.end;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return <>{result}</>;
}
