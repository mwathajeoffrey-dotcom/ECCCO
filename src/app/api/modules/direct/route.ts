import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// Direct PostgreSQL connection test without Prisma
export async function GET(request: NextRequest) {
  try {
    console.log('🔧 Testing direct PostgreSQL connection...');
    console.log('Database URL exists:', !!process.env.DATABASE_URL);
    
    // Parse the DATABASE_URL
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL not configured');
    }
    
    console.log('Database URL prefix:', databaseUrl.substring(0, 20) + '...');
    
    const pool = new Pool({
      connectionString: databaseUrl,
      ssl: databaseUrl.includes('sslmode=require') ? { rejectUnauthorized: false } : false
    });

    // Test connection
    const client = await pool.connect();
    console.log('✅ Direct connection successful');
    
    // Query modules
    const result = await client.query(`
      SELECT 
        m.id, 
        m.name, 
        m.description,
        m."ageGroup",
        m."isActive",
        COUNT(t.id) as topic_count
      FROM "Module" m
      LEFT JOIN "Topic" t ON m.id = t."moduleId"
      WHERE m."isActive" = true
      GROUP BY m.id, m.name, m.description, m."ageGroup", m."isActive"
      ORDER BY m."ageGroup"
    `);
    
    client.release();
    await pool.end();

    console.log(`✅ Found ${result.rows.length} modules via direct query`);

    return NextResponse.json({
      success: true,
      method: 'Direct PostgreSQL',
      data: result.rows,
      message: `Successfully fetched ${result.rows.length} modules via direct connection`
    });

  } catch (error) {
    console.error('❌ Direct connection failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Direct PostgreSQL connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        hasUrl: !!process.env.DATABASE_URL,
        urlPrefix: process.env.DATABASE_URL?.substring(0, 20) + '...',
        errorName: error?.constructor?.name
      }
    }, { status: 500 });
  }
}