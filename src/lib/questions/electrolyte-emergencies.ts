import { Question } from './types';

export const electrolyteEmergenciesQuestions: Question[] = [
  {
    id: 'lyte-001',
    question: 'A patient presents with muscle weakness, paralysis, and cardiac arrhythmias. Serum potassium is 7.8 mEq/L. ECG shows peaked T waves and QRS widening. What is the most urgent intervention?',
    options: [
      'Calcium gluconate 1g IV',
      'Insulin 10 units + D50W 50ml IV',
      'Sodium bicarbonate 50 mEq IV',
      'Kayexalate 30g PO'
    ],
    correctIndex: 0,
    explanation: 'Severe hyperkalemia with ECG changes (peaked T waves, QRS widening) requires immediate cardiac membrane stabilization with calcium gluconate. This antagonizes potassium\'s effects on cardiac conduction within minutes without changing serum potassium levels.',
    references: [
      'Palmer BF, et al. Managing hyperkalemia caused by inhibitors of the renin-angiotensin-aldosterone system',
      'Elliott MJ, et al. Management of patients with acute hyperkalemia. CMAJ. 2010;182(15):1631-1635'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-002',
    question: 'A patient with SIADH has serum sodium of 118 mEq/L and presents with seizures. What is the target rate of sodium correction to avoid osmotic demyelination?',
    options: [
      '2-4 mEq/L per hour',
      '0.5-1 mEq/L per hour',
      '6-8 mEq/L per hour',
      '10-12 mEq/L per hour'
    ],
    correctIndex: 1,
    explanation: 'Chronic hyponatremia should be corrected slowly at 0.5-1 mEq/L per hour (maximum 8-10 mEq/L in 24 hours) to prevent osmotic demyelination syndrome (central pontine myelinolysis). Rapid correction can cause irreversible neurologic damage.',
    references: [
      'Verbalis JG, et al. Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations',
      'Sterns RH, et al. Osmotic demyelination syndrome following correction of hyponatremia'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-003',
    question: 'A dialysis patient presents with severe muscle weakness, paralysis, and absence of deep tendon reflexes. Serum magnesium is 5.2 mg/dL. What is the most appropriate treatment?',
    options: [
      'Calcium gluconate 2g IV',
      'Furosemide 40mg IV',
      'Emergency dialysis',
      'Normal saline bolus'
    ],
    correctIndex: 0,
    explanation: 'Severe hypermagnesemia (>4 mg/dL) with neuromuscular symptoms requires calcium gluconate as an antidote. Calcium antagonizes magnesium\'s effects on neuromuscular transmission. Dialysis removes magnesium but calcium provides immediate reversal of symptoms.',
    references: [
      'Jahnen-Dechent W, et al. Magnesium basics. Clin Kidney J. 2012;5(Suppl 1):i3-i14',
      'Konrad M, et al. Inherited disorders of renal hypomagnesemia'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-004',
    question: 'A patient with chronic kidney disease presents with tetany, Chvostek\'s sign, and prolonged QT interval. Serum calcium is 6.8 mg/dL, phosphorus 8.2 mg/dL. What is the priority treatment?',
    options: [
      'Calcium gluconate 1-2g IV slowly',
      'Calcitriol 0.5 mcg PO',
      'Phosphate binders',
      'Emergency dialysis'
    ],
    correctIndex: 0,
    explanation: 'Symptomatic hypocalcemia with tetany and prolonged QT requires immediate IV calcium replacement. Calcium gluconate 1-2g IV slowly over 10-20 minutes stabilizes neuromuscular and cardiac function. Avoid rapid administration which can cause cardiac arrest.',
    references: [
      'Cooper MS, et al. Diagnosis and management of hypocalcaemia. BMJ. 2008;336(7656):1298-1302',
      'Shoback D. Clinical practice. Hypoparathyroidism. N Engl J Med. 2008;359(4):391-403'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-005',
    question: 'A patient presents with altered mental status, confusion, and serum sodium of 172 mEq/L. Free water deficit is calculated as 4 liters. What is the appropriate initial fluid therapy?',
    options: [
      'D5W at 250 ml/hr',
      '0.45% saline at 150 ml/hr',
      'Normal saline at 200 ml/hr',
      'Lactated Ringers at 300 ml/hr'
    ],
    correctIndex: 1,
    explanation: 'Severe hypernatremia requires gradual correction with hypotonic fluids. 0.45% saline provides controlled sodium and water replacement. Target correction is 0.5 mEq/L per hour (maximum 8-10 mEq/L per day) to prevent cerebral edema.',
    references: [
      'Adrogue HJ, et al. Hypernatremia. N Engl J Med. 2000;342(20):1493-1499',
      'Muhsin SA, et al. Diagnosis and treatment of hypernatremia. Best Pract Res Clin Endocrinol Metab. 2016;30(2):189-203'
    ],
    difficulty: 'hard',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-006',
    question: 'A patient on thiazide diuretics presents with weakness, muscle cramps, and flattened T waves on ECG. Serum potassium is 2.4 mEq/L. What is the maximum safe rate of potassium replacement?',
    options: [
      '40 mEq/hr via central line',
      '20 mEq/hr via peripheral IV',
      '10 mEq/hr via peripheral IV',
      '60 mEq/hr via central line'
    ],
    correctIndex: 2,
    explanation: 'Severe hypokalemia requires careful replacement. Maximum safe rate is 10 mEq/hr via peripheral IV or 20 mEq/hr via central line. Higher rates can cause cardiac arrhythmias. Total body potassium deficit is typically 200-400 mEq when serum K+ <3.0.',
    references: [
      'Gennari FJ. Hypokalemia. N Engl J Med. 1998;339(7):451-458',
      'Mount DB. Disorders of potassium balance. In: Brenner BM, ed. Brenner and Rector\'s The Kidney. 8th ed'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-007',
    question: 'A patient with rhabdomyolysis develops hyperphosphatemia (8.5 mg/dL) and secondary hypocalcemia. What is the mechanism of hypocalcemia and appropriate management?',
    options: [
      'PTH suppression - Give calcitriol',
      'Calcium-phosphate precipitation - Treat hyperphosphatemia',
      'Vitamin D deficiency - Give ergocalciferol',
      'Hypomagnesemia - Give magnesium'
    ],
    correctIndex: 1,
    explanation: 'Hyperphosphatemia causes calcium-phosphate precipitation in tissues, leading to hypocalcemia. Treating hyperphosphatemia with phosphate binders and dialysis if severe is priority. Calcium should only be given if symptomatic, as it may worsen precipitation.',
    references: [
      'Huerta-Alardín AL, et al. Bench-to-bedside review: Rhabdomyolysis -- an overview for clinicians',
      'Bosch X, et al. Rhabdomyolysis and acute kidney injury. N Engl J Med. 2009;361(1):62-72'
    ],
    difficulty: 'hard',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-008',
    question: 'A patient presents with muscle weakness, respiratory depression, and absent deep tendon reflexes. Serum magnesium is 4.8 mg/dL. The patient is anuric. What is the most effective treatment?',
    options: [
      'Calcium gluconate + furosemide',
      'Calcium gluconate + hemodialysis',
      'IV fluids + furosemide',
      'Calcium chloride only'
    ],
    correctIndex: 1,
    explanation: 'Severe hypermagnesemia in anuric patient requires dialysis for magnesium removal since kidneys cannot excrete excess. Calcium gluconate provides immediate antagonism of magnesium effects while dialysis removes magnesium. Diuretics are ineffective without kidney function.',
    references: [
      'Jahnen-Dechent W, et al. Magnesium basics. Clin Kidney J. 2012;5(Suppl 1):i3-i14',
      'Navarro-González JF, et al. Magnesium and the kidney. Nefrologia. 2009;29(6):486-493'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-009',
    question: 'A patient with malignancy presents with altered mental status, kidney stones, and serum calcium of 14.2 mg/dL. What is the most appropriate initial treatment?',
    options: [
      'Normal saline 1-2L + furosemide',
      'Calcitonin 4 units/kg IM',
      'Pamidronate 90mg IV',
      'Prednisone 40mg PO'
    ],
    correctIndex: 0,
    explanation: 'Severe hypercalcemia requires immediate volume expansion with normal saline (1-2L) followed by furosemide to enhance calcium excretion. This provides rapid initial treatment. Calcitonin and bisphosphonates are adjunctive but work more slowly.',
    references: [
      'Stewart AF. Clinical practice. Hypercalcemia associated with cancer. N Engl J Med. 2005;352(4):373-379',
      'Seymour JF, et al. Hypercalcemia in cancer. J Clin Oncol. 1993;11(7):1406-1417'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-010',
    question: 'A patient with chronic alcoholism presents with tetany, seizures, and hypokalemia (2.8 mEq/L) that is refractory to potassium replacement. What additional electrolyte should be checked and replaced?',
    options: [
      'Phosphorus',
      'Magnesium',
      'Sodium',
      'Chloride'
    ],
    correctIndex: 1,
    explanation: 'Hypomagnesemia impairs renal potassium conservation and must be corrected before potassium levels normalize. Magnesium depletion is common in alcoholics. Both magnesium and potassium should be replaced simultaneously for effective treatment.',
    references: [
      'Huang CL, et al. Mechanisms of hypokalemia in magnesium deficiency',
      'de Baaij JH, et al. Magnesium in man: implications for health and disease. Physiol Rev. 2015;95(1):1-46'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-011',
    question: 'A patient with heart failure on digoxin presents with nausea, confusion, and serum potassium of 2.9 mEq/L. What is the primary concern with hypokalemia in this patient?',
    options: [
      'Rhabdomyolysis',
      'Enhanced digoxin toxicity',
      'Metabolic alkalosis',
      'Paralytic ileus'
    ],
    correctIndex: 1,
    explanation: 'Hypokalemia enhances digoxin toxicity by increasing its binding to Na-K-ATPase pump. Even therapeutic digoxin levels can cause toxicity when potassium is low. Aggressive potassium replacement is needed before clinical signs of digoxin toxicity develop.',
    references: [
      'Bauman JL, et al. Digoxin toxicity. Drug Saf. 2006;29(4):279-301',
      'Lip GY, et al. Digoxin revisited. Postgrad Med J. 1993;69(811):337-349'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-012',
    question: 'A patient presents with altered mental status after prolonged vomiting. Serum sodium is 125 mEq/L and symptoms started 6 hours ago. What is the appropriate treatment approach?',
    options: [
      'Rapid correction with 3% saline',
      'Slow correction with normal saline',
      'Moderate correction with 3% saline',
      'Fluid restriction only'
    ],
    correctIndex: 2,
    explanation: 'Acute symptomatic hyponatremia (<48 hours) with neurologic symptoms allows more aggressive correction initially (1-2 mEq/L per hour for first few hours) with 3% saline, then slower correction to prevent osmotic demyelination.',
    references: [
      'Verbalis JG, et al. Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations',
      'Spasovski G, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia'
    ],
    difficulty: 'hard',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-013',
    question: 'A patient with hyperparathyroidism presents with confusion, kidney stones, and serum calcium 13.8 mg/dL. After IV fluids, what is the next most appropriate intervention?',
    options: [
      'Furosemide 40mg IV',
      'Calcitonin 4 units/kg IM',
      'Pamidronate 60-90mg IV',
      'Prednisone 60mg PO'
    ],
    correctIndex: 1,
    explanation: 'Calcitonin provides rapid onset (within hours) reduction in serum calcium by inhibiting osteoclastic bone resorption and increasing renal calcium excretion. Bisphosphonates take 2-4 days to work. Steroids are used mainly in granulomatous diseases.',
    references: [
      'Stewart AF. Clinical practice. Hypercalcemia associated with cancer. N Engl J Med. 2005;352(4):373-379',
      'Bilezikian JP, et al. Management of acute hypercalcemia. N Engl J Med. 1992;326(18):1196-1203'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-014',
    question: 'A patient presents with muscle weakness, constipation, and U waves on ECG. Serum potassium is 2.1 mEq/L. What is the estimated total body potassium deficit?',
    options: [
      '100-200 mEq',
      '200-400 mEq',
      '400-600 mEq',
      '600-800 mEq'
    ],
    correctIndex: 2,
    explanation: 'Serum potassium of 2.1 mEq/L represents severe depletion. Each 1 mEq/L decrease below 3.5 represents approximately 200-400 mEq total body deficit. At 2.1 mEq/L (1.4 mEq/L below normal), deficit is approximately 400-600 mEq.',
    references: [
      'Gennari FJ. Hypokalemia. N Engl J Med. 1998;339(7):451-458',
      'Mount DB. Disorders of potassium balance'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-015',
    question: 'A patient with CKD stage 5 presents with hypocalcemia (7.2 mg/dL) and hyperphosphatemia (7.8 mg/dL). What is the most appropriate approach to calcium replacement?',
    options: [
      'Aggressive IV calcium replacement',
      'Treat hyperphosphatemia first, then calcium if symptomatic',
      'Oral calcium supplements only',
      'Vitamin D replacement only'
    ],
    correctIndex: 1,
    explanation: 'In CKD with hyperphosphatemia, calcium replacement can worsen calcium-phosphate precipitation and vascular calcification. Treat hyperphosphatemia with phosphate binders first. Give calcium only if patient is symptomatic (tetany, seizures).',
    references: [
      'Kidney Disease: Improving Global Outcomes (KDIGO) CKD-MBD Update Work Group. KDIGO 2017 Clinical Practice Guideline Update for the Diagnosis, Evaluation, Prevention, and Treatment of Chronic Kidney Disease-Mineral and Bone Disorder',
      'Block GA, et al. Mineral metabolism, mortality, and morbidity in maintenance hemodialysis'
    ],
    difficulty: 'hard',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-016',
    question: 'A patient presents with generalized weakness, respiratory muscle paralysis, and flaccid quadriplegia. Serum potassium is 8.2 mEq/L. ECG shows sine wave pattern. What is the definitive treatment?',
    options: [
      'Calcium gluconate 2g IV',
      'Insulin 20 units + D50W 100ml',
      'Emergency hemodialysis',
      'Sodium bicarbonate 100 mEq'
    ],
    correctIndex: 2,
    explanation: 'Sine wave pattern indicates life-threatening hyperkalemia requiring emergent potassium removal. While calcium gluconate stabilizes membranes and insulin/bicarbonate shift potassium temporarily, hemodialysis is the definitive treatment for removal of excess potassium.',
    references: [
      'Elliott MJ, et al. Management of patients with acute hyperkalemia. CMAJ. 2010;182(15):1631-1635',
      'Palmer BF, et al. Managing hyperkalemia caused by inhibitors of the renin-angiotensin-aldosterone system'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-017',
    question: 'A patient with syndrome of inappropriate ADH (SIADH) has serum sodium of 115 mEq/L with altered mental status. What is the target serum sodium for the first 24 hours?',
    options: [
      '125-130 mEq/L',
      '130-135 mEq/L',
      '120-125 mEq/L',
      '135-140 mEq/L'
    ],
    correctIndex: 0,
    explanation: 'In severe hyponatremia, target correction is 8-10 mEq/L in the first 24 hours (maximum 18 mEq/L in 48 hours for acute cases). From 115 mEq/L, target would be 123-125 mEq/L to prevent osmotic demyelination syndrome.',
    references: [
      'Verbalis JG, et al. Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations',
      'Sterns RH, et al. Osmotic demyelination syndrome following correction of hyponatremia'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-018',
    question: 'A patient with chronic diarrhea presents with muscle weakness and hypokalemia (2.5 mEq/L). What concurrent electrolyte abnormality is most likely?',
    options: [
      'Hyponatremia',
      'Hypochloremia',
      'Hypomagnesemia',
      'Hypophosphatemia'
    ],
    correctIndex: 2,
    explanation: 'Chronic diarrhea causes loss of both potassium and magnesium. Hypomagnesemia impairs renal potassium conservation, making hypokalemia refractory to treatment until magnesium is also replaced. Both deficiencies must be corrected simultaneously.',
    references: [
      'Huang CL, et al. Mechanisms of hypokalemia in magnesium deficiency',
      'de Baaij JH, et al. Magnesium in man: implications for health and disease'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-019',
    question: 'A patient with malignancy-associated hypercalcemia (14.5 mg/dL) receives IV fluids and furosemide but calcium remains elevated. What is the next most appropriate treatment?',
    options: [
      'Increase furosemide dose',
      'Add pamidronate 60-90mg IV',
      'Start prednisone 60mg daily',
      'Begin calcitonin 4 units/kg q12h'
    ],
    correctIndex: 1,
    explanation: 'Pamidronate (bisphosphonate) is second-line treatment for malignancy-associated hypercalcemia after IV fluids. It inhibits osteoclastic bone resorption with effects lasting 2-4 weeks. More effective than calcitonin for sustained calcium reduction.',
    references: [
      'Stewart AF. Clinical practice. Hypercalcemia associated with cancer. N Engl J Med. 2005;352(4):373-379',
      'Major P, et al. Zoledronic acid is superior to pamidronate in the treatment of hypercalcemia of malignancy'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-020',
    question: 'A patient presents with altered mental status and serum sodium of 108 mEq/L. The onset is unknown. What is the safest initial approach?',
    options: [
      'Rapid correction with 3% saline',
      'Assume chronic and correct slowly',
      'Normal saline bolus',
      'Fluid restriction only'
    ],
    correctIndex: 1,
    explanation: 'When onset of hyponatremia is unknown, assume it is chronic and correct slowly (0.5-1 mEq/L per hour, maximum 8-10 mEq/L per day) to prevent osmotic demyelination. Brain has adapted to chronic hyponatremia and rapid correction is dangerous.',
    references: [
      'Verbalis JG, et al. Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations',
      'Spasovski G, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-021',
    question: 'A patient with thyrotoxicosis presents with muscle weakness and serum potassium of 2.2 mEq/L. What is the underlying mechanism of hypokalemia?',
    options: [
      'Increased renal losses',
      'Intracellular shift due to increased Na-K-ATPase activity',
      'Decreased dietary intake',
      'GI losses from diarrhea'
    ],
    correctIndex: 1,
    explanation: 'Thyrotoxicosis causes hypokalemia by increasing Na-K-ATPase pump activity, shifting potassium intracellularly. This is a redistribution hypokalemia, not true potassium depletion. Treatment includes potassium replacement and treating hyperthyroidism.',
    references: [
      'Kung AW. Clinical review: Thyrotoxic periodic paralysis: a diagnostic challenge',
      'Manoukian MA, et al. Hypokalemia in thyrotoxicosis'
    ],
    difficulty: 'hard',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-022',
    question: 'A patient presents with fatigue, constipation, and shortened QT interval on ECG. Serum calcium is 12.8 mg/dL. What is the most likely cause in an outpatient setting?',
    options: [
      'Malignancy',
      'Primary hyperparathyroidism',
      'Granulomatous disease',
      'Milk-alkali syndrome'
    ],
    correctIndex: 1,
    explanation: 'Primary hyperparathyroidism is the most common cause of outpatient hypercalcemia, usually due to parathyroid adenoma. Malignancy is more common in hospitalized patients. PTH levels help distinguish between PTH-mediated and PTH-independent causes.',
    references: [
      'Bilezikian JP, et al. Primary hyperparathyroidism. Nat Rev Dis Primers. 2016;2:16033',
      'Stewart AF. Clinical practice. Hypercalcemia associated with cancer. N Engl J Med. 2005;352(4):373-379'
    ],
    difficulty: 'easy',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-023',
    question: 'A patient with rhabdomyolysis develops hyperphosphatemia (9.2 mg/dL), hypocalcemia (6.8 mg/dL), and oliguria. What is the most appropriate management priority?',
    options: [
      'Immediate calcium replacement',
      'Phosphate binders and dialysis consultation',
      'IV fluids and alkalinization',
      'Calcitriol administration'
    ],
    correctIndex: 1,
    explanation: 'In rhabdomyolysis with severe hyperphosphatemia and oliguria, phosphate removal takes priority. Calcium replacement can worsen calcium-phosphate precipitation. Dialysis effectively removes phosphate and treats oliguria. Calcium only if symptomatic.',
    references: [
      'Bosch X, et al. Rhabdomyolysis and acute kidney injury. N Engl J Med. 2009;361(1):62-72',
      'Torres PA, et al. Rhabdomyolysis: pathogenesis, diagnosis, and treatment'
    ],
    difficulty: 'hard',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-024',
    question: 'A patient with diabetes insipidus presents with altered mental status and serum sodium of 165 mEq/L. Free water deficit is 3 liters. What is the appropriate correction rate?',
    options: [
      '0.5 mEq/L per hour',
      '2 mEq/L per hour',
      '1 mEq/L per hour',
      '3 mEq/L per hour'
    ],
    correctIndex: 2,
    explanation: 'Hypernatremia correction should not exceed 1 mEq/L per hour (maximum 8-10 mEq/L per day) to prevent cerebral edema. Too rapid correction can cause brain swelling as water moves into cells that have adapted to hyperosmolar state.',
    references: [
      'Adrogue HJ, et al. Hypernatremia. N Engl J Med. 2000;342(20):1493-1499',
      'Muhsin SA, et al. Diagnosis and treatment of hypernatremia'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-025',
    question: 'A patient taking ACE inhibitors and potassium supplements presents with muscle weakness and serum potassium of 6.5 mEq/L. ECG shows peaked T waves. What is the first intervention after stopping medications?',
    options: [
      'Calcium gluconate 1g IV',
      'Insulin 10 units + D50W',
      'Sodium bicarbonate 50 mEq',
      'Kayexalate 30g PO'
    ],
    correctIndex: 0,
    explanation: 'With ECG changes (peaked T waves) indicating cardiac toxicity from hyperkalemia, calcium gluconate is the first intervention to stabilize cardiac membranes. This provides immediate cardioprotection while other therapies work to lower serum potassium.',
    references: [
      'Elliott MJ, et al. Management of patients with acute hyperkalemia. CMAJ. 2010;182(15):1631-1635',
      'Palmer BF, et al. Managing hyperkalemia caused by inhibitors of the renin-angiotensin-aldosterone system'
    ],
    difficulty: 'easy',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-026',
    question: 'A patient with chronic alcoholism presents with tremors, confusion, and normal serum magnesium (2.0 mg/dL). However, they have refractory hypokalemia. What is the explanation?',
    options: [
      'Serum magnesium is unreliable - give magnesium trial',
      'Different cause of hypokalemia',
      'Concurrent phosphorus deficiency',
      'Laboratory error'
    ],
    correctIndex: 0,
    explanation: 'Serum magnesium poorly reflects total body magnesium stores. Intracellular and bone magnesium can be depleted with normal serum levels. In chronic alcoholism with refractory hypokalemia, empirical magnesium replacement is appropriate.',
    references: [
      'de Baaij JH, et al. Magnesium in man: implications for health and disease. Physiol Rev. 2015;95(1):1-46',
      'Huang CL, et al. Mechanisms of hypokalemia in magnesium deficiency'
    ],
    difficulty: 'hard',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-027',
    question: 'A patient with multiple myeloma presents with confusion, polyuria, and serum calcium of 13.2 mg/dL. What is the most likely mechanism of hypercalcemia?',
    options: [
      'PTH oversecretion',
      'Increased 1,25-dihydroxyvitamin D',
      'Osteolytic bone lesions',
      'Decreased renal calcium excretion'
    ],
    correctIndex: 2,
    explanation: 'Multiple myeloma causes hypercalcemia through osteolytic bone lesions that release calcium into circulation. This is PTH-independent hypercalcemia. Other malignancies may cause hypercalcemia through PTH-related protein (PTHrP) secretion.',
    references: [
      'Stewart AF. Clinical practice. Hypercalcemia associated with cancer. N Engl J Med. 2005;352(4):373-379',
      'Rajkumar SV, et al. Multiple myeloma: 2020 update on diagnosis, risk-stratification and management'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-028',
    question: 'A patient presents with muscle cramps, tetany, and positive Trousseau\'s sign. Serum calcium is 7.8 mg/dL, magnesium 1.2 mg/dL. What is the appropriate treatment sequence?',
    options: [
      'Calcium first, then magnesium',
      'Magnesium first, then calcium',
      'Both simultaneously',
      'Calcium only'
    ],
    correctIndex: 2,
    explanation: 'Concurrent hypomagnesemia and hypocalcemia require simultaneous replacement. Hypomagnesemia impairs PTH secretion and action, making hypocalcemia refractory to calcium alone. Both deficiencies must be corrected together.',
    references: [
      'Shoback D. Clinical practice. Hypoparathyroidism. N Engl J Med. 2008;359(4):391-403',
      'Cooper MS, et al. Diagnosis and management of hypocalcaemia. BMJ. 2008;336(7656):1298-1302'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-029',
    question: 'A patient with heart failure exacerbation receives high-dose furosemide and develops muscle weakness and cramping. Serum potassium is 2.6 mEq/L. What additional consideration is important?',
    options: [
      'Check serum digoxin level',
      'Assess for thiamine deficiency',
      'Monitor for metabolic alkalosis',
      'All of the above'
    ],
    correctIndex: 3,
    explanation: 'Loop diuretics cause multiple complications in heart failure: hypokalemia enhances digoxin toxicity, promotes metabolic alkalosis, and may worsen thiamine deficiency (important in heart failure). All should be monitored and addressed.',
    references: [
      'Ellison DH, et al. Diuretic therapy and resistance in congestive heart failure',
      'Sica DA. Diuretic-related side effects: development and treatment'
    ],
    difficulty: 'medium',
    topicId: 'electrolyte-emergencies'
  },
  {
    id: 'lyte-030',
    question: 'A patient with tumor lysis syndrome develops hyperphosphatemia (8.8 mg/dL), hypocalcemia (6.2 mg/dL), and hyperkalemia (6.2 mEq/L). What is the treatment priority?',
    options: [
      'Calcium replacement for hypocalcemia',
      'Treat hyperkalemia first',
      'Phosphate binders and dialysis',
      'IV fluids and allopurinol'
    ],
    correctIndex: 1,
    explanation: 'In tumor lysis syndrome with multiple electrolyte abnormalities, hyperkalemia poses the most immediate life threat (cardiac arrhythmias). Treat hyperkalemia first, then hyperphosphatemia. Avoid calcium replacement which worsens calcium-phosphate precipitation.',
    references: [
      'Howard SC, et al. The tumor lysis syndrome. N Engl J Med. 2011;364(19):1844-1854',
      'Cairo MS, et al. Tumour lysis syndrome: new therapeutic strategies and classification'
    ],
    difficulty: 'hard',
    topicId: 'electrolyte-emergencies'
  }
];