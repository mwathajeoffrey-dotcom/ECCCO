-- CreateTable
CREATE TABLE "LiveQuizSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "accessCode" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "questionIds" TEXT NOT NULL,
    "currentQuestionIndex" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'WAITING',
    "settings" TEXT,
    "startedAt" DATETIME,
    "endedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LiveQuizSession_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LiveQuizSession_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LiveQuizParticipant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT,
    "nickname" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "joinedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "LiveQuizParticipant_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "LiveQuizSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LiveQuizParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LiveQuizAnswer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "questionIndex" INTEGER NOT NULL,
    "selectedAnswer" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "timeToAnswer" INTEGER,
    "answeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LiveQuizAnswer_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "LiveQuizSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LiveQuizAnswer_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "LiveQuizParticipant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "emailVerified" DATETIME,
    "name" TEXT,
    "password" TEXT,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'student',
    "sessionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "emailVerified", "id", "image", "name", "password", "sessionId", "updatedAt") SELECT "createdAt", "email", "emailVerified", "id", "image", "name", "password", "sessionId", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_sessionId_key" ON "User"("sessionId");
CREATE INDEX "User_sessionId_idx" ON "User"("sessionId");
CREATE INDEX "User_email_idx" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "LiveQuizSession_accessCode_key" ON "LiveQuizSession"("accessCode");

-- CreateIndex
CREATE INDEX "LiveQuizSession_hostId_idx" ON "LiveQuizSession"("hostId");

-- CreateIndex
CREATE INDEX "LiveQuizSession_topicId_idx" ON "LiveQuizSession"("topicId");

-- CreateIndex
CREATE INDEX "LiveQuizSession_accessCode_idx" ON "LiveQuizSession"("accessCode");

-- CreateIndex
CREATE INDEX "LiveQuizSession_status_idx" ON "LiveQuizSession"("status");

-- CreateIndex
CREATE INDEX "LiveQuizSession_createdAt_idx" ON "LiveQuizSession"("createdAt");

-- CreateIndex
CREATE INDEX "LiveQuizParticipant_sessionId_idx" ON "LiveQuizParticipant"("sessionId");

-- CreateIndex
CREATE INDEX "LiveQuizParticipant_userId_idx" ON "LiveQuizParticipant"("userId");

-- CreateIndex
CREATE INDEX "LiveQuizParticipant_joinedAt_idx" ON "LiveQuizParticipant"("joinedAt");

-- CreateIndex
CREATE INDEX "LiveQuizAnswer_sessionId_idx" ON "LiveQuizAnswer"("sessionId");

-- CreateIndex
CREATE INDEX "LiveQuizAnswer_participantId_idx" ON "LiveQuizAnswer"("participantId");

-- CreateIndex
CREATE INDEX "LiveQuizAnswer_questionId_idx" ON "LiveQuizAnswer"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "LiveQuizAnswer_sessionId_participantId_questionIndex_key" ON "LiveQuizAnswer"("sessionId", "participantId", "questionIndex");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");
