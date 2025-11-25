import { describe, it, expect, vi } from 'vitest';

// Stub server-only dependencies
vi.mock('next-auth', () => ({ getServerSession: async () => null }));
vi.mock('@/lib/auth/next-auth', () => ({ authOptions: {} }));
vi.mock('@/lib/database/prisma-client', () => ({
  prisma: {
    liveQuizSession: {
      findUnique: async () => ({ id: 'session-1', title: 'Test Session', status: 'WAITING' }),
    },
  },
}));

describe('Live Quiz Session API', () => {
  it('should fetch session details (stub)', async () => {
    const { GET: getSession } = await import('../../src/app/api/live-quiz/session/[sessionId]/route');
    const req = { url: 'http://localhost/api/live-quiz/session/test-session' };
    const params = { sessionId: 'test-session' };
    const res = await getSession(req as any, { params } as any);
    expect(res).toBeDefined();
  });
});
        import { POST as nextQuestion } from '../../src/app/api/live-quiz/session/[sessionId]/next/route';
