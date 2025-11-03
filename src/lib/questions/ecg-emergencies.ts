import { Question } from './types';

export const ecgEmergenciesQuestions: Question[] = [
  {
    id: 'ecg-001',
    question: 'A 65-year-old patient presents with chest pain. ECG shows ST elevation in leads II, III, and aVF with reciprocal depression in I and aVL. What is the most likely diagnosis and culprit vessel?',
    options: [
      'Anterior STEMI - LAD occlusion',
      'Inferior STEMI - RCA occlusion',
      'Lateral STEMI - LCX occlusion',
      'Posterior STEMI - RCA occlusion'
    ],
    correctIndex: 1,
    explanation: 'ST elevation in leads II, III, and aVF indicates inferior STEMI. The RCA supplies the inferior wall in 80-90% of patients. Reciprocal depression in leads I and aVL supports this diagnosis. Right-sided ECG should be obtained to assess for RV involvement.',
    references: [
      'O\'Gara PT, et al. 2023 AHA/ACC STEMI Guidelines for the Management of ST-Elevation Myocardial Infarction',
      'Thygesen K, et al. Fourth Universal Definition of Myocardial Infarction (2018)'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-002',
    question: 'ECG Image Description: Wide QRS tachycardia at 180 bpm, QRS width 140ms, AV dissociation visible with P waves marching through at different rate. What is the most likely diagnosis?',
    options: [
      'Supraventricular tachycardia with aberrancy',
      'Ventricular tachycardia',
      'Atrial fibrillation with rapid ventricular response',
      'Atrial flutter with 2:1 conduction'
    ],
    correctIndex: 1,
    explanation: 'AV dissociation (independent P waves and QRS complexes) is pathognomonic for ventricular tachycardia. QRS width >120ms with AV dissociation makes VT the most likely diagnosis. This requires immediate treatment with amiodarone or cardioversion.',
    references: [
      'Brugada P, et al. A new approach to the differential diagnosis of a regular tachycardia with a wide QRS complex',
      'Vereckei A, et al. New algorithm using only lead aVR for differential diagnosis of wide QRS complex tachycardia'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-003',
    question: 'A patient with hyperkalemia (K+ 7.2 mEq/L) shows ECG changes. Which progression of changes would you expect as potassium levels increase?',
    options: [
      'Peaked T waves → QRS widening → Sine wave → Asystole',
      'QRS widening → Peaked T waves → Sine wave → Asystole',
      'Sine wave → Peaked T waves → QRS widening → Asystole',
      'Peaked T waves → Sine wave → QRS widening → Asystole'
    ],
    correctIndex: 0,
    explanation: 'Hyperkalemia ECG changes progress predictably: 1) Peaked, narrow T waves (K+ 5.5-6.5), 2) QRS widening and PR prolongation (K+ 6.5-7.5), 3) Sine wave pattern (K+ 7.5-8.5), 4) Ventricular fibrillation/asystole (K+ >8.5).',
    references: [
      'Parham WA, et al. Hyperkalemia revisited. Tex Heart Inst J. 2006;33(1):40-47',
      'Mattu A, et al. ECG manifestations of selected metabolic and endocrine disorders'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-004',
    question: 'ECG Image Description: Regular rhythm, rate 45 bpm, normal P waves followed by progressively lengthening PR intervals until a P wave is not conducted (dropped QRS). What is this rhythm?',
    options: [
      'First-degree AV block',
      'Second-degree AV block Type I (Wenckebach)',
      'Second-degree AV block Type II',
      'Third-degree AV block'
    ],
    correctIndex: 1,
    explanation: 'Wenckebach (Mobitz Type I) shows progressive PR prolongation until a QRS is dropped, then the cycle repeats. This is usually benign and located at the AV node. Type II has constant PR intervals with sudden dropped beats and is more dangerous.',
    references: [
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay',
      'Barold SS, et al. Second-degree atrioventricular block: a reappraisal'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-005',
    question: 'A patient presents with syncope. ECG shows QTc interval of 520ms with torsades de pointes. Which medication is most likely responsible?',
    options: [
      'Amiodarone',
      'Metoprolol',
      'Sotalol',
      'Digoxin'
    ],
    correctIndex: 2,
    explanation: 'Sotalol is a Class III antiarrhythmic that blocks potassium channels, significantly prolonging QT interval and predisposing to torsades de pointes. QTc >500ms indicates high risk. Other common culprits include quinidine, procainamide, and haloperidol.',
    references: [
      'Roden DM. Drug-induced prolongation of the QT interval. N Engl J Med. 2004;350(10):1013-1022',
      'Vandenberk B, et al. Which QT correction formulae to use for QT monitoring?'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-006',
    question: 'ECG Image Description: ST elevation in V1-V4 with Q waves in V1-V3, ST depression in II, III, aVF. Tall R waves in V1-V2 with R/S ratio >1. What is the diagnosis?',
    options: [
      'Anterior STEMI',
      'Posterior STEMI',
      'Right ventricular infarction',
      'Left main coronary occlusion'
    ],
    correctIndex: 1,
    explanation: 'Posterior STEMI presents with reciprocal changes in anterior leads: ST depression V1-V3, tall R waves V1-V2 (reciprocal of posterior Q waves), and upright T waves V1-V2. Posterior leads V7-V9 would show ST elevation confirming diagnosis.',
    references: [
      'Matetzky S, et al. Acute myocardial infarction with isolated ST-segment elevation in posterior chest leads V7-9',
      'Boden WE, et al. Electrocardiographic evolution of posterior acute myocardial infarction'
    ],
    difficulty: 'hard',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-007',
    question: 'A patient with chest pain shows new LBBB on ECG. According to STEMI criteria, what additional finding would indicate emergent catheterization?',
    options: [
      'Any new LBBB is STEMI equivalent',
      'Concordant ST elevation ≥1mm in leads with positive QRS',
      'Discordant ST elevation ≥5mm in leads with negative QRS',
      'Both B and C'
    ],
    correctIndex: 3,
    explanation: 'Sgarbossa criteria for STEMI in LBBB: 1) Concordant ST elevation ≥1mm, 2) Concordant ST depression ≥1mm in V1-V3, 3) Discordant ST elevation ≥5mm. Modified criteria use proportional discordance ≥25% of S wave depth.',
    references: [
      'Sgarbossa EB, et al. Electrocardiographic diagnosis of evolving acute myocardial infarction in the presence of left bundle-branch block',
      'Smith SW, et al. Diagnosis of ST-elevation myocardial infarction in the presence of left bundle branch block'
    ],
    difficulty: 'hard',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-008',
    question: 'ECG Image Description: Irregularly irregular rhythm, rate 150 bpm, no discernible P waves, varying QRS morphology. Patient is hypotensive. What is the most appropriate treatment?',
    options: [
      'Amiodarone 150mg IV',
      'Metoprolol 5mg IV',
      'Synchronized cardioversion',
      'Diltiazem 0.25mg/kg IV'
    ],
    correctIndex: 2,
    explanation: 'Atrial fibrillation with rapid ventricular response causing hemodynamic instability requires immediate synchronized cardioversion. Unstable patients should not receive rate control medications first. Start with 100-200J biphasic.',
    references: [
      'January CT, et al. 2019 AHA/ACC/HRS Focused Update of the 2014 AHA/ACC/HRS Guideline for the Management of Patients With Atrial Fibrillation',
      'Neumar RW, et al. Part 8: Adult Advanced Cardiovascular Life Support: 2010 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-009',
    question: 'A patient presents with chest pain. ECG shows ST elevation in V7-V9 (posterior leads) but normal 12-lead ECG. What is the most appropriate next step?',
    options: [
      'Repeat 12-lead ECG in 30 minutes',
      'Obtain troponins and discharge if negative',
      'Emergent cardiac catheterization',
      'Stress testing'
    ],
    correctIndex: 2,
    explanation: 'ST elevation in posterior leads V7-V9 indicates isolated posterior STEMI, which is a STEMI equivalent requiring emergent reperfusion therapy. The standard 12-lead may appear normal or show only subtle reciprocal changes in V1-V3.',
    references: [
      'Matetzky S, et al. Acute myocardial infarction with isolated ST-segment elevation in posterior chest leads V7-9',
      'O\'Gara PT, et al. 2023 AHA/ACC STEMI Guidelines for the Management of ST-Elevation Myocardial Infarction'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-010',
    question: 'ECG Image Description: Sawtooth pattern in inferior leads with ventricular rate of 150 bpm, regular rhythm. What is the atrial rate and most likely diagnosis?',
    options: [
      'Atrial rate 150 bpm - Atrial fibrillation',
      'Atrial rate 300 bpm - Atrial flutter with 2:1 conduction',
      'Atrial rate 450 bpm - Atrial flutter with 3:1 conduction',
      'Atrial rate 250 bpm - Atrial tachycardia'
    ],
    correctIndex: 1,
    explanation: 'Atrial flutter typically has atrial rate of 300 bpm (range 250-350). Sawtooth pattern is classic in inferior leads. Ventricular rate of 150 suggests 2:1 AV conduction. This can be slowed with AV nodal blocking agents to reveal flutter waves.',
    references: [
      'Blomström-Lundqvist C, et al. ACC/AHA/ESC guidelines for the management of patients with supraventricular arrhythmias',
      'Granada J, et al. Incidence and predictors of atrial flutter in the general population'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-011',
    question: 'A patient with hypocalcemia (Ca++ 6.8 mg/dL) presents with seizures. What ECG finding would you expect?',
    options: [
      'Shortened QT interval',
      'Prolonged QT interval',
      'Peaked T waves',
      'Delta waves'
    ],
    correctIndex: 1,
    explanation: 'Hypocalcemia prolongs the QT interval by extending the ST segment (plateau phase of action potential). This predisposes to torsades de pointes. Hypercalcemia causes QT shortening. Peaked T waves suggest hyperkalemia.',
    references: [
      'Charbit B, et al. QT interval prolongation among critically ill patients: prevalence, risk factors and prognostic value',
      'Dhupa S, et al. Hypocalcemia. StatPearls. 2023'
    ],
    difficulty: 'easy',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-012',
    question: 'ECG Image Description: Wide complex tachycardia at 200 bpm, concordance in precordial leads (all positive QRS), capture beats visible. What is the diagnosis and treatment?',
    options: [
      'SVT with aberrancy - Adenosine 6mg IV',
      'Ventricular tachycardia - Amiodarone 150mg IV',
      'Ventricular tachycardia - Synchronized cardioversion',
      'Atrial fibrillation - Rate control'
    ],
    correctIndex: 2,
    explanation: 'Positive concordance across precordial leads and capture beats confirm ventricular tachycardia. At rate 200 bpm with wide QRS, this is likely hemodynamically significant VT requiring immediate synchronized cardioversion rather than antiarrhythmics.',
    references: [
      'Neumar RW, et al. Part 8: Adult Advanced Cardiovascular Life Support: 2010 American Heart Association Guidelines',
      'Wellens HJ, et al. The wide QRS tachycardia'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-013',
    question: 'A patient presents with weakness. ECG shows U waves prominent in V2-V4, flattened T waves, and ST depression. Serum potassium is 2.8 mEq/L. What arrhythmia risk is highest?',
    options: [
      'Atrial fibrillation',
      'Ventricular tachycardia',
      'Torsades de pointes',
      'Complete heart block'
    ],
    correctIndex: 2,
    explanation: 'Hypokalemia causes prominent U waves, T wave flattening, and QT prolongation (actually QU prolongation). This predisposes to torsades de pointes, especially when K+ <3.0 mEq/L. Urgent potassium replacement is needed.',
    references: [
      'Gennari FJ. Hypokalemia. N Engl J Med. 1998;339(7):451-458',
      'Diercks DB, et al. Electrocardiographic manifestations: electrolyte abnormalities'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-014',
    question: 'ECG Image Description: Rate 35 bpm, normal P waves with constant PR interval 200ms, then sudden P wave not followed by QRS, then normal conduction resumes. What type of block?',
    options: [
      'First-degree AV block',
      'Mobitz Type I (Wenckebach)',
      'Mobitz Type II',
      'Third-degree AV block'
    ],
    correctIndex: 2,
    explanation: 'Mobitz Type II shows constant PR intervals with sudden dropped QRS complexes without prior PR prolongation. This is infranodal (His-Purkinje) and more dangerous than Type I, often requiring pacemaker placement due to risk of complete heart block.',
    references: [
      'Epstein AE, et al. ACC/AHA/HRS 2008 Guidelines for Device-Based Therapy of Cardiac Rhythm Abnormalities',
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-015',
    question: 'A patient with chest pain shows ST elevation in leads I, aVL, V5-V6 with reciprocal depression in II, III, aVF. What is the culprit vessel and associated complication risk?',
    options: [
      'RCA - Right heart failure',
      'LAD - Cardiogenic shock',
      'LCX - Mitral regurgitation',
      'Left main - Complete heart block'
    ],
    correctIndex: 2,
    explanation: 'Lateral STEMI (I, aVL, V5-V6) typically involves the left circumflex artery (LCX). The lateral wall contains papillary muscle attachments, so lateral MI increases risk of acute mitral regurgitation from papillary muscle dysfunction or rupture.',
    references: [
      'O\'Gara PT, et al. 2023 AHA/ACC STEMI Guidelines for the Management of ST-Elevation Myocardial Infarction',
      'Elbadawi A, et al. Mechanical complications of acute myocardial infarction in the contemporary era'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-016',
    question: 'ECG Image Description: Polymorphic ventricular tachycardia with QRS complexes that appear to "twist" around the baseline, rate 250 bpm. Underlying QTc is 480ms. What is the treatment?',
    options: [
      'Amiodarone 150mg IV',
      'Magnesium sulfate 2g IV',
      'Lidocaine 1.5mg/kg IV',
      'Synchronized cardioversion'
    ],
    correctIndex: 1,
    explanation: 'Torsades de pointes is polymorphic VT in setting of prolonged QT. Magnesium sulfate 2g IV is first-line treatment even with normal serum magnesium. If unstable, unsynchronized defibrillation is used (not synchronized cardioversion due to polymorphic nature).',
    references: [
      'Roden DM. Drug-induced prolongation of the QT interval. N Engl J Med. 2004;350(10):1013-1022',
      'Tzivoni D, et al. Treatment of torsade de pointes with magnesium sulfate'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-017',
    question: 'A patient presents with palpitations. ECG shows regular narrow complex tachycardia at 180 bpm with no visible P waves. Vagal maneuvers terminate the rhythm. What is the most likely mechanism?',
    options: [
      'Atrial flutter',
      'AVNRT (AV nodal reentrant tachycardia)',
      'AVRT (AV reentrant tachycardia)',
      'Atrial tachycardia'
    ],
    correctIndex: 1,
    explanation: 'AVNRT is the most common regular narrow complex SVT. P waves are usually hidden within QRS complexes. Response to vagal maneuvers or adenosine confirms AV node dependence. AVRT may show retrograde P waves (RP interval <PR).',
    references: [
      'Blomström-Lundqvist C, et al. ACC/AHA/ESC guidelines for the management of patients with supraventricular arrhythmias',
      'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-018',
    question: 'ECG Image Description: ST elevation in V1-V3 with ST depression in V4-V6, I, aVL. Patient has chest pain and hypotension. What is the priority intervention?',
    options: [
      'Immediate PCI for anterior STEMI',
      'Posterior ECG leads and emergent catheterization',
      'Right-sided ECG leads',
      'Repeat ECG in 30 minutes'
    ],
    correctIndex: 1,
    explanation: 'This pattern suggests posterior STEMI with reciprocal anterior changes. ST elevation in V1-V3 with posterior MI indicates large posterior wall involvement. Posterior leads V7-V9 would confirm ST elevation. This requires emergent reperfusion therapy.',
    references: [
      'Matetzky S, et al. Acute myocardial infarction with isolated ST-segment elevation in posterior chest leads V7-9',
      'Boden WE, et al. Electrocardiographic evolution of posterior acute myocardial infarction'
    ],
    difficulty: 'hard',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-019',
    question: 'A dialysis patient presents with weakness. ECG shows peaked T waves in all leads, QRS width 130ms, and absent P waves. Serum K+ is 7.8 mEq/L. What is the most urgent treatment?',
    options: [
      'Calcium gluconate 1g IV',
      'Insulin 10 units + D50 1 amp IV',
      'Sodium bicarbonate 50 mEq IV',
      'Emergency dialysis'
    ],
    correctIndex: 0,
    explanation: 'Severe hyperkalemia with QRS widening and absent P waves indicates imminent cardiac arrest. Calcium gluconate stabilizes cardiac membranes within minutes and is most urgent. Insulin/glucose and bicarbonate shift potassium intracellularly but take longer.',
    references: [
      'Palmer BF, et al. Managing hyperkalemia caused by inhibitors of the renin-angiotensin-aldosterone system',
      'Parham WA, et al. Hyperkalemia revisited. Tex Heart Inst J. 2006;33(1):40-47'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-020',
    question: 'ECG Image Description: Delta waves in leads II, III, aVF with short PR interval (110ms). Patient has recurrent palpitations. What condition and pathway location?',
    options: [
      'WPW syndrome - Left lateral pathway',
      'WPW syndrome - Posteroseptal pathway',
      'WPW syndrome - Right lateral pathway',
      'LGL syndrome'
    ],
    correctIndex: 1,
    explanation: 'Delta waves in inferior leads (II, III, aVF) suggest posteroseptal accessory pathway in WPW syndrome. Left lateral pathways show delta waves in I, aVL, V5-V6. Short PR interval with delta waves confirms pre-excitation. Avoid AV nodal blockers in atrial fibrillation with WPW.',
    references: [
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias and the Prevention of Sudden Cardiac Death',
      'Katritsis DG, et al. Accessory pathway localization by QRS polarity in patients with Wolff-Parkinson-White syndrome'
    ],
    difficulty: 'hard',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-021',
    question: 'A patient with acute MI develops new murmur and pulmonary edema. ECG shows inferior STEMI. What mechanical complication is most likely and what ECG finding supports this?',
    options: [
      'Papillary muscle rupture - New Q waves',
      'Ventricular septal rupture - New RBBB',
      'Free wall rupture - Electrical alternans',
      'Papillary muscle rupture - No specific ECG change'
    ],
    correctIndex: 3,
    explanation: 'Papillary muscle rupture typically occurs 2-7 days post-MI, more common with inferior MI (posteromedial papillary muscle has single blood supply from RCA/PDA). Causes acute severe mitral regurgitation and pulmonary edema. No specific ECG changes occur.',
    references: [
      'Elbadawi A, et al. Mechanical complications of acute myocardial infarction in the contemporary era',
      'Formica F, et al. Update on papillary muscle rupture'
    ],
    difficulty: 'hard',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-022',
    question: 'ECG Image Description: Atrial fibrillation with rapid ventricular response, rate 180 bpm, QRS 180ms with LBBB pattern. Patient taking flecainide. What is the concern?',
    options: [
      'Normal response to flecainide',
      'Flecainide toxicity causing 1:1 atrial flutter conduction',
      'Underlying structural heart disease',
      'Drug interaction'
    ],
    correctIndex: 1,
    explanation: 'Flecainide (Class IC antiarrhythmic) can convert atrial fibrillation to atrial flutter and slow atrial rate enough to allow 1:1 AV conduction, paradoxically increasing ventricular rate. Always give AV nodal blockers with Class IC agents. Very wide QRS suggests toxicity.',
    references: [
      'Prystowsky EN, et al. Management of patients with atrial fibrillation: a statement for healthcare professionals from the subcommittee on electrocardiography and electrophysiology',
      'Falk RH. Flecainide-induced ventricular tachycardia and fibrillation in patients treated for atrial fibrillation'
    ],
    difficulty: 'hard',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-023',
    question: 'A patient presents with syncope. ECG shows QTc 580ms, T wave alternans, and frequent PVCs. Which medication should be avoided?',
    options: [
      'Metoprolol',
      'Amiodarone',
      'Magnesium',
      'Potassium'
    ],
    correctIndex: 1,
    explanation: 'Amiodarone prolongs QT interval and could worsen already prolonged QTc (580ms), increasing torsades risk. Beta-blockers (metoprolol) are protective in long QT syndrome. Magnesium and potassium help prevent torsades even with normal serum levels.',
    references: [
      'Roden DM. Drug-induced prolongation of the QT interval. N Engl J Med. 2004;350(10):1013-1022',
      'Schwartz PJ, et al. Inherited cardiac arrhythmias. Nat Rev Dis Primers. 2020;6(1):58'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-024',
    question: 'ECG Image Description: Complete AV dissociation, atrial rate 85 bpm, ventricular rate 45 bpm, wide QRS complexes (140ms). Patient is symptomatic. What is the treatment?',
    options: [
      'Atropine 0.5mg IV',
      'Transcutaneous pacing',
      'Dopamine infusion',
      'Temporary transvenous pacemaker'
    ],
    correctIndex: 1,
    explanation: 'Complete heart block with wide QRS (infranodal block) and symptoms requires immediate pacing. Transcutaneous pacing is fastest temporizing measure. Atropine is ineffective for infranodal blocks. Transvenous pacing is definitive but takes time to establish.',
    references: [
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay',
      'Epstein AE, et al. ACC/AHA/HRS 2008 Guidelines for Device-Based Therapy of Cardiac Rhythm Abnormalities'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-025',
    question: 'A patient with cocaine use presents with chest pain. ECG shows ST elevation in V2-V5. What is the most appropriate initial treatment?',
    options: [
      'Metoprolol 25mg PO',
      'Nitroglycerin and aspirin',
      'Immediate PCI',
      'Thrombolytics'
    ],
    correctIndex: 1,
    explanation: 'Cocaine-induced STEMI is often due to coronary spasm rather than plaque rupture. Initial treatment includes nitrates and aspirin. Beta-blockers are contraindicated (may worsen coronary spasm via unopposed alpha stimulation). PCI if medical therapy fails.',
    references: [
      'Schwartz BG, et al. Cardiovascular effects of cocaine. Circulation. 2010;122(24):2558-2569',
      'Hollander JE, et al. Cocaine-associated myocardial infarction: clinical safety of thrombolytic therapy'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-026',
    question: 'ECG Image Description: Bizarre, wide QRS morphology that changes beat-to-beat, rate 200 bpm, no clear P waves visible. Patient is pulseless. What is the treatment?',
    options: [
      'Synchronized cardioversion 100J',
      'Unsynchronized defibrillation 200J',
      'Amiodarone 300mg IV',
      'Adenosine 6mg IV'
    ],
    correctIndex: 1,
    explanation: 'Polymorphic ventricular tachycardia (or ventricular fibrillation) in pulseless patient requires immediate unsynchronized defibrillation. Cannot synchronize to polymorphic rhythm. Follow ACLS pulseless arrest algorithm with high-quality CPR.',
    references: [
      'Neumar RW, et al. Part 8: Adult Advanced Cardiovascular Life Support: 2010 American Heart Association Guidelines',
      'Link MS, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2015 American Heart Association Guidelines Update'
    ],
    difficulty: 'easy',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-027',
    question: 'A patient with acute pericarditis shows ECG changes. Which finding would indicate progression to cardiac tamponade?',
    options: [
      'PR depression in limb leads',
      'Electrical alternans',
      'Diffuse ST elevation',
      'T wave inversions'
    ],
    correctIndex: 1,
    explanation: 'Electrical alternans (beat-to-beat variation in QRS amplitude) suggests cardiac tamponade due to heart swinging within pericardial space filled with fluid. This occurs with large effusions causing hemodynamic compromise. Requires immediate pericardiocentesis.',
    references: [
      'Reddy PS, et al. Cardiac tamponade: hemodynamic observations in man',
      'Adler Y, et al. 2015 ESC Guidelines for the diagnosis and management of pericardial diseases'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-028',
    question: 'ECG Image Description: ST elevation in leads V3R-V6R (right-sided leads) with inferior STEMI on standard 12-lead. Blood pressure 85/50 mmHg. What is the treatment priority?',
    options: [
      'Aggressive diuresis',
      'Fluid resuscitation',
      'Inotropic support',
      'Immediate PCI only'
    ],
    correctIndex: 1,
    explanation: 'Right ventricular STEMI (ST elevation in right-sided leads) with hypotension requires preload optimization with IV fluids rather than diuretics. RV depends on preload for output. Avoid nitrates and diuretics which reduce preload. PCI is still priority for reperfusion.',
    references: [
      'Zehender M, et al. Right ventricular infarction as an independent predictor of prognosis after acute inferior myocardial infarction',
      'O\'Gara PT, et al. 2023 AHA/ACC STEMI Guidelines for the Management of ST-Elevation Myocardial Infarction'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-029',
    question: 'A patient presents with weakness and fatigue. ECG shows prolonged QT interval, flat T waves, and prominent U waves. Which electrolyte abnormality and associated risk?',
    options: [
      'Hyperkalemia - VT/VF',
      'Hypokalemia - Torsades de pointes',
      'Hypercalcemia - AV block',
      'Hyponatremia - Seizures'
    ],
    correctIndex: 1,
    explanation: 'Hypokalemia causes flat T waves, prominent U waves, and QT prolongation (actually QU prolongation). This predisposes to torsades de pointes, especially when K+ <3.0 mEq/L. Requires urgent potassium replacement and cardiac monitoring.',
    references: [
      'Gennari FJ. Hypokalemia. N Engl J Med. 1998;339(7):451-458',
      'Diercks DB, et al. Electrocardiographic manifestations: electrolyte abnormalities'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  },
  {
    id: 'ecg-030',
    question: 'ECG Image Description: Narrow complex tachycardia at 220 bpm, visible P waves with 2:1 AV conduction creating "sawtooth" pattern best seen in inferior leads. What is the treatment for unstable patient?',
    options: [
      'Adenosine 6mg IV rapid push',
      'Amiodarone 150mg IV over 10 minutes',
      'Synchronized cardioversion starting at 50J',
      'Metoprolol 5mg IV'
    ],
    correctIndex: 2,
    explanation: 'Atrial flutter with rapid ventricular response in unstable patient requires synchronized cardioversion. Flutter often converts with low energy (50J). Adenosine may help diagnose by temporarily blocking AV node but won\'t terminate flutter. Avoid in unstable patients.',
    references: [
      'January CT, et al. 2019 AHA/ACC/HRS Focused Update of the 2014 AHA/ACC/HRS Guideline for the Management of Patients With Atrial Fibrillation',
      'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia'
    ],
    difficulty: 'medium',
    topicId: 'ecg-emergencies'
  }
];