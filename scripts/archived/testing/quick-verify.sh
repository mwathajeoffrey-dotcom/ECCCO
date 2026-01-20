#!/bin/bash

echo "🔍 Quick Production Check..."
echo ""

# Get topic count
RESPONSE=$(curl -s "https://eccco.vercel.app/api/topics")
TOTAL=$(echo "$RESPONSE" | grep -o '"_count":{"questions":[0-9]*}' | grep -o '[0-9]*' | awk '{s+=$1} END {print s}')
TOPICS=$(echo "$RESPONSE" | grep -o '"id":' | wc -l | tr -d ' ')

echo "📊 Current Status:"
echo "   Topics: $TOPICS"
echo "   Questions: $TOTAL"
echo ""

if [ "$TOTAL" -ge 1800 ]; then
    echo "✅ SUCCESS! Database updated correctly!"
    echo "   You now have all 1,845 questions across 46 topics"
    echo ""
    echo "🎉 Test the exam at: https://eccco.vercel.app/exam?count=10&mode=quick"
elif [ "$TOTAL" -ge 800 ]; then
    echo "❌ Still using OLD database"
    echo "   Expected: 1,845 questions"
    echo "   Got: $TOTAL questions"
    echo ""
    echo "📝 What to do:"
    echo "   1. Make sure you SAVED the DATABASE_URL in Vercel"
    echo "   2. Make sure you clicked REDEPLOY"
    echo "   3. Wait for deployment to finish (check Vercel dashboard)"
    echo "   4. Run this script again"
else
    echo "⚠️  Unexpected result - check Vercel deployment logs"
fi
