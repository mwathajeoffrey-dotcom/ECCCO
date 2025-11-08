/*
  Warnings:

  - Added the required column `moduleId` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ageGroup" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Insert default modules
INSERT INTO "Module" ("id", "name", "description", "ageGroup", "createdAt", "updatedAt") VALUES 
('pediatric_module', 'Pediatric Emergency Medicine', 'Pediatric emergency care, PALS, and critical care topics', 'pediatric', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('adult_module', 'Adult Emergency Medicine', 'Adult emergency care, ACLS, trauma, and critical care topics', 'adult', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Topic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "moduleId" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'general',
    "subcategory" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Topic_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert existing topics with appropriate module assignments
INSERT INTO "new_Topic" ("id", "name", "description", "moduleId", "category", "createdAt", "updatedAt") 
SELECT 
  "id", 
  "name", 
  "description",
  CASE 
    WHEN "name" LIKE '%Pediatric%' OR "name" LIKE '%PALS%' THEN 'pediatric_module'
    ELSE 'adult_module'
  END as "moduleId",
  CASE 
    WHEN "name" LIKE '%Ventilation%' OR "name" LIKE '%Airway%' THEN 'ventilation'
    WHEN "name" LIKE '%Sepsis%' THEN 'sepsis'
    WHEN "name" LIKE '%ACLS%' THEN 'cardiac'
    WHEN "name" LIKE '%ATLS%' OR "name" LIKE '%Trauma%' THEN 'trauma'
    WHEN "name" LIKE '%BLS%' THEN 'basic_life_support'
    WHEN "name" LIKE '%PALS%' THEN 'pediatric_advanced_life_support'
    ELSE 'general'
  END as "category",
  "createdAt", 
  "updatedAt" 
FROM "Topic";

DROP TABLE "Topic";
ALTER TABLE "new_Topic" RENAME TO "Topic";
CREATE INDEX "Topic_moduleId_idx" ON "Topic"("moduleId");
CREATE INDEX "Topic_category_idx" ON "Topic"("category");
CREATE UNIQUE INDEX "Topic_moduleId_name_key" ON "Topic"("moduleId", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Module_name_key" ON "Module"("name");

-- CreateIndex
CREATE INDEX "Module_ageGroup_idx" ON "Module"("ageGroup");