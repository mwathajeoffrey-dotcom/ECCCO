import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/database/prisma-client', () => ({
  prisma: {
    liveQuizSession: {
      findUnique: async (opts: any) => {
        if (opts?.where?.accessCode === 'TESTCODE') {
          return {
            id: 'session-1',
            title: 'Test Quiz',
            description: 'A test quiz',
            accessCode: 'TESTCODE',
            status: 'WAITING',
            maxParticipants: null,
            _count: { participants: 0 },
            questionIds: JSON.stringify(['q1', 'q2']),
          };
        }
        return null;
      },
    },
    liveQuizParticipant: {
      findFirst: async () => null,
      create: async (data: any) => ({ id: 'participant-1', nickname: data.data.nickname, ...data.data }),
    },
  },
}));

class MockRequest {
  url!: string;
  body: any;
  constructor(url: string, body: any) {
    this.url = url;
    this.body = body;
  }
  async json() {
    return this.body;
  }
}

describe('Live Quiz Join API', () => {
  it('should allow anonymous user to join', async () => {
    vi.resetModules();
    vi.unmock('next-auth');
    vi.unmock('@/lib/auth/next-auth');
    const { POST: joinQuiz } = await import('../app/api/live-quiz/join/[accessCode]/route');
    const req = new MockRequest('http://localhost/api/live-quiz/join/TESTCODE', { nickname: 'anon' });
    const params = { accessCode: 'TESTCODE' } as any;
    const res = await joinQuiz(req as any, { params } as any);
    expect(res).toBeDefined();
    const data = await res.json();
    expect(data.nickname).toBe('anon');
    expect(data.userId).toBeNull();
  });

  it('should allow authenticated user to join', async () => {
    vi.resetModules();
    vi.mock('next-auth', () => ({ getServerSession: async () => ({ user: { id: 'user-123' } }) }));
    vi.mock('@/lib/auth/next-auth', () => ({ authOptions: {} }));
    const { POST: joinQuiz } = await import('../app/api/live-quiz/join/[accessCode]/route');
    const req = new MockRequest('http://localhost/api/live-quiz/join/TESTCODE', { nickname: 'authuser' });
    const params = { accessCode: 'TESTCODE' } as any;
    const res = await joinQuiz(req as any, { params } as any);
    expect(res).toBeDefined();
    const data = await res.json();
    expect(data.nickname).toBe('authuser');
    expect(data.userId).toBe('user-123');
  });
});
