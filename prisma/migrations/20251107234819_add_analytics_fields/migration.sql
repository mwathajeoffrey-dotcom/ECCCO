/*
  Warnings:

  - You are about to drop the `AnalyticsEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DashboardCache` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProgress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "AnalyticsEvent_timestamp_idx";

-- DropIndex
DROP INDEX "AnalyticsEvent_eventType_idx";

-- DropIndex
DROP INDEX "AnalyticsEvent_sessionId_idx";

-- DropIndex
DROP INDEX "AnalyticsEvent_userId_idx";

-- DropIndex
DROP INDEX "DashboardCache_expiresAt_idx";

-- DropIndex
DROP INDEX "DashboardCache_userId_idx";

-- DropIndex
DROP INDEX "DashboardCache_userId_key";

-- DropIndex
DROP INDEX "User_email_idx";

-- DropIndex
DROP INDEX "UserProgress_userId_topicId_key";

-- DropIndex
DROP INDEX "UserProgress_lastAttempt_idx";

-- DropIndex
DROP INDEX "UserProgress_topicId_idx";

-- DropIndex
DROP INDEX "UserProgress_userId_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AnalyticsEvent";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DashboardCache";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserProgress";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExamSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "sessionId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "questions" TEXT NOT NULL,
    "answers" TEXT NOT NULL,
    "score" INTEGER,
    "totalQuestions" INTEGER NOT NULL DEFAULT 0,
    "correctAnswers" INTEGER NOT NULL DEFAULT 0,
    "totalTime" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ExamSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ExamSession_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExamSession" ("answers", "completed", "correctAnswers", "createdAt", "id", "questions", "score", "sessionId", "topicId", "totalQuestions", "totalTime", "updatedAt", "userId") SELECT "answers", "completed", "correctAnswers", "createdAt", "id", "questions", "score", "sessionId", "topicId", "totalQuestions", "totalTime", "updatedAt", "userId" FROM "ExamSession";
DROP TABLE "ExamSession";
ALTER TABLE "new_ExamSession" RENAME TO "ExamSession";
CREATE INDEX "ExamSession_userId_idx" ON "ExamSession"("userId");
CREATE INDEX "ExamSession_topicId_idx" ON "ExamSession"("topicId");
CREATE INDEX "ExamSession_sessionId_idx" ON "ExamSession"("sessionId");
CREATE INDEX "ExamSession_createdAt_idx" ON "ExamSession"("createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
