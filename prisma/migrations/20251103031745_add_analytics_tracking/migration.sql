/*
  Warnings:

  - Added the required column `sessionId` to the `ExamSession` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "AnalyticsEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventData" TEXT,
    "deviceInfo" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "location" TEXT,
    "screenSize" TEXT,
    "timezone" TEXT,
    "referrer" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "DailyStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "uniqueDevices" INTEGER NOT NULL DEFAULT 0,
    "totalSessions" INTEGER NOT NULL DEFAULT 0,
    "examsStarted" INTEGER NOT NULL DEFAULT 0,
    "examsCompleted" INTEGER NOT NULL DEFAULT 0,
    "topCountries" TEXT,
    "topDeviceTypes" TEXT,
    "topTopics" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

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
    "totalTime" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "deviceInfo" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "location" TEXT,
    "screenResolution" TEXT,
    "timezone" TEXT,
    "referrer" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ExamSession" ("answers", "completed", "createdAt", "id", "questions", "score", "topicId", "totalTime", "updatedAt", "userId") SELECT "answers", "completed", "createdAt", "id", "questions", "score", "topicId", "totalTime", "updatedAt", "userId" FROM "ExamSession";
DROP TABLE "ExamSession";
ALTER TABLE "new_ExamSession" RENAME TO "ExamSession";
CREATE UNIQUE INDEX "ExamSession_sessionId_key" ON "ExamSession"("sessionId");
CREATE INDEX "ExamSession_userId_idx" ON "ExamSession"("userId");
CREATE INDEX "ExamSession_topicId_idx" ON "ExamSession"("topicId");
CREATE INDEX "ExamSession_sessionId_idx" ON "ExamSession"("sessionId");
CREATE INDEX "ExamSession_createdAt_idx" ON "ExamSession"("createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "AnalyticsEvent_sessionId_idx" ON "AnalyticsEvent"("sessionId");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_eventType_idx" ON "AnalyticsEvent"("eventType");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_createdAt_idx" ON "AnalyticsEvent"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "DailyStats_date_key" ON "DailyStats"("date");

-- CreateIndex
CREATE INDEX "DailyStats_date_idx" ON "DailyStats"("date");
