import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET() {
  try {
    // Fetch topics from database with question counts
    const topics = await prisma.topic.findMany({
      include: {
        module: {
          select: {
            id: true,
            name: true,
            ageGroup: true,
          },
        },
        _count: {
          select: {
            questions: true,
          },
        },
      },
      orderBy: [
        { module: { name: 'asc' } },
        { name: 'asc' },
      ],
    });

    return NextResponse.json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    
    // Return empty array if database fails
    return NextResponse.json([]);
  }
}
