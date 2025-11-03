import { Question } from './types';

export const pharmacologyEmergenciesQuestions: Question[] = [
  {
    id: 'pharm-001',
    question: 'A 70 kg patient in septic shock requires norepinephrine. What is the initial dosing range?',
    options: [
      '0.01-0.03 mcg/kg/min',
      '0.05-0.1 mcg/kg/min',
      '0.1-0.3 mcg/kg/min',
      '0.5-1.0 mcg/kg/min'
    ],
    correctIndex: 0,
    explanation: 'Norepinephrine initial dosing for septic shock typically starts at 0.01-0.03 mcg/kg/min (or 8-12 mcg/min for a 70kg patient) and can be titrated up to 0.3-3.3 mcg/kg/min as needed. It\'s the first-line vasopressor per Surviving Sepsis Campaign guidelines.',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021',
      'Russell JA, et al. Vasopressor therapy in critically ill patients with shock'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies',
    patientPresentation: {
      age: 58,
      gender: 'Female',
      chiefComplaint: 'Fever, chills, and hypotension',
      vitalSigns: {
        heartRate: 125,
        bloodPressure: '85/45 mmHg',
        temperature: 102.4,
        respiratoryRate: 28,
        oxygenSaturation: 92
      },
      pastMedicalHistory: ['Diabetes', 'Urinary tract infections'],
      currentMedications: ['Metformin', 'Lisinopril'],
      physicalExam: 'Weight: 70 kg (154 lbs), warm extremities, altered mental status, decreased urine output',
      labsImaging: 'Lactate: 4.2 mmol/L, WBC: 18,000/μL, Creatinine: 1.8 mg/dL, Glucose: 220 mg/dL'
    }
  },
  {
    id: 'pharm-002',
    question: 'A patient receiving continuous infusion sedation develops tolerance. Which principle explains this phenomenon?',
    options: [
      'Pharmacokinetic tolerance',
      'Pharmacodynamic tolerance',
      'Acute tolerance',
      'Reverse tolerance'
    ],
    correctIndex: 1,
    explanation: 'Pharmacodynamic tolerance occurs when repeated exposure to a drug results in decreased sensitivity at the receptor level, requiring higher doses to achieve the same effect. This is common with continuous sedation in ICU patients.',
    references: [
      'Barr J, et al. Clinical practice guidelines for the management of pain, agitation, and delirium in adult patients in the intensive care unit',
      'Kress JP, et al. Daily interruption of sedative infusions in critically ill patients undergoing mechanical ventilation'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-003',
    question: 'A patient with acute kidney injury (creatinine 3.5 mg/dL) needs antibiotic therapy. Which antibiotic requires the most significant dose reduction?',
    options: [
      'Vancomycin',
      'Ceftriaxone',
      'Azithromycin',
      'Clindamycin'
    ],
    correctIndex: 0,
    explanation: 'Vancomycin is primarily renally eliminated and requires significant dose reduction in AKI. Dosing should be based on actual kidney function with therapeutic drug monitoring. Ceftriaxone has dual elimination, azithromycin is hepatically cleared, and clindamycin doesn\'t require renal dose adjustment.',
    references: [
      'Rybak MJ, et al. Therapeutic monitoring of vancomycin for serious methicillin-resistant Staphylococcus aureus infections',
      'Heintz BH, et al. Antimicrobial dosing concepts and recommendations for critically ill adult patients receiving continuous renal replacement therapy'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies',
    patientPresentation: {
      age: 72,
      gender: 'Male',
      chiefComplaint: 'Fever and altered mental status',
      vitalSigns: {
        heartRate: 110,
        bloodPressure: '90/55 mmHg',
        temperature: 101.8,
        respiratoryRate: 24,
        oxygenSaturation: 94
      },
      pastMedicalHistory: ['Diabetes mellitus', 'Chronic kidney disease', 'Hypertension'],
      currentMedications: ['Metformin 500mg BID', 'Lisinopril 20mg daily'],
      physicalExam: 'Decreased urine output, mild edema, confusion',
      labsImaging: 'Creatinine: 3.5 mg/dL (baseline 1.2), BUN: 45 mg/dL, Glucose: 180 mg/dL, WBC: 15,000/μL'
    }
  },
  {
    id: 'pharm-004',
    question: 'A patient receives propofol for 5 days and develops metabolic acidosis, rhabdomyolysis, and renal failure. What is the diagnosis?',
    options: [
      'Malignant hyperthermia',
      'Propofol infusion syndrome',
      'Rhabdomyolysis from positioning',
      'Drug-induced hepatitis'
    ],
    correctIndex: 1,
    explanation: 'Propofol infusion syndrome is a rare but potentially fatal complication of prolonged propofol use (>48-72 hours) at high doses (>4 mg/kg/hr). It presents with metabolic acidosis, rhabdomyolysis, cardiac dysfunction, and renal failure.',
    references: [
      'Krajčová A, et al. Propofol infusion syndrome: a structured review of experimental studies and 153 published case reports',
      'Zaccheo MM, et al. Propofol infusion syndrome: a clinical update'
    ],
    difficulty: 'hard',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-005',
    question: 'A patient with atrial fibrillation and RVR receives digoxin. What is the mechanism of action?',
    options: [
      'Sodium channel blockade',
      'Beta-adrenergic blockade',
      'Calcium channel blockade',
      'Na-K-ATPase pump inhibition'
    ],
    correctIndex: 3,
    explanation: 'Digoxin inhibits the Na-K-ATPase pump, leading to increased intracellular calcium and positive inotropy. It also increases vagal tone, which slows AV nodal conduction and is useful for rate control in atrial fibrillation.',
    references: [
      'January CT, et al. 2019 AHA/ACC/HRS Focused Update of the 2014 AHA/ACC/HRS Guideline for the Management of Patients With Atrial Fibrillation',
      'Digitalis Investigation Group. The effect of digoxin on mortality and morbidity in patients with heart failure'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-006',
    question: 'A patient develops serotonin syndrome after starting fluoxetine and tramadol. What is the most appropriate treatment?',
    options: [
      'Flumazenil',
      'Naloxone',
      'Cyproheptadine',
      'Physostigmine'
    ],
    correctIndex: 2,
    explanation: 'Cyproheptadine is a serotonin antagonist that can be used to treat serotonin syndrome. It blocks 5-HT2A receptors and can help reverse the hyperthermia, altered mental status, and neuromuscular abnormalities seen in serotonin syndrome.',
    references: [
      'Boyer EW, et al. The serotonin syndrome. N Engl J Med. 2005;352(11):1112-1120',
      'Buckley NA, et al. Serotonin syndrome. BMJ. 2014;348:g1626'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-007',
    question: 'A patient on warfarin presents with INR 8.5 and minor bleeding. What is the most appropriate reversal strategy?',
    options: [
      'Vitamin K 10mg PO',
      'Fresh frozen plasma',
      'Prothrombin complex concentrate',
      'Hold warfarin only'
    ],
    correctIndex: 0,
    explanation: 'For INR 4.5-10 with minor bleeding, oral vitamin K 2.5-5mg is recommended. Higher doses (10mg) can be used for more significant elevation. IV vitamin K works faster but has risk of anaphylaxis. FFP and PCC are reserved for major bleeding.',
    references: [
      'Keeling D, et al. Guidelines on oral anticoagulation with warfarin - fourth edition',
      'Holbrook A, et al. Evidence-based management of anticoagulant therapy: Antithrombotic Therapy and Prevention of Thrombosis, 9th ed'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-008',
    question: 'A patient receives high-dose insulin for calcium channel blocker overdose. What electrolyte abnormality must be monitored?',
    options: [
      'Hyperkalemia',
      'Hypokalemia',
      'Hypernatremia',
      'Hypocalcemia'
    ],
    correctIndex: 1,
    explanation: 'High-dose insulin therapy (hyperinsulinemia-euglycemia) can cause significant hypokalemia as insulin drives potassium intracellularly. Frequent potassium monitoring and aggressive repletion are essential. Glucose must also be monitored to prevent hypoglycemia.',
    references: [
      'St-Onge M, et al. Experts consensus recommendations for the management of calcium channel blocker poisoning in adults',
      'Engebretsen KM, et al. High-dose insulin therapy in beta-blocker and calcium channel-blocker poisoning'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-009',
    question: 'A patient with hepatic encephalopathy receives lactulose. What is the mechanism of action?',
    options: [
      'Increases ammonia production',
      'Converts ammonia to urea',
      'Acidifies colon and traps ammonia',
      'Blocks GABA receptors'
    ],
    correctIndex: 2,
    explanation: 'Lactulose is metabolized by colonic bacteria to lactic acid and acetic acid, which acidifies the colon. This converts ammonia (NH3) to ammonium (NH4+), which is less absorbable and helps reduce systemic ammonia levels in hepatic encephalopathy.',
    references: [
      'Vilstrup H, et al. Hepatic encephalopathy in chronic liver disease: 2014 Practice Guideline by the American Association for the Study of Liver Diseases and the European Association for the Study of the Liver',
      'Bass NM, et al. Rifaximin treatment in hepatic encephalopathy'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-010',
    question: 'A patient with crush injury receives mannitol. What is the primary mechanism for preventing acute kidney injury?',
    options: [
      'Osmotic diuresis',
      'Renal vasodilation',
      'Free radical scavenging',
      'Tubular cell protection'
    ],
    correctIndex: 0,
    explanation: 'Mannitol\'s primary mechanism in preventing AKI from rhabdomyolysis is osmotic diuresis, which increases urine flow and prevents precipitation of myoglobin and uric acid in renal tubules. It may also have some free radical scavenging properties.',
    references: [
      'Bosch X, et al. Rhabdomyolysis and acute kidney injury. N Engl J Med. 2009;361(1):62-72',
      'Torres PA, et al. Rhabdomyolysis: pathogenesis, diagnosis, and treatment'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-011',
    question: 'A patient develops methemoglobinemia after local anesthetic use. What is the antidote?',
    options: [
      'Methylene blue',
      'N-acetylcysteine',
      'Vitamin C',
      'Folic acid'
    ],
    correctIndex: 0,
    explanation: 'Methylene blue is the antidote for methemoglobinemia. It acts as an electron acceptor to reduce methemoglobin back to hemoglobin. Typical dose is 1-2 mg/kg IV. It should be avoided in G6PD deficiency as it can cause hemolysis.',
    references: [
      'Wright RO, et al. Methemoglobinemia: etiology, pharmacology, and clinical management',
      'Ash-Bernal R, et al. Methemoglobinemia in the intensive care unit: a case report and review of the literature'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-012',
    question: 'A patient receives neuromuscular blockade with rocuronium. What agent can reverse this blockade?',
    options: [
      'Neostigmine',
      'Sugammadex',
      'Pyridostigmine',
      'Flumazenil'
    ],
    correctIndex: 1,
    explanation: 'Sugammadex is a selective relaxant binding agent that specifically reverses rocuronium (and vecuronium) neuromuscular blockade by encapsulating the drug. Neostigmine is a cholinesterase inhibitor that can reverse other NMBDs but is less specific.',
    references: [
      'Naguib M, et al. Sugammadex: another milestone in clinical neuromuscular pharmacology',
      'Mirakhur RK. Sugammadex in clinical practice'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-013',
    question: 'A patient with organophosphate poisoning receives atropine and pralidoxime. What is the mechanism of pralidoxime?',
    options: [
      'Muscarinic receptor blockade',
      'Acetylcholinesterase reactivation',
      'Nicotinic receptor blockade',
      'Acetylcholine synthesis inhibition'
    ],
    correctIndex: 1,
    explanation: 'Pralidoxime (2-PAM) reactivates acetylcholinesterase that has been inhibited by organophosphates, particularly effective against nicotinic effects (muscle weakness, fasciculations). It works best when given early before "aging" of the enzyme-inhibitor complex occurs.',
    references: [
      'Eddleston M, et al. Management of acute organophosphorus pesticide poisoning',
      'King AM, et al. Organophosphate and carbamate poisoning'
    ],
    difficulty: 'hard',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-014',
    question: 'A patient with bipolar disorder on lithium develops tremor, confusion, and diarrhea. Lithium level is 2.8 mEq/L. What is the most appropriate treatment?',
    options: [
      'Activated charcoal',
      'Hemodialysis',
      'Forced diuresis',
      'Sodium bicarbonate'
    ],
    correctIndex: 1,
    explanation: 'Severe lithium toxicity (>2.5 mEq/L) with neurologic symptoms requires hemodialysis for rapid removal. Lithium has a small volume of distribution and is not protein-bound, making it dialyzable. Activated charcoal does not bind lithium.',
    references: [
      'Decker BS, et al. Extracorporeal treatment for lithium poisoning: systematic review and recommendations from the EXTRIP workgroup',
      'Mehta N, et al. Lithium-induced neurotoxicity: a literature review'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-015',
    question: 'A patient receives amiodarone loading dose. What monitoring is most important during infusion?',
    options: [
      'QT interval',
      'Blood pressure',
      'Heart rate',
      'Liver enzymes'
    ],
    correctIndex: 1,
    explanation: 'During amiodarone loading, blood pressure monitoring is most critical as the IV formulation can cause significant hypotension due to the solvent (polysorbate 80 and benzyl alcohol). QT prolongation is important but usually occurs with chronic use.',
    references: [
      'Zimetbaum PJ. Amiodarone for atrial fibrillation. N Engl J Med. 2007;356(9):935-941',
      'Levine JH, et al. Intravenous amiodarone for recurrent sustained hypotensive ventricular tachyarrhythmias'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-016',
    question: 'A patient develops anaphylaxis to penicillin. Epinephrine is given. What is the mechanism of epinephrine in anaphylaxis?',
    options: [
      'Alpha-1 agonism only',
      'Beta-2 agonism only',
      'Mixed alpha and beta agonism',
      'Histamine receptor blockade'
    ],
    correctIndex: 2,
    explanation: 'Epinephrine\'s effectiveness in anaphylaxis comes from mixed alpha and beta agonism: alpha-1 causes vasoconstriction (counteracts vasodilation/hypotension), beta-1 increases cardiac output, and beta-2 causes bronchodilation (counteracts bronchoconstriction).',
    references: [
      'Lieberman P, et al. The diagnosis and management of anaphylaxis practice parameter: 2010 update',
      'Simons FER, et al. World Allergy Organization anaphylaxis guidelines'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-017',
    question: 'A patient with heart failure receives milrinone. What is the mechanism of action?',
    options: [
      'Beta-1 agonism',
      'Phosphodiesterase-3 inhibition',
      'Calcium channel agonism',
      'Sodium-potassium ATPase inhibition'
    ],
    correctIndex: 1,
    explanation: 'Milrinone is a phosphodiesterase-3 inhibitor that increases cAMP levels, leading to increased contractility (positive inotropy) and vasodilation. It\'s useful in heart failure but can cause hypotension and arrhythmias.',
    references: [
      'Packer M, et al. Effect of milrinone on mortality in severe chronic heart failure',
      'Cuffe MS, et al. Short-term intravenous milrinone for acute exacerbation of chronic heart failure'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-018',
    question: 'A patient with severe asthma receives magnesium sulfate. What is the mechanism of bronchodilation?',
    options: [
      'Beta-2 agonism',
      'Calcium channel blockade',
      'Phosphodiesterase inhibition',
      'Leukotriene receptor antagonism'
    ],
    correctIndex: 1,
    explanation: 'Magnesium causes bronchodilation by blocking calcium channels in smooth muscle, leading to muscle relaxation. It also has anti-inflammatory effects and may potentiate the effects of beta-2 agonists in severe asthma.',
    references: [
      'Rowe BH, et al. Magnesium sulfate for treating exacerbations of acute asthma in the emergency department',
      'Blitz M, et al. Aerosolized magnesium sulfate for acute asthma: a systematic review'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-019',
    question: 'A patient with tricyclic antidepressant overdose develops wide-complex tachycardia. What is the most appropriate treatment?',
    options: [
      'Lidocaine',
      'Sodium bicarbonate',
      'Amiodarone',
      'Magnesium'
    ],
    correctIndex: 1,
    explanation: 'Sodium bicarbonate is the treatment of choice for TCA-induced arrhythmias. It works by increasing extracellular sodium concentration and raising pH, which reverses sodium channel blockade. Target pH is 7.45-7.55.',
    references: [
      'Kerr GW, et al. Tricyclic antidepressant overdose: a review',
      'Boehnert MT, et al. Value of the QRS duration versus the serum drug level in predicting seizures and ventricular arrhythmias after an acute overdose of tricyclic antidepressants'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-020',
    question: 'A patient receives continuous venovenous hemofiltration (CVVH). How does this affect drug clearance?',
    options: [
      'Only affects renally eliminated drugs',
      'Increases clearance of protein-bound drugs',
      'Decreases clearance of small molecules',
      'Affects drugs based on molecular weight and protein binding'
    ],
    correctIndex: 3,
    explanation: 'CVVH affects drug clearance based on molecular weight (<50,000 Da are cleared), protein binding (unbound fraction is cleared), and membrane characteristics. Hydrophilic, low molecular weight, minimally protein-bound drugs are most affected.',
    references: [
      'Heintz BH, et al. Antimicrobial dosing concepts and recommendations for critically ill adult patients receiving continuous renal replacement therapy',
      'Roberts DM, et al. Therapeutic drug monitoring and dosing of antimicrobials in critically ill patients receiving continuous renal replacement therapy'
    ],
    difficulty: 'hard',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-021',
    question: 'A patient develops hypertensive emergency. Clevidipine is chosen over nicardipine. What is the advantage of clevidipine?',
    options: [
      'Longer half-life',
      'Oral bioavailability',
      'Ultra-short half-life allowing precise control',
      'Less expensive'
    ],
    correctIndex: 2,
    explanation: 'Clevidipine has an ultra-short half-life (1 minute) due to rapid metabolism by blood and tissue esterases, allowing very precise blood pressure control. This makes it ideal for situations requiring tight BP control or when rapid reversal might be needed.',
    references: [
      'Aronson S, et al. The ECLIPSE trials: comparative studies of clevidipine to nicardipine, nitroglycerin, and nitroprusside in patients with acute hypertension',
      'Singla N, et al. Clevidipine for perioperative blood pressure control in neurosurgery'
    ],
    difficulty: 'hard',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-022',
    question: 'A patient with alcohol withdrawal receives lorazepam. Why is lorazepam preferred over diazepam in liver disease?',
    options: [
      'Better CNS penetration',
      'Longer half-life',
      'Glucuronidation metabolism',
      'Higher potency'
    ],
    correctIndex: 2,
    explanation: 'Lorazepam undergoes glucuronidation (phase II metabolism) which is preserved in liver disease, unlike diazepam which undergoes oxidative metabolism (phase I) that is impaired in hepatic dysfunction. This makes lorazepam safer in patients with liver disease.',
    references: [
      'Mayo-Smith MF, et al. Pharmacological management of alcohol withdrawal. A meta-analysis and evidence-based practice guideline',
      'Weinberg JA, et al. Alcohol withdrawal syndrome in the critically ill'
    ],
    difficulty: 'hard',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-023',
    question: 'A patient with status epilepticus receives levetiracetam instead of phenytoin. What is the advantage of levetiracetam?',
    options: [
      'Faster onset of action',
      'No drug interactions',
      'Better seizure control',
      'Lower cost'
    ],
    correctIndex: 1,
    explanation: 'Levetiracetam has minimal drug interactions and doesn\'t require monitoring of drug levels, unlike phenytoin which has numerous drug interactions and narrow therapeutic window. It also doesn\'t cause the cardiovascular complications seen with IV phenytoin.',
    references: [
      'Glauser T, et al. Evidence-based guideline: treatment of convulsive status epilepticus in children and adults',
      'Kapur J, et al. Randomized trial of three anticonvulsant medications for status epilepticus'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-024',
    question: 'A patient develops drug-induced thrombocytopenia from heparin. What is the mechanism?',
    options: [
      'Direct bone marrow suppression',
      'Antibody-mediated platelet destruction',
      'Platelet aggregation',
      'Sequestration in spleen'
    ],
    correctIndex: 1,
    explanation: 'Heparin-induced thrombocytopenia (HIT) is caused by antibodies against the heparin-platelet factor 4 complex, leading to platelet activation, consumption, and paradoxical thrombosis. It requires immediate discontinuation of all heparin and anticoagulation with non-heparin agents.',
    references: [
      'Cuker A, et al. American Society of Hematology 2018 guidelines for management of venous thromboembolism: heparin-induced thrombocytopenia',
      'Greinacher A. Heparin-induced thrombocytopenia'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-025',
    question: 'A patient with acetaminophen overdose presents 18 hours post-ingestion. What factor most influences treatment decision?',
    options: [
      'Amount ingested',
      'Serum acetaminophen level',
      'Liver function tests',
      'Time since ingestion'
    ],
    correctIndex: 1,
    explanation: 'Serum acetaminophen level plotted on the Rumack-Matthew nomogram (for single acute ingestions >4 hours post-ingestion) is the most important factor. Levels above the treatment line indicate need for N-acetylcysteine. For late presentations, clinical judgment and liver enzymes become important.',
    references: [
      'Rumack BH, et al. Acetaminophen poisoning and toxicity. Pediatrics. 1975;55(6):871-876',
      'Larson AM, et al. Acetaminophen-induced acute liver failure: results of a United States multicenter, prospective study'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-026',
    question: 'A patient with cirrhosis receives propranolol for variceal bleeding prophylaxis. What is the goal reduction in heart rate?',
    options: [
      '10-15%',
      '20-25%',
      '25-30%',
      '35-40%'
    ],
    correctIndex: 1,
    explanation: 'For primary prophylaxis of variceal bleeding, non-selective beta-blockers should reduce resting heart rate by 20-25% or to 55-60 bpm. This correlates with adequate reduction in portal pressure. Hepatic venous pressure gradient reduction >20% is the goal.',
    references: [
      'Garcia-Tsao G, et al. Prevention and management of gastroesophageal varices and variceal hemorrhage in cirrhosis',
      'de Franchis R, et al. Expanding consensus in portal hypertension: Report of the Baveno VI Consensus Workshop'
    ],
    difficulty: 'hard',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-027',
    question: 'A patient develops QT prolongation on multiple medications. Which combination is highest risk for torsades de pointes?',
    options: [
      'Amiodarone + digoxin',
      'Quinidine + hypokalemia',
      'Sotalol + hypomagnesemia',
      'Dofetilide + renal impairment'
    ],
    correctIndex: 1,
    explanation: 'Quinidine with hypokalemia is extremely high risk for torsades de pointes. Hypokalemia potentiates the effects of QT-prolonging drugs and creates an unstable electrical environment. Female gender, bradycardia, and recent conversion from atrial fibrillation are additional risk factors.',
    references: [
      'Roden DM. Drug-induced prolongation of the QT interval. N Engl J Med. 2004;350(10):1013-1022',
      'Drew BJ, et al. Prevention of torsade de pointes in hospital settings: a scientific statement from the American Heart Association'
    ],
    difficulty: 'hard',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-028',
    question: 'A patient with cocaine intoxication develops hypertension and chest pain. Which medication should be avoided?',
    options: [
      'Labetalol',
      'Esmolol',
      'Propranolol',
      'Metoprolol'
    ],
    correctIndex: 2,
    explanation: 'Non-selective beta-blockers like propranolol should be avoided in cocaine intoxication as they can worsen hypertension through unopposed alpha-stimulation. Labetalol (combined alpha/beta blocker) is preferred if beta-blockade is needed.',
    references: [
      'McCord J, et al. Management of cocaine-associated chest pain and myocardial infarction: a scientific statement from the American Heart Association',
      'Dattilo PB, et al. Analysis of profile of patients with cocaine-associated myocardial infarction'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-029',
    question: 'A patient with heart failure receives nesiritide. What is the mechanism of action?',
    options: [
      'Beta-1 agonism',
      'Phosphodiesterase inhibition',
      'Natriuretic peptide receptor agonism',
      'Angiotensin receptor blockade'
    ],
    correctIndex: 2,
    explanation: 'Nesiritide is recombinant human B-type natriuretic peptide that works through natriuretic peptide receptors, causing vasodilation, natriuresis, and diuresis. It can cause hypotension and has not shown mortality benefit, limiting its use.',
    references: [
      'O\'Connor CM, et al. Effect of nesiritide in patients with acute decompensated heart failure',
      'Sackner-Bernstein JD, et al. Short-term risk of death after treatment with nesiritide for decompensated heart failure'
    ],
    difficulty: 'hard',
    topicId: 'pharmacology-emergencies'
  },
  {
    id: 'pharm-030',
    question: 'A patient receives alteplase for acute ischemic stroke. Within what time window is this most beneficial?',
    options: [
      '3 hours',
      '4.5 hours',
      '6 hours',
      '8 hours'
    ],
    correctIndex: 1,
    explanation: 'IV alteplase for acute ischemic stroke is most beneficial within 4.5 hours of symptom onset, though earlier treatment (within 3 hours) provides the greatest benefit. The risk-benefit ratio decreases as time from onset increases.',
    references: [
      'Powers WJ, et al. Guidelines for the early management of patients with acute ischemic stroke: 2019 update to the 2018 guidelines for the early management of acute ischemic stroke',
      'Hacke W, et al. Thrombolysis with alteplase 3 to 4.5 hours after acute ischemic stroke'
    ],
    difficulty: 'medium',
    topicId: 'pharmacology-emergencies'
  }
];