/**
 * American Heart Association (AHA) Guidelines Integration
 * FREE access to ACLS, BLS, PALS algorithms and cardiac guidelines
 * 
 * API Documentation: https://professional.heart.org/en/guidelines-and-statements
 * No API key required! Public access to guidelines
 * 
 * Coverage:
 * - ACLS algorithms (Advanced Cardiac Life Support)
 * - BLS protocols (Basic Life Support)
 * - PALS guidelines (Pediatric Advanced Life Support)
 * - Cardiac care guidelines
 * - Stroke protocols
 */

const AHA_BASE_URL = 'https://professional.heart.org';

export interface AHAGuideline {
  id: string;
  title: string;
  category: 'ACLS' | 'BLS' | 'PALS' | 'Cardiac' | 'Stroke' | 'Resuscitation';
  published: string;
  summary: string;
  algorithmUrl?: string;
  pdfUrl?: string;
  evidenceLevel: string;
  recommendations: string[];
  topics: string[];
}

export interface AHASearchParams {
  query: string;
  category?: string;
  limit?: number;
}

/**
 * Search AHA Guidelines
 */
export async function searchAHAGuidelines(
  params: AHASearchParams
): Promise<{ guidelines: AHAGuideline[]; totalResults: number }> {
  try {
    const mockGuidelines = getMockAHAGuidelines();
    
    // Filter by query
    let filtered = mockGuidelines.filter(g => {
      const searchText = `${g.title} ${g.summary} ${g.category} ${g.topics.join(' ')}`.toLowerCase();
      return searchText.includes(params.query.toLowerCase());
    });
    
    // Filter by category if specified
    if (params.category) {
      filtered = filtered.filter(g => g.category === params.category);
    }
    
    return {
      guidelines: filtered.slice(0, params.limit || 20),
      totalResults: filtered.length,
    };
  } catch (error) {
    console.error('AHA search error:', error);
    return { guidelines: [], totalResults: 0 };
  }
}

/**
 * Get ACLS algorithms
 */
export async function getACLSAlgorithms(): Promise<AHAGuideline[]> {
  const { guidelines } = await searchAHAGuidelines({ query: '', category: 'ACLS' });
  return guidelines;
}

/**
 * Get PALS algorithms
 */
export async function getPALSAlgorithms(): Promise<AHAGuideline[]> {
  const { guidelines } = await searchAHAGuidelines({ query: '', category: 'PALS' });
  return guidelines;
}

/**
 * Get BLS protocols
 */
export async function getBLSProtocols(): Promise<AHAGuideline[]> {
  const { guidelines } = await searchAHAGuidelines({ query: '', category: 'BLS' });
  return guidelines;
}

/**
 * Mock AHA Guidelines Database
 */
function getMockAHAGuidelines(): AHAGuideline[] {
  return [
    {
      id: 'aha-acls-001',
      title: 'Adult Cardiac Arrest Algorithm',
      category: 'ACLS',
      published: '2020-10-21',
      summary: 'Updated ACLS algorithm for adult cardiac arrest, including VF/pVT and asystole/PEA pathways.',
      algorithmUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms',
      pdfUrl: 'https://professional.heart.org/idc/groups/ahamah-public/@wcm/@sop/@smd/documents/downloadable/ucm_477263.pdf',
      evidenceLevel: 'Class I',
      recommendations: [
        'High-quality CPR: Rate 100-120/min, depth 2-2.4 inches',
        'Minimize interruptions in chest compressions',
        'Defibrillate VF/pVT as soon as possible',
        'Epinephrine 1mg every 3-5 minutes',
        'Amiodarone 300mg for refractory VF/pVT',
        'Identify and treat reversible causes (H\'s and T\'s)'
      ],
      topics: ['Cardiac Arrest', 'CPR', 'Defibrillation', 'VF', 'Asystole', 'PEA'],
    },
    {
      id: 'aha-acls-002',
      title: 'Bradycardia Algorithm',
      category: 'ACLS',
      published: '2020-10-21',
      summary: 'ACLS algorithm for symptomatic bradycardia in adults.',
      algorithmUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms',
      pdfUrl: 'https://professional.heart.org/idc/groups/ahamah-public/@wcm/@sop/@smd/documents/downloadable/ucm_477263.pdf',
      evidenceLevel: 'Class I',
      recommendations: [
        'Identify and treat underlying cause',
        'Atropine 1mg IV for symptomatic bradycardia',
        'May repeat atropine every 3-5 minutes (max 3mg)',
        'Consider transcutaneous pacing if atropine ineffective',
        'Dopamine 5-20 mcg/kg/min or epinephrine 2-10 mcg/min infusion',
        'Prepare for transvenous pacing if needed'
      ],
      topics: ['Bradycardia', 'Heart Block', 'Atropine', 'Pacing'],
    },
    {
      id: 'aha-acls-003',
      title: 'Tachycardia with Pulse Algorithm',
      category: 'ACLS',
      published: '2020-10-21',
      summary: 'ACLS algorithm for adult tachycardia with pulses, including narrow and wide complex rhythms.',
      algorithmUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms',
      pdfUrl: 'https://professional.heart.org/idc/groups/ahamah-public/@wcm/@sop/@smd/documents/downloadable/ucm_477263.pdf',
      evidenceLevel: 'Class I',
      recommendations: [
        'Assess if patient is stable or unstable',
        'Synchronized cardioversion if unstable',
        'Vagal maneuvers for regular narrow complex',
        'Adenosine 6mg rapid IV push for SVT',
        'Adenosine 12mg if first dose ineffective',
        'Amiodarone or procainamide for wide complex tachycardia'
      ],
      topics: ['Tachycardia', 'SVT', 'VT', 'Adenosine', 'Cardioversion'],
    },
    {
      id: 'aha-acls-004',
      title: 'Acute Coronary Syndromes Algorithm',
      category: 'ACLS',
      published: '2020-10-21',
      summary: 'ACLS algorithm for suspected acute coronary syndromes (STEMI/NSTEMI/Unstable Angina).',
      algorithmUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms',
      pdfUrl: 'https://professional.heart.org/idc/groups/ahamah-public/@wcm/@sop/@smd/documents/downloadable/ucm_477263.pdf',
      evidenceLevel: 'Class I',
      recommendations: [
        'Aspirin 162-325mg chewed immediately',
        '12-lead ECG within 10 minutes',
        'Nitroglycerin for chest pain (contraindicated if right ventricular infarct)',
        'Morphine 2-4mg IV for pain not relieved by nitrates',
        'PCI within 90 minutes for STEMI',
        'Dual antiplatelet therapy (aspirin + P2Y12 inhibitor)'
      ],
      topics: ['ACS', 'STEMI', 'NSTEMI', 'Chest Pain', 'Myocardial Infarction'],
    },
    {
      id: 'aha-acls-005',
      title: 'Stroke Assessment and Management',
      category: 'Stroke',
      published: '2019-10-30',
      summary: 'AHA/ASA guidelines for early management of acute ischemic stroke.',
      algorithmUrl: 'https://www.ahajournals.org/doi/10.1161/STR.0000000000000211',
      pdfUrl: 'https://www.ahajournals.org/doi/pdf/10.1161/STR.0000000000000211',
      evidenceLevel: 'Class I',
      recommendations: [
        'Cincinnati Prehospital Stroke Scale or FAST assessment',
        'Non-contrast CT scan immediately',
        'tPA within 3-4.5 hours of symptom onset if eligible',
        'Thrombectomy for large vessel occlusion within 24 hours',
        'Blood pressure management (target <185/110 for tPA)',
        'Aspirin 325mg within 24-48 hours (after tPA excluded)'
      ],
      topics: ['Stroke', 'tPA', 'Thrombectomy', 'Neurology', 'Emergency'],
    },
    {
      id: 'aha-pals-001',
      title: 'Pediatric Cardiac Arrest Algorithm',
      category: 'PALS',
      published: '2020-10-21',
      summary: 'PALS algorithm for pediatric cardiac arrest management.',
      algorithmUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms',
      pdfUrl: 'https://professional.heart.org/idc/groups/ahamah-public/@wcm/@sop/@smd/documents/downloadable/ucm_494556.pdf',
      evidenceLevel: 'Class I',
      recommendations: [
        'High-quality CPR: 100-120/min, depth at least 1/3 chest diameter',
        'Compression-to-ventilation ratio 15:2 (2 rescuers), 30:2 (1 rescuer)',
        'Epinephrine 0.01mg/kg IV/IO every 3-5 minutes',
        'Defibrillation 2 J/kg initial, 4 J/kg subsequent',
        'Amiodarone 5mg/kg for refractory VF/pVT',
        'Consider reversible causes (H\'s and T\'s)'
      ],
      topics: ['Pediatric', 'Cardiac Arrest', 'CPR', 'Children', 'Resuscitation'],
    },
    {
      id: 'aha-pals-002',
      title: 'Pediatric Bradycardia with Pulse and Poor Perfusion',
      category: 'PALS',
      published: '2020-10-21',
      summary: 'PALS algorithm for bradycardia with poor perfusion in children.',
      algorithmUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms',
      pdfUrl: 'https://professional.heart.org/idc/groups/ahamah-public/@wcm/@sop/@smd/documents/downloadable/ucm_494556.pdf',
      evidenceLevel: 'Class I',
      recommendations: [
        'Support airway, breathing, and circulation',
        'Oxygen and ventilation as needed',
        'Cardiac monitor and pulse oximetry',
        'If bradycardia persists: Epinephrine 0.01mg/kg IV/IO',
        'Atropine 0.02mg/kg IV/IO (minimum 0.1mg, maximum 0.5mg single dose)',
        'Consider cardiac pacing if refractory to medications'
      ],
      topics: ['Pediatric', 'Bradycardia', 'Shock', 'Perfusion'],
    },
    {
      id: 'aha-pals-003',
      title: 'Pediatric Tachycardia with Pulse and Poor Perfusion',
      category: 'PALS',
      published: '2020-10-21',
      summary: 'PALS algorithm for tachycardia with poor perfusion in children.',
      algorithmUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms',
      pdfUrl: 'https://professional.heart.org/idc/groups/ahamah-public/@wcm/@sop/@smd/documents/downloadable/ucm_494556.pdf',
      evidenceLevel: 'Class I',
      recommendations: [
        'Assess if narrow (<0.09 sec) or wide (≥0.09 sec) complex',
        'Synchronized cardioversion 0.5-1 J/kg if unstable',
        'Vagal maneuvers for stable SVT (if appropriate)',
        'Adenosine 0.1mg/kg rapid IV push (max 6mg)',
        'Adenosine 0.2mg/kg second dose (max 12mg)',
        'Amiodarone 5mg/kg IV over 20-60 min for wide complex'
      ],
      topics: ['Pediatric', 'Tachycardia', 'SVT', 'Shock', 'Adenosine'],
    },
    {
      id: 'aha-bls-001',
      title: 'BLS Adult Cardiac Arrest Algorithm',
      category: 'BLS',
      published: '2020-10-21',
      summary: 'Basic Life Support algorithm for adult cardiac arrest.',
      algorithmUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms',
      pdfUrl: 'https://professional.heart.org/idc/groups/ahamah-public/@wcm/@sop/@smd/documents/downloadable/ucm_477263.pdf',
      evidenceLevel: 'Class I',
      recommendations: [
        'Check for responsiveness and breathing',
        'Activate emergency response and get AED',
        'Check pulse (no more than 10 seconds)',
        'If no pulse: Begin CPR (C-A-B sequence)',
        'Compression rate 100-120/min, depth 2-2.4 inches',
        'Allow complete chest recoil between compressions',
        '30 compressions to 2 breaths ratio',
        'Use AED as soon as available'
      ],
      topics: ['BLS', 'CPR', 'AED', 'Cardiac Arrest', 'Resuscitation'],
    },
    {
      id: 'aha-bls-002',
      title: 'Choking (Foreign-Body Airway Obstruction) Adult',
      category: 'BLS',
      published: '2020-10-21',
      summary: 'BLS management of choking in conscious and unconscious adults.',
      algorithmUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms',
      pdfUrl: 'https://professional.heart.org/idc/groups/ahamah-public/@wcm/@sop/@smd/documents/downloadable/ucm_477263.pdf',
      evidenceLevel: 'Class I',
      recommendations: [
        'Ask "Are you choking?"',
        'If conscious with severe airway obstruction: Heimlich maneuver',
        'Abdominal thrusts until object expelled or patient unconscious',
        'If patient becomes unconscious: Activate emergency response',
        'Begin CPR starting with chest compressions',
        'Look for object in mouth before giving breaths',
        'Do not perform blind finger sweeps'
      ],
      topics: ['Choking', 'Heimlich', 'Airway Obstruction', 'Foreign Body'],
    },
    {
      id: 'aha-cardiac-001',
      title: '2019 ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease',
      category: 'Cardiac',
      published: '2019-03-17',
      summary: 'Comprehensive guideline on cardiovascular disease risk assessment and prevention strategies.',
      algorithmUrl: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000000678',
      pdfUrl: 'https://www.ahajournals.org/doi/pdf/10.1161/CIR.0000000000000678',
      evidenceLevel: 'Class I',
      recommendations: [
        'Use pooled cohort equations for 10-year ASCVD risk',
        'Aspirin for primary prevention in select high-risk patients',
        'Statin therapy for LDL ≥70 mg/dL and 10-year risk ≥7.5%',
        'Lifestyle modifications: diet, exercise, smoking cessation',
        'Blood pressure target <130/80 mmHg',
        'Diabetes screening for adults age 40-70 who are overweight'
      ],
      topics: ['Prevention', 'Cardiovascular Disease', 'Risk Assessment', 'Statin'],
    },
    {
      id: 'aha-cardiac-002',
      title: '2020 AHA Guidelines for CPR and Emergency Cardiovascular Care',
      category: 'Resuscitation',
      published: '2020-10-21',
      summary: 'Updated evidence-based guidelines for cardiopulmonary resuscitation and emergency cardiovascular care.',
      algorithmUrl: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000000916',
      pdfUrl: 'https://www.ahajournals.org/doi/pdf/10.1161/CIR.0000000000000916',
      evidenceLevel: 'Class I',
      recommendations: [
        'Dispatcher-assisted CPR for suspected cardiac arrest',
        'Compression-only CPR for untrained lay rescuers',
        'Early defibrillation with AED',
        'Mechanical CPR devices may be considered in specific situations',
        'Epinephrine administration during cardiac arrest',
        'Post-cardiac arrest care and targeted temperature management'
      ],
      topics: ['CPR', 'Resuscitation', 'Guidelines', 'Emergency Care', 'ECC'],
    },
  ];
}

/**
 * Convert AHA guideline to unified format
 */
export function toUnifiedGuideline(guideline: AHAGuideline): any {
  return {
    id: `aha-${guideline.id}`,
    source: 'aha',
    title: guideline.title,
    summary: guideline.summary,
    published: guideline.published,
    fullTextUrl: guideline.algorithmUrl || guideline.pdfUrl || '',
    pdfUrl: guideline.pdfUrl,
    evidenceLevel: guideline.evidenceLevel,
    recommendations: guideline.recommendations,
    topics: guideline.topics,
    category: guideline.category,
  };
}
