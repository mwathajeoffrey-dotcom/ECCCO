#!/bin/bash

# ECCCO Production Deployment Script
# This script helps set up the production database and deploy to Vercel

echo "🚀 ECCCO Production Deployment Script"
echo "======================================"

# Check if we have required tools
command -v npx >/dev/null 2>&1 || { echo "❌ Error: npx is required but not installed."; exit 1; }
command -v vercel >/dev/null 2>&1 || { echo "❌ Error: Vercel CLI is required. Install with: npm i -g vercel"; exit 1; }

echo ""
echo "📋 Step 1: Database Setup Options"
echo "================================"
echo "Choose your production database option:"
echo "1) Use Prisma Postgres (recommended)"
echo "2) Use Vercel Postgres" 
echo "3) Use external PostgreSQL (Railway, PlanetScale, etc.)"
echo "4) I already have DATABASE_URL configured"
echo ""

read -p "Enter your choice (1-4): " db_choice

case $db_choice in
    1)
        echo "🔧 Setting up Prisma Postgres..."
        echo "Please run: npx prisma postgres create-database eccco-production --region us-east-1"
        echo "Then copy the connection string and add it to Vercel environment variables"
        ;;
    2)
        echo "🔧 Setting up Vercel Postgres..."
        echo "1. Go to: https://vercel.com/dashboard"
        echo "2. Navigate to your ECCCO project"
        echo "3. Go to Storage tab → Create Database → Postgres"
        echo "4. Copy the connection string and add to environment variables"
        ;;
    3)
        echo "🔧 External PostgreSQL Setup..."
        echo "1. Create a PostgreSQL database with your preferred provider"
        echo "2. Get the connection string (format: postgresql://user:pass@host:port/db)"
        echo "3. Add it to Vercel environment variables as DATABASE_URL"
        ;;
    4)
        echo "✅ Proceeding with existing database configuration..."
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "📋 Step 2: Environment Variables"
echo "==============================="
echo "Make sure these are set in Vercel Dashboard → Project → Settings → Environment Variables:"
echo ""
echo "Required:"
echo "- DATABASE_URL: Your PostgreSQL connection string"
echo "- NODE_ENV: production"
echo ""
echo "To set variables:"
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Select your ECCCO project"
echo "3. Settings → Environment Variables"
echo "4. Add DATABASE_URL with your PostgreSQL connection string"
echo ""

read -p "Have you set the DATABASE_URL in Vercel? (y/n): " env_confirmed

if [[ $env_confirmed != "y" ]]; then
    echo "⚠️  Please set up your environment variables first, then run this script again."
    exit 1
fi

echo ""
echo "📋 Step 3: Database Schema & Data"
echo "==============================="
echo "Deploying schema changes and seeding data..."

# Deploy to trigger build and migration
echo "🚀 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo ""
    echo "📋 Step 4: Seed Production Database"
    echo "================================="
    echo "The deployment was successful, but you may need to seed the production database."
    echo ""
    echo "Options to seed production data:"
    echo "1. Create a manual seed script for production"
    echo "2. Use Vercel Functions to run seed operation"
    echo "3. Run migrations and seed via database provider's console"
    echo ""
    echo "🔧 Testing production API..."
    echo "Testing: https://eccco.vercel.app/api/modules"
    
    # Test the API endpoint
    response=$(curl -s -o /dev/null -w "%{http_code}" https://eccco.vercel.app/api/modules)
    
    if [ $response -eq 200 ]; then
        echo "✅ Production API is working!"
        echo "🎉 Deployment complete! Check: https://eccco.vercel.app/modules"
    else
        echo "⚠️  Production API returned status: $response"
        echo "You may need to run the database seed operation."
        echo ""
        echo "Next steps:"
        echo "1. Check Vercel Function logs for errors"
        echo "2. Verify DATABASE_URL is correctly set"
        echo "3. Run database seed operation"
    fi
else
    echo "❌ Deployment failed. Check logs for details."
    exit 1
fi

echo ""
echo "🎯 Summary"
echo "=========="
echo "✅ Schema deployed to production"
echo "✅ Environment variables configured"
echo "🔄 Database seeding may be needed"
echo ""
echo "Useful commands:"
echo "- View logs: vercel logs https://eccco.vercel.app"
echo "- Redeploy: vercel --prod"
echo "- Test API: curl https://eccco.vercel.app/api/modules"