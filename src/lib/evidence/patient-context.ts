/**
 * Patient-Specific Clinical Context
 *
 * Allows filtering and customizing evidence based on patient characteristics
 */

export type AgeGroup = "neonate" | "infant" | "child" | "adolescent" | "adult" | "elderly";
export type PregnancyStatus = "not-pregnant" | "trimester-1" | "trimester-2" | "trimester-3" | "breastfeeding";
export type RenalFunction = "normal" | "mild" | "moderate" | "severe" | "esrd"; // CrCl: >90, 60-89, 30-59, 15-29, <15
export type HepaticFunction = "normal" | "mild" | "moderate" | "severe"; // Child-Pugh A, B, C

export interface PatientContext {
  ageGroup?: AgeGroup;
  ageYears?: number;
  weightKg?: number;

  pregnancyStatus?: PregnancyStatus;

  renalFunction?: RenalFunction;
  creatinineClearance?: number; // mL/min

  hepaticFunction?: HepaticFunction;

  comorbidities?: string[];

  allergies?: string[];
}

/**
 * Get age group from years
 */
export function getAgeGroup(ageYears: number): AgeGroup {
  if (ageYears < 0.08) return "neonate"; // < 1 month
  if (ageYears < 2) return "infant";
  if (ageYears < 12) return "child";
  if (ageYears < 18) return "adolescent";
  if (ageYears < 65) return "adult";
  return "elderly";
}

/**
 * Get renal function category from CrCl
 */
export function getRenalFunction(crCl: number): RenalFunction {
  if (crCl >= 90) return "normal";
  if (crCl >= 60) return "mild";
  if (crCl >= 30) return "moderate";
  if (crCl >= 15) return "severe";
  return "esrd";
}

/**
 * Check if patient is pediatric
 */
export function isPediatric(context: PatientContext): boolean {
  if (context.ageYears !== undefined) {
    return context.ageYears < 18;
  }
  if (context.ageGroup) {
    return ["neonate", "infant", "child", "adolescent"].includes(context.ageGroup);
  }
  return false;
}

/**
 * Check if patient is pregnant or breastfeeding
 */
export function isPregnantOrBreastfeeding(context: PatientContext): boolean {
  return context.pregnancyStatus !== undefined && context.pregnancyStatus !== "not-pregnant";
}

/**
 * Check if patient has renal impairment
 */
export function hasRenalImpairment(context: PatientContext): boolean {
  if (context.creatinineClearance !== undefined) {
    return context.creatinineClearance < 60;
  }
  if (context.renalFunction) {
    return !["normal", "mild"].includes(context.renalFunction);
  }
  return false;
}

/**
 * Check if patient has hepatic impairment
 */
export function hasHepaticImpairment(context: PatientContext): boolean {
  return context.hepaticFunction !== undefined && context.hepaticFunction !== "normal";
}

/**
 * Generate patient-specific considerations text
 */
export function generatePatientConsiderations(context: PatientContext): string[] {
  const considerations: string[] = [];

  if (isPediatric(context)) {
    considerations.push("🧒 Pediatric patient - use weight-based dosing and age-appropriate formulations");
    if (context.ageGroup === "neonate") {
      considerations.push("⚠️ Neonatal physiology - reduced drug clearance, immature metabolism");
    }
  }

  if (context.ageGroup === "elderly") {
    considerations.push("👴 Elderly patient - start low, go slow; increased risk of adverse effects");
    considerations.push("⚠️ Consider polypharmacy, reduced renal/hepatic function, frailty");
  }

  if (isPregnantOrBreastfeeding(context)) {
    if (context.pregnancyStatus === "trimester-1") {
      considerations.push("🤰 First trimester - highest teratogenic risk period, avoid Category D/X drugs");
    } else if (context.pregnancyStatus === "trimester-2" || context.pregnancyStatus === "trimester-3") {
      considerations.push("🤰 Pregnancy - check FDA pregnancy categories, balance maternal/fetal risks");
    } else if (context.pregnancyStatus === "breastfeeding") {
      considerations.push("🍼 Breastfeeding - check drug transfer to breast milk, monitor infant");
    }
  }

  if (hasRenalImpairment(context)) {
    const crCl = context.creatinineClearance;
    if (crCl !== undefined && crCl < 30) {
      considerations.push("🩺 Severe renal impairment (CrCl < 30) - significant dose adjustments required");
    } else {
      considerations.push("🩺 Renal impairment - dose adjustments may be necessary, monitor drug levels");
    }
    considerations.push("⚠️ Avoid nephrotoxic drugs, monitor electrolytes and fluid balance closely");
  }

  if (hasHepaticImpairment(context)) {
    considerations.push("🩺 Hepatic impairment - altered drug metabolism, increased bleeding risk");
    considerations.push("⚠️ Avoid hepatotoxic drugs, monitor liver function tests");
  }

  if (context.allergies && context.allergies.length > 0) {
    const allergyList = context.allergies.join(", ");
    considerations.push(`⚠️ Drug allergies: ${allergyList} - check for cross-reactivity`);
  }

  if (context.comorbidities && context.comorbidities.length > 0) {
    considerations.push(`🏥 Comorbidities: ${context.comorbidities.join(", ")}`);
  }

  return considerations;
}

/**
 * Generate patient summary for AI context
 */
export function getPatientSummaryForAI(context: PatientContext): string {
  const parts: string[] = [];

  if (context.ageYears !== undefined) {
    parts.push(`${context.ageYears}-year-old patient`);
  } else if (context.ageGroup) {
    parts.push(`${context.ageGroup} patient`);
  }

  if (context.weightKg !== undefined) {
    parts.push(`${context.weightKg} kg`);
  }

  if (isPregnantOrBreastfeeding(context)) {
    parts.push(context.pregnancyStatus || "pregnant/breastfeeding");
  }

  if (hasRenalImpairment(context)) {
    if (context.creatinineClearance !== undefined) {
      parts.push(`CrCl ${context.creatinineClearance} mL/min`);
    } else {
      parts.push(`${context.renalFunction} renal function`);
    }
  }

  if (hasHepaticImpairment(context)) {
    parts.push(`${context.hepaticFunction} hepatic function`);
  }

  if (context.comorbidities && context.comorbidities.length > 0) {
    parts.push(`with ${context.comorbidities.join(", ")}`);
  }

  if (context.allergies && context.allergies.length > 0) {
    parts.push(`allergic to ${context.allergies.join(", ")}`);
  }

  return parts.length > 0 ? parts.join(", ") : "adult patient";
}

/**
 * Common comorbidities list for UI
 */
export const COMMON_COMORBIDITIES = [
  "Chronic kidney disease",
  "Chronic liver disease",
  "Heart failure",
  "Coronary artery disease",
  "Diabetes mellitus",
  "Hypertension",
  "COPD/Asthma",
  "Immunocompromised",
  "HIV/AIDS",
  "Cancer",
  "Obesity",
  "Malnutrition",
] as const;

/**
 * Common drug allergies for UI
 */
export const COMMON_ALLERGIES = [
  "Penicillin",
  "Cephalosporins",
  "Sulfa drugs",
  "NSAIDs",
  "Aspirin",
  "Contrast dye",
  "Latex",
] as const;
