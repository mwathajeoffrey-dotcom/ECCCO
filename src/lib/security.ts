import { logger } from '@/lib/logger';
import { NextApiRequest, NextApiResponse } from 'next'
// JWT authentication removed - using Clerk instead

// Production-ready security utilities

export const SecurityConfig = {
  // Rate limiting configuration
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  },

  // Session configuration
  session: {
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // Update session every hour
  },

  // Password requirements
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: false,
  },

  // CORS configuration
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? (process.env.ALLOWED_ORIGINS?.split(',') || [])
      : ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    optionsSuccessStatus: 200,
  },

  // Content Security Policy
  csp: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.vercel.app"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
    },
  },
}

// Rate limiting store (in-memory for single instance, use Redis for multi-instance)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(req: NextApiRequest): boolean {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
  const key = `rate_limit_${ip}`
  const now = Date.now()
  const windowMs = SecurityConfig.rateLimit.windowMs
  
  const record = rateLimitStore.get(key)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= SecurityConfig.rateLimit.max) {
    return false
  }
  
  record.count++
  return true
}

// Input validation and sanitization
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>'"]/g, '') // Remove potentially dangerous characters
    .substring(0, 1000) // Limit length
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 255
}

export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  const config = SecurityConfig.password
  
  if (password.length < config.minLength) {
    errors.push(`Password must be at least ${config.minLength} characters`)
  }
  
  if (config.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (config.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (config.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (config.requireSymbols && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one symbol')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Authentication utilities - DEPRECATED (using Clerk instead)
// export async function requireAuth(req: NextApiRequest, res: NextApiResponse) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
//   
//   if (!token) {
//     res.status(401).json({ error: 'Authentication required' })
//     return null
//   }
//   
//   return token
// }

export async function requireRole(req: NextApiRequest, res: NextApiResponse, allowedRoles: string[]) {
  // NOTE: Role-based access control is handled by Clerk middleware
  // and admin/developer checks in src/lib/auth/admin.ts and src/lib/auth/developer.ts
  // This function is deprecated - use Clerk's auth() and check roles directly
  
  logger.warn(
    'requireRole() is deprecated. Use Clerk auth() with admin.ts/developer.ts helpers instead.'
  );
  
  res.status(501).json({ 
    error: 'This endpoint uses deprecated authentication. Please contact support.' 
  });
  return null;
}

// CSRF protection
export function generateCSRFToken(): string {
  return crypto.randomUUID()
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  // Simple CSRF validation - in production, use a more sophisticated approach
  return token === sessionToken
}

// Security headers helper
export function setSecurityHeaders(res: NextApiResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }
}

// Audit logging
export function auditLog(action: string, userId?: string, metadata?: object) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    action,
    userId: userId || 'anonymous',
    metadata: metadata || {},
    environment: process.env.NODE_ENV,
  }
  
  // In production, send to external logging service
  if (process.env.NODE_ENV === 'production') {
    logger.debug('AUDIT:', JSON.stringify(logEntry))
  } else {
    logger.debug('AUDIT:', logEntry)
  }
}

// Error handling with security
export function handleError(error: any, req: NextApiRequest, res: NextApiResponse) {
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  // Log the full error for debugging
  logger.error('API Error:', {
    message: error.message,
    stack: isDevelopment ? error.stack : undefined,
    url: req.url,
    method: req.method,
    userAgent: req.headers['user-agent'],
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
  })
  
  // Return safe error message to client
  const statusCode = error.statusCode || 500
  const message = isDevelopment ? error.message : 'Internal server error'
  
  res.status(statusCode).json({
    error: message,
    timestamp: new Date().toISOString(),
  })
}