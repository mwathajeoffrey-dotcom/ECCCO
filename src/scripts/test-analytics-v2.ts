import { logger } from '@/lib/logger';
/**
 * Test script to verify the new analytics system
 */

import { analyticsV2 } from '@/lib/analytics/analytics-v2';

async function testAnalyticsSystem() {
  logger.debug('🧪 Starting Analytics V2 Test...');
  
  try {
    // 1. Initialize analytics
    logger.debug('1️⃣ Initializing analytics...');
    await analyticsV2.initialize();
    logger.debug('✅ Analytics initialized');
    
    // 2. Get session ID
    logger.debug('2️⃣ Getting session ID...');
    const sessionId = analyticsV2.getSessionId();
    logger.debug(`✅ Session ID: ${sessionId}`);
    
    // 3. Test empty analytics summary
    logger.debug('3️⃣ Getting initial analytics summary...');
    const initialSummary = analyticsV2.getAnalyticsSummary();
    logger.debug(`✅ Initial summary - Sessions: ${initialSummary.totalSessions}, Questions: ${initialSummary.totalQuestions}`);
    
    // 4. Record a mock exam completion
    logger.debug('4️⃣ Recording mock exam completion...');
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
    logger.debug('✅ Mock exam recorded');
    
    // 5. Get updated analytics summary
    logger.debug('5️⃣ Getting updated analytics summary...');
    const updatedSummary = analyticsV2.getAnalyticsSummary();
    logger.debug(`✅ Updated summary:`);
    logger.debug(`   - Sessions: ${updatedSummary.totalSessions}`);
    logger.debug(`   - Total Questions: ${updatedSummary.totalQuestions}`);
    logger.debug(`   - Correct Answers: ${updatedSummary.totalCorrect}`);
    logger.debug(`   - Average Score: ${updatedSummary.averageScore}%`);
    logger.debug(`   - Time Spent: ${updatedSummary.totalTimeSpent}s`);
    logger.debug(`   - Strongest Topic: ${updatedSummary.strongestTopic.name} (${updatedSummary.strongestTopic.score}%)`);
    logger.debug(`   - Recent Sessions: ${updatedSummary.recentSessions.length}`);
    
    // 6. Test another exam completion with different topic
    logger.debug('6️⃣ Recording another mock exam...');
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
    logger.debug('✅ Second mock exam recorded');
    
    // 7. Get final analytics summary
    logger.debug('7️⃣ Getting final analytics summary...');
    const finalSummary = analyticsV2.getAnalyticsSummary();
    logger.debug(`✅ Final summary:`);
    logger.debug(`   - Sessions: ${finalSummary.totalSessions}`);
    logger.debug(`   - Total Questions: ${finalSummary.totalQuestions}`);
    logger.debug(`   - Average Score: ${finalSummary.averageScore}%`);
    logger.debug(`   - Topic Performance: ${finalSummary.topicPerformance.length} topics`);
    finalSummary.topicPerformance.forEach(topic => {
      logger.debug(`     * ${topic.topicName}: ${topic.averageScore}% (${topic.sessions} sessions)`);
    });
    
    logger.debug('🎉 Analytics V2 Test Completed Successfully!');
    return true;
    
  } catch (error) {
    logger.error('❌ Analytics V2 Test Failed:', error);
    return false;
  }
}

export { testAnalyticsSystem };