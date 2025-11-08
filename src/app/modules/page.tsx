'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Baby, User, ChevronRight, Clock, Target, BarChart, Stethoscope, Heart, Brain, Activity, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: string;
  name: string;
  description: string;
  ageGroup: 'pediatric' | 'adult';
  isActive: boolean;
  _count: {
    topics: number;
  };
}

interface Topic {
  id: string;
  name: string;
  description: string | null;
  category: string;
  subcategory: string | null;
  _count: {
    questions: number;
  };
}

interface ModuleWithTopics extends Module {
  topics: Topic[];
}

const categoryIcons: Record<string, any> = {
  'ventilation': Activity,
  'electrolytes': BarChart,
  'sepsis': AlertCircle,
  'fluid_resuscitation': Activity,
  'cardiac': Heart,
  'trauma': Brain,
  'pediatric_advanced_life_support': Heart,
  'basic_life_support': Heart,
  'general': Stethoscope
};

const getCategoryIcon = (category: string) => {
  const Icon = categoryIcons[category] || Stethoscope;
  return Icon;
};

const formatCategoryName = (category: string): string => {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function ModuleSelectionPage() {
  const [modules, setModules] = useState<ModuleWithTopics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await fetch('/api/modules');
      if (!response.ok) {
        throw new Error('Failed to fetch modules');
      }
      const result = await response.json();
      if (result.success) {
        setModules(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch modules');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load modules');
    } finally {
      setLoading(false);
    }
  };

  const groupTopicsByCategory = (topics: Topic[]) => {
    const grouped = topics.reduce((acc, topic) => {
      if (!acc[topic.category]) {
        acc[topic.category] = [];
      }
      acc[topic.category].push(topic);
      return acc;
    }, {} as Record<string, Topic[]>);

    // Sort topics within each category
    Object.keys(grouped).forEach(category => {
      grouped[category].sort((a, b) => a.name.localeCompare(b.name));
    });

    return grouped;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Modules</h2>
          <p className="text-gray-600">Fetching available learning modules...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Modules</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchModules}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const pediatricModule = modules.find(m => m.ageGroup === 'pediatric');
  const adultModule = modules.find(m => m.ageGroup === 'adult');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ECCCO</h1>
                <p className="text-sm text-gray-600">Choose Your Learning Module</p>
              </div>
            </Link>
            <nav className="flex space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                Dashboard
              </Link>
              <Link href="/modules" className="text-blue-600 font-medium">
                Modules
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Select Your Learning Module</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose between pediatric and adult emergency medicine modules. Each module contains 
            specialized topics tailored to the specific patient population.
          </p>
        </div>

        {/* Module Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Pediatric Module */}
          {pediatricModule && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent hover:border-pink-200 transition-all duration-300">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                    <Baby className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{pediatricModule.name}</h3>
                    <p className="text-pink-100">Specialized pediatric care</p>
                  </div>
                </div>
                <p className="text-white text-opacity-90 mb-6">
                  {pediatricModule.description}
                </p>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-6">
                    <div>
                      <p className="text-sm text-pink-100">Topics</p>
                      <p className="text-xl font-bold">{pediatricModule._count.topics}</p>
                    </div>
                    <div>
                      <p className="text-sm text-pink-100">Age Group</p>
                      <p className="text-lg font-semibold">0-18 years</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedModule(selectedModule === pediatricModule.id ? null : pediatricModule.id)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2"
                  >
                    <span>{selectedModule === pediatricModule.id ? 'Hide Topics' : 'View Topics'}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedModule === pediatricModule.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Pediatric Topics */}
              {selectedModule === pediatricModule.id && (
                <div className="p-6">
                  <div className="space-y-6">
                    {Object.entries(groupTopicsByCategory(pediatricModule.topics)).map(([category, topics]) => {
                      const Icon = getCategoryIcon(category);
                      return (
                        <div key={category} className="border border-gray-200 rounded-xl p-4">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                              <Icon className="w-4 h-4 text-pink-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-lg">
                              {formatCategoryName(category)}
                            </h4>
                            <span className="text-sm text-gray-500">({topics.length} topics)</span>
                          </div>
                          <div className="grid gap-3">
                            {topics.map((topic) => (
                              <div key={topic.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors">
                                <div>
                                  <h5 className="font-semibold text-gray-900 text-sm">{topic.name}</h5>
                                  <p className="text-xs text-gray-600">{topic.description}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <span className="text-xs text-gray-500">
                                    {topic._count.questions} questions
                                  </span>
                                  <Link
                                    href={`/practice?moduleId=${pediatricModule.id}&topicId=${topic.id}`}
                                    className="bg-pink-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors"
                                  >
                                    Practice
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex space-x-4">
                      <Link
                        href={`/practice?moduleId=${pediatricModule.id}`}
                        className="flex-1 bg-pink-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-pink-700 transition-colors"
                      >
                        Start Pediatric Practice
                      </Link>
                      <Link
                        href={`/exam?moduleId=${pediatricModule.id}`}
                        className="flex-1 border-2 border-pink-600 text-pink-600 text-center py-3 rounded-xl font-semibold hover:bg-pink-50 transition-colors"
                      >
                        Take Pediatric Exam
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Adult Module */}
          {adultModule && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent hover:border-blue-200 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{adultModule.name}</h3>
                    <p className="text-blue-100">Comprehensive adult care</p>
                  </div>
                </div>
                <p className="text-white text-opacity-90 mb-6">
                  {adultModule.description}
                </p>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-6">
                    <div>
                      <p className="text-sm text-blue-100">Topics</p>
                      <p className="text-xl font-bold">{adultModule._count.topics}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-100">Age Group</p>
                      <p className="text-lg font-semibold">18+ years</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedModule(selectedModule === adultModule.id ? null : adultModule.id)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2"
                  >
                    <span>{selectedModule === adultModule.id ? 'Hide Topics' : 'View Topics'}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedModule === adultModule.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Adult Topics */}
              {selectedModule === adultModule.id && (
                <div className="p-6">
                  <div className="space-y-6">
                    {Object.entries(groupTopicsByCategory(adultModule.topics)).map(([category, topics]) => {
                      const Icon = getCategoryIcon(category);
                      return (
                        <div key={category} className="border border-gray-200 rounded-xl p-4">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Icon className="w-4 h-4 text-blue-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-lg">
                              {formatCategoryName(category)}
                            </h4>
                            <span className="text-sm text-gray-500">({topics.length} topics)</span>
                          </div>
                          <div className="grid gap-3">
                            {topics.map((topic) => (
                              <div key={topic.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                                <div>
                                  <h5 className="font-semibold text-gray-900 text-sm">{topic.name}</h5>
                                  <p className="text-xs text-gray-600">{topic.description}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <span className="text-xs text-gray-500">
                                    {topic._count.questions} questions
                                  </span>
                                  <Link
                                    href={`/practice?moduleId=${adultModule.id}&topicId=${topic.id}`}
                                    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                  >
                                    Practice
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex space-x-4">
                      <Link
                        href={`/practice?moduleId=${adultModule.id}`}
                        className="flex-1 bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Start Adult Practice
                      </Link>
                      <Link
                        href={`/exam?moduleId=${adultModule.id}`}
                        className="flex-1 border-2 border-blue-600 text-blue-600 text-center py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                      >
                        Take Adult Exam
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Platform Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {modules.reduce((sum, module) => sum + module._count.topics, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Topics</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Baby className="w-6 h-6 text-pink-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {pediatricModule?._count.topics || 0}
              </p>
              <p className="text-sm text-gray-600">Pediatric Topics</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {adultModule?._count.topics || 0}
              </p>
              <p className="text-sm text-gray-600">Adult Topics</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-600">Practice Questions</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Learning?</h3>
          <p className="text-xl mb-8 text-blue-100">
            Choose your module above and begin practicing with our comprehensive question bank.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link
              href="/dashboard"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              View Dashboard
            </Link>
            <Link
              href="/practice"
              className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              Quick Practice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}