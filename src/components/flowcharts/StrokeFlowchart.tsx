'use client';

import React from 'react';
import { Clock, AlertCircle, Zap, Heart } from 'lucide-react';

export function StrokeFlowchart() {
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Acute Ischemic Stroke: Reperfusion Pathway
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Evidence-based decision pathway for thrombolytic and thrombectomy eligibility per 2024-2025
        AHA/ASA Acute Ischemic Stroke Guidelines.
      </p>

      {/* SVG Flowchart */}
      <div className="overflow-x-auto">
        <svg viewBox="0 0 1000 1700" className="w-full h-auto min-w-full">
          {/* Define gradients */}
          <defs>
            <linearGradient id="blueGradStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bfdbfe" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="redGradStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fecaca" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <linearGradient id="yellowGradStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fcd34d" />
            </linearGradient>
            <linearGradient id="greenGradStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="purpleGradStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d8b4fe" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="orangeGradStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
          </defs>

          {/* STEP 1: Onset Time */}
          <rect x="250" y="20" width="500" height="100" rx="15" fill="url(#blueGradStroke)" stroke="#1e40af" strokeWidth="2" />
          <text x="500" y="55" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle">
            Acute Ischemic Stroke (AIS) Suspected
          </text>
          <text x="500" y="80" fontSize="12" fill="white" textAnchor="middle">
            Time from symptom onset or last known well documented
          </text>
          <text x="500" y="100" fontSize="12" fill="white" textAnchor="middle">
            Activate Stroke Alert: Door-to-CT ≤10 minutes
          </text>

          {/* Arrow down */}
          <line x1="500" y1="120" x2="500" y2="160" stroke="#333" strokeWidth="3" />

          {/* STEP 2: NIHSS & CT Imaging */}
          <rect x="250" y="160" width="500" height="120" rx="15" fill="url(#purpleGradStroke)" stroke="#6b21a8" strokeWidth="3" />
          <circle cx="280" cy="185" r="18" fill="white" stroke="#6b21a8" strokeWidth="2" />
          <text x="287" y="192" fontSize="16" fontWeight="bold" fill="#6b21a8">1</text>
          <text x="330" y="185" fontSize="16" fontWeight="bold" fill="white">NIHSS Scoring & Imaging</text>
          <text x="330" y="210" fontSize="12" fill="white">✓ NIHSS score within 10 min (baseline for prognosis)</text>
          <text x="330" y="232" fontSize="12" fill="white">✓ Non-contrast head CT: Rule out hemorrhage</text>
          <text x="330" y="254" fontSize="12" fill="white">✓ CTA/MRA: Detect large vessel occlusion (LVO)</text>
          <text x="330" y="272" fontSize="12" fill="white">✓ If LVO detected → Consider thrombectomy pathway</text>

          {/* Arrow down */}
          <line x1="500" y1="280" x2="500" y2="320" stroke="#333" strokeWidth="3" />

          {/* STEP 3: Time to tPA Decision */}
          <polygon points="500,320 600,380 500,440 400,380" fill="url(#yellowGradStroke)" stroke="#d97706" strokeWidth="2" />
          <text x="500" y="375" fontSize="14" fontWeight="bold" fill="#333" textAnchor="middle">Time Window?</text>
          <text x="500" y="395" fontSize="12" fill="#333" textAnchor="middle">Last known well</text>

          {/* Standard window YES (4.5h) */}
          <text x="650" y="385" fontSize="13" fontWeight="bold" fill="#059669">Within 4.5h</text>
          <line x1="600" y1="380" x2="750" y2="380" stroke="#059669" strokeWidth="3" />

          {/* Extended window pathway - optional */}
          <text x="280" y="385" fontSize="13" fontWeight="bold" fill="#7c3aed">4.5-24h</text>
          <line x1="400" y1="380" x2="250" y2="380" stroke="#7c3aed" strokeWidth="2" />
          <line x1="250" y1="380" x2="250" y2="760" stroke="#7c3aed" strokeWidth="2" strokeDasharray="5,5" />

          {/* Beyond 24h - no treatment */}
          <text x="390" y="330" fontSize="11" fontWeight="bold" fill="#991b1b">Beyond 24h</text>
          <text x="360" y="345" fontSize="10" fill="#991b1b">No reperfusion therapy</text>
          <line x1="400" y1="330" x2="200" y2="200" stroke="#991b1b" strokeWidth="2" />

          {/* STEP 4: tPA Eligibility (Standard Window) */}
          <rect x="700" y="330" width="270" height="100" rx="10" fill="url(#greenGradStroke)" stroke="#15803d" strokeWidth="2" />
          <circle cx="720" cy="355" r="14" fill="white" stroke="#15803d" strokeWidth="2" />
          <text x="725" y="361" fontSize="14" fontWeight="bold" fill="#15803d">4h</text>
          <text x="760" y="355" fontSize="13" fontWeight="bold" fill="white">tPA (alteplase)</text>
          <text x="760" y="375" fontSize="11" fill="white">IV dose: 0.9 mg/kg</text>
          <text x="760" y="390" fontSize="11" fill="white">(10% bolus, remainder over 60 min)</text>
          <text x="760" y="410" fontSize="11" fill="white">Goals: NIHSS improvement, recanalization</text>

          {/* Arrow from tPA */}
          <line x1="835" y1="430" x2="835" y2="470" stroke="#333" strokeWidth="3" />

          {/* STEP 5: Thrombectomy Eligibility (LVO present) */}
          <rect x="700" y="470" width="270" height="140" rx="10" fill="url(#redGradStroke)" stroke="#991b1b" strokeWidth="2" />
          <circle cx="720" cy="500" r="14" fill="white" stroke="#991b1b" strokeWidth="2" />
          <text x="725" y="506" fontSize="14" fontWeight="bold" fill="#991b1b">5</text>
          <text x="760" y="500" fontSize="13" fontWeight="bold" fill="white">Mechanical Thrombectomy</text>
          <text x="760" y="525" fontSize="11" fill="white">If LVO confirmed + eligible:</text>
          <text x="760" y="545" fontSize="11" fill="white">• Standard: Within 24h of symptom onset</text>
          <text x="760" y="565" fontSize="11" fill="white">• Extended: 24h+ if perfusion mismatch</text>
          <text x="760" y="585" fontSize="11" fill="white">(DAWN/DEFUSE-3 criteria)</text>

          {/* Arrow down */}
          <line x1="835" y1="610" x2="835" y2="650" stroke="#333" strokeWidth="3" />

          {/* STEP 6: Reperfusion Success & Transfer */}
          <rect x="700" y="650" width="270" height="100" rx="10" fill="url(#orangeGradStroke)" stroke="#b45309" strokeWidth="2" />
          <circle cx="720" cy="675" r="14" fill="white" stroke="#b45309" strokeWidth="2" />
          <text x="725" y="681" fontSize="14" fontWeight="bold" fill="#b45309">6</text>
          <text x="760" y="675" fontSize="13" fontWeight="bold" fill="white">Outcome Assessment</text>
          <text x="760" y="700" fontSize="11" fill="white">• TICI 3/4 = complete reperfusion (best)</text>
          <text x="760" y="720" fontSize="11" fill="white">• If no LVO or failed: ICU monitoring</text>
          <text x="760" y="737" fontSize="11" fill="white">• Arrange transfer to comprehensive stroke center if needed</text>

          {/* Extended window pathway merge */}
          <line x1="250" y1="760" x2="400" y2="760" stroke="#7c3aed" strokeWidth="2" />

          {/* STEP 7: Extended Window (4.5-24h with Mismatch) */}
          <rect x="250" y="760" width="400" height="140" rx="10" fill="#f3f0ff" stroke="#7c3aed" strokeWidth="2" />
          <circle cx="275" cy="790" r="12" fill="white" stroke="#7c3aed" strokeWidth="2" />
          <text x="280" y="796" fontSize="13" fontWeight="bold" fill="#7c3aed">7</text>
          <text x="315" y="790" fontSize="13" fontWeight="bold" fill="#4c1d95">Extended Window Criteria</text>
          <text x="315" y="815" fontSize="11" fill="#4c1d95">DAWN Trial: Clinical-core mismatch (small infarct, large deficit)</text>
          <text x="315" y="835" fontSize="11" fill="#4c1d95">DEFUSE-3 Trial: Perfusion mismatch on imaging (DWI-PWI gap)</text>
          <text x="315" y="855" fontSize="11" fill="#4c1d95">If mismatch present: Consider thrombectomy up to 24h</text>
          <text x="315" y="875" fontSize="11" fill="#4c1d95">If no mismatch: Supportive care, thrombolysis NOT recommended</text>

          {/* Arrow down */}
          <line x1="450" y1="900" x2="450" y2="940" stroke="#333" strokeWidth="3" />

          {/* STEP 8: Post-Reperfusion Management */}
          <rect x="250" y="940" width="750" height="160" rx="10" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
          <circle cx="275" cy="970" r="12" fill="white" stroke="#0284c7" strokeWidth="2" />
          <text x="280" y="976" fontSize="13" fontWeight="bold" fill="#0284c7">8</text>
          <text x="315" y="970" fontSize="13" fontWeight="bold" fill="#0c4a6e">Post-Reperfusion Care (2024-25 Updates)</text>
          <text x="315" y="995" fontSize="11" fill="#0c4a6e">✓ BP Target (first 24h): {'<'}140/90 mmHg (reduce hemorrhage risk)</text>
          <text x="315" y="1015" fontSize="11" fill="#0c4a6e">✓ No-Reflow Phenomenon: Continuous monitoring for signs of re-occlusion</text>
          <text x="315" y="1035" fontSize="11" fill="#0c4a6e">✓ Hematoma Expansion Risk: Check repeat CT at 24h if tPA given or hemorrhage risk</text>
          <text x="315" y="1055" fontSize="11" fill="#0c4a6e">✓ Antiplatelet vs Anticoagulation: Aspirin 325mg if not treated; heparin NOT recommended post-thrombectomy</text>
          <text x="315" y="1075" fontSize="11" fill="#0c4a6e">✓ Neurovascular Checks: Serial NIHSS q30min × 2h, then q1h × 22h (detect deterioration)</text>

          {/* STEP 9: Contraindications & Exclusions */}
          <rect x="50" y="1130" width="900" height="160" rx="10" fill="#fee2e2" stroke="#991b1b" strokeWidth="2" />
          <circle cx="75" cy="1160" r="12" fill="white" stroke="#991b1b" strokeWidth="2" />
          <text x="80" y="1166" fontSize="13" fontWeight="bold" fill="#991b1b">9</text>
          <text x="120" y="1160" fontSize="13" fontWeight="bold" fill="#7f1d1d">Absolute Contraindications to tPA</text>
          <text x="120" y="1185" fontSize="11" fill="#7f1d1d">• Active hemorrhage or intracranial mass on imaging</text>
          <text x="120" y="1205" fontSize="11" fill="#7f1d1d">• Recent surgery/trauma (14 days), recent stroke/head injury</text>
          <text x="120" y="1225" fontSize="11" fill="#7f1d1d">• INR {'>'}1.7 on warfarin, platelets &lt;50 K on DOAC (need apixaban level if &lt;3h)</text>
          <text x="120" y="1245" fontSize="11" fill="#7f1d1d">• Glucose &lt;50 or {'>'}400 mg/dL, systolic BP {'>'}185 or diastolic {'>'}110 (must treat first)</text>
          <text x="120" y="1265" fontSize="11" fill="#7f1d1d">• Large ischemic change on CT ({'>'}1/3 MCA territory), seizure at onset</text>

          {/* Critical Boxes */}
          <rect x="50" y="1320" width="900" height="330" rx="10" fill="#f9fafb" stroke="#d1d5db" strokeWidth="2" />

          {/* Door-to-Needle Times */}
          <rect x="70" y="1340" width="410" height="140" rx="8" fill="#dbeafe" stroke="#0284c7" strokeWidth="2" />
          <text x="275" y="1365" fontSize="12" fontWeight="bold" fill="#0284c7" textAnchor="middle">CRITICAL TIME METRICS (Door-to-Needle/Wire)</text>
          <text x="80" y="1390" fontSize="10" fill="#0c4a6e">Door-to-CT: ≤10 min (2025 goal)</text>
          <text x="80" y="1408" fontSize="10" fill="#0c4a6e">Door-to-tPA: ≤60 min (ischemic stroke)</text>
          <text x="80" y="1426" fontSize="10" fill="#0c4a6e">Door-to-Groin (thrombectomy): ≤90 min from arrival</text>
          <text x="80" y="1444" fontSize="10" fill="#0c4a6e">Symptom Onset-to-Intervention: ≤4.5h tPA, ≤24h thrombectomy</text>
          <text x="80" y="1462" fontSize="10" fill="#0c4a6e">Every 30 min delay in treatment = worsening outcomes</text>

          {/* tPA Eligibility Criteria */}
          <rect x="510" y="1340" width="410" height="140" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="715" y="1365" fontSize="12" fontWeight="bold" fill="#d97706" textAnchor="middle">tPA INCLUSION CRITERIA</text>
          <text x="520" y="1390" fontSize="10" fill="#333">✓ Age ≥18 years</text>
          <text x="520" y="1408" fontSize="10" fill="#333">✓ Ischemic stroke within 4.5 hours of onset</text>
          <text x="520" y="1426" fontSize="10" fill="#333">✓ Non-contrast head CT: no hemorrhage</text>
          <text x="520" y="1444" fontSize="10" fill="#333">✓ BP control: SBP &lt;185 and DBP &lt;110 mmHg</text>
          <text x="520" y="1462" fontSize="10" fill="#333">✓ INR &lt;1.7, platelets ≥150 K (on anticoagulation: confirm suitable levels)</text>

          {/* Thrombectomy Criteria */}
          <rect x="70" y="1500" width="850" height="140" rx="8" fill="#f0fdf4" stroke="#15803d" strokeWidth="2" />
          <text x="295" y="1525" fontSize="12" fontWeight="bold" fill="#15803d" textAnchor="middle">MECHANICAL THROMBECTOMY CRITERIA</text>
          <text x="80" y="1550" fontSize="10" fill="#166534">✓ Large vessel occlusion (ICA, MCA-M1, basilar) confirmed on CTA/MRA</text>
          <text x="80" y="1568" fontSize="10" fill="#166534">✓ NIHSS ≥6 or proximal occlusion (even lower NIHSS may benefit)</text>
          <text x="80" y="1586" fontSize="10" fill="#166534">✓ Within 24 hours of symptom onset OR {'>'}24h with perfusion mismatch (DAWN/DEFUSE-3)</text>
          <text x="80" y="1604" fontSize="10" fill="#166534">✓ ASPECTS ≥6 on baseline CT (less extensive infarct = better outcomes)</text>
          <text x="80" y="1622" fontSize="10" fill="#166534">✓ Able to be treated within 2 hours of imaging in most comprehensive stroke centers</text>
        </svg>
      </div>

      {/* Key Takeaways */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Time-Critical Decisions
          </h4>
          <p className="text-sm text-blue-800">
            Door-to-CT ≤10min, tPA within 4.5h, thrombectomy up to 24h. Every minute delay increases
            disability risk.
          </p>
        </div>
        <div className="bg-red-50 border border-red-300 rounded-lg p-4">
          <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Imaging Priorities
          </h4>
          <p className="text-sm text-red-800">
            Non-contrast CT rules out hemorrhage. CTA detects LVO for thrombectomy candidacy. Perfusion
            imaging guides extended window decisions.
          </p>
        </div>
        <div className="bg-green-50 border border-green-300 rounded-lg p-4">
          <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Post-Reperfusion BP
          </h4>
          <p className="text-sm text-green-800">
            Target {'<'}140/90 mmHg for first 24 hours to reduce hematoma expansion risk and improve
            outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}
