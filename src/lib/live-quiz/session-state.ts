// Session state persistence and recovery for live quiz sessions
import { prisma } from '@/lib/database/prisma-client';
import { logger } from '@/lib/logger';
import { Redis } from 'ioredis';

// Redis client for session state caching
let redis: Redis | null = null;

try {
  if (process.env.REDIS_URL) {
    redis = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });
    
    redis.on('error', (error) => {
      logger.error('Redis connection error', error);
    });
  }
} catch (error) {
  logger.warn('Redis not available, using database-only persistence', error as Error);
}

export interface SessionState {
  sessionId: string;
  status: 'WAITING' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  currentQuestionIndex: number;
  currentQuestionId?: string;
  questionStartTime?: number;
  questionTimeLimit?: number;
  participants: ParticipantState[];
  settings: SessionSettings;
  metadata: SessionMetadata;
}

export interface ParticipantState {
  id: string;
  nickname: string;
  isOnline: boolean;
  score: number;
  answers: AnswerRecord[];
  joinedAt: number;
  lastActivity: number;
  connectionId?: string;
}

export interface AnswerRecord {
  questionId: string;
  answer: any;
  submittedAt: number;
  isCorrect: boolean;
  points: number;
  timeToAnswer: number;
}

export interface SessionSettings {
  questionTimeLimit: number;
  showCorrectAnswers: boolean;
  allowLateJoin: boolean;
  maxParticipants: number;
  pointsPerCorrectAnswer: number;
  timeBonus: boolean;
}

export interface SessionMetadata {
  createdAt: number;
  startedAt?: number;
  lastActivity: number;
  totalQuestions: number;
  version: number;
}

export class LiveQuizSessionState {
  private static readonly CACHE_TTL = 24 * 60 * 60; // 24 hours
  private static readonly CACHE_PREFIX = 'live_quiz_session:';
  private static readonly PARTICIPANT_PREFIX = 'participant:';

  // Get session state with caching
  static async getSessionState(sessionId: string): Promise<SessionState | null> {
    try {
      // Try cache first if available
      if (redis) {
        const cached = await redis.get(`${this.CACHE_PREFIX}${sessionId}`);
        if (cached) {
          return JSON.parse(cached);
        }
      }

      // Fetch from database
      const session = await prisma.liveQuizSession.findUnique({
        where: { id: sessionId },
        include: {
          participants: {
            include: {
              answers: {
                include: {
                  question: true,
                },
                orderBy: { submittedAt: 'asc' },
              },
            },
          },
          quiz: {
            include: {
              questions: {
                orderBy: { order: 'asc' },
              },
            },
          },
        },
      });

      if (!session) return null;

      // Transform to session state format
      const sessionState: SessionState = {
        sessionId: session.id,
        status: session.status,
        currentQuestionIndex: session.currentQuestionIndex,
        currentQuestionId: session.currentQuestionId || undefined,
        questionStartTime: session.questionStartTime?.getTime(),
        questionTimeLimit: session.questionTimeLimit || undefined,
  participants: session.participants.map((participant: any) => ({
          id: participant.id,
          nickname: participant.nickname,
          isOnline: false, // Will be updated by WebSocket manager
          score: participant.score,
           answers: participant.answers.map((answer: any) => ({
            questionId: answer.questionId,
            answer: answer.answer,
            submittedAt: answer.submittedAt.getTime(),
            isCorrect: answer.isCorrect,
            points: answer.points,
            timeToAnswer: answer.timeToAnswer,
          })),
          joinedAt: participant.joinedAt.getTime(),
          lastActivity: participant.lastActivity.getTime(),
        })),
        settings: {
          questionTimeLimit: session.questionTimeLimit || 30000,
          showCorrectAnswers: session.showCorrectAnswers,
          allowLateJoin: session.allowLateJoin,
          maxParticipants: session.maxParticipants,
          pointsPerCorrectAnswer: 100,
          timeBonus: true,
        },
        metadata: {
          createdAt: session.createdAt.getTime(),
          startedAt: session.startedAt?.getTime(),
          lastActivity: Date.now(),
          totalQuestions: session.quiz.questions.length,
          version: 1,
        },
      };

      // Cache the result
      if (redis) {
        await redis.setex(
          `${this.CACHE_PREFIX}${sessionId}`,
          this.CACHE_TTL,
          JSON.stringify(sessionState)
        );
      }

      return sessionState;

    } catch (error) {
      logger.error('Failed to get session state', error as Error, { sessionId });
      return null;
    }
  }

  // Update session state with persistence
  static async updateSessionState(sessionState: SessionState): Promise<boolean> {
    try {
      // Update database
      await prisma.liveQuizSession.update({
        where: { id: sessionState.sessionId },
        data: {
          status: sessionState.status,
          currentQuestionIndex: sessionState.currentQuestionIndex,
          currentQuestionId: sessionState.currentQuestionId,
          questionStartTime: sessionState.questionStartTime 
            ? new Date(sessionState.questionStartTime) 
            : null,
          questionTimeLimit: sessionState.questionTimeLimit,
          startedAt: sessionState.metadata.startedAt 
            ? new Date(sessionState.metadata.startedAt) 
            : undefined,
        },
      });

      // Update participants
      for (const participant of sessionState.participants) {
        await prisma.liveQuizParticipant.update({
          where: { id: participant.id },
          data: {
            score: participant.score,
            lastActivity: new Date(participant.lastActivity),
          },
        });
      }

      // Update cache
      if (redis) {
        sessionState.metadata.version += 1;
        sessionState.metadata.lastActivity = Date.now();
        
        await redis.setex(
          `${this.CACHE_PREFIX}${sessionState.sessionId}`,
          this.CACHE_TTL,
          JSON.stringify(sessionState)
        );
      }

      logger.info('Session state updated', { 
        sessionId: sessionState.sessionId,
        status: sessionState.status,
        participants: sessionState.participants.length,
      });

      return true;

    } catch (error) {
      logger.error('Failed to update session state', error as Error, { 
        sessionId: sessionState.sessionId 
      });
      return false;
    }
  }

  // Update participant online status
  static async updateParticipantStatus(
    sessionId: string, 
    participantId: string, 
    isOnline: boolean,
    connectionId?: string
  ): Promise<boolean> {
    try {
      // Update cache first for fast access
      if (redis) {
        const participantKey = `${this.PARTICIPANT_PREFIX}${sessionId}:${participantId}`;
        await redis.hset(participantKey, {
          isOnline: isOnline ? '1' : '0',
          lastActivity: Date.now().toString(),
          connectionId: connectionId || '',
        });
        await redis.expire(participantKey, this.CACHE_TTL);

        // Update session cache
        const sessionKey = `${this.CACHE_PREFIX}${sessionId}`;
        const sessionData = await redis.get(sessionKey);
        if (sessionData) {
          const sessionState: SessionState = JSON.parse(sessionData);
          const participant = sessionState.participants.find(p => p.id === participantId);
          if (participant) {
            participant.isOnline = isOnline;
            participant.lastActivity = Date.now();
            participant.connectionId = connectionId;
            
            await redis.setex(sessionKey, this.CACHE_TTL, JSON.stringify(sessionState));
          }
        }
      }

      // Update database
      await prisma.liveQuizParticipant.update({
        where: { id: participantId },
        data: {
          lastActivity: new Date(),
        },
      });

      return true;

    } catch (error) {
      logger.error('Failed to update participant status', error as Error, { 
        sessionId, 
        participantId, 
        isOnline 
      });
      return false;
    }
  }

  // Submit answer with persistence
  static async submitAnswer(
    sessionId: string,
    participantId: string,
    questionId: string,
    answer: any,
    submittedAt: number = Date.now()
  ): Promise<{ success: boolean; isCorrect: boolean; points: number }> {
    try {
      // Get question details
      const question = await prisma.question.findUnique({
        where: { id: questionId },
      });

      if (!question) {
        return { success: false, isCorrect: false, points: 0 };
      }

      // Check if answer is correct
      const isCorrect = this.checkAnswer(question.correctAnswer, answer);
      
      // Calculate points (with time bonus if applicable)
      const sessionState = await this.getSessionState(sessionId);
      let points = 0;
      
      if (isCorrect && sessionState) {
        points = sessionState.settings.pointsPerCorrectAnswer;
        
        // Time bonus calculation
        if (sessionState.settings.timeBonus && sessionState.questionStartTime) {
          const timeToAnswer = submittedAt - sessionState.questionStartTime;
          const timeLimit = sessionState.questionTimeLimit || 30000;
          const timeRatio = Math.max(0, (timeLimit - timeToAnswer) / timeLimit);
          const timeBonus = Math.round(points * 0.5 * timeRatio); // Up to 50% bonus
          points += timeBonus;
        }
      }

      // Save answer to database
      await prisma.liveQuizAnswer.create({
        data: {
          participantId,
          questionId,
          answer,
          isCorrect,
          points,
          submittedAt: new Date(submittedAt),
          timeToAnswer: sessionState?.questionStartTime 
            ? submittedAt - sessionState.questionStartTime 
            : 0,
        },
      });

      // Update participant score
      await prisma.liveQuizParticipant.update({
        where: { id: participantId },
        data: {
          score: {
            increment: points,
          },
          lastActivity: new Date(submittedAt),
        },
      });

      // Invalidate cache to force refresh
      if (redis) {
        await redis.del(`${this.CACHE_PREFIX}${sessionId}`);
      }

      logger.info('Answer submitted', {
        sessionId,
        participantId,
        questionId,
        isCorrect,
        points,
      });

      return { success: true, isCorrect, points };

    } catch (error) {
      logger.error('Failed to submit answer', error as Error, {
        sessionId,
        participantId,
        questionId,
      });
      return { success: false, isCorrect: false, points: 0 };
    }
  }

  // Recovery: Get all active sessions
  static async getActiveSessions(): Promise<string[]> {
    try {
      const sessions = await prisma.liveQuizSession.findMany({
        where: {
          status: {
            in: ['WAITING', 'ACTIVE', 'PAUSED'],
          },
        },
        select: { id: true },
      });

  return sessions.map((session: any) => session.id);

    } catch (error) {
      logger.error('Failed to get active sessions', error as Error);
      return [];
    }
  }

  // Recovery: Restore session after server restart
  static async restoreSession(sessionId: string): Promise<boolean> {
    try {
      // Clear cache to force database fetch
      if (redis) {
        await redis.del(`${this.CACHE_PREFIX}${sessionId}`);
      }

      // Get fresh session state
      const sessionState = await this.getSessionState(sessionId);
      
      if (!sessionState) {
        logger.warn('Session not found during restoration', { sessionId });
        return false;
      }

      // Mark all participants as offline (will be updated as they reconnect)
      sessionState.participants.forEach(participant => {
        participant.isOnline = false;
        participant.connectionId = undefined;
      });

      // Update session state
      const updated = await this.updateSessionState(sessionState);
      
      if (updated) {
        logger.info('Session restored successfully', { 
          sessionId,
          status: sessionState.status,
          participants: sessionState.participants.length,
        });
      }

      return updated;

    } catch (error) {
      logger.error('Failed to restore session', error as Error, { sessionId });
      return false;
    }
  }

  // Cleanup expired sessions and cache
  static async cleanup(): Promise<void> {
    try {
      // Skip cleanup during build time
      if (!prisma || process.env.NEXT_PHASE === 'phase-production-build') {
        return;
      }

      const expiredSessions = await prisma.liveQuizSession.findMany({
        where: {
          status: {
            in: ['WAITING', 'ACTIVE', 'PAUSED'],
          },
          createdAt: {
            lt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
          },
        },
      });

      for (const session of expiredSessions) {
        // Mark as cancelled
        await prisma.liveQuizSession.update({
          where: { id: session.id },
          data: { status: 'CANCELLED' },
        });

        // Clear cache
        if (redis) {
          await redis.del(`${this.CACHE_PREFIX}${session.id}`);
        }

        logger.info('Expired session cleaned up', { sessionId: session.id });
      }

    } catch (error) {
      logger.error('Failed to cleanup sessions', error as Error);
    }
  }

  // Helper: Check if answer is correct
  private static checkAnswer(correctAnswer: any, submittedAnswer: any): boolean {
    try {
      // Handle different answer types
      if (typeof correctAnswer === 'string' && typeof submittedAnswer === 'string') {
        return correctAnswer.toLowerCase().trim() === submittedAnswer.toLowerCase().trim();
      }

      if (Array.isArray(correctAnswer) && Array.isArray(submittedAnswer)) {
        return JSON.stringify(correctAnswer.sort()) === JSON.stringify(submittedAnswer.sort());
      }

      return JSON.stringify(correctAnswer) === JSON.stringify(submittedAnswer);

    } catch (error) {
      logger.error('Error checking answer', error as Error);
      return false;
    }
  }
}

// Auto-cleanup on startup and periodic intervals
if (process.env.NODE_ENV === 'production') {
  // Initial cleanup
  LiveQuizSessionState.cleanup().catch(error => {
    logger.error('Initial session cleanup failed', error);
  });

  // Periodic cleanup (every hour)
  setInterval(() => {
    LiveQuizSessionState.cleanup().catch(error => {
      logger.error('Periodic session cleanup failed', error);
    });
  }, 60 * 60 * 1000);
}