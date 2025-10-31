import { Question } from './types';

export const proceduresQuestions: Question[] = [
  {
    id: 'proc-001',
    question: 'For central line placement in the internal jugular vein, what is the most appropriate landmark-based approach?',
    options: [
      'Between heads of sternocleidomastoid muscle',
      'Lateral to carotid pulse at cricoid level',
      'Medial to sternocleidomastoid muscle',
      'Above the clavicle lateral to sternocleidomastoid'
    ],
    correctIndex: 0,
    explanation: 'The classic landmark approach for internal jugular central line placement is at the apex of the triangle formed by the two heads of the sternocleidomastoid muscle. However, ultrasound guidance is now the standard of care to reduce complications.',
    references: [
      'Rupp SM, et al. Practice guidelines for central venous access: a report by the American Society of Anesthesiologists Task Force on Central Venous Access',
      'McGee DC, et al. Preventing complications of central venous catheterization'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-002',
    question: 'During emergency cricothyrotomy, what anatomical landmark should be palpated first?',
    options: [
      'Thyroid cartilage',
      'Cricoid cartilage',
      'Cricothyroid membrane',
      'Hyoid bone'
    ],
    correctIndex: 0,
    explanation: 'The thyroid cartilage (Adam\'s apple) should be palpated first, then move inferiorly to identify the cricothyroid membrane between the thyroid and cricoid cartilages. This membrane is the target for emergency cricothyrotomy.',
    references: [
      'Hubble MW, et al. A meta-analysis of prehospital airway control techniques part I: orotracheal and nasotracheal intubation success rates',
      'Bair AE, et al. The failed intubation attempt in the emergency department: analysis of prevalence, rescue techniques, and personnel'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-003',
    question: 'For tube thoracostomy placement, what is the preferred insertion site?',
    options: [
      '2nd intercostal space, midclavicular line',
      '4th-5th intercostal space, anterior axillary line',
      '6th intercostal space, posterior axillary line',
      '3rd intercostal space, midaxillary line'
    ],
    correctIndex: 1,
    explanation: 'The preferred site for tube thoracostomy is the 4th or 5th intercostal space in the anterior axillary line (lateral to pectoralis major, anterior to latissimus dorsi). This location minimizes risk to underlying organs and provides good drainage.',
    references: [
      'Havelock T, et al. Pleural procedures and thoracic ultrasound: British Thoracic Society pleural disease guideline 2010',
      'Laws D, et al. BTS guidelines for the insertion of a chest drain'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-004',
    question: 'During lumbar puncture, at what vertebral level should the needle be inserted?',
    options: [
      'L2-L3',
      'L3-L4',
      'L4-L5',
      'L5-S1'
    ],
    correctIndex: 2,
    explanation: 'The L4-L5 interspace is preferred for lumbar puncture to avoid the spinal cord, which typically ends at L1-L2 in adults. The iliac crest line (Tuffier\'s line) typically crosses the L4 spinous process, making this a useful landmark.',
    references: [
      'Evans RW, et al. Complications of lumbar puncture. Neurol Clin. 1998;16(1):83-105',
      'Engelborghs S, et al. Consensus guidelines for lumbar puncture in patients with neurological diseases'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-005',
    question: 'For emergency pericardiocentesis, what is the preferred approach?',
    options: [
      'Subxiphoid approach at 45-degree angle toward left shoulder',
      'Parasternal approach at 4th intercostal space',
      'Apical approach at 5th intercostal space',
      'Subcostal approach perpendicular to chest'
    ],
    correctIndex: 0,
    explanation: 'The subxiphoid approach at a 45-degree angle toward the left shoulder is preferred for emergency pericardiocentesis. This approach has the lowest risk of coronary artery or lung injury and provides the best access to the pericardial space.',
    references: [
      'Spodick DH. Acute cardiac tamponade. N Engl J Med. 2003;349(7):684-690',
      'Imazio M, et al. Management of pericardial effusion. Eur Heart J. 2013;34(16):1186-1197'
    ],
    difficulty: 'hard',
    topicId: 'procedures'
  },
  {
    id: 'proc-006',
    question: 'When performing endotracheal intubation, what is the most reliable method to confirm proper tube placement?',
    options: [
      'Auscultation of breath sounds',
      'Chest X-ray',
      'End-tidal CO2 detection',
      'Direct visualization of tube passage'
    ],
    correctIndex: 2,
    explanation: 'End-tidal CO2 detection is the most reliable method to confirm endotracheal tube placement in patients with perfusion. It provides continuous monitoring and can detect esophageal intubation immediately. However, it may be unreliable in cardiac arrest.',
    references: [
      'Silvestri S, et al. Endotracheal tube placement confirmation: 100% sensitivity and specificity with sustained four-phase capnographic waveforms in a cadaveric experimental model',
      'Grmec S. Comparison of three different methods to confirm tracheal tube placement in emergency intubation'
    ],
    difficulty: 'easy',
    topicId: 'procedures'
  },
  {
    id: 'proc-007',
    question: 'For arterial line placement, what is the most common complication?',
    options: [
      'Infection',
      'Thrombosis',
      'Hemorrhage',
      'Nerve injury'
    ],
    correctIndex: 1,
    explanation: 'Thrombosis is the most common complication of arterial line placement, occurring in up to 20% of cases. Most are clinically insignificant due to collateral circulation, but monitoring for signs of distal ischemia is important.',
    references: [
      'O\'Grady NP, et al. Guidelines for the prevention of intravascular catheter-related infections',
      'Scheer B, et al. Clinical review: complications and risk factors of peripheral arterial catheters used for haemodynamic monitoring in anaesthesia and intensive care medicine'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-008',
    question: 'During emergency thoracotomy, what is the first step after opening the chest?',
    options: [
      'Clamp the aorta',
      'Massage the heart',
      'Evacuate blood from pericardium',
      'Cross-clamp the hilum'
    ],
    correctIndex: 2,
    explanation: 'The first step in emergency thoracotomy is to evacuate blood from the pericardium to relieve tamponade and allow effective cardiac compressions. The pericardium should be opened longitudinally anterior to the phrenic nerve.',
    references: [
      'Working Group, Ad Hoc Subcommittee on Outcomes, American College of Surgeons-Committee on Trauma. Practice management guidelines for emergency department thoracotomy',
      'Seamon MJ, et al. An evidence-based approach to patient selection for emergency department thoracotomy'
    ],
    difficulty: 'hard',
    topicId: 'procedures'
  },
  {
    id: 'proc-009',
    question: 'For nasogastric tube insertion, what position should the patient\'s head be in?',
    options: [
      'Hyperextended',
      'Neutral position',
      'Slightly flexed',
      'Maximally flexed'
    ],
    correctIndex: 1,
    explanation: 'The head should initially be in a neutral position for NG tube insertion. Once the tube reaches the nasopharynx, the patient should flex the neck (chin to chest) to help direct the tube into the esophagus rather than the trachea.',
    references: [
      'Metheny NA, et al. Effectiveness of the auscultatory method in predicting feeding tube location',
      'Sorokin R, et al. Nasogastric tube placement: a review of methods to confirm tip location, global applicability and requirements'
    ],
    difficulty: 'easy',
    topicId: 'procedures'
  },
  {
    id: 'proc-010',
    question: 'When performing cardioversion, what is the most important timing consideration?',
    options: [
      'During inspiration',
      'During expiration',
      'Synchronized with R wave',
      'Between heartbeats'
    ],
    correctIndex: 2,
    explanation: 'Cardioversion must be synchronized with the R wave to avoid delivering energy during the vulnerable period of the cardiac cycle (T wave), which could induce ventricular fibrillation. Defibrillation (for VF/VT) is unsynchronized.',
    references: [
      'January CT, et al. 2019 AHA/ACC/HRS Focused Update of the 2014 AHA/ACC/HRS Guideline for the Management of Patients With Atrial Fibrillation',
      'Link MS, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2015 American Heart Association Guidelines Update for Cardiopulmonary Resuscitation'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-011',
    question: 'For paracentesis, what is the preferred needle insertion site?',
    options: [
      '2 cm below umbilicus in midline',
      'Left lower quadrant lateral to rectus muscle',
      'Right lower quadrant lateral to rectus muscle',
      'Suprapubic region'
    ],
    correctIndex: 1,
    explanation: 'The preferred site for paracentesis is the left lower quadrant lateral to the rectus muscle and inferior epigastric vessels. This location avoids major vessels and organs while providing good access to ascitic fluid.',
    references: [
      'Runyon BA, et al. Management of adult patients with ascites due to cirrhosis: an update',
      'De Gottardi A, et al. Risk of complications after abdominal paracentesis in cirrhotic patients: a prospective study'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-012',
    question: 'During bag-mask ventilation, what is the most common cause of inadequate ventilation?',
    options: [
      'Equipment malfunction',
      'Poor mask seal',
      'Gastric distension',
      'Airway obstruction'
    ],
    correctIndex: 1,
    explanation: 'Poor mask seal is the most common cause of inadequate bag-mask ventilation. Proper technique includes using both hands for mask seal (C-E grip), ensuring proper mask size, and maintaining jaw thrust to open the airway.',
    references: [
      'Weingart SD, et al. Bag-mask ventilation requires PEEP to prevent desaturation of apneic patients in the emergency department',
      'Joffe AM, et al. Bag-mask ventilation for preoxygenation of patients undergoing urgent sequence induction in the emergency department'
    ],
    difficulty: 'easy',
    topicId: 'procedures'
  },
  {
    id: 'proc-013',
    question: 'For ultrasound-guided peripheral IV placement, what probe frequency is most appropriate?',
    options: [
      '2-5 MHz',
      '5-10 MHz',
      '10-15 MHz',
      '15-20 MHz'
    ],
    correctIndex: 2,
    explanation: 'High-frequency linear probes (10-15 MHz) are most appropriate for ultrasound-guided peripheral IV placement as they provide excellent resolution of superficial structures like peripheral veins, typically within 2-3 cm of the skin surface.',
    references: [
      'Stolz LA, et al. Ultrasound-guided peripheral venous access: a meta-analysis of randomized controlled trials',
      'Weiner MM, et al. Ultrasound-guided vascular access: a comprehensive review'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-014',
    question: 'When performing needle decompression for tension pneumothorax, what is the preferred site?',
    options: [
      '2nd intercostal space, midclavicular line',
      '4th intercostal space, anterior axillary line',
      '5th intercostal space, midaxillary line',
      '6th intercostal space, posterior axillary line'
    ],
    correctIndex: 0,
    explanation: 'The 2nd intercostal space at the midclavicular line is the traditional site for needle decompression of tension pneumothorax. However, some recent studies suggest the 4th-5th intercostal space at the anterior axillary line may be more effective.',
    references: [
      'Leigh-Smith S, et al. Tension pneumothorax--time for a re-think?',
      'Inaba K, et al. Optimal positioning for emergent needle thoracostomy: a cadaver-based study'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-015',
    question: 'For emergency department thoracotomy, what is the primary indication?',
    options: [
      'Blunt cardiac arrest',
      'Penetrating cardiac arrest with recent vital signs',
      'Tension pneumothorax',
      'Massive hemothorax'
    ],
    correctIndex: 1,
    explanation: 'The primary indication for emergency department thoracotomy is penetrating trauma to the chest with cardiac arrest but recent vital signs (within 15 minutes for penetrating trauma, 5 minutes for blunt trauma). Survival rates are highest in this population.',
    references: [
      'Working Group, Ad Hoc Subcommittee on Outcomes, American College of Surgeons-Committee on Trauma. Practice management guidelines for emergency department thoracotomy',
      'Seamon MJ, et al. An evidence-based approach to patient selection for emergency department thoracotomy'
    ],
    difficulty: 'hard',
    topicId: 'procedures'
  },
  {
    id: 'proc-016',
    question: 'During intubation with video laryngoscopy, what is the main advantage over direct laryngoscopy?',
    options: [
      'Faster intubation time',
      'Better glottic visualization',
      'Lower aspiration risk',
      'Reduced cervical spine movement'
    ],
    correctIndex: 1,
    explanation: 'Video laryngoscopy provides significantly better glottic visualization, especially in patients with difficult airways. Multiple studies show improved first-pass success rates and better visualization of the vocal cords compared to direct laryngoscopy.',
    references: [
      'Griesdale DE, et al. Glidescope® video-laryngoscopy versus direct laryngoscopy for endotracheal intubation: a systematic review and meta-analysis',
      'Lewis SR, et al. Videolaryngoscopy versus direct laryngoscopy for adult patients requiring tracheal intubation'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-017',
    question: 'For subclavian central line placement, what is the most serious potential complication?',
    options: [
      'Pneumothorax',
      'Arterial puncture',
      'Infection',
      'Thrombosis'
    ],
    correctIndex: 0,
    explanation: 'Pneumothorax is the most serious acute complication of subclavian central line placement, occurring in 1-6% of procedures. It can be life-threatening and may require chest tube placement. This is why ultrasound guidance and alternative sites are preferred.',
    references: [
      'McGee DC, et al. Preventing complications of central venous catheterization',
      'Rupp SM, et al. Practice guidelines for central venous access'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-018',
    question: 'When performing a diagnostic peritoneal lavage, how much fluid should be instilled?',
    options: [
      '500 mL',
      '1000 mL',
      '1500 mL',
      '2000 mL'
    ],
    correctIndex: 1,
    explanation: 'For diagnostic peritoneal lavage, 1000 mL (1 liter) of warmed normal saline should be instilled into the peritoneal cavity. After gentle agitation, the fluid is drained and analyzed for blood, white cells, bacteria, and other markers of intraperitoneal injury.',
    references: [
      'Biffl WL, et al. Evolution of a multidisciplinary clinical pathway for the management of unstable patients with pelvic fractures',
      'Root HD, et al. Diagnostic peritoneal lavage. Surgery. 1965;57:633-637'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-019',
    question: 'For urethral catheterization in a male patient, what should be done if resistance is encountered?',
    options: [
      'Apply more force',
      'Use a smaller catheter',
      'Stop and consider urological consultation',
      'Try a different catheter type'
    ],
    correctIndex: 2,
    explanation: 'If resistance is encountered during male urethral catheterization, the procedure should be stopped to avoid creating a false passage or worsening urethral injury. Urological consultation should be considered, especially if urethral trauma is suspected.',
    references: [
      'Reynard JM, et al. The management of acute urinary retention. BJU Int. 2005;95(6):939-944',
      'Tailly GG. Catheterization of the male urethra. Can Med Assoc J. 1983;128(9):1047-1048'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-020',
    question: 'During supraglottic airway (LMA) insertion, what indicates proper placement?',
    options: [
      'Easy insertion without resistance',
      'Symmetric chest rise with ventilation',
      'Absence of audible leak',
      'All of the above'
    ],
    correctIndex: 3,
    explanation: 'Proper LMA placement is indicated by easy insertion without resistance, symmetric chest rise with ventilation, absence of audible leak at appropriate pressures, and confirmation with capnography. All these signs should be present for optimal placement.',
    references: [
      'Cook TM, et al. Fourth National Audit Project of the Royal College of Anaesthetists and Difficult Airway Society: major complications of airway management in the United Kingdom',
      'Brimacombe J, et al. The laryngeal mask airway: development and validation of a new technique for fiberoptic guidance'
    ],
    difficulty: 'easy',
    topicId: 'procedures'
  },
  {
    id: 'proc-021',
    question: 'For emergency wound repair, what is the maximum time window for primary closure of most lacerations?',
    options: [
      '6 hours',
      '12 hours',
      '24 hours',
      '48 hours'
    ],
    correctIndex: 0,
    explanation: 'The traditional "golden period" for primary wound closure is 6-8 hours for most body areas. However, this can be extended to 12-24 hours for facial wounds due to excellent blood supply. Wounds older than this may require delayed primary closure or healing by secondary intention.',
    references: [
      'Hollander JE, et al. Wound repair. In: Tintinalli JE, et al. Tintinalli\'s Emergency Medicine: A Comprehensive Study Guide',
      'Singer AJ, et al. Evaluation and management of traumatic lacerations'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-022',
    question: 'When performing joint aspiration of the knee, what is the preferred approach?',
    options: [
      'Medial approach below patella',
      'Lateral approach below patella',
      'Suprapatellar approach',
      'Infrapatellar approach'
    ],
    correctIndex: 1,
    explanation: 'The lateral approach below the patella is preferred for knee aspiration as it avoids the infrapatellar fat pad and provides direct access to the joint space. The needle is inserted lateral to the patellar tendon, directed slightly upward and medially.',
    references: [
      'Margaretten ME, et al. Does this adult patient have septic arthritis? JAMA. 2007;297(13):1478-1488',
      'Shmerling RH, et al. Synovial fluid tests. What should be ordered?'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-023',
    question: 'For emergency tracheostomy, what is the most critical step?',
    options: [
      'Proper positioning',
      'Adequate anesthesia',
      'Securing the airway immediately',
      'Controlling bleeding'
    ],
    correctIndex: 2,
    explanation: 'Securing the airway immediately is the most critical step in emergency tracheostomy. Once the trachea is opened, the tracheostomy tube must be inserted and secured quickly to prevent loss of the airway. Have a backup plan ready if the initial attempt fails.',
    references: [
      'Byhahn C, et al. Perioperative complications during percutaneous tracheostomy in obese patients',
      'Freeman BD, et al. A meta-analysis of prospective trials comparing percutaneous and surgical tracheostomy in critically ill patients'
    ],
    difficulty: 'hard',
    topicId: 'procedures'
  },
  {
    id: 'proc-024',
    question: 'During cardiopulmonary resuscitation, what is the recommended compression depth for adults?',
    options: [
      'At least 2 inches (5 cm)',
      'At least 2.4 inches (6 cm)',
      '1.5-2 inches (4-5 cm)',
      'As deep as possible'
    ],
    correctIndex: 0,
    explanation: 'Current AHA guidelines recommend chest compressions of at least 2 inches (5 cm) but no more than 2.4 inches (6 cm) in depth for adults. Compressions should be delivered at a rate of 100-120/min with complete chest recoil between compressions.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care',
      'Stiell IG, et al. What is the role of chest compression depth during out-of-hospital cardiac arrest resuscitation?'
    ],
    difficulty: 'easy',
    topicId: 'procedures'
  },
  {
    id: 'proc-025',
    question: 'For intraosseous access in adults, what is the preferred insertion site?',
    options: [
      'Proximal tibia',
      'Distal tibia',
      'Proximal humerus',
      'Sternum'
    ],
    correctIndex: 2,
    explanation: 'The proximal humerus is increasingly preferred for intraosseous access in adults due to faster flow rates and better patient tolerance. The proximal tibia remains an excellent alternative, especially if the humerus is not accessible.',
    references: [
      'Reades R, et al. Intraosseous versus intravenous vascular access during out-of-hospital cardiac arrest: a randomized controlled trial',
      'Weiser G, et al. Alternative vascular access in the emergency department'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-026',
    question: 'When performing rapid sequence intubation, what is the primary purpose of cricoid pressure?',
    options: [
      'Improve laryngeal view',
      'Prevent aspiration',
      'Facilitate tube passage',
      'Reduce esophageal pressure'
    ],
    correctIndex: 1,
    explanation: 'The primary purpose of cricoid pressure (Sellick maneuver) is to prevent aspiration by compressing the esophagus against the vertebral column. However, recent evidence questions its effectiveness and it may actually hinder intubation in some cases.',
    references: [
      'Ellis DY, et al. Cricoid pressure in emergency department rapid sequence tracheal intubation: a risk-benefit analysis',
      'Brimacombe JR, et al. Cricoid pressure. Anaesthesia. 1997;52(8):738-745'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-027',
    question: 'For ultrasound-guided central line placement, what view is most important for avoiding arterial puncture?',
    options: [
      'Short axis (transverse) view',
      'Long axis (longitudinal) view',
      'Oblique view',
      'Color Doppler view'
    ],
    correctIndex: 0,
    explanation: 'Short axis (transverse) view is most important for distinguishing the vein from adjacent arteries. Veins are typically more compressible, have thinner walls, and show respiratory variation. Real-time visualization during needle insertion is crucial.',
    references: [
      'Karakitsos D, et al. Real-time ultrasound-guided catheterisation of the internal jugular vein: a prospective comparison with the landmark technique',
      'Troianos CA, et al. Guidelines for performing ultrasound guided vascular cannulation'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-028',
    question: 'During mechanical ventilation setup, what is the initial tidal volume recommendation for ARDS patients?',
    options: [
      '10-12 mL/kg ideal body weight',
      '8-10 mL/kg ideal body weight',
      '6-8 mL/kg ideal body weight',
      '4-6 mL/kg ideal body weight'
    ],
    correctIndex: 2,
    explanation: 'For ARDS patients, lung-protective ventilation with tidal volumes of 6-8 mL/kg ideal body weight is recommended to prevent ventilator-induced lung injury. This is lower than traditional tidal volumes and has been shown to improve survival.',
    references: [
      'Acute Respiratory Distress Syndrome Network. Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and the acute respiratory distress syndrome',
      'Fan E, et al. An Official American Thoracic Society/European Society of Intensive Care Medicine/Society of Critical Care Medicine Clinical Practice Guideline: mechanical ventilation in adult patients with acute respiratory distress syndrome'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-029',
    question: 'For emergency pacing in bradycardia with hemodynamic compromise, what is the preferred method?',
    options: [
      'Transcutaneous pacing',
      'Transvenous pacing',
      'Epicardial pacing',
      'Pharmacological pacing'
    ],
    correctIndex: 0,
    explanation: 'Transcutaneous pacing is the preferred initial method for emergency pacing as it can be initiated rapidly and non-invasively. Transvenous pacing is more comfortable and reliable for longer-term use but takes longer to establish.',
    references: [
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay',
      'Link MS, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2015 American Heart Association Guidelines Update'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  },
  {
    id: 'proc-030',
    question: 'When performing gastric lavage for overdose, what is the maximum time after ingestion that it remains effective?',
    options: [
      '30 minutes',
      '1 hour',
      '2 hours',
      '4 hours'
    ],
    correctIndex: 1,
    explanation: 'Gastric lavage is generally only effective within 1 hour of ingestion and is rarely recommended due to limited efficacy and potential complications. Most toxicology experts now favor activated charcoal (when appropriate) over gastric lavage.',
    references: [
      'American Academy of Clinical Toxicology; European Association of Poisons Centres and Clinical Toxicologists. Position paper: gastric lavage',
      'Höjer J, et al. Position paper update: gastric lavage for gastrointestinal decontamination'
    ],
    difficulty: 'medium',
    topicId: 'procedures'
  }
];