import { Question } from './types';

export const pointOfCareUltrasoundQuestions: Question[] = [
  {
    id: 'pocus-001',
    question: 'A 45-year-old trauma patient presents with hypotension. eFAST exam shows anechoic fluid in Morrison\'s pouch with a maximum depth of 3 cm. The spleen appears normal. What is the estimated volume of hemoperitoneum?',
    options: [
      'Less than 200 mL',
      '200-500 mL',
      '500-1000 mL',
      'Greater than 1000 mL'
    ],
    correctIndex: 2,
    explanation: 'Free fluid depth of 2-3 cm in Morrison\'s pouch typically correlates with 500-1000 mL of hemoperitoneum. This finding warrants immediate surgical consultation and consideration for operative intervention.',
    references: [
      'Moore CL, et al. Acad Emerg Med 2007;14:1002-1009',
      'ACEP Clinical Policy on eFAST 2023'
    ],
    difficulty: 'medium',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-002',
    question: 'During a cardiac POCUS exam in a patient with chest pain, you observe the following: Left ventricle appears hypercontractile with obliteration of the cavity during systole, estimated EF >75%. What is the most likely diagnosis?',
    options: [
      'Acute myocardial infarction',
      'Hypovolemic shock',
      'Pulmonary embolism',
      'Cardiomyopathy'
    ],
    correctIndex: 1,
    explanation: 'Hypercontractile heart with cavity obliteration (kissing walls) indicates severe hypovolemia. The heart is squeezing maximally but has inadequate preload. This finding should prompt immediate fluid resuscitation.',
    references: [
      'Perera P, et al. Acad Emerg Med 2010;17:1239-1246',
      'ASE Guidelines for POCUS 2023'
    ],
    difficulty: 'medium',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-003',
    question: 'A 30-year-old female with sudden onset dyspnea shows the following lung ultrasound pattern: Multiple discrete B-lines (>3 per intercostal space) bilaterally, lung sliding present, no consolidation. What is the most likely diagnosis?',
    options: [
      'Pneumonia',
      'Pulmonary edema',
      'Pneumothorax',
      'Pleural effusion'
    ],
    correctIndex: 1,
    explanation: 'Multiple B-lines (>3 per space) bilaterally with preserved lung sliding indicates alveolar-interstitial syndrome, most commonly pulmonary edema. The pattern helps differentiate from pneumonia (focal) or pneumothorax (absent sliding).',
    references: [
      'Volpicelli G, et al. Intensive Care Med 2012;38:577-591',
      'Lichtenstein D. Chest 2008;134:117-125'
    ],
    difficulty: 'medium',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-004',
    question: 'In a hypotensive patient, IVC ultrasound shows: IVC diameter 2.8 cm with <50% collapse on inspiration. What does this suggest about volume status?',
    options: [
      'Severe hypovolemia',
      'Euvolemia',
      'Volume overload or elevated right heart pressures',
      'Technical error in measurement'
    ],
    correctIndex: 2,
    explanation: 'IVC diameter >2.1 cm with <50% inspiratory collapse suggests elevated central venous pressure (>15 mmHg), indicating volume overload, right heart failure, or other causes of elevated right-sided pressures.',
    references: [
      'Rudski LG, et al. J Am Soc Echocardiogr 2010;23:685-713',
      'Porter TR, et al. J Am Soc Echocardiogr 2015;28:1-39'
    ],
    difficulty: 'medium',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-005',
    question: 'A 25-year-old male with chest pain after MVA. eFAST shows: No pericardial effusion, but the heart appears to move excessively with each beat, almost bouncing within the chest. What traumatic injury should you suspect?',
    options: [
      'Cardiac contusion',
      'Aortic dissection',
      'Pneumopericardium',
      'Diaphragmatic rupture'
    ],
    correctIndex: 2,
    explanation: 'Excessive cardiac motion or "swinging heart" sign suggests pneumopericardium, where air around the heart allows excessive mobility. This can occur with pneumomediastinum after chest trauma or esophageal rupture.',
    references: [
      'Blaivas M, et al. Am J Emerg Med 2003;21:32-35',
      'Trauma Ultrasound Guidelines AIUM 2023'
    ],
    difficulty: 'hard',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-006',
    question: 'Lung ultrasound in a patient with acute dyspnea shows: Absence of lung sliding, absence of B-lines, presence of A-lines, and a clearly defined pleural line. What is the most likely diagnosis?',
    options: [
      'Pneumonia',
      'Pneumothorax',
      'Pleural effusion',
      'Pulmonary embolism'
    ],
    correctIndex: 1,
    explanation: 'The combination of absent lung sliding, absent B-lines, present A-lines, and a defined pleural line is pathognomonic for pneumothorax. The lung point (transition between pneumothorax and normal lung) confirms the diagnosis.',
    references: [
      'Lichtenstein D, et al. Chest 2008;134:117-125',
      'Soldati G, et al. Chest 2008;134:652-658'
    ],
    difficulty: 'easy',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-007',
    question: 'During shock evaluation, echocardiography reveals: Dilated right ventricle, flattened interventricular septum (D-sign), tricuspid regurgitation with estimated RVSP 60 mmHg. What is the most likely cause of shock?',
    options: [
      'Cardiogenic shock',
      'Hypovolemic shock',
      'Distributive shock',
      'Obstructive shock (acute PE)'
    ],
    correctIndex: 3,
    explanation: 'Acute right heart strain pattern with RV dilation, septal flattening (D-sign), and elevated RVSP suggests massive pulmonary embolism causing obstructive shock. This requires immediate anticoagulation and consideration for thrombolysis.',
    references: [
      'Rudski LG, et al. J Am Soc Echocardiogr 2010;23:685-713',
      'ESC Guidelines on PE 2024'
    ],
    difficulty: 'medium',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-008',
    question: 'eFAST exam in a motorcycle trauma patient shows: 1 cm pericardial effusion, heart appears compressed with diastolic collapse of right ventricle. Vital signs: BP 80/60, HR 120, JVD present. What is the immediate management?',
    options: [
      'IV fluid bolus',
      'Vasopressors',
      'Immediate pericardiocentesis',
      'Chest tube insertion'
    ],
    correctIndex: 2,
    explanation: 'Pericardial effusion with RV diastolic collapse, hypotension, tachycardia, and JVD represents cardiac tamponade. This is a life-threatening emergency requiring immediate pericardiocentesis or surgical intervention.',
    references: [
      'Spodick DH. N Engl J Med 2003;349:684-690',
      'ATLS Guidelines 10th Edition 2024'
    ],
    difficulty: 'easy',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-009',
    question: 'POCUS-guided central line placement: You visualize a round, anechoic structure that compresses easily and shows phasic flow with respiration. A parallel structure appears oval and non-compressible. Which should you target?',
    options: [
      'The round, compressible structure',
      'The oval, non-compressible structure',
      'Either structure is acceptable',
      'Neither - reposition probe'
    ],
    correctIndex: 0,
    explanation: 'The round, compressible structure with phasic flow is the internal jugular vein. The oval, non-compressible structure is the carotid artery. Always target the vein for central access and avoid arterial puncture.',
    references: [
      'Troianos CA, et al. Anesth Analg 2011;114:46-72',
      'ASA Guidelines for Central Venous Access 2023'
    ],
    difficulty: 'easy',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-010',
    question: 'A 70-year-old with acute dyspnea shows this lung ultrasound pattern: Bilateral confluent B-lines creating a "white lung" appearance with preserved lung sliding. Cardiac POCUS shows reduced EF (~30%). What is the diagnosis?',
    options: [
      'Acute pneumonia',
      'Acute cardiogenic pulmonary edema',
      'ARDS',
      'Interstitial lung disease'
    ],
    correctIndex: 1,
    explanation: 'Bilateral confluent B-lines (white lung) with preserved sliding plus reduced cardiac function indicates acute cardiogenic pulmonary edema. This pattern helps differentiate from pneumonia (focal) or ARDS (may have absent sliding).',
    references: [
      'Volpicelli G, et al. Intensive Care Med 2012;38:577-591',
      'Pivetta E, et al. Chest 2015;148:202-210'
    ],
    difficulty: 'medium',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-011',
    question: 'During resuscitation, you perform serial IVC measurements: Initial: 0.8 cm with >75% collapse. After 1L NS: 1.5 cm with 60% collapse. After 2L total: 2.0 cm with 45% collapse. What should you do next?',
    options: [
      'Continue aggressive fluid resuscitation',
      'Stop fluids and reassess clinically',
      'Start vasopressors',
      'Obtain chest X-ray'
    ],
    correctIndex: 1,
    explanation: 'The progression from small, collapsible IVC to larger, less collapsible suggests adequate volume resuscitation. Further fluids risk volume overload. Clinical reassessment and other causes of shock should be considered.',
    references: [
      'Marik PE, et al. Crit Care Med 2008;36:2673-2679',
      'Via G, et al. Eur J Echocardiogr 2010;11:223-244'
    ],
    difficulty: 'medium',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-012',
    question: 'Abdominal FAST shows: Anechoic fluid in pelvis (pouch of Douglas) and paracolic gutters, but Morrison\'s pouch appears normal. Estimated blood loss based on this pattern is:',
    options: [
      '100-300 mL',
      '300-700 mL',
      '700-1500 mL',
      '>1500 mL'
    ],
    correctIndex: 1,
    explanation: 'Free fluid in pelvis and paracolic gutters but not Morrison\'s pouch suggests 300-700 mL blood loss. Fluid accumulates in gravity-dependent areas first (pelvis), then paracolic gutters, then hepatorenal recess with increasing volume.',
    references: [
      'von Kuenssberg Jehle D, et al. Ann Emerg Med 2003;42:384-391',
      'Blackbourne LH, et al. J Trauma 2004;57:288-295'
    ],
    difficulty: 'medium',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-013',
    question: 'Cardiac POCUS in a patient with chest pain shows: Akinetic anterior wall, dyskinetic apex, hyperkinetic inferior and lateral walls. Estimated EF 35%. What coronary artery is most likely occluded?',
    options: [
      'Right coronary artery (RCA)',
      'Left circumflex artery (LCX)',
      'Left anterior descending artery (LAD)',
      'Posterior descending artery (PDA)'
    ],
    correctIndex: 2,
    explanation: 'Anterior wall and apical wall motion abnormalities with compensatory hyperkinesis of other segments indicates LAD territory infarction. This pattern is classic for anterior STEMI requiring emergent catheterization.',
    references: [
      'Cerqueira MD, et al. Circulation 2002;105:539-542',
      'Thygesen K, et al. Circulation 2018;138:e618-e651'
    ],
    difficulty: 'medium',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-014',
    question: 'Lung ultrasound for pleural effusion assessment shows: Anechoic fluid above the diaphragm with a maximum vertical measurement of 4 cm on the posterior axillary line. What is the estimated pleural fluid volume?',
    options: [
      '100-300 mL',
      '300-500 mL',
      '500-1000 mL',
      '>1000 mL'
    ],
    correctIndex: 2,
    explanation: 'The formula for pleural effusion volume estimation is approximately 200 mL per cm of fluid height. A 4 cm measurement suggests ~800 mL, which falls in the 500-1000 mL range and may warrant therapeutic thoracentesis.',
    references: [
      'Balik M, et al. Crit Care 2006;10:R102',
      'Gordon CE, et al. Acad Emerg Med 2013;20:26-31'
    ],
    difficulty: 'medium',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-015',
    question: 'A patient in cardiac arrest undergoes POCUS during CPR. You observe: No cardiac activity visible, heart appears as a motionless structure. What is this finding called and what does it indicate?',
    options: [
      'Ventricular fibrillation - continue current ACLS',
      'Cardiac standstill - consider termination of resuscitation',
      'Technical error - reposition probe',
      'Pericardial tamponade - perform pericardiocentesis'
    ],
    correctIndex: 1,
    explanation: 'Cardiac standstill (absence of any cardiac motion) during cardiac arrest is associated with very poor prognosis and may support decision for termination of resuscitation efforts, especially in non-shockable rhythms.',
    references: [
      'Blaivas M, et al. Resuscitation 2001;51:53-57',
      'Gaspari R, et al. Resuscitation 2016;109:33-39'
    ],
    difficulty: 'hard',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-016',
    question: 'RUSH protocol evaluation: IVC dilated (>2.5 cm), minimal collapse. Heart shows RV strain. Lung ultrasound shows bilateral A-lines, no B-lines. DVT scan positive for proximal clot. What type of shock?',
    options: [
      'Cardiogenic',
      'Hypovolemic',
      'Distributive',
      'Obstructive'
    ],
    correctIndex: 3,
    explanation: 'The RUSH protocol findings - dilated IVC, RV strain, normal lung pattern, and positive DVT - indicate obstructive shock from pulmonary embolism. This requires immediate anticoagulation and possible thrombolysis.',
    references: [
      'Perera P, et al. Acad Emerg Med 2010;17:1239-1246',
      'Volpicelli G, et al. Crit Ultrasound J 2012;4:1'
    ],
    difficulty: 'medium',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-017',
    question: 'Focused echocardiography shows: Severely dilated left ventricle with global hypokinesis, EF estimated at 15%. Patient is hypotensive. What is the shock mechanism?',
    options: [
      'Hypovolemic shock',
      'Distributive shock',
      'Cardiogenic shock',
      'Obstructive shock'
    ],
    correctIndex: 2,
    explanation: 'Severely reduced EF (15%) with dilated LV and global hypokinesis indicates pump failure causing cardiogenic shock. This requires inotropic support and urgent cardiology consultation for advanced therapies.',
    references: [
      'McDonagh TA, et al. Eur Heart J 2021;42:3599-3726',
      'van Diepen S, et al. Circulation 2017;136:e232-e268'
    ],
    difficulty: 'easy',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-018',
    question: 'Abdominal ultrasound for AAA screening in a 70-year-old with back pain shows: Aorta measures 6.2 cm in diameter with a visible intimal flap creating two lumens. What is the immediate management?',
    options: [
      'CT angiography for further evaluation',
      'Immediate vascular surgery consultation',
      'Blood pressure control and observation',
      'MRI for better soft tissue detail'
    ],
    correctIndex: 1,
    explanation: 'Aortic diameter >5.5 cm with visible intimal flap indicates aortic dissection with aneurysmal dilation. This is a surgical emergency requiring immediate vascular surgery consultation and blood pressure control.',
    references: [
      'Hiratzka LF, et al. Circulation 2010;121:e266-e369',
      'Erbel R, et al. Eur Heart J 2014;35:2873-2926'
    ],
    difficulty: 'easy',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-019',
    question: 'Lung ultrasound in ARDS patient shows: Anterior regions with A-lines, lateral regions with multiple B-lines, posterior regions with consolidation and absent lung sliding. This pattern suggests:',
    options: [
      'Improving ARDS with recruitment',
      'Worsening ARDS with consolidation',
      'Ventilator-associated pneumonia',
      'Pneumothorax development'
    ],
    correctIndex: 1,
    explanation: 'This anterior-to-posterior gradient (A-lines → B-lines → consolidation) with absent posterior sliding indicates worsening ARDS with dependent consolidation. May require prone positioning and recruitment maneuvers.',
    references: [
      'Bouhemad B, et al. Am J Respir Crit Care Med 2007;175:360-367',
      'Mongodi S, et al. Ann Intensive Care 2017;7:120'
    ],
    difficulty: 'hard',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-020',
    question: 'Bedside echo during cardiac arrest shows organized cardiac contractions with good wall motion, estimated EF 55%. Monitor shows asystole. What is this condition called?',
    options: [
      'Ventricular fibrillation',
      'Pulseless electrical activity (PEA)',
      'Equipment malfunction',
      'Electromechanical dissociation'
    ],
    correctIndex: 1,
    explanation: 'Organized cardiac motion on echo with asystole on monitor represents PEA (pulseless electrical activity). This indicates mechanical heart function without electrical activity captured on surface ECG, requiring standard PEA protocol.',
    references: [
      'Blaivas M, et al. Resuscitation 2001;51:53-57',
      'AHA Guidelines for CPR and ECC 2020'
    ],
    difficulty: 'medium',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-021',
    question: 'FALLS protocol for dyspnea evaluation shows: Normal heart function, bilateral lung B-lines, legs show no edema or DVT. IVC is small and collapsible. What is the most likely diagnosis?',
    options: [
      'Acute heart failure',
      'Pulmonary embolism',
      'Flash pulmonary edema from hypertensive crisis',
      'ARDS or non-cardiogenic pulmonary edema'
    ],
    correctIndex: 3,
    explanation: 'The FALLS protocol with normal heart function, bilateral B-lines, but small collapsible IVC suggests non-cardiogenic pulmonary edema or ARDS rather than heart failure, which would show poor cardiac function or non-collapsible IVC.',
    references: [
      'Lichtenstein D. Chest 2008;134:117-125',
      'Lichtenstein D, et al. Crit Care Med 2006;34:1707-1713'
    ],
    difficulty: 'hard',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-022',
    question: 'Shock patient evaluation: Echo shows small, hypercontractile LV with EF >80%. IVC small and completely collapsible. Lung ultrasound shows A-lines only. What type of shock?',
    options: [
      'Cardiogenic shock',
      'Hypovolemic shock',
      'Distributive shock',
      'Obstructive shock'
    ],
    correctIndex: 1,
    explanation: 'Hypercontractile heart (EF >80%), small collapsible IVC, and dry lungs (A-lines only) indicate severe hypovolemia. The heart is compensating maximally but lacks adequate preload.',
    references: [
      'Perera P, et al. Acad Emerg Med 2010;17:1239-1246',
      'Jones AE, et al. Crit Care Med 2004;32:691-699'
    ],
    difficulty: 'easy',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-023',
    question: 'Trauma patient with mechanism for blunt cardiac injury. Echo shows: Hyperechoic structure attached to tricuspid valve, paradoxical septal motion. What traumatic injury is suggested?',
    options: [
      'Myocardial contusion',
      'Ventricular septal defect',
      'Tricuspid valve rupture',
      'Pneumopericardium'
    ],
    correctIndex: 2,
    explanation: 'Hyperechoic material on tricuspid valve with paradoxical septal motion suggests traumatic tricuspid regurgitation from valve rupture or papillary muscle injury. This requires urgent cardiac surgery evaluation.',
    references: [
      'Schultz JM, et al. J Trauma 2003;55:330-335',
      'Karalis DG, et al. J Trauma 1996;40:768-772'
    ],
    difficulty: 'hard',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-024',
    question: 'Pneumonia evaluation: Lung ultrasound shows a well-demarcated hypoechoic region with hyperechoic internal echoes and air bronchograms. This pattern indicates:',
    options: [
      'Pleural effusion',
      'Lung consolidation',
      'Pneumothorax',
      'Atelectasis'
    ],
    correctIndex: 1,
    explanation: 'Hypoechoic region with air bronchograms (hyperechoic linear artifacts) represents lung consolidation typical of pneumonia. The air bronchograms confirm that this is consolidated lung rather than effusion.',
    references: [
      'Reissig A, et al. Eur J Radiol 2006;60:324-334',
      'Volpicelli G, et al. Chest 2008;133:204-211'
    ],
    difficulty: 'easy',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-025',
    question: 'During central line placement, ultrasound shows the needle tip creating a bright reflection within the vessel lumen. The wire appears as a hyperechoic line. What should you do next?',
    options: [
      'Advance the dilator immediately',
      'Confirm venous placement with blood gas',
      'Remove wire and restart procedure',
      'Advance catheter over wire'
    ],
    correctIndex: 1,
    explanation: 'Even with ultrasound guidance showing proper needle and wire placement, venous blood gas confirmation is essential to ensure venous (not arterial) access before proceeding with dilation and catheter insertion.',
    references: [
      'Troianos CA, et al. Anesth Analg 2011;114:46-72',
      'ASA Practice Guidelines for Central Venous Access 2023'
    ],
    difficulty: 'medium',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-026',
    question: 'BLUE protocol for dyspnea: Anterior lung zones show A-lines, lateral zones show lung rockets (B-lines), DVT scan negative. This pattern suggests:',
    options: [
      'Pneumonia',
      'Pulmonary embolism',
      'Pulmonary edema',
      'Pneumothorax'
    ],
    correctIndex: 2,
    explanation: 'The BLUE protocol: A-lines anteriorly with lung rockets (B-lines) laterally and negative DVT scan indicates pulmonary edema pattern. This helps differentiate from PE (would expect normal lung pattern) or pneumonia (focal consolidation).',
    references: [
      'Lichtenstein D, et al. Chest 2008;134:117-125',
      'Lichtenstein D. Curr Opin Crit Care 2014;20:315-322'
    ],
    difficulty: 'medium',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-027',
    question: 'Abdominal POCUS shows: Distended bladder with 800 mL volume, bilateral hydronephrosis with dilated renal pelvis, and elevated creatinine. What is the most appropriate next step?',
    options: [
      'IV furosemide',
      'Immediate urological consultation',
      'Nephrology referral',
      'Repeat labs in 6 hours'
    ],
    correctIndex: 1,
    explanation: 'The combination of distended bladder, bilateral hydronephrosis, and elevated creatinine indicates obstructive uropathy requiring urgent urological intervention (catheterization or cystoscopy) to prevent permanent kidney damage.',
    references: [
      'Dunnill MS, et al. Kidney Int 1977;12:65-71',
      'AUA Guidelines on Acute Urinary Retention 2023'
    ],
    difficulty: 'easy',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-028',
    question: 'Optic nerve sheath diameter (ONSD) measurement via ultrasound shows: Right eye ONSD 6.8 mm, Left eye ONSD 6.5 mm. What does this suggest?',
    options: [
      'Normal intracranial pressure',
      'Elevated intracranial pressure',
      'Unilateral optic neuritis',
      'Technical measurement error'
    ],
    correctIndex: 1,
    explanation: 'ONSD >5.0 mm (some sources >6.0 mm) suggests elevated intracranial pressure. Both measurements are elevated, indicating increased ICP that may require neurosurgical intervention or ICP monitoring.',
    references: [
      'Dubourg J, et al. Crit Care 2011;15:R79',
      'Rajajee V, et al. Neurocrit Care 2011;15:506-515'
    ],
    difficulty: 'medium',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-029',
    question: 'Soft tissue ultrasound for suspected abscess shows: 3 cm hypoechoic collection with thick irregular walls, internal echoes, and increased vascularity on Doppler. What is the management?',
    options: [
      'Antibiotics only',
      'Incision and drainage',
      'Needle aspiration',
      'CT scan for confirmation'
    ],
    correctIndex: 1,
    explanation: 'Ultrasound findings of hypoechoic collection >2 cm with thick walls and internal echoes indicate mature abscess requiring incision and drainage. Ultrasound guidance can optimize the procedure approach.',
    references: [
      'Sivitz AB, et al. Acad Emerg Med 2016;23:1298-1306',
      'IDSA Guidelines for Skin and Soft Tissue Infections 2024'
    ],
    difficulty: 'easy',
    topicId: 'point-of-care-ultrasound'
  },
  {
    id: 'pocus-030',
    question: 'Gastric ultrasound before intubation shows: Antral cross-sectional area 340 mm² in right lateral decubitus position with visible particulate matter. What is the aspiration risk assessment?',
    options: [
      'Empty stomach - low risk',
      'Clear liquids only - low risk',
      'Solid contents - high aspiration risk',
      'Indeterminate - need CT'
    ],
    correctIndex: 2,
    explanation: 'Antral area >340 mm² with visible particulate matter indicates solid gastric contents with high aspiration risk. This warrants rapid sequence intubation with cricoid pressure and suction readily available.',
    references: [
      'Perlas A, et al. Br J Anaesth 2011;106:224-229',
      'Van de Putte P, et al. Br J Anaesth 2014;113:993-1002'
    ],
    difficulty: 'medium',
    topicId: 'point-of-care-ultrasound'
  }
];