import { Question } from './types';

export const ecgRhythmIdentificationQuestions: Question[] = [
  {
    id: 'ecg-rhythm-001',
    question: 'Rhythm Strip Analysis: You are analyzing a 6-second lead II rhythm strip. The strip shows consistent, evenly spaced QRS complexes. Each QRS is preceded by an upright P wave. Measuring with calipers, the R-R intervals are equal at 16 small boxes (0.64 seconds). P waves are upright and uniform in morphology. PR intervals measure 4 small boxes (0.16 seconds). QRS complexes are narrow, measuring 2 small boxes (0.08 seconds). Heart rate calculation: 1500 ÷ 16 = 94 bpm. What rhythm is displayed?',
    options: [
      'Normal sinus rhythm',
      'Sinus tachycardia',
      'Atrial flutter',
      'Junctional rhythm'
    ],
    correctIndex: 0,
    explanation: 'Normal sinus rhythm: Rate 94 bpm (60-100 range), regular rhythm with equal R-R intervals, upright P waves in lead II before each QRS, PR interval 0.16 seconds (normal 0.12-0.20), QRS 0.08 seconds (normal <0.12). All criteria met for NSR.',
    references: [
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram',
      'Wagner GS. Marriott\'s Practical Electrocardiography, 12th Edition'
    ],
    difficulty: 'easy',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-002',
    question: 'Rhythm Strip Analysis: Lead II monitor strip shows a regular rhythm. Using calipers, R-R intervals measure 13 small boxes (0.52 seconds). Each QRS complex is preceded by an upright, pointed P wave with consistent morphology. PR intervals measure 4.5 small boxes (0.18 seconds). QRS complexes are narrow at 2.2 small boxes (0.09 seconds). Rate calculation: 1500 ÷ 13 = 115 bpm. Patient appears diaphoretic and reports feeling warm with a temperature of 101.5°F. Identify this rhythm.',
    options: [
      'Normal sinus rhythm',
      'Sinus tachycardia',
      'Supraventricular tachycardia',
      'Atrial fibrillation'
    ],
    correctIndex: 1,
    explanation: 'Sinus tachycardia: Rate 115 bpm (>100 bpm), regular rhythm, upright P waves in lead II before each QRS, normal PR interval 0.18 seconds, narrow QRS 0.09 seconds. Clinical context of fever supports physiologic sinus tachycardia.',
    references: [
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram',
      'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia'
    ],
    difficulty: 'easy',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-003',
    question: 'Rhythm Strip Analysis: Lead II monitor shows R-R intervals measuring 24 small boxes (0.96 seconds) in a regular pattern. P waves are clearly visible, upright, and uniform, occurring before each QRS complex. PR intervals are consistent at 4.5 small boxes (0.18 seconds). QRS complexes are narrow at 2 small boxes (0.08 seconds). Rate calculation: 1500 ÷ 24 = 63 bpm. Patient is a 22-year-old competitive cyclist at rest. What rhythm is this?',
    options: [
      'Sinus bradycardia',
      'Second-degree AV block',
      'Junctional rhythm',
      'Sick sinus syndrome'
    ],
    correctIndex: 0,
    explanation: 'Sinus bradycardia: Rate 63 bpm (technically >60, but borderline bradycardia), regular rhythm, upright P waves in lead II before each QRS, normal PR interval. Common in well-conditioned athletes due to increased vagal tone and cardiac conditioning.',
    references: [
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram',
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia'
    ],
    difficulty: 'easy',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-004',
    question: 'Rhythm Strip Analysis: Lead II displays an irregularly irregular rhythm. R-R intervals vary significantly from 11 to 21 small boxes (0.44-0.84 seconds). No distinct P waves are visible - instead, there is a wavy, undulating baseline with small irregular oscillations (fibrillatory waves). QRS complexes are narrow, measuring 2-2.5 small boxes (0.08-0.10 seconds). The ventricular response appears rapid and chaotic. What rhythm is this?',
    options: [
      'Multifocal atrial tachycardia',
      'Atrial fibrillation',
      'Atrial flutter with variable block',
      'Sinus arrhythmia with frequent PACs'
    ],
    correctIndex: 1,
    explanation: 'Atrial fibrillation: Irregularly irregular rhythm with no distinct P waves (replaced by fibrillatory waves), varying R-R intervals, narrow QRS complexes. The chaotic baseline activity and completely irregular ventricular response are classic for atrial fibrillation.',
    references: [
      'January CT, et al. 2019 AHA/ACC/HRS Focused Update of the 2014 AHA/ACC/HRS Guideline for Management of Patients With Atrial Fibrillation',
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram'
    ],
    difficulty: 'easy',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-005',
    question: 'Rhythm Strip Analysis: Lead II displays a regular rhythm with R-R intervals of 10 small boxes (0.40 seconds). Between QRS complexes, you observe a distinctive sawtooth pattern. The atrial waves have a regular, sharp morphology occurring at 2.5 small box intervals (0.10 seconds). Flutter waves are negative in lead II with a consistent pattern. QRS complexes are narrow at 2 small boxes (0.08 seconds). Rate calculations: ventricular = 1500 ÷ 10 = 150 bpm, atrial = 1500 ÷ 2.5 = 600 bpm. What rhythm is this?',
    options: [
      'Atrial fibrillation',
      'Atrial flutter with 2:1 conduction',
      'Supraventricular tachycardia',
      'Sinus tachycardia'
    ],
    correctIndex: 1,
    explanation: 'Atrial flutter with 2:1 conduction: Ventricular rate 150 bpm, atrial rate 300 bpm (classic flutter rate), sawtooth pattern of flutter waves, 2:1 AV conduction ratio. The regular sawtooth pattern is pathognomonic for atrial flutter.',
    references: [
      'January CT, et al. 2019 AHA/ACC/HRS Focused Update of the 2014 AHA/ACC/HRS Guideline for Management of Patients With Atrial Fibrillation',
      'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia'
    ],
    difficulty: 'medium',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-006',
    question: 'Rhythm Strip Analysis: Lead II shows a regular narrow-complex tachycardia with R-R intervals of 8.3 small boxes (0.33 seconds). Rate = 1500 ÷ 8.3 = 180 bpm. No distinct P waves are visible - they appear to be buried within the QRS complexes or immediately following them. QRS complexes are narrow at 2.5 small boxes (0.10 seconds). The rhythm started abruptly during monitoring. Patient is alert and stable but reports palpitations. What is this rhythm?',
    options: [
      'Sinus tachycardia',
      'Supraventricular tachycardia (AVNRT)',
      'Atrial flutter',
      'Ventricular tachycardia'
    ],
    correctIndex: 1,
    explanation: 'Supraventricular tachycardia (AVNRT): Regular narrow-complex tachycardia at 180 bpm, P waves hidden in QRS complexes, abrupt onset, hemodynamically stable. Most likely AV nodal reentrant tachycardia, the most common form of paroxysmal SVT.',
    references: [
      'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia',
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram'
    ],
    difficulty: 'medium',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-007',
    question: 'Rhythm Strip Analysis: Monitor displays a regular wide-complex tachycardia with R-R intervals of 7.5 small boxes (0.30 seconds). Rate = 1500 ÷ 7.5 = 200 bpm. QRS complexes are wide at 3.5 small boxes (0.14 seconds) with a completely different morphology than the patient\'s baseline narrow QRS. No clear P waves are visible. You notice occasional narrow QRS complexes that appear to "capture" the ventricles at a different rate. Patient is hypotensive. What is the most likely rhythm?',
    options: [
      'Supraventricular tachycardia with aberrancy',
      'Atrial flutter with aberrancy',
      'Ventricular tachycardia',
      'Accelerated idioventricular rhythm'
    ],
    correctIndex: 2,
    explanation: 'Ventricular tachycardia: Regular wide-complex tachycardia at 200 bpm, QRS >0.12 seconds, AV dissociation evidenced by capture beats. Wide-complex tachycardia with hemodynamic compromise should be treated as VT until proven otherwise.',
    references: [
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias',
      'Brugada P, et al. A new approach to the differential diagnosis of a regular tachycardia with a wide QRS complex'
    ],
    difficulty: 'medium',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-008',
    question: 'Rhythm Strip Analysis: The monitor displays completely chaotic, irregular waveforms across all leads. There are no identifiable P waves, QRS complexes, or T waves - just rapid, irregular oscillations of varying amplitude ranging from fine to coarse. The baseline shows continuous erratic electrical activity. Patient is unconscious, pulseless, and cyanotic. What rhythm is this?',
    options: [
      'Coarse atrial fibrillation',
      'Ventricular fibrillation',
      'Torsades de pointes',
      'Electrical artifact'
    ],
    correctIndex: 1,
    explanation: 'Ventricular fibrillation: Chaotic, completely irregular rhythm with no identifiable organized waveforms, just rapid irregular oscillations. Patient is in cardiac arrest. Requires immediate defibrillation according to ACLS protocols.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias'
    ],
    difficulty: 'easy',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-009',
    question: 'Rhythm Strip Analysis: All leads display a completely flat, isoelectric line with no electrical activity visible. The monitor shows a straight line across all leads for the entire 6-second strip with no deflections above or below baseline. Patient is unconscious, pulseless, apneic, and unresponsive. Leads have been checked and are properly connected. What rhythm is this?',
    options: [
      'Fine ventricular fibrillation',
      'Asystole',
      'Severe artifact',
      'Lead malfunction'
    ],
    correctIndex: 1,
    explanation: 'Asystole: Complete absence of electrical activity showing flat line in all leads. Must confirm in multiple leads and check lead connections to rule out fine VF or technical problems. Requires immediate CPR and epinephrine per ACLS protocols.',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'easy',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-010',
    question: 'Rhythm Strip Analysis: Lead II shows organized electrical activity with regular QRS complexes. R-R intervals measure 37.5 small boxes (1.5 seconds), calculating to 40 bpm. QRS complexes are narrow at 2.5 small boxes (0.10 seconds) and appear normal in morphology. P waves are visible and appear to have a 1:1 relationship with QRS complexes. However, despite this organized electrical activity, the patient has no palpable pulse, no blood pressure reading, and is unconscious. What condition is this?',
    options: [
      'Sinus bradycardia',
      'Third-degree AV block',
      'Pulseless electrical activity (PEA)',
      'Junctional rhythm'
    ],
    correctIndex: 2,
    explanation: 'Pulseless electrical activity (PEA): Organized electrical activity on ECG but no mechanical cardiac output (no pulse/BP). Requires immediate CPR and aggressive search for reversible causes: H\'s and T\'s (hypovolemia, hypoxia, hydrogen ion, hypo/hyperkalemia, hypothermia, toxins, tamponade, tension pneumothorax, thrombosis).',
    references: [
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines',
      'Berg KM, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2020 American Heart Association Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-011',
    question: 'Rhythm Strip Analysis: Lead II shows regular P waves occurring at 20 small box intervals (0.80 seconds), rate 75 bpm. Examining the PR intervals with calipers reveals progressive lengthening: 1st beat PR = 5 small boxes (0.20 sec), 2nd beat PR = 6 small boxes (0.24 sec), 3rd beat PR = 7 small boxes (0.28 sec), then a P wave occurs without a following QRS complex. After this dropped QRS, the PR interval resets and the cycle repeats. What type of conduction abnormality is this?',
    options: [
      'First-degree AV block',
      'Second-degree AV block, Mobitz Type I (Wenckebach)',
      'Second-degree AV block, Mobitz Type II',
      'Third-degree AV block'
    ],
    correctIndex: 1,
    explanation: 'Second-degree AV block, Mobitz Type I (Wenckebach): Progressive PR interval lengthening (0.20→0.24→0.28 sec) until a QRS is dropped, then cycle repeats. The progressive lengthening followed by a dropped beat is classic for Wenckebach phenomenon, usually occurring at the AV node level.',
    references: [
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia',
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram'
    ],
    difficulty: 'medium',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-012',
    question: 'Rhythm Strip Analysis: Lead II shows regular P waves at 20 small box intervals (0.80 seconds), atrial rate 75 bpm. When QRS complexes follow P waves, the PR intervals are constant at 5 small boxes (0.20 seconds). However, there is a regular pattern where every 4th P wave is not followed by a QRS complex - the P wave occurs normally but no ventricular depolarization follows. The conducted PR intervals never change. What type of AV block is this?',
    options: [
      'Second-degree AV block, Mobitz Type I',
      'Second-degree AV block, Mobitz Type II',
      'Third-degree AV block',
      'Sinus rhythm with non-conducted PACs'
    ],
    correctIndex: 1,
    explanation: 'Second-degree AV block, Mobitz Type II: Constant PR intervals (0.20 sec) for all conducted beats with intermittent dropped QRS complexes without preceding PR prolongation. The "fixed" PR interval with sudden dropped beats is characteristic of Mobitz II, which is more dangerous than Type I.',
    references: [
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia',
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram'
    ],
    difficulty: 'hard',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-013',
    question: 'Rhythm Strip Analysis: Lead II shows two completely independent rhythms. P waves march regularly at 17.6 small box intervals (0.70 seconds), creating an atrial rate of 86 bpm. Separately, QRS complexes occur regularly at 37.5 small box intervals (1.5 seconds), creating a ventricular rate of 40 bpm. Using calipers to march out P waves and QRS complexes separately, they have no relationship - P waves "walk through" the QRS complexes at different timing. QRS complexes are narrow. What rhythm is this?',
    options: [
      'Second-degree AV block, Mobitz Type II',
      'Third-degree (complete) AV block',
      'Junctional rhythm with retrograde P waves',
      'Atrial fibrillation with slow ventricular response'
    ],
    correctIndex: 1,
    explanation: 'Third-degree (complete) AV block: Complete AV dissociation with independent atrial (86 bpm) and ventricular (40 bpm) rates. P waves and QRS complexes have no relationship and "march through" each other independently. Narrow QRS suggests junctional escape pacemaker.',
    references: [
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia',
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram'
    ],
    difficulty: 'medium',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-014',
    question: 'Rhythm Strip Analysis: Lead II shows regular rhythm with R-R intervals of 27.3 small boxes (1.09 seconds), rate = 55 bpm. QRS complexes are narrow at 2.5 small boxes (0.10 seconds). Carefully examining the strip, no clear P waves are visible before the QRS complexes. In leads II, III, and aVF, you notice small inverted deflections occurring just after some QRS complexes, suggesting retrograde atrial activation. What rhythm is this?',
    options: [
      'Sinus bradycardia with buried P waves',
      'Atrial fibrillation with slow controlled response',
      'Junctional rhythm',
      'Third-degree AV block with junctional escape'
    ],
    correctIndex: 2,
    explanation: 'Junctional rhythm: Rate 55 bpm (typical 40-60), narrow QRS, no P waves before QRS complexes. Inverted P waves after QRS in inferior leads indicate retrograde atrial activation from AV junction. Pacemaker originates from AV junction when sinus node fails or is suppressed.',
    references: [
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram',
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia'
    ],
    difficulty: 'medium',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-015',
    question: 'Rhythm Strip Analysis: Monitor shows slow, regular rhythm with R-R intervals of 42.9 small boxes (1.71 seconds), rate = 35 bpm. QRS complexes are wide at 4 small boxes (0.16 seconds) with a morphology completely different from normal conducted beats. No clear P waves are identifiable. The QRS morphology suggests a ventricular origin with possible LBBB pattern. This appears to be an escape rhythm. What type of rhythm is this?',
    options: [
      'Junctional escape rhythm',
      'Third-degree AV block with ventricular escape',
      'Idioventricular rhythm',
      'Sinus bradycardia with bundle branch block'
    ],
    correctIndex: 2,
    explanation: 'Idioventricular rhythm: Rate 35 bpm (typical 20-40), wide QRS complexes (0.16 sec), regular rhythm. This is a ventricular escape rhythm that occurs when both sinus node and AV junction fail to function. The wide QRS indicates ventricular origin.',
    references: [
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram',
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia'
    ],
    difficulty: 'medium',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-016',
    question: 'Rhythm Strip Analysis: Lead II shows highly irregular rhythm with constantly changing R-R intervals from 10-18 small boxes (0.40-0.72 seconds). Multiple distinct P wave morphologies are visible - some upright, some biphasic, some inverted, and some notched. PR intervals vary dramatically from 3-6 small boxes (0.12-0.24 seconds). QRS complexes alternate between narrow and slightly wide. Rate varies 100-150 bpm. Patient has severe COPD exacerbation. What rhythm is this?',
    options: [
      'Atrial fibrillation with rapid ventricular response',
      'Multifocal atrial tachycardia',
      'Atrial flutter with variable conduction',
      'Sinus tachycardia with frequent PACs and PVCs'
    ],
    correctIndex: 1,
    explanation: 'Multifocal atrial tachycardia (MAT): Irregular rhythm with ≥3 different P wave morphologies, varying PR intervals, rate >100 bpm, associated with COPD. Multiple ectopic atrial foci create the chaotic atrial activity. Common in hypoxemic patients with pulmonary disease.',
    references: [
      'McCord J, et al. Multifocal atrial tachycardia',
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram'
    ],
    difficulty: 'hard',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-017',
    question: 'Rhythm Strip Analysis: Lead II shows underlying sinus rhythm at 70 bpm with R-R intervals of 21.4 small boxes (0.86 seconds). Intermittently, you observe early beats occurring at 15 small boxes (0.60 seconds) after the previous normal QRS. These early beats have dramatically different characteristics: QRS width of 4 small boxes (0.16 seconds), completely different morphology (opposite polarity), and are followed by a long pause of 28 small boxes (1.12 seconds) before the next normal beat resumes. What are these abnormal beats?',
    options: [
      'Premature atrial contractions (PACs)',
      'Premature ventricular contractions (PVCs)',
      'Junctional premature beats',
      'Aberrantly conducted PACs'
    ],
    correctIndex: 1,
    explanation: 'Premature ventricular contractions (PVCs): Early wide QRS complexes (0.16 sec) with completely different morphology from normal beats, followed by full compensatory pause (0.60 + 1.12 = 1.72 sec ≈ 2 × normal cycle length of 0.86 sec). Classic features of ventricular ectopy.',
    references: [
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias',
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram'
    ],
    difficulty: 'easy',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-019',
    question: 'Rhythm Strip Analysis: Lead II displays a wide-complex tachycardia with continuously changing QRS morphology. R-R intervals vary from 5-7 small boxes (0.20-0.28 seconds), rate 214-300 bpm. The distinctive feature is that QRS complexes appear to "twist" around the baseline - initially pointing upward, gradually rotating, then pointing downward in a sinusoidal pattern. The QT interval on baseline rhythm was measured at 580 msec. Patient recently started haloperidol. What is this rhythm?',
    options: [
      'Polymorphic ventricular tachycardia',
      'Torsades de pointes',
      'Ventricular fibrillation',
      'Atrial fibrillation with aberrancy'
    ],
    correctIndex: 1,
    explanation: 'Torsades de pointes: Polymorphic VT with pathognomonic "twisting" QRS morphology around baseline, associated with prolonged QT (580 msec). The "spiral" or "corkscrew" appearance with axis rotation is classic. Often caused by QT-prolonging medications. Treat with magnesium and discontinue offending drugs.',
    references: [
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias',
      'Roden DM. Drug-induced prolongation of the QT interval'
    ],
    difficulty: 'hard',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-020',
    question: 'Rhythm Strip Analysis: Monitor shows extremely rapid regular rhythm with R-R intervals of 6 small boxes (0.24 seconds), rate = 250 bpm. QRS complexes are extremely wide at 5 small boxes (0.20 seconds) and display a smooth, sinusoidal wave pattern without distinct QRS-T wave separation. No atrial activity is discernible. The waveform has a "sine wave" appearance representing the transition zone between organized VT and chaotic VF. Patient is hypotensive and confused. What rhythm is this?',
    options: [
      'Supraventricular tachycardia with extreme aberrancy',
      'Atrial flutter with 1:1 conduction and aberrancy',
      'Monomorphic ventricular tachycardia',
      'Ventricular flutter'
    ],
    correctIndex: 3,
    explanation: 'Ventricular flutter: Extremely rapid (250 bpm), very wide QRS (0.20 sec) with sinusoidal appearance representing transition between VT and VF. The smooth, undulating pattern without discrete QRS complexes is characteristic. Highly unstable - requires immediate cardioversion/defibrillation.',
    references: [
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias',
      'Zipes DP, et al. Cardiac Electrophysiology: From Cell to Bedside'
    ],
    difficulty: 'hard',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-021',
    question: 'Rhythm Strip Analysis: Lead II shows regular rhythm with R-R intervals of 9.4 small boxes (0.375 seconds), rate = 160 bpm. QRS complexes are narrow at 2.5 small boxes (0.10 seconds). The distinctive feature is that P waves are present but inverted in leads II, III, and aVF, occurring just before each QRS complex. PR intervals are shortened at 2.5 small boxes (0.10 seconds). The inverted P waves suggest retrograde atrial activation. What rhythm is this?',
    options: [
      'Sinus tachycardia',
      'Ectopic atrial tachycardia',
      'Junctional tachycardia',
      'AVNRT with retrograde P waves'
    ],
    correctIndex: 2,
    explanation: 'Junctional tachycardia: Rate 160 bpm (>100 bpm defines tachycardia), narrow QRS, inverted P waves in inferior leads occurring before QRS with short PR interval (0.10 sec). The retrograde P wave activation pattern indicates the impulse originates from AV junction and conducts backward to atria.',
    references: [
      'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia',
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram'
    ],
    difficulty: 'hard',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-022',
    question: 'Rhythm Strip Analysis: Lead II displays underlying sinus rhythm at 75 bpm. A distinctive pattern emerges: normal beat, normal beat, then a premature wide QRS complex, followed by a pause, and the pattern repeats (N-N-PVC-pause, N-N-PVC-pause). The premature beats occur at 16 small boxes (0.64 seconds) after the previous normal beat, measure 4.5 small boxes (0.18 seconds) in width, and are followed by compensatory pauses of 26 small boxes (1.04 seconds). What is this pattern called?',
    options: [
      'Ventricular bigeminy',
      'Ventricular trigeminy',
      'Ventricular quadrigeminy',
      'Frequent multifocal PVCs'
    ],
    correctIndex: 1,
    explanation: 'Ventricular trigeminy: Every third beat is a PVC (normal-normal-PVC pattern). Bigeminy would be every other beat (N-PVC-N-PVC), quadrigeminy every fourth beat. The term describes the coupling pattern where ectopic beats occur at regular intervals.',
    references: [
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias',
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram'
    ],
    difficulty: 'medium',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-023',
    question: 'Rhythm Strip Analysis: Lead II shows normal sinus rhythm at 80 bpm. Suddenly, two consecutive wide QRS complexes appear in immediate succession. These beats measure 4 small boxes (0.16 seconds) each with identical morphology, occurring at 14 and 18 small boxes (0.56 and 0.72 seconds) from the previous normal beat. After the second wide complex, there is a prolonged pause of 32 small boxes (1.28 seconds) before normal sinus rhythm resumes. What are these two consecutive beats called?',
    options: [
      'Multifocal PVCs',
      'PVC couplet',
      'Non-sustained ventricular tachycardia',
      'Accelerated ventricular rhythm'
    ],
    correctIndex: 1,
    explanation: 'PVC couplet: Two consecutive premature ventricular contractions with identical morphology. The definition requires exactly 2 consecutive PVCs - three or more would constitute ventricular tachycardia. Couplets may herald more sustained ventricular arrhythmias.',
    references: [
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias',
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram'
    ],
    difficulty: 'medium',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-024',
    question: 'Rhythm Strip Analysis: Monitor shows baseline sinus rhythm at 90 bpm. Suddenly, the rhythm changes to a run of 8 consecutive wide QRS complexes with R-R intervals of 8.3 small boxes (0.33 seconds), rate = 180 bpm. Each QRS measures 4 small boxes (0.16 seconds) with consistent morphology. The run lasts exactly 3.2 seconds (8 beats × 0.40 sec), then spontaneously terminates with return to baseline sinus rhythm. No intervention was required. What arrhythmia occurred?',
    options: [
      'Sustained ventricular tachycardia',
      'Non-sustained ventricular tachycardia',
      'Accelerated idioventricular rhythm',
      'Ventricular flutter'
    ],
    correctIndex: 1,
    explanation: 'Non-sustained ventricular tachycardia (NSVT): ≥3 consecutive ventricular beats (8 beats) at >100 bpm (180 bpm) lasting <30 seconds (3.2 sec), terminating spontaneously. Sustained VT lasts ≥30 seconds or requires intervention. NSVT may be a marker for increased arrhythmic risk.',
    references: [
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias',
      'Priori SG, et al. 2015 ESC Guidelines for the management of patients with ventricular arrhythmias'
    ],
    difficulty: 'medium',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-025',
    question: 'Rhythm Strip Analysis: Lead II shows regular wide-complex rhythm with R-R intervals of 17.6 small boxes (0.70 seconds), rate = 85 bpm. QRS complexes are wide at 3.5 small boxes (0.14 seconds) with left bundle branch block morphology. No clear P waves are visible before QRS complexes. The rate is intermediate - faster than typical escape rhythms but slower than ventricular tachycardia. Patient had acute MI with reperfusion therapy 2 hours ago. What rhythm is this?',
    options: [
      'Junctional rhythm with aberrancy',
      'Idioventricular rhythm',
      'Accelerated idioventricular rhythm',
      'Slow ventricular tachycardia'
    ],
    correctIndex: 2,
    explanation: 'Accelerated idioventricular rhythm (AIVR): Regular wide-complex rhythm at 85 bpm (accelerated beyond normal idioventricular rate of 20-40 bpm but <100 bpm VT threshold). Often seen as "reperfusion rhythm" after successful acute MI treatment, generally benign and self-limiting.',
    references: [
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram',
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias'
    ],
    difficulty: 'medium',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-026',
    question: 'Rhythm Strip Analysis: Lead II shows atrial fibrillation with irregularly irregular R-R intervals varying from 8-16 small boxes (0.32-0.64 seconds). Baseline ventricular rate averages 180 bpm. A notable finding is that approximately 30% of QRS complexes are wide at 4 small boxes (0.16 seconds) while 70% remain narrow at 2.5 small boxes (0.10 seconds). The wide complexes occur more frequently during the shortest R-R intervals (8-10 small boxes). What explains the intermittent wide QRS complexes?',
    options: [
      'Intermittent ventricular premature contractions',
      'Rate-related aberrant conduction',
      'Underlying bundle branch block',
      'Pre-excitation via accessory pathway'
    ],
    correctIndex: 1,
    explanation: 'Rate-related aberrant conduction: During rapid atrial fibrillation, impulses arriving during the relative refractory period of bundle branches cause aberrant (wide) QRS conduction. This occurs more frequently with shorter R-R intervals when the conduction system hasn\'t fully recovered from the previous impulse.',
    references: [
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram',
      'Wellens HJ. The wide QRS tachycardia'
    ],
    difficulty: 'hard',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-027',
    question: 'Rhythm Strip Analysis: Lead II shows regular rhythm at 75 bpm with R-R intervals of 20 small boxes (0.80 seconds). The most distinctive features are: extremely short PR interval measuring only 2 small boxes (0.08 seconds) and a characteristic slurred upstroke (delta wave) at the beginning of each QRS complex. The total QRS width measures 3 small boxes (0.12 seconds) due to the delta wave addition. P waves are upright and normal. What ECG pattern is this?',
    options: [
      'First-degree AV block with intraventricular conduction delay',
      'Bundle branch block with short PR',
      'Pre-excitation syndrome (Wolff-Parkinson-White)',
      'Junctional rhythm with retrograde conduction'
    ],
    correctIndex: 2,
    explanation: 'Pre-excitation syndrome (Wolff-Parkinson-White): Classic triad of short PR interval (0.08 sec, normal 0.12-0.20), delta wave (slurred QRS upstroke), and wide QRS (0.12 sec). Results from accessory pathway that bypasses AV node, pre-exciting the ventricles before normal AV conduction.',
    references: [
      'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia',
      'Al-Khatib SM, et al. Risk stratification for arrhythmic events in patients with asymptomatic pre-excitation'
    ],
    difficulty: 'medium',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-028',
    question: 'Rhythm Strip Analysis: Lead II shows sinus rhythm at 70 bpm with R-R intervals of 21.4 small boxes (0.86 seconds). The most striking abnormality is extremely tall, peaked T waves measuring 12mm in amplitude with a narrow, pointed, "tented" appearance. QRS complexes show mild widening to 3 small boxes (0.12 seconds) compared to patient\'s baseline. P waves appear slightly flattened. Patient has chronic kidney disease with missed dialysis sessions. What electrolyte abnormality is most likely?',
    options: [
      'Hyperkalemia',
      'Hypokalemia', 
      'Hypercalcemia',
      'Hyponatremia'
    ],
    correctIndex: 0,
    explanation: 'Hyperkalemia: Progressive ECG changes include tall, peaked, narrow-based "tented" T waves (earliest sign), QRS widening, P wave flattening, and potentially sine wave pattern. Classic presentation in renal failure patients. Serum K+ likely >6.0 mEq/L based on QRS widening.',
    references: [
      'Surawicz B, et al. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram',
      'Parham WA, et al. Hyperkalemia revisited'
    ],
    difficulty: 'medium',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-029',
    question: 'Rhythm Strip Analysis: Lead II shows sinus rhythm at 65 bpm with R-R intervals of 23 small boxes (0.92 seconds). The QT interval is markedly prolonged, measuring 16 small boxes (0.64 seconds). Using Bazett\'s formula: QTc = QT/√RR = 0.64/√0.92 = 0.67 seconds (670 msec). Patient is on haloperidol, quinidine, and amiodarone. What is the most life-threatening potential complication of this finding?',
    options: [
      'Complete heart block',
      'Torsades de pointes',
      'Atrial fibrillation with rapid response',
      'Sudden cardiac arrest from asystole'
    ],
    correctIndex: 1,
    explanation: 'Torsades de pointes: QTc 670 msec is severely prolonged (normal <450 msec men, <470 msec women). Extreme QT prolongation, especially >500 msec, significantly increases risk of torsades de pointes. Multiple QT-prolonging medications create additive risk. Requires immediate medication review and electrolyte correction.',
    references: [
      'Roden DM. Drug-induced prolongation of the QT interval',
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias'
    ],
    difficulty: 'medium',
    topicId: 'ecg-rhythm-identification'
  },
  {
    id: 'ecg-rhythm-030',
    question: 'Rhythm Strip Analysis: Lead II shows atrial fibrillation with extremely rapid, irregular ventricular response. R-R intervals vary dramatically from 6-8 small boxes (0.24-0.32 seconds), creating rates of 250-300 bpm. QRS complexes are wide at 4 small boxes (0.16 seconds) and show delta wave morphology consistent with pre-excitation. Patient has known WPW syndrome, is hypotensive (BP 85/50), diaphoretic, and complaining of chest pain. What is the most appropriate immediate intervention?',
    options: [
      'Adenosine 6mg IV push to break the circuit',
      'Diltiazem 20mg IV to control rate',
      'Synchronized cardioversion starting at 100 joules',
      'Amiodarone 150mg IV over 10 minutes'
    ],
    correctIndex: 2,
    explanation: 'Atrial fibrillation with pre-excitation (AF-WPW): Extremely rapid ventricular rates (250-300 bpm) via accessory pathway causing hemodynamic instability. NEVER use AV node blockers (adenosine, diltiazem, verapamil) as they block the AV node and paradoxically increase conduction through the accessory pathway. Emergency synchronized cardioversion is life-saving.',
    references: [
      'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia',
      'January CT, et al. 2019 AHA/ACC/HRS Focused Update of the 2014 AHA/ACC/HRS Guideline for Management of Patients With Atrial Fibrillation'
    ],
    difficulty: 'hard',
    topicId: 'ecg-rhythm-identification'
  }
];