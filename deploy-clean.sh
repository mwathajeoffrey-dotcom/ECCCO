#!/bin/bash

# 🚀 BULLETPROOF DEPLOYMENT SCRIPT FOR ECCCO
# This script ensures complete cache clearing before deployment

set -e  # Exit on any error

echo "🧹 Starting Clean Deployment Process..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Step 1: Clear all local caches
echo ""
echo "📦 Step 1/6: Clearing local caches..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .vercel
echo "✅ Local caches cleared"

# Step 2: Clean install dependencies (optional but recommended)
echo ""
echo "📦 Step 2/6: Verifying dependencies..."
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
else
  echo "✅ Dependencies already installed"
fi

# Step 3: Generate unique build ID
echo ""
echo "🔢 Step 3/6: Generating unique build ID..."
BUILD_ID=$(date +%Y%m%d%H%M%S)
echo "Build ID: ${BUILD_ID}"
echo "export const DEPLOYMENT_ID = '${BUILD_ID}';" > src/lib/deployment-id.ts
echo "✅ Build ID generated"

# Step 4: Run production build locally to catch errors
echo ""
echo "🏗️  Step 4/6: Testing production build..."
if npm run build; then
  echo "✅ Production build successful"
else
  echo "❌ Build failed! Fix errors before deploying."
  exit 1
fi

# Step 5: Commit the build ID
echo ""
echo "💾 Step 5/6: Committing changes..."
git add src/lib/deployment-id.ts
git add -A  # Add any other changes
if git diff --staged --quiet; then
  echo "ℹ️  No changes to commit"
else
  git commit -m "deploy: Clean deployment with build ID ${BUILD_ID}" || echo "ℹ️  Commit skipped (no changes or already committed)"
fi
echo "✅ Changes committed"

# Step 6: Deploy to Vercel
echo ""
echo "🚀 Step 6/6: Deploying to Vercel..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔄 Pushing to GitHub (triggers Vercel auto-deploy)..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if git push origin main; then
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "✅ DEPLOYMENT INITIATED SUCCESSFULLY!"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "📋 NEXT STEPS:"
  echo ""
  echo "1. 🔍 Monitor deployment at: https://vercel.com/mwathajeoffrey-dotcom/eccco"
  echo ""
  echo "2. ⏳ Wait for 'Deployment Complete' message (usually 2-3 minutes)"
  echo ""
  echo "3. 🧹 CRITICAL: Clear your browser cache BEFORE testing!"
  echo "   Chrome/Edge: Cmd+Shift+Delete → Clear cached files"
  echo "   Safari: Cmd+Option+E"
  echo "   OR use Incognito/Private browsing (recommended)"
  echo ""
  echo "4. ✅ Test in INCOGNITO MODE:"
  echo "   - Desktop: Verify sidebar on left"
  echo "   - Mobile (Cmd+Shift+M): Verify hamburger + bottom nav"
  echo "   - Test all drawer interactions"
  echo "   - Verify Sign In button works"
  echo ""
  echo "5. 🚨 If issues appear:"
  echo "   - Wait 5 minutes for CDN propagation"
  echo "   - Clear cache again"
  echo "   - Test in different browser"
  echo "   - Check browser console for errors"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🎯 Build ID: ${BUILD_ID}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
else
  echo ""
  echo "❌ Git push failed! Check your connection and try again."
  exit 1
fi
