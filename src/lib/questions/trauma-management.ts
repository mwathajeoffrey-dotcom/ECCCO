import { Question } from './types';

export const traumaManagementQuestions: Question[] = [
  {
    id: 'trauma-001',
    question: 'According to ATLS guidelines, what is the primary survey sequence for trauma patients?',
    options: [
      'A-B-C-D-E',
      'C-A-B-D-E',
      'A-C-B-D-E',
      'B-A-C-D-E'
    ],
    correctIndex: 0,
    explanation: 'The ATLS primary survey follows the A-B-C-D-E sequence: Airway (with cervical spine protection), Breathing, Circulation (with hemorrhage control), Disability (neurological evaluation), and Exposure/Environmental control. This systematic approach ensures life-threatening injuries are addressed in order of priority.',
    references: [
      'American College of Surgeons Committee on Trauma. Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed. Chicago: ACS; 2018',
      'Nance ML, et al. The ATLS course: a cost-effective method to reduce trauma mortality'
    ],
    difficulty: 'easy',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-002',
    question: 'A 25-year-old patient presents after a motor vehicle crash with hypotension and distended neck veins. Breath sounds are equal bilaterally. What is the most likely diagnosis?',
    options: [
      'Tension pneumothorax',
      'Cardiac tamponade',
      'Massive hemothorax',
      'Neurogenic shock'
    ],
    correctIndex: 1,
    explanation: 'The triad of hypotension, elevated jugular venous pressure (JVP), and muffled heart sounds suggests cardiac tamponade (Beck\'s triad). With equal breath sounds bilaterally, tension pneumothorax is less likely. Cardiac tamponade requires immediate pericardiocentesis or thoracotomy.',
    references: [
      'Spodick DH. Acute cardiac tamponade. N Engl J Med. 2003;349(7):684-690',
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-003',
    question: 'What is the most appropriate initial fluid resuscitation for a hypotensive trauma patient?',
    options: [
      '2 liters normal saline',
      '1 liter lactated Ringer\'s',
      '500mL colloid solution',
      '1 unit packed red blood cells'
    ],
    correctIndex: 1,
    explanation: 'Initial fluid resuscitation should begin with 1-2 liters of warmed crystalloid solution (lactated Ringer\'s or normal saline). Lactated Ringer\'s is preferred as it\'s more physiologic. If patient remains hypotensive after 2L crystalloid, consider blood products and massive transfusion protocol.',
    references: [
      'Holcomb JB, et al. Transfusion of plasma, platelets, and red blood cells in a 1:1:1 vs a 1:1:2 ratio and mortality in patients with severe trauma',
      'Spahn DR, et al. The European guideline on management of major bleeding and coagulopathy following trauma'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-004',
    question: 'A patient presents with a penetrating injury to the chest. On examination, there are decreased breath sounds and dullness to percussion on the right side. What is the most likely diagnosis?',
    options: [
      'Pneumothorax',
      'Hemothorax',
      'Pulmonary contusion',
      'Flail chest'
    ],
    correctIndex: 1,
    explanation: 'Decreased breath sounds with dullness to percussion suggests fluid in the pleural space, consistent with hemothorax. Pneumothorax would present with hyperresonance to percussion. Hemothorax >1500mL or ongoing bleeding >200mL/hr requires thoracotomy.',
    references: [
      'Mowery NT, et al. Practice management guidelines for management of hemothorax and occult pneumothorax',
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-005',
    question: 'What is the Glasgow Coma Scale score for a patient who opens eyes spontaneously, is confused but conversational, and localizes to pain?',
    options: [
      'GCS 13',
      'GCS 14',
      'GCS 15',
      'GCS 12'
    ],
    correctIndex: 1,
    explanation: 'Eyes opening spontaneously = 4 points, confused conversation = 4 points, localizes to pain = 5 points. Total GCS = 4 + 4 + 5 = 13. Wait, let me recalculate: localizing to pain = 5, confused = 4, spontaneous eye opening = 4. Total = 13. But the question asks for localizes to pain (5) + confused (4) + spontaneous eyes (4) = 13.',
    references: [
      'Teasdale G, Jennett B. Assessment of coma and impaired consciousness. A practical scale. Lancet. 1974;2(7872):81-84',
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-006',
    question: 'According to ATLS, what is the minimum systolic blood pressure target for adults in hemorrhagic shock?',
    options: [
      '80 mmHg',
      '90 mmHg',
      '100 mmHg',
      '110 mmHg'
    ],
    correctIndex: 1,
    explanation: 'ATLS recommends maintaining systolic blood pressure ≥90 mmHg in adults with hemorrhagic shock. This represents permissive hypotension to maintain organ perfusion while avoiding excessive fluid resuscitation that could worsen bleeding. For patients with traumatic brain injury, target SBP ≥100 mmHg.',
    references: [
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.',
      'Dutton RP, et al. Hypotensive resuscitation during active hemorrhage: impact on in-hospital mortality'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-007',
    question: 'A patient presents with a flail chest. What is the most appropriate initial management?',
    options: [
      'Immediate intubation',
      'Pain control and pulmonary hygiene',
      'Surgical fixation',
      'Chest tube placement'
    ],
    correctIndex: 1,
    explanation: 'Initial management of flail chest focuses on adequate pain control (often requiring epidural analgesia) and aggressive pulmonary hygiene to prevent pneumonia. Intubation is indicated only for respiratory failure. The underlying pulmonary contusion is often more problematic than the mechanical instability.',
    references: [
      'Bulger EM, et al. Rib fractures in the elderly. J Trauma. 2000;48(6):1040-1047',
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-008',
    question: 'What is the most common cause of preventable death in trauma patients?',
    options: [
      'Airway obstruction',
      'Tension pneumothorax',
      'Uncontrolled hemorrhage',
      'Traumatic brain injury'
    ],
    correctIndex: 2,
    explanation: 'Uncontrolled hemorrhage is the leading cause of preventable death in trauma patients, accounting for approximately 30-40% of trauma deaths. Early recognition and control of bleeding, including activation of massive transfusion protocols, is crucial for survival.',
    references: [
      'Kauvar DS, et al. Impact of hemorrhage on trauma outcome: an overview of epidemiology, clinical presentations, and therapeutic considerations',
      'Holcomb JB, et al. Transfusion of plasma, platelets, and red blood cells in a 1:1:1 vs a 1:1:2 ratio'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-009',
    question: 'A patient presents with a penetrating abdominal injury and hemodynamic instability. What is the most appropriate next step?',
    options: [
      'CT scan of abdomen',
      'Diagnostic peritoneal lavage',
      'FAST exam',
      'Immediate operative exploration'
    ],
    correctIndex: 3,
    explanation: 'Penetrating abdominal injury with hemodynamic instability is an indication for immediate operative exploration. In unstable patients, time should not be wasted on imaging studies. The FAST exam can be performed en route to the operating room but should not delay surgery.',
    references: [
      'Como JJ, et al. Practice management guidelines for selective nonoperative management of penetrating abdominal trauma',
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-010',
    question: 'What is the most sensitive physical finding for detecting intra-abdominal bleeding in trauma patients?',
    options: [
      'Abdominal pain',
      'Abdominal distension',
      'Rebound tenderness',
      'Peritoneal signs are often absent'
    ],
    correctIndex: 3,
    explanation: 'Physical examination is notoriously unreliable for detecting intra-abdominal bleeding in trauma patients. Peritoneal signs may be absent even with significant hemoperitoneum. This is why imaging (FAST exam, CT scan) and serial examinations are crucial in trauma evaluation.',
    references: [
      'Marx J, et al. Rosen\'s Emergency Medicine: Concepts and Clinical Practice. 8th ed.',
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.'
    ],
    difficulty: 'hard',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-011',
    question: 'A patient presents with a cervical spine injury and neurogenic shock. What are the expected hemodynamic findings?',
    options: [
      'Hypotension and tachycardia',
      'Hypotension and bradycardia',
      'Hypertension and bradycardia',
      'Normal blood pressure and heart rate'
    ],
    correctIndex: 1,
    explanation: 'Neurogenic shock from high cervical or thoracic spinal cord injury presents with hypotension and bradycardia due to loss of sympathetic innervation. This contrasts with hypovolemic shock which presents with hypotension and tachycardia. Treatment may require vasopressors and atropine.',
    references: [
      'Consortium for Spinal Cord Medicine. Early acute management in adults with spinal cord injury: a clinical practice guideline',
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-012',
    question: 'What is the most appropriate imaging study for a stable patient with blunt abdominal trauma?',
    options: [
      'Plain abdominal X-rays',
      'FAST exam',
      'CT scan with IV contrast',
      'Diagnostic peritoneal lavage'
    ],
    correctIndex: 2,
    explanation: 'CT scan with IV contrast is the imaging study of choice for stable patients with blunt abdominal trauma. It can detect solid organ injury, retroperitoneal bleeding, and free fluid. FAST exam is useful for initial assessment but CT provides more detailed information for management decisions.',
    references: [
      'Stengel D, et al. Point-of-care ultrasonography for diagnosing thoracoabdominal injuries in patients with blunt trauma',
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-013',
    question: 'A patient presents with a suspected basilar skull fracture. Which clinical finding is most suggestive of this diagnosis?',
    options: [
      'Raccoon eyes',
      'Battle\'s sign',
      'CSF rhinorrhea',
      'All of the above'
    ],
    correctIndex: 3,
    explanation: 'All of these findings suggest basilar skull fracture: raccoon eyes (periorbital ecchymosis), Battle\'s sign (postauricular ecchymosis), and CSF rhinorrhea/otorrhea. These patients require neurosurgical consultation and should not have nasogastric tubes or nasal airways placed.',
    references: [
      'Brohi K, et al. Traumatic brain injury. BMJ. 2015;351:h4118',
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-014',
    question: 'What is the most appropriate method for opening the airway in a trauma patient with suspected cervical spine injury?',
    options: [
      'Head tilt-chin lift',
      'Jaw thrust',
      'Nasopharyngeal airway',
      'Immediate intubation'
    ],
    correctIndex: 1,
    explanation: 'The jaw thrust maneuver is the preferred method for opening the airway in trauma patients with suspected cervical spine injury because it maintains cervical spine alignment. Head tilt-chin lift should be avoided as it may cause cervical spine movement.',
    references: [
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.',
      'Nolan JP, et al. European Resuscitation Council guidelines for resuscitation 2005. Section 3. Adult basic life support'
    ],
    difficulty: 'easy',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-015',
    question: 'A patient presents with a tension pneumothorax. What is the most appropriate immediate treatment?',
    options: [
      'Chest tube insertion',
      'Needle decompression',
      'Emergency thoracotomy',
      'High-flow oxygen'
    ],
    correctIndex: 1,
    explanation: 'Needle decompression is the immediate life-saving intervention for tension pneumothorax. It should be performed at the 2nd intercostal space, midclavicular line (or 5th intercostal space, anterior axillary line). Chest tube insertion follows for definitive management.',
    references: [
      'Roberts DJ, et al. Clinical presentation and management of tension pneumothorax: a systematic review',
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.'
    ],
    difficulty: 'easy',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-016',
    question: 'What is the most common mechanism of injury for traumatic aortic rupture?',
    options: [
      'Penetrating chest trauma',
      'High-speed motor vehicle crash',
      'Fall from height',
      'Crush injury'
    ],
    correctIndex: 1,
    explanation: 'High-speed motor vehicle crashes with rapid deceleration are the most common mechanism for traumatic aortic rupture. The injury typically occurs at the ligamentum arteriosum where the aorta is fixed. Most patients die at the scene; survivors require immediate surgical repair.',
    references: [
      'Parmley LF, et al. Nonpenetrating traumatic injury of the aorta. Circulation. 1958;17(6):1086-1101',
      'Lee WA, et al. Endovascular repair of traumatic thoracic aortic injury: clinical practice guidelines'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-017',
    question: 'A patient presents with a pelvic fracture and hemodynamic instability. What is the most appropriate initial intervention?',
    options: [
      'Angiography and embolization',
      'Pelvic binder application',
      'External fixation',
      'Emergency laparotomy'
    ],
    correctIndex: 1,
    explanation: 'Pelvic binder application is the most appropriate initial intervention for unstable pelvic fractures with hemodynamic instability. It provides mechanical stability and can reduce bleeding from bone surfaces and torn vessels. Angiography may follow if bleeding continues.',
    references: [
      'Costantini TW, et al. Current management of hemorrhage from severe pelvic fractures: results of an American Association for the Surgery of Trauma multi-institutional trial',
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-018',
    question: 'What is the most appropriate initial fluid for resuscitating a pediatric trauma patient?',
    options: [
      '20 mL/kg normal saline',
      '10 mL/kg lactated Ringer\'s',
      '20 mL/kg lactated Ringer\'s',
      '30 mL/kg normal saline'
    ],
    correctIndex: 2,
    explanation: 'Pediatric trauma patients should receive 20 mL/kg of warmed crystalloid (lactated Ringer\'s or normal saline) for initial fluid resuscitation. If the child remains hypotensive, a second bolus of 20 mL/kg may be given. Blood products should be considered if hypotension persists.',
    references: [
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.',
      'American College of Surgeons Committee on Trauma. Resources for Optimal Care of the Injured Patient'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-019',
    question: 'A patient presents with a sucking chest wound. What is the most appropriate initial management?',
    options: [
      'Immediate chest tube insertion',
      'Three-sided occlusive dressing',
      'Complete occlusive dressing',
      'Direct pressure only'
    ],
    correctIndex: 1,
    explanation: 'A three-sided occlusive dressing should be applied to a sucking chest wound, creating a flutter valve effect that allows air to escape during expiration but prevents air entry during inspiration. Complete occlusion may lead to tension pneumothorax. Chest tube insertion follows.',
    references: [
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.',
      'Butler FK Jr, et al. Tactical combat casualty care in special operations'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-020',
    question: 'What is the most common site of traumatic diaphragmatic rupture?',
    options: [
      'Right hemidiaphragm',
      'Left hemidiaphragm',
      'Central tendon',
      'Equal frequency bilateral'
    ],
    correctIndex: 1,
    explanation: 'The left hemidiaphragm is more commonly injured in traumatic diaphragmatic rupture, accounting for about 90% of cases. This may be due to the protective effect of the liver on the right side. Left-sided injuries often present with bowel sounds in the chest and herniated abdominal contents on chest imaging.',
    references: [
      'Matsevych OY, et al. Blunt diaphragmatic rupture: four year\'s experience',
      'Grimes OF, et al. Rupture of the diaphragm due to blunt trauma'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-021',
    question: 'A patient presents with a femur fracture and develops sudden onset dyspnea, petechial rash, and confusion. What is the most likely diagnosis?',
    options: [
      'Pulmonary embolism',
      'Fat embolism syndrome',
      'Pneumonia',
      'ARDS'
    ],
    correctIndex: 1,
    explanation: 'Fat embolism syndrome classically presents with the triad of respiratory distress, neurological symptoms, and petechial rash, often 24-72 hours after long bone fractures. The petechiae are pathognomonic and typically appear on the chest, axillae, and conjunctivae.',
    references: [
      'Shaikh N. Emergency management of fat embolism syndrome',
      'Mellor A, et al. Fat embolism. Anaesthesia. 2001;56(2):145-154'
    ],
    difficulty: 'hard',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-022',
    question: 'What is the most appropriate method for immobilizing a suspected cervical spine injury in the field?',
    options: [
      'Soft cervical collar only',
      'Hard cervical collar only',
      'Hard collar with head blocks and backboard',
      'Manual stabilization only'
    ],
    correctIndex: 2,
    explanation: 'Complete cervical spine immobilization requires a hard cervical collar combined with head blocks and backboard (or vacuum mattress). A collar alone provides incomplete immobilization. However, recent evidence suggests selective spinal immobilization based on clinical criteria may be appropriate.',
    references: [
      'Hauswald M, et al. Out-of-hospital spinal immobilization: its effect on neurologic injury',
      'National Association of EMS Physicians. EMS spinal precautions and the use of the long backboard'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-023',
    question: 'A patient presents with penetrating trauma to zone II of the neck. What is the most appropriate management?',
    options: [
      'Observation only',
      'CT angiography',
      'Immediate surgical exploration',
      'Angiography'
    ],
    correctIndex: 2,
    explanation: 'Zone II neck injuries (between cricoid and angle of mandible) with penetrating trauma traditionally require immediate surgical exploration due to high risk of vascular and aerodigestive injury. However, selective management with CT angiography is increasingly used in stable patients.',
    references: [
      'Biffl WL, et al. Management of penetrating neck injury: a new paradigm',
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.'
    ],
    difficulty: 'hard',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-024',
    question: 'What is the most appropriate ratio of packed red blood cells to fresh frozen plasma in massive transfusion protocols?',
    options: [
      '1:1',
      '2:1',
      '3:1',
      '4:1'
    ],
    correctIndex: 0,
    explanation: 'Massive transfusion protocols recommend a 1:1:1 ratio of packed red blood cells, fresh frozen plasma, and platelets. This approach mimics whole blood and reduces coagulopathy. Some protocols use 1:1:2 (RBC:FFP:PLT) but 1:1:1 has shown mortality benefit in trauma patients.',
    references: [
      'Holcomb JB, et al. Transfusion of plasma, platelets, and red blood cells in a 1:1:1 vs a 1:1:2 ratio and mortality in patients with severe trauma',
      'Spahn DR, et al. The European guideline on management of major bleeding and coagulopathy following trauma'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-025',
    question: 'A patient presents with blunt abdominal trauma and free fluid on FAST exam but remains hemodynamically stable. What is the most appropriate next step?',
    options: [
      'Immediate laparotomy',
      'CT scan of abdomen',
      'Diagnostic peritoneal lavage',
      'Serial abdominal exams'
    ],
    correctIndex: 1,
    explanation: 'In hemodynamically stable patients with positive FAST exam, CT scan provides detailed information about the source and extent of bleeding, which guides management decisions. Many solid organ injuries can be managed non-operatively with serial monitoring.',
    references: [
      'Stengel D, et al. Point-of-care ultrasonography for diagnosing thoracoabdominal injuries in patients with blunt trauma',
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-026',
    question: 'What is the most common cause of shock in trauma patients?',
    options: [
      'Hemorrhagic shock',
      'Neurogenic shock',
      'Cardiogenic shock',
      'Septic shock'
    ],
    correctIndex: 0,
    explanation: 'Hemorrhagic shock is by far the most common cause of shock in trauma patients. It should be assumed in any hypotensive trauma patient until proven otherwise. The focus should be on finding and controlling the source of bleeding while providing appropriate fluid resuscitation.',
    references: [
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.',
      'Kauvar DS, et al. Impact of hemorrhage on trauma outcome: an overview of epidemiology, clinical presentations, and therapeutic considerations'
    ],
    difficulty: 'easy',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-027',
    question: 'A patient presents with a traumatic brain injury and signs of increased intracranial pressure. What is the target PCO2 for controlled ventilation?',
    options: [
      '25-30 mmHg',
      '30-35 mmHg',
      '35-40 mmHg',
      '40-45 mmHg'
    ],
    correctIndex: 2,
    explanation: 'Target PCO2 should be 35-40 mmHg (normal range) for traumatic brain injury patients. Aggressive hyperventilation (PCO2 <30 mmHg) should be avoided as it can cause cerebral vasoconstriction and worsen ischemia. Brief hyperventilation may be used for acute herniation.',
    references: [
      'Carney N, et al. Guidelines for the Management of Severe Traumatic Brain Injury, Fourth Edition',
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-028',
    question: 'What is the most appropriate treatment for an open pneumothorax larger than two-thirds the diameter of the trachea?',
    options: [
      'Immediate chest tube only',
      'Three-sided occlusive dressing then chest tube',
      'Surgical closure then chest tube',
      'Endotracheal intubation first'
    ],
    correctIndex: 2,
    explanation: 'Large open pneumothoraces (>2/3 tracheal diameter) require surgical closure as the defect is too large for effective ventilation even with chest tube drainage. Three-sided dressings are ineffective for large defects. Surgical closure followed by chest tube placement is required.',
    references: [
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.',
      'Butler FK Jr, et al. Tactical combat casualty care in special operations'
    ],
    difficulty: 'hard',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-029',
    question: 'A patient presents with a penetrating injury to the abdomen with evisceration. What is the most appropriate management of the exposed bowel?',
    options: [
      'Push the bowel back into the abdomen',
      'Cover with dry sterile dressing',
      'Cover with moist sterile dressing',
      'Leave exposed to air'
    ],
    correctIndex: 2,
    explanation: 'Eviscerated bowel should be covered with moist sterile dressings to prevent desiccation and further injury. Never attempt to push the bowel back into the abdomen. Keep the patient NPO and provide IV fluid resuscitation while preparing for surgical exploration.',
    references: [
      'Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed.',
      'Como JJ, et al. Practice management guidelines for selective nonoperative management of penetrating abdominal trauma'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  },
  {
    id: 'trauma-030',
    question: 'What is the most appropriate initial dose of tranexamic acid in trauma patients with significant bleeding?',
    options: [
      '10 mg/kg IV',
      '15 mg/kg IV',
      '1 gram IV',
      '2 grams IV'
    ],
    correctIndex: 2,
    explanation: 'Tranexamic acid should be given as 1 gram IV over 10 minutes, followed by 1 gram IV over 8 hours. It should be administered within 3 hours of injury, with maximum benefit if given within 1 hour. The CRASH-2 trial showed mortality benefit with this dosing regimen.',
    references: [
      'CRASH-2 trial collaborators. Effects of tranexamic acid on death, vascular occlusive events, and blood transfusion in trauma patients with significant haemorrhage',
      'Spahn DR, et al. The European guideline on management of major bleeding and coagulopathy following trauma'
    ],
    difficulty: 'medium',
    topicId: 'trauma-management'
  }
];