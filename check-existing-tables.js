// This will use the CURRENT connection from .env.local
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkTables() {
  try {
    const tables = await prisma.$queryRaw`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public' 
      ORDER BY tablename
    `;
    console.log('\n📊 Existing tables in database:\n');
    tables.forEach((t, i) => console.log(`${i + 1}. ${t.tablename}`));
    console.log(`\nTotal: ${tables.length} tables`);
    
    // Check specifically for Live Quiz tables
    const liveTables = await prisma.$queryRaw`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename LIKE 'Live%'
    `;
    console.log('\n🎮 Live Quiz tables:');
    if (liveTables.length === 0) {
      console.log('❌ No Live Quiz tables found (need to create them)');
    } else {
      liveTables.forEach(t => console.log(`✅ ${t.tablename}`));
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkTables();
