/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LiveQuizAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LiveQuizParticipant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LiveQuizSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `answersData` on the `ExamSession` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `ExamSession` table. All the data in the column will be lost.
  - You are about to drop the column `correctAnswers` on the `ExamSession` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `ExamSession` table. All the data in the column will be lost.
  - You are about to drop the column `questionsData` on the `ExamSession` table. All the data in the column will be lost.
  - You are about to drop the column `timeSpent` on the `ExamSession` table. All the data in the column will be lost.
  - You are about to drop the column `topicName` on the `ExamSession` table. All the data in the column will be lost.
  - You are about to drop the column `totalQuestions` on the `ExamSession` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `moduleId` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `subcategory` on the `Topic` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Account_userId_idx";

-- DropIndex
DROP INDEX "Account_provider_providerAccountId_key";

-- DropIndex
DROP INDEX "LiveQuizAnswer_sessionId_participantId_questionIndex_key";

-- DropIndex
DROP INDEX "LiveQuizAnswer_questionId_idx";

-- DropIndex
DROP INDEX "LiveQuizAnswer_participantId_idx";

-- DropIndex
DROP INDEX "LiveQuizAnswer_sessionId_idx";

-- DropIndex
DROP INDEX "LiveQuizParticipant_joinedAt_idx";

-- DropIndex
DROP INDEX "LiveQuizParticipant_userId_idx";

-- DropIndex
DROP INDEX "LiveQuizParticipant_sessionId_idx";

-- DropIndex
DROP INDEX "LiveQuizSession_createdAt_idx";

-- DropIndex
DROP INDEX "LiveQuizSession_status_idx";

-- DropIndex
DROP INDEX "LiveQuizSession_accessCode_idx";

-- DropIndex
DROP INDEX "LiveQuizSession_topicId_idx";

-- DropIndex
DROP INDEX "LiveQuizSession_hostId_idx";

-- DropIndex
DROP INDEX "LiveQuizSession_accessCode_key";

-- DropIndex
DROP INDEX "Module_ageGroup_idx";

-- DropIndex
DROP INDEX "Module_name_key";

-- DropIndex
DROP INDEX "Session_userId_idx";

-- DropIndex
DROP INDEX "Session_sessionToken_key";

-- DropIndex
DROP INDEX "User_email_idx";

-- DropIndex
DROP INDEX "User_sessionId_idx";

-- DropIndex
DROP INDEX "User_sessionId_key";

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "VerificationToken_identifier_token_key";

-- DropIndex
DROP INDEX "VerificationToken_token_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Account";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LiveQuizAnswer";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LiveQuizParticipant";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LiveQuizSession";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Module";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Session";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VerificationToken";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "notes" TEXT,
    "category" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "QuestionRating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "isHelpful" BOOLEAN NOT NULL,
    "comment" TEXT,
    "flagged" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CaseScenario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "presentation" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL DEFAULT 'medium',
    "questionIds" TEXT NOT NULL,
    "learningPoints" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CaseSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "currentQuestion" INTEGER NOT NULL DEFAULT 0,
    "answers" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "score" INTEGER,
    "totalTime" INTEGER,
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ExamSession" ("answers", "completed", "createdAt", "id", "questions", "score", "sessionId", "topicId", "totalTime", "updatedAt", "userId") SELECT "answers", "completed", "createdAt", "id", "questions", "score", "sessionId", "topicId", "totalTime", "updatedAt", "userId" FROM "ExamSession";
DROP TABLE "ExamSession";
ALTER TABLE "new_ExamSession" RENAME TO "ExamSession";
CREATE UNIQUE INDEX "ExamSession_sessionId_key" ON "ExamSession"("sessionId");
CREATE INDEX "ExamSession_userId_idx" ON "ExamSession"("userId");
CREATE INDEX "ExamSession_topicId_idx" ON "ExamSession"("topicId");
CREATE INDEX "ExamSession_sessionId_idx" ON "ExamSession"("sessionId");
CREATE INDEX "ExamSession_createdAt_idx" ON "ExamSession"("createdAt");
CREATE TABLE "new_Topic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Topic" ("createdAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "description", "id", "name", "updatedAt" FROM "Topic";
DROP TABLE "Topic";
ALTER TABLE "new_Topic" RENAME TO "Topic";
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "Bookmark_userId_idx" ON "Bookmark"("userId");

-- CreateIndex
CREATE INDEX "Bookmark_questionId_idx" ON "Bookmark"("questionId");

-- CreateIndex
CREATE INDEX "Bookmark_category_idx" ON "Bookmark"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_questionId_key" ON "Bookmark"("userId", "questionId");

-- CreateIndex
CREATE INDEX "QuestionRating_questionId_idx" ON "QuestionRating"("questionId");

-- CreateIndex
CREATE INDEX "QuestionRating_isHelpful_idx" ON "QuestionRating"("isHelpful");

-- CreateIndex
CREATE INDEX "QuestionRating_flagged_idx" ON "QuestionRating"("flagged");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionRating_userId_questionId_key" ON "QuestionRating"("userId", "questionId");

-- CreateIndex
CREATE INDEX "CaseScenario_category_idx" ON "CaseScenario"("category");

-- CreateIndex
CREATE INDEX "CaseScenario_difficulty_idx" ON "CaseScenario"("difficulty");

-- CreateIndex
CREATE INDEX "CaseSession_userId_idx" ON "CaseSession"("userId");

-- CreateIndex
CREATE INDEX "CaseSession_caseId_idx" ON "CaseSession"("caseId");

-- CreateIndex
CREATE INDEX "CaseSession_completed_idx" ON "CaseSession"("completed");
