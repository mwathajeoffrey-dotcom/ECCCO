#!/bin/bash
# Production Schema Setup Script for Vercel Builds

echo "🔧 Setting up production schema for Vercel build..."

# Copy production schema
echo "📋 Copying production schema..."
cp prisma/schema.production.prisma prisma/schema.prisma

# Update schema to use ACCELERATE_URL if it exists
if [ ! -z "$ACCELERATE_URL" ]; then
    echo "🔗 Configuring schema to use ACCELERATE_URL..."
    sed -i.bak 's|url      = env("DATABASE_URL")|url      = env("ACCELERATE_URL")|g' prisma/schema.prisma
    rm -f prisma/schema.prisma.bak
fi

# Generate Prisma client
echo "🏗️ Generating Prisma client..."
npx prisma generate

echo "✅ Production schema setup completed!"