import { logger } from '@/lib/logger';
/**
 * Europe PMC API Integration
 * FREE API for open access biomedical literature
 *
 * API Documentation: https://europepmc.org/RestfulWebService
 * No API key required! Rate limit: Generous (no strict limit documented)
 *
 * Coverage:
 * - 40M+ abstracts from PubMed
 * - 8M+ full-text articles (open access)
 * - Preprints, patents, clinical guidelines
 */

const EUROPEPMC_BASE_URL = "https://www.ebi.ac.uk/europepmc/webservices/rest";

export interface EuropePMCArticle {
  id: string;
  pmid?: string;
  pmcid?: string;
  doi?: string;
  title: string;
  authors: string[];
  journal: string;
  published: string;
  abstract?: string;
  fullTextUrl?: string;
  isOpenAccess: boolean;
  hasFullText: boolean;
  citationCount: number;
  type: string; // 'research-article', 'review', 'case-report', etc.
  source: string; // 'MED' (PubMed), 'PMC' (PubMed Central), 'PPR' (Preprints)
}

export interface EuropePMCSearchParams {
  query: string;
  pageSize?: number; // Results per page (max: 1000, default: 25)
  page?: number; // Page number (starts at 1)
  sort?: "relevance" | "date" | "cited"; // Sort order
  synonym?: boolean; // Include synonyms (default: true)
  resultType?: "core" | "lite"; // 'core' includes abstracts
}

/**
 * Search Europe PMC for articles
 * @param params Search parameters
 * @returns Articles and metadata
 */
export async function searchEuropePMC(
  params: EuropePMCSearchParams
): Promise<{ articles: EuropePMCArticle[]; totalResults: number; hasNextPage: boolean }> {
  try {
    const url = new URL(`${EUROPEPMC_BASE_URL}/search`);

    // Add query
    url.searchParams.append("query", params.query);

    // Add pagination
    url.searchParams.append("pageSize", (params.pageSize || 25).toString());
    url.searchParams.append("cursorMark", params.page ? ((params.page - 1) * (params.pageSize || 25)).toString() : "*");

    // Add result type
    url.searchParams.append("resultType", params.resultType || "core");

    // Add format
    url.searchParams.append("format", "json");

    // Add synonym search
    if (params.synonym !== false) {
      url.searchParams.append("synonym", "true");
    }

    // Add sorting
    if (params.sort) {
      const sortField =
        params.sort === "date" ? "P_PDATE_D desc" : params.sort === "cited" ? "CITED desc" : "relevance"; // Default
      if (sortField !== "relevance") {
        url.searchParams.append("sort", sortField);
      }
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Europe PMC API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.resultList || !data.resultList.result) {
      return { articles: [], totalResults: 0, hasNextPage: false };
    }

    const articles: EuropePMCArticle[] = data.resultList.result.map((item: any) => ({
      id: item.id,
      pmid: item.pmid,
      pmcid: item.pmcid,
      doi: item.doi,
      title: item.title || "Untitled",
      authors: extractAuthors(item.authorString),
      journal: item.journalTitle || item.bookOrReportDetails?.publisher || "Unknown",
      published: item.firstPublicationDate || item.pubYear || "Unknown",
      abstract: item.abstractText,
      fullTextUrl: item.pmcid ? `https://europepmc.org/article/PMC/${item.pmcid}` : undefined,
      isOpenAccess: item.isOpenAccess === "Y",
      hasFullText: !!item.pmcid || item.hasTextMinedTerms === "Y",
      citationCount: parseInt(item.citedByCount || "0"),
      type: item.pubType || "article",
      source: item.source || "MED",
    }));

    return {
      articles,
      totalResults: parseInt(data.hitCount || "0"),
      hasNextPage: data.nextCursorMark !== undefined,
    };
  } catch (error) {
    logger.error("Europe PMC search error:", error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
}

/**
 * Get open access full-text articles only
 * @param query Search query
 * @param limit Number of results
 * @returns Open access articles with full text
 */
export async function searchOpenAccessArticles(
  query: string,
  limit: number = 25
): Promise<{ articles: EuropePMCArticle[]; totalResults: number }> {
  // Add open access filter to query
  const openAccessQuery = `${query} AND OPEN_ACCESS:Y`;

  return searchEuropePMC({
    query: openAccessQuery,
    pageSize: limit,
    sort: "date",
    resultType: "core",
  });
}

/**
 * Search for specific article types (trials, reviews, guidelines)
 * @param query Search query
 * @param articleType Type of article
 * @param limit Number of results
 * @returns Filtered articles
 */
export async function searchByArticleType(
  query: string,
  articleType: "clinical-trial" | "review" | "guideline" | "meta-analysis" | "case-report",
  limit: number = 25
): Promise<{ articles: EuropePMCArticle[]; totalResults: number }> {
  const typeQueries: Record<string, string> = {
    "clinical-trial": "Clinical Trial[PT]",
    review: "Review[PT]",
    guideline: "Guideline[PT]",
    "meta-analysis": "Meta-Analysis[PT]",
    "case-report": "Case Reports[PT]",
  };

  const typeQuery = `${query} AND (${typeQueries[articleType]})`;

  return searchEuropePMC({
    query: typeQuery,
    pageSize: limit,
    sort: "date",
    resultType: "core",
  });
}

/**
 * Get article by PMID, PMCID, or DOI
 * @param id Article identifier (PMID, PMCID, or DOI)
 * @param idType Type of identifier
 * @returns Article details
 */
export async function getArticleById(
  id: string,
  idType: "pmid" | "pmcid" | "doi" = "pmid"
): Promise<EuropePMCArticle | null> {
  try {
    let source = "MED";
    let identifier = id;

    if (idType === "pmcid") {
      source = "PMC";
      identifier = id.replace(/^PMC/, ""); // Remove PMC prefix if present
    } else if (idType === "doi") {
      source = "DOI";
      identifier = id;
    }

    const url = `${EUROPEPMC_BASE_URL}/search?query=${idType.toUpperCase()}:${identifier}&format=json&resultType=core`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Europe PMC API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.resultList || !data.resultList.result || data.resultList.result.length === 0) {
      return null;
    }

    const item = data.resultList.result[0];

    return {
      id: item.id,
      pmid: item.pmid,
      pmcid: item.pmcid,
      doi: item.doi,
      title: item.title || "Untitled",
      authors: extractAuthors(item.authorString),
      journal: item.journalTitle || "Unknown",
      published: item.firstPublicationDate || item.pubYear || "Unknown",
      abstract: item.abstractText,
      fullTextUrl: item.pmcid ? `https://europepmc.org/article/PMC/${item.pmcid}` : undefined,
      isOpenAccess: item.isOpenAccess === "Y",
      hasFullText: !!item.pmcid,
      citationCount: parseInt(item.citedByCount || "0"),
      type: item.pubType || "article",
      source: item.source || "MED",
    };
  } catch (error) {
    logger.error("Europe PMC article lookup error:", error instanceof Error ? error : new Error(String(error)));
    return null;
  }
}

/**
 * Get recent emergency medicine articles
 * @param topic Specific topic (optional)
 * @param limit Number of results
 * @returns Recent articles
 */
export async function getRecentEmergencyArticles(
  topic?: string,
  limit: number = 25
): Promise<{ articles: EuropePMCArticle[]; totalResults: number }> {
  const baseQuery = topic
    ? `(emergency medicine OR emergency department) AND ${topic}`
    : "emergency medicine OR emergency department";

  return searchEuropePMC({
    query: baseQuery,
    pageSize: limit,
    sort: "date",
    resultType: "core",
  });
}

/**
 * Get full-text URL for an article
 * @param pmcid PubMed Central ID
 * @returns Full-text URL
 */
export function getFullTextUrl(pmcid: string): string {
  const cleanPmcid = pmcid.replace(/^PMC/, "");
  return `https://europepmc.org/article/PMC/${cleanPmcid}`;
}

/**
 * Get PDF URL for an article (if available)
 * @param pmcid PubMed Central ID
 * @returns PDF URL
 */
export function getPdfUrl(pmcid: string): string {
  const cleanPmcid = pmcid.replace(/^PMC/, "");
  return `https://europepmc.org/articles/PMC${cleanPmcid}?pdf=render`;
}

/**
 * Fetch full-text content from Europe PMC
 * Returns structured sections: Methods, Results, Discussion with dosing details
 * @param pmcid PubMed Central ID
 * @returns Full-text sections or null if unavailable
 */
export async function fetchFullText(pmcid: string): Promise<{
  methods?: string;
  results?: string;
  discussion?: string;
  fullText?: string;
} | null> {
  try {
    const cleanPmcid = pmcid.replace(/^PMC/, "");

    // Europe PMC provides full text in XML format via their API
    const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/${cleanPmcid}/fullTextXML`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Clinical-Evidence-Tool/1.0",
      },
    });

    if (!response.ok) {
      logger.debug(`Full text not available for PMC${cleanPmcid}`);
      return null;
    }

    const xmlText = await response.text();

    // Parse XML to extract sections using simple string methods
    const sections: any = {};
    const lowerXml = xmlText.toLowerCase();

    // Helper to extract section between tags
    const extractSection = (startPattern: string, endTag: string = "</sec>") => {
      const startIdx = lowerXml.indexOf(startPattern);
      if (startIdx === -1) return null;

      const endIdx = xmlText.indexOf(endTag, startIdx);
      if (endIdx === -1) return null;

      const sectionText = xmlText.substring(startIdx, endIdx);
      return stripXmlTags(sectionText).trim();
    };

    // Extract Methods section
    sections.methods =
      extractSection("<title>methods</title>") || extractSection("<title>materials and methods</title>");

    // Extract Results section
    sections.results = extractSection("<title>results</title>");

    // Extract Discussion/Conclusions section
    sections.discussion = extractSection("<title>discussion</title>") || extractSection("<title>conclusions</title>");

    // Get full body text as fallback
    const bodyStart = xmlText.indexOf("<body>");
    const bodyEnd = xmlText.indexOf("</body>");
    if (bodyStart !== -1 && bodyEnd !== -1) {
      sections.fullText = stripXmlTags(xmlText.substring(bodyStart, bodyEnd)).trim();
    }

    return sections;
  } catch (error) {
    logger.error(`Error fetching full text for PMC${pmcid}:`, error instanceof Error ? error : new Error(String(error)));
    return null;
  }
}

/**
 * Strip XML tags from text content
 */
function stripXmlTags(text: string): string {
  return text
    .replace(/<[^>]+>/g, " ") // Remove all XML tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .trim();
}

// Helper functions

function extractAuthors(authorString?: string): string[] {
  if (!authorString) return ["Unknown"];

  // Europe PMC returns authors as comma-separated string
  const authors = authorString.split(", ").slice(0, 10); // Limit to 10
  return authors.length > 0 ? authors : ["Unknown"];
}

/**
 * Format article as citation (AMA style)
 * @param article Europe PMC article
 * @returns Formatted citation
 */
export function formatCitation(article: EuropePMCArticle): string {
  const authors = article.authors.slice(0, 6);
  const authorString = authors.length <= 6 ? authors.join(", ") : `${authors.slice(0, 3).join(", ")}, et al`;

  const year = article.published.split("-")[0];

  let citation = `${authorString}. ${article.title}. ${article.journal}. ${year}`;

  if (article.pmid) citation += `. PMID: ${article.pmid}`;
  if (article.doi) citation += `. doi:${article.doi}`;

  return citation;
}
