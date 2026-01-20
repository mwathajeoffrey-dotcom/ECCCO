#!/bin/bash
echo "⏱️  $(date '+%H:%M:%S') - Quick Status Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if seed process is running
if ps aux | grep -q "[s]cripts/seed-all-questions.ts"; then
  echo "✅ Seed process: RUNNING"
  PROGRESS=$(grep "Processed" /Users/apple/ECCCO/seed-continue.log 2>/dev/null | tail -1)
  if [ -n "$PROGRESS" ]; then
    echo "📈 Latest: $PROGRESS"
  fi
else
  echo "⚠️  Seed process: NOT RUNNING"
fi

# Quick database count using a simple Node script
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasourceUrl: 'postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&statement_cache_size=0'
});

prisma.question.count()
  .then(count => {
    const percent = Math.round(count / 2816 * 100);
    console.log('📊 Database: ' + count + ' / 2,816 questions (' + percent + '%)');
    if (count >= 2816) {
      console.log('');
      console.log('🎉 ✅ SEEDING COMPLETE! 🎉');
      console.log('🚀 Ready for deployment verification!');
    } else if (count > 0) {
      console.log('⏳ Still seeding... ' + (2816 - count) + ' questions remaining');
    }
  })
  .catch(err => console.log('❌ Error checking database:', err.message))
  .finally(() => prisma.\$disconnect());
" 2>/dev/null

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
