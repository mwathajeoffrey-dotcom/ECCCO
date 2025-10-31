import { Question } from './types';

export const toxicologyQuestions: Question[] = [
  {
    id: 'tox-001',
    question: 'A patient presents with altered mental status, miosis, bradypnea, and needle marks on arms. What is the most appropriate initial treatment?',
    options: [
      'Flumazenil 0.2mg IV',
      'Naloxone 0.4-2mg IV',
      'Thiamine 100mg IV',
      'Dextrose 50% 50mL IV'
    ],
    correctIndex: 1,
    explanation: 'This presentation is classic for opioid overdose (altered mental status, miosis, bradypnea). Naloxone is a competitive opioid receptor antagonist that rapidly reverses opioid-induced respiratory depression. Start with 0.4-2mg IV and titrate to adequate respirations, not full consciousness.',
    references: [
      'Doyon S, et al. Opioids. In: Nelson LS, et al. Goldfrank\'s Toxicologic Emergencies. 11th ed. McGraw Hill; 2019',
      'Boyer EW. Management of opioid analgesic overdose. N Engl J Med. 2012;367(2):146-155'
    ],
    difficulty: 'easy',
    topicId: 'toxicology'
  },
  {
    id: 'tox-002',
    question: 'A 16-year-old patient presents 8 hours after acetaminophen overdose. Serum level is 200 mg/L. What is the most appropriate treatment?',
    options: [
      'Activated charcoal',
      'N-acetylcysteine (NAC)',
      'Gastric lavage',
      'Hemodialysis'
    ],
    correctIndex: 1,
    explanation: 'N-acetylcysteine (NAC) is the antidote for acetaminophen poisoning. At 8 hours post-ingestion with a level of 200 mg/L, this is above the treatment line on the Rumack-Matthew nomogram. NAC should be started immediately. Activated charcoal is only effective within 1-2 hours of ingestion.',
    references: [
      'Larson AM, et al. Acetaminophen-induced acute liver failure: results of a United States multicenter, prospective study',
      'Rumack BH, et al. Acetaminophen poisoning and toxicity. Pediatrics. 1975;55(6):871-876'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-003',
    question: 'A patient presents with salicylate poisoning. ABG shows pH 7.52, PCO2 20 mmHg, HCO3 16 mEq/L. What is the acid-base status?',
    options: [
      'Respiratory alkalosis only',
      'Metabolic acidosis only',
      'Mixed respiratory alkalosis and metabolic acidosis',
      'Normal acid-base status'
    ],
    correctIndex: 2,
    explanation: 'Salicylate poisoning causes a mixed acid-base disorder: initial respiratory alkalosis (from direct stimulation of respiratory center) followed by metabolic acidosis (from uncoupling of oxidative phosphorylation). The pH may be alkalemic, acidemic, or normal depending on the balance.',
    references: [
      'Pearlman BL, et al. A review of salicylate poisoning. Postgrad Med. 1986;79(4):103-109',
      'Dargan PI, et al. An evidence based flowchart to guide the management of acute salicylate (aspirin) overdose'
    ],
    difficulty: 'hard',
    topicId: 'toxicology'
  },
  {
    id: 'tox-004',
    question: 'A patient presents with anticholinergic toxicity. Which of the following symptoms would you expect?',
    options: [
      'Miosis, salivation, lacrimation',
      'Mydriasis, dry mouth, urinary retention',
      'Bradycardia, bronchorrhea, diarrhea',
      'Fasciculations, muscle weakness'
    ],
    correctIndex: 1,
    explanation: 'Anticholinergic toxicity presents with the classic syndrome: "Mad as a hatter, blind as a bat, red as a beet, hot as a hare, dry as a bone." Symptoms include mydriasis, dry mouth, urinary retention, hyperthermia, altered mental status, and decreased bowel sounds.',
    references: [
      'Burns MJ, et al. Anticholinergics. In: Nelson LS, et al. Goldfrank\'s Toxicologic Emergencies. 11th ed.',
      'Rosenbaum C, et al. An approach to drug-induced delirium in hospitalized patients'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-005',
    question: 'What is the antidote for organophosphate poisoning?',
    options: [
      'Flumazenil and naloxone',
      'Atropine and pralidoxime',
      'Physostigmine and glycopyrrolate',
      'Epinephrine and diphenhydramine'
    ],
    correctIndex: 1,
    explanation: 'Organophosphate poisoning requires dual antidote therapy: atropine (competitive antagonist at muscarinic receptors) and pralidoxime (2-PAM, reactivates acetylcholinesterase). Atropine addresses muscarinic symptoms while pralidoxime helps with nicotinic effects and prevents aging of the enzyme.',
    references: [
      'Eddleston M, et al. Management of acute organophosphorus pesticide poisoning. Lancet. 2008;371(9612):597-607',
      'Peter JV, et al. Clinical features, diagnosis, and management of organophosphate poisoning'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-006',
    question: 'A patient with severe anticholinergic delirium is given physostigmine. What is the mechanism of action?',
    options: [
      'Competitive cholinergic antagonist',
      'Reversible acetylcholinesterase inhibitor',
      'GABA receptor agonist',
      'Dopamine receptor antagonist'
    ],
    correctIndex: 1,
    explanation: 'Physostigmine is a reversible acetylcholinesterase inhibitor that crosses the blood-brain barrier, making it useful for treating anticholinergic toxicity with CNS effects. By inhibiting acetylcholinesterase, it increases acetylcholine levels to overcome competitive antagonism.',
    references: [
      'Burns MJ, et al. A comparison of physostigmine and benzodiazepines for the treatment of anticholinergic poisoning',
      'Fraser AD. Use and abuse of the benzodiazepines. Ther Drug Monit. 1998;20(5):481-489'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-007',
    question: 'A patient presents with methanol poisoning. Which laboratory finding would you expect?',
    options: [
      'Normal anion gap metabolic acidosis',
      'High anion gap metabolic acidosis',
      'Respiratory alkalosis',
      'Normal acid-base status'
    ],
    correctIndex: 1,
    explanation: 'Methanol poisoning causes high anion gap metabolic acidosis due to formation of formic acid through metabolism by alcohol dehydrogenase. The osmolal gap may also be elevated early in the course. Treatment includes fomepizole (alcohol dehydrogenase inhibitor) and possibly hemodialysis.',
    references: [
      'Barceloux DG, et al. American Academy of Clinical Toxicology practice guidelines on the treatment of methanol poisoning',
      'Kraut JA, et al. Toxic alcohol ingestions: clinical features, diagnosis, and management'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-008',
    question: 'What is the antidote for ethylene glycol poisoning?',
    options: [
      'N-acetylcysteine',
      'Fomepizole',
      'Flumazenil',
      'Pralidoxime'
    ],
    correctIndex: 1,
    explanation: 'Fomepizole (4-methylpyrazole) is the antidote for ethylene glycol poisoning. It competitively inhibits alcohol dehydrogenase, preventing formation of toxic metabolites (glycolate, oxalate). Ethanol can also be used but fomepizole is preferred due to easier dosing and fewer side effects.',
    references: [
      'Barceloux DG, et al. American Academy of Clinical Toxicology practice guidelines on the treatment of ethylene glycol poisoning',
      'Brent J, et al. Fomepizole for the treatment of ethylene glycol poisoning'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-009',
    question: 'A patient presents with cyanide poisoning. What is the mechanism of toxicity?',
    options: [
      'Inhibition of sodium-potassium ATPase',
      'Inhibition of cytochrome c oxidase',
      'Uncoupling of oxidative phosphorylation',
      'Competitive inhibition of oxygen binding'
    ],
    correctIndex: 1,
    explanation: 'Cyanide binds to cytochrome c oxidase (complex IV) in the electron transport chain, preventing cellular oxygen utilization. This results in histotoxic hypoxia - oxygen is present but cells cannot use it. Treatment includes hydroxycobalamin (vitamin B12a) or sodium thiosulfate.',
    references: [
      'Hall AH, et al. Cyanide poisoning. Crit Care Clin. 2002;18(4):723-740',
      'Borron SW, et al. Hydroxocobalamin for severe acute cyanide poisoning'
    ],
    difficulty: 'hard',
    topicId: 'toxicology'
  },
  {
    id: 'tox-010',
    question: 'A patient with tricyclic antidepressant overdose presents with wide QRS complexes. What is the most appropriate treatment?',
    options: [
      'Lidocaine 1.5mg/kg IV',
      'Sodium bicarbonate 1-2 mEq/kg IV',
      'Magnesium sulfate 2g IV',
      'Procainamide 15mg/kg IV'
    ],
    correctIndex: 1,
    explanation: 'Sodium bicarbonate is the treatment of choice for tricyclic antidepressant-induced QRS widening. It works by increasing extracellular sodium concentration and raising pH, which helps overcome sodium channel blockade. Target serum pH 7.45-7.55. Avoid class Ia and Ic antiarrhythmics.',
    references: [
      'Boehnert MT, et al. Value of the QRS duration versus the serum drug level in predicting seizures and ventricular arrhythmias after an acute overdose of tricyclic antidepressants',
      'Kerr GW, et al. Tricyclic antidepressant overdose: a review'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-011',
    question: 'A patient presents with altered mental status and cherry-red skin color. What is the most likely diagnosis?',
    options: [
      'Cyanide poisoning',
      'Carbon monoxide poisoning',
      'Methemoglobinemia',
      'Hydrogen sulfide poisoning'
    ],
    correctIndex: 1,
    explanation: 'Cherry-red skin color is classically associated with carbon monoxide poisoning, though it\'s actually uncommon and usually seen only post-mortem. CO has 200-250 times greater affinity for hemoglobin than oxygen, forming carboxyhemoglobin. Treatment includes high-flow oxygen and hyperbaric oxygen for severe cases.',
    references: [
      'Weaver LK. Clinical practice. Carbon monoxide poisoning. N Engl J Med. 2009;360(12):1217-1225',
      'Hampson NB, et al. Practice recommendations in the diagnosis, management, and prevention of carbon monoxide poisoning'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-012',
    question: 'What is the antidote for methemoglobinemia?',
    options: [
      'Methylene blue',
      'Oxygen therapy',
      'N-acetylcysteine',
      'Ascorbic acid'
    ],
    correctIndex: 0,
    explanation: 'Methylene blue 1-2 mg/kg IV is the antidote for symptomatic methemoglobinemia (>20% or symptomatic at lower levels). It acts as an electron donor to reduce methemoglobin back to hemoglobin. Contraindicated in G6PD deficiency as it can cause severe hemolysis.',
    references: [
      'Wright RO, et al. Methemoglobinemia: etiology, pharmacology, and clinical management',
      'Price D. Methemoglobinemia. In: Nelson LS, et al. Goldfrank\'s Toxicologic Emergencies. 11th ed.'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-013',
    question: 'A patient presents with iron poisoning. Which phase is characterized by severe metabolic acidosis and shock?',
    options: [
      'Phase I (0-6 hours)',
      'Phase II (6-24 hours)',
      'Phase III (12-48 hours)',
      'Phase IV (weeks later)'
    ],
    correctIndex: 2,
    explanation: 'Iron poisoning has 4 phases: Phase I (0-6h) - GI symptoms; Phase II (6-24h) - apparent recovery; Phase III (12-48h) - severe systemic toxicity with metabolic acidosis, shock, coagulopathy; Phase IV (weeks later) - GI scarring. Phase III is most dangerous and may require deferoxamine.',
    references: [
      'Tenenbein M. Iron poisoning. Pediatr Clin North Am. 1986;33(2):393-409',
      'Banner W Jr, et al. Experimental iron poisoning in young pigs'
    ],
    difficulty: 'hard',
    topicId: 'toxicology'
  },
  {
    id: 'tox-014',
    question: 'What is the mechanism of action of deferoxamine in iron poisoning?',
    options: [
      'Competitive iron binding',
      'Iron chelation',
      'Enhanced iron excretion',
      'Inhibition of iron absorption'
    ],
    correctIndex: 1,
    explanation: 'Deferoxamine is an iron chelator that binds free iron, forming ferrioxamine which is then excreted in urine (turning it vin rose color). It\'s indicated for severe iron poisoning with systemic symptoms. Monitor for hypotension and ARDS with high-dose or prolonged infusion.',
    references: [
      'Proudfoot AT, et al. Management of acute iron poisoning. Med Toxicol. 1986;1(2):83-100',
      'Banner W Jr, et al. Experimental iron poisoning in young pigs'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-015',
    question: 'A patient presents with lithium toxicity. Which treatment is most effective for severe cases?',
    options: [
      'Forced diuresis',
      'Activated charcoal',
      'Hemodialysis',
      'Gastric lavage'
    ],
    correctIndex: 2,
    explanation: 'Hemodialysis is the most effective treatment for severe lithium toxicity. Lithium has ideal characteristics for dialysis: small molecule, minimal protein binding, small volume of distribution. Indications include severe symptoms, levels >4 mEq/L, or inability to excrete due to renal dysfunction.',
    references: [
      'Amdisen A. Clinical features and management of lithium poisoning. Med Toxicol Adverse Drug Exp. 1988;3(1):18-32',
      'Bailey B, et al. Lithium poisoning: a review of the literature and emergency treatment considerations'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-016',
    question: 'A patient presents with digoxin toxicity and hyperkalemia. What is the most appropriate treatment?',
    options: [
      'Calcium gluconate',
      'Digoxin-specific antibody fragments (Fab)',
      'Insulin and glucose',
      'Sodium polystyrene sulfonate'
    ],
    correctIndex: 1,
    explanation: 'Digoxin-specific antibody fragments (DigiFab) are the definitive treatment for severe digoxin toxicity. They bind digoxin and reverse toxicity rapidly. Calcium is contraindicated in digoxin toxicity as it can worsen cardiotoxicity. The hyperkalemia will resolve with Fab treatment.',
    references: [
      'Antman EM, et al. Treatment of 150 cases of life-threatening digitalis intoxication with digoxin-specific Fab antibody fragments',
      'Gheorghiade M, et al. Digoxin in the management of cardiovascular disorders'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-017',
    question: 'A patient presents with beta-blocker overdose and refractory hypotension. What is the most appropriate treatment?',
    options: [
      'Atropine 1mg IV',
      'Dopamine infusion',
      'High-dose insulin euglycemic therapy',
      'Glucagon 5mg IV'
    ],
    correctIndex: 2,
    explanation: 'High-dose insulin euglycemic therapy (HIET) is considered first-line for severe beta-blocker or calcium channel blocker overdose with shock. Insulin improves cardiac contractility and peripheral vascular tone. Typical dosing: 1 unit/kg bolus, then 1-10 units/kg/hr with glucose to maintain euglycemia.',
    references: [
      'Kerns W 2nd, et al. Insulin improves survival in a canine model of acute beta-blocker toxicity',
      'Holger JS, et al. High-dose insulin: a consecutive case series in toxin-induced cardiogenic shock'
    ],
    difficulty: 'hard',
    topicId: 'toxicology'
  },
  {
    id: 'tox-018',
    question: 'What is the mechanism of calcium channel blocker toxicity?',
    options: [
      'Sodium channel blockade',
      'Calcium channel blockade',
      'Potassium channel activation',
      'Beta-receptor antagonism'
    ],
    correctIndex: 1,
    explanation: 'Calcium channel blockers block L-type voltage-gated calcium channels in cardiac and vascular smooth muscle, leading to decreased contractility, conduction abnormalities, and vasodilation. This results in hypotension, bradycardia, and potential cardiogenic shock in overdose.',
    references: [
      'Kerns W 2nd. Management of beta-adrenergic blocker and calcium channel antagonist toxicity',
      'St-Onge M, et al. Treatment for calcium channel blocker poisoning: a systematic review'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-019',
    question: 'A patient presents with isoniazid overdose and seizures refractory to benzodiazepines. What is the specific antidote?',
    options: [
      'Naloxone',
      'Pyridoxine (vitamin B6)',
      'Thiamine (vitamin B1)',
      'Folic acid'
    ],
    correctIndex: 1,
    explanation: 'Pyridoxine (vitamin B6) is the specific antidote for isoniazid poisoning. Isoniazid depletes pyridoxine, leading to decreased GABA synthesis and seizures. Give pyridoxine 1g IV for each gram of isoniazid ingested (or 5g if amount unknown). Seizures typically respond rapidly to pyridoxine.',
    references: [
      'Brent J, et al. Critical care toxicology: principles of management of the critically poisoned patient',
      'Chin L, et al. Acute isoniazid poisoning in childhood'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-020',
    question: 'A patient presents with mushroom poisoning after eating wild mushrooms 8 hours ago. They now have severe GI symptoms. What is the most likely species?',
    options: [
      'Amanita muscaria',
      'Amanita phalloides',
      'Psilocybe species',
      'Coprinopsis atramentaria'
    ],
    correctIndex: 1,
    explanation: 'Amanita phalloides (death cap mushroom) causes delayed severe GI symptoms 6-12 hours after ingestion, followed by apparent recovery, then hepatorenal failure. It contains amatoxins which inhibit RNA polymerase II. Treatment is supportive; consider N-acetylcysteine and silibinin if available.',
    references: [
      'Diaz JH. Amatoxin-containing mushroom poisonings: species, toxidromes, treatments, and outcomes',
      'White J, et al. Mushroom poisoning: a proposed new clinical classification'
    ],
    difficulty: 'hard',
    topicId: 'toxicology'
  },
  {
    id: 'tox-021',
    question: 'What is the antidote for warfarin overdose with active bleeding?',
    options: [
      'Vitamin K 10mg IV',
      'Fresh frozen plasma',
      '4-factor prothrombin complex concentrate',
      'Protamine sulfate'
    ],
    correctIndex: 2,
    explanation: '4-factor prothrombin complex concentrate (4F-PCC) is preferred for urgent warfarin reversal in active bleeding. It contains factors II, VII, IX, X, protein C, and protein S. It works faster than FFP and doesn\'t require thawing time. Give with vitamin K 10mg IV for sustained reversal.',
    references: [
      'Holbrook A, et al. Evidence-based management of anticoagulant therapy: Antithrombotic Therapy and Prevention of Thrombosis, 9th ed',
      'Sarode R, et al. Efficacy and safety of a 4-factor prothrombin complex concentrate in patients on vitamin K antagonists'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-022',
    question: 'A patient presents with sympathomimetic toxidrome. Which drug is most likely responsible?',
    options: [
      'Heroin',
      'Lorazepam',
      'Methamphetamine',
      'Diphenhydramine'
    ],
    correctIndex: 2,
    explanation: 'Methamphetamine causes sympathomimetic toxidrome characterized by hyperthermia, hypertension, tachycardia, mydriasis, diaphoresis, and agitation. Treatment is primarily supportive with benzodiazepines for agitation and cooling measures. Avoid beta-blockers due to unopposed alpha stimulation.',
    references: [
      'Richards JR, et al. Methamphetamine abuse and emergency department utilization',
      'Hendrickson RG, et al. Sympathomimetics. In: Nelson LS, et al. Goldfrank\'s Toxicologic Emergencies. 11th ed.'
    ],
    difficulty: 'easy',
    topicId: 'toxicology'
  },
  {
    id: 'tox-023',
    question: 'What is the most appropriate treatment for severe theophylline toxicity with seizures?',
    options: [
      'Activated charcoal',
      'Hemodialysis',
      'Beta-blockers',
      'Calcium channel blockers'
    ],
    correctIndex: 1,
    explanation: 'Hemodialysis is indicated for severe theophylline toxicity, especially with seizures, altered mental status, or levels >100 mg/L (acute) or >60 mg/L (chronic). Multiple-dose activated charcoal can also be used for GI decontamination and enhanced elimination.',
    references: [
      'Shannon M. Life-threatening events after theophylline overdose: a 10-year prospective analysis',
      'Sessler CN. Theophylline toxicity: clinical features of 116 consecutive cases'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-024',
    question: 'A patient presents with hypoglycemia, altered mental status, and high insulin levels. What is the most likely cause?',
    options: [
      'Sulfonylurea overdose',
      'Insulinoma',
      'Sepsis',
      'Liver failure'
    ],
    correctIndex: 0,
    explanation: 'Sulfonylurea overdose causes hypoglycemia with inappropriately elevated insulin levels. These drugs stimulate pancreatic beta cells to release insulin. Treatment includes dextrose and octreotide to suppress insulin release. The hypoglycemia can be prolonged and recurrent, especially with long-acting agents.',
    references: [
      'Glatstein M, et al. Octreotide for the treatment of sulfonylurea poisoning',
      'Little GL, et al. Common hypoglycemic agents'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-025',
    question: 'What is the antidote for heparin overdose?',
    options: [
      'Vitamin K',
      'Protamine sulfate',
      'Aminocaproic acid',
      'Tranexamic acid'
    ],
    correctIndex: 1,
    explanation: 'Protamine sulfate is the antidote for heparin overdose. It\'s a positively charged protein that binds to negatively charged heparin, neutralizing its anticoagulant effect. Dosing: 1mg protamine per 100 units of heparin given in the last 2-3 hours. Monitor for allergic reactions.',
    references: [
      'Shojania AM, et al. Problems of chronic anticoagulant treatment',
      'Weitz JI. Heparin and related agents'
    ],
    difficulty: 'easy',
    topicId: 'toxicology'
  },
  {
    id: 'tox-026',
    question: 'A patient presents with altered mental status and an osmolal gap of 40 mOsm/kg. What is the most likely toxic alcohol?',
    options: [
      'Methanol',
      'Ethylene glycol',
      'Isopropanol',
      'All could cause this finding'
    ],
    correctIndex: 3,
    explanation: 'All three toxic alcohols (methanol, ethylene glycol, isopropanol) can cause an elevated osmolal gap early in poisoning before metabolism occurs. The osmolal gap >10 mOsm/kg suggests toxic alcohol ingestion. Each has different metabolites and toxicity patterns.',
    references: [
      'Kraut JA, et al. Toxic alcohol ingestions: clinical features, diagnosis, and management',
      'Barceloux DG, et al. American Academy of Clinical Toxicology practice guidelines on the treatment of methanol poisoning'
    ],
    difficulty: 'hard',
    topicId: 'toxicology'
  },
  {
    id: 'tox-027',
    question: 'A patient presents with nausea, vomiting, and yellow vision after a drug overdose. What medication was likely taken?',
    options: [
      'Quinidine',
      'Digoxin',
      'Propranolol',
      'Verapamil'
    ],
    correctIndex: 1,
    explanation: 'Yellow vision (xanthopsia) is a classic sign of digoxin toxicity, along with nausea, vomiting, and cardiac arrhythmias. Other visual disturbances can include halos around lights and blurred vision. Digoxin toxicity can be life-threatening and may require digoxin-specific antibody fragments.',
    references: [
      'Gheorghiade M, et al. Digoxin in the management of cardiovascular disorders',
      'Antman EM, et al. Treatment of 150 cases of life-threatening digitalis intoxication'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-028',
    question: 'What is the most appropriate decontamination method for a patient who presents 30 minutes after a large acetaminophen overdose?',
    options: [
      'Gastric lavage',
      'Activated charcoal',
      'Whole bowel irrigation',
      'Induced emesis'
    ],
    correctIndex: 1,
    explanation: 'Activated charcoal is the decontamination method of choice for acetaminophen overdose if given within 1-2 hours of ingestion. At 30 minutes post-ingestion, activated charcoal can still bind significant amounts of acetaminophen and reduce absorption. Gastric lavage is rarely indicated.',
    references: [
      'Chyka PA, et al. Position paper: single-dose activated charcoal. American Academy of Clinical Toxicology; European Association of Poisons Centres and Clinical Toxicologists',
      'Rumack BH, et al. Acetaminophen poisoning and toxicity'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-029',
    question: 'A patient presents with muscle rigidity, hyperthermia, and elevated CK after starting a new psychiatric medication. What is the most likely diagnosis?',
    options: [
      'Serotonin syndrome',
      'Neuroleptic malignant syndrome',
      'Malignant hyperthermia',
      'Anticholinergic toxicity'
    ],
    correctIndex: 1,
    explanation: 'Neuroleptic malignant syndrome (NMS) presents with muscle rigidity, hyperthermia, altered mental status, and elevated CK after exposure to dopamine antagonists (antipsychotics). It differs from serotonin syndrome which typically has hyperreflexia and clonus rather than rigidity. Treatment includes dantrolene and bromocriptine.',
    references: [
      'Strawn JR, et al. Neuroleptic malignant syndrome. Am J Psychiatry. 2007;164(6):870-876',
      'Bhanushali MJ, et al. Neuroleptic malignant syndrome: complications, outcomes, and mortality'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  },
  {
    id: 'tox-030',
    question: 'What is the most common cause of drug-induced seizures in the emergency department?',
    options: [
      'Tricyclic antidepressants',
      'Cocaine',
      'Isoniazid',
      'Theophylline'
    ],
    correctIndex: 1,
    explanation: 'Cocaine is one of the most common causes of drug-induced seizures in the emergency department due to its widespread use and multiple mechanisms of action (sodium channel blockade, dopamine reuptake inhibition). Treatment includes benzodiazepines as first-line therapy. Avoid phenytoin as it may worsen cocaine-induced arrhythmias.',
    references: [
      'Derlet RW, et al. Cocaine-induced seizures. Emergency Medicine Clinics of North America. 1994;12(1):89-99',
      'McCord J, et al. Management of cocaine-associated chest pain and myocardial infarction'
    ],
    difficulty: 'medium',
    topicId: 'toxicology'
  }
];