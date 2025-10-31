import { Question } from './types';

export const geriatricEmergenciesQuestions: Question[] = [
  {
    id: 'geri-001',
    question: 'An 85-year-old patient presents with confusion, urinary incontinence, and difficulty walking that developed over 2 days. What is the most likely diagnosis?',
    options: [
      'Stroke',
      'Urinary tract infection',
      'Normal pressure hydrocephalus',
      'Medication toxicity'
    ],
    correctIndex: 1,
    explanation: 'In elderly patients, UTI can present atypically with confusion, behavioral changes, and functional decline rather than classic urinary symptoms. The triad of confusion, incontinence, and gait disturbance in an acute setting is highly suggestive of UTI in the elderly.',
    references: [
      'Rowe TA, et al. Urinary tract infection in older adults. Aging health. 2013;9(5):519-528',
      'Nicolle LE, et al. Clinical practice guideline for the management of asymptomatic bacteriuria: 2019 update by the Infectious Diseases Society of America'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-002',
    question: 'A 78-year-old patient on warfarin presents after a fall with suspected hip fracture. INR is 4.2. What is the most appropriate management?',
    options: [
      'Proceed to surgery immediately',
      'Give vitamin K and delay surgery',
      'Give fresh frozen plasma and proceed to surgery',
      'Give prothrombin complex concentrate and proceed to surgery'
    ],
    correctIndex: 3,
    explanation: 'For urgent surgery in patients with elevated INR, prothrombin complex concentrate (PCC) provides rapid reversal of anticoagulation (within 15-30 minutes) compared to FFP or vitamin K. PCC is preferred for emergency reversal before time-sensitive procedures.',
    references: [
      'Keeling D, et al. Guidelines on oral anticoagulation with warfarin - fourth edition',
      'Sarode R, et al. Efficacy and safety of a 4-factor prothrombin complex concentrate in patients on vitamin K antagonists presenting with major bleeding'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-003',
    question: 'An 82-year-old nursing home resident presents with altered mental status and hypotension. Temperature is 96.5°F (35.8°C). What should be considered?',
    options: [
      'Hypothermia exposure',
      'Sepsis with blunted fever response',
      'Medication overdose',
      'Stroke'
    ],
    correctIndex: 1,
    explanation: 'Elderly patients, especially those in nursing homes, may present with sepsis without fever or with hypothermia. The absence of fever does not rule out serious infection in older adults. Altered mental status and hypotension may be the only signs.',
    references: [
      'Gavazzi G, et al. Ageing and infection. Lancet Infect Dis. 2002;2(11):659-666',
      'High KP, et al. Clinical practice guideline for the evaluation of fever and infection in older adult residents of long-term care facilities'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-004',
    question: 'A 75-year-old patient with diabetes presents with painless loss of vision in one eye that occurred suddenly. What is the most likely diagnosis?',
    options: [
      'Diabetic retinopathy',
      'Central retinal artery occlusion',
      'Acute glaucoma',
      'Retinal detachment'
    ],
    correctIndex: 1,
    explanation: 'Sudden, painless, complete loss of vision in elderly patients suggests central retinal artery occlusion (CRAO). This is an ophthalmologic emergency requiring immediate treatment to restore perfusion. Risk factors include diabetes, hypertension, and cardiovascular disease.',
    references: [
      'Hayreh SS, et al. Central retinal artery occlusion: retinal survival time. Exp Eye Res. 1980;30(6):677-688',
      'Varma DD, et al. A review of central retinal artery occlusion: clinical presentation and management'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-005',
    question: 'An 80-year-old patient presents with severe abdominal pain but has a soft, non-tender abdomen on examination. What should be considered?',
    options: [
      'Gastroenteritis',
      'Mesenteric ischemia',
      'Constipation',
      'Anxiety'
    ],
    correctIndex: 1,
    explanation: 'Mesenteric ischemia classically presents with severe abdominal pain out of proportion to physical examination findings. This is more common in elderly patients with atrial fibrillation, heart failure, or other cardiovascular disease. Early diagnosis is crucial.',
    references: [
      'Oldenburg WA, et al. Acute mesenteric ischemia: a clinical review. Arch Intern Med. 2004;164(10):1054-1062',
      'Bala M, et al. Acute mesenteric ischemia: guidelines of the World Society of Emergency Surgery'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-006',
    question: 'A 70-year-old patient presents with sudden onset severe headache and neck stiffness. CT scan is normal. What is the next most appropriate step?',
    options: [
      'Discharge with follow-up',
      'MRI brain',
      'Lumbar puncture',
      'Repeat CT in 6 hours'
    ],
    correctIndex: 2,
    explanation: 'Normal CT does not rule out subarachnoid hemorrhage, especially in elderly patients where blood may be harder to detect. Lumbar puncture is indicated to look for xanthochromia and red blood cells. CT angiography may also be considered.',
    references: [
      'Perry JJ, et al. Sensitivity of computed tomography performed within six hours of onset of headache for subarachnoid hemorrhage: prospective cohort study',
      'Dupont SA, et al. Six-hour rule for CT scan in acute subarachnoid hemorrhage'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-007',
    question: 'An 85-year-old patient presents with syncope. Which medication class is most likely to cause this in the elderly?',
    options: [
      'ACE inhibitors',
      'Beta blockers',
      'Diuretics',
      'All of the above'
    ],
    correctIndex: 3,
    explanation: 'All these medication classes can cause syncope in elderly patients through different mechanisms: ACE inhibitors (hypotension), beta blockers (bradycardia), and diuretics (volume depletion). Polypharmacy increases the risk of drug-induced syncope.',
    references: [
      'Galizia G, et al. Syncope in the elderly: an updated systematic review. Geriatr Gerontol Int. 2013;13(2):310-317',
      'Ruwald MH, et al. The relation between age, sex, comorbidity, and pharmacotherapy and the risk of syncope'
    ],
    difficulty: 'easy',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-008',
    question: 'A 76-year-old patient presents with acute shortness of breath and bilateral leg swelling. BNP is elevated. What is the most appropriate initial treatment?',
    options: [
      'IV furosemide',
      'Nitroglycerin',
      'Noninvasive positive pressure ventilation',
      'Immediate intubation'
    ],
    correctIndex: 2,
    explanation: 'Noninvasive positive pressure ventilation (BiPAP/CPAP) is the most appropriate initial treatment for acute heart failure with respiratory distress in elderly patients. It improves outcomes and may avoid the need for intubation.',
    references: [
      'Masip J, et al. Non-invasive ventilation in acute cardiogenic pulmonary edema: systematic review and meta-analysis',
      'Yancy CW, et al. 2017 ACC/AHA/HFSA Focused Update of the 2013 ACCF/AHA Guideline for the Management of Heart Failure'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-009',
    question: 'An 88-year-old patient with dementia becomes agitated and combative. What is the most appropriate first-line intervention?',
    options: [
      'Haloperidol 5mg IM',
      'Lorazepam 2mg IV',
      'Non-pharmacologic de-escalation',
      'Physical restraints'
    ],
    correctIndex: 2,
    explanation: 'Non-pharmacologic de-escalation should always be attempted first in elderly patients with dementia-related agitation. This includes environmental modifications, redirection, and calming techniques. Medications should be used only when necessary due to increased sensitivity and side effects.',
    references: [
      'Salzman C, et al. Elderly patients with dementia-related symptoms of severe agitation and aggression: consensus statement on treatment options, clinical trials methodology, and policy',
      'American Geriatrics Society. American Geriatrics Society 2015 updated beers criteria for potentially inappropriate medication use in older adults'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-010',
    question: 'A 72-year-old patient presents with hip pain after a fall. X-rays show no fracture but the patient cannot bear weight. What should be considered?',
    options: [
      'Discharge with pain medication',
      'MRI to rule out occult fracture',
      'Physical therapy referral',
      'Psychiatric evaluation'
    ],
    correctIndex: 1,
    explanation: 'Occult hip fractures (not visible on plain X-rays) occur in up to 10% of elderly patients with hip pain after trauma. MRI is the gold standard for detecting these fractures, which require surgical intervention.',
    references: [
      'Lubovsky O, et al. MRI for unsuspected hip fractures in elderly patients: should we make it a routine?',
      'Cannon J, et al. Diagnosis of adulthood hip fractures. Am Fam Physician. 2018;97(11):727-734'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-011',
    question: 'An 81-year-old patient presents with nausea, vomiting, and yellow-green vision. They take digoxin for atrial fibrillation. What is the most likely diagnosis?',
    options: [
      'Gastroenteritis',
      'Digoxin toxicity',
      'Glaucoma',
      'Cataracts'
    ],
    correctIndex: 1,
    explanation: 'Yellow-green vision (xanthopsia) is a classic sign of digoxin toxicity, along with nausea and vomiting. Elderly patients are at higher risk due to decreased renal function and drug interactions. Digoxin levels and ECG should be checked.',
    references: [
      'Bauman JL, et al. Digoxin toxicity. Drug Saf. 2006;29(4):279-301',
      'Lown B, et al. Current concepts: digitalis intoxication'
    ],
    difficulty: 'easy',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-012',
    question: 'A 79-year-old patient presents with weakness and fatigue. Sodium is 118 mEq/L. They take hydrochlorothiazide. What is the most appropriate treatment?',
    options: [
      '3% hypertonic saline',
      'Normal saline',
      'Discontinue HCTZ and fluid restriction',
      'Oral salt tablets'
    ],
    correctIndex: 2,
    explanation: 'Thiazide-induced hyponatremia in elderly patients is usually chronic and asymptomatic. The most appropriate treatment is discontinuing the offending drug and fluid restriction. Rapid correction with hypertonic saline is reserved for symptomatic severe hyponatremia.',
    references: [
      'Liamis G, et al. A review of drug-induced hyponatremia',
      'Spasovski G, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-013',
    question: 'A 74-year-old patient presents with chest pain. Troponin is elevated but ECG is normal. What is the most likely diagnosis?',
    options: [
      'STEMI',
      'NSTEMI',
      'Pulmonary embolism',
      'Aortic dissection'
    ],
    correctIndex: 1,
    explanation: 'NSTEMI (non-ST elevation myocardial infarction) is more common in elderly patients than STEMI. It presents with elevated cardiac markers but without ST elevation on ECG. Elderly patients may have atypical presentations of ACS.',
    references: [
      'Alexander KP, et al. Acute coronary care in the elderly, part I: Non-ST-segment-elevation acute coronary syndromes',
      'Rosengren A, et al. Age, clinical presentation, and outcome of acute coronary syndromes in the Euroheart acute coronary syndrome survey'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-014',
    question: 'An 83-year-old patient presents with progressive shortness of breath over weeks. They have a new systolic murmur. What is the most likely diagnosis?',
    options: [
      'Mitral regurgitation',
      'Aortic stenosis',
      'Tricuspid regurgitation',
      'Pulmonary stenosis'
    ],
    correctIndex: 1,
    explanation: 'Aortic stenosis is common in elderly patients and presents with progressive dyspnea, chest pain, and syncope. The murmur is typically a harsh systolic murmur best heard at the right sternal border. Echocardiography is diagnostic.',
    references: [
      'Nishimura RA, et al. 2017 AHA/ACC Focused Update of the 2014 AHA/ACC Guideline for the Management of Patients With Valvular Heart Disease',
      'Carabello BA, et al. Aortic stenosis. Lancet. 2009;373(9667):956-966'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-015',
    question: 'A 77-year-old patient presents with sudden onset severe back pain and hypotension. What is the most concerning diagnosis?',
    options: [
      'Kidney stones',
      'Aortic dissection',
      'Abdominal aortic aneurysm rupture',
      'Musculoskeletal pain'
    ],
    correctIndex: 2,
    explanation: 'The combination of severe back pain and hypotension in an elderly patient is highly concerning for ruptured abdominal aortic aneurysm. This is a surgical emergency with high mortality. Immediate vascular surgery consultation is needed.',
    references: [
      'Chaikof EL, et al. The Society for Vascular Surgery practice guidelines on the care of patients with an abdominal aortic aneurysm',
      'Aggarwal S, et al. Abdominal aortic aneurysm: a comprehensive review'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-016',
    question: 'An 86-year-old patient with Parkinson\'s disease is brought in by family for worsening rigidity and altered mental status. What medication change likely precipitated this?',
    options: [
      'Starting levodopa',
      'Stopping levodopa abruptly',
      'Adding carbidopa',
      'Reducing levodopa dose'
    ],
    correctIndex: 1,
    explanation: 'Abrupt discontinuation of levodopa can precipitate neuroleptic malignant-like syndrome (parkinsonism-hyperpyrexia syndrome) with severe rigidity, altered mental status, and hyperthermia. Gradual tapering is essential when discontinuing parkinsonian medications.',
    references: [
      'Keyser DL, et al. Neuroleptic malignant syndrome in Parkinson\'s disease after withdrawal or alteration of dopaminergic therapy',
      'Frucht S, et al. The clinical spectrum of the neuroleptic malignant syndrome'
    ],
    difficulty: 'hard',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-017',
    question: 'A 75-year-old patient presents with painless jaundice and weight loss. What is the most concerning diagnosis?',
    options: [
      'Hepatitis',
      'Choledocholithiasis',
      'Pancreatic cancer',
      'Cholangitis'
    ],
    correctIndex: 2,
    explanation: 'Painless jaundice with weight loss in elderly patients is highly suspicious for malignancy, particularly pancreatic cancer (Courvoisier\'s sign). This requires urgent evaluation with imaging and possible ERCP or surgical consultation.',
    references: [
      'Shaib Y, et al. The epidemiology of pancreatic cancer: a global perspective',
      'Vincent A, et al. Pancreatic cancer. Lancet. 2011;378(9791):607-620'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-018',
    question: 'An 82-year-old patient presents with severe headache and jaw claudication. ESR is markedly elevated. What is the most appropriate immediate treatment?',
    options: [
      'Aspirin',
      'High-dose corticosteroids',
      'Antibiotics',
      'Analgesics only'
    ],
    correctIndex: 1,
    explanation: 'This presentation suggests giant cell arteritis (temporal arteritis). High-dose corticosteroids should be started immediately to prevent blindness. Temporal artery biopsy can be performed within 1-2 weeks after starting steroids without affecting results.',
    references: [
      'Dasgupta B, et al. 2012 Provisional classification criteria for polymyalgia rheumatica: a European League Against Rheumatism/American College of Rheumatology collaborative initiative',
      'Bienvenu B, et al. Management of giant cell arteritis: recommendations of the French Study Group for Large Vessel Vasculitis'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-019',
    question: 'A 78-year-old patient with diabetes presents with severe foot pain and black discoloration of toes. What is the most likely diagnosis?',
    options: [
      'Diabetic neuropathy',
      'Cellulitis',
      'Critical limb ischemia',
      'Frostbite'
    ],
    correctIndex: 2,
    explanation: 'Black discoloration of toes with severe pain suggests critical limb ischemia with tissue necrosis. This is a vascular emergency requiring immediate vascular surgery evaluation for possible revascularization to save the limb.',
    references: [
      'Norgren L, et al. Inter-Society Consensus for the Management of Peripheral Arterial Disease (TASC II)',
      'Gerhard-Herman MD, et al. 2016 AHA/ACC Guideline on the Management of Patients With Lower Extremity Peripheral Artery Disease'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-020',
    question: 'An 80-year-old patient presents with gradual onset confusion and family reports personality changes over several weeks. What imaging study is most appropriate?',
    options: [
      'CT head without contrast',
      'CT head with contrast',
      'MRI brain',
      'PET scan'
    ],
    correctIndex: 2,
    explanation: 'Gradual onset confusion with personality changes suggests a space-occupying lesion or chronic subdural hematoma. MRI brain is more sensitive than CT for detecting these conditions, especially chronic subdural hematomas and small masses.',
    references: [
      'Knudsen KA, et al. Clinical diagnosis of dementia: a review of the literature and the impact of new diagnostic criteria',
      'Petersen RC, et al. Alzheimer\'s disease neuroimaging initiative (ADNI): clinical characterization'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-021',
    question: 'A 73-year-old patient on multiple medications presents with constipation, dry mouth, and urinary retention. What type of medication effect is this?',
    options: [
      'Sympathomimetic',
      'Anticholinergic',
      'Beta-blocking',
      'Alpha-blocking'
    ],
    correctIndex: 1,
    explanation: 'The triad of constipation, dry mouth, and urinary retention suggests anticholinergic toxicity. Many medications have anticholinergic effects (tricyclics, antihistamines, antipsychotics) and elderly patients are particularly susceptible to these effects.',
    references: [
      'Tune LE. Anticholinergic effects of medication in elderly patients',
      'American Geriatrics Society. American Geriatrics Society 2015 updated beers criteria for potentially inappropriate medication use in older adults'
    ],
    difficulty: 'easy',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-022',
    question: 'A 76-year-old patient presents with severe diarrhea and dehydration after completing a course of antibiotics. What is the most likely diagnosis?',
    options: [
      'Viral gastroenteritis',
      'C. difficile colitis',
      'Inflammatory bowel disease',
      'Lactose intolerance'
    ],
    correctIndex: 1,
    explanation: 'Antibiotic-associated diarrhea in elderly patients raises strong suspicion for C. difficile colitis. This can progress to toxic megacolon and has higher mortality in elderly patients. Stool testing for C. difficile toxin should be performed urgently.',
    references: [
      'McDonald LC, et al. Clinical Practice Guidelines for Clostridium difficile Infection in Adults and Children: 2017 Update by the Infectious Diseases Society of America',
      'Pepin J, et al. Clostridium difficile-associated diarrhea in a region of Quebec from 1991 to 2003: a changing pattern of disease severity'
    ],
    difficulty: 'easy',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-023',
    question: 'An 84-year-old patient presents with falls and hip fracture. What medication class is most associated with increased fall risk?',
    options: [
      'ACE inhibitors',
      'Statins',
      'Benzodiazepines',
      'Proton pump inhibitors'
    ],
    correctIndex: 2,
    explanation: 'Benzodiazepines significantly increase fall risk in elderly patients due to sedation, muscle relaxation, and cognitive impairment. They should be avoided in elderly patients whenever possible due to these risks.',
    references: [
      'Leipzig RM, et al. Drugs and falls in older people: a systematic review and meta-analysis: I. Psychotropic drugs',
      'American Geriatrics Society. American Geriatrics Society 2015 updated beers criteria for potentially inappropriate medication use in older adults'
    ],
    difficulty: 'easy',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-024',
    question: 'A 77-year-old patient presents with weakness, fatigue, and pale conjunctiva. Hemoglobin is 7.2 g/dL. What is the most important initial evaluation?',
    options: [
      'Bone marrow biopsy',
      'Stool for occult blood',
      'B12 and folate levels',
      'Reticulocyte count'
    ],
    correctIndex: 1,
    explanation: 'Iron deficiency anemia in elderly patients is often due to gastrointestinal bleeding. Stool for occult blood and evaluation for GI malignancy (colonoscopy, upper endoscopy) are essential. Never assume iron deficiency is dietary in elderly patients.',
    references: [
      'Goddard AF, et al. Guidelines for the management of iron deficiency anaemia',
      'Rockey DC, et al. Evaluation of the gastrointestinal tract in patients with iron-deficiency anemia'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-025',
    question: 'An 81-year-old patient presents with acute leg swelling and pain. D-dimer is elevated. What imaging study is most appropriate?',
    options: [
      'Venous ultrasound',
      'CT pulmonary angiogram',
      'MR venography',
      'Conventional venography'
    ],
    correctIndex: 0,
    explanation: 'Venous ultrasound is the first-line imaging for suspected deep vein thrombosis. While D-dimer is often elevated in elderly patients due to various conditions, clinical suspicion and ultrasound remain the cornerstone of DVT diagnosis.',
    references: [
      'Kearon C, et al. Antithrombotic therapy for VTE disease: CHEST Guideline and Expert Panel Report',
      'Wells PS, et al. Value of assessment of pretest probability of deep-vein thrombosis in clinical management'
    ],
    difficulty: 'easy',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-026',
    question: 'A 79-year-old patient with heart failure presents with worsening dyspnea. BUN is 80 mg/dL, creatinine 2.8 mg/dL. What is the most likely cause?',
    options: [
      'Acute kidney injury',
      'Cardiorenal syndrome',
      'Medication nephrotoxicity',
      'Dehydration'
    ],
    correctIndex: 1,
    explanation: 'Cardiorenal syndrome describes the complex interaction between heart failure and kidney dysfunction. Worsening heart failure can lead to decreased renal perfusion and acute kidney injury, while kidney dysfunction can worsen heart failure.',
    references: [
      'Ronco C, et al. Cardiorenal syndrome. J Am Coll Cardiol. 2008;52(19):1527-1539',
      'Rangaswami J, et al. Cardiorenal Syndrome: Classification, Pathophysiology, Diagnosis, and Treatment Strategies'
    ],
    difficulty: 'hard',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-027',
    question: 'An 85-year-old patient presents with seizure-like activity but remains conscious and responsive. What is the most likely diagnosis?',
    options: [
      'Focal seizure',
      'Pseudoseizure',
      'Stroke',
      'Medication toxicity'
    ],
    correctIndex: 0,
    explanation: 'Focal (partial) seizures can occur without loss of consciousness (simple partial seizures) or with altered consciousness (complex partial seizures). In elderly patients, new-onset seizures require evaluation for structural brain lesions.',
    references: [
      'Brodie MJ, et al. Epilepsy in later life. Lancet Neurol. 2009;8(11):1019-1030',
      'Ramsay RE, et al. Special considerations in treating the elderly patient with epilepsy'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-028',
    question: 'A 74-year-old patient presents with severe back pain and new neurologic deficits in legs. What is the most urgent consideration?',
    options: [
      'Lumbar strain',
      'Spinal stenosis',
      'Cauda equina syndrome',
      'Sciatica'
    ],
    correctIndex: 2,
    explanation: 'New neurologic deficits with severe back pain suggest cauda equina syndrome, which is a surgical emergency. This can be caused by disc herniation, spinal stenosis, or malignancy. Urgent MRI and neurosurgical consultation are needed.',
    references: [
      'Ahn UM, et al. Cauda equina syndrome secondary to lumbar disc herniation: a meta-analysis of surgical outcomes',
      'Shapiro S. Medical realities of cauda equina syndrome secondary to lumbar disc herniation'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-029',
    question: 'An 82-year-old patient presents with shortness of breath and bilateral lower extremity edema. Chest X-ray shows bilateral pleural effusions. What is the most likely diagnosis?',
    options: [
      'Pneumonia',
      'Heart failure',
      'Malignancy',
      'Pulmonary embolism'
    ],
    correctIndex: 1,
    explanation: 'Bilateral pleural effusions with peripheral edema in elderly patients most commonly indicate heart failure. The effusions are typically transudative. BNP or NT-proBNP levels can help confirm the diagnosis.',
    references: [
      'Light RW. Clinical practice. Pleural effusion. N Engl J Med. 2002;346(25):1971-1977',
      'Yancy CW, et al. 2013 ACCF/AHA guideline for the management of heart failure'
    ],
    difficulty: 'easy',
    topicId: 'geriatric-emergencies'
  },
  {
    id: 'geri-030',
    question: 'A 78-year-old patient presents with altered mental status and appears malnourished. Family reports poor oral intake. What vitamin deficiency should be considered?',
    options: [
      'Vitamin B1 (thiamine)',
      'Vitamin B12',
      'Vitamin D',
      'Vitamin C'
    ],
    correctIndex: 0,
    explanation: 'Thiamine deficiency can cause acute altered mental status (Wernicke encephalopathy) and should be considered in malnourished elderly patients. Thiamine should be given before glucose administration to prevent worsening of the condition.',
    references: [
      'Thomson AD, et al. The evolution and treatment of Korsakoff\'s syndrome: out of sight, out of mind?',
      'Sechi G, et al. Wernicke\'s encephalopathy: new clinical settings and recent advances in diagnosis and management'
    ],
    difficulty: 'medium',
    topicId: 'geriatric-emergencies'
  }
];