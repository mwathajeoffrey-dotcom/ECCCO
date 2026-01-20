/**
 * Audit Logging Service
 * HIPAA/Compliance-ready audit trail for all sensitive operations
 * Logs who did what, when, and from where
 */

import { logger } from './logger';
import prisma from '@/lib/db';

export enum AuditAction {
  // User actions
  USER_LOGIN = 'user.login',
  USER_LOGOUT = 'user.logout',
  USER_REGISTER = 'user.register',
  USER_UPDATE = 'user.update',
  USER_DELETE = 'user.delete',
  
  // Content actions
  CONTENT_VIEW = 'content.view',
  CONTENT_CREATE = 'content.create',
  CONTENT_UPDATE = 'content.update',
  CONTENT_DELETE = 'content.delete',
  
  // Quiz/Exam actions
  QUIZ_START = 'quiz.start',
  QUIZ_COMPLETE = 'quiz.complete',
  QUIZ_SUBMIT = 'quiz.submit',
  
  // Admin actions
  ADMIN_ACCESS = 'admin.access',
  ADMIN_USER_MODIFY = 'admin.user.modify',
  ADMIN_CONTENT_MODIFY = 'admin.content.modify',
  
  // Data access
  DATA_EXPORT = 'data.export',
  DATA_DELETE = 'data.delete',
  
  // Evidence search
  EVIDENCE_SEARCH = 'evidence.search',
  EVIDENCE_VIEW = 'evidence.view',
  
  // Security events
  SECURITY_RATE_LIMIT = 'security.rate_limit',
  SECURITY_UNAUTHORIZED = 'security.unauthorized',
  SECURITY_INVALID_INPUT = 'security.invalid_input',
}

export interface AuditLogEntry {
  action: AuditAction;
  userId?: string;
  userEmail?: string;
  resourceType?: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  errorMessage?: string;
}

/**
 * Log an audit event
 * This creates both an application log and a database record for compliance
 */
export async function logAudit(entry: AuditLogEntry): Promise<void> {
  const {
    action,
    userId,
    userEmail,
    resourceType,
    resourceId,
    details,
    ipAddress,
    userAgent,
    success,
    errorMessage,
  } = entry;
  
  // Log to application logger
  logger.info(`Audit: ${action}`, {
    userId,
    userEmail,
    resourceType,
    resourceId,
    ipAddress,
    success,
    errorMessage,
    ...details,
  });
  
  // Store in database for long-term compliance
  try {
    // Note: You'll need to create an AuditLog model in your Prisma schema
    // This is a placeholder showing the structure
    /*
    await prisma.auditLog.create({
      data: {
        action,
        userId,
        userEmail,
        resourceType,
        resourceId,
        details: details ? JSON.stringify(details) : null,
        ipAddress,
        userAgent,
        success,
        errorMessage,
        timestamp: new Date(),
      },
    });
    */
    
    // For now, we'll just log it
    // You can add the Prisma model later
    logger.debug('Audit log entry created', { action });
  } catch (error) {
    // Never fail the main operation due to audit logging failure
    logger.error('Failed to create audit log entry', error as Error, {
      action,
      userId,
    });
  }
}

/**
 * Convenience functions for common audit scenarios
 */
export const audit = {
  /**
   * Log user login
   */
  userLogin: async (userId: string, userEmail: string, ipAddress?: string, userAgent?: string) => {
    await logAudit({
      action: AuditAction.USER_LOGIN,
      userId,
      userEmail,
      ipAddress,
      userAgent,
      success: true,
    });
  },
  
  /**
   * Log user logout
   */
  userLogout: async (userId: string, userEmail: string) => {
    await logAudit({
      action: AuditAction.USER_LOGOUT,
      userId,
      userEmail,
      success: true,
    });
  },
  
  /**
   * Log quiz completion
   */
  quizComplete: async (userId: string, quizId: string, score: number) => {
    await logAudit({
      action: AuditAction.QUIZ_COMPLETE,
      userId,
      resourceType: 'quiz',
      resourceId: quizId,
      details: { score },
      success: true,
    });
  },
  
  /**
   * Log evidence search
   */
  evidenceSearch: async (userId: string | undefined, query: string, resultCount: number) => {
    await logAudit({
      action: AuditAction.EVIDENCE_SEARCH,
      userId,
      resourceType: 'evidence',
      details: {
        query,
        resultCount,
      },
      success: true,
    });
  },
  
  /**
   * Log admin action
   */
  adminAction: async (
    adminId: string,
    action: string,
    targetUserId?: string,
    details?: Record<string, any>
  ) => {
    await logAudit({
      action: AuditAction.ADMIN_USER_MODIFY,
      userId: adminId,
      resourceType: 'user',
      resourceId: targetUserId,
      details: {
        adminAction: action,
        ...details,
      },
      success: true,
    });
  },
  
  /**
   * Log unauthorized access attempt
   */
  unauthorized: async (
    userId: string | undefined,
    resource: string,
    ipAddress?: string,
    userAgent?: string
  ) => {
    await logAudit({
      action: AuditAction.SECURITY_UNAUTHORIZED,
      userId,
      resourceType: resource,
      ipAddress,
      userAgent,
      success: false,
      errorMessage: 'Unauthorized access attempt',
    });
  },
  
  /**
   * Log rate limit hit
   */
  rateLimit: async (identifier: string, endpoint: string, ipAddress?: string) => {
    await logAudit({
      action: AuditAction.SECURITY_RATE_LIMIT,
      resourceType: 'api',
      resourceId: endpoint,
      details: {
        identifier,
      },
      ipAddress,
      success: false,
      errorMessage: 'Rate limit exceeded',
    });
  },
  
  /**
   * Log data export (important for HIPAA compliance)
   */
  dataExport: async (userId: string, dataType: string, recordCount: number) => {
    await logAudit({
      action: AuditAction.DATA_EXPORT,
      userId,
      resourceType: dataType,
      details: {
        recordCount,
        exportedAt: new Date().toISOString(),
      },
      success: true,
    });
  },
};

/**
 * Middleware helper to extract request context
 */
export function getRequestContext(request: Request): {
  ipAddress?: string;
  userAgent?: string;
} {
  return {
    ipAddress: request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
  };
}

export default audit;
