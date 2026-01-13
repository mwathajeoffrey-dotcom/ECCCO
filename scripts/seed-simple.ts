import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create topics
  const topics = [
    {
      id: "bls",
      name: "Basic Life Support (BLS)",
      description: "Essential life-saving techniques",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "acls",
      name: "Advanced Cardiovascular Life Support (ACLS)",
      description: "Advanced cardiac life support",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "airway-management",
      name: "Airway Management",
      description: "Airway management techniques",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cardiac-emergencies",
      name: "Cardiac Emergencies",
      description: "Acute cardiac conditions",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "respiratory-emergencies",
      name: "Respiratory Emergencies",
      description: "Acute respiratory conditions",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "pals",
      name: "Pediatric Advanced Life Support (PALS)",
      description: "Advanced life support for children",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "trauma-management",
      name: "Trauma Management",
      description: "Trauma assessment and management",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "neurological-emergencies",
      name: "Neurological Emergencies",
      description: "Acute neurological conditions",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await prisma.topic.createMany({
    data: topics,
    skipDuplicates: true,
  });

  console.log(`✅ Created ${topics.length} topics`);

  // Create sample questions for each topic
  const sampleQuestions = [];

  for (const topic of topics) {
    for (let i = 1; i <= 20; i++) {
      sampleQuestions.push({
        id: `${topic.id}-q${i}`,
        topicId: topic.id,
        question: `Sample question ${i} for ${topic.name}`,
        options: JSON.stringify([
          "Option A - First answer",
          "Option B - Second answer",
          "Option C - Third answer",
          "Option D - Fourth answer",
        ]),
        correctIndex: Math.floor(Math.random() * 4),
        explanation: `This is an explanation for question ${i}`,
        references: JSON.stringify([]),
        difficulty: ["EASY", "MEDIUM", "HARD"][Math.floor(Math.random() * 3)],
      });
    }
  }

  // Batch create questions
  const now = new Date();
  const questionsWithDates = sampleQuestions.map((q) => ({
    ...q,
    createdAt: now,
    updatedAt: now,
  }));

  await prisma.question.createMany({
    data: questionsWithDates,
    skipDuplicates: true,
  });

  console.log(`✅ Created ${sampleQuestions.length} sample questions`);

  // Verify
  const topicCount = await prisma.topic.count();
  const questionCount = await prisma.question.count();

  console.log("\n📊 Database Summary:");
  console.log(`  Topics: ${topicCount}`);
  console.log(`  Questions: ${questionCount}`);
  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
