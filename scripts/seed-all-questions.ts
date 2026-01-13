import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.development.local" });
dotenv.config({ path: ".env" });

// Use DATABASE_URL from environment or fall back to SQLite
const databaseUrl = process.env.DATABASE_URL || "file:./prisma/prisma/dev.db";

// For PostgreSQL pooled connections (pgbouncer), add parameter
const finalDatabaseUrl = databaseUrl.includes("pooler.supabase.com")
  ? `${databaseUrl}${
      databaseUrl.includes("?") ? "&" : "?"
    }pgbouncer=true&connect_timeout=30&pool_timeout=30&statement_cache_size=0`
  : databaseUrl;

const prisma = new PrismaClient({
  datasourceUrl: finalDatabaseUrl,
  log: ["query", "error", "warn"],
});

async function main() {
  console.log("🚀 Starting comprehensive question seed...\n");

  // Import all question modules dynamically
  const questionsPath = path.join(process.cwd(), "src", "lib", "questions");

  const allQuestions: any[] = [];
  const allTopics = new Set<string>();

  // Function to recursively read question files
  async function loadQuestionsFromDir(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        await loadQuestionsFromDir(fullPath);
      } else if (file.endsWith(".ts") && file !== "types.ts" && file !== "index.ts") {
        try {
          const relativePath = path.relative(questionsPath, fullPath).replace(/\.ts$/, "");
          const modulePath = `../src/lib/questions/${relativePath}`;

          console.log(`📂 Loading: ${relativePath}`);
          const module = await import(modulePath);

          // Find all exported question arrays
          for (const key of Object.keys(module)) {
            if (Array.isArray(module[key]) && module[key].length > 0) {
              const questions = module[key];
              if (questions[0]?.question && questions[0]?.options) {
                allQuestions.push(...questions);
                questions.forEach((q: any) => {
                  if (q.topicId) allTopics.add(q.topicId);
                });
                console.log(`  ✅ Found ${questions.length} questions in ${key}`);
              }
            }
          }
        } catch (error: any) {
          console.log(`  ⚠️  Error loading ${file}:`, error?.message || error);
        }
      }
    }
  }

  await loadQuestionsFromDir(questionsPath);

  console.log(`\n📊 Total questions found: ${allQuestions.length}`);
  console.log(`📊 Total topics found: ${allTopics.size}`);

  // Create topics first
  console.log("\n🏷️  Creating topics...");
  const topicMap = new Map<string, string>();

  // Create topics in batches
  const topicArray = Array.from(allTopics);
  console.log(`  📦 Processing ${topicArray.length} topics in batches of 10...`);

  for (let i = 0; i < topicArray.length; i += 10) {
    const batch = topicArray.slice(i, i + 10);

    for (const topicId of batch) {
      const topicName = topicId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      try {
        const topic = await prisma.topic.upsert({
          where: { id: topicId },
          update: { name: topicName },
          create: {
            id: topicId,
            name: topicName,
            description: `Questions related to ${topicName}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        topicMap.set(topicId, topic.id);
        console.log(`  ✅ Topic ${i + batch.indexOf(topicId) + 1}/${topicArray.length}: ${topicName}`);
      } catch (error: any) {
        console.log(`  ⚠️  Error creating topic ${topicId}:`, error?.message || error);
      }
    }

    // Small delay between batches to avoid overwhelming the connection
    if (i + 10 < topicArray.length) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  // Seed questions
  console.log("\n📝 Seeding questions...");
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const q of allQuestions) {
    try {
      const topicId = topicMap.get(q.topicId) || q.topicId || "general";

      await prisma.question.upsert({
        where: { id: q.id },
        update: {
          question: q.question,
          options: JSON.stringify(q.options),
          correctIndex: q.correctIndex,
          explanation: q.explanation || "",
          references: JSON.stringify(q.references || []),
          difficulty: q.difficulty || "medium",
          topicId: topicId,
          updatedAt: new Date(),
        },
        create: {
          id: q.id,
          question: q.question,
          options: JSON.stringify(q.options),
          correctIndex: q.correctIndex,
          explanation: q.explanation || "",
          references: JSON.stringify(q.references || []),
          difficulty: q.difficulty || "medium",
          topicId: topicId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      successCount++;
      if (successCount % 100 === 0) {
        console.log(`  ✅ Processed ${successCount} questions...`);
      }
    } catch (error: any) {
      if (error?.code === "P2002") {
        skipCount++;
      } else {
        errorCount++;
        console.log(`  ❌ Error with question ${q.id}:`, error?.message || error);
      }
    }
  }

  console.log("\n" + "=".repeat(70));
  console.log(`✅ Success: ${successCount} questions`);
  console.log(`⏭️  Skipped: ${skipCount} duplicates`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log("=".repeat(70));

  // Verify final count
  const finalCount = await prisma.question.count();
  console.log(`\n🎯 Total questions in database: ${finalCount}`);
}

main()
  .catch((e) => {
    console.error("❌ Fatal error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
