import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting storage (in production, use Redis or a proper store)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function getRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const limit = parseInt(process.env.RATE_LIMIT_REQUESTS_PER_MINUTE || '100');
  
  const current = requestCounts.get(ip);
  
  if (!current || now > current.resetTime) {
    // New window or expired
    const resetTime = now + windowMs;
    requestCounts.set(ip, { count: 1, resetTime });
    return { allowed: true, remaining: limit - 1, resetTime };
  }
  
  if (current.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: current.resetTime };
  }
  
  current.count++;
  requestCounts.set(ip, current);
  return { allowed: true, remaining: limit - current.count, resetTime: current.resetTime };
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (real) {
    return real;
  }
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  return 'unknown';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Skip middleware for static files and internal Next.js routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/_next') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return response;
  }

  // Rate limiting for API routes (if enabled)
  if (pathname.startsWith('/api') && process.env.RATE_LIMIT_ENABLED === 'true') {
    const ip = getClientIP(request);
    const { allowed, remaining, resetTime } = getRateLimit(ip);
    
    if (!allowed) {
      const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': process.env.RATE_LIMIT_REQUESTS_PER_MINUTE || '100',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': resetTime.toString(),
        },
      });
    }
    
    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', process.env.RATE_LIMIT_REQUESTS_PER_MINUTE || '100');
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', resetTime.toString());
  }

  // Security headers (additional to next.config.ts)
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // Performance headers
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/exam')) {
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/auth).*)',
    '/api/((?!auth).*)' // Apply rate limiting to all API routes except auth
  ],
};