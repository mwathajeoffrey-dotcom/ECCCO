/**
 * Test script to verify analytics integration is working
 * This simulates an exam completion to test database persistence
 */

import { analytics } from '../src/lib/analytics/service';

// Mock exam data for testing
const mockQuestions = [
  {
    id: 'test-q1',
    question: 'Test question 1',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 1,
    topicId: 'test-topic'
  },
  {
    id: 'test-q2', 
    question: 'Test question 2',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 2,
    topicId: 'test-topic'
  }
];

const mockAnswers = {
  0: 1, // Correct
  1: 0  // Incorrect
};

async function testAnalyticsIntegration() {
  console.log('🧪 Testing Analytics Integration...');
  
  try {
    // Initialize analytics
    await analytics.initialize();
    
    // Simulate exam completion
    const score = 50; // 1 out of 2 correct = 50%
    const timeSpent = 120; // 2 minutes
    const topicId = 'test-topic';
    
    console.log('📝 Simulating exam completion...');
    await analytics.trackExamComplete(topicId, score, timeSpent, mockQuestions, mockAnswers);
    
    console.log('✅ Test completed successfully!');
    console.log('🔍 Check your dashboard to verify the session data was saved.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testAnalyticsIntegration();