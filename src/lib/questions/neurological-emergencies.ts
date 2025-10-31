import { Question } from './types';

export const neurologicalEmergenciesQuestions: Question[] = [
  {
    id: 'neuro-001',
    question: 'A 45-year-old patient presents with sudden onset severe headache described as "the worst headache of my life." What is the most likely diagnosis?',
    options: [
      'Migraine headache',
      'Tension headache',
      'Subarachnoid hemorrhage',
      'Cluster headache'
    ],
    correctIndex: 2,
    explanation: 'Sudden onset severe headache described as "thunderclap" or "worst headache of life" is classic for subarachnoid hemorrhage (SAH). SAH requires immediate evaluation with CT head (non-contrast) and lumbar puncture if CT is negative. Time-sensitive diagnosis as delayed treatment increases mortality.',
    references: [
      'Connolly ES Jr, et al. Guidelines for the management of aneurysmal subarachnoid hemorrhage: a guideline for healthcare professionals from the American Heart Association/American Stroke Association',
      'Hemphill JC 3rd, et al. Guidelines for the Management of Spontaneous Intracerebral Hemorrhage: A Guideline for Healthcare Professionals From the American Heart Association/American Stroke Association'
    ],
    difficulty: 'easy',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-002',
    question: 'What is the time window for IV alteplase administration in acute ischemic stroke?',
    options: [
      '3 hours from symptom onset',
      '4.5 hours from symptom onset',
      '6 hours from symptom onset',
      '8 hours from symptom onset'
    ],
    correctIndex: 1,
    explanation: 'IV alteplase can be administered up to 4.5 hours from symptom onset in eligible patients with acute ischemic stroke. The 3-hour window was the original approved timeframe, but studies showed benefit up to 4.5 hours. Endovascular therapy can be considered up to 6-24 hours in selected patients.',
    references: [
      'Powers WJ, et al. Guidelines for the Early Management of Patients With Acute Ischemic Stroke: 2019 Update to the 2018 Guidelines. Stroke. 2019;50(12):e344-e418',
      'Hacke W, et al. Thrombolysis with alteplase 3 to 4.5 hours after acute ischemic stroke. N Engl J Med. 2008;359(13):1317-1329'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-003',
    question: 'A patient presents with right-sided weakness and aphasia. The CT shows no hemorrhage. NIHSS score is 18. What is the most appropriate treatment?',
    options: [
      'Aspirin 325mg',
      'IV alteplase if within time window',
      'Clopidogrel 75mg',
      'Heparin infusion'
    ],
    correctIndex: 1,
    explanation: 'With a high NIHSS score (18) indicating severe stroke, IV alteplase should be considered if the patient is within the time window and has no contraindications. Large vessel occlusion should also be suspected, and the patient may be a candidate for endovascular therapy. Aspirin is held if thrombolytics are given.',
    references: [
      'Powers WJ, et al. 2018 Guidelines for the Early Management of Patients With Acute Ischemic Stroke',
      'Goyal M, et al. Endovascular thrombectomy after large-vessel ischaemic stroke: a meta-analysis of individual patient data'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-004',
    question: 'What is the first-line medication for status epilepticus in the emergency department?',
    options: [
      'Phenytoin 20mg/kg IV',
      'Lorazepam 0.1mg/kg IV',
      'Diazepam 10mg IV',
      'Levetiracetam 60mg/kg IV'
    ],
    correctIndex: 1,
    explanation: 'Lorazepam 0.1mg/kg IV (typically 4mg in adults) is the first-line treatment for status epilepticus. It has a longer duration of action compared to diazepam due to less redistribution. If seizures continue, a second dose can be given, followed by antiepileptic drugs like phenytoin or levetiracetam.',
    references: [
      'Glauser T, et al. Evidence-based guideline: treatment of convulsive status epilepticus in children and adults: report of the Guideline Committee of the American Epilepsy Society',
      'Brophy GM, et al. Guidelines for the evaluation and management of status epilepticus. Neurocrit Care. 2012;17(1):3-23'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-005',
    question: 'A 25-year-old patient presents with severe headache, fever, neck stiffness, and photophobia. What is the most appropriate initial antibiotic therapy?',
    options: [
      'Ampicillin alone',
      'Ceftriaxone alone',
      'Vancomycin + ceftriaxone',
      'Vancomycin + ceftriaxone + ampicillin'
    ],
    correctIndex: 3,
    explanation: 'For suspected bacterial meningitis in adults, empirical therapy should include vancomycin + ceftriaxone + ampicillin. Vancomycin covers resistant S. pneumoniae, ceftriaxone covers gram-negative bacteria and sensitive S. pneumoniae, and ampicillin covers Listeria monocytogenes (especially important in patients >50 years, immunocompromised, or pregnant).',
    references: [
      'Tunkel AR, et al. 2004 Practice guidelines for the management of bacterial meningitis. Clin Infect Dis. 2004;39(9):1267-1284',
      'van de Beek D, et al. Clinical features and prognostic factors in adults with bacterial meningitis. N Engl J Med. 2004;351(18):1849-1859'
    ],
    difficulty: 'hard',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-006',
    question: 'What is the Glasgow Coma Scale score for a patient who opens eyes to pain, gives inappropriate verbal responses, and shows abnormal flexion to pain?',
    options: [
      'GCS 6',
      'GCS 7',
      'GCS 8',
      'GCS 9'
    ],
    correctIndex: 2,
    explanation: 'Eyes opening to pain = 2 points, inappropriate verbal response = 3 points, abnormal flexion (decorticate posturing) = 3 points. Total GCS = 2 + 3 + 3 = 8. GCS ≤8 indicates severe brain injury and typically requires airway protection and intubation.',
    references: [
      'Teasdale G, Jennett B. Assessment of coma and impaired consciousness. A practical scale. Lancet. 1974;2(7872):81-84',
      'McNett M. A review of the predictive ability of Glasgow Coma Scale scores in head-injured patients'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-007',
    question: 'A patient with known epilepsy presents in status epilepticus. Lorazepam 4mg IV was given twice without effect. What is the next most appropriate treatment?',
    options: [
      'Diazepam 10mg IV',
      'Phenytoin 20mg/kg IV',
      'Propofol infusion',
      'Midazolam 10mg IM'
    ],
    correctIndex: 1,
    explanation: 'After two doses of benzodiazepines fail to control status epilepticus, the next step is a second-line antiepileptic drug. Phenytoin 20mg/kg IV (or fosphenytoin 20 PE/kg) is appropriate. Alternative second-line options include levetiracetam 60mg/kg IV or valproic acid 40mg/kg IV.',
    references: [
      'Glauser T, et al. Evidence-based guideline: treatment of convulsive status epilepticus in children and adults',
      'Kapur J, et al. Randomized trial of three anticonvulsant medications for status epilepticus. N Engl J Med. 2019;381(22):2103-2113'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-008',
    question: 'What is the target systolic blood pressure for a patient with acute intracerebral hemorrhage?',
    options: [
      '<140 mmHg',
      '<160 mmHg',
      '<180 mmHg',
      '<200 mmHg'
    ],
    correctIndex: 0,
    explanation: 'For patients with acute intracerebral hemorrhage and systolic BP 150-220 mmHg, rapid lowering to <140 mmHg is safe and may improve functional outcomes. The INTERACT2 trial showed that intensive BP lowering to <140 mmHg reduced hematoma expansion and improved functional outcomes.',
    references: [
      'Hemphill JC 3rd, et al. Guidelines for the Management of Spontaneous Intracerebral Hemorrhage: A Guideline for Healthcare Professionals From the American Heart Association/American Stroke Association',
      'Anderson CS, et al. Rapid blood-pressure lowering in patients with acute intracerebral hemorrhage. N Engl J Med. 2013;368(25):2355-2365'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-009',
    question: 'A 70-year-old patient presents with sudden onset vertigo, nausea, and ataxia. What is the most concerning diagnosis to rule out?',
    options: [
      'Benign paroxysmal positional vertigo',
      'Vestibular neuritis',
      'Ménière disease',
      'Posterior circulation stroke'
    ],
    correctIndex: 3,
    explanation: 'While vertigo is commonly benign, sudden onset vertigo with neurological signs like ataxia, especially in elderly patients, raises concern for posterior circulation (vertebrobasilar) stroke. This can affect the cerebellum and brainstem, causing vertigo along with other neurological deficits.',
    references: [
      'Kerber KA, et al. Stroke among patients with dizziness, vertigo, and imbalance in the emergency department: a population-based study',
      'Newman-Toker DE, et al. HINTS outperforms ABCD2 to screen for stroke in acute continuous vertigo and dizziness'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-010',
    question: 'What is the most common cause of non-traumatic subarachnoid hemorrhage?',
    options: [
      'Arteriovenous malformation',
      'Cerebral aneurysm rupture',
      'Hypertensive hemorrhage',
      'Cerebral amyloid angiopathy'
    ],
    correctIndex: 1,
    explanation: 'Cerebral aneurysm rupture accounts for approximately 85% of non-traumatic subarachnoid hemorrhages. Most aneurysms are located in the anterior circulation, particularly at the anterior communicating artery and posterior communicating artery. Early angiography is essential for diagnosis and treatment planning.',
    references: [
      'Connolly ES Jr, et al. Guidelines for the management of aneurysmal subarachnoid hemorrhage',
      'van Gijn J, et al. Subarachnoid haemorrhage. Lancet. 2007;369(9558):306-318'
    ],
    difficulty: 'easy',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-011',
    question: 'A patient presents with acute confusion, fever, and focal neurological deficits. CSF shows lymphocytic pleocytosis. What is the most likely diagnosis?',
    options: [
      'Bacterial meningitis',
      'Viral encephalitis',
      'Fungal meningitis',
      'Autoimmune encephalitis'
    ],
    correctIndex: 1,
    explanation: 'Viral encephalitis typically presents with acute confusion, fever, and focal neurological deficits. CSF usually shows lymphocytic pleocytosis (vs. neutrophilic in bacterial meningitis). HSV encephalitis is the most common cause and should be treated empirically with acyclovir while awaiting PCR results.',
    references: [
      'Tunkel AR, et al. The management of encephalitis: clinical practice guidelines by the Infectious Diseases Society of America',
      'Granerod J, et al. Causes of encephalitis and differences in their clinical presentations in England: a multicentre, population-based prospective study'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-012',
    question: 'What is the most appropriate initial imaging study for suspected acute stroke?',
    options: [
      'CT head without contrast',
      'CT head with contrast',
      'MRI brain with DWI',
      'CT angiography'
    ],
    correctIndex: 0,
    explanation: 'Non-contrast CT head is the initial imaging study for suspected acute stroke. It rapidly excludes hemorrhage and allows for timely thrombolytic therapy decisions. While MRI with DWI is more sensitive for acute ischemia, CT is faster and more widely available in emergency settings.',
    references: [
      'Powers WJ, et al. 2018 Guidelines for the Early Management of Patients With Acute Ischemic Stroke',
      'Chalela JA, et al. Magnetic resonance imaging and computed tomography in emergency assessment of patients with suspected acute stroke'
    ],
    difficulty: 'easy',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-013',
    question: 'A patient presents with bilateral ptosis, diplopia, and difficulty swallowing after eating home-canned vegetables. What is the most likely diagnosis?',
    options: [
      'Myasthenia gravis',
      'Guillain-Barré syndrome',
      'Botulism',
      'Lambert-Eaton syndrome'
    ],
    correctIndex: 2,
    explanation: 'Botulism presents with descending paralysis starting with cranial nerves (ptosis, diplopia, dysphagia) after exposure to contaminated food (especially home-canned). The toxin blocks acetylcholine release at neuromuscular junctions. Treatment includes supportive care and botulism antitoxin.',
    references: [
      'Sobel J. Botulism. Clin Infect Dis. 2005;41(8):1167-1173',
      'Chalk C, et al. Medical treatment for botulism. Cochrane Database Syst Rev. 2011;(3):CD008123'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-014',
    question: 'What is the mechanism of action of alteplase in acute ischemic stroke?',
    options: [
      'Platelet aggregation inhibition',
      'Thrombin inhibition',
      'Plasminogen activation',
      'Factor Xa inhibition'
    ],
    correctIndex: 2,
    explanation: 'Alteplase (tissue plasminogen activator, tPA) activates plasminogen to plasmin, which then breaks down fibrin clots. This fibrinolytic mechanism dissolves the thrombus causing ischemic stroke. The main risk is hemorrhagic transformation, requiring careful patient selection.',
    references: [
      'Hacke W, et al. Thrombolysis with alteplase 3 to 4.5 hours after acute ischemic stroke',
      'Wardlaw JM, et al. Recombinant tissue plasminogen activator for acute ischaemic stroke: an updated systematic review and meta-analysis'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-015',
    question: 'A patient presents with acute onset weakness in bilateral lower extremities ascending upward. Deep tendon reflexes are absent. What is the most likely diagnosis?',
    options: [
      'Multiple sclerosis',
      'Guillain-Barré syndrome',
      'Spinal cord compression',
      'Transverse myelitis'
    ],
    correctIndex: 1,
    explanation: 'Guillain-Barré syndrome (GBS) classically presents with ascending weakness starting in the lower extremities, areflexia, and minimal sensory involvement. It\'s an autoimmune demyelinating polyneuropathy often following viral infections. CSF shows elevated protein with normal cell count (cytoalbuminous dissociation).',
    references: [
      'Willison HJ, et al. Guillain-Barré syndrome. Lancet. 2016;388(10045):717-727',
      'Hughes RA, et al. Guillain-Barré syndrome in clinical practice. Arch Neurol. 2006;63(9):1263-1270'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-016',
    question: 'What is the most appropriate treatment for increased intracranial pressure in a patient with traumatic brain injury?',
    options: [
      'Hyperventilation to PCO2 25-30 mmHg',
      'Mannitol 1g/kg IV',
      'Dexamethasone 10mg IV',
      'Furosemide 40mg IV'
    ],
    correctIndex: 1,
    explanation: 'Mannitol 0.25-1g/kg IV is a first-line treatment for increased ICP in traumatic brain injury. It works as an osmotic diuretic to reduce brain water content. Hyperventilation should be used cautiously and only temporarily. Steroids are not recommended for traumatic brain injury.',
    references: [
      'Carney N, et al. Guidelines for the Management of Severe Traumatic Brain Injury, Fourth Edition. Neurosurgery. 2017;80(1):6-15',
      'Bratton SL, et al. Guidelines for the management of severe traumatic brain injury. VIII. Intracranial pressure thresholds'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-017',
    question: 'A patient presents with thunderclap headache. CT head is negative. What is the next most appropriate step?',
    options: [
      'Discharge with migraine medications',
      'MRI brain',
      'Lumbar puncture',
      'CT angiography'
    ],
    correctIndex: 2,
    explanation: 'If CT head is negative in a patient with thunderclap headache suspicious for subarachnoid hemorrhage, lumbar puncture should be performed to look for xanthochromia and red blood cells. CT sensitivity decreases over time, so LP is essential if clinical suspicion remains high.',
    references: [
      'Perry JJ, et al. Sensitivity of computed tomography performed within six hours of onset of headache for diagnosis of subarachnoid haemorrhage',
      'Connolly ES Jr, et al. Guidelines for the management of aneurysmal subarachnoid hemorrhage'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-018',
    question: 'What is the most common type of seizure in adults?',
    options: [
      'Generalized tonic-clonic',
      'Complex partial',
      'Simple partial',
      'Absence seizures'
    ],
    correctIndex: 1,
    explanation: 'Complex partial seizures (now called focal seizures with impaired consciousness) are the most common type of seizure in adults. They often originate from the temporal lobe and may present with automatisms, altered consciousness, and post-ictal confusion.',
    references: [
      'Fisher RS, et al. ILAE official report: a practical clinical definition of epilepsy. Epilepsia. 2014;55(4):475-482',
      'Berg AT, et al. Revised terminology and concepts for organization of seizures and epilepsies'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-019',
    question: 'A 30-year-old pregnant woman at 32 weeks gestation presents with seizures and hypertension. What is the most appropriate initial treatment?',
    options: [
      'Phenytoin 20mg/kg IV',
      'Lorazepam 4mg IV',
      'Magnesium sulfate 6g IV',
      'Levetiracetam 20mg/kg IV'
    ],
    correctIndex: 2,
    explanation: 'This presentation is consistent with eclampsia. Magnesium sulfate is the treatment of choice for seizure prophylaxis and treatment in eclampsia. Loading dose is 4-6g IV over 15-20 minutes, followed by 1-2g/hour infusion. It\'s more effective than other anticonvulsants in this setting.',
    references: [
      'ACOG Committee on Practice Bulletins. Gestational hypertension and preeclampsia: ACOG Practice Bulletin, Number 222',
      'Magee LA, et al. Diagnosis, evaluation, and management of the hypertensive disorders of pregnancy'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-020',
    question: 'What is the most common cause of altered mental status in elderly patients in the emergency department?',
    options: [
      'Stroke',
      'Urinary tract infection',
      'Medication toxicity',
      'Hypoglycemia'
    ],
    correctIndex: 1,
    explanation: 'Urinary tract infection is one of the most common causes of altered mental status in elderly patients, especially in those with baseline cognitive impairment. UTI can present without typical urinary symptoms in the elderly and should always be considered in the differential diagnosis of delirium.',
    references: [
      'Inouye SK, et al. Delirium in elderly people. Lancet. 2014;383(9920):911-922',
      'Nicolle LE, et al. Clinical practice guideline for the management of asymptomatic bacteriuria'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-021',
    question: 'A patient presents with sudden severe headache, neck stiffness, and photophobia. CT head shows blood in the basal cisterns. What is the next most appropriate step?',
    options: [
      'Lumbar puncture',
      'MRI brain',
      'CT angiography',
      'Neurosurgical consultation'
    ],
    correctIndex: 2,
    explanation: 'CT head showing blood in basal cisterns confirms subarachnoid hemorrhage. The next step is CT angiography (or conventional angiography) to identify the source of bleeding, typically a cerebral aneurysm. This information is crucial for treatment planning (surgical clipping vs. endovascular coiling).',
    references: [
      'Connolly ES Jr, et al. Guidelines for the management of aneurysmal subarachnoid hemorrhage',
      'Steiner T, et al. European Stroke Organisation guidelines for the management of intracranial aneurysms and subarachnoid haemorrhage'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-022',
    question: 'What is the most appropriate position for a patient with suspected increased intracranial pressure?',
    options: [
      'Trendelenburg position',
      'Supine with head flat',
      'Head of bed elevated 30 degrees',
      'Left lateral decubitus'
    ],
    correctIndex: 2,
    explanation: 'Head of bed elevation to 30 degrees promotes venous drainage from the brain and helps reduce intracranial pressure. This position optimizes cerebral perfusion pressure while facilitating venous outflow. Avoid extreme head turning which can impede venous drainage.',
    references: [
      'Carney N, et al. Guidelines for the Management of Severe Traumatic Brain Injury, Fourth Edition',
      'Rangel-Castilla L, et al. Management of intracranial hypertension. Neurol Clin. 2008;26(2):521-541'
    ],
    difficulty: 'easy',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-023',
    question: 'A patient with myasthenia gravis presents with respiratory distress and difficulty swallowing. What is this condition called?',
    options: [
      'Myasthenic crisis',
      'Cholinergic crisis',
      'Lambert-Eaton crisis',
      'Guillain-Barré exacerbation'
    ],
    correctIndex: 0,
    explanation: 'Myasthenic crisis is a life-threatening exacerbation of myasthenia gravis characterized by respiratory muscle weakness requiring mechanical ventilation and/or difficulty swallowing leading to aspiration risk. Treatment includes plasmapheresis or IVIG, and careful medication management.',
    references: [
      'Wendell LC, et al. Myasthenic crisis. Neurohospitalist. 2011;1(1):16-22',
      'Juel VC, et al. Myasthenia gravis: management of myasthenic crisis and perioperative care'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-024',
    question: 'What is the antidote for benzodiazepine overdose?',
    options: [
      'Naloxone',
      'Flumazenil',
      'Physostigmine',
      'N-acetylcysteine'
    ],
    correctIndex: 1,
    explanation: 'Flumazenil is a competitive benzodiazepine receptor antagonist that can reverse benzodiazepine-induced CNS depression. However, it should be used cautiously as it can precipitate seizures in patients with benzodiazepine dependence or mixed overdoses involving seizure-inducing substances.',
    references: [
      'Weinbroum AA, et al. A risk-benefit assessment of flumazenil in the management of benzodiazepine overdose',
      'Sivilotti ML. Flumazenil, naloxone and the "coma cocktail". Br J Clin Pharmacol. 2016;81(3):428-436'
    ],
    difficulty: 'easy',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-025',
    question: 'A patient presents with confusion, ataxia, and ophthalmoplegia. They have a history of chronic alcoholism. What is the most likely diagnosis?',
    options: [
      'Alcohol withdrawal',
      'Wernicke encephalopathy',
      'Hepatic encephalopathy',
      'Korsakoff syndrome'
    ],
    correctIndex: 1,
    explanation: 'Wernicke encephalopathy presents with the classic triad of confusion, ataxia, and ophthalmoplegia (though complete triad is present in <20% of cases). It\'s caused by thiamine (vitamin B1) deficiency, common in chronic alcoholics. Treatment is immediate thiamine supplementation before glucose administration.',
    references: [
      'Sechi G, et al. Wernicke\'s encephalopathy: new clinical settings and recent advances in diagnosis and management',
      'Thomson AD, et al. Wernicke\'s encephalopathy: role of thiamine. Pract Gastroenterol. 2008;32(6):21-30'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-026',
    question: 'What is the target temperature range for therapeutic hypothermia in post-cardiac arrest patients?',
    options: [
      '32-34°C',
      '35-36°C',
      '32-36°C',
      '30-32°C'
    ],
    correctIndex: 2,
    explanation: 'Current guidelines recommend targeted temperature management (TTM) between 32-36°C for comatose patients after cardiac arrest. The TTM trial showed that 33°C was not superior to 36°C. The key is avoiding hyperthermia and maintaining a constant target temperature for 24 hours.',
    references: [
      'Nielsen N, et al. Targeted temperature management at 33°C versus 36°C after cardiac arrest. N Engl J Med. 2013;369(23):2197-2206',
      'Callaway CW, et al. Part 8: Post-Cardiac Arrest Care: 2015 American Heart Association Guidelines Update'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-027',
    question: 'A patient presents with acute onset double vision and drooping eyelid after a severe headache. What is the most concerning diagnosis?',
    options: [
      'Migraine with aura',
      'Third nerve palsy from aneurysm',
      'Myasthenia gravis',
      'Horner syndrome'
    ],
    correctIndex: 1,
    explanation: 'Acute onset third nerve palsy with severe headache suggests a posterior communicating artery aneurysm compressing the third cranial nerve. This is a neurosurgical emergency requiring immediate angiography. "Pupil-involving" third nerve palsy (dilated pupil) is particularly concerning for aneurysm.',
    references: [
      'Connolly ES Jr, et al. Guidelines for the management of aneurysmal subarachnoid hemorrhage',
      'Kissel JT, et al. Pupil-sparing oculomotor palsies with internal carotid-posterior communicating artery aneurysms'
    ],
    difficulty: 'hard',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-028',
    question: 'What is the most common cause of non-convulsive status epilepticus in the ICU?',
    options: [
      'Medication withdrawal',
      'Metabolic abnormalities',
      'CNS infections',
      'Previous brain injury'
    ],
    correctIndex: 1,
    explanation: 'Metabolic abnormalities (hypoglycemia, hyponatremia, uremia, hepatic encephalopathy) are common causes of non-convulsive status epilepticus in critically ill patients. NCSE should be suspected in any patient with unexplained altered consciousness, especially in the ICU setting.',
    references: [
      'Claassen J, et al. Detection of electrographic seizures with continuous EEG monitoring in critically ill patients',
      'Brophy GM, et al. Guidelines for the evaluation and management of status epilepticus'
    ],
    difficulty: 'hard',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-029',
    question: 'A patient presents with rapidly progressive weakness over hours, starting with bilateral leg weakness. They report recent gastroenteritis. What test would be most helpful?',
    options: [
      'MRI spine',
      'Lumbar puncture',
      'Nerve conduction studies',
      'Muscle biopsy'
    ],
    correctIndex: 1,
    explanation: 'This presentation suggests Guillain-Barré syndrome, especially with recent gastroenteritis (often Campylobacter jejuni). Lumbar puncture typically shows elevated protein (>0.45 g/L) with normal or minimally elevated cell count (cytoalbuminous dissociation). This finding supports the diagnosis.',
    references: [
      'Willison HJ, et al. Guillain-Barré syndrome. Lancet. 2016;388(10045):717-727',
      'Asbury AK, et al. Assessment of current diagnostic criteria for Guillain-Barré syndrome'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  },
  {
    id: 'neuro-030',
    question: 'What is the most appropriate initial treatment for a patient presenting with acute angle-closure glaucoma?',
    options: [
      'Topical timolol',
      'IV mannitol + topical agents',
      'Immediate laser iridotomy',
      'Oral acetazolamide only'
    ],
    correctIndex: 1,
    explanation: 'Acute angle-closure glaucoma requires immediate pressure reduction with IV mannitol (osmotic agent) plus topical medications (beta-blockers, alpha-agonists, carbonic anhydrase inhibitors). This medical management is followed by definitive laser iridotomy. Delay can result in permanent vision loss.',
    references: [
      'Rhee DJ, et al. Complementary and alternative medicine for glaucoma. Surv Ophthalmol. 2001;46(1):43-55',
      'American Academy of Ophthalmology. Primary Angle Closure Preferred Practice Pattern'
    ],
    difficulty: 'medium',
    topicId: 'neurological-emergencies'
  }
];