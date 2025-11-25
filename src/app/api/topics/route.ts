import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET() {
  try {
    // Test database connection first
    console.log('=== /api/topics: Starting request ===');
    
    const topics = await prisma.topic.findMany({
      include: {
        module: true,
        _count: {
          select: { questions: true }
        }
      },
      orderBy: [
        { module: { name: 'asc' } },
        { name: 'asc' }
      ]
    });

    console.log(`=== /api/topics: Found ${topics.length} topics ===`);
    return NextResponse.json(topics);
  } catch (error) {
    // Detailed error logging
    console.error('=== /api/topics ERROR START ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown');
    console.error('Full error:', error);
    console.error('=== /api/topics ERROR END ===');
    
    // Return empty array instead of error object to prevent frontend crash
    // Frontend expects an array to .map() over
    return NextResponse.json([], { status: 200 });
  }
}