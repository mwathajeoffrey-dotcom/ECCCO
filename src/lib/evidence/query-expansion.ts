/**
 * Smart Query Expansion & Search Enhancement
 * Improves search results by:
 * 1. Extracting key medical terms
 * 2. Finding synonyms and related terms
 * 3. Suggesting alternative searches
 * 4. Broadening queries that return no results
 */

interface QueryAnalysis {
  originalQuery: string;
  expandedTerms: string[];
  medicalConcepts: string[];
  suggestions: string[];
  broadenedQuery: string;
}

/**
 * Medical term synonyms and related concepts
 */
const MEDICAL_SYNONYMS: Record<string, string[]> = {
  // Diabetes
  diabetes: ["diabetes mellitus", "DM", "hyperglycemia", "glycemic"],
  diabetic: ["diabetes mellitus", "DM patient", "diabetic patient"],
  foot: ["lower extremity", "pedal", "podiatric"],
  "diabetic foot": [
    "diabetic foot ulcer",
    "DFU",
    "diabetic foot syndrome",
    "diabetic neuropathy",
    "diabetic foot infection",
  ],

  // Common medical conditions
  sepsis: ["septic shock", "severe sepsis", "septicemia", "SIRS"],
  pneumonia: ["pulmonary infection", "lung infection", "CAP", "HAP"],
  hypertension: ["high blood pressure", "HTN", "elevated blood pressure"],
  malaria: ["plasmodium infection", "malarial fever", "malaria treatment"],

  // Emergency conditions
  shock: ["circulatory shock", "hemodynamic instability", "hypotension"],
  trauma: ["injury", "traumatic", "polytrauma", "blunt trauma"],
  stroke: ["CVA", "cerebrovascular accident", "brain attack"],
  "myocardial infarction": ["MI", "heart attack", "AMI", "STEMI", "NSTEMI"],

  // Procedures
  management: ["treatment", "therapy", "intervention", "care"],
  diagnosis: ["diagnostic", "assessment", "evaluation", "workup"],
  treatment: ["therapy", "management", "intervention", "care protocol"],
};

/**
 * Common medical abbreviations
 */
const MEDICAL_ABBREVIATIONS: Record<string, string> = {
  MI: "myocardial infarction",
  CVA: "cerebrovascular accident",
  DM: "diabetes mellitus",
  HTN: "hypertension",
  CHF: "congestive heart failure",
  COPD: "chronic obstructive pulmonary disease",
  UTI: "urinary tract infection",
  DFU: "diabetic foot ulcer",
  CAD: "coronary artery disease",
  PE: "pulmonary embolism",
  DVT: "deep vein thrombosis",
  ARDS: "acute respiratory distress syndrome",
  ACS: "acute coronary syndrome",
  STEMI: "ST elevation myocardial infarction",
  NSTEMI: "non-ST elevation myocardial infarction",
};

/**
 * Analyze query and extract medical concepts
 */
export function analyzeQuery(query: string): QueryAnalysis {
  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(/\s+/);

  const medicalConcepts: string[] = [];
  const expandedTerms: string[] = [query];
  const suggestions: string[] = [];

  // Extract medical concepts
  for (const word of words) {
    // Check for known medical terms
    if (MEDICAL_SYNONYMS[word]) {
      medicalConcepts.push(word);
      expandedTerms.push(...MEDICAL_SYNONYMS[word]);
    }

    // Check for abbreviations
    const upperWord = word.toUpperCase();
    if (MEDICAL_ABBREVIATIONS[upperWord]) {
      expandedTerms.push(MEDICAL_ABBREVIATIONS[upperWord]);
    }
  }

  // Check for multi-word concepts
  for (const concept in MEDICAL_SYNONYMS) {
    if (lowerQuery.includes(concept) && !medicalConcepts.includes(concept)) {
      medicalConcepts.push(concept);
      expandedTerms.push(...MEDICAL_SYNONYMS[concept]);
    }
  }

  // Generate suggestions based on detected concepts
  if (lowerQuery.includes("diabetic") || lowerQuery.includes("diabetes")) {
    suggestions.push(
      "diabetic foot ulcer management",
      "diabetic neuropathy treatment",
      "diabetes complications",
      "diabetic wound care"
    );
  }

  if (lowerQuery.includes("foot")) {
    suggestions.push("diabetic foot infection", "foot ulcer treatment", "lower extremity wounds", "podiatric care");
  }

  // Create broadened query
  const broadenedQuery = createBroadenedQuery(query, medicalConcepts);

  return {
    originalQuery: query,
    expandedTerms: Array.from(new Set(expandedTerms)),
    medicalConcepts,
    suggestions: Array.from(new Set(suggestions)),
    broadenedQuery,
  };
}

/**
 * Create a broadened version of the query for better results
 */
function createBroadenedQuery(query: string, concepts: string[]): string {
  const lowerQuery = query.toLowerCase();

  // If query is very specific, broaden it
  if (lowerQuery.includes("management") || lowerQuery.includes("treatment")) {
    // Keep the condition, broaden the approach
    const condition = lowerQuery.replace(/\b(management|treatment|therapy|care)\b/g, "").trim();
    return condition; // Search for the condition itself, which will get management/treatment articles
  }

  // If query has multiple specific terms, try just the main condition
  if (concepts.length > 1) {
    return concepts[0]; // Use the primary concept
  }

  // Otherwise, return original
  return query;
}

/**
 * Generate alternative search queries
 */
export function generateAlternativeQueries(query: string): string[] {
  const analysis = analyzeQuery(query);
  const alternatives: string[] = [];

  // Add broadened query
  if (analysis.broadenedQuery !== query) {
    alternatives.push(analysis.broadenedQuery);
  }

  // Add expanded term combinations
  if (analysis.medicalConcepts.length > 0) {
    const mainConcept = analysis.medicalConcepts[0];
    const synonyms = MEDICAL_SYNONYMS[mainConcept] || [];

    for (const synonym of synonyms.slice(0, 3)) {
      alternatives.push(synonym);
    }
  }

  // Add suggestions
  alternatives.push(...analysis.suggestions.slice(0, 2));

  return Array.from(new Set(alternatives)).slice(0, 5);
}

/**
 * Expand query with medical synonyms for better search coverage
 */
export function expandQueryForSearch(query: string): string {
  const analysis = analyzeQuery(query);

  // Build expanded query using OR operators
  const queryParts = [query];

  // Add top 3 expanded terms
  for (const term of analysis.expandedTerms.slice(1, 4)) {
    queryParts.push(term);
  }

  // Join with OR for comprehensive search
  return queryParts.join(" OR ");
}

/**
 * Get search suggestions for when search fails
 */
export function getSearchSuggestions(
  query: string,
  errorType: "no_results" | "low_quality"
): {
  message: string;
  suggestions: string[];
  tips: string[];
} {
  const analysis = analyzeQuery(query);

  if (errorType === "no_results") {
    return {
      message: `No results found for "${query}". Try these related searches:`,
      suggestions:
        analysis.suggestions.length > 0
          ? analysis.suggestions
          : [analysis.broadenedQuery, ...generateAlternativeQueries(query).slice(0, 4)],
      tips: [
        "Try using broader terms (e.g., 'diabetes' instead of 'diabetic foot management')",
        "Use medical synonyms (e.g., 'myocardial infarction' or 'MI' or 'heart attack')",
        "Remove very specific qualifiers",
        "Search for the condition name alone",
      ],
    };
  } else {
    return {
      message: `Limited high-quality results for "${query}". Try these alternatives:`,
      suggestions: [analysis.broadenedQuery, ...analysis.suggestions.slice(0, 3)],
      tips: [
        "Broaden your search terms",
        "Try synonyms or related conditions",
        "Remove procedure-specific terms (e.g., 'management', 'treatment')",
      ],
    };
  }
}
