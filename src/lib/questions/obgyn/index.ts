/**
 * OB/GYN Emergency Medicine Question Bank
 * 
 * This module contains 480 comprehensive questions covering obstetric and gynecologic emergencies
 * and medical comorbidities in pregnancy.
 * All questions are evidence-based per ACOG/RCOG/ASH/ATA/KDIGO 2023-2025 guidelines.
 * 
 * @module obgyn
 * @see README.md for detailed documentation
 */

import { Question } from '../types';

// Import all OB/GYN question sets
import { placentaPreviaQuestions } from './placenta-previa';
import { placentalAbruptionQuestions } from './placental-abruption';
import { preeclampsiaQuestions } from './preeclampsia';
import { pretermLabourQuestions } from './preterm-labour';
import { obEmergenciesQuestions } from './obstetric-emergencies';
import { gynPainBleedingQuestions } from './gyn-pain-bleeding';
import { vasaRuptureQuestions } from './vasa-previa-rupture';
import { generalObgynEmergenciesQuestions } from './general-obgyn-emergencies';

// Import medical comorbidities in pregnancy question sets (2024-2025)
import cardiacDiseasePregnancyQuestions from './cardiac-disease-pregnancy';
import diabetesPregnancyQuestions from './diabetes-pregnancy';
import hypertensiveDisordersPregnancyQuestions from './hypertensive-disorders';
import thromboembolismPregnancyQuestions from './thromboembolism-pregnancy';
import infectiousDiseasePregnancyQuestions from './infectious-disease-pregnancy';
import renalDiseasePregnancyQuestions from './renal-disease-pregnancy';
import thyroidDisordersPregnancyQuestions from './thyroid-disorders-pregnancy';
import hematologicDisordersPregnancyQuestions from './hematologic-disorders-pregnancy';

// ============================================================================
// INDIVIDUAL TOPIC EXPORTS
// ============================================================================

/**
 * Placenta Previa Questions (30)
 * - Diagnosis and classification
 * - Management strategies
 * - Delivery timing and outcomes
 */
export { placentaPreviaQuestions } from './placenta-previa';

/**
 * Placental Abruption Questions (30)
 * - Risk factors and presentation
 * - Emergency management
 * - Maternal-fetal outcomes
 */
export { placentalAbruptionQuestions } from './placental-abruption';

/**
 * Preeclampsia & Eclampsia Questions (30)
 * - Diagnostic criteria and severe features
 * - HELLP syndrome
 * - Magnesium sulfate protocols
 * - Antihypertensive management
 */
export { preeclampsiaQuestions } from './preeclampsia';

/**
 * Preterm Labour & PPROM Questions (30)
 * - Tocolytic therapy
 * - Antenatal corticosteroids
 * - Neuroprotection
 * - GBS prophylaxis
 */
export { pretermLabourQuestions } from './preterm-labour';

/**
 * Obstetric Emergencies Questions (30)
 * - Cord prolapse
 * - Shoulder dystocia
 * - Postpartum hemorrhage
 * - Uterine inversion
 * - Amniotic fluid embolism
 */
export { obEmergenciesQuestions } from './obstetric-emergencies';

/**
 * Gynecologic Pain & Bleeding Questions (30)
 * - Postmenopausal bleeding
 * - Endometrial cancer
 * - Ovarian torsion
 * - PID
 * - Endometriosis
 */
export { gynPainBleedingQuestions } from './gyn-pain-bleeding';

/**
 * Vasa Previa & Uterine Rupture Questions (30)
 * - Vasa previa diagnosis
 * - Uterine rupture risk factors
 * - TOLAC/VBAC considerations
 */
export { vasaRuptureQuestions } from './vasa-previa-rupture';

/**
 * General OB/GYN Emergencies Questions (30)
 * - Ectopic pregnancy
 * - Ovarian torsion
 * - Hyperemesis gravidarum
 * - PID and vulvovaginal conditions
 * - Gestational trophoblastic disease
 * - Postpartum complications
 * - Trauma in pregnancy
 */
export { generalObgynEmergenciesQuestions } from './general-obgyn-emergencies';

/**
 * Cardiac Disease in Pregnancy Questions (30)
 * - Valvular disease (mitral stenosis, aortic stenosis)
 * - Congenital heart disease (WHO classification, tetralogy of Fallot, Marfan syndrome)
 * - Peripartum cardiomyopathy (PPCM)
 * - Mechanical valve anticoagulation
 * - Based on ESC 2023/2024, ACC/AHA 2024 guidelines
 */
export { cardiacDiseasePregnancyQuestions };

/**
 * Diabetes in Pregnancy Questions (30)
 * - GDM screening (1-hour GCT, 3-hour OGTT)
 * - Glucose targets and HbA1c goals
 * - Insulin and oral agent management
 * - Delivery timing and macrosomia
 * - Based on ADA 2025 Standards of Care
 */
export { diabetesPregnancyQuestions };

/**
 * Hypertensive Disorders in Pregnancy Questions (30)
 * - Chronic hypertension (CHAP trial 2022 evidence)
 * - Superimposed preeclampsia
 * - Medication management (labetalol, nifedipine)
 * - Aspirin prophylaxis
 * - Based on AHA/ACC 2024, ACOG 2024, ISSHP 2024 guidelines
 */
export { hypertensiveDisordersPregnancyQuestions };

/**
 * Thromboembolism in Pregnancy Questions (30)
 * - VTE prevention and treatment
 * - LMWH dosing and anti-Xa monitoring
 * - Antiphospholipid syndrome (revised Sydney 2023 criteria)
 * - Neuraxial timing (ASRA 2024 guidelines)
 * - Based on ASH 2024, ACCP 2021 guidelines
 */
export { thromboembolismPregnancyQuestions };

/**
 * Infectious Disease in Pregnancy Questions (30)
 * - HIV (U=U concept, vertical transmission prevention)
 * - Hepatitis B and C management
 * - Herpes simplex virus (HSV) and suppression
 * - Group B Streptococcus (GBS) prophylaxis
 * - TORCH infections, COVID-19, vaccines
 * - Based on CDC 2024, NIH 2024, WHO 2024 guidelines
 */
export { infectiousDiseasePregnancyQuestions };

/**
 * Renal Disease in Pregnancy Questions (30)
 * - CKD staging and pregnancy outcomes
 * - Dialysis intensification (≥20 hours/week)
 * - Renal transplant management
 * - Preeclampsia vs CKD flare differentiation
 * - Based on KDIGO 2024, ASN 2024 guidelines
 */
export { renalDiseasePregnancyQuestions };

/**
 * Thyroid Disorders in Pregnancy Questions (30)
 * - Hypothyroidism and levothyroxine adjustment
 * - Hyperthyroidism and antithyroid drugs (PTU vs methimazole)
 * - TSH pregnancy-specific ranges (ATA 2024)
 * - TRAb monitoring and fetal thyrotoxicosis
 * - Postpartum thyroiditis
 * - Based on ATA 2024, Endocrine Society 2024 guidelines
 */
export { thyroidDisordersPregnancyQuestions };

/**
 * Hematologic Disorders in Pregnancy Questions (30)
 * - Anemia (iron deficiency, B12, folate)
 * - Thrombocytopenia (gestational, ITP)
 * - Bleeding disorders (von Willebrand, hemophilia)
 * - Sickle cell disease and thalassemia
 * - Transfusion medicine
 * - Based on ASH 2024, ACOG 2024, NHLBI 2024 guidelines
 */
export { hematologicDisordersPregnancyQuestions };

// ============================================================================
// ORGANIZED COLLECTIONS
// ============================================================================

/**
 * Medical Comorbidities in Pregnancy (240 questions)
 * Includes: cardiac disease, diabetes, hypertensive disorders, thromboembolism,
 *          infectious disease, renal disease, thyroid disorders, hematologic disorders
 * Based on 2024-2025 guidelines (ESC, ADA, CHAP, ASH, ASRA, CDC, NIH, WHO, KDIGO, ATA)
 */
export const medicalComorbidities: Question[] = [
  ...cardiacDiseasePregnancyQuestions,
  ...diabetesPregnancyQuestions,
  ...hypertensiveDisordersPregnancyQuestions,
  ...thromboembolismPregnancyQuestions,
  ...infectiousDiseasePregnancyQuestions,
  ...renalDiseasePregnancyQuestions,
  ...thyroidDisordersPregnancyQuestions,
  ...hematologicDisordersPregnancyQuestions,
];

/**
 * All Obstetric Emergency Questions (420 questions)
 * Includes: placenta previa, abruption, preeclampsia, preterm labour, 
 *          acute emergencies, vasa previa/rupture, medical comorbidities
 */
export const obstetricQuestions: Question[] = [
  ...placentaPreviaQuestions,
  ...placentalAbruptionQuestions,
  ...preeclampsiaQuestions,
  ...pretermLabourQuestions,
  ...obEmergenciesQuestions,
  ...vasaRuptureQuestions,
  ...medicalComorbidities,
];

/**
 * All Gynecologic Emergency Questions (60 questions)
 * Includes: pain, bleeding, torsion, PID, endometriosis, general emergencies
 */
export const gynecologicQuestions: Question[] = [
  ...gynPainBleedingQuestions,
  ...generalObgynEmergenciesQuestions,
];

/**
 * All OB/GYN Questions Combined (480 questions)
 * Complete question bank for comprehensive study
 */
export const obgynQuestions: Question[] = [
  ...obstetricQuestions,
  ...gynecologicQuestions,
];

// ============================================================================
// HIGH-RISK PREGNANCY SUBSETS
// ============================================================================

/**
 * Placental Complications (60 questions)
 * Focus: Previa, abruption, vasa previa
 */
export const placentalComplications: Question[] = [
  ...placentaPreviaQuestions,
  ...placentalAbruptionQuestions,
  ...vasaRuptureQuestions,
];

/**
 * Hypertensive Disorders (30 questions)
 * Focus: Preeclampsia, eclampsia, HELLP
 */
export const hypertensiveDisorders: Question[] = [
  ...preeclampsiaQuestions,
];

/**
 * Preterm Complications (30 questions)
 * Focus: Preterm labor, PPROM, tocolysis
 */
export const pretermComplications: Question[] = [
  ...pretermLabourQuestions,
];

/**
 * Acute Obstetric Crises (30 questions)
 * Focus: Cord prolapse, shoulder dystocia, PPH, AFE
 */
export const acuteObstetricCrises: Question[] = [
  ...obEmergenciesQuestions,
];

// ============================================================================
// METADATA & STATISTICS
// ============================================================================

/**
 * Question counts by topic
 * Useful for verification and progress tracking
 */
export const obgynQuestionCount = {
  // Individual topics - Emergencies
  placentaPrevia: placentaPreviaQuestions.length,
  placentalAbruption: placentalAbruptionQuestions.length,
  preeclampsia: preeclampsiaQuestions.length,
  pretermLabour: pretermLabourQuestions.length,
  obstetricEmergencies: obEmergenciesQuestions.length,
  gynPainBleeding: gynPainBleedingQuestions.length,
  vasaPreviaRupture: vasaRuptureQuestions.length,
  generalObgynEmergencies: generalObgynEmergenciesQuestions.length,
  
  // Individual topics - Medical Comorbidities (2024-2025)
  cardiacDisease: cardiacDiseasePregnancyQuestions.length,
  diabetesInPregnancy: diabetesPregnancyQuestions.length,
  hypertensiveDisordersPregnancy: hypertensiveDisordersPregnancyQuestions.length,
  thromboembolism: thromboembolismPregnancyQuestions.length,
  infectiousDisease: infectiousDiseasePregnancyQuestions.length,
  renalDisease: renalDiseasePregnancyQuestions.length,
  thyroidDisorders: thyroidDisordersPregnancyQuestions.length,
  hematologicDisorders: hematologicDisordersPregnancyQuestions.length,
  
  // Category totals
  obstetricTotal: obstetricQuestions.length,
  gynecologicTotal: gynecologicQuestions.length,
  
  // Collections
  placentalComplicationsTotal: placentalComplications.length,
  hypertensiveDisordersTotal: hypertensiveDisorders.length,
  pretermComplicationsTotal: pretermComplications.length,
  acuteObstetricCrisesTotal: acuteObstetricCrises.length,
  medicalComorbiditiesTotal: medicalComorbidities.length,
  
  // Grand total
  total: obgynQuestions.length
};

/**
 * Topic metadata for UI display and filtering
 */
export const obgynTopics = [
  {
    id: 'placenta-previa',
    name: 'Placenta Previa',
    category: 'obstetric',
    subcategory: 'placental-complications',
    questionCount: placentaPreviaQuestions.length,
    difficulty: 'medium',
    estimatedMinutes: 45
  },
  {
    id: 'placental-abruption',
    name: 'Placental Abruption',
    category: 'obstetric',
    subcategory: 'placental-complications',
    questionCount: placentalAbruptionQuestions.length,
    difficulty: 'medium',
    estimatedMinutes: 45
  },
  {
    id: 'preeclampsia',
    name: 'Preeclampsia & Eclampsia',
    category: 'obstetric',
    subcategory: 'hypertensive-disorders',
    questionCount: preeclampsiaQuestions.length,
    difficulty: 'hard',
    estimatedMinutes: 50
  },
  {
    id: 'preterm-labour',
    name: 'Preterm Labour & PPROM',
    category: 'obstetric',
    subcategory: 'preterm-complications',
    questionCount: pretermLabourQuestions.length,
    difficulty: 'medium',
    estimatedMinutes: 45
  },
  {
    id: 'obstetric-emergencies',
    name: 'Obstetric Emergencies',
    category: 'obstetric',
    subcategory: 'acute-crises',
    questionCount: obEmergenciesQuestions.length,
    difficulty: 'hard',
    estimatedMinutes: 50
  },
  {
    id: 'gyn-pain-bleeding',
    name: 'Gynecologic Pain & Bleeding',
    category: 'gynecologic',
    subcategory: 'general',
    questionCount: gynPainBleedingQuestions.length,
    difficulty: 'medium',
    estimatedMinutes: 45
  },
  {
    id: 'vasa-previa-rupture',
    name: 'Vasa Previa & Uterine Rupture',
    category: 'obstetric',
    subcategory: 'rare-complications',
    questionCount: vasaRuptureQuestions.length,
    difficulty: 'hard',
    estimatedMinutes: 50
  },
  {
    id: 'general-obgyn-emergencies',
    name: 'General OB/GYN Emergencies',
    category: 'gynecologic',
    subcategory: 'mixed',
    questionCount: generalObgynEmergenciesQuestions.length,
    difficulty: 'medium',
    estimatedMinutes: 45
  },
  {
    id: 'cardiac-disease-pregnancy',
    name: 'Cardiac Disease in Pregnancy',
    category: 'obstetric',
    subcategory: 'medical-comorbidities',
    questionCount: cardiacDiseasePregnancyQuestions.length,
    difficulty: 'hard',
    estimatedMinutes: 50
  },
  {
    id: 'diabetes-pregnancy',
    name: 'Diabetes in Pregnancy',
    category: 'obstetric',
    subcategory: 'medical-comorbidities',
    questionCount: diabetesPregnancyQuestions.length,
    difficulty: 'hard',
    estimatedMinutes: 50
  },
  {
    id: 'hypertensive-disorders-pregnancy',
    name: 'Hypertensive Disorders in Pregnancy',
    category: 'obstetric',
    subcategory: 'medical-comorbidities',
    questionCount: hypertensiveDisordersPregnancyQuestions.length,
    difficulty: 'hard',
    estimatedMinutes: 50
  },
  {
    id: 'thromboembolism-pregnancy',
    name: 'Thromboembolism in Pregnancy',
    category: 'obstetric',
    subcategory: 'medical-comorbidities',
    questionCount: thromboembolismPregnancyQuestions.length,
    difficulty: 'hard',
    estimatedMinutes: 50
  },
  {
    id: 'infectious-disease-pregnancy',
    name: 'Infectious Disease in Pregnancy',
    category: 'obstetric',
    subcategory: 'medical-comorbidities',
    questionCount: infectiousDiseasePregnancyQuestions.length,
    difficulty: 'hard',
    estimatedMinutes: 50
  },
  {
    id: 'renal-disease-pregnancy',
    name: 'Renal Disease in Pregnancy',
    category: 'obstetric',
    subcategory: 'medical-comorbidities',
    questionCount: renalDiseasePregnancyQuestions.length,
    difficulty: 'hard',
    estimatedMinutes: 50
  },
  {
    id: 'thyroid-disorders-pregnancy',
    name: 'Thyroid Disorders in Pregnancy',
    category: 'obstetric',
    subcategory: 'medical-comorbidities',
    questionCount: thyroidDisordersPregnancyQuestions.length,
    difficulty: 'hard',
    estimatedMinutes: 50
  },
  {
    id: 'hematologic-disorders-pregnancy',
    name: 'Hematologic Disorders in Pregnancy',
    category: 'obstetric',
    subcategory: 'medical-comorbidities',
    questionCount: hematologicDisordersPregnancyQuestions.length,
    difficulty: 'hard',
    estimatedMinutes: 50
  }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get questions by category
 * @param category - 'obstetric' or 'gynecologic'
 * @returns Filtered question array
 */
export const getQuestionsByCategory = (category: 'obstetric' | 'gynecologic'): Question[] => {
  return category === 'obstetric' ? obstetricQuestions : gynecologicQuestions;
};

/**
 * Get questions by subcategory
 * @param subcategory - Specific clinical area
 * @returns Filtered question array
 */
export const getQuestionsBySubcategory = (subcategory: string): Question[] => {
  const subcategoryMap: Record<string, Question[]> = {
    'placental-complications': placentalComplications,
    'hypertensive-disorders': hypertensiveDisorders,
    'preterm-complications': pretermComplications,
    'acute-crises': acuteObstetricCrises,
  };
  return subcategoryMap[subcategory] || [];
};

/**
 * Get random questions from OB/GYN bank
 * @param count - Number of questions to return
 * @param category - Optional category filter
 * @returns Shuffled question array
 */
export const getRandomObgynQuestions = (
  count: number, 
  category?: 'obstetric' | 'gynecologic'
): Question[] => {
  const source = category ? getQuestionsByCategory(category) : obgynQuestions;
  const shuffled = [...source].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, source.length));
};
