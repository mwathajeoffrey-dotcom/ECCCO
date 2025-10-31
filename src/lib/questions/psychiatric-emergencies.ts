import { Question } from './types';

export const psychiatricEmergenciesQuestions: Question[] = [
  {
    id: 'psych-001',
    question: 'A 25-year-old patient presents with acute psychosis, hyperthermia, muscle rigidity, and altered mental status after starting haloperidol. What is the most likely diagnosis?',
    options: [
      'Serotonin syndrome',
      'Neuroleptic malignant syndrome',
      'Malignant hyperthermia',
      'Anticholinergic toxicity'
    ],
    correctIndex: 1,
    explanation: 'Neuroleptic malignant syndrome (NMS) is a life-threatening reaction to antipsychotic medications characterized by hyperthermia, muscle rigidity, altered mental status, and autonomic instability. Treatment includes discontinuing the offending agent and supportive care.',
    references: [
      'Strawn JR, et al. Neuroleptic malignant syndrome. Am J Psychiatry. 2007;164(6):870-876',
      'Gurrera RJ, et al. An international consensus study of neuroleptic malignant syndrome diagnostic criteria using the Delphi method'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-002',
    question: 'A patient taking fluoxetine and tramadol presents with agitation, hyperthermia, hyperreflexia, and clonus. What is the most appropriate treatment?',
    options: [
      'Haloperidol',
      'Cyproheptadine',
      'Dantrolene',
      'Benzodiazepines'
    ],
    correctIndex: 1,
    explanation: 'This presentation suggests serotonin syndrome due to drug interaction between fluoxetine (SSRI) and tramadol. Cyproheptadine is a serotonin antagonist that is specific treatment for serotonin syndrome. Benzodiazepines provide supportive care.',
    references: [
      'Boyer EW, et al. The serotonin syndrome. N Engl J Med. 2005;352(11):1112-1120',
      'Buckley NA, et al. Serotonin syndrome. BMJ. 2014;348:g1626'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-003',
    question: 'A 35-year-old patient with bipolar disorder presents with lithium toxicity. Lithium level is 3.2 mEq/L. What is the most appropriate treatment?',
    options: [
      'Normal saline hydration',
      'Forced diuresis with furosemide',
      'Hemodialysis',
      'Activated charcoal'
    ],
    correctIndex: 2,
    explanation: 'Severe lithium toxicity (level >2.5 mEq/L) with symptoms requires hemodialysis for rapid lithium removal. Lithium is not protein-bound and has a small volume of distribution, making it easily dialyzable. Normal saline helps with mild toxicity.',
    references: [
      'Decker BS, et al. Extracorporeal treatment for lithium poisoning: systematic review and recommendations from the EXTRIP workgroup',
      'Baird-Gunning J, et al. Lithium poisoning. J Intensive Care Med. 2017;32(4):249-263'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-004',
    question: 'A patient with depression on MAOIs accidentally ingests aged cheese and wine. They develop severe headache, hypertension, and diaphoresis. What is the most likely diagnosis?',
    options: [
      'Hypertensive emergency',
      'Tyramine reaction',
      'Stroke',
      'Migraine'
    ],
    correctIndex: 1,
    explanation: 'Tyramine-rich foods (aged cheese, wine, cured meats) can cause hypertensive crisis in patients taking MAOIs. Tyramine normally metabolized by MAO accumulates and causes massive norepinephrine release. Treatment includes phentolamine for severe hypertension.',
    references: [
      'Shulman KI, et al. MAOIs: a review of their history and current status',
      'Gillman PK. Monoamine oxidase inhibitors, opioid analgesics and serotonin toxicity'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-005',
    question: 'A patient with chronic schizophrenia presents with fever, confusion, and lead-pipe rigidity. They have been stable on the same antipsychotic for years. What should be considered?',
    options: [
      'Medication non-compliance',
      'Neuroleptic malignant syndrome',
      'Catatonia',
      'Infection'
    ],
    correctIndex: 3,
    explanation: 'While NMS is possible, patients stable on antipsychotics for years rarely develop NMS without precipitating factors. Infection is more likely and can present with altered mental status in patients with chronic mental illness. Fever points toward infection.',
    references: [
      'Velamoor VR, et al. Neuroleptic malignant syndrome. Recognition, prevention and management',
      'Rosebush PI, et al. Neuroleptic malignant syndrome: a review of its epidemiology, pathogenesis and treatment'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-006',
    question: 'A patient with acute agitation and psychosis requires chemical restraint. They have no known medical history. What is the most appropriate medication?',
    options: [
      'Haloperidol 5mg IM + lorazepam 2mg IM',
      'Olanzapine 10mg IM',
      'Ziprasidone 20mg IM',
      'Chlorpromazine 50mg IM'
    ],
    correctIndex: 0,
    explanation: 'The combination of haloperidol and lorazepam is effective for acute agitation and psychosis. The combination provides faster onset and may reduce extrapyramidal side effects. Alternative single agents include olanzapine or ziprasidone IM.',
    references: [
      'Zeller SL, et al. A randomized, double-blind comparison of intramuscular olanzapine, haloperidol plus lorazepam, and haloperidol plus placebo for treatment of acute agitation',
      'Kittler J, et al. Emergency psychiatry: agitation and delirium'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-007',
    question: 'A patient presents with acute dystonia after receiving haloperidol in the ED. What is the most appropriate treatment?',
    options: [
      'Diphenhydramine 50mg IM',
      'Lorazepam 2mg IV',
      'Propranolol 40mg PO',
      'Dantrolene 1mg/kg IV'
    ],
    correctIndex: 0,
    explanation: 'Acute dystonia is an extrapyramidal side effect of antipsychotics that responds rapidly to anticholinergic medications. Diphenhydramine 50mg IM or benztropine 2mg IM are first-line treatments and usually provide relief within 15-30 minutes.',
    references: [
      'Tarsy D, et al. Epidemiology of tardive dyskinesia: is risk declining with modern antipsychotics?',
      'Sachdev P. Neuroleptic-induced movement disorders: an overview'
    ],
    difficulty: 'easy',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-008',
    question: 'A patient with known bipolar disorder presents with altered mental status, nausea, and tremor. Lithium level is 2.8 mEq/L. What is the most likely precipitating factor?',
    options: [
      'Medication non-compliance',
      'Dehydration',
      'Drug interaction',
      'Lithium overdose'
    ],
    correctIndex: 1,
    explanation: 'Lithium toxicity is often precipitated by dehydration, which reduces lithium clearance by the kidneys. Other precipitants include NSAIDs, ACE inhibitors, thiazide diuretics, and any condition causing volume depletion. Maintaining adequate hydration is crucial.',
    references: [
      'Baird-Gunning J, et al. Lithium poisoning. J Intensive Care Med. 2017;32(4):249-263',
      'Gitlin M. Lithium side effects and toxicity: prevalence and management strategies'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-009',
    question: 'A patient with severe depression and suicidal ideation is being considered for involuntary hold. What is the most important criterion?',
    options: [
      'Diagnosis of major depression',
      'Imminent danger to self or others',
      'Psychosis',
      'Family request'
    ],
    correctIndex: 1,
    explanation: 'Involuntary psychiatric hold requires imminent danger to self or others due to mental illness. The patient must pose a clear and immediate risk. Mental illness alone, family requests, or past history are not sufficient for involuntary commitment.',
    references: [
      'Appelbaum PS. Clinical practice. Assessment of patients\' competence to consent to treatment',
      'Szmukler G, et al. Mental health law and the UN Convention on the rights of persons with disabilities'
    ],
    difficulty: 'easy',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-010',
    question: 'A patient presents with auditory hallucinations, delusions, and bizarre behavior that started 3 days ago. What is the most likely diagnosis?',
    options: [
      'Schizophrenia',
      'Brief psychotic disorder',
      'Delusional disorder',
      'Substance-induced psychosis'
    ],
    correctIndex: 3,
    explanation: 'Acute onset of psychotic symptoms over days suggests substance-induced psychosis or brief psychotic disorder rather than schizophrenia (which requires 6 months of symptoms). Substance use history and toxicology screening are essential.',
    references: [
      'American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders, 5th Edition',
      'Keshavan MS, et al. Substance-use disorders in psychotic disorders: implications for brief intervention'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-011',
    question: 'A patient taking clozapine presents with fever, sore throat, and malaise. WBC count is 2,000/μL. What is the most appropriate action?',
    options: [
      'Continue clozapine and monitor',
      'Reduce clozapine dose',
      'Discontinue clozapine immediately',
      'Add antibiotics'
    ],
    correctIndex: 2,
    explanation: 'Agranulocytosis (WBC <3,000 or ANC <1,500) is a life-threatening side effect of clozapine. Clozapine must be discontinued immediately and permanently. The patient needs urgent hematology evaluation and infection workup.',
    references: [
      'Young CR, et al. Clozapine-induced agranulocytosis: incidence and risk factors in the United States',
      'Meltzer HY. Clozapine: balancing safety with superior antipsychotic efficacy'
    ],
    difficulty: 'easy',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-012',
    question: 'A patient with bipolar disorder on lithium presents with polyuria, polydipsia, and normal blood glucose. What is the most likely cause?',
    options: [
      'Diabetes mellitus',
      'Diabetes insipidus',
      'Psychogenic polydipsia',
      'Urinary tract infection'
    ],
    correctIndex: 1,
    explanation: 'Lithium can cause nephrogenic diabetes insipidus by interfering with ADH action in the kidneys. This presents with polyuria and polydipsia with normal glucose. Urine specific gravity is low. This can be irreversible with long-term lithium use.',
    references: [
      'Grünfeld JP, et al. Lithium nephrotoxicity revisited. Nat Rev Nephrol. 2009;5(5):270-276',
      'Gitlin M. Lithium side effects and toxicity: prevalence and management strategies'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-013',
    question: 'A patient with alcohol use disorder presents with visual hallucinations, tremor, and agitation 72 hours after last drink. What is the most appropriate treatment?',
    options: [
      'Haloperidol',
      'Thiamine',
      'Lorazepam',
      'Phenytoin'
    ],
    correctIndex: 2,
    explanation: 'This presentation suggests alcohol withdrawal with hallucinations (delirium tremens). Benzodiazepines are first-line treatment for alcohol withdrawal and seizure prevention. Lorazepam is preferred due to shorter half-life and no active metabolites.',
    references: [
      'Mayo-Smith MF, et al. Pharmacological management of alcohol withdrawal. A meta-analysis and evidence-based practice guideline',
      'Kosten TR, et al. Management of drug and alcohol withdrawal. N Engl J Med. 2003;348(18):1786-1795'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-014',
    question: 'A patient presents with catatonia, exhibiting waxy flexibility, mutism, and posturing. What is the most effective acute treatment?',
    options: [
      'Haloperidol',
      'Lorazepam',
      'Electroconvulsive therapy',
      'Olanzapine'
    ],
    correctIndex: 1,
    explanation: 'Lorazepam is the first-line treatment for catatonia and can provide rapid improvement. If lorazepam fails or catatonia is malignant, electroconvulsive therapy (ECT) is highly effective. Antipsychotics should be avoided as they can worsen catatonia.',
    references: [
      'Rosebush PI, et al. Catatonia: re-awakening to a forgotten disorder',
      'Fink M, et al. Catatonia: a clinician\'s guide to diagnosis and treatment'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-015',
    question: 'A patient on multiple psychiatric medications presents with urinary retention, dry mouth, blurred vision, and confusion. What type of toxicity is this?',
    options: [
      'Cholinergic',
      'Anticholinergic',
      'Adrenergic',
      'GABAergic'
    ],
    correctIndex: 1,
    explanation: 'The constellation of dry mouth, urinary retention, blurred vision, and confusion represents anticholinergic toxicity. Many psychiatric medications have anticholinergic effects including tricyclics, antipsychotics, and antihistamines. Physostigmine may be considered for severe cases.',
    references: [
      'Burns MJ, et al. A comparison of physostigmine and benzodiazepines for the treatment of anticholinergic poisoning',
      'Tune LE. Anticholinergic effects of medication in elderly patients'
    ],
    difficulty: 'easy',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-016',
    question: 'A patient with treatment-resistant depression is started on phenelzine (MAOI). What medication interaction should be avoided?',
    options: [
      'Acetaminophen',
      'Ibuprofen',
      'Meperidine',
      'Aspirin'
    ],
    correctIndex: 2,
    explanation: 'Meperidine is contraindicated with MAOIs due to risk of serotonin syndrome and hypertensive crisis. The interaction can be fatal. Other contraindicated medications include SSRIs, TCAs, dextromethorphan, and sympathomimetics.',
    references: [
      'Gillman PK. Monoamine oxidase inhibitors, opioid analgesics and serotonin toxicity',
      'Shulman KI, et al. MAOIs: a review of their history and current status'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-017',
    question: 'A patient presents with severe agitation and is placed in physical restraints. How often should restraint checks be performed?',
    options: [
      'Every 4 hours',
      'Every 2 hours',
      'Every 15 minutes',
      'Every hour'
    ],
    correctIndex: 2,
    explanation: 'Physical restraints require frequent monitoring every 15 minutes for safety, circulation, and necessity. Restraints should be the last resort and removed as soon as safe. Documentation must include frequent assessments and attempts at de-escalation.',
    references: [
      'Centers for Medicare & Medicaid Services. Conditions of participation for hospitals: patients\' rights',
      'Knox DK, et al. Emergency department use of restraints: a review'
    ],
    difficulty: 'easy',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-018',
    question: 'A patient with severe depression has not eaten in 5 days and appears dehydrated. They refuse all treatment. What is the most appropriate action?',
    options: [
      'Respect patient autonomy and discharge',
      'Obtain emergency court order for treatment',
      'Assess decision-making capacity',
      'Contact family for consent'
    ],
    correctIndex: 2,
    explanation: 'Before respecting a treatment refusal, the patient\'s decision-making capacity must be assessed. Severe depression can impair capacity to make informed decisions. If capacity is impaired, emergency treatment may be provided in the patient\'s best interest.',
    references: [
      'Appelbaum PS. Clinical practice. Assessment of patients\' competence to consent to treatment',
      'Grisso T, et al. The MacCAT-T: a clinical tool to assess patients\' capacities to make treatment decisions'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-019',
    question: 'A patient presents with elevated mood, pressured speech, grandiosity, and decreased need for sleep for 4 days. What is the most likely diagnosis?',
    options: [
      'Hypomanic episode',
      'Manic episode',
      'Mixed episode',
      'Cyclothymic disorder'
    ],
    correctIndex: 1,
    explanation: 'A manic episode requires elevated mood with associated symptoms lasting at least 1 week (or any duration if hospitalization required). Four days of symptoms requiring ED evaluation suggests sufficient severity for manic episode diagnosis rather than hypomania.',
    references: [
      'American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders, 5th Edition',
      'Youngstrom EA, et al. Developing an evidence-based assessment for bipolar disorder'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-020',
    question: 'A patient with schizophrenia is brought by police for erratic behavior. They appear calm and deny symptoms. What is the most appropriate initial approach?',
    options: [
      'Immediate medication administration',
      'Psychiatric evaluation',
      'Medical screening',
      'Discharge to police custody'
    ],
    correctIndex: 2,
    explanation: 'Medical screening is essential for psychiatric patients to rule out medical causes of altered behavior. Conditions like infection, electrolyte abnormalities, or intoxication can mimic psychiatric symptoms. Medical clearance should precede psychiatric evaluation.',
    references: [
      'Zun LS. Evidence-based review of pharmacotherapy for acute agitation. Part 1: Onset and duration of action',
      'Lukens TW, et al. Clinical policy: critical issues in the diagnosis and management of the adult psychiatric patient in the emergency department'
    ],
    difficulty: 'easy',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-021',
    question: 'A patient overdosed on tricyclic antidepressants. They have QRS widening and hypotension. What is the most appropriate treatment?',
    options: [
      'Flumazenil',
      'Naloxone',
      'Sodium bicarbonate',
      'Activated charcoal'
    ],
    correctIndex: 2,
    explanation: 'QRS widening in TCA overdose indicates sodium channel blockade and increased risk of arrhythmias. Sodium bicarbonate narrows the QRS by increasing serum sodium and raising pH. Target pH is 7.45-7.55. Activated charcoal is useful if within 1 hour of ingestion.',
    references: [
      'Thanacoody HK, et al. Tricyclic antidepressant poisoning: cardiovascular toxicity',
      'Body R, et al. Guidelines in Emergency Medicine Network (GEMNet): guideline for the management of tricyclic antidepressant overdose'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-022',
    question: 'A patient presents with panic attack symptoms but also has palpitations, sweating, and tremor. Glucose is 45 mg/dL. What is the most likely cause?',
    options: [
      'Panic disorder',
      'Hypoglycemia',
      'Hyperthyroidism',
      'Pheochromocytoma'
    ],
    correctIndex: 1,
    explanation: 'Hypoglycemia can mimic panic attacks with similar sympathetic symptoms. Blood glucose should be checked in patients presenting with panic-like symptoms. Hypoglycemia is a medical emergency requiring immediate glucose administration.',
    references: [
      'Cryer PE, et al. Evaluation and management of adult hypoglycemic disorders: an Endocrine Society Clinical Practice Guideline',
      'Fleet RP, et al. Panic disorder and emergency department utilization'
    ],
    difficulty: 'easy',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-023',
    question: 'A patient with autism spectrum disorder becomes agitated in the ED. What is the most appropriate initial intervention?',
    options: [
      'Immediate medication',
      'Physical restraints',
      'Environmental modifications',
      'Loud verbal redirection'
    ],
    correctIndex: 2,
    explanation: 'Patients with autism are sensitive to sensory stimulation. Environmental modifications (dim lights, reduce noise, limit staff) are most effective first interventions. Medication and restraints should be last resort. Family input about effective calming strategies is valuable.',
    references: [
      'Carbone PS, et al. The medical home for children with autism spectrum disorders: report of the American Academy of Pediatrics',
      'Muskat B, et al. The needs of children and adolescents with autism spectrum disorders in the emergency department'
    ],
    difficulty: 'easy',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-024',
    question: 'A patient presents with dissociative symptoms, amnesia, and multiple distinct personality states. What is the most likely diagnosis?',
    options: [
      'Schizophrenia',
      'Bipolar disorder',
      'Dissociative identity disorder',
      'Malingering'
    ],
    correctIndex: 2,
    explanation: 'Dissociative identity disorder (DID) involves disruption of identity with two or more distinct personality states, amnesia, and distress/impairment. It\'s often associated with childhood trauma. Diagnosis requires careful evaluation and is controversial.',
    references: [
      'American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders, 5th Edition',
      'Brand BL, et al. A naturalistic study of dissociative identity disorder and dissociative disorder not otherwise specified patients treated by community clinicians'
    ],
    difficulty: 'hard',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-025',
    question: 'A patient with anorexia nervosa presents with bradycardia (HR 45), hypotension, and electrolyte abnormalities. What is the most concerning complication?',
    options: [
      'Refeeding syndrome',
      'Cardiac arrhythmias',
      'Osteoporosis',
      'Amenorrhea'
    ],
    correctIndex: 1,
    explanation: 'Cardiac complications including bradycardia, hypotension, and arrhythmias are the most life-threatening acute complications of anorexia nervosa. These result from malnutrition, electrolyte abnormalities, and cardiac muscle atrophy. Hospitalization may be required.',
    references: [
      'Mehler PS, et al. Medical complications of anorexia nervosa and bulimia',
      'Society for Adolescent Health and Medicine. Position paper: medical management of restrictive eating disorders in adolescents and young adults'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-026',
    question: 'A patient presents with acute psychosis and hyperthermia. They have been taking risperidone for 2 years without problems. Temperature is 102.5°F. What should be considered first?',
    options: [
      'Neuroleptic malignant syndrome',
      'Infection',
      'Heat stroke',
      'Serotonin syndrome'
    ],
    correctIndex: 1,
    explanation: 'While NMS is possible, patients stable on antipsychotics rarely develop NMS without precipitating factors. In psychiatric patients with fever and altered mental status, infection (especially UTI, pneumonia) is more common and should be ruled out first.',
    references: [
      'Caroff SN, et al. Neuroleptic malignant syndrome',
      'Keck PE Jr, et al. Neuroleptic malignant syndrome: pathophysiology, clinical recognition, and treatment'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-027',
    question: 'A patient with borderline personality disorder presents with superficial lacerations on forearms. They deny suicidal intent. What is the most appropriate approach?',
    options: [
      'Involuntary psychiatric hold',
      'Medical treatment and psychiatric evaluation',
      'Discharge without follow-up',
      'Immediate sedation'
    ],
    correctIndex: 1,
    explanation: 'Self-injurious behavior without suicidal intent (non-suicidal self-injury) is common in borderline personality disorder. Medical treatment of injuries and psychiatric evaluation are appropriate. Involuntary hold requires imminent danger to self or others.',
    references: [
      'Nock MK, et al. Non-suicidal self-injury among adolescents: diagnostic correlates and relation to suicide attempts',
      'Paris J. Half a century of research on borderline personality disorder'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-028',
    question: 'A patient presents with violent behavior, superhuman strength, hyperthermia, and dilated pupils. They are insensitive to pain. What substance is most likely involved?',
    options: [
      'Alcohol',
      'Cocaine',
      'PCP (phencyclidine)',
      'Heroin'
    ],
    correctIndex: 2,
    explanation: 'PCP intoxication can cause violent behavior, apparent superhuman strength, hyperthermia, nystagmus, and analgesia. Patients may be insensitive to pain and require multiple people for restraint. Treatment includes benzodiazepines and supportive care in a quiet environment.',
    references: [
      'McCarron MM, et al. Acute phencyclidine intoxication: clinical patterns, complications, and treatment',
      'Burns MJ, et al. Phencyclidine: a drug of abuse and a neurotoxin'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-029',
    question: 'A patient with major depression is started on an SSRI. Three weeks later, they present with worsening suicidal thoughts. What is the most likely explanation?',
    options: [
      'Treatment failure',
      'Wrong diagnosis',
      'Increased suicidal risk in early treatment',
      'Drug interaction'
    ],
    correctIndex: 2,
    explanation: 'SSRIs can increase suicidal thoughts and behavior in young adults, especially during the first few weeks of treatment. This has led to FDA black box warnings. Close monitoring is essential, particularly in patients under 25 years old.',
    references: [
      'Stone M, et al. Risk of suicidality in clinical trials of antidepressants in adults: analysis of proprietary data submitted to US Food and Drug Administration',
      'Jick H, et al. Antidepressants and the risk of suicidal behaviors'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  },
  {
    id: 'psych-030',
    question: 'A patient presents with rapid-cycling mood episodes, irritability, and grandiosity after starting antidepressants for depression. What should be considered?',
    options: [
      'Antidepressant-induced mania',
      'Medication non-compliance',
      'Substance abuse',
      'Personality disorder'
    ],
    correctIndex: 0,
    explanation: 'Antidepressants can precipitate mania or rapid cycling in patients with undiagnosed bipolar disorder. This is why screening for past manic/hypomanic episodes is crucial before starting antidepressants. The antidepressant should be discontinued and mood stabilizer considered.',
    references: [
      'Ghaemi SN, et al. Antidepressant treatment in bipolar versus unipolar depression',
      'Post RM, et al. Morbidity in 258 bipolar outpatients followed for 1 year with daily prospective ratings on the NIMH life chart method'
    ],
    difficulty: 'medium',
    topicId: 'psychiatric-emergencies'
  }
];