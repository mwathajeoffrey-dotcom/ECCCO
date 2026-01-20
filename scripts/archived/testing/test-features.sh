#!/bin/bash

# 🧪 Comprehensive Feature Testing Script
# Tests all 3 implemented features:
# 1. Caching Layer
# 2. Clinical Decision Support
# 3. Patient-Specific Customization

API_URL="http://localhost:3000/api/evidence/synthesize"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║       🧪 TESTING PHASE 1 FEATURES                           ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  TEST 1: ⚡ CACHING LAYER"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}🔍 First Request (should be CACHE MISS)...${NC}"
echo "Query: 'management of diabetic ketoacidosis'"
echo ""

START1=$(date +%s%3N)
RESPONSE1=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "management of diabetic ketoacidosis",
    "maxArticles": 10
  }')
END1=$(date +%s%3N)
DURATION1=$((END1 - START1))

echo "✅ First request completed in ${DURATION1}ms"
echo ""

# Check if cached field exists
CACHED1=$(echo "$RESPONSE1" | grep -o '"cached":[^,}]*' | head -1)
echo "Cache status: $CACHED1"
echo ""

echo "Waiting 2 seconds before second request..."
sleep 2

echo ""
echo -e "${BLUE}🔍 Second Request (should be CACHE HIT)...${NC}"
echo "Query: 'management of diabetic ketoacidosis' (same query)"
echo ""

START2=$(date +%s%3N)
RESPONSE2=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "management of diabetic ketoacidosis",
    "maxArticles": 10
  }')
END2=$(date +%s%3N)
DURATION2=$((END2 - START2))

echo "✅ Second request completed in ${DURATION2}ms"
echo ""

CACHED2=$(echo "$RESPONSE2" | grep -o '"cached":[^,}]*' | head -1)
echo "Cache status: $CACHED2"
echo ""

# Calculate speed improvement
if [ $DURATION2 -gt 0 ]; then
  SPEEDUP=$((DURATION1 / DURATION2))
  echo -e "${GREEN}🚀 Speed improvement: ${SPEEDUP}x faster!${NC}"
else
  echo -e "${GREEN}🚀 Second request was nearly instant!${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  TEST 2: 🎯 CLINICAL DECISION SUPPORT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}🔍 Requesting clinical protocol...${NC}"
echo "Query: 'management of septic shock'"
echo "Include Decision Support: true"
echo ""

START3=$(date +%s%3N)
RESPONSE3=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "management of septic shock",
    "includeDecisionSupport": true,
    "maxArticles": 10
  }')
END3=$(date +%s%3N)
DURATION3=$((END3 - START3))

echo "✅ Request completed in ${DURATION3}ms"
echo ""

# Check if decision support was generated
HAS_DECISION=$(echo "$RESPONSE3" | grep -o '"decisionSupport"' | head -1)
if [ -n "$HAS_DECISION" ]; then
  echo -e "${GREEN}✅ Decision Support Generated!${NC}"

  # Extract protocol title
  TITLE=$(echo "$RESPONSE3" | grep -o '"title":"[^"]*"' | head -1 | cut -d'"' -f4)
  echo "Protocol: $TITLE"

  # Count steps
  STEP_COUNT=$(echo "$RESPONSE3" | grep -o '"step-[0-9]*"' | wc -l)
  echo "Number of steps: $STEP_COUNT"

  # Check for dosages
  HAS_DOSAGE=$(echo "$RESPONSE3" | grep -o '"dosage"' | head -1)
  if [ -n "$HAS_DOSAGE" ]; then
    echo -e "${GREEN}✅ Specific dosages included${NC}"
  fi

  # Check for timeframes
  HAS_TIMEFRAME=$(echo "$RESPONSE3" | grep -o '"timeframe"' | head -1)
  if [ -n "$HAS_TIMEFRAME" ]; then
    echo -e "${GREEN}✅ Timeframes included${NC}"
  fi
else
  echo -e "${YELLOW}⚠️  Decision Support not found in response${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  TEST 3: 👤 PATIENT-SPECIFIC CUSTOMIZATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}🔍 Testing pediatric patient with renal impairment...${NC}"
echo "Query: 'antibiotic therapy for pneumonia'"
echo "Patient: 5 years old, 20 kg, CrCl 40 mL/min, penicillin allergy"
echo ""

START4=$(date +%s%3N)
RESPONSE4=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "antibiotic therapy for pneumonia",
    "includeDecisionSupport": true,
    "patientContext": {
      "ageYears": 5,
      "weightKg": 20,
      "creatinineClearance": 40,
      "renalFunction": "moderate",
      "allergies": ["penicillin"]
    },
    "maxArticles": 10
  }')
END4=$(date +%s%3N)
DURATION4=$((END4 - START4))

echo "✅ Request completed in ${DURATION4}ms"
echo ""

# Check if patient context was used
HAS_PATIENT=$(echo "$RESPONSE4" | grep -o '"patientContext"' | head -1)
if [ -n "$HAS_PATIENT" ]; then
  echo -e "${GREEN}✅ Patient Context Applied!${NC}"

  # Check for patient considerations
  HAS_CONSIDERATIONS=$(echo "$RESPONSE4" | grep -o '"patientConsiderations"' | head -1)
  if [ -n "$HAS_CONSIDERATIONS" ]; then
    echo -e "${GREEN}✅ Patient considerations generated${NC}"

    # Look for pediatric warning
    if echo "$RESPONSE4" | grep -qi "pediatric"; then
      echo -e "${GREEN}✅ Pediatric-specific recommendations detected${NC}"
    fi

    # Look for renal adjustment
    if echo "$RESPONSE4" | grep -qi "renal"; then
      echo -e "${GREEN}✅ Renal impairment warnings detected${NC}"
    fi

    # Look for allergy mention
    if echo "$RESPONSE4" | grep -qi "penicillin\|allerg"; then
      echo -e "${GREEN}✅ Drug allergy consideration detected${NC}"
    fi
  fi
else
  echo -e "${YELLOW}⚠️  Patient Context not found in response${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  TEST 4: 🤰 PREGNANCY-SPECIFIC CUSTOMIZATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}🔍 Testing pregnant patient...${NC}"
echo "Query: 'treatment of hypertension'"
echo "Patient: 28 years old, trimester 2"
echo ""

START5=$(date +%s%3N)
RESPONSE5=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "treatment of hypertension",
    "includeDecisionSupport": true,
    "patientContext": {
      "ageYears": 28,
      "pregnancyStatus": "trimester-2"
    },
    "maxArticles": 10
  }')
END5=$(date +%s%3N)
DURATION5=$((END5 - START5))

echo "✅ Request completed in ${DURATION5}ms"
echo ""

# Check for pregnancy considerations
if echo "$RESPONSE5" | grep -qi "pregnan\|fetal\|trimester"; then
  echo -e "${GREEN}✅ Pregnancy-specific recommendations detected${NC}"
else
  echo -e "${YELLOW}⚠️  Pregnancy considerations not detected${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📊 TEST SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Performance:"
echo "  - First request (uncached): ${DURATION1}ms"
echo "  - Second request (cached): ${DURATION2}ms"
echo "  - Decision support: ${DURATION3}ms"
echo "  - Pediatric patient: ${DURATION4}ms"
echo "  - Pregnant patient: ${DURATION5}ms"
echo ""

echo "Feature Status:"
if [ $DURATION2 -lt $((DURATION1 / 10)) ]; then
  echo -e "  ${GREEN}✅ Caching: WORKING (significant speed improvement)${NC}"
else
  echo -e "  ${YELLOW}⚠️  Caching: May not be working optimally${NC}"
fi

if [ -n "$HAS_DECISION" ]; then
  echo -e "  ${GREEN}✅ Decision Support: WORKING${NC}"
else
  echo -e "  ${YELLOW}⚠️  Decision Support: Check logs${NC}"
fi

if [ -n "$HAS_PATIENT" ]; then
  echo -e "  ${GREEN}✅ Patient Context: WORKING${NC}"
else
  echo -e "  ${YELLOW}⚠️  Patient Context: Check logs${NC}"
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║       ✅ TESTING COMPLETE                                   ║"
echo "║                                                              ║"
echo "║  Check the terminal running 'npm run dev' for detailed      ║"
echo "║  logs showing [Cache], [Decision Support], and              ║"
echo "║  [Strategic Search] messages.                               ║"
echo "╚══════════════════════════════════════════════════════════════╝"
