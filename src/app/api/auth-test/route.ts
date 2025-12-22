import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET() {
  try {
    // Test 1: Check if Prisma client has Account model
    const hasAccountModel = 'account' in prisma;
    
    // Test 2: Try to count accounts
    let accountTest = 'Model not available';
    try {
      const count = await (prisma as any).account?.count();
      accountTest = `Account model works, count: ${count}`;
    } catch (e: any) {
      accountTest = `Account model error: ${e.message}`;
    }
    
    // Test 3: Check database tables directly
    const tables = await prisma.$queryRaw<{ table_name: string }[]>`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    
    // Test 4: Check Prisma model names
    const prismaModels = Object.keys(prisma).filter(key => 
      !key.startsWith('$') && !key.startsWith('_')
    );
    
    return NextResponse.json({
      success: true,
      hasAccountModel,
      accountTest,
      dbTables: tables.map(t => t.table_name),
      prismaModels,
      databaseUrl: process.env.DATABASE_URL?.substring(0, 30) + '...',
      nodeEnv: process.env.NODE_ENV,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
