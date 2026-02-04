#!/bin/bash

# DELETE ALL OLD VERCEL DEPLOYMENTS - AGGRESSIVE MODE
# This runs the deletion multiple times to ensure ALL old deployments are removed

set -e

echo "🔥 AGGRESSIVE DEPLOYMENT CLEANUP - DELETE ALL OLD DEPLOYMENTS"
echo "============================================================"
echo ""

# Run deletion script multiple times to catch all pages
MAX_RUNS=10
RUN_COUNT=0

while [ $RUN_COUNT -lt $MAX_RUNS ]; do
    RUN_COUNT=$((RUN_COUNT + 1))
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🔄 CLEANUP RUN #$RUN_COUNT of $MAX_RUNS"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    # Check how many Ready deployments exist
    READY_COUNT=$(vercel ls eccco --prod 2>&1 | grep "● Ready" | wc -l | tr -d ' ')
    
    echo "📊 Currently: $READY_COUNT 'Ready' deployments found"
    
    if [ "$READY_COUNT" -le 1 ]; then
        echo "✅ SUCCESS! Only 1 or 0 'Ready' deployments remaining."
        echo "✅ Cleanup complete!"
        break
    fi
    
    echo "🗑️  Running deletion script..."
    echo ""
    
    # Run the force-delete script
    ./force-delete-deployments.sh
    
    echo ""
    echo "⏸️  Waiting 3 seconds before next run..."
    sleep 3
    echo ""
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 FINAL STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Final count
FINAL_READY=$(vercel ls eccco --prod 2>&1 | grep "● Ready" | wc -l | tr -d ' ')
FINAL_TOTAL=$(vercel ls eccco --prod 2>&1 | grep -E "● Ready|● Error|Canceled" | wc -l | tr -d ' ')

echo "📊 Final deployment count:"
echo "   ✅ Ready deployments: $FINAL_READY (should be 1)"
echo "   📋 Total visible: $FINAL_TOTAL (includes old errors/canceled)"
echo ""

if [ "$FINAL_READY" -eq 1 ]; then
    echo "✅ ✅ ✅  PERFECT! Exactly 1 'Ready' deployment remaining!"
    echo ""
    echo "🎯 Your single active deployment:"
    vercel ls eccco --prod 2>&1 | grep "● Ready" | head -1
    echo ""
    echo "🧪 TEST NOW:"
    echo "   1. Copy the deployment URL above"
    echo "   2. Open in Incognito mode"
    echo "   3. Test navigation - should work 100%"
    echo ""
elif [ "$FINAL_READY" -eq 0 ]; then
    echo "⚠️  WARNING: 0 'Ready' deployments found!"
    echo "   This might mean:"
    echo "   - All deployments are building"
    echo "   - API sync delay"
    echo "   - Need to push a new commit"
else
    echo "⚠️  ISSUE: Still $FINAL_READY 'Ready' deployments remaining"
    echo "   The Vercel API might have limits on bulk deletion"
    echo "   You may need to:"
    echo "   1. Wait 5 minutes for API sync"
    echo "   2. Run this script again"
    echo "   3. Or manually delete via dashboard"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
