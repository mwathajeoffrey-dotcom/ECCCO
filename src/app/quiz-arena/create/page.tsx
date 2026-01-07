'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Settings, 
  Play,
  Search,
  Filter,
  Clock,
  Trophy,
  Music,
  Volume2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { api, ApiError } from '@/lib/api-client';
import { logger } from '@/lib/logger';
import type { Topic, Question, CreateQuizRequest } from '@/types/api';

export default function CreateQuizPage() {
  const router = useRouter();
  const [step, setStep] = useState<'settings' | 'questions'>('settings');
  
  // Quiz Settings
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timePerQuestion, setTimePerQuestion] = useState(20);
  const [pointsPerQuestion, setPointsPerQuestion] = useState(1000);
  const [playMusic, setPlayMusic] = useState(true);
  const [playSound, setPlaySound] = useState(true);
  const [showAnswerAfter, setShowAnswerAfter] = useState(true);
  
  // Question Selection
  const [questionSource, setQuestionSource] = useState<'database' | 'custom'>('database');
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  // Loading and error states
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load topics
  useEffect(() => {
    fetchTopics();
  }, []);

  // Load questions when topic changes
  useEffect(() => {
    if (selectedTopic) {
      fetchQuestions(selectedTopic);
    }
  }, [selectedTopic]);

  const fetchTopics = async () => {
    try {
      setLoadingTopics(true);
      setError(null);
      
      const data = await api.topics.getAll();
      setTopics(data);
      
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Failed to load topics. Please try again.';
      setError(errorMessage);
      
      logger.error('Failed to fetch topics', error instanceof Error ? error : undefined);
    } finally {
      setLoadingTopics(false);
    }
  };

  const fetchQuestions = async (topicId: string) => {
    try {
      setLoadingQuestions(true);
      setError(null);
      
      const data = await api.questions.getByTopic(topicId, 50);
      setAvailableQuestions(data.questions || []);
      
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Failed to load questions. Please try again.';
      setError(errorMessage);
      
      logger.error('Failed to fetch questions', error instanceof Error ? error : undefined, { topicId });
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleAddQuestion = (question: Question) => {
    if (!selectedQuestions.find(q => q.id === question.id)) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleRemoveQuestion = (questionId: string) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== questionId));
  };

  const validateQuiz = (): string | null => {
    if (!title.trim()) {
      return 'Quiz title is required';
    }
    if (title.length < 3) {
      return 'Title must be at least 3 characters';
    }
    if (selectedQuestions.length === 0) {
      return 'Please select at least one question';
    }
    if (selectedQuestions.length > 50) {
      return 'Maximum 50 questions allowed';
    }
    if (timePerQuestion < 5) {
      return 'Minimum 5 seconds per question';
    }
    if (timePerQuestion > 300) {
      return 'Maximum 5 minutes per question';
    }
    return null;
  };

  const handleCreateQuiz = async () => {
    // Validate before creating
    const validationError = validateQuiz();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const quizData: CreateQuizRequest = {
        title: title.trim(),
        description: description.trim() || undefined,
        timePerQuestion,
        pointsPerQuestion,
        questionIds: selectedQuestions.map(q => q.id),
        settings: {
          playMusic,
          playSound,
          showAnswerAfter,
        },
      };
      
      const result = await api.quiz.create(quizData);
      
      // Success! Navigate to host page
      router.push(`/quiz-arena/host/${result.session.id}`);
      
    } catch (error) {
      let errorMessage = 'Failed to create quiz';
      
      if (error instanceof ApiError) {
        if (error.status === 400) {
          errorMessage = 'Invalid quiz configuration. Please check your settings.';
        } else if (error.status === 500) {
          errorMessage = 'Server error. Please try again in a moment.';
        } else {
          errorMessage = error.message;
        }
      } else {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      setError(errorMessage);
      
      logger.error('Quiz creation failed', error instanceof Error ? error : undefined, {
        quizTitle: title,
        questionCount: selectedQuestions.length
      });
    } finally {
      setIsCreating(false);
    }
  };

  const filteredQuestions = availableQuestions.filter(q =>
    q.questionText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <button
            onClick={() => router.push('/quiz-arena')}
            className="flex items-center text-white/90 hover:text-white mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Quiz Arena
          </button>
          <h1 className="text-3xl font-bold">Create New Quiz</h1>
          <p className="text-white/90 mt-1">
            Set up your competitive quiz session
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Step Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setStep('settings')}
            className={`flex-1 py-4 rounded-xl font-bold transition-all ${
              step === 'settings'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-5 h-5 inline mr-2" />
            1. Quiz Settings
          </button>
          <button
            onClick={() => setStep('questions')}
            className={`flex-1 py-4 rounded-xl font-bold transition-all ${
              step === 'questions'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Plus className="w-5 h-5 inline mr-2" />
            2. Add Questions ({selectedQuestions.length})
          </button>
        </div>

        {/* Settings Step */}
        {step === 'settings' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Quiz Settings</h2>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quiz Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Emergency Medicine Challenge"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the quiz..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Time Per Question */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Time Per Question (seconds)
                  </label>
                  <input
                    type="number"
                    value={timePerQuestion}
                    onChange={(e) => setTimePerQuestion(Number(e.target.value))}
                    min={5}
                    max={60}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                </div>

                {/* Points Per Question */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Trophy className="w-4 h-4 inline mr-1" />
                    Points Per Question
                  </label>
                  <input
                    type="number"
                    value={pointsPerQuestion}
                    onChange={(e) => setPointsPerQuestion(Number(e.target.value))}
                    min={100}
                    max={5000}
                    step={100}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center">
                    <Music className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <div className="font-semibold">Background Music</div>
                      <div className="text-sm text-gray-600">Play music during quiz</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={playMusic}
                    onChange={(e) => setPlayMusic(e.target.checked)}
                    className="w-6 h-6 text-purple-600 rounded focus:ring-purple-500"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center">
                    <Volume2 className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <div className="font-semibold">Sound Effects</div>
                      <div className="text-sm text-gray-600">Play sounds for answers</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={playSound}
                    onChange={(e) => setPlaySound(e.target.checked)}
                    className="w-6 h-6 text-purple-600 rounded focus:ring-purple-500"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center">
                    <Settings className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <div className="font-semibold">Show Correct Answer</div>
                      <div className="text-sm text-gray-600">Display answer after each question</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showAnswerAfter}
                    onChange={(e) => setShowAnswerAfter(e.target.checked)}
                    className="w-6 h-6 text-purple-600 rounded focus:ring-purple-500"
                  />
                </label>
              </div>
            </div>

            <button
              onClick={() => setStep('questions')}
              className="mt-8 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
            >
              Continue to Questions →
            </button>
          </div>
        )}

        {/* Questions Step */}
        {step === 'questions' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Question Browser */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Add Questions</h2>

              {/* Search & Filter */}
              <div className="space-y-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search questions..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Select a topic...</option>
                  {topics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name} ({topic._count?.questions || 0} questions)
                    </option>
                  ))}
                </select>
              </div>

              {/* Question List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredQuestions.length === 0 && selectedTopic && (
                  <div className="text-center py-12 text-gray-500">
                    <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No questions found</p>
                  </div>
                )}

                {filteredQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 transition-all cursor-pointer"
                    onClick={() => handleAddQuestion(question)}
                  >
                    <p className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {question.questionText}
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded mr-2">
                        {question.difficulty || 'Medium'}
                      </span>
                      <span>{question.options.length} options</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Questions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">
                Selected ({selectedQuestions.length})
              </h3>

              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {selectedQuestions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Plus className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No questions added yet</p>
                  </div>
                )}

                {selectedQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className="p-3 bg-purple-50 border-2 border-purple-200 rounded-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span className="inline-block w-6 h-6 bg-purple-600 text-white rounded-full text-center text-sm font-bold mr-2">
                          {index + 1}
                        </span>
                        <p className="text-sm font-medium text-gray-900 line-clamp-2 inline">
                          {question.questionText}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveQuestion(question.id)}
                        className="ml-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleCreateQuiz}
                disabled={selectedQuestions.length === 0 || isCreating}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center"
              >
                {isCreating ? (
                  'Creating...'
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Create & Start Quiz
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
