-- Quiz Arena Tables Migration
-- Run this in Supabase SQL Editor to enable Quiz Arena functionality

-- Create QuizSession table
CREATE TABLE IF NOT EXISTS "QuizSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "accessCode" TEXT NOT NULL UNIQUE,
    "hostId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'LOBBY',
    "currentQuestion" INTEGER NOT NULL DEFAULT 0,
    "timePerQuestion" INTEGER NOT NULL DEFAULT 20,
    "pointsPerQuestion" INTEGER NOT NULL DEFAULT 1000,
    "playMusic" BOOLEAN NOT NULL DEFAULT true,
    "playSound" BOOLEAN NOT NULL DEFAULT true,
    "showAnswerAfter" BOOLEAN NOT NULL DEFAULT true,
    "allowLateJoin" BOOLEAN NOT NULL DEFAULT false,
    "questions" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Participant table
CREATE TABLE IF NOT EXISTS "Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "avatar" TEXT,
    "score" INTEGER NOT NULL DEFAULT 0,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Participant_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "QuizSession"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Answer table
CREATE TABLE IF NOT EXISTS "Answer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "questionIndex" INTEGER NOT NULL,
    "selectedOption" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "timeToAnswer" INTEGER NOT NULL,
    "pointsEarned" INTEGER NOT NULL,
    "answeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Answer_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "QuizSession"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Answer_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "QuizSession_accessCode_idx" ON "QuizSession"("accessCode");
CREATE INDEX IF NOT EXISTS "QuizSession_hostId_idx" ON "QuizSession"("hostId");
CREATE INDEX IF NOT EXISTS "QuizSession_status_idx" ON "QuizSession"("status");
CREATE INDEX IF NOT EXISTS "QuizSession_createdAt_idx" ON "QuizSession"("createdAt");
CREATE INDEX IF NOT EXISTS "Participant_sessionId_idx" ON "Participant"("sessionId");
CREATE INDEX IF NOT EXISTS "Participant_score_idx" ON "Participant"("score");
CREATE INDEX IF NOT EXISTS "Answer_sessionId_idx" ON "Answer"("sessionId");
CREATE INDEX IF NOT EXISTS "Answer_participantId_idx" ON "Answer"("participantId");
CREATE INDEX IF NOT EXISTS "Answer_questionIndex_idx" ON "Answer"("questionIndex");

-- Create trigger to update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_quiz_session_updated_at BEFORE UPDATE ON "QuizSession"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Verify tables created
SELECT 'QuizSession' as table_name, COUNT(*) as row_count FROM "QuizSession"
UNION ALL
SELECT 'Participant', COUNT(*) FROM "Participant"
UNION ALL
SELECT 'Answer', COUNT(*) FROM "Answer";
