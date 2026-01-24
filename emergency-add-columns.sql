-- EMERGENCY FIX: Add Clinical Notes Columns Directly
-- Run this SQL directly on your production database if Vercel migration hasn't run yet

-- Check if columns exist first
DO $$
BEGIN
    -- Add searchQuery column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'UserNote' AND column_name = 'searchQuery'
    ) THEN
        ALTER TABLE "UserNote" ADD COLUMN "searchQuery" TEXT;
        RAISE NOTICE 'Added column: searchQuery';
    ELSE
        RAISE NOTICE 'Column already exists: searchQuery';
    END IF;

    -- Add evidenceSummary column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'UserNote' AND column_name = 'evidenceSummary'
    ) THEN
        ALTER TABLE "UserNote" ADD COLUMN "evidenceSummary" TEXT;
        RAISE NOTICE 'Added column: evidenceSummary';
    ELSE
        RAISE NOTICE 'Column already exists: evidenceSummary';
    END IF;

    -- Add specialty column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'UserNote' AND column_name = 'specialty'
    ) THEN
        ALTER TABLE "UserNote" ADD COLUMN "specialty" TEXT;
        RAISE NOTICE 'Added column: specialty';
    ELSE
        RAISE NOTICE 'Column already exists: specialty';
    END IF;

    -- Add patientContext column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'UserNote' AND column_name = 'patientContext'
    ) THEN
        ALTER TABLE "UserNote" ADD COLUMN "patientContext" TEXT;
        RAISE NOTICE 'Added column: patientContext';
    ELSE
        RAISE NOTICE 'Column already exists: patientContext';
    END IF;

    -- Add version column
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

-- Create indexes (safe - only creates if doesn't exist)
CREATE INDEX IF NOT EXISTS "UserNote_searchQuery_idx" ON "UserNote"("searchQuery") WHERE "searchQuery" IS NOT NULL;
CREATE INDEX IF NOT EXISTS "UserNote_specialty_idx" ON "UserNote"("specialty") WHERE "specialty" IS NOT NULL;

-- Update existing records
UPDATE "UserNote" SET "version" = 1 WHERE "version" IS NULL;

-- Verify columns were added
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'UserNote'
  AND column_name IN ('searchQuery', 'evidenceSummary', 'specialty', 'patientContext', 'version')
ORDER BY column_name;

-- You should see 5 rows returned
