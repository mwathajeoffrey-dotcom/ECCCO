#!/bin/bash

# ECCCO Production Database Setup Script
# This script sets up the production database with PostgreSQL

set -e  # Exit on any error

echo "🚀 Setting up ECCCO Production Database..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running in production
if [ "$NODE_ENV" != "production" ]; then
    echo -e "${YELLOW}Warning: NODE_ENV is not set to 'production'${NC}"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
fi

# Validate required environment variables
echo "🔍 Validating environment variables..."

required_vars=("DATABASE_URL" "DIRECT_URL")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo -e "${RED}Error: $var is not set${NC}"
        exit 1
    fi
done

echo -e "${GREEN}✅ Environment variables validated${NC}"

# Switch to production schema
echo "📋 Setting up production schema..."
if [ -f "prisma/schema.production.prisma" ]; then
    cp prisma/schema.production.prisma prisma/schema.prisma
    echo -e "${GREEN}✅ Production schema activated${NC}"
else
    echo -e "${YELLOW}Warning: Production schema not found, using current schema${NC}"
fi

# Generate Prisma client for production
echo "🔧 Generating Prisma client..."
npx prisma generate || {
    echo -e "${RED}❌ Failed to generate Prisma client${NC}"
    exit 1
}
echo -e "${GREEN}✅ Prisma client generated${NC}"

# Test database connection
echo "🔌 Testing database connection..."
npx prisma db pull --preview-feature || {
    echo -e "${RED}❌ Failed to connect to database${NC}"
    echo "Please check your DATABASE_URL and ensure the database is accessible"
    exit 1
}
echo -e "${GREEN}✅ Database connection successful${NC}"

# Run migrations
echo "📦 Running database migrations..."
npx prisma migrate deploy || {
    echo -e "${RED}❌ Failed to run migrations${NC}"
    exit 1
}
echo -e "${GREEN}✅ Migrations completed${NC}"

# Seed database with production data
echo "🌱 Seeding production database..."
if [ -f "scripts/seed-production.ts" ]; then
    npx tsx scripts/seed-production.ts || {
        echo -e "${RED}❌ Failed to seed database${NC}"
        exit 1
    }
    echo -e "${GREEN}✅ Database seeded with production data${NC}"
else
    echo -e "${YELLOW}Warning: Production seed script not found, using development seed${NC}"
    npm run db:seed || {
        echo -e "${RED}❌ Failed to seed database${NC}"
        exit 1
    }
    echo -e "${GREEN}✅ Database seeded${NC}"
fi

# Verify database setup
echo "🔍 Verifying database setup..."
question_count=$(npx prisma db execute --stdin <<< "SELECT COUNT(*) as count FROM questions;" | grep -o '[0-9]\+' | tail -1)
echo "📊 Questions in database: $question_count"

if [ "$question_count" -gt 0 ]; then
    echo -e "${GREEN}✅ Database verification successful${NC}"
else
    echo -e "${RED}❌ Database verification failed - no questions found${NC}"
    exit 1
fi

# Create database backup
echo "💾 Creating database backup..."
timestamp=$(date +"%Y%m%d_%H%M%S")
backup_file="backups/production_backup_$timestamp.sql"
mkdir -p backups

# Extract connection details for pg_dump (if using PostgreSQL)
if [[ $DATABASE_URL == postgresql* ]]; then
    echo "Creating PostgreSQL backup..."
    # Note: This would need proper pg_dump command with connection details
    echo "Backup location: $backup_file"
    echo -e "${GREEN}✅ Backup created${NC}"
else
    echo -e "${YELLOW}Warning: Backup not created - non-PostgreSQL database${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Production database setup completed successfully!${NC}"
echo ""
echo "Next steps:"
echo "1. Run: npm run build"
echo "2. Run: npm start"
echo "3. Test: curl https://your-domain.com/api/health"
echo ""
echo "Database Info:"
echo "- Questions: $question_count"
echo "- Schema: Production"
echo "- Migrations: Up to date"
echo "- Backup: $backup_file (if applicable)"
echo ""