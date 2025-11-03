import { Question } from './types';

export const endocrineEmergenciesQuestions: Question[] = [
  {
    id: 'endo-001',
    question: 'A patient presents with polyuria, polydipsia, weight loss, and glucose 450 mg/dL. ABG shows pH 7.25, HCO3 12 mEq/L. What is the most likely diagnosis?',
    options: [
      'Diabetic ketoacidosis',
      'Hyperosmolar hyperglycemic state',
      'Type 2 diabetes',
      'Starvation ketosis'
    ],
    correctIndex: 0,
    explanation: 'Diabetic ketoacidosis (DKA) presents with hyperglycemia (usually >250 mg/dL), metabolic acidosis (pH <7.3, HCO3 <18 mEq/L), and ketosis. The classic symptoms include polyuria, polydipsia, and weight loss. DKA is more common in type 1 diabetes but can occur in type 2.',
    references: [
      'Kitabchi AE, et al. Hyperglycemic crises in adult patients with diabetes: a consensus statement from the American Diabetes Association',
      'Wolfsdorf JI, et al. Diabetic ketoacidosis and hyperglycemic hyperosmolar state: ISPAD Clinical Practice Consensus Guidelines 2018'
    ],
    difficulty: 'easy',
    topicId: 'endocrine-emergencies',
    patientPresentation: {
      age: 28,
      gender: 'Male',
      chiefComplaint: 'Excessive thirst, frequent urination, and 15-pound weight loss over 2 weeks',
      vitalSigns: {
        heartRate: 115,
        bloodPressure: '105/70 mmHg',
        temperature: 99.2,
        respiratoryRate: 22,
        oxygenSaturation: 98
      },
      pastMedicalHistory: ['Type 1 diabetes diagnosed 2 years ago'],
      currentMedications: ['Insulin glargine (recently stopped due to cost)', 'Insulin aspart (sporadic use)'],
      physicalExam: 'Weight loss evident, mild dehydration, fruity breath odor, Kussmaul respirations',
      labsImaging: 'Glucose: 450 mg/dL, pH: 7.25, HCO3: 12 mEq/L, Ketones: 3+ positive, Anion gap: 18'
    }
  },
  {
    id: 'endo-002',
    question: 'A 70-year-old patient with diabetes presents with altered mental status and glucose 800 mg/dL. Serum osmolality is 350 mOsm/kg. Ketones are negative. What is the diagnosis?',
    options: [
      'Diabetic ketoacidosis',
      'Hyperosmolar hyperglycemic state',
      'Diabetic coma',
      'Uremic encephalopathy'
    ],
    correctIndex: 1,
    explanation: 'Hyperosmolar hyperglycemic state (HHS) presents with severe hyperglycemia (>600 mg/dL), hyperosmolality (>320 mOsm/kg), and altered mental status without significant ketosis. It typically occurs in elderly patients with type 2 diabetes and has higher mortality than DKA.',
    references: [
      'Pasquel FJ, et al. Hyperglycemic crises: diabetic ketoacidosis and hyperglycemic hyperosmolar state',
      'Kitabchi AE, et al. Hyperglycemic crises in adult patients with diabetes'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies',
    patientPresentation: {
      age: 70,
      gender: 'Female',
      chiefComplaint: 'Progressive confusion and weakness over several days',
      vitalSigns: {
        heartRate: 105,
        bloodPressure: '95/60 mmHg',
        temperature: 98.8,
        respiratoryRate: 18,
        oxygenSaturation: 96
      },
      pastMedicalHistory: ['Type 2 diabetes for 15 years', 'Hypertension', 'Recent UTI'],
      currentMedications: ['Metformin 1000mg BID', 'Glipizide 10mg daily', 'Amlodipine 5mg daily'],
      physicalExam: 'Weight: 165 lbs (75 kg), severe dehydration, altered mental status, no fruity breath odor',
      labsImaging: 'Glucose: 800 mg/dL, Serum osmolality: 350 mOsm/kg, Ketones: negative, Creatinine: 2.1 mg/dL, Sodium: 145 mEq/L'
    }
  },
  {
    id: 'endo-003',
    question: 'A patient with DKA receives IV insulin therapy. What is the target rate of glucose decrease?',
    options: [
      '50-70 mg/dL/hour',
      '75-100 mg/dL/hour',
      '100-150 mg/dL/hour',
      '150-200 mg/dL/hour'
    ],
    correctIndex: 0,
    explanation: 'The target rate of glucose decrease in DKA is 50-70 mg/dL/hour. Too rapid correction can lead to cerebral edema, especially in children. When glucose reaches 200-250 mg/dL, dextrose should be added to IV fluids while continuing insulin to clear ketosis.',
    references: [
      'Kitabchi AE, et al. Hyperglycemic crises in adult patients with diabetes',
      'Wolfsdorf JI, et al. Diabetic ketoacidosis and hyperglycemic hyperosmolar state: ISPAD Clinical Practice Consensus Guidelines 2018'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-004',
    question: 'A patient presents with fatigue, weakness, hypotension, and hyperpigmentation. Sodium is 125 mEq/L, potassium 5.5 mEq/L. What is the most likely diagnosis?',
    options: [
      'Primary hypothyroidism',
      'Secondary adrenal insufficiency',
      'Primary adrenal insufficiency (Addison disease)',
      'Syndrome of inappropriate ADH'
    ],
    correctIndex: 2,
    explanation: 'Primary adrenal insufficiency (Addison disease) presents with fatigue, weakness, hypotension, hyperpigmentation, hyponatremia, and hyperkalemia. The hyperpigmentation is due to elevated ACTH. Laboratory findings include low cortisol and elevated ACTH.',
    references: [
      'Bornstein SR, et al. Diagnosis and treatment of primary adrenal insufficiency: an Endocrine Society clinical practice guideline',
      'Husebye ES, et al. Consensus statement on the diagnosis, treatment and follow-up of patients with primary adrenal insufficiency'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-005',
    question: 'A patient with known adrenal insufficiency presents in shock. What is the most appropriate initial treatment?',
    options: [
      'Hydrocortisone 100mg IV',
      'Dexamethasone 4mg IV',
      'Prednisolone 60mg PO',
      'Fludrocortisone 0.1mg PO'
    ],
    correctIndex: 0,
    explanation: 'Adrenal crisis requires immediate treatment with hydrocortisone 100mg IV followed by 200-300mg/day in divided doses. Hydrocortisone has both glucocorticoid and mineralocorticoid activity. Dexamethasone can be used if hydrocortisone is unavailable, but it lacks mineralocorticoid activity.',
    references: [
      'Bornstein SR, et al. Diagnosis and treatment of primary adrenal insufficiency: an Endocrine Society clinical practice guideline',
      'Annane D, et al. Effect of treatment with low doses of hydrocortisone and fludrocortisone on mortality in patients with septic shock'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-006',
    question: 'A patient presents with severe hypoglycemia (glucose 25 mg/dL) and is unconscious. What is the most appropriate initial treatment?',
    options: [
      'Glucagon 1mg IM',
      'Dextrose 50% 50mL IV',
      'Orange juice PO',
      'Octreotide 50mcg SC'
    ],
    correctIndex: 1,
    explanation: 'Severe hypoglycemia with altered consciousness requires immediate IV dextrose. Give 25-50mL of 50% dextrose IV (or 50-100mL of 25% dextrose). Glucagon can be used if IV access is unavailable. Never give oral treatments to unconscious patients due to aspiration risk.',
    references: [
      'American Diabetes Association. Standards of Medical Care in Diabetes—2023',
      'Cryer PE, et al. Evaluation and management of adult hypoglycemic disorders: an Endocrine Society Clinical Practice Guideline'
    ],
    difficulty: 'easy',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-007',
    question: 'A patient presents with thyroid storm. Which medication is most important for immediate treatment?',
    options: [
      'Propylthiouracil (PTU)',
      'Methimazole',
      'Propranolol',
      'Iodine solution'
    ],
    correctIndex: 2,
    explanation: 'In thyroid storm, propranolol is the most important immediate treatment as it rapidly controls life-threatening symptoms (tachycardia, hypertension, hyperthermia). PTU or methimazole blocks new hormone synthesis, and iodine blocks hormone release, but beta-blockade provides immediate symptom control.',
    references: [
      'Ross DS, et al. 2016 American Thyroid Association guidelines for diagnosis and management of hyperthyroidism and other causes of thyrotoxicosis',
      'Carroll R, et al. Endocrine emergencies in the elderly'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-008',
    question: 'A patient presents with severe hypothyroidism and coma. Temperature is 89°F (32°C). What is the most likely diagnosis?',
    options: [
      'Myxedema coma',
      'Thyroid storm',
      'Addisonian crisis',
      'Hypothermic coma'
    ],
    correctIndex: 0,
    explanation: 'Myxedema coma is severe, life-threatening hypothyroidism presenting with altered mental status, hypothermia, bradycardia, and hypoventilation. It has high mortality and requires immediate treatment with IV levothyroxine and supportive care including rewarming.',
    references: [
      'Jonklaas J, et al. Guidelines for the treatment of hypothyroidism: prepared by the american thyroid association task force on thyroid hormone replacement',
      'Mathew V, et al. Myxoedema coma. Acta Anaesthesiol Scand. 2011;55(5):515-527'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-009',
    question: 'A patient with diabetes presents with glucose 35 mg/dL after taking insulin. They are awake but confused. What is the most appropriate treatment?',
    options: [
      'Dextrose 50% 50mL IV',
      'Glucose tablets PO',
      'Glucagon 1mg IM',
      'Complex carbohydrates PO'
    ],
    correctIndex: 1,
    explanation: 'For conscious patients with mild to moderate hypoglycemia, oral glucose tablets (15-20g glucose) are preferred as they are rapidly absorbed and provide precise dosing. If the patient cannot take oral intake safely, then IV dextrose should be used.',
    references: [
      'American Diabetes Association. Standards of Medical Care in Diabetes—2023',
      'Seaquist ER, et al. Hypoglycemia and diabetes: a report of a workgroup of the American Diabetes Association'
    ],
    difficulty: 'easy',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-010',
    question: 'A patient presents with calcium 14.5 mg/dL, confusion, and kidney stones. PTH is elevated. What is the most likely diagnosis?',
    options: [
      'Primary hyperparathyroidism',
      'Malignancy-related hypercalcemia',
      'Sarcoidosis',
      'Vitamin D intoxication'
    ],
    correctIndex: 0,
    explanation: 'Primary hyperparathyroidism is characterized by elevated calcium with elevated or inappropriately normal PTH. It\'s the most common cause of hypercalcemia in outpatients. The classic presentation includes "stones, bones, groans, and psychiatric moans."',
    references: [
      'Bilezikian JP, et al. Primary hyperparathyroidism. Nat Rev Dis Primers. 2016;2:16033',
      'Walker MD, et al. Primary hyperparathyroidism. Nat Rev Endocrinol. 2018;14(2):115-125'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-011',
    question: 'A patient presents with severe hypercalcemia (16 mg/dL) and altered mental status. What is the most appropriate initial treatment?',
    options: [
      'Normal saline IV',
      'Furosemide IV',
      'Calcitonin SC',
      'Bisphosphonates IV'
    ],
    correctIndex: 0,
    explanation: 'Severe hypercalcemia requires immediate treatment with IV normal saline to restore volume and enhance renal calcium excretion. This is the most rapid intervention. Calcitonin can be added for quicker effect, and bisphosphonates for sustained calcium lowering.',
    references: [
      'Carroll MF, et al. A practical approach to hypercalcemia. Am Fam Physician. 2003;67(9):1959-1966',
      'Stewart AF. Clinical practice. Hypercalcemia associated with cancer. N Engl J Med. 2005;352(4):373-379'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-012',
    question: 'A patient presents with numbness, tingling, and positive Chvostek sign. Calcium is 6.5 mg/dL. What is the most appropriate acute treatment?',
    options: [
      'Calcium carbonate PO',
      'Calcium gluconate IV',
      'Vitamin D supplementation',
      'Magnesium sulfate IV'
    ],
    correctIndex: 1,
    explanation: 'Symptomatic hypocalcemia with tetany requires immediate IV calcium. Calcium gluconate 1-2 grams (10-20mL of 10% solution) in 50-100mL normal saline over 10-20 minutes. Calcium chloride can also be used but is more irritating to veins.',
    references: [
      'Cooper MS, et al. Diagnosis and management of hypocalcaemia. BMJ. 2008;336(7656):1298-1302',
      'Schafer AL, et al. Hypocalcemia: diagnosis and treatment. In: Feingold KR, et al., editors. Endotext'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-013',
    question: 'A patient with diabetes insipidus presents with sodium 155 mEq/L and polyuria. What is the most appropriate treatment?',
    options: [
      'Desmopressin (DDAVP)',
      'Free water restriction',
      'Normal saline IV',
      'Hydrochlorothiazide'
    ],
    correctIndex: 0,
    explanation: 'Central diabetes insipidus with hypernatremia and polyuria should be treated with desmopressin (DDAVP), a synthetic ADH analog. This replaces the deficient hormone and reduces urine output. Free water replacement is also important to correct hypernatremia.',
    references: [
      'Christ-Crain M, et al. Diabetes insipidus. Nat Rev Dis Primers. 2019;5(1):54',
      'Garrahy A, et al. Diagnosis and management of central diabetes insipidus in adults'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-014',
    question: 'A patient presents with hyponatremia (120 mEq/L) and seizures. What is the most appropriate initial treatment?',
    options: [
      '3% hypertonic saline',
      'Normal saline',
      'Free water restriction',
      'Demeclocycline'
    ],
    correctIndex: 0,
    explanation: 'Severe symptomatic hyponatremia with seizures requires immediate treatment with 3% hypertonic saline. Give 100-150mL IV to raise sodium by 4-6 mEq/L acutely to stop seizures. Avoid overcorrection (>8-10 mEq/L/day) to prevent osmotic demyelination.',
    references: [
      'Spasovski G, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia',
      'Verbalis JG, et al. Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-015',
    question: 'A patient presents with pheochromocytoma crisis. Blood pressure is 220/130 mmHg. What is the most appropriate antihypertensive?',
    options: [
      'Nifedipine',
      'Phentolamine',
      'Propranolol',
      'Hydralazine'
    ],
    correctIndex: 1,
    explanation: 'Pheochromocytoma crisis requires alpha-blockade first with phentolamine (alpha-blocker). Never use beta-blockers alone as this can worsen hypertension through unopposed alpha stimulation. Beta-blockers can be added after adequate alpha-blockade.',
    references: [
      'Lenders JW, et al. Pheochromocytoma and paraganglioma: an endocrine society clinical practice guideline',
      'Prejbisz A, et al. Cardiovascular manifestations of phaeochromocytoma'
    ],
    difficulty: 'hard',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-016',
    question: 'A patient with type 1 diabetes presents with abdominal pain, vomiting, and glucose 300 mg/dL. Urine ketones are large. What is the most important initial lab to check?',
    options: [
      'Serum ketones',
      'Arterial blood gas',
      'Lipase',
      'Complete blood count'
    ],
    correctIndex: 1,
    explanation: 'Arterial blood gas is the most important initial lab to assess for metabolic acidosis in suspected DKA. The diagnosis requires hyperglycemia (>250 mg/dL), ketosis, and metabolic acidosis (pH <7.3, HCO3 <18 mEq/L). ABG provides immediate assessment of acid-base status.',
    references: [
      'Kitabchi AE, et al. Hyperglycemic crises in adult patients with diabetes',
      'American Diabetes Association. Standards of Medical Care in Diabetes—2023'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-017',
    question: 'A patient with DKA has glucose 180 mg/dL after 6 hours of insulin therapy. pH is still 7.2. What should be done with insulin therapy?',
    options: [
      'Stop insulin',
      'Decrease insulin rate',
      'Continue current insulin rate and add dextrose',
      'Increase insulin rate'
    ],
    correctIndex: 2,
    explanation: 'When glucose falls to 200-250 mg/dL in DKA, add dextrose to IV fluids but continue insulin therapy to clear ketosis and correct acidosis. The goal is to maintain glucose 150-200 mg/dL while continuing insulin until ketosis clears (pH >7.3, HCO3 >15 mEq/L).',
    references: [
      'Kitabchi AE, et al. Hyperglycemic crises in adult patients with diabetes',
      'Nyenwe EA, et al. The evolution of diabetic ketoacidosis: An update of its etiology, pathogenesis and management'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-018',
    question: 'A patient presents with confusion and sodium 110 mEq/L. Urine osmolality is 400 mOsm/kg. TSH and cortisol are normal. What is the most likely diagnosis?',
    options: [
      'Primary polydipsia',
      'SIADH',
      'Addison disease',
      'Hypothyroidism'
    ],
    correctIndex: 1,
    explanation: 'SIADH (syndrome of inappropriate ADH secretion) presents with hyponatremia, concentrated urine (>100 mOsm/kg), normal volume status, and normal thyroid/adrenal function. Common causes include malignancy, CNS disorders, pulmonary disease, and medications.',
    references: [
      'Ellison DH, et al. The syndrome of inappropriate antidiuresis. N Engl J Med. 2007;356(20):2064-2072',
      'Spasovski G, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-019',
    question: 'A patient with diabetes takes sulfonylurea and presents with recurrent hypoglycemia. What is the most appropriate additional treatment?',
    options: [
      'Frequent glucose monitoring',
      'Octreotide',
      'Continuous dextrose infusion',
      'Glucagon injection'
    ],
    correctIndex: 1,
    explanation: 'Sulfonylurea-induced hypoglycemia can be prolonged and recurrent due to the long half-life of these medications. Octreotide inhibits insulin release from pancreatic beta cells and can prevent recurrent hypoglycemia. Continuous dextrose alone may perpetuate insulin release.',
    references: [
      'Glatstein M, et al. Octreotide for the treatment of sulfonylurea poisoning',
      'McLaughlin SA, et al. Octreotide: an antidote for sulfonylurea-induced hypoglycemia'
    ],
    difficulty: 'hard',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-020',
    question: 'A patient presents with fatigue, constipation, and depression. Calcium is 11.5 mg/dL, PTH is suppressed. What is the most likely cause?',
    options: [
      'Primary hyperparathyroidism',
      'Malignancy-related hypercalcemia',
      'Sarcoidosis',
      'Milk-alkali syndrome'
    ],
    correctIndex: 1,
    explanation: 'Hypercalcemia with suppressed PTH suggests a non-parathyroid cause. Malignancy is the most common cause of hypercalcemia in hospitalized patients. PTH-related protein (PTHrP) or osteolytic lesions can cause hypercalcemia with appropriately suppressed PTH.',
    references: [
      'Stewart AF. Clinical practice. Hypercalcemia associated with cancer',
      'Goldner W. Cancer-related hypercalcemia. J Oncol Pract. 2016;12(5):426-432'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-021',
    question: 'A pregnant patient at 20 weeks presents with thyrotoxicosis. Which medication is preferred?',
    options: [
      'Methimazole',
      'Propylthiouracil (PTU)',
      'Radioactive iodine',
      'Propranolol only'
    ],
    correctIndex: 1,
    explanation: 'PTU is preferred in the first trimester of pregnancy due to teratogenic risks of methimazole. However, PTU has hepatotoxicity risks, so methimazole is preferred in the second and third trimesters. Radioactive iodine is contraindicated in pregnancy.',
    references: [
      'Alexander EK, et al. 2017 Guidelines of the American Thyroid Association for the diagnosis and management of thyroid disease during pregnancy and the postpartum',
      'Ross DS, et al. 2016 American Thyroid Association guidelines for diagnosis and management of hyperthyroidism'
    ],
    difficulty: 'hard',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-022',
    question: 'A patient with diabetes presents with gastroparesis and frequent hypoglycemia. What medication adjustment is most appropriate?',
    options: [
      'Increase rapid-acting insulin',
      'Switch to regular insulin',
      'Add metoclopramide',
      'Use continuous insulin infusion'
    ],
    correctIndex: 1,
    explanation: 'In diabetic gastroparesis, delayed gastric emptying can cause hypoglycemia when rapid-acting insulin peaks before food absorption. Switching to regular insulin (slower onset, longer duration) or reducing/delaying rapid-acting insulin doses can help match insulin action to delayed food absorption.',
    references: [
      'Bharucha AE, et al. Diabetic gastroparesis. Endocr Rev. 2019;40(5):1318-1352',
      'Camilleri M, et al. Clinical guideline: management of gastroparesis'
    ],
    difficulty: 'hard',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-023',
    question: 'A patient presents with weight gain, purple striae, and hypertension. 24-hour urine cortisol is elevated. What is the next step?',
    options: [
      'CT abdomen',
      'Dexamethasone suppression test',
      'ACTH level',
      'MRI pituitary'
    ],
    correctIndex: 2,
    explanation: 'After confirming hypercortisolism with elevated 24-hour urine cortisol, the next step is measuring ACTH to determine if the source is ACTH-dependent (pituitary or ectopic ACTH) or ACTH-independent (adrenal). ACTH <20 pg/mL suggests adrenal source.',
    references: [
      'Nieman LK, et al. The diagnosis of Cushing\'s syndrome: an Endocrine Society Clinical Practice Guideline',
      'Lacroix A, et al. Cushing\'s syndrome. Lancet. 2015;386(9996):913-927'
    ],
    difficulty: 'hard',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-024',
    question: 'A patient with adrenal insufficiency is scheduled for surgery. What is the appropriate perioperative steroid management?',
    options: [
      'Continue home dose',
      'Double home dose',
      'Hydrocortisone 100mg IV before surgery',
      'No steroids needed'
    ],
    correctIndex: 2,
    explanation: 'Major surgery in patients with adrenal insufficiency requires stress-dose steroids: hydrocortisone 100mg IV before surgery, then 50mg IV every 8 hours for 24-48 hours. Minor procedures may only require doubling the home dose. This prevents adrenal crisis.',
    references: [
      'Bornstein SR, et al. Diagnosis and treatment of primary adrenal insufficiency: an Endocrine Society clinical practice guideline',
      'Liu MM, et al. Perioperative steroid management: approaches based on current evidence'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-025',
    question: 'A patient presents with muscle weakness, hypokalemia (2.8 mEq/L), and hypertension. Aldosterone is elevated, renin is suppressed. What is the most likely diagnosis?',
    options: [
      'Primary hyperaldosteronism',
      'Renovascular hypertension',
      'Pheochromocytoma',
      'Cushing syndrome'
    ],
    correctIndex: 0,
    explanation: 'Primary hyperaldosteronism (Conn syndrome) presents with hypertension, hypokalemia, elevated aldosterone, and suppressed renin. It\'s caused by aldosterone-producing adenoma or bilateral adrenal hyperplasia. The aldosterone-to-renin ratio is typically >20.',
    references: [
      'Funder JW, et al. The management of primary aldosteronism: case detection, diagnosis, and treatment: an Endocrine Society Clinical Practice Guideline',
      'Young WF. Primary aldosteronism: renaissance of a syndrome'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-026',
    question: 'A patient with untreated hyperthyroidism undergoes surgery and develops hyperthermia, tachycardia, and altered mental status. What is the most likely diagnosis?',
    options: [
      'Malignant hyperthermia',
      'Thyroid storm',
      'Sepsis',
      'Neuroleptic malignant syndrome'
    ],
    correctIndex: 1,
    explanation: 'Thyroid storm can be precipitated by surgery, infection, or other stressors in patients with untreated hyperthyroidism. It presents with hyperthermia, severe tachycardia, altered mental status, and cardiovascular collapse. Immediate treatment with antithyroid drugs, beta-blockers, and iodine is essential.',
    references: [
      'Ross DS, et al. 2016 American Thyroid Association guidelines for diagnosis and management of hyperthyroidism',
      'Carroll R, et al. Endocrine emergencies in the elderly'
    ],
    difficulty: 'medium',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-027',
    question: 'A patient with diabetes presents with nausea and glucose 280 mg/dL. Urine ketones are negative, but serum beta-hydroxybutyrate is elevated. What is the diagnosis?',
    options: [
      'Diabetic ketoacidosis',
      'Hyperosmolar hyperglycemic state',
      'Euglycemic DKA',
      'Starvation ketosis'
    ],
    correctIndex: 0,
    explanation: 'This is DKA with negative urine ketones. Urine ketones primarily detect acetoacetate, while serum beta-hydroxybutyrate is more specific for ketosis. Some patients with DKA may have negative urine ketones but positive serum ketones, especially early in the course.',
    references: [
      'Kitabchi AE, et al. Hyperglycemic crises in adult patients with diabetes',
      'Sheikh-Ali M, et al. Can serum beta-hydroxybutyrate be used to diagnose diabetic ketoacidosis?'
    ],
    difficulty: 'hard',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-028',
    question: 'A patient presents with polyuria, polydipsia, and hypernatremia. Urine osmolality is 150 mOsm/kg. DDAVP test shows minimal response. What is the diagnosis?',
    options: [
      'Central diabetes insipidus',
      'Nephrogenic diabetes insipidus',
      'Primary polydipsia',
      'SIADH'
    ],
    correctIndex: 1,
    explanation: 'Nephrogenic diabetes insipidus presents with polyuria, polydipsia, hypernatremia, and dilute urine that does not concentrate with DDAVP administration. The kidneys are resistant to ADH action. Causes include lithium, hypercalcemia, hypokalemia, and genetic mutations.',
    references: [
      'Christ-Crain M, et al. Diabetes insipidus. Nat Rev Dis Primers. 2019;5(1):54',
      'Bichet DG. Nephrogenic diabetes insipidus. Adv Chronic Kidney Dis. 2006;13(2):96-104'
    ],
    difficulty: 'hard',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-029',
    question: 'A patient with diabetes mellitus develops hyponatremia after starting an SGLT2 inhibitor. What is the most likely mechanism?',
    options: [
      'SIADH',
      'Excessive water intake',
      'Volume depletion',
      'Primary polydipsia'
    ],
    correctIndex: 2,
    explanation: 'SGLT2 inhibitors can cause volume depletion through glycosuria and natriuresis, leading to hyponatremia. The volume loss can be significant, especially in elderly patients or those on diuretics. Adequate hydration and monitoring of electrolytes is important.',
    references: [
      'Perkovic V, et al. Canagliflozin and renal outcomes in type 2 diabetes and nephropathy',
      'Liu J, et al. Effects of SGLT2 inhibitors on UTIs and genital infections in type 2 diabetes mellitus'
    ],
    difficulty: 'hard',
    topicId: 'endocrine-emergencies'
  },
  {
    id: 'endo-030',
    question: 'A patient with primary hyperparathyroidism has calcium 13.5 mg/dL and is scheduled for parathyroidectomy. What perioperative concern is most important?',
    options: [
      'Hypocalcemia',
      'Hypercalcemia',
      'Hypomagnesemia',
      'Hyperphosphatemia'
    ],
    correctIndex: 0,
    explanation: 'After parathyroidectomy for primary hyperparathyroidism, patients can develop "hungry bone syndrome" with rapid, severe hypocalcemia as bone rapidly takes up calcium. This is more common with higher preoperative calcium levels, larger adenomas, and elevated alkaline phosphatase.',
    references: [
      'Bilezikian JP, et al. Primary hyperparathyroidism. Nat Rev Dis Primers. 2016;2:16033',
      'Witteveen JE, et al. Hungry bone syndrome: still a challenge in the post-operative management of primary hyperparathyroidism'
    ],
    difficulty: 'hard',
    topicId: 'endocrine-emergencies'
  }
];