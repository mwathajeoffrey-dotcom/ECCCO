#!/bin/bash

echo "🔍 Showing ALL topics in our seeded database..."
echo ""

node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function showAll() {
  try {
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

    console.log('📊 COMPLETE LIST - All 46 Topics with Questions:\n');

    let totalQuestions = 0;
    topics.forEach((t, i) => {
      const count = t._count.Question;
      totalQuestions += count;
      console.log(\`\${i+1}. \${t.name}: \${count} questions\`);
    });

    console.log(\`\n🎯 TOTAL: \${topics.length} topics, \${totalQuestions} questions\`);
    console.log(\`\nThis is what Vercel will have after you update DATABASE_URL!\n\`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.\$disconnect();
  }
}

showAll();
" 2>&1
