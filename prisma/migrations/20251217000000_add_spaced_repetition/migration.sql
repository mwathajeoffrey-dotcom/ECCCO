-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "nextReviewDate" TIMESTAMP(3),
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
ADD COLUMN     "interval" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "lastReviewGrade" INTEGER;

-- CreateIndex
CREATE INDEX "Bookmark_nextReviewDate_idx" ON "Bookmark"("nextReviewDate");
