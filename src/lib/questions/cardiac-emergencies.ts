import { Question } from './types';

export const cardiacEmergenciesQuestions: Question[] = [
  {
    id: 'cardiac-001',
    question: 'A 55-year-old male presents with crushing chest pain radiating to the left arm for 2 hours. ECG shows ST elevation in leads II, III, and aVF. What is the most likely coronary artery involved?',
    options: [
      'Left anterior descending artery',
      'Right coronary artery',
      'Left circumflex artery',
      'Left main coronary artery'
    ],
    correctIndex: 1,
    explanation: 'ST elevation in leads II, III, and aVF indicates an inferior wall myocardial infarction, which is typically caused by occlusion of the right coronary artery (RCA). The RCA supplies the inferior wall of the left ventricle in 85-90% of patients.',
    references: [
      'American College of Cardiology/American Heart Association Task Force. 2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction',
      'Thygesen K, et al. Fourth Universal Definition of Myocardial Infarction. Circulation. 2018;138(20):e618-e651'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-002',
    question: 'Which medication is contraindicated in a patient with acute ST-elevation myocardial infarction and systolic blood pressure of 85 mmHg?',
    options: [
      'Aspirin 325mg',
      'Metoprolol 25mg',
      'Atorvastatin 80mg',
      'Clopidogrel 600mg'
    ],
    correctIndex: 1,
    explanation: 'Beta-blockers like metoprolol are contraindicated in patients with cardiogenic shock, hypotension (SBP <90 mmHg), or signs of heart failure. They can further reduce cardiac output and worsen hypotension in the acute setting.',
    references: [
      'O\'Gara PT, et al. 2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction. Circulation. 2013;127(4):e362-e425',
      'Amsterdam EA, et al. 2014 AHA/ACC Guideline for the Management of Patients with Non-ST-Elevation Acute Coronary Syndromes'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-003',
    question: 'What is the maximum time from first medical contact to balloon inflation (door-to-balloon time) recommended for primary PCI in STEMI?',
    options: [
      '60 minutes',
      '90 minutes',
      '120 minutes',
      '180 minutes'
    ],
    correctIndex: 1,
    explanation: 'The American Heart Association and American College of Cardiology recommend a door-to-balloon time of ≤90 minutes for primary percutaneous coronary intervention (PCI) in STEMI patients. This target has been associated with improved outcomes.',
    references: [
      'Levine GN, et al. 2016 ACC/AHA Guideline Focused Update on Duration of Dual Antiplatelet Therapy',
      'Ibanez B, et al. 2017 ESC Guidelines for the management of acute myocardial infarction in patients presenting with ST-segment elevation'
    ],
    difficulty: 'easy',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-004',
    question: 'A 45-year-old female presents with sharp chest pain that worsens with deep inspiration and improves when sitting forward. ECG shows diffuse ST elevation. What is the most likely diagnosis?',
    options: [
      'Anterior STEMI',
      'Acute pericarditis',
      'Pulmonary embolism',
      'Aortic dissection'
    ],
    correctIndex: 1,
    explanation: 'Acute pericarditis classically presents with sharp, pleuritic chest pain that improves with sitting forward and leaning forward. ECG typically shows diffuse ST elevation (not in a specific coronary territory) and PR depression. The pain is often described as sharp and positional.',
    references: [
      'Adler Y, et al. 2015 ESC Guidelines for the diagnosis and management of pericardial diseases. Eur Heart J. 2015;36(42):2921-2964',
      'Klein AL, et al. Clinical and echocardiographic diagnosis of acute pericarditis. Curr Probl Cardiol. 2016;41(2):48-57'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-005',
    question: 'What is the first-line treatment for stable wide-complex tachycardia with a regular rhythm in a hemodynamically stable patient?',
    options: [
      'Synchronized cardioversion',
      'Adenosine 6mg IV',
      'Amiodarone 150mg IV',
      'Lidocaine 1.5mg/kg IV'
    ],
    correctIndex: 2,
    explanation: 'For stable wide-complex tachycardia with regular rhythm, amiodarone 150mg IV over 10 minutes is the first-line treatment. If the rhythm is irregular, consider atrial fibrillation with aberrancy and treat accordingly. Adenosine can be tried if SVT with aberrancy is suspected.',
    references: [
      'Neumar RW, et al. 2010 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care',
      'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients with Supraventricular Tachycardia'
    ],
    difficulty: 'hard',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-006',
    question: 'A 70-year-old male with a history of heart failure presents with acute dyspnea, pink frothy sputum, and bilateral rales. Blood pressure is 180/100 mmHg. What is the most appropriate initial treatment?',
    options: [
      'Furosemide 40mg IV',
      'Nitroglycerin 0.4mg SL',
      'Morphine 2mg IV',
      'BiPAP with PEEP'
    ],
    correctIndex: 3,
    explanation: 'Non-invasive positive pressure ventilation (BiPAP/CPAP) is the most appropriate initial treatment for acute cardiogenic pulmonary edema. It reduces preload and afterload, improves oxygenation, and has been shown to reduce mortality and the need for intubation.',
    references: [
      'Yancy CW, et al. 2013 ACCF/AHA Guideline for the Management of Heart Failure. Circulation. 2013;128(16):e240-e327',
      'Gray A, et al. Noninvasive ventilation in acute cardiogenic pulmonary edema. N Engl J Med. 2008;359(2):142-151'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-007',
    question: 'What is the most common cause of sudden cardiac death in young athletes (<35 years old)?',
    options: [
      'Hypertrophic cardiomyopathy',
      'Arrhythmogenic right ventricular cardiomyopathy',
      'Long QT syndrome',
      'Commotio cordis'
    ],
    correctIndex: 0,
    explanation: 'Hypertrophic cardiomyopathy (HCM) is the most common cause of sudden cardiac death in young athletes under 35 years old, accounting for approximately 35-40% of cases. It is characterized by asymmetric septal hypertrophy and can cause outflow tract obstruction.',
    references: [
      'Maron BJ, et al. Sudden deaths in young competitive athletes: analysis of 1866 deaths in the United States, 1980-2006. Circulation. 2009;119(8):1085-1092',
      'Semsarian C, et al. Sudden cardiac death in the young: the molecular autopsy and a practical approach to surviving relatives'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-008',
    question: 'A patient presents with chest pain and ECG shows ST depression in leads V1-V4. Troponin I is elevated. What type of acute coronary syndrome is this?',
    options: [
      'STEMI',
      'NSTEMI',
      'Unstable angina',
      'Stable angina'
    ],
    correctIndex: 1,
    explanation: 'This presentation is consistent with Non-ST-Elevation Myocardial Infarction (NSTEMI). The combination of ischemic symptoms, ECG changes (ST depression), and elevated cardiac biomarkers (troponin) without ST elevation defines NSTEMI.',
    references: [
      'Amsterdam EA, et al. 2014 AHA/ACC Guideline for the Management of Patients with Non-ST-Elevation Acute Coronary Syndromes',
      'Collet JP, et al. 2020 ESC Guidelines for the management of acute coronary syndromes in patients presenting without persistent ST-segment elevation'
    ],
    difficulty: 'easy',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-009',
    question: 'What is the target blood pressure for a patient with acute ischemic stroke who is a candidate for thrombolytic therapy?',
    options: [
      '<140/90 mmHg',
      '<160/100 mmHg',
      '<180/105 mmHg',
      '<200/110 mmHg'
    ],
    correctIndex: 2,
    explanation: 'For patients with acute ischemic stroke who are candidates for IV thrombolysis (alteplase), blood pressure must be <185/110 mmHg before treatment and maintained <180/105 mmHg for 24 hours after treatment to reduce the risk of hemorrhagic complications.',
    references: [
      'Powers WJ, et al. 2018 Guidelines for the Early Management of Patients With Acute Ischemic Stroke. Stroke. 2018;49(3):e46-e110',
      'American Heart Association/American Stroke Association Stroke Council'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-010',
    question: 'A 28-year-old pregnant woman at 34 weeks gestation presents with sudden onset severe chest pain and dyspnea. What is the most likely diagnosis?',
    options: [
      'Myocardial infarction',
      'Pulmonary embolism',
      'Aortic dissection',
      'Pneumothorax'
    ],
    correctIndex: 1,
    explanation: 'Pregnancy is a hypercoagulable state that significantly increases the risk of venous thromboembolism. Pulmonary embolism is 5-6 times more common in pregnant women, especially in the third trimester and postpartum period. The presentation of sudden chest pain and dyspnea in a pregnant woman should raise high suspicion for PE.',
    references: [
      'Konstantinides SV, et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism',
      'James AH, et al. Venous thromboembolism during pregnancy and the postpartum period: incidence, risk factors, and mortality'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-011',
    question: 'What is the recommended compression-to-ventilation ratio for adult CPR with two rescuers?',
    options: [
      '15:2',
      '30:2',
      '100:2',
      'Continuous compressions'
    ],
    correctIndex: 1,
    explanation: 'The American Heart Association recommends a compression-to-ventilation ratio of 30:2 for adult CPR, regardless of whether there is one or two rescuers. This ratio applies until an advanced airway is established, after which continuous compressions with 8-10 ventilations per minute is recommended.',
    references: [
      'Neumar RW, et al. 2015 American Heart Association Guidelines Update for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care',
      'Berg KM, et al. Adult Advanced Life Support: 2020 International Consensus on Cardiopulmonary Resuscitation'
    ],
    difficulty: 'easy',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-012',
    question: 'A patient in cardiac arrest receives epinephrine. What is the recommended dose and route?',
    options: [
      '0.1mg IV every 3-5 minutes',
      '1mg IV every 3-5 minutes',
      '0.1mg ET every 3-5 minutes',
      '1mg IV every 1-2 minutes'
    ],
    correctIndex: 1,
    explanation: 'The standard dose of epinephrine during cardiac arrest is 1mg IV/IO every 3-5 minutes. This dosing should continue throughout the resuscitation. Endotracheal administration is no longer recommended as first-line due to unpredictable absorption.',
    references: [
      'Panchal AR, et al. 2019 American Heart Association Focused Update on Advanced Cardiovascular Life Support',
      'Soar J, et al. European Resuscitation Council Guidelines 2021: Adult advanced life support'
    ],
    difficulty: 'easy',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-013',
    question: 'What is the most appropriate energy level for the first defibrillation attempt in an adult patient?',
    options: [
      '120 Joules',
      '150-200 Joules',
      '300 Joules',
      '360 Joules'
    ],
    correctIndex: 1,
    explanation: 'For biphasic defibrillators, the initial energy level should be 150-200 Joules. If using a monophasic defibrillator, 360 Joules is appropriate. Most modern defibrillators are biphasic, which are more effective at lower energy levels than monophasic defibrillators.',
    references: [
      'Link MS, et al. 2015 American Heart Association Guidelines Update for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care',
      'Kudenchuk PJ, et al. Resuscitation outcomes consortium-amiodarone, lidocaine or placebo study (ROC-ALPS)'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-014',
    question: 'A 65-year-old diabetic patient presents with nausea, diaphoresis, and fatigue for 6 hours. ECG shows subtle ST depressions in leads V4-V6. What is the most appropriate next step?',
    options: [
      'Discharge home with follow-up',
      'Obtain serial troponins',
      'Immediate cardiac catheterization',
      'Stress testing'
    ],
    correctIndex: 1,
    explanation: 'Diabetic patients often present with atypical symptoms of acute coronary syndrome. Nausea, diaphoresis, and fatigue can be anginal equivalents. With ECG changes present, serial troponins should be obtained to rule out myocardial infarction. Diabetics have higher risk of silent ischemia.',
    references: [
      'Canto JG, et al. Prevalence, clinical characteristics, and mortality among patients with myocardial infarction presenting without chest pain',
      'Amsterdam EA, et al. 2014 AHA/ACC Guideline for the Management of Patients with Non-ST-Elevation Acute Coronary Syndromes'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-015',
    question: 'What is the mechanism of action of clopidogrel in acute coronary syndrome management?',
    options: [
      'Cyclooxygenase inhibition',
      'P2Y12 receptor antagonism',
      'Glycoprotein IIb/IIIa inhibition',
      'Direct thrombin inhibition'
    ],
    correctIndex: 1,
    explanation: 'Clopidogrel is a P2Y12 receptor antagonist that irreversibly blocks ADP-induced platelet aggregation. It is used in dual antiplatelet therapy (DAPT) along with aspirin in patients with acute coronary syndromes to reduce thrombotic events.',
    references: [
      'Levine GN, et al. 2016 ACC/AHA Guideline Focused Update on Duration of Dual Antiplatelet Therapy',
      'Wallentin L, et al. Ticagrelor versus clopidogrel in patients with acute coronary syndromes. N Engl J Med. 2009;361(11):1045-1057'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-016',
    question: 'A patient presents with syncope and ECG shows QTc of 520 ms. Which medication should be avoided?',
    options: [
      'Metoprolol',
      'Ondansetron',
      'Lisinopril',
      'Atorvastatin'
    ],
    correctIndex: 1,
    explanation: 'Ondansetron can prolong the QT interval and should be avoided in patients with existing QT prolongation (QTc >500 ms) as it increases the risk of torsades de pointes. Alternative antiemetics like metoclopramide or promethazine should be considered.',
    references: [
      'Vandael E, et al. Risk factors for QTc-prolongation: systematic review of the evidence. Int J Clin Pharm. 2017;39(1):16-25',
      'Beach SR, et al. QTc prolongation, torsades de pointes, and psychotropic medications: A 5-year update'
    ],
    difficulty: 'hard',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-017',
    question: 'What is the target INR range for a patient with atrial fibrillation on warfarin therapy?',
    options: [
      '1.5-2.0',
      '2.0-3.0',
      '2.5-3.5',
      '3.0-4.0'
    ],
    correctIndex: 1,
    explanation: 'The target INR range for most patients with atrial fibrillation on warfarin is 2.0-3.0. This range provides optimal balance between stroke prevention and bleeding risk. Patients with mechanical heart valves may require higher INR targets.',
    references: [
      'January CT, et al. 2019 AHA/ACC/HRS Focused Update of the 2014 AHA/ACC/HRS Guideline for the Management of Patients with Atrial Fibrillation',
      'Lip GY, et al. Antithrombotic therapy for atrial fibrillation: CHEST Guideline and Expert Panel Report'
    ],
    difficulty: 'easy',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-018',
    question: 'A 50-year-old male presents with severe tearing chest pain radiating to the back. Blood pressure is 180/110 mmHg in the right arm and 140/80 mmHg in the left arm. What is the most likely diagnosis?',
    options: [
      'Myocardial infarction',
      'Pulmonary embolism',
      'Aortic dissection',
      'Esophageal rupture'
    ],
    correctIndex: 2,
    explanation: 'The presentation of severe tearing chest pain radiating to the back with a blood pressure differential between arms >20 mmHg is highly suggestive of aortic dissection. The differential in blood pressure indicates involvement of the subclavian artery.',
    references: [
      'Hiratzka LF, et al. 2010 ACCF/AHA/AATS/ACR/ASA/SCA/SCAI/SIR/STS/SVM Guidelines for the Diagnosis and Management of Patients With Thoracic Aortic Disease',
      'Erbel R, et al. 2014 ESC Guidelines on the diagnosis and treatment of aortic diseases'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-019',
    question: 'What is the preferred method for rhythm control in a hemodynamically stable patient with atrial fibrillation with rapid ventricular response?',
    options: [
      'Synchronized cardioversion',
      'Diltiazem IV',
      'Amiodarone IV',
      'Digoxin IV'
    ],
    correctIndex: 1,
    explanation: 'For hemodynamically stable patients with atrial fibrillation with rapid ventricular response, rate control with calcium channel blockers (diltiazem) or beta-blockers is preferred initially. Diltiazem IV is effective for acute rate control. Rhythm control can be considered after rate control is achieved.',
    references: [
      'January CT, et al. 2014 AHA/ACC/HRS Guideline for the Management of Patients with Atrial Fibrillation',
      'Wyse DG, et al. A comparison of rate control and rhythm control in patients with atrial fibrillation'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-020',
    question: 'A patient presents with chest pain and ECG shows ST elevation in leads V1-V4. Which coronary artery is most likely occluded?',
    options: [
      'Right coronary artery',
      'Left anterior descending artery',
      'Left circumflex artery',
      'Posterior descending artery'
    ],
    correctIndex: 1,
    explanation: 'ST elevation in leads V1-V4 indicates an anterior wall myocardial infarction, which is typically caused by occlusion of the left anterior descending (LAD) coronary artery. The LAD supplies the anterior wall of the left ventricle.',
    references: [
      'O\'Gara PT, et al. 2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction',
      'Thygesen K, et al. Fourth Universal Definition of Myocardial Infarction. Circulation. 2018;138(20):e618-e651'
    ],
    difficulty: 'easy',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-021',
    question: 'What is the most common cause of cardiogenic shock in the setting of acute myocardial infarction?',
    options: [
      'Ventricular septal rupture',
      'Papillary muscle rupture',
      'Free wall rupture',
      'Large myocardial infarction'
    ],
    correctIndex: 3,
    explanation: 'Large myocardial infarction (>40% of left ventricular myocardium) is the most common cause of cardiogenic shock in acute MI, accounting for 75-80% of cases. Mechanical complications like VSD, papillary muscle rupture, and free wall rupture are less common but more dramatic causes.',
    references: [
      'Thiele H, et al. Management of cardiogenic shock complicating myocardial infarction: an update 2019',
      'van Diepen S, et al. Contemporary Management of Cardiogenic Shock: A Scientific Statement From the American Heart Association'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-022',
    question: 'A patient with known heart failure presents with weight gain, orthopnea, and elevated BNP. What class of medication should be initiated or optimized first?',
    options: [
      'ACE inhibitor',
      'Beta-blocker',
      'Diuretic',
      'Aldosterone antagonist'
    ],
    correctIndex: 2,
    explanation: 'In acute decompensated heart failure with volume overload (weight gain, orthopnea), diuretics should be initiated first to relieve congestion. Loop diuretics like furosemide are first-line for symptom relief. ACE inhibitors and beta-blockers are important for long-term management but may worsen acute symptoms.',
    references: [
      'Yancy CW, et al. 2017 ACC/AHA/HFSA Focused Update of the 2013 ACCF/AHA Guideline for the Management of Heart Failure',
      'Ponikowski P, et al. 2016 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-023',
    question: 'What is the most appropriate initial treatment for a patient presenting with symptomatic bradycardia (heart rate 35 bpm) and altered mental status?',
    options: [
      'Atropine 0.5mg IV',
      'Transcutaneous pacing',
      'Isoproterenol infusion',
      'Transvenous pacing'
    ],
    correctIndex: 1,
    explanation: 'For symptomatic bradycardia with hemodynamic compromise (altered mental status), transcutaneous pacing should be initiated immediately. While atropine can be given, it may not be effective for complete heart block or infranodal blocks, and transcutaneous pacing provides more reliable heart rate support.',
    references: [
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay',
      'Neumar RW, et al. 2015 American Heart Association Guidelines Update for Cardiopulmonary Resuscitation'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-024',
    question: 'A 40-year-old cocaine user presents with chest pain and ST elevation on ECG. What medication should be avoided?',
    options: [
      'Aspirin',
      'Nitroglycerin',
      'Metoprolol',
      'Morphine'
    ],
    correctIndex: 2,
    explanation: 'Beta-blockers should be avoided in cocaine-induced acute coronary syndrome as they can worsen coronary artery spasm through unopposed alpha-adrenergic stimulation. This can lead to increased coronary vasoconstriction and hypertension. Benzodiazepines are preferred for cocaine intoxication.',
    references: [
      'McCord J, et al. Management of cocaine-associated chest pain and myocardial infarction: a scientific statement from the American Heart Association',
      'Hollander JE, et al. Cocaine-associated myocardial infarction: mortality and complications'
    ],
    difficulty: 'hard',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-025',
    question: 'What is the recommended treatment for torsades de pointes?',
    options: [
      'Synchronized cardioversion',
      'Amiodarone 150mg IV',
      'Magnesium sulfate 2g IV',
      'Lidocaine 1.5mg/kg IV'
    ],
    correctIndex: 2,
    explanation: 'Magnesium sulfate 2g IV is the first-line treatment for torsades de pointes, even if serum magnesium levels are normal. It helps stabilize the cardiac membrane and terminate the arrhythmia. If the patient is hemodynamically unstable, unsynchronized defibrillation may be needed.',
    references: [
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias and the Prevention of Sudden Cardiac Death',
      'Roden DM. Drug-induced prolongation of the QT interval. N Engl J Med. 2004;350(10):1013-1022'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-026',
    question: 'A patient presents with acute onset severe chest pain, muffled heart sounds, and elevated jugular venous pressure. What is the most likely diagnosis?',
    options: [
      'Myocardial infarction',
      'Pulmonary embolism',
      'Cardiac tamponade',
      'Tension pneumothorax'
    ],
    correctIndex: 2,
    explanation: 'The classic triad of cardiac tamponade includes elevated jugular venous pressure, muffled heart sounds, and hypotension (Beck\'s triad). Cardiac tamponade is a life-threatening condition requiring immediate pericardiocentesis or surgical drainage.',
    references: [
      'Adler Y, et al. 2015 ESC Guidelines for the diagnosis and management of pericardial diseases',
      'Klein AL, et al. Clinical diagnosis and management of pericardial effusion and cardiac tamponade in the era of echocardiography'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-027',
    question: 'What is the most common ECG finding in pulmonary embolism?',
    options: [
      'S1Q3T3 pattern',
      'Right bundle branch block',
      'Sinus tachycardia',
      'ST elevation in V1-V3'
    ],
    correctIndex: 2,
    explanation: 'Sinus tachycardia is the most common ECG finding in pulmonary embolism, present in 70-80% of cases. The classic S1Q3T3 pattern (S wave in lead I, Q wave and T wave inversion in lead III) is present in only 10-15% of cases and indicates significant PE with right heart strain.',
    references: [
      'Konstantinides SV, et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism',
      'Stein PD, et al. Clinical, laboratory, roentgenographic, and electrocardiographic findings in patients with acute pulmonary embolism'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-028',
    question: 'A 35-year-old athlete collapses during a basketball game. Initial rhythm is ventricular fibrillation. What is the most likely underlying condition?',
    options: [
      'Hypertrophic cardiomyopathy',
      'Long QT syndrome',
      'Brugada syndrome',
      'Arrhythmogenic right ventricular cardiomyopathy'
    ],
    correctIndex: 0,
    explanation: 'Hypertrophic cardiomyopathy is the most common cause of sudden cardiac death in young athletes, especially during exertion. It can present with ventricular fibrillation due to outflow tract obstruction and increased oxygen demand during exercise.',
    references: [
      'Maron BJ, et al. Sudden deaths in young competitive athletes: analysis of 1866 deaths in the United States, 1980-2006',
      'Gersh BJ, et al. 2011 ACCF/AHA Guideline for the Diagnosis and Treatment of Hypertrophic Cardiomyopathy'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-029',
    question: 'What is the most appropriate next step for a patient with acute STEMI who arrives at a hospital without PCI capability?',
    options: [
      'Administer thrombolytics immediately',
      'Transfer for primary PCI if <120 minutes',
      'Start dual antiplatelet therapy and observe',
      'Perform urgent echocardiogram'
    ],
    correctIndex: 1,
    explanation: 'For STEMI patients at non-PCI capable hospitals, transfer for primary PCI is preferred if the anticipated first medical contact-to-device time is <120 minutes. If transfer would result in significant delay (>120 minutes), fibrinolytic therapy should be considered if no contraindications exist.',
    references: [
      'O\'Gara PT, et al. 2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction',
      'Ibanez B, et al. 2017 ESC Guidelines for the management of acute myocardial infarction in patients presenting with ST-segment elevation'
    ],
    difficulty: 'medium',
    topicId: 'cardiac-emergencies'
  },
  {
    id: 'cardiac-030',
    question: 'A patient with mechanical aortic valve replacement presents with acute dyspnea and decreased valve clicks on auscultation. What is the most likely complication?',
    options: [
      'Valve thrombosis',
      'Paravalvular leak',
      'Endocarditis',
      'Valve dehiscence'
    ],
    correctIndex: 0,
    explanation: 'Acute onset dyspnea with decreased or absent mechanical valve clicks suggests valve thrombosis, which is a life-threatening emergency. This typically occurs in patients with subtherapeutic anticoagulation. Immediate thrombolytic therapy or emergency valve replacement may be required.',
    references: [
      'Nishimura RA, et al. 2017 AHA/ACC Focused Update of the 2014 AHA/ACC Guideline for the Management of Patients With Valvular Heart Disease',
      'Vahanian A, et al. 2021 ESC/EACTS Guidelines for the management of valvular heart disease'
    ],
    difficulty: 'hard',
    topicId: 'cardiac-emergencies'
  }
];