import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';
import { searchAllGuidelines } from '@/lib/guidelines/unified-guidelines';

/**
 * GET /api/guidelines/search
 * Search clinical guidelines from NICE, WHO, and AHA
 * 
 * Query parameters:
 * - q: search query
 * - sources: comma-separated list of sources (nice,who,aha)
 * - category: filter by category (ACLS, PALS, Cardiac, etc.)
 * - fromDate: YYYY-MM-DD
 * - toDate: YYYY-MM-DD
 * - limit: number of results (default: 30)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    
    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }
    
    const sourcesParam = searchParams.get('sources');
    const sources = sourcesParam
      ? sourcesParam.split(',').filter(s => ['nice', 'who', 'aha'].includes(s)) as ('nice' | 'who' | 'aha')[]
      : undefined;
    
    const result = await searchAllGuidelines({
      query,
      sources,
      category: searchParams.get('category') || undefined,
      fromDate: searchParams.get('fromDate') || undefined,
      toDate: searchParams.get('toDate') || undefined,
      limit: parseInt(searchParams.get('limit') || '30'),
    });
    
    return NextResponse.json({
      success: true,
      query,
      ...result,
    });
  } catch (error) {
    logger.error('Guidelines search error:', error);
    return NextResponse.json(
      { success: false, error: 'Search failed. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/guidelines/search
 * Alternative method for complex searches
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.query) {
      return NextResponse.json(
        { success: false, error: 'Query is required' },
        { status: 400 }
      );
    }
    
    const result = await searchAllGuidelines({
      query: body.query,
      sources: body.sources,
      category: body.category,
      fromDate: body.fromDate,
      toDate: body.toDate,
      limit: body.limit || 30,
    });
    
    return NextResponse.json({
      success: true,
      query: body.query,
      ...result,
    });
  } catch (error) {
    logger.error('Guidelines search error:', error);
    return NextResponse.json(
      { success: false, error: 'Search failed. Please try again.' },
      { status: 500 }
    );
  }
}
