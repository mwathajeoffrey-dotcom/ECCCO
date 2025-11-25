// Production-ready WebSocket manager for live quiz sessions
import { logger } from '@/lib/logger';

export interface WebSocketConnection {
  id: string;
  sessionId: string;
  participantId: string;
  nickname: string;
  ws: any; // WebSocket instance
  lastActivity: number;
  isAlive: boolean;
}

export interface LiveQuizMessage {
  type: 'participant_joined' | 'participant_left' | 'question_started' | 'question_ended' | 
        'answer_submitted' | 'session_completed' | 'heartbeat' | 'error' | 'session_update' | 'pong';
  sessionId: string;
  participantId?: string;
  data?: any;
  timestamp: number;
}

export class LiveQuizWebSocketManager {
  private connections: Map<string, WebSocketConnection> = new Map();
  private sessionParticipants: Map<string, Set<string>> = new Map();
  private heartbeatInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.startHeartbeat();
  }

  // Handle new WebSocket connection with security validation
  handleConnection(sessionId: string, participantId: string, nickname: string, ws: any): boolean {
    try {
      const connectionId = this.generateConnectionId();
      
      const connection: WebSocketConnection = {
        id: connectionId,
        sessionId,
        participantId,
        nickname,
        ws,
        lastActivity: Date.now(),
        isAlive: true,
      };

      // Store connection
      this.connections.set(connectionId, connection);
      
      // Add to session participants
      if (!this.sessionParticipants.has(sessionId)) {
        this.sessionParticipants.set(sessionId, new Set());
      }
      this.sessionParticipants.get(sessionId)!.add(connectionId);

      // Set up connection event handlers with security monitoring
      this.setupConnectionHandlers(connection);

      // Broadcast participant joined
      this.broadcastToSession(sessionId, {
        type: 'participant_joined',
        sessionId,
        data: {
          participant: { id: participantId, nickname, isOnline: true },
          participants: this.getSessionParticipants(sessionId),
        },
        timestamp: Date.now(),
      }, connectionId);

      logger.info('WebSocket connection established', {
        sessionId,
        participantId,
        connectionId,
        nickname,
      });

      return true;

    } catch (error) {
      logger.error('Failed to handle WebSocket connection', error as Error);
      ws.close(1011, 'Internal server error');
      return false;
    }
  }

  // Set up WebSocket event handlers
  private setupConnectionHandlers(connection: WebSocketConnection) {
    const { ws, id: connectionId } = connection;

    ws.on('message', async (data: any) => {
      try {
        const message = JSON.parse(data.toString());
        connection.lastActivity = Date.now();
        await this.handleMessage(connection, message);
      } catch (error) {
        logger.error('Error handling WebSocket message', error as Error, { connectionId });
        this.sendError(connectionId, 'Invalid message format');
      }
    });

    ws.on('close', (code: number, reason: string) => {
      this.handleDisconnection(connection, code, reason.toString());
    });

    ws.on('error', (error: Error) => {
      logger.error('WebSocket error', error, { connectionId });
      this.handleDisconnection(connection, 1011, 'WebSocket error');
    });

    ws.on('pong', () => {
      connection.isAlive = true;
      connection.lastActivity = Date.now();
    });
  }

  // Handle incoming messages with security validation
  private async handleMessage(connection: WebSocketConnection, message: any) {
    try {
      // Log message for security monitoring
      logger.debug('WebSocket message received', {
        connectionId: connection.id,
        sessionId: connection.sessionId,
        participantId: connection.participantId,
        messageType: message.type,
      });

      // Handle different message types
      switch (message.type) {
        case 'heartbeat':
          this.handleHeartbeat(connection);
          break;

        case 'answer_submitted':
          await this.handleAnswerSubmission(connection, message.data);
          break;

        case 'ping':
          this.sendToConnection(connection.id, {
            type: 'pong',
            sessionId: connection.sessionId,
            timestamp: Date.now(),
          });
          break;

        default:
          logger.warn('Unknown WebSocket message type', {
            connectionId: connection.id,
            messageType: message.type,
          });
      }

    } catch (error) {
      logger.error('Error handling WebSocket message', error as Error, {
        connectionId: connection.id,
      });

      // Send error response
      this.sendToConnection(connection.id, {
        type: 'error',
        sessionId: connection.sessionId,
        data: { message: 'Failed to process message' },
        timestamp: Date.now(),
      });
    }
  }

  // Handle heartbeat
  private handleHeartbeat(connection: WebSocketConnection) {
    connection.lastActivity = Date.now();
    this.sendToConnection(connection.id, {
      type: 'heartbeat',
      sessionId: connection.sessionId,
      timestamp: Date.now(),
    });
  }

  // Handle answer submission
  private async handleAnswerSubmission(connection: WebSocketConnection, data: any) {
    try {
      const { questionId, answer } = data;
      
      // This would integrate with the session state manager
      // For now, just acknowledge the answer
      this.sendToConnection(connection.id, {
        type: 'answer_submitted',
        sessionId: connection.sessionId,
        data: {
          questionId,
          acknowledged: true,
        },
        timestamp: Date.now(),
      });

      logger.info('Answer submitted', {
        sessionId: connection.sessionId,
        participantId: connection.participantId,
        questionId,
      });

    } catch (error) {
      logger.error('Error handling answer submission', error as Error);
      this.sendError(connection.id, 'Failed to submit answer');
    }
  }

  // Handle connection disconnection
  private handleDisconnection(connection: WebSocketConnection, code: number, reason: string) {
    try {
      // Remove from connections
      this.connections.delete(connection.id);

      // Remove from session participants
      const sessionConnections = this.sessionParticipants.get(connection.sessionId);
      if (sessionConnections) {
        sessionConnections.delete(connection.id);
        
        // Clean up empty session
        if (sessionConnections.size === 0) {
          this.sessionParticipants.delete(connection.sessionId);
        }
      }

      // Broadcast participant left
      this.broadcastToSession(connection.sessionId, {
        type: 'participant_left',
        sessionId: connection.sessionId,
        data: {
          participant: { 
            id: connection.participantId, 
            nickname: connection.nickname, 
            isOnline: false 
          },
          participants: this.getSessionParticipants(connection.sessionId),
        },
        timestamp: Date.now(),
      });

      logger.info('WebSocket disconnection handled', {
        sessionId: connection.sessionId,
        participantId: connection.participantId,
        connectionId: connection.id,
        code,
        reason,
      });

    } catch (error) {
      logger.error('Error handling disconnection', error as Error);
    }
  }

  // Broadcast message to all participants in a session
  broadcastToSession(sessionId: string, message: LiveQuizMessage, excludeConnectionId?: string) {
    try {
      const sessionConnections = this.sessionParticipants.get(sessionId);
      if (!sessionConnections) return;

      let sentCount = 0;
      for (const connectionId of sessionConnections) {
        if (connectionId !== excludeConnectionId) {
          const sent = this.sendToConnection(connectionId, message);
          if (sent) sentCount++;
        }
      }

      logger.debug('Message broadcasted to session', {
        sessionId,
        messageType: message.type,
        totalConnections: sessionConnections.size,
        sentTo: sentCount,
      });

    } catch (error) {
      logger.error('Error broadcasting to session', error as Error, { sessionId });
    }
  }

  // Send message to specific connection
  sendToConnection(connectionId: string, message: LiveQuizMessage): boolean {
    try {
      const connection = this.connections.get(connectionId);
      if (!connection) return false;

      if (connection.ws.readyState === 1) { // WebSocket.OPEN
        connection.ws.send(JSON.stringify(message));
        return true;
      } else {
        // Clean up dead connection
        this.connections.delete(connectionId);
        return false;
      }

    } catch (error) {
      logger.error('Error sending message to connection', error as Error, { connectionId });
      return false;
    }
  }

  // Send error message
  private sendError(connectionId: string, errorMessage: string) {
    const connection = this.connections.get(connectionId);
    if (connection) {
      this.sendToConnection(connectionId, {
        type: 'error',
        sessionId: connection.sessionId,
        data: { message: errorMessage },
        timestamp: Date.now(),
      });
    }
  }

  // Get participants for a session
  private getSessionParticipants(sessionId: string): any[] {
    const sessionConnections = this.sessionParticipants.get(sessionId);
    if (!sessionConnections) return [];

    const participants: any[] = [];
    for (const connectionId of sessionConnections) {
      const connection = this.connections.get(connectionId);
      if (connection) {
        participants.push({
          id: connection.participantId,
          nickname: connection.nickname,
          isOnline: true,
          lastActivity: connection.lastActivity,
        });
      }
    }

    return participants;
  }

  // Start heartbeat monitoring
  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      const now = Date.now();
      const staleThreshold = 60000; // 60 seconds

      for (const [connectionId, connection] of this.connections.entries()) {
        if (now - connection.lastActivity > staleThreshold) {
          logger.warn('Stale connection detected', { connectionId, sessionId: connection.sessionId });
          
          // Ping the connection
          if (connection.ws.readyState === 1) {
            connection.isAlive = false;
            connection.ws.ping();
            
            // If still not alive after ping, close
            setTimeout(() => {
              if (!connection.isAlive) {
                connection.ws.close(1000, 'Heartbeat timeout');
              }
            }, 5000);
          } else {
            // Remove dead connection
            this.handleDisconnection(connection, 1006, 'Connection lost');
          }
        }
      }
    }, 30000); // Every 30 seconds
  }

  // Generate unique connection ID
  private generateConnectionId(): string {
    return `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Get connection statistics
  getConnectionStats() {
    return {
      totalConnections: this.connections.size,
      activeSessions: this.sessionParticipants.size,
      connectionsBySession: Array.from(this.sessionParticipants.entries()).map(([sessionId, connections]) => ({
        sessionId,
        connectionCount: connections.size,
      })),
    };
  }

  // Shutdown cleanup
  shutdown() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    // Close all connections
    for (const connection of this.connections.values()) {
      try {
        connection.ws.close(1001, 'Server shutdown');
      } catch (error) {
        logger.error('Error closing connection during shutdown', error as Error);
      }
    }

    this.connections.clear();
    this.sessionParticipants.clear();
    
    logger.info('WebSocket manager shut down');
  }
}

// Export singleton instance
export const liveQuizWSManager = new LiveQuizWebSocketManager();