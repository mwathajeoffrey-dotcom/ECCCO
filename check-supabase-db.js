const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres",
    },
  },
});

async function checkDatabase() {
  try {
    console.log("🔍 Checking Supabase PostgreSQL database...\n");

    const questionCount = await prisma.question.count();
    const topicCount = await prisma.topic.count();

    console.log(`📊 Database Status:`);
    console.log(`   Questions: ${questionCount}`);
    console.log(`   Topics: ${topicCount}`);
    console.log("");

    if (questionCount === 1845) {
      console.log("✅ CORRECT! Database has all 1,845 questions");
    } else if (questionCount === 851) {
      console.log("❌ WRONG! This is the OLD database with 851 questions");
      console.log("   The seeding might not have worked on this database");
    } else {
      console.log(`⚠️  Unexpected count: ${questionCount}`);
    }

    // Show first 5 topics
    console.log("\n📋 First 5 Topics:");
    const topics = await prisma.topic.findMany({
      take: 5,
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });

    topics.forEach((t) => {
      console.log(`   - ${t.name}: ${t._count.questions} questions`);
    });

    await prisma.$disconnect();
  } catch (error) {
    console.error("❌ Error:", error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

checkDatabase();
