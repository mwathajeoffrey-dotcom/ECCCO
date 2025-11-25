import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET() {
  try {
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

    return NextResponse.json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topics' },
      { status: 500 }
    );
  }
}