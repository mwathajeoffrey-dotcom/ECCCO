#!/bin/bash
# Quick Test Script for Clinical Evidence Synthesis System
# Run this to verify everything is working

echo "🧪 Clinical Evidence Synthesis - Quick Test"
echo "============================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check if Ollama is installed
echo "📦 Step 1: Checking Ollama installation..."
if command -v ollama &> /dev/null; then
    echo -e "${GREEN}✓ Ollama is installed${NC}"
else
    echo -e "${RED}✗ Ollama not found${NC}"
    echo "   Install with: brew install ollama"
    echo "   Or download from: https://ollama.ai/download"
    exit 1
fi

# Step 2: Check if Ollama is running
echo ""
echo "🔧 Step 2: Checking Ollama service..."
if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Ollama is running${NC}"
else
    echo -e "${YELLOW}⚠ Ollama is not running${NC}"
    echo "   Start with: ollama serve"
    echo "   Opening Ollama in background..."
    ollama serve > /dev/null 2>&1 &
    sleep 2

    if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Ollama started successfully${NC}"
    else
        echo -e "${RED}✗ Failed to start Ollama${NC}"
        exit 1
    fi
fi

# Step 3: Check if Meditron is installed
echo ""
echo "🤖 Step 3: Checking Meditron model..."
if ollama list | grep -q "meditron"; then
    echo -e "${GREEN}✓ Meditron is installed${NC}"
    ollama list | grep meditron
else
    echo -e "${YELLOW}⚠ Meditron not found${NC}"
    echo "   Installing meditron:7b-instruct..."
    echo "   This will download ~4.5GB, please wait..."
    ollama pull meditron:7b-instruct

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Meditron installed successfully${NC}"
    else
        echo -e "${RED}✗ Failed to install Meditron${NC}"
        exit 1
    fi
fi

# Step 4: Test Meditron with simple query
echo ""
echo "🧠 Step 4: Testing Meditron AI..."
echo "   Query: 'What is the first-line treatment for uncomplicated malaria?'"
echo ""

RESPONSE=$(ollama run meditron:7b-instruct "What is the first-line treatment for uncomplicated malaria? Answer in 2 sentences." 2>&1)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Meditron responded successfully${NC}"
    echo ""
    echo "Response:"
    echo "$RESPONSE" | head -n 5
    echo ""
else
    echo -e "${RED}✗ Meditron test failed${NC}"
    exit 1
fi

# Step 5: Check TypeScript files
echo ""
echo "📝 Step 5: Checking TypeScript files..."
FILES=(
    "src/lib/evidence/journal-database.ts"
    "src/lib/evidence/clinical-quality-scorer.ts"
    "src/lib/ai/meditron-client.ts"
    "src/lib/evidence/clinical-synthesis-engine.ts"
    "src/components/evidence/ClinicalSynthesisView.tsx"
    "src/app/api/evidence/synthesize/route.ts"
)

ALL_EXIST=true
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file (missing)"
        ALL_EXIST=false
    fi
done

if [ "$ALL_EXIST" = false ]; then
    echo -e "${RED}Some files are missing!${NC}"
    exit 1
fi

# Step 6: Check if Next.js dev server is running
echo ""
echo "🌐 Step 6: Checking Next.js dev server..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Next.js dev server is running${NC}"

    # Test synthesis API endpoint
    echo ""
    echo "🔬 Step 7: Testing synthesis API endpoint..."
    API_RESPONSE=$(curl -s http://localhost:3000/api/evidence/synthesize)

    if echo "$API_RESPONSE" | grep -q "Evidence Synthesis API"; then
        echo -e "${GREEN}✓ API endpoint responding correctly${NC}"
    else
        echo -e "${YELLOW}⚠ API endpoint exists but response unexpected${NC}"
        echo "Response: $API_RESPONSE"
    fi
else
    echo -e "${YELLOW}⚠ Next.js not running${NC}"
    echo "   Start with: npm run dev"
fi

# Summary
echo ""
echo "============================================"
echo "✅ SYSTEM CHECK COMPLETE"
echo "============================================"
echo ""
echo "All components are ready! 🎉"
echo ""
echo "Next steps:"
echo "1. If Next.js isn't running: npm run dev"
echo "2. Open http://localhost:3000/evidence-search"
echo "3. Try a query like: 'treatment for uncomplicated malaria'"
echo ""
echo "For full setup guide, see:"
echo "  CLINICAL_SYNTHESIS_SETUP_GUIDE.md"
echo ""
