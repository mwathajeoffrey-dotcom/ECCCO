#!/bin/bash

# Force Delete Old Vercel Deployments via API
# This script deletes ALL production deployments except the most recent one

set -e

echo "🔍 Fetching Vercel deployments..."

# Get auth token
AUTH_TOKEN=$(cat "/Users/apple/Library/Application Support/com.vercel.cli/auth.json" | grep '"token"' | cut -d'"' -f4)

if [ -z "$AUTH_TOKEN" ]; then
    echo "❌ Error: Could not find Vercel auth token"
    echo "Debug: Auth file content:"
    cat "/Users/apple/Library/Application Support/com.vercel.cli/auth.json"
    exit 1
fi

echo "🔑 Auth token found: ${AUTH_TOKEN:0:20}..."

# Get team/user ID
TEAM_ID=$(vercel whoami 2>&1 | grep -v "Update available" | grep -v "Changelog" | grep -v "Run" | grep -v "│" | grep -v "╭" | grep -v "╰" | sed 's/^> //' | tr -d ' ')

echo "📋 Team/User: $TEAM_ID"
echo "🎯 Project: eccco"
echo ""

# Fetch ALL deployments from API (not just READY state - get everything)
echo "🔍 Fetching ALL production deployments..."
DEPLOYMENTS=$(curl -s -X GET \
  "https://api.vercel.com/v6/deployments?projectId=eccco&limit=100&target=production" \
  -H "Authorization: Bearer $AUTH_TOKEN")

# Extract deployment IDs and states
ALL_DEPLOYMENTS=$(echo "$DEPLOYMENTS" | grep -o '"uid":"dpl_[^"]*","name"[^}]*"state":"[^"]*' | sed 's/"uid":"//g' | sed 's/","name".*"state":"/ /g')

# Get the very first (newest) deployment ID to keep
NEWEST_ID=$(echo "$ALL_DEPLOYMENTS" | head -1 | awk '{print $1}')

echo "🎯 NEWEST deployment to keep: $NEWEST_ID"
echo ""

# Count total deployments
TOTAL=$(echo "$ALL_DEPLOYMENTS" | wc -l | tr -d ' ')

if [ "$TOTAL" -eq 0 ]; then
    echo "✅ No deployments found (or API error)"
    exit 0
fi

echo "📊 Found $TOTAL total production deployments"
echo "🗑️  Will delete $(($TOTAL - 1)) deployments (keeping only the newest)"
echo ""

# Delete ALL except the newest
COUNTER=0
echo "$ALL_DEPLOYMENTS" | while read -r LINE; do
    DEPLOYMENT_ID=$(echo "$LINE" | awk '{print $1}')
    DEPLOYMENT_STATE=$(echo "$LINE" | awk '{print $2}')

    COUNTER=$((COUNTER + 1))

    # Skip the first (newest) deployment
    if [ "$DEPLOYMENT_ID" = "$NEWEST_ID" ]; then
        echo "✅ Keeping: $DEPLOYMENT_ID (state: $DEPLOYMENT_STATE) - NEWEST"
        continue
    fi

    echo "🗑️  Deleting: $DEPLOYMENT_ID ..."

    DELETE_RESPONSE=$(curl -s -X DELETE \
      "https://api.vercel.com/v13/deployments/$DEPLOYMENT_ID" \
      -H "Authorization: Bearer $AUTH_TOKEN")

    if echo "$DELETE_RESPONSE" | grep -q '"state":"DELETED"'; then
        echo "   ✅ Successfully deleted!"
    elif echo "$DELETE_RESPONSE" | grep -q '"error"'; then
        ERROR_MSG=$(echo "$DELETE_RESPONSE" | grep -o '"message":"[^"]*' | cut -d'"' -f4)
        echo "   ❌ Failed: $ERROR_MSG"
    else
        echo "   ⚠️  Unknown response (may have succeeded)"
    fi

    # Rate limiting - pause between deletions
    sleep 1
done

echo ""
echo "✅ Deletion complete!"
echo ""
echo "🔍 Verifying remaining deployments..."
vercel ls eccco --prod | head -15

echo ""
echo "🎯 Next steps:"
echo "1. Wait 30 seconds for Vercel CDN to update"
echo "2. Test your site in incognito mode"
echo "3. If you still see old deployments, run this script again"
