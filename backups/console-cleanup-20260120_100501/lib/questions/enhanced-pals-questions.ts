/**
 * Enhanced Pediatric Advanced Life Support (PALS) Questions
 * Improved content with detailed clinical scenarios and better explanations
 * Focus on real-world applications and decision-making
 * 
 * Addresses low performance (58% average score) identified in dashboard analysis
 */

import { Question } from './types';

export const enhancedPalsQuestions: Question[] = [
  {
    id: 'enhanced-pals-001',
    question: 'A 3-year-old child (15 kg) is found unresponsive with no pulse. After 2 minutes of CPR, you establish IV access. What is the correct initial dose of epinephrine?',
    options: [
      '0.15 mg (0.15 mL of 1:1000) IV',
      '0.15 mg (1.5 mL of 1:10,000) IV',
      '0.3 mg (3 mL of 1:10,000) IV',
      '1 mg (10 mL of 1:10,000) IV'
    ],
    correctIndex: 1,
    explanation: 'For pediatric cardiac arrest, epinephrine dose is 0.01 mg/kg IV/IO (0.1 mL/kg of 1:10,000 concentration). For a 15 kg child: 0.01 × 15 = 0.15 mg = 1.5 mL of 1:10,000. Never use 1:1000 concentration IV as it\'s 10× more concentrated. Repeat every 3-5 minutes during CPR.',
    references: [
      'AHA PALS Guidelines 2020',
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support. Circulation. 2020'
    ],
    difficulty: 'medium',
    category: 'pediatric-emergencies',
    topicId: 'pals',
    clinicalScenario: 'You are called to the pediatric ward where a 3-year-old child has collapsed and is pulseless.',
    patientPresentation: {
      age: 3,
      gender: 'unknown',
      chiefComplaint: 'Cardiac arrest',
      vitals: 'No pulse, apneic, cyanotic',
      vitalSigns: {
        heartRate: 0,
        bloodPressure: 'Not measurable',
        temperature: 37.2,
        respiratoryRate: 0,
        oxygenSaturation: 0
      }
    },
    learningObjectives: [
      'Calculate weight-based epinephrine dosing for pediatric cardiac arrest',
      'Understand concentration differences between 1:1000 and 1:10,000 epinephrine',
      'Apply PALS dosing guidelines in emergency situations'
    ],
    clinicalPearls: [
      'Always verify epinephrine concentration before administration',
      'Weight-based dosing is critical in pediatrics to avoid overdose',
      'Consider using a length-based tape (Broselow) for rapid dosing calculations'
    ]
  },

  {
    id: 'enhanced-pals-002',
    question: 'During pediatric CPR on a 2-year-old, what is the correct compression-to-ventilation ratio when two rescuers are present?',
    options: [
      '30:2 (same as adult)',
      '15:2 (pediatric modification)',
      '5:1 (continuous ventilation)',
      '100:2 (high compression rate)'
    ],
    correctIndex: 1,
    explanation: 'For two-rescuer pediatric CPR, use 15:2 compression-to-ventilation ratio. This differs from adult CPR (30:2) and single-rescuer pediatric CPR (30:2). The higher ventilation rate addresses the respiratory nature of most pediatric arrests. Compress at least 1/3 of chest diameter.',
    references: [
      'AHA PALS Guidelines 2020',
      'Berg MD, et al. Part 13: Pediatric Basic Life Support. Circulation. 2020'
    ],
    difficulty: 'easy',
    category: 'pediatric-emergencies',
    topicId: 'pals',
    clinicalScenario: 'You and a nurse are performing CPR on a 2-year-old who collapsed in the emergency department.',
    learningObjectives: [
      'Differentiate compression ratios between single and two-rescuer pediatric CPR',
      'Understand rationale for higher ventilation rates in children',
      'Apply age-appropriate CPR techniques'
    ],
    clinicalPearls: [
      'Pediatric arrests are often respiratory in origin, requiring more ventilation',
      'Switch compressors every 2 minutes to prevent fatigue',
      'Use proper hand placement: lower half of breastbone, avoid xiphoid process'
    ]
  },

  {
    id: 'enhanced-pals-003',
    question: 'A 6-year-old presents with compensated shock (weak pulse, delayed cap refill, cool extremities) but normal blood pressure. What is your initial fluid management?',
    options: [
      'Start with 10 mL/kg normal saline over 1 hour',
      'Give 20 mL/kg normal saline bolus over 5-20 minutes',
      'Begin vasopressors immediately due to shock',
      'Restrict fluids to prevent fluid overload'
    ],
    correctIndex: 1,
    explanation: 'Compensated shock requires aggressive fluid resuscitation even with normal BP. Give 20 mL/kg isotonic crystalloid (NS or LR) rapidly over 5-20 minutes. Reassess after each bolus. May need up to 60 mL/kg in first hour. BP is maintained until late in shock progression in children.',
    references: [
      'AHA PALS Guidelines 2020',
      'Carcillo JA, et al. Clinical practice parameters for hemodynamic support of pediatric and neonatal septic shock'
    ],
    difficulty: 'medium',
    category: 'pediatric-emergencies',
    topicId: 'pals',
    clinicalScenario: 'A previously healthy 6-year-old is brought to the ED with 3 days of fever and decreased oral intake.',
    patientPresentation: {
      age: 6,
      gender: 'female',
      chiefComplaint: 'Fever and decreased activity',
      vitalSigns: {
        heartRate: 150,
        bloodPressure: '95/60',
        temperature: 39.5,
        respiratoryRate: 28,
        oxygenSaturation: 98
      },
      physicalExam: 'Weak peripheral pulses, capillary refill 4 seconds, cool extremities, dry mucous membranes'
    },
    learningObjectives: [
      'Recognize signs of compensated shock in children',
      'Apply appropriate fluid resuscitation protocols',
      'Understand differences between adult and pediatric shock presentation'
    ],
    clinicalPearls: [
      'Children maintain blood pressure until very late in shock',
      'Look for early signs: tachycardia, weak pulses, delayed cap refill',
      'Aggressive early fluid resuscitation prevents progression to decompensated shock'
    ]
  },

  {
    id: 'enhanced-pals-004',
    question: 'An 8-year-old with severe asthma exacerbation is not responding to albuterol. HR 140, RR 40, using accessory muscles, speaking only 2-3 words at a time. What is the next best intervention?',
    options: [
      'Intubate immediately for respiratory failure',
      'Give ipratropium bromide and corticosteroids',
      'Start continuous albuterol nebulization',
      'Prepare for emergency cricothyrotomy'
    ],
    correctIndex: 1,
    explanation: 'For severe asthma not responding to initial albuterol, add ipratropium bromide (anticholinergic) and systemic corticosteroids (prednisolone 2 mg/kg or methylprednisolone 1-2 mg/kg). This combination improves bronchodilation. Consider magnesium sulfate (25-50 mg/kg) for severe cases. Intubation is a last resort due to high morbidity.',
    references: [
      'GINA Guidelines 2023',
      'AHA PALS Guidelines 2020',
      'Sheehan WJ, et al. Asthma exacerbations in children. Pediatr Rev. 2020'
    ],
    difficulty: 'hard',
    category: 'pediatric-emergencies',
    topicId: 'pals',
    clinicalScenario: 'An 8-year-old known asthmatic presents to the ED in severe respiratory distress despite home nebulizer treatments.',
    patientPresentation: {
      age: 8,
      gender: 'male',
      chiefComplaint: 'Difficulty breathing for 6 hours',
      vitalSigns: {
        heartRate: 140,
        bloodPressure: '110/70',
        temperature: 37.0,
        respiratoryRate: 40,
        oxygenSaturation: 89
      },
      physicalExam: 'Accessory muscle use, intercostal retractions, speaking 2-3 word sentences, diffuse wheeze',
      pastMedicalHistory: ['Asthma', 'Previous ICU admission for asthma']
    },
    learningObjectives: [
      'Recognize severe asthma exacerbation requiring escalated therapy',
      'Apply stepwise treatment approach for pediatric asthma',
      'Understand when to consider intubation vs medical management'
    ],
    clinicalPearls: [
      'Avoid intubation in asthma when possible - very high risk procedure',
      'Silent chest may indicate impending respiratory arrest',
      'Magnesium sulfate can be added for severe cases not responding to standard therapy'
    ]
  },

  {
    id: 'enhanced-pals-005',
    question: 'A 4-year-old presents with suspected foreign body aspiration. The child is conscious, coughing weakly, and cannot speak. What is your immediate action?',
    options: [
      'Encourage continued coughing and monitor closely',
      'Perform back blows and chest thrusts immediately',
      'Attempt direct laryngoscopy and magill forceps',
      'Prepare for emergency surgical airway'
    ],
    correctIndex: 1,
    explanation: 'This describes severe/complete airway obstruction (cannot speak, weak cough). Immediately perform 5 back blows between shoulder blades, then 5 chest thrusts (similar to chest compressions). Alternate until object clears or child becomes unconscious. If unconscious, start CPR. Do NOT perform blind finger sweeps in children.',
    references: [
      'AHA PALS Guidelines 2020',
      'AHA BLS Guidelines 2020',
      'Pediatric Foreign Body Airway Obstruction Emergency Procedures'
    ],
    difficulty: 'medium',
    category: 'pediatric-emergencies',
    topicId: 'pals',
    clinicalScenario: 'A 4-year-old was eating grapes when suddenly started choking and cannot speak.',
    patientPresentation: {
      age: 4,
      gender: 'female',
      chiefComplaint: 'Choking episode while eating',
      physicalExam: 'Unable to speak, weak cough, cyanosis around lips, clutching throat'
    },
    learningObjectives: [
      'Differentiate between mild and severe foreign body airway obstruction',
      'Apply correct pediatric choking relief techniques',
      'Understand when to transition from obstruction relief to CPR'
    ],
    clinicalPearls: [
      'Never perform blind finger sweeps in children - may push object deeper',
      'Back blows are more effective than abdominal thrusts in young children',
      'If child becomes unconscious, immediately start CPR with chest compressions'
    ]
  },

  {
    id: 'enhanced-pals-006',
    question: 'A 15-month-old is brought to the ED with fever and seizure activity that has been ongoing for 8 minutes. Temperature is 40°C. What is your immediate priority?',
    options: [
      'Obtain blood cultures and start antibiotics',
      'Give acetaminophen rectally to reduce fever',
      'Administer lorazepam 0.1 mg/kg IV to stop seizure',
      'Perform lumbar puncture to rule out meningitis'
    ],
    correctIndex: 2,
    explanation: 'Status epilepticus is defined as seizure >5 minutes or repeated seizures without full recovery. Immediate priority is stopping the seizure with lorazepam 0.1 mg/kg IV/IO (max 4 mg) or diazepam 0.2 mg/kg IV. If no IV access, use rectal diazepam 0.5 mg/kg. Prolonged seizures cause brain damage independent of fever.',
    references: [
      'AHA PALS Guidelines 2020',
      'Glauser T, et al. Evidence-based guideline: Treatment of convulsive status epilepticus in children. Neurology 2016',
      'Abend NS, et al. Status epilepticus and refractory status epilepticus management. Semin Pediatr Neurol. 2014'
    ],
    difficulty: 'hard',
    category: 'pediatric-emergencies',
    topicId: 'pals',
    clinicalScenario: 'A toddler is brought to the ED by paramedics with ongoing seizure activity that started 8 minutes ago.',
    patientPresentation: {
      age: 15,
      gender: 'male',
      chiefComplaint: 'Seizure for 8 minutes',
      vitalSigns: {
        heartRate: 180,
        bloodPressure: '90/50',
        temperature: 40.0,
        respiratoryRate: 30,
        oxygenSaturation: 94
      },
      physicalExam: 'Ongoing generalized tonic-clonic seizure, hyperthermia, no obvious trauma'
    },
    learningObjectives: [
      'Define status epilepticus and recognize urgency',
      'Apply appropriate first-line anticonvulsant therapy',
      'Prioritize seizure termination over fever reduction'
    ],
    clinicalPearls: [
      'Status epilepticus is a neurological emergency requiring immediate intervention',
      'Fever reduction will not stop an ongoing seizure',
      'Prolonged seizures cause permanent brain damage independent of underlying cause'
    ]
  },

  {
    id: 'enhanced-pals-007',
    question: 'A 10-year-old is intubated and on mechanical ventilation after near-drowning. What ventilator settings should you avoid to prevent ventilator-induced lung injury?',
    options: [
      'Tidal volume 6-8 mL/kg, PEEP 5-8 cmH2O',
      'Tidal volume 10-12 mL/kg, PEEP 3-5 cmH2O',
      'Pressure-controlled ventilation mode',
      'FiO2 60-80% initially'
    ],
    correctIndex: 1,
    explanation: 'Avoid high tidal volumes (>8-10 mL/kg) which can cause ventilator-induced lung injury (VILI). Use lung-protective ventilation: TV 6-8 mL/kg ideal body weight, PEEP 5-8 cmH2O, plateau pressure <30 cmH2O. Near-drowning often causes ARDS, requiring careful ventilator management to prevent further lung injury.',
    references: [
      'Pediatric ARDS Network Guidelines',
      'Khemani RG, et al. Pediatric ARDS. Respir Care. 2017',
      'AHA PALS Guidelines 2020'
    ],
    difficulty: 'hard',
    category: 'pediatric-emergencies',
    topicId: 'pals',
    clinicalScenario: 'A 10-year-old was found face-down in a pool and is now intubated in the PICU with bilateral infiltrates on chest X-ray.',
    patientPresentation: {
      age: 10,
      gender: 'female',
      chiefComplaint: 'Near-drowning incident 2 hours ago',
      vitalSigns: {
        heartRate: 120,
        bloodPressure: '105/65',
        temperature: 36.8,
        respiratoryRate: 16,
        oxygenSaturation: 90
      },
      physicalExam: 'Intubated, bilateral crackles, cyanosis',
      labsImaging: 'CXR: bilateral infiltrates consistent with ARDS'
    },
    learningObjectives: [
      'Apply lung-protective ventilation strategies in pediatric ARDS',
      'Understand ventilator-induced lung injury prevention',
      'Recognize complications of near-drowning injuries'
    ],
    clinicalPearls: [
      'Near-drowning often progresses to ARDS requiring lung-protective ventilation',
      'High tidal volumes cause ventilator-induced lung injury',
      'Monitor for pneumothorax with positive pressure ventilation'
    ]
  },

  {
    id: 'enhanced-pals-008',
    question: 'A 5-year-old with congenital heart disease develops sudden onset bradycardia (HR 45) with poor perfusion. Blood pressure is 70/40. What is your immediate intervention?',
    options: [
      'Transcutaneous pacing immediately',
      'Atropine 0.02 mg/kg IV (minimum 0.1 mg)',
      'Epinephrine infusion 0.1-1 mcg/kg/min',
      'Chest compressions for HR <60 in child'
    ],
    correctIndex: 3,
    explanation: 'In children, heart rate <60 bpm with poor perfusion requires immediate chest compressions regardless of underlying rhythm. The cardiac output equation (CO = HR × SV) shows that bradycardia severely compromises cardiac output in children who cannot increase stroke volume like adults. Start CPR immediately.',
    references: [
      'AHA PALS Guidelines 2020',
      'de Caen AR, et al. Part 12: Pediatric Advanced Life Support. Circulation 2015'
    ],
    difficulty: 'medium',
    category: 'pediatric-emergencies',
    topicId: 'pals',
    clinicalScenario: 'A 5-year-old with known hypoplastic left heart syndrome suddenly becomes bradycardic and lethargic in the cardiac ICU.',
    patientPresentation: {
      age: 5,
      gender: 'male',
      chiefComplaint: 'Sudden onset of bradycardia and lethargy',
      vitalSigns: {
        heartRate: 45,
        bloodPressure: '70/40',
        temperature: 37.0,
        respiratoryRate: 22,
        oxygenSaturation: 85
      },
      pastMedicalHistory: ['Hypoplastic left heart syndrome', 'Previous Norwood procedure'],
      physicalExam: 'Lethargic, weak pulses, prolonged cap refill'
    },
    learningObjectives: [
      'Recognize indications for chest compressions in bradycardic children',
      'Understand pediatric cardiac output physiology',
      'Apply PALS bradycardia algorithm'
    ],
    clinicalPearls: [
      'Children are heart rate dependent for cardiac output',
      'HR <60 with poor perfusion = cardiac arrest in children',
      'Do not delay compressions to try medications first'
    ]
  }
];

export default enhancedPalsQuestions;