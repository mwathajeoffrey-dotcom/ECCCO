'use client';

import React from 'react';
import { Heart, Zap, AlertCircle, Clock } from 'lucide-react';

export function ACLSTachycardiaFlowchart() {
  return (
    <div className="w-full bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">ACLS: Tachycardia Algorithm</h3>
      <p className="text-sm text-gray-600 mb-6">
        2025 AHA ACLS guidelines for stable and unstable tachycardia with ECG-guided synchronization and medication pathways.
      </p>

      {/* SVG Flowchart */}
      <div className="overflow-x-auto">
        <svg viewBox="0 0 1000 1600" className="w-full h-auto min-w-full">
          {/* Define gradients */}
          <defs>
            <linearGradient id="orangeGradTach" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
            <linearGradient id="redGradTach" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fecaca" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <linearGradient id="yellowGradTach" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fcd34d" />
            </linearGradient>
            <linearGradient id="blueGradTach" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bfdbfe" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="greenGradTach" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          {/* STEP 1: Recognize Tachycardia */}
          <rect x="250" y="20" width="500" height="100" rx="15" fill="url(#orangeGradTach)" stroke="#b45309" strokeWidth="2" />
          <text x="270" y="55" fontSize="17" fontWeight="bold" fill="white" textAnchor="start">
            Tachycardia: HR {'>'}100 bpm
          </text>
          <text x="270" y="75" fontSize="11" fill="white" textAnchor="start">
            Assess: Is patient stable or unstable?
          </text>
          <text x="270" y="91" fontSize="11" fill="white" textAnchor="start">
            Stable = normal BP, alert; Unstable = low BP, altered status
          </text>

          {/* Arrow down */}
          <line x1="500" y1="120" x2="500" y2="160" stroke="#333" strokeWidth="3" />

          {/* STEP 2: Stable vs Unstable */}
          <polygon points="500,160 600,220 500,280 400,220" fill="url(#yellowGradTach)" stroke="#d97706" strokeWidth="3" />
          <text x="500" y="215" fontSize="14" fontWeight="bold" fill="#333" textAnchor="middle">Patient Stable?</text>
          <text x="500" y="235" fontSize="12" fill="#333" textAnchor="middle">(BP, mental status, perfusion)</text>

          {/* UNSTABLE - Synchronized Cardioversion */}
          <text x="350" y="225" fontSize="13" fontWeight="bold" fill="#dc2626">UNSTABLE</text>
          <line x1="400" y1="220" x2="250" y2="220" stroke="#dc2626" strokeWidth="3" />

          {/* STABLE - Continue to diagnosis */}
          <text x="650" y="225" fontSize="13" fontWeight="bold" fill="#059669">STABLE</text>
          <line x1="600" y1="220" x2="750" y2="220" stroke="#059669" strokeWidth="3" />

          {/* UNSTABLE PATH: Synchronized Cardioversion */}
          <rect x="50" y="170" width="200" height="100" rx="10" fill="url(#redGradTach)" stroke="#991b1b" strokeWidth="2" />
          <circle cx="70" cy="195" r="12" fill="white" stroke="#991b1b" strokeWidth="2" />
          <text x="75" y="201" fontSize="12" fontWeight="bold" fill="#991b1b">3U</text>
          <text x="110" y="195" fontSize="11" fontWeight="bold" fill="white">SYNC</text>
          <text x="110" y="210" fontSize="11" fontWeight="bold" fill="white">CARDIO</text>
          <text x="110" y="225" fontSize="11" fontWeight="bold" fill="white">VERSION</text>
          <text x="110" y="245" fontSize="9" fill="white">100–360 J</text>

          {/* STABLE PATH: Regular vs Irregular */}
          <polygon points="750,160 850,220 750,280 650,220" fill="url(#yellowGradTach)" stroke="#d97706" strokeWidth="2" />
          <text x="750" y="215" fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">Regular or</text>
          <text x="750" y="232" fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">Irregular?</text>

          {/* REGULAR - Narrow or Wide QRS */}
          <text x="780" y="285" fontSize="12" fontWeight="bold" fill="#059669">REGULAR</text>
          <line x1="750" y1="280" x2="750" y2="320" stroke="#059669" strokeWidth="3" />

          {/* IRREGULAR - Atrial Fibrillation Path */}
          <text x="700" y="190" fontSize="12" fontWeight="bold" fill="#059669">IRREGULAR</text>
          <line x1="650" y1="220" x2="550" y2="220" stroke="#059669" strokeWidth="2" />
          <line x1="550" y1="220" x2="550" y2="400" stroke="#059669" strokeWidth="2" />

          {/* STEP 4: Narrow vs Wide QRS (Regular) */}
          <polygon points="750,320 850,380 750,440 650,380" fill="url(#yellowGradTach)" stroke="#d97706" strokeWidth="2" />
          <text x="750" y="375" fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">QRS Width?</text>
          <text x="750" y="392" fontSize="11" fill="#333" textAnchor="middle">({'<'}0.12 vs ≥0.12 sec)</text>

          {/* NARROW QRS */}
          <text x="820" y="385" fontSize="12" fontWeight="bold" fill="#059669">NARROW</text>
          <line x1="850" y1="380" x2="950" y2="380" stroke="#059669" strokeWidth="3" />

          {/* WIDE QRS */}
          <text x="680" y="385" fontSize="12" fontWeight="bold" fill="#059669">WIDE</text>
          <line x1="650" y1="380" x2="550" y2="380" stroke="#059669" strokeWidth="3" />
          <line x1="550" y1="380" x2="550" y2="400" stroke="#059669" strokeWidth="2" />

          {/* NARROW QRS PATH: SVT vs AFIB */}
          <rect x="900" y="330" width="80" height="100" rx="8" fill="url(#blueGradTach)" stroke="#1e40af" strokeWidth="2" />
          <text x="940" y="355" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">SVT</text>
          <text x="940" y="372" fontSize="9" fill="white" textAnchor="middle">or PSVT</text>
          <text x="940" y="388" fontSize="9" fill="white" textAnchor="middle">P wave</text>
          <text x="940" y="402" fontSize="9" fill="white" textAnchor="middle">timing?</text>

          {/* NARROW SVT arrow down */}
          <line x1="940" y1="430" x2="940" y2="470" stroke="#333" strokeWidth="3" />

          {/* STEP 5: Narrow SVT Treatment */}
          <rect x="850" y="470" width="180" height="140" rx="10" fill="url(#greenGradTach)" stroke="#15803d" strokeWidth="2" />
          <circle cx="870" cy="500" r="12" fill="white" stroke="#15803d" strokeWidth="2" />
          <text x="875" y="506" fontSize="12" fontWeight="bold" fill="#15803d">5N</text>
          <text x="910" y="500" fontSize="11" fontWeight="bold" fill="white">Treat SVT</text>
          <text x="860" y="519" fontSize="9" fill="white" textAnchor="start">1. Vagal maneuvers</text>
          <text x="865" y="533" fontSize="8" fill="white" textAnchor="start">(Valsalva, ice)</text>
          <text x="860" y="549" fontSize="9" fill="white" textAnchor="start">2. Adenosine 6 mg</text>
          <text x="865" y="563" fontSize="8" fill="white" textAnchor="start">(if no effect: 12 mg)</text>
          <text x="860" y="579" fontSize="9" fill="white" textAnchor="start">3. Diltiazem/</text>
          <text x="865" y="593" fontSize="8" fill="white" textAnchor="start">Verapamil if stable</text>

          {/* WIDE QRS PATH */}
          <rect x="400" y="330" width="150" height="100" rx="8" fill="url(#orangeGradTach)" stroke="#b45309" strokeWidth="2" />
          <text x="475" y="365" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">Wide QRS:</text>
          <text x="475" y="383" fontSize="10" fill="white" textAnchor="middle">Assume VT</text>
          <text x="475" y="401" fontSize="10" fill="white" textAnchor="middle">unless proven</text>
          <text x="475" y="419" fontSize="10" fill="white" textAnchor="middle">otherwise</text>

          {/* Arrow from wide QRS */}
          <line x1="475" y1="430" x2="475" y2="470" stroke="#333" strokeWidth="3" />

          {/* STEP 6: Wide QRS (VT) Treatment */}
          <rect x="380" y="470" width="190" height="140" rx="10" fill="url(#redGradTach)" stroke="#991b1b" strokeWidth="2" />
          <circle cx="400" cy="500" r="12" fill="white" stroke="#991b1b" strokeWidth="2" />
          <text x="405" y="506" fontSize="12" fontWeight="bold" fill="#991b1b">5W</text>
          <text x="440" y="500" fontSize="11" fontWeight="bold" fill="white">Treat VT</text>
          <text x="390" y="519" fontSize="9" fill="white" textAnchor="start">Amiodarone 150 mg</text>
          <text x="395" y="533" fontSize="8" fill="white" textAnchor="start">IV over 10 min</text>
          <text x="390" y="549" fontSize="9" fill="white" textAnchor="start">OR Procainamide</text>
          <text x="395" y="563" fontSize="8" fill="white" textAnchor="start">12–17 mg/kg IV</text>
          <text x="390" y="579" fontSize="9" fill="white" textAnchor="start">OR Sotalol 1.5</text>
          <text x="395" y="593" fontSize="8" fill="white" textAnchor="start">mg/kg IV if stable</text>

          {/* IRREGULAR PATH: Probable AFIB */}
          <rect x="400" y="400" width="300" height="120" rx="10" fill="#f0fdf4" stroke="#15803d" strokeWidth="2" />
          <circle cx="425" cy="430" r="12" fill="white" stroke="#15803d" strokeWidth="2" />
          <text x="430" y="436" fontSize="12" fontWeight="bold" fill="#15803d">4I</text>
          <text x="470" y="430" fontSize="12" fontWeight="bold" fill="#166534">Irregular Tachycardia</text>
          <text x="410" y="450" fontSize="9" fill="#166534" textAnchor="start">Most likely: Afib with RVR</text>
          <text x="410" y="466" fontSize="9" fill="#166534" textAnchor="start">Rate control if stable:</text>
          <text x="410" y="482" fontSize="9" fill="#166534" textAnchor="start">Diltiazem, verapamil,</text>
          <text x="410" y="498" fontSize="9" fill="#166534" textAnchor="start">beta blocker or Digoxin</text>

          {/* Merge lines */}
          <line x1="50" y1="270" x2="250" y2="270" stroke="#dc2626" strokeWidth="2" />

          {/* Critical Boxes */}
          <rect x="50" y="650" width="900" height="900" rx="10" fill="#f9fafb" stroke="#d1d5db" strokeWidth="2" />

          {/* Synchronized Cardioversion */}
          <rect x="70" y="670" width="420" height="140" rx="8" fill="#fee2e2" stroke="#991b1b" strokeWidth="2" />
          <text x="280" y="695" fontSize="12" fontWeight="bold" fill="#991b1b" textAnchor="middle">SYNCHRONIZED CARDIOVERSION (Unstable)</text>
          <text x="80" y="719" fontSize="9" fill="#333" textAnchor="start">✓ Energies: 100 J → 200 J → 300 J → 360 J</text>
          <text x="80" y="734" fontSize="9" fill="#333" textAnchor="start">✓ MUST synchronize with QRS (prevent VF)</text>
          <text x="80" y="749" fontSize="9" fill="#333" textAnchor="start">✓ Analgesia/sedation REQUIRED if conscious</text>
          <text x="80" y="764" fontSize="9" fill="#333" textAnchor="start">✓ Recharge between attempts; reassess rhythm</text>
          <text x="80" y="779" fontSize="9" fill="#333" textAnchor="start">✓ If pulseless VT/VF → UNSYNC defibrillation</text>

          {/* Adenosine */}
          <rect x="530" y="670" width="420" height="140" rx="8" fill="#dbeafe" stroke="#0284c7" strokeWidth="2" />
          <text x="740" y="695" fontSize="12" fontWeight="bold" fill="#0284c7" textAnchor="middle">ADENOSINE FOR SVT</text>
          <text x="540" y="719" fontSize="9" fill="#333" textAnchor="start">✓ Dosing: 6 mg IV rapid push (flush immediately)</text>
          <text x="540" y="734" fontSize="9" fill="#333" textAnchor="start">✓ If no conversion in 1–2 min: 12 mg IV (repeat once)</text>
          <text x="540" y="749" fontSize="9" fill="#333" textAnchor="start">✓ Onset {'<'}10 sec; duration {'<'}30 sec (arrest-like</text>
          <text x="540" y="764" fontSize="9" fill="#333" textAnchor="start">feeling, flushing, chest discomfort common)</text>
          <text x="540" y="774" fontSize="10" fill="#333">✓ Success rate: ~90% for PSVT, ~10–15% for AFIB/Flutter</text>
          <text x="540" y="792" fontSize="10" fill="#333">✓ CONTRAINDICATIONS: Severe asthma (bronchoconstriction), 2nd/3rd degree AV block, theophylline use</text>

          {/* Amiodarone for VT */}
          <rect x="70" y="830" width="420" height="140" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="280" y="855" fontSize="12" fontWeight="bold" fill="#d97706" textAnchor="middle">AMIODARONE FOR STABLE VT</text>
          <text x="80" y="880" fontSize="10" fill="#333">✓ Bolus: 150 mg IV over 10 min (1st bolus if tolerated at 150 mg/10min)</text>
          <text x="80" y="898" fontSize="10" fill="#333">✓ Repeat: May give second 150 mg IV over 10–60 min if VT recurs</text>
          <text x="80" y="916" fontSize="10" fill="#333">✓ Maintenance: 1 mg/min for 6 hours, then 0.5 mg/min for 18 hours</text>
          <text x="80" y="934" fontSize="10" fill="#333">✓ Side effects: Hypotension (common), bradycardia, QT prolongation, monitor ECG</text>
          <text x="80" y="952" fontSize="10" fill="#333">✓ Alternative: Procainamide or Sotalol if amiodarone contraindicated</text>

          {/* AFIB Rate Control */}
          <rect x="530" y="830" width="420" height="140" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
          <text x="740" y="855" fontSize="12" fontWeight="bold" fill="#4338ca" textAnchor="middle">AFIB RVR - RATE CONTROL OPTIONS</text>
          <text x="540" y="880" fontSize="10" fill="#333">✓ Diltiazem 0.25 mg/kg IV over 2 min, repeat if needed (best for acute AFIB)</text>
          <text x="540" y="898" fontSize="10" fill="#333">✓ Verapamil 0.075–0.15 mg/kg IV push (alternative CCB)</text>
          <text x="540" y="916" fontSize="10" fill="#333">✓ Beta blocker: Esmolol 500 mcg/kg load, then 50–300 mcg/kg/min infusion</text>
          <text x="540" y="934" fontSize="10" fill="#333">✓ Digoxin: 0.25 mg IV (slower onset; use in CHF or sedentary patients)</text>
          <text x="540" y="952" fontSize="10" fill="#333">✓ Goal: Resting HR {'<'}110 bpm within 30 min (lenient rate control acceptable initially)</text>

          {/* ECG Features & Recognition */}
          <rect x="70" y="990" width="850" height="140" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
          <text x="295" y="1015" fontSize="12" fontWeight="bold" fill="#7c3aed" textAnchor="middle">ECG RECOGNITION: SVT vs VT vs AFIB</text>
          <text x="80" y="1040" fontSize="10" fill="#333">✓ SVT/PSVT: Regular, narrow QRS, P wave buried in T wave or after QRS, abrupt onset/offset</text>
          <text x="80" y="1058" fontSize="10" fill="#333">✓ Ventricular Tachycardia: Regular or irregular, WIDE QRS ≥0.12 sec, AV dissociation (pathognomonic), fusion/capture beats</text>
          <text x="80" y="1076" fontSize="10" fill="#333">✓ Atrial Fibrillation: IRREGULAR rhythm, baseline fibrillation waves (no organized atrial activity), variable RR intervals</text>
          <text x="80" y="1094" fontSize="10" fill="#333">✓ Atrial Flutter: Regular or irregular, 'sawtooth' pattern at 150–300 rate; 2:1, 3:1, or variable AV conduction</text>
          <text x="80" y="1112" fontSize="10" fill="#333">✓ Sinus Tachycardia: Regular, visible P waves, PR interval normal, HR ramps up/down gradually (not abrupt onset)</text>

          {/* Cautions & Pearls */}
          <rect x="70" y="1150" width="850" height="100" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="295" y="1175" fontSize="12" fontWeight="bold" fill="#d97706" textAnchor="middle">⚠️ CLINICAL PEARLS & CAUTIONS</text>
          <text x="80" y="1200" fontSize="10" fill="#333">✓ NEVER give adenosine to unstable patient with tachycardia → proceed to cardioversion</text>
          <text x="80" y="1218" fontSize="10" fill="#333">✓ Wide-QRS tachycardia until proven otherwise = VT (even if patient says "I have SVT")</text>
          <text x="80" y="1236" fontSize="10" fill="#333">✓ WIDE-COMPLEX TACHYCARDIA + HEMODYNAMIC INSTABILITY = Synchronized cardioversion, NOT drugs</text>
        </svg>
      </div>

      {/* Key Takeaways */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-300 rounded-lg p-4">
          <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Unstable = Cardiovert
          </h4>
          <p className="text-sm text-red-800">
            Any hemodynamically unstable tachycardia → immediate synchronized cardioversion 100–360 J, not drugs.
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-300 rounded-lg p-4">
          <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Stable Pathway
          </h4>
          <p className="text-sm text-orange-800">
            Regular/narrow → adenosine (SVT). Irregular → rate control (AFIB). Wide → amiodarone (VT).
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Wide = VT First
          </h4>
          <p className="text-sm text-blue-800">
            Assume wide-QRS tachycardia is VT. Treat with amiodarone (150 mg IV), not adenosine.
          </p>
        </div>
      </div>
    </div>
  );
}
