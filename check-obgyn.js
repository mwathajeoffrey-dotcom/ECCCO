const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function check() {
  try {
    // Find all topics with OB/GYN or pregnancy-related names
    const topics = await prisma.topic.findMany({
      where: {
        OR: [
          { name: { contains: 'OB/GYN', mode: 'insensitive' } },
          { name: { contains: 'Obstetric', mode: 'insensitive' } },
          { name: { contains: 'Pregnancy', mode: 'insensitive' } },
          { name: { contains: 'Preeclampsia', mode: 'insensitive' } },
          { name: { contains: 'Gynecologic', mode: 'insensitive' } },
        ]
      },
      include: {
        _count: {
          select: { Question: true }
        }
      }
    });
    
    console.log('\n🔍 OB/GYN & Pregnancy-Related Topics in Database:\n');
    for (const topic of topics) {
      const emoji = topic._count.Question > 0 ? '✅' : '❌';
      console.log(`  ${emoji} ${topic.name}: ${topic._count.Question} questions`);
    }
    
    console.log(`\n📊 Total OB/GYN-related topics: ${topics.length}`);
    console.log(`✅ Topics with questions: ${topics.filter(t => t._count.Question > 0).length}`);
    console.log(`❌ Topics with 0 questions: ${topics.filter(t => t._count.Question === 0).length}\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
