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

export const allCases: CaseScenario[] = [
  {
    id: 'case-001',
    title: 'Septic Shock in the Emergency Department',
    category: 'Critical Care',
    difficulty: 'hard',
    presentation: `You are called to evaluate a 67-year-old woman brought to the ED by EMS with fever, confusion, and hypotension. 
    
Patient Presentation:
- Temperature: 39.2°C (102.6°F)
- Heart Rate: 125 bpm
- Blood Pressure: 82/45 mmHg
- Respiratory Rate: 28 breaths/min
- Oxygen Saturation: 91% on room air
- Mental Status: Confused, following simple commands

History: Patient lives alone, found by daughter who reports 2 days of fever and weakness. Patient has diabetes and hypertension.

Physical Exam: Patient appears ill and lethargic. Lungs with bilateral crackles in lower fields. Abdomen soft but tender in right upper quadrant. Skin warm and flushed.`,
    questions: [
      {
        id: 'q001-1',
        question: 'What is your immediate first action?',
        options: [
          'Order blood cultures and start broad-spectrum antibiotics',
          'Obtain IV access and initiate aggressive fluid resuscitation',
          'Intubate the patient for airway protection',
          'Order CT abdomen to identify source of infection'
        ],
        correctIndex: 1,
        explanation: 'In septic shock, immediate IV access and aggressive fluid resuscitation with 30 mL/kg crystalloid is the priority (Surviving Sepsis Campaign 2021). This should be initiated within the first 3 hours. While antibiotics and cultures are critical, they come after ensuring hemodynamic stability.',
        references: [
          'Surviving Sepsis Campaign 2021 Guidelines',
          'Rhodes A, et al. Intensive Care Med. 2017;43(3):304-377'
        ],
        difficulty: 'hard',
        topicId: 'critical-care',
        learningObjectives: [
          'Recognize septic shock presentation',
          'Understand the importance of early fluid resuscitation',
          'Know the Surviving Sepsis Campaign bundles'
        ],
        clinicalPearls: [
          '30 mL/kg crystalloid bolus should be given in first 3 hours',
          'MAP goal ≥65 mmHg is the target',
          'Avoid using hetastarch in sepsis patients'
        ]
      },
      {
        id: 'q001-2',
        question: 'After administering 2L of lactated Ringer\'s, her BP is 85/50 mmHg, HR 120. What is the next step?',
        options: [
          'Continue fluid resuscitation with another 1-2L bolus',
          'Start norepinephrine as first-line vasopressor',
          'Switch to albumin for fluid resuscitation',
          'Start dopamine for both inotropic and vasopressor support'
        ],
        correctIndex: 1,
        explanation: 'Norepinephrine is the first-line vasopressor for septic shock (Surviving Sepsis 2021). It should be initiated when adequate fluid resuscitation fails to restore MAP ≥65 mmHg. Starting vasopressors early (within 1 hour) improves outcomes.',
        references: [
          'Surviving Sepsis Campaign 2021',
          'NEJM 2014;370:1583-1593 (Vasopressin vs Norepinephrine)'
        ],
        difficulty: 'medium',
        topicId: 'critical-care'
      },
      {
        id: 'q001-3',
        question: 'Blood cultures are drawn. When should antibiotics be administered?',
        options: [
          'Within 6 hours of sepsis recognition',
          'Within 3 hours of sepsis recognition',
          'Within 1 hour of sepsis recognition',
          'After imaging confirms source of infection'
        ],
        correctIndex: 2,
        explanation: 'Antibiotics should be administered within 1 hour of recognition of sepsis/septic shock (Surviving Sepsis 2021). Each hour delay in antibiotics increases mortality by 7.6%. Empiric broad-spectrum coverage should be started immediately after cultures are obtained.',
        references: [
          'Surviving Sepsis Campaign 2021',
          'Kumar A, et al. Crit Care Med. 2006;34(6):1589-1596'
        ],
        difficulty: 'medium',
        topicId: 'critical-care'
      },
      {
        id: 'q001-4',
        question: 'Lactate level returns at 4.2 mmol/L. What is the significance and your action?',
        options: [
          'This is normal; no action needed',
          'Elevated lactate indicates tissue hypoperfusion; remeasure in 2-4 hours',
          'Start bicarbonate infusion to correct metabolic acidosis',
          'This indicates lactic acidosis from metformin; stop all diabetic medications'
        ],
        correctIndex: 1,
        explanation: 'Lactate >2 mmol/L indicates tissue hypoperfusion in sepsis. Serial lactate measurements should guide resuscitation, with remeasurement every 2-4 hours until normalized. Lactate clearance (decrease ≥10% from baseline) is associated with improved outcomes.',
        references: [
          'Surviving Sepsis Campaign 2021',
          'Jones AE, et al. JAMA. 2010;303(8):739-746 (Lactate Clearance Trial)'
        ],
        difficulty: 'medium',
        topicId: 'critical-care'
      }
    ],
    learningPoints: [
      'Septic shock requires immediate recognition and aggressive intervention',
      'Surviving Sepsis bundles: fluids (30 mL/kg), antibiotics (within 1 hour), lactate measurement',
      'Norepinephrine is first-line vasopressor with MAP goal ≥65 mmHg',
      'Serial lactate measurements guide resuscitation effectiveness',
      'Early goal-directed therapy improves mortality in septic shock'
    ]
  },
  {
    id: 'case-002',
    title: 'Acute ST-Elevation Myocardial Infarction (STEMI)',
    category: 'Cardiology',
    difficulty: 'hard',
    presentation: `A 58-year-old man presents with 45 minutes of crushing substernal chest pain radiating to left arm.

Vital Signs:
- BP: 165/95 mmHg
- HR: 98 bpm
- RR: 20 breaths/min
- O2 Sat: 96% on RA

History: Pain started while shoveling snow, 10/10 severity, associated with diaphoresis and nausea. Medical history: hypertension, hyperlipidemia, 30-pack-year smoking history.

ECG: ST elevation 3mm in leads II, III, aVF. Reciprocal ST depression in I, aVL.`,
    questions: [
      {
        id: 'q002-1',
        question: 'This ECG pattern indicates which coronary territory?',
        options: [
          'Left anterior descending artery',
          'Left circumflex artery',
          'Right coronary artery',
          'Left main coronary artery'
        ],
        correctIndex: 2,
        explanation: 'ST elevation in inferior leads (II, III, aVF) with reciprocal changes in lateral leads indicates right coronary artery (RCA) territory infarction. The RCA supplies the inferior wall of the left ventricle in 80-90% of patients.',
        references: [
          '2013 ACCF/AHA STEMI Guidelines',
          'Thygesen K, et al. Circulation. 2018;138:e618-e651'
        ],
        difficulty: 'medium',
        topicId: 'cardiology',
        clinicalPearls: [
          'Always obtain right-sided ECG leads (V4R) in inferior STEMI',
          'RCA occlusion can cause bradycardia and AV blocks',
          '40% of inferior STEMIs have RV involvement'
        ]
      },
      {
        id: 'q002-2',
        question: 'What is the most appropriate immediate management?',
        options: [
          'Aspirin 325mg, clopidogrel 600mg, prepare for primary PCI',
          'Aspirin 325mg, alteplase (tPA), admit to ICU',
          'Aspirin 325mg, heparin, schedule catheterization tomorrow',
          'Nitroglycerin, morphine, beta-blocker, then evaluate'
        ],
        correctIndex: 0,
        explanation: 'STEMI patients should receive aspirin 162-325mg and P2Y12 inhibitor (clopidogrel, ticagrelor, or prasugrel) immediately, with preparation for primary PCI within 90 minutes door-to-balloon time. Primary PCI is superior to fibrinolysis when available within 120 minutes.',
        references: [
          '2013 ACCF/AHA STEMI Guidelines',
          'O\'Gara PT, et al. Circulation. 2013;127:e362-e425'
        ],
        difficulty: 'hard',
        topicId: 'cardiology'
      },
      {
        id: 'q002-3',
        question: 'During preparation for cath lab, patient develops bradycardia (HR 38) and hypotension. Best treatment?',
        options: [
          'Atropine 0.5mg IV',
          'Epinephrine 1mg IV',
          'Transcutaneous pacing',
          'Dopamine infusion'
        ],
        correctIndex: 0,
        explanation: 'Atropine 0.5-1mg IV is first-line treatment for symptomatic bradycardia in the setting of inferior STEMI. Bradycardia in inferior MI is often due to increased vagal tone or ischemia to the AV node (supplied by RCA). May require repeat dosing up to 3mg total.',
        references: [
          '2020 AHA ACLS Guidelines',
          'Panchal AR, et al. Circulation. 2020;142:S366-S468'
        ],
        difficulty: 'medium',
        topicId: 'cardiology'
      }
    ],
    learningPoints: [
      'STEMI diagnosis requires ≥1mm ST elevation in 2 contiguous leads',
      'Door-to-balloon time <90 minutes is the goal for primary PCI',
      'Inferior STEMI: check for right ventricular involvement with V4R',
      'Avoid nitrates if RV infarction suspected (can cause severe hypotension)',
      'Dual antiplatelet therapy (aspirin + P2Y12 inhibitor) reduces mortality'
    ]
  },
  {
    id: 'case-003',
    title: 'Pediatric Status Asthmaticus',
    category: 'Pediatrics',
    difficulty: 'hard',
    presentation: `A 7-year-old boy with history of asthma presents with severe respiratory distress.

Vital Signs:
- HR: 155 bpm
- RR: 45 breaths/min
- O2 Sat: 88% on RA
- BP: 95/60 mmHg
- Temperature: 37.2°C

Presentation: Child is sitting upright, tripod positioning, unable to speak full sentences. Visible accessory muscle use and intercostal retractions. Breath sounds diminished bilaterally with minimal wheezing. Mother reports he has used his albuterol inhaler 6 times in past 2 hours with no improvement.`,
    questions: [
      {
        id: 'q003-1',
        question: 'Absent wheezing in this clinical context indicates:',
        options: [
          'The asthma attack is improving',
          'Severe airflow limitation ("silent chest")',
          'Pneumothorax has developed',
          'The diagnosis is not asthma'
        ],
        correctIndex: 1,
        explanation: 'Decreased or absent breath sounds with minimal wheezing in severe respiratory distress represents "silent chest" - a sign of severe airflow obstruction where air movement is so reduced that wheezing cannot be heard. This is a critical finding requiring immediate aggressive therapy.',
        references: [
          '2020 GINA Guidelines',
          'NAEPP Expert Panel Report 3 (EPR-3)'
        ],
        difficulty: 'medium',
        topicId: 'pediatrics',
        clinicalPearls: [
          'Silent chest = severe asthma exacerbation',
          'Absence of wheezing does NOT mean improvement',
          'Consider impending respiratory failure'
        ]
      },
      {
        id: 'q003-2',
        question: 'What is the initial pharmacological management?',
        options: [
          'Continuous albuterol nebulization, ipratropium, oral prednisone',
          'Albuterol nebulizer every 20 minutes, IV methylprednisolone, magnesium sulfate',
          'Intubation and mechanical ventilation',
          'Epinephrine IM, albuterol, IV steroids'
        ],
        correctIndex: 1,
        explanation: 'Severe asthma exacerbation requires: continuous or frequent (q20min) albuterol, ipratropium bromide for first hour, systemic corticosteroids (IV if unable to take PO), and magnesium sulfate 40-50 mg/kg IV (max 2g) for severe cases. This represents the stepwise escalation for status asthmaticus.',
        references: [
          '2020 GINA Guidelines',
          'Griffiths B, Ducharme FM. Cochrane Database Syst Rev. 2013'
        ],
        difficulty: 'hard',
        topicId: 'pediatrics'
      },
      {
        id: 'q003-3',
        question: 'After 1 hour of aggressive therapy, minimal improvement. O2 sat 90%, altered mental status developing. Next step?',
        options: [
          'Add IV terbutaline infusion',
          'Prepare for intubation and mechanical ventilation',
          'Increase oxygen delivery to 100% non-rebreather',
          'Add heliox therapy'
        ],
        correctIndex: 1,
        explanation: 'Indications for intubation in status asthmaticus include: altered mental status, respiratory fatigue, inability to maintain oxygenation/ventilation despite maximal therapy. Use ketamine for induction (bronchodilator properties). Avoid rapid sequence if possible to prevent decompensation.',
        references: [
          '2020 PALS Guidelines',
          'Werner HA. Pediatr Clin North Am. 2009;56(2):389-402'
        ],
        difficulty: 'hard',
        topicId: 'pediatrics'
      }
    ],
    learningPoints: [
      'Status asthmaticus requires aggressive early intervention',
      'Silent chest is a critical warning sign, not improvement',
      'Magnesium sulfate is recommended for severe exacerbations',
      'Early PICU involvement for severe cases',
      'Ketamine is preferred induction agent for intubation in asthma'
    ]
  },
  {
    id: 'case-004',
    title: 'Traumatic Brain Injury Management',
    category: 'Trauma',
    difficulty: 'hard',
    presentation: `EMS brings a 32-year-old unrestrained driver involved in motor vehicle collision.

Vital Signs:
- BP: 170/95 mmHg
- HR: 58 bpm
- RR: 10 breaths/min, irregular
- GCS: E2V2M4 = 8

Exam: Left pupil 6mm non-reactive, right pupil 3mm reactive. Decerebrate posturing to painful stimuli. CT shows large left-sided epidural hematoma with 8mm midline shift.`,
    questions: [
      {
        id: 'q004-1',
        question: 'The combination of hypertension, bradycardia, and irregular respirations represents:',
        options: [
          'Neurogenic shock',
          'Cushing\'s triad indicating increased ICP',
          'Hemorrhagic shock',
          'Spinal shock'
        ],
        correctIndex: 1,
        explanation: 'Cushing\'s triad (hypertension, bradycardia, irregular respirations) is a late sign of increased intracranial pressure (ICP). It represents the body\'s attempt to maintain cerebral perfusion pressure in the face of rising ICP. This is a neurosurgical emergency.',
        references: [
          'Brain Trauma Foundation Guidelines 2016',
          'Carney N, et al. Neurosurgery. 2017;80(1):6-15'
        ],
        difficulty: 'medium',
        topicId: 'trauma'
      },
      {
        id: 'q004-2',
        question: 'What is the immediate management priority?',
        options: [
          'Start mannitol 1g/kg IV for ICP reduction',
          'Secure airway with rapid sequence intubation',
          'Emergency craniotomy in ED',
          'Hyperventilate to PaCO2 of 25 mmHg'
        ],
        correctIndex: 1,
        explanation: 'With GCS ≤8, immediate endotracheal intubation is required to protect airway and control ventilation. Maintain CPP (cerebral perfusion pressure) = MAP - ICP. Target PaCO2 35-40 mmHg initially (avoid aggressive hyperventilation). Notify neurosurgery immediately for potential emergent decompression.',
        references: [
          'Brain Trauma Foundation Guidelines 2016',
          '2020 ATLS Guidelines'
        ],
        difficulty: 'hard',
        topicId: 'trauma',
        clinicalPearls: [
          'Avoid hypotension (SBP <110 mmHg) in TBI patients',
          'Avoid hyperventilation except for acute herniation',
          'Maintain CPP >60-70 mmHg'
        ]
      },
      {
        id: 'q004-3',
        question: 'Which intervention is appropriate for ICP management in this patient?',
        options: [
          'Hypertonic saline 3% 250mL bolus',
          'Hyperventilation to PaCO2 25 mmHg',
          'Prophylactic hypothermia to 33°C',
          'Trendelenburg positioning'
        ],
        correctIndex: 0,
        explanation: 'Hypertonic saline (3% or 23.4%) is effective for acute ICP reduction in traumatic brain injury. Osmotherapy with either hypertonic saline or mannitol is recommended. Hypertonic saline may be preferred as it doesn\'t cause hypotension and can be used in hypovolemic patients.',
        references: [
          'Brain Trauma Foundation Guidelines 2016',
          'Kamel H, et al. Crit Care Med. 2011;39(3):554-559'
        ],
        difficulty: 'hard',
        topicId: 'trauma'
      }
    ],
    learningPoints: [
      'Epidural hematoma often presents with "lucid interval" followed by deterioration',
      'Cushing\'s triad is a late sign of elevated ICP',
      'Maintain CPP >60-70 mmHg (CPP = MAP - ICP)',
      'Avoid hypoxia and hypotension in TBI (worsens outcomes)',
      'Early neurosurgical consultation is critical for surgical lesions'
    ]
  },
  {
    id: 'case-005',
    title: 'Anaphylaxis in the Emergency Department',
    category: 'Allergy/Immunology',
    difficulty: 'medium',
    presentation: `A 25-year-old woman develops acute symptoms 10 minutes after eating at a restaurant.

Presenting Symptoms:
- Diffuse urticaria and pruritus
- Lip and tongue swelling
- Throat tightness and difficulty swallowing
- Shortness of breath with audible wheeze
- Feeling of "impending doom"

Vital Signs:
- BP: 85/50 mmHg
- HR: 125 bpm
- RR: 28 breaths/min
- O2 Sat: 91% on RA

Patient has known peanut allergy and realizes the dish may have contained peanuts.`,
    questions: [
      {
        id: 'q005-1',
        question: 'What is the first-line treatment?',
        options: [
          'Diphenhydramine 50mg IV',
          'Methylprednisolone 125mg IV',
          'Epinephrine 0.3-0.5mg IM (1:1000)',
          'Albuterol nebulizer'
        ],
        correctIndex: 2,
        explanation: 'Epinephrine IM is the first-line treatment for anaphylaxis. It should be given immediately when anaphylaxis is suspected. Dose: 0.3-0.5mg (0.3-0.5mL of 1:1000 solution) IM in anterolateral thigh. Can be repeated every 5-15 minutes if needed. Delays in epinephrine administration increase risk of fatal outcomes.',
        references: [
          'WAO Anaphylaxis Guidelines 2020',
          'Shaker MS, et al. J Allergy Clin Immunol. 2020;145(4):1082-1123'
        ],
        difficulty: 'easy',
        topicId: 'allergy',
        clinicalPearls: [
          'Epinephrine IM is safer than IV in most cases',
          'Anterolateral thigh is preferred injection site',
          'There are NO absolute contraindications to epinephrine in anaphylaxis'
        ]
      },
      {
        id: 'q005-2',
        question: 'After epinephrine, which additional therapies are indicated?',
        options: [
          'H1 and H2 blockers, corticosteroids, IV fluids',
          'H1 blocker only, observe for 2 hours',
          'Immediate discharge with EpiPen prescription',
          'Intubation to secure airway'
        ],
        correctIndex: 0,
        explanation: 'Adjunctive therapy includes: H1 antihistamines (diphenhydramine), H2 blockers (ranitidine/famotidine), corticosteroids (methylprednisolone), IV fluid resuscitation for hypotension, and bronchodilators for bronchospasm. However, these are ADJUNCTIVE - epinephrine is the only treatment that prevents and reverses airway obstruction and cardiovascular collapse.',
        references: [
          'WAO Anaphylaxis Guidelines 2020',
          'Simons FE, et al. J Allergy Clin Immunol. 2015;135(5):1065-1075'
        ],
        difficulty: 'medium',
        topicId: 'allergy'
      },
      {
        id: 'q005-3',
        question: 'How long should this patient be observed before discharge?',
        options: [
          '30 minutes after symptoms resolve',
          '2-4 hours after symptoms resolve',
          '4-8 hours minimum, possibly 24 hours',
          'Can discharge immediately after epinephrine if symptoms improve'
        ],
        correctIndex: 2,
        explanation: 'Patients should be observed for 4-8 hours minimum due to risk of biphasic reaction (recurrence of symptoms after initial resolution). Biphasic reactions occur in 5-20% of cases, typically within 4-12 hours. Patients at higher risk (severe initial reaction, delayed epinephrine, history of biphasic reactions) should be observed for up to 24 hours.',
        references: [
          'WAO Anaphylaxis Guidelines 2020',
          'Lee S, et al. J Allergy Clin Immunol Pract. 2015;3(3):408-416'
        ],
        difficulty: 'medium',
        topicId: 'allergy'
      }
    ],
    learningPoints: [
      'Anaphylaxis is a clinical diagnosis - don\'t wait for lab confirmation',
      'Epinephrine IM is first-line and should not be delayed',
      'Biphasic reactions occur in 5-20% of cases',
      'All patients should be prescribed epinephrine auto-injector at discharge',
      'Referral to allergist for testing and long-term management'
    ]
  }
];

export const getCaseById = (id: string) => allCases.find((c) => c.id === id);
export const getCasesByCategory = (category: string) => allCases.filter((c) => c.category.toLowerCase() === category.toLowerCase());
export const getCasesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => allCases.filter((c) => c.difficulty === difficulty);
