/*
  Warnings:

  - You are about to drop the `AdaptiveRecommendation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DailyStats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LearningGoal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LearningInsight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LearningSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PerformanceMetric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionAnalytics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudyPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `createdAt` on the `AnalyticsEvent` table. All the data in the column will be lost.
  - You are about to drop the column `deviceInfo` on the `AnalyticsEvent` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `AnalyticsEvent` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `AnalyticsEvent` table. All the data in the column will be lost.
  - You are about to drop the column `referrer` on the `AnalyticsEvent` table. All the data in the column will be lost.
  - You are about to drop the column `screenSize` on the `AnalyticsEvent` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `AnalyticsEvent` table. All the data in the column will be lost.
  - You are about to drop the column `deviceInfo` on the `ExamSession` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `ExamSession` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `ExamSession` table. All the data in the column will be lost.
  - You are about to drop the column `referrer` on the `ExamSession` table. All the data in the column will be lost.
  - You are about to drop the column `screenResolution` on the `ExamSession` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `ExamSession` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `ExamSession` table. All the data in the column will be lost.
  - You are about to drop the column `averageTime` on the `UserProgress` table. All the data in the column will be lost.
  - You are about to drop the column `correctAnswers` on the `UserProgress` table. All the data in the column will be lost.
  - You are about to drop the column `lastStudied` on the `UserProgress` table. All the data in the column will be lost.
  - You are about to drop the column `strengthLevel` on the `UserProgress` table. All the data in the column will be lost.
  - You are about to drop the column `totalQuestions` on the `UserProgress` table. All the data in the column will be lost.
  - Made the column `eventData` on table `AnalyticsEvent` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `totalQuestions` to the `ExamSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AdaptiveRecommendation_confidence_idx";

-- DropIndex
DROP INDEX "AdaptiveRecommendation_createdAt_idx";

-- DropIndex
DROP INDEX "AdaptiveRecommendation_isActive_idx";

-- DropIndex
DROP INDEX "AdaptiveRecommendation_recommendationType_idx";

-- DropIndex
DROP INDEX "AdaptiveRecommendation_userId_idx";

-- DropIndex
DROP INDEX "DailyStats_date_idx";

-- DropIndex
DROP INDEX "DailyStats_date_key";

-- DropIndex
DROP INDEX "LearningGoal_deadline_idx";

-- DropIndex
DROP INDEX "LearningGoal_status_idx";

-- DropIndex
DROP INDEX "LearningGoal_userId_idx";

-- DropIndex
DROP INDEX "LearningInsight_createdAt_idx";

-- DropIndex
DROP INDEX "LearningInsight_isActive_idx";

-- DropIndex
DROP INDEX "LearningInsight_priority_idx";

-- DropIndex
DROP INDEX "LearningInsight_insightType_idx";

-- DropIndex
DROP INDEX "LearningInsight_userId_idx";

-- DropIndex
DROP INDEX "LearningSession_difficultyLevel_idx";

-- DropIndex
DROP INDEX "LearningSession_startTime_idx";

-- DropIndex
DROP INDEX "LearningSession_sessionId_idx";

-- DropIndex
DROP INDEX "LearningSession_topicId_idx";

-- DropIndex
DROP INDEX "LearningSession_userId_idx";

-- DropIndex
DROP INDEX "PerformanceMetric_userId_metricType_metricKey_calculatedAt_key";

-- DropIndex
DROP INDEX "PerformanceMetric_calculatedAt_idx";

-- DropIndex
DROP INDEX "PerformanceMetric_metricType_idx";

-- DropIndex
DROP INDEX "PerformanceMetric_userId_idx";

-- DropIndex
DROP INDEX "QuestionAnalytics_createdAt_idx";

-- DropIndex
DROP INDEX "QuestionAnalytics_responseTime_idx";

-- DropIndex
DROP INDEX "QuestionAnalytics_isCorrect_idx";

-- DropIndex
DROP INDEX "QuestionAnalytics_sessionId_idx";

-- DropIndex
DROP INDEX "QuestionAnalytics_userId_idx";

-- DropIndex
DROP INDEX "QuestionAnalytics_questionId_idx";

-- DropIndex
DROP INDEX "StudyPlan_startedAt_idx";

-- DropIndex
DROP INDEX "StudyPlan_isActive_idx";

-- DropIndex
DROP INDEX "StudyPlan_userId_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AdaptiveRecommendation";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DailyStats";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LearningGoal";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LearningInsight";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LearningSession";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PerformanceMetric";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "QuestionAnalytics";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StudyPlan";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "name" TEXT,
    "sessionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DashboardCache" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "cacheData" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AnalyticsEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "sessionId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventData" TEXT NOT NULL,
    "path" TEXT,
    "userAgent" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AnalyticsEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AnalyticsEvent" ("eventData", "eventType", "id", "sessionId", "userAgent") SELECT "eventData", "eventType", "id", "sessionId", "userAgent" FROM "AnalyticsEvent";
DROP TABLE "AnalyticsEvent";
ALTER TABLE "new_AnalyticsEvent" RENAME TO "AnalyticsEvent";
CREATE INDEX "AnalyticsEvent_userId_idx" ON "AnalyticsEvent"("userId");
CREATE INDEX "AnalyticsEvent_sessionId_idx" ON "AnalyticsEvent"("sessionId");
CREATE INDEX "AnalyticsEvent_eventType_idx" ON "AnalyticsEvent"("eventType");
CREATE INDEX "AnalyticsEvent_timestamp_idx" ON "AnalyticsEvent"("timestamp");
CREATE TABLE "new_ExamSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "sessionId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "questions" TEXT NOT NULL,
    "answers" TEXT NOT NULL,
    "score" INTEGER,
    "totalQuestions" INTEGER NOT NULL,
    "correctAnswers" INTEGER NOT NULL DEFAULT 0,
    "totalTime" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ExamSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ExamSession" ("answers", "completed", "createdAt", "id", "questions", "score", "sessionId", "topicId", "totalTime", "updatedAt", "userId") SELECT "answers", "completed", "createdAt", "id", "questions", "score", "sessionId", "topicId", "totalTime", "updatedAt", "userId" FROM "ExamSession";
DROP TABLE "ExamSession";
ALTER TABLE "new_ExamSession" RENAME TO "ExamSession";
CREATE INDEX "ExamSession_userId_idx" ON "ExamSession"("userId");
CREATE INDEX "ExamSession_topicId_idx" ON "ExamSession"("topicId");
CREATE INDEX "ExamSession_sessionId_idx" ON "ExamSession"("sessionId");
CREATE INDEX "ExamSession_createdAt_idx" ON "ExamSession"("createdAt");
CREATE TABLE "new_UserProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "totalAttempted" INTEGER NOT NULL DEFAULT 0,
    "totalCorrect" INTEGER NOT NULL DEFAULT 0,
    "totalTime" INTEGER NOT NULL DEFAULT 0,
    "bestScore" INTEGER NOT NULL DEFAULT 0,
    "recentScore" INTEGER NOT NULL DEFAULT 0,
    "averageScore" REAL NOT NULL DEFAULT 0,
    "questionsAnswered" TEXT NOT NULL DEFAULT '[]',
    "strengthAreas" TEXT NOT NULL DEFAULT '[]',
    "weaknessAreas" TEXT NOT NULL DEFAULT '[]',
    "lastAttempt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserProgress_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserProgress" ("createdAt", "id", "topicId", "updatedAt", "userId") SELECT "createdAt", "id", "topicId", "updatedAt", "userId" FROM "UserProgress";
DROP TABLE "UserProgress";
ALTER TABLE "new_UserProgress" RENAME TO "UserProgress";
CREATE INDEX "UserProgress_userId_idx" ON "UserProgress"("userId");
CREATE INDEX "UserProgress_topicId_idx" ON "UserProgress"("topicId");
CREATE INDEX "UserProgress_lastAttempt_idx" ON "UserProgress"("lastAttempt");
CREATE UNIQUE INDEX "UserProgress_userId_topicId_key" ON "UserProgress"("userId", "topicId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_sessionId_key" ON "User"("sessionId");

-- CreateIndex
CREATE INDEX "User_sessionId_idx" ON "User"("sessionId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DashboardCache_userId_key" ON "DashboardCache"("userId");

-- CreateIndex
CREATE INDEX "DashboardCache_userId_idx" ON "DashboardCache"("userId");

-- CreateIndex
CREATE INDEX "DashboardCache_expiresAt_idx" ON "DashboardCache"("expiresAt");
