// Case-Based Learning: Sample Clinical Cases
// Each case presents a realistic clinical scenario followed by multiple related questions

import { Question } from '@/lib/questions/types';

export interface CaseScenario {
  id: string;
  title: string;
  presentation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  learningPoints: string[];
}

// Case 1: Cardiac Emergency - STEMI
export const case1_STEMI: CaseScenario = {
  id: 'case-001-stemi',
  title: '55M with Acute Chest Pain',
  category: 'Cardiac',
  difficulty: 'medium',
  presentation: `
**Clinical Presentation:**

A 55-year-old male presents to the ED with sudden onset chest pain that began 2 hours ago while mowing his lawn. He describes the pain as "crushing" and substernal, radiating to his left arm and jaw. He is diaphoretic and appears anxious.

**Vital Signs:**
- BP: 90/60 mmHg
- HR: 120 bpm (regular)
- RR: 24/min
- SpO₂: 94% on room air
- Temp: 37.2°C (98.9°F)

**Physical Exam:**
- Cardiovascular: Tachycardic, regular rhythm, no murmurs
- Lungs: Bilateral basilar crackles
- Extremities: Cool, clammy skin

**Initial ECG:** ST-segment elevation in leads II, III, and aVF (2-3mm)
  `,
  questions: [
    {
      id: 'case1-q1',
      question: 'Based on the ECG findings, what is the most likely diagnosis?',
      options: [
        'Anterior wall STEMI',
        'Inferior wall STEMI',
        'Lateral wall STEMI',
        'Posterior wall STEMI',
      ],
      correctIndex: 1,
      explanation: 'ST-segment elevation in leads II, III, and aVF indicates an **inferior wall STEMI**, typically caused by right coronary artery (RCA) occlusion. The inferior leads view the diaphragmatic surface of the heart supplied by the RCA in 80% of patients.',
      references: [
        '2017 ESC Guidelines for STEMI - https://doi.org/10.1093/eurheartj/ehx393',
      ],
      difficulty: 'medium',
      category: 'Cardiac Emergencies',
    },
    {
      id: 'case1-q2',
      question: 'Given the hypotension (BP 90/60), what additional ECG leads should you obtain immediately?',
      options: [
        'Right-sided leads (V3R, V4R)',
        'Posterior leads (V7, V8, V9)',
        'High lateral leads (V5, V6)',
        'No additional leads needed',
      ],
      correctIndex: 0,
      explanation: '**Right-sided ECG leads** (especially V4R) are critical in inferior STEMI with hypotension to assess for **right ventricular (RV) infarction**. RV infarction occurs in 30-50% of inferior STEMIs and requires preload maintenance (avoid nitrates/diuretics, give IV fluids instead). ST elevation ≥1mm in V4R has 88% sensitivity and 78% specificity for RV infarction.',
      references: [
        "
Right Ventricular Infarction: JACC Review -
 https://doi.org/10.1016/j.jacc.2016.11.035",
        
      ],
      difficulty: 'hard',
      category: 'Cardiac Emergencies',
    },
    {
      id: 'case1-q3',
      question: 'What is the next BEST immediate management step?',
      options: [
        'Administer nitroglycerin 0.4mg SL',
        'Give IV fluids (normal saline bolus)',
        'Start IV furosemide for pulmonary edema',
        'Immediate cardioversion',
      ],
      correctIndex: 1,
      explanation: 'In **inferior STEMI with hypotension**, suspect RV involvement. The priority is **IV fluid resuscitation** (NS 250-500mL boluses) to maintain preload. **AVOID nitrates** (can cause profound hypotension by reducing preload) and **AVOID diuretics** (worsen hypotension). The patient is preload-dependent due to RV dysfunction.',
      references: [
        "AHA 2013 STEMI Guidelines - https://doi.org/10.1161/CIR.0b013e3182742cf6",
        
      ],
      difficulty: 'hard',
      category: 'Cardiac Emergencies',
    },
    {
      id: 'case1-q4',
      question: 'The patient\'s blood pressure improves to 110/70 after 1L NS. Door-to-balloon time goal for primary PCI is:',
      options: [
        '30 minutes',
        '60 minutes',
        '90 minutes',
        '120 minutes',
      ],
      correctIndex: 2,
      explanation: 'The **door-to-balloon time goal is ≤90 minutes** for primary PCI in STEMI. If PCI is not available within 120 minutes of first medical contact, **fibrinolysis** should be considered (door-to-needle <30 min). Every 30-minute delay in reperfusion increases 1-year mortality by 7.5%.',
      references: [
        "2013 ACCF/AHA STEMI Guideline - https://doi.org/10.1161/CIR.0b013e3182742cf6",
        
      ],
      difficulty: 'easy',
      category: 'Cardiac Emergencies',
    },
  ],
  learningPoints: [
    '🎯 Inferior STEMI: ST elevation in II, III, aVF → suspect RCA occlusion',
    '🫀 Right-sided ECG (V4R) is mandatory in inferior STEMI with hypotension → diagnose RV infarction',
    '💧 RV infarction is preload-dependent: Give IV fluids, AVOID nitrates/diuretics',
    '⏱️ Door-to-balloon goal: ≤90 minutes for primary PCI',
    '⚡ Fibrinolysis if PCI not available within 120 minutes (door-to-needle <30 min)',
  ],
};

// Case 2: Trauma - Penetrating Chest Injury
export const case2_ChestTrauma: CaseScenario = {
  id: 'case-002-trauma',
  title: '28M with Stab Wound to Chest',
  category: 'Trauma',
  difficulty: 'hard',
  presentation: `
**Clinical Presentation:**

A 28-year-old male arrives via EMS with a stab wound to the left anterior chest (4th intercostal space, midclavicular line). The wound occurred 15 minutes ago during an altercation. He is alert but anxious and complaining of difficulty breathing.

**Vital Signs:**
- BP: 85/50 mmHg
- HR: 130 bpm (weak, thready pulse)
- RR: 32/min
- SpO₂: 88% on 15L NRB
- Temp: 36.8°C (98.2°F)

**Physical Exam:**
- Airway: Patent, speaking in short sentences
- Breathing: Decreased breath sounds on left, trachea midline
- Circulation: Muffled heart sounds, distended neck veins (JVD)
- 3cm laceration at 4th ICS, minimal external bleeding
  `,
  questions: [
    {
      id: 'case2-q1',
      question: 'Based on Beck\'s triad (hypotension, JVD, muffled heart sounds), what is the most likely diagnosis?',
      options: [
        'Tension pneumothorax',
        'Cardiac tamponade',
        'Massive hemothorax',
        'Pulmonary contusion',
      ],
      correctIndex: 1,
      explanation: '**Cardiac tamponade** presents with Beck\'s triad: (1) hypotension, (2) jugular venous distension (JVD), and (3) muffled/distant heart sounds. The stab wound at 4th ICS midclavicular line is in the **cardiac box** (anatomical boundaries: medial to midclavicular lines, between clavicles and costal margin). Even small amounts of blood (50-100mL) in the pericardium can cause tamponade physiology.',
      references: [
        "ATLS 10th Edition: Thoracic Trauma - https://www.facs.org/quality-programs/trauma/atls/",
        
      ],
      difficulty: 'medium',
      category: 'Trauma',
    },
    {
      id: 'case2-q2',
      question: 'What is the MOST appropriate immediate intervention?',
      options: [
        'Needle decompression 2nd ICS midclavicular line',
        'Pericardiocentesis (subxiphoid approach)',
        'Immediate thoracotomy in ED',
        'Chest tube insertion left 5th ICS',
      ],
      correctIndex: 1,
      explanation: '**Pericardiocentesis** is the emergent treatment for cardiac tamponade when the patient is hemodynamically unstable but not in cardiac arrest. The subxiphoid approach is standard: insert 18G needle at 30-45° angle toward left shoulder, aspirating continuously. Removing even 10-20mL can dramatically improve hemodynamics (the "golden period"). If in cardiac arrest from penetrating thoracic trauma, proceed directly to **resuscitative thoracotomy**.',
      references: [
        "Western Trauma Association: Penetrating Cardiac Injury - https://doi.org/10.1097/TA.0000000000002198",
        
      ],
      difficulty: 'hard',
      category: 'Trauma',
    },
    {
      id: 'case2-q3',
      question: 'After pericardiocentesis removes 60mL of blood, BP improves to 100/65. What is the definitive management?',
      options: [
        'Observation in ICU with serial echos',
        'CT chest with contrast',
        'Immediate operative exploration (sternotomy/thoracotomy)',
        'Discharge home with 24-hour follow-up',
      ],
      correctIndex: 2,
      explanation: 'Any **penetrating injury to the cardiac box requires operative exploration** to evaluate for cardiac injury, even if initially stable. Pericardiocentesis is a temporizing measure (buys time for OR). Up to 80-90% of patients with penetrating cardiac injuries who reach hospital alive can survive with prompt surgical repair. Delayed diagnosis has 50% mortality. The injury likely involves myocardium, coronary vessels, or cardiac chambers.',
      references: [
        "J Trauma: Penetrating Cardiac Injuries - https://doi.org/10.1097/TA.0b013e318290cd86",
        
      ],
      difficulty: 'medium',
      category: 'Trauma',
    },
    {
      id: 'case2-q4',
      question: 'If the patient had arrested on arrival, which incision is used for ED resuscitative thoracotomy?',
      options: [
        'Median sternotomy',
        'Left anterolateral thoracotomy (4th-5th ICS)',
        'Right anterolateral thoracotomy',
        'Clamshell thoracotomy (bilateral)',
      ],
      correctIndex: 1,
      explanation: '**Left anterolateral thoracotomy** (incision along 4th or 5th ICS from sternum to mid-axillary line) is the standard approach for ED resuscitative thoracotomy. This provides access to: (1) pericardium for relief of tamponade, (2) descending aorta for cross-clamping, (3) hilum for hemorrhage control, and (4) heart for open cardiac massage. Can be extended across sternum (clamshell) if needed for right chest access.',
      references: [
        "EAST Practice Management Guidelines: Resuscitative Thoracotomy - https://doi.org/10.1097/TA.0000000000001559",
        
      ],
      difficulty: 'medium',
      category: 'Trauma',
    },
  ],
  learningPoints: [
    '🫀 Beck\'s Triad of Tamponade: Hypotension + JVD + Muffled heart sounds',
    '📍 Cardiac Box: Any penetrating injury medial to MCL, between clavicles and costal margin',
    '💉 Pericardiocentesis: Subxiphoid approach at 30-45° toward left shoulder, aspirate continuously',
    '🔪 All cardiac box injuries require operative exploration (even if stable post-pericardiocentesis)',
    '⚡ ED thoracotomy: Left anterolateral (4th-5th ICS) for penetrating thoracic trauma in arrest',
  ],
};

// Case 3: Sepsis - Community-Acquired Pneumonia
export const case3_Sepsis: CaseScenario = {
  id: 'case-003-sepsis',
  title: '68F with Fever and Altered Mental Status',
  category: 'Sepsis',
  difficulty: 'medium',
  presentation: `
**Clinical Presentation:**

A 68-year-old female is brought to the ED by family for 3 days of fever, cough productive of yellow sputum, and worsening confusion. She has a history of COPD and hypertension.

**Vital Signs:**
- BP: 88/52 mmHg
- HR: 118 bpm
- RR: 28/min
- SpO₂: 88% on room air → 92% on 4L NC
- Temp: 39.2°C (102.6°F)

**Physical Exam:**
- General: Lethargic, oriented only to self
- Lungs: Decreased breath sounds right base, dullness to percussion
- Skin: Warm, dry, delayed capillary refill (>3 sec)

**Labs:**
- WBC: 18,500/μL (85% neutrophils, 10% bands)
- Lactate: 4.2 mmol/L (normal <2.0)
- Creatinine: 1.8 mg/dL (baseline 1.0)
- Chest X-ray: Right lower lobe consolidation
  `,
  questions: [
    {
      id: 'case3-q1',
      question: 'Using qSOFA criteria (Quick SOFA), how many points does this patient have?',
      options: [
        '1 point',
        '2 points',
        '3 points',
        '4 points',
      ],
      correctIndex: 2,
      explanation: 'This patient scores **3 points on qSOFA**: (1) Altered mental status (GCS <15, oriented only to self), (2) Respiratory rate ≥22/min (RR 28), (3) Systolic BP ≤100 mmHg (BP 88/52). **qSOFA ≥2** suggests sepsis with high mortality risk. qSOFA is a bedside screening tool but **does NOT replace SOFA score** for formal sepsis diagnosis.',
      references: [
        "Sepsis-3 Definitions: JAMA 2016 - https://doi.org/10.1001/jama.2016.0287",
        
      ],
      difficulty: 'easy',
      category: 'Sepsis',
    },
    {
      id: 'case3-q2',
      question: 'According to Surviving Sepsis Campaign Hour-1 Bundle, what is the FIRST priority?',
      options: [
        'Obtain two sets of blood cultures',
        'Administer broad-spectrum antibiotics',
        'Give 30mL/kg crystalloid bolus',
        'Measure serum lactate',
      ],
      correctIndex: 2,
      explanation: 'The **Hour-1 Bundle** prioritizes: (1) **30mL/kg crystalloid bolus** for hypotension or lactate ≥4 mmol/L (this patient has both: BP 88/52, lactate 4.2), (2) obtain blood cultures **before** antibiotics, (3) administer broad-spectrum antibiotics within 1 hour, (4) remeasure lactate if initially elevated. Early aggressive fluid resuscitation (within 3 hours) reduces mortality by 15-20%.',
      references: [
        "Surviving Sepsis Campaign Guidelines 2021 - https://doi.org/10.1097/CCM.0000000000005337",
        
      ],
      difficulty: 'medium',
      category: 'Sepsis',
    },
    {
      id: 'case3-q3',
      question: 'What is the appropriate initial antibiotic regimen for severe community-acquired pneumonia with septic shock?',
      options: [
        'Ceftriaxone 1g IV',
        'Azithromycin 500mg PO',
        'Ceftriaxone 2g IV + Azithromycin 500mg IV',
        'Vancomycin 15mg/kg IV + Piperacillin-Tazobactam 4.5g IV',
      ],
      correctIndex: 3,
      explanation: 'Severe CAP with **septic shock** requires **broad-spectrum coverage**: Beta-lactam (piperacillin-tazobactam 4.5g IV or cefepime 2g IV) + **vancomycin** (covers MRSA) + consider azithromycin (atypicals). Risk factors for MRSA pneumonia include: prior MRSA infection, recent hospitalization, IV drug use, recent antibiotics. Vancomycin is recommended for all severe CAP with septic shock until MRSA ruled out.',
      references: [
        "IDSA/ATS CAP Guidelines 2019 - https://doi.org/10.1093/cid/ciz1250",
        
      ],
      difficulty: 'hard',
      category: 'Sepsis',
    },
    {
      id: 'case3-q4',
      question: 'After 30mL/kg (2L) fluid bolus, BP remains 82/48. What is the next step?',
      options: [
        'Give additional 30mL/kg crystalloid',
        'Start norepinephrine (first-line vasopressor)',
        'Start dopamine (first-line vasopressor)',
        'Give albumin 25g IV',
      ],
      correctIndex: 1,
      explanation: '**Norepinephrine is the first-line vasopressor** for septic shock refractory to fluid resuscitation. Start at 0.05-0.1 mcg/kg/min, titrate to MAP ≥65 mmHg. Norepinephrine has superior outcomes vs dopamine (lower mortality, fewer arrhythmias). **Vasopressors should not delay** while giving additional fluids—start early via peripheral line if needed (central line preferred but not required to initiate).',
      references: [
        "Surviving Sepsis Campaign 2021: Vasopressors - https://doi.org/10.1097/CCM.0000000000005337",
        
      ],
      difficulty: 'medium',
      category: 'Sepsis',
    },
  ],
  learningPoints: [
    '📊 qSOFA ≥2: Screening tool for sepsis (altered mental status, RR ≥22, SBP ≤100)',
    '⏱️ Hour-1 Bundle: 30mL/kg fluids, blood cultures, antibiotics within 1 hour, remeasure lactate',
    '💧 Fluid resuscitation: 30mL/kg crystalloid bolus for hypotension OR lactate ≥4',
    '💊 Severe CAP antibiotics: Beta-lactam + Vancomycin + Azithromycin',
    '💉 Norepinephrine: First-line vasopressor (target MAP ≥65 mmHg)',
  ],
};

// Export all cases
export const allCases: CaseScenario[] = [
  case1_STEMI,
  case2_ChestTrauma,
  case3_Sepsis,
];

export const getCaseById = (id: string): CaseScenario | undefined => {
  return allCases.find((c) => c.id === id);
};

export const getCasesByCategory = (category: string): CaseScenario[] => {
  return allCases.filter((c) => c.category.toLowerCase() === category.toLowerCase());
};

export const getCasesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): CaseScenario[] => {
  return allCases.filter((c) => c.difficulty === difficulty);
};
