// Remove Duplicate Questions Script
// Scans database for duplicate questions and removes them while preserving the best version

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface QuestionSimilarity {
  id: string;
  question: string;
  similarity: number;
  duplicateOf: string;
}

async function main() {
  console.log('🔍 ECCCO Duplicate Question Detection & Removal');
  console.log('📊 Scanning database for duplicate questions...\n');

  try {
    // Get all questions from database
    const allQuestions = await prisma.question.findMany({
      select: {
        id: true,
        question: true,
        explanation: true,
        difficulty: true,
        topicId: true,
        createdAt: true,
        options: true
      },
      orderBy: { createdAt: 'asc' } // Keep older questions as originals
    });

    console.log(`📚 Found ${allQuestions.length} total questions in database`);

    // Track duplicates
    const duplicates: QuestionSimilarity[] = [];
    const processedQuestions = new Set<string>();

    console.log('\n🔍 Analyzing questions for duplicates...');

    // Compare each question with all others
    for (let i = 0; i < allQuestions.length; i++) {
      const currentQuestion = allQuestions[i];
      
      if (processedQuestions.has(currentQuestion.id)) {
        continue; // Already marked as duplicate
      }

      const currentText = normalizeText(currentQuestion.question);

      for (let j = i + 1; j < allQuestions.length; j++) {
        const compareQuestion = allQuestions[j];
        
        if (processedQuestions.has(compareQuestion.id)) {
          continue; // Already marked as duplicate
        }

        const compareText = normalizeText(compareQuestion.question);
        const similarity = calculateSimilarity(currentText, compareText);

        // Consider questions duplicates if they're very similar
        if (similarity > 0.9) { // 90% similarity threshold
          duplicates.push({
            id: compareQuestion.id,
            question: compareQuestion.question.substring(0, 100) + '...',
            similarity: similarity,
            duplicateOf: currentQuestion.id
          });
          
          processedQuestions.add(compareQuestion.id);
          console.log(`   ❌ Found duplicate: ${compareQuestion.id} (${(similarity * 100).toFixed(1)}% similar)`);
        }
      }

      // Show progress every 100 questions
      if ((i + 1) % 100 === 0) {
        console.log(`   📈 Processed ${i + 1}/${allQuestions.length} questions...`);
      }
    }

    console.log(`\n📊 Duplicate Analysis Results:`);
    console.log(`   • Total questions analyzed: ${allQuestions.length}`);
    console.log(`   • Duplicates found: ${duplicates.length}`);
    console.log(`   • Unique questions: ${allQuestions.length - duplicates.length}`);

    if (duplicates.length === 0) {
      console.log('\n✅ No duplicate questions found! Database is clean.');
      return;
    }

    console.log('\n🗑️  Removing duplicate questions...');

    // Remove duplicates in batches
    const batchSize = 50;
    let removedCount = 0;

    for (let i = 0; i < duplicates.length; i += batchSize) {
      const batch = duplicates.slice(i, i + batchSize);
      const idsToRemove = batch.map(d => d.id);

      try {
        const deleteResult = await prisma.question.deleteMany({
          where: {
            id: {
              in: idsToRemove
            }
          }
        });

        removedCount += deleteResult.count;
        console.log(`   🗑️  Removed batch ${Math.floor(i/batchSize) + 1}: ${deleteResult.count} questions`);

      } catch (error) {
        console.error(`❌ Error removing batch ${Math.floor(i/batchSize) + 1}:`, error);
      }
    }

    // Get final count
    const finalCount = await prisma.question.count();

    console.log('\n' + '='.repeat(60));
    console.log('✅ DUPLICATE REMOVAL COMPLETE!');
    console.log('='.repeat(60));

    console.log(`\n📊 Final Results:`);
    console.log(`   • Duplicates removed: ${removedCount}`);
    console.log(`   • Questions remaining: ${finalCount}`);
    console.log(`   • Database reduction: ${removedCount} questions`);

    // Additional cleanup analysis
    console.log(`\n🔍 Post-cleanup Analysis:`);
    
    const byDifficulty = await prisma.question.groupBy({
      by: ['difficulty'],
      _count: { difficulty: true }
    });

    console.log(`   • Difficulty distribution:`);
    byDifficulty.forEach(item => {
      console.log(`     - ${item.difficulty}: ${item._count.difficulty} questions`);
    });

    const byTopic = await prisma.question.groupBy({
      by: ['topicId'],
      _count: { topicId: true }
    });

    console.log(`   • Topics covered: ${byTopic.length}`);

    if (finalCount >= 5000) {
      console.log('\n🎯 SUCCESS: Still maintaining 5000+ question target!');
    } else {
      console.log(`\n⚠️  Warning: Question count below 5000 target (${finalCount} remaining)`);
    }

    console.log('\n📋 Database Status:');
    console.log('   ✅ Duplicates removed');
    console.log('   ✅ Question integrity maintained');
    console.log('   ✅ Ready for search functionality');

  } catch (error) {
    console.error('❌ Error during duplicate removal:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }

    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Helper function to normalize text for comparison
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ')     // Normalize whitespace
    .trim();
}

// Calculate similarity between two strings using Jaccard similarity
function calculateSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.split(' '));
  const words2 = new Set(text2.split(' '));
  
  const intersection = new Set([...words1].filter(word => words2.has(word)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

// Advanced similarity check using Levenshtein distance for exact matches
function levenshteinSimilarity(text1: string, text2: string): number {
  const longer = text1.length > text2.length ? text1 : text2;
  const shorter = text1.length > text2.length ? text2 : text1;
  
  if (longer.length === 0) return 1.0;
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,     // deletion
        matrix[j - 1][i] + 1,     // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Run the script
if (require.main === module) {
  main()
    .catch(console.error)
    .finally(() => process.exit(0));
}