// Security manager for live quiz sessions
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth/auth-config';
import { prisma } from '@/lib/database/prisma-client';
import { logger } from '@/lib/logger';
import { rateLimit } from '@/lib/middleware/rate-limit';
import crypto from 'crypto';

export interface SecurityContext {
  userId?: string;
  sessionId: string;
  participantId?: string;
  ip: string;
  userAgent: string;
  timestamp: number;
}

export interface SecurityEvent {
  id: string;
  type: SecurityEventType;
  severity: 'info' | 'warning' | 'critical';
  description: string;
  context: SecurityContext;
  action: SecurityAction;
  blocked: boolean;
}

export enum SecurityEventType {
  UNAUTHORIZED_ACCESS = 'unauthorized_access',
  SUSPICIOUS_BEHAVIOR = 'suspicious_behavior',
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
  INVALID_SESSION_ACCESS = 'invalid_session_access',
  CHEATING_ATTEMPT = 'cheating_attempt',
  WEBSOCKET_ABUSE = 'websocket_abuse',
  SESSION_MANIPULATION = 'session_manipulation',
  DUPLICATE_SUBMISSION = 'duplicate_submission',
}

export enum SecurityAction {
  LOG_ONLY = 'log_only',
  WARN_USER = 'warn_user',
  DISCONNECT_USER = 'disconnect_user',
  BAN_IP = 'ban_ip',
  SUSPEND_PARTICIPANT = 'suspend_participant',
  TERMINATE_SESSION = 'terminate_session',
}

export class LiveQuizSecurityManager {
  private static readonly MAX_SUBMISSIONS_PER_QUESTION = 1;
  private static readonly MAX_SESSIONS_PER_IP = 5;
  private static readonly MAX_PARTICIPANTS_PER_SESSION = 100;
  private static readonly SESSION_TIMEOUT = 4 * 60 * 60 * 1000; // 4 hours
  private static readonly SUSPICIOUS_ACTIVITY_THRESHOLD = 10;

  // Rate limiters for different operations
  private static readonly sessionJoinLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Max 10 session joins per IP per 15 minutes
    message: 'Too many session join attempts',
  });

  private static readonly answerSubmissionLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // Max 20 answer submissions per IP per minute
    message: 'Too many answer submissions',
  });

  private static readonly wsConnectionLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Max 5 WebSocket connections per IP per minute
    message: 'Too many WebSocket connection attempts',
  });

  // Security event storage
  private static securityEvents: SecurityEvent[] = [];

  // Validate session access
  static async validateSessionAccess(
    sessionId: string,
    participantId: string,
    request: NextRequest
  ): Promise<{ authorized: boolean; reason?: string }> {
    try {
      const context = this.createSecurityContext(sessionId, request, participantId);

      // Check if session exists and is accessible
      const session = await prisma.liveQuizSession.findUnique({
        where: { id: sessionId },
        include: {
          participants: {
            where: { id: participantId },
          },
          quiz: true,
        },
      });

      if (!session) {
        this.logSecurityEvent({
          type: SecurityEventType.INVALID_SESSION_ACCESS,
          severity: 'warning',
          description: 'Attempt to access non-existent session',
          context,
          action: SecurityAction.LOG_ONLY,
          blocked: true,
        });
        return { authorized: false, reason: 'Session not found' };
      }

      // Check if participant is authorized for this session
      if (session.participants.length === 0) {
        this.logSecurityEvent({
          type: SecurityEventType.UNAUTHORIZED_ACCESS,
          severity: 'warning',
          description: 'Participant not registered for session',
          context,
          action: SecurityAction.LOG_ONLY,
          blocked: true,
        });
        return { authorized: false, reason: 'Participant not authorized' };
      }

      // Check if session has expired
      const sessionAge = Date.now() - session.createdAt.getTime();
      if (sessionAge > this.SESSION_TIMEOUT) {
        this.logSecurityEvent({
          type: SecurityEventType.INVALID_SESSION_ACCESS,
          severity: 'info',
          description: 'Attempt to access expired session',
          context,
          action: SecurityAction.LOG_ONLY,
          blocked: true,
        });
        return { authorized: false, reason: 'Session expired' };
      }

      // Check if session is in a valid state
      if (session.status === 'CANCELLED') {
        return { authorized: false, reason: 'Session cancelled' };
      }

      // Check IP-based restrictions
      const ipCheck = await this.validateIpAccess(context.ip, sessionId);
      if (!ipCheck.allowed) {
        return { authorized: false, reason: ipCheck.reason };
      }

      return { authorized: true };

    } catch (error) {
      logger.error('Error validating session access', error as Error);
      return { authorized: false, reason: 'Security validation failed' };
    }
  }

  // Validate answer submission security
  static async validateAnswerSubmission(
    sessionId: string,
    participantId: string,
    questionId: string,
    answer: any,
    request: NextRequest
  ): Promise<{ allowed: boolean; reason?: string }> {
    try {
      const context = this.createSecurityContext(sessionId, request, participantId);

      // Apply rate limiting
      const rateLimitResult = await this.answerSubmissionLimiter(request);
      if (rateLimitResult) {
        this.logSecurityEvent({
          type: SecurityEventType.RATE_LIMIT_EXCEEDED,
          severity: 'warning',
          description: 'Answer submission rate limit exceeded',
          context,
          action: SecurityAction.WARN_USER,
          blocked: true,
        });
        return { allowed: false, reason: 'Rate limit exceeded' };
      }

      // Check for duplicate submissions
      const existingAnswer = await prisma.liveQuizAnswer.findFirst({
        where: {
          participantId,
          questionId,
        },
      });

      if (existingAnswer) {
        this.logSecurityEvent({
          type: SecurityEventType.DUPLICATE_SUBMISSION,
          severity: 'warning',
          description: 'Duplicate answer submission detected',
          context: { ...context, questionId } as any,
          action: SecurityAction.LOG_ONLY,
          blocked: true,
        });
        return { allowed: false, reason: 'Answer already submitted' };
      }

      // Validate question timing
      const session = await prisma.liveQuizSession.findUnique({
        where: { id: sessionId },
      });

      if (!session) {
        return { allowed: false, reason: 'Session not found' };
      }

      // Check if question is currently active
      if (session.currentQuestionId !== questionId) {
        this.logSecurityEvent({
          type: SecurityEventType.CHEATING_ATTEMPT,
          severity: 'critical',
          description: 'Answer submitted for inactive question',
          context: { ...context, questionId } as any,
          action: SecurityAction.SUSPEND_PARTICIPANT,
          blocked: true,
        });
        return { allowed: false, reason: 'Question not currently active' };
      }

      // Check if submission is within time limit
      if (session.questionStartTime && session.questionTimeLimit) {
        const questionAge = Date.now() - session.questionStartTime.getTime();
        if (questionAge > session.questionTimeLimit) {
          this.logSecurityEvent({
            type: SecurityEventType.CHEATING_ATTEMPT,
            severity: 'warning',
            description: 'Answer submitted after time limit',
            context: { ...context, questionId } as any,
            action: SecurityAction.LOG_ONLY,
            blocked: true,
          });
          return { allowed: false, reason: 'Time limit exceeded' };
        }
      }

      // Validate answer format and content
      const validationResult = this.validateAnswerContent(answer, questionId);
      if (!validationResult.valid) {
        this.logSecurityEvent({
          type: SecurityEventType.SUSPICIOUS_BEHAVIOR,
          severity: 'warning',
          description: `Invalid answer format: ${validationResult.reason}`,
          context: { ...context, questionId } as any,
          action: SecurityAction.WARN_USER,
          blocked: true,
        });
        return { allowed: false, reason: validationResult.reason };
      }

      return { allowed: true };

    } catch (error) {
      logger.error('Error validating answer submission', error as Error);
      return { allowed: false, reason: 'Security validation failed' };
    }
  }

  // Validate WebSocket connection
  static async validateWebSocketConnection(
    sessionId: string,
    participantId: string,
    request: any
  ): Promise<{ allowed: boolean; reason?: string }> {
    try {
      // Create mock NextRequest for rate limiting
      const mockRequest = {
        ip: request.headers['x-forwarded-for'] || request.socket.remoteAddress,
        headers: new Map(Object.entries(request.headers)),
      } as any;

      const context = this.createSecurityContext(sessionId, mockRequest, participantId);

      // Apply rate limiting
      const rateLimitResult = await this.wsConnectionLimiter(mockRequest);
      if (rateLimitResult) {
        this.logSecurityEvent({
          type: SecurityEventType.RATE_LIMIT_EXCEEDED,
          severity: 'warning',
          description: 'WebSocket connection rate limit exceeded',
          context,
          action: SecurityAction.WARN_USER,
          blocked: true,
        });
        return { allowed: false, reason: 'Connection rate limit exceeded' };
      }

      // Validate session access
      const accessValidation = await this.validateSessionAccess(sessionId, participantId, mockRequest);
      if (!accessValidation.authorized) {
        return { allowed: false, reason: accessValidation.reason };
      }

      // Check for suspicious connection patterns
      const suspiciousActivity = await this.detectSuspiciousWebSocketActivity(context.ip, sessionId);
      if (suspiciousActivity.suspicious) {
        this.logSecurityEvent({
          type: SecurityEventType.WEBSOCKET_ABUSE,
          severity: 'critical',
          description: suspiciousActivity.reason || 'Unknown reason',
          context,
          action: SecurityAction.BAN_IP,
          blocked: true,
        });
        return { allowed: false, reason: 'Suspicious activity detected' };
      }

      return { allowed: true };

    } catch (error) {
      logger.error('Error validating WebSocket connection', error as Error);
      return { allowed: false, reason: 'Security validation failed' };
    }
  }

  // Validate IP access
  private static async validateIpAccess(
    ip: string, 
    sessionId: string
  ): Promise<{ allowed: boolean; reason?: string }> {
    try {
      // Check if IP is banned (this would integrate with a ban list)
      const bannedIps = await this.getBannedIps();
      if (bannedIps.includes(ip)) {
        return { allowed: false, reason: 'IP address banned' };
      }

      // Check concurrent sessions from same IP
      const activeSessions = await prisma.liveQuizSession.count({
        where: {
          status: { in: ['WAITING', 'ACTIVE', 'PAUSED'] },
          participants: {
            some: {
              // This would need IP tracking in the participant model
              // For now, we'll skip this check
            },
          },
        },
      });

      // For now, allow all non-banned IPs
      return { allowed: true };

    } catch (error) {
      logger.error('Error validating IP access', error as Error);
      return { allowed: false, reason: 'IP validation failed' };
    }
  }

  // Detect suspicious WebSocket activity
  private static async detectSuspiciousWebSocketActivity(
    ip: string,
    sessionId: string
  ): Promise<{ suspicious: boolean; reason?: string }> {
    // Check recent security events for this IP
    const recentEvents = this.securityEvents.filter(
      event => event.context.ip === ip && 
      Date.now() - event.context.timestamp < 60 * 60 * 1000 // Last hour
    );

    if (recentEvents.length > this.SUSPICIOUS_ACTIVITY_THRESHOLD) {
      return { 
        suspicious: true, 
        reason: 'High frequency of security events from this IP' 
      };
    }

    const rateLimitEvents = recentEvents.filter(
      event => event.type === SecurityEventType.RATE_LIMIT_EXCEEDED
    );

    if (rateLimitEvents.length > 5) {
      return { 
        suspicious: true, 
        reason: 'Multiple rate limit violations' 
      };
    }

    return { suspicious: false };
  }

  // Validate answer content
  private static validateAnswerContent(
    answer: any,
    questionId: string
  ): { valid: boolean; reason?: string } {
    try {
      // Basic validation
      if (answer === null || answer === undefined) {
        return { valid: false, reason: 'Answer cannot be null or undefined' };
      }

      // Check for overly long answers (potential abuse)
      const answerString = JSON.stringify(answer);
      if (answerString.length > 10000) {
        return { valid: false, reason: 'Answer too long' };
      }

      // Check for suspicious patterns
      if (typeof answer === 'string') {
        // Check for script injection attempts
        if (/<script|javascript:|data:/i.test(answer)) {
          return { valid: false, reason: 'Invalid answer content' };
        }

        // Check for excessive repetition (spam detection)
        const words = answer.split(/\s+/);
        const uniqueWords = new Set(words);
        if (words.length > 10 && uniqueWords.size / words.length < 0.3) {
          return { valid: false, reason: 'Suspicious answer pattern' };
        }
      }

      return { valid: true };

    } catch (error) {
      return { valid: false, reason: 'Answer validation error' };
    }
  }

  // Create security context
  private static createSecurityContext(
    sessionId: string,
    request: NextRequest,
    participantId?: string
  ): SecurityContext {
    return {
      sessionId,
      participantId,
  ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      timestamp: Date.now(),
    };
  }

  // Log security event
  private static logSecurityEvent(event: Omit<SecurityEvent, 'id'>) {
    const securityEvent: SecurityEvent = {
      id: this.generateSecurityEventId(),
      ...event,
    };

    this.securityEvents.push(securityEvent);

    // Keep only recent events in memory
    if (this.securityEvents.length > 1000) {
      this.securityEvents = this.securityEvents.slice(-1000);
    }

    // Log based on severity
    const logData = {
      securityEventId: securityEvent.id,
      type: securityEvent.type,
      context: securityEvent.context,
      action: securityEvent.action,
    };

    switch (securityEvent.severity) {
      case 'critical':
        logger.error(`SECURITY CRITICAL: ${securityEvent.description}`, new Error(securityEvent.description), logData);
        this.alertSecurity(securityEvent);
        break;
      case 'warning':
        logger.warn(`SECURITY WARNING: ${securityEvent.description}`, logData);
        break;
      case 'info':
        logger.info(`SECURITY INFO: ${securityEvent.description}`, logData);
        break;
    }

    // Execute security action
    this.executeSecurityAction(securityEvent);
  }

  // Execute security action
  private static executeSecurityAction(event: SecurityEvent) {
    switch (event.action) {
      case SecurityAction.DISCONNECT_USER:
        // This would integrate with WebSocket manager to disconnect user
        logger.info('Security action: Disconnecting user', { eventId: event.id });
        break;
      case SecurityAction.SUSPEND_PARTICIPANT:
        // This would update participant status in database
        logger.info('Security action: Suspending participant', { eventId: event.id });
        break;
      case SecurityAction.BAN_IP:
        // This would add IP to ban list
        logger.info('Security action: Banning IP', { eventId: event.id });
        break;
      case SecurityAction.TERMINATE_SESSION:
        // This would end the session
        logger.info('Security action: Terminating session', { eventId: event.id });
        break;
    }
  }

  // Alert security team for critical events
  private static alertSecurity(event: SecurityEvent) {
    // This would integrate with alerting systems (email, Slack, PagerDuty, etc.)
    logger.error('SECURITY ALERT: Immediate attention required', {
      eventId: event.id,
      type: event.type,
      description: event.description,
      context: event.context,
    } as any);
  }

  // Get banned IPs (would integrate with external ban list)
  private static async getBannedIps(): Promise<string[]> {
    // This would query a ban list from database or external service
    return [];
  }

  // Generate security event ID
  private static generateSecurityEventId(): string {
    return `sec_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
  }

  // Get security statistics
  static getSecurityStatistics(timeRange: number = 60 * 60 * 1000): {
    totalEvents: number;
    eventsByType: Record<SecurityEventType, number>;
    eventsBySeverity: Record<string, number>;
    blockedEvents: number;
    recentEvents: SecurityEvent[];
  } {
    const cutoffTime = Date.now() - timeRange;
    const recentEvents = this.securityEvents.filter(event => event.context.timestamp > cutoffTime);

    const eventsByType = {} as Record<SecurityEventType, number>;
    const eventsBySeverity = { info: 0, warning: 0, critical: 0 };

    recentEvents.forEach(event => {
      eventsByType[event.type] = (eventsByType[event.type] || 0) + 1;
      eventsBySeverity[event.severity]++;
    });

    return {
      totalEvents: recentEvents.length,
      eventsByType,
      eventsBySeverity,
      blockedEvents: recentEvents.filter(event => event.blocked).length,
      recentEvents: recentEvents.slice(-10),
    };
  }

  // Security middleware for live quiz endpoints
  static createSecurityMiddleware() {
    return async (request: NextRequest, context: any) => {
      try {
        const { sessionId } = context.params || {};
        
        if (sessionId) {
          const securityContext = this.createSecurityContext(sessionId, request);
          
          // Log access attempt
          logger.info('Live quiz endpoint access', {
            path: request.nextUrl.pathname,
            method: request.method,
            context: securityContext,
          });
        }

        return null; // Allow request to continue

      } catch (error) {
        logger.error('Security middleware error', error as Error);
        return Response.json({ error: 'Security check failed' }, { status: 500 });
      }
    };
  }
}

// Export rate limiters for use in API routes
export const securityRateLimiters = {
  sessionJoin: LiveQuizSecurityManager['sessionJoinLimiter'],
  answerSubmission: LiveQuizSecurityManager['answerSubmissionLimiter'],
  wsConnection: LiveQuizSecurityManager['wsConnectionLimiter'],
};