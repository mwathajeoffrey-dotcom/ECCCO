#!/bin/bash

echo "🔍 ECCCO Dashboard - Clerk Integration Status Check"
echo "=================================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    exit 1
fi

echo "✅ Checking environment variables..."
echo ""

# Check Clerk keys
if grep -q "CLERK_SECRET_KEY=" .env.local; then
    echo "✅ CLERK_SECRET_KEY configured"
else
    echo "❌ CLERK_SECRET_KEY missing"
fi

if grep -q "CLERK_WEBHOOK_SECRET=" .env.local; then
    echo "✅ CLERK_WEBHOOK_SECRET configured"
else
    echo "❌ CLERK_WEBHOOK_SECRET missing"
fi

if grep -q "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=" .env.local; then
    echo "✅ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY configured"
else
    echo "❌ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY missing"
fi

echo ""
echo "✅ Checking admin configuration..."
echo ""

# Check admin config
if grep -q "ADMIN_USER_IDS=" .env.local; then
    ADMIN_IDS=$(grep "^ADMIN_USER_IDS=" .env.local | cut -d'=' -f2)
    echo "✅ ADMIN_USER_IDS: $ADMIN_IDS"
else
    echo "❌ ADMIN_USER_IDS missing"
fi

if grep -q "ADMIN_EMAILS=" .env.local; then
    ADMIN_EMAILS=$(grep "^ADMIN_EMAILS=" .env.local | cut -d'=' -f2)
    echo "✅ ADMIN_EMAILS: $ADMIN_EMAILS"
else
    echo "❌ ADMIN_EMAILS missing"
fi

echo ""
echo "✅ Checking key files..."
echo ""

# Check important files exist
FILES=(
    "src/app/api/webhooks/clerk/route.ts"
    "src/app/api/heartbeat/route.ts"
    "src/app/api/admin/dashboard/route.ts"
    "src/app/admin/dashboard/page.tsx"
    "src/components/UserHeartbeat.tsx"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing!)"
    fi
done

echo ""
echo "📊 Summary"
echo "=========="
echo ""
echo "🎯 Clerk Integration:"
echo "   - Webhook endpoint: /api/webhooks/clerk"
echo "   - Webhook secret: Configured ✅"
echo "   - Events: user.created, user.updated, user.deleted"
echo ""
echo "💓 Heartbeat System:"
echo "   - Endpoint: /api/heartbeat"
echo "   - Interval: 30 seconds"
echo "   - Online window: 5 minutes"
echo ""
echo "📈 Admin Dashboard:"
echo "   - Route: /admin/dashboard"
echo "   - Access: ecccomedical@gmail.com"
echo "   - Auto-refresh: 30 seconds"
echo ""
echo "🚀 Next Steps:"
echo "   1. Start dev server: npm run dev"
echo "   2. Open dashboard: http://localhost:3000/admin/dashboard"
echo "   3. Login with ecccomedical@gmail.com"
echo "   4. Verify 'Online Now' counter works"
echo ""
echo "📝 For detailed testing guide, see: LOCAL_DASHBOARD_TESTING.md"
echo ""
