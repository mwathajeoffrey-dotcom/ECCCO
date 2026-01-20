import { logger } from '@/lib/logger';
/**
 * Unified Clinical Guidelines Search
 * Combines NICE, WHO, and AHA guidelines into single searchable interface
 * Similar to evidence library unified search
 */

import { searchNICEGuidelines, toUnifiedGuideline as convertNICE, type NICEGuideline } from './nice';
import { searchWHOGuidelines, toUnifiedGuideline as convertWHO, type WHOGuideline } from './who';
import { searchAHAGuidelines, toUnifiedGuideline as convertAHA, type AHAGuideline } from './aha';

export interface UnifiedGuideline {
  id: string;
  source: 'nice' | 'who' | 'aha';
  title: string;
  summary: string;
  published: string;
  lastUpdated?: string;
  fullTextUrl: string;
  pdfUrl?: string;
  evidenceLevel?: string;
  recommendations?: string[];
  topics: string[];
  category?: string;
}

export interface GuidelineSearchParams {
  query: string;
  sources?: ('nice' | 'who' | 'aha')[];
  category?: string;
  fromDate?: string;
  toDate?: string;
  limit?: number;
}

/**
 * Search all guideline sources
 * Combines NICE, WHO, and AHA into unified results
 */
export async function searchAllGuidelines(
  params: GuidelineSearchParams
): Promise<{
  guidelines: UnifiedGuideline[];
  total: number;
  sourceBreakdown: Record<string, number>;
}> {
  const sources = params.sources || ['nice', 'who', 'aha'];
  const maxPerSource = Math.ceil((params.limit || 30) / sources.length);
  
  const searchPromises: Promise<any>[] = [];
  
  if (sources.includes('nice')) {
    searchPromises.push(searchNICESource(params, maxPerSource));
  }
  
  if (sources.includes('who')) {
    searchPromises.push(searchWHOSource(params, maxPerSource));
  }
  
  if (sources.includes('aha')) {
    searchPromises.push(searchAHASource(params, maxPerSource));
  }
  
  const results = await Promise.all(searchPromises);
  
  // Combine all guidelines
  const allGuidelines: UnifiedGuideline[] = [];
  const sourceBreakdown: Record<string, number> = {};
  let total = 0;
  
  results.forEach(result => {
    allGuidelines.push(...result.guidelines);
    sourceBreakdown[result.source] = result.total;
    total += result.total;
  });
  
  // Sort by publication date (newest first)
  allGuidelines.sort((a, b) => 
    new Date(b.published).getTime() - new Date(a.published).getTime()
  );
  
  // Apply limit
  const limitedGuidelines = allGuidelines.slice(0, params.limit || 30);
  
  return {
    guidelines: limitedGuidelines,
    total,
    sourceBreakdown,
  };
}

/**
 * Search NICE guidelines
 */
async function searchNICESource(
  params: GuidelineSearchParams,
  maxResults: number
): Promise<{ source: string; guidelines: UnifiedGuideline[]; total: number }> {
  try {
    const result = await searchNICEGuidelines({
      query: params.query,
      limit: maxResults,
      fromDate: params.fromDate,
      toDate: params.toDate,
    });
    
    return {
      source: 'nice',
      guidelines: result.guidelines.map(convertNICE),
      total: result.totalResults,
    };
  } catch (error) {
    logger.error('NICE source error:', error);
    return { source: 'nice', guidelines: [], total: 0 };
  }
}

/**
 * Search WHO guidelines
 */
async function searchWHOSource(
  params: GuidelineSearchParams,
  maxResults: number
): Promise<{ source: string; guidelines: UnifiedGuideline[]; total: number }> {
  try {
    const result = await searchWHOGuidelines({
      query: params.query,
      limit: maxResults,
      fromDate: params.fromDate,
      toDate: params.toDate,
    });
    
    return {
      source: 'who',
      guidelines: result.guidelines.map(convertWHO),
      total: result.totalResults,
    };
  } catch (error) {
    logger.error('WHO source error:', error);
    return { source: 'who', guidelines: [], total: 0 };
  }
}

/**
 * Search AHA guidelines
 */
async function searchAHASource(
  params: GuidelineSearchParams,
  maxResults: number
): Promise<{ source: string; guidelines: UnifiedGuideline[]; total: number }> {
  try {
    const result = await searchAHAGuidelines({
      query: params.query,
      category: params.category,
      limit: maxResults,
    });
    
    return {
      source: 'aha',
      guidelines: result.guidelines.map(convertAHA),
      total: result.totalResults,
    };
  } catch (error) {
    logger.error('AHA source error:', error);
    return { source: 'aha', guidelines: [], total: 0 };
  }
}

/**
 * Get featured guidelines (most important/recent)
 */
export async function getFeaturedGuidelines(limit: number = 5): Promise<UnifiedGuideline[]> {
  const result = await searchAllGuidelines({
    query: 'sepsis stroke cardiac arrest ACLS diabetes',
    limit,
  });
  
  return result.guidelines;
}

/**
 * Get guidelines by category
 */
export async function getGuidelinesByCategory(
  category: string,
  limit: number = 10
): Promise<UnifiedGuideline[]> {
  const result = await searchAllGuidelines({
    query: category,
    category,
    limit,
  });
  
  return result.guidelines;
}

/**
 * Get ACLS-specific guidelines
 */
export async function getACLSGuidelines(): Promise<UnifiedGuideline[]> {
  const result = await searchAllGuidelines({
    query: 'ACLS cardiac arrest',
    sources: ['aha'],
    category: 'ACLS',
    limit: 10,
  });
  
  return result.guidelines;
}

/**
 * Get emergency medicine guidelines
 */
export async function getEmergencyGuidelines(): Promise<UnifiedGuideline[]> {
  const result = await searchAllGuidelines({
    query: 'emergency sepsis trauma stroke',
    limit: 20,
  });
  
  return result.guidelines;
}
