import { logger } from '@/lib/logger';
/**
 * CrossRef API Integration
 * FREE API for accessing 130M+ articles from all major publishers
 * 
 * API Documentation: https://www.crossref.org/documentation/retrieve-metadata/rest-api/
 * No API key required! Rate limit: 50 requests/second (very generous)
 */

const CROSSREF_BASE_URL = 'https://api.crossref.org';
const POLITE_EMAIL = 'info@eccco.com'; // CrossRef prefers polite requests with email

export interface CrossRefArticle {
  doi: string;
  title: string;
  authors: string[];
  journal: string;
  publisher: string;
  published: string; // YYYY-MM-DD
  abstract?: string;
  url: string;
  type: string; // 'journal-article', 'review-article', etc.
  citationCount: number;
  isOpenAccess: boolean;
  license?: string[];
  volume?: string;
  issue?: string;
  pages?: string;
  issn?: string[];
  subject?: string[];
}

export interface CrossRefSearchParams {
  query: string;
  rows?: number; // Number of results (default: 20, max: 1000)
  offset?: number; // For pagination
  sort?: 'relevance' | 'published' | 'updated' | 'is-referenced-by-count'; // Citation count
  order?: 'asc' | 'desc';
  filter?: {
    fromPublishedDate?: string; // YYYY-MM-DD
    untilPublishedDate?: string;
    type?: string[]; // ['journal-article', 'review-article']
    hasAbstract?: boolean;
    hasFullText?: boolean;
    publisher?: string; // Filter by publisher name
    container?: string; // Journal name
    issn?: string; // Specific journal ISSN
  };
}

/**
 * Search CrossRef for academic articles
 * @param params Search parameters
 * @returns Array of articles
 */
export async function searchCrossRef(
  params: CrossRefSearchParams
): Promise<{ articles: CrossRefArticle[]; totalResults: number }> {
  try {
    const url = new URL(`${CROSSREF_BASE_URL}/works`);
    
    // Add query
    url.searchParams.append('query', params.query);
    
    // Add pagination
    url.searchParams.append('rows', (params.rows || 20).toString());
    if (params.offset) {
      url.searchParams.append('offset', params.offset.toString());
    }
    
    // Add sorting
    if (params.sort) {
      const sortField = params.sort === 'published' ? 'published' :
                       params.sort === 'updated' ? 'updated' :
                       params.sort === 'is-referenced-by-count' ? 'is-referenced-by-count' :
                       'relevance';
      url.searchParams.append('sort', sortField);
      url.searchParams.append('order', params.order || 'desc');
    }
    
    // Add filters
    if (params.filter) {
      const filters: string[] = [];
      
      if (params.filter.fromPublishedDate) {
        filters.push(`from-pub-date:${params.filter.fromPublishedDate}`);
      }
      if (params.filter.untilPublishedDate) {
        filters.push(`until-pub-date:${params.filter.untilPublishedDate}`);
      }
      if (params.filter.type && params.filter.type.length > 0) {
        params.filter.type.forEach(t => filters.push(`type:${t}`));
      }
      if (params.filter.hasAbstract) {
        filters.push('has-abstract:true');
      }
      if (params.filter.hasFullText) {
        filters.push('has-full-text:true');
      }
      if (params.filter.publisher) {
        filters.push(`publisher-name:${params.filter.publisher}`);
      }
      if (params.filter.container) {
        filters.push(`container-title:${params.filter.container}`);
      }
      if (params.filter.issn) {
        filters.push(`issn:${params.filter.issn}`);
      }
      
      if (filters.length > 0) {
        url.searchParams.append('filter', filters.join(','));
      }
    }
    
    // Add polite email for better rate limits
    url.searchParams.append('mailto', POLITE_EMAIL);
    
    const response = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'ECCCO-Platform/1.0 (https://eccco.vercel.app; mailto:info@eccco.com)',
      },
    });
    
    if (!response.ok) {
      throw new Error(`CrossRef API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    const articles: CrossRefArticle[] = data.message.items.map((item: any) => ({
      doi: item.DOI,
      title: Array.isArray(item.title) ? item.title[0] : item.title || 'Untitled',
      authors: extractAuthors(item.author || []),
      journal: extractJournalName(item),
      publisher: item.publisher || 'Unknown',
      published: extractPublishedDate(item),
      abstract: item.abstract || undefined,
      url: item.URL || `https://doi.org/${item.DOI}`,
      type: item.type || 'journal-article',
      citationCount: item['is-referenced-by-count'] || 0,
      isOpenAccess: item['is-oa'] || false,
      license: item.license?.map((l: any) => l.URL) || [],
      volume: item.volume,
      issue: item.issue,
      pages: item.page,
      issn: item.ISSN || [],
      subject: item.subject || [],
    }));
    
    return {
      articles,
      totalResults: data.message['total-results'] || 0,
    };
  } catch (error) {
    logger.error('CrossRef search error:', error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
}

/**
 * Get article by DOI
 * @param doi DOI identifier
 * @returns Article details
 */
export async function getArticleByDOI(doi: string): Promise<CrossRefArticle | null> {
  try {
    const url = `${CROSSREF_BASE_URL}/works/${doi}?mailto=${POLITE_EMAIL}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ECCCO-Platform/1.0 (https://eccco.vercel.app; mailto:info@eccco.com)',
      },
    });
    
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`CrossRef API error: ${response.status}`);
    }
    
    const data = await response.json();
    const item = data.message;
    
    return {
      doi: item.DOI,
      title: Array.isArray(item.title) ? item.title[0] : item.title || 'Untitled',
      authors: extractAuthors(item.author || []),
      journal: extractJournalName(item),
      publisher: item.publisher || 'Unknown',
      published: extractPublishedDate(item),
      abstract: item.abstract || undefined,
      url: item.URL || `https://doi.org/${item.DOI}`,
      type: item.type || 'journal-article',
      citationCount: item['is-referenced-by-count'] || 0,
      isOpenAccess: item['is-oa'] || false,
      license: item.license?.map((l: any) => l.URL) || [],
      volume: item.volume,
      issue: item.issue,
      pages: item.page,
      issn: item.ISSN || [],
      subject: item.subject || [],
    };
  } catch (error) {
    logger.error('CrossRef DOI lookup error:', error instanceof Error ? error : new Error(String(error)));
    return null;
  }
}

/**
 * Search specific journal (NEJM, Lancet, JAMA, etc.)
 * @param journal Journal name or ISSN
 * @param query Search query
 * @param limit Number of results
 * @returns Articles from that journal
 */
export async function searchJournal(
  journal: string,
  query: string,
  limit: number = 20
): Promise<{ articles: CrossRefArticle[]; totalResults: number }> {
  // Map common journal names to ISSNs for better accuracy
  const journalISSNs: Record<string, string> = {
    'NEJM': '0028-4793',
    'New England Journal of Medicine': '0028-4793',
    'Lancet': '0140-6736',
    'The Lancet': '0140-6736',
    'JAMA': '0098-7484',
    'BMJ': '0959-8138',
    'Annals of Emergency Medicine': '0196-0644',
    'Academic Emergency Medicine': '1069-6563',
    'Emergency Medicine Journal': '1472-0205',
  };
  
  const issn = journalISSNs[journal];
  
  return searchCrossRef({
    query,
    rows: limit,
    sort: 'published',
    order: 'desc',
    filter: {
      ...(issn ? { issn } : { container: journal }),
      type: ['journal-article', 'review-article'],
    },
  });
}

/**
 * Get trending articles (most cited recent papers)
 * @param topic Topic or keyword
 * @param limit Number of results
 * @returns Highly cited recent articles
 */
export async function getTrendingArticles(
  topic: string,
  limit: number = 10
): Promise<{ articles: CrossRefArticle[]; totalResults: number }> {
  const currentDate = new Date();
  const twoYearsAgo = new Date(currentDate.setFullYear(currentDate.getFullYear() - 2));
  
  return searchCrossRef({
    query: topic,
    rows: limit,
    sort: 'is-referenced-by-count',
    order: 'desc',
    filter: {
      fromPublishedDate: twoYearsAgo.toISOString().split('T')[0],
      type: ['journal-article', 'review-article'],
    },
  });
}

// Helper functions

function extractAuthors(authors: any[]): string[] {
  if (!authors || authors.length === 0) return ['Unknown'];
  
  return authors
    .slice(0, 10) // Limit to first 10 authors
    .map(author => {
      if (author.given && author.family) {
        return `${author.given} ${author.family}`;
      }
      if (author.name) {
        return author.name;
      }
      return author.family || 'Unknown';
    });
}

function extractJournalName(item: any): string {
  if (item['container-title'] && item['container-title'].length > 0) {
    return item['container-title'][0];
  }
  if (item['short-container-title'] && item['short-container-title'].length > 0) {
    return item['short-container-title'][0];
  }
  return 'Unknown Journal';
}

function extractPublishedDate(item: any): string {
  const dateParts = item.published?.['date-parts']?.[0] || 
                   item['published-print']?.['date-parts']?.[0] ||
                   item['published-online']?.['date-parts']?.[0];
  
  if (dateParts && dateParts.length > 0) {
    const [year, month = 1, day = 1] = dateParts;
    const date = new Date(year, month - 1, day);
    return date.toISOString().split('T')[0];
  }
  
  return 'Unknown';
}

/**
 * Format article as citation (AMA style)
 * @param article CrossRef article
 * @returns Formatted citation
 */
export function formatCitation(article: CrossRefArticle): string {
  const authors = article.authors.slice(0, 6);
  const authorString = authors.length <= 6 
    ? authors.join(', ')
    : `${authors.slice(0, 3).join(', ')}, et al`;
  
  const year = article.published.split('-')[0];
  
  let citation = `${authorString}. ${article.title}. ${article.journal}. ${year}`;
  
  if (article.volume) citation += `;${article.volume}`;
  if (article.issue) citation += `(${article.issue})`;
  if (article.pages) citation += `:${article.pages}`;
  
  citation += `. doi:${article.doi}`;
  
  return citation;
}
