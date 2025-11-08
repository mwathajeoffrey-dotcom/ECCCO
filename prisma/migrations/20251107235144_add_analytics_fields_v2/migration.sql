/*
  Warnings:

  - Added the required column `topicName` to the `ExamSession` table without a default value. This is not possible if the table is not empty.

*/
-- First, let's add topicName with a default value, then update it
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExamSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "sessionId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "topicName" TEXT NOT NULL DEFAULT 'Unknown Topic',
    "questions" TEXT NOT NULL,
    "questionsData" TEXT,
    "answers" TEXT NOT NULL,
    "answersData" TEXT,
    "score" INTEGER,
    "totalQuestions" INTEGER NOT NULL DEFAULT 0,
    "correctAnswers" INTEGER NOT NULL DEFAULT 0,
    "totalTime" INTEGER,
    "timeSpent" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" DATETIME,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ExamSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ExamSession_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Copy existing data with topic names from Topic table
INSERT INTO "new_ExamSession" (
    "id", "userId", "sessionId", "topicId", "topicName", "questions", "answers", 
    "score", "totalQuestions", "correctAnswers", "totalTime", "completed", 
    "createdAt", "updatedAt"
) 
SELECT 
    e."id", e."userId", e."sessionId", e."topicId", 
    COALESCE(t."name", 'Unknown Topic') as "topicName",
    e."questions", e."answers", e."score", e."totalQuestions", 
    e."correctAnswers", e."totalTime", e."completed", e."createdAt", e."updatedAt"
FROM "ExamSession" e
LEFT JOIN "Topic" t ON e."topicId" = t."id";

DROP TABLE "ExamSession";
ALTER TABLE "new_ExamSession" RENAME TO "ExamSession";
CREATE INDEX "ExamSession_userId_idx" ON "ExamSession"("userId");
CREATE INDEX "ExamSession_topicId_idx" ON "ExamSession"("topicId");
CREATE INDEX "ExamSession_sessionId_idx" ON "ExamSession"("sessionId");
CREATE INDEX "ExamSession_createdAt_idx" ON "ExamSession"("createdAt");
CREATE INDEX "ExamSession_completedAt_idx" ON "ExamSession"("completedAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;