#!/bin/bash

# Keep Live Quiz Dev Server Running
# This script will automatically restart the server if it crashes

echo "🚀 Starting ECCCO Live Quiz Development Server"
echo "=============================================="
echo ""
echo "Server will run at:"
echo "  Local:   http://localhost:3000"
echo "  Network: http://192.168.100.7:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=============================================="
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping server..."
    killall -9 node 2>/dev/null
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT SIGTERM

# Keep server running
while true; do
    echo "▶️  Starting Next.js dev server..."
    npm run dev
    
    # If we get here, the server stopped
    echo ""
    echo "⚠️  Server stopped! Restarting in 3 seconds..."
    sleep 3
done
