const { PrismaClient } = require('@prisma/client');

async function test(url) {
  console.log('\nTesting URL:', url);
  try {
    const prisma = new PrismaClient({ datasources: { db: { url } } });
    await prisma.$connect();
    console.log('Connected successfully');
    await prisma.$disconnect();
  } catch (e) {
    console.error('Connection failed:', e.message);
  }
}

const urls = [
  process.env.DATABASE_URL,
  // with sslmode=require
  process.env.DATABASE_URL ? process.env.DATABASE_URL + '&sslmode=require' : undefined,
  // alternative host formats (try db.*.supabase.co)
];

(async () => {
  for (const u of urls) {
    if (!u) continue;
    await test(u);
  }
})();
