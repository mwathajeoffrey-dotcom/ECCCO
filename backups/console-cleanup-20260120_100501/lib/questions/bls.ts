import { Question } from './types';

export const blsQuestions: Question[] = [
  {
    id: 'bls-001',
    question: 'According to 2025 AHA BLS guidelines, what is the correct compression-to-ventilation ratio for adult CPR with one rescuer?',
    options: [
      '15:2',
      '30:2',
      '15:1',
      '30:1'
    ],
    correctIndex: 1,
    explanation: 'The compression-to-ventilation ratio for adult CPR is 30:2 for both one and two rescuers. This ratio optimizes circulation while providing adequate ventilation. The 2025 guidelines continue to emphasize minimizing interruptions between compressions and maintaining high-quality CPR.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines for Cardiopulmonary Resuscitation',
      'Berg KM, et al. Adult Basic Life Support: 2025 American Heart Association Guidelines'
    ],
    difficulty: 'easy',
    topicId: 'bls',
    guidelineVersion: {
      name: "AHA Guidelines for CPR and ECC",
      year: 2025,
      organization: "American Heart Association",
      lastUpdated: new Date('2025-11-03')
    }
  },
  {
    id: 'bls-002',
    question: 'What is the correct hand placement for chest compressions in adult CPR?',
    options: [
      'Center of chest, between nipples, on lower half of breastbone',
      'Center of chest, just above xiphoid process',
      'Left side of chest, over apex of heart',
      'Upper third of breastbone'
    ],
    correctIndex: 0,
    explanation: 'Place the heel of one hand on the center of the chest between the nipples on the lower half of the breastbone. Place the other hand on top, interlocking fingers. This position ensures effective compressions over the heart.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Kleinman ME, et al. Part 5: Adult Basic Life Support and Cardiopulmonary Resuscitation Quality'
    ],
    difficulty: 'easy',
    topicId: 'bls'
  },
  {
    id: 'bls-003',
    question: 'An adult victim is unresponsive and not breathing normally. After calling 911 and getting an AED, what is the next step?',
    options: [
      'Check for pulse for 10 seconds',
      'Give 2 rescue breaths',
      'Start chest compressions immediately',
      'Apply AED pads'
    ],
    correctIndex: 0,
    explanation: 'Healthcare providers should check for pulse for no more than 10 seconds. If no pulse or unsure, begin CPR with chest compressions. Lay rescuers skip pulse check and begin CPR if victim is unresponsive and not breathing normally.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2025 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-004',
    question: 'During adult CPR, what is the recommended compression depth?',
    options: [
      'At least 2 inches (5 cm)',
      'At least 2.4 inches (6 cm)',
      '1.5-2 inches (4-5 cm)',
      'No more than 2 inches (5 cm)'
    ],
    correctIndex: 1,
    explanation: 'Chest compressions should be at least 2.4 inches (6 cm) deep in adults. Avoid excessive depth (>2.4 inches or 6 cm) as it may cause injury. Allow complete chest recoil between compressions.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Hellevuo H, et al. Deeper chest compression - more complications for cardiac arrest patients?'
    ],
    difficulty: 'easy',
    topicId: 'bls'
  },
  {
    id: 'bls-005',
    question: 'What is the recommended compression rate during CPR?',
    options: [
      '80-100 compressions per minute',
      '100-120 compressions per minute',
      '120-140 compressions per minute',
      'At least 100 compressions per minute'
    ],
    correctIndex: 1,
    explanation: 'Compression rate should be 100-120 per minute. Rates above 120/min are associated with decreased compression depth and increased rescuer fatigue. Rates below 100/min provide inadequate perfusion.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Idris AH, et al. Relationship between chest compression rates and outcomes from cardiac arrest'
    ],
    difficulty: 'easy',
    topicId: 'bls'
  },
  {
    id: 'bls-006',
    question: 'A victim is choking and can still cough and speak. What is the appropriate response?',
    options: [
      'Perform abdominal thrusts immediately',
      'Encourage continued coughing and stay with victim',
      'Perform back blows',
      'Call 911 but do not intervene'
    ],
    correctIndex: 1,
    explanation: 'If the victim can cough and speak, the airway is not completely obstructed. Encourage continued coughing as it is the most effective way to relieve a partial obstruction. Stay with the victim in case condition worsens.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Kleinman ME, et al. Part 5: Adult Basic Life Support and Cardiopulmonary Resuscitation Quality'
    ],
    difficulty: 'easy',
    topicId: 'bls'
  },
  {
    id: 'bls-007',
    question: 'An adult victim is choking and cannot speak or cough. What is the first intervention?',
    options: [
      'Back blows',
      'Abdominal thrusts (Heimlich maneuver)',
      'Chest compressions',
      'Finger sweep'
    ],
    correctIndex: 1,
    explanation: 'For conscious choking adult with severe airway obstruction, perform abdominal thrusts (Heimlich maneuver). Stand behind victim, place hands just above navel, and thrust inward and upward until object dislodges or victim becomes unconscious.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Kleinman ME, et al. Part 5: Adult Basic Life Support and Cardiopulmonary Resuscitation Quality'
    ],
    difficulty: 'easy',
    topicId: 'bls'
  },
  {
    id: 'bls-008',
    question: 'During CPR, how often should rescuers switch to prevent fatigue?',
    options: [
      'Every minute',
      'Every 2 minutes',
      'Every 5 minutes',
      'Only when exhausted'
    ],
    correctIndex: 1,
    explanation: 'Rescuers should switch every 2 minutes to prevent fatigue and maintain compression quality. The switch should take less than 5 seconds. Fatigue develops quickly and significantly reduces compression effectiveness.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Ochoa FJ, et al. The effect of rescuer fatigue on the quality of chest compressions'
    ],
    difficulty: 'easy',
    topicId: 'bls'
  },
  {
    id: 'bls-009',
    question: 'When using an AED, when should CPR be resumed after delivering a shock?',
    options: [
      'After checking pulse',
      'After analyzing rhythm',
      'Immediately after shock delivery',
      'After 30 seconds'
    ],
    correctIndex: 2,
    explanation: 'Resume CPR immediately after shock delivery without checking pulse or rhythm. Most victims remain in a shockable rhythm after the first shock, and immediate CPR helps maintain circulation until the next rhythm analysis.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Link MS, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2015 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-010',
    question: 'What is the maximum time that should be taken to check for a pulse in an unresponsive victim?',
    options: [
      '5 seconds',
      '10 seconds',
      '15 seconds',
      '20 seconds'
    ],
    correctIndex: 1,
    explanation: 'Healthcare providers should check for pulse for no more than 10 seconds. If no pulse is felt or if unsure, begin CPR immediately. Longer pulse checks delay critical chest compressions.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Tibballs J, et al. Reliability of pulse palpation by healthcare personnel to diagnose paediatric cardiac arrest'
    ],
    difficulty: 'easy',
    topicId: 'bls'
  },
  {
    id: 'bls-011',
    question: 'A pregnant woman in her third trimester is in cardiac arrest. What modification should be made to CPR?',
    options: [
      'Compressions should be higher on the chest',
      'Manual left uterine displacement',
      'Deeper compressions',
      'No modifications needed'
    ],
    correctIndex: 1,
    explanation: 'For pregnant women >20 weeks gestation, provide manual left uterine displacement during CPR to relieve aortocaval compression by the gravid uterus. This improves venous return and cardiac output during compressions.',
    references: [
      'Jeejeebhoy FM, et al. Cardiac Arrest in Pregnancy: A Scientific Statement From the American Heart Association',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-012',
    question: 'When giving rescue breaths during CPR, each breath should be given over what duration?',
    options: [
      '0.5 seconds',
      '1 second',
      '2 seconds',
      '3 seconds'
    ],
    correctIndex: 1,
    explanation: 'Each rescue breath should be given over 1 second and provide visible chest rise. Avoid excessive ventilation which can increase intrathoracic pressure, decrease venous return, and reduce coronary perfusion.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Aufderheide TP, et al. Hyperventilation-induced hypotension during cardiopulmonary resuscitation'
    ],
    difficulty: 'easy',
    topicId: 'bls'
  },
  {
    id: 'bls-013',
    question: 'An AED analyzes the rhythm and advises "No shock advised." What should be done next?',
    options: [
      'Check pulse',
      'Resume CPR immediately',
      'Reanalyze rhythm',
      'Give rescue breaths only'
    ],
    correctIndex: 1,
    explanation: 'When AED advises "no shock," immediately resume CPR starting with chest compressions. The victim likely has asystole, PEA, or organized rhythm without pulse. Continue CPR until AED prompts next analysis (usually 2 minutes).',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Link MS, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2015 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-014',
    question: 'What is the first step in the adult Chain of Survival for out-of-hospital cardiac arrest?',
    options: [
      'Early CPR',
      'Recognition and activation of emergency response',
      'Early defibrillation',
      'Advanced life support'
    ],
    correctIndex: 1,
    explanation: 'The first link is recognition of cardiac arrest and activation of the emergency response system (calling 911). This ensures rapid deployment of EMS and gets additional help to the scene quickly.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Merchant RM, et al. Part 1: Executive Summary: 2025 American Heart Association Guidelines for Cardiopulmonary Resuscitation'
    ],
    difficulty: 'easy',
    topicId: 'bls'
  },
  {
    id: 'bls-015',
    question: 'A 2-year-old child is choking and cannot cough or make sounds. What is the appropriate intervention?',
    options: [
      'Abdominal thrusts',
      '5 back blows followed by 5 chest thrusts',
      'Finger sweep',
      'Hold upside down and shake'
    ],
    correctIndex: 1,
    explanation: 'For choking infant/child under 1 year, give 5 back blows followed by 5 chest thrusts. Repeat until object dislodges or child becomes unconscious. Avoid abdominal thrusts in infants due to risk of internal injury.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Atkins DL, et al. Part 11: Pediatric Basic Life Support and Cardiopulmonary Resuscitation Quality'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-016',
    question: 'During two-rescuer CPR, what is the recommended compression-to-ventilation ratio for adults?',
    options: [
      '15:2',
      '30:2',
      '5:1',
      '15:1'
    ],
    correctIndex: 1,
    explanation: 'The compression-to-ventilation ratio remains 30:2 for adults regardless of the number of rescuers. With two rescuers, one performs compressions while the other provides ventilations, switching roles every 2 minutes.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Kleinman ME, et al. Part 5: Adult Basic Life Support and Cardiopulmonary Resuscitation Quality'
    ],
    difficulty: 'easy',
    topicId: 'bls'
  },
  {
    id: 'bls-017',
    question: 'When should rescue breathing be started in a victim who has a pulse but is not breathing?',
    options: [
      'Give 1 breath every 3-5 seconds',
      'Give 1 breath every 5-6 seconds',
      'Give 2 breaths every 30 seconds',
      'Start CPR immediately'
    ],
    correctIndex: 1,
    explanation: 'For victims with pulse but no breathing (respiratory arrest), provide rescue breathing at 1 breath every 5-6 seconds (10-12 breaths per minute). Recheck pulse every 2 minutes. If pulse absent, begin CPR.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2025 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-018',
    question: 'An unconscious choking victim becomes unresponsive. What should be done next?',
    options: [
      'Continue abdominal thrusts',
      'Start CPR with chest compressions',
      'Perform finger sweep',
      'Give back blows'
    ],
    correctIndex: 1,
    explanation: 'When a choking victim becomes unconscious, immediately start CPR with chest compressions. Each time the airway is opened to give breaths, look for and remove any visible foreign object. Do not perform blind finger sweeps.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Kleinman ME, et al. Part 5: Adult Basic Life Support and Cardiopulmonary Resuscitation Quality'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-019',
    question: 'What percentage of chest compressions should be aimed for during CPR (chest compression fraction)?',
    options: [
      'At least 50%',
      'At least 60%',
      'At least 70%',
      'At least 80%'
    ],
    correctIndex: 1,
    explanation: 'Chest compression fraction should be at least 60%, meaning compressions are performed at least 60% of the resuscitation time. Minimize interruptions for rhythm checks, defibrillation, and other interventions to maximize perfusion.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Christenson J, et al. Chest compression fraction determines survival in patients with out-of-hospital ventricular fibrillation'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-020',
    question: 'Which of the following indicates high-quality CPR?',
    options: [
      'Compression rate 80-100/min, depth 2 inches',
      'Compression rate 100-120/min, depth at least 2.4 inches, complete recoil',
      'Compression rate >120/min, depth 2-3 inches',
      'Focus on ventilation over compressions'
    ],
    correctIndex: 1,
    explanation: 'High-quality CPR includes: rate 100-120/min, depth ≥2.4 inches (6 cm), complete chest recoil, minimal interruptions (<10 seconds), avoiding excessive ventilation, and appropriate compression-to-ventilation ratio.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Kleinman ME, et al. Part 5: Adult Basic Life Support and Cardiopulmonary Resuscitation Quality'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-021',
    question: 'A victim is found unresponsive with agonal gasps. What is the appropriate response?',
    options: [
      'Position for recovery and monitor breathing',
      'Provide rescue breathing only',
      'Begin CPR immediately',
      'Wait to see if breathing improves'
    ],
    correctIndex: 2,
    explanation: 'Agonal gasps are not normal breathing and indicate cardiac arrest. Begin CPR immediately. Agonal gasps are common in early cardiac arrest and should not be mistaken for adequate breathing.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Bobrow BJ, et al. Gasping during cardiac arrest in humans is frequent and associated with improved survival'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-022',
    question: 'When using a bag-mask device during CPR, what is the recommended tidal volume?',
    options: [
      '400-500 mL',
      '500-600 mL',
      '600-700 mL',
      '800-1000 mL'
    ],
    correctIndex: 1,
    explanation: 'Deliver approximately 500-600 mL (6-7 mL/kg) tidal volume over 1 second, enough to produce visible chest rise. Avoid excessive ventilation which can impede venous return and decrease cardiac output.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Aufderheide TP, et al. Hyperventilation-induced hypotension during cardiopulmonary resuscitation'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-023',
    question: 'A healthcare team is performing CPR. Who should be designated as the team leader?',
    options: [
      'The most senior physician present',
      'The person who started CPR',
      'Someone with ACLS certification',
      'The most experienced person in resuscitation'
    ],
    correctIndex: 3,
    explanation: 'The team leader should be the person most experienced in resuscitation, regardless of profession or seniority. The leader directs the resuscitation, assigns roles, and ensures high-quality CPR while avoiding chaos.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Hunziker S, et al. Teamwork and leadership in cardiopulmonary resuscitation'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-024',
    question: 'During CPR, what is the preferred method for delivering ventilations when an advanced airway is in place?',
    options: [
      'Synchronized with compressions at 30:2 ratio',
      '1 breath every 6 seconds while compressions continue',
      '2 breaths after every 30 compressions',
      '1 breath every 10 seconds while compressions continue'
    ],
    correctIndex: 1,
    explanation: 'With an advanced airway (endotracheal tube, supraglottic airway), provide continuous compressions without pauses and give 1 breath every 6 seconds (10 breaths/minute). No longer use 30:2 ratio.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2025 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-025',
    question: 'A victim has suspected spinal injury and needs rescue breathing. What is the preferred method to open the airway?',
    options: [
      'Head tilt-chin lift',
      'Jaw thrust without head tilt',
      'Head tilt only',
      'Finger sweep first'
    ],
    correctIndex: 1,
    explanation: 'For suspected spinal injury, use jaw thrust without head tilt to open airway. If jaw thrust is ineffective and ventilation is needed to save life, carefully perform head tilt-chin lift as airway takes priority.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Lavonas EJ, et al. Part 10: Special Circumstances of Resuscitation: 2015 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-026',
    question: 'When should CPR be stopped during a resuscitation attempt?',
    options: [
      'After 10 minutes without ROSC',
      'When rescuer becomes fatigued',
      'When ROSC achieved, ALS takes over, or rescuer safety threatened',
      'After 3 cycles of CPR'
    ],
    correctIndex: 2,
    explanation: 'Stop CPR when: return of spontaneous circulation (ROSC) is achieved, advanced life support providers take over, or continued resuscitation would place rescuer in danger. Otherwise, continue until EMS arrives.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Travers AH, et al. Part 4: CPR Overview: 2010 American Heart Association Guidelines for Cardiopulmonary Resuscitation'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-027',
    question: 'What is the correct AED pad placement for an adult victim?',
    options: [
      'Right upper chest and left lower chest (anterolateral)',
      'Center of chest and center of back',
      'Left upper chest and right lower chest',
      'Both pads on the front of chest'
    ],
    correctIndex: 0,
    explanation: 'Standard placement is anterolateral: one pad on right upper chest below clavicle and one on left lower chest beside left nipple. Alternative is anterior-posterior placement if necessary due to anatomy or devices.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Link MS, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2015 American Heart Association Guidelines'
    ],
    difficulty: 'easy',
    topicId: 'bls'
  },
  {
    id: 'bls-028',
    question: 'A victim has an implanted pacemaker. How should AED pad placement be modified?',
    options: [
      'Do not use AED',
      'Place pads at least 1 inch away from device',
      'Use pediatric pads',
      'Place both pads on back'
    ],
    correctIndex: 1,
    explanation: 'Place AED pads at least 1 inch (2.5 cm) away from implanted devices like pacemakers or ICDs. The presence of these devices does not prevent AED use, but proper pad placement prevents damage and ensures effective defibrillation.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Link MS, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2015 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-029',
    question: 'During team CPR, what is the recommended method for ensuring high-quality compressions?',
    options: [
      'Visual assessment only',
      'Real-time feedback devices and capnography',
      'Pulse checks every 30 seconds',
      'Asking the compressor how they feel'
    ],
    correctIndex: 1,
    explanation: 'Use real-time CPR feedback devices and capnography when available to monitor compression quality. These provide objective data on rate, depth, recoil, and effectiveness. Visual assessment alone is inadequate.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Kleinman ME, et al. Part 5: Adult Basic Life Support and Cardiopulmonary Resuscitation Quality'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  },
  {
    id: 'bls-030',
    question: 'A lone rescuer finds an unresponsive adult victim. After determining unresponsiveness and abnormal breathing, what is the next priority?',
    options: [
      'Check pulse',
      'Start chest compressions',
      'Activate emergency response and get AED',
      'Open airway and give 2 breaths'
    ],
    correctIndex: 2,
    explanation: 'For lone rescuer with unresponsive adult, after confirming cardiac arrest, immediately activate emergency response system (call 911) and get AED if available. This ensures help is coming and defibrillation capability is obtained quickly.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2025 American Heart Association Guidelines',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2025 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'bls'
  }
];