import { Question } from '../types';
import { placentaPreviaQuestions } from './placenta-previa';
import { placentalAbruptionQuestions } from './placental-abruption';
import { preeclampsiaQuestions } from './preeclampsia';
import { pretermLabourQuestions } from './preterm-labour';
import { obEmergenciesQuestions } from './obstetric-emergencies';
import { gynPainBleedingQuestions } from './gyn-pain-bleeding';
import { vasaRuptureQuestions } from './vasa-previa-rupture';

// Export individual question sets
export { placentaPreviaQuestions } from './placenta-previa';
export { placentalAbruptionQuestions } from './placental-abruption';
export { preeclampsiaQuestions } from './preeclampsia';
export { pretermLabourQuestions } from './preterm-labour';
export { obEmergenciesQuestions } from './obstetric-emergencies';
export { gynPainBleedingQuestions } from './gyn-pain-bleeding';
export { vasaRuptureQuestions } from './vasa-previa-rupture';

// Combined OB/GYN questions export
export const obgynQuestions: Question[] = [
  ...placentaPreviaQuestions,
  ...placentalAbruptionQuestions,
  ...preeclampsiaQuestions,
  ...pretermLabourQuestions,
  ...obEmergenciesQuestions,
  ...gynPainBleedingQuestions,
  ...vasaRuptureQuestions,
];

// Export count for verification
export const obgynQuestionCount = {
  placentaPrevia: placentaPreviaQuestions.length,
  placentalAbruption: placentalAbruptionQuestions.length,
  preeclampsia: preeclampsiaQuestions.length,
  pretermLabour: pretermLabourQuestions.length,
  obstetricEmergencies: obEmergenciesQuestions.length,
  gynPainBleeding: gynPainBleedingQuestions.length,
  vasaRupture: vasaRuptureQuestions.length,
  total: obgynQuestions.length
};
