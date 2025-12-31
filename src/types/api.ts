/**
 * Shared API Response Types
 * Standardize all API responses across the platform
 */

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
  statusCode?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  meta?: {
    count: number;
    total: number;
    page?: number;
    pageSize?: number;
    hasMore?: boolean;
  };
}

export interface QuestionsApiResponse {
  success: boolean;
  count: number;
  total: number;
  questions: any[];
  error?: string;
  details?: string;
}

export interface EvidenceSearchResult {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  doi?: string;
  pmid?: string;
  abstract?: string;
  url?: string;
  source: 'pubmed' | 'crossref' | 'europepmc';
}

export interface GuidelineSearchResult {
  id: string;
  source: 'nice' | 'who' | 'aha';
  title: string;
  summary: string;
  published: string;
  lastUpdated?: string;
  fullTextUrl: string;
  pdfUrl?: string;
  topics: string[];
  category?: string;
}
