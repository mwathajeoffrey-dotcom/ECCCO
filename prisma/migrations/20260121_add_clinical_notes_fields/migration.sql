-- Add clinical evidence fields to UserNote table
-- Migration: add_clinical_evidence_fields_to_user_note

-- Add new columns for clinical note-taking
ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "searchQuery" TEXT;
ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "evidenceSummary" TEXT;
ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "specialty" TEXT;
ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "patientContext" TEXT;
ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "version" INTEGER NOT NULL DEFAULT 1;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS "UserNote_searchQuery_idx" ON "UserNote"("searchQuery") WHERE "searchQuery" IS NOT NULL;
CREATE INDEX IF NOT EXISTS "UserNote_specialty_idx" ON "UserNote"("specialty") WHERE "specialty" IS NOT NULL;

-- Update existing records to have version 1
UPDATE "UserNote" SET "version" = 1 WHERE "version" IS NULL;
