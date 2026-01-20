import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';
import { 
  searchAllSources, 
  searchSpecificJournal,
  getTrendingArticles,
  searchOpenAccess,
  type UnifiedSearchParams 
} from '@/lib/evidence/unified-search';
import { enhanceArticleWithContent } from '@/lib/evidence/content-extractor';

/**
 * GET /api/evidence/search
 * Unified search across PubMed, CrossRef, and Europe PMC
 * 
 * Query Parameters:
 * - q: Search query (required)
 * - sources: Comma-separated list of sources (pubmed,crossref,europepmc)
 * - limit: Max results (default: 30)
 * - journal: Specific journal name
 * - fromDate: Start date (YYYY-MM-DD)
 * - toDate: End date (YYYY-MM-DD)
 * - type: Article type (clinical-trial, review, guideline, meta-analysis, case-report)
 * - openAccess: Only open access (true/false)
 * - hasAbstract: Only with abstracts (true/false)
 * - minCitations: Minimum citation count
 * - sort: Sort by (relevance, date, citations)
 * - mode: Search mode (all, journal, trending, openaccess)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const query = searchParams.get('q');
    const mode = searchParams.get('mode') || 'all';
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }
    
    const limit = parseInt(searchParams.get('limit') || '30');
    const journal = searchParams.get('journal') || undefined;
    const fromDate = searchParams.get('fromDate') || undefined;
    const toDate = searchParams.get('toDate') || undefined;
    const articleType = searchParams.get('type') as any || undefined;
    const openAccessOnly = searchParams.get('openAccess') === 'true';
    const hasAbstract = searchParams.get('hasAbstract') === 'true';
    const minCitations = searchParams.get('minCitations') ? parseInt(searchParams.get('minCitations')!) : undefined;
    const sort = (searchParams.get('sort') || 'relevance') as 'relevance' | 'date' | 'citations';
    
    const sourcesParam = searchParams.get('sources');
    const sources = sourcesParam 
      ? sourcesParam.split(',').filter(s => ['pubmed', 'crossref', 'europepmc'].includes(s)) as any[]
      : undefined;
    
    let result;
    
    // Different search modes
    if (mode === 'journal' && journal) {
      result = await searchSpecificJournal(journal, query, limit);
    } else if (mode === 'trending') {
      result = await getTrendingArticles(query, limit);
    } else if (mode === 'openaccess') {
      result = await searchOpenAccess(query, limit);
    } else {
      // Standard unified search
      const params: UnifiedSearchParams = {
        query,
        sources,
        maxResults: limit,
        filters: {
          journal,
          fromDate,
          toDate,
          articleType,
          openAccessOnly,
          hasAbstract,
          minCitations,
        },
        sort,
      };
      
      result = await searchAllSources(params);
    }
    
    // Enhance articles with extracted content (key findings, relevant paragraphs)
    const enhancedArticles = result.articles.map(article => ({
      ...article,
      ...enhanceArticleWithContent(article, query),
    }));
    
    return NextResponse.json({
      success: true,
      query,
      mode,
      articles: enhancedArticles,
      totalResults: result.totalResults,
      sourceBreakdown: 'sourceBreakdown' in result ? result.sourceBreakdown : {},
    });
  } catch (error) {
    logger.error('Evidence search error:', error instanceof Error ? error : new Error(String(error)));
    return NextResponse.json(
      { 
        error: 'Failed to search evidence',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/evidence/search
 * Batch search with complex parameters
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }
    
    const params: UnifiedSearchParams = {
      query: body.query,
      sources: body.sources,
      maxResults: body.maxResults || 30,
      filters: body.filters,
      sort: body.sort || 'relevance',
    };
    
    const result = await searchAllSources(params);
    
    // Enhance articles with extracted content
    const enhancedArticles = result.articles.map(article => ({
      ...article,
      ...enhanceArticleWithContent(article, body.query),
    }));
    
    return NextResponse.json({
      success: true,
      articles: enhancedArticles,
      totalResults: result.totalResults,
      sourceBreakdown: result.sourceBreakdown,
    });
  } catch (error) {
    logger.error('Evidence batch search error:', error instanceof Error ? error : new Error(String(error)));
    return NextResponse.json(
      { error: 'Failed to search evidence' },
      { status: 500 }
    );
  }
}
