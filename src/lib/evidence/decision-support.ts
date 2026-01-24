import { logger } from "@/lib/logger";
/**
 * Clinical Decision Support Engine
 *
 * Generates step-by-step clinical protocols and decision trees
 * from evidence synthesis
 */

import { ClinicalSynthesis, Reference } from "./clinical-synthesis-engine";
import { PatientContext, generatePatientConsiderations, getPatientSummaryForAI } from "./patient-context";
import { generateGroqCompletion, isGroqAvailable } from "../ai/groq-client";

export interface DecisionStep {
  id: string;
  title: string;
  description: string;
  actions: Action[];
  warnings?: string[];
  timeframe?: string;
  references: string[]; // reference IDs
}

export interface Action {
  text: string;
  dosage?: string;
  route?: string;
  frequency?: string;
  duration?: string;
  monitoring?: string[];
  contraindications?: string[];
  alternatives?: string[];
}

export interface DecisionTree {
  title: string;
  steps: DecisionStep[];
  patientConsiderations?: string[];
}

/**
 * Generate clinical decision support from synthesis
 */
export async function generateDecisionSupport(
  synthesis: ClinicalSynthesis,
  patientContext?: PatientContext
): Promise<DecisionTree> {
  if (!isGroqAvailable()) {
    logger.warn("[Decision Support] Groq API not available, returning basic structure");
    return generateBasicDecisionTree(synthesis, patientContext);
  }

  try {
    const decisionTree = await generateAIDecisionTree(synthesis, patientContext);
    return decisionTree;
  } catch (error) {
    logger.error("[Decision Support] AI generation failed:", error instanceof Error ? error : new Error(String(error)));
    return generateBasicDecisionTree(synthesis, patientContext);
  }
}

/**
 * Generate AI-powered decision tree using Groq
 */
async function generateAIDecisionTree(
  synthesis: ClinicalSynthesis,
  patientContext?: PatientContext
): Promise<DecisionTree> {
  const patientSummary = patientContext ? getPatientSummaryForAI(patientContext) : "adult patient";
  const patientConsiderations = patientContext ? generatePatientConsiderations(patientContext) : [];

  const prompt = `You are a clinical decision support system. Generate a step-by-step clinical protocol for: "${
    synthesis.query
  }"

Patient Context: ${patientSummary}

Evidence Synthesis Available:
${synthesis.sections
  .map(
    (s) => `
${s.heading}:
${s.paragraphs.map((p) => p.text).join("\n\n")}
References: ${s.paragraphs.flatMap((p) => p.citations.flatMap((c) => c.referenceIds)).join(", ")}
`
  )
  .join("\n")}

Available References:
${synthesis.references.map((r) => `${r.id}: ${r.title} (${r.journal}, ${r.year})`).join("\n")}

Generate a clinical decision protocol in this EXACT JSON format:
{
  "title": "Management Protocol for [condition]",
  "steps": [
    {
      "id": "step-1",
      "title": "Initial Assessment and Resuscitation",
      "description": "Brief overview of this step",
      "timeframe": "Within first hour" or "Immediately" or "Within 24 hours",
      "actions": [
        {
          "text": "Specific action to take",
          "dosage": "Exact dosage (e.g., 30 mL/kg, 1g)",
          "route": "IV, PO, IM, etc.",
          "frequency": "q6h, daily, etc.",
          "duration": "7-10 days, until resolution, etc.",
          "monitoring": ["What to monitor", "How often"],
          "contraindications": ["When NOT to use"],
          "alternatives": ["Alternative if contraindicated"]
        }
      ],
      "warnings": ["Important safety warnings"],
      "references": ["ref-1", "ref-3"]
    }
  ]
}

CRITICAL REQUIREMENTS:
1. Be SPECIFIC with dosages (include numbers, units, routes)
2. Include timeframes (when to do each step)
3. Include monitoring parameters
4. Flag contraindications and warnings
5. Provide alternatives when main option is contraindicated
6. Cite references using {ref-X} format from available references
7. ${patientContext ? `ADJUST recommendations for ${patientSummary}` : "Use standard adult dosing"}
8. Order steps chronologically (what to do first, second, third, etc.)

Generate ONLY valid JSON, no markdown formatting.`;

  const response = await generateGroqCompletion(prompt, {
    temperature: 0.1, // Very low for clinical accuracy
    maxTokens: 2500,
  });

  try {
    const parsed = JSON.parse(response);

    // Add patient considerations if provided
    if (patientConsiderations.length > 0) {
      parsed.patientConsiderations = patientConsiderations;
    }

    return parsed as DecisionTree;
  } catch (parseError) {
    logger.error("[Decision Support] Failed to parse AI response, using fallback");
    logger.debug("AI Response", { response });
    return generateBasicDecisionTree(synthesis, patientContext);
  }
}

/**
 * Generate basic decision tree from synthesis (fallback)
 */
function generateBasicDecisionTree(synthesis: ClinicalSynthesis, patientContext?: PatientContext): DecisionTree {
  const steps: DecisionStep[] = synthesis.sections.map((section, index) => {
    // Extract actions from section content
    const contentText = section.paragraphs.map((p) => p.text).join("\n\n");
    const actions = extractActionsFromText(contentText);

    // Get all citations from paragraphs
    const references = section.paragraphs
      .flatMap((p) => p.citations.flatMap((c) => c.referenceIds))
      .filter((v, i, a) => a.indexOf(v) === i); // Deduplicate

    return {
      id: `step-${index + 1}`,
      title: section.heading,
      description: section.paragraphs[0]?.text.split("\n")[0] || "", // First sentence
      actions,
      references,
    };
  });

  return {
    title: `Clinical Protocol: ${synthesis.query}`,
    steps,
    patientConsiderations: patientContext ? generatePatientConsiderations(patientContext) : undefined,
  };
}

/**
 * Extract actions from text (simple heuristic)
 */
function extractActionsFromText(text: string): Action[] {
  const actions: Action[] = [];

  // Look for sentences with dosages
  const dosagePattern =
    /([A-Z][^.!?]*(?:\d+(?:\.\d+)?\s*(?:mg|g|mL|units|mcg|IU)\/kg|(?:\d+(?:\.\d+)?-\d+(?:\.\d+)?|\d+(?:\.\d+)?)\s*(?:mg|g|mL|units|mcg|IU))[^.!?]*[.!?])/g;

  let match;
  while ((match = dosagePattern.exec(text)) !== null) {
    const sentence = match[1].trim();

    // Extract dosage
    const dosageMatch = sentence.match(/(\d+(?:\.\d+)?(?:-\d+(?:\.\d+)?)?)\s*(mg|g|mL|units|mcg|IU)(?:\/kg)?/);
    const dosage = dosageMatch ? dosageMatch[0] : undefined;

    // Extract frequency
    const freqMatch = sentence.match(/\b(q\d+h|daily|twice daily|three times daily|bid|tid|qid|q\d+\s*(?:hours|h))\b/i);
    const frequency = freqMatch ? freqMatch[1] : undefined;

    // Extract route
    const routeMatch = sentence.match(/\b(IV|PO|IM|SC|topical|inhalation|sublingual)\b/i);
    const route = routeMatch ? routeMatch[1] : undefined;

    actions.push({
      text: sentence,
      dosage,
      route,
      frequency,
    });
  }

  // If no dosages found, create one general action
  if (actions.length === 0) {
    actions.push({
      text: text.split("\n")[0], // First paragraph
    });
  }

  return actions;
}
