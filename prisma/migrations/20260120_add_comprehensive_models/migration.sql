-- CreateTable
CREATE TABLE "ContentVersion" (
    "id" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "changes" TEXT,
    "changedBy" TEXT NOT NULL,
    "changeReason" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "userId" TEXT,
    "userEmail" TEXT,
    "resourceType" TEXT,
    "resourceId" TEXT,
    "details" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "success" BOOLEAN NOT NULL,
    "errorMessage" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CitationVerification" (
    "id" TEXT NOT NULL,
    "evidenceId" TEXT NOT NULL,
    "pmid" TEXT,
    "doi" TEXT,
    "url" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "lastChecked" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRetracted" BOOLEAN NOT NULL DEFAULT false,
    "retractionNote" TEXT,
    "responseCode" INTEGER,
    "errorMessage" TEXT,
    "verifiedBy" TEXT,
    "nextCheckDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CitationVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentVersion_resourceType_resourceId_version_key" ON "ContentVersion"("resourceType", "resourceId", "version");

-- CreateIndex
CREATE INDEX "ContentVersion_resourceType_idx" ON "ContentVersion"("resourceType");

-- CreateIndex
CREATE INDEX "ContentVersion_resourceId_idx" ON "ContentVersion"("resourceId");

-- CreateIndex
CREATE INDEX "ContentVersion_isActive_idx" ON "ContentVersion"("isActive");

-- CreateIndex
CREATE INDEX "ContentVersion_createdAt_idx" ON "ContentVersion"("createdAt");

-- CreateIndex
CREATE INDEX "ContentVersion_changedBy_idx" ON "ContentVersion"("changedBy");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_userEmail_idx" ON "AuditLog"("userEmail");

-- CreateIndex
CREATE INDEX "AuditLog_resourceType_idx" ON "AuditLog"("resourceType");

-- CreateIndex
CREATE INDEX "AuditLog_timestamp_idx" ON "AuditLog"("timestamp");

-- CreateIndex
CREATE INDEX "AuditLog_success_idx" ON "AuditLog"("success");

-- CreateIndex
CREATE INDEX "CitationVerification_evidenceId_idx" ON "CitationVerification"("evidenceId");

-- CreateIndex
CREATE INDEX "CitationVerification_status_idx" ON "CitationVerification"("status");

-- CreateIndex
CREATE INDEX "CitationVerification_lastChecked_idx" ON "CitationVerification"("lastChecked");

-- CreateIndex
CREATE INDEX "CitationVerification_isRetracted_idx" ON "CitationVerification"("isRetracted");

-- CreateIndex
CREATE INDEX "CitationVerification_nextCheckDate_idx" ON "CitationVerification"("nextCheckDate");
