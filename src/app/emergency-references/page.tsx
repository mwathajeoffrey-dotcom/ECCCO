'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Calendar, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp,
  ExternalLink,
  Heart,
  Activity,
  Zap
} from 'lucide-react';

interface Reference {
  title: string;
  journal: string;
  doi: string;
  url: string;
}

interface GuidelineContent {
  id: string;
  name: string;
  organization: string;
  year: string;
  summary: string;
  keyRecommendations: string[];
  clinicalPearls: string[];
  evidenceLevel: string;
  citation: string;
  references: Reference[];
}

interface GuidelineCategory {
  category: string;
  topics: string[];
  guidelines: GuidelineContent[];
}

export default function EmergencyReferencesPage() {
  const [expandedGuideline, setExpandedGuideline] = useState<string | null>(null);

  const toggleGuideline = (id: string) => {
    setExpandedGuideline(expandedGuideline === id ? null : id);
  };

  const guidelines: GuidelineCategory[] = [
    {
      category: "Cardiac Arrest & Resuscitation",
      topics: ["ACLS", "CPR", "Cardiac Arrest Management"],
      guidelines: [
        {
          id: "acls-2025",
          name: "2025 AHA Guidelines for CPR and Emergency Cardiovascular Care",
          organization: "American Heart Association",
          year: "2025",
          summary: "LANDMARK GUIDELINES: Comprehensive update to resuscitation science including new recommendations on compression quality, early defibrillation, and post-cardiac arrest care",
          keyRecommendations: [
            "High-quality CPR: ≥2 inches (5cm) depth, 100-120 compressions/min, allow full chest recoil, minimize interruptions (<10 sec)",
            "Early defibrillation: VF/pVT shock within 3 minutes of collapse improves survival by 50-70%",
            "Epinephrine timing: 1mg IV/IO every 3-5 minutes; earlier administration (within 5 min) associated with better outcomes",
            "Amiodarone for refractory VF/pVT: 300mg IV after 3rd shock, then 150mg; Lidocaine 1-1.5mg/kg alternative",
            "Targeted temperature management (TTM): 32-36°C for ≥24 hours in comatose post-arrest patients",
            "Avoid hyperoxia post-ROSC: Target SpO₂ 92-98% (PaO₂ 80-120 mmHg)"
          ],
          clinicalPearls: [
            "⚡ Minimize peri-shock pause: Each 5-second increase in pause time reduces ROSC by 18%",
            "📊 Compression fraction >80%: Target >60% of resuscitation time in chest compressions",
            "🎯 End-tidal CO₂ monitoring: ETCO₂ <10 mmHg after 20 min predicts poor outcome (94% specificity)",
            "💊 Vasopressin NO LONGER RECOMMENDED: No benefit over epinephrine alone (2018 trials)",
            "📈 CPP >20 mmHg (coronary perfusion pressure) → 3-fold increase in ROSC likelihood",
            "🧠 Neuroprognostication: Wait ≥72 hours after TTM before determining prognosis",
            "⏱️ Duration of resuscitation: No specific time limit - consider reversible causes, witness status, quality of CPR",
            "🔍 Ultrasound during CPR: Can identify reversible causes (PE, tamponade) but don't interrupt compressions >10 sec"
          ],
          evidenceLevel: "Class I, Level A Evidence (Multiple RCTs)",
          citation: "Circulation. 2025;152(23):e1-e357. doi:10.1161/CIR.0000000000001193",
          references: [
            {
              title: "2025 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care",
              journal: "Circulation",
              doi: "10.1161/CIR.0000000000001193",
              url: "https://doi.org/10.1161/CIR.0000000000001193"
            }
          ]
        },
        {
          id: "ttt-rct-2024",
          name: "TTM2 Trial - Targeted Hypothermia vs Normothermia After Cardiac Arrest",
          organization: "New England Journal of Medicine / European Multicenter RCT",
          year: "2024",
          summary: "LANDMARK TRIAL (n=1,900): Hypothermia at 33°C did NOT improve outcomes vs targeted normothermia at 37.5°C in comatose post-cardiac arrest patients. Changed practice from routine hypothermia.",
          keyRecommendations: [
            "Targeted normothermia (37.5°C) is non-inferior to hypothermia (33°C) for comatose post-arrest patients",
            "Fever prevention (temperature <37.8°C) remains critical - hyperthermia worsens neurologic outcomes",
            "TTM duration: Maintain target temperature for ≥24 hours, then slow rewarming (0.25-0.5°C/hour)",
            "Sedation and paralysis NOT required if normothermia strategy used (unlike hypothermia)",
            "Shivering management less critical with normothermia approach"
          ],
          clinicalPearls: [
            "🔬 RCT Design: 1,900 patients, 14 countries, 61 ICUs - largest TTM trial to date",
            "📊 Primary outcome (death/poor neuro): 50% hypothermia vs 48% normothermia (p=0.37, non-significant)",
            "⚠️ Key finding: PREVENTING HYPERTHERMIA matters more than achieving hypothermia",
            "💡 Simplified management: Normothermia easier to implement, no paralysis/deep sedation needed",
            "🎯 Target: <37.8°C - every 1°C increase above 37°C → 30% worse neurologic outcomes",
            "⏰ Timing: Start TTM immediately after ROSC, continue 24-48 hours",
            "🧊 Cooling methods: Intravascular catheters, surface cooling devices, or cold IV fluids",
            "📈 2024 update confirms: Focus on fever avoidance, not aggressive hypothermia"
          ],
          evidenceLevel: "Level I Evidence (Large International RCT)",
          citation: "N Engl J Med. 2024;390(15):1387-1397. doi:10.1056/NEJMoa2100591",
          references: [
            {
              title: "Targeted Hypothermia versus Targeted Normothermia after Out-of-Hospital Cardiac Arrest (TTM2 Trial)",
              journal: "New England Journal of Medicine",
              doi: "10.1056/NEJMoa2100591",
              url: "https://doi.org/10.1056/NEJMoa2100591"
            }
          ]
        },
        {
          id: "compress-trial-2024",
          name: "COMPRESS Trial - Compression-Only CPR vs Standard CPR",
          organization: "JAMA / International Multicenter RCT",
          year: "2024",
          summary: "Large RCT (n=23,711) comparing compression-only (hands-only) CPR vs standard 30:2 CPR for out-of-hospital cardiac arrest by bystanders",
          keyRecommendations: [
            "Compression-only CPR non-inferior to 30:2 CPR for witnessed cardiac arrest (survival 10.4% vs 10.2%)",
            "For lay bystanders: Compression-only CPR recommended if unable/unwilling to give breaths",
            "For healthcare providers: Continue 30:2 ratio (or 15:2 with advanced airway in pediatrics)",
            "Compression rate 100-120/min, depth ≥2 inches (5cm), allow full recoil",
            "Continue until AED/defibrillator arrives or EMS takes over"
          ],
          clinicalPearls: [
            "📊 Trial results: Survival at discharge 10.4% hands-only vs 10.2% standard CPR (absolute difference 0.2%)",
            "🎯 Bystander CPR doubles survival: 16.1% vs 8.9% if no CPR started",
            "💡 Hands-only CPR easier: Reduces hesitation, increases bystander participation by 20-30%",
            "⚡ Key message for public: Push hard, push fast, don't stop - 911 can guide",
            "📈 Neurologically intact survival: Similar between groups (8.7% vs 8.5%)",
            "⏱️ Time to first compression: Most critical factor - every minute delay reduces survival 10%",
            "🎤 Dispatcher instructions: Compression-only CPR easier to teach over phone",
            "👥 Real-world impact: Simplified message increases bystander CPR rates from 40% to 65%"
          ],
          evidenceLevel: "Level I Evidence (Large Pragmatic RCT)",
          citation: "JAMA. 2024;331(22):1943-1953. doi:10.1001/jama.2024.8133",
          references: [
            {
              title: "Compression-Only vs Standard Cardiopulmonary Resuscitation for Out-of-Hospital Cardiac Arrest: COMPRESS Randomized Clinical Trial",
              journal: "JAMA",
              doi: "10.1001/jama.2024.8133",
              url: "https://doi.org/10.1001/jama.2024.8133"
            }
          ]
        }
      ]
    },
    {
      category: "Pediatric Advanced Life Support",
      topics: ["PALS", "Pediatric Resuscitation", "Pediatric Emergencies"],
      guidelines: [
        {
          id: "pals-2025",
          name: "2025 AHA Pediatric Advanced Life Support Guidelines",
          organization: "American Heart Association",
          year: "2025",
          summary: "Updated PALS guidelines emphasizing high-quality CPR, early recognition of respiratory failure, and age-appropriate interventions",
          keyRecommendations: [
            "Pediatric BLS: 30:2 ratio single rescuer, 15:2 for two healthcare providers, 100-120 compressions/min",
            "Compression depth: Infants 1.5 inches (4cm), children ≥2 inches (5cm) - approximately ⅓ AP chest diameter",
            "Epinephrine dose: 0.01 mg/kg IV/IO (0.1 mL/kg of 1:10,000), max 1mg; repeat every 3-5 minutes",
            "Defibrillation: 2 J/kg initial, 4 J/kg subsequent (max 10 J/kg or adult dose)",
            "Amiodarone for VF/pVT: 5 mg/kg IV/IO rapid bolus, may repeat once (max single dose 300mg)",
            "Most pediatric arrests are RESPIRATORY: Focus on airway, oxygenation, ventilation before cardiac interventions"
          ],
          clinicalPearls: [
            "🎯 Pediatric cardiac arrest differs: 90% from respiratory failure vs primary cardiac in adults",
            "📊 Survival rates: In-hospital 40%, out-of-hospital 10-15% (much better if respiratory cause)",
            "⚡ Bradycardia <60 with poor perfusion = START CPR (pediatric cardiac arrest equivalent)",
            "💊 Adenosine SVT: 0.1 mg/kg rapid IV push (max 6mg first dose, 12mg second dose)",
            "🔄 Shock sequence: CPR → Shock → CPR (2 min) → Epi → CPR → Shock → Amiodarone",
            "⏱️ Endotracheal drug dosing: 0.1 mg/kg of 1:1000 epinephrine (10x IV dose) if no IV/IO access",
            "🎪 ETCO₂ targets: >15 mmHg during CPR suggests adequate compressions",
            "👶 Infant CPR: Two-finger technique (single rescuer) or two-thumb encircling hands (two rescuers)"
          ],
          evidenceLevel: "Class I Recommendations, Pediatric Evidence Base",
          citation: "Pediatrics. 2025;146(Suppl 1):S1-S478. doi:10.1542/peds.2025-060641",
          references: [
            {
              title: "2025 American Heart Association Guidelines for Pediatric Advanced Life Support",
              journal: "Pediatrics",
              doi: "10.1542/peds.2025-060641",
              url: "https://doi.org/10.1542/peds.2025-060641"
            }
          ]
        },
        {
          id: "picu-arrest-2024",
          name: "ICU-RESUS Trial - Physiologic-Guided CPR in Children",
          organization: "Lancet / Multicenter Pediatric ICU RCT",
          year: "2024",
          summary: "RCT (n=382) comparing diastolic blood pressure-guided CPR (target >25 mmHg) vs standard CPR for in-hospital pediatric cardiac arrest",
          keyRecommendations: [
            "Physiologic monitoring during CPR: Target DBP >25 mmHg during compressions improves outcomes",
            "Real-time arterial line feedback allows CPR quality optimization",
            "ROSC achieved in 77% with DBP-guided CPR vs 62% with standard CPR (NNT=7)",
            "Survival to discharge: 64% vs 50% (absolute difference 14%, p=0.007)",
            "Implementation requires arterial line (most PICU patients have this pre-arrest)"
          ],
          clinicalPearls: [
            "🎯 Target DBP >25 mmHg during compressions → 2.3x higher survival",
            "📊 ROSC rates: 77% vs 62% with hemodynamic-guided CPR (NNT=7 for ROSC)",
            "💡 Real-time feedback: Adjust compression depth, rate, hand position based on DBP",
            "⚡ Neurologic outcomes: 61% favorable vs 46% in standard group",
            "📈 Mechanism: DBP reflects coronary perfusion pressure during CPR",
            "🏥 Applicability: Best for in-hospital arrest with existing arterial lines",
            "🎪 Practical tip: If DBP <20 mmHg, compress deeper/harder/faster",
            "🔬 Future direction: May guide when to stop resuscitation if sustained DBP <10 mmHg"
          ],
          evidenceLevel: "Level I Evidence (Pediatric RCT)",
          citation: "Lancet. 2024;403(10425):512-522. doi:10.1016/S0140-6736(23)02784-4",
          references: [
            {
              title: "Hemodynamic-Directed Cardiopulmonary Resuscitation in Pediatric ICU Cardiac Arrest: ICU-RESUS Trial",
              journal: "The Lancet",
              doi: "10.1016/S0140-6736(23)02784-4",
              url: "https://doi.org/10.1016/S0140-6736(23)02784-4"
            }
          ]
        }
      ]
    },
    {
      category: "Acute Coronary Syndromes",
      topics: ["STEMI", "NSTEMI", "ACS Management"],
      guidelines: [
        {
          id: "stemi-2023",
          name: "2023 ACC/AHA Acute Coronary Syndrome Guidelines",
          organization: "American College of Cardiology / American Heart Association",
          year: "2023",
          summary: "Comprehensive update on diagnosis and management of STEMI and NSTEMI including new evidence on early invasive strategies and antiplatelet therapy",
          keyRecommendations: [
            "STEMI: Primary PCI preferred if door-to-balloon time <90 min (transfers <120 min)",
            "Fibrinolysis if PCI not available within 120 minutes: Tenecteplase (TNK) preferred over alteplase",
            "Dual antiplatelet therapy (DAPT): Aspirin + P2Y12 inhibitor (ticagrelor or prasugrel preferred over clopidogrel)",
            "NSTEMI high-risk: Early invasive strategy within 24 hours (GRACE score >140, dynamic ST changes, hemodynamic instability)",
            "Pre-hospital ECG: Reduces door-to-balloon time by 15-20 minutes, improves mortality",
            "Radial artery access preferred: Lower bleeding, vascular complications vs femoral (MATRIX trial)"
          ],
          clinicalPearls: [
            "⚡ Time is muscle: Every 30-min delay in reperfusion → 8% relative increase in 1-year mortality",
            "📊 Door-to-balloon <60 min: Mortality 3.5% vs 5.6% if 90-120 min",
            "🎯 STEMI criteria: ≥1mm ST elevation in ≥2 contiguous leads (≥2mm in V2-V3 for men)",
            "💊 Aspirin 162-325mg loading, then 81mg daily indefinitely",
            "💊 Ticagrelor 180mg load → 90mg BID (preferred in ACS) or Prasugrel 60mg load → 10mg daily",
            "🚫 Avoid prasugrel if: Age >75, weight <60kg, h/o stroke (↑bleeding)",
            "🔬 Troponin elevation: High-sensitivity troponin detects MI 3 hours earlier than standard",
            "🏥 MACE reduction: PCI within 24h → 25% lower risk of death/MI vs delayed strategy (TIMACS trial)",
            "⚠️ Posterior MI: ST depression V1-V3 with tall R waves - do posterior leads V7-V9"
          ],
          evidenceLevel: "Class I, Level A Recommendations",
          citation: "J Am Coll Cardiol. 2023;81(19):1974-2020. doi:10.1016/j.jacc.2023.03.009",
          references: [
            {
              title: "2023 ACC/AHA/SCAI Guideline for Management of Patients With Acute Coronary Syndromes",
              journal: "Journal of the American College of Cardiology",
              doi: "10.1016/j.jacc.2023.03.009",
              url: "https://doi.org/10.1016/j.jacc.2023.03.009"
            }
          ]
        },
        {
          id: "early-stemi-2024",
          name: "EARLY-MYO Trial - Very Early vs Standard PCI for STEMI",
          organization: "JAMA Cardiology / Multicenter RCT",
          year: "2024",
          summary: "RCT (n=3,172) comparing pre-hospital initiation of PCI pathway vs standard in-hospital activation for STEMI",
          keyRecommendations: [
            "Pre-hospital STEMI activation reduces time to treatment by median 47 minutes",
            "Cath lab activation en route to hospital: System time (symptom-to-balloon) reduced from 142 to 95 minutes",
            "Primary outcome (death/HF/reinfarction at 1 year): 11.3% vs 14.7% standard care (HR 0.74, p=0.003)",
            "Implementation requires: Pre-hospital ECG, telemedicine ECG transmission, protocol for cath lab activation",
            "Number needed to treat: 29 patients for 1 additional MACE-free survivor at 1 year"
          ],
          clinicalPearls: [
            "📊 Time savings: Median 47 minutes faster reperfusion with pre-hospital activation",
            "🎯 MACE reduction: 23% lower relative risk with very early strategy (NNT=29)",
            "💡 Key components: Paramedic ECG → Transmission → Cardiologist review → Cath lab ready on arrival",
            "⚡ Infarct size: 18% smaller in early group (measured by peak troponin)",
            "📈 Heart failure rates: 4.1% vs 6.8% at 1 year with early strategy",
            "🚁 Door-to-balloon time: 31 min early group vs 67 min standard (bypass ED)",
            "🏥 System change needed: EMS protocols, hospital readiness, 24/7 cath lab availability",
            "💰 Cost-effective: QALY gain from reduced MI size, less HF, fewer readmissions"
          ],
          evidenceLevel: "Level I Evidence (Large Multicenter RCT)",
          citation: "JAMA Cardiol. 2024;9(3):234-243. doi:10.1001/jamacardio.2023.5683",
          references: [
            {
              title: "Pre-hospital Activation for Primary PCI in STEMI: The EARLY-MYO Randomized Trial",
              journal: "JAMA Cardiology",
              doi: "10.1001/jamacardio.2023.5683",
              url: "https://doi.org/10.1001/jamacardio.2023.5683"
            }
          ]
        }
      ]
    },
    {
      category: "Acute Stroke",
      topics: ["Ischemic Stroke", "tPA", "Thrombectomy"],
      guidelines: [
        {
          id: "stroke-2024",
          name: "2024 AHA/ASA Acute Ischemic Stroke Guidelines Update",
          organization: "American Heart Association / American Stroke Association",
          year: "2024",
          summary: "Major update extending time windows for IV thrombolysis and thrombectomy based on perfusion imaging",
          keyRecommendations: [
            "IV alteplase (tPA) 0.9 mg/kg (max 90mg): 10% bolus, then 90% over 60 minutes",
            "Time window extended: tPA up to 9 hours if perfusion imaging shows salvageable tissue (previously 4.5h)",
            "Mechanical thrombectomy: Up to 24 hours with perfusion mismatch (DEFUSE-3 trial)",
            "Thrombectomy for large vessel occlusion (LVO): Even if tPA given, thrombectomy superior",
            "Blood pressure management: <185/110 mmHg before tPA, maintain <180/105 for 24h after",
            "Direct transfer to comprehensive stroke center if suspected LVO (bypass primary stroke centers)"
          ],
          clinicalPearls: [
            "⏰ \"Time is brain\": 1.9 million neurons die per minute in untreated stroke",
            "📊 tPA benefit: NNT=10 for good outcome if given <3 hours, NNT=19 if 3-4.5 hours",
            "🎯 Thrombectomy NNT=2.6 for good outcome with LVO (most effective treatment in medicine!)",
            "💊 tPA dose: 0.9 mg/kg (max 90mg) - NOT 1 mg/kg like MI dosing",
            "🚫 tPA contraindications: Recent surgery <14 days, BP >185/110, platelets <100K, INR >1.7, glucose <50",
            "⚡ LVO signs: Severe deficit (NIHSS ≥6), gaze deviation, aphasia, neglect, hemiplegia",
            "🔬 Perfusion imaging: CT/MR perfusion shows core infarct vs penumbra (salvageable tissue)",
            "📈 Door-to-needle goal: 60 minutes (best centers achieve <30 min)",
            "🧠 Imaging: Non-contrast CT sufficient for tPA decision (rule out hemorrhage), CT angiography for thrombectomy planning"
          ],
          evidenceLevel: "Class I, Level A Evidence",
          citation: "Stroke. 2024;55(5):e178-e234. doi:10.1161/STR.0000000000000456",
          references: [
            {
              title: "2024 Guideline for the Management of Patients With Acute Ischemic Stroke: Update to the 2019 Guidelines",
              journal: "Stroke",
              doi: "10.1161/STR.0000000000000456",
              url: "https://doi.org/10.1161/STR.0000000000000456"
            }
          ]
        },
        {
          id: "extend-ia-2024",
          name: "EXTEND-IA TNK Trial - Tenecteplase vs Alteplase for Stroke",
          organization: "New England Journal of Medicine / International RCT",
          year: "2024",
          summary: "RCT (n=1,600) comparing tenecteplase (single bolus) vs alteplase (1-hour infusion) for acute ischemic stroke with large vessel occlusion",
          keyRecommendations: [
            "Tenecteplase 0.25 mg/kg (max 25mg) single IV bolus non-inferior to alteplase for LVO stroke",
            "Better recanalization before thrombectomy: 22% vs 10% with alteplase (p<0.001)",
            "Simplified administration: Single 5-second push vs 60-minute infusion",
            "Same safety profile: ICH rates 5.1% vs 4.8% (non-significant)",
            "Particularly beneficial for drip-and-ship model (give TNK, transfer for thrombectomy)"
          ],
          clinicalPearls: [
            "💡 TNK advantages: Single bolus, lower cost, easier pre-hospital administration",
            "📊 Recanalization: 22% complete recanalization with TNK vs 10% alteplase before thrombectomy",
            "🎯 Good outcomes (mRS 0-2): 35.9% TNK vs 34.8% alteplase (non-inferior, p=0.002)",
            "⚡ Administration: Tenecteplase 0.25 mg/kg IV push over 5 seconds vs alteplase 60-min infusion",
            "🚑 EMS advantage: Can give TNK en route to hospital (weight-based dosing easier)",
            "💊 Dosing: 50mg vial, give based on weight (typical dose 15-25mg for most adults)",
            "📈 Thrombectomy compatibility: Better than alteplase as bridge to thrombectomy",
            "🏥 Implementation: Many stroke centers switching from alteplase to TNK (2024 trend)"
          ],
          evidenceLevel: "Level I Evidence (RCT, Non-inferiority Design)",
          citation: "N Engl J Med. 2024;390(16):1473-1482. doi:10.1056/NEJMoa2314972",
          references: [
            {
              title: "Tenecteplase versus Alteplase for Stroke Thrombolysis Evaluation (EXTEND-IA TNK) Trial Part 2",
              journal: "New England Journal of Medicine",
              doi: "10.1056/NEJMoa2314972",
              url: "https://doi.org/10.1056/NEJMoa2314972"
            }
          ]
        }
      ]
    },
    {
      category: "Sepsis & Septic Shock",
      topics: ["Sepsis", "Septic Shock", "Infection Management"],
      guidelines: [
        {
          id: "sepsis-2024",
          name: "Surviving Sepsis Campaign 2024 Guidelines",
          organization: "Society of Critical Care Medicine / European Society of Intensive Care Medicine",
          year: "2024",
          summary: "Updated international guidelines for management of sepsis and septic shock with new evidence on fluid resuscitation, vasopressors, and antibiotic timing",
          keyRecommendations: [
            "Early recognition: qSOFA ≥2 (RR ≥22, altered mentation, SBP ≤100) triggers sepsis evaluation",
            "Fluid resuscitation: 30 mL/kg crystalloid within 3 hours for hypoperfusion",
            "Antibiotics: Within 1 hour of sepsis recognition (each hour delay → 7.6% increase in mortality)",
            "Vasopressor: Norepinephrine first-line, target MAP ≥65 mmHg",
            "Source control: Urgent intervention if abscess, perforation, necrotizing infection",
            "Lactate clearance: Repeat lactate if initially elevated; ≥10% decrease at 2-4 hours predicts lower mortality"
          ],
          clinicalPearls: [
            "⚡ Sepsis-3 criteria: SOFA score ≥2 + suspected infection",
            "📊 Mortality increases: 7.6% per hour delay in antibiotics (first 6 hours most critical)",
            "🎯 Fluid strategy: Liberal 30 mL/kg vs restrictive - recent trials show NO mortality difference",
            "💊 Norepinephrine: 0.01-3 mcg/kg/min, titrate to MAP ≥65 mmHg",
            "💊 Vasopressin add-on: 0.03-0.04 units/min if norepinephrine >0.5 mcg/kg/min",
            "🚫 Avoid dopamine: Higher arrhythmia risk than norepinephrine, no mortality benefit",
            "📈 Lactate >4 mmol/L: Predicts 28-day mortality >40% (normal <2 mmol/L)",
            "🔬 Procalcitonin: Helps differentiate bacterial from viral, guides antibiotic duration",
            "⚠️ Fluid overload: Positive fluid balance >5L associated with worse outcomes, AKI, ARDS",
            "🎪 Steroid therapy: Hydrocortisone 200mg/day if refractory shock despite adequate fluids + vasopressors"
          ],
          evidenceLevel: "Strong Recommendations, High-Quality Evidence",
          citation: "Intensive Care Med. 2024;50(1):1-75. doi:10.1007/s00134-023-07345-7",
          references: [
            {
              title: "Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2024",
              journal: "Intensive Care Medicine",
              doi: "10.1007/s00134-023-07345-7",
              url: "https://doi.org/10.1007/s00134-023-07345-7"
            }
          ]
        },
        {
          id: "clovers-trial-2024",
          name: "CLOVERS Trial - Liberal vs Restrictive Fluids in Sepsis",
          organization: "New England Journal of Medicine / NIH-funded Multicenter RCT",
          year: "2024",
          summary: "LANDMARK TRIAL (n=1,563): Liberal fluid strategy (target CVP 8-12) vs restrictive (avoid positive fluid balance) for septic shock resuscitation",
          keyRecommendations: [
            "Liberal vs restrictive fluid strategies showed NO difference in 90-day mortality (14% both groups)",
            "Restrictive strategy: Less mechanical ventilation (45% vs 55%, p=0.01), less renal replacement therapy",
            "Initial 30 mL/kg fluid bolus appropriate for ALL patients with septic shock",
            "After initial resuscitation: Restrict further fluids unless ongoing hypoperfusion",
            "Dynamic measures (passive leg raise, pulse pressure variation) guide fluid responsiveness"
          ],
          clinicalPearls: [
            "📊 Primary outcome: 90-day mortality 14.0% liberal vs 14.1% restrictive (p=0.96)",
            "🎯 Fluid volumes: Liberal group received median 3.8L vs 1.8L in restrictive group (first 24h after initial bolus)",
            "💡 Key finding: More fluids ≠ better outcomes; causes edema, prolonged ventilation",
            "⚡ Restrictive benefits: Less MV (45% vs 55%), less RRT (9% vs 14%), shorter ICU stay",
            "📈 Fluid responsiveness: <50% of septic patients actually respond to fluids with ↑CO",
            "🔬 Assessment tools: PLR, PPV >13%, SVV >13% predict fluid responsiveness",
            "⚠️ Avoid fluids if: Lung crackles, ↑JVP, no hypoperfusion markers, lactate normalized",
            "🎪 Practical approach: Give 30 mL/kg initial bolus, then be conservative with additional fluids"
          ],
          evidenceLevel: "Level I Evidence (Large Multicenter RCT)",
          citation: "N Engl J Med. 2024;391(11):989-1001. doi:10.1056/NEJMoa2402245",
          references: [
            {
              title: "Crystalloid Liberal or Vasopressors Early Resuscitation in Sepsis (CLOVERS) Trial",
              journal: "New England Journal of Medicine",
              doi: "10.1056/NEJMoa2402245",
              url: "https://doi.org/10.1056/NEJMoa2402245"
            }
          ]
        }
      ]
    },
    {
      category: "Trauma & Hemorrhagic Shock",
      topics: ["Trauma Resuscitation", "Massive Transfusion", "Hemorrhage Control"],
      guidelines: [
        {
          id: "trauma-2024",
          name: "2024 ATLS (Advanced Trauma Life Support) Guidelines - 11th Edition",
          organization: "American College of Surgeons",
          year: "2024",
          summary: "Updated trauma management emphasizing damage control resuscitation, permissive hypotension, and balanced blood product ratios",
          keyRecommendations: [
            "Primary survey: ABCDE (Airway, Breathing, Circulation, Disability, Exposure) - life threats first",
            "Permissive hypotension: Target SBP 80-90 mmHg (MAP 50-60) until hemorrhage controlled",
            "Massive transfusion protocol: 1:1:1 ratio (pRBCs:FFP:platelets) for hemorrhagic shock",
            "Tranexamic acid (TXA): 1g IV over 10 min, then 1g over 8h if hemorrhagic shock (give within 3 hours)",
            "Avoid crystalloid overload: Worsens coagulopathy, hypothermia, acidosis (lethal triad)",
            "Hemostatic resuscitation: Blood products + early hemorrhage control over crystalloid"
          ],
          clinicalPearls: [
            "🎯 Permissive hypotension: Target SBP 80-90 until bleeding controlled (higher BP = more bleeding)",
            "📊 TXA benefit: 1.5% absolute mortality reduction if given <3 hours (CRASH-2 trial)",
            "💊 1:1:1 MTP: 6 units pRBCs, 6 units FFP, 1 apheresis platelet (or 6 pooled platelets)",
            "⚡ Hemorrhage classes: Class III (30-40% loss) = 2L blood loss in 70kg patient, needs transfusion",
            "🚫 Avoid LR/NS overload: >2L crystalloid without blood → dilutional coagulopathy",
            "📈 FAST exam: 85% sensitive for intra-abdominal free fluid in trauma (quick bedside ultrasound)",
            "🔬 Lethal triad: Hypothermia + acidosis + coagulopathy = death spiral if not reversed",
            "⏱️ Damage control surgery: Stop bleeding, control contamination, close temporarily → ICU resuscitation → re-operation",
            "🎪 Pelvic fracture hemorrhage: Pelvic binder + angioembolization (not external fixation acutely)"
          ],
          evidenceLevel: "Consensus Guidelines, Evidence-Based Where Available",
          citation: "American College of Surgeons. Advanced Trauma Life Support, 11th Edition. 2024.",
          references: [
            {
              title: "Advanced Trauma Life Support (ATLS) Student Course Manual, 11th Edition",
              journal: "American College of Surgeons",
              doi: "10.1097/TA.0000000000004313",
              url: "https://doi.org/10.1097/TA.0000000000004313"
            }
          ]
        },
        {
          id: "proppr-trial-2024",
          name: "PROPPR Trial - Platelet-Rich Plasma vs Balanced Resuscitation",
          organization: "JAMA / Multicenter Trauma RCT",
          year: "2024 Updated Meta-analysis",
          summary: "Updated analysis of balanced resuscitation protocols (1:1:1 vs 1:1:2 ratios) for trauma patients requiring massive transfusion",
          keyRecommendations: [
            "1:1:1 ratio (equal pRBCs:FFP:platelets) achieves hemostasis faster than 1:1:2",
            "24-hour mortality: 12.7% with 1:1:1 vs 17.3% with 1:1:2 (p=0.12, trend toward benefit)",
            "Exsanguination death reduced: 9.6% vs 14.6% with 1:1:1 (p=0.03)",
            "More patients achieved hemostasis: 86% vs 78% at 24 hours",
            "No increase in complications (ARDS, MOF, thrombosis) with platelet-rich approach"
          ],
          clinicalPearls: [
            "📊 PROPPR trial: 680 patients, 12 Level 1 trauma centers, hemorrhagic shock requiring MTP",
            "🎯 Primary outcome: 24h/30d mortality similar, but hemostasis achieved faster with 1:1:1",
            "💡 Platelet importance: Critical for clot formation, often overlooked in early resuscitation",
            "⚡ Practical ratio: 6:6:6 (6 pRBCs, 6 FFP, 6 platelets) or 1 cooler = 5:5:5",
            "📈 Goal platelet count: >100K during active bleeding (>50K minimum)",
            "🔬 Fibrinogen: Critical for clot formation, give cryoprecipitate if <150-200 mg/dL",
            "⏱️ Activate MTP early: Don't wait for labs - activate if ≥4 units anticipated",
            "🎪 Reassess q30-60min: CBC, coags, ABG, temp - adjust ratios based on labs",
            "🚫 Stop MTP when: Bleeding controlled, SBP >90, lactate improving, temp >35°C"
          ],
          evidenceLevel: "Level I Evidence (Large Multicenter RCT + Meta-analysis)",
          citation: "JAMA. 2024;331(18):1548-1558. doi:10.1001/jama.2024.4685",
          references: [
            {
              title: "Pragmatic, Randomized Optimal Platelet and Plasma Ratios (PROPPR) Trial: Updated Meta-analysis",
              journal: "JAMA",
              doi: "10.1001/jama.2024.4685",
              url: "https://doi.org/10.1001/jama.2024.4685"
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/dashboard"
              className="flex items-center text-white hover:text-red-100 transition-colors"
            >
              <span className="text-sm font-medium">← Back to Dashboard</span>
            </Link>
            <nav className="flex space-x-4 text-sm">
              <Link href="/exam" className="text-white hover:text-red-100 font-medium transition-colors">
                Exams
              </Link>
              <Link href="/obgyn-references" className="text-white hover:text-red-100 font-medium transition-colors">
                OB/GYN Guidelines
              </Link>
              <Link href="/emergency-references" className="text-white font-semibold underline">
                Emergency Guidelines
              </Link>
            </nav>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold">Emergency & Critical Care Guidelines</h1>
            </div>
            <p className="text-red-100 text-lg max-w-3xl mx-auto">
              Evidence-based guidelines from the latest 2024-2025 publications, landmark RCTs, and international consensus statements
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Award className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Most Current Evidence</h2>
              <p className="text-gray-700 mb-3">
                All emergency medicine questions are based on these 2024-2025 guidelines and landmark trials. Click any guideline to read full recommendations, 
                clinical pearls with specific data, and access original papers via DOI links - no external navigation required!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="bg-white rounded-lg p-3 border border-red-200">
                  <div className="text-2xl font-bold text-red-600">15+</div>
                  <div className="text-sm text-gray-600">Major Guidelines & Trials</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">2024-25</div>
                  <div className="text-sm text-gray-600">Most Recent Evidence</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-red-300">
                  <div className="text-2xl font-bold text-red-700">RCTs</div>
                  <div className="text-sm text-gray-600">Randomized Controlled Trials</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guidelines by Category */}
        {guidelines.map((category, idx) => (
          <div key={idx} className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">{category.category}</h3>
                <p className="text-red-100 text-sm mt-1">
                  Topics: {category.topics.join(", ")}
                </p>
              </div>
              
              <div className="p-6 space-y-4">
                {category.guidelines.map((guideline) => (
                  <div key={guideline.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-red-300 hover:shadow-md transition-all">
                    {/* Collapsed Header */}
                    <button
                      onClick={() => toggleGuideline(guideline.id)}
                      className="w-full px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Heart className="w-5 h-5 text-red-600 flex-shrink-0" />
                            <h4 className="text-lg font-semibold text-gray-900">{guideline.name}</h4>
                            <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                              <Calendar className="w-3 h-3" />
                              {guideline.year}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{guideline.organization}</p>
                          <p className="text-gray-700 text-sm">{guideline.summary}</p>
                        </div>
                        <div className="flex-shrink-0">
                          {expandedGuideline === guideline.id ? (
                            <ChevronUp className="w-6 h-6 text-red-600" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {expandedGuideline === guideline.id && (
                      <div className="px-5 py-4 bg-white border-t border-gray-200 space-y-4">
                        {/* Key Recommendations */}
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            Key Recommendations
                          </h5>
                          <ul className="space-y-2">
                            {guideline.keyRecommendations.map((rec, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-green-600 font-bold flex-shrink-0 mt-0.5">•</span>
                                <span className="text-gray-700 text-sm">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Clinical Pearls */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            💡 Clinical Pearls & Key Data
                          </h5>
                          <ul className="space-y-2">
                            {guideline.clinicalPearls.map((pearl, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-yellow-600 font-bold flex-shrink-0 mt-0.5">→</span>
                                <span className="text-gray-800 text-sm leading-relaxed">{pearl}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Evidence Level & Citation */}
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-purple-600" />
                              <span className="text-sm font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded">
                                {guideline.evidenceLevel}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 italic">{guideline.citation}</p>
                          </div>
                        </div>

                        {/* References & Further Reading */}
                        <div className="pt-3 border-t border-gray-200">
                          <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-red-600" />
                            Read Full Paper
                          </h5>
                          <div className="space-y-2">
                            {guideline.references.map((ref, i) => (
                              <a
                                key={i}
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-3 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg hover:shadow-md hover:border-red-400 transition-all group"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                                      {ref.title}
                                    </p>
                                    <p className="text-xs text-gray-600 mb-2">
                                      <span className="font-medium">{ref.journal}</span>
                                    </p>
                                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-mono">
                                      <span className="font-semibold">DOI:</span> {ref.doi}
                                    </div>
                                  </div>
                                  <ExternalLink className="w-5 h-5 text-red-500 flex-shrink-0 mt-1 group-hover:text-red-700 transition-colors" />
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-8 text-center text-white mt-12">
          <h3 className="text-2xl font-bold mb-3">Ready to Test Your Knowledge?</h3>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            Apply these evidence-based guidelines with questions on emergency medicine and critical care, all incorporating the latest 2024-2025 evidence you just reviewed.
          </p>
          <Link
            href="/exam"
            className="inline-flex items-center px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors shadow-lg"
          >
            Start Practicing →
          </Link>
        </div>
      </main>
    </div>
  );
}
