/**
 * Dashboard Analytics Verification Test
 * Tests that exam completion properly updates dashboard analytics
 */

async function testDashboardAnalytics() {
  console.log('🔍 Testing Dashboard Analytics Integration...');
  
  const baseUrl = 'http://localhost:3000'; // Change to production URL if testing live
  
  try {
    // 1. Test analytics API endpoint exists
    console.log('📡 Testing analytics API endpoint...');
    const analyticsResponse = await fetch(`${baseUrl}/api/dashboard/analytics?sessionId=test-session-123`);
    console.log('Analytics API status:', analyticsResponse.status);
    
    if (analyticsResponse.ok) {
      const analyticsData = await analyticsResponse.json();
      console.log('✅ Analytics API working:', analyticsData.success);
    }
    
    // 2. Test session data submission
    console.log('📝 Testing session data submission...');
    const mockSessionData = {
      sessionId: 'test-session-' + Date.now(),
      topicId: 'acls',
      questions: JSON.stringify([{id: 'test-1', question: 'Test', correctIndex: 1}]),
      answers: JSON.stringify({0: 1}),
      score: 100,
      totalQuestions: 1,
      correctAnswers: 1,
      totalTime: 60,
      completed: true
    };
    
    const submitResponse = await fetch(`${baseUrl}/api/dashboard/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockSessionData)
    });
    
    console.log('Session submission status:', submitResponse.status);
    
    if (submitResponse.ok) {
      const submitResult = await submitResponse.json();
      console.log('✅ Session submission working:', submitResult.success);
      
      // 3. Verify data was saved by fetching with same session ID
      console.log('🔍 Verifying data persistence...');
      const verifyResponse = await fetch(`${baseUrl}/api/dashboard/analytics?sessionId=${mockSessionData.sessionId}`);
      
      if (verifyResponse.ok) {
        const verifyData = await verifyResponse.json();
        console.log('📊 Verification result:', verifyData.data?.overallStats);
        
        if (verifyData.data?.overallStats?.sessionCount > 0) {
          console.log('✅ Analytics integration WORKING! Dashboard should update after exam completion.');
        } else {
          console.log('⚠️ Data may not be persisting correctly.');
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Export for both browser and Node.js environments
if (typeof window !== 'undefined') {
  // Browser environment
  window.testDashboardAnalytics = testDashboardAnalytics;
} else {
  // Node.js environment
  testDashboardAnalytics();
}