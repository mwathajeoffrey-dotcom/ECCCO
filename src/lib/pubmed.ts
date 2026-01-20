import { logger } from '@/lib/logger';
/**
 * PubMed Integration Library
 * Interfaces with NCBI E-utilities API to search and fetch research papers
 *
 * API Documentation: https://www.ncbi.nlm.nih.gov/books/NBK25501/
 * E-utilities Base URL: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/
 */

const PUBMED_BASE_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const DEFAULT_RETMAX = 20; // Number of results to return
const API_DELAY = 334; // ~3 requests per second (NCBI rate limit for no API key)

export interface PubMedSearchParams {
  query: string;
  retmax?: number;
  retstart?: number;
  sort?: "relevance" | "pub_date" | "recently_added";
  mindate?: string; // YYYY/MM/DD
  maxdate?: string; // YYYY/MM/DD
  publicationType?: "guideline" | "meta-analysis" | "systematic-review" | "rct"; // NEW: Filter by type
}

export interface PubMedArticle {
  pmid: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  abstract?: string;
  pubDate: string;
  pmcid?: string;
  url: string;
}

export interface PubMedSearchResult {
  count: number;
  pmids: string[];
  retmax: number;
  retstart: number;
}

/**
 * Search PubMed for articles matching a query
 * @param params Search parameters
 * @returns Search results with PMIDs
 */
export async function searchPubMed(params: PubMedSearchParams): Promise<PubMedSearchResult> {
  const {
    query,
    retmax = DEFAULT_RETMAX,
    retstart = 0,
    sort = "relevance",
    mindate,
    maxdate,
    publicationType,
  } = params;

  // Enhance query with publication type filters
  let enhancedQuery = query;

  if (publicationType === "guideline") {
    enhancedQuery = `${query} AND (guideline[Publication Type] OR "practice guideline"[Publication Type] OR "consensus development conference"[Publication Type])`;
  } else if (publicationType === "meta-analysis") {
    enhancedQuery = `${query} AND ("meta-analysis"[Publication Type] OR "meta analysis"[Title/Abstract])`;
  } else if (publicationType === "systematic-review") {
    enhancedQuery = `${query} AND ("systematic review"[Publication Type] OR "systematic review"[Title/Abstract])`;
  } else if (publicationType === "rct") {
    enhancedQuery = `${query} AND ("randomized controlled trial"[Publication Type] OR "clinical trial"[Publication Type])`;
  }

  const searchParams = new URLSearchParams({
    db: "pubmed",
    term: enhancedQuery,
    retmax: retmax.toString(),
    retstart: retstart.toString(),
    retmode: "json",
    sort: sort,
  });

  if (mindate) searchParams.append("mindate", mindate);
  if (maxdate) searchParams.append("maxdate", maxdate);

  const url = `${PUBMED_BASE_URL}/esearch.fcgi?${searchParams.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`PubMed search failed: ${response.statusText}`);
    }

    const data = await response.json();
    const result = data.esearchresult;

    return {
      count: parseInt(result.count || "0", 10),
      pmids: result.idlist || [],
      retmax,
      retstart,
    };
  } catch (error) {
    logger.error("PubMed search error:", error instanceof Error ? error : new Error(String(error)));
    throw new Error(`Failed to search PubMed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Fetch detailed article information for given PMIDs
 * @param pmids Array of PubMed IDs
 * @returns Array of article details
 */
export async function fetchPubMedArticles(pmids: string[]): Promise<PubMedArticle[]> {
  if (!pmids || pmids.length === 0) {
    return [];
  }

  // NCBI recommends fetching in batches of 200 or less
  const batchSize = 200;
  const articles: PubMedArticle[] = [];

  for (let i = 0; i < pmids.length; i += batchSize) {
    const batch = pmids.slice(i, i + batchSize);
    const batchArticles = await fetchPubMedBatch(batch);
    articles.push(...batchArticles);

    // Rate limiting: wait between batches
    if (i + batchSize < pmids.length) {
      await delay(API_DELAY);
    }
  }

  return articles;
}

/**
 * Fetch a batch of articles
 * @param pmids Array of PMIDs (max 200)
 * @returns Array of article details
 */
async function fetchPubMedBatch(pmids: string[]): Promise<PubMedArticle[]> {
  const url = `${PUBMED_BASE_URL}/efetch.fcgi?db=pubmed&id=${pmids.join(",")}&retmode=xml`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`PubMed fetch failed: ${response.statusText}`);
    }

    const xmlText = await response.text();
    return parseArticlesFromXML(xmlText);
  } catch (error) {
    logger.error("PubMed fetch error:", error instanceof Error ? error : new Error(String(error)));
    throw new Error(`Failed to fetch PubMed articles: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Parse article data from PubMed XML response
 * @param xmlText XML response from PubMed
 * @returns Array of parsed articles
 */
function parseArticlesFromXML(xmlText: string): PubMedArticle[] {
  const articles: PubMedArticle[] = [];

  try {
    // Simple XML parsing - in production, consider using a proper XML parser
    const articleRegex = /<PubmedArticle>([\s\S]*?)<\/PubmedArticle>/g;
    let match;

    while ((match = articleRegex.exec(xmlText)) !== null) {
      const articleXml = match[1];
      const article = parseArticle(articleXml);
      if (article) {
        articles.push(article);
      }
    }
  } catch (error) {
    logger.error("XML parsing error:", error instanceof Error ? error : new Error(String(error)));
  }

  return articles;
}

/**
 * Parse a single article from XML
 * @param xml Article XML content
 * @returns Parsed article or null
 */
function parseArticle(xml: string): PubMedArticle | null {
  try {
    // Extract PMID
    const pmidMatch = xml.match(/<PMID[^>]*>(\d+)<\/PMID>/);
    const pmid = pmidMatch ? pmidMatch[1] : "";

    if (!pmid) return null;

    // Extract title
    const titleMatch = xml.match(/<ArticleTitle>([\s\S]*?)<\/ArticleTitle>/);
    const title = titleMatch ? cleanHtml(titleMatch[1]) : "No title available";

    // Extract authors
    const authors = extractAuthors(xml);

    // Extract journal info
    const journalMatch = xml.match(/<Title>(.*?)<\/Title>/);
    const journal = journalMatch ? cleanHtml(journalMatch[1]) : "Unknown Journal";

    // Extract publication year
    const yearMatch = xml.match(/<PubDate>[\s\S]*?<Year>(\d{4})<\/Year>[\s\S]*?<\/PubDate>/);
    const year = yearMatch ? parseInt(yearMatch[1], 10) : new Date().getFullYear();

    // Extract volume, issue, pages
    const volumeMatch = xml.match(/<Volume>(.*?)<\/Volume>/);
    const volume = volumeMatch ? volumeMatch[1] : undefined;

    const issueMatch = xml.match(/<Issue>(.*?)<\/Issue>/);
    const issue = issueMatch ? issueMatch[1] : undefined;

    const pagesMatch = xml.match(/<MedlinePgn>(.*?)<\/MedlinePgn>/);
    const pages = pagesMatch ? pagesMatch[1] : undefined;

    // Extract DOI
    const doiMatch = xml.match(/<ArticleId IdType="doi">(.*?)<\/ArticleId>/);
    const doi = doiMatch ? doiMatch[1] : undefined;

    // Extract PMCID
    const pmcidMatch = xml.match(/<ArticleId IdType="pmc">(.*?)<\/ArticleId>/);
    const pmcid = pmcidMatch ? pmcidMatch[1] : undefined;

    // Extract abstract
    const abstractMatch = xml.match(/<Abstract>([\s\S]*?)<\/Abstract>/);
    const abstract = abstractMatch ? extractAbstractText(abstractMatch[1]) : undefined;

    // Extract publication date
    const pubDateMatch = xml.match(/<PubDate>[\s\S]*?<\/PubDate>/);
    const pubDate = pubDateMatch ? extractPubDate(pubDateMatch[0]) : year.toString();

    return {
      pmid,
      title,
      authors,
      journal,
      year,
      volume,
      issue,
      pages,
      doi,
      abstract,
      pubDate,
      pmcid,
      url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
    };
  } catch (error) {
    logger.error("Error parsing article:", error instanceof Error ? error : new Error(String(error)));
    return null;
  }
}

/**
 * Extract author names from article XML
 * @param xml Article XML content
 * @returns Array of author names
 */
function extractAuthors(xml: string): string[] {
  const authors: string[] = [];
  const authorRegex = /<Author[^>]*>([\s\S]*?)<\/Author>/g;
  let match;

  while ((match = authorRegex.exec(xml)) !== null) {
    const authorXml = match[1];
    const lastNameMatch = authorXml.match(/<LastName>(.*?)<\/LastName>/);
    const firstNameMatch = authorXml.match(/<ForeName>(.*?)<\/ForeName>/);
    const initialsMatch = authorXml.match(/<Initials>(.*?)<\/Initials>/);

    if (lastNameMatch) {
      const lastName = lastNameMatch[1];
      const firstName = firstNameMatch ? firstNameMatch[1] : initialsMatch ? initialsMatch[1] : "";
      authors.push(firstName ? `${lastName} ${firstName}` : lastName);
    }
  }

  return authors.length > 0 ? authors : ["Unknown Authors"];
}

/**
 * Extract abstract text from abstract XML
 * @param abstractXml Abstract XML content
 * @returns Plain text abstract
 */
function extractAbstractText(abstractXml: string): string {
  const sections: string[] = [];
  const textRegex = /<AbstractText[^>]*>([\s\S]*?)<\/AbstractText>/g;
  let match;

  while ((match = textRegex.exec(abstractXml)) !== null) {
    const text = cleanHtml(match[1]);
    if (text) sections.push(text);
  }

  return sections.join(" ");
}

/**
 * Extract publication date from PubDate XML
 * @param pubDateXml PubDate XML content
 * @returns Formatted date string
 */
function extractPubDate(pubDateXml: string): string {
  const yearMatch = pubDateXml.match(/<Year>(\d{4})<\/Year>/);
  const monthMatch = pubDateXml.match(/<Month>(\w+)<\/Month>/);
  const dayMatch = pubDateXml.match(/<Day>(\d+)<\/Day>/);

  const year = yearMatch ? yearMatch[1] : "";
  const month = monthMatch ? monthMatch[1] : "";
  const day = dayMatch ? dayMatch[1] : "";

  return [year, month, day].filter(Boolean).join(" ");
}

/**
 * Clean HTML tags and entities from text
 * @param text Text with potential HTML
 * @returns Cleaned text
 */
function cleanHtml(text: string): string {
  return text
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
}

/**
 * Delay execution for rate limiting
 * @param ms Milliseconds to delay
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Search and fetch articles in one call
 * @param params Search parameters
 * @returns Array of articles with full details
 */
export async function searchAndFetchArticles(
  params: PubMedSearchParams
): Promise<{ articles: PubMedArticle[]; totalCount: number }> {
  // Search for articles
  const searchResult = await searchPubMed(params);

  // Fetch full article details
  const articles = await fetchPubMedArticles(searchResult.pmids);

  return {
    articles,
    totalCount: searchResult.count,
  };
}

/**
 * Format article as citation
 * @param article PubMed article
 * @returns Formatted citation string
 */
export function formatCitation(article: PubMedArticle): string {
  const authorList =
    article.authors.length > 3 ? `${article.authors.slice(0, 3).join(", ")}, et al.` : article.authors.join(", ");

  const parts = [authorList, article.title, article.journal, article.year];

  if (article.volume) parts.push(`${article.volume}${article.issue ? `(${article.issue})` : ""}`);
  if (article.pages) parts.push(article.pages);
  if (article.doi) parts.push(`doi: ${article.doi}`);

  return parts.filter(Boolean).join(". ") + ".";
}
