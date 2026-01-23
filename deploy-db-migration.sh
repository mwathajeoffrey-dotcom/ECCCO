#!/bin/bash

# 🚀 Production Database Migration - Clinical Notes Fields
# This script adds the new clinical evidence fields to the UserNote table in production

echo "🔄 Starting database migration..."
echo "Adding clinical evidence fields to UserNote table"

# Run Prisma migration
npx prisma migrate deploy

# Check if migration was successful
if [ $? -eq 0 ]; then
  echo "✅ Migration completed successfully!"
  echo ""
  echo "New fields added:"
  echo "  - searchQuery (TEXT)"
  echo "  - evidenceSummary (TEXT)"
  echo "  - specialty (TEXT)"
  echo "  - patientContext (TEXT)"
  echo "  - version (INTEGER, default 1)"
  echo ""
  echo "Indexes created:"
  echo "  - UserNote_searchQuery_idx"
  echo "  - UserNote_specialty_idx"
else
  echo "❌ Migration failed!"
  echo "Check the error above for details."
  exit 1
fi
