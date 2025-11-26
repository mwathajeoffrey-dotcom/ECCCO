import { Question } from '../types';
import { placentaPreviaQuestions } from './placenta-previa';
import { placentalAbruptionQuestions } from './placental-abruption';

// Export individual question sets
export { placentaPreviaQuestions } from './placenta-previa';
export { placentalAbruptionQuestions } from './placental-abruption';

// Combined OB/GYN questions export
export const obgynQuestions: Question[] = [
  ...placentaPreviaQuestions,
  ...placentalAbruptionQuestions,
];

// Export count for verification
export const obgynQuestionCount = {
  placentaPrevia: placentaPreviaQuestions.length,
  placentalAbruption: placentalAbruptionQuestions.length,
  total: obgynQuestions.length
};
