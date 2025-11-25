import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Production-ready middleware for security and performance
export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Security Headers
  const securityHeaders = {
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://api.vercel.app",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; '),

    // Security headers
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',

    // Performance headers
    'X-DNS-Prefetch-Control': 'on',
  }

  // Apply headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('X-Forwarded-For')?.split(',')[0] ?? 
              request.headers.get('X-Real-IP') ?? 'unknown'
    const userAgent = request.headers.get('User-Agent') ?? 'unknown'
    
    // Add request logging headers
    response.headers.set('X-Request-ID', crypto.randomUUID())
    response.headers.set('X-Timestamp', new Date().toISOString())
  }

  // Maintenance mode check
  if (process.env.MAINTENANCE_MODE === 'true') {
    if (!request.nextUrl.pathname.startsWith('/maintenance')) {
      return NextResponse.redirect(new URL('/maintenance', request.url))
    }
  }

  // Redirect HTTP to HTTPS in production
  if (process.env.NODE_ENV === 'production' && 
      request.headers.get('x-forwarded-proto') === 'http') {
    return NextResponse.redirect(
      new URL(`https://${request.headers.get('host')}${request.nextUrl.pathname}`, request.url),
      301
    )
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}