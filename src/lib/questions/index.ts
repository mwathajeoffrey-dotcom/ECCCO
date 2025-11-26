// Central export file for all ECCCO questions
import { Question } from './types';

// Import all question sets (using actual export names from files)
import { aclsQuestions } from './acls';
import { aclscardiacarrestQuestions } from './acls-cardiac-arrest-questions';
import { adultOncologyBatch1Questions } from './adult-oncology-batch-1';
import { advancedEcgInterpretationQuestions } from './advanced-ecg-interpretation';
import { airwayManagementQuestions } from './airway-management';
import { algorithmQuestions } from './algorithm-questions-combined';
import { algorithmGeneratedQuestions } from './algorithm-questions-generated';
import { enhancedAlgorithmQuestions } from './enhanced-algorithm-questions';
import { anaphylaxismanagementQuestions } from './anaphylaxis-management-questions';
import { atlsQuestions } from './atls';
import { atlsprimarysurveyQuestions } from './atls-primary-survey-questions';
import { bloodGasAnalysisQuestions } from './blood-gas-analysis';
import { blsQuestions } from './bls';
import { cardiacEmergenciesQuestions } from './cardiac-emergencies';
import { chestXrayInterpretationQuestions } from './chest-xray-interpretation';
import { criticalCareEmergenciesQuestions } from './critical-care-emergencies';
import { diabeticketoacidosisQuestions } from './diabetic-ketoacidosis-questions';
import { ecgEmergenciesQuestions } from './ecg-emergencies';
import { ecgRhythmIdentificationQuestions } from './ecg-rhythm-identification';
import { electrolyteEmergenciesQuestions } from './electrolyte-emergencies';
import { endocrineEmergenciesQuestions } from './endocrine-emergencies';
import { environmentalEmergenciesQuestions } from './environmental-emergencies';
import { geriatricEmergenciesQuestions } from './geriatric-emergencies';
import { hematologicEmergenciesQuestions } from './hematologic-emergencies';
import { infectiousDiseaseEmergenciesQuestions } from './infectious-disease-emergencies';
import { massivetransfusionQuestions } from './massive-transfusion-questions';
import { mechanicalVentilationQuestions } from './mechanical-ventilation';
import { neurologicalEmergenciesQuestions } from './neurological-emergencies';
import { obgynQuestions } from './obgyn';
import { palsQuestions } from './pals';
import { pediatriccardiacarrestQuestions } from './pediatric-cardiac-arrest-questions';
import { pediatricEmergenciesQuestions } from './pediatric-emergencies';
import { pediatricOncologyBatch1Questions } from './pediatric-oncology-batch-1';
import { pharmacologyEmergenciesQuestions } from './pharmacology-emergencies';
import { pointOfCareUltrasoundQuestions } from './point-of-care-ultrasound';
import { proceduresQuestions } from './procedures';
import { psychiatricEmergenciesQuestions } from './psychiatric-emergencies';
import { renalEmergenciesQuestions } from './renal-emergencies';
import { respiratoryEmergenciesQuestions } from './respiratory-emergencies';
import { sepsishour1bundleQuestions } from './sepsis-hour-1-bundle-questions';
import { sepsisManagementQuestions } from './sepsis-management';
import { strokeacutemanagementQuestions } from './stroke-acute-management-questions';
import { toxicologyoverdoseQuestions } from './toxicology-overdose-questions';
import { toxicologyQuestions } from './toxicology';
import { traumaManagementQuestions } from './trauma-management';

// Combine all questions
export const allQuestions: Question[] = [
  ...aclsQuestions,
  ...aclscardiacarrestQuestions,
  ...adultOncologyBatch1Questions,
  ...advancedEcgInterpretationQuestions,
  ...airwayManagementQuestions,
  ...algorithmQuestions,
  ...algorithmGeneratedQuestions,
  ...enhancedAlgorithmQuestions,
  ...anaphylaxismanagementQuestions,
  ...atlsQuestions,
  ...atlsprimarysurveyQuestions,
  ...bloodGasAnalysisQuestions,
  ...blsQuestions,
  ...cardiacEmergenciesQuestions,
  ...chestXrayInterpretationQuestions,
  ...criticalCareEmergenciesQuestions,
  ...diabeticketoacidosisQuestions,
  ...ecgEmergenciesQuestions,
  ...ecgRhythmIdentificationQuestions,
  ...electrolyteEmergenciesQuestions,
  ...endocrineEmergenciesQuestions,
  ...environmentalEmergenciesQuestions,
  ...geriatricEmergenciesQuestions,
  ...hematologicEmergenciesQuestions,
  ...infectiousDiseaseEmergenciesQuestions,
  ...massivetransfusionQuestions,
  ...mechanicalVentilationQuestions,
  ...neurologicalEmergenciesQuestions,
  ...obgynQuestions,
  ...palsQuestions,
  ...pediatriccardiacarrestQuestions,
  ...pediatricEmergenciesQuestions,
  ...pediatricOncologyBatch1Questions,
  ...pharmacologyEmergenciesQuestions,
  ...pointOfCareUltrasoundQuestions,
  ...proceduresQuestions,
  ...psychiatricEmergenciesQuestions,
  ...renalEmergenciesQuestions,
  ...respiratoryEmergenciesQuestions,
  ...sepsishour1bundleQuestions,
  ...sepsisManagementQuestions,
  ...strokeacutemanagementQuestions,
  ...toxicologyoverdoseQuestions,
  ...toxicologyQuestions,
  ...traumaManagementQuestions,
];

// Organize by category
export const questionsByCategory = {
  'ACLS': [...aclsQuestions, ...aclscardiacarrestQuestions],
  'BLS': blsQuestions,
  'PALS': [...palsQuestions, ...pediatriccardiacarrestQuestions],
  'ATLS': [...atlsQuestions, ...atlsprimarysurveyQuestions],
  'Algorithms': [...algorithmQuestions, ...algorithmGeneratedQuestions, ...enhancedAlgorithmQuestions],
  'ECG': [...ecgRhythmIdentificationQuestions, ...advancedEcgInterpretationQuestions, ...ecgEmergenciesQuestions],
  'Cardiac Emergencies': cardiacEmergenciesQuestions,
  'Respiratory Emergencies': respiratoryEmergenciesQuestions,
  'Neurological Emergencies': neurologicalEmergenciesQuestions,
  'Trauma Management': traumaManagementQuestions,
  'Airway Management': airwayManagementQuestions,
  'Critical Care': criticalCareEmergenciesQuestions,
  'Toxicology': [...toxicologyQuestions, ...toxicologyoverdoseQuestions],
  'Sepsis': [...sepsisManagementQuestions, ...sepsishour1bundleQuestions],
  'Pediatric Emergencies': pediatricEmergenciesQuestions,
  'OB/GYN Emergencies': obgynQuestions,
  'Procedures': proceduresQuestions,
  'Pharmacology': pharmacologyEmergenciesQuestions,
  'Blood Gas Analysis': bloodGasAnalysisQuestions,
  'Chest X-Ray': chestXrayInterpretationQuestions,
  'POCUS': pointOfCareUltrasoundQuestions,
  'Mechanical Ventilation': mechanicalVentilationQuestions,
  'Electrolyte Emergencies': electrolyteEmergenciesQuestions,
  'Endocrine Emergencies': [...endocrineEmergenciesQuestions, ...diabeticketoacidosisQuestions],
  'Hematologic Emergencies': [...hematologicEmergenciesQuestions, ...massivetransfusionQuestions],
  'Infectious Disease': infectiousDiseaseEmergenciesQuestions,
  'Environmental Emergencies': environmentalEmergenciesQuestions,
  'Geriatric Emergencies': geriatricEmergenciesQuestions,
  'Psychiatric Emergencies': psychiatricEmergenciesQuestions,
  'Renal Emergencies': renalEmergenciesQuestions,
  'Anaphylaxis': anaphylaxismanagementQuestions,
  'Stroke': strokeacutemanagementQuestions,
  'Adult Oncologic Emergencies': adultOncologyBatch1Questions,
  'Pediatric Oncologic Emergencies': pediatricOncologyBatch1Questions,
};

export const getQuestionsByCategory = (category: string): Question[] => {
  return questionsByCategory[category as keyof typeof questionsByCategory] || [];
};

export const getAllQuestions = (): Question[] => {
  return allQuestions;
};

export const getRandomQuestions = (count: number, category?: string): Question[] => {
  const sourceQuestions = category ? getQuestionsByCategory(category) : allQuestions;
  const shuffled = [...sourceQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, sourceQuestions.length));
};

export const getTotalQuestionCount = (): number => {
  return allQuestions.length;
};

export const getCategoryList = (): string[] => {
  return Object.keys(questionsByCategory);
};

// Export types
export type { Question } from './types';