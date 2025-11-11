#!/bin/bash
# Direct Production Schema Alignment

echo "🎯 Aligning production Accelerate database schema..."

if [ -z "$ACCELERATE_URL" ]; then
    echo "❌ ACCELERATE_URL environment variable is required"
    echo "💡 Usage: ACCELERATE_URL='your_url' ./scripts/align-production-database.sh"
    exit 1
fi

echo "📋 Setting up temporary production schema..."

# Create temporary production schema file with ACCELERATE_URL
cp prisma/schema.production.prisma prisma/schema.temp.prisma

# Update the temporary schema to use ACCELERATE_URL
sed -i.bak 's|url      = env("DATABASE_URL")|url      = env("ACCELERATE_URL")|g' prisma/schema.temp.prisma
rm -f prisma/schema.temp.prisma.bak

echo "🔧 Generating Prisma client for production..."
PRISMA_SCHEMA_LOCATION=prisma/schema.temp.prisma npx prisma generate --accelerate --schema=prisma/schema.temp.prisma

echo "🗃️ Pushing schema to production database..."
PRISMA_SCHEMA_LOCATION=prisma/schema.temp.prisma npx prisma db push --force-reset --accelerate --schema=prisma/schema.temp.prisma

echo "🧹 Cleaning up..."
rm -f prisma/schema.temp.prisma

echo "✅ Production database schema alignment completed!"
echo "🧪 Testing production API..."

# Wait a moment for schema to propagate
sleep 10

# Test the production API
echo "🔍 Testing production modules API..."
curl -s "https://eccco.vercel.app/api/modules" | head -3