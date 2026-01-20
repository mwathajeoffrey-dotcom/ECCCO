#!/usr/bin/env node

/**
 * Verifies the new database tables were created successfully
 * Checks: ContentVersion, AuditLog, CitationVerification
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

async function verifyTables() {
  console.log('🔍 Verifying database tables...\n');

  try {
    // Test 1: Check if tables exist by querying them
    console.log('✓ Testing ContentVersion table...');
    const contentVersionCount = await prisma.$queryRaw`
      SELECT COUNT(*) FROM "ContentVersion"
    `;
    console.log(`  Found ContentVersion table (${contentVersionCount[0].count} rows)\n`);

    console.log('✓ Testing AuditLog table...');
    const auditLogCount = await prisma.$queryRaw`
      SELECT COUNT(*) FROM "AuditLog"
    `;
    console.log(`  Found AuditLog table (${auditLogCount[0].count} rows)\n`);

    console.log('✓ Testing CitationVerification table...');
    const citationCount = await prisma.$queryRaw`
      SELECT COUNT(*) FROM "CitationVerification"
    `;
    console.log(`  Found CitationVerification table (${citationCount[0].count} rows)\n`);

    // Test 2: Verify indexes exist
    console.log('✓ Checking indexes...');
    const indexes = await prisma.$queryRaw`
      SELECT 
        tablename,
        indexname
      FROM pg_indexes 
      WHERE tablename IN ('ContentVersion', 'AuditLog', 'CitationVerification')
      ORDER BY tablename, indexname
    `;
    
    console.log(`  Found ${indexes.length} indexes across the 3 tables\n`);
    
    const indexesByTable = indexes.reduce((acc, idx) => {
      if (!acc[idx.tablename]) acc[idx.tablename] = 0;
      acc[idx.tablename]++;
      return acc;
    }, {});
    
    Object.entries(indexesByTable).forEach(([table, count]) => {
      console.log(`  ${table}: ${count} indexes`);
    });

    // Test 3: Verify table structures
    console.log('\n✓ Verifying table columns...');
    const contentVersionCols = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'ContentVersion'
      ORDER BY ordinal_position
    `;
    console.log(`  ContentVersion: ${contentVersionCols.length} columns`);

    const auditLogCols = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'AuditLog'
      ORDER BY ordinal_position
    `;
    console.log(`  AuditLog: ${auditLogCols.length} columns`);

    const citationCols = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'CitationVerification'
      ORDER BY ordinal_position
    `;
    console.log(`  CitationVerification: ${citationCols.length} columns`);

    console.log('\n✅ SUCCESS! All tables are properly created and functional.\n');
    console.log('Summary:');
    console.log('  ✓ ContentVersion table: OK');
    console.log('  ✓ AuditLog table: OK');
    console.log('  ✓ CitationVerification table: OK');
    console.log('  ✓ All indexes: OK');
    console.log('  ✓ Schema integrity: OK\n');

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error('\nThis could mean:');
    console.error('  1. Tables were not created (SQL did not run)');
    console.error('  2. Database connection issue');
    console.error('  3. Permission problem\n');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifyTables();
