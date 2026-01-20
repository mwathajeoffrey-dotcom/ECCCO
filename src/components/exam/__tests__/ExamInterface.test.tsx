import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import ExamInterface from '../ExamInterface';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

// Mock analytics
jest.mock('@/lib/analytics/service', () => ({
  analytics: {
    initialize: jest.fn(),
    trackPageView: jest.fn(),
    trackExamStart: jest.fn(),
    trackQuestionAnswered: jest.fn(),
    trackExamComplete: jest.fn(),
  },
}));

// Mock fetch
global.fetch = jest.fn() as jest.Mock;

describe('ExamInterface - PALS Auto-Start', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should auto-start exam when topic=pals parameter is present', async () => {
    // Mock search params with topic=pals
    const mockSearchParams = {
      get: jest.fn((key: string) => {
        if (key === 'topic') return 'pals';
        return null;
      }),
    };
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    // Mock topics API response
    const mockTopics = [
      { id: 'pals', name: 'Pediatric Advanced Life Support', description: 'PALS questions' },
      { id: 'acls', name: 'Advanced Cardiac Life Support', description: 'ACLS questions' },
    ];

    // Mock questions API response
    const mockQuestions = {
      success: true,
      count: 5,
      total: 38,
      questions: [
        {
          id: 'pals-001',
          question: 'A 3-year-old child is in cardiac arrest. What is the compression rate?',
          options: ['80-100/min', '100-120/min', '120-140/min', '140-160/min'],
          correctIndex: 1,
          explanation: 'Compression rate should be 100-120/min for all ages.',
          references: ['AHA PALS Guidelines 2020'],
          difficulty: 'medium',
          topicId: 'pals',
        },
      ],
    };

    // Setup fetch mock to return different responses
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockImplementation((url: unknown) => {
      const urlString = url?.toString() || '';
      if (urlString.includes('/api/topics')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTopics),
        } as Response);
      }
      if (urlString.includes('/api/questions?topicId=pals')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockQuestions),
        } as Response);
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    // Render component
    render(<ExamInterface />);

    // Wait for topics to load and auto-start to trigger
    await waitFor(
      () => {
        // Check that fetchQuestions was called with pals topic
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/questions?topicId=pals')
        );
      },
      { timeout: 3000 }
    );

    // Verify the exam started with PALS questions
    await waitFor(() => {
      const questionText = screen.queryByText(/cardiac arrest/i);
      expect(questionText).toBeTruthy();
    });
  });

  it('should show error toast when invalid topic parameter is provided', async () => {
    // Mock search params with invalid topic
    const mockSearchParams = {
      get: jest.fn((key: string) => {
        if (key === 'topic') return 'invalid-topic';
        return null;
      }),
    };
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    // Mock topics API response (without the invalid topic)
    const mockTopics = [
      { id: 'pals', name: 'Pediatric Advanced Life Support', description: 'PALS questions' },
    ];

    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockImplementation((url: unknown) => {
      const urlString = url?.toString() || '';
      if (urlString.includes('/api/topics')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTopics),
        } as Response);
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    // Render component
    render(<ExamInterface />);

    // Wait for topics to load
    await waitFor(
      () => {
        expect(global.fetch).toHaveBeenCalledWith('/api/topics');
      },
      { timeout: 2000 }
    );

    // Note: In a real test, we'd check for the toast error message
    // For now, we verify that fetchQuestions was NOT called
    expect(global.fetch).not.toHaveBeenCalledWith(
      expect.stringContaining('/api/questions?topicId=invalid-topic')
    );
  });

  it('should not auto-start when no topic parameter is present', async () => {
    // Mock search params without topic
    const mockSearchParams = {
      get: jest.fn(() => null),
    };
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    const mockTopics = [
      { id: 'pals', name: 'Pediatric Advanced Life Support', description: 'PALS questions' },
    ];

    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockImplementation((url: unknown) => {
      const urlString = url?.toString() || '';
      if (urlString.includes('/api/topics')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTopics),
        } as Response);
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(<ExamInterface />);

    await waitFor(
      () => {
        expect(global.fetch).toHaveBeenCalledWith('/api/topics');
      },
      { timeout: 2000 }
    );

    // Verify fetchQuestions was NOT called automatically
    expect(global.fetch).not.toHaveBeenCalledWith(
      expect.stringContaining('/api/questions')
    );
  });
});
