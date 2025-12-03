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
          <text x="500" y="55" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Recognize: Suspected/Confirmed Infection</text>
          <text x="500" y="73" fontSize="10" fill="white" textAnchor="middle">+ SIRS (fever/hypothermia, HR {'>'}90, RR {'>'}20)</text>
          <text x="500" y="88" fontSize="10" fill="white" textAnchor="middle">+ qSOFA ≥2: Lactate ≥2, abnormal BP,</text>
          <text x="500" y="103" fontSize="10" fill="white" textAnchor="middle">altered mental status, oliguria</text>

          {/* Arrow down */}
          <line x1="500" y1="120" x2="500" y2="160" stroke="#333" strokeWidth="3" />

          {/* STEP 2: First Hour Bundle */}
          <rect x="250" y="160" width="500" height="140" rx="15" fill="url(#redGradSepsis)" stroke="#991b1b" strokeWidth="3" />
          <circle cx="280" cy="185" r="18" fill="white" stroke="#991b1b" strokeWidth="2" />
          <text x="287" y="192" fontSize="16" fontWeight="bold" fill="#991b1b">1h</text>
          <text x="330" y="185" fontSize="14" fontWeight="bold" fill="white">SEPSIS BUNDLE (First Hour Critical)</text>
          <text x="330" y="205" fontSize="10" fill="white">✓ Blood cultures × 2 BEFORE</text>
          <text x="330" y="220" fontSize="10" fill="white">antibiotics</text>
          <text x="330" y="236" fontSize="10" fill="white">✓ Obtain lactate level (baseline for</text>
          <text x="330" y="251" fontSize="10" fill="white">prognosis)</text>
          <text x="330" y="267" fontSize="10" fill="white">✓ Broad-spectrum IV antibiotics</text>
          <text x="330" y="282" fontSize="10" fill="white">within 1h (each delay = +7.6%</text>
          <text x="330" y="297" fontSize="10" fill="white">mortality)</text>

          {/* Arrow down */}
          <line x1="500" y1="300" x2="500" y2="340" stroke="#333" strokeWidth="3" />

          {/* STEP 3: Fluid Resuscitation Decision */}
          <polygon points="500,340 600,400 500,460 400,400" fill="url(#yellowGrad)" stroke="#d97706" strokeWidth="2" />
          <text x="500" y="400" fontSize="14" fontWeight="bold" fill="#333" textAnchor="middle">Hypotensive?</text>
          <text x="500" y="420" fontSize="12" fill="#333" textAnchor="middle">(SBP {'<'}90)</text>

          {/* YES - Fluid Path */}
          <text x="650" y="405" fontSize="13" fontWeight="bold" fill="#dc2626">YES</text>
          <line x1="600" y1="400" x2="730" y2="400" stroke="#dc2626" strokeWidth="3" />

          {/* STEP 4: Fluid Bolus */}
          <rect x="730" y="350" width="230" height="100" rx="10" fill="url(#greenGradSepsis)" stroke="#15803d" strokeWidth="2" />
          <circle cx="750" cy="375" r="14" fill="white" stroke="#15803d" strokeWidth="2" />
          <text x="756" y="381" fontSize="14" fontWeight="bold" fill="#15803d">3h</text>
          <text x="790" y="375" fontSize="14" fontWeight="bold" fill="white">Fluid Bolus</text>
          <text x="790" y="395" fontSize="10" fill="white">30 mL/kg Lactated Ringer's</text>
          <text x="790" y="411" fontSize="10" fill="white">or Balanced Crystalloid</text>
          <text x="790" y="427" fontSize="10" fill="white">within 3 hours</text>

          {/* Arrow from bolus */}
          <line x1="845" y1="450" x2="845" y2="490" stroke="#333" strokeWidth="3" />

          {/* STEP 5: Reassess Fluid Response */}
          <polygon points="845,490 920,540 845,590 770,540" fill="url(#yellowGrad)" stroke="#d97706" strokeWidth="2" />
          <text x="845" y="540" fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">Fluid</text>
          <text x="845" y="555" fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">Responsive?</text>

          {/* Fluid responsive - YES */}
          <text x="930" y="545" fontSize="12" fontWeight="bold" fill="#059669">YES</text>
          <line x1="920" y1="540" x2="980" y2="540" stroke="#059669" strokeWidth="3" />
          <text x="985" y="500" fontSize="11" fill="#059669">Continue monitoring</text>

          {/* Not fluid responsive - NO */}
          <text x="700" y="545" fontSize="12" fontWeight="bold" fill="#dc2626">NO</text>
          <line x1="770" y1="540" x2="650" y2="540" stroke="#dc2626" strokeWidth="3" />

          {/* NO to hypotensive - go to Step 6 */}
          <text x="350" y="405" fontSize="13" fontWeight="bold" fill="#059669">NO (Stable)</text>
          <line x1="400" y1="400" x2="270" y2="400" stroke="#059669" strokeWidth="3" />
          <line x1="270" y1="400" x2="270" y2="660" stroke="#059669" strokeWidth="2" />

          {/* STEP 6: Vasopressor Decision */}
          <polygon points="650,490 720,540 650,590 580,540" fill="url(#yellowGrad)" stroke="#d97706" strokeWidth="2" />
          <text x="650" y="540" fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">MAP {'<'}65?</text>
          <text x="650" y="555" fontSize="11" fill="#333" textAnchor="middle">Despite fluids</text>

          {/* YES to vasopressor */}
          <text x="720" y="595" fontSize="12" fontWeight="bold" fill="#dc2626">YES</text>
          <line x1="650" y1="590" x2="650" y2="640" stroke="#dc2626" strokeWidth="3" />

          {/* STEP 7: Vasopressor Escalation */}
          <rect x="500" y="640" width="300" height="160" rx="10" fill="url(#purpleGrad)" stroke="#6b21a8" strokeWidth="2" />
          <circle cx="520" cy="660" r="12" fill="white" stroke="#6b21a8" strokeWidth="2" />
          <text x="525" y="665" fontSize="13" fontWeight="bold" fill="#6b21a8">6</text>
          <text x="555" y="660" fontSize="13" fontWeight="bold" fill="white">Vasopressor Ladder</text>
          <text x="555" y="680" fontSize="10" fill="white">1. Norepinephrine 0.01–3 mcg/kg/min</text>
          <text x="565" y="696" fontSize="10" fill="white">(Target MAP ≥65 mmHg)</text>
          <text x="555" y="716" fontSize="10" fill="white">2. + Vasopressin 0.03–0.04 U/min</text>
          <text x="565" y="732" fontSize="10" fill="white">(if NE {'>'}0.25)</text>
          <text x="555" y="752" fontSize="10" fill="white">3. + Epinephrine 0.05–2 mcg/kg/min</text>
          <text x="565" y="768" fontSize="10" fill="white">(last resort)</text>
          <text x="555" y="788" fontSize="10" fill="white">Avoid dopamine (high arrhythmia)</text>

          {/* Arrow from vasopressor */}
          <line x1="650" y1="800" x2="650" y2="840" stroke="#333" strokeWidth="3" />

          {/* Merge flows */}
          <line x1="270" y1="660" x2="650" y2="840" stroke="#666" strokeWidth="2" strokeDasharray="5,5" />

          {/* STEP 7-8: Source Control & Lactate Reassessment */}
          <rect x="450" y="840" width="400" height="160" rx="10" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
          <circle cx="475" cy="865" r="12" fill="white" stroke="#0284c7" strokeWidth="2" />
          <text x="480" y="870" fontSize="13" fontWeight="bold" fill="#0284c7">7-8</text>
          <text x="515" y="865" fontSize="13" fontWeight="bold" fill="#0c4a6e">Ongoing Management</text>
          <text x="515" y="890" fontSize="10" fill="#0c4a6e">✓ Source control: Urgent intervention if</text>
          <text x="515" y="906" fontSize="10" fill="#0c4a6e">abscess, perforation, necrotizing</text>
          <text x="515" y="922" fontSize="10" fill="#0c4a6e">✓ Reassess lactate 2-4h: ≥10%</text>
          <text x="515" y="938" fontSize="10" fill="#0c4a6e">decrease = improved prognosis</text>
          <text x="515" y="954" fontSize="10" fill="#0c4a6e">✓ Narrow-spectrum antibiotics by 48h</text>
          <text x="515" y="970" fontSize="10" fill="#0c4a6e">based on cultures; hydrocortisone 200</text>
          <text x="515" y="986" fontSize="10" fill="#0c4a6e">mg/day if refractory shock</text>

          {/* Arrow down */}
          <line x1="650" y1="1000" x2="650" y2="1040" stroke="#333" strokeWidth="3" />

          {/* STEP 9: ICU Monitoring */}
          <rect x="400" y="1040" width="500" height="140" rx="10" fill="url(#orangeGrad)" stroke="#b45309" strokeWidth="2" />
          <circle cx="425" cy="1065" r="12" fill="white" stroke="#b45309" strokeWidth="2" />
          <text x="430" y="1070" fontSize="13" fontWeight="bold" fill="#b45309">9</text>
          <text x="470" y="1065" fontSize="13" fontWeight="bold" fill="white">ICU Care & Monitoring</text>
          <text x="470" y="1090" fontSize="10" fill="white">✓ Daily SOFA score: ↑SOFA = higher</text>
          <text x="470" y="1106" fontSize="10" fill="white">mortality</text>
          <text x="470" y="1122" fontSize="10" fill="white">✓ CRP & procalcitonin trending guides</text>
          <text x="470" y="1138" fontSize="10" fill="white">antibiotic duration (stop 7-10d if</text>
          <text x="470" y="1154" fontSize="10" fill="white">improving)</text>

          {/* Critical Boxes */}
          <rect x="50" y="1210" width="900" height="380" rx="10" fill="#f9fafb" stroke="#d1d5db" strokeWidth="2" />

          {/* Antibiotic Selection */}
          <rect x="70" y="1230" width="420" height="150" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="280" y="1255" fontSize="12" fontWeight="bold" fill="#d97706" textAnchor="middle">EMPIRIC ANTIBIOTIC SELECTION</text>
          <text x="280" y="1271" fontSize="10" fill="#d97706" textAnchor="middle">(Start within 1 hour)</text>
          <text x="80" y="1295" fontSize="10" fill="#333">Community-Acquired (CAP-Sepsis):</text>
          <text x="90" y="1312" fontSize="10" fill="#333">• 3rd gen cephalosporin (Ceftriaxone</text>
          <text x="95" y="1328" fontSize="10" fill="#333">2g Q12h) OR fluoroquinolone</text>
          <text x="80" y="1344" fontSize="10" fill="#333">Hospital-Acquired (HAP/VAP):</text>
          <text x="90" y="1361" fontSize="10" fill="#333">• Broad-spectrum: Piperacillin-tazobactam</text>
          <text x="95" y="1377" fontSize="10" fill="#333">OR Meropenem ± fluoroquinolone</text>

          {/* Prognosis & SOFA */}
          <rect x="530" y="1230" width="420" height="150" rx="8" fill="#fee2e2" stroke="#991b1b" strokeWidth="2" />
          <text x="740" y="1255" fontSize="12" fontWeight="bold" fill="#991b1b" textAnchor="middle">SEPSIS SEVERITY & PROGNOSIS</text>
          <text x="740" y="1271" fontSize="10" fill="#991b1b" textAnchor="middle">(SOFA Score)</text>
          <text x="540" y="1295" fontSize="10" fill="#333">SOFA 0-1: Low mortality (1-3%)</text>
          <text x="540" y="1312" fontSize="10" fill="#333">SOFA 2-3: Moderate mortality (5-15%)</text>
          <text x="540" y="1328" fontSize="10" fill="#333">SOFA ≥4: High mortality (50%+)</text>
          <text x="540" y="1344" fontSize="10" fill="#333">Lactate {'>'}4 mmol/L: 28d mortality</text>
          <text x="540" y="1360" fontSize="10" fill="#333">{'>'}40% vs {'<'}2 mmol/L = 5%</text>

          {/* Fluid Response Assessment */}
          <rect x="70" y="1400" width="420" height="170" rx="8" fill="#f0fdf4" stroke="#15803d" strokeWidth="2" />
          <text x="280" y="1425" fontSize="12" fontWeight="bold" fill="#15803d" textAnchor="middle">ASSESS FLUID RESPONSIVENESS</text>
          <text x="280" y="1441" fontSize="10" fill="#15803d" textAnchor="middle">(2024 Update)</text>
          <text x="80" y="1465" fontSize="10" fill="#333">✓ Dynamic tests: Passive leg raise,</text>
          <text x="80" y="1481" fontSize="10" fill="#333">fluid bolus challenge</text>
          <text x="80" y="1497" fontSize="10" fill="#333">✓ Monitor: MAP, HR, lactate, UOP,</text>
          <text x="80" y="1513" fontSize="10" fill="#333">skin perfusion, capillary refill</text>
          <text x="80" y="1529" fontSize="10" fill="#333">✓ CLOVERS 2023: Restrictive fluid</text>
          <text x="80" y="1545" fontSize="10" fill="#333">NON-INFERIOR to liberal; avoid</text>
          <text x="80" y="1561" fontSize="10" fill="#333">overload ({'>'}5L = worse outcomes)</text>

          {/* Vasopressor Details */}
          <rect x="530" y="1400" width="420" height="170" rx="8" fill="#f5f3ff" stroke="#6b21a8" strokeWidth="2" />
          <text x="740" y="1425" fontSize="12" fontWeight="bold" fill="#6b21a8" textAnchor="middle">VASOPRESSOR MANAGEMENT</text>
          <text x="540" y="1450" fontSize="10" fill="#333">Norepinephrine (first-line):</text>
          <text x="540" y="1466" fontSize="10" fill="#333">0.01–3 mcg/kg/min, titrate MAP ≥65</text>
          <text x="540" y="1482" fontSize="10" fill="#333">Vasopressin (add-on):</text>
          <text x="540" y="1498" fontSize="10" fill="#333">0.03–0.04 U/min if NE {'>'}0.25</text>
          <text x="540" y="1514" fontSize="10" fill="#333">Hydrocortisone: 200 mg/day in</text>
          <text x="540" y="1530" fontSize="10" fill="#333">refractory septic shock</text>
          <text x="540" y="1546" fontSize="10" fill="#333">Avoid dopamine: ↑ arrhythmia,</text>
          <text x="540" y="1562" fontSize="10" fill="#333">no mortality benefit</text>
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
