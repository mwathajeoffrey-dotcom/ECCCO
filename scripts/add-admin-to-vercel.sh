#!/bin/bash

# Script to add ADMIN_USER_IDS to Vercel environment variables
# This ensures admin security is enforced in production

echo "🔐 Adding ADMIN_USER_IDS to Vercel environment variables..."
echo ""

# Get the admin user ID from .env.local
ADMIN_ID=$(grep "ADMIN_USER_IDS" .env.local | cut -d'=' -f2)

if [ -z "$ADMIN_ID" ]; then
  echo "❌ Error: ADMIN_USER_IDS not found in .env.local"
  echo "Please add it first: ADMIN_USER_IDS=user_xxxxx"
  exit 1
fi

echo "Found admin user ID: $ADMIN_ID"
echo ""
echo "Adding to Vercel (production, preview, and development)..."

# Add to Vercel for all environments
npx vercel env add ADMIN_USER_IDS production preview development <<EOF
$ADMIN_ID
EOF

echo ""
echo "✅ Admin user IDs added to Vercel!"
echo ""
echo "To verify, run:"
echo "  npx vercel env ls"
echo ""
echo "To redeploy with new environment variable:"
echo "  git commit --allow-empty -m 'Trigger redeploy for admin security'"
echo "  git push"
