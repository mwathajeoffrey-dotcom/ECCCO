import { describe, it, expect } from 'vitest';
import { GET as getSessions } from '../../src/app/api/live-quiz/sessions/route';
import { GET as getMonitoring } from '../../src/app/api/live-quiz/monitoring/route';

// Mock NextRequest for API route testing
class MockRequest {
  url: string;
  constructor(url: string) {
    this.url = url;
  }
}

describe('Live Quiz API', () => {
  it('should return sessions overview', async () => {
    const req = new MockRequest('http://localhost/api/live-quiz/sessions');
    const res = await getSessions(req as any);
    expect(res).toBeDefined();
    // Add more assertions based on expected response structure
  });

  it('should return monitoring analytics', async () => {
    const req = new MockRequest('http://localhost/api/live-quiz/monitoring?action=overview&timeRange=3600000');
    const res = await getMonitoring(req as any);
    expect(res).toBeDefined();
    // Add more assertions based on expected analytics structure
  });
});
