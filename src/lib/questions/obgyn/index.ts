/**
 * OB/GYN Emergency Medicine Question Bank
 * 
 * This module contains 210 comprehensive questions covering obstetric and gynecologic emergencies.
 * All questions are evidence-based per ACOG/RCOG 2020-2025 guidelines.
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

// ============================================================================
// ORGANIZED COLLECTIONS
// ============================================================================

/**
 * All Obstetric Emergency Questions (180 questions)
 * Includes: placenta previa, abruption, preeclampsia, preterm labour, 
 *          acute emergencies, vasa previa/rupture
 */
export const obstetricQuestions: Question[] = [
  ...placentaPreviaQuestions,
  ...placentalAbruptionQuestions,
  ...preeclampsiaQuestions,
  ...pretermLabourQuestions,
  ...obEmergenciesQuestions,
  ...vasaRuptureQuestions,
];

/**
 * All Gynecologic Emergency Questions (30 questions)
 * Includes: pain, bleeding, torsion, PID, endometriosis
 */
export const gynecologicQuestions: Question[] = [
  ...gynPainBleedingQuestions,
];

/**
 * All OB/GYN Questions Combined (210 questions)
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
  // Individual topics
  placentaPrevia: placentaPreviaQuestions.length,
  placentalAbruption: placentalAbruptionQuestions.length,
  preeclampsia: preeclampsiaQuestions.length,
  pretermLabour: pretermLabourQuestions.length,
  obstetricEmergencies: obEmergenciesQuestions.length,
  gynPainBleeding: gynPainBleedingQuestions.length,
  vasaPreviaRupture: vasaRuptureQuestions.length,
  
  // Category totals
  obstetricTotal: obstetricQuestions.length,
  gynecologicTotal: gynecologicQuestions.length,
  
  // Collections
  placentalComplicationsTotal: placentalComplications.length,
  hypertensiveDisordersTotal: hypertensiveDisorders.length,
  pretermComplicationsTotal: pretermComplications.length,
  acuteObstetricCrisesTotal: acuteObstetricCrises.length,
  
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
