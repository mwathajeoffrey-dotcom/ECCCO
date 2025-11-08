-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExamSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "sessionId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "topicName" TEXT NOT NULL,
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
INSERT INTO "new_ExamSession" ("answers", "answersData", "completed", "completedAt", "correctAnswers", "createdAt", "id", "metadata", "questions", "questionsData", "score", "sessionId", "timeSpent", "topicId", "topicName", "totalQuestions", "totalTime", "updatedAt", "userId") SELECT "answers", "answersData", "completed", "completedAt", "correctAnswers", "createdAt", "id", "metadata", "questions", "questionsData", "score", "sessionId", "timeSpent", "topicId", "topicName", "totalQuestions", "totalTime", "updatedAt", "userId" FROM "ExamSession";
DROP TABLE "ExamSession";
ALTER TABLE "new_ExamSession" RENAME TO "ExamSession";
CREATE INDEX "ExamSession_userId_idx" ON "ExamSession"("userId");
CREATE INDEX "ExamSession_topicId_idx" ON "ExamSession"("topicId");
CREATE INDEX "ExamSession_sessionId_idx" ON "ExamSession"("sessionId");
CREATE INDEX "ExamSession_createdAt_idx" ON "ExamSession"("createdAt");
CREATE INDEX "ExamSession_completedAt_idx" ON "ExamSession"("completedAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
