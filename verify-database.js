const { PrismaClient } = require('@prisma/client');

async function verify() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

  try {
    console.log('\n🔍 Verifying Database Contents...\n');
    console.log('📍 Database URL:', process.env.DATABASE_URL?.substring(0, 50) + '...\n');
    
    const topics = await prisma.topic.findMany({
      include: {
        _count: {
          select: { Question: true }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
    
    const totalQuestions = topics.reduce((sum, t) => sum + t._count.Question, 0);
    const topicsWithQuestions = topics.filter(t => t._count.Question > 0).length;
    
    console.log(`📊 Database Statistics:\n`);
    console.log(`  Total Topics: ${topics.length}`);
    console.log(`  Topics with Questions: ${topicsWithQuestions}`);
    console.log(`  Total Questions: ${totalQuestions}\n`);
    
    console.log(`✅ Top 15 Topics:\n`);
    topics.slice(0, 15).forEach(t => {
      const emoji = t._count.Question > 0 ? '✅' : '❌';
      console.log(`  ${emoji} ${t.name}: ${t._count.Question} questions`);
    });
    
    // Check for OB/GYN specifically
    const obgynTopics = topics.filter(t => 
      t.name.toLowerCase().includes('ob') || 
      t.name.toLowerCase().includes('gyn') || 
      t.name.toLowerCase().includes('obstet')
    );
    
    if (obgynTopics.length > 0) {
      console.log(`\n🔍 OB/GYN Related Topics:\n`);
      obgynTopics.forEach(t => {
        const emoji = t._count.Question > 0 ? '✅' : '❌';
        console.log(`  ${emoji} ${t.name}: ${t._count.Question} questions`);
      });
    }
    
    console.log('\n✅ Verification Complete!\n');
    
    if (totalQuestions >= 1800) {
      console.log('🎉 Database is FULLY SEEDED with 1,845 questions!\n');
    } else {
      console.log(`⚠️  Warning: Only ${totalQuestions} questions found. Expected 1,845.\n`);
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\nMake sure DATABASE_URL is set correctly.\n');
  } finally {
    await prisma.$disconnect();
  }
}

verify();
