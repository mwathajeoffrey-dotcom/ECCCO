-- Create UserNote table to match Prisma schema
-- This migration creates the table that Prisma expects

-- First, drop the old clinical_notes table if it exists
DROP TABLE IF EXISTS clinical_notes CASCADE;

-- Create the UserNote table (matches Prisma schema exactly)
CREATE TABLE IF NOT EXISTS "UserNote" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  
  -- Quiz/Question related (legacy)
  "questionId" TEXT,
  "questionText" TEXT,
  category TEXT,
  
  -- Clinical Evidence Search related
  "searchQuery" TEXT,
  "evidenceSummary" TEXT,
  specialty TEXT,
  "patientContext" TEXT,
  
  -- Organization
  tags TEXT[] DEFAULT '{}',
  
  -- Versioning
  version INTEGER DEFAULT 1,
  
  -- Timestamps
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  
  -- Foreign key constraint
  CONSTRAINT "UserNote_userId_fkey" FOREIGN KEY ("userId") 
    REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes (matches Prisma schema)
CREATE INDEX IF NOT EXISTS "UserNote_userId_idx" ON "UserNote"("userId");
CREATE INDEX IF NOT EXISTS "UserNote_createdAt_idx" ON "UserNote"("createdAt");
CREATE INDEX IF NOT EXISTS "UserNote_category_idx" ON "UserNote"("category");
CREATE INDEX IF NOT EXISTS "UserNote_searchQuery_idx" ON "UserNote"("searchQuery");
CREATE INDEX IF NOT EXISTS "UserNote_specialty_idx" ON "UserNote"("specialty");

-- Trigger to auto-update updatedAt
CREATE OR REPLACE FUNCTION update_user_note_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_note_timestamp
  BEFORE UPDATE ON "UserNote"
  FOR EACH ROW
  EXECUTE FUNCTION update_user_note_updated_at();

-- Comments
COMMENT ON TABLE "UserNote" IS 'User notes from quiz questions and evidence searches';
COMMENT ON COLUMN "UserNote"."userId" IS 'References User.id (Clerk user ID)';
COMMENT ON COLUMN "UserNote"."searchQuery" IS 'Evidence search query that prompted this note';
COMMENT ON COLUMN "UserNote"."evidenceSummary" IS 'AI-generated evidence synthesis';
COMMENT ON COLUMN "UserNote".tags IS 'User-defined tags for organization';
