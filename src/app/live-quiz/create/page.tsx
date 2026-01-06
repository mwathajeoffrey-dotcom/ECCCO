'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ArrowLeft,
  Clock,
  Users,
  BookOpen,
  CheckCircle,
  Circle,
  Play,
  Shuffle,
  Filter
} from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  description?: string;
  moduleId?: string;
  module?: {
    name: string;
    ageGroup?: string;
  };
  _count?: {
    questions: number;
  };
}

interface Question {
  id: string;
  question: string;
  options: string;
  correctIndex: number;
  difficulty: string;
  topicId: string;
  topic?: {
    name: string;
    module: {
      name: string;
    };
  };
}

export default function CreateLiveQuizPage() {
  const router = useRouter();
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [questionTimeLimit, setQuestionTimeLimit] = useState(30);
  const [maxParticipants, setMaxParticipants] = useState(100);
  
  // Data state
  const [topics, setTopics] = useState<Topic[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [randomCount, setRandomCount] = useState<number>(10);
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  // NOTE: Authentication removed for simplified development and testing
  // Will be added back after core functionality is complete

  useEffect(() => {
    // Fetch topics on mount - no auth required
    fetchTopics();
  }, []);

  useEffect(() => {
    if (selectedTopicId) {
      fetchQuestions(selectedTopicId);
    } else {
      setQuestions([]);
      setSelectedQuestions([]);
    }
  }, [selectedTopicId]);

  const fetchTopics = async () => {
    try {
      const response = await fetch('/api/topics');
      if (response.ok) {
        const data = await response.json();
        setTopics(data);
      }
    } catch (error) {
      console.error('Failed to fetch topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async (topicId: string) => {
    try {
      const response = await fetch(`/api/questions?topicId=${topicId}`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  };

  const handleQuestionToggle = (questionId: string) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSelectAll = () => {
    const filteredQuestions = getFilteredQuestions();
    if (selectedQuestions.length === filteredQuestions.length && filteredQuestions.length > 0) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(filteredQuestions.map(q => q.id));
    }
  };

  const handleSelectRandom = () => {
    const filteredQuestions = getFilteredQuestions();
    const count = Math.min(randomCount, filteredQuestions.length);
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, count).map(q => q.id));
  };

  const handleQuickStart = (count: number) => {
    // Auto-generate title if empty
    if (!title.trim()) {
      const selectedTopic = topics.find(t => t.id === selectedTopicId);
      const topicName = selectedTopic?.name || 'ECCCO';
      setTitle(`${topicName} Quiz - ${new Date().toLocaleDateString()}`);
    }

    // Auto-generate description if empty
    if (!description.trim()) {
      setDescription(`Quick quiz with ${count} randomly selected questions`);
    }

    // Select random questions
    const filteredQuestions = getFilteredQuestions();
    const actualCount = Math.min(count, filteredQuestions.length);
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, actualCount).map(q => q.id));
  };

  const getFilteredQuestions = () => {
    if (difficultyFilter === 'all') {
      return questions;
    }
    return questions.filter(q => q.difficulty.toLowerCase() === difficultyFilter.toLowerCase());
  };

  const handleCreateQuiz = async () => {
    if (!title.trim() || selectedQuestions.length === 0) {
      alert('Please enter a quiz title and select at least one question');
      return;
    }

    console.log('Creating quiz with:', {
      title,
      description,
      selectedTopicId,
      selectedQuestions: selectedQuestions.length,
      questionTimeLimit,
      maxParticipants
    });

    setCreating(true);
    try {
      const response = await fetch('/api/live-quiz/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          // send topicId only when chosen, server will resolve fallback when null/undefined
          topicId: selectedTopicId || undefined,
          questionIds: selectedQuestions,
          questionTimeLimit,
          maxParticipants,
        }),
      });

      console.log('Create quiz response:', response.status);

      if (response.ok) {
        const session = await response.json();
        // Success: navigate to host page
        router.push(`/live-quiz/host/${session.id}`);
        return;
      }

      // Non-OK response
      const error = await response.json().catch(() => ({}));
      console.error('Failed to create quiz session:', error);
      alert(`Failed to create quiz: ${error.error || 'Unknown error'}`);
      // keep UI consistent; allow user to retry
      setCreating(false);
      return;
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('An error occurred while creating the quiz. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const parseOptions = (optionsString: string): string[] => {
    try {
      return JSON.parse(optionsString);
    } catch {
      return [];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Create Live Quiz</h1>
            <p className="text-gray-600">Set up a new interactive quiz session</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Start Banner - Kahoot Style */}
          {selectedTopicId && questions.length > 0 && (
            <div className="lg:col-span-3 mb-4">
              <Card className="bg-gradient-to-r from-green-500 to-teal-500 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                        <Shuffle className="w-5 h-5" />
                        Quick Start (Kahoot Style)
                      </h3>
                      <p className="text-green-50 text-sm">
                        One-click quiz creation! Auto-fill title, description, and select random questions.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleQuickStart(10)}
                        className="bg-white text-green-700 hover:bg-green-50 font-semibold"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Quick Start (10Q)
                      </Button>
                      <Button
                        onClick={() => handleQuickStart(20)}
                        className="bg-white text-teal-700 hover:bg-teal-50 font-semibold"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Quick Start (20Q)
                      </Button>
                      <Button
                        onClick={() => handleQuickStart(30)}
                        className="bg-white text-blue-700 hover:bg-blue-50 font-semibold"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Quick Start (30Q)
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Quiz Settings */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Quiz Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Quiz Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Pediatric Cardiology Quiz"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the quiz content..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                {/* Platform Content Summary */}
                {topics.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">ECCCO Platform Content</span>
                    </div>
                    <div className="text-xs text-blue-600">
                      {topics.filter(t => (t._count?.questions || 0) > 0).length} topics • {topics.reduce((sum, t) => sum + (t._count?.questions || 0), 0)} questions available
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="topic">Topic (Optional)</Label>
                  <Select value={selectedTopicId} onValueChange={setSelectedTopicId}>
                    <SelectTrigger className="mt-1" id="topic">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] overflow-y-auto">
                      <SelectItem value="">
                        <div className="flex justify-between items-center w-full">
                          <span className="font-medium text-purple-700">Browse All Questions</span>
                          <div className="ml-2 text-xs text-purple-600">
                            {topics.reduce((sum, t) => sum + (t._count?.questions || 0), 0)} questions • All Topics
                          </div>
                        </div>
                      </SelectItem>
                      {topics
                        .filter(topic => (topic._count?.questions || 0) > 0) // Only show topics with questions
                        .map((topic) => (
                        <SelectItem key={topic.id} value={topic.id}>
                          <div className="flex justify-between items-center w-full">
                            <span>{topic.name}</span>
                            <div className="ml-2 text-xs text-gray-500">
                              {topic._count?.questions || 0} questions • {topic.module?.name || 'N/A'}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timeLimit" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time per Question (seconds)
                  </Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    min="10"
                    max="300"
                    value={questionTimeLimit}
                    onChange={(e) => setQuestionTimeLimit(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="maxParticipants" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Max Participants
                  </Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    min="1"
                    max="500"
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Selection */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Select Questions ({selectedQuestions.length} selected)
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {!selectedTopicId && (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>Select a topic to see available questions</p>
                  </div>
                )}

                {selectedTopicId && questions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No questions found for this topic</p>
                  </div>
                )}

                {questions.length > 0 && (
                  <div className="space-y-4">
                    {/* Quick Selection Tools - Kahoot Style */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4">
                      <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                        <Shuffle className="w-4 h-4" />
                        Quick Select (Kahoot Style)
                      </h3>
                      
                      <div className="grid md:grid-cols-3 gap-3 mb-3">
                        {/* Preset Random Buttons */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const filteredQuestions = getFilteredQuestions();
                            const count = Math.min(10, filteredQuestions.length);
                            const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
                            setSelectedQuestions(shuffled.slice(0, count).map(q => q.id));
                          }}
                          className="bg-white hover:bg-purple-100 border-purple-300"
                        >
                          <Shuffle className="w-3 h-3 mr-2" />
                          10 Random
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const filteredQuestions = getFilteredQuestions();
                            const count = Math.min(20, filteredQuestions.length);
                            const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
                            setSelectedQuestions(shuffled.slice(0, count).map(q => q.id));
                          }}
                          className="bg-white hover:bg-purple-100 border-purple-300"
                        >
                          <Shuffle className="w-3 h-3 mr-2" />
                          20 Random
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const filteredQuestions = getFilteredQuestions();
                            const count = Math.min(30, filteredQuestions.length);
                            const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
                            setSelectedQuestions(shuffled.slice(0, count).map(q => q.id));
                          }}
                          className="bg-white hover:bg-purple-100 border-purple-300"
                        >
                          <Shuffle className="w-3 h-3 mr-2" />
                          30 Random
                        </Button>
                      </div>

                      {/* Custom Random Selection */}
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <Label htmlFor="randomCount" className="text-sm text-purple-800">
                            Custom Random Count
                          </Label>
                          <Input
                            id="randomCount"
                            type="number"
                            min="1"
                            max={getFilteredQuestions().length}
                            value={randomCount}
                            onChange={(e) => setRandomCount(Number(e.target.value))}
                            className="mt-1"
                            placeholder="e.g., 15"
                          />
                        </div>
                        <Button
                          onClick={handleSelectRandom}
                          variant="default"
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Shuffle className="w-4 h-4 mr-2" />
                          Select {randomCount} Random
                        </Button>
                      </div>
                    </div>

                    {/* Filters and Manual Selection */}
                    <div className="flex gap-3 flex-wrap items-center bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-600" />
                        <Label htmlFor="difficulty-filter" className="text-sm font-medium">
                          Filter by Difficulty:
                        </Label>
                      </div>
                      <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                        <SelectTrigger className="w-40" id="difficulty-filter">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Difficulties</SelectItem>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <div className="flex-1"></div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSelectAll}
                      >
                        {selectedQuestions.length === getFilteredQuestions().length && getFilteredQuestions().length > 0
                          ? 'Deselect All'
                          : 'Select All'}
                      </Button>
                      
                      <Badge variant="secondary" className="px-3 py-1">
                        {getFilteredQuestions().length} available
                      </Badge>
                    </div>

                    {/* Question List */}
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {getFilteredQuestions().map((question, index) => {
                      const options = parseOptions(question.options);
                      const isSelected = selectedQuestions.includes(question.id);
                      
                      return (
                        <div key={question.id} className="border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={isSelected}
                              onClick={() => handleQuestionToggle(question.id)}
                              className="mt-1 cursor-pointer"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-gray-500">
                                  Question {index + 1}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {question.difficulty}
                                </Badge>
                                {question.topic && (
                                  <Badge variant="secondary" className="text-xs">
                                    {question.topic.name}
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-gray-800 mb-3 font-medium">
                                {question.question}
                              </p>
                              
                              <div className="grid grid-cols-2 gap-2">
                                {options.map((option, optIndex) => (
                                  <div key={optIndex} className={`p-2 rounded text-sm ${
                                    optIndex === question.correctIndex 
                                      ? 'bg-green-100 text-green-800 border border-green-200' 
                                      : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {String.fromCharCode(65 + optIndex)}. {option}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Create Quiz Button */}
        <div className="mt-8">
          {/* Validation Message */}
          {(!title.trim() || selectedQuestions.length === 0) && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                {!title.trim() && selectedQuestions.length === 0 && 
                  '⚠️ Please enter a quiz title and select at least one question to create the quiz.'}
                {!title.trim() && selectedQuestions.length > 0 && 
                  '⚠️ Please enter a quiz title to create the quiz.'}
                {title.trim() && selectedQuestions.length === 0 && 
                  '⚠️ Please select at least one question to create the quiz.'}
              </p>
            </div>
          )}
          
          <div className="flex justify-end">
            <Button
              onClick={handleCreateQuiz}
              disabled={!title.trim() || selectedQuestions.length === 0 || creating}
              className={`min-w-[200px] ${
                !title.trim() || selectedQuestions.length === 0 || creating
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
              }`}
            >
              {creating ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Create Quiz
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}