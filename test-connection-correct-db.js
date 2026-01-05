const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres"
    }
  }
});

async function test() {
  try {
    console.log('🔌 Testing connection to correct database...\n');
    
    const tables = await prisma.$queryRaw`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public' 
      ORDER BY tablename
    `;
    
    console.log(`✅ Connected! Found ${tables.length} tables:\n`);
    tables.forEach((t, i) => console.log(`${i + 1}. ${t.tablename}`));
    
    const liveTables = tables.filter(t => t.tablename.startsWith('Live'));
    console.log(`\n🎮 Live Quiz tables: ${liveTables.length}`);
    if (liveTables.length > 0) {
      liveTables.forEach(t => console.log(`  ✅ ${t.tablename}`));
    } else {
      console.log('  ❌ No Live Quiz tables found - need to create them');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
