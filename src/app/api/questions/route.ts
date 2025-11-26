import { NextRequest, NextResponse } from 'next/server';
import { allQuestions, questionsByCategory, getAllQuestions } from '@/lib/questions';
import { Question } from '@/lib/questions/types';

/**
 * Shuffle the options within a question and update the correctIndex accordingly
 * This ensures the correct answer is not predictably in the same position
 */
function shuffleQuestionOptions(question: Question): Question {
  const { options, correctIndex, ...rest } = question;
  
  // Create array of indices [0, 1, 2, 3]
  const indices = options.map((_, i) => i);
  
  // Shuffle indices using Fisher-Yates algorithm for better randomization
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  // Create shuffled options based on new order
  const shuffledOptions = indices.map(i => options[i]);
  
  // Find new position of correct answer
  const newCorrectIndex = indices.indexOf(correctIndex);
  
  return {
    ...rest,
    options: shuffledOptions,
    correctIndex: newCorrectIndex
  };
}

export async function GET(request: NextRequest) {
  console.log('✅ Questions API route hit!');
  try {
    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get('topicId');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '30');
    const difficulty = searchParams.get('difficulty');
    
    console.log('📊 Request params:', { topicId, category, limit, difficulty });

    let questions: Question[] = [];

    // Get questions by category if specified
    if (category && questionsByCategory[category as keyof typeof questionsByCategory]) {
      questions = questionsByCategory[category as keyof typeof questionsByCategory];
      console.log(`📚 Found ${questions.length} questions for category: ${category}`);
    } 
    // Get questions by topicId (legacy support)
    else if (topicId) {
      questions = allQuestions.filter(q => q.topicId === topicId);
      console.log(`📚 Found ${questions.length} questions for topicId: ${topicId}`);
    }
    // Get all questions
    else {
      questions = getAllQuestions();
      console.log(`📚 Returning all questions: ${questions.length} total`);
    }

    // Filter by difficulty if specified
    if (difficulty) {
      questions = questions.filter(q => q.difficulty === difficulty);
      console.log(`🎯 Filtered to ${questions.length} questions with difficulty: ${difficulty}`);
    }

    // Shuffle questions for randomization
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

    // Limit the number of questions
    const limitedQuestions = shuffledQuestions.slice(0, Math.min(limit, shuffledQuestions.length));

    // Shuffle options within each question to randomize correct answer position
    const randomizedQuestions = limitedQuestions.map(q => shuffleQuestionOptions(q));

    console.log(`✅ Returning ${randomizedQuestions.length} questions with randomized options`);

    return NextResponse.json({
      success: true,
      count: randomizedQuestions.length,
      total: questions.length,
      questions: randomizedQuestions,
    });
  } catch (error) {
    console.error('❌ Error fetching questions:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch questions',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}