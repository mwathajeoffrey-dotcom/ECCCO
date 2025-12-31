/**
 * Semantic Scholar API Integration
 * FREE API with AI-powered features for academic paper search
 * 
 * API Documentation: https://api.semanticscholar.org/
 * No API key required for basic usage! Rate limit: 100 requests/5 minutes
 * 
 * Features:
 * - 200M+ papers from all fields
 * - AI-powered relevance ranking
 * - Citation graphs and influence metrics
 * - Paper recommendations
 * - Author disambiguation
 * - Abstract embeddings
 */

const SEMANTIC_SCHOLAR_BASE_URL = 'https://api.semanticscholar.org/graph/v1';

export interface SemanticScholarPaper {
  paperId: string;
  externalIds?: {
    DOI?: string;
    PubMed?: string;
    ArXiv?: string;
  };
  title: string;
  abstract?: string;
  venue?: string; // Journal/conference name
  year?: number;
  authors: Array<{
    authorId?: string;
    name: string;
  }>;
  citationCount: number;
  influentialCitationCount: number; // AI-determined influential citations
  referenceCount: number;
  fieldsOfStudy?: string[];
  publicationTypes?: string[];
  publicationDate?: string;
  journal?: {
    name?: string;
    volume?: string;
    pages?: string;
  };
  isOpenAccess?: boolean;
  openAccessPdf?: {
    url: string;
    status: string;
  };
  url: string; // Semantic Scholar page
  embedding?: {
    model: string;
    vector: number[];
  };
}

export interface SemanticScholarSearchParams {
  query: string;
  limit?: number; // Max 100 per request
  offset?: number; // For pagination
  year?: string; // e.g., '2020-2024' or '2023'
  publicationTypes?: string[]; // e.g., ['JournalArticle', 'Review']
  openAccessPdf?: boolean; // Filter for open access PDFs
  fieldsOfStudy?: string[]; // e.g., ['Medicine', 'Biology']
  fields?: string[]; // Which fields to return (reduces response size)
}

/**
 * Search Semantic Scholar for papers
 * @param params Search parameters
 * @returns Papers and metadata
 */
export async function searchSemanticScholar(
  params: SemanticScholarSearchParams
): Promise<{ papers: SemanticScholarPaper[]; total: number; offset: number }> {
  try {
    const url = new URL(`${SEMANTIC_SCHOLAR_BASE_URL}/paper/search`);
    
    // Add query
    url.searchParams.append('query', params.query);
    
    // Add pagination
    url.searchParams.append('limit', Math.min(params.limit || 10, 100).toString());
    if (params.offset) {
      url.searchParams.append('offset', params.offset.toString());
    }
    
    // Add filters
    if (params.year) {
      url.searchParams.append('year', params.year);
    }
    if (params.publicationTypes && params.publicationTypes.length > 0) {
      url.searchParams.append('publicationTypes', params.publicationTypes.join(','));
    }
    if (params.openAccessPdf) {
      url.searchParams.append('openAccessPdf', '');
    }
    if (params.fieldsOfStudy && params.fieldsOfStudy.length > 0) {
      url.searchParams.append('fieldsOfStudy', params.fieldsOfStudy.join(','));
    }
    
    // Specify fields to return
    const fields = params.fields || [
      'paperId',
      'externalIds',
      'title',
      'abstract',
      'venue',
      'year',
      'authors',
      'citationCount',
      'influentialCitationCount',
      'referenceCount',
      'fieldsOfStudy',
      'publicationTypes',
      'publicationDate',
      'journal',
      'isOpenAccess',
      'openAccessPdf',
      'url',
    ];
    url.searchParams.append('fields', fields.join(','));
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      }
      throw new Error(`Semantic Scholar API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      papers: data.data || [],
      total: data.total || 0,
      offset: data.offset || 0,
    };
  } catch (error) {
    console.error('Semantic Scholar search error:', error);
    throw error;
  }
}

/**
 * Get paper details by ID (Semantic Scholar ID, DOI, PMID, or ArXiv ID)
 * @param paperId Paper identifier
 * @param idType Type of identifier
 * @returns Paper details
 */
export async function getPaperById(
  paperId: string,
  idType: 'semanticscholar' | 'doi' | 'pmid' | 'arxiv' = 'semanticscholar'
): Promise<SemanticScholarPaper | null> {
  try {
    const prefix = idType === 'semanticscholar' ? '' :
                  idType === 'doi' ? 'DOI:' :
                  idType === 'pmid' ? 'PMID:' :
                  'arXiv:';
    
    const fields = [
      'paperId',
      'externalIds',
      'title',
      'abstract',
      'venue',
      'year',
      'authors',
      'citationCount',
      'influentialCitationCount',
      'referenceCount',
      'fieldsOfStudy',
      'publicationTypes',
      'publicationDate',
      'journal',
      'isOpenAccess',
      'openAccessPdf',
      'url',
      'embedding',
    ];
    
    const url = `${SEMANTIC_SCHOLAR_BASE_URL}/paper/${prefix}${paperId}?fields=${fields.join(',')}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Semantic Scholar API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Semantic Scholar paper lookup error:', error);
    return null;
  }
}

/**
 * Get recommended papers based on a paper ID
 * Uses AI to find similar and relevant papers
 * @param paperId Semantic Scholar paper ID
 * @param limit Number of recommendations
 * @returns Recommended papers
 */
export async function getRecommendedPapers(
  paperId: string,
  limit: number = 10
): Promise<SemanticScholarPaper[]> {
  try {
    const fields = [
      'paperId',
      'externalIds',
      'title',
      'abstract',
      'venue',
      'year',
      'authors',
      'citationCount',
      'influentialCitationCount',
      'isOpenAccess',
      'openAccessPdf',
      'url',
    ];
    
    const url = `${SEMANTIC_SCHOLAR_BASE_URL}/paper/${paperId}/recommendations?fields=${fields.join(',')}&limit=${limit}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Semantic Scholar API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.recommendedPapers || [];
  } catch (error) {
    console.error('Semantic Scholar recommendations error:', error);
    return [];
  }
}

/**
 * Get papers that cite a given paper
 * @param paperId Semantic Scholar paper ID
 * @param limit Number of citing papers to return
 * @returns Citing papers
 */
export async function getCitingPapers(
  paperId: string,
  limit: number = 10
): Promise<{ papers: SemanticScholarPaper[]; total: number }> {
  try {
    const fields = [
      'paperId',
      'externalIds',
      'title',
      'venue',
      'year',
      'authors',
      'citationCount',
      'influentialCitationCount',
      'isOpenAccess',
      'url',
    ];
    
    const url = `${SEMANTIC_SCHOLAR_BASE_URL}/paper/${paperId}/citations?fields=${fields.join(',')}&limit=${limit}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Semantic Scholar API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      papers: (data.data || []).map((item: any) => item.citingPaper),
      total: data.total || 0,
    };
  } catch (error) {
    console.error('Semantic Scholar citations error:', error);
    return { papers: [], total: 0 };
  }
}

/**
 * Get papers referenced by a given paper
 * @param paperId Semantic Scholar paper ID
 * @param limit Number of references to return
 * @returns Referenced papers
 */
export async function getReferencedPapers(
  paperId: string,
  limit: number = 10
): Promise<{ papers: SemanticScholarPaper[]; total: number }> {
  try {
    const fields = [
      'paperId',
      'externalIds',
      'title',
      'venue',
      'year',
      'authors',
      'citationCount',
      'isOpenAccess',
      'url',
    ];
    
    const url = `${SEMANTIC_SCHOLAR_BASE_URL}/paper/${paperId}/references?fields=${fields.join(',')}&limit=${limit}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Semantic Scholar API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      papers: (data.data || []).map((item: any) => item.citedPaper),
      total: data.total || 0,
    };
  } catch (error) {
    console.error('Semantic Scholar references error:', error);
    return { papers: [], total: 0 };
  }
}

/**
 * Search for highly influential papers in a field
 * @param query Search query
 * @param minInfluentialCitations Minimum influential citation count
 * @param limit Number of results
 * @returns Highly influential papers
 */
export async function searchInfluentialPapers(
  query: string,
  minInfluentialCitations: number = 10,
  limit: number = 20
): Promise<{ papers: SemanticScholarPaper[]; total: number }> {
  try {
    const result = await searchSemanticScholar({
      query,
      limit,
      fields: [
        'paperId',
        'externalIds',
        'title',
        'abstract',
        'venue',
        'year',
        'authors',
        'citationCount',
        'influentialCitationCount',
        'isOpenAccess',
        'openAccessPdf',
        'url',
      ],
    });
    
    // Filter by influential citations
    const influential = result.papers.filter(
      p => p.influentialCitationCount >= minInfluentialCitations
    );
    
    // Sort by influential citation count
    influential.sort((a, b) => b.influentialCitationCount - a.influentialCitationCount);
    
    return {
      papers: influential,
      total: influential.length,
    };
  } catch (error) {
    console.error('Semantic Scholar influential search error:', error);
    return { papers: [], total: 0 };
  }
}

/**
 * Search for recent open access papers
 * @param query Search query
 * @param yearRange Year range (e.g., '2023-2024')
 * @param limit Number of results
 * @returns Recent open access papers
 */
export async function searchRecentOpenAccess(
  query: string,
  yearRange?: string,
  limit: number = 20
): Promise<{ papers: SemanticScholarPaper[]; total: number }> {
  const currentYear = new Date().getFullYear();
  const defaultYearRange = `${currentYear - 2}-${currentYear}`;
  
  return searchSemanticScholar({
    query,
    limit,
    year: yearRange || defaultYearRange,
    openAccessPdf: true,
  });
}

/**
 * Get bulk paper details (up to 500 at once)
 * @param paperIds Array of paper IDs
 * @returns Array of paper details
 */
export async function getBulkPapers(
  paperIds: string[]
): Promise<SemanticScholarPaper[]> {
  try {
    const fields = [
      'paperId',
      'externalIds',
      'title',
      'abstract',
      'venue',
      'year',
      'authors',
      'citationCount',
      'influentialCitationCount',
      'isOpenAccess',
      'openAccessPdf',
      'url',
    ];
    
    const response = await fetch(`${SEMANTIC_SCHOLAR_BASE_URL}/paper/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids: paperIds.slice(0, 500), // Max 500
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Semantic Scholar API error: ${response.status}`);
    }
    
    const papers = await response.json();
    return papers.filter((p: any) => p !== null);
  } catch (error) {
    console.error('Semantic Scholar bulk lookup error:', error);
    return [];
  }
}

/**
 * Format paper as citation (AMA style)
 * @param paper Semantic Scholar paper
 * @returns Formatted citation
 */
export function formatCitation(paper: SemanticScholarPaper): string {
  const authors = paper.authors.slice(0, 6).map(a => a.name);
  const authorString = authors.length <= 6 
    ? authors.join(', ')
    : `${authors.slice(0, 3).join(', ')}, et al`;
  
  let citation = `${authorString}. ${paper.title}.`;
  
  if (paper.venue) citation += ` ${paper.venue}.`;
  if (paper.year) citation += ` ${paper.year}`;
  if (paper.journal?.volume) citation += `;${paper.journal.volume}`;
  if (paper.journal?.pages) citation += `:${paper.journal.pages}`;
  
  if (paper.externalIds?.DOI) {
    citation += `. doi:${paper.externalIds.DOI}`;
  }
  
  return citation;
}

/**
 * Convert Semantic Scholar paper to unified format
 * @param paper Semantic Scholar paper
 * @returns Unified article format
 */
export function toUnifiedArticle(paper: SemanticScholarPaper) {
  return {
    id: `semanticscholar-${paper.paperId}`,
    source: 'semanticscholar' as const,
    paperId: paper.paperId,
    pmid: paper.externalIds?.PubMed,
    doi: paper.externalIds?.DOI,
    title: paper.title,
    authors: paper.authors.map(a => a.name),
    journal: paper.venue || paper.journal?.name || 'Unknown',
    published: paper.year?.toString() || paper.publicationDate || 'Unknown',
    abstract: paper.abstract,
    type: paper.publicationTypes?.[0] || 'journal-article',
    url: paper.url,
    fullTextUrl: paper.openAccessPdf?.url,
    citationCount: paper.citationCount,
    influentialCitationCount: paper.influentialCitationCount,
    isOpenAccess: paper.isOpenAccess || false,
  };
}
