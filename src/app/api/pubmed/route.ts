import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/admin';
import {
  searchPubMed,
  fetchPubMedArticles,
  searchAndFetchArticles,
  formatCitation,
  type PubMedSearchParams,
  type PubMedArticle,
} from '@/lib/pubmed';

/**
 * GET /api/pubmed
 * Search PubMed for research articles
 * 
 * Query Parameters:
 * - query: Search query string (required)
 * - retmax: Number of results to return (default: 20)
 * - retstart: Starting position (default: 0)
 * - sort: Sort order - 'relevance', 'pub_date', or 'recently_added' (default: 'relevance')
 * - mindate: Minimum date (YYYY/MM/DD)
 * - maxdate: Maximum date (YYYY/MM/DD)
 * - fetchDetails: Whether to fetch full article details (default: true)
 */
export async function GET(request: NextRequest) {
  try {
    // Check admin authorization
    const { authorized, error: authError } = await requireAdmin();
    if (!authorized) {
      return NextResponse.json(
        { error: authError || 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const retmax = parseInt(searchParams.get('retmax') || '20', 10);
    const retstart = parseInt(searchParams.get('retstart') || '0', 10);
    const sort = (searchParams.get('sort') || 'relevance') as 'relevance' | 'pub_date' | 'recently_added';
    const mindate = searchParams.get('mindate') || undefined;
    const maxdate = searchParams.get('maxdate') || undefined;
    const fetchDetails = searchParams.get('fetchDetails') !== 'false';

    const searchOptions: PubMedSearchParams = {
      query,
      retmax,
      retstart,
      sort,
      mindate,
      maxdate,
    };

    if (fetchDetails) {
      // Search and fetch full article details
      const { articles, totalCount } = await searchAndFetchArticles(searchOptions);

      return NextResponse.json({
        success: true,
        data: {
          articles,
          totalCount,
          retmax,
          retstart,
          query,
        },
      });
    } else {
      // Search only (return PMIDs)
      const searchResult = await searchPubMed(searchOptions);

      return NextResponse.json({
        success: true,
        data: {
          pmids: searchResult.pmids,
          totalCount: searchResult.count,
          retmax: searchResult.retmax,
          retstart: searchResult.retstart,
          query,
        },
      });
    }
  } catch (error) {
    logger.error('PubMed API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to search PubMed',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/pubmed
 * Fetch full article details for specific PMIDs
 * 
 * Body:
 * {
 *   "pmids": ["12345678", "87654321"],
 *   "format": "detailed" | "citation" (optional, default: "detailed")
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const { authorized, error: authError } = await requireAdmin();
    if (!authorized) {
      return NextResponse.json(
        { error: authError || 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { pmids, format = 'detailed' } = body;

    if (!pmids || !Array.isArray(pmids) || pmids.length === 0) {
      return NextResponse.json(
        { error: 'PMIDs array is required and must not be empty' },
        { status: 400 }
      );
    }

    // Validate PMIDs (should be numeric strings)
    const validPmids = pmids.filter((pmid) => /^\d+$/.test(String(pmid)));
    if (validPmids.length === 0) {
      return NextResponse.json(
        { error: 'No valid PMIDs provided' },
        { status: 400 }
      );
    }

    // Fetch articles
    const articles = await fetchPubMedArticles(validPmids.map(String));

    if (format === 'citation') {
      // Return formatted citations
      const citations = articles.map((article) => ({
        pmid: article.pmid,
        citation: formatCitation(article),
        url: article.url,
        doi: article.doi,
      }));

      return NextResponse.json({
        success: true,
        data: {
          citations,
          count: citations.length,
        },
      });
    }

    // Return full article details
    return NextResponse.json({
      success: true,
      data: {
        articles,
        count: articles.length,
      },
    });
  } catch (error) {
    logger.error('PubMed fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch articles',
      },
      { status: 500 }
    );
  }
}

/**
 * Example usage:
 * 
 * GET /api/pubmed?query=sepsis&retmax=10&sort=pub_date
 * 
 * POST /api/pubmed
 * {
 *   "pmids": ["12345678", "87654321"],
 *   "format": "detailed"
 * }
 */
