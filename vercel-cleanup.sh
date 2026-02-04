#!/bin/bash

# 🧹 VERCEL CLEANUP SCRIPT
# Deletes old deployments and purges CDN cache

set -e

echo "🧹 Vercel Cleanup & Cache Purge"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "📋 Step 1: Listing recent deployments..."
echo ""
vercel ls --scope mwathajeoffrey-dotcom || true
echo ""

echo "⚠️  WARNING: This will delete ALL deployments except the latest!"
echo ""
read -p "Continue? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled"
    exit 1
fi

echo ""
echo "🗑️  Step 2: Removing old deployments..."
# This would require Vercel API - manual for now
echo "⚠️  Please manually delete old deployments from:"
echo "   https://vercel.com/mwathajeoffrey-dotcom/eccco/deployments"
echo ""
echo "   Keep ONLY the latest deployment!"
echo ""

read -p "Press Enter when done..."

echo ""
echo "🔄 Step 3: Purging CDN cache..."
echo "   Manual step - In Vercel dashboard:"
echo "   1. Go to Settings → Advanced"
echo "   2. Click 'Purge Cache'"
echo "   3. Or redeploy to force new deployment URL"
echo ""

read -p "Press Enter when done..."

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Verify only ONE deployment is active"
echo "2. Test in Incognito mode"
echo "3. Check Sentry for new errors"
echo ""
