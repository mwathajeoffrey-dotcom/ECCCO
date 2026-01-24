#!/bin/bash

# Direct Supabase Migration Runner
# Run this script to manually apply the migration to your Supabase database

echo "🔧 Supabase Direct Migration - Clinical Notes Columns"
echo "======================================================"
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not found in environment"
    echo ""
    echo "To get your Supabase DATABASE_URL:"
    echo "1. Go to: https://supabase.com/dashboard/project/YOUR_PROJECT"
    echo "2. Click: Settings → Database"
    echo "3. Scroll to: Connection String → URI"
    echo "4. Copy the connection string"
    echo "5. Replace [YOUR-PASSWORD] with your actual database password"
    echo ""
    echo "Then run:"
    echo "  export DATABASE_URL='postgresql://postgres:[YOUR-PASSWORD]@...'"
    echo "  ./run-supabase-migration.sh"
    exit 1
fi

echo "✅ DATABASE_URL found"
echo ""

# Show what we're about to do
echo "📋 This script will:"
echo "   1. Check if clinical notes columns exist"
echo "   2. Add missing columns if needed"
echo "   3. Create indexes for performance"
echo "   4. Verify the changes"
echo ""

read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
fi

echo ""
echo "🚀 Running migration..."
echo ""

# Create a temporary SQL file
cat > /tmp/clinical_notes_migration.sql << 'EOF'
-- Clinical Notes Migration for Supabase
-- Add columns for evidence-based note-taking

BEGIN;

-- Check and add searchQuery column
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'UserNote' AND column_name = 'searchQuery'
    ) THEN
        ALTER TABLE "UserNote" ADD COLUMN "searchQuery" TEXT;
        RAISE NOTICE 'Added column: searchQuery';
    ELSE
        RAISE NOTICE 'Column already exists: searchQuery';
    END IF;
END $$;

-- Check and add evidenceSummary column
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'UserNote' AND column_name = 'evidenceSummary'
    ) THEN
        ALTER TABLE "UserNote" ADD COLUMN "evidenceSummary" TEXT;
        RAISE NOTICE 'Added column: evidenceSummary';
    ELSE
        RAISE NOTICE 'Column already exists: evidenceSummary';
    END IF;
END $$;

-- Check and add specialty column
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'UserNote' AND column_name = 'specialty'
    ) THEN
        ALTER TABLE "UserNote" ADD COLUMN "specialty" TEXT;
        RAISE NOTICE 'Added column: specialty';
    ELSE
        RAISE NOTICE 'Column already exists: specialty';
    END IF;
END $$;

-- Check and add patientContext column
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'UserNote' AND column_name = 'patientContext'
    ) THEN
        ALTER TABLE "UserNote" ADD COLUMN "patientContext" TEXT;
        RAISE NOTICE 'Added column: patientContext';
    ELSE
        RAISE NOTICE 'Column already exists: patientContext';
    END IF;
END $$;

-- Check and add version column
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'UserNote' AND column_name = 'version'
    ) THEN
        ALTER TABLE "UserNote" ADD COLUMN "version" INTEGER NOT NULL DEFAULT 1;
        RAISE NOTICE 'Added column: version';
    ELSE
        RAISE NOTICE 'Column already exists: version';
    END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "UserNote_searchQuery_idx"
    ON "UserNote"("searchQuery")
    WHERE "searchQuery" IS NOT NULL;

CREATE INDEX IF NOT EXISTS "UserNote_specialty_idx"
    ON "UserNote"("specialty")
    WHERE "specialty" IS NOT NULL;

-- Update existing records to have version 1
UPDATE "UserNote" SET "version" = 1 WHERE "version" IS NULL;

COMMIT;

-- Verify the migration
SELECT
    'Column: ' || column_name || ' | Type: ' || data_type || ' | Nullable: ' || is_nullable as info
FROM information_schema.columns
WHERE table_name = 'UserNote'
  AND column_name IN ('searchQuery', 'evidenceSummary', 'specialty', 'patientContext', 'version')
ORDER BY column_name;
EOF

# Run the migration
psql "$DATABASE_URL" -f /tmp/clinical_notes_migration.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Migration completed successfully!"
    echo ""
    echo "📊 Verification:"
    echo "   Run this to confirm columns exist:"
    echo "   psql \"\$DATABASE_URL\" -c \"SELECT column_name FROM information_schema.columns WHERE table_name = 'UserNote' AND column_name IN ('searchQuery', 'evidenceSummary', 'specialty', 'patientContext', 'version');\""
    echo ""
    echo "🎉 You can now test Clinical Notes in production!"
    echo "   Go to: https://eccco.vercel.app"
    echo "   Try saving a note - should work now!"
else
    echo ""
    echo "❌ Migration failed!"
    echo ""
    echo "Troubleshooting:"
    echo "1. Check your DATABASE_URL is correct"
    echo "2. Ensure you have ALTER TABLE permissions"
    echo "3. Check Supabase dashboard for errors"
    echo "4. Try running the SQL manually in Supabase SQL Editor"
    echo ""
    echo "SQL file location: /tmp/clinical_notes_migration.sql"
    echo "You can copy this and run it in Supabase dashboard → SQL Editor"
fi

# Cleanup
rm -f /tmp/clinical_notes_migration.sql
