import { Question } from './types';

export const atlsQuestions: Question[] = [
  {
    id: 'atls-001',
    question: 'What are the components of the primary survey in ATLS protocol?',
    options: [
      'A-B-C-D-E (Airway, Breathing, Circulation, Disability, Exposure)',
      'A-B-C (Airway, Breathing, Circulation)',
      'X-A-B-C-D-E (eXsanguinating hemorrhage, Airway, Breathing, Circulation, Disability, Exposure)',
      'V-I-P (Vitals, Injuries, Pain)'
    ],
    correctIndex: 2,
    explanation: 'ATLS 10th edition primary survey is X-A-B-C-D-E: eXsanguinating hemorrhage control, Airway with C-spine protection, Breathing, Circulation, Disability (neurologic), and Exposure/Environmental control. Address life-threatening issues as identified.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Rossaint R, et al. The European guideline on management of major bleeding and coagulopathy following trauma'
    ],
    difficulty: 'easy',
    topicId: 'atls'
  },
  {
    id: 'atls-002',
    question: 'A trauma patient presents with systolic BP 85 mmHg, HR 120 bpm, and altered mental status. This represents which class of hemorrhagic shock?',
    options: [
      'Class I (up to 15% blood loss)',
      'Class II (15-30% blood loss)',
      'Class III (30-40% blood loss)',
      'Class IV (>40% blood loss)'
    ],
    correctIndex: 2,
    explanation: 'Class III shock: 30-40% blood loss (1500-2000mL), systolic BP decreased, HR >120, altered mental status, decreased urine output. Requires immediate fluid resuscitation and blood products. Class IV would have profound hypotension.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Gutierrez G, et al. Clinical review: Hemorrhagic shock'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-003',
    question: 'In a patient with suspected tension pneumothorax, what is the immediate life-saving intervention?',
    options: [
      'Chest X-ray',
      'Needle thoracentesis at 2nd intercostal space, midclavicular line',
      'Immediate chest tube insertion',
      'Endotracheal intubation'
    ],
    correctIndex: 1,
    explanation: 'Tension pneumothorax is a clinical diagnosis requiring immediate needle thoracentesis at 2nd intercostal space, midclavicular line with 14-gauge needle. Follow with chest tube insertion. Do not delay for imaging in unstable patients.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Leigh-Smith S, et al. Tension pneumothorax - time for a re-think?'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-004',
    question: 'A patient has a penetrating abdominal wound with eviscerated bowel. What is the appropriate initial management?',
    options: [
      'Push bowel back into abdomen',
      'Cover with dry sterile gauze',
      'Cover with moist sterile saline-soaked gauze',
      'Apply direct pressure to wound'
    ],
    correctIndex: 2,
    explanation: 'Cover eviscerated organs with moist, sterile saline-soaked gauze to prevent desiccation. Do not attempt to push organs back into abdomen. Keep patient NPO and prepare for urgent surgical intervention.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Biffl WL, et al. Management of patients with evisceration'
    ],
    difficulty: 'easy',
    topicId: 'atls'
  },
  {
    id: 'atls-005',
    question: 'What is the preferred initial fluid for resuscitation in hemorrhagic shock according to ATLS guidelines?',
    options: [
      'Normal saline',
      'Lactated Ringer\'s solution',
      '5% albumin',
      'Whole blood'
    ],
    correctIndex: 1,
    explanation: 'Lactated Ringer\'s is preferred initial crystalloid for trauma resuscitation. It has a more physiologic electrolyte composition than normal saline and less risk of hyperchloremic acidosis. Begin with 1-2L bolus in adults.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Holcomb JB, et al. The prospective, observational, multicenter, major trauma transfusion (PROMMTT) study'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-006',
    question: 'A patient with blunt chest trauma has decreased breath sounds and dullness to percussion on the right. What is the most likely diagnosis?',
    options: [
      'Pneumothorax',
      'Hemothorax',
      'Pulmonary contusion',
      'Flail chest'
    ],
    correctIndex: 1,
    explanation: 'Decreased breath sounds with dullness to percussion suggests hemothorax. Pneumothorax would have hyperresonance. Hemothorax can be massive (>1500mL initial drainage) requiring emergent thoracotomy.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Mowery NT, et al. Practice management guidelines for management of hemothorax and occult pneumothorax'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-007',
    question: 'In suspected cervical spine injury, what is the preferred method for airway management?',
    options: [
      'Bag-mask ventilation only',
      'Oral intubation with manual in-line stabilization',
      'Nasotracheal intubation',
      'Surgical cricothyrotomy'
    ],
    correctIndex: 1,
    explanation: 'Oral intubation with manual in-line stabilization is preferred for airway control in C-spine injury. Maintain cervical immobilization during intubation. Cricothyrotomy may be needed if intubation fails.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Crosby ET, et al. The unanticipated difficult airway with recommendations for management'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-008',
    question: 'A trauma patient has a Glasgow Coma Scale score of 8. What is the indication for this finding?',
    options: [
      'Mild traumatic brain injury',
      'Moderate traumatic brain injury',
      'Severe traumatic brain injury requiring intubation',
      'Normal mental status'
    ],
    correctIndex: 2,
    explanation: 'GCS ≤8 indicates severe traumatic brain injury and is an indication for endotracheal intubation to protect airway and facilitate hyperventilation if needed for increased ICP. Also consider CT scan and neurosurgical consultation.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Brain Trauma Foundation. Guidelines for the Management of Severe Traumatic Brain Injury, 4th Edition'
    ],
    difficulty: 'easy',
    topicId: 'atls'
  },
  {
    id: 'atls-009',
    question: 'What is the target hemoglobin level for massive transfusion in trauma patients?',
    options: [
      '7-9 g/dL',
      '10-12 g/dL',
      '12-14 g/dL',
      '14-16 g/dL'
    ],
    correctIndex: 0,
    explanation: 'Target hemoglobin 7-9 g/dL in stable trauma patients. Higher targets may increase mortality. In actively bleeding patients, transfuse based on clinical condition rather than strict hemoglobin thresholds.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Holcomb JB, et al. Transfusion of plasma, platelets, and red blood cells in a 1:1:1 vs a 1:1:2 ratio'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-010',
    question: 'A patient presents with Beck\'s triad (elevated JVP, hypotension, muffled heart sounds). What is the most likely diagnosis?',
    options: [
      'Tension pneumothorax',
      'Cardiac tamponade',
      'Massive hemothorax',
      'Flail chest'
    ],
    correctIndex: 1,
    explanation: 'Beck\'s triad (elevated jugular venous pressure, hypotension, muffled heart sounds) suggests cardiac tamponade. However, classic triad is present in <20% of cases. FAST exam and pericardiocentesis may be lifesaving.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Spodick DH. Acute cardiac tamponade'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-011',
    question: 'In damage control resuscitation, what is the recommended ratio of packed red blood cells to fresh frozen plasma to platelets?',
    options: [
      '1:1:1',
      '2:1:1',
      '3:1:1',
      '4:1:1'
    ],
    correctIndex: 0,
    explanation: 'Damage control resuscitation uses 1:1:1 ratio of pRBCs:FFP:platelets to prevent dilutional coagulopathy. Early use of blood products rather than crystalloids improves outcomes in severe hemorrhage.',
    references: [
      'Holcomb JB, et al. Transfusion of plasma, platelets, and red blood cells in a 1:1:1 vs a 1:1:2 ratio',
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-012',
    question: 'A patient has a flail chest with respiratory distress. What is the primary management?',
    options: [
      'Immediate surgical fixation',
      'Positive pressure ventilation and pain control',
      'External splinting of chest wall',
      'Chest tube insertion'
    ],
    correctIndex: 1,
    explanation: 'Flail chest management focuses on adequate ventilation (may require intubation and positive pressure ventilation) and aggressive pain control to prevent splinting and pneumonia. Surgery is reserved for specific indications.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Slobogean GP, et al. Surgical fixation vs nonoperative management of flail chest'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-013',
    question: 'What is the first priority in managing a patient with suspected abdominal trauma and hemodynamic instability?',
    options: [
      'CT scan of abdomen',
      'FAST (Focused Assessment with Sonography in Trauma)',
      'Diagnostic peritoneal lavage',
      'Immediate laparotomy'
    ],
    correctIndex: 1,
    explanation: 'FAST exam is rapid, non-invasive assessment for hemoperitoneum in unstable patients. Positive FAST with instability indicates need for immediate surgical intervention. CT is for stable patients only.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Stengel D, et al. Point-of-care ultrasonography for diagnosing thoracoabdominal trauma in emergency setting'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-014',
    question: 'A patient has a penetrating injury to zone II of the neck. What is the appropriate management?',
    options: [
      'Observation only',
      'CT angiography',
      'Immediate surgical exploration',
      'Endotracheal intubation'
    ],
    correctIndex: 1,
    explanation: 'Zone II neck injuries (between cricoid and angle of mandible) require evaluation with CT angiography in stable patients to assess vascular and aerodigestive tract injuries. Unstable patients may need immediate exploration.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Inaba K, et al. Evaluation of penetrating neck injuries'
    ],
    difficulty: 'hard',
    topicId: 'atls'
  },
  {
    id: 'atls-015',
    question: 'What is the most sensitive indicator of early hemorrhagic shock in young healthy adults?',
    options: [
      'Decreased blood pressure',
      'Increased heart rate',
      'Decreased urine output',
      'Altered mental status'
    ],
    correctIndex: 1,
    explanation: 'Tachycardia is the earliest and most sensitive sign of hemorrhagic shock in young healthy patients due to compensatory mechanisms. Blood pressure may remain normal until significant blood loss (Class III shock).',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Parks JK, et al. Systemic hypotension is a late marker of shock after trauma'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-016',
    question: 'A patient has a suspected basilar skull fracture. Which finding is most concerning for CSF leak?',
    options: [
      'Battle\'s sign (bruising behind ear)',
      'Raccoon eyes (periorbital bruising)',
      'Clear fluid from nose that tests positive for glucose',
      'Hemotympanum'
    ],
    correctIndex: 2,
    explanation: 'Clear nasal discharge positive for glucose suggests CSF rhinorrhea from basilar skull fracture. Battle\'s sign and raccoon eyes are late signs. CSF leak increases infection risk and may require neurosurgical intervention.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Brodie HA, et al. Management of complications from 820 temporal bone fractures'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-017',
    question: 'In a patient with traumatic brain injury and signs of increased intracranial pressure, what is the target PCO2 for hyperventilation?',
    options: [
      '25-30 mmHg',
      '30-35 mmHg',
      '35-40 mmHg',
      'Hyperventilation is contraindicated'
    ],
    correctIndex: 1,
    explanation: 'Target PCO2 30-35 mmHg for brief hyperventilation in TBI with signs of herniation. Avoid prophylactic hyperventilation (PCO2 <30 mmHg) as it can worsen cerebral ischemia. Use only as temporary bridge to definitive treatment.',
    references: [
      'Brain Trauma Foundation. Guidelines for the Management of Severe Traumatic Brain Injury, 4th Edition',
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition'
    ],
    difficulty: 'hard',
    topicId: 'atls'
  },
  {
    id: 'atls-018',
    question: 'A patient has a suspected pelvic fracture with hemodynamic instability. What is the first intervention?',
    options: [
      'Immediate pelvic X-ray',
      'Pelvic binding/stabilization',
      'Angiography and embolization',
      'Immediate surgical fixation'
    ],
    correctIndex: 1,
    explanation: 'Immediate pelvic binding or stabilization (pelvic binder, sheet, or external fixator) can help control hemorrhage from pelvic fractures. This should be done before imaging in unstable patients to reduce pelvic volume.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Costantini TW, et al. Current management of hemorrhage from severe pelvic fractures'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-019',
    question: 'What is the indication for emergent cricothyrotomy in trauma?',
    options: [
      'Anticipated difficult intubation',
      'Multiple facial fractures',
      'Cannot intubate, cannot oxygenate situation',
      'Cervical spine injury'
    ],
    correctIndex: 2,
    explanation: 'Cricothyrotomy is indicated in "cannot intubate, cannot oxygenate" situations when other airway methods have failed. It\'s a last resort procedure when patient is hypoxic and other airway techniques are unsuccessful.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Frerk C, et al. Difficult Airway Society 2015 guidelines for management of unanticipated difficult intubation in adults'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-020',
    question: 'A patient has burns covering 18% total body surface area. What is the fluid resuscitation formula for the first 24 hours?',
    options: [
      '2 mL/kg/% burn',
      '3 mL/kg/% burn',
      '4 mL/kg/% burn',
      '5 mL/kg/% burn'
    ],
    correctIndex: 2,
    explanation: 'Parkland formula: 4 mL/kg/% burn for first 24 hours. Give half in first 8 hours from time of burn, half in next 16 hours. Use lactated Ringer\'s solution. Adjust based on urine output (0.5-1 mL/kg/hr).',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Jeschke MG, et al. Burn injury'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-021',
    question: 'A patient has a suspected spinal cord injury at C5 level with bradycardia and hypotension. What is this called?',
    options: [
      'Hypovolemic shock',
      'Cardiogenic shock',
      'Neurogenic shock',
      'Septic shock'
    ],
    correctIndex: 2,
    explanation: 'Neurogenic shock from high spinal cord injury (above T6) causes loss of sympathetic tone leading to bradycardia, hypotension, and warm extremities. Treat with fluids and vasopressors. Rule out other causes of shock.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Consortium for Spinal Cord Medicine. Early acute management in adults with spinal cord injury'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-022',
    question: 'In massive transfusion protocol, when should tranexamic acid be administered?',
    options: [
      'Within 1 hour of injury',
      'Within 3 hours of injury',
      'After 4 units of blood',
      'Only if fibrinogen <100 mg/dL'
    ],
    correctIndex: 1,
    explanation: 'Tranexamic acid should be given within 3 hours of injury (ideally within 1 hour) in patients with or at risk of significant bleeding. Loading dose 1g IV over 10 minutes, then 1g over 8 hours. Benefits decrease after 3 hours.',
    references: [
      'CRASH-2 trial collaborators. Effects of tranexamic acid on death, vascular occlusive events, and blood transfusion in trauma patients',
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-023',
    question: 'A patient has a grade V splenic laceration with hemodynamic instability. What is the most appropriate management?',
    options: [
      'Observation with serial exams',
      'Angiography and embolization',
      'Immediate splenectomy',
      'Splenic repair'
    ],
    correctIndex: 2,
    explanation: 'Grade V splenic injury with hemodynamic instability requires immediate operative intervention, usually splenectomy. Stable patients with lower grade injuries may be managed non-operatively with close monitoring.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Stassen NA, et al. Nonoperative management of blunt splenic injury: a multi-institutional experience'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-024',
    question: 'What is the most common cause of preventable death in trauma patients?',
    options: [
      'Airway obstruction',
      'Uncontrolled hemorrhage',
      'Pneumothorax',
      'Brain injury'
    ],
    correctIndex: 1,
    explanation: 'Uncontrolled hemorrhage is the leading cause of preventable death in trauma. Early recognition, control of bleeding, and appropriate resuscitation with blood products are crucial for survival.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Kauvar DS, et al. Impact of hemorrhage on trauma outcome: an overview of epidemiology, clinical presentations, and therapeutic considerations'
    ],
    difficulty: 'easy',
    topicId: 'atls'
  },
  {
    id: 'atls-025',
    question: 'A pregnant patient at 32 weeks gestation has blunt abdominal trauma. What additional consideration is important?',
    options: [
      'Immediate cesarean section',
      'Fetal heart rate monitoring',
      'Higher fluid requirements',
      'Prone positioning'
    ],
    correctIndex: 1,
    explanation: 'Pregnant trauma patients require fetal heart rate monitoring to assess fetal wellbeing. Also maintain left lateral decubitus positioning to prevent aortocaval compression. Consider placental abruption and uterine rupture.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Brown HL, et al. Trauma in pregnancy'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-026',
    question: 'In pediatric trauma, what is the most common cause of shock?',
    options: [
      'Hemorrhage',
      'Head injury',
      'Pneumothorax',
      'Cardiac contusion'
    ],
    correctIndex: 1,
    explanation: 'In pediatric trauma, head injury is the most common cause of shock due to loss of sympathetic tone and increased intracranial pressure. Children have better cardiovascular compensation and maintain blood pressure longer than adults.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Holmes JF, et al. Clinical prediction rules for identifying adults at very low risk for intra-abdominal injuries after blunt trauma'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-027',
    question: 'A patient has an open femur fracture with active bleeding. What is the immediate management priority?',
    options: [
      'X-ray of femur',
      'Direct pressure and splinting',
      'Immediate surgical fixation',
      'Tourniquet application'
    ],
    correctIndex: 1,
    explanation: 'Open fractures with bleeding require immediate direct pressure to control hemorrhage and splinting to prevent further soft tissue damage and reduce pain. Tourniquet is reserved for extremity hemorrhage not controlled by direct pressure.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Kragh JF Jr, et al. Survival with emergency tourniquet use to stop bleeding in major limb trauma'
    ],
    difficulty: 'easy',
    topicId: 'atls'
  },
  {
    id: 'atls-028',
    question: 'What is the definition of massive transfusion?',
    options: [
      '≥4 units pRBCs in 1 hour',
      '≥6 units pRBCs in 6 hours',
      '≥10 units pRBCs in 24 hours',
      'Replacement of entire blood volume in 24 hours'
    ],
    correctIndex: 2,
    explanation: 'Massive transfusion is classically defined as ≥10 units of packed red blood cells in 24 hours or replacement of entire blood volume. However, many protocols now use clinical triggers rather than strict definitions.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Savage SA, et al. The new metric to define large-volume hemorrhage: results of a prospective study of the critical administration threshold'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-029',
    question: 'A patient has a suspected thoracic aortic injury. What is the most appropriate initial imaging?',
    options: [
      'Chest X-ray',
      'Echocardiogram',
      'CT angiography of chest',
      'Aortography'
    ],
    correctIndex: 2,
    explanation: 'CT angiography is the initial imaging of choice for suspected thoracic aortic injury. It\'s rapid, widely available, and has high sensitivity. Aortography is reserved for cases where CT is inconclusive.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Neschis DG, et al. Blunt aortic injury'
    ],
    difficulty: 'medium',
    topicId: 'atls'
  },
  {
    id: 'atls-030',
    question: 'In the secondary survey, what components should be systematically assessed?',
    options: [
      'Head to toe examination only',
      'Detailed history and complete physical examination',
      'Focused examination of injured areas',
      'Laboratory and imaging studies'
    ],
    correctIndex: 1,
    explanation: 'Secondary survey includes detailed history (AMPLE: Allergies, Medications, Past medical history, Last meal, Events) and complete head-to-toe physical examination to identify all injuries after life-threatening problems are addressed.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support Student Course Manual, 10th Edition',
      'Tintinalli JE, et al. Emergency Medicine: A Comprehensive Study Guide'
    ],
    difficulty: 'easy',
    topicId: 'atls'
  }
];