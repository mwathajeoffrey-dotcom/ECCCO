/**
 * PubMed E-utilities API Integration
 * 
 * Reference: https://www.ncbi.nlm.nih.gov/books/NBK25501/
 * 
 * E-utilities are free to use but require:
 * 1. Rate limiting (max 3 requests/second without API key, 10/second with key)
 * 2. API key for production (get from https://www.ncbi.nlm.nih.gov/account/)
 */

export interface PubMedArticle {
  pmid: string;
  doi?: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  abstract?: string;
  publicationDate?: string;
}

const PUBMED_BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const API_KEY = process.env.PUBMED_API_KEY || ''; // Optional but recommended

/**
 * Search PubMed for articles
 * 
 * @param query - Search query (e.g., "sepsis AND emergency medicine[MeSH]")
 * @param maxResults - Maximum number of results to return (default: 20)
 * @returns Array of PMIDs
 */
export async function searchPubMed(query: string, maxResults: number = 20): Promise<string[]> {
  const params = new URLSearchParams({
    db: 'pubmed',
    term: query,
    retmax: maxResults.toString(),
    retmode: 'json',
    ...(API_KEY && { api_key: API_KEY }),
  });

  const response = await fetch(`${PUBMED_BASE_URL}/esearch.fcgi?${params}`);
  
  if (!response.ok) {
    throw new Error(`PubMed search failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.esearchresult?.idlist || [];
}

/**
 * Fetch article details from PubMed
 * 
 * @param pmids - Array of PubMed IDs
 * @returns Array of article details
 */
export async function fetchPubMedArticles(pmids: string[]): Promise<PubMedArticle[]> {
  if (pmids.length === 0) return [];

  const params = new URLSearchParams({
    db: 'pubmed',
    id: pmids.join(','),
    retmode: 'xml',
    ...(API_KEY && { api_key: API_KEY }),
  });

  const response = await fetch(`${PUBMED_BASE_URL}/efetch.fcgi?${params}`);
  
  if (!response.ok) {
    throw new Error(`PubMed fetch failed: ${response.statusText}`);
  }

  const xmlText = await response.text();
  return parsePubMedXML(xmlText);
}

/**
 * Parse PubMed XML response (server-side with regex)
 */
function parsePubMedXML(xml: string): PubMedArticle[] {
  const articles: PubMedArticle[] = [];
  
  try {
    // Split XML into individual articles (replace newlines for easier matching)
    const cleanXml = xml.replace(/\n/g, ' ');
    const articleRegex = /<PubmedArticle>(.*?)<\/PubmedArticle>/g;
    let articleMatch;

    while ((articleMatch = articleRegex.exec(cleanXml)) !== null) {
      const articleXml = articleMatch[1];
      
      try {
        // Extract PMID
        const pmidMatch = articleXml.match(/<PMID[^>]*>(\d+)<\/PMID>/);
        const pmid = pmidMatch ? pmidMatch[1] : '';

        // Extract title
        const titleMatch = articleXml.match(/<ArticleTitle>(.*?)<\/ArticleTitle>/);
        const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : '';

        // Extract authors
        const authors: string[] = [];
        const authorRegex = /<Author[^>]*>(.*?)<\/Author>/g;
        let authorMatch;
        while ((authorMatch = authorRegex.exec(articleXml)) !== null) {
          const authorXml = authorMatch[1];
          const lastNameMatch = authorXml.match(/<LastName>(.*?)<\/LastName>/);
          const initialsMatch = authorXml.match(/<Initials>(.*?)<\/Initials>/);
          if (lastNameMatch) {
            const lastName = lastNameMatch[1];
            const initials = initialsMatch ? initialsMatch[1] : '';
            authors.push(`${lastName} ${initials}`.trim());
          }
        }

        // Extract journal
        const journalMatch = articleXml.match(/<Journal>.*?<Title>(.*?)<\/Title>.*?<\/Journal>/);
        const journal = journalMatch ? journalMatch[1] : '';

        // Extract year
        const yearMatch = articleXml.match(/<PubDate>.*?<Year>(\d{4})<\/Year>.*?<\/PubDate>/);
        const medlineYearMatch = articleXml.match(/<MedlineDate>.*?(\d{4}).*?<\/MedlineDate>/);
        const year = yearMatch ? parseInt(yearMatch[1]) : (medlineYearMatch ? parseInt(medlineYearMatch[1]) : new Date().getFullYear());

        // Extract abstract
        let abstract = '';
        const abstractRegex = /<AbstractText[^>]*Label="([^"]*)"[^>]*>(.*?)<\/AbstractText>/g;
        let absMatch;
        while ((absMatch = abstractRegex.exec(articleXml)) !== null) {
          const label = absMatch[1];
          const text = absMatch[2].replace(/<[^>]*>/g, '').trim();
          abstract += `${label}: ${text}\n\n`;
        }
        
        // Also check for unlabeled abstract
        if (!abstract) {
          const simpleAbstractMatch = articleXml.match(/<AbstractText>(.*?)<\/AbstractText>/);
          if (simpleAbstractMatch) {
            abstract = simpleAbstractMatch[1].replace(/<[^>]*>/g, '').trim();
          }
        }

        // Extract DOI
        const doiMatch = articleXml.match(/<ArticleId IdType="doi">(.*?)<\/ArticleId>/);
        const doi = doiMatch ? doiMatch[1] : undefined;

        if (pmid && title) {
          articles.push({
            pmid,
            doi,
            title,
            authors,
            journal,
            year,
            abstract: abstract.trim() || undefined,
          });
        }
      } catch (error) {
        console.error('Error parsing article:', error);
      }
    }
  } catch (error) {
    console.error('Error parsing PubMed XML:', error);
  }

  return articles;
}

/**
 * Search and fetch articles in one call
 * 
 * @param query - Search query
 * @param maxResults - Maximum number of results
 * @returns Array of article details
 */
export async function searchAndFetchPubMed(
  query: string,
  maxResults: number = 20
): Promise<PubMedArticle[]> {
  // Add delay to respect rate limits (333ms = ~3 requests/second)
  await new Promise(resolve => setTimeout(resolve, 333));
  
  const pmids = await searchPubMed(query, maxResults);
  
  if (pmids.length === 0) return [];
  
  // Add delay before fetch
  await new Promise(resolve => setTimeout(resolve, 333));
  
  return fetchPubMedArticles(pmids);
}

/**
 * Build PubMed search query for emergency medicine topics
 */
export function buildEmergencyMedicineQuery(topic: string): string {
  // Add MeSH terms and filters for emergency medicine
  return `${topic} AND ("emergency medicine"[MeSH Terms] OR "critical care"[MeSH Terms]) AND (Clinical Trial[ptyp] OR Meta-Analysis[ptyp] OR Randomized Controlled Trial[ptyp])`;
}

/**
 * Rate limiter for PubMed API
 */
class RateLimiter {
  private lastRequestTime: number = 0;
  private readonly minInterval: number = 333; // 3 requests per second

  async wait(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minInterval) {
      await new Promise(resolve => 
        setTimeout(resolve, this.minInterval - timeSinceLastRequest)
      );
    }
    
    this.lastRequestTime = Date.now();
  }
}

export const pubmedRateLimiter = new RateLimiter();
