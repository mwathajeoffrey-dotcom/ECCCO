#!/bin/bash

# Quiz Arena Fix Verification Script
# This script tests the API endpoints to verify the fixes are working

echo "🔍 Quiz Arena API Test Suite"
echo "============================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:3000"

# Test 1: Check if server is running
echo "1️⃣  Testing server availability..."
if curl -s -o /dev/null -w "%{http_code}" $BASE_URL | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✅ Server is running${NC}"
else
    echo -e "${RED}❌ Server is not responding. Please start with 'npm run dev'${NC}"
    exit 1
fi
echo ""

# Test 2: Fetch topics
echo "2️⃣  Testing /api/topics..."
TOPICS_RESPONSE=$(curl -s "$BASE_URL/api/topics")
TOPICS_COUNT=$(echo $TOPICS_RESPONSE | grep -o '"id"' | wc -l)

if [ $TOPICS_COUNT -gt 0 ]; then
    echo -e "${GREEN}✅ Topics endpoint working - Found $TOPICS_COUNT topics${NC}"
else
    echo -e "${RED}❌ Topics endpoint failed${NC}"
    echo "Response: $TOPICS_RESPONSE"
fi
echo ""

# Test 3: Get first topic ID
FIRST_TOPIC_ID=$(echo $TOPICS_RESPONSE | grep -o '"id":"[^"]*"' | head -1 | sed 's/"id":"//;s/"//')

if [ -n "$FIRST_TOPIC_ID" ]; then
    echo "3️⃣  Testing /api/questions with topicId=$FIRST_TOPIC_ID..."

    QUESTIONS_RESPONSE=$(curl -s "$BASE_URL/api/questions?topicId=$FIRST_TOPIC_ID&limit=5")

    # Check for success field
    if echo "$QUESTIONS_RESPONSE" | grep -q '"success":true'; then
        QUESTION_COUNT=$(echo $QUESTIONS_RESPONSE | grep -o '"id"' | wc -l)
        echo -e "${GREEN}✅ Questions endpoint working - Found questions${NC}"

        # Check if questions have options as arrays
        if echo "$QUESTIONS_RESPONSE" | grep -q '"options":\['; then
            echo -e "${GREEN}✅ Options are properly parsed as arrays${NC}"
        else
            echo -e "${YELLOW}⚠️  Options might not be arrays${NC}"
        fi
    else
        echo -e "${RED}❌ Questions endpoint failed${NC}"
        echo "Response: $QUESTIONS_RESPONSE"
    fi
else
    echo -e "${YELLOW}⚠️  No topic ID found, skipping questions test${NC}"
fi
echo ""

# Test 4: Check for common errors
echo "4️⃣  Checking for common issues..."

# Check if Prisma client is generated
if [ -d "node_modules/.prisma/client" ]; then
    echo -e "${GREEN}✅ Prisma client is generated${NC}"
else
    echo -e "${YELLOW}⚠️  Prisma client might not be generated. Run 'npx prisma generate'${NC}"
fi

# Check if database is accessible
if npx prisma db execute --stdin <<< "SELECT 1;" 2>/dev/null; then
    echo -e "${GREEN}✅ Database connection successful${NC}"
else
    echo -e "${YELLOW}⚠️  Could not verify database connection${NC}"
fi

echo ""
echo "============================"
echo "📋 Summary"
echo "============================"
echo ""
echo "If all tests passed, the Quiz Arena fixes are working!"
echo ""
echo "Next steps:"
echo "1. Open browser to http://localhost:3000"
echo "2. Navigate to Quiz Arena"
echo "3. Create a new quiz"
echo "4. Verify questions load without errors"
echo "5. Start a quiz session"
echo "6. Join as a participant"
echo "7. Verify questions are visible during live play"
echo ""
