import { PrismaClient } from '@prisma/client';

// Force PostgreSQL connection with explicit datasourceUrl
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
    }
  }
});

async function main() {
  try {
    const questionCount = await prisma.question.count();
    const topicCount = await prisma.topic.count();
    
    console.log('\n📊 Production Database Status:');
    console.log(`   Questions: ${questionCount} / 2816 (${Math.round(questionCount / 2816 * 100)}%)`);
    console.log(`   Topics: ${topicCount} / 46`);
    
    if (questionCount > 0) {
      const sample = await prisma.question.findMany({ 
        take: 3, 
        select: { id: true, question: true, topicId: true } 
      });
      console.log('\n   Sample Questions:');
      sample.forEach(q => console.log(`   - ${q.id} [${q.topicId}]: ${q.question.substring(0, 50)}...`));
    }
    
    console.log(`\n   ${questionCount < 2816 ? '⏳ Seeding in progress...' : '✅ All questions seeded!'}\n`);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
