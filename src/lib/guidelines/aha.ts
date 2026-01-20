import { logger } from '@/lib/logger';
// AHA Guidelines with Direct PDF Links to Flowchart Algorithms
// Links to actual AHA algorithm PDFs and flowcharts

export interface AHAGuideline {
  id: string;
  title: string;
  category: 'ACLS' | 'BLS' | 'PALS' | 'NRP' | 'Stroke' | 'ACS';
  published: string;
  summary: string;
  pdfUrl: string;  // Direct link to algorithm PDF/flowchart
  fullTextUrl: string;  // Link to full guideline page
  evidenceLevel: string;
  recommendations: string[];
  topics: string[];
  imageUrl?: string;  // Direct link to algorithm image
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
    
    let filtered = mockGuidelines.filter(g => {
      const searchText = `${g.title} ${g.summary} ${g.category} ${g.topics.join(' ')}`.toLowerCase();
      return searchText.includes(params.query.toLowerCase());
    });
    
    if (params.category) {
      filtered = filtered.filter(g => g.category === params.category);
    }
    
    return {
      guidelines: filtered.slice(0, params.limit || 20),
      totalResults: filtered.length
    };
  } catch (error) {
    logger.error('Error searching AHA guidelines:', error);
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
 * Get NRP (Neonatal Resuscitation) algorithms
 */
export async function getNRPAlgorithms(): Promise<AHAGuideline[]> {
  const { guidelines } = await searchAHAGuidelines({ query: '', category: 'NRP' });
  return guidelines;
}

/**
 * Mock AHA Guidelines
 * Only algorithms with LOCAL PDFs will show the "FLOWCHART PDF" badge
 * Others show as text guidelines until flowchart PDFs are uploaded
 */
function getMockAHAGuidelines(): AHAGuideline[] {
  return [
    // LOCALLY HOSTED FLOWCHART - SEPSIS (YOUR PDF!)
    {
      id: 'aha-acls-sepsis',
      title: 'Sepsis and Septic Shock Treatment Algorithm',
      category: 'ACLS',
      published: '2024-12-31',
      summary: 'Visual summary treatment algorithm for sepsis and septic shock management with time-critical interventions and resuscitation bundles. FLOWCHART PDF AVAILABLE!',
      pdfUrl: '/algorithms/acls/sepsis-algorithm.pdf',  // ✅ LOCAL FILE
      fullTextUrl: 'https://www.sccm.org/SurvivingSepsisCampaign/Guidelines',
      evidenceLevel: 'Class I',
      recommendations: [
        'Recognize sepsis early using qSOFA or SIRS criteria',
        'Obtain blood cultures before antibiotics',
        'Administer broad-spectrum antibiotics within 1 hour',
        'Begin fluid resuscitation with 30 mL/kg crystalloid',
        'Target MAP ≥65 mmHg with vasopressors if needed',
        'Measure lactate and remeasure if elevated (>2 mmol/L)',
        'Source control within 12 hours if feasible'
      ],
      topics: ['Sepsis', 'Septic Shock', 'Antibiotics', 'Fluid Resuscitation', 'Vasopressors', 'Lactate', 'qSOFA']
    },
    
    // TEXT-BASED ALGORITHMS (No flowchart PDF yet - add PDFs to public/algorithms/)
    {
      id: 'aha-acls-cardiac-arrest',
      title: 'Adult Cardiac Arrest Algorithm - ACLS',
      category: 'ACLS',
      published: '2020-10-21',
      summary: 'Complete ACLS cardiac arrest algorithm including VF/pVT and asystole/PEA pathways with CPR quality metrics.',
      pdfUrl: '',  // ❌ No local PDF yet - upload to /public/algorithms/acls/cardiac-arrest.pdf
      fullTextUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms',
      evidenceLevel: 'Class I',
      recommendations: [
        'High-quality CPR: 100-120/min, depth 2-2.4 inches',
        'Minimize interruptions (<10 seconds)',
        'Defibrillate VF/pVT immediately',
        'Epinephrine 1mg IV/IO every 3-5 min',
        'Amiodarone 300mg for refractory VF/pVT',
        'Treat reversible causes (H\'s and T\'s)'
      ],
      topics: ['Cardiac Arrest', 'VF', 'pVT', 'Asystole', 'PEA', 'CPR', 'Defibrillation']
    },
    {
      id: 'aha-acls-bradycardia',
      title: 'Bradycardia Algorithm - ACLS',
      category: 'ACLS',
      published: '2020-10-21',
      summary: 'ACLS bradycardia algorithm for symptomatic bradycardia with detailed treatment pathways.',
      pdfUrl: '',  // ❌ No local PDF yet - upload to /public/algorithms/acls/bradycardia.pdf
      fullTextUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms',
      evidenceLevel: 'Class I',
      recommendations: [
        'Identify and treat underlying cause',
        'Atropine 1mg IV (repeat q3-5min, max 3mg)',
        'Transcutaneous pacing if atropine ineffective',
        'Dopamine 5-20 mcg/kg/min infusion',
        'Epinephrine 2-10 mcg/min infusion',
        'Prepare for transvenous pacing'
      ],
      topics: ['Bradycardia', 'Heart Block', 'Atropine', 'Pacing']
    },
    {
      id: 'aha-acls-tachycardia',
      title: 'Tachycardia Algorithm - ACLS',
      category: 'ACLS',
      published: '2020-10-21',
      summary: 'ACLS tachycardia algorithm for stable and unstable tachycardia with pulse.',
      pdfUrl: '', // ❌ No PDF yet - upload to /public/algorithms/ // OLD: 'https://www.acls.net/images/algo-tachycardia.pdf',
      fullTextUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms',
      evidenceLevel: 'Class I',
      recommendations: [
        'Assess stability (hypotension, altered mental status, shock, chest pain)',
        'Synchronized cardioversion if unstable',
        'Adenosine 6mg rapid IV push for regular narrow complex',
        'If no conversion: Adenosine 12mg',
        'Wide complex: Amiodarone 150mg over 10min',
        'Expert consultation recommended'
      ],
      topics: ['Tachycardia', 'SVT', 'Adenosine', 'Cardioversion', 'Amiodarone']
    },
    {
      id: 'aha-acls-acs',
      title: 'Acute Coronary Syndromes Algorithm - ACLS',
      category: 'ACS',
      published: '2020-10-21',
      summary: 'ACLS algorithm for acute coronary syndromes including STEMI and NSTEMI pathways.',
      pdfUrl: '', // ❌ No PDF yet - upload to /public/algorithms/ // OLD: 'https://www.acls.net/images/algo-acs.pdf',
      fullTextUrl: 'https://cpr.heart.org/en/clinical/cpr-ecc-guidelines/acs',
      evidenceLevel: 'Class I',
      recommendations: [
        'Aspirin 162-325mg chewed immediately',
        'Oxygen if SpO2 <90%',
        'Nitroglycerin 0.4mg SL q5min (max 3 doses)',
        'Morphine for pain if needed',
        '12-lead ECG within 10 minutes',
        'STEMI: Door-to-balloon <90 minutes'
      ],
      topics: ['ACS', 'STEMI', 'NSTEMI', 'Chest Pain', 'MI']
    },
    {
      id: 'aha-acls-stroke',
      title: 'Stroke Algorithm - ACLS',
      category: 'Stroke',
      published: '2020-10-21',
      summary: 'ACLS stroke algorithm with time-critical interventions for acute ischemic stroke.',
      pdfUrl: '', // ❌ No PDF yet - upload to /public/algorithms/ // OLD: 'https://www.acls.net/images/algo-stroke.pdf',
      fullTextUrl: 'https://cpr.heart.org/en/clinical/cpr-ecc-guidelines/stroke',
      evidenceLevel: 'Class I',
      recommendations: [
        'Cincinnati Stroke Scale assessment',
        'Last known well time documentation',
        'CT scan within 25 minutes of arrival',
        'tPA if within 3-4.5 hours and eligible',
        'Blood pressure management',
        'Consider thrombectomy within 24 hours'
      ],
      topics: ['Stroke', 'CVA', 'tPA', 'Thrombectomy', 'NIH Stroke Scale']
    },

    // PALS ALGORITHMS
    {
      id: 'aha-pals-cardiac-arrest',
      title: 'Pediatric Cardiac Arrest Algorithm - PALS',
      category: 'PALS',
      published: '2020-10-21',
      summary: 'PALS pediatric cardiac arrest algorithm with pediatric-specific interventions.',
      pdfUrl: '', // ❌ No PDF yet - upload to /public/algorithms/ // OLD: 'https://www.acls.net/images/algo-pals-cardiac-arrest.pdf',
      fullTextUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-basic-and-advanced-life-support',
      evidenceLevel: 'Class I',
      recommendations: [
        'CPR: 15:2 compression-ventilation ratio (2 rescuers)',
        'Compression rate: 100-120/min',
        'Epinephrine 0.01mg/kg IV/IO (max 1mg)',
        'Defibrillation: 2 J/kg initially, then 4 J/kg',
        'Amiodarone 5mg/kg for refractory VF/pVT',
        'Consider reversible causes'
      ],
      topics: ['Pediatric', 'Cardiac Arrest', 'PALS', 'CPR', 'Defibrillation']
    },
    {
      id: 'aha-pals-bradycardia',
      title: 'Pediatric Bradycardia Algorithm - PALS',
      category: 'PALS',
      published: '2020-10-21',
      summary: 'PALS algorithm for symptomatic bradycardia in pediatric patients.',
      pdfUrl: '', // ❌ No PDF yet - upload to /public/algorithms/ // OLD: 'https://www.acls.net/images/algo-pals-bradycardia.pdf',
      fullTextUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-basic-and-advanced-life-support',
      evidenceLevel: 'Class I',
      recommendations: [
        'Ensure adequate oxygenation and ventilation',
        'CPR if HR <60/min with poor perfusion',
        'Epinephrine 0.01mg/kg IV/IO',
        'Atropine 0.02mg/kg (min 0.1mg, max 0.5mg)',
        'Consider pacing for complete heart block',
        'Treat underlying causes'
      ],
      topics: ['Pediatric', 'Bradycardia', 'PALS', 'Heart Block']
    },
    {
      id: 'aha-pals-tachycardia',
      title: 'Pediatric Tachycardia Algorithm - PALS',
      category: 'PALS',
      published: '2020-10-21',
      summary: 'PALS algorithm for tachycardia with pulse in pediatric patients.',
      pdfUrl: '', // ❌ No PDF yet - upload to /public/algorithms/ // OLD: 'https://www.acls.net/images/algo-pals-tachycardia.pdf',
      fullTextUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-basic-and-advanced-life-support',
      evidenceLevel: 'Class I',
      recommendations: [
        'Adenosine 0.1mg/kg rapid IV push (max 6mg)',
        'Second dose: 0.2mg/kg (max 12mg)',
        'Synchronized cardioversion if unstable: 0.5-1 J/kg',
        'Amiodarone 5mg/kg over 20-60min',
        'Vagal maneuvers for SVT',
        'Expert consultation recommended'
      ],
      topics: ['Pediatric', 'Tachycardia', 'SVT', 'PALS', 'Adenosine']
    },

    // BLS ALGORITHMS
    {
      id: 'aha-bls-adult-cpr',
      title: 'BLS Adult Cardiac Arrest Algorithm',
      category: 'BLS',
      published: '2020-10-21',
      summary: 'Basic Life Support algorithm for adult cardiac arrest with C-A-B sequence.',
      pdfUrl: '', // ❌ No PDF yet - upload to /public/algorithms/ // OLD: 'https://www.acls.net/images/algo-bls-adult.pdf',
      fullTextUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-and-advanced-life-support',
      evidenceLevel: 'Class I',
      recommendations: [
        'Check responsiveness and pulse (≤10 seconds)',
        'Call for help and get AED',
        'Compressions: 100-120/min, depth 2-2.4 inches',
        'Compression-ventilation ratio: 30:2',
        'Use AED as soon as available',
        'Continue until ROSC or advanced help arrives'
      ],
      topics: ['BLS', 'CPR', 'Cardiac Arrest', 'AED']
    },
    {
      id: 'aha-bls-choking',
      title: 'Choking Relief Algorithm - BLS',
      category: 'BLS',
      published: '2020-10-21',
      summary: 'BLS algorithm for foreign-body airway obstruction in conscious and unconscious victims.',
      pdfUrl: '', // ❌ No PDF yet - upload to /public/algorithms/ // OLD: 'https://www.acls.net/images/algo-choking.pdf',
      fullTextUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-and-advanced-life-support',
      evidenceLevel: 'Class I',
      recommendations: [
        'Conscious victim: Back blows and abdominal thrusts',
        'Continue until object expelled or unconscious',
        'If unconscious: Begin CPR',
        'Look for object before giving breaths',
        'Remove if visible and easily accessible',
        'Call for advanced help if persistent obstruction'
      ],
      topics: ['Choking', 'Airway Obstruction', 'Heimlich', 'BLS']
    },

    // NEONATAL RESUSCITATION
    {
      id: 'aha-nrp-newborn',
      title: 'Neonatal Resuscitation Algorithm - NRP',
      category: 'NRP',
      published: '2020-10-21',
      summary: 'Complete NRP algorithm for newborn resuscitation with detailed steps from birth through advanced interventions.',
      pdfUrl: '', // ❌ No PDF yet // OLD: 'https://www.aap.org/en/pages/neonatal-resuscitation-program/nrp-algorithm',
      fullTextUrl: 'https://publications.aap.org/pediatrics/article/146/Supplement_1/S135/33322/2020-American-Heart-Association-Guidelines-for',
      imageUrl: 'https://www.aap.org/globalassets/nrp-algorithm-2020.png',
      evidenceLevel: 'Class I',
      recommendations: [
        'Antenatal counseling and equipment check',
        'Warm, dry, stimulate newborn',
        'Position airway, clear secretions if needed',
        'Evaluate: respirations, heart rate, color',
        'PPV if gasping or apneic or HR <100',
        'Chest compressions if HR <60 after 30 sec PPV',
        'Epinephrine 0.01-0.03 mg/kg if HR <60',
        'Consider volume if hypovolemic'
      ],
      topics: ['Neonatal', 'Resuscitation', 'NRP', 'Newborn', 'Delivery Room']
    },

    // 2020 GUIDELINES
    {
      id: 'aha-guidelines-2020',
      title: '2020 AHA CPR and ECC Guidelines',
      category: 'ACLS',
      published: '2020-10-21',
      summary: 'Complete 2020 American Heart Association Guidelines for CPR and Emergency Cardiovascular Care.',
      pdfUrl: '', // ❌ No PDF yet // OLD: 'https://www.ahajournals.org/doi/pdf/10.1161/CIR.0000000000000916',
      fullTextUrl: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000000916',
      evidenceLevel: 'Class I',
      recommendations: [
        'Updated compression depth and rate guidelines',
        'Emphasis on high-quality CPR',
        'Early defibrillation for VF/pVT',
        'Dispatcher-assisted CPR',
        'Post-cardiac arrest care optimization',
        'Team dynamics and communication'
      ],
      topics: ['Guidelines', 'CPR', 'ECC', 'ACLS', 'BLS', 'PALS']
    }
  ];
}

/**
 * Convert AHA guideline to unified format
 */
export function toUnifiedGuideline(aha: AHAGuideline): any {
  return {
    id: aha.id,
    source: 'aha' as const,
    title: aha.title,
    summary: aha.summary,
    published: aha.published,
    fullTextUrl: aha.fullTextUrl,
    pdfUrl: aha.pdfUrl,
    evidenceLevel: aha.evidenceLevel,
    recommendations: aha.recommendations,
    topics: aha.topics,
    category: aha.category,
    imageUrl: aha.imageUrl
  };
}
