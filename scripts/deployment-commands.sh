#!/bin/bash
# ECCCO Platform - Production Deployment Quick Commands
# Run these commands after setting up Vercel project

echo "🚀 ECCCO Platform - Production Deployment Commands"
echo "=================================================="
echo ""

# Generate NEXTAUTH_SECRET
echo "1️⃣ Generate NEXTAUTH_SECRET:"
echo "   openssl rand -base64 32"
echo ""

# Test build locally
echo "2️⃣ Test build locally:"
echo "   npm run build"
echo ""

# Deploy to Vercel
echo "3️⃣ Deploy to Vercel (via CLI):"
echo "   npm i -g vercel"
echo "   vercel login"
echo "   vercel --prod"
echo ""

# Run database migrations
echo "4️⃣ Run database migrations:"
echo "   vercel env pull .env.production"
echo "   npx prisma migrate deploy"
echo ""

# Seed production database
echo "5️⃣ Seed production database:"
echo "   DATABASE_URL='<your-vercel-postgres-url>' npx tsx scripts/seed-production.ts"
echo ""

# Check Prisma Studio (production)
echo "6️⃣ Verify data in Prisma Studio:"
echo "   DATABASE_URL='<your-vercel-postgres-url>' npx prisma studio"
echo ""

# Test deployment
echo "7️⃣ Test your deployment:"
echo "   Open: https://your-app.vercel.app"
echo "   Test: Sign in, Take exam, Create quiz"
echo ""

echo "=================================================="
echo "📖 Full guide: See VERCEL_DEPLOYMENT_GUIDE.md"
echo "✅ Checklist: See PRE_DEPLOYMENT_CHECKLIST.md"
