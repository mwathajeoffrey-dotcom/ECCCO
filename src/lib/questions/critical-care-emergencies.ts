import { Question } from './types';

export const criticalCareEmergenciesQuestions: Question[] = [
  {
    id: 'cc-001',
    question: 'A mechanically ventilated patient has a sudden drop in oxygen saturation and blood pressure with absent breath sounds on the right. What is the most appropriate immediate intervention?',
    options: [
      'Increase PEEP',
      'Needle decompression of right chest',
      'Chest X-ray',
      'Arterial blood gas'
    ],
    correctIndex: 1,
    explanation: 'This presentation suggests tension pneumothorax in a mechanically ventilated patient. Immediate needle decompression (2nd intercostal space, midclavicular line) is life-saving and should not be delayed for imaging. Chest tube insertion should follow.',
    references: [
      'Leigh-Smith S, et al. Tension pneumothorax--time for a re-think?',
      'Barton ED. Tension pneumothorax. Curr Opin Pulm Med. 1999;5(4):269-274'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-002',
    question: 'A patient in the ICU develops acute kidney injury with oliguria. CVP is 2 mmHg and MAP is 55 mmHg. What is the most appropriate initial intervention?',
    options: [
      'Furosemide',
      'Dopamine',
      'Fluid resuscitation',
      'Hemodialysis'
    ],
    correctIndex: 2,
    explanation: 'Low CVP and MAP with oliguria suggest prerenal acute kidney injury due to volume depletion. Fluid resuscitation is the first intervention. Diuretics would worsen the condition, and pressors should only be used after adequate volume status.',
    references: [
      'Kidney Disease: Improving Global Outcomes (KDIGO) Acute Kidney Injury Work Group. KDIGO Clinical Practice Guideline for Acute Kidney Injury',
      'Bellomo R, et al. Acute renal failure - definition, outcome measures, animal models, fluid therapy and information technology needs'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-003',
    question: 'A patient on mechanical ventilation has plateau pressure of 35 cmH2O and PEEP of 12 cmH2O. What is the driving pressure?',
    options: [
      '23 cmH2O',
      '35 cmH2O',
      '47 cmH2O',
      '12 cmH2O'
    ],
    correctIndex: 0,
    explanation: 'Driving pressure = Plateau pressure - PEEP = 35 - 12 = 23 cmH2O. Driving pressure should be kept below 15 cmH2O when possible to minimize ventilator-induced lung injury. This patient has high driving pressure requiring adjustment.',
    references: [
      'Amato MB, et al. Driving pressure and survival in the acute respiratory distress syndrome',
      'Slutsky AS, et al. Ventilator-induced lung injury. N Engl J Med. 2013;369(22):2126-2136'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-004',
    question: 'A patient with septic shock requires vasopressors. What is the first-line vasopressor according to current guidelines?',
    options: [
      'Dopamine',
      'Norepinephrine',
      'Epinephrine',
      'Vasopressin'
    ],
    correctIndex: 1,
    explanation: 'Norepinephrine is the first-line vasopressor for septic shock according to Surviving Sepsis Campaign guidelines. It has predominantly alpha-adrenergic effects with minimal beta effects, providing effective vasoconstriction with less tachycardia than other agents.',
    references: [
      'Rhodes A, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock: 2016',
      'Russell JA. Vasopressor therapy in critically ill patients with shock'
    ],
    difficulty: 'easy',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-005',
    question: 'A patient with ARDS on mechanical ventilation has persistent hypoxemia despite high FiO2. What intervention should be considered next?',
    options: [
      'Increase PEEP',
      'Prone positioning',
      'High-frequency oscillatory ventilation',
      'ECMO'
    ],
    correctIndex: 1,
    explanation: 'Prone positioning is a proven intervention for severe ARDS (P/F ratio <150) that improves oxygenation and survival. It should be implemented for at least 16 hours daily when hypoxemia persists despite optimal conventional ventilation.',
    references: [
      'Guérin C, et al. Prone positioning in severe acute respiratory distress syndrome',
      'Sud S, et al. Effect of prone positioning during mechanical ventilation on mortality among patients with acute respiratory distress syndrome'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-006',
    question: 'A patient with diabetic ketoacidosis is receiving insulin therapy. Glucose drops to 250 mg/dL but ketones remain elevated. What should be done?',
    options: [
      'Stop insulin',
      'Reduce insulin rate',
      'Continue insulin and add dextrose',
      'Switch to subcutaneous insulin'
    ],
    correctIndex: 2,
    explanation: 'In DKA, insulin should be continued until ketosis resolves (anion gap normalizes), even when glucose normalizes. Dextrose should be added to prevent hypoglycemia while continuing insulin to clear ketones. Premature insulin discontinuation can worsen ketosis.',
    references: [
      'Kitabchi AE, et al. Hyperglycemic crises in adult patients with diabetes',
      'Wolfsdorf JI, et al. ISPAD Clinical Practice Consensus Guidelines 2018: Diabetic ketoacidosis and the hyperglycemic hyperosmolar state'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-007',
    question: 'A patient in the ICU develops acute respiratory distress with pink, frothy sputum and bilateral pulmonary edema. PCWP is 25 mmHg. What is the most likely diagnosis?',
    options: [
      'ARDS',
      'Cardiogenic pulmonary edema',
      'Pneumonia',
      'Fat embolism'
    ],
    correctIndex: 1,
    explanation: 'Elevated PCWP (>18 mmHg) with bilateral pulmonary edema indicates cardiogenic pulmonary edema. ARDS typically has PCWP <18 mmHg. Pink, frothy sputum is characteristic of acute heart failure with pulmonary edema.',
    references: [
      'Ware LB, et al. Clinical practice. Acute pulmonary edema. N Engl J Med. 2005;353(26):2788-2796',
      'ARDS Definition Task Force. Acute respiratory distress syndrome: the Berlin Definition'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-008',
    question: 'A mechanically ventilated patient has auto-PEEP of 8 cmH2O. What is the most appropriate intervention?',
    options: [
      'Increase respiratory rate',
      'Increase tidal volume',
      'Decrease respiratory rate',
      'Increase inspiratory time'
    ],
    correctIndex: 2,
    explanation: 'Auto-PEEP (intrinsic PEEP) results from incomplete expiration. Decreasing respiratory rate allows more time for expiration and reduces air trapping. Other interventions include increasing expiratory time and ensuring adequate bronchodilation.',
    references: [
      'Leatherman JW, et al. Auto-PEEP: measurement, significance, and treatment',
      'Marini JJ. Dynamic hyperinflation and auto-positive end-expiratory pressure: lessons learned over 30 years'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-009',
    question: 'A patient with severe sepsis has lactate of 4.5 mmol/L after initial resuscitation. What does this indicate?',
    options: [
      'Adequate perfusion',
      'Tissue hypoperfusion',
      'Liver dysfunction',
      'Medication effect'
    ],
    correctIndex: 1,
    explanation: 'Lactate >2.0 mmol/L indicates tissue hypoperfusion and is associated with increased mortality in sepsis. Lactate clearance is a goal of sepsis resuscitation and should be monitored to guide therapy. Normal lactate is <2.0 mmol/L.',
    references: [
      'Jansen TC, et al. Early lactate-guided therapy in intensive care unit patients: a multicenter, open-label, randomized controlled trial',
      'Rhodes A, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock: 2016'
    ],
    difficulty: 'easy',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-010',
    question: 'A patient with status asthmaticus is intubated and mechanically ventilated. What ventilator strategy is most appropriate?',
    options: [
      'High respiratory rate, normal tidal volume',
      'Low respiratory rate, low tidal volume',
      'High PEEP, high respiratory rate',
      'Normal settings'
    ],
    correctIndex: 1,
    explanation: 'In status asthmaticus, the goal is to minimize air trapping and auto-PEEP. This is achieved with low respiratory rate (8-10/min), low tidal volume (6-8 mL/kg), and prolonged expiratory time. Permissive hypercapnia may be necessary.',
    references: [
      'Leatherman JW, et al. Mechanical ventilation for severe asthma',
      'Brenner B, et al. Management of asthma exacerbations in the emergency department: Nonventilatory management'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-011',
    question: 'A patient develops acute respiratory failure with P/F ratio of 120 mmHg. According to Berlin criteria, what grade of ARDS is this?',
    options: [
      'Mild ARDS',
      'Moderate ARDS',
      'Severe ARDS',
      'Not ARDS'
    ],
    correctIndex: 2,
    explanation: 'According to Berlin criteria: Mild ARDS: P/F 200-300, Moderate ARDS: P/F 100-200, Severe ARDS: P/F <100. A P/F ratio of 120 mmHg qualifies as severe ARDS, which has the highest mortality risk.',
    references: [
      'ARDS Definition Task Force. Acute respiratory distress syndrome: the Berlin Definition',
      'Ranieri VM, et al. Acute respiratory distress syndrome: the Berlin Definition'
    ],
    difficulty: 'easy',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-012',
    question: 'A patient with acute liver failure develops increased intracranial pressure. What is the target CPP (cerebral perfusion pressure)?',
    options: [
      '>40 mmHg',
      '>50 mmHg',
      '>60 mmHg',
      '>70 mmHg'
    ],
    correctIndex: 2,
    explanation: 'Cerebral perfusion pressure (CPP) = MAP - ICP. Target CPP should be >60 mmHg to maintain adequate cerebral blood flow. In acute liver failure with cerebral edema, maintaining adequate CPP is crucial to prevent secondary brain injury.',
    references: [
      'Stravitz RT, et al. Critical management decisions in patients with acute liver failure',
      'Wendon J, et al. Acute liver failure: a challenge for the intensive care physician'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-013',
    question: 'A patient with acute pancreatitis develops ARDS and shock. What is the most likely cause of shock?',
    options: [
      'Cardiogenic shock',
      'Hypovolemic shock',
      'Distributive shock',
      'Obstructive shock'
    ],
    correctIndex: 2,
    explanation: 'Severe acute pancreatitis causes distributive shock through systemic inflammatory response syndrome (SIRS). Inflammatory mediators cause vasodilation and increased capillary permeability, leading to hypotension and organ dysfunction.',
    references: [
      'Tenner S, et al. American College of Gastroenterology guideline: management of acute pancreatitis',
      'Whitcomb DC. Clinical practice. Acute pancreatitis. N Engl J Med. 2006;354(20):2142-2150'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-014',
    question: 'A patient with GI bleeding has Hgb of 6.5 g/dL and is hemodynamically stable. What is the transfusion threshold?',
    options: [
      '7 g/dL',
      '8 g/dL',
      '9 g/dL',
      '10 g/dL'
    ],
    correctIndex: 0,
    explanation: 'Current guidelines recommend a restrictive transfusion strategy with threshold of 7 g/dL for hemodynamically stable patients. Liberal transfusion (higher thresholds) has not shown benefit and may increase morbidity in critically ill patients.',
    references: [
      'Carson JL, et al. Red blood cell transfusion: a clinical practice guideline from the AABB',
      'Hébert PC, et al. A multicenter, randomized, controlled clinical trial of transfusion requirements in critical care'
    ],
    difficulty: 'easy',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-015',
    question: 'A patient with traumatic brain injury has ICP of 25 mmHg. What is the most appropriate first-line intervention?',
    options: [
      'Mannitol',
      'Hypertonic saline',
      'Elevate head of bed to 30 degrees',
      'Hyperventilation'
    ],
    correctIndex: 2,
    explanation: 'Elevating the head of bed to 30 degrees improves venous drainage and reduces ICP. This is a simple, first-line intervention. Osmotic agents like mannitol or hypertonic saline may be needed if simple measures fail. Hyperventilation should be avoided.',
    references: [
      'Bratton SL, et al. Guidelines for the management of severe traumatic brain injury. I. Blood pressure and oxygenation',
      'Carney N, et al. Guidelines for the Management of Severe Traumatic Brain Injury, Fourth Edition'
    ],
    difficulty: 'easy',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-016',
    question: 'A patient with acute MI develops cardiogenic shock. Cardiac catheterization shows 99% LAD occlusion. What is the most appropriate intervention?',
    options: [
      'Medical management with vasopressors',
      'Thrombolytic therapy',
      'Primary PCI',
      'CABG'
    ],
    correctIndex: 2,
    explanation: 'Primary PCI is the preferred reperfusion strategy for STEMI complicated by cardiogenic shock, provided it can be performed rapidly (<90 minutes) by an experienced team. Early revascularization improves survival in cardiogenic shock.',
    references: [
      'Thiele H, et al. Intraaortic balloon support for myocardial infarction with cardiogenic shock',
      'O\'Gara PT, et al. 2023 AHA/ACC STEMI Guidelines for the Management of ST-Elevation Myocardial Infarction'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-017',
    question: 'A mechanically ventilated patient has sudden cardiac arrest. What is the most likely ventilator-related cause?',
    options: [
      'Pneumothorax',
      'Auto-PEEP',
      'Hypoxia',
      'Hypercarbia'
    ],
    correctIndex: 1,
    explanation: 'Auto-PEEP can cause sudden cardiovascular collapse by reducing venous return and cardiac output. This is especially common in patients with obstructive lung disease or high minute ventilation. Disconnecting the ventilator can be diagnostic and therapeutic.',
    references: [
      'Marini JJ. Dynamic hyperinflation and auto-positive end-expiratory pressure: lessons learned over 30 years',
      'Leatherman JW, et al. Auto-PEEP: measurement, significance, and treatment'
    ],
    difficulty: 'hard',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-018',
    question: 'A patient with septic shock has been on norepinephrine for 6 hours with MAP of 58 mmHg. What should be added next?',
    options: [
      'Epinephrine',
      'Dopamine',
      'Vasopressin',
      'Dobutamine'
    ],
    correctIndex: 2,
    explanation: 'Vasopressin can be added as a second-line agent to norepinephrine in septic shock. It may help reduce norepinephrine requirements and has potential renal protective effects. Maximum dose is 0.03-0.04 units/minute.',
    references: [
      'Rhodes A, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock: 2016',
      'Russell JA, et al. Vasopressin versus norepinephrine infusion in patients with septic shock'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-019',
    question: 'A patient with COPD exacerbation on BiPAP develops worsening respiratory acidosis (pH 7.15, PCO2 80). What is the next step?',
    options: [
      'Increase BiPAP pressure',
      'Intubation and mechanical ventilation',
      'Change to high-flow nasal cannula',
      'Add bronchodilators'
    ],
    correctIndex: 1,
    explanation: 'Severe respiratory acidosis (pH <7.25) despite BiPAP indicates BiPAP failure and need for intubation. Delaying intubation in this setting can lead to respiratory arrest. Early recognition of BiPAP failure is crucial.',
    references: [
      'Brochard L, et al. Noninvasive ventilation for acute exacerbations of chronic obstructive pulmonary disease',
      'Global Initiative for Chronic Obstructive Lung Disease. Global Strategy for the Diagnosis, Management and Prevention of COPD'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-020',
    question: 'A patient with acute respiratory failure has been on mechanical ventilation for 10 days. What complication should be considered for prevention?',
    options: [
      'Pneumonia',
      'DVT',
      'Stress ulcer',
      'All of the above'
    ],
    correctIndex: 3,
    explanation: 'Prolonged mechanical ventilation puts patients at risk for multiple complications: ventilator-associated pneumonia, venous thromboembolism, and stress ulcers. Prevention bundles include HOB elevation, oral care, DVT prophylaxis, and stress ulcer prophylaxis.',
    references: [
      'Klompas M, et al. Strategies to prevent ventilator-associated pneumonia in acute care hospitals: 2014 update',
      'Kahn JM, et al. The epidemiology of chronic critical illness in the United States'
    ],
    difficulty: 'easy',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-021',
    question: 'A patient with liver failure develops hepatorenal syndrome. What is the most effective treatment?',
    options: [
      'Dopamine',
      'Octreotide + midodrine',
      'Terlipressin',
      'Hemodialysis'
    ],
    correctIndex: 2,
    explanation: 'Terlipressin (vasopressin analog) is the most effective treatment for hepatorenal syndrome, improving renal function and survival. It works by causing splanchnic vasoconstriction and improving renal perfusion. Octreotide + midodrine is second-line.',
    references: [
      'Gines P, et al. Hepatorenal syndrome. Lancet. 2003;362(9398):1819-1827',
      'EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis'
    ],
    difficulty: 'hard',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-022',
    question: 'A patient with ARDS is on lung-protective ventilation. What target tidal volume should be used?',
    options: [
      '4-6 mL/kg IBW',
      '6-8 mL/kg IBW',
      '8-10 mL/kg IBW',
      '10-12 mL/kg IBW'
    ],
    correctIndex: 1,
    explanation: 'Lung-protective ventilation for ARDS uses low tidal volumes of 6 mL/kg ideal body weight (IBW) to minimize ventilator-induced lung injury. This strategy reduces mortality compared to traditional higher tidal volumes (12 mL/kg IBW).',
    references: [
      'Acute Respiratory Distress Syndrome Network. Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury',
      'Slutsky AS, et al. Ventilator-induced lung injury. N Engl J Med. 2013;369(22):2126-2136'
    ],
    difficulty: 'easy',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-023',
    question: 'A patient in ICU develops acute kidney injury with hyperkalemia (K+ 6.8 mEq/L). ECG shows peaked T waves. What is the most urgent intervention?',
    options: [
      'Calcium gluconate',
      'Insulin and dextrose',
      'Sodium bicarbonate',
      'Hemodialysis'
    ],
    correctIndex: 0,
    explanation: 'Calcium gluconate is the most urgent intervention for severe hyperkalemia with ECG changes. It stabilizes cardiac membranes within minutes. Insulin/dextrose and bicarbonate shift potassium intracellularly but take longer to work.',
    references: [
      'Palmer BF, et al. Managing hyperkalemia caused by inhibitors of the renin-angiotensin-aldosterone system',
      'Kidney Disease: Improving Global Outcomes (KDIGO) Acute Kidney Injury Work Group'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-024',
    question: 'A patient with massive hemoptysis is intubated. Which lung should be placed in the dependent position?',
    options: [
      'The bleeding lung',
      'The non-bleeding lung',
      'Either lung',
      'Supine position is preferred'
    ],
    correctIndex: 0,
    explanation: 'In massive hemoptysis, the bleeding lung should be placed in the dependent (down) position to prevent blood from spilling into the good lung. This protects the healthy lung from contamination and maintains oxygenation.',
    references: [
      'Sakr L, et al. Management of massive hemoptysis: selective intubation and other alternatives',
      'Jean-Baptiste E. Clinical assessment and management of massive hemoptysis'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-025',
    question: 'A patient with severe burns (40% TBSA) requires fluid resuscitation. What is the target urine output?',
    options: [
      '0.5 mL/kg/hr',
      '1-2 mL/kg/hr',
      '2-3 mL/kg/hr',
      '3-4 mL/kg/hr'
    ],
    correctIndex: 1,
    explanation: 'For severe burns, target urine output is 1-2 mL/kg/hr (or 30-50 mL/hr in adults). This higher target than normal (0.5 mL/kg/hr) accounts for increased fluid requirements and helps prevent acute kidney injury in burn patients.',
    references: [
      'Jeschke MG, et al. Burn injury. Nat Rev Dis Primers. 2020;6(1):11',
      'American Burn Association. Advanced Burn Life Support Course: Provider Manual'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-026',
    question: 'A patient with acute pancreatitis develops abdominal compartment syndrome. IAP is 25 mmHg. What is the most appropriate intervention?',
    options: [
      'Diuretics',
      'Paracentesis',
      'Surgical decompression',
      'Increase PEEP'
    ],
    correctIndex: 2,
    explanation: 'Abdominal compartment syndrome (ACS) is defined as IAP >20 mmHg with organ dysfunction. Surgical decompression (decompressive laparotomy) is the definitive treatment for ACS and should be performed urgently to prevent multi-organ failure.',
    references: [
      'Kirkpatrick AW, et al. Intra-abdominal hypertension and the abdominal compartment syndrome: updated consensus definitions and clinical practice guidelines',
      'Malbrain ML, et al. Results from the International Conference of Experts on Intra-abdominal Hypertension and Abdominal Compartment Syndrome'
    ],
    difficulty: 'hard',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-027',
    question: 'A patient with massive transfusion develops hypocalcemia, hyperkalemia, and prolonged QT. What is the most likely cause?',
    options: [
      'Citrate toxicity',
      'Transfusion reaction',
      'Hemolysis',
      'Volume overload'
    ],
    correctIndex: 0,
    explanation: 'Citrate toxicity occurs with massive transfusion due to citrate anticoagulant in blood products. Citrate binds calcium, causing hypocalcemia, and is metabolized to bicarbonate, causing metabolic alkalosis. Calcium replacement is needed.',
    references: [
      'Yazer MH, et al. How do I treat massive bleeding?',
      'Spinella PC, et al. Resuscitation and transfusion principles for traumatic hemorrhagic shock'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-028',
    question: 'A patient with fulminant hepatic failure develops cerebral edema. What is the most appropriate osmotic agent?',
    options: [
      'Mannitol',
      'Hypertonic saline (3%)',
      'Furosemide',
      'Albumin'
    ],
    correctIndex: 1,
    explanation: 'Hypertonic saline is preferred over mannitol for cerebral edema in acute liver failure. Mannitol may worsen cerebral edema in hepatic encephalopathy by crossing a disrupted blood-brain barrier. Hypertonic saline has a more predictable effect.',
    references: [
      'Stravitz RT, et al. Critical management decisions in patients with acute liver failure',
      'Larsen FS, et al. High-volume plasmapheresis in patients with acute liver failure'
    ],
    difficulty: 'hard',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-029',
    question: 'A patient with COVID-19 ARDS is proned for 16 hours with improvement in oxygenation. When should proning be discontinued?',
    options: [
      'After 12 hours improvement',
      'When P/F ratio >150',
      'When FiO2 <0.6 and PEEP <10',
      'After 3 consecutive successful sessions'
    ],
    correctIndex: 2,
    explanation: 'Prone positioning can be discontinued when oxygenation improves sufficiently that the patient no longer meets criteria for severe ARDS (typically P/F ratio >150, FiO2 <0.6, PEEP <10 cmH2O). The improvement should be sustained in supine position.',
    references: [
      'Guérin C, et al. Prone positioning in severe acute respiratory distress syndrome',
      'Alhazzani W, et al. Surviving Sepsis Campaign: guidelines on the management of critically ill adults with Coronavirus Disease 2019'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  },
  {
    id: 'cc-030',
    question: 'A patient with severe sepsis has been adequately fluid resuscitated but remains hypotensive. Lactate is normal. What type of shock is this?',
    options: [
      'Hypovolemic shock',
      'Distributive shock',
      'Cardiogenic shock',
      'Obstructive shock'
    ],
    correctIndex: 1,
    explanation: 'This represents distributive shock due to sepsis-induced vasodilation. Normal lactate suggests adequate tissue perfusion despite hypotension. This may represent vasoplegic shock requiring vasopressor support to maintain organ perfusion pressure.',
    references: [
      'Vincent JL, et al. Circulatory shock. N Engl J Med. 2013;369(18):1726-1734',
      'Russell JA. Vasopressor therapy in critically ill patients with shock'
    ],
    difficulty: 'medium',
    topicId: 'critical-care-emergencies'
  }
];