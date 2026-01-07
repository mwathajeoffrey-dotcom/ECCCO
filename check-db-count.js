const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasourceUrl: "postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
});

async function main() {
  const questionCount = await prisma.question.count();
  const topicCount = await prisma.topic.count();
  
  console.log('📊 Production Database Status:');
  console.log(`   Questions: ${questionCount}`);
  console.log(`   Topics: ${topicCount}`);
  
  if (questionCount > 0) {
    const sample = await prisma.question.findMany({ take: 3, select: { id: true, question: true } });
    console.log('\n   Sample Questions:');
    sample.forEach(q => console.log(`   - ${q.id}: ${q.question.substring(0, 60)}...`));
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
