import { Question } from './types';

export const palsQuestions: Question[] = [
  {
    id: 'pals-001',
    question: 'What is the compression-to-ventilation ratio for infant CPR with one rescuer according to 2020 AHA PALS guidelines?',
    options: [
      '15:2',
      '30:2',
      '5:1',
      '3:1'
    ],
    correctIndex: 1,
    explanation: 'For infant and child CPR with one rescuer, use 30:2 compression-to-ventilation ratio, same as adults. With two rescuers, use 15:2 for better ventilation in pediatric patients who often have respiratory causes of arrest.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Maconochie IK, et al. Pediatric Life Support: 2020 International Consensus on Cardiopulmonary Resuscitation'
    ],
    difficulty: 'easy',
    topicId: 'pals'
  },
  {
    id: 'pals-002',
    question: 'What is the initial defibrillation dose for pediatric patients according to PALS guidelines?',
    options: [
      '1 J/kg',
      '2 J/kg',
      '4 J/kg',
      '6 J/kg'
    ],
    correctIndex: 1,
    explanation: 'Initial pediatric defibrillation dose is 2 J/kg. Second and subsequent shocks are 4 J/kg, with maximum of adult dose (200J biphasic). Use pediatric pads/paddles for children <8 years or <25 kg.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Samson RA, et al. Use of automated external defibrillators for children: an update'
    ],
    difficulty: 'easy',
    topicId: 'pals'
  },
  {
    id: 'pals-003',
    question: 'A 2-year-old child (12 kg) is in cardiac arrest. What is the correct epinephrine dose?',
    options: [
      '0.12 mg (0.12 mL of 1:1000)',
      '1.2 mg (1.2 mL of 1:1000)',
      '0.12 mg (1.2 mL of 1:10,000)',
      '1.2 mg (12 mL of 1:10,000)'
    ],
    correctIndex: 2,
    explanation: 'Pediatric epinephrine dose is 0.01 mg/kg (0.1 mL/kg of 1:10,000). For 12 kg child: 0.12 mg = 1.2 mL of 1:10,000 solution. Give every 3-5 minutes during arrest. Maximum single dose is adult dose (1 mg).',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'de Caen AR, et al. Part 12: Pediatric Advanced Life Support: 2015 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-004',
    question: 'What is the correct chest compression depth for infant CPR?',
    options: [
      'At least 1 inch (2.5 cm)',
      'At least 1.5 inches (4 cm)',
      'At least 2 inches (5 cm)',
      'One-third the anterior-posterior diameter of chest'
    ],
    correctIndex: 3,
    explanation: 'Compress at least one-third the anterior-posterior diameter of the chest: approximately 1.5 inches (4 cm) in infants and 2 inches (5 cm) in children. Allow complete chest recoil between compressions.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Sutton RM, et al. Optimal chest compression depth during pediatric in-hospital cardiac arrest'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-005',
    question: 'A 6-month-old infant presents with bradycardia (heart rate 50 bpm) and poor perfusion despite adequate oxygenation and ventilation. What is the next step?',
    options: [
      'Atropine 0.02 mg/kg',
      'Chest compressions',
      'Transcutaneous pacing',
      'Epinephrine 0.01 mg/kg'
    ],
    correctIndex: 1,
    explanation: 'In infants, heart rate <60 bpm with poor perfusion despite adequate oxygenation/ventilation requires chest compressions. Unlike adults, atropine is not recommended for pediatric bradycardia. Consider epinephrine during compressions.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'de Caen AR, et al. Part 12: Pediatric Advanced Life Support: 2015 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-006',
    question: 'What is the initial fluid bolus for pediatric shock resuscitation?',
    options: [
      '10 mL/kg',
      '20 mL/kg',
      '30 mL/kg',
      '40 mL/kg'
    ],
    correctIndex: 1,
    explanation: 'Initial fluid bolus is 20 mL/kg of isotonic crystalloid (normal saline or lactated Ringer\'s) given over 5-20 minutes. Reassess after each bolus. In resource-limited settings or suspected cardiac dysfunction, consider 10 mL/kg boluses.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Davis AL, et al. American College of Critical Care Medicine clinical practice parameters for hemodynamic support of pediatric and neonatal septic shock'
    ],
    difficulty: 'easy',
    topicId: 'pals'
  },
  {
    id: 'pals-007',
    question: 'A 4-year-old child presents with supraventricular tachycardia (heart rate 220 bpm) and is hemodynamically stable. What is the first intervention?',
    options: [
      'Synchronized cardioversion 0.5 J/kg',
      'Adenosine 0.1 mg/kg IV rapid push',
      'Vagal maneuvers (ice to face)',
      'Amiodarone 5 mg/kg IV'
    ],
    correctIndex: 2,
    explanation: 'For stable pediatric SVT, attempt vagal maneuvers first. In infants/young children, apply ice water to face for 15-20 seconds. If unsuccessful, give adenosine 0.1 mg/kg (max 6 mg), then 0.2 mg/kg (max 12 mg).',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-008',
    question: 'What is the correct hand placement for chest compressions in an infant?',
    options: [
      'Two fingers on lower half of breastbone',
      'Heel of one hand on center of chest',
      'Two thumbs with hands encircling chest (two-rescuer)',
      'Both A and C are correct'
    ],
    correctIndex: 3,
    explanation: 'For infant compressions: single rescuer uses two fingers on lower half breastbone, just below nipple line. Two rescuers use two-thumb encircling hands technique, which is preferred as it provides better perfusion pressure.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Udassi JP, et al. Effect of alternative chest compression techniques in infant and child on rescuer ergonomics'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-009',
    question: 'A 3-year-old child is choking and cannot cough or speak. What is the appropriate intervention?',
    options: [
      '5 back blows followed by 5 chest thrusts',
      'Abdominal thrusts (Heimlich maneuver)',
      'Finger sweep',
      'Immediate intubation'
    ],
    correctIndex: 1,
    explanation: 'For choking children >1 year old, perform abdominal thrusts (Heimlich maneuver). For infants <1 year, use 5 back blows followed by 5 chest thrusts. Never perform blind finger sweeps.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Berg MD, et al. Part 13: Pediatric Basic Life Support: 2010 American Heart Association Guidelines'
    ],
    difficulty: 'easy',
    topicId: 'pals'
  },
  {
    id: 'pals-010',
    question: 'What is the target oxygen saturation for pediatric patients during resuscitation?',
    options: [
      '≥90%',
      '≥94%',
      '≥98%',
      '100%'
    ],
    correctIndex: 1,
    explanation: 'Target oxygen saturation ≥94% in pediatric patients. Avoid both hypoxemia and hyperoxemia. Once ROSC achieved, titrate FiO2 to maintain SpO2 94-99%. Use pulse oximetry and arterial blood gases to guide therapy.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Kilgannon JH, et al. Association between arterial hyperoxia following resuscitation from cardiac arrest and in-hospital mortality'
    ],
    difficulty: 'easy',
    topicId: 'pals'
  },
  {
    id: 'pals-011',
    question: 'A 5-year-old child (20 kg) presents with anaphylactic shock. What is the correct epinephrine dose and route?',
    options: [
      '0.2 mg (0.2 mL of 1:1000) intramuscular',
      '0.02 mg (0.02 mL of 1:1000) intramuscular',
      '0.2 mg (2 mL of 1:10,000) intravenous',
      '0.02 mg (0.2 mL of 1:10,000) intravenous'
    ],
    correctIndex: 0,
    explanation: 'For pediatric anaphylaxis, epinephrine dose is 0.01 mg/kg (max 0.5 mg) of 1:1000 solution intramuscularly. For 20 kg child: 0.2 mg IM. Autoinjectors: 0.15 mg for 15-30 kg, 0.3 mg for >30 kg.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Shaker MS, et al. Anaphylaxis-a 2020 practice parameter update, systematic review, and Grading of Recommendations'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-012',
    question: 'What is the most common initial rhythm in pediatric cardiac arrest?',
    options: [
      'Ventricular fibrillation',
      'Ventricular tachycardia',
      'Asystole',
      'Pulseless electrical activity'
    ],
    correctIndex: 2,
    explanation: 'Asystole and pulseless electrical activity (PEA) are the most common initial rhythms in pediatric cardiac arrest, unlike adults where VF/VT are more common. This reflects the respiratory etiology of most pediatric arrests.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Atkins DL, et al. Epidemiology and outcomes from out-of-hospital cardiac arrest in children'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-013',
    question: 'A 2-year-old child presents with severe respiratory distress, stridor, and drooling. What is the most appropriate initial management?',
    options: [
      'Immediate intubation',
      'Nebulized epinephrine',
      'Keep child calm, avoid agitation, prepare for airway management',
      'Corticosteroids'
    ],
    correctIndex: 2,
    explanation: 'Signs suggest epiglottitis or severe upper airway obstruction. Keep child calm in position of comfort, avoid agitation that could precipitate complete airway obstruction. Have experienced provider ready for emergency airway management.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Bjornson CL, et al. Croup in children'
    ],
    difficulty: 'hard',
    topicId: 'pals'
  },
  {
    id: 'pals-014',
    question: 'What is the amiodarone dose for pediatric cardiac arrest with persistent VF/pVT?',
    options: [
      '2.5 mg/kg IV',
      '5 mg/kg IV',
      '10 mg/kg IV',
      '15 mg/kg IV'
    ],
    correctIndex: 1,
    explanation: 'Amiodarone dose for pediatric cardiac arrest is 5 mg/kg IV rapid bolus for VF/pVT unresponsive to defibrillation. May repeat once. Alternative is lidocaine 1 mg/kg if amiodarone unavailable. Maximum dose is adult dose.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'de Caen AR, et al. Part 12: Pediatric Advanced Life Support: 2015 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-015',
    question: 'A 6-month-old infant has a heart rate of 220 bpm with poor perfusion. After failed vagal maneuvers, what is the next step?',
    options: [
      'Adenosine 0.1 mg/kg IV rapid push',
      'Synchronized cardioversion 0.5 J/kg',
      'Amiodarone 5 mg/kg IV',
      'Procainamide 15 mg/kg IV'
    ],
    correctIndex: 1,
    explanation: 'Unstable SVT with poor perfusion requires immediate synchronized cardioversion at 0.5 J/kg initially, then 1 J/kg if first shock ineffective. In stable patients, attempt adenosine after vagal maneuvers fail.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-016',
    question: 'What is the glucose dose for pediatric hypoglycemia?',
    options: [
      '0.5 g/kg (2 mL/kg D25)',
      '1 g/kg (4 mL/kg D25)',
      '2 g/kg (8 mL/kg D25)',
      '0.5 g/kg (5 mL/kg D10)'
    ],
    correctIndex: 0,
    explanation: 'Treat pediatric hypoglycemia with 0.5 g/kg glucose. Give as 2 mL/kg of D25, 5 mL/kg of D10, or 10 mL/kg of D5W depending on available concentration. Recheck glucose in 15 minutes and repeat if needed.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Wolfsdorf JI, et al. ISPAD Clinical Practice Consensus Guidelines 2018: Diabetic ketoacidosis and the hyperglycemic hyperosmolar state'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-017',
    question: 'During pediatric CPR with an advanced airway in place, what is the ventilation rate?',
    options: [
      '1 breath every 2-3 seconds (20-30 breaths/min)',
      '1 breath every 3-5 seconds (12-20 breaths/min)',
      '1 breath every 6 seconds (10 breaths/min)',
      '1 breath every 10 seconds (6 breaths/min)'
    ],
    correctIndex: 1,
    explanation: 'With advanced airway during pediatric CPR, provide 1 breath every 3-5 seconds (12-20 breaths/min) while continuing continuous chest compressions. Avoid hyperventilation which decreases venous return.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Aufderheide TP, et al. Hyperventilation-induced hypotension during cardiopulmonary resuscitation'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-018',
    question: 'A 4-year-old child presents with bradycardia (HR 40 bpm) and hypotension after drowning. What is the most likely cause?',
    options: [
      'Hypovolemia',
      'Hypoxia',
      'Hypothermia',
      'Hyperkalemia'
    ],
    correctIndex: 1,
    explanation: 'Drowning typically causes hypoxic bradycardia. Focus on airway management, oxygenation, and ventilation. Most pediatric cardiac arrests are secondary to respiratory failure, unlike adults where primary cardiac causes are more common.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Szpilman D, et al. Drowning'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-019',
    question: 'What is the target end-tidal CO2 (ETCO2) during pediatric CPR?',
    options: [
      '10-20 mmHg',
      '15-25 mmHg',
      '25-35 mmHg',
      '35-45 mmHg'
    ],
    correctIndex: 1,
    explanation: 'Target ETCO2 15-25 mmHg during pediatric CPR indicates adequate compression effectiveness and pulmonary blood flow. Sudden increase in ETCO2 may indicate return of spontaneous circulation (ROSC).',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Sutton RM, et al. Low-dose, high-frequency CPR training improves skill retention of in-hospital pediatric providers'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-020',
    question: 'A 1-year-old child (10 kg) is in septic shock with persistent hypotension after 60 mL/kg fluid resuscitation. What is the first-line vasopressor?',
    options: [
      'Dopamine 5-10 mcg/kg/min',
      'Epinephrine 0.1-1 mcg/kg/min',
      'Norepinephrine 0.1-2 mcg/kg/min',
      'Dobutamine 2-20 mcg/kg/min'
    ],
    correctIndex: 1,
    explanation: 'Epinephrine 0.1-1 mcg/kg/min is first-line vasopressor for pediatric septic shock, especially cold shock with poor perfusion. Dopamine may be used but can cause arrhythmias. Norepinephrine for warm shock.',
    references: [
      'Davis AL, et al. American College of Critical Care Medicine clinical practice parameters for hemodynamic support of pediatric and neonatal septic shock',
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'hard',
    topicId: 'pals'
  },
  {
    id: 'pals-021',
    question: 'What is the correct method for opening the airway in an unresponsive infant without suspected trauma?',
    options: [
      'Head tilt-chin lift',
      'Jaw thrust',
      'Slight head tilt-chin lift',
      'Hyperextension of neck'
    ],
    correctIndex: 2,
    explanation: 'Use slight head tilt-chin lift in infants to avoid hyperextension which can obstruct the airway due to their large occiput and relatively short neck. Avoid excessive extension that narrows the airway.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Berg MD, et al. Part 13: Pediatric Basic Life Support: 2010 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-022',
    question: 'A 3-year-old child has been receiving CPR for 10 minutes with no ROSC. What should be considered?',
    options: [
      'Terminate resuscitation',
      'Continue standard CPR',
      'Consider ECPR if available',
      'Double the medication doses'
    ],
    correctIndex: 2,
    explanation: 'For refractory pediatric cardiac arrest, consider extracorporeal CPR (ECPR) if available and appropriate. Children may have better neurologic outcomes than adults with prolonged resuscitation, especially if hypothermic or drowning.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Holmberg MJ, et al. Extracorporeal cardiopulmonary resuscitation for cardiac arrest: A systematic review'
    ],
    difficulty: 'hard',
    topicId: 'pals'
  },
  {
    id: 'pals-023',
    question: 'What is the naloxone dose for pediatric opioid overdose?',
    options: [
      '0.01 mg/kg IV',
      '0.1 mg/kg IV',
      '1 mg/kg IV',
      '2 mg total dose regardless of weight'
    ],
    correctIndex: 1,
    explanation: 'Naloxone dose for pediatric opioid overdose is 0.1 mg/kg IV (maximum 2 mg). If no IV access, give 2 mg intranasal or intramuscular regardless of weight. May need repeated doses for long-acting opioids.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Boyer EW. Management of opioid analgesic overdose'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-024',
    question: 'A 2-month-old infant presents with poor feeding, lethargy, and heart rate 250 bpm. What is the most likely diagnosis?',
    options: [
      'Sepsis',
      'Congenital heart disease',
      'Supraventricular tachycardia',
      'Hypoglycemia'
    ],
    correctIndex: 2,
    explanation: 'Heart rate >220 bpm in infants suggests SVT, especially with poor feeding and lethargy indicating poor perfusion. Sinus tachycardia rarely exceeds 220 bpm in infants. Consider vagal maneuvers if stable.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-025',
    question: 'What is the calcium chloride dose for pediatric hyperkalemia or calcium channel blocker overdose?',
    options: [
      '10 mg/kg IV',
      '20 mg/kg IV',
      '50 mg/kg IV',
      '100 mg/kg IV'
    ],
    correctIndex: 1,
    explanation: 'Calcium chloride dose is 20 mg/kg IV (0.2 mL/kg of 10% solution) for pediatric hyperkalemia, hypocalcemia, or calcium channel blocker overdose. Give slowly over 5-10 minutes. Monitor for bradycardia during administration.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Hoffman RS, et al. Goldfrank\'s Toxicologic Emergencies'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-026',
    question: 'A 5-year-old child achieves ROSC after drowning but remains comatose. What is the target temperature?',
    options: [
      '32-34°C',
      '36°C',
      '32-36°C',
      'Normothermia only'
    ],
    correctIndex: 3,
    explanation: 'Current pediatric guidelines recommend maintaining normothermia rather than induced hypothermia post-cardiac arrest. Actively prevent and treat fever, but targeted temperature management below normal is not routinely recommended in children.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Moler FW, et al. Therapeutic hypothermia after out-of-hospital cardiac arrest in children'
    ],
    difficulty: 'hard',
    topicId: 'pals'
  },
  {
    id: 'pals-027',
    question: 'What is the magnesium sulfate dose for pediatric torsades de pointes?',
    options: [
      '10 mg/kg IV',
      '25-50 mg/kg IV',
      '100 mg/kg IV',
      '2 g total dose regardless of weight'
    ],
    correctIndex: 1,
    explanation: 'Magnesium sulfate dose for pediatric torsades de pointes is 25-50 mg/kg IV (maximum 2 g) given over 10-20 minutes. Effective even with normal serum magnesium levels. Monitor for hypotension and respiratory depression.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-028',
    question: 'A newborn does not respond to initial resuscitation steps. Heart rate is 50 bpm. What is the next action?',
    options: [
      'Continue positive pressure ventilation',
      'Begin chest compressions',
      'Give epinephrine',
      'Intubate immediately'
    ],
    correctIndex: 1,
    explanation: 'In neonatal resuscitation, heart rate <60 bpm despite adequate ventilation for 30 seconds indicates need for chest compressions. Use 3:1 compression-to-ventilation ratio. Most neonatal arrests respond to effective ventilation.',
    references: [
      'Aziz K, et al. Part 5: Neonatal Resuscitation: 2020 American Heart Association Guidelines',
      'Weiner GM, et al. Part 17: Neonatal Resuscitation: 2015 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  },
  {
    id: 'pals-029',
    question: 'What is the atropine dose for pediatric organophosphate poisoning?',
    options: [
      '0.02 mg/kg IV',
      '0.05 mg/kg IV',
      '0.1 mg/kg IV',
      '2 mg total dose regardless of weight'
    ],
    correctIndex: 1,
    explanation: 'Atropine dose for pediatric organophosphate poisoning is 0.05 mg/kg IV (minimum 0.1 mg, maximum 3 mg initial dose). Repeat every 5-10 minutes until secretions controlled. Large cumulative doses may be needed.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Eddleston M, et al. Management of acute organophosphorus pesticide poisoning'
    ],
    difficulty: 'hard',
    topicId: 'pals'
  },
  {
    id: 'pals-030',
    question: 'A 6-year-old child is found unresponsive after possible ingestion. Pupils are pinpoint and respiratory rate is 6/min. What is the most appropriate initial treatment?',
    options: [
      'Naloxone 0.1 mg/kg IV',
      'Flumazenil 0.01 mg/kg IV',
      'Bag-mask ventilation and naloxone',
      'Immediate intubation'
    ],
    correctIndex: 2,
    explanation: 'Signs suggest opioid overdose (pinpoint pupils, respiratory depression). Prioritize airway and breathing with bag-mask ventilation, then give naloxone 0.1 mg/kg IV. Support ventilation as naloxone may wear off before opioid effect ends.',
    references: [
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Boyer EW. Management of opioid analgesic overdose'
    ],
    difficulty: 'medium',
    topicId: 'pals'
  }
];