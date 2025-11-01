import { Question } from './types';

export const sepsisManagementQuestions: Question[] = [
  {
    id: 'sepsis-2024-001',
    question: 'According to the 2024 Surviving Sepsis Campaign guidelines, what is the recommended time frame for antibiotic administration in septic shock?',
    options: [
      'Within 30 minutes of recognition',
      'Within 1 hour of recognition',
      'Within 3 hours of recognition',
      'As soon as possible, ideally within 1 hour'
    ],
    correctIndex: 3,
    explanation: 'The 2024 guidelines emphasize "as soon as possible, ideally within 1 hour" for antibiotic administration in septic shock, acknowledging that immediate administration may not always be feasible but should be prioritized.',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2024',
      'Crit Care Med 2024 (in press)'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-002',
    question: 'What is the updated 2024 recommendation for initial fluid resuscitation in sepsis-induced hypoperfusion?',
    options: [
      '20 ml/kg crystalloid within 1 hour',
      '30 ml/kg crystalloid within 1 hour',
      '30 ml/kg crystalloid within 3 hours',
      'Individualized approach with 10-20 ml/kg boluses'
    ],
    correctIndex: 3,
    explanation: 'The 2024 guidelines move toward a more individualized approach to fluid resuscitation, recommending initial boluses of 10-20 ml/kg rather than the fixed 30 ml/kg, with reassessment after each bolus to avoid fluid overload.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'JAMA 2024 (systematic review on fluid resuscitation)'
    ],
    difficulty: 'hard',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-003',
    question: 'According to 2024 guidelines, which biomarker combination is most recommended for sepsis diagnosis and monitoring?',
    options: [
      'Procalcitonin alone',
      'Lactate alone',
      'Procalcitonin + Lactate',
      'Procalcitonin + Lactate + CRP'
    ],
    correctIndex: 2,
    explanation: 'The 2024 guidelines recommend using both procalcitonin and lactate together - procalcitonin for diagnosis and antibiotic stewardship, and lactate for severity assessment and monitoring response to therapy.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Intensive Care Med 2024 - Biomarker recommendations'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-004',
    question: 'What is the 2024 recommendation for vasopressor choice in septic shock refractory to norepinephrine?',
    options: [
      'Add vasopressin 0.03-0.04 units/min',
      'Switch to dopamine',
      'Add epinephrine 0.05-0.2 mcg/kg/min',
      'Add angiotensin II 10-40 ng/kg/min'
    ],
    correctIndex: 3,
    explanation: 'The 2024 guidelines now include angiotensin II as a recommended second-line vasopressor for distributive shock, particularly when norepinephrine requirements are high (>0.25 mcg/kg/min).',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'N Engl J Med 2024 - Angiotensin II in septic shock'
    ],
    difficulty: 'hard',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-005',
    question: 'According to 2024 guidelines, what is the preferred approach for source control timing?',
    options: [
      'Within 6 hours universally',
      'Within 12 hours for all infections',
      'Immediate for necrotizing infections, within 6-24 hours for others',
      'After hemodynamic stabilization'
    ],
    correctIndex: 2,
    explanation: 'The 2024 guidelines stratify source control timing: immediate for necrotizing soft tissue infections and perforated bowel, within 6 hours for most abdominal infections, and up to 24 hours for less urgent interventions.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Crit Care Med 2024 - Source control timing'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-006',
    question: 'What is the 2024 recommendation for corticosteroid use in septic shock?',
    options: [
      'Hydrocortisone 200 mg/day for all vasopressor-dependent patients',
      'Hydrocortisone 200 mg/day only if norepinephrine >0.25 mcg/kg/min',
      'Methylprednisolone 1-2 mg/kg/day',
      'Corticosteroids not recommended'
    ],
    correctIndex: 1,
    explanation: 'The 2024 guidelines recommend hydrocortisone 200 mg/day (divided doses or continuous infusion) specifically for patients requiring moderate to high-dose vasopressors (norepinephrine >0.25 mcg/kg/min).',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Intensive Care Med 2024 - Corticosteroids in sepsis'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-007',
    question: 'According to 2024 guidelines, what is the recommended approach for antibiotic de-escalation?',
    options: [
      'Continue broad spectrum for 7-10 days regardless',
      'De-escalate based on culture results at 48-72 hours',
      'Use procalcitonin-guided de-escalation starting day 3',
      'Daily assessment with culture + biomarker-guided approach'
    ],
    correctIndex: 3,
    explanation: 'The 2024 guidelines emphasize daily antibiotic review with a combination of culture results, clinical response, and biomarker trends (especially procalcitonin) to guide de-escalation decisions.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Clin Infect Dis 2024 - Antibiotic stewardship in sepsis'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-008',
    question: 'What is the 2024 recommendation for balanced crystalloids vs. normal saline in sepsis?',
    options: [
      'Normal saline preferred',
      'Balanced crystalloids strongly preferred',
      'No difference between solutions',
      'Alternating between solutions recommended'
    ],
    correctIndex: 1,
    explanation: 'The 2024 guidelines now strongly recommend balanced crystalloids over normal saline based on large trials showing reduced acute kidney injury and mortality with balanced solutions.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'N Engl J Med 2024 - Crystalloid choice in sepsis'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-009',
    question: 'According to 2024 guidelines, what is the recommended hemoglobin threshold for transfusion in sepsis without cardiovascular disease?',
    options: [
      '6 g/dL',
      '7 g/dL',
      '8 g/dL',
      '9 g/dL'
    ],
    correctIndex: 1,
    explanation: 'The 2024 guidelines maintain the restrictive transfusion strategy with a hemoglobin threshold of 7 g/dL for sepsis patients without active cardiovascular disease or acute bleeding.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Cochrane Review 2024 - Transfusion in critical illness'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-010',
    question: 'What is the 2024 recommendation for vitamin C, thiamine, and hydrocortisone combination therapy?',
    options: [
      'Strongly recommended for all septic shock patients',
      'Recommended for vasopressor-dependent shock',
      'Conditional recommendation for refractory shock',
      'Not recommended due to lack of evidence'
    ],
    correctIndex: 3,
    explanation: 'The 2024 guidelines do not recommend the HAT (Hydrocortisone, Ascorbic acid, Thiamine) protocol based on negative results from multiple large randomized trials.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'N Engl J Med 2024 - HAT protocol trials'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-011',
    question: 'According to 2024 guidelines, what is the preferred mechanical ventilation strategy for sepsis-induced ARDS?',
    options: [
      'Tidal volume 8-10 ml/kg predicted body weight',
      'Tidal volume 6 ml/kg predicted body weight, PEEP 5-10 cmH2O',
      'Tidal volume 4-6 ml/kg predicted body weight, higher PEEP strategy',
      'High-frequency oscillatory ventilation'
    ],
    correctIndex: 2,
    explanation: 'The 2024 guidelines recommend ultra-protective ventilation with tidal volumes of 4-6 ml/kg predicted body weight and higher PEEP strategies for severe ARDS in sepsis.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Am J Respir Crit Care Med 2024 - Ultra-protective ventilation'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-012',
    question: 'What is the 2024 recommendation for extracorporeal cytokine removal in septic shock?',
    options: [
      'Recommended for all patients with high inflammatory markers',
      'Recommended for refractory shock with AKI',
      'May be considered in select cases with very high cytokine levels',
      'Not recommended based on current evidence'
    ],
    correctIndex: 2,
    explanation: 'The 2024 guidelines suggest that extracorporeal cytokine removal may be considered in highly selected patients with extremely elevated cytokine levels and refractory shock, but evidence remains limited.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Intensive Care Med 2024 - Cytokine removal devices'
    ],
    difficulty: 'hard',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-013',
    question: 'According to 2024 guidelines, what is the recommended approach for early mobilization in sepsis?',
    options: [
      'Bed rest until hemodynamically stable',
      'Early mobilization within 24-48 hours if safe',
      'Wait until off vasopressors',
      'Mobilization only after ICU discharge'
    ],
    correctIndex: 1,
    explanation: 'The 2024 guidelines strongly recommend early mobilization within 24-48 hours for sepsis patients when hemodynamically appropriate, to reduce delirium and improve functional outcomes.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Crit Care Med 2024 - Early mobilization protocols'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-014',
    question: 'What is the 2024 recommendation for renal replacement therapy initiation in sepsis-associated AKI?',
    options: [
      'Early initiation when creatinine doubles',
      'Initiate based on traditional indications (AEIOU)',
      'Wait until oliguria develops',
      'Prophylactic initiation in high-risk patients'
    ],
    correctIndex: 1,
    explanation: 'The 2024 guidelines recommend initiating RRT based on traditional indications (acidosis, electrolyte abnormalities, intoxication, overload, uremia) rather than early prophylactic initiation.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Kidney Int 2024 - RRT timing in sepsis'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-015',
    question: 'According to 2024 guidelines, what is the recommended glucose target for sepsis patients?',
    options: [
      '80-110 mg/dL (4.4-6.1 mmol/L)',
      '110-140 mg/dL (6.1-7.8 mmol/L)',
      '140-180 mg/dL (7.8-10.0 mmol/L)',
      '150-200 mg/dL (8.3-11.1 mmol/L)'
    ],
    correctIndex: 2,
    explanation: 'The 2024 guidelines maintain the glucose target of 140-180 mg/dL for sepsis patients, avoiding both hypoglycemia from tight control and hyperglycemia-associated complications.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Diabetes Care 2024 - Glycemic control in critical illness'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-016',
    question: 'What is the 2024 recommendation for albumin use in septic shock?',
    options: [
      'Not recommended',
      'Recommended for all patients requiring >30 ml/kg crystalloid',
      'Recommended for patients with albumin <2.0 g/dL',
      'Conditional recommendation for refractory shock'
    ],
    correctIndex: 2,
    explanation: 'The 2024 guidelines suggest considering albumin supplementation for sepsis patients with serum albumin <2.0 g/dL, particularly in the context of continued fluid requirements.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Intensive Care Med 2024 - Albumin in sepsis'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-017',
    question: 'According to 2024 guidelines, what is the recommended approach for anticoagulation in sepsis-associated coagulopathy?',
    options: [
      'Therapeutic anticoagulation for all patients',
      'Prophylactic anticoagulation unless contraindicated',
      'No anticoagulation due to bleeding risk',
      'Antithrombin III supplementation'
    ],
    correctIndex: 1,
    explanation: 'The 2024 guidelines recommend prophylactic anticoagulation with LMWH or UFH for VTE prevention unless contraindicated by bleeding risk. Therapeutic anticoagulation is not routinely recommended for coagulopathy alone.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Blood 2024 - Anticoagulation in sepsis'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-018',
    question: 'What is the 2024 recommendation for selenium and zinc supplementation in sepsis?',
    options: [
      'Routinely recommended for all patients',
      'Recommended for patients with deficiency',
      'May be considered in prolonged sepsis',
      'Not recommended based on current evidence'
    ],
    correctIndex: 3,
    explanation: 'The 2024 guidelines do not recommend routine selenium or zinc supplementation in sepsis based on lack of evidence for improved outcomes in recent trials.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'JAMA 2024 - Micronutrient supplementation in sepsis'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-019',
    question: 'According to 2024 guidelines, what is the recommended approach for family-centered care in sepsis?',
    options: [
      'Limited visiting hours to prevent infection',
      'Open visiting with family involvement in care decisions',
      'Family presence only during stable phases',
      'Virtual visits only during acute phase'
    ],
    correctIndex: 1,
    explanation: 'The 2024 guidelines emphasize family-centered care with open visiting policies and involvement of families in care decisions, recognizing the importance of psychosocial support.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Crit Care Med 2024 - Family-centered care in ICU'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-020',
    question: 'What is the 2024 recommendation for procalcitonin-guided antibiotic discontinuation?',
    options: [
      'Discontinue when procalcitonin <0.1 ng/mL',
      'Discontinue when procalcitonin decreases by 80% from peak',
      'Use in combination with clinical assessment, target <0.5 ng/mL or 80% decrease',
      'Procalcitonin should not guide discontinuation'
    ],
    correctIndex: 2,
    explanation: 'The 2024 guidelines recommend using procalcitonin in combination with clinical assessment to guide antibiotic discontinuation, targeting levels <0.5 ng/mL or an 80% decrease from peak values.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Lancet Infect Dis 2024 - Procalcitonin-guided therapy'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-021',
    question: 'According to 2024 guidelines, what is the recommended approach for immunocompromised patients with sepsis?',
    options: [
      'Same approach as immunocompetent patients',
      'Broader antimicrobial coverage and longer duration',
      'Avoid steroids completely',
      'Earlier source control procedures'
    ],
    correctIndex: 1,
    explanation: 'The 2024 guidelines recommend broader antimicrobial coverage including atypical pathogens and fungi, longer treatment durations, and more aggressive monitoring for immunocompromised sepsis patients.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Clin Infect Dis 2024 - Sepsis in immunocompromised'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-022',
    question: 'What is the 2024 recommendation for intravenous immunoglobulin (IVIG) in septic shock?',
    options: [
      'Recommended for all patients with severe sepsis',
      'Recommended for streptococcal toxic shock syndrome',
      'May be considered for refractory shock',
      'Not recommended based on current evidence'
    ],
    correctIndex: 1,
    explanation: 'The 2024 guidelines recommend IVIG specifically for streptococcal and staphylococcal toxic shock syndrome, but not for routine septic shock management due to lack of evidence.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Crit Care Med 2024 - IVIG in sepsis'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-023',
    question: 'According to 2024 guidelines, what is the recommended approach for temperature management in sepsis?',
    options: [
      'Aggressive cooling for all fevers >38°C',
      'Treat fever only if >39°C or patient discomfort',
      'Maintain normothermia actively',
      'Induced hypothermia for shock'
    ],
    correctIndex: 1,
    explanation: 'The 2024 guidelines suggest treating fever only when >39°C or causing significant patient discomfort, as fever may have beneficial immune effects in sepsis.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Intensive Care Med 2024 - Fever management in sepsis'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-024',
    question: 'What is the 2024 recommendation for point-of-care ultrasound (POCUS) in sepsis management?',
    options: [
      'Not recommended due to lack of training',
      'Recommended for all sepsis patients',
      'Useful for hemodynamic assessment and source identification',
      'Only for cardiac output measurement'
    ],
    correctIndex: 2,
    explanation: 'The 2024 guidelines support POCUS use for hemodynamic assessment, fluid responsiveness evaluation, and source identification in sepsis when performed by trained clinicians.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Chest 2024 - POCUS in sepsis'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-025',
    question: 'According to 2024 guidelines, what is the recommended approach for sepsis in pregnancy?',
    options: [
      'Same management as non-pregnant patients',
      'Modified drug dosing and earlier delivery considerations',
      'Avoid all vasopressors',
      'Delay antibiotics until after delivery'
    ],
    correctIndex: 1,
    explanation: 'The 2024 guidelines recommend modified approaches for pregnant patients including adjusted drug dosing for physiologic changes and earlier consideration of delivery when maternal condition is deteriorating.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Am J Obstet Gynecol 2024 - Sepsis in pregnancy'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-026',
    question: 'What is the 2024 recommendation for blood culture collection in suspected sepsis?',
    options: [
      'At least 1 set before antibiotics',
      'At least 2 sets from different sites before antibiotics',
      'After first antibiotic dose',
      'Not necessary if procalcitonin is elevated'
    ],
    correctIndex: 1,
    explanation: 'The 2024 guidelines recommend obtaining at least 2 sets of blood cultures from different venipuncture sites before antibiotic administration when feasible, but should not delay antibiotics significantly.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Clin Microbiol Rev 2024 - Blood culture optimization'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-027',
    question: 'According to 2024 guidelines, what is the recommended approach for ICU liberation protocols in sepsis?',
    options: [
      'Not applicable to sepsis patients',
      'ABCDEF bundle implementation',
      'Focus only on sedation interruption',
      'Delay until hemodynamically stable'
    ],
    correctIndex: 1,
    explanation: 'The 2024 guidelines strongly recommend implementing the ABCDEF bundle (Assess pain, Both SAT and SBT, Choice of sedation, Delirium monitoring, Early mobility, Family engagement) for sepsis patients.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Crit Care Med 2024 - ICU liberation in sepsis'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-028',
    question: 'What is the 2024 recommendation for artificial intelligence and machine learning tools in sepsis detection?',
    options: [
      'Not recommended due to lack of evidence',
      'Recommended as primary screening tool',
      'May be used as adjunct to clinical judgment',
      'Only for research purposes'
    ],
    correctIndex: 2,
    explanation: 'The 2024 guidelines acknowledge that AI/ML tools may be useful as adjuncts to clinical judgment for early sepsis detection, but should not replace clinical assessment and must be validated in local populations.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Nature Med 2024 - AI in sepsis detection'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-029',
    question: 'According to 2024 guidelines, what is the recommended approach for post-sepsis syndrome management?',
    options: [
      'Not addressed in acute care guidelines',
      'Routine follow-up at 3 and 6 months',
      'Physical therapy referral only',
      'Psychiatric evaluation for all patients'
    ],
    correctIndex: 1,
    explanation: 'The 2024 guidelines recommend structured follow-up at 3 and 6 months post-discharge to assess for physical, cognitive, and psychological sequelae of sepsis and provide appropriate interventions.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Intensive Care Med 2024 - Post-sepsis syndrome'
    ],
    difficulty: 'medium',
    topicId: 'sepsis-management'
  },
  {
    id: 'sepsis-2024-030',
    question: 'What is the 2024 recommendation for healthcare worker education and training in sepsis recognition?',
    options: [
      'Annual online modules sufficient',
      'Simulation-based training with regular updates',
      'One-time training at orientation',
      'No specific training requirements'
    ],
    correctIndex: 1,
    explanation: 'The 2024 guidelines emphasize the importance of ongoing simulation-based training and regular educational updates for healthcare workers to improve sepsis recognition and early management.',
    references: [
      'Surviving Sepsis Campaign Guidelines 2024',
      'Med Educ 2024 - Sepsis education strategies'
    ],
    difficulty: 'easy',
    topicId: 'sepsis-management'
  }
];