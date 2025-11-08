/**
 * PALS-Specific Analytics Components
 * Specialized analytics for PALS exam performance with medical-specific insights
 */

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  Stethoscope, 
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  BookOpen,
  Award
} from 'lucide-react';

export interface PALSAnalytics {
  algorithmMastery: {
    bls: { accuracy: number; confidence: 'low' | 'medium' | 'high' };
    pals: { accuracy: number; confidence: 'low' | 'medium' | 'high' };
    cpr: { accuracy: number; confidence: 'low' | 'medium' | 'high' };
    arrhythmia: { accuracy: number; confidence: 'low' | 'medium' | 'high' };
  };
  dosageAccuracy: {
    weightBased: number;
    ageAppropriate: number;
    maxDoseChecking: number;
    unitConversion: number;
  };
  scenarioPerformance: {
    cardiacArrest: number;
    bradycardia: number;
    tachycardia: number;
    respiratoryDistress: number;
    shock: number;
  };
  clinicalDecisionMaking: {
    assessmentSpeed: 'excellent' | 'good' | 'needs-improvement' | 'poor';
    prioritization: number;
    protocolAdherence: number;
    teamCommunication: number;
  };
  practiceToolUsage: {
    dosageCalculator: { sessions: number; accuracy: number; lastUsed: string };
    cprSimulator: { sessions: number; technique: number; lastUsed: string };
    drugReference: { sessions: number; retention: number; lastUsed: string };
  };
  certificationReadiness: {
    overall: number;
    writtenExam: number;
    practicalSkills: number;
    recommendations: string[];
  };
}

export const PALSSpecificAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<PALSAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading PALS-specific analytics
    const timer = setTimeout(() => {
      setAnalytics(generateMockPALSAnalytics());
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        <span className="ml-3 text-lg">Analyzing PALS performance...</span>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-6 text-center">
        <Stethoscope className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600">No PALS analytics available yet. Complete some exams to see insights.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <Heart className="h-8 w-8 text-red-600" />
          PALS Performance Analytics
        </h2>
        <p className="text-gray-600">Specialized insights for Pediatric Advanced Life Support mastery</p>
      </div>

      {/* Certification Readiness Overview */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg shadow p-6 border border-red-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="h-6 w-6 text-red-600" />
          Certification Readiness
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <ReadinessCard 
            title="Overall Readiness"
            percentage={analytics.certificationReadiness.overall}
            subtitle="Comprehensive assessment"
          />
          <ReadinessCard 
            title="Written Exam"
            percentage={analytics.certificationReadiness.writtenExam}
            subtitle="Knowledge assessment"
          />
          <ReadinessCard 
            title="Practical Skills"
            percentage={analytics.certificationReadiness.practicalSkills}
            subtitle="Hands-on competency"
          />
        </div>

        <div className="bg-white rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Key Recommendations</h4>
          <ul className="space-y-2">
            {analytics.certificationReadiness.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Algorithm Mastery */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="h-6 w-6 text-blue-600" />
          Algorithm Mastery
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(analytics.algorithmMastery).map(([algorithm, data]) => (
            <AlgorithmCard 
              key={algorithm}
              name={algorithm.toUpperCase()}
              accuracy={data.accuracy}
              confidence={data.confidence}
            />
          ))}
        </div>
      </div>

      {/* Dosage Calculation Performance */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Dosage Calculation Accuracy</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DosageMetric 
            label="Weight-Based Dosing"
            percentage={analytics.dosageAccuracy.weightBased}
            critical={true}
          />
          <DosageMetric 
            label="Age-Appropriate Dosing"
            percentage={analytics.dosageAccuracy.ageAppropriate}
            critical={false}
          />
          <DosageMetric 
            label="Max Dose Checking"
            percentage={analytics.dosageAccuracy.maxDoseChecking}
            critical={true}
          />
          <DosageMetric 
            label="Unit Conversion"
            percentage={analytics.dosageAccuracy.unitConversion}
            critical={false}
          />
        </div>
      </div>

      {/* Scenario Performance */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Clinical Scenario Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(analytics.scenarioPerformance).map(([scenario, accuracy]) => (
            <ScenarioCard 
              key={scenario}
              scenario={scenario}
              accuracy={accuracy}
            />
          ))}
        </div>
      </div>

      {/* Clinical Decision Making */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Clinical Decision Making</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <DecisionMetric 
              label="Assessment Speed"
              value={analytics.clinicalDecisionMaking.assessmentSpeed}
              type="qualitative"
            />
            <DecisionMetric 
              label="Protocol Adherence"
              value={analytics.clinicalDecisionMaking.protocolAdherence}
              type="percentage"
            />
          </div>
          <div className="space-y-4">
            <DecisionMetric 
              label="Prioritization"
              value={analytics.clinicalDecisionMaking.prioritization}
              type="percentage"
            />
            <DecisionMetric 
              label="Team Communication"
              value={analytics.clinicalDecisionMaking.teamCommunication}
              type="percentage"
            />
          </div>
        </div>
      </div>

      {/* Practice Tool Usage */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Practice Tool Utilization</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ToolUsageCard 
            tool="Dosage Calculator"
            icon={BookOpen}
            sessions={analytics.practiceToolUsage.dosageCalculator.sessions}
            performance={analytics.practiceToolUsage.dosageCalculator.accuracy}
            lastUsed={analytics.practiceToolUsage.dosageCalculator.lastUsed}
          />
          <ToolUsageCard 
            tool="CPR Simulator"
            icon={Heart}
            sessions={analytics.practiceToolUsage.cprSimulator.sessions}
            performance={analytics.practiceToolUsage.cprSimulator.technique}
            lastUsed={analytics.practiceToolUsage.cprSimulator.lastUsed}
          />
          <ToolUsageCard 
            tool="Drug Reference"
            icon={Stethoscope}
            sessions={analytics.practiceToolUsage.drugReference.sessions}
            performance={analytics.practiceToolUsage.drugReference.retention}
            lastUsed={analytics.practiceToolUsage.drugReference.lastUsed}
          />
        </div>
      </div>
    </div>
  );
};

// Supporting Components

const ReadinessCard: React.FC<{ title: string; percentage: number; subtitle: string }> = ({ 
  title, 
  percentage, 
  subtitle 
}) => {
  const getColor = (pct: number) => {
    if (pct >= 85) return 'text-green-600 bg-green-100';
    if (pct >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg p-4 text-center">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getColor(percentage).split(' ')[1]} mb-3`}>
        <span className={`text-2xl font-bold ${getColor(percentage).split(' ')[0]}`}>
          {percentage}%
        </span>
      </div>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
};

const AlgorithmCard: React.FC<{ name: string; accuracy: number; confidence: 'low' | 'medium' | 'high' }> = ({ 
  name, 
  accuracy, 
  confidence 
}) => {
  const confidenceColors = {
    low: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-green-100 text-green-800'
  };

  return (
    <div className="border rounded-lg p-4 text-center">
      <h4 className="font-semibold text-gray-900 mb-2">{name}</h4>
      <div className="text-2xl font-bold mb-2">{accuracy}%</div>
      <span className={`px-2 py-1 rounded text-xs font-medium ${confidenceColors[confidence]}`}>
        {confidence} confidence
      </span>
    </div>
  );
};

const DosageMetric: React.FC<{ label: string; percentage: number; critical: boolean }> = ({ 
  label, 
  percentage, 
  critical 
}) => {
  const isGood = percentage >= 90;
  const bgColor = critical && !isGood ? 'bg-red-50 border-red-200' : 
                  isGood ? 'bg-green-50 border-green-200' : 
                  'bg-yellow-50 border-yellow-200';

  return (
    <div className={`border rounded-lg p-4 ${bgColor}`}>
      <h4 className="font-medium text-gray-900 mb-2">{label}</h4>
      <div className="text-2xl font-bold mb-1">{percentage}%</div>
      {critical && (
        <span className="text-xs text-red-600 font-medium">Safety Critical</span>
      )}
    </div>
  );
};

const ScenarioCard: React.FC<{ scenario: string; accuracy: number }> = ({ scenario, accuracy }) => {
  const formatScenarioName = (name: string) => {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const getPerformanceLevel = (acc: number) => {
    if (acc >= 85) return { level: 'Excellent', color: 'text-green-600' };
    if (acc >= 75) return { level: 'Good', color: 'text-blue-600' };
    if (acc >= 65) return { level: 'Fair', color: 'text-yellow-600' };
    return { level: 'Needs Improvement', color: 'text-red-600' };
  };

  const performance = getPerformanceLevel(accuracy);

  return (
    <div className="border rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-2">{formatScenarioName(scenario)}</h4>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">{accuracy}%</span>
        <span className={`text-sm font-medium ${performance.color}`}>
          {performance.level}
        </span>
      </div>
    </div>
  );
};

const DecisionMetric: React.FC<{ 
  label: string; 
  value: number | string; 
  type: 'percentage' | 'qualitative' 
}> = ({ label, value, type }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
      <span className="font-medium text-gray-900">{label}</span>
      <span className="text-lg font-bold">
        {type === 'percentage' ? `${value}%` : value}
      </span>
    </div>
  );
};

const ToolUsageCard: React.FC<{
  tool: string;
  icon: React.ComponentType<any>;
  sessions: number;
  performance: number;
  lastUsed: string;
}> = ({ tool, icon: Icon, sessions, performance, lastUsed }) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="h-6 w-6 text-blue-600" />
        <h4 className="font-medium text-gray-900">{tool}</h4>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Sessions:</span>
          <span className="font-medium">{sessions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Performance:</span>
          <span className="font-medium">{performance}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Last Used:</span>
          <span className="font-medium">{lastUsed}</span>
        </div>
      </div>
    </div>
  );
};

// Mock data generator
const generateMockPALSAnalytics = (): PALSAnalytics => {
  return {
    algorithmMastery: {
      bls: { accuracy: 88, confidence: 'high' },
      pals: { accuracy: 76, confidence: 'medium' },
      cpr: { accuracy: 92, confidence: 'high' },
      arrhythmia: { accuracy: 68, confidence: 'medium' }
    },
    dosageAccuracy: {
      weightBased: 94,
      ageAppropriate: 89,
      maxDoseChecking: 96,
      unitConversion: 87
    },
    scenarioPerformance: {
      cardiacArrest: 84,
      bradycardia: 78,
      tachycardia: 71,
      respiratoryDistress: 86,
      shock: 79
    },
    clinicalDecisionMaking: {
      assessmentSpeed: 'good',
      prioritization: 82,
      protocolAdherence: 91,
      teamCommunication: 77
    },
    practiceToolUsage: {
      dosageCalculator: { sessions: 15, accuracy: 94, lastUsed: '2 days ago' },
      cprSimulator: { sessions: 8, technique: 89, lastUsed: '1 week ago' },
      drugReference: { sessions: 23, retention: 87, lastUsed: 'Yesterday' }
    },
    certificationReadiness: {
      overall: 82,
      writtenExam: 85,
      practicalSkills: 79,
      recommendations: [
        'Focus on tachycardia management protocols',
        'Practice team communication scenarios',
        'Review arrhythmia recognition patterns',
        'Complete 5 more CPR simulation sessions',
        'Study shock management algorithms'
      ]
    }
  };
};

export default PALSSpecificAnalytics;