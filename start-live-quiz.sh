#!/bin/bash

# Live Quiz System - Quick Start Script
# This script sets up and starts your live quiz platform

echo "🚀 ECCCO Live Quiz Platform - Quick Start"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the ECCCO project root"
    exit 1
fi

# Step 1: Check database connection
echo "1️⃣  Checking database connection..."
if ! npx prisma db execute --schema=./prisma/schema.prisma --stdin <<< "SELECT 1;" > /dev/null 2>&1; then
    echo "❌ Database connection failed!"
    echo "   Please check your DATABASE_URL in .env file"
    echo ""
    echo "   Current DATABASE_URL:"
    grep "^DATABASE_URL" .env 2>/dev/null || echo "   Not found in .env"
    echo ""
    echo "   Expected format:"
    echo "   DATABASE_URL=\"postgresql://user:password@host:port/database\""
    exit 1
else
    echo "✅ Database connected successfully"
fi

# Step 2: Generate Prisma Client
echo ""
echo "2️⃣  Generating Prisma Client..."
if npx prisma generate > /dev/null 2>&1; then
    echo "✅ Prisma Client generated"
else
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

# Step 3: Check if dev server is already running
echo ""
echo "3️⃣  Checking for existing dev server..."
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "⚠️  Port 3000 is already in use"
    echo "   Stopping existing process..."
    kill $(lsof -ti:3000) 2>/dev/null
    sleep 2
fi
echo "✅ Port 3000 is available"

# Step 4: Start dev server
echo ""
echo "4️⃣  Starting development server..."
echo "=========================================="
echo ""
echo "✨ Server will start at:"
echo "   Local:   http://localhost:3000"
echo "   Network: http://$(ipconfig getifaddr en0 2>/dev/null || hostname):3000"
echo ""
echo "📝 Quick Test URLs:"
echo "   Create Quiz: http://localhost:3000/live-quiz/create"
echo "   Join Quiz:   http://localhost:3000/live-quiz/join/[CODE]"
echo ""
echo "🛑 To stop: Press Ctrl+C"
echo "=========================================="
echo ""

# Start the dev server
npm run dev
