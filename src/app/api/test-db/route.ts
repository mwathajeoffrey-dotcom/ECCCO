import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET() {
  try {
    // Test database connection by counting users
    const userCount = await prisma.user.count();
    
    // Test if tables exist
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      userCount,
      tables,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Database test error:', error instanceof Error ? error : new Error(String(error)));
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
