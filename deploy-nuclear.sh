#!/bin/bash

# 🚨 NUCLEAR DEPLOYMENT - FORCE COMPLETE CACHE CLEAR
# Use this when normal deployment still shows old cached code

set -e

echo "🚨 NUCLEAR DEPLOYMENT MODE - FORCING COMPLETE CACHE CLEAR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 1: Clean everything
echo "📦 Step 1: Cleaning ALL caches..."
rm -rf .next
rm -rf .vercel
rm -rf node_modules/.cache
rm -rf .turbo
echo "✅ All caches cleared"
echo ""

# Step 2: Update deployment ID with current timestamp
echo "🔢 Step 2: Generating NEW deployment ID..."
BUILD_ID=$(date +%Y%m%d%H%M%S)
echo "export const DEPLOYMENT_ID = '${BUILD_ID}';" > src/lib/deployment-id.ts

# Also update it in the cache cleaner script
sed -i '' "s/const CURRENT_DEPLOYMENT = '[0-9]*'/const CURRENT_DEPLOYMENT = '${BUILD_ID}'/" public/clear-cache.js

echo "Build ID: ${BUILD_ID}"
echo "✅ Deployment ID updated in both files"
echo ""

# Step 3: Build
echo "🏗️  Step 3: Building..."
if npm run build; then
  echo "✅ Build successful"
else
  echo "❌ Build failed!"
  exit 1
fi
echo ""

# Step 4: Commit with force message
echo "💾 Step 4: Committing with CACHE CLEAR flag..."
git add -A
git commit -m "deploy: FORCE CACHE CLEAR - Build ${BUILD_ID}

This deployment includes:
- Unique build ID: ${BUILD_ID}
- Cache clearing script
- Service worker removal
- Force reload on first visit

ALL BROWSERS MUST RELOAD FRESH ASSETS!" || echo "No changes to commit"
echo ""

# Step 5: Push
echo "🚀 Step 5: Pushing to trigger deployment..."
if git push origin main --force-with-lease; then
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "✅ NUCLEAR DEPLOYMENT INITIATED!"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "🎯 Build ID: ${BUILD_ID}"
  echo ""
  echo "⚠️  CRITICAL TESTING INSTRUCTIONS:"
  echo ""
  echo "1. 🔍 Wait for Vercel deployment to complete (2-3 min)"
  echo "   https://vercel.com/mwathajeoffrey-dotcom/eccco"
  echo ""
  echo "2. 🧹 BEFORE testing, do ONE of these:"
  echo ""
  echo "   Option A (BEST): Use Incognito/Private window"
  echo "   - Chrome: Cmd+Shift+N"
  echo "   - Safari: Cmd+Shift+N"
  echo ""
  echo "   Option B: Clear ALL site data:"
  echo "   - Chrome: DevTools → Application → Clear storage → Clear site data"
  echo "   - Safari: Develop → Empty Caches"
  echo ""
  echo "3. 🔄 First visit will auto-clear cache and reload"
  echo "   - You'll see console messages: '🧹 Cache Cleaner: Starting...'"
  echo "   - Page may reload once automatically"
  echo "   - This is NORMAL and expected"
  echo ""
  echo "4. ✅ After auto-reload, test:"
  echo "   - Desktop: Sidebar on left"
  echo "   - Mobile (Cmd+Shift+M): Hamburger + bottom nav"
  echo "   - All interactions work"
  echo ""
  echo "5. 📱 Test on actual phone:"
  echo "   - Open browser settings → Clear browsing data"
  echo "   - Or use private/incognito mode"
  echo "   - Visit deployment URL"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🔥 THIS WILL FORCE COMPLETE CACHE CLEAR FOR ALL USERS!"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
else
  echo "❌ Push failed!"
  exit 1
fi
