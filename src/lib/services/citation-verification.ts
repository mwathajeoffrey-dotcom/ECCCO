/**
 * Citation Verification Service
 * Verifies medical citations and checks for retractions
 * Critical for maintaining clinical credibility
 */

import prisma from "@/lib/db";
import { logger } from "./logger";
import { monitoring } from "./monitoring";

export interface CitationCheckResult {
  valid: boolean;
  status: "verified" | "broken" | "retracted" | "pending";
  responseCode?: number;
  isRetracted?: boolean;
  retractionNote?: string;
  error?: string;
}

/**
 * Check if a PubMed article exists and is not retracted
 */
async function checkPubMed(pmid: string): Promise<CitationCheckResult> {
  try {
    const response = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${pmid}&retmode=json`
    );

    if (!response.ok) {
      return {
        valid: false,
        status: "broken",
        responseCode: response.status,
        error: "PubMed API returned error",
      };
    }

    const data = await response.json();
    const article = data.result?.[pmid];

    if (!article || article.error) {
      return {
        valid: false,
        status: "broken",
        error: "Article not found in PubMed",
      };
    }

    // Check for retraction status
    const isRetracted =
      article.publicationstatus?.includes("retracted") ||
      article.articleids?.some((id: any) => id.idtype === "pmc" && id.value?.includes("retracted"));

    return {
      valid: !isRetracted,
      status: isRetracted ? "retracted" : "verified",
      isRetracted,
      retractionNote: isRetracted
        ? "This article has been retracted. Please verify current clinical guidelines."
        : undefined,
    };
  } catch (error) {
    logger.error("PubMed verification failed", error as Error, { pmid });
    return {
      valid: false,
      status: "pending",
      error: (error as Error).message,
    };
  }
}

/**
 * Check if a DOI link is accessible
 */
async function checkDOI(doi: string): Promise<CitationCheckResult> {
  try {
    const url = `https://doi.org/${doi}`;
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
    });

    return {
      valid: response.ok,
      status: response.ok ? "verified" : "broken",
      responseCode: response.status,
    };
  } catch (error) {
    logger.error("DOI verification failed", error as Error, { doi });
    return {
      valid: false,
      status: "broken",
      error: (error as Error).message,
    };
  }
}

/**
 * Check if a generic URL is accessible
 */
async function checkURL(url: string): Promise<CitationCheckResult> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
    });

    return {
      valid: response.ok,
      status: response.ok ? "verified" : "broken",
      responseCode: response.status,
    };
  } catch (error) {
    logger.error("URL verification failed", error as Error, { url });
    return {
      valid: false,
      status: "broken",
      error: (error as Error).message,
    };
  }
}

/**
 * Verify a single citation
 */
export async function verifyCitation(
  evidenceId: string,
  pmid?: string,
  doi?: string,
  url?: string,
  verifiedBy: string = "system"
): Promise<void> {
  let result: CitationCheckResult;

  // Priority: PMID > DOI > URL
  if (pmid) {
    result = await checkPubMed(pmid);
  } else if (doi) {
    result = await checkDOI(doi);
  } else if (url) {
    result = await checkURL(url);
  } else {
    logger.warn("No citation identifiers provided", { evidenceId });
    return;
  }

  // Store verification result
  try {
    await prisma.citationVerification.upsert({
      where: {
        id: `${evidenceId}-${pmid || doi || url}`,
      },
      create: {
        id: `${evidenceId}-${pmid || doi || url}`,
        evidenceId,
        pmid,
        doi,
        url,
        status: result.status,
        isRetracted: result.isRetracted || false,
        retractionNote: result.retractionNote,
        responseCode: result.responseCode,
        errorMessage: result.error,
        verifiedBy,
        lastChecked: new Date(),
        // Schedule next check based on status
        nextCheckDate: new Date(Date.now() + (result.status === "verified" ? 30 : 7) * 24 * 60 * 60 * 1000),
      },
      update: {
        status: result.status,
        isRetracted: result.isRetracted || false,
        retractionNote: result.retractionNote,
        responseCode: result.responseCode,
        errorMessage: result.error,
        verifiedBy,
        lastChecked: new Date(),
        nextCheckDate: new Date(Date.now() + (result.status === "verified" ? 30 : 7) * 24 * 60 * 60 * 1000),
      },
    });

    // Log important events
    if (result.isRetracted) {
      logger.warn("Retracted citation detected", {
        evidenceId,
        pmid,
        doi,
        retractionNote: result.retractionNote,
      });

      monitoring.trackEvent({
        action: "retraction_detected",
        category: "citation",
        label: evidenceId,
        metadata: { pmid, doi },
      });
    } else if (!result.valid) {
      logger.warn("Broken citation detected", {
        evidenceId,
        pmid,
        doi,
        url,
        error: result.error,
      });
    }
  } catch (error) {
    logger.error("Failed to store citation verification", error as Error, {
      evidenceId,
      pmid,
      doi,
    });
  }
}

/**
 * Verify all citations for an evidence reference
 */
export async function verifyEvidenceCitations(evidenceId: string): Promise<void> {
  try {
    const evidence = await prisma.evidenceReference.findUnique({
      where: { id: evidenceId },
      select: {
        id: true,
        pmid: true,
        doi: true,
      },
    });

    if (!evidence) {
      logger.warn("Evidence not found for citation verification", { evidenceId });
      return;
    }

    await verifyCitation(evidence.id, evidence.pmid || undefined, evidence.doi || undefined);
  } catch (error) {
    logger.error("Failed to verify evidence citations", error as Error, { evidenceId });
  }
}

/**
 * Verify all citations that are due for checking
 */
export async function verifyPendingCitations(): Promise<void> {
  try {
    const pending = await prisma.citationVerification.findMany({
      where: {
        OR: [{ nextCheckDate: { lte: new Date() } }, { status: "pending" }],
      },
      take: 100, // Process in batches
    });

    logger.info(`Verifying ${pending.length} pending citations`);

    for (const citation of pending) {
      await verifyCitation(
        citation.evidenceId,
        citation.pmid || undefined,
        citation.doi || undefined,
        citation.url || undefined
      );

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    logger.info("Pending citations verification complete", {
      count: pending.length,
    });
  } catch (error) {
    logger.error("Failed to verify pending citations", error as Error);
  }
}

/**
 * Get citation verification status
 */
export async function getCitationStatus(evidenceId: string): Promise<CitationCheckResult | null> {
  try {
    const verification = await prisma.citationVerification.findFirst({
      where: { evidenceId },
      orderBy: { lastChecked: "desc" },
    });

    if (!verification) {
      return null;
    }

    return {
      valid: verification.status === "verified",
      status: verification.status as any,
      isRetracted: verification.isRetracted,
      retractionNote: verification.retractionNote || undefined,
      responseCode: verification.responseCode || undefined,
    };
  } catch (error) {
    logger.error("Failed to get citation status", error as Error, { evidenceId });
    return null;
  }
}

/**
 * Get all broken or retracted citations
 */
export async function getBrokenCitations(): Promise<any[]> {
  try {
    return await prisma.citationVerification.findMany({
      where: {
        OR: [{ status: "broken" }, { status: "retracted" }],
      },
      orderBy: { lastChecked: "desc" },
    });
  } catch (error) {
    logger.error("Failed to get broken citations", error as Error);
    return [];
  }
}

export default {
  verifyCitation,
  verifyEvidenceCitations,
  verifyPendingCitations,
  getCitationStatus,
  getBrokenCitations,
};
