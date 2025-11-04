/**
 * Learning Analytics API Endpoints
 * 
 * Provides comprehensive analytics data for the ECCCO platform
 * including insights, recommendations, performance metrics, and study plans.
 */

import { NextRequest, NextResponse } from 'next/server';
import { learningAnalytics } from '@/lib/analytics/learningAnalytics';
import { validateUser } from '@/lib/auth/developer';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const userId = searchParams.get('userId') || 'anonymous';
    
    // Validate user (in production, get from session/auth)
    const user = await validateUser(request);
    const actualUserId = user?.id || userId;

    switch (action) {
      case 'insights':
        const timeframe = {
          start: new Date(searchParams.get('startDate') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
          end: new Date(searchParams.get('endDate') || new Date().toISOString()),
        };
        
        const insights = await learningAnalytics.analyzeResponsePatterns(actualUserId, timeframe);
        
        return NextResponse.json({
          success: true,
          data: insights,
          metadata: {
            timeframe,
            userId: actualUserId,
            generated: new Date().toISOString(),
          },
        });

      case 'recommendations':
        const recommendations = await learningAnalytics.generateAdaptiveRecommendations(actualUserId);
        
        return NextResponse.json({
          success: true,
          data: recommendations,
          metadata: {
            userId: actualUserId,
            count: recommendations.length,
            generated: new Date().toISOString(),
          },
        });

      case 'performance':
        const metrics = await learningAnalytics.calculatePerformanceMetrics(actualUserId);
        
        return NextResponse.json({
          success: true,
          data: metrics,
          metadata: {
            userId: actualUserId,
            calculated: new Date().toISOString(),
          },
        });

      case 'dashboard':
        // Get comprehensive dashboard data
        const [dashboardInsights, dashboardRecommendations, dashboardMetrics] = await Promise.all([
          learningAnalytics.analyzeResponsePatterns(actualUserId),
          learningAnalytics.generateAdaptiveRecommendations(actualUserId),
          learningAnalytics.calculatePerformanceMetrics(actualUserId),
        ]);

        return NextResponse.json({
          success: true,
          data: {
            insights: dashboardInsights.slice(0, 5), // Top 5 insights
            recommendations: dashboardRecommendations.slice(0, 5), // Top 5 recommendations
            performance: {
              overall: dashboardMetrics.overall,
              learningVelocity: dashboardMetrics.learningVelocity,
              cognitiveLoad: dashboardMetrics.cognitiveLoad,
              topTopics: Array.from(dashboardMetrics.byTopic.entries())
                .sort(([, a], [, b]) => b.mastery - a.mastery)
                .slice(0, 5)
                .map(([topicId, data]) => ({ topicId, ...data })),
            },
          },
          metadata: {
            userId: actualUserId,
            generated: new Date().toISOString(),
          },
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Learning analytics API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId = 'anonymous' } = body;

    // Validate user (in production, get from session/auth)
    const user = await validateUser(request);
    const actualUserId = user?.id || userId;

    switch (action) {
      case 'record_session':
        const { session } = body;
        if (!session) {
          return NextResponse.json(
            { success: false, error: 'Session data is required' },
            { status: 400 }
          );
        }

        const sessionId = await learningAnalytics.recordLearningSession({
          ...session,
          userId: actualUserId,
        });

        return NextResponse.json({
          success: true,
          data: { sessionId },
          message: 'Learning session recorded successfully',
        });

      case 'generate_study_plan':
        const { preferences } = body;
        if (!preferences) {
          return NextResponse.json(
            { success: false, error: 'Study preferences are required' },
            { status: 400 }
          );
        }

        const studyPlan = await learningAnalytics.generateStudyPlan(actualUserId, preferences);

        return NextResponse.json({
          success: true,
          data: studyPlan,
          message: 'Study plan generated successfully',
        });

      case 'update_recommendation_feedback':
        const { recommendationId, rating, comment } = body;
        if (!recommendationId || !rating) {
          return NextResponse.json(
            { success: false, error: 'Recommendation ID and rating are required' },
            { status: 400 }
          );
        }

        // Update recommendation feedback in database
        // This would be implemented based on your database structure
        
        return NextResponse.json({
          success: true,
          message: 'Feedback recorded successfully',
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Learning analytics POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}