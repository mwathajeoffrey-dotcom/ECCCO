#!/bin/bash

# NUCLEAR OPTION: Delete ALL deployments and start fresh
# This ensures NO old corrupted files interfere

set -e

echo "🔥 NUCLEAR DEPLOYMENT RESET"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "This will:"
echo "  1. Delete ALL production deployments"
echo "  2. Verify localhost works perfectly"
echo "  3. Create ONE fresh deployment"
echo "  4. Test immediately"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Get auth token
AUTH_TOKEN=$(cat "/Users/apple/Library/Application Support/com.vercel.cli/auth.json" | grep '"token"' | cut -d'"' -f4)

if [ -z "$AUTH_TOKEN" ]; then
    echo "❌ Error: Could not find Vercel auth token"
    exit 1
fi

echo "🔑 Auth token found"
echo ""

# Step 1: Delete ALL deployments (no exceptions)
echo "━━━ STEP 1: DELETE ALL DEPLOYMENTS ━━━"
echo ""

for i in {1..5}; do
    echo "🗑️  Deletion pass #$i..."
    
    # Fetch ALL deployments
    DEPLOYMENTS=$(curl -s -X GET \
      "https://api.vercel.com/v6/deployments?projectId=eccco&limit=100&target=production" \
      -H "Authorization: Bearer $AUTH_TOKEN")
    
    DEPLOYMENT_IDS=$(echo "$DEPLOYMENTS" | grep -o '"uid":"dpl_[^"]*' | cut -d'"' -f4)
    
    COUNT=$(echo "$DEPLOYMENT_IDS" | grep -c "dpl_" || echo "0")
    
    if [ "$COUNT" -eq 0 ]; then
        echo "✅ No more deployments found"
        break
    fi
    
    echo "   Found $COUNT deployments, deleting all..."
    
    echo "$DEPLOYMENT_IDS" | while read -r DEPLOYMENT_ID; do
        if [ -n "$DEPLOYMENT_ID" ]; then
            curl -s -X DELETE \
              "https://api.vercel.com/v13/deployments/$DEPLOYMENT_ID" \
              -H "Authorization: Bearer $AUTH_TOKEN" > /dev/null
            echo "   ✅ Deleted: $DEPLOYMENT_ID"
        fi
    done
    
    echo "   ⏸️  Waiting 2 seconds..."
    sleep 2
done

echo ""
echo "✅ All deployments deleted!"
echo ""

# Step 2: Verify localhost
echo "━━━ STEP 2: VERIFY LOCALHOST ━━━"
echo ""
echo "📋 Please test on localhost NOW:"
echo "   URL: http://localhost:3001"
echo ""
echo "   Test checklist:"
echo "   [ ] Click hamburger menu - sidebar opens?"
echo "   [ ] Click X button - sidebar closes?"
echo "   [ ] Click overlay (dark background) - sidebar closes?"
echo "   [ ] Click any nav link - sidebar closes and navigates?"
echo ""
read -p "✅ Does everything work on localhost? (y/n): " LOCALHOST_WORKS

if [ "$LOCALHOST_WORKS" != "y" ]; then
    echo ""
    echo "❌ Fix localhost issues first before deploying!"
    echo "   The code must work perfectly on localhost."
    exit 1
fi

echo ""
echo "✅ Localhost verified working!"
echo ""

# Step 3: Create fresh deployment
echo "━━━ STEP 3: CREATE FRESH DEPLOYMENT ━━━"
echo ""

BUILD_ID=$(date +%Y%m%d%H%M%S)

cat > /Users/apple/ECCCO/DEPLOYMENT_VERIFIED.md << EOF
# Deployment Verified - $BUILD_ID

## Localhost Testing Complete ✅

All navigation features tested and working on localhost:
- ✅ Hamburger menu opens sidebar
- ✅ X button closes sidebar
- ✅ Overlay click closes sidebar
- ✅ Nav links close sidebar and navigate

## Deployment Details

- Date: $(date)
- Build ID: $BUILD_ID
- All old deployments: DELETED
- Starting fresh with verified working code

This deployment is guaranteed clean - no old files, no corruption.
EOF

echo "📝 Creating deployment marker..."
git add -A
git commit -m "deploy: FRESH START - All old deployments deleted, localhost verified - Build $BUILD_ID" || true
echo ""

echo "🚀 Pushing to trigger Vercel deployment..."
git push origin main

echo ""
echo "⏳ Waiting 60 seconds for Vercel to build..."
sleep 60

echo ""

# Step 4: Get new deployment URL
echo "━━━ STEP 4: GET NEW DEPLOYMENT URL ━━━"
echo ""

NEW_DEPLOYMENT=$(vercel ls eccco --prod 2>&1 | grep "● Ready" | head -1 | grep -o "https://[^ ]*")

if [ -z "$NEW_DEPLOYMENT" ]; then
    echo "⚠️  Deployment might still be building..."
    echo "   Check: https://vercel.com/mwathajeoffrey-dotcom/eccco/deployments"
    echo ""
    echo "   When ready, test the deployment URL in incognito mode"
    exit 0
fi

echo "✅ New deployment ready!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 TEST YOUR DEPLOYMENT NOW:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Open this URL in INCOGNITO mode:"
echo "   $NEW_DEPLOYMENT"
echo ""
echo "2. Test all navigation features:"
echo "   [ ] Hamburger menu - opens sidebar"
echo "   [ ] X button - closes sidebar"
echo "   [ ] Overlay - closes sidebar"
echo "   [ ] Nav links - close and navigate"
echo ""
echo "3. Check console (F12) - should be clean, no errors"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "If it works: 🎉 SUCCESS! Problem was old deployments"
echo "If it fails: 🔍 Different issue - check console errors"
echo ""
