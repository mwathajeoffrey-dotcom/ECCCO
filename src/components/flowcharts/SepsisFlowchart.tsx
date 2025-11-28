'use client';

import React from 'react';
import { Activity, Clock, Syringe, AlertTriangle } from 'lucide-react';

export function SepsisFlowchart() {
  return (
    <div className="w-full bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Surviving Sepsis 2024 Management Flowchart</h3>
      <p className="text-sm text-gray-600 mb-6">
        Decision pathways for sepsis recognition, bundle completion, and escalation per 2024 Surviving Sepsis Campaign guidelines.
      </p>

      {/* SVG Flowchart */}
      <div className="overflow-x-auto">
        <svg viewBox="0 0 1000 1600" className="w-full h-auto min-w-full">
          {/* Define gradients */}
          <defs>
            <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
            <linearGradient id="redGradSepsis" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fecaca" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fcd34d" />
            </linearGradient>
            <linearGradient id="greenGradSepsis" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d8b4fe" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* STEP 1: Recognize Sepsis */}
          <rect x="300" y="20" width="400" height="100" rx="15" fill="url(#orangeGrad)" stroke="#b45309" strokeWidth="2" />
          <text x="500" y="55" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle">Recognition: Suspected or Confirmed Infection</text>
          <text x="500" y="80" fontSize="12" fill="white" textAnchor="middle">+ SIRS (fever/hypothermia, HR {'>'}90, RR {'>'}20, WBC abnormal) OR qSOFA ≥2</text>
          <text x="500" y="100" fontSize="12" fill="white" textAnchor="middle">Lactate ≥2, abnormal BP, altered mental status, oliguria</text>

          {/* Arrow down */}
          <line x1="500" y1="120" x2="500" y2="160" stroke="#333" strokeWidth="3" />

          {/* STEP 2: First Hour Bundle */}
          <rect x="250" y="160" width="500" height="120" rx="15" fill="url(#redGradSepsis)" stroke="#991b1b" strokeWidth="3" />
          <circle cx="280" cy="185" r="18" fill="white" stroke="#991b1b" strokeWidth="2" />
          <text x="287" y="192" fontSize="16" fontWeight="bold" fill="#991b1b">1h</text>
          <text x="330" y="185" fontSize="16" fontWeight="bold" fill="white">SEPSIS BUNDLE (First Hour Critical)</text>
          <text x="330" y="210" fontSize="12" fill="white">✓ Blood cultures × 2 BEFORE antibiotics</text>
          <text x="330" y="232" fontSize="12" fill="white">✓ Obtain lactate level (baseline for prognosis)</text>
          <text x="330" y="254" fontSize="12" fill="white">✓ Broad-spectrum IV antibiotics within 1 hour (each hour delay = +7.6% mortality)</text>

          {/* Arrow down */}
          <line x1="500" y1="280" x2="500" y2="320" stroke="#333" strokeWidth="3" />

          {/* STEP 3: Fluid Resuscitation Decision */}
          <polygon points="500,320 600,380 500,440 400,380" fill="url(#yellowGrad)" stroke="#d97706" strokeWidth="2" />
          <text x="500" y="380" fontSize="14" fontWeight="bold" fill="#333" textAnchor="middle">Hypotensive?</text>
          <text x="500" y="400" fontSize="12" fill="#333" textAnchor="middle">(SBP {'<'}90)</text>

          {/* YES - Fluid Path */}
          <text x="650" y="385" fontSize="13" fontWeight="bold" fill="#dc2626">YES</text>
          <line x1="600" y1="380" x2="730" y2="380" stroke="#dc2626" strokeWidth="3" />

          {/* STEP 4: Fluid Bolus */}
          <rect x="730" y="330" width="230" height="100" rx="10" fill="url(#greenGradSepsis)" stroke="#15803d" strokeWidth="2" />
          <circle cx="750" cy="355" r="14" fill="white" stroke="#15803d" strokeWidth="2" />
          <text x="756" y="361" fontSize="14" fontWeight="bold" fill="#15803d">3h</text>
          <text x="790" y="355" fontSize="14" fontWeight="bold" fill="white">Fluid Bolus</text>
          <text x="790" y="375" fontSize="11" fill="white">30 mL/kg Lactated Ringer's</text>
          <text x="790" y="395" fontSize="11" fill="white">or Balanced Crystalloid</text>
          <text x="790" y="415" fontSize="11" fill="white">within 3 hours</text>

          {/* Arrow from bolus */}
          <line x1="845" y1="430" x2="845" y2="470" stroke="#333" strokeWidth="3" />

          {/* STEP 5: Reassess Fluid Response */}
          <polygon points="845,470 920,520 845,570 770,520" fill="url(#yellowGrad)" stroke="#d97706" strokeWidth="2" />
          <text x="845" y="520" fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">Fluid</text>
          <text x="845" y="535" fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">Responsive?</text>

          {/* Fluid responsive - YES */}
          <text x="930" y="525" fontSize="12" fontWeight="bold" fill="#059669">YES</text>
          <line x1="920" y1="520" x2="980" y2="520" stroke="#059669" strokeWidth="3" />
          <text x="985" y="480" fontSize="11" fill="#059669">Continue monitoring</text>

          {/* Not fluid responsive - NO */}
          <text x="700" y="525" fontSize="12" fontWeight="bold" fill="#dc2626">NO</text>
          <line x1="770" y1="520" x2="650" y2="520" stroke="#dc2626" strokeWidth="3" />

          {/* NO to hypotensive - go to Step 6 */}
          <text x="350" y="385" fontSize="13" fontWeight="bold" fill="#059669">NO (Stable)</text>
          <line x1="400" y1="380" x2="270" y2="380" stroke="#059669" strokeWidth="3" />
          <line x1="270" y1="380" x2="270" y2="630" stroke="#059669" strokeWidth="2" />

          {/* STEP 6: Vasopressor Decision */}
          <polygon points="650,470 720,520 650,570 580,520" fill="url(#yellowGrad)" stroke="#d97706" strokeWidth="2" />
          <text x="650" y="520" fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">MAP {'<'}65?</text>
          <text x="650" y="535" fontSize="11" fill="#333" textAnchor="middle">Despite fluids</text>

          {/* YES to vasopressor */}
          <text x="720" y="575" fontSize="12" fontWeight="bold" fill="#dc2626">YES</text>
          <line x1="650" y1="570" x2="650" y2="620" stroke="#dc2626" strokeWidth="3" />

          {/* STEP 7: Vasopressor Escalation */}
          <rect x="500" y="620" width="300" height="140" rx="10" fill="url(#purpleGrad)" stroke="#6b21a8" strokeWidth="2" />
          <circle cx="520" cy="640" r="12" fill="white" stroke="#6b21a8" strokeWidth="2" />
          <text x="525" y="645" fontSize="13" fontWeight="bold" fill="#6b21a8">6</text>
          <text x="555" y="640" fontSize="13" fontWeight="bold" fill="white">Vasopressor Ladder</text>
          <text x="555" y="660" fontSize="11" fill="white">1. Norepinephrine 0.01–3 mcg/kg/min</text>
          <text x="565" y="680" fontSize="11" fill="white">(Target MAP ≥65 mmHg)</text>
          <text x="555" y="705" fontSize="11" fill="white">2. + Vasopressin 0.03–0.04 units/min (if NE {'>'}0.25)</text>
          <text x="555" y="725" fontSize="11" fill="white">3. + Epinephrine 0.05–2 mcg/kg/min (last resort)</text>
          <text x="555" y="745" fontSize="11" fill="white">Avoid dopamine (high arrhythmia risk)</text>

          {/* Arrow from vasopressor */}
          <line x1="650" y1="760" x2="650" y2="800" stroke="#333" strokeWidth="3" />

          {/* Merge flows */}
          <line x1="270" y1="630" x2="650" y2="800" stroke="#666" strokeWidth="2" strokeDasharray="5,5" />

          {/* STEP 7-8: Source Control & Lactate Reassessment */}
          <rect x="450" y="800" width="400" height="140" rx="10" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
          <circle cx="475" cy="825" r="12" fill="white" stroke="#0284c7" strokeWidth="2" />
          <text x="480" y="830" fontSize="13" fontWeight="bold" fill="#0284c7">7-8</text>
          <text x="515" y="825" fontSize="13" fontWeight="bold" fill="#0c4a6e">Ongoing Management</text>
          <text x="515" y="850" fontSize="11" fill="#0c4a6e">✓ Source control: Urgent intervention if abscess, perforation, necrotizing infection</text>
          <text x="515" y="870" fontSize="11" fill="#0c4a6e">✓ Reassess lactate at 2-4h: ≥10% decrease = improved prognosis</text>
          <text x="515" y="890" fontSize="11" fill="#0c4a6e">✓ Continue antibiotics; switch to narrow-spectrum by 48h based on cultures</text>
          <text x="515" y="910" fontSize="11" fill="#0c4a6e">✓ Monitor temp, glucose {'<'}180, SOFA score for organ dysfunction</text>
          <text x="515" y="930" fontSize="11" fill="#0c4a6e">✓ Hydrocortisone 200 mg/day if refractory shock (despite adequate fluid + vasopressors)</text>

          {/* Arrow down */}
          <line x1="650" y1="940" x2="650" y2="980" stroke="#333" strokeWidth="3" />

          {/* STEP 9: ICU Monitoring */}
          <rect x="400" y="980" width="500" height="140" rx="10" fill="url(#orangeGrad)" stroke="#b45309" strokeWidth="2" />
          <circle cx="425" cy="1005" r="12" fill="white" stroke="#b45309" strokeWidth="2" />
          <text x="430" y="1010" fontSize="13" fontWeight="bold" fill="#b45309">9</text>
          <text x="470" y="1005" fontSize="13" fontWeight="bold" fill="white">ICU Care & Monitoring</text>
          <text x="470" y="1030" fontSize="11" fill="white">✓ Daily SOFA score (organ dysfunction severity): ↑SOFA = higher mortality</text>
          <text x="470" y="1050" fontSize="11" fill="white">✓ CRP & procalcitonin: Trending helps guide antibiotic duration (stop at 7-10d if improving)</text>
          <text x="470" y="1070" fontSize="11" fill="white">✓ Lactate clearance monitoring: Persistent elevation despite intervention = poor prognosis</text>
          <text x="470" y="1090" fontSize="11" fill="white">✓ Avoid fluid overload ({'>'}5L positive balance ↑ mortality, AKI, ARDS)</text>

          {/* Critical Boxes */}
          <rect x="50" y="1150" width="900" height="380" rx="10" fill="#f9fafb" stroke="#d1d5db" strokeWidth="2" />

          {/* Antibiotic Selection */}
          <rect x="70" y="1170" width="420" height="150" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="280" y="1195" fontSize="12" fontWeight="bold" fill="#d97706" textAnchor="middle">EMPIRIC ANTIBIOTIC SELECTION (Start within 1 hour)</text>
          <text x="80" y="1220" fontSize="10" fill="#333">Community-Acquired (CAP-Sepsis):</text>
          <text x="90" y="1237" fontSize="10" fill="#333">• 3rd gen cephalosporin (Ceftriaxone 2g Q12h) OR fluoroquinolone (Levofloxacin 750mg Q24h)</text>
          <text x="80" y="1255" fontSize="10" fill="#333">Hospital-Acquired (HAP/VAP):</text>
          <text x="90" y="1272" fontSize="10" fill="#333">• Broad-spectrum: Piperacillin-tazobactam OR Meropenem ± fluoroquinolone OR aminoglycoside</text>

          {/* Prognosis & SOFA */}
          <rect x="530" y="1170" width="420" height="150" rx="8" fill="#fee2e2" stroke="#991b1b" strokeWidth="2" />
          <text x="740" y="1195" fontSize="12" fontWeight="bold" fill="#991b1b" textAnchor="middle">SEPSIS SEVERITY & PROGNOSIS (SOFA Score)</text>
          <text x="540" y="1220" fontSize="10" fill="#333">SOFA 0-1: Low mortality (1-3%)</text>
          <text x="540" y="1237" fontSize="10" fill="#333">SOFA 2-3: Moderate mortality (5-15%)</text>
          <text x="540" y="1254" fontSize="10" fill="#333">SOFA ≥4: High mortality (50%+) - Consider ICU escalation</text>
          <text x="540" y="1271" fontSize="10" fill="#333">Lactate {'>'}4 mmol/L: 28d mortality {'>'}40% vs {'<'}2 mmol/L = 5% mortality</text>
          <text x="540" y="1288" fontSize="10" fill="#333">Lactate clearance: {'<'}10% at 6h predicts worse outcomes</text>

          {/* Fluid Response Assessment */}
          <rect x="70" y="1340" width="420" height="160" rx="8" fill="#f0fdf4" stroke="#15803d" strokeWidth="2" />
          <text x="280" y="1365" fontSize="12" fontWeight="bold" fill="#15803d" textAnchor="middle">ASSESS FLUID RESPONSIVENESS (2024 Update)</text>
          <text x="80" y="1390" fontSize="10" fill="#333">✓ Dynamic tests (preferred): Passive leg raise, fluid bolus challenge</text>
          <text x="80" y="1408" fontSize="10" fill="#333">✓ Monitor: MAP, HR, lactate, UOP, skin perfusion, capillary refill</text>
          <text x="80" y="1426" fontSize="10" fill="#333">✓ CLOVERS 2023 trial: Restrictive fluid strategy NON-INFERIOR to liberal</text>
          <text x="90" y="1444" fontSize="10" fill="#333">→ Avoid overload (fluid-positive {'>'}5L = worse outcomes per CLOVERS)</text>
          <text x="80" y="1462" fontSize="10" fill="#333">✓ Use balanced crystalloids (Lactated Ringer's or PlasmaLyte) vs saline</text>
          <text x="90" y="1480" fontSize="10" fill="#333">→ SMART 2018 trial: Balanced crystalloids ↓ mortality 10.3% vs 11.1% (saline)</text>

          {/* Vasopressor Details */}
          <rect x="530" y="1340" width="420" height="160" rx="8" fill="#f5f3ff" stroke="#6b21a8" strokeWidth="2" />
          <text x="740" y="1365" fontSize="12" fontWeight="bold" fill="#6b21a8" textAnchor="middle">VASOPRESSOR MANAGEMENT</text>
          <text x="540" y="1390" fontSize="10" fill="#333">Norepinephrine (first-line): SOAP II 2010 = superior to dopamine</text>
          <text x="540" y="1408" fontSize="10" fill="#333">• Dose: 0.01–3 mcg/kg/min, titrate to MAP ≥65 mmHg</text>
          <text x="540" y="1426" fontSize="10" fill="#333">Vasopressin (add-on): 0.03–0.04 units/min if NE {'>'}0.25 mcg/kg/min</text>
          <text x="540" y="1444" fontSize="10" fill="#333">Hydrocortisone: 200 mg/day in refractory septic shock (CORTICUS trial benefit)</text>
          <text x="540" y="1462" fontSize="10" fill="#333">Avoid Dopamine: ↑ arrhythmia risk (24% vs 12% NE), no mortality benefit</text>
          <text x="540" y="1480" fontSize="10" fill="#333">Monitoring: Reassess every 30-60 min; wean if MAP stable, lactate improving</text>
        </svg>
      </div>

      {/* Key Takeaways */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-300 rounded-lg p-4">
          <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Time-Critical Bundle
          </h4>
          <p className="text-sm text-red-800">
            Antibiotics within 1h, fluids within 3h, vasopressors to MAP ≥65. Each hour delay = +7.6% mortality
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-300 rounded-lg p-4">
          <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Lactate Monitoring
          </h4>
          <p className="text-sm text-orange-800">
            Baseline lactate, reassess 2-4h. ≥10% clearance = good prognosis. Persistent elevation = poor outcome
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-300 rounded-lg p-4">
          <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
            <Syringe className="w-5 h-5" />
            Balanced Approach
          </h4>
          <p className="text-sm text-purple-800">
            Balanced crystalloids {'>='} saline. Assess fluid responsiveness. Norepinephrine {'>'}dopamine. Avoid overload
          </p>
        </div>
      </div>
    </div>
  );
}
