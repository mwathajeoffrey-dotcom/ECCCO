#!/bin/bash

# Environment Variables Checker for ECCCO
# Verifies all required env vars are set

echo "🔍 Checking ECCCO Environment Variables..."
echo "==========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track status
MISSING=0
PRESENT=0

# Function to check env var
check_env() {
    local var_name=$1
    local is_required=$2
    local description=$3

    if [ -n "${!var_name}" ]; then
        echo -e "${GREEN}✅${NC} $var_name - $description"
        ((PRESENT++))
    else
        if [ "$is_required" = "required" ]; then
            echo -e "${RED}❌${NC} $var_name - $description ${RED}(REQUIRED!)${NC}"
            ((MISSING++))
        else
            echo -e "${YELLOW}⚠️${NC}  $var_name - $description (optional)"
        fi
    fi
}

echo "Required Variables:"
echo "-------------------"
check_env "DATABASE_URL" "required" "Supabase database connection"
check_env "CLERK_SECRET_KEY" "required" "Clerk authentication secret"
check_env "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" "required" "Clerk public key"
check_env "GROQ_API_KEY" "required" "Groq AI for evidence synthesis"

echo ""
echo "Optional Variables:"
echo "-------------------"
check_env "REDIS_URL" "optional" "Redis caching (faster searches)"
check_env "NEXT_PUBLIC_SENTRY_DSN" "optional" "Sentry error tracking"
check_env "SENTRY_AUTH_TOKEN" "optional" "Sentry source maps"
check_env "SENTRY_ORG" "optional" "Sentry organization"
check_env "SENTRY_PROJECT" "optional" "Sentry project"

echo ""
echo "==========================================="

if [ $MISSING -eq 0 ]; then
    echo -e "${GREEN}✅ All required environment variables are set!${NC}"
    echo ""
    echo "Summary:"
    echo "  • Required: $((PRESENT - (5 - MISSING)))/4 present"
    echo "  • Optional: Available features depend on optional vars"
    echo ""
    echo "Status: ${GREEN}READY FOR PRODUCTION${NC}"
else
    echo -e "${RED}❌ Missing $MISSING required environment variable(s)!${NC}"
    echo ""
    echo "CRITICAL ISSUES:"
    echo "  • Add missing variables to .env.local (development)"
    echo "  • Add missing variables to Vercel dashboard (production)"
    echo ""
    echo "Production Deployment:"
    echo "  1. Go to: https://vercel.com/mwathajeoffrey-dotcoms-projects/eccco/settings/environment-variables"
    echo "  2. Add each missing variable"
    echo "  3. Redeploy application"
    echo ""
    echo "Status: ${RED}NOT READY FOR PRODUCTION${NC}"
    exit 1
fi

# Additional checks
echo ""
echo "Additional Checks:"
echo "------------------"

# Check if .env.local exists
if [ -f .env.local ]; then
    echo -e "${GREEN}✅${NC} .env.local file exists"
else
    echo -e "${YELLOW}⚠️${NC}  .env.local file not found (create from .env.example)"
fi

# Check if running on Vercel
if [ -n "$VERCEL" ]; then
    echo -e "${GREEN}✅${NC} Running on Vercel (production/preview)"
else
    echo -e "${YELLOW}ℹ️${NC}  Running locally (development)"
fi

echo ""
echo "For detailed setup instructions, see:"
echo "  • docs/ENVIRONMENT_VARIABLES.md"
echo "  • URGENT_FIX_AI_SYNTHESIS.md (if AI synthesis not working)"
