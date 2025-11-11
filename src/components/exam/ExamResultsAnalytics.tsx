import React from 'react';
import { CheckCircle, Download, BarChart3, Clock, Target, TrendingUp, Trophy, AlertTriangle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface ExamResultsAnalyticsProps {
  score: number;
  correct: number;
  total: number;
  timeSpent: number;
  totalTime: number;
  topicName: string;
  questions: any[];
  userAnswers: { [key: number]: number };
  onDownloadPDF: () => void;
}

export function ExamResultsAnalytics({
  score,
  correct,
  total,
  timeSpent,
  totalTime,
  topicName,
  questions,
  userAnswers,
  onDownloadPDF
}: ExamResultsAnalyticsProps) {
  const { data: session } = useSession();
  
  const incorrect = total - correct;
  const averageTimePerQuestion = Math.round(timeSpent / total);
  const timeEfficiency = Math.round((timeSpent / totalTime) * 100);
  
  // Calculate difficulty breakdown
  const difficultyStats = questions.reduce((acc, question, index) => {
    const difficulty = question.difficulty || 'medium';
    const isCorrect = userAnswers[index] === question.correctIndex;
    
    if (!acc[difficulty]) {
      acc[difficulty] = { total: 0, correct: 0 };
    }
    acc[difficulty].total++;
    if (isCorrect) acc[difficulty].correct++;
    
    return acc;
  }, {} as Record<string, { total: number; correct: number }>);

  // Performance rating
  const getPerformanceRating = () => {
    if (score >= 90) return { rating: 'Excellent', color: 'text-green-600', icon: Trophy };
    if (score >= 80) return { rating: 'Very Good', color: 'text-blue-600', icon: TrendingUp };
    if (score >= 70) return { rating: 'Good', color: 'text-yellow-600', icon: Target };
    return { rating: 'Needs Improvement', color: 'text-red-600', icon: AlertTriangle };
  };

  const performance = getPerformanceRating();
  const PerformanceIcon = performance.icon;

  // Time analysis
  const getTimeAnalysis = () => {
    if (timeEfficiency < 50) return { status: 'Very Fast', color: 'text-blue-600', tip: 'Consider taking more time to review answers' };
    if (timeEfficiency < 70) return { status: 'Efficient', color: 'text-green-600', tip: 'Good time management' };
    if (timeEfficiency < 90) return { status: 'Thorough', color: 'text-yellow-600', tip: 'Good attention to detail' };
    return { status: 'Used All Time', color: 'text-red-600', tip: 'Consider practicing to improve speed' };
  };

  const timeAnalysis = getTimeAnalysis();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <PerformanceIcon className={`w-16 h-16 mx-auto mb-4 ${performance.color}`} />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Complete!</h1>
            <p className="text-gray-600">Results for {topicName}</p>
            <div className={`inline-flex items-center px-4 py-2 rounded-full mt-4 ${
              score >= 80 ? 'bg-green-100 text-green-800' : 
              score >= 70 ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }`}>
              <span className="font-semibold">{performance.rating}</span>
            </div>
          </div>

          {/* Core Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-4xl font-bold text-blue-600">{score}%</div>
              <div className="text-blue-700 font-medium">Overall Score</div>
              <div className="text-sm text-blue-600 mt-1">
                {score >= 80 ? '🎉 Excellent!' : score >= 70 ? '👍 Good Job!' : '💪 Keep Studying!'}
              </div>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
              <div className="text-4xl font-bold text-green-600">{correct}</div>
              <div className="text-green-700 font-medium">Correct</div>
              <div className="text-sm text-green-600 mt-1">
                out of {total} questions
              </div>
            </div>
            
            <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
              <div className="text-4xl font-bold text-red-600">{incorrect}</div>
              <div className="text-red-700 font-medium">Incorrect</div>
              <div className="text-sm text-red-600 mt-1">
                {Math.round((incorrect / total) * 100)}% of total
              </div>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-4xl font-bold text-purple-600">{Math.floor(timeSpent / 60)}m</div>
              <div className="text-purple-700 font-medium">Time Spent</div>
              <div className="text-sm text-purple-600 mt-1">
                {averageTimePerQuestion}s per question
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
              Performance Breakdown
            </h3>
            
            <div className="space-y-4">
              {Object.entries(difficultyStats).map(([difficulty, stats]: [string, any]) => {
                const percentage = Math.round((stats.correct / stats.total) * 100);
                return (
                  <div key={difficulty} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {difficulty} Questions
                      </span>
                      <span className="text-sm text-gray-600">
                        {stats.correct}/{stats.total} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          percentage >= 80 ? 'bg-green-500' :
                          percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Analysis */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-purple-600" />
              Time Analysis
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Time Usage</div>
                  <div className="text-sm text-gray-600">{timeAnalysis.tip}</div>
                </div>
                <div className={`text-lg font-bold ${timeAnalysis.color}`}>
                  {timeEfficiency}%
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-blue-700">Total Time</div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {averageTimePerQuestion}s
                  </div>
                  <div className="text-sm text-green-700">Avg per Q</div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${timeEfficiency}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Study Recommendations */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-6 h-6 mr-2 text-orange-600" />
            Study Recommendations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Areas for Improvement */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Areas for Improvement</h4>
              {Object.entries(difficultyStats)
                .filter(([_, stats]: [string, any]) => (stats.correct / stats.total) < 0.7)
                .map(([difficulty, stats]: [string, any]) => (
                  <div key={difficulty} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="font-medium text-red-800 capitalize">{difficulty} Questions</div>
                    <div className="text-sm text-red-700">
                      {Math.round((stats.correct / stats.total) * 100)}% accuracy - Consider reviewing this difficulty level
                    </div>
                  </div>
                ))
              }
              
              {Object.entries(difficultyStats).every(([_, stats]: [string, any]) => (stats.correct / stats.total) >= 0.7) && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium text-green-800">Great Performance!</div>
                  <div className="text-sm text-green-700">
                    You scored well across all difficulty levels. Keep up the excellent work!
                  </div>
                </div>
              )}
            </div>

            {/* Next Steps */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Next Steps</h4>
              <div className="space-y-2">
                {score < 70 && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="font-medium text-blue-800">📚 Review Missed Questions</div>
                    <div className="text-sm text-blue-700">
                      Focus on understanding the explanations for incorrect answers
                    </div>
                  </div>
                )}
                
                {timeEfficiency > 90 && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="font-medium text-yellow-800">⏱️ Practice Time Management</div>
                    <div className="text-sm text-yellow-700">
                      Consider timed practice sessions to improve speed
                    </div>
                  </div>
                )}
                
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium text-green-800">🎯 Take Another Exam</div>
                  <div className="text-sm text-green-700">
                    Practice with different topics to broaden your knowledge
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
                {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onDownloadPDF}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center shadow-md"
          >
            <Download className="w-5 h-5 mr-2" />
            <span>Download Detailed Report</span>
          </button>
          
          <Link
            href="/exam"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center shadow-md"
          >
            Take Another Exam
          </Link>

          {session?.user && (
            <Link
              href="/dashboard"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors inline-flex items-center shadow-md"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              View Dashboard
            </Link>
          )}
          
          <Link
            href="/"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center shadow-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}