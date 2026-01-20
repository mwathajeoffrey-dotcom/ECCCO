import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Read current schema file
    const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
    let schemaContent = '';
    try {
      schemaContent = fs.readFileSync(schemaPath, 'utf8');
    } catch (err) {
      schemaContent = 'Schema file not found';
    }

    // Extract provider from schema
    const providerMatch = schemaContent.match(/provider = "([^"]+)"/);
    const provider = providerMatch ? providerMatch[1] : 'unknown';

    return NextResponse.json({
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        DATABASE_URL_exists: !!process.env.DATABASE_URL,
        DATABASE_URL_preview: process.env.DATABASE_URL ? 
          process.env.DATABASE_URL.substring(0, 30) + '...' : 'NOT_SET'
      },
      schema: {
        provider: provider,
        schemaExists: fs.existsSync(schemaPath),
        firstLines: schemaContent.split('\n').slice(0, 15).join('\n')
      },
      buildInfo: {
        buildTime: new Date().toISOString(),
        cwd: process.cwd()
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Debug failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}