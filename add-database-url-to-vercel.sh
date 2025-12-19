#!/bin/bash

# Script to add DATABASE_URL to Vercel environment variables
# Run this script to fix the missing DATABASE_URL in production

echo "🔧 Adding DATABASE_URL to Vercel..."
echo ""
echo "This will add the Prisma Postgres DATABASE_URL to your Vercel project."
echo ""

# The DATABASE_URL from your .env.local file
DATABASE_URL="postgres://cfd7595bb2750923065f186992c3f976d290a2d03a1992177292581fd168ed41:sk_DwmniF_90jTCWTfEgzZeu@db.prisma.io:5432/postgres?sslmode=require"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

echo "✅ Vercel CLI is installed"
echo ""

# Login to Vercel
echo "🔐 Please login to Vercel (browser will open)..."
vercel login

echo ""
echo "📦 Linking to your Vercel project..."
vercel link --yes

echo ""
echo "🔑 Adding DATABASE_URL to Production environment..."
echo "$DATABASE_URL" | vercel env add DATABASE_URL production

echo ""
echo "🔑 Adding DATABASE_URL to Preview environment..."
echo "$DATABASE_URL" | vercel env add DATABASE_URL preview

echo ""
echo "🔑 Adding DATABASE_URL to Development environment..."
echo "$DATABASE_URL" | vercel env add DATABASE_URL development

echo ""
echo "✅ DATABASE_URL has been added to all environments!"
echo ""
echo "🚀 Now triggering a new deployment..."
vercel --prod

echo ""
echo "✅ Done! Your deployment is being built."
echo ""
echo "📊 Verify by visiting: https://eccco.vercel.app/api/debug"
echo "   - Should show: \"hasDatabaseUrl\": true"
echo ""
echo "⏱️  Wait 2-3 minutes for deployment to complete, then test:"
echo "   - https://eccco.vercel.app (bookmarks should work)"
echo "   - https://eccco.vercel.app/api/bookmarks?userId=test (should NOT error)"
