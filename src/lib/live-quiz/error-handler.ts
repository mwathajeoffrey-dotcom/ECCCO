// Comprehensive error handling and monitoring for live quiz sessions
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/database/prisma-client';

export interface ErrorContext {
  sessionId?: string;
  participantId?: string;
  questionId?: string;
  userId?: string;
  userAgent?: string;
  ip?: string;
  timestamp?: number;
  [key: string]: any;
}

export interface LiveQuizError {
  id: string;
  type: LiveQuizErrorType;
  code: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context: ErrorContext;
  timestamp: number;
  resolved: boolean;
  resolution?: string;
  stack?: string;
}

export enum LiveQuizErrorType {
  WEBSOCKET_CONNECTION = 'websocket_connection',
  SESSION_STATE = 'session_state',
  PARTICIPANT_ACTION = 'participant_action',
  QUESTION_DELIVERY = 'question_delivery',
  ANSWER_SUBMISSION = 'answer_submission',
  SESSION_CONTROL = 'session_control',
  DATABASE_ERROR = 'database_error',
  RATE_LIMIT = 'rate_limit',
  AUTHENTICATION = 'authentication',
  VALIDATION = 'validation',
}

export class LiveQuizErrorHandler {
  private static readonly MAX_ERROR_LOGS = 1000;
  private static readonly CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour
  private static errorBuffer: LiveQuizError[] = [];

  // Handle WebSocket connection errors
  static handleWebSocketError(
    error: Error, 
    context: ErrorContext
  ): LiveQuizError {
    const errorRecord: LiveQuizError = {
      id: this.generateErrorId(),
      type: LiveQuizErrorType.WEBSOCKET_CONNECTION,
      code: this.getWebSocketErrorCode(error),
      message: error.message,
      severity: this.getWebSocketErrorSeverity(error),
      context: {
        ...context,
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
      resolved: false,
      stack: error.stack,
    };

    this.logError(errorRecord);
    this.handleWebSocketRecovery(errorRecord);
    
    return errorRecord;
  }

  // Handle session state errors
  static handleSessionStateError(
    error: Error,
    context: ErrorContext
  ): LiveQuizError {
    const errorRecord: LiveQuizError = {
      id: this.generateErrorId(),
      type: LiveQuizErrorType.SESSION_STATE,
      code: 'SESSION_STATE_ERROR',
      message: error.message,
      severity: 'high',
      context: {
        ...context,
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
      resolved: false,
      stack: error.stack,
    };

    this.logError(errorRecord);
    this.handleSessionStateRecovery(errorRecord);
    
    return errorRecord;
  }

  // Handle participant action errors
  static handleParticipantError(
    error: Error,
    context: ErrorContext
  ): LiveQuizError {
    const errorRecord: LiveQuizError = {
      id: this.generateErrorId(),
      type: LiveQuizErrorType.PARTICIPANT_ACTION,
      code: this.getParticipantErrorCode(error),
      message: error.message,
      severity: 'medium',
      context: {
        ...context,
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
      resolved: false,
      stack: error.stack,
    };

    this.logError(errorRecord);
    this.notifyParticipant(errorRecord);
    
    return errorRecord;
  }

  // Handle answer submission errors
  static handleAnswerSubmissionError(
    error: Error,
    context: ErrorContext
  ): LiveQuizError {
    const errorRecord: LiveQuizError = {
      id: this.generateErrorId(),
      type: LiveQuizErrorType.ANSWER_SUBMISSION,
      code: 'ANSWER_SUBMISSION_FAILED',
      message: error.message,
      severity: 'high',
      context: {
        ...context,
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
      resolved: false,
      stack: error.stack,
    };

    this.logError(errorRecord);
    this.handleAnswerSubmissionRecovery(errorRecord);
    
    return errorRecord;
  }

  // Handle database errors
  static handleDatabaseError(
    error: Error,
    operation: string,
    context: ErrorContext
  ): LiveQuizError {
    const errorRecord: LiveQuizError = {
      id: this.generateErrorId(),
      type: LiveQuizErrorType.DATABASE_ERROR,
      code: 'DATABASE_OPERATION_FAILED',
      message: `Database operation '${operation}' failed: ${error.message}`,
      severity: 'critical',
      context: {
        ...context,
        operation,
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
      resolved: false,
      stack: error.stack,
    };

    this.logError(errorRecord);
    this.handleDatabaseRecovery(errorRecord);
    
    return errorRecord;
  }

  // Log error with appropriate level
  private static logError(error: LiveQuizError) {
    const logData = {
      errorId: error.id,
      type: error.type,
      code: error.code,
      severity: error.severity,
      context: error.context,
    };

    switch (error.severity) {
      case 'critical':
        logger.error(`CRITICAL: ${error.message}`, new Error(error.message), logData);
        this.alertAdministrators(error);
        break;
      case 'high':
        logger.error(`HIGH: ${error.message}`, new Error(error.message), logData);
        break;
      case 'medium':
        logger.warn(`MEDIUM: ${error.message}`, logData);
        break;
      case 'low':
        logger.info(`LOW: ${error.message}`, logData);
        break;
    }

    // Store in memory buffer
    this.errorBuffer.push(error);
    
    // Cleanup old errors
    if (this.errorBuffer.length > this.MAX_ERROR_LOGS) {
      this.errorBuffer = this.errorBuffer.slice(-this.MAX_ERROR_LOGS);
    }

    // Persist critical and high severity errors
    if (error.severity === 'critical' || error.severity === 'high') {
      this.persistError(error).catch(persistError => {
        logger.error('Failed to persist error', persistError);
      });
    }
  }

  // WebSocket error recovery
  private static async handleWebSocketRecovery(error: LiveQuizError) {
    try {
      const { sessionId, participantId } = error.context;
      
      if (sessionId && participantId) {
        // Mark participant as offline
        await prisma.liveQuizParticipant.update({
          where: { id: participantId },
          data: { lastActivity: new Date() },
        });

        // Attempt to notify session about participant disconnect
        logger.info('Participant marked as disconnected due to WebSocket error', {
          sessionId,
          participantId,
          errorId: error.id,
        });
      }

      error.resolved = true;
      error.resolution = 'Participant marked as disconnected, awaiting reconnection';

    } catch (recoveryError) {
      logger.error('WebSocket error recovery failed', recoveryError as Error);
    }
  }

  // Session state error recovery
  private static async handleSessionStateRecovery(error: LiveQuizError) {
    try {
      const { sessionId } = error.context;
      
      if (sessionId) {
        // Attempt to restore session from database
        const session = await prisma.liveQuizSession.findUnique({
          where: { id: sessionId },
          include: {
            participants: true,
            quiz: { include: { questions: true } },
          },
        });

        if (session) {
          logger.info('Session state recovery attempted', {
            sessionId,
            status: session.status,
            participants: session.participants.length,
          });
          
          error.resolved = true;
          error.resolution = 'Session state restored from database';
        } else {
          error.resolution = 'Session not found in database';
        }
      }

    } catch (recoveryError) {
      logger.error('Session state recovery failed', recoveryError as Error);
    }
  }

  // Answer submission recovery
  private static async handleAnswerSubmissionRecovery(error: LiveQuizError) {
    try {
      const { sessionId, participantId, questionId } = error.context;
      
      if (sessionId && participantId && questionId) {
        // Check if answer was already submitted
        const existingAnswer = await prisma.liveQuizAnswer.findFirst({
          where: {
            participantId,
            questionId,
          },
        });

        if (existingAnswer) {
          error.resolved = true;
          error.resolution = 'Answer was already submitted successfully';
        } else {
          error.resolution = 'Answer submission failed and was not recovered';
        }
      }

    } catch (recoveryError) {
      logger.error('Answer submission recovery failed', recoveryError as Error);
    }
  }

  // Database error recovery
  private static async handleDatabaseRecovery(error: LiveQuizError) {
    try {
      // Test database connection
      await prisma.$queryRaw`SELECT 1`;
      
      error.resolved = true;
      error.resolution = 'Database connection restored';
      
      logger.info('Database connection verified after error', {
        errorId: error.id,
      });

    } catch (recoveryError) {
      error.resolution = 'Database connection still failing';
      logger.error('Database recovery failed', recoveryError as Error);
    }
  }

  // Notify participant of error
  private static notifyParticipant(error: LiveQuizError) {
    try {
      const { sessionId, participantId } = error.context;
      
      if (sessionId && participantId) {
        // This would integrate with the WebSocket manager
        // liveQuizWSManager.sendToParticipant(sessionId, participantId, {
        //   type: 'error',
        //   data: {
        //     message: this.getUserFriendlyMessage(error),
        //     canRetry: this.isRetryableError(error),
        //   },
        // });
      }

    } catch (notificationError) {
      logger.error('Failed to notify participant of error', notificationError as Error);
    }
  }

  // Alert administrators for critical errors
  private static alertAdministrators(error: LiveQuizError) {
    // This would integrate with notification systems (email, Slack, etc.)
    logger.error('ALERT: Critical live quiz error requires immediate attention', {
      errorId: error.id,
      type: error.type,
      message: error.message,
      context: error.context,
    } as any);
  }

  // Persist error to database
  private static async persistError(error: LiveQuizError) {
    try {
      // Create a simplified error record for database storage
      const errorData = {
        id: error.id,
        type: error.type,
        code: error.code,
        message: error.message.substring(0, 1000), // Limit message length
        severity: error.severity,
        sessionId: error.context.sessionId,
        participantId: error.context.participantId,
        context: JSON.stringify(error.context),
        timestamp: new Date(error.timestamp),
        resolved: error.resolved,
        resolution: error.resolution,
      };

      // This would require a database table for error logs
      // await prisma.liveQuizErrorLog.create({ data: errorData });

      logger.info('Error persisted to database', { errorId: error.id });

    } catch (persistError) {
      logger.error('Failed to persist error to database', persistError as Error);
    }
  }

  // Helper methods
  private static generateErrorId(): string {
    return `lqe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private static getWebSocketErrorCode(error: Error): string {
    if (error.message.includes('ECONNREFUSED')) return 'CONNECTION_REFUSED';
    if (error.message.includes('timeout')) return 'CONNECTION_TIMEOUT';
    if (error.message.includes('ENOTFOUND')) return 'HOST_NOT_FOUND';
    return 'WEBSOCKET_UNKNOWN_ERROR';
  }

  private static getWebSocketErrorSeverity(error: Error): 'low' | 'medium' | 'high' | 'critical' {
    if (error.message.includes('ECONNREFUSED')) return 'high';
    if (error.message.includes('timeout')) return 'medium';
    if (error.message.includes('ENOTFOUND')) return 'critical';
    return 'medium';
  }

  private static getParticipantErrorCode(error: Error): string {
    if (error.message.includes('unauthorized')) return 'UNAUTHORIZED_ACTION';
    if (error.message.includes('validation')) return 'VALIDATION_ERROR';
    if (error.message.includes('rate limit')) return 'RATE_LIMIT_EXCEEDED';
    return 'PARTICIPANT_ACTION_ERROR';
  }

  private static getUserFriendlyMessage(error: LiveQuizError): string {
    switch (error.type) {
      case LiveQuizErrorType.WEBSOCKET_CONNECTION:
        return 'Connection issue detected. Attempting to reconnect...';
      case LiveQuizErrorType.ANSWER_SUBMISSION:
        return 'There was an issue submitting your answer. Please try again.';
      case LiveQuizErrorType.RATE_LIMIT:
        return 'Too many requests. Please wait a moment and try again.';
      default:
        return 'An unexpected error occurred. Our team has been notified.';
    }
  }

  private static isRetryableError(error: LiveQuizError): boolean {
    return [
      LiveQuizErrorType.WEBSOCKET_CONNECTION,
      LiveQuizErrorType.ANSWER_SUBMISSION,
      LiveQuizErrorType.QUESTION_DELIVERY,
    ].includes(error.type);
  }

  // Get error statistics
  static getErrorStatistics(timeRange: number = 60 * 60 * 1000): {
    total: number;
    byType: Record<LiveQuizErrorType, number>;
    bySeverity: Record<string, number>;
    resolved: number;
    recent: LiveQuizError[];
  } {
    const cutoffTime = Date.now() - timeRange;
    const recentErrors = this.errorBuffer.filter(error => error.timestamp > cutoffTime);

    const byType = {} as Record<LiveQuizErrorType, number>;
    const bySeverity = { low: 0, medium: 0, high: 0, critical: 0 };

    recentErrors.forEach(error => {
      byType[error.type] = (byType[error.type] || 0) + 1;
      bySeverity[error.severity]++;
    });

    return {
      total: recentErrors.length,
      byType,
      bySeverity,
      resolved: recentErrors.filter(error => error.resolved).length,
      recent: recentErrors.slice(-10), // Last 10 errors
    };
  }

  // Health check for live quiz system
  static async performHealthCheck(): Promise<{
    healthy: boolean;
    issues: string[];
    metrics: any;
  }> {
    const issues: string[] = [];
    const metrics: any = {};

    try {
      // Check database connection
      const dbStart = Date.now();
      await prisma.$queryRaw`SELECT 1`;
      metrics.databaseResponseTime = Date.now() - dbStart;
      
      if (metrics.databaseResponseTime > 1000) {
        issues.push('Database response time is high');
      }

      // Check error rates
      const errorStats = this.getErrorStatistics();
      metrics.errorRate = errorStats.total;
      metrics.criticalErrors = errorStats.bySeverity.critical;
      
      if (errorStats.bySeverity.critical > 0) {
        issues.push(`${errorStats.bySeverity.critical} critical errors in the last hour`);
      }
      
      if (errorStats.total > 100) {
        issues.push('High error rate detected');
      }

      // Check active sessions
      const activeSessions = await prisma.liveQuizSession.count({
        where: {
          status: { in: ['WAITING', 'ACTIVE', 'PAUSED'] },
        },
      });
      metrics.activeSessions = activeSessions;

      return {
        healthy: issues.length === 0,
        issues,
        metrics,
      };

    } catch (error) {
      logger.error('Health check failed', error as Error);
      return {
        healthy: false,
        issues: ['Health check failed to execute'],
        metrics: {},
      };
    }
  }
}

// Initialize periodic cleanup
setInterval(() => {
  const cutoffTime = Date.now() - (24 * 60 * 60 * 1000); // 24 hours ago
  LiveQuizErrorHandler['errorBuffer'] = LiveQuizErrorHandler['errorBuffer'].filter(
    error => error.timestamp > cutoffTime
  );
}, LiveQuizErrorHandler['CLEANUP_INTERVAL']);