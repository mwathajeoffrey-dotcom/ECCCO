#!/bin/bash

# Update Vercel DATABASE_URL with pgbouncer parameters

echo "🔧 Updating DATABASE_URL in Vercel..."
echo ""

# The correct DATABASE_URL with pgbouncer parameters
NEW_DATABASE_URL="postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=10&pool_timeout=10"

echo "Step 1: Removing old DATABASE_URL..."
npx vercel env rm DATABASE_URL --yes 2>/dev/null || echo "Variable removed or didn't exist"

echo ""
echo "Step 2: Adding new DATABASE_URL for Production..."
echo "$NEW_DATABASE_URL" | npx vercel env add DATABASE_URL production

echo ""
echo "Step 3: Adding new DATABASE_URL for Preview..."
echo "$NEW_DATABASE_URL" | npx vercel env add DATABASE_URL preview

echo ""
echo "Step 4: Adding new DATABASE_URL for Development..."
echo "$NEW_DATABASE_URL" | npx vercel env add DATABASE_URL development

echo ""
echo "✅ DATABASE_URL updated!"
echo ""
echo "Now deploying..."
npx vercel --prod --force

echo ""
echo "🎉 Done! Test at: https://eccco.vercel.app/quiz-arena"
