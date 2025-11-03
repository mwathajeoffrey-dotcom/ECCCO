'use client';

import { useState, useEffect, useCallback } from 'react';
import { Shield, AlertTriangle, CheckCircle, Calendar, BookOpen, Download, RefreshCw } from 'lucide-react';
import { isDeveloper } from '@/lib/auth/developer';
import Link from 'next/link';

interface GuidelineReport {
  totalQuestions: number;
  questionsWithOutdatedRefs: number;
  criticalUpdatesNeeded: number;
  moderateUpdatesNeeded: number;
  minorUpdatesNeeded: number;
  topicBreakdown: Record<string, number>;
  recommendations: string[];
  lastChecked: Date;
}

interface OutdatedQuestion {
  id: string;
  topicId: string;
  question: string;
  currentReference: string;
  suggestedUpdate: string;
  severity: 'critical' | 'moderate' | 'minor';
  ageInYears: number;
}

export default function GuidelineManagementPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<GuidelineReport | null>(null);
  const [outdatedQuestions, setOutdatedQuestions] = useState<OutdatedQuestion[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | 'critical' | 'moderate' | 'minor'>('all');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const loadGuidelineData = useCallback(async () => {
    try {
      // Mock data - in real implementation, this would call your guideline monitoring API
      const mockReport: GuidelineReport = {
        totalQuestions: 2850,
        questionsWithOutdatedRefs: 247,
        criticalUpdatesNeeded: 23,
        moderateUpdatesNeeded: 89,
        minorUpdatesNeeded: 135,
        topicBreakdown: {
          'cardiac-emergencies': 45,
          'respiratory-emergencies': 38,
          'mechanical-ventilation': 32,
          'trauma-management': 28,
          'sepsis-management': 24,
          'neurological-emergencies': 22,
          'toxicology': 18,
          'procedures': 15,
          'pharmacology-emergencies': 12,
          'renal-emergencies': 8
        },
        recommendations: [
          '🚨 URGENT: 23 questions have critically outdated references (>5+ years old)',
          '⚠️ MODERATE: 89 questions need updates for recent guideline changes',
          '📋 MINOR: 135 questions could benefit from newer references',
          '🎯 Focus on "cardiac-emergencies" topic: 45 questions need updates',
          '🎯 Focus on "respiratory-emergencies" topic: 38 questions need updates'
        ],
        lastChecked: new Date()
      };

      const mockOutdatedQuestions: OutdatedQuestion[] = [
        {
          id: 'card-001',
          topicId: 'cardiac-emergencies',
          question: 'According to heart failure guidelines, what is the first-line treatment?',
          currentReference: 'Yancy CW, et al. 2022 AHA/ACC/HFSA Guideline for Heart Failure',
          suggestedUpdate: 'AHA/ACC Heart Failure Guidelines 2024',
          severity: 'critical',
          ageInYears: 12
        },
        {
          id: 'resp-015',
          topicId: 'respiratory-emergencies',
          question: 'What is the recommended PEEP strategy for ARDS?',
          currentReference: 'Petrucci N, De Feo C. Cochrane Database Syst Rev 2013',
          suggestedUpdate: 'ARDSNet Guidelines 2024',
          severity: 'moderate',
          ageInYears: 12
        }
      ];

      setReport(mockReport);
      setOutdatedQuestions(mockOutdatedQuestions);
    } catch (error) {
      console.error('Error loading guideline data:', error);
    }
  }, []);

  const checkAuthentication = useCallback(async () => {
    try {
      const isDevAuth = await isDeveloper();
      setIsAuthenticated(isDevAuth);
      if (isDevAuth) {
        await loadGuidelineData();
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, [loadGuidelineData]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const handleAuthentication = async () => {
    setAuthError('');
    try {
      const devCodes = ['Gm@12345'];
      
      if (devCodes.includes(authPassword)) {
        setIsAuthenticated(true);
        await loadGuidelineData();
      } else {
        setAuthError('Invalid access code');
      }
    } catch {
      setAuthError('Authentication failed');
    }
  };

  const refreshGuidelines = async () => {
    setLoading(true);
    await loadGuidelineData();
    setLoading(false);
  };

  const exportReport = () => {
    if (!report) return;
    
    const reportData = {
      generatedAt: new Date().toISOString(),
      summary: report,
      outdatedQuestions: filteredQuestions
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eccco-guideline-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'minor': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'moderate': return <Calendar className="w-4 h-4" />;
      case 'minor': return <BookOpen className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const filteredQuestions = outdatedQuestions.filter(q => 
    selectedSeverity === 'all' || q.severity === selectedSeverity
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading guideline management...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Guideline Management</h2>
            <p className="text-gray-600 mt-2">Developer access required for guideline administration</p>
          </div>
          
          {authError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {authError}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Code
              </label>
              <input
                type="password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAuthentication()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter developer access code"
              />
            </div>
            
            <button
              onClick={handleAuthentication}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Access Guidelines
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <Link href="/analytics" className="text-blue-600 hover:text-blue-700 text-sm mr-4">
              ← Analytics Dashboard
            </Link>
            <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm">
              Home
            </Link>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
              <strong>Dev Mode:</strong> Access code: Gm@12345
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Guideline Management</h1>
              <p className="text-gray-600">Monitor and update medical guideline currency across ECCCO platform</p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={refreshGuidelines}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              
              <button
                onClick={exportReport}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        {report && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Questions</p>
                    <p className="text-2xl font-bold text-gray-900">{report.totalQuestions.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Critical Updates</p>
                    <p className="text-2xl font-bold text-red-600">{report.criticalUpdatesNeeded}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Moderate Updates</p>
                    <p className="text-2xl font-bold text-yellow-600">{report.moderateUpdatesNeeded}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Minor Updates</p>
                    <p className="text-2xl font-bold text-blue-600">{report.minorUpdatesNeeded}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recommendations</h2>
              <div className="space-y-3">
                {report.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg mr-3">{rec.charAt(0)}</div>
                    <p className="text-gray-700">{rec.substring(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Outdated Questions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Outdated Questions</h2>
                <div className="flex space-x-2">
                  {['all', 'critical', 'moderate', 'minor'].map(severity => (
                    <button
                      key={severity}
                      onClick={() => setSelectedSeverity(severity as 'all' | 'critical' | 'moderate' | 'minor')}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedSeverity === severity
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {severity.charAt(0).toUpperCase() + severity.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Question
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Topic
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Severity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Reference
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Suggested Update
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredQuestions.map((question, index) => (
                      <tr key={question.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {question.question}
                          </div>
                          <div className="text-xs text-gray-500">ID: {question.id}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {question.topicId.replace(/-/g, ' ')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(question.severity)}`}>
                            {getSeverityIcon(question.severity)}
                            <span className="ml-1">{question.severity}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                          <div className="truncate">{question.currentReference}</div>
                          <div className="text-xs text-gray-400">Age: {question.ageInYears} years</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-600 max-w-xs truncate">
                          {question.suggestedUpdate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}