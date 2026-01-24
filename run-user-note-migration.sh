#!/bin/bash

# Run UserNote table creation migration
# This script applies the migration to create the UserNote table

echo "🔄 Creating UserNote table in database..."

# Read DATABASE_URL from .env.local
export DATABASE_URL=$(grep DATABASE_URL .env.local | cut -d'"' -f2)

if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: DATABASE_URL not found in .env.local"
  exit 1
fi

echo "✓ Database URL loaded"
echo "✓ Running migration: create-user-note-table.sql"

# Use psql to run the migration
psql "$DATABASE_URL" -f migrations/create-user-note-table.sql

if [ $? -eq 0 ]; then
  echo "✅ Migration completed successfully!"
  echo "✅ UserNote table created"
  echo ""
  echo "🧪 Now run the test: node test-notes-feature.js"
else
  echo "❌ Migration failed!"
  echo "💡 Try running the SQL manually in Supabase SQL Editor"
  exit 1
fi
