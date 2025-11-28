'use client';

import React from 'react';
import { Zap, AlertCircle, Heart } from 'lucide-react';

export function ACLSFlowchart() {
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-red-50 rounded-xl p-8 border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">2025 ACLS Cardiac Arrest Algorithm – VF/pVT Pathway</h3>
      <p className="text-sm text-gray-600 mb-6">
        Interactive flowchart for ventricular fibrillation and pulseless ventricular tachycardia (VF/pVT) management per 2025 AHA guidelines.
      </p>

      {/* SVG Flowchart */}
      <div className="overflow-x-auto">
        <svg viewBox="0 0 1000 1400" className="w-full h-auto min-w-full">
          {/* Define gradients */}
          <defs>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fecaca" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="grayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e5e7eb" />
              <stop offset="100%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>

          {/* STEP 1: Start CPR */}
          <rect x="350" y="20" width="300" height="80" rx="15" fill="url(#blueGrad)" stroke="#1e40af" strokeWidth="2" />
          <circle cx="370" cy="45" r="15" fill="white" stroke="#1e40af" strokeWidth="2" />
          <text x="380" y="50" fontSize="18" fontWeight="bold" fill="#1e40af">1</text>
          <text x="450" y="50" fontSize="16" fontWeight="bold" fill="white">Start CPR</text>
          <text x="450" y="70" fontSize="13" fill="white">Give oxygen • Attach monitor/defibrillator</text>

          {/* Arrow down */}
          <line x1="500" y1="100" x2="500" y2="140" stroke="#333" strokeWidth="3" markerEnd="url(#arrowhead)" />

          {/* STEP 2: Rhythm decision */}
          <polygon points="500,140 600,200 500,260 400,200" fill="url(#redGrad)" stroke="#991b1b" strokeWidth="2" />
          <text x="500" y="205" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">
            Rhythm
          </text>
          <text x="500" y="225" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">
            shockable?
          </text>

          {/* YES path - left */}
          <text x="350" y="290" fontSize="14" fontWeight="bold" fill="#dc2626">YES</text>
          <line x1="430" y1="240" x2="300" y2="300" stroke="#dc2626" strokeWidth="3" />

          {/* NO path - right */}
          <text x="650" y="290" fontSize="14" fontWeight="bold" fill="#059669">NO</text>
          <line x1="570" y1="240" x2="700" y2="300" stroke="#059669" strokeWidth="3" />

          {/* LEFT BRANCH: VF/pVT */}
          <rect x="200" y="300" width="200" height="70" rx="10" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
          <text x="300" y="325" fontSize="18" fontWeight="bold" fill="#4f46e5" textAnchor="middle">VF/pVT</text>
          <text x="300" y="350" fontSize="13" fill="#4f46e5" textAnchor="middle">(Steps 2–8)</text>

          {/* Arrow down from VF */}
          <line x1="300" y1="370" x2="300" y2="410" stroke="#333" strokeWidth="3" />

          {/* STEP 3: First Shock */}
          <rect x="200" y="410" width="200" height="70" rx="10" fill="url(#redGrad)" stroke="#991b1b" strokeWidth="2" />
          <text x="300" y="440" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle">⚡ SHOCK</text>
          <text x="300" y="465" fontSize="12" fill="white" textAnchor="middle">(Step 3)</text>

          {/* Arrow down */}
          <line x1="300" y1="480" x2="300" y2="520" stroke="#333" strokeWidth="3" />

          {/* STEP 4: CPR 2 min */}
          <rect x="200" y="520" width="200" height="80" rx="10" fill="url(#blueGrad)" stroke="#1e40af" strokeWidth="2" />
          <circle cx="220" cy="535" r="12" fill="white" stroke="#1e40af" strokeWidth="2" />
          <text x="225" y="540" fontSize="14" fontWeight="bold" fill="#1e40af">4</text>
          <text x="250" y="540" fontSize="13" fontWeight="bold" fill="white">CPR 2 min</text>
          <text x="250" y="560" fontSize="11" fill="white">• IV/IO access</text>
          <text x="250" y="578" fontSize="11" fill="white">• Epinephrine every 3-5 min</text>

          {/* Arrow down */}
          <line x1="300" y1="600" x2="300" y2="640" stroke="#333" strokeWidth="3" />

          {/* Check rhythm again */}
          <polygon points="300,640 380,700 300,760 220,700" fill="url(#redGrad)" stroke="#991b1b" strokeWidth="2" />
          <text x="300" y="705" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Rhythm</text>
          <text x="300" y="725" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">shockable?</text>

          {/* YES - Shock again */}
          <text x="320" y="795" fontSize="12" fontWeight="bold" fill="#dc2626">YES</text>
          <line x1="340" y1="750" x2="420" y2="800" stroke="#dc2626" strokeWidth="3" />

          {/* STEP 5-8: Shock loop */}
          <rect x="420" y="800" width="140" height="60" rx="8" fill="url(#redGrad)" stroke="#991b1b" strokeWidth="2" />
          <circle cx="432" cy="812" r="10" fill="white" stroke="#991b1b" strokeWidth="2" />
          <text x="437" y="817" fontSize="12" fontWeight="bold" fill="#991b1b">5,7</text>
          <text x="460" y="817" fontSize="12" fontWeight="bold" fill="white">SHOCK</text>
          <text x="460" y="833" fontSize="10" fill="white">CPR 2 min (Steps 6,8)</text>
          <text x="460" y="848" fontSize="10" fill="white">Amiodarone/Lidocaine</text>

          {/* NO - Asystole/PEA (Right branch) */}
          <text x="150" y="795" fontSize="12" fontWeight="bold" fill="#059669">NO</text>
          <line x1="270" y1="750" x2="150" y2="800" stroke="#059669" strokeWidth="3" />

          {/* RIGHT BRANCH: Asystole/PEA */}
          <rect x="700" y="300" width="200" height="70" rx="10" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="2" />
          <text x="800" y="330" fontSize="16" fontWeight="bold" fill="#7c3aed" textAnchor="middle">Asystole/PEA</text>
          <text x="800" y="350" fontSize="13" fill="#7c3aed" textAnchor="middle">(Steps 9–11)</text>

          {/* Arrow down */}
          <line x1="800" y1="370" x2="800" y2="410" stroke="#333" strokeWidth="3" />

          {/* STEP 10: Epinephrine AAP */}
          <rect x="700" y="410" width="200" height="70" rx="10" fill="url(#redGrad)" stroke="#991b1b" strokeWidth="2" />
          <circle cx="720" cy="425" r="12" fill="white" stroke="#991b1b" strokeWidth="2" />
          <text x="725" y="430" fontSize="14" fontWeight="bold" fill="#991b1b">10</text>
          <text x="750" y="430" fontSize="13" fontWeight="bold" fill="white">Epinephrine AAP</text>
          <text x="750" y="450" fontSize="11" fill="white">• IV/IO access</text>
          <text x="750" y="468" fontSize="11" fill="white">• Epinephrine every 3-5 min</text>

          {/* Arrow down */}
          <line x1="800" y1="480" x2="800" y2="520" stroke="#333" strokeWidth="3" />

          {/* STEP 11: CPR 2 min */}
          <rect x="700" y="520" width="200" height="60" rx="10" fill="url(#blueGrad)" stroke="#1e40af" strokeWidth="2" />
          <circle cx="720" cy="535" r="12" fill="white" stroke="#1e40af" strokeWidth="2" />
          <text x="725" y="540" fontSize="14" fontWeight="bold" fill="#1e40af">11</text>
          <text x="750" y="540" fontSize="13" fontWeight="bold" fill="white">CPR 2 min</text>
          <text x="750" y="560" fontSize="11" fill="white">Treat reversible causes</text>

          {/* Arrow down */}
          <line x1="800" y1="580" x2="800" y2="620" stroke="#333" strokeWidth="3" />

          {/* Check rhythm again */}
          <polygon points="800,620 880,680 800,740 720,680" fill="url(#redGrad)" stroke="#991b1b" strokeWidth="2" />
          <text x="800" y="685" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Rhythm</text>
          <text x="800" y="705" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">shockable?</text>

          {/* Loop back */}
          <text x="820" y="775" fontSize="12" fontWeight="bold" fill="#059669">YES</text>
          <line x1="800" y1="740" x2="800" y2="800" stroke="#059669" strokeWidth="3" />
          <line x1="800" y1="800" x2="560" y2="830" stroke="#059669" strokeWidth="3" />
          <text x="650" y="815" fontSize="11" fill="#059669">Go to 5 or 7</text>

          {/* NO - Continue asystole path */}
          <text x="650" y="775" fontSize="12" fontWeight="bold" fill="#059669">NO</text>
          <line x1="740" y1="740" x2="650" y2="800" stroke="#059669" strokeWidth="3" />

          {/* STEP 12: Final decision */}
          <rect x="550" y="800" width="300" height="120" rx="10" fill="url(#grayGrad)" stroke="#666" strokeWidth="2" />
          <circle cx="570" cy="820" r="12" fill="white" stroke="#666" strokeWidth="2" />
          <text x="575" y="825" fontSize="14" fontWeight="bold" fill="#333">12</text>
          <text x="600" y="820" fontSize="12" fontWeight="bold" fill="#333">If no signs of ROSC:</text>
          <text x="600" y="840" fontSize="11" fill="#333">→ Go to Step 10 or 11</text>
          <text x="600" y="858" fontSize="12" fontWeight="bold" fill="#333">If ROSC achieved:</text>
          <text x="600" y="876" fontSize="11" fill="#333">→ Post-Cardiac Arrest Care</text>
          <text x="600" y="894" fontSize="11" fill="#333">→ Consider appropriateness of continued resuscitation</text>

          {/* Post-ROSC Care Box */}
          <rect x="550" y="950" width="400" height="100" rx="10" fill="url(#greenGrad)" stroke="#15803d" strokeWidth="2" />
          <text x="750" y="975" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">POST-ROSC CARE (2025 Updates)</text>
          <text x="560" y="998" fontSize="11" fill="white">✓ Targeted Temperature Management (TTM): 37.5°C (normothermia) non-inferior to hypothermia</text>
          <text x="560" y="1018" fontSize="11" fill="white">✓ MAP ≥65 mmHg, SpO₂ 92–98% (avoid hyperoxia), glucose {'<'}180 mg/dL</text>
          <text x="560" y="1038" fontSize="11" fill="white">✓ ETCO₂ monitoring: {'>'}20 mmHg suggests adequate perfusion; {'<'}10 mmHg at 20 min = poor prognosis</text>

          {/* CPR Quality Box */}
          <rect x="50" y="950" width="450" height="100" rx="10" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
          <text x="275" y="975" fontSize="14" fontWeight="bold" fill="#0284c7" textAnchor="middle">CPR QUALITY METRICS (2025 AHA)</text>
          <text x="60" y="998" fontSize="11" fill="#0c4a6e">• Push hard ≥2 inches (5 cm) at 100–120 compressions/min with complete recoil</text>
          <text x="60" y="1018" fontSize="11" fill="#0c4a6e">• Minimize interruptions {'<'}10 sec; target compression fraction {'>'}80%</text>
          <text x="60" y="1038" fontSize="11" fill="#0c4a6e">• Rotate compressor every 2 minutes if fatigued; use capnography for real-time feedback</text>

          {/* Legend */}
          <rect x="50" y="1080" width="900" height="280" rx="10" fill="#f9fafb" stroke="#d1d5db" strokeWidth="2" />
          <text x="500" y="1105" fontSize="14" fontWeight="bold" fill="#111" textAnchor="middle">REFERENCE GUIDE & REVERSIBLE CAUSES</text>

          <text x="60" y="1135" fontSize="12" fontWeight="bold" fill="#dc2626">Shock Energy:</text>
          <text x="60" y="1153" fontSize="11" fill="#374151">• Biphasic Manual: 120–200 J (initial), then 120–200 J (subsequent)</text>
          <text x="60" y="1170" fontSize="11" fill="#374151">• Monophasic: 360 J (all shocks)</text>

          <text x="60" y="1195" fontSize="12" fontWeight="bold" fill="#dc2626">Epinephrine Dosing:</text>
          <text x="60" y="1213" fontSize="11" fill="#374151">• Initial: 1 mg IV/IO every 3–5 minutes</text>
          <text x="60" y="1230" fontSize="11" fill="#374151">• High-dose epinephrine (HDE): NOT recommended (no benefit over standard dose)</text>

          <text x="60" y="1255" fontSize="12" fontWeight="bold" fill="#dc2626">Antiarrhythmics:</text>
          <text x="60" y="1273" fontSize="11" fill="#374151">• Amiodarone: 300 mg IV/IO after 3rd shock, then 150 mg</text>
          <text x="60" y="1290" fontSize="11" fill="#374151">• Lidocaine: 1–1.5 mg/kg IV/IO (alternative if Amiodarone unavailable)</text>

          <text x="60" y="1315" fontSize="12" fontWeight="bold" fill="#059669">4 Hs & 4 Ts (Reversible Causes):</text>
          <text x="60" y="1333" fontSize="11" fill="#374151">• Hypovolemia • Hypoxia • Hydrogen ion (acidosis) • Hypo-/hyperkalemia</text>
          <text x="60" y="1350" fontSize="11" fill="#374151">• Tension pneumothorax • Tamponade • Thrombosis (PE, MI) • Toxins</text>
        </svg>
      </div>

      {/* Key Takeaways */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            VF/pVT (Shockable)
          </h4>
          <p className="text-sm text-blue-800">
            Shock → CPR 2 min → Epi/Amio → Repeat every 2 minutes. Best outcomes: early shock + high-quality CPR
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-300 rounded-lg p-4">
          <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Asystole/PEA (Non-Shockable)
          </h4>
          <p className="text-sm text-purple-800">
            High-quality CPR + Epi every 3-5 min. Treat reversible causes (4 Hs, 4 Ts). Prognosis: much worse than VF
          </p>
        </div>
        <div className="bg-green-50 border border-green-300 rounded-lg p-4">
          <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Post-ROSC
          </h4>
          <p className="text-sm text-green-800">
            TTM (37.5°C), MAP ≥65, SpO₂ 92–98%, glucose control. Neurologic prognosis: wait 72h post-TTM.
          </p>
        </div>
      </div>
    </div>
  );
}
