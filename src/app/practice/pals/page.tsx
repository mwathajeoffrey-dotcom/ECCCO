/**
 * PALS Practice Resources Hub
 * Main page combining all PALS training tools and resources
 */

'use client';

import { useState } from 'react';
import { Calculator, Heart, Pill, BookOpen, Target, Users, Clock, Award } from 'lucide-react';
import Link from 'next/link';
import { PALSDosageCalculator } from '@/components/pals/PALSDosageCalculator';
import { PALSCPRSimulator } from '@/components/pals/PALSCPRSimulator';
import { PALSDrugReference } from '@/components/pals/PALSDrugReference';
import { PALSAlgorithms } from '@/components/pals/PALSAlgorithms';

type ActiveTool = 'overview' | 'calculator' | 'cpr' | 'drugs' | 'algorithms';

interface PracticeResource {
  id: ActiveTool;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
  available: boolean;
}

const resources: PracticeResource[] = [
  {
    id: 'calculator',
    title: 'Dosage Calculator',
    description: 'Weight-based medication calculations for pediatric emergencies',
    icon: <Calculator className="w-6 h-6" />,
    features: [
      'Weight-based drug calculations',
      'Maximum dose safety limits',
      'Route-specific dosing',
      'Real-time dose verification'
    ],
    color: 'bg-blue-500',
    available: true
  },
  {
    id: 'cpr',
    title: 'CPR Simulator',
    description: 'Interactive CPR training with real-time feedback',
    icon: <Heart className="w-6 h-6" />,
    features: [
      'Age-specific CPR scenarios',
      'Real-time rate feedback',
      'Compression-to-ventilation ratios',
      'Performance tracking'
    ],
    color: 'bg-red-500',
    available: true
  },
  {
    id: 'drugs',
    title: 'Drug Reference',
    description: 'Comprehensive pediatric emergency medication guide',
    icon: <Pill className="w-6 h-6" />,
    features: [
      'Complete drug database',
      'Dosing guidelines',
      'Contraindications & side effects',
      'Administration notes'
    ],
    color: 'bg-green-500',
    available: true
  },
  {
    id: 'algorithms',
    title: 'PALS Algorithms',
    description: 'Interactive flowcharts for pediatric emergencies',
    icon: <BookOpen className="w-6 h-6" />,
    features: [
      'Step-by-step algorithms',
      'Decision tree navigation',
      'Evidence-based protocols',
      'Quick reference cards'
    ],
    color: 'bg-purple-500',
    available: true // Now available!
  }
];

export default function PALSPracticeResources() {
  const [activeTool, setActiveTool] = useState<ActiveTool>('overview');

  const renderActiveComponent = () => {
    switch (activeTool) {
      case 'calculator':
        return <PALSDosageCalculator />;
      case 'cpr':
        return <PALSCPRSimulator />;
      case 'drugs':
        return <PALSDrugReference />;
      case 'algorithms':
        return <PALSAlgorithms />;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Target className="w-12 h-12 text-blue-600 mr-4" />
          <h1 className="text-4xl font-bold text-gray-900">PALS Practice Resources</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive training tools for Pediatric Advanced Life Support. Practice critical skills, 
          calculate dosages, and master emergency protocols with interactive simulations.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="text-center p-6 bg-blue-50 rounded-xl">
          <Calculator className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">15+</div>
          <div className="text-sm text-gray-600">Emergency Drugs</div>
        </div>
        <div className="text-center p-6 bg-red-50 rounded-xl">
          <Heart className="w-8 h-8 text-red-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">3</div>
          <div className="text-sm text-gray-600">CPR Scenarios</div>
        </div>
        <div className="text-center p-6 bg-green-50 rounded-xl">
          <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">All Ages</div>
          <div className="text-sm text-gray-600">Infant to Adolescent</div>
        </div>
        <div className="text-center p-6 bg-purple-50 rounded-xl">
          <Award className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">2025</div>
          <div className="text-sm text-gray-600">Current Guidelines</div>
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all duration-300 ${
              resource.available 
                ? 'hover:shadow-xl hover:scale-105 cursor-pointer border-gray-200' 
                : 'opacity-60 border-gray-100 cursor-not-allowed'
            }`}
            onClick={() => resource.available && setActiveTool(resource.id)}
          >
            <div className={`${resource.color} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {resource.icon}
                  <h3 className="text-xl font-bold ml-3">{resource.title}</h3>
                </div>
                {!resource.available && (
                  <span className="bg-white bg-opacity-20 text-xs px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="mt-3 text-white text-opacity-90">{resource.description}</p>
            </div>
            
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
              <ul className="space-y-2">
                {resource.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {resource.available && (
                <button
                  onClick={() => setActiveTool(resource.id)}
                  className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-medium transition-colors ${resource.color} hover:opacity-90`}
                >
                  Launch Tool
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="bg-gray-50 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Learning Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href="/exam?topic=pals" 
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all hover:scale-105 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-white bg-opacity-20 text-xs px-3 py-1 rounded-bl-lg font-medium">
              Auto-Start
            </div>
            <Target className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-white mb-2 text-lg">Start PALS Practice Exam</h3>
            <p className="text-sm text-blue-50 mb-3">
              Take comprehensive PALS practice exams with enhanced questions and detailed explanations.
            </p>
            <div className="flex items-center justify-between text-xs text-blue-100">
              <span>38 Questions Available</span>
              <span className="font-medium">→ Begin Now</span>
            </div>
          </Link>

          <Link 
            href="/dashboard" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Award className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Progress Tracking</h3>
            <p className="text-sm text-gray-600">
              Monitor your PALS performance and identify areas for improvement with detailed analytics.
            </p>
          </Link>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Clock className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Study Schedules</h3>
            <p className="text-sm text-gray-600">
              Personalized study plans and reminders to help you prepare for PALS certification.
            </p>
            <span className="text-xs text-gray-500 italic">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Guidelines Reference */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Current Guidelines
        </h3>
        <p className="text-blue-800 text-sm mb-3">
          All resources are based on the latest American Heart Association PALS guidelines (2020) 
          and American Academy of Pediatrics recommendations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <span className="font-medium">Drug Dosing:</span> AHA PALS 2020 Guidelines
          </div>
          <div>
            <span className="font-medium">CPR Ratios:</span> AHA BLS/PALS 2020 Update
          </div>
          <div>
            <span className="font-medium">Algorithms:</span> AHA PALS Provider Manual 2020
          </div>
          <div>
            <span className="font-medium">Equipment:</span> AAP/AHA Pediatric Recommendations
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ECCCO</span>
            </Link>

            {/* Tool Navigation - Only show when not in overview */}
            {activeTool !== 'overview' && (
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => setActiveTool('overview')}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Overview
                </button>
                {resources.filter(r => r.available).map((resource) => (
                  <button
                    key={resource.id}
                    onClick={() => setActiveTool(resource.id)}
                    className={`font-medium transition-colors ${
                      activeTool === resource.id
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {resource.title}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {renderActiveComponent()}
      </main>
    </div>
  );
}