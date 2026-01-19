/**
 * Top Medical Journals Database
 * Prioritizes clinical evidence quality for medical decision-making
 */

export interface JournalInfo {
  name: string;
  fullName: string;
  issn: string[];
  impactFactor: number;
  tier: 1 | 2 | 3;
  specialty: string[];
  color: "blue" | "red" | "green" | "purple" | "indigo" | "orange";
  abbreviation: string;
}

/**
 * Tier 1: Top General Medical Journals
 * Highest impact, broadest reach, most rigorous peer review
 */
export const TIER_1_GENERAL: Record<string, JournalInfo> = {
  NEJM: {
    name: "NEJM",
    fullName: "New England Journal of Medicine",
    issn: ["0028-4793", "1533-4406"],
    impactFactor: 176.1,
    tier: 1,
    specialty: ["general", "all"],
    color: "green",
    abbreviation: "NEJM",
  },
  Lancet: {
    name: "Lancet",
    fullName: "The Lancet",
    issn: ["0140-6736", "1474-547X"],
    impactFactor: 168.9,
    tier: 1,
    specialty: ["general", "all"],
    color: "blue",
    abbreviation: "Lancet",
  },
  JAMA: {
    name: "JAMA",
    fullName: "JAMA",
    issn: ["0098-7484", "1538-3598"],
    impactFactor: 120.7,
    tier: 1,
    specialty: ["general", "all"],
    color: "red",
    abbreviation: "JAMA",
  },
  BMJ: {
    name: "BMJ",
    fullName: "BMJ",
    issn: ["0959-8138", "1756-1833"],
    impactFactor: 105.7,
    tier: 1,
    specialty: ["general", "all"],
    color: "purple",
    abbreviation: "BMJ",
  },
};

/**
 * Tier 1: Top Specialty Journals for Emergency Medicine
 */
export const TIER_1_EMERGENCY: Record<string, JournalInfo> = {
  "Annals of Emergency Medicine": {
    name: "Ann Emerg Med",
    fullName: "Annals of Emergency Medicine",
    issn: ["0196-0644", "1097-6760"],
    impactFactor: 7.0,
    tier: 1,
    specialty: ["emergency"],
    color: "red",
    abbreviation: "Ann EM",
  },
  "Academic Emergency Medicine": {
    name: "Acad Emerg Med",
    fullName: "Academic Emergency Medicine",
    issn: ["1069-6563", "1553-2712"],
    impactFactor: 3.5,
    tier: 1,
    specialty: ["emergency"],
    color: "indigo",
    abbreviation: "Acad EM",
  },
};

/**
 * Tier 1: Top Critical Care Journals
 */
export const TIER_1_CRITICAL_CARE: Record<string, JournalInfo> = {
  "Intensive Care Medicine": {
    name: "Intensive Care Med",
    fullName: "Intensive Care Medicine",
    issn: ["0342-4642", "1432-1238"],
    impactFactor: 36.1,
    tier: 1,
    specialty: ["critical-care", "emergency"],
    color: "indigo",
    abbreviation: "ICM",
  },
  "Critical Care Medicine": {
    name: "Crit Care Med",
    fullName: "Critical Care Medicine",
    issn: ["0090-3493", "1530-0293"],
    impactFactor: 8.8,
    tier: 1,
    specialty: ["critical-care", "emergency"],
    color: "purple",
    abbreviation: "CCM",
  },
};

/**
 * Tier 1: Top OB/GYN Journals
 */
export const TIER_1_OBGYN: Record<string, JournalInfo> = {
  "American Journal of Obstetrics and Gynecology": {
    name: "AJOG",
    fullName: "American Journal of Obstetrics and Gynecology",
    issn: ["0002-9378", "1097-6868"],
    impactFactor: 9.8,
    tier: 1,
    specialty: ["obgyn"],
    color: "purple",
    abbreviation: "AJOG",
  },
  "Obstetrics & Gynecology": {
    name: "Obstet Gynecol",
    fullName: "Obstetrics & Gynecology",
    issn: ["0029-7844", "1873-233X"],
    impactFactor: 7.7,
    tier: 1,
    specialty: ["obgyn"],
    color: "purple",
    abbreviation: "Ob Gyn",
  },
};

/**
 * All Tier 1 Journals Combined
 */
export const ALL_TIER_1 = {
  ...TIER_1_GENERAL,
  ...TIER_1_EMERGENCY,
  ...TIER_1_CRITICAL_CARE,
  ...TIER_1_OBGYN,
};

/**
 * Tier 2: High-Quality Specialty Journals
 */
export const TIER_2_JOURNALS: Record<string, JournalInfo> = {
  Chest: {
    name: "Chest",
    fullName: "Chest",
    issn: ["0012-3692", "1931-3543"],
    impactFactor: 11.6,
    tier: 2,
    specialty: ["pulmonary", "critical-care"],
    color: "indigo",
    abbreviation: "Chest",
  },
  Resuscitation: {
    name: "Resuscitation",
    fullName: "Resuscitation",
    issn: ["0300-9572", "1873-1570"],
    impactFactor: 6.3,
    tier: 2,
    specialty: ["emergency", "critical-care"],
    color: "red",
    abbreviation: "Resus",
  },
  "Emergency Medicine Journal": {
    name: "Emerg Med J",
    fullName: "Emergency Medicine Journal",
    issn: ["1472-0205", "1472-0213"],
    impactFactor: 3.0,
    tier: 2,
    specialty: ["emergency"],
    color: "orange",
    abbreviation: "EMJ",
  },
};

/**
 * All Journals (for lookup)
 */
export const ALL_JOURNALS = {
  ...ALL_TIER_1,
  ...TIER_2_JOURNALS,
};

/**
 * Get journal tier by matching journal name
 */
export function getJournalTier(journalName: string): 1 | 2 | 3 | 4 {
  if (!journalName) return 4;

  const normalized = journalName.toLowerCase().trim();

  // Check Tier 1
  for (const journal of Object.values(ALL_TIER_1)) {
    if (
      normalized.includes(journal.name.toLowerCase()) ||
      normalized.includes(journal.fullName.toLowerCase()) ||
      journal.issn.some((issn) => normalized.includes(issn))
    ) {
      return 1;
    }
  }

  // Check Tier 2
  for (const journal of Object.values(TIER_2_JOURNALS)) {
    if (normalized.includes(journal.name.toLowerCase()) || normalized.includes(journal.fullName.toLowerCase())) {
      return 2;
    }
  }

  // Tier 3: Recognize known journal patterns
  if (
    normalized.includes("journal of") ||
    normalized.includes("annals of") ||
    normalized.includes("american journal")
  ) {
    return 3;
  }

  return 4; // Unknown
}

/**
 * Get journal information by name
 */
export function getJournalInfo(journalName: string): JournalInfo | null {
  if (!journalName) return null;

  const normalized = journalName.toLowerCase().trim();

  for (const journal of Object.values(ALL_JOURNALS)) {
    if (normalized.includes(journal.name.toLowerCase()) || normalized.includes(journal.fullName.toLowerCase())) {
      return journal;
    }
  }

  return null;
}

/**
 * Get journal badge/abbreviation for display
 */
export function getJournalBadge(journalName: string): string {
  const info = getJournalInfo(journalName);
  if (info) return info.abbreviation;

  // Fallback: Create abbreviation from first letters
  const words = journalName.split(" ").filter((w) => w.length > 2);
  if (words.length <= 2) return journalName.slice(0, 6).toUpperCase();

  return words
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 4);
}

/**
 * Get journal color for UI badges
 */
export function getJournalColor(journalName: string): "blue" | "red" | "green" | "purple" | "indigo" | "orange" {
  const info = getJournalInfo(journalName);
  return info?.color || "blue";
}

/**
 * Check if journal is top-tier (Tier 1)
 */
export function isTopTierJournal(journalName: string): boolean {
  return getJournalTier(journalName) === 1;
}

/**
 * Get journals by specialty
 */
export function getJournalsBySpecialty(specialty: string): JournalInfo[] {
  return Object.values(ALL_JOURNALS).filter((j) => j.specialty.includes(specialty) || j.specialty.includes("all"));
}
