import { Question } from './types';

export const airwayManagementQuestions: Question[] = [
  {
    id: 'airway-001',
    question: 'What is the most appropriate initial intervention for a patient presenting with complete airway obstruction due to foreign body aspiration?',
    options: [
      'Immediate cricothyrotomy',
      'Back blows and chest thrusts (Heimlich maneuver)',
      'Bag-mask ventilation with high flow oxygen',
      'Direct laryngoscopy and Magill forceps'
    ],
    correctIndex: 1,
    explanation: 'For complete airway obstruction due to foreign body, the initial intervention should be back blows and chest thrusts (Heimlich maneuver). This non-invasive approach may dislodge the foreign body. Cricothyrotomy is reserved for when other methods fail. Bag-mask ventilation would be ineffective with complete obstruction.',
    references: [
      'American Heart Association Guidelines for CPR and ECC 2020',
      'European Resuscitation Council Guidelines 2021'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-002',
    question: 'Which anatomical landmark is most reliable for identifying the cricothyroid membrane in an emergency cricothyrotomy?',
    options: [
      'Thyroid notch',
      'Cricoid cartilage',
      'Thyroid cartilage prominence (Adam\'s apple)',
      'Suprasternal notch'
    ],
    correctIndex: 2,
    explanation: 'The thyroid cartilage prominence (Adam\'s apple) is the most reliable landmark. The cricothyroid membrane lies between the thyroid cartilage above and the cricoid cartilage below. Palpating the thyroid prominence first helps locate the cricothyroid membrane just below it.',
    references: [
      'Walls RM, Brown CA. Emergency Airway Management 5th ed',
      'Cook TM, et al. NAP4 Report 2011'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-003',
    question: 'In rapid sequence intubation (RSI), what is the primary purpose of preoxygenation?',
    options: [
      'To increase functional residual capacity',
      'To replace nitrogen with oxygen in the lungs',
      'To reduce the risk of aspiration',
      'To improve visualization during laryngoscopy'
    ],
    correctIndex: 1,
    explanation: 'Preoxygenation aims to replace nitrogen with oxygen in the functional residual capacity, creating an oxygen reservoir that extends safe apnea time during intubation. This is achieved by breathing 100% oxygen for 3-5 minutes or 8 vital capacity breaths.',
    references: [
      'Weingart SD, et al. Ann Emerg Med 2012',
      'Tanoubi I, et al. Can J Anaesth 2009'
    ],
    difficulty: 'easy',
    topicId: 'airway-management'
  },
  {
    id: 'airway-004',
    question: 'Which video laryngoscope blade design is most effective for patients with limited mouth opening?',
    options: [
      'Hyperangulated blade (>60 degrees)',
      'Standard geometry blade (similar to Macintosh)',
      'Straight blade',
      'Channeled blade'
    ],
    correctIndex: 0,
    explanation: 'Hyperangulated blades (>60 degrees) like the GlideScope Cobalt or C-MAC D-blade are specifically designed for difficult airways including limited mouth opening. The increased angle allows visualization without requiring extensive mouth opening.',
    references: [
      'Aziz MF, et al. Anesthesiology 2016',
      'Frerk C, et al. Br J Anaesth 2015 (DAS Guidelines)'
    ],
    difficulty: 'hard',
    topicId: 'airway-management'
  },
  {
    id: 'airway-005',
    question: 'What is the recommended depth of endotracheal tube insertion for an average adult male?',
    options: [
      '19-21 cm at the teeth',
      '21-23 cm at the teeth',
      '23-25 cm at the teeth',
      '25-27 cm at the teeth'
    ],
    correctIndex: 1,
    explanation: 'For an average adult male, the ETT should be inserted 21-23 cm at the teeth (or lips). For females, it\'s typically 19-21 cm. The formula: (height in cm/10) + 5 can also be used. Proper depth prevents endobronchial intubation or inadequate placement.',
    references: [
      'Cherng CH, et al. Acta Anaesthesiol Scand 2002',
      'Reed MJ, et al. Emerg Med J 2005'
    ],
    difficulty: 'easy',
    topicId: 'airway-management'
  },
  {
    id: 'airway-006',
    question: 'Which neuromuscular blocking agent is preferred for RSI in a patient with suspected hyperkalemia?',
    options: [
      'Succinylcholine',
      'Rocuronium',
      'Vecuronium',
      'Atracurium'
    ],
    correctIndex: 1,
    explanation: 'Rocuronium is preferred in hyperkalemia as succinylcholine can cause a further 0.5-1.0 mEq/L increase in serum potassium. Rocuronium provides rapid onset (60-90 seconds) and can be reversed with sugammadex if needed.',
    references: [
      'Martyn JA, et al. Anesthesiology 2006',
      'Marsch SC, et al. Anesth Analg 1992'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-007',
    question: 'What is the most common cause of failed bag-mask ventilation?',
    options: [
      'Inadequate mask seal',
      'Airway obstruction',
      'Equipment malfunction',
      'Inadequate tidal volume'
    ],
    correctIndex: 0,
    explanation: 'Inadequate mask seal is the most common cause of failed bag-mask ventilation. This can be addressed by two-person technique, proper mask sizing, and optimal head positioning. The "E-C" grip technique helps maintain proper seal.',
    references: [
      'Kheterpal S, et al. Anesthesiology 2009',
      'Han R, et al. Anesthesiology 2004'
    ],
    difficulty: 'easy',
    topicId: 'airway-management'
  },
  {
    id: 'airway-008',
    question: 'Which supraglottic airway device has the highest first-pass success rate in emergency medicine?',
    options: [
      'Laryngeal Mask Airway (LMA) Classic',
      'i-gel',
      'King LT-D',
      'Combitube'
    ],
    correctIndex: 1,
    explanation: 'The i-gel has demonstrated the highest first-pass success rates in emergency medicine studies, with success rates >95%. Its thermoplastic design conforms to airway anatomy without requiring inflation, making insertion easier.',
    references: [
      'Duckett J, et al. Emerg Med J 2013',
      'Gatward JJ, et al. Resuscitation 2008'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-009',
    question: 'What is the recommended approach when three attempts at endotracheal intubation have failed?',
    options: [
      'Attempt a fourth intubation with a different blade',
      'Proceed immediately to surgical airway',
      'Insert a supraglottic airway and reassess',
      'Continue bag-mask ventilation indefinitely'
    ],
    correctIndex: 2,
    explanation: 'After three failed intubation attempts, insert a supraglottic airway and reassess the situation. This follows the "failed airway" algorithm. Surgical airway is considered if oxygenation cannot be maintained with supraglottic devices.',
    references: [
      'Frerk C, et al. Br J Anaesth 2015 (DAS Guidelines)',
      'Apfelbaum JL, et al. Anesthesiology 2013 (ASA Guidelines)'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-010',
    question: 'Which clinical finding is most predictive of difficult bag-mask ventilation?',
    options: [
      'Mallampati class IV',
      'BMI >35 kg/m²',
      'Age >65 years',
      'Presence of beard'
    ],
    correctIndex: 1,
    explanation: 'BMI >35 kg/m² is the strongest predictor of difficult bag-mask ventilation. The mnemonic MOANS (Mask seal problems, Obesity, Age >55, No teeth, Stiff lungs/Snoring) helps identify risk factors.',
    references: [
      'Kheterpal S, et al. Anesthesiology 2009',
      'Yildiz TS, et al. Anesth Analg 2005'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-011',
    question: 'What is the optimal PEEP setting immediately after intubation of a patient with ARDS?',
    options: [
      '0 cmH2O',
      '5 cmH2O',
      '10 cmH2O',
      '15 cmH2O'
    ],
    correctIndex: 2,
    explanation: 'For ARDS patients, initial PEEP of 10 cmH2O is recommended to prevent alveolar collapse and maintain oxygenation. This should be titrated based on oxygenation response and hemodynamic tolerance according to ARDSNet protocols.',
    references: [
      'ARDSNet. N Engl J Med 2000',
      'Briel M, et al. JAMA 2010'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-012',
    question: 'Which induction agent is most appropriate for RSI in a hemodynamically unstable patient?',
    options: [
      'Propofol',
      'Etomidate',
      'Ketamine',
      'Midazolam'
    ],
    correctIndex: 2,
    explanation: 'Ketamine is preferred for hemodynamically unstable patients as it maintains sympathetic tone and cardiovascular stability. Etomidate, while hemodynamically neutral, can cause adrenal suppression. Propofol causes significant hypotension.',
    references: [
      'Jabre P, et al. Lancet 2009',
      'Morris C, et al. Emerg Med J 2008'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-013',
    question: 'What is the maximum recommended duration for a single intubation attempt?',
    options: [
      '15 seconds',
      '30 seconds',
      '45 seconds',
      '60 seconds'
    ],
    correctIndex: 1,
    explanation: 'Each intubation attempt should be limited to 30 seconds to prevent hypoxemia. If unsuccessful, return to bag-mask ventilation before the next attempt. This is part of safe intubation practices.',
    references: [
      'Walls RM, Brown CA. Emergency Airway Management 5th ed',
      'Cook TM, et al. Br J Anaesth 2011'
    ],
    difficulty: 'easy',
    topicId: 'airway-management'
  },
  {
    id: 'airway-014',
    question: 'Which position provides the best intubating conditions for morbidly obese patients?',
    options: [
      'Supine with head extension',
      'Trendelenburg position',
      'Reverse Trendelenburg with ramping',
      'Left lateral decubitus'
    ],
    correctIndex: 2,
    explanation: 'Reverse Trendelenburg (25-30°) with ramping (elevating head and shoulders to align ear-to-sternal notch) optimizes intubating conditions in obese patients by improving functional residual capacity and laryngeal visualization.',
    references: [
      'Collins JS, et al. Anesth Analg 2004',
      'Rao SL, et al. Anesth Analg 2008'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-015',
    question: 'What is the recommended technique for confirming endotracheal tube placement in cardiac arrest?',
    options: [
      'Auscultation alone',
      'Capnography (ETCO2) waveform',
      'Chest X-ray',
      'Direct visualization only'
    ],
    correctIndex: 1,
    explanation: 'Capnography with waveform is the gold standard for ETT confirmation, even in cardiac arrest. It provides real-time confirmation and ongoing monitoring. In cardiac arrest, ETCO2 values may be low but waveform presence confirms tracheal placement.',
    references: [
      'American Heart Association Guidelines 2020',
      'Silvestri S, et al. Acad Emerg Med 2005'
    ],
    difficulty: 'easy',
    topicId: 'airway-management'
  },
  {
    id: 'airway-016',
    question: 'Which medication should be avoided in RSI for patients with increased intracranial pressure?',
    options: [
      'Etomidate',
      'Propofol',
      'Ketamine',
      'Thiopental'
    ],
    correctIndex: 2,
    explanation: 'Traditionally, ketamine was avoided in increased ICP due to concerns about raising intracranial pressure. However, recent evidence suggests this may not be clinically significant, especially when used with controlled ventilation. Propofol and etomidate are preferred.',
    references: [
      'Zeiler FA, et al. J Neurosurg Anesthesiol 2014',
      'Hudetz JA, et al. Anesth Analg 2015'
    ],
    difficulty: 'hard',
    topicId: 'airway-management'
  },
  {
    id: 'airway-017',
    question: 'What is the preferred method for oxygenation during apneic periods in RSI?',
    options: [
      'Passive oxygenation via nasal cannula',
      'Apneic oxygenation with high-flow nasal cannula',
      'Intermittent bag-mask ventilation',
      'No additional oxygenation needed'
    ],
    correctIndex: 1,
    explanation: 'Apneic oxygenation with high-flow nasal cannula (15L/min) extends safe apnea time by delivering oxygen to the alveoli via mass flow. This technique can extend safe apnea time significantly, especially in preoxygenated patients.',
    references: [
      'Weingart SD, et al. Ann Emerg Med 2012',
      'Patel A, et al. Anaesthesia 2015'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-018',
    question: 'Which anatomical variation makes intubation most difficult?',
    options: [
      'Micrognathia',
      'Macroglossia',
      'Short thyromental distance (<6 cm)',
      'Limited cervical spine mobility'
    ],
    correctIndex: 2,
    explanation: 'Short thyromental distance (<6 cm or <3 finger breadths) is the strongest predictor of difficult intubation as it indicates limited space for tongue displacement during laryngoscopy. This is part of the LEMON assessment.',
    references: [
      'Reed MJ, et al. J Emerg Med 2005',
      'Walls RM, et al. Ann Emerg Med 2002'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-019',
    question: 'What is the most appropriate initial ventilator settings for a newly intubated COPD patient?',
    options: [
      'VT 8 ml/kg, RR 20, PEEP 10',
      'VT 6 ml/kg, RR 12, PEEP 0',
      'VT 10 ml/kg, RR 16, PEEP 5',
      'VT 6 ml/kg, RR 16, PEEP 5'
    ],
    correctIndex: 1,
    explanation: 'COPD patients should receive low tidal volume (6 ml/kg IBW), low respiratory rate (10-12), and minimal PEEP (0-5) to prevent auto-PEEP and allow adequate expiration time. Permissive hypercapnia may be necessary.',
    references: [
      'Brochard L, et al. Am J Respir Crit Care Med 1995',
      'Tuxen DV, et al. Am Rev Respir Dis 1987'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-020',
    question: 'Which bougie technique is most effective for difficult intubation?',
    options: [
      'Insert bougie under direct vision',
      'Blind insertion with tactile feedback',
      'Insert bougie through ETT first',
      'Use bougie as a stylet'
    ],
    correctIndex: 1,
    explanation: 'Blind insertion with tactile feedback is most effective. The bougie is advanced feeling for tracheal clicks (cartilage rings) and hold-up at the bronchus. This technique succeeds even when vocal cords are not visualized.',
    references: [
      'Kidd JF, et al. Anaesthesia 1988',
      'Nolan JP, et al. Anaesthesia 1993'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-021',
    question: 'What is the recommended approach for intubation of a patient with suspected cervical spine injury?',
    options: [
      'Immediate surgical airway',
      'Direct laryngoscopy with manual in-line stabilization',
      'Video laryngoscopy with manual in-line stabilization',
      'Awake fiberoptic intubation'
    ],
    correctIndex: 2,
    explanation: 'Video laryngoscopy with manual in-line stabilization is preferred for suspected C-spine injury. It provides better visualization with less cervical movement than direct laryngoscopy. Awake fiberoptic may be considered if time permits.',
    references: [
      'Crosby ET, et al. Can J Anaesth 2006',
      'Aziz MF, et al. Anesthesiology 2012'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-022',
    question: 'Which complication is most common after emergency cricothyrotomy?',
    options: [
      'Bleeding',
      'Subglottic stenosis',
      'Pneumothorax',
      'Esophageal perforation'
    ],
    correctIndex: 1,
    explanation: 'Subglottic stenosis is the most common long-term complication of cricothyrotomy, occurring in 10-50% of patients. Early conversion to tracheostomy (within 24-48 hours) may reduce this risk.',
    references: [
      'Hubble MW, et al. Prehosp Emerg Care 2010',
      'Gillespie MB, et al. Ann Otol Rhinol Laryngol 2003'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-023',
    question: 'What is the most appropriate management for a "cannot intubate, cannot oxygenate" scenario?',
    options: [
      'Continue intubation attempts',
      'Insert supraglottic airway',
      'Immediate surgical airway',
      'Bag-mask ventilation with two providers'
    ],
    correctIndex: 2,
    explanation: 'True "cannot intubate, cannot oxygenate" (CICO) requires immediate surgical airway. This is a rare but life-threatening emergency. Cricothyrotomy should be performed without delay as hypoxic brain injury occurs within 3-4 minutes.',
    references: [
      'Frerk C, et al. Br J Anaesth 2015 (DAS Guidelines)',
      'Peterson GN, et al. Anesthesiology 2005'
    ],
    difficulty: 'hard',
    topicId: 'airway-management'
  },
  {
    id: 'airway-024',
    question: 'Which method provides the most reliable assessment of preoxygenation adequacy?',
    options: [
      'Time-based (3 minutes of 100% O2)',
      'Breath-based (8 vital capacity breaths)',
      'End-tidal oxygen >90%',
      'Pulse oximetry >98%'
    ],
    correctIndex: 2,
    explanation: 'End-tidal oxygen >90% (ideally >95%) provides the most reliable assessment of preoxygenation adequacy. This ensures nitrogen washout and maximizes oxygen reserve. Time and breath-based methods are estimates.',
    references: [
      'Nimmagadda U, et al. Anesthesiology 2001',
      'Baraka AS, et al. Anesth Analg 1999'
    ],
    difficulty: 'hard',
    topicId: 'airway-management'
  },
  {
    id: 'airway-025',
    question: 'What is the primary indication for awake intubation?',
    options: [
      'Predicted difficult intubation in elective surgery',
      'Unstable cervical spine with difficult airway',
      'Patient refusal of general anesthesia',
      'Lack of monitoring equipment'
    ],
    correctIndex: 1,
    explanation: 'Unstable cervical spine combined with predicted difficult airway is the primary indication for awake intubation. This maintains airway reflexes and allows neurological assessment while securing the airway safely.',
    references: [
      'Apfelbaum JL, et al. Anesthesiology 2013',
      'Law JA, et al. Can J Anaesth 2013'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-026',
    question: 'Which factor most increases the risk of aspiration during RSI?',
    options: [
      'Full stomach',
      'Pregnancy',
      'Diabetes mellitus',
      'Recent trauma'
    ],
    correctIndex: 0,
    explanation: 'Full stomach (within 8 hours of eating) poses the highest aspiration risk. This includes recent food intake, bowel obstruction, or gastroparesis. Rapid sequence intubation with cricoid pressure (though controversial) aims to prevent aspiration.',
    references: [
      'Warner MA, et al. Anesthesiology 1993',
      'Engelhardt T, et al. Br J Anaesth 2001'
    ],
    difficulty: 'easy',
    topicId: 'airway-management'
  },
  {
    id: 'airway-027',
    question: 'What is the recommended size of endotracheal tube for an average adult female?',
    options: [
      '6.0 mm',
      '7.0 mm',
      '7.5 mm',
      '8.0 mm'
    ],
    correctIndex: 2,
    explanation: 'For an average adult female, a 7.5 mm ETT is recommended. For males, 8.0-8.5 mm is typical. The formula (age + 16)/4 for women and (age + 16)/4 + 0.5 for men can also be used. Have multiple sizes available.',
    references: [
      'Cherng CH, et al. Acta Anaesthesiol Scand 2002',
      'Bould MD, et al. Anaesthesia 2007'
    ],
    difficulty: 'easy',
    topicId: 'airway-management'
  },
  {
    id: 'airway-028',
    question: 'Which ventilator mode is most appropriate immediately after emergency intubation?',
    options: [
      'Assist Control (AC)',
      'Synchronized Intermittent Mandatory Ventilation (SIMV)',
      'Pressure Support Ventilation (PSV)',
      'Continuous Positive Airway Pressure (CPAP)'
    ],
    correctIndex: 0,
    explanation: 'Assist Control (AC) mode is most appropriate initially as it ensures adequate minute ventilation regardless of patient effort. It provides full ventilatory support while the patient is stabilized and assessed.',
    references: [
      'Tobin MJ. Am J Respir Crit Care Med 2001',
      'MacIntyre NR, et al. Chest 2001'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-029',
    question: 'What is the most common cause of unsuccessful supraglottic airway insertion?',
    options: [
      'Wrong size selection',
      'Inadequate lubrication',
      'Incomplete insertion',
      'Overinflation of cuff'
    ],
    correctIndex: 2,
    explanation: 'Incomplete insertion is the most common cause of unsuccessful supraglottic airway placement. The device should be inserted until resistance is met and the cuff sits in the hypopharynx. Partial insertion leads to poor seal and ventilation.',
    references: [
      'Cook TM, et al. Br J Anaesth 2003',
      'Keller C, et al. Anesth Analg 1999'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  },
  {
    id: 'airway-030',
    question: 'Which clinical scenario represents the highest priority for immediate intubation?',
    options: [
      'Respiratory rate of 30 with accessory muscle use',
      'SpO2 88% on 15L nonrebreather mask',
      'Inability to speak in full sentences',
      'Altered mental status with loss of protective reflexes'
    ],
    correctIndex: 3,
    explanation: 'Altered mental status with loss of protective airway reflexes represents the highest priority for immediate intubation due to aspiration risk and inability to maintain airway patency. This is a "crash" intubation indication.',
    references: [
      'Walls RM, Brown CA. Emergency Airway Management 5th ed',
      'Reed MJ, et al. Emerg Med J 2005'
    ],
    difficulty: 'medium',
    topicId: 'airway-management'
  }
];