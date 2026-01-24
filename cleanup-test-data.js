#!/usr/bin/env node

/**
 * Cleanup any test data from previous test runs
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function cleanup() {
  console.log("🧹 Cleaning up test data...\n");

  try {
    // Delete test ContentVersions
    const cv = await prisma.contentVersion.deleteMany({
      where: {
        OR: [{ id: { startsWith: "cv-test-" } }, { resourceId: "test-123" }],
      },
    });
    console.log(`✓ Deleted ${cv.count} ContentVersion test record(s)`);

    // Delete test AuditLogs
    const al = await prisma.auditLog.deleteMany({
      where: {
        OR: [{ id: { startsWith: "al-test-" } }, { userId: "user-test-123" }],
      },
    });
    console.log(`✓ Deleted ${al.count} AuditLog test record(s)`);

    // Delete test CitationVerifications
    const cit = await prisma.citationVerification.deleteMany({
      where: {
        OR: [{ id: { startsWith: "cv-test-" } }, { evidenceId: "evidence-test-123" }],
      },
    });
    console.log(`✓ Deleted ${cit.count} CitationVerification test record(s)`);

    console.log("\n✅ Cleanup complete!\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

cleanup();
