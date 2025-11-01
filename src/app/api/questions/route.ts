import { NextRequest, NextResponse } from 'next/server';

// Simple mock questions for production deployment
const mockQuestions = [
  {
    id: 'q1',
    question: 'What is the initial treatment for ventricular fibrillation?',
    options: ['Defibrillation', 'Cardioversion', 'Epinephrine', 'Amiodarone'],
    correctIndex: 0,
    explanation: 'Immediate defibrillation is the treatment of choice for ventricular fibrillation.',
    references: ['AHA Guidelines'],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'q2',
    question: 'What is the normal range for arterial pH?',
    options: ['7.25-7.35', '7.35-7.45', '7.45-7.55', '7.30-7.40'],
    correctIndex: 1,
    explanation: 'Normal arterial pH ranges from 7.35 to 7.45.',
    references: ['Blood Gas Analysis'],
    difficulty: 'easy',
    topicId: 'blood-gas-analysis'
  }
];

export async function GET(request: NextRequest) {
  try {
    // Return mock questions for now - this will be replaced with full question bank
    return NextResponse.json(mockQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}