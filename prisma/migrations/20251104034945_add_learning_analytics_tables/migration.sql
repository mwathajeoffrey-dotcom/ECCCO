-- CreateTable
CREATE TABLE "LearningSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME,
    "topicId" TEXT NOT NULL,
    "questionsAttempted" INTEGER NOT NULL DEFAULT 0,
    "correctAnswers" INTEGER NOT NULL DEFAULT 0,
    "timeSpent" INTEGER NOT NULL DEFAULT 0,
    "difficultyLevel" INTEGER NOT NULL DEFAULT 1,
    "completionRate" REAL NOT NULL DEFAULT 0.0,
    "confidenceScores" TEXT,
    "responsePatterns" TEXT,
    "learningObjectives" TEXT,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LearningInsight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "insightType" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "evidence" TEXT NOT NULL,
    "confidence" REAL NOT NULL,
    "actionItems" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "estimatedImpact" REAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "acknowledgedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AdaptiveRecommendation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "recommendationType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reasoning" TEXT NOT NULL,
    "targetTopics" TEXT NOT NULL,
    "estimatedDifficulty" INTEGER NOT NULL DEFAULT 1,
    "estimatedTime" INTEGER NOT NULL DEFAULT 30,
    "expectedOutcome" TEXT NOT NULL,
    "confidence" REAL NOT NULL,
    "algorithm" TEXT NOT NULL,
    "factors" TEXT NOT NULL,
    "metadata" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "acceptedAt" DATETIME,
    "completedAt" DATETIME,
    "feedbackRating" INTEGER,
    "feedbackComment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "StudyPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "totalDuration" INTEGER NOT NULL,
    "dailyGoal" INTEGER NOT NULL,
    "topics" TEXT NOT NULL,
    "milestones" TEXT NOT NULL,
    "adaptations" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "progressData" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PerformanceMetric" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "metricType" TEXT NOT NULL,
    "metricKey" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "metadata" TEXT,
    "calculatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "LearningGoal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "targetTopics" TEXT NOT NULL,
    "targetAccuracy" REAL,
    "targetTime" INTEGER,
    "deadline" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'active',
    "progress" REAL NOT NULL DEFAULT 0.0,
    "achievements" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "QuestionAnalytics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT NOT NULL,
    "selectedAnswer" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "responseTime" INTEGER NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 1,
    "hintsUsed" INTEGER NOT NULL DEFAULT 0,
    "confidenceLevel" INTEGER,
    "difficultyRating" INTEGER,
    "questionOrder" INTEGER NOT NULL,
    "previousCorrect" BOOLEAN,
    "cumulativeScore" REAL,
    "timeOfDay" TEXT,
    "dayOfWeek" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "LearningSession_userId_idx" ON "LearningSession"("userId");

-- CreateIndex
CREATE INDEX "LearningSession_topicId_idx" ON "LearningSession"("topicId");

-- CreateIndex
CREATE INDEX "LearningSession_sessionId_idx" ON "LearningSession"("sessionId");

-- CreateIndex
CREATE INDEX "LearningSession_startTime_idx" ON "LearningSession"("startTime");

-- CreateIndex
CREATE INDEX "LearningSession_difficultyLevel_idx" ON "LearningSession"("difficultyLevel");

-- CreateIndex
CREATE INDEX "LearningInsight_userId_idx" ON "LearningInsight"("userId");

-- CreateIndex
CREATE INDEX "LearningInsight_insightType_idx" ON "LearningInsight"("insightType");

-- CreateIndex
CREATE INDEX "LearningInsight_priority_idx" ON "LearningInsight"("priority");

-- CreateIndex
CREATE INDEX "LearningInsight_isActive_idx" ON "LearningInsight"("isActive");

-- CreateIndex
CREATE INDEX "LearningInsight_createdAt_idx" ON "LearningInsight"("createdAt");

-- CreateIndex
CREATE INDEX "AdaptiveRecommendation_userId_idx" ON "AdaptiveRecommendation"("userId");

-- CreateIndex
CREATE INDEX "AdaptiveRecommendation_recommendationType_idx" ON "AdaptiveRecommendation"("recommendationType");

-- CreateIndex
CREATE INDEX "AdaptiveRecommendation_isActive_idx" ON "AdaptiveRecommendation"("isActive");

-- CreateIndex
CREATE INDEX "AdaptiveRecommendation_createdAt_idx" ON "AdaptiveRecommendation"("createdAt");

-- CreateIndex
CREATE INDEX "AdaptiveRecommendation_confidence_idx" ON "AdaptiveRecommendation"("confidence");

-- CreateIndex
CREATE INDEX "StudyPlan_userId_idx" ON "StudyPlan"("userId");

-- CreateIndex
CREATE INDEX "StudyPlan_isActive_idx" ON "StudyPlan"("isActive");

-- CreateIndex
CREATE INDEX "StudyPlan_startedAt_idx" ON "StudyPlan"("startedAt");

-- CreateIndex
CREATE INDEX "PerformanceMetric_userId_idx" ON "PerformanceMetric"("userId");

-- CreateIndex
CREATE INDEX "PerformanceMetric_metricType_idx" ON "PerformanceMetric"("metricType");

-- CreateIndex
CREATE INDEX "PerformanceMetric_calculatedAt_idx" ON "PerformanceMetric"("calculatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PerformanceMetric_userId_metricType_metricKey_calculatedAt_key" ON "PerformanceMetric"("userId", "metricType", "metricKey", "calculatedAt");

-- CreateIndex
CREATE INDEX "LearningGoal_userId_idx" ON "LearningGoal"("userId");

-- CreateIndex
CREATE INDEX "LearningGoal_status_idx" ON "LearningGoal"("status");

-- CreateIndex
CREATE INDEX "LearningGoal_deadline_idx" ON "LearningGoal"("deadline");

-- CreateIndex
CREATE INDEX "QuestionAnalytics_questionId_idx" ON "QuestionAnalytics"("questionId");

-- CreateIndex
CREATE INDEX "QuestionAnalytics_userId_idx" ON "QuestionAnalytics"("userId");

-- CreateIndex
CREATE INDEX "QuestionAnalytics_sessionId_idx" ON "QuestionAnalytics"("sessionId");

-- CreateIndex
CREATE INDEX "QuestionAnalytics_isCorrect_idx" ON "QuestionAnalytics"("isCorrect");

-- CreateIndex
CREATE INDEX "QuestionAnalytics_responseTime_idx" ON "QuestionAnalytics"("responseTime");

-- CreateIndex
CREATE INDEX "QuestionAnalytics_createdAt_idx" ON "QuestionAnalytics"("createdAt");
