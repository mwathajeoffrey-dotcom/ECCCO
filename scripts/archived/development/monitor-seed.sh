#!/bin/bash

echo "🔍 Monitoring seed progress..."
echo "================================"
echo ""

LAST_COUNT=0
NO_CHANGE_COUNT=0

while true; do
  # Check if process is still running
  if ! ps aux | grep -q "[s]cripts/seed-all-questions.ts"; then
    echo ""
    echo "⚠️  Seed process not found! Checking final count..."
    break
  fi
  
  # Get latest progress
  CURRENT=$(grep "Processed" /Users/apple/ECCCO/seed-continue.log 2>/dev/null | tail -1)
  
  if [ -n "$CURRENT" ]; then
    # Extract number
    COUNT=$(echo "$CURRENT" | grep -o '[0-9]\+' | head -1)
    
    if [ "$COUNT" != "$LAST_COUNT" ]; then
      echo "[$(date '+%H:%M:%S')] $CURRENT"
      LAST_COUNT=$COUNT
      NO_CHANGE_COUNT=0
    else
      NO_CHANGE_COUNT=$((NO_CHANGE_COUNT + 1))
      
      # If no change for 5 checks (50 seconds), it might be stuck or finished
      if [ $NO_CHANGE_COUNT -ge 5 ]; then
        echo "[$(date '+%H:%M:%S')] No progress for 50s... checking if completed"
        break
      fi
    fi
  fi
  
  sleep 10
done

echo ""
echo "================================"
echo "🔍 Checking final database count..."
echo ""

# Check database with Node script
node << 'NODESCRIPT'
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasourceUrl: "postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&statement_cache_size=0"
});

async function check() {
  try {
    const questionCount = await prisma.question.count();
    const topicCount = await prisma.topic.count();
    
    console.log('📊 FINAL Production Database Status:');
    console.log('   ════════════════════════════════════');
    console.log(`   Questions: ${questionCount} / 2,816 (${Math.round(questionCount / 2816 * 100)}%)`);
    console.log(`   Topics: ${topicCount} / 46`);
    console.log('   ════════════════════════════════════');
    
    if (questionCount >= 2816) {
      console.log('\n   ✅ SUCCESS! All questions seeded!');
      console.log('   🚀 Ready for deployment verification\n');
    } else if (questionCount > 0) {
      console.log(`\n   ⏳ Partial seed: ${2816 - questionCount} questions remaining`);
      console.log('   💡 You may need to run seed again\n');
    } else {
      console.log('\n   ❌ No questions found in database\n');
    }
    
    if (questionCount > 0) {
      console.log('   Sample questions:');
      const samples = await prisma.question.findMany({ 
        take: 3, 
        select: { id: true, question: true, topicId: true } 
      });
      samples.forEach(q => {
        console.log(`   - ${q.id} [${q.topicId}]: ${q.question.substring(0, 50)}...`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
NODESCRIPT

echo ""
echo "================================"
echo "📝 Seed log summary:"
grep -E "Success:|Errors:|Skipped:" /Users/apple/ECCCO/seed-continue.log | tail -5 || echo "   (No summary found - check seed-continue.log)"
echo ""

