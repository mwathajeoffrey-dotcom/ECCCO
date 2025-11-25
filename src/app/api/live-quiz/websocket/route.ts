// WebSocket API endpoint for live quiz sessions
import { NextRequest } from 'next/server';
import { WebSocketServer, WebSocket } from 'ws';
import { liveQuizWSManager } from '@/lib/live-quiz/websocket-manager';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/database/prisma-client';

// Global WebSocket server instance
let wss: WebSocketServer | null = null;

// Initialize WebSocket server
function initWebSocketServer() {
  if (wss) return wss;

  try {
    wss = new WebSocketServer({
      port: parseInt(process.env.WEBSOCKET_PORT || '8080'),
      perMessageDeflate: false,
    });

    wss.on('connection', async (ws: WebSocket, req) => {
      try {
        // Parse connection parameters from URL
        const url = new URL(req.url!, 'http://localhost');
        const sessionId = url.searchParams.get('sessionId');
        const participantId = url.searchParams.get('participantId');
        const nickname = url.searchParams.get('nickname');
        const accessCode = url.searchParams.get('accessCode');

        if (!sessionId || !participantId || !nickname) {
          ws.close(1008, 'Missing required parameters');
          return;
        }

        // Validate session exists and is active
        const session = await prisma.liveQuizSession.findUnique({
          where: { id: sessionId },
          include: {
            participants: {
              where: { id: participantId },
            },
          },
        });

        if (!session) {
          ws.close(1008, 'Session not found');
          return;
        }

        if (session.status === 'COMPLETED' || session.status === 'CANCELLED') {
          ws.close(1008, 'Session has ended');
          return;
        }

        // Validate access code if provided
        if (accessCode && session.accessCode !== accessCode) {
          ws.close(1008, 'Invalid access code');
          return;
        }

        // Handle connection through WebSocket manager
        liveQuizWSManager.handleConnection(sessionId, participantId, nickname, ws);

        logger.info('WebSocket connection established', {
          sessionId,
          participantId,
          nickname,
          userAgent: req.headers['user-agent'],
          ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        });

      } catch (error) {
        logger.error('Error in WebSocket connection handler', error as Error);
        ws.close(1011, 'Internal server error');
      }
    });

    wss.on('error', (error) => {
      logger.error('WebSocket server error', error);
    });

    logger.info('WebSocket server initialized', {
      port: parseInt(process.env.WEBSOCKET_PORT || '8080'),
    });

    return wss;
  } catch (error) {
    logger.error('Failed to initialize WebSocket server', error as Error);
    throw error;
  }
}

// API endpoint for WebSocket connection info
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'connection-info':
        return Response.json({
          websocketUrl: `ws://localhost:${process.env.WEBSOCKET_PORT || '8080'}`,
          supportedProtocols: ['live-quiz-v1'],
          connectionParams: [
            'sessionId (required)',
            'participantId (required)', 
            'nickname (required)',
            'accessCode (optional)',
          ],
        });

      case 'start-server':
        if (!wss) {
          initWebSocketServer();
        }
        return Response.json({ 
          message: 'WebSocket server started',
          port: parseInt(process.env.WEBSOCKET_PORT || '8080'),
        });

      case 'server-status':
        return Response.json({
          running: !!wss,
          port: parseInt(process.env.WEBSOCKET_PORT || '8080'),
          connections: wss?.clients.size || 0,
        });

      default:
        return Response.json(
          { error: 'Invalid action. Supported actions: connection-info, start-server, server-status' },
          { status: 400 }
        );
    }
  } catch (error) {
    logger.error('Error in WebSocket API endpoint', error as Error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Initialize server on module load in production
if (process.env.NODE_ENV === 'production') {
  try {
    initWebSocketServer();
  } catch (error) {
    logger.error('Failed to auto-initialize WebSocket server in production', error as Error);
  }
}

// Graceful shutdown
process.on('SIGINT', () => {
  logger.info('Shutting down WebSocket server...');
  liveQuizWSManager.shutdown();
  wss?.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Shutting down WebSocket server...');
  liveQuizWSManager.shutdown();
  wss?.close();
  process.exit(0);
});