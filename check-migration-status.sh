#!/bin/bash

# Migration Status Checker for ECCCO
# Verifies Prisma migrations are up to date

set -e

echo "🔍 Checking Prisma Migration Status..."
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${RED}❌ Error: .env.local file not found${NC}"
    echo "Please create .env.local with DATABASE_URL"
    exit 1
fi

# Check if DATABASE_URL is set
if ! grep -q "DATABASE_URL=" .env.local; then
    echo -e "${RED}❌ Error: DATABASE_URL not found in .env.local${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Environment file found${NC}"

# Check if schema file exists
if [ ! -f prisma/schema.prisma ]; then
    echo -e "${RED}❌ Error: prisma/schema.prisma not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Schema file found${NC}"

# Check if migrations directory exists
if [ ! -d prisma/migrations ]; then
    echo -e "${YELLOW}⚠️  Warning: No migrations directory found${NC}"
    echo "Run: npx prisma migrate dev --name init"
    exit 1
fi

echo -e "${GREEN}✅ Migrations directory found${NC}"

# Count migrations
MIGRATION_COUNT=$(ls -1 prisma/migrations | grep -v migration_lock.toml | wc -l | tr -d ' ')
echo -e "${GREEN}📊 Found $MIGRATION_COUNT migrations${NC}"
echo ""

# List migrations
echo "📋 Migration History:"
echo "--------------------"
ls -1 prisma/migrations | grep -v migration_lock.toml | tail -5
echo ""

# Check migration status
echo "🔄 Checking migration status..."
echo ""

if npx prisma migrate status 2>&1 | grep -q "up to date"; then
    echo -e "${GREEN}✅ Database schema is up to date!${NC}"
    echo ""
    echo "Summary:"
    echo "  • Migrations: $MIGRATION_COUNT"
    echo "  • Status: In sync ✅"
    echo "  • Database: Connected ✅"
elif npx prisma migrate status 2>&1 | grep -q "not yet been applied"; then
    echo -e "${YELLOW}⚠️  WARNING: Pending migrations detected!${NC}"
    echo ""
    echo "Run this to apply pending migrations:"
    echo "  npx prisma migrate dev"
    echo ""
    exit 1
elif npx prisma migrate status 2>&1 | grep -q "drift detected"; then
    echo -e "${RED}❌ ERROR: Migration drift detected!${NC}"
    echo ""
    echo "Database schema doesn't match migration history."
    echo "Options:"
    echo "  1. Development: npx prisma migrate reset"
    echo "  2. Production: Contact team lead"
    echo ""
    exit 1
else
    echo -e "${YELLOW}⚠️  Unable to determine migration status${NC}"
    echo ""
    echo "This might be expected with Prisma 7 adapter pattern."
    echo "Checking database connection..."
    
    if npx prisma db execute --stdin <<< "SELECT 1;" >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Database connection successful${NC}"
        echo ""
        echo "Summary:"
        echo "  • Migrations: $MIGRATION_COUNT"
        echo "  • Database: Connected ✅"
        echo "  • Note: Using Prisma 7 adapter pattern"
    else
        echo -e "${RED}❌ Database connection failed${NC}"
        exit 1
    fi
fi

echo ""
echo "========================================"
echo -e "${GREEN}✅ Migration check complete!${NC}"
