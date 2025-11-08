/**
 * Test script to verify the new analytics system
 */

import { analyticsV2 } from '@/lib/analytics/analytics-v2';

async function testAnalyticsSystem() {
  console.log('🧪 Starting Analytics V2 Test...');
  
  try {
    // 1. Initialize analytics
    console.log('1️⃣ Initializing analytics...');
    await analyticsV2.initialize();
    console.log('✅ Analytics initialized');
    
    // 2. Get session ID
    console.log('2️⃣ Getting session ID...');
    const sessionId = analyticsV2.getSessionId();
    console.log(`✅ Session ID: ${sessionId}`);
    
    // 3. Test empty analytics summary
    console.log('3️⃣ Getting initial analytics summary...');
    const initialSummary = analyticsV2.getAnalyticsSummary();
    console.log(`✅ Initial summary - Sessions: ${initialSummary.totalSessions}, Questions: ${initialSummary.totalQuestions}`);
    
    // 4. Record a mock exam completion
    console.log('4️⃣ Recording mock exam completion...');
    const mockQuestions = [
      { id: '1', topicId: 'bls', difficulty: 'medium', correctIndex: 0 },
      { id: '2', topicId: 'bls', difficulty: 'easy', correctIndex: 1 },
      { id: '3', topicId: 'bls', difficulty: 'hard', correctIndex: 2 },
      { id: '4', topicId: 'bls', difficulty: 'medium', correctIndex: 1 },
      { id: '5', topicId: 'bls', difficulty: 'easy', correctIndex: 0 }
    ];
    
    const mockAnswers = { 0: 0, 1: 1, 2: 2, 3: 0, 4: 0 }; // 4/5 correct = 80%
    const mockTimeSpent = 600; // 10 minutes
    
    await analyticsV2.recordExamCompletion(
      'bls',
      'Basic Life Support',
      mockQuestions,
      mockAnswers,
      mockTimeSpent
    );
    console.log('✅ Mock exam recorded');
    
    // 5. Get updated analytics summary
    console.log('5️⃣ Getting updated analytics summary...');
    const updatedSummary = analyticsV2.getAnalyticsSummary();
    console.log(`✅ Updated summary:`);
    console.log(`   - Sessions: ${updatedSummary.totalSessions}`);
    console.log(`   - Total Questions: ${updatedSummary.totalQuestions}`);
    console.log(`   - Correct Answers: ${updatedSummary.totalCorrect}`);
    console.log(`   - Average Score: ${updatedSummary.averageScore}%`);
    console.log(`   - Time Spent: ${updatedSummary.totalTimeSpent}s`);
    console.log(`   - Strongest Topic: ${updatedSummary.strongestTopic.name} (${updatedSummary.strongestTopic.score}%)`);
    console.log(`   - Recent Sessions: ${updatedSummary.recentSessions.length}`);
    
    // 6. Test another exam completion with different topic
    console.log('6️⃣ Recording another mock exam...');
    const mockQuestions2 = [
      { id: '6', topicId: 'acls', difficulty: 'hard', correctIndex: 1 },
      { id: '7', topicId: 'acls', difficulty: 'medium', correctIndex: 0 },
      { id: '8', topicId: 'acls', difficulty: 'hard', correctIndex: 2 }
    ];
    
    const mockAnswers2 = { 0: 1, 1: 2, 2: 2 }; // 2/3 correct = 67%
    const mockTimeSpent2 = 300; // 5 minutes
    
    await analyticsV2.recordExamCompletion(
      'acls',
      'Advanced Cardiac Life Support',
      mockQuestions2,
      mockAnswers2,
      mockTimeSpent2
    );
    console.log('✅ Second mock exam recorded');
    
    // 7. Get final analytics summary
    console.log('7️⃣ Getting final analytics summary...');
    const finalSummary = analyticsV2.getAnalyticsSummary();
    console.log(`✅ Final summary:`);
    console.log(`   - Sessions: ${finalSummary.totalSessions}`);
    console.log(`   - Total Questions: ${finalSummary.totalQuestions}`);
    console.log(`   - Average Score: ${finalSummary.averageScore}%`);
    console.log(`   - Topic Performance: ${finalSummary.topicPerformance.length} topics`);
    finalSummary.topicPerformance.forEach(topic => {
      console.log(`     * ${topic.topicName}: ${topic.averageScore}% (${topic.sessions} sessions)`);
    });
    
    console.log('🎉 Analytics V2 Test Completed Successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ Analytics V2 Test Failed:', error);
    return false;
  }
}

export { testAnalyticsSystem };