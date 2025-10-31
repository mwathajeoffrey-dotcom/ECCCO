import { Question } from './types';

export const sepsisManagementQuestions: Question[] = [
  {
    id: 'sepsis-001',
    question: 'According to Sepsis-3 definitions, what defines septic shock?',
    options: [
      'Hypotension requiring vasopressors despite adequate fluid resuscitation',
      'Hypotension and lactate >2 mmol/L despite adequate fluid resuscitation',
      'Persistent hypotension requiring vasopressors to maintain MAP ≥65 mmHg and lactate >2 mmol/L',
      'SOFA score increase ≥2 points with hypotension'
    ],
    correctIndex: 2,
    explanation: 'Septic shock is defined as persistent hypotension requiring vasopressors to maintain MAP ≥65 mmHg AND serum lactate >2 mmol/L (18 mg/dL) despite adequate volume resuscitation. This represents circulatory and cellular/metabolic dysfunction.',
    references: [
      'Singer M, et al. JAMA 2016;315:801-810',
      'Surviving Sepsis Campaign Guidelines 2021'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-002',
    question: 'What is the recommended initial fluid bolus for sepsis-induced hypoperfusion?',
    options: [
      '10 ml/kg crystalloid within 1 hour',
      '20 ml/kg crystalloid within 1 hour',
      '30 ml/kg crystalloid within 3 hours',
      '30 ml/kg crystalloid within 1 hour'
    ],
    correctIndex: 3,
    explanation: 'The Surviving Sepsis Campaign recommends at least 30 ml/kg of IV crystalloid within the first hour for patients with sepsis-induced hypoperfusion or septic shock. This is part of the 1-hour bundle.',
    references: [
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143',
      'Levy MM, et al. Intensive Care Med 2018;44:925-928'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-003',
    question: 'Which vasopressor is recommended as first-line therapy for septic shock?',
    options: [
      'Dopamine',
      'Norepinephrine',
      'Epinephrine',
      'Phenylephrine'
    ],
    correctIndex: 1,
    explanation: 'Norepinephrine is the first-line vasopressor for septic shock. It has predominantly alpha-adrenergic effects with some beta-1 activity, providing effective vasoconstriction with minimal cardiac side effects compared to dopamine.',
    references: [
      'De Backer D, et al. N Engl J Med 2010;362:779-789',
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-004',
    question: 'What is the target mean arterial pressure (MAP) for patients with septic shock?',
    options: [
      '≥55 mmHg',
      '≥65 mmHg',
      '≥75 mmHg',
      '≥85 mmHg'
    ],
    correctIndex: 1,
    explanation: 'The target MAP is ≥65 mmHg for patients with septic shock. This target balances adequate organ perfusion with minimizing vasopressor requirements. Higher targets (75-85 mmHg) may be considered for patients with chronic hypertension.',
    references: [
      'Asfar P, et al. N Engl J Med 2014;370:1583-1593',
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-005',
    question: 'Which antibiotic strategy is recommended for septic shock in the ICU?',
    options: [
      'Single broad-spectrum antibiotic',
      'Combination therapy with two or more antibiotics',
      'Antifungal therapy for all patients',
      'Narrow-spectrum based on likely organism'
    ],
    correctIndex: 1,
    explanation: 'Combination empirical therapy with two or more antibiotics with different mechanisms of action is recommended for septic shock to broaden coverage and potentially improve outcomes through synergistic effects, especially for high-risk pathogens.',
    references: [
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143',
      'Kumar A, et al. Crit Care Med 2009;37:1757-1765'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-006',
    question: 'How soon should antibiotics be administered in septic shock?',
    options: [
      'Within 30 minutes',
      'Within 1 hour',
      'Within 3 hours',
      'Within 6 hours'
    ],
    correctIndex: 1,
    explanation: 'Antibiotics should be administered within 1 hour of recognition of septic shock. This is part of the updated Surviving Sepsis Campaign 1-hour bundle, reflecting the critical importance of early antibiotic therapy.',
    references: [
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143',
      'Seymour CW, et al. N Engl J Med 2017;376:2235-2244'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-007',
    question: 'What is the recommended duration of empirical combination antibiotic therapy?',
    options: [
      '3-5 days',
      '7-10 days',
      '14 days',
      'Until discharge'
    ],
    correctIndex: 0,
    explanation: 'Empirical combination antibiotic therapy should be de-escalated within 3-5 days based on culture results and clinical response. Prolonged combination therapy increases risk of resistance and adverse effects without proven benefit.',
    references: [
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143',
      'Heenen S, et al. Crit Care 2012;16:R115'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-008',
    question: 'Which biomarker is most useful for guiding antibiotic duration in sepsis?',
    options: [
      'C-reactive protein (CRP)',
      'White blood cell count',
      'Procalcitonin',
      'Lactate'
    ],
    correctIndex: 2,
    explanation: 'Procalcitonin is the most useful biomarker for guiding antibiotic duration. A decreasing procalcitonin level or level <0.5 ng/mL can help guide antibiotic discontinuation, reducing unnecessary antibiotic exposure.',
    references: [
      'de Jong E, et al. Lancet Infect Dis 2016;16:819-827',
      'Bouadma L, et al. Lancet 2010;375:463-474'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-009',
    question: 'What is the recommended approach for corticosteroids in septic shock?',
    options: [
      'High-dose steroids (methylprednisolone 30 mg/kg) for all patients',
      'Low-dose steroids (hydrocortisone 200 mg/day) for vasopressor-dependent shock',
      'Steroids contraindicated in sepsis',
      'Dexamethasone only for specific infections'
    ],
    correctIndex: 1,
    explanation: 'Low-dose corticosteroids (hydrocortisone 200 mg/day in divided doses or continuous infusion) are suggested for adults with septic shock not responding to fluid resuscitation and moderate- to high-dose vasopressor therapy.',
    references: [
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143',
      'Annane D, et al. N Engl J Med 2018;378:809-818'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-010',
    question: 'Which parameter is NOT part of the qSOFA score?',
    options: [
      'Respiratory rate ≥22/min',
      'Altered mental status (GCS <15)',
      'Systolic blood pressure ≤100 mmHg',
      'Temperature >38°C or <36°C'
    ],
    correctIndex: 3,
    explanation: 'Temperature is NOT part of qSOFA. The qSOFA includes: respiratory rate ≥22/min, altered mental status (GCS <15), and systolic BP ≤100 mmHg. A score ≥2 suggests organ dysfunction and higher mortality risk.',
    references: [
      'Singer M, et al. JAMA 2016;315:801-810',
      'Seymour CW, et al. JAMA 2016;315:762-774'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-011',
    question: 'What is the target lactate clearance in sepsis management?',
    options: [
      '10% reduction in 2 hours',
      '20% reduction in 4 hours',
      '≥10% reduction in 2 hours or normalize if initially elevated',
      '50% reduction in 6 hours'
    ],
    correctIndex: 2,
    explanation: 'Lactate clearance of ≥10% within 2 hours or normalization if initially elevated is associated with improved outcomes. Serial lactate measurements help guide resuscitation efforts and assess treatment response.',
    references: [
      'Nguyen HB, et al. Crit Care Med 2004;32:1637-1642',
      'Jansen TC, et al. Am J Respir Crit Care Med 2010;182:752-761'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-012',
    question: 'Which is the most appropriate second-line vasopressor for septic shock?',
    options: [
      'Dopamine',
      'Vasopressin',
      'Phenylephrine',
      'Dobutamine'
    ],
    correctIndex: 1,
    explanation: 'Vasopressin (0.03-0.04 units/min) is recommended as a second-line vasopressor to be added to norepinephrine. It may help reduce norepinephrine requirements and has potential benefits in catecholamine-resistant shock.',
    references: [
      'Russell JA, et al. N Engl J Med 2008;358:877-887',
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-013',
    question: 'What is the recommended hemoglobin target for septic patients without active bleeding?',
    options: [
      '7-9 g/dL',
      '9-11 g/dL',
      '11-13 g/dL',
      '13-15 g/dL'
    ],
    correctIndex: 0,
    explanation: 'A restrictive red blood cell transfusion strategy with a hemoglobin target of 7-9 g/dL is recommended for septic patients without active bleeding, severe coronary artery disease, or acute MI. This reduces transfusion-related complications.',
    references: [
      'Holst LB, et al. N Engl J Med 2014;371:1381-1391',
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-014',
    question: 'Which glucose target is recommended for critically ill sepsis patients?',
    options: [
      '80-110 mg/dL (4.4-6.1 mmol/L)',
      '110-140 mg/dL (6.1-7.8 mmol/L)',
      '140-180 mg/dL (7.8-10.0 mmol/L)',
      '180-220 mg/dL (10.0-12.2 mmol/L)'
    ],
    correctIndex: 2,
    explanation: 'A blood glucose target of 140-180 mg/dL (7.8-10.0 mmol/L) is recommended. Tight glycemic control (80-110 mg/dL) increases hypoglycemia risk without proven benefit, while levels >180 mg/dL are associated with worse outcomes.',
    references: [
      'NICE-SUGAR Study Investigators. N Engl J Med 2009;360:1283-1297',
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-015',
    question: 'What is the most appropriate sedation strategy for mechanically ventilated sepsis patients?',
    options: [
      'Deep sedation to prevent patient-ventilator dyssynchrony',
      'Light sedation with daily interruption',
      'No sedation unless absolutely necessary',
      'Propofol infusion for all patients'
    ],
    correctIndex: 1,
    explanation: 'Light sedation with daily sedation interruption is recommended. This approach reduces duration of mechanical ventilation, ICU length of stay, and long-term cognitive impairment while maintaining patient comfort and safety.',
    references: [
      'Barr J, et al. Crit Care Med 2013;41:263-306',
      'Girard TD, et al. Lancet 2008;371:126-134'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-016',
    question: 'Which antibiotic is most appropriate for severe community-acquired pneumonia with septic shock?',
    options: [
      'Levofloxacin alone',
      'Ceftriaxone + azithromycin',
      'Piperacillin-tazobactam + levofloxacin',
      'Vancomycin + ceftaroline'
    ],
    correctIndex: 2,
    explanation: 'For severe CAP with septic shock, combination therapy with an anti-pseudomonal beta-lactam (like piperacillin-tazobactam) plus a respiratory fluoroquinolone provides broad coverage including atypical pathogens and potential resistant organisms.',
    references: [
      'Metlay JP, et al. Am J Respir Crit Care Med 2019;200:e45-e67',
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-017',
    question: 'What is the recommended approach for source control in sepsis?',
    options: [
      'Always perform within 6 hours',
      'As soon as medically and logistically feasible',
      'Only after hemodynamic stabilization',
      'Wait for culture results'
    ],
    correctIndex: 1,
    explanation: 'Source control should be implemented as soon as medically and logistically feasible, ideally within 6-12 hours of diagnosis. This includes drainage of infected fluid collections, removal of infected devices, or surgical debridement.',
    references: [
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143',
      'Bloos F, et al. Intensive Care Med 2017;43:915-928'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-018',
    question: 'Which crystalloid solution is preferred for sepsis resuscitation?',
    options: [
      'Normal saline (0.9% NaCl)',
      'Balanced crystalloids (e.g., lactated Ringer\'s)',
      'Dextrose-containing solutions',
      'Hypertonic saline'
    ],
    correctIndex: 1,
    explanation: 'Balanced crystalloids (lactated Ringer\'s, Plasma-Lyte) are preferred over normal saline for sepsis resuscitation. They have electrolyte compositions closer to plasma and may reduce the risk of hyperchloremic acidosis and acute kidney injury.',
    references: [
      'Semler MW, et al. N Engl J Med 2018;378:829-839',
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-019',
    question: 'What is the recommended approach for renal replacement therapy in sepsis-associated AKI?',
    options: [
      'Early initiation for all patients with AKI',
      'Continuous renal replacement therapy (CRRT) for hemodynamically unstable patients',
      'Intermittent hemodialysis only',
      'Wait until uremic complications develop'
    ],
    correctIndex: 1,
    explanation: 'CRRT is preferred for hemodynamically unstable sepsis patients with AKI as it allows better hemodynamic tolerance and fluid management. The timing should be based on conventional indications rather than early prophylactic initiation.',
    references: [
      'Zarbock A, et al. N Engl J Med 2016;375:122-133',
      'KDIGO AKI Guidelines 2012'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-020',
    question: 'Which parameter best guides fluid responsiveness in septic shock?',
    options: [
      'Central venous pressure (CVP)',
      'Passive leg raise (PLR) test',
      'Mean arterial pressure',
      'Urine output'
    ],
    correctIndex: 1,
    explanation: 'Passive leg raise (PLR) test is superior to static measures like CVP for predicting fluid responsiveness. Dynamic measures including PLR, stroke volume variation, and pulse pressure variation better assess volume status.',
    references: [
      'Monnet X, et al. Ann Intensive Care 2016;6:111',
      'Marik PE, et al. Crit Care Med 2008;36:2673-2679'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-021',
    question: 'What is the most common cause of sepsis in hospitalized patients?',
    options: [
      'Pneumonia',
      'Urinary tract infection',
      'Intra-abdominal infection',
      'Catheter-related bloodstream infection'
    ],
    correctIndex: 0,
    explanation: 'Pneumonia is the most common cause of sepsis in hospitalized patients, accounting for approximately 50% of cases. Hospital-acquired pneumonia and ventilator-associated pneumonia are major contributors in ICU settings.',
    references: [
      'Vincent JL, et al. JAMA 2006;295:238-244',
      'Fleischmann C, et al. Am J Respir Crit Care Med 2016;193:259-272'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-022',
    question: 'Which scoring system is recommended for assessing organ dysfunction in sepsis?',
    options: [
      'APACHE II',
      'SAPS II',
      'SOFA (Sequential Organ Failure Assessment)',
      'MODS (Multiple Organ Dysfunction Score)'
    ],
    correctIndex: 2,
    explanation: 'SOFA score is the recommended scoring system for assessing organ dysfunction in sepsis. An increase of ≥2 points from baseline defines sepsis according to Sepsis-3 criteria. It evaluates six organ systems.',
    references: [
      'Singer M, et al. JAMA 2016;315:801-810',
      'Vincent JL, et al. Intensive Care Med 1996;22:707-710'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-023',
    question: 'What is the recommended DVT prophylaxis for sepsis patients?',
    options: [
      'Mechanical prophylaxis only',
      'Pharmacological prophylaxis with LMWH or UFH',
      'No prophylaxis due to bleeding risk',
      'Full anticoagulation for all patients'
    ],
    correctIndex: 1,
    explanation: 'Pharmacological DVT prophylaxis with LMWH or UFH is recommended for sepsis patients unless contraindicated by severe bleeding risk. Mechanical prophylaxis should be added when pharmacological prophylaxis is contraindicated.',
    references: [
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143',
      'Kahn SR, et al. Chest 2012;141:e195S-e226S'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-024',
    question: 'Which intervention is recommended for stress ulcer prophylaxis in sepsis patients?',
    options: [
      'Proton pump inhibitors for all patients',
      'H2 receptor antagonists for all patients',
      'PPI or H2RA for patients with bleeding risk factors',
      'No prophylaxis recommended'
    ],
    correctIndex: 2,
    explanation: 'Stress ulcer prophylaxis with PPI or H2 receptor antagonists is recommended for sepsis patients with risk factors for GI bleeding (mechanical ventilation, coagulopathy, prior GI bleeding). Universal prophylaxis is not recommended.',
    references: [
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143',
      'Krag M, et al. N Engl J Med 2018;379:2199-2208'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-025',
    question: 'What is the recommended protein intake for critically ill sepsis patients?',
    options: [
      '0.8-1.0 g/kg/day',
      '1.2-1.5 g/kg/day',
      '1.2-2.0 g/kg/day',
      '2.5-3.0 g/kg/day'
    ],
    correctIndex: 2,
    explanation: 'Protein intake of 1.2-2.0 g/kg/day is recommended for critically ill sepsis patients to meet increased metabolic demands and support recovery. Higher protein needs may be required in severe catabolism.',
    references: [
      'McClave SA, et al. JPEN J Parenter Enteral Nutr 2016;40:159-211',
      'Singer P, et al. Intensive Care Med 2019;45:300-318'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-026',
    question: 'Which antimicrobial is most appropriate for suspected MRSA pneumonia in septic shock?',
    options: [
      'Clindamycin',
      'Vancomycin',
      'Linezolid',
      'Ceftaroline'
    ],
    correctIndex: 2,
    explanation: 'Linezolid is preferred over vancomycin for MRSA pneumonia due to better lung penetration and potentially superior outcomes. Vancomycin has poor lung tissue penetration and requires monitoring of levels.',
    references: [
      'Wunderink RG, et al. Clin Infect Dis 2012;54:621-629',
      'Kalil AC, et al. Clin Infect Dis 2016;63:e61-e111'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-027',
    question: 'What is the most appropriate fluid challenge technique for assessing fluid responsiveness?',
    options: [
      '250 ml over 30 minutes',
      '500 ml over 15 minutes',
      '1000 ml over 60 minutes',
      '100 ml over 5 minutes'
    ],
    correctIndex: 1,
    explanation: 'A fluid challenge of 500 ml of crystalloid over 15 minutes is appropriate for assessing fluid responsiveness. This provides adequate volume over a short enough time to assess response while minimizing fluid overload risk.',
    references: [
      'Cecconi M, et al. Intensive Care Med 2014;40:1795-1815',
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-028',
    question: 'Which is the most accurate method for measuring cardiac output in septic shock?',
    options: [
      'Thermodilution with pulmonary artery catheter',
      'Echocardiography',
      'Pulse contour analysis',
      'Bioimpedance'
    ],
    correctIndex: 1,
    explanation: 'Echocardiography (transthoracic or transesophageal) is considered the most practical and accurate method for assessing cardiac function and output in septic shock. It\'s non-invasive and provides comprehensive hemodynamic information.',
    references: [
      'Cecconi M, et al. Intensive Care Med 2014;40:1795-1815',
      'Mayo PH, et al. Chest 2017;151:102-109'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-029',
    question: 'What is the recommended duration of antibiotic therapy for uncomplicated sepsis?',
    options: [
      '5-7 days',
      '7-10 days',
      '10-14 days',
      '14-21 days'
    ],
    correctIndex: 1,
    explanation: 'A duration of 7-10 days is recommended for most cases of uncomplicated sepsis. Shorter courses (5-7 days) may be appropriate if source control is achieved and clinical response is good. Procalcitonin can guide duration.',
    references: [
      'Evans L, et al. Crit Care Med 2021;49:e1063-e1143',
      'Sawyer RG, et al. Clin Infect Dis 2015;60:1308-1315'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-030',
    question: 'Which factor most strongly predicts mortality in septic shock?',
    options: [
      'Age >65 years',
      'Number of organ failures',
      'Lactate level >4 mmol/L',
      'Duration of hypotension'
    ],
    correctIndex: 1,
    explanation: 'The number of organ failures is the strongest predictor of mortality in septic shock. Each additional organ failure significantly increases mortality risk. This is reflected in scoring systems like SOFA.',
    references: [
      'Ferreira FL, et al. JAMA 2001;286:1754-1758',
      'Vincent JL, et al. Crit Care Med 1998;26:1793-1800'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  }
];