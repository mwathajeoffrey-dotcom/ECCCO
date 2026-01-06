import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET() {
  try {
    // Fetch topics from database with question counts
    const topics = await prisma.topic.findMany({
      include: {
        _count: {
          select: {
            Question: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Transform to match expected format
    const formattedTopics = topics.map((topic: any) => ({
      id: topic.id,
      name: topic.name,
      description: topic.description,
      _count: {
        questions: topic._count.Question
      }
    }));

    return NextResponse.json(formattedTopics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    
    // Return empty array if database fails
    return NextResponse.json([]);
  }
}
