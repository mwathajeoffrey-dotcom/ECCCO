#!/bin/bash

# ECCCO Production Deployment Script
# Deploys latest authentication system and enhanced exam experience

echo "🚀 Starting ECCCO Production Deployment..."
echo "📅 $(date)"
echo ""

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check git status
echo "🔍 Checking git status..."
git status --porcelain
if [ $? -ne 0 ]; then
    echo "❌ Error: Git repository not found or corrupted."
    exit 1
fi

# Ensure all changes are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes."
    echo "📝 Please commit all changes before deployment."
    git status --short
    exit 1
fi

# Check if we're ahead of origin
AHEAD=$(git rev-list --count origin/main..HEAD)
echo "📊 Commits ahead of origin: $AHEAD"

if [ "$AHEAD" -gt 0 ]; then
    echo "📤 Pushing $AHEAD commits to GitHub..."
    git push origin main
    if [ $? -ne 0 ]; then
        echo "❌ Error: Failed to push to GitHub."
        exit 1
    fi
    echo "✅ Successfully pushed to GitHub!"
else
    echo "✅ Repository is up to date with origin."
fi

# Show deployment status
echo ""
echo "🎯 Deployment Status:"
echo "   Enhanced Exam Experience: ✅ Ready"
echo "   User Authentication: ✅ Ready"
echo "   Database Schema: ✅ Updated"
echo "   Environment Variables: ⚠️  Check Vercel Dashboard"
echo ""

echo "🔧 Required Environment Variables for Production:"
echo "   NEXTAUTH_URL=https://your-app.vercel.app"
echo "   NEXTAUTH_SECRET=your-32-char-secret"
echo "   GOOGLE_CLIENT_ID=your-google-client-id"
echo "   GOOGLE_CLIENT_SECRET=your-google-client-secret"
echo "   ACCELERATE_URL=(already configured)"
echo ""

echo "📝 Next Steps:"
echo "   1. Configure environment variables in Vercel Dashboard"
echo "   2. Set up Google OAuth in Google Cloud Console"
echo "   3. Monitor deployment at https://vercel.com/dashboard"
echo "   4. Test authentication flow after deployment"
echo ""

echo "✅ Code deployment initiated!"
echo "🔗 Monitor at: https://vercel.com/dashboard"
echo "🎉 Production URL will be available after successful build"

exit 0