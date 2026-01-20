import { logger } from '@/lib/logger';
/**
 * Unified Evidence Search
 * Combines multiple FREE APIs for comprehensive article search
 *
 * Sources:
 * 1. PubMed/NCBI - 35M+ biomedical citations
 * 2. CrossRef - 130M+ academic articles (all journals)
 * 3. Europe PMC - 8M+ full-text open access
 * 4. Semantic Scholar - 200M+ papers with AI recommendations
 */

import { searchPubMed, fetchPubMedArticles, type PubMedArticle } from "../pubmed";
import { searchCrossRef, searchJournal, type CrossRefArticle } from "../crossref";
import { searchEuropePMC, searchOpenAccessArticles, type EuropePMCArticle } from "../europepmc";
import {
  searchSemanticScholar,
  toUnifiedArticle as convertSemanticScholar,
  type SemanticScholarPaper,
} from "../semanticscholar";

export interface UnifiedArticle {
  // Identifiers
  id: string;
  source: "pubmed" | "crossref" | "europepmc" | "semanticscholar";
  pmid?: string;
  doi?: string;
  pmcid?: string;
  paperId?: string; // Semantic Scholar ID

  // Core metadata
  title: string;
  authors: string[];
  journal: string;
  publisher?: string;
  published: string; // YYYY-MM-DD or YYYY

  // Content
  abstract?: string;

  // Classification
  type: string;
  specialty?: string;

  // Links
  url: string;
  fullTextUrl?: string;
  pdfUrl?: string;

  // Metrics
  citationCount: number;
  influentialCitationCount?: number; // Semantic Scholar AI metric
  isOpenAccess: boolean;

  // Additional metadata
  volume?: string;
  issue?: string;
  pages?: string;

  // Search relevance
  relevanceScore?: number;
}

export interface UnifiedSearchParams {
  query: string;
  sources?: ("pubmed" | "crossref" | "europepmc" | "semanticscholar")[]; // Which sources to search
  maxResults?: number; // Total results to return
  filters?: {
    journal?: string; // Specific journal name or ISSN
    fromDate?: string; // YYYY-MM-DD
    toDate?: string; // YYYY-MM-DD
    articleType?: "clinical-trial" | "review" | "guideline" | "meta-analysis" | "case-report";
    openAccessOnly?: boolean;
    hasAbstract?: boolean;
    minCitations?: number;
  };
  sort?: "relevance" | "date" | "citations";
}

/**
 * Search all available sources and return unified results
 * @param params Search parameters
 * @returns Unified article results from all sources
 */
export async function searchAllSources(
  params: UnifiedSearchParams
): Promise<{ articles: UnifiedArticle[]; totalResults: number; sourceBreakdown: Record<string, number> }> {
  const sources = params.sources || ["pubmed", "crossref", "europepmc", "semanticscholar"];
  const maxPerSource = Math.ceil((params.maxResults || 30) / sources.length);

  const searchPromises: Promise<{ source: string; articles: UnifiedArticle[]; total: number }>[] = [];

  // Search PubMed
  if (sources.includes("pubmed")) {
    searchPromises.push(searchPubMedSource(params, maxPerSource));
  }

  // Search CrossRef
  if (sources.includes("crossref")) {
    searchPromises.push(searchCrossRefSource(params, maxPerSource));
  }

  // Search Europe PMC
  if (sources.includes("europepmc")) {
    searchPromises.push(searchEuropePMCSource(params, maxPerSource));
  }

  // Search Semantic Scholar
  if (sources.includes("semanticscholar")) {
    searchPromises.push(searchSemanticScholarSource(params, maxPerSource));
  }

  const results = await Promise.all(searchPromises);

  // Combine and deduplicate results
  const allArticles: UnifiedArticle[] = [];
  const sourceBreakdown: Record<string, number> = {};
  let totalResults = 0;

  for (const result of results) {
    sourceBreakdown[result.source] = result.total;
    totalResults += result.total;
    allArticles.push(...result.articles);
  }

  // Deduplicate by DOI or PMID
  const deduplicatedArticles = deduplicateArticles(allArticles);

  // Sort results
  const sortedArticles = sortArticles(deduplicatedArticles, params.sort || "relevance");

  // Apply additional filters
  const filteredArticles = applyFilters(sortedArticles, params.filters);

  // Limit to maxResults
  const finalArticles = filteredArticles.slice(0, params.maxResults || 30);

  return {
    articles: finalArticles,
    totalResults,
    sourceBreakdown,
  };
}

/**
 * Search specific journal across all sources
 * @param journal Journal name (NEJM, Lancet, JAMA, etc.)
 * @param query Search query
 * @param limit Max results
 * @returns Articles from that journal
 */
export async function searchSpecificJournal(
  journal: string,
  query: string,
  limit: number = 20
): Promise<{ articles: UnifiedArticle[]; totalResults: number }> {
  return searchAllSources({
    query,
    maxResults: limit,
    filters: {
      journal,
    },
    sort: "date",
  });
}

/**
 * Get trending articles (most cited recent papers)
 * @param topic Topic or specialty
 * @param limit Max results
 * @returns Highly cited recent articles
 */
export async function getTrendingArticles(
  topic: string,
  limit: number = 20
): Promise<{ articles: UnifiedArticle[]; totalResults: number }> {
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

  return searchAllSources({
    query: topic,
    maxResults: limit,
    filters: {
      fromDate: twoYearsAgo.toISOString().split("T")[0],
    },
    sort: "citations",
  });
}

/**
 * Get open access articles only
 * @param query Search query
 * @param limit Max results
 * @returns Open access articles
 */
export async function searchOpenAccess(
  query: string,
  limit: number = 20
): Promise<{ articles: UnifiedArticle[]; totalResults: number }> {
  return searchAllSources({
    query,
    maxResults: limit,
    sources: ["europepmc", "crossref"], // Sources with good OA support
    filters: {
      openAccessOnly: true,
    },
  });
}

// Source-specific search functions

async function searchPubMedSource(
  params: UnifiedSearchParams,
  maxResults: number
): Promise<{ source: string; articles: UnifiedArticle[]; total: number }> {
  try {
    let searchQuery = params.query;

    // Add English language filter (default)
    searchQuery += " AND English[Language]";

    // Add type filter if specified
    if (params.filters?.articleType) {
      const typeMap: Record<string, string> = {
        "clinical-trial": "Clinical Trial[PT]",
        review: "Review[PT]",
        guideline: "Guideline[PT]",
        "meta-analysis": "Meta-Analysis[PT]",
        "case-report": "Case Reports[PT]",
      };
      searchQuery += ` AND ${typeMap[params.filters.articleType]}`;
    }

    const searchResult = await searchPubMed({
      query: searchQuery,
      retmax: maxResults,
      sort: params.sort === "date" ? "pub_date" : "relevance",
      mindate: params.filters?.fromDate?.replace(/-/g, "/"),
      maxdate: params.filters?.toDate?.replace(/-/g, "/"),
    });

    const articles = await fetchPubMedArticles(searchResult.pmids);

    return {
      source: "pubmed",
      articles: articles.map(convertPubMedArticle),
      total: searchResult.count,
    };
  } catch (error) {
    logger.error("PubMed search error:", error instanceof Error ? error : new Error(String(error)));
    return { source: "pubmed", articles: [], total: 0 };
  }
}

async function searchCrossRefSource(
  params: UnifiedSearchParams,
  maxResults: number
): Promise<{ source: string; articles: UnifiedArticle[]; total: number }> {
  try {
    const result = await searchCrossRef({
      query: params.query,
      rows: maxResults,
      sort: params.sort === "date" ? "published" : params.sort === "citations" ? "is-referenced-by-count" : "relevance",
      filter: {
        fromPublishedDate: params.filters?.fromDate,
        untilPublishedDate: params.filters?.toDate,
        hasAbstract: params.filters?.hasAbstract,
        container: params.filters?.journal,
      },
    });

    return {
      source: "crossref",
      articles: result.articles.map(convertCrossRefArticle),
      total: result.totalResults,
    };
  } catch (error) {
    logger.error("CrossRef search error:", error instanceof Error ? error : new Error(String(error)));
    return { source: "crossref", articles: [], total: 0 };
  }
}

async function searchEuropePMCSource(
  params: UnifiedSearchParams,
  maxResults: number
): Promise<{ source: string; articles: UnifiedArticle[]; total: number }> {
  try {
    // Add English language filter to query
    const queryWithLang = `${params.query} AND LANG:eng`;

    const result = await searchEuropePMC({
      query: queryWithLang,
      pageSize: maxResults,
      sort: params.sort === "date" ? "date" : params.sort === "citations" ? "cited" : "relevance",
    });

    return {
      source: "europepmc",
      articles: result.articles.map(convertEuropePMCArticle),
      total: result.totalResults,
    };
  } catch (error) {
    logger.error("Europe PMC search error:", error instanceof Error ? error : new Error(String(error)));
    return { source: "europepmc", articles: [], total: 0 };
  }
}

async function searchSemanticScholarSource(
  params: UnifiedSearchParams,
  maxResults: number
): Promise<{ source: string; articles: UnifiedArticle[]; total: number }> {
  try {
    const currentYear = new Date().getFullYear();
    let yearFilter: string | undefined;

    if (params.filters?.fromDate && params.filters?.toDate) {
      const fromYear = new Date(params.filters.fromDate).getFullYear();
      const toYear = new Date(params.filters.toDate).getFullYear();
      yearFilter = `${fromYear}-${toYear}`;
    } else if (params.filters?.fromDate) {
      const fromYear = new Date(params.filters.fromDate).getFullYear();
      yearFilter = `${fromYear}-${currentYear}`;
    }

    const result = await searchSemanticScholar({
      query: params.query,
      limit: maxResults,
      year: yearFilter,
      openAccessPdf: params.filters?.openAccessOnly,
      fieldsOfStudy: ["Medicine", "Biology"],
    });

    return {
      source: "semanticscholar",
      articles: result.papers.map(convertSemanticScholar),
      total: result.total,
    };
  } catch (error) {
    logger.error("Semantic Scholar search error:", error instanceof Error ? error : new Error(String(error)));
    return { source: "semanticscholar", articles: [], total: 0 };
  }
}

// Conversion functions

function convertPubMedArticle(article: PubMedArticle): UnifiedArticle {
  return {
    id: `pubmed-${article.pmid}`,
    source: "pubmed",
    pmid: article.pmid,
    doi: article.doi,
    title: article.title,
    authors: article.authors,
    journal: article.journal,
    published: article.year.toString(),
    abstract: article.abstract,
    type: "journal-article",
    url: article.url,
    citationCount: 0, // PubMed doesn't provide citation counts
    isOpenAccess: false,
  };
}

function convertCrossRefArticle(article: CrossRefArticle): UnifiedArticle {
  return {
    id: `crossref-${article.doi}`,
    source: "crossref",
    doi: article.doi,
    title: article.title,
    authors: article.authors,
    journal: article.journal,
    publisher: article.publisher,
    published: article.published,
    abstract: article.abstract,
    type: article.type,
    url: article.url,
    citationCount: article.citationCount,
    isOpenAccess: article.isOpenAccess,
    volume: article.volume,
    issue: article.issue,
    pages: article.pages,
  };
}

function convertEuropePMCArticle(article: EuropePMCArticle): UnifiedArticle {
  return {
    id: `europepmc-${article.id}`,
    source: "europepmc",
    pmid: article.pmid,
    pmcid: article.pmcid,
    doi: article.doi,
    title: article.title,
    authors: article.authors,
    journal: article.journal,
    published: article.published,
    abstract: article.abstract,
    type: article.type,
    url: article.fullTextUrl || `https://europepmc.org/article/${article.source}/${article.id}`,
    fullTextUrl: article.fullTextUrl,
    citationCount: article.citationCount,
    isOpenAccess: article.isOpenAccess,
  };
}

// Utility functions

function deduplicateArticles(articles: UnifiedArticle[]): UnifiedArticle[] {
  const seen = new Set<string>();
  const deduplicated: UnifiedArticle[] = [];

  for (const article of articles) {
    // Create unique key from DOI or PMID
    const key = article.doi || article.pmid || article.id;

    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(article);
    }
  }

  return deduplicated;
}

function sortArticles(articles: UnifiedArticle[], sortBy: "relevance" | "date" | "citations"): UnifiedArticle[] {
  if (sortBy === "date") {
    return articles.sort((a, b) => {
      const dateA = new Date(a.published);
      const dateB = new Date(b.published);
      return dateB.getTime() - dateA.getTime();
    });
  }

  if (sortBy === "citations") {
    return articles.sort((a, b) => b.citationCount - a.citationCount);
  }

  // Relevance is already sorted by the individual sources
  return articles;
}

function applyFilters(articles: UnifiedArticle[], filters?: UnifiedSearchParams["filters"]): UnifiedArticle[] {
  if (!filters) return articles;

  return articles.filter((article) => {
    if (filters.openAccessOnly && !article.isOpenAccess) return false;
    if (filters.hasAbstract && !article.abstract) return false;
    if (filters.minCitations && article.citationCount < filters.minCitations) return false;
    return true;
  });
}

/**
 * STRATEGIC EVIDENCE SEARCH (OpenEvidence-style)
 * Searches in priority order: Guidelines → Meta-analyses → Systematic Reviews → RCTs
 * This ensures we get the highest-quality evidence first
 */
export async function searchStrategicEvidence(
  query: string,
  maxResults: number = 20
): Promise<{ articles: UnifiedArticle[]; totalResults: number; sourceBreakdown: Record<string, number> }> {
  const allArticles: UnifiedArticle[] = [];
  const sourceBreakdown: Record<string, number> = {
    guidelines: 0,
    metaAnalyses: 0,
    systematicReviews: 0,
    rcts: 0,
    general: 0,
  };

  logger.debug("[Strategic Search] Phase 1: Searching for GUIDELINES...");
  // Phase 1: Search for clinical practice guidelines (highest priority)
  try {
    const guidelineResult = await searchPubMed({
      query,
      retmax: 8, // Increased from 5 to 8
      publicationType: "guideline",
      sort: "relevance",
    });

    if (guidelineResult.pmids.length > 0) {
      const articles = await fetchPubMedArticles(guidelineResult.pmids);
      allArticles.push(...articles.map(convertPubMedArticle));
      sourceBreakdown.guidelines = guidelineResult.count;
      logger.debug(`[Strategic Search] Found ${guidelineResult.pmids.length} guidelines`);
    }
  } catch (error) {
    logger.error("[Strategic Search] Guideline search failed:", error instanceof Error ? error : new Error(String(error)));
  }

  logger.debug("[Strategic Search] Phase 2: Searching for META-ANALYSES...");
  // Phase 2: Search for meta-analyses
  if (allArticles.length < maxResults) {
    try {
      const metaResult = await searchPubMed({
        query,
        retmax: 8, // Increased from 5 to 8
        publicationType: "meta-analysis",
        sort: "relevance",
      });

      if (metaResult.pmids.length > 0) {
        const articles = await fetchPubMedArticles(metaResult.pmids);
        allArticles.push(...articles.map(convertPubMedArticle));
        sourceBreakdown.metaAnalyses = metaResult.count;
        logger.debug(`[Strategic Search] Found ${metaResult.pmids.length} meta-analyses`);
      }
    } catch (error) {
      logger.error("[Strategic Search] Meta-analysis search failed:", error instanceof Error ? error : new Error(String(error)));
    }
  }

  logger.debug("[Strategic Search] Phase 3: Searching for SYSTEMATIC REVIEWS...");
  // Phase 3: Search for systematic reviews
  if (allArticles.length < maxResults) {
    try {
      const reviewResult = await searchPubMed({
        query,
        retmax: 8, // Increased from 5 to 8
        publicationType: "systematic-review",
        sort: "relevance",
      });

      if (reviewResult.pmids.length > 0) {
        const articles = await fetchPubMedArticles(reviewResult.pmids);
        allArticles.push(...articles.map(convertPubMedArticle));
        sourceBreakdown.systematicReviews = reviewResult.count;
        logger.debug(`[Strategic Search] Found ${reviewResult.pmids.length} systematic reviews`);
      }
    } catch (error) {
      logger.error("[Strategic Search] Systematic review search failed:", error instanceof Error ? error : new Error(String(error)));
    }
  }

  logger.debug("[Strategic Search] Phase 4: Searching for RCTs...");
  // Phase 4: Search for major RCTs
  if (allArticles.length < maxResults) {
    try {
      const rctResult = await searchPubMed({
        query,
        retmax: 12, // Increased from 8 to 12
        publicationType: "rct",
        sort: "relevance",
      });

      if (rctResult.pmids.length > 0) {
        const articles = await fetchPubMedArticles(rctResult.pmids);
        allArticles.push(...articles.map(convertPubMedArticle));
        sourceBreakdown.rcts = rctResult.count;
        logger.debug(`[Strategic Search] Found ${rctResult.pmids.length} RCTs`);
      }
    } catch (error) {
      logger.error("[Strategic Search] RCT search failed:", error instanceof Error ? error : new Error(String(error)));
    }
  }

  // Phase 5: If still not enough, do general high-quality search
  if (allArticles.length < 10) {
    logger.debug("[Strategic Search] Phase 5: General high-quality search...");
    try {
      const generalResult = await searchAllSources({
        query,
        maxResults: maxResults - allArticles.length,
        sources: ["europepmc", "crossref"],
        sort: "relevance",
      });

      allArticles.push(...generalResult.articles);
      sourceBreakdown.general = generalResult.totalResults;
      logger.debug(`[Strategic Search] Added ${generalResult.articles.length} general articles`);
    } catch (error) {
      logger.error("[Strategic Search] General search failed:", error instanceof Error ? error : new Error(String(error)));
    }
  }

  // Deduplicate
  logger.debug(`[Strategic Search] Before deduplication: ${allArticles.length} articles`);
  const deduplicatedArticles = deduplicateArticles(allArticles);
  logger.debug(`[Strategic Search] After deduplication: ${deduplicatedArticles.length} articles`);

  const totalResults = Object.values(sourceBreakdown).reduce((sum, count) => sum + count, 0);

  const finalArticles = deduplicatedArticles.slice(0, maxResults);
  logger.debug(`[Strategic Search] Final selection: ${finalArticles.length} articles (max: ${maxResults})`);
  logger.debug(`[Strategic Search] Complete: ${deduplicatedArticles.length} unique articles from ${totalResults} total`);
  logger.debug("[Strategic Search] Breakdown", { value: sourceBreakdown });

  return {
    articles: finalArticles,
    totalResults,
    sourceBreakdown,
  };
}
