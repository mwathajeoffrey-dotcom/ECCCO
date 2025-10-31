import { Question } from './types';

export const pediatricEmergenciesQuestions: Question[] = [
  {
    id: 'peds-001',
    question: 'A 2-year-old child presents with barking cough, stridor, and fever. What is the most likely diagnosis?',
    options: [
      'Epiglottitis',
      'Croup (laryngotracheobronchitis)',
      'Bacterial tracheitis',
      'Foreign body aspiration'
    ],
    correctIndex: 1,
    explanation: 'Croup (laryngotracheobronchitis) typically presents in children 6 months to 6 years with the classic "barking" cough, inspiratory stridor, and low-grade fever. It\'s usually caused by parainfluenza virus. Treatment includes corticosteroids and nebulized epinephrine for severe cases.',
    references: [
      'Bjornson CL, et al. Croup in children. CMAJ. 2013;185(15):1317-1323',
      'Zoorob R, et al. Croup: an overview. Am Fam Physician. 2011;83(9):1067-1073'
    ],
    difficulty: 'easy',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-002',
    question: 'What is the most appropriate initial fluid bolus for a pediatric patient in shock?',
    options: [
      '10 mL/kg normal saline',
      '20 mL/kg normal saline',
      '30 mL/kg normal saline',
      '40 mL/kg normal saline'
    ],
    correctIndex: 1,
    explanation: 'The initial fluid bolus for pediatric shock is 20 mL/kg of isotonic crystalloid (normal saline or lactated Ringer\'s) given rapidly. This can be repeated up to 60 mL/kg total in the first hour. If shock persists after appropriate fluid resuscitation, consider inotropic support.',
    references: [
      'American Heart Association. Pediatric Advanced Life Support Provider Manual. 2020',
      'Carcillo JA, et al. Clinical practice parameters for hemodynamic support of pediatric and neonatal patients in septic shock'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-003',
    question: 'A 6-month-old infant presents with sudden onset of severe crying, drawing legs up, and vomiting. What is the most likely diagnosis?',
    options: [
      'Colic',
      'Intussusception',
      'Appendicitis',
      'Gastroenteritis'
    ],
    correctIndex: 1,
    explanation: 'Intussusception classically presents in infants 6-18 months with sudden onset severe colicky pain, vomiting, and eventually "currant jelly" stools. The child may draw legs up during episodes. Ultrasound shows the classic "target sign." Treatment includes air or contrast enema reduction.',
    references: [
      'Applegate KE. Intussusception in children: evidence-based diagnosis and treatment',
      'Ito Y, et al. The usefulness of ultrasound for diagnosis of intussusception'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-004',
    question: 'What is the most common cause of bacterial meningitis in children 2 months to 5 years old?',
    options: [
      'Group B Streptococcus',
      'Streptococcus pneumoniae',
      'Neisseria meningitidis',
      'Haemophilus influenzae type b'
    ],
    correctIndex: 1,
    explanation: 'Streptococcus pneumoniae is the most common cause of bacterial meningitis in children 2 months to 5 years old since the introduction of Hib vaccine. Group B Strep is more common in neonates, while N. meningitidis affects older children and adolescents. H. influenzae type b is now rare due to vaccination.',
    references: [
      'Thigpen MC, et al. Bacterial meningitis in the United States, 1998-2007',
      'van de Beek D, et al. Clinical features and prognostic factors in adults with bacterial meningitis'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-005',
    question: 'A 3-year-old child presents with drooling, high fever, and sitting in tripod position. What is the most appropriate immediate action?',
    options: [
      'Examine the throat with tongue depressor',
      'Obtain lateral neck X-ray',
      'Prepare for emergent airway management',
      'Start nebulized epinephrine'
    ],
    correctIndex: 2,
    explanation: 'This presentation is classic for epiglottitis, which can cause rapid airway obstruction. The most important immediate action is to prepare for emergent airway management. Avoid throat examination or procedures that might agitate the child and precipitate complete airway obstruction.',
    references: [
      'Sobol SE, et al. Epiglottitis and croup. Otolaryngol Clin North Am. 2008;41(3):551-566',
      'Berger G, et al. The rising incidence of adult acute epiglottitis and epiglottic abscess'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-006',
    question: 'What is the appropriate dose of epinephrine for anaphylaxis in a 20 kg child?',
    options: [
      '0.1 mg IM',
      '0.2 mg IM',
      '0.3 mg IM',
      '0.5 mg IM'
    ],
    correctIndex: 1,
    explanation: 'The dose of epinephrine for anaphylaxis in children is 0.01 mg/kg IM (maximum 0.5 mg). For a 20 kg child: 0.01 × 20 = 0.2 mg. This is given intramuscularly in the anterolateral thigh. Auto-injectors are available in 0.15 mg and 0.3 mg doses.',
    references: [
      'Lieberman P, et al. The diagnosis and management of anaphylaxis practice parameter: 2010 update',
      'Simons FE, et al. World Allergy Organization guidelines for the assessment and management of anaphylaxis'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-007',
    question: 'A 4-year-old child presents with sudden onset respiratory distress and unilateral decreased breath sounds after running around. What is the most likely diagnosis?',
    options: [
      'Asthma exacerbation',
      'Pneumonia',
      'Foreign body aspiration',
      'Pneumothorax'
    ],
    correctIndex: 2,
    explanation: 'Foreign body aspiration should be suspected in any child with sudden onset respiratory symptoms, especially unilateral findings after activity. The classic presentation includes sudden coughing, choking, or respiratory distress. Bronchoscopy may be needed for diagnosis and removal.',
    references: [
      'Baharloo F, et al. Tracheobronchial foreign bodies: presentation and management in 217 patients',
      'Fidkowski CW, et al. The anesthetic considerations of tracheobronchial foreign bodies in children'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-008',
    question: 'What is the most appropriate initial treatment for a febrile seizure in a 2-year-old child?',
    options: [
      'Rectal diazepam',
      'IV lorazepam',
      'Supportive care and cooling measures',
      'IV phenytoin'
    ],
    correctIndex: 2,
    explanation: 'Most febrile seizures are brief (<5 minutes) and self-limited. Initial treatment focuses on supportive care, ensuring adequate airway, and fever reduction. Anticonvulsants are only indicated if seizure is prolonged (>5 minutes) or recurrent.',
    references: [
      'American Academy of Pediatrics. Febrile seizures: clinical practice guideline for the long-term management of the child with simple febrile seizures',
      'Steering Committee on Quality Improvement and Management. Febrile seizures: guideline for the neurodiagnostic evaluation'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-009',
    question: 'A 6-year-old child presents with sore throat, fever, and a sandpaper-like rash. What is the most likely diagnosis?',
    options: [
      'Viral pharyngitis',
      'Streptococcal pharyngitis (scarlet fever)',
      'Hand, foot, and mouth disease',
      'Roseola'
    ],
    correctIndex: 1,
    explanation: 'Scarlet fever is caused by group A Streptococcus and presents with fever, sore throat, and a characteristic "sandpaper" rash that begins on the chest and spreads. The tongue may be "strawberry" in appearance. Treatment includes penicillin or amoxicillin.',
    references: [
      'Wessels MR. Clinical practice. Streptococcal pharyngitis. N Engl J Med. 2011;364(7):648-655',
      'Shulman ST, et al. Clinical practice guideline for the diagnosis and management of group A streptococcal pharyngitis'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-010',
    question: 'What is the most common cause of sudden infant death syndrome (SIDS)?',
    options: [
      'Respiratory infection',
      'Cardiac arrhythmia',
      'Unknown/multifactorial',
      'Suffocation'
    ],
    correctIndex: 2,
    explanation: 'SIDS is defined as the sudden, unexplained death of an apparently healthy infant less than 1 year old that remains unexplained after thorough investigation. The cause is unknown but likely multifactorial. Risk factors include prone sleeping, smoke exposure, and young maternal age.',
    references: [
      'Moon RY, et al. SIDS and other sleep-related infant deaths: evidence base for 2016 updated recommendations for a safe infant sleeping environment',
      'Kinney HC, et al. The sudden infant death syndrome. N Engl J Med. 2009;361(8):795-805'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-011',
    question: 'A 1-year-old child presents with wheezing, rhinorrhea, and low-grade fever. What is the most likely diagnosis?',
    options: [
      'Asthma',
      'Bronchiolitis',
      'Pneumonia',
      'Croup'
    ],
    correctIndex: 1,
    explanation: 'Bronchiolitis typically affects infants <2 years old and presents with rhinorrhea, cough, wheezing, and low-grade fever. It\'s most commonly caused by respiratory syncytial virus (RSV). Treatment is supportive; bronchodilators and corticosteroids are not routinely recommended.',
    references: [
      'Ralston SL, et al. Clinical practice guideline: the diagnosis, management, and prevention of bronchiolitis',
      'American Academy of Pediatrics Subcommittee on Diagnosis and Management of Bronchiolitis'
    ],
    difficulty: 'easy',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-012',
    question: 'What is the most appropriate antibiotic for treating otitis media in a 2-year-old child?',
    options: [
      'Amoxicillin',
      'Azithromycin',
      'Cephalexin',
      'Trimethoprim-sulfamethoxazole'
    ],
    correctIndex: 0,
    explanation: 'Amoxicillin is the first-line antibiotic for acute otitis media in children. It\'s effective against the most common bacterial pathogens (S. pneumoniae, H. influenzae, M. catarrhalis) and has a good safety profile. High-dose amoxicillin (80-90 mg/kg/day) is recommended.',
    references: [
      'Lieberthal AS, et al. The diagnosis and management of acute otitis media',
      'American Academy of Pediatrics. Clinical practice guideline: the diagnosis and management of acute otitis media'
    ],
    difficulty: 'easy',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-013',
    question: 'A 3-month-old infant presents with projectile vomiting after feeding. What is the most likely diagnosis?',
    options: [
      'Gastroenteritis',
      'Pyloric stenosis',
      'Malrotation with volvulus',
      'Reflux'
    ],
    correctIndex: 1,
    explanation: 'Pyloric stenosis typically presents in infants 2-8 weeks old with progressive projectile vomiting after feeding. The infant is usually hungry and eager to feed again after vomiting. Physical exam may reveal an olive-shaped mass in the epigastrium. Ultrasound confirms the diagnosis.',
    references: [
      'Sola JE, et al. Pyloromyotomy for pyloric stenosis: a review of the literature',
      'Krogh C, et al. Pre- and perinatal risk factors for pyloric stenosis and their interaction with maternal smoking'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-014',
    question: 'What is the most appropriate dose of activated charcoal for a 10 kg child with poisoning?',
    options: [
      '10 grams',
      '25 grams',
      '50 grams',
      '100 grams'
    ],
    correctIndex: 0,
    explanation: 'The dose of activated charcoal for children is 1 g/kg (usual range 0.5-1 g/kg). For a 10 kg child, the appropriate dose would be 10 grams. The maximum single dose is typically 50-100 grams. Activated charcoal should be given within 1-2 hours of ingestion for optimal effectiveness.',
    references: [
      'American Academy of Clinical Toxicology. Position paper: single-dose activated charcoal',
      'Chyka PA, et al. Position paper: single-dose activated charcoal'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-015',
    question: 'A 5-year-old child presents with abdominal pain that migrates from periumbilical to right lower quadrant. What is the most likely diagnosis?',
    options: [
      'Gastroenteritis',
      'Urinary tract infection',
      'Appendicitis',
      'Constipation'
    ],
    correctIndex: 2,
    explanation: 'The classic presentation of appendicitis includes periumbilical pain that migrates to the right lower quadrant (McBurney\'s point), fever, and vomiting. However, children may present atypically, especially younger children. Ultrasound or CT may be needed for diagnosis.',
    references: [
      'Bachur RG, et al. Effect of reduction in the use of computed tomography on clinical outcomes of appendicitis',
      'Kharbanda AB, et al. Validation and refinement of a prediction rule to identify children at low risk for acute appendicitis'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-016',
    question: 'What is the most common cause of non-accidental trauma in children?',
    options: [
      'Shaken baby syndrome',
      'Burns',
      'Fractures',
      'Abdominal trauma'
    ],
    correctIndex: 0,
    explanation: 'Shaken baby syndrome (abusive head trauma) is the most common cause of death from non-accidental trauma in infants. It typically presents with the triad of subdural hematoma, retinal hemorrhages, and encephalopathy. Healthcare providers are mandated reporters of suspected child abuse.',
    references: [
      'Christian CW, et al. Abusive head trauma in infants and children',
      'Keenan HT, et al. A population-based study of inflicted traumatic brain injury in young children'
    ],
    difficulty: 'hard',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-017',
    question: 'A newborn presents with bilious vomiting in the first day of life. What is the most concerning diagnosis?',
    options: [
      'Pyloric stenosis',
      'Gastroenteritis',
      'Malrotation with volvulus',
      'Reflux'
    ],
    correctIndex: 2,
    explanation: 'Bilious vomiting in a newborn is malrotation with midgut volvulus until proven otherwise. This is a surgical emergency that can lead to bowel necrosis and death. Upper GI series is the diagnostic test of choice, but surgical exploration should not be delayed if clinical suspicion is high.',
    references: [
      'Lampl B, et al. Malrotation and midgut volvulus: a historical review and current controversies in diagnosis and management',
      'Applegate KE, et al. Malrotation in children: a problem-solving approach to the upper gastrointestinal series'
    ],
    difficulty: 'hard',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-018',
    question: 'What is the most appropriate initial management for a child with diabetic ketoacidosis?',
    options: [
      'Immediate insulin bolus',
      'Fluid resuscitation',
      'Bicarbonate administration',
      'Glucose administration'
    ],
    correctIndex: 1,
    explanation: 'Initial management of pediatric DKA focuses on fluid resuscitation to restore intravascular volume. Start with 10-20 mL/kg of normal saline. Insulin should be started after initial fluid resuscitation. Bicarbonate is rarely indicated and may worsen cerebral edema risk.',
    references: [
      'Wolfsdorf JI, et al. Diabetic ketoacidosis and hyperglycemic hyperosmolar state: ISPAD Clinical Practice Consensus Guidelines 2018',
      'Koves IH, et al. The accuracy of clinical assessment of dehydration during diabetic ketoacidosis in childhood'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-019',
    question: 'A 6-month-old infant presents with lethargy, poor feeding, and bulging fontanelle. What is the most likely diagnosis?',
    options: [
      'Meningitis',
      'Dehydration',
      'Increased intracranial pressure',
      'Sepsis'
    ],
    correctIndex: 0,
    explanation: 'Meningitis in infants often presents with non-specific symptoms including lethargy, poor feeding, and bulging fontanelle. Fever may be absent in young infants. Lumbar puncture is essential for diagnosis unless contraindicated by increased intracranial pressure.',
    references: [
      'Nigrovic LE, et al. Clinical prediction rule for identifying children with cerebrospinal fluid pleocytosis at very low risk of bacterial meningitis',
      'van de Beek D, et al. Clinical features and prognostic factors in adults with bacterial meningitis'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-020',
    question: 'What is the most appropriate initial dose of adenosine for SVT in a 10 kg infant?',
    options: [
      '1 mg IV',
      '0.1 mg/kg IV',
      '0.2 mg/kg IV',
      '6 mg IV'
    ],
    correctIndex: 1,
    explanation: 'The initial dose of adenosine for pediatric SVT is 0.1 mg/kg IV (maximum 6 mg) given rapidly via central line or as close to the heart as possible. If unsuccessful, the second dose is 0.2 mg/kg (maximum 12 mg). For a 10 kg infant, start with 1 mg.',
    references: [
      'American Heart Association. Pediatric Advanced Life Support Provider Manual. 2020',
      'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients with Supraventricular Tachycardia'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-021',
    question: 'A 8-year-old child presents with sore throat, fever, and a grayish membrane over the tonsils. What is the most likely diagnosis?',
    options: [
      'Streptococcal pharyngitis',
      'Infectious mononucleosis',
      'Diphtheria',
      'Viral pharyngitis'
    ],
    correctIndex: 2,
    explanation: 'Diphtheria presents with sore throat, fever, and a characteristic grayish pseudomembrane over the tonsils and pharynx. It\'s caused by Corynebacterium diphtheriae and can cause airway obstruction. Treatment includes antitoxin and antibiotics. It\'s rare in vaccinated populations.',
    references: [
      'MacGregor RR. Corynebacterium diphtheriae. In: Mandell GL, et al. Principles and Practice of Infectious Diseases',
      'Centers for Disease Control and Prevention. Diphtheria'
    ],
    difficulty: 'hard',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-022',
    question: 'What is the most common cause of pneumonia in children 2-5 years old?',
    options: [
      'Streptococcus pneumoniae',
      'Respiratory syncytial virus',
      'Haemophilus influenzae',
      'Staphylococcus aureus'
    ],
    correctIndex: 0,
    explanation: 'Streptococcus pneumoniae is the most common bacterial cause of pneumonia in children 2-5 years old. Viral causes (RSV, rhinovirus, influenza) are overall more common in this age group. Treatment typically includes amoxicillin as first-line therapy.',
    references: [
      'Bradley JS, et al. The management of community-acquired pneumonia in infants and children older than 3 months of age: clinical practice guidelines by the Pediatric Infectious Diseases Society and the Infectious Diseases Society of America',
      'Jain S, et al. Community-acquired pneumonia requiring hospitalization among U.S. children'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-023',
    question: 'A 4-year-old child presents with sudden onset limp and hip pain. X-rays are normal. What is the most likely diagnosis?',
    options: [
      'Septic arthritis',
      'Legg-Calvé-Perthes disease',
      'Transient synovitis',
      'Slipped capital femoral epiphysis'
    ],
    correctIndex: 2,
    explanation: 'Transient synovitis (toxic synovitis) is the most common cause of acute hip pain in children 3-8 years old. It often follows viral illness and presents with sudden onset limp and hip pain. X-rays are normal, and ultrasound may show effusion. Treatment is supportive.',
    references: [
      'Do TT. Transient synovitis as a cause of painful limps in children',
      'Kocher MS, et al. Differentiating between septic arthritis and transient synovitis of the hip in children'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-024',
    question: 'What is the most appropriate treatment for mild croup in a 2-year-old child?',
    options: [
      'Nebulized epinephrine',
      'Oral dexamethasone',
      'Antibiotics',
      'Observation only'
    ],
    correctIndex: 1,
    explanation: 'Oral dexamethasone (0.15-0.6 mg/kg, maximum 10 mg) is the treatment of choice for mild to moderate croup. It reduces inflammation and symptom duration. Nebulized epinephrine is reserved for severe croup with significant stridor at rest or respiratory distress.',
    references: [
      'Bjornson CL, et al. Croup in children. CMAJ. 2013;185(15):1317-1323',
      'Russell KF, et al. Glucocorticoids for croup. Cochrane Database Syst Rev. 2011;(1):CD001955'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-025',
    question: 'A 1-month-old infant presents with poor feeding, lethargy, and temperature instability. What is the most appropriate initial antibiotic therapy?',
    options: [
      'Ampicillin + gentamicin',
      'Ceftriaxone alone',
      'Vancomycin + cefotaxime',
      'Penicillin + gentamicin'
    ],
    correctIndex: 0,
    explanation: 'For neonatal sepsis (age <1 month), the empirical antibiotic therapy is ampicillin + gentamicin to cover Group B Streptococcus, E. coli, and Listeria monocytogenes. Ceftriaxone should be avoided in neonates due to risk of kernicterus from bilirubin displacement.',
    references: [
      'Polin RA, et al. Management of neonates with suspected or proven early-onset bacterial sepsis',
      'Committee on Infectious Diseases and Committee on Fetus and Newborn. Policy statement: recommendations for the prevention of perinatal group B streptococcal disease'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-026',
    question: 'What is the most common cause of cardiac arrest in children?',
    options: [
      'Ventricular fibrillation',
      'Respiratory failure',
      'Congenital heart disease',
      'Arrhythmias'
    ],
    correctIndex: 1,
    explanation: 'Respiratory failure is the most common cause of cardiac arrest in children, unlike adults where primary cardiac causes predominate. This emphasizes the importance of early recognition and treatment of respiratory distress in pediatric patients.',
    references: [
      'American Heart Association. Pediatric Advanced Life Support Provider Manual. 2020',
      'Berg MD, et al. Part 13: pediatric basic life support: 2010 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-027',
    question: 'A 6-year-old child presents with sudden onset severe abdominal pain and vomiting. Ultrasound shows a "target sign." What is the most likely diagnosis?',
    options: [
      'Appendicitis',
      'Intussusception',
      'Pyloric stenosis',
      'Malrotation'
    ],
    correctIndex: 1,
    explanation: 'The "target sign" or "donut sign" on ultrasound is pathognomonic for intussusception. This represents the telescoped bowel within bowel. Intussusception can occur in older children, often with a lead point such as lymphoma or Meckel\'s diverticulum.',
    references: [
      'Applegate KE. Intussusception in children: evidence-based diagnosis and treatment',
      'Ito Y, et al. The usefulness of ultrasound for diagnosis of intussusception'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-028',
    question: 'What is the most appropriate compression-to-ventilation ratio for single-rescuer pediatric CPR?',
    options: [
      '15:2',
      '30:2',
      '5:1',
      '3:1'
    ],
    correctIndex: 1,
    explanation: 'For single-rescuer pediatric CPR (children >1 year), the compression-to-ventilation ratio is 30:2, same as adult CPR. For two-rescuer pediatric CPR, the ratio is 15:2. For newborns, the ratio is 3:1.',
    references: [
      'American Heart Association. Pediatric Advanced Life Support Provider Manual. 2020',
      'Berg MD, et al. Part 13: pediatric basic life support: 2010 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-029',
    question: 'A 2-week-old infant presents with poor feeding and appears dusky during feeding. What is the most likely diagnosis?',
    options: [
      'Sepsis',
      'Congenital heart disease',
      'Pneumonia',
      'Gastroesophageal reflux'
    ],
    correctIndex: 1,
    explanation: 'Poor feeding and cyanosis during feeding in a newborn suggests congenital heart disease, particularly ductal-dependent lesions. The infant may appear relatively well at rest but develop symptoms with increased oxygen demand during feeding. Echocardiogram is diagnostic.',
    references: [
      'Mahle WT, et al. Role of pulse oximetry in examining newborns for congenital heart disease: a scientific statement from the American Heart Association and American Academy of Pediatrics',
      'Hoffman JI, et al. The incidence of congenital heart disease'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  },
  {
    id: 'peds-030',
    question: 'What is the most common location for foreign body impaction in the pediatric airway?',
    options: [
      'Larynx',
      'Right main bronchus',
      'Left main bronchus',
      'Trachea'
    ],
    correctIndex: 1,
    explanation: 'The right main bronchus is the most common location for foreign body impaction in children due to its more vertical orientation and larger diameter compared to the left main bronchus. Foreign bodies tend to fall into the path of least resistance.',
    references: [
      'Baharloo F, et al. Tracheobronchial foreign bodies: presentation and management in 217 patients',
      'Fidkowski CW, et al. The anesthetic considerations of tracheobronchial foreign bodies in children'
    ],
    difficulty: 'medium',
    topicId: 'pediatric-emergencies'
  }
];