"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, ThumbsUp, ThumbsDown, Sparkles, Award } from "lucide-react";
import type {
  ClinicalSynthesis,
  ClinicalSection,
  ClinicalParagraph,
  InlineCitation,
  Reference,
} from "@/lib/evidence/clinical-synthesis-engine";

interface ClinicalSynthesisViewProps {
  synthesis: ClinicalSynthesis;
}

export default function ClinicalSynthesisView({ synthesis }: ClinicalSynthesisViewProps) {
  const [referencesExpanded, setReferencesExpanded] = useState(false);

  return (
    <div className="clinical-synthesis-container bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
      {/* Header with metadata */}
      <SynthesisHeader metadata={synthesis.metadata} />

      {/* Sections with inline citations */}
      <div className="synthesis-sections space-y-8">
        {synthesis.sections.map((section, idx) => (
          <SectionView key={idx} section={section} references={synthesis.references} />
        ))}
      </div>

      {/* References section */}
      <ReferencesSection
        references={synthesis.references}
        expanded={referencesExpanded}
        onToggle={() => setReferencesExpanded(!referencesExpanded)}
      />
    </div>
  );
}

/**
 * Header with confidence score and metadata
 */
function SynthesisHeader({ metadata }: { metadata: ClinicalSynthesis["metadata"] }) {
  const getConfidenceColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-50";
    if (score >= 70) return "text-blue-600 bg-blue-50";
    return "text-yellow-600 bg-yellow-50";
  };

  return (
    <div className="synthesis-header border-b border-gray-200 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {metadata.usedAI && (
            <div className="flex items-center gap-1.5 text-purple-600">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Synthesized</span>
            </div>
          )}

          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(metadata.confidenceScore)}`}>
            {metadata.confidenceScore}% Confidence
          </div>

          <div className="text-sm text-gray-600">{metadata.tier1Count} top-tier sources</div>
        </div>

        <div className="text-xs text-gray-500">
          {metadata.articlesAnalyzed} articles analyzed • Avg quality: {metadata.avgQualityScore}/100
        </div>
      </div>
    </div>
  );
}

/**
 * Section with heading and paragraphs
 */
function SectionView({ section, references }: { section: ClinicalSection; references: Reference[] }) {
  return (
    <div className="section space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">{section.heading}</h2>

      <div className="paragraphs space-y-3">
        {section.paragraphs.map((para, idx) => (
          <ParagraphWithCitations key={idx} paragraph={para} references={references} />
        ))}
      </div>
    </div>
  );
}

/**
 * Paragraph with inline journal badge citations
 */
function ParagraphWithCitations({ paragraph, references }: { paragraph: ClinicalParagraph; references: Reference[] }) {
  // Insert citations into text at appropriate positions
  const renderTextWithCitations = () => {
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    // Sort citations by position
    const sortedCitations = [...paragraph.citations].sort((a, b) => a.position - b.position);

    sortedCitations.forEach((citation, idx) => {
      // Add text before citation
      if (citation.position > lastIndex) {
        elements.push(<span key={`text-${idx}`}>{paragraph.text.slice(lastIndex, citation.position)}</span>);
      }

      // Add citation badge
      elements.push(<JournalBadge key={`cite-${idx}`} citation={citation} references={references} />);

      lastIndex = citation.position;
    });

    // Add remaining text
    if (lastIndex < paragraph.text.length) {
      elements.push(<span key="text-end">{paragraph.text.slice(lastIndex)}</span>);
    }

    return elements;
  };

  return <p className="text-gray-700 leading-relaxed text-base">{renderTextWithCitations()}</p>;
}

/**
 * Inline journal badge (e.g., "🔵 Lancet +2")
 * Clickable - opens the first reference's article
 */
function JournalBadge({ citation, references }: { citation: InlineCitation; references: Reference[] }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    red: "bg-red-100 text-red-700 hover:bg-red-200",
    green: "bg-green-100 text-green-700 hover:bg-green-200",
    purple: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    indigo: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
    orange: "bg-orange-100 text-orange-700 hover:bg-orange-200",
  };

  const colorClass = colorClasses[citation.color] || colorClasses.blue;
  const emoji =
    citation.color === "blue"
      ? "🔵"
      : citation.color === "red"
      ? "🔴"
      : citation.color === "green"
      ? "🟢"
      : citation.color === "purple"
      ? "🟣"
      : citation.color === "indigo"
      ? "🔵"
      : "🟠";

  // Find the first reference from this citation
  const firstReference =
    citation.referenceIds.length > 0 ? references.find((ref) => ref.id === citation.referenceIds[0]) : null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (firstReference?.url) {
      window.open(firstReference.url, "_blank", "noopener,noreferrer");
    } else if (firstReference?.doi) {
      window.open(`https://doi.org/${firstReference.doi}`, "_blank", "noopener,noreferrer");
    } else if (firstReference?.pmid) {
      window.open(`https://pubmed.ncbi.nlm.nih.gov/${firstReference.pmid}`, "_blank", "noopener,noreferrer");
    }
  };

  const isClickable = firstReference && (firstReference.url || firstReference.doi || firstReference.pmid);

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium mx-1 transition-colors ${colorClass} ${
        isClickable ? "cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-current" : ""
      }`}
      title={`${citation.count} reference${citation.count > 1 ? "s" : ""} from ${citation.journalBadge}${
        isClickable ? " - Click to view article" : ""
      }`}
      onClick={isClickable ? handleClick : undefined}
    >
      <span>{emoji}</span>
      <span>{citation.journalBadge}</span>
      {citation.count > 1 && <span className="font-semibold">+{citation.count}</span>}
      {isClickable && <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />}
    </span>
  );
}

/**
 * Expandable references section
 */
function ReferencesSection({
  references,
  expanded,
  onToggle,
}: {
  references: Reference[];
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="references-section border-t border-gray-200 pt-6">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left hover:bg-gray-50 p-3 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900">References ({references.length})</h3>
          <span className="text-sm text-gray-500">Click to {expanded ? "collapse" : "expand"}</span>
        </div>

        {expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          {references.map((ref) => (
            <ReferenceCard key={ref.id} reference={ref} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Individual reference card with metadata
 */
function ReferenceCard({ reference }: { reference: Reference }) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const getQualityBadge = (score: number) => {
    if (score >= 85) return { text: "Excellent", color: "bg-green-100 text-green-800" };
    if (score >= 75) return { text: "High Quality", color: "bg-blue-100 text-blue-800" };
    return { text: "Good", color: "bg-gray-100 text-gray-800" };
  };

  const qualityBadge = getQualityBadge(reference.qualityScore);

  return (
    <div className="reference-card bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          {/* Title */}
          <h4 className="font-medium text-gray-900 leading-snug">{reference.title}</h4>

          {/* Authors and journal */}
          <p className="text-sm text-gray-600">
            {reference.authors.slice(0, 3).join(", ")}
            {reference.authors.length > 3 && ", et al."}
            {" • "}
            <span className="font-medium">{reference.journal}</span>
            {" • "}
            {reference.year}
          </p>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${qualityBadge.color}`}>
              {qualityBadge.text} ({reference.qualityScore}/100)
            </span>

            <span className="px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
              Level {reference.evidenceLevel}
            </span>

            {reference.doi && (
              <a
                href={`https://doi.org/${reference.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 rounded-md text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                DOI
              </a>
            )}

            {reference.pmid && (
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${reference.pmid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 rounded-md text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                PubMed
              </a>
            )}
          </div>
        </div>

        {/* Feedback buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setFeedback(feedback === "up" ? null : "up")}
            className={`p-2 rounded-lg transition-colors ${
              feedback === "up" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
            title="Helpful reference"
          >
            <ThumbsUp className="w-4 h-4" />
          </button>

          <button
            onClick={() => setFeedback(feedback === "down" ? null : "down")}
            className={`p-2 rounded-lg transition-colors ${
              feedback === "down" ? "bg-red-100 text-red-600" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
            title="Not helpful"
          >
            <ThumbsDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Patient-Specific Considerations
 */
function PatientConsiderationsView({ considerations }: { considerations: string[] }) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
      <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
        <span>👤</span>
        <span>Patient-Specific Considerations</span>
      </h3>
      <ul className="space-y-1">
        {considerations.map((consideration, idx) => (
          <li key={idx} className="text-amber-800 text-sm">
            {consideration}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Clinical Decision Support Protocol View
 */
function DecisionSupportView({
  decisionSupport,
  expanded,
  onToggle,
}: {
  decisionSupport: any;
  expanded: boolean;
  onToggle: () => void;
}) {
  if (!decisionSupport || !decisionSupport.steps || decisionSupport.steps.length === 0) {
    return null;
  }

  return (
    <div className="decision-support border-t border-gray-200 pt-6">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left mb-4 hover:bg-gray-50 p-3 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">📋 Clinical Decision Support</h3>
            <p className="text-sm text-gray-600">{decisionSupport.title || "Step-by-step clinical protocol"}</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      {expanded && (
        <div className="space-y-4">
          {decisionSupport.steps.map((step: any, idx: number) => (
            <div key={step.id || idx} className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-gray-900">{step.title}</h4>
                  <p className="text-gray-700 mt-1">{step.description}</p>
                  {step.timeframe && (
                    <p className="text-sm text-blue-700 mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {step.timeframe}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              {step.actions && step.actions.length > 0 && (
                <div className="space-y-3 mt-4">
                  {step.actions.map((action: any, aidx: number) => (
                    <div key={aidx} className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="font-medium text-gray-900 mb-2">{action.text}</p>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {action.dosage && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">💊 Dose:</span>
                            <span className="font-medium">{action.dosage}</span>
                          </div>
                        )}
                        {action.route && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">💉 Route:</span>
                            <span className="font-medium">{action.route}</span>
                          </div>
                        )}
                        {action.frequency && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">⏰ Frequency:</span>
                            <span className="font-medium">{action.frequency}</span>
                          </div>
                        )}
                        {action.duration && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">📅 Duration:</span>
                            <span className="font-medium">{action.duration}</span>
                          </div>
                        )}
                      </div>

                      {/* Monitoring */}
                      {action.monitoring && action.monitoring.length > 0 && (
                        <div className="mt-3 p-2 bg-purple-50 rounded border border-purple-200">
                          <p className="text-xs font-semibold text-purple-900 mb-1">🔍 Monitor:</p>
                          <ul className="text-xs text-purple-800 list-disc list-inside space-y-0.5">
                            {action.monitoring.map((m: string, mi: number) => (
                              <li key={mi}>{m}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Contraindications */}
                      {action.contraindications && action.contraindications.length > 0 && (
                        <div className="mt-2 p-2 bg-red-50 rounded border border-red-200">
                          <p className="text-xs font-semibold text-red-900 mb-1">⛔ Contraindications:</p>
                          <ul className="text-xs text-red-800 list-disc list-inside space-y-0.5">
                            {action.contraindications.map((c: string, ci: number) => (
                              <li key={ci}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Warnings */}
              {step.warnings && step.warnings.length > 0 && (
                <div className="mt-3 p-3 bg-yellow-50 rounded border border-yellow-200">
                  <p className="text-sm font-semibold text-yellow-900 mb-2">⚠️ Important Warnings:</p>
                  <ul className="text-sm text-yellow-800 list-disc list-inside space-y-1">
                    {step.warnings.map((w: string, wi: number) => (
                      <li key={wi}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
