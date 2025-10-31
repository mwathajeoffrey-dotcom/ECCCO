import { Question } from './types';

export const environmentalEmergenciesQuestions: Question[] = [
  {
    id: 'env-001',
    question: 'A patient presents with core temperature 42°C (107.6°F), altered mental status, and anhidrosis after working outdoors. What is the most appropriate immediate treatment?',
    options: [
      'Antipyretics',
      'Rapid cooling with ice baths',
      'Slow gradual cooling',
      'Dantrolene'
    ],
    correctIndex: 1,
    explanation: 'Heat stroke is a medical emergency requiring immediate aggressive cooling. Ice baths or cold water immersion are most effective, aiming to reduce core temperature to <39°C (102°F) within 30 minutes. Antipyretics are ineffective as this is not fever.',
    references: [
      'Lipman GS, et al. Wilderness Medical Associates practice guidelines for the prevention and treatment of heat illness',
      'Leon LR, et al. Heat stroke. Compr Physiol. 2015;5(2):611-647'
    ],
    difficulty: 'easy',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-002',
    question: 'A patient presents with core temperature 32°C (89.6°F), confusion, and shivering has stopped. What is the most concerning cardiac rhythm complication?',
    options: [
      'Atrial fibrillation',
      'Ventricular fibrillation',
      'Complete heart block',
      'Asystole'
    ],
    correctIndex: 1,
    explanation: 'Ventricular fibrillation is the most life-threatening arrhythmia in severe hypothermia (<32°C). It can be triggered by minimal stimulation, including intubation or central line placement. Gentle handling and gradual rewarming are essential.',
    references: [
      'Brown DJ, et al. Accidental hypothermia. N Engl J Med. 2012;367(20):1930-1938',
      'Zafren K, et al. Wilderness Medical Associates practice guidelines for the out-of-hospital evaluation and treatment of accidental hypothermia'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-003',
    question: 'A diver presents with joint pain, skin mottling, and neurologic symptoms after rapid ascent. What is the most appropriate treatment?',
    options: [
      'High-flow oxygen',
      'Hyperbaric oxygen therapy',
      'IV fluids only',
      'Pain medication'
    ],
    correctIndex: 1,
    explanation: 'Decompression sickness ("the bends") requires hyperbaric oxygen therapy to reduce nitrogen bubble size and improve oxygenation. High-flow oxygen should be given immediately, but definitive treatment is recompression in a hyperbaric chamber.',
    references: [
      'Vann RD, et al. Decompression illness. Lancet. 2011;377(9760):153-164',
      'Moon RE. Treatment of diving emergencies. Crit Care Clin. 1999;15(2):429-456'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-004',
    question: 'A patient presents with severe altitude sickness at 14,000 feet with confusion and ataxia. What is the most appropriate management?',
    options: [
      'Acetazolamide',
      'Dexamethasone',
      'Immediate descent',
      'Oxygen therapy'
    ],
    correctIndex: 2,
    explanation: 'High altitude cerebral edema (HACE) with confusion and ataxia is a medical emergency requiring immediate descent. This is the most effective treatment. Dexamethasone and oxygen can be helpful adjuncts, but descent is life-saving.',
    references: [
      'Luks AM, et al. Wilderness Medical Associates practice guidelines for the prevention and treatment of acute altitude illness',
      'Hackett PH, et al. High-altitude illness. N Engl J Med. 2001;345(2):107-114'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-005',
    question: 'A patient presents with localized frostbite to fingers. What is the most appropriate rewarming technique?',
    options: [
      'Gradual warming at room temperature',
      'Hot water immersion at 45°C (113°F)',
      'Warm water immersion at 40-42°C (104-108°F)',
      'Dry heat application'
    ],
    correctIndex: 2,
    explanation: 'Frostbite should be rewarmed rapidly in warm water at 40-42°C (104-108°F) for 15-30 minutes until skin appears red and soft. Water that is too hot can cause burns. Gradual warming is less effective and prolongs tissue damage.',
    references: [
      'Handford C, et al. Frostbite: a practical approach to hospital management',
      'McIntosh SE, et al. Wilderness Medical Associates practice guidelines for the prevention and treatment of frostbite'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-006',
    question: 'A patient is found unconscious in a house fire. Carbon monoxide level is 35%. What is the most appropriate treatment?',
    options: [
      'High-flow oxygen at 15 L/min',
      '100% oxygen via non-rebreather mask',
      'Hyperbaric oxygen therapy',
      'Intubation and mechanical ventilation'
    ],
    correctIndex: 2,
    explanation: 'Severe carbon monoxide poisoning (>25% carboxyhemoglobin) with neurologic symptoms requires hyperbaric oxygen therapy if available. This reduces the half-life of carboxyhemoglobin from 4-6 hours to 20-30 minutes and may prevent delayed neurologic sequelae.',
    references: [
      'Weaver LK, et al. Hyperbaric oxygen for acute carbon monoxide poisoning',
      'Kao LW, et al. Carbon monoxide poisoning. Emerg Med Clin North Am. 2004;22(4):985-1018'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-007',
    question: 'A patient presents with cyanide poisoning from smoke inhalation. What is the antidote of choice?',
    options: [
      'Hydroxocobalamin (Cyanokit)',
      'Sodium nitrite and sodium thiosulfate',
      'Oxygen therapy alone',
      'N-acetylcysteine'
    ],
    correctIndex: 0,
    explanation: 'Hydroxocobalamin (Cyanokit) is the preferred antidote for cyanide poisoning, especially in smoke inhalation victims. It directly binds cyanide and has fewer side effects than the traditional nitrite/thiosulfate combination, which can cause dangerous methemoglobinemia.',
    references: [
      'Fortin JL, et al. Hydroxocobalamin for poisoning caused by ingestion of potassium cyanide: a case study',
      'Borron SW, et al. Hydroxocobalamin for severe acute cyanide poisoning by ingestion or inhalation'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-008',
    question: 'A patient presents with electrical burn from high-voltage exposure. What complication should be monitored?',
    options: [
      'Superficial burns only',
      'Rhabdomyolysis and cardiac arrhythmias',
      'Hyperthermia',
      'Coagulopathy'
    ],
    correctIndex: 1,
    explanation: 'High-voltage electrical injuries can cause deep tissue damage, rhabdomyolysis (from muscle necrosis), and cardiac arrhythmias. The extent of internal injury may not be apparent from external burns. Cardiac monitoring and CK levels are essential.',
    references: [
      'Koumbourlis AC. Electrical injuries. Crit Care Med. 2002;30(11 Suppl):S424-430',
      'Fish RM, et al. Electric injury, Part I: treatment priorities, subtle diagnostic factors, and burns'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-009',
    question: 'A patient is struck by lightning and presents in cardiac arrest. What is the most likely initial cardiac rhythm?',
    options: [
      'Ventricular fibrillation',
      'Asystole',
      'Pulseless electrical activity',
      'Ventricular tachycardia'
    ],
    correctIndex: 1,
    explanation: 'Lightning strikes typically cause asystole rather than ventricular fibrillation. The massive electrical discharge can cause immediate cardiac standstill. However, the heart may restart spontaneously while respiratory arrest persists, making immediate ventilation critical.',
    references: [
      'Cooper MA, et al. Lightning injuries. Emerg Med Clin North Am. 1995;13(2):369-384',
      'Cherington M. Lightning injuries. Ann Emerg Med. 1995;25(4):517-519'
    ],
    difficulty: 'hard',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-010',
    question: 'A patient presents with near-drowning in salt water. What electrolyte abnormality is most likely?',
    options: [
      'Hypernatremia',
      'Hyponatremia',
      'Hyperkalemia',
      'Hypocalcemia'
    ],
    correctIndex: 0,
    explanation: 'Salt water drowning can cause hypernatremia due to aspiration of hypertonic seawater. However, the primary concern in near-drowning is hypoxemia and pulmonary edema. The amount of water aspirated is usually insufficient to cause significant electrolyte disturbances.',
    references: [
      'Szpilman D, et al. Drowning. N Engl J Med. 2012;366(22):2102-2110',
      'Layon AJ, et al. Drowning: update 2009. Anesthesiology. 2009;110(6):1390-1401'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-011',
    question: 'A patient presents with severe sunburn covering 30% of body surface area. What is the most serious complication?',
    options: [
      'Infection',
      'Dehydration and shock',
      'Permanent scarring',
      'Skin cancer risk'
    ],
    correctIndex: 1,
    explanation: 'Severe sunburn affecting large body surface areas can cause significant fluid loss and dehydration, leading to shock. This is similar to thermal burns and requires aggressive fluid resuscitation. The inflammatory response can also cause systemic toxicity.',
    references: [
      'Lim JL, et al. Sunburn. Cutis. 2000;66(4):275-278',
      'Davis KF, et al. Sunburn: the magnitude of the problem. Dermatol Nurs. 2003;15(2):155-157'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-012',
    question: 'A patient presents with spider bite (black widow) with muscle cramps and hypertension. What is the most appropriate treatment?',
    options: [
      'Antivenom',
      'Calcium gluconate',
      'Corticosteroids',
      'Supportive care only'
    ],
    correctIndex: 0,
    explanation: 'Black widow spider bites causing systemic symptoms (muscle cramps, hypertension, diaphoresis) should be treated with specific antivenom (Latrodectus antivenom). Calcium may provide temporary relief but antivenom is definitive treatment for moderate to severe envenomation.',
    references: [
      'Isbister GK, et al. Spider bite. Lancet. 2004;364(9445):1509-1517',
      'Clark RF, et al. Clinical presentation and treatment of black widow spider envenomation'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-013',
    question: 'A patient presents with pit viper envenomation with progressive swelling and coagulopathy. What is the most appropriate antivenom?',
    options: [
      'Polyvalent immune Fab (CroFab)',
      'Whole IgG antivenom',
      'Coral snake antivenom',
      'Spider antivenom'
    ],
    correctIndex: 0,
    explanation: 'CroFab (polyvalent immune Fab) is the preferred antivenom for North American pit viper envenomations (rattlesnakes, copperheads, cottonmouths). It has fewer allergic reactions than whole IgG antivenoms and is effective for treating local tissue effects and coagulopathy.',
    references: [
      'Lavonas EJ, et al. Unified treatment algorithm for the management of crotaline snakebite in the United States',
      'Dart RC, et al. A randomized multicenter trial of crotalinae polyvalent immune Fab (ovine) antivenom for the treatment of crotaline snakebite'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-014',
    question: 'A patient presents with coral snake bite with minimal local symptoms but progressive weakness. What is the concern?',
    options: [
      'Tissue necrosis',
      'Coagulopathy',
      'Respiratory paralysis',
      'Renal failure'
    ],
    correctIndex: 2,
    explanation: 'Coral snake venom is neurotoxic and can cause progressive respiratory paralysis with minimal local symptoms. Unlike pit vipers, coral snakes don\'t cause significant tissue damage or coagulopathy, but the neurotoxic effects can be life-threatening.',
    references: [
      'Kitchens CS, et al. Eastern coral snake (Micrurus fulvius fulvius) envenomation',
      'Norris RL, et al. North American venomous reptile bites'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-015',
    question: 'A patient presents with marine envenomation from jellyfish with systemic symptoms. What is the most appropriate initial treatment?',
    options: [
      'Fresh water rinse',
      'Remove tentacles with tweezers',
      'Hot water immersion',
      'Apply vinegar to tentacles'
    ],
    correctIndex: 3,
    explanation: 'For jellyfish stings, vinegar should be applied to inactivate nematocysts before tentacle removal. Fresh water can trigger more nematocyst discharge. After vinegar application, tentacles can be safely removed with tweezers or forceps.',
    references: [
      'Cegolon L, et al. Jellyfish stings and their management: a review',
      'Loten C, et al. Stinger suit prevents jellyfish stings'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-016',
    question: 'A patient presents with stingray injury to the foot with severe pain. What is the most appropriate treatment for pain?',
    options: [
      'Ice application',
      'Hot water immersion',
      'Topical anesthetics',
      'Systemic opioids only'
    ],
    correctIndex: 1,
    explanation: 'Stingray venom is thermolabile, so hot water immersion (45°C/113°F for 30-90 minutes) can denature the venom and provide significant pain relief. This is often more effective than systemic analgesics alone for marine envenomations.',
    references: [
      'Clark RF, et al. Stingray envenomation: a retrospective review of clinical presentation and treatment',
      'Fenner PJ, et al. Stingray injuries. Med J Aust. 1989;151(11-12):621-625'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-017',
    question: 'A patient presents with radiation exposure from industrial accident. At what dose is acute radiation syndrome expected?',
    options: [
      '>100 rem (1 Gy)',
      '>200 rem (2 Gy)',
      '>500 rem (5 Gy)',
      '>1000 rem (10 Gy)'
    ],
    correctIndex: 0,
    explanation: 'Acute radiation syndrome (ARS) begins to occur at whole-body doses >100 rem (1 Gy). Mild symptoms occur at 100-200 rem, moderate at 200-600 rem, severe at 600-800 rem, and lethal doses >800 rem. Early symptoms include nausea, vomiting, and diarrhea.',
    references: [
      'Dainiak N, et al. Literature review and global consensus on management of acute radiation syndrome affecting nonhematopoietic organ systems',
      'Waselenko JK, et al. Medical management of the acute radiation syndrome'
    ],
    difficulty: 'hard',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-018',
    question: 'A patient presents with chemical burn from hydrofluoric acid. What is the specific antidote?',
    options: [
      'Sodium bicarbonate',
      'Calcium gluconate',
      'N-acetylcysteine',
      'Activated charcoal'
    ],
    correctIndex: 1,
    explanation: 'Hydrofluoric acid burns require calcium gluconate as an antidote. Fluoride ions bind calcium, causing hypocalcemia and continued tissue destruction. Topical calcium gluconate gel and/or intraarterial calcium can be used depending on severity.',
    references: [
      'Kirkpatrick JJ, et al. Hydrofluoric acid burns: a review',
      'McKee D, et al. Hydrofluoric acid burns. Plast Reconstr Surg. 1985;76(2):206-210'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-019',
    question: 'A patient presents with heat exhaustion. What is the key difference from heat stroke?',
    options: [
      'Higher core temperature',
      'Preserved mental status',
      'More severe dehydration',
      'Absence of sweating'
    ],
    correctIndex: 1,
    explanation: 'The key difference between heat exhaustion and heat stroke is mental status. Heat exhaustion patients maintain normal mental function, while heat stroke involves altered mental status (confusion, coma). Heat stroke is also associated with higher core temperatures (>40°C).',
    references: [
      'Bouchama A, et al. Heat stroke. N Engl J Med. 2002;346(25):1978-1988',
      'Casa DJ, et al. American College of Sports Medicine roundtable on exertional heat illness'
    ],
    difficulty: 'easy',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-020',
    question: 'A patient presents with scuba diving accident and air embolism. What is the most appropriate positioning?',
    options: [
      'Trendelenburg position',
      'Left lateral decubitus',
      'Supine position',
      'Semi-Fowler\'s position'
    ],
    correctIndex: 2,
    explanation: 'Current recommendations for arterial gas embolism favor supine positioning rather than the traditional Trendelenburg or left lateral positions. The primary treatment is hyperbaric oxygen therapy. Positioning has less impact than previously thought.',
    references: [
      'Moon RE, et al. Treatment of diving emergencies',
      'Gorman DF, et al. Arterial gas embolism as a pathophysiologic mechanism for spinal cord decompression sickness'
    ],
    difficulty: 'hard',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-021',
    question: 'A mountaineer develops high altitude pulmonary edema (HAPE). What is the most effective immediate treatment?',
    options: [
      'Nifedipine',
      'Acetazolamide',
      'Descent to lower altitude',
      'Portable hyperbaric chamber'
    ],
    correctIndex: 2,
    explanation: 'Descent is the most effective treatment for HAPE. Even modest descent (500-1000m) can be life-saving. Portable hyperbaric chambers can be helpful if descent is not immediately possible. Nifedipine can reduce pulmonary artery pressure but is adjunctive therapy.',
    references: [
      'Bartsch P, et al. High altitude pulmonary edema. Compr Physiol. 2013;3(2):839-855',
      'Luks AM, et al. Wilderness Medical Associates practice guidelines for the prevention and treatment of acute altitude illness'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-022',
    question: 'A patient presents with mushroom poisoning (Amanita species) 12 hours after ingestion. What is the most important supportive treatment?',
    options: [
      'Activated charcoal',
      'N-acetylcysteine',
      'Aggressive IV fluid resuscitation',
      'Liver transplant evaluation'
    ],
    correctIndex: 3,
    explanation: 'Amanita mushroom poisoning causes delayed hepatotoxicity (24-48 hours post-ingestion) that can lead to fulminant hepatic failure. Early liver transplant evaluation is crucial as this may be the only life-saving intervention. N-acetylcysteine may help but liver transplant evaluation takes priority.',
    references: [
      'Diaz JH. Syndromic diagnosis and management of confirmed mushroom poisonings',
      'Karlson-Stiber C, et al. Cytotoxic fungi-an overview. Toxicon. 2003;42(4):339-349'
    ],
    difficulty: 'hard',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-023',
    question: 'A patient presents with brown recluse spider bite with necrotic lesion. What is the most appropriate treatment?',
    options: [
      'Antivenom',
      'Hyperbaric oxygen',
      'Dapsone',
      'Surgical excision'
    ],
    correctIndex: 3,
    explanation: 'Brown recluse spider bite treatment is primarily supportive. There is no specific antivenom available. Dapsone and hyperbaric oxygen lack proven efficacy. Early surgical excision should be avoided as it may worsen tissue loss. Wound care and monitoring for secondary infection are key.',
    references: [
      'Swanson JF, et al. Bites of brown recluse spiders and suspected necrotic arachnidism',
      'Isbister GK, et al. Spider bite. Lancet. 2004;364(9445):1509-1517'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-024',
    question: 'A patient presents with hypothermia and is found in cold water. What rewarming rate should be targeted?',
    options: [
      '1-2°C per hour',
      '3-5°C per hour',
      '0.5-1°C per hour',
      '5-10°C per hour'
    ],
    correctIndex: 0,
    explanation: 'Rewarming should be gradual at 1-2°C per hour to avoid complications like afterdrop (further temperature decline) and arrhythmias. Rapid rewarming can cause peripheral vasodilation and cardiovascular collapse.',
    references: [
      'Brown DJ, et al. Accidental hypothermia. N Engl J Med. 2012;367(20):1930-1938',
      'Kempainen RR, et al. The evaluation and management of accidental hypothermia'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-025',
    question: 'A patient presents with carbon monoxide poisoning and is pregnant. What treatment consideration is most important?',
    options: [
      'Lower threshold for hyperbaric oxygen',
      'Avoid hyperbaric oxygen due to pregnancy',
      'Standard treatment protocols apply',
      'Immediate delivery of fetus'
    ],
    correctIndex: 0,
    explanation: 'Pregnant patients should have a lower threshold for hyperbaric oxygen therapy because fetal hemoglobin has even higher affinity for carbon monoxide than adult hemoglobin, and the fetus is at higher risk for hypoxic injury. Fetal carboxyhemoglobin levels may be 10-15% higher than maternal levels.',
    references: [
      'Kao LW, et al. Carbon monoxide poisoning. Emerg Med Clin North Am. 2004;22(4):985-1018',
      'Elkharrat D, et al. Acute carbon monoxide intoxication and hyperbaric oxygen in pregnancy'
    ],
    difficulty: 'hard',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-026',
    question: 'A patient presents with marine trauma from shark bite with massive bleeding. What is the priority intervention?',
    options: [
      'Prophylactic antibiotics',
      'Tetanus prophylaxis',
      'Hemorrhage control',
      'Surgical exploration'
    ],
    correctIndex: 2,
    explanation: 'The immediate priority in shark bite injuries is hemorrhage control using direct pressure, pressure dressings, and tourniquets if necessary for extremity injuries. Control of life-threatening bleeding takes precedence over antibiotics or tetanus prophylaxis.',
    references: [
      'Caldicott DG, et al. Shark attack: review of 86 consecutive cases',
      'West JG. Changing patterns of shark attacks in Australian waters'
    ],
    difficulty: 'easy',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-027',
    question: 'A patient presents with severe frostbite with clear blisters and no sensation. What is the expected depth of injury?',
    options: [
      'First degree (superficial)',
      'Second degree (partial thickness)',
      'Third degree (full thickness)',
      'Fourth degree (involving bone)'
    ],
    correctIndex: 2,
    explanation: 'Clear blisters with loss of sensation indicate deep (third-degree) frostbite involving full-thickness skin injury. Superficial frostbite typically has sensation preserved, while blood-filled blisters suggest deeper injury. These injuries often require surgical intervention.',
    references: [
      'Handford C, et al. Frostbite: a practical approach to hospital management',
      'Cauchy E, et al. The value of technetium 99 scintigraphy in the prognosis of amputation in severe frostbite injuries of the extremities'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-028',
    question: 'A patient presents with high altitude sickness and develops pink frothy sputum. What does this indicate?',
    options: [
      'High altitude cerebral edema',
      'High altitude pulmonary edema',
      'Pneumonia',
      'Pulmonary embolism'
    ],
    correctIndex: 1,
    explanation: 'Pink frothy sputum is a classic sign of high altitude pulmonary edema (HAPE), indicating non-cardiogenic pulmonary edema due to increased pulmonary vascular pressure at altitude. This is a medical emergency requiring immediate descent and oxygen.',
    references: [
      'Bartsch P, et al. High altitude pulmonary edema. Compr Physiol. 2013;3(2):839-855',
      'Hackett PH, et al. High-altitude illness. N Engl J Med. 2001;345(2):107-114'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-029',
    question: 'A patient presents with organophosphate pesticide exposure with cholinergic crisis. In addition to atropine, what other medication should be considered?',
    options: [
      'Physostigmine',
      'Pralidoxime (2-PAM)',
      'Flumazenil',
      'N-acetylcysteine'
    ],
    correctIndex: 1,
    explanation: 'Pralidoxime (2-PAM) should be given in addition to atropine for organophosphate poisoning. It reactivates acetylcholinesterase, particularly helping with nicotinic effects (muscle weakness). It\'s most effective when given early before "aging" of the enzyme occurs.',
    references: [
      'Eddleston M, et al. Management of acute organophosphorus pesticide poisoning',
      'Peter JV, et al. Clinical features and management of poisoning due to potassium permanganate'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  },
  {
    id: 'env-030',
    question: 'A patient presents with smoke inhalation injury with stridor and hoarseness. What is the most immediate concern?',
    options: [
      'Carbon monoxide poisoning',
      'Cyanide toxicity',
      'Upper airway obstruction',
      'Pulmonary edema'
    ],
    correctIndex: 2,
    explanation: 'Stridor and hoarseness after smoke inhalation suggest upper airway thermal injury with potential for rapid airway obstruction due to edema. This requires immediate airway evaluation and possible intubation before complete obstruction occurs.',
    references: [
      'Mlcak RP, et al. Respiratory management of inhalation injury',
      'Sheridan RL. Fire-related inhalation injury. N Engl J Med. 2016;375(5):464-469'
    ],
    difficulty: 'medium',
    topicId: 'environmental-emergencies'
  }
];