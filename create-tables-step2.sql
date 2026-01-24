-- 🛠️ STEP 2: CREATE TABLES - Run this if UserNote doesn't exist
-- This creates the minimum required tables for Clinical Notes

BEGIN;

-- Create User table (required for foreign key)
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY,
  "clerkUserId" TEXT UNIQUE NOT NULL,
  "email" TEXT UNIQUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create UserNote table with ALL columns (including clinical notes fields)
CREATE TABLE IF NOT EXISTS "UserNote" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "title" TEXT,
  "content" TEXT NOT NULL,
  
  -- Legacy quiz/question fields
  "questionId" TEXT,
  "questionText" TEXT,
  "category" TEXT,
  
  -- NEW: Clinical evidence search fields
  "searchQuery" TEXT,
  "evidenceSummary" TEXT,
  "specialty" TEXT,
  "patientContext" TEXT,
  
  -- Organization
  "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Versioning
  "version" INTEGER NOT NULL DEFAULT 1,
  
  -- Timestamps
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  -- Foreign key
  CONSTRAINT "UserNote_userId_fkey" FOREIGN KEY ("userId") 
    REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "User_clerkUserId_idx" ON "User"("clerkUserId");
CREATE INDEX IF NOT EXISTS "User_createdAt_idx" ON "User"("createdAt");
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");

CREATE INDEX IF NOT EXISTS "UserNote_userId_idx" ON "UserNote"("userId");
CREATE INDEX IF NOT EXISTS "UserNote_searchQuery_idx" ON "UserNote"("searchQuery") 
    WHERE "searchQuery" IS NOT NULL;
CREATE INDEX IF NOT EXISTS "UserNote_specialty_idx" ON "UserNote"("specialty") 
    WHERE "specialty" IS NOT NULL;

COMMIT;

-- Verify tables were created
SELECT 'SUCCESS: Tables created!' as status;

SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_name IN ('User', 'UserNote')
ORDER BY table_name;

-- Show UserNote columns
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'UserNote'
ORDER BY ordinal_position;
