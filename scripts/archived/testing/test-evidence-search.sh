#!/usr/bin/env bash
#
# Test Evidence Search Locally
#

set -e

echo "🔧 Testing Evidence Search System"
echo "=================================="
echo

# 1. Check env
echo "1️⃣  Checking environment..."
if grep -q "GROQ_API_KEY" .env.local 2>/dev/null; then
  echo "✅ GROQ_API_KEY found in .env.local"
else
  echo "❌ GROQ_API_KEY not found in .env.local"
  echo "   Please add your Groq API key to .env.local"
  exit 1
fi
echo

# 2. Check if server is running
echo "2️⃣  Checking if Next.js is running on port 3000..."
if lsof -nP -iTCP:3000 -sTCP:LISTEN &>/dev/null; then
  echo "✅ Server is running"
else
  echo "⚠️  No server running on port 3000"
  echo "   Starting server now..."
  echo "   Press Ctrl+C to stop the server when done testing"
  echo
  npm run dev
  exit 0
fi
echo

# 3. Test API
echo "3️⃣  Testing evidence synthesis API..."
echo "   Query: treatment of acute coronary syndrome"
echo "   This may take 15-30 seconds..."
echo

curl -s -X POST http://localhost:3000/api/evidence/synthesize \
  -H "Content-Type: application/json" \
  -d '{
    "query": "treatment of acute coronary syndrome",
    "useAI": true,
    "minQualityScore": 50,
    "maxArticles": 6
  }' \
  --max-time 60 > /tmp/test_synthesis.json

# Check if successful
if [ -s /tmp/test_synthesis.json ]; then
  if jq -e '.sections' /tmp/test_synthesis.json &>/dev/null; then
    echo "✅ Synthesis successful!"
    echo
    echo "📊 Results:"
    echo "   Sections: $(jq '.sections | length' /tmp/test_synthesis.json)"
    echo "   References: $(jq '.references | length' /tmp/test_synthesis.json)"
    echo "   Confidence: $(jq '.metadata.confidenceScore' /tmp/test_synthesis.json)%"
    echo "   Used AI: $(jq '.metadata.usedAI' /tmp/test_synthesis.json)"
    echo
    echo "📝 Section headings:"
    jq -r '.sections[].heading' /tmp/test_synthesis.json | sed 's/^/   - /'
    echo
    echo "✅ Evidence search is working perfectly!"
    echo
    echo "🌐 Open in browser: http://localhost:3000/evidence-search"
  else
    echo "❌ Synthesis failed"
    echo "Error response:"
    jq '.' /tmp/test_synthesis.json || cat /tmp/test_synthesis.json
  fi
else
  echo "❌ No response from API"
fi
echo
