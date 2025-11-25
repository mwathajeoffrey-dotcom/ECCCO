// Client-side WebSocket connection manager for live quiz sessions
import { logger } from '@/lib/logger';

export interface LiveQuizMessage {
  type: 'participant_joined' | 'participant_left' | 'question_started' | 'question_ended' | 
        'answer_submitted' | 'session_completed' | 'heartbeat' | 'error' | 'session_update';
  sessionId: string;
  data?: any;
  timestamp: number;
}

export interface ParticipantUpdate {
  id: string;
  nickname: string;
  isOnline: boolean;
  score: number;
  lastActivity: number;
}

export interface QuestionState {
  questionId: string;
  timeLeft: number;
  participants: ParticipantUpdate[];
  answersSubmitted: number;
}

export class LiveQuizWebSocketClient {
  private ws: WebSocket | null = null;
  private sessionId: string;
  private participantId: string;
  private nickname: string;
  private accessCode?: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private isConnecting = false;
  private isDestroyed = false;

  // Event handlers
  private onMessageHandler?: (message: LiveQuizMessage) => void;
  private onConnectionHandler?: (connected: boolean) => void;
  private onErrorHandler?: (error: Error) => void;
  private onParticipantUpdateHandler?: (participants: ParticipantUpdate[]) => void;
  private onQuestionUpdateHandler?: (question: QuestionState) => void;

  constructor(
    sessionId: string,
    participantId: string,
    nickname: string,
    accessCode?: string
  ) {
    this.sessionId = sessionId;
    this.participantId = participantId;
    this.nickname = nickname;
    this.accessCode = accessCode;
  }

  // Connect to WebSocket server
  async connect(): Promise<boolean> {
    if (this.isConnecting || this.isDestroyed) return false;

    try {
      this.isConnecting = true;
      
      // Get WebSocket URL from API
      const response = await fetch('/api/live-quiz/websocket?action=connection-info');
      const { websocketUrl } = await response.json();

      // Build connection URL with parameters
      const url = new URL(websocketUrl);
      url.searchParams.set('sessionId', this.sessionId);
      url.searchParams.set('participantId', this.participantId);
      url.searchParams.set('nickname', this.nickname);
      if (this.accessCode) {
        url.searchParams.set('accessCode', this.accessCode);
      }

      return new Promise((resolve) => {
        this.ws = new WebSocket(url.toString(), 'live-quiz-v1');

        this.ws.onopen = () => {
          logger.info('WebSocket connected', { sessionId: this.sessionId });
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          this.startHeartbeat();
          this.onConnectionHandler?.(true);
          resolve(true);
        };

        this.ws.onmessage = (event) => {
          try {
            const message: LiveQuizMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            logger.error('Failed to parse WebSocket message', error as Error);
          }
        };

        this.ws.onclose = (event) => {
          logger.info('WebSocket disconnected', { 
            sessionId: this.sessionId,
            code: event.code,
            reason: event.reason 
          });
          this.isConnecting = false;
          this.stopHeartbeat();
          this.onConnectionHandler?.(false);

          // Attempt reconnection unless intentionally closed
          if (event.code !== 1000 && !this.isDestroyed) {
            this.attemptReconnection();
          }
        };

        this.ws.onerror = (error) => {
          logger.error('WebSocket error', error as any);
          this.isConnecting = false;
          this.onErrorHandler?.(new Error('WebSocket connection error'));
          resolve(false);
        };

        // Connection timeout
        setTimeout(() => {
          if (this.isConnecting) {
            this.isConnecting = false;
            this.ws?.close();
            resolve(false);
          }
        }, 10000);
      });

    } catch (error) {
      this.isConnecting = false;
      logger.error('Failed to connect WebSocket', error as Error);
      this.onErrorHandler?.(error as Error);
      return false;
    }
  }

  // Handle incoming messages
  private handleMessage(message: LiveQuizMessage) {
    try {
      switch (message.type) {
        case 'participant_joined':
        case 'participant_left':
        case 'session_update':
          if (message.data.participants) {
            this.onParticipantUpdateHandler?.(message.data.participants);
          }
          break;

        case 'question_started':
        case 'question_ended':
          if (message.data.question) {
            this.onQuestionUpdateHandler?.(message.data.question);
          }
          break;

        case 'answer_submitted':
          if (message.data.participants) {
            this.onParticipantUpdateHandler?.(message.data.participants);
          }
          if (message.data.question) {
            this.onQuestionUpdateHandler?.(message.data.question);
          }
          break;

        case 'heartbeat':
          // Respond to heartbeat
          this.send({
            type: 'heartbeat',
            sessionId: this.sessionId,
            timestamp: Date.now(),
          });
          break;

        case 'error':
          this.onErrorHandler?.(new Error(message.data.message || 'Server error'));
          break;
      }

      // Call general message handler
      this.onMessageHandler?.(message);

    } catch (error) {
      logger.error('Error handling WebSocket message', error as Error);
    }
  }

  // Send message to server
  send(message: Partial<LiveQuizMessage>) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      try {
        const fullMessage: LiveQuizMessage = {
          type: message.type!,
          sessionId: this.sessionId,
          data: message.data,
          timestamp: Date.now(),
        };
        this.ws.send(JSON.stringify(fullMessage));
        return true;
      } catch (error) {
        logger.error('Failed to send WebSocket message', error as Error);
        return false;
      }
    }
    return false;
  }

  // Submit answer for current question
  submitAnswer(questionId: string, answer: any) {
    return this.send({
      type: 'answer_submitted',
      data: {
        questionId,
        answer,
        participantId: this.participantId,
      },
    });
  }

  // Start heartbeat to maintain connection
  private startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.send({
          type: 'heartbeat',
          data: { participantId: this.participantId },
        });
      }
    }, 30000); // 30 seconds
  }

  // Stop heartbeat
  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  // Attempt to reconnect
  private async attemptReconnection() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts || this.isDestroyed) {
      this.onErrorHandler?.(new Error('Max reconnection attempts exceeded'));
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    logger.info('Attempting WebSocket reconnection', {
      sessionId: this.sessionId,
      attempt: this.reconnectAttempts,
      delay,
    });

    setTimeout(async () => {
      if (!this.isDestroyed) {
        await this.connect();
      }
    }, delay);
  }

  // Event handlers
  onMessage(handler: (message: LiveQuizMessage) => void) {
    this.onMessageHandler = handler;
  }

  onConnection(handler: (connected: boolean) => void) {
    this.onConnectionHandler = handler;
  }

  onError(handler: (error: Error) => void) {
    this.onErrorHandler = handler;
  }

  onParticipantUpdate(handler: (participants: ParticipantUpdate[]) => void) {
    this.onParticipantUpdateHandler = handler;
  }

  onQuestionUpdate(handler: (question: QuestionState) => void) {
    this.onQuestionUpdateHandler = handler;
  }

  // Get connection status
  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  get connectionState(): string {
    if (!this.ws) return 'disconnected';
    
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING: return 'connecting';
      case WebSocket.OPEN: return 'connected';
      case WebSocket.CLOSING: return 'closing';
      case WebSocket.CLOSED: return 'disconnected';
      default: return 'unknown';
    }
  }

  // Disconnect and cleanup
  disconnect() {
    this.isDestroyed = true;
    this.stopHeartbeat();
    
    if (this.ws) {
      this.ws.close(1000, 'Client disconnect');
      this.ws = null;
    }
    
    logger.info('WebSocket client disconnected', { sessionId: this.sessionId });
  }
}

// Factory function for creating WebSocket clients
export function createLiveQuizWebSocketClient(
  sessionId: string,
  participantId: string,
  nickname: string,
  accessCode?: string
): LiveQuizWebSocketClient {
  return new LiveQuizWebSocketClient(sessionId, participantId, nickname, accessCode);
}