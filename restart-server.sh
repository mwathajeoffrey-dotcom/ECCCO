#!/bin/bash

# ECCCO Development Server Restart Script
# This script ensures the development server stays running on port 3001

PORT=3001
PROJECT_DIR="/Users/apple/ECCCO"

echo "🔄 ECCCO Development Server Restart"
echo "======================================"

# Kill any existing process on port 3001
echo "🛑 Killing any process on port $PORT..."
lsof -ti:$PORT | xargs kill -9 2>/dev/null || echo "   No process found on port $PORT"

# Wait a moment
sleep 1

# Start the development server
echo "🚀 Starting Next.js development server on port $PORT..."
cd "$PROJECT_DIR"

# Start the server (this will keep running)
npm run dev -- -p $PORT
