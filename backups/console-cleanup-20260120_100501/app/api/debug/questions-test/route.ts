import { NextResponse } from 'next/server';
import { allQuestions } from '@/lib/questions';

export async function GET() {
  return NextResponse.json({
    totalQuestions: allQuestions.length,
    firstQuestion: allQuestions[0] || null,
    categories: [...new Set(allQuestions.map(q => q.category))],
    sampleQuestionIds: allQuestions.slice(0, 5).map(q => q.id),
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}
