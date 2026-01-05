const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function testConnection() {
  try {
    console.log('Testing connection...');
    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log('✅ Connection successful!', result);
    
    // Check if Live Quiz tables exist
    const tables = await prisma.$queryRaw`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename LIKE 'Live%'
    `;
    console.log('\n📊 Live Quiz tables:', tables);
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
