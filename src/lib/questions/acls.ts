import { Question } from './types';

export const aclsQuestions: Question[] = [
  {
    id: 'acls-001',
    question: 'A patient is found in cardiac arrest with ventricular fibrillation. After CPR is started and the first defibrillation, what is the next most appropriate action according to 2020 AHA ACLS guidelines?',
    options: [
      'Immediate second defibrillation',
      'Resume CPR for 2 minutes, then rhythm check',
      'Give epinephrine 1mg IV',
      'Give amiodarone 300mg IV'
    ],
    correctIndex: 1,
    explanation: 'After defibrillation, immediately resume CPR for 2 minutes before next rhythm check. This minimizes chest compression interruptions and maximizes coronary perfusion pressure. Drug therapy comes after second failed defibrillation.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation',
      'Neumar RW, et al. Part 8: Adult Advanced Cardiovascular Life Support: 2010 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-002',
    question: 'During cardiac arrest, high-quality CPR includes chest compressions at what rate and depth according to current AHA guidelines?',
    options: [
      '100-120/min, at least 2 inches (5 cm)',
      '80-100/min, at least 2.4 inches (6 cm)',
      '100-120/min, at least 2.4 inches (6 cm)',
      '120-140/min, at least 2 inches (5 cm)'
    ],
    correctIndex: 2,
    explanation: 'High-quality CPR requires compression rate 100-120/min and depth at least 2.4 inches (6 cm) in adults. Complete chest recoil, minimal interruptions (<10 seconds), and avoiding over-ventilation are also critical components.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'easy',
    topicId: 'acls'
  },
  {
    id: 'acls-003',
    question: 'A patient remains in ventricular fibrillation after 2 defibrillations and CPR. When should the first dose of epinephrine be given?',
    options: [
      'Immediately after first defibrillation',
      'After second failed defibrillation',
      'After third failed defibrillation',
      'Only if rhythm changes to asystole'
    ],
    correctIndex: 1,
    explanation: 'In VF/pVT, epinephrine 1mg IV is given after the second failed defibrillation, then every 3-5 minutes. Early defibrillation and CPR take priority over medications in shockable rhythms.',
    references: [
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-004',
    question: 'A patient in cardiac arrest receives return of spontaneous circulation (ROSC). Blood pressure is 85/50 mmHg, heart rate 110 bpm. What is the target systolic blood pressure post-ROSC?',
    options: [
      '≥90 mmHg',
      '≥100 mmHg',
      '≥110 mmHg',
      '≥120 mmHg'
    ],
    correctIndex: 0,
    explanation: 'Post-cardiac arrest care targets systolic BP ≥90 mmHg to ensure adequate cerebral perfusion pressure. Avoid hypotension which worsens neurologic outcomes. Consider vasopressors if fluids alone are insufficient.',
    references: [
      'Callaway CW, et al. Part 8: Post-Cardiac Arrest Care: 2015 American Heart Association Guidelines',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'easy',
    topicId: 'acls'
  },
  {
    id: 'acls-005',
    question: 'A patient presents with unstable bradycardia (heart rate 35 bpm) with signs of poor perfusion. What is the first-line treatment?',
    options: [
      'Atropine 0.5mg IV',
      'Transcutaneous pacing',
      'Dopamine infusion',
      'Epinephrine infusion'
    ],
    correctIndex: 0,
    explanation: 'Atropine 0.5mg IV is first-line for unstable bradycardia, may repeat every 3-5 minutes up to 3mg total. If atropine ineffective or contraindicated, proceed to transcutaneous pacing or chronotropic infusions.',
    references: [
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'easy',
    topicId: 'acls'
  },
  {
    id: 'acls-006',
    question: 'A patient in ventricular fibrillation receives amiodarone 300mg IV after failed defibrillations. What is the next amiodarone dose if VF persists?',
    options: [
      'Amiodarone 150mg IV',
      'Amiodarone 300mg IV',
      'Lidocaine 1.5mg/kg IV',
      'No additional antiarrhythmic'
    ],
    correctIndex: 0,
    explanation: 'Second dose of amiodarone is 150mg IV if VF/pVT persists. Lidocaine 1-1.5mg/kg IV is alternative if amiodarone unavailable. Maximum amiodarone dose in cardiac arrest is 450mg (300mg + 150mg).',
    references: [
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-007',
    question: 'A patient presents with regular wide-complex tachycardia at 180 bpm with stable vital signs. What is the most appropriate initial treatment?',
    options: [
      'Synchronized cardioversion 100J',
      'Adenosine 6mg IV rapid push',
      'Amiodarone 150mg IV over 10 minutes',
      'Procainamide 20-50mg/min IV'
    ],
    correctIndex: 1,
    explanation: 'For stable wide-complex tachycardia, adenosine 6mg IV rapid push can help differentiate SVT with aberrancy (may terminate) from VT (no effect). If adenosine ineffective, proceed to antiarrhythmics like amiodarone or procainamide.',
    references: [
      'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-008',
    question: 'During CPR for asystole, what is the correct epinephrine dosing according to ACLS guidelines?',
    options: [
      '1mg IV every 2-3 minutes',
      '1mg IV every 3-5 minutes',
      '2mg IV every 3-5 minutes',
      '0.5mg IV every 3-5 minutes'
    ],
    correctIndex: 1,
    explanation: 'For asystole/PEA, epinephrine 1mg IV is given every 3-5 minutes throughout the resuscitation. In VF/pVT, epinephrine is delayed until after second failed defibrillation, then every 3-5 minutes.',
    references: [
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines',
      'Soar J, et al. European Resuscitation Council Guidelines for Resuscitation 2015'
    ],
    difficulty: 'easy',
    topicId: 'acls'
  },
  {
    id: 'acls-009',
    question: 'A patient achieves ROSC after 15 minutes of CPR. They remain comatose. What target temperature should be considered for targeted temperature management?',
    options: [
      '32-34°C',
      '36°C',
      '32-36°C',
      'Normothermia only'
    ],
    correctIndex: 2,
    explanation: 'Current guidelines suggest targeted temperature management between 32-36°C for comatose patients after ROSC. Specific temperature within this range less important than avoiding fever. Maintain target for 24 hours.',
    references: [
      'Callaway CW, et al. Part 8: Post-Cardiac Arrest Care: 2015 American Heart Association Guidelines',
      'Geocadin RG, et al. Standards for Studies of Neurological Prognostication in Comatose Survivors of Cardiac Arrest'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-010',
    question: 'A patient presents with polymorphic ventricular tachycardia (torsades de pointes). What is the most appropriate immediate treatment?',
    options: [
      'Synchronized cardioversion',
      'Amiodarone 150mg IV',
      'Magnesium sulfate 2g IV',
      'Lidocaine 1.5mg/kg IV'
    ],
    correctIndex: 2,
    explanation: 'Magnesium sulfate 2g IV is first-line for torsades de pointes, even with normal serum magnesium. If unstable, unsynchronized defibrillation is used (cannot synchronize to polymorphic rhythm). Identify and correct underlying QT prolongation.',
    references: [
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines',
      'Roden DM. Drug-induced prolongation of the QT interval'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-011',
    question: 'During cardiac arrest, what is the recommended compression-to-ventilation ratio for advanced airway management?',
    options: [
      '30:2',
      '15:2',
      'Continuous compressions with 1 breath every 6 seconds',
      'Continuous compressions with 1 breath every 10 seconds'
    ],
    correctIndex: 2,
    explanation: 'With advanced airway (endotracheal tube, supraglottic airway), provide continuous chest compressions without pauses and 1 breath every 6 seconds (10 breaths/min). Avoid hyperventilation which decreases venous return.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-012',
    question: 'A patient presents with atrial fibrillation with rapid ventricular response (heart rate 160 bpm) and hypotension. What is the most appropriate treatment?',
    options: [
      'Diltiazem 0.25mg/kg IV',
      'Metoprolol 5mg IV',
      'Synchronized cardioversion starting at 100-200J',
      'Amiodarone 150mg IV'
    ],
    correctIndex: 2,
    explanation: 'Unstable atrial fibrillation with hemodynamic compromise requires immediate synchronized cardioversion. Start with 100-200J biphasic. Rate control medications are contraindicated in unstable patients.',
    references: [
      'January CT, et al. 2019 AHA/ACC/HRS Focused Update of the 2014 AHA/ACC/HRS Guideline for Management of Patients With Atrial Fibrillation',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-013',
    question: 'A patient in cardiac arrest has been receiving high-quality CPR. After how many minutes should termination of resuscitation be considered in the absence of reversible causes?',
    options: [
      'After 10 minutes',
      'After 20 minutes',
      'After 30 minutes',
      'No specific time limit'
    ],
    correctIndex: 3,
    explanation: 'There is no specific time limit for terminating resuscitation. Consider reversible causes (H\'s and T\'s), quality of CPR, initial rhythm, witness status, and response to interventions. Some patients have good outcomes after prolonged resuscitation.',
    references: [
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines',
      'Goldberger ZD, et al. Duration of resuscitation efforts and survival after in-hospital cardiac arrest'
    ],
    difficulty: 'hard',
    topicId: 'acls'
  },
  {
    id: 'acls-014',
    question: 'A patient presents with stable narrow-complex tachycardia at 180 bpm. Vagal maneuvers are unsuccessful. What is the next step?',
    options: [
      'Adenosine 6mg IV rapid push',
      'Diltiazem 0.25mg/kg IV',
      'Synchronized cardioversion',
      'Metoprolol 5mg IV'
    ],
    correctIndex: 0,
    explanation: 'After unsuccessful vagal maneuvers in stable SVT, adenosine 6mg IV rapid push followed by 20ml saline flush is next step. If ineffective, give adenosine 12mg. If still ineffective, consider calcium channel blockers or beta-blockers.',
    references: [
      'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'easy',
    topicId: 'acls'
  },
  {
    id: 'acls-015',
    question: 'During cardiac arrest, what are the reversible causes (H\'s and T\'s) that should be considered and treated?',
    options: [
      'Hypoxia, Hypovolemia, Hydrogen ions, Hyperkalemia; Tension pneumothorax, Tamponade, Toxins, Thrombosis',
      'Hypoxia, Hypothermia, Hypovolemia, Hyperkalemia; Tension pneumothorax, Tamponade, Toxins, Thrombosis',
      'Hypoxia, Hypovolemia, Hydrogen ions, Hypothermia, Hyperkalemia; Tension pneumothorax, Tamponade, Toxins, Thrombosis',
      'Hypoxia, Hypovolemia, Hypothermia, Hyperkalemia; Trauma, Tamponade, Toxins, Thrombosis'
    ],
    correctIndex: 2,
    explanation: 'The 5 H\'s are: Hypoxia, Hypovolemia, Hydrogen ions (acidosis), Hypothermia, Hyperkalemia. The 5 T\'s are: Tension pneumothorax, Tamponade (cardiac), Toxins, Thrombosis (pulmonary), Thrombosis (coronary). Address reversible causes during CPR.',
    references: [
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines',
      'Soar J, et al. European Resuscitation Council Guidelines for Resuscitation 2015'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-016',
    question: 'A patient achieves ROSC but has agonal breathing with oxygen saturation of 85%. What is the target oxygen saturation post-cardiac arrest?',
    options: [
      '≥94%',
      '≥96%',
      '≥98%',
      '100%'
    ],
    correctIndex: 0,
    explanation: 'Target oxygen saturation post-ROSC is ≥94%. Avoid both hypoxemia and hyperoxemia. Once ROSC achieved, titrate FiO2 to maintain SpO2 94-99%. Hyperoxemia may worsen neurologic outcomes.',
    references: [
      'Callaway CW, et al. Part 8: Post-Cardiac Arrest Care: 2015 American Heart Association Guidelines',
      'Kilgannon JH, et al. Association between arterial hyperoxia following resuscitation from cardiac arrest and in-hospital mortality'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-017',
    question: 'A patient presents with unstable supraventricular tachycardia. What energy level should be used for initial synchronized cardioversion?',
    options: [
      '50-100J',
      '100-200J',
      '200J',
      '360J'
    ],
    correctIndex: 0,
    explanation: 'For unstable SVT, initial synchronized cardioversion uses 50-100J. SVT typically requires lower energy than atrial fibrillation or ventricular arrhythmias. Increase energy if initial shock unsuccessful.',
    references: [
      'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-018',
    question: 'A pregnant patient at 30 weeks gestation is in cardiac arrest. What modification to CPR is recommended?',
    options: [
      'Manual left uterine displacement during compressions',
      'Compressions higher on sternum',
      'Faster compression rate',
      'No modifications needed'
    ],
    correctIndex: 0,
    explanation: 'For pregnant patients >20 weeks gestation, provide manual left uterine displacement during CPR to relieve aortocaval compression. This improves venous return and cardiac output. Consider emergency cesarean delivery if no ROSC within 4 minutes.',
    references: [
      'Jeejeebhoy FM, et al. Cardiac Arrest in Pregnancy: A Scientific Statement From the American Heart Association',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-019',
    question: 'A patient in ventricular fibrillation receives successful defibrillation and achieves organized rhythm but no pulse (PEA). What is the next action?',
    options: [
      'Immediate defibrillation',
      'Resume CPR and give epinephrine',
      'Check pulse for 10 seconds',
      'Give amiodarone 300mg'
    ],
    correctIndex: 1,
    explanation: 'PEA requires immediate CPR and epinephrine 1mg IV. Do not defibrillate organized rhythms without pulse. Focus on reversible causes of PEA (H\'s and T\'s) while continuing high-quality CPR.',
    references: [
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-020',
    question: 'During CPR, what is the maximum interruption time allowed for pulse checks and rhythm analysis?',
    options: [
      '5 seconds',
      '10 seconds',
      '15 seconds',
      '20 seconds'
    ],
    correctIndex: 1,
    explanation: 'Minimize interruptions in chest compressions to <10 seconds for pulse checks, rhythm analysis, and defibrillator charging. Longer interruptions decrease coronary perfusion pressure and reduce survival rates.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Christenson J, et al. Chest compression fraction determines survival in patients with out-of-hospital ventricular fibrillation'
    ],
    difficulty: 'easy',
    topicId: 'acls'
  },
  {
    id: 'acls-021',
    question: 'A patient presents with monomorphic ventricular tachycardia and is hemodynamically stable. What is the preferred antiarrhythmic medication?',
    options: [
      'Amiodarone 150mg IV over 10 minutes',
      'Lidocaine 1-1.5mg/kg IV',
      'Procainamide 20-50mg/min IV',
      'Any of the above'
    ],
    correctIndex: 3,
    explanation: 'For stable monomorphic VT, amiodarone, lidocaine, or procainamide are all acceptable first-line treatments. Choice depends on patient factors and physician preference. If medications fail, synchronized cardioversion is indicated.',
    references: [
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-022',
    question: 'A comatose post-cardiac arrest patient develops fever (39°C). What is the most appropriate management?',
    options: [
      'Allow fever - may be protective',
      'Aggressive fever control with cooling devices',
      'Antipyretics only',
      'No intervention unless >40°C'
    ],
    correctIndex: 1,
    explanation: 'Fever should be aggressively treated in post-cardiac arrest patients as it worsens neurologic outcomes. Use cooling devices, antipyretics, and treat underlying causes. Maintain normothermia or targeted temperature management.',
    references: [
      'Callaway CW, et al. Part 8: Post-Cardiac Arrest Care: 2015 American Heart Association Guidelines',
      'Zeiner A, et al. Hyperthermia after cardiac arrest is associated with an unfavorable neurologic outcome'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-023',
    question: 'A patient in cardiac arrest has suspected opioid overdose. In addition to standard ACLS, what additional intervention is recommended?',
    options: [
      'Naloxone 0.4-2mg IV',
      'Flumazenil 0.2mg IV',
      'No additional intervention',
      'Higher dose epinephrine'
    ],
    correctIndex: 0,
    explanation: 'For suspected opioid-induced cardiac arrest, give naloxone 0.4-2mg IV in addition to standard ACLS. Naloxone may reverse respiratory depression that led to cardiac arrest. Higher doses may be needed for fentanyl/synthetic opioids.',
    references: [
      'Lavonas EJ, et al. Part 10: Special Circumstances of Resuscitation: 2015 American Heart Association Guidelines',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-024',
    question: 'A patient achieves ROSC after cardiac arrest but has cardiogenic shock. What is the preferred vasopressor?',
    options: [
      'Norepinephrine',
      'Epinephrine',
      'Dopamine',
      'Vasopressin'
    ],
    correctIndex: 0,
    explanation: 'Norepinephrine is preferred vasopressor for post-cardiac arrest shock, providing vasoconstriction with less chronotropic effects than epinephrine or dopamine. Avoid excessive beta-stimulation in already compromised myocardium.',
    references: [
      'Callaway CW, et al. Part 8: Post-Cardiac Arrest Care: 2015 American Heart Association Guidelines',
      'Rhodes A, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-025',
    question: 'During CPR for ventricular fibrillation, when should chest compressions be resumed after defibrillation?',
    options: [
      'After pulse check',
      'After rhythm check',
      'Immediately after shock delivery',
      'After 30 seconds'
    ],
    correctIndex: 2,
    explanation: 'Resume chest compressions immediately after shock delivery without pulse or rhythm check. Most patients remain in VF after first shock, and immediate CPR maintains perfusion. Check rhythm after 2 minutes of CPR.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-026',
    question: 'A patient presents with bradycardia and second-degree AV block Type II with wide QRS. Atropine is ineffective. What is the next intervention?',
    options: [
      'Repeat atropine 1mg IV',
      'Transcutaneous pacing',
      'Dopamine infusion 5-10 mcg/kg/min',
      'Epinephrine infusion 2-10 mcg/min'
    ],
    correctIndex: 1,
    explanation: 'Type II second-degree AV block with wide QRS indicates infranodal conduction disease that does not respond to atropine and may worsen with atropine. Transcutaneous pacing is most appropriate next step.',
    references: [
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'hard',
    topicId: 'acls'
  },
  {
    id: 'acls-027',
    question: 'A patient in ventricular fibrillation arrest is refractory to standard ACLS interventions. What additional therapy may be considered?',
    options: [
      'Double sequential defibrillation',
      'Calcium chloride 1g IV',
      'Sodium bicarbonate 50 mEq IV',
      'All of the above'
    ],
    correctIndex: 3,
    explanation: 'For refractory VF, consider double sequential defibrillation, empirical calcium (especially if hyperkalemia suspected), and sodium bicarbonate (especially if acidosis or tricyclic overdose suspected). These are not routine but may help in specific circumstances.',
    references: [
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines',
      'Cabanas JG, et al. Double sequential external defibrillation in out-of-hospital refractory ventricular fibrillation'
    ],
    difficulty: 'hard',
    topicId: 'acls'
  },
  {
    id: 'acls-028',
    question: 'A patient presents with regular wide-complex tachycardia. Adenosine has no effect and the patient becomes unstable. What is the next intervention?',
    options: [
      'Amiodarone 150mg IV',
      'Synchronized cardioversion',
      'Procainamide 20mg/min IV',
      'Unsynchronized defibrillation'
    ],
    correctIndex: 1,
    explanation: 'Unstable wide-complex tachycardia (likely VT after adenosine failure) requires immediate synchronized cardioversion. Start with 100J for monomorphic VT. Use synchronized shocks for organized rhythms.',
    references: [
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-029',
    question: 'A post-cardiac arrest patient has blood glucose of 45 mg/dL. What is the target glucose range in post-ROSC care?',
    options: [
      '80-110 mg/dL',
      '140-180 mg/dL',
      '144-180 mg/dL',
      '100-150 mg/dL'
    ],
    correctIndex: 2,
    explanation: 'Target blood glucose 144-180 mg/dL in post-cardiac arrest patients. Avoid both hypoglycemia (<80 mg/dL) and severe hyperglycemia (>180 mg/dL). Tight glucose control may increase hypoglycemia risk without benefit.',
    references: [
      'Callaway CW, et al. Part 8: Post-Cardiac Arrest Care: 2015 American Heart Association Guidelines',
      'The NICE-SUGAR Study Investigators. Intensive versus conventional glucose control in critically ill patients'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  },
  {
    id: 'acls-030',
    question: 'A healthcare provider is alone with a patient in cardiac arrest. An AED is available but no phone. What should be the first action?',
    options: [
      'Start CPR immediately',
      'Get AED and attempt defibrillation',
      'Call for help/activate emergency response',
      'Check pulse for 10 seconds'
    ],
    correctIndex: 2,
    explanation: 'When alone, activating emergency response system takes priority to get additional help and equipment. For witnessed cardiac arrest with AED available, some guidelines suggest getting AED first, but calling for help ensures additional resources.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'acls'
  }
];