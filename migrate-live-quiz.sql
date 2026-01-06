-- Live Quiz Database Migration
-- Run this in Supabase SQL Editor

-- Create LiveQuizSession table
CREATE TABLE IF NOT EXISTS "LiveQuizSession" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "accessCode" TEXT UNIQUE NOT NULL,
  "hostId" TEXT NOT NULL,
  "topicId" TEXT NOT NULL,
  "questionIds" TEXT NOT NULL,
  "currentQuestionIndex" INTEGER DEFAULT 0 NOT NULL,
  "status" TEXT DEFAULT 'WAITING' NOT NULL,
  "settings" TEXT,
  "startedAt" TIMESTAMP WITH TIME ZONE,
  "endedAt" TIMESTAMP WITH TIME ZONE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create indexes for LiveQuizSession
CREATE INDEX IF NOT EXISTS "LiveQuizSession_hostId_idx" ON "LiveQuizSession"("hostId");
CREATE INDEX IF NOT EXISTS "LiveQuizSession_topicId_idx" ON "LiveQuizSession"("topicId");
CREATE INDEX IF NOT EXISTS "LiveQuizSession_accessCode_idx" ON "LiveQuizSession"("accessCode");
CREATE INDEX IF NOT EXISTS "LiveQuizSession_status_idx" ON "LiveQuizSession"("status");
CREATE INDEX IF NOT EXISTS "LiveQuizSession_createdAt_idx" ON "LiveQuizSession"("createdAt");

-- Create LiveQuizParticipant table
CREATE TABLE IF NOT EXISTS "LiveQuizParticipant" (
  "id" TEXT PRIMARY KEY,
  "sessionId" TEXT NOT NULL,
  "userId" TEXT,
  "nickname" TEXT NOT NULL,
  "score" INTEGER DEFAULT 0 NOT NULL,
  "joinedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  "leftAt" TIMESTAMP WITH TIME ZONE,
  "isActive" BOOLEAN DEFAULT TRUE NOT NULL,
  CONSTRAINT "LiveQuizParticipant_sessionId_fkey"
    FOREIGN KEY ("sessionId")
    REFERENCES "LiveQuizSession"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Create indexes for LiveQuizParticipant
CREATE INDEX IF NOT EXISTS "LiveQuizParticipant_sessionId_idx" ON "LiveQuizParticipant"("sessionId");
CREATE INDEX IF NOT EXISTS "LiveQuizParticipant_userId_idx" ON "LiveQuizParticipant"("userId");
CREATE INDEX IF NOT EXISTS "LiveQuizParticipant_joinedAt_idx" ON "LiveQuizParticipant"("joinedAt");

-- Create LiveQuizAnswer table
CREATE TABLE IF NOT EXISTS "LiveQuizAnswer" (
  "id" TEXT PRIMARY KEY,
  "sessionId" TEXT NOT NULL,
  "participantId" TEXT NOT NULL,
  "questionId" TEXT NOT NULL,
  "questionIndex" INTEGER NOT NULL,
  "selectedAnswer" INTEGER NOT NULL,
  "isCorrect" BOOLEAN NOT NULL,
  "timeToAnswer" INTEGER,
  "answeredAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  CONSTRAINT "LiveQuizAnswer_sessionId_fkey"
    FOREIGN KEY ("sessionId")
    REFERENCES "LiveQuizSession"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT "LiveQuizAnswer_participantId_fkey"
    FOREIGN KEY ("participantId")
    REFERENCES "LiveQuizParticipant"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT "LiveQuizAnswer_sessionId_participantId_questionIndex_key"
    UNIQUE ("sessionId", "participantId", "questionIndex")
);

-- Create indexes for LiveQuizAnswer
CREATE INDEX IF NOT EXISTS "LiveQuizAnswer_sessionId_idx" ON "LiveQuizAnswer"("sessionId");
CREATE INDEX IF NOT EXISTS "LiveQuizAnswer_participantId_idx" ON "LiveQuizAnswer"("participantId");
CREATE INDEX IF NOT EXISTS "LiveQuizAnswer_questionId_idx" ON "LiveQuizAnswer"("questionId");

-- Verify tables created
SELECT
  tablename,
  schemaname
FROM pg_tables
WHERE schemaname = 'public'
AND tablename LIKE 'Live%'
ORDER BY tablename;
