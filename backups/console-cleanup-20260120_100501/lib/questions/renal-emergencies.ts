import { Question } from './types';

export const renalEmergenciesQuestions: Question[] = [
  {
    id: 'renal-001',
    question: 'A patient presents with oliguria, creatinine rising from 1.0 to 4.5 mg/dL over 24 hours, and muddy brown casts on urinalysis. What is the most likely diagnosis?',
    options: [
      'Acute tubular necrosis',
      'Acute glomerulonephritis',
      'Acute interstitial nephritis',
      'Prerenal azotemia'
    ],
    correctIndex: 0,
    explanation: 'Acute tubular necrosis (ATN) presents with acute kidney injury, oliguria, and muddy brown granular casts on urinalysis. Common causes include ischemia, nephrotoxins (aminoglycosides, contrast), and sepsis. The fractional excretion of sodium is typically >2%.',
    references: [
      'Kellum JA, et al. Kidney disease: improving global outcomes (KDIGO) acute kidney injury work group. KDIGO clinical practice guideline for acute kidney injury',
      'Basile DP, et al. Pathophysiology of acute kidney injury. Compr Physiol. 2012;2(2):1303-1353'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-002',
    question: 'A patient presents with acute kidney injury and red blood cell casts on urinalysis. What is the most likely category of AKI?',
    options: [
      'Prerenal',
      'Intrinsic glomerular',
      'Intrinsic tubular',
      'Postrenal'
    ],
    correctIndex: 1,
    explanation: 'Red blood cell casts are pathognomonic for glomerular disease. They indicate bleeding from the glomerulus with subsequent cast formation in the tubules. Common causes include acute glomerulonephritis, vasculitis, and rapidly progressive glomerulonephritis.',
    references: [
      'Fogazzi GB, et al. Urinalysis: core curriculum 2008. Am J Kidney Dis. 2008;51(6):1052-1067',
      'Perazella MA. The urine sediment as a biomarker of kidney disease. Am J Kidney Dis. 2015;66(5):748-755'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-003',
    question: 'A patient with acute kidney injury has a fractional excretion of sodium (FENa) of 0.8%. What does this suggest?',
    options: [
      'Acute tubular necrosis',
      'Prerenal azotemia',
      'Acute interstitial nephritis',
      'Postrenal obstruction'
    ],
    correctIndex: 1,
    explanation: 'FENa <1% suggests prerenal azotemia, indicating that tubular function is intact and the kidneys are appropriately conserving sodium. FENa >2% suggests intrinsic renal disease (ATN, AIN). FENa = (UNa × PCr)/(UCr × PNa) × 100.',
    references: [
      'Miller TR, et al. Urinalysis and urinary electrolytes. Med Clin North Am. 1991;75(2):349-365',
      'Steiner RW. Interpreting the fractional excretion of sodium. Am J Med. 1984;77(4):699-702'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-004',
    question: 'A patient presents with hyperkalemia (K+ 6.8 mEq/L) and peaked T waves on ECG. What is the most appropriate immediate treatment?',
    options: [
      'Calcium gluconate IV',
      'Insulin and dextrose IV',
      'Sodium polystyrene sulfonate PO',
      'Hemodialysis'
    ],
    correctIndex: 0,
    explanation: 'Severe hyperkalemia with ECG changes requires immediate membrane stabilization with IV calcium (calcium gluconate 1-2 ampules). This does not lower potassium but protects against arrhythmias. Follow with potassium-lowering treatments (insulin/dextrose, albuterol, sodium bicarbonate).',
    references: [
      'Elliott MJ, et al. Management of patients with acute hyperkalemia. CMAJ. 2010;182(15):1631-1635',
      'Kovesdy CP, et al. Management of hyperkalemia: an update for the internist. Am J Med. 2015;128(12):1281-1287'
    ],
    difficulty: 'easy',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-005',
    question: 'A patient with CKD presents with uremic pericarditis. What is the most appropriate treatment?',
    options: [
      'NSAIDs',
      'Colchicine',
      'Urgent dialysis',
      'Pericardiocentesis'
    ],
    correctIndex: 2,
    explanation: 'Uremic pericarditis is an indication for urgent dialysis. It typically occurs when BUN >60-100 mg/dL and indicates severe uremia. The pericarditis usually resolves with adequate dialysis. NSAIDs should be avoided in patients with kidney disease.',
    references: [
      'Kes P, et al. Acute kidney injury in the intensive care unit. Bosn J Basic Med Sci. 2010;10 Suppl 1:S8-12',
      'Alpert MA, et al. Pericardial disease in patients with end-stage renal disease. Cardiol Clin. 1990;8(4):701-712'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-006',
    question: 'A patient presents with flank pain, hematuria, and a kidney stone. CT shows hydronephrosis and a 6mm stone. What is the most appropriate management?',
    options: [
      'Observation and pain control',
      'Immediate surgical removal',
      'Extracorporeal shock wave lithotripsy',
      'Ureteral stent placement'
    ],
    correctIndex: 0,
    explanation: 'Stones <5mm have a >90% chance of spontaneous passage. Management includes pain control, hydration, and alpha-blockers (tamsulosin) to facilitate passage. Urgent intervention is needed for infection, intractable pain, or solitary kidney with obstruction.',
    references: [
      'Türk C, et al. EAU guidelines on interventional treatment for urolithiasis',
      'Campschroer T, et al. Alpha-blockers as medical expulsive therapy for ureteral stones'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-007',
    question: 'A patient with a kidney stone presents with fever, flank pain, and pyuria. What is the most appropriate immediate management?',
    options: [
      'Antibiotics only',
      'Immediate stone removal',
      'Ureteral stent and antibiotics',
      'Observation'
    ],
    correctIndex: 2,
    explanation: 'Obstructive pyelonephritis (infected obstructed kidney) is a urological emergency requiring immediate drainage (ureteral stent or nephrostomy) plus antibiotics. Delay can lead to sepsis and permanent kidney damage. Stone removal can be performed after infection clears.',
    references: [
      'Türk C, et al. EAU guidelines on interventional treatment for urolithiasis',
      'Pearle MS, et al. Medical management of kidney stones: AUA guideline'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-008',
    question: 'A patient presents with rapidly progressive kidney failure and hemoptysis. ANCA is positive. What is the most likely diagnosis?',
    options: [
      'Goodpasture syndrome',
      'Granulomatosis with polyangiitis',
      'Systemic lupus erythematosus',
      'IgA nephropathy'
    ],
    correctIndex: 1,
    explanation: 'ANCA-positive pulmonary-renal syndrome suggests granulomatosis with polyangiitis (Wegener\'s). c-ANCA/PR3 is more specific for GPA. p-ANCA/MPO can be seen in microscopic polyangiitis. Immediate treatment with immunosuppression is required.',
    references: [
      'Jennette JC, et al. 2012 revised International Chapel Hill Consensus Conference Nomenclature of Vasculitides',
      'Yates M, et al. EULAR/ERA-EDTA recommendations for the management of ANCA-associated vasculitis'
    ],
    difficulty: 'hard',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-009',
    question: 'A patient presents with acute kidney injury, hemolytic anemia, and thrombocytopenia. Schistocytes are present on blood smear. What is the diagnosis?',
    options: [
      'Hemolytic uremic syndrome',
      'Thrombotic thrombocytopenic purpura',
      'Disseminated intravascular coagulation',
      'Acute glomerulonephritis'
    ],
    correctIndex: 1,
    explanation: 'The pentad of TTP includes thrombocytopenia, microangiopathic hemolytic anemia, neurologic symptoms, fever, and renal dysfunction. HUS is similar but primarily affects kidneys. TTP requires immediate plasma exchange. ADAMTS13 deficiency is the underlying mechanism.',
    references: [
      'Joly BS, et al. Thrombotic thrombocytopenic purpura. Blood. 2017;129(21):2836-2846',
      'Zheng XL, et al. ISTH guidelines for treatment of thrombotic thrombocytopenic purpura'
    ],
    difficulty: 'hard',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-010',
    question: 'A patient with rhabdomyolysis has creatine kinase 15,000 U/L and myoglobin 2,000 ng/mL. What is the most appropriate treatment to prevent AKI?',
    options: [
      'Normal saline infusion',
      'Sodium bicarbonate infusion',
      'Mannitol',
      'Furosemide'
    ],
    correctIndex: 0,
    explanation: 'Early aggressive fluid resuscitation with normal saline is the most important treatment for rhabdomyolysis to prevent AKI. Target urine output >200-300 mL/hr. Alkalinization with bicarbonate may help but is controversial. Diuretics can worsen dehydration.',
    references: [
      'Bosch X, et al. Rhabdomyolysis and acute kidney injury. N Engl J Med. 2009;361(1):62-72',
      'Torres PA, et al. Rhabdomyolysis: pathogenesis, diagnosis, and treatment'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-011',
    question: 'A patient develops AKI after receiving IV contrast. Creatinine rises from 1.2 to 2.8 mg/dL over 48 hours. What is the most likely mechanism?',
    options: [
      'Direct tubular toxicity',
      'Prerenal vasoconstriction',
      'Acute interstitial nephritis',
      'Acute glomerulonephritis'
    ],
    correctIndex: 0,
    explanation: 'Contrast-induced nephropathy (CIN) is caused by direct tubular toxicity and medullary hypoxia. Risk factors include pre-existing CKD, diabetes, dehydration, and high contrast volumes. Prevention includes hydration and minimizing contrast volume.',
    references: [
      'McCullough PA, et al. Contrast-induced acute kidney injury. J Am Coll Cardiol. 2016;68(13):1465-1473',
      'Weisbord SD, et al. Prevention of contrast-induced nephropathy with volume expansion'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-012',
    question: 'A patient with AKI has potassium 7.2 mEq/L. ECG shows widened QRS complexes. Calcium gluconate was given. What is the next most appropriate treatment?',
    options: [
      'Insulin 10 units IV with dextrose',
      'Sodium bicarbonate',
      'Albuterol nebulizer',
      'Sodium polystyrene sulfonate'
    ],
    correctIndex: 0,
    explanation: 'After membrane stabilization with calcium, the next step is to shift potassium intracellularly. Insulin 10 units IV with 25-50g dextrose is the most effective method, lowering K+ by 0.5-1.2 mEq/L within 15-30 minutes. Albuterol can be added for additional effect.',
    references: [
      'Elliott MJ, et al. Management of patients with acute hyperkalemia. CMAJ. 2010;182(15):1631-1635',
      'Kovesdy CP, et al. Management of hyperkalemia: an update for the internist'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-013',
    question: 'A patient presents with AKI, oliguria, and bilateral flank masses. Family history reveals polycystic kidney disease. What complication should be suspected?',
    options: [
      'Urinary tract infection',
      'Kidney stones',
      'Hemorrhage into cysts',
      'Renal cell carcinoma'
    ],
    correctIndex: 2,
    explanation: 'Acute presentation with flank pain and AKI in polycystic kidney disease suggests cyst hemorrhage or rupture. This can cause significant blood loss and acute decline in kidney function. CT scan can confirm bleeding. Most episodes are self-limited but may require intervention.',
    references: [
      'Chapman AB, et al. Autosomal-dominant polycystic kidney disease (ADPKD): executive summary from a Kidney Disease: Improving Global Outcomes (KDIGO) Controversies Conference',
      'Torres VE, et al. Autosomal dominant polycystic kidney disease. Lancet. 2007;369(9569):1287-1301'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-014',
    question: 'A patient presents with AKI and eosinophilia. Recent medications include proton pump inhibitor started 2 weeks ago. What is the most likely diagnosis?',
    options: [
      'Acute tubular necrosis',
      'Acute interstitial nephritis',
      'Acute glomerulonephritis',
      'Prerenal azotemia'
    ],
    correctIndex: 1,
    explanation: 'Acute interstitial nephritis (AIN) presents with AKI, often with eosinophilia, rash, and fever (though this triad is present in <10% of cases). Common causes include NSAIDs, antibiotics, and PPIs. White blood cell casts may be seen on urinalysis.',
    references: [
      'Praga M, et al. Acute interstitial nephritis. Kidney Int. 2010;77(11):956-961',
      'Rossert J. Drug-induced acute interstitial nephritis. Kidney Int. 2001;60(2):804-817'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-015',
    question: 'A patient with chronic kidney disease presents with calcium 7.5 mg/dL, phosphorus 8.5 mg/dL, and PTH 450 pg/mL. What is the most appropriate treatment?',
    options: [
      'Calcium carbonate',
      'Calcitriol',
      'Phosphate binders',
      'Parathyroidectomy'
    ],
    correctIndex: 2,
    explanation: 'In CKD patients with hyperphosphatemia, the first step is phosphate restriction and phosphate binders (calcium carbonate, sevelamer, lanthanum). Controlling phosphorus helps prevent secondary hyperparathyroidism. Calcitriol can be added if PTH remains elevated after phosphorus control.',
    references: [
      'Kidney Disease: Improving Global Outcomes (KDIGO) CKD-MBD Update Work Group. KDIGO 2017 Clinical Practice Guideline Update for the Diagnosis, Evaluation, Prevention, and Treatment of Chronic Kidney Disease–Mineral and Bone Disorder',
      'Palmer SC, et al. Phosphate-binding agents in adults with CKD: a network meta-analysis'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-016',
    question: 'A dialysis patient presents with shortness of breath and bilateral crackles. Weight is 5 kg above dry weight. What is the most appropriate treatment?',
    options: [
      'Furosemide IV',
      'Ultrafiltration during dialysis',
      'Nitroglycerin',
      'Continuous positive airway pressure'
    ],
    correctIndex: 1,
    explanation: 'Volume overload in dialysis patients requires ultrafiltration (fluid removal) during dialysis rather than diuretics, as these patients have minimal residual kidney function. The goal is to return to dry weight. Diuretics are typically ineffective in anuric patients.',
    references: [
      'Flythe JE, et al. Ultrafiltration rate and mortality in maintenance hemodialysis patients',
      'Saran R, et al. US Renal Data System 2019 Annual Data Report: Epidemiology of Kidney Disease in the United States'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-017',
    question: 'A patient presents with AKI, joint pain, and a purpuric rash on the legs. Complement C3 and C4 are low. What is the most likely diagnosis?',
    options: [
      'IgA nephropathy',
      'Post-infectious glomerulonephritis',
      'Lupus nephritis',
      'Membranoproliferative glomerulonephritis'
    ],
    correctIndex: 2,
    explanation: 'The combination of AKI, arthritis, rash, and low complement levels suggests lupus nephritis. SLE commonly affects multiple organ systems and is associated with low C3 and C4 levels due to immune complex consumption. ANA and anti-dsDNA are typically positive.',
    references: [
      'Hahn BH, et al. American College of Rheumatology guidelines for screening, treatment, and management of lupus nephritis',
      'Fanouriakis A, et al. 2019 update of the EULAR recommendations for the management of systemic lupus erythematosus'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-018',
    question: 'A patient with AKI has been oliguric for 3 days despite adequate fluid resuscitation. When should renal replacement therapy be considered?',
    options: [
      'Immediately',
      'When creatinine reaches 4 mg/dL',
      'When complications develop',
      'After 7 days'
    ],
    correctIndex: 2,
    explanation: 'Renal replacement therapy in AKI is indicated for complications: severe hyperkalemia (>6.5 mEq/L), severe acidosis (pH <7.1), volume overload refractory to diuretics, uremic complications (pericarditis, encephalopathy), or certain poisonings. Creatinine level alone is not an indication.',
    references: [
      'Kellum JA, et al. Kidney disease: improving global outcomes (KDIGO) acute kidney injury work group. KDIGO clinical practice guideline for acute kidney injury',
      'Zarbock A, et al. Effect of early vs delayed initiation of renal replacement therapy on mortality in critically ill patients with acute kidney injury'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-019',
    question: 'A patient presents with gross hematuria 2 weeks after a streptococcal throat infection. Creatinine is 2.5 mg/dL, and C3 is low. What is the diagnosis?',
    options: [
      'IgA nephropathy',
      'Post-infectious glomerulonephritis',
      'Rapidly progressive glomerulonephritis',
      'Minimal change disease'
    ],
    correctIndex: 1,
    explanation: 'Post-infectious glomerulonephritis typically occurs 1-3 weeks after streptococcal infection, presenting with hematuria, hypertension, edema, and low C3 levels. Most cases resolve spontaneously. IgA nephropathy typically occurs within days of infection.',
    references: [
      'Rodriguez-Iturbe B, et al. Postinfectious glomerulonephritis. Semin Nephrol. 2008;28(6):568-579',
      'Nasr SH, et al. Post-infectious glomerulonephritis in the elderly'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-020',
    question: 'A patient with AKI develops severe metabolic acidosis (pH 7.15, HCO3 8 mEq/L). What is the most appropriate treatment?',
    options: [
      'Sodium bicarbonate infusion',
      'Hemodialysis',
      'Continuous venovenous hemofiltration',
      'Acetazolamide'
    ],
    correctIndex: 1,
    explanation: 'Severe metabolic acidosis (pH <7.1) in AKI is an indication for urgent renal replacement therapy. Hemodialysis is most effective for rapid correction. Bicarbonate infusion can worsen volume overload and may cause paradoxical CSF acidosis.',
    references: [
      'Kellum JA, et al. Kidney disease: improving global outcomes (KDIGO) acute kidney injury work group',
      'Kraut JA, et al. Metabolic acidosis of CKD: diagnosis, clinical characteristics, and treatment'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-021',
    question: 'A patient presents with AKI and uric acid level of 15 mg/dL after starting chemotherapy. What is the most likely diagnosis?',
    options: [
      'Tumor lysis syndrome',
      'Acute uric acid nephropathy',
      'Chemotherapy nephrotoxicity',
      'Prerenal azotemia'
    ],
    correctIndex: 0,
    explanation: 'Tumor lysis syndrome occurs after chemotherapy in patients with high tumor burden, causing hyperuricemia, hyperkalemia, hyperphosphatemia, and hypocalcemia. AKI results from uric acid precipitation in tubules. Prevention includes allopurinol or rasburicase and aggressive hydration.',
    references: [
      'Howard SC, et al. The tumor lysis syndrome. N Engl J Med. 2011;364(19):1844-1854',
      'Cairo MS, et al. Recommendations for the evaluation of risk and prophylaxis of tumour lysis syndrome'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-022',
    question: 'A patient with diabetic nephropathy presents with hyperkalemia and normal creatinine. ACE inhibitor was started recently. What is the most likely cause?',
    options: [
      'Type 1 renal tubular acidosis',
      'Type 4 renal tubular acidosis',
      'Primary aldosteronism',
      'Addison disease'
    ],
    correctIndex: 1,
    explanation: 'Type 4 RTA (hyporeninemic hypoaldosteronism) is common in diabetic nephropathy and can be precipitated by ACE inhibitors or ARBs. It presents with hyperkalemia and normal anion gap metabolic acidosis with normal or mildly elevated creatinine.',
    references: [
      'Palmer BF, et al. Hyperkalemia in patients with chronic kidney disease: epidemiology, pathophysiology, and management',
      'Batlle DC, et al. Hyperkalemic distal renal tubular acidosis associated with obstructive uropathy'
    ],
    difficulty: 'hard',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-023',
    question: 'A patient presents with AKI and calcium oxalate crystals in urine after ingesting antifreeze. What is the most appropriate antidote?',
    options: [
      'Ethanol',
      'Fomepizole',
      'Thiamine',
      'Pyridoxine'
    ],
    correctIndex: 1,
    explanation: 'Fomepizole is the preferred antidote for ethylene glycol (antifreeze) poisoning, blocking alcohol dehydrogenase and preventing formation of toxic metabolites (glycolic acid, oxalic acid). Ethanol is an alternative but has more side effects. Hemodialysis may be needed for severe cases.',
    references: [
      'Brent J, et al. Fomepizole for the treatment of ethylene glycol poisoning',
      'Barceloux DG, et al. American Academy of Clinical Toxicology practice guidelines on the treatment of ethylene glycol poisoning'
    ],
    difficulty: 'hard',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-024',
    question: 'A patient with end-stage renal disease misses dialysis and presents with peaked T waves on ECG. Calcium gluconate is ineffective. What should be done next?',
    options: [
      'Repeat calcium gluconate',
      'Emergency dialysis',
      'Insulin and dextrose',
      'Sodium bicarbonate'
    ],
    correctIndex: 1,
    explanation: 'When calcium is ineffective for severe hyperkalemia in dialysis patients, emergency dialysis is needed for immediate potassium removal. Temporary measures (insulin/dextrose, albuterol, bicarbonate) may be tried but dialysis is definitive treatment for the anuric patient.',
    references: [
      'Elliott MJ, et al. Management of patients with acute hyperkalemia',
      'Classe CM, et al. Hyperkalemia: when to admit to hospital'
    ],
    difficulty: 'hard',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-025',
    question: 'A patient with AKI has urine output <0.5 mL/kg/hr for 6 hours despite fluid challenge. What defines oliguria?',
    options: [
      'Urine output <400 mL/24 hours',
      'Urine output <0.5 mL/kg/hr for >6 hours',
      'Urine output <1 mL/kg/hr',
      'Urine output <20 mL/hr'
    ],
    correctIndex: 1,
    explanation: 'Oliguria is defined as urine output <0.5 mL/kg/hr for >6 hours. Anuria is <100 mL/24 hours. The presence of oliguria in AKI indicates more severe injury and worse prognosis. Some patients with AKI maintain normal urine output (non-oliguric AKI).',
    references: [
      'Kellum JA, et al. Kidney disease: improving global outcomes (KDIGO) acute kidney injury work group',
      'Mehta RL, et al. Acute Kidney Injury Network: report of an initiative to improve outcomes in acute kidney injury'
    ],
    difficulty: 'easy',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-026',
    question: 'A patient presents with AKI and anion gap metabolic acidosis. Urine anion gap is positive. What is the most likely cause?',
    options: [
      'Diarrhea',
      'Ureterosigmoidostomy',
      'Acute tubular necrosis',
      'Carbonic anhydrase inhibitor use'
    ],
    correctIndex: 2,
    explanation: 'Positive urine anion gap (UAG = UNa + UK - UCl) suggests impaired urinary acidification (inability to excrete NH4+). In AKI/ATN, the kidneys cannot acidify urine normally. Negative UAG suggests intact acidification with extrarenal acid loss (diarrhea).',
    references: [
      'Kraut JA, et al. Metabolic acidosis of CKD: diagnosis, clinical characteristics, and treatment',
      'Kamel KS, et al. Urine electrolytes and osmolality: when and how to use them'
    ],
    difficulty: 'hard',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-027',
    question: 'A patient with AKI receives gadolinium contrast for MRI and develops nephrogenic systemic fibrosis. What is the underlying mechanism?',
    options: [
      'Direct nephrotoxicity',
      'Allergic reaction',
      'Gadolinium deposition in tissues',
      'Acute interstitial nephritis'
    ],
    correctIndex: 2,
    explanation: 'Nephrogenic systemic fibrosis (NSF) occurs in patients with severe kidney disease (GFR <30) exposed to gadolinium-based contrast agents. Gadolinium is retained and deposited in tissues, causing skin thickening and organ fibrosis. Linear gadolinium agents carry higher risk than macrocyclic agents.',
    references: [
      'Grobner T. Gadolinium--a specific trigger for the development of nephrogenic fibrosing dermopathy and nephrogenic systemic fibrosis?',
      'Marckmann P, et al. Nephrogenic systemic fibrosis: suspected causative role of gadodiamide used for contrast-enhanced magnetic resonance imaging'
    ],
    difficulty: 'hard',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-028',
    question: 'A patient with diabetes and AKI has proteinuria 3+ and oval fat bodies on urinalysis. What is the most likely diagnosis?',
    options: [
      'Acute tubular necrosis',
      'Diabetic nephropathy',
      'Acute glomerulonephritis',
      'Acute interstitial nephritis'
    ],
    correctIndex: 1,
    explanation: 'Oval fat bodies (lipid-containing tubular epithelial cells) are characteristic of diabetic nephropathy and other causes of nephrotic syndrome. Heavy proteinuria with oval fat bodies suggests glomerular disease rather than tubular or interstitial disease.',
    references: [
      'Fogazzi GB, et al. Urinalysis: core curriculum 2008',
      'American Diabetes Association. Standards of Medical Care in Diabetes—2023'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-029',
    question: 'A patient with AKI develops severe volume overload refractory to diuretics. Creatinine is 4.5 mg/dL. What is the best renal replacement therapy option?',
    options: [
      'Hemodialysis',
      'Peritoneal dialysis',
      'Continuous venovenous hemofiltration',
      'Slow low-efficiency dialysis'
    ],
    correctIndex: 2,
    explanation: 'Continuous venovenous hemofiltration (CVVH) or hemodiafiltration (CVVHDF) is preferred for hemodynamically unstable patients with AKI and volume overload. It provides gentle, continuous fluid removal with better hemodynamic tolerance than intermittent hemodialysis.',
    references: [
      'Kellum JA, et al. Kidney disease: improving global outcomes (KDIGO) acute kidney injury work group',
      'Bagshaw SM, et al. Continuous versus intermittent renal replacement therapy for critically ill patients with acute kidney injury'
    ],
    difficulty: 'medium',
    topicId: 'renal-emergencies'
  },
  {
    id: 'renal-030',
    question: 'A patient presents with AKI and black urine after starting a new medication. What medication is most likely responsible?',
    options: [
      'Metronidazole',
      'Methyldopa',
      'Rifampin',
      'Phenytoin'
    ],
    correctIndex: 1,
    explanation: 'Methyldopa can cause black urine due to metabolites. Other medications causing dark urine include metronidazole (dark brown), chloroquine, and iron supplements. Black urine can also indicate myoglobinuria, melanuria, or alkaptonuria. The clinical context helps differentiate causes.',
    references: [
      'Bosch X, et al. Rhabdomyolysis and acute kidney injury',
      'Fogazzi GB, et al. Urinalysis: core curriculum 2008'
    ],
    difficulty: 'hard',
    topicId: 'renal-emergencies'
  }
];