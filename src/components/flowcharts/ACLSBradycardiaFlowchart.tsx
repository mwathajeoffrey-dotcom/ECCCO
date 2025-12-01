'use client';

import React from 'react';
import { Heart, Zap, AlertCircle, Clock } from 'lucide-react';

export function ACLSBradycardiaFlowchart() {
  return (
    <div className="w-full bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">ACLS: Symptomatic Bradycardia Algorithm</h3>
      <p className="text-sm text-gray-600 mb-6">
        2025 AHA ACLS guidelines for symptomatic bradycardia management with hypotension, altered mental status, or signs of shock.
      </p>

      {/* SVG Flowchart */}
      <div className="overflow-x-auto">
        <svg viewBox="0 0 1000 1500" className="w-full h-auto min-w-full">
          {/* Define gradients */}
          <defs>
            <linearGradient id="purpleGradBrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d8b4fe" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="blueGradBrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bfdbfe" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="redGradBrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fecaca" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <linearGradient id="yellowGradBrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fcd34d" />
            </linearGradient>
            <linearGradient id="greenGradBrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          {/* STEP 1: Recognize Bradycardia */}
          <rect x="250" y="20" width="500" height="100" rx="15" fill="url(#purpleGradBrad)" stroke="#6b21a8" strokeWidth="2" />
          <text x="500" y="55" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle">
            Bradycardia: HR {'<'} 60 bpm
          </text>
          <text x="500" y="80" fontSize="12" fill="white" textAnchor="middle">
            PLUS Hypotension (SBP {'<'}90), altered mental status, or signs of shock
          </text>
          <text x="500" y="100" fontSize="12" fill="white" textAnchor="middle">
            (Asymptomatic bradycardia = observe only, no intervention needed)
          </text>

          {/* Arrow down */}
          <line x1="500" y1="120" x2="500" y2="160" stroke="#333" strokeWidth="3" />

          {/* STEP 2: Assess and Stabilize */}
          <rect x="250" y="160" width="500" height="120" rx="15" fill="url(#blueGradBrad)" stroke="#1e40af" strokeWidth="3" />
          <circle cx="280" cy="185" r="18" fill="white" stroke="#1e40af" strokeWidth="2" />
          <text x="287" y="192" fontSize="16" fontWeight="bold" fill="#1e40af">1</text>
          <text x="330" y="185" fontSize="16" fontWeight="bold" fill="white">Initial Management</text>
          <text x="340" y="205" fontSize="11" fill="white" textAnchor="start">✓ Call for help & AED/defibrillator</text>
          <text x="340" y="222" fontSize="11" fill="white" textAnchor="start">✓ Continuous cardiac monitor & pulse oximetry</text>
          <text x="340" y="239" fontSize="11" fill="white" textAnchor="start">✓ Establish IV access (peripheral or central)</text>
          <text x="340" y="256" fontSize="11" fill="white" textAnchor="start">✓ 12-lead ECG within 10 minutes</text>

          {/* Arrow down */}
          <line x1="500" y1="280" x2="500" y2="320" stroke="#333" strokeWidth="3" />

          {/* STEP 3: Oxygen & Ventilation */}
          <rect x="250" y="320" width="500" height="100" rx="15" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
          <circle cx="280" cy="345" r="18" fill="white" stroke="#0284c7" strokeWidth="2" />
          <text x="287" y="352" fontSize="16" fontWeight="bold" fill="#0284c7">2</text>
          <text x="330" y="345" fontSize="14" fontWeight="bold" fill="#0c4a6e">Oxygen & Airway Support</text>
          <text x="340" y="365" fontSize="11" fill="#0c4a6e" textAnchor="start">✓ Oxygen to maintain SpO₂ 94–99% (avoid hyperoxia)</text>
          <text x="340" y="382" fontSize="11" fill="#0c4a6e" textAnchor="start">✓ Prepare for airway support if altered mental status</text>
          <text x="340" y="399" fontSize="11" fill="#0c4a6e" textAnchor="start">✓ Monitor breath sounds & capnography if intubated</text>

          {/* Arrow down */}
          <line x1="500" y1="420" x2="500" y2="460" stroke="#333" strokeWidth="3" />

          {/* STEP 4: Atropine vs Pacing Decision */}
          <polygon points="500,460 600,520 500,580 400,520" fill="url(#yellowGradBrad)" stroke="#d97706" strokeWidth="2" />
          <text x="500" y="515" fontSize="14" fontWeight="bold" fill="#333" textAnchor="middle">Atropine-Responsive</text>
          <text x="500" y="535" fontSize="12" fill="#333" textAnchor="middle">Bradycardia?</text>

          {/* YES - Atropine Path */}
          <text x="650" y="525" fontSize="13" fontWeight="bold" fill="#059669">YES</text>
          <line x1="600" y1="520" x2="750" y2="520" stroke="#059669" strokeWidth="3" />

          {/* NO - Pacing Path */}
          <text x="350" y="525" fontSize="13" fontWeight="bold" fill="#dc2626">NO</text>
          <line x1="400" y1="520" x2="250" y2="520" stroke="#dc2626" strokeWidth="3" />

          {/* STEP 5: Atropine Administration */}
          <rect x="700" y="470" width="270" height="100" rx="10" fill="url(#greenGradBrad)" stroke="#15803d" strokeWidth="2" />
          <circle cx="720" cy="495" r="14" fill="white" stroke="#15803d" strokeWidth="2" />
          <text x="725" y="501" fontSize="14" fontWeight="bold" fill="#15803d">5</text>
          <text x="760" y="495" fontSize="13" fontWeight="bold" fill="white">Atropine IV/IO</text>
          <text x="765" y="516" fontSize="10" fill="white" textAnchor="start">0.5 mg IV push</text>
          <text x="765" y="531" fontSize="10" fill="white" textAnchor="start">every 3–5 min</text>
          <text x="765" y="546" fontSize="10" fill="white" textAnchor="start">Max: 3 mg (3–5 doses)</text>

          {/* Arrow from Atropine */}
          <line x1="835" y1="570" x2="835" y2="610" stroke="#333" strokeWidth="3" />

          {/* STEP 6: Transvenous Pacing */}
          <rect x="50" y="470" width="180" height="100" rx="10" fill="url(#redGradBrad)" stroke="#991b1b" strokeWidth="2" />
          <circle cx="70" cy="495" r="14" fill="white" stroke="#991b1b" strokeWidth="2" />
          <text x="75" y="501" fontSize="14" fontWeight="bold" fill="#991b1b">6</text>
          <text x="110" y="495" fontSize="12" fontWeight="bold" fill="white">Pacing</text>
          <text x="65" y="516" fontSize="9" fill="white" textAnchor="start">Transcutaneous:</text>
          <text x="70" y="529" fontSize="9" fill="white" textAnchor="start">Immediate</text>
          <text x="65" y="548" fontSize="9" fill="white" textAnchor="start">Transvenous:</text>
          <text x="70" y="561" fontSize="9" fill="white" textAnchor="start">Backup</text>

          {/* Arrow from Pacing */}
          <line x1="140" y1="570" x2="140" y2="610" stroke="#333" strokeWidth="3" />

          {/* STEP 7: Response Assessment */}
          <rect x="50" y="610" width="900" height="140" rx="10" fill="#f0fdf4" stroke="#15803d" strokeWidth="2" />
          <circle cx="75" cy="640" r="14" fill="white" stroke="#15803d" strokeWidth="2" />
          <text x="80" y="646" fontSize="14" fontWeight="bold" fill="#15803d">7</text>
          <text x="120" y="640" fontSize="14" fontWeight="bold" fill="#166534">Assess Response</text>
          <text x="120" y="662" fontSize="10" fill="#166534" textAnchor="start">✓ HR {'>'}60 & SBP {'>'}90 = SUCCESS (continue support, monitor)</text>
          <text x="120" y="679" fontSize="10" fill="#166534" textAnchor="start">✓ Still hypotensive/bradycardic = Continue atropine OR pacing</text>
          <text x="120" y="696" fontSize="10" fill="#166534" textAnchor="start">✓ Refractory = Epinephrine 2–10 mcg/min IV + pacing</text>
          <text x="120" y="713" fontSize="10" fill="#166534" textAnchor="start">✓ Consider underlying cause: AV block, hypothermia, meds, K+, O₂</text>

          {/* Arrow down */}
          <line x1="500" y1="750" x2="500" y2="790" stroke="#333" strokeWidth="3" />

          {/* STEP 8: Underlying Causes */}
          <rect x="50" y="790" width="900" height="160" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <circle cx="75" cy="820" r="14" fill="white" stroke="#d97706" strokeWidth="2" />
          <text x="80" y="826" fontSize="14" fontWeight="bold" fill="#d97706">8</text>
          <text x="120" y="820" fontSize="14" fontWeight="bold" fill="#92400e">Treat Underlying Causes (PATCH-MD)</text>
          <text x="120" y="842" fontSize="10" fill="#333" textAnchor="start">✓ P: Pulmonary – Ventilatory support, anticoagulation if PE</text>
          <text x="120" y="858" fontSize="10" fill="#333" textAnchor="start">✓ A: AV block (2nd/3rd degree) – Pacing, avoid beta blockers</text>
          <text x="120" y="874" fontSize="10" fill="#333" textAnchor="start">✓ T: Toxins (beta blocker, CCB, digoxin) – Glucagon, calcium, Fab</text>
          <text x="120" y="890" fontSize="10" fill="#333" textAnchor="start">✓ C: Cardiac (MI, myocarditis) – Cardiology consult, possible CathLab</text>
          <text x="120" y="906" fontSize="10" fill="#333" textAnchor="start">✓ H: Hypothermia – Passive/active rewarming, Osborn wave on ECG</text>
          <text x="120" y="922" fontSize="10" fill="#333" textAnchor="start">✓ M-D: Metabolic (hyperkalemia) or Drugs (opioids) – Labs, naloxone</text>

          {/* Critical Boxes */}
          <rect x="50" y="1000" width="900" height="440" rx="10" fill="#f9fafb" stroke="#d1d5db" strokeWidth="2" />

          {/* Atropine Details */}
          <rect x="70" y="1020" width="420" height="120" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
          <text x="280" y="1045" fontSize="12" fontWeight="bold" fill="#4338ca" textAnchor="middle">ATROPINE FOR BRADYCARDIA</text>
          <text x="80" y="1070" fontSize="10" fill="#333">✓ Dosing: 0.5 mg IV/IO push every 3–5 min</text>
          <text x="80" y="1088" fontSize="10" fill="#333">✓ Max cumulative dose: 3 mg (6–12 doses if prolonged)</text>
          <text x="80" y="1106" fontSize="10" fill="#333">✓ Onset: 30–60 sec; peak effect 5–10 min</text>
          <text x="80" y="1124" fontSize="10" fill="#333">✓ CONTRAINDICATIONS: Atropine PARADOX - may worsen bradycardia if {'<'}0.5 mg or Denervated Heart</text>

          {/* Pacing Details */}
          <rect x="530" y="1020" width="420" height="120" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
          <text x="740" y="1045" fontSize="12" fontWeight="bold" fill="#166534" textAnchor="middle">TRANSCUTANEOUS PACING (TCP)</text>
          <text x="540" y="1070" fontSize="10" fill="#333">✓ Rate: 60–100 ppm (start 80 if unstable)</text>
          <text x="540" y="1088" fontSize="10" fill="#333">✓ Output: Start {'<'}0 mA, increase until electrical capture (QRS after each spike)</text>
          <text x="540" y="1106" fontSize="10" fill="#333">✓ Verify mechanical capture: Pulse palpable synchronously with pacing</text>
          <text x="540" y="1124" fontSize="10" fill="#333">✓ Analgesia required (ALWAYS if conscious: fentanyl or morphine + sedation)</text>

          {/* Medications - Refractory */}
          <rect x="70" y="1160" width="420" height="120" rx="8" fill="#fee2e2" stroke="#991b1b" strokeWidth="2" />
          <text x="280" y="1185" fontSize="12" fontWeight="bold" fill="#991b1b" textAnchor="middle">REFRACTORY BRADYCARDIA + SHOCK</text>
          <text x="80" y="1210" fontSize="10" fill="#333">✓ Epinephrine 2–10 mcg/min IV infusion (continuous titration)</text>
          <text x="80" y="1228" fontSize="10" fill="#333">✓ Dopamine 5–20 mcg/kg/min (may tachycardic; not first-line)</text>
          <text x="80" y="1246" fontSize="10" fill="#333">✓ Isoproterenol 2–10 mcg/min (last resort; caution in CAD)</text>
          <text x="80" y="1264" fontSize="10" fill="#333">✓ Combined: TCP + atropine + vasopressor infusion until transvenous pacing available</text>

          {/* AV Block Classification */}
          <rect x="530" y="1160" width="420" height="120" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
          <text x="740" y="1185" fontSize="12" fontWeight="bold" fill="#7c3aed" textAnchor="middle">AV BLOCK CLASSIFICATION</text>
          <text x="540" y="1210" fontSize="10" fill="#333">✓ 1st degree: Prolonged PR ({'>'}0.20 sec) - Observe, no treatment</text>
          <text x="540" y="1228" fontSize="10" fill="#333">✓ 2nd degree Type I (Wenckebach): Progressive PR; skip QRS - Usually benign, monitor</text>
          <text x="540" y="1246" fontSize="10" fill="#333">✓ 2nd degree Type II: Dropped QRS, fixed PR - HIGH RISK, pacing likely needed</text>
          <text x="540" y="1264" fontSize="10" fill="#333">✓ 3rd degree (complete): No AV conduction - PACING MANDATORY, consider temporary wire</text>

          {/* Decision Points */}
          <rect x="70" y="1300" width="850" height="120" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="295" y="1325" fontSize="12" fontWeight="bold" fill="#d97706" textAnchor="middle">DECISION POINTS: WHEN TO PACE VS WHEN TO GIVE ATROPINE</text>
          <text x="80" y="1350" fontSize="10" fill="#333">✓ Atropine FIRST-LINE: Sinus bradycardia, junctional bradycardia, atrial fibrillation with slow ventricular response</text>
          <text x="80" y="1368" fontSize="10" fill="#333">✓ PACING FIRST-LINE: 2nd-degree Type II AV block, 3rd-degree AV block, symptomatic bradycardia unresponsive to atropine</text>
          <text x="80" y="1386" fontSize="10" fill="#333">✓ PACING-DEPENDENT: Inferior wall MI with 3rd-degree block (need temporary pacing), bradycardia post-cardiac transplant</text>
          <text x="80" y="1404" fontSize="10" fill="#333">✓ AVOID: Atropine in unstable 2nd/3rd degree AV blocks (may worsen), beta blockers/CCBs in symptomatic bradycardia</text>
        </svg>
      </div>

      {/* Key Takeaways */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-purple-50 border border-purple-300 rounded-lg p-4">
          <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            When to Treat
          </h4>
          <p className="text-sm text-purple-800">
            Only symptomatic bradycardia (HR {'<'}60 + hypotension/altered mental status). Asymptomatic bradycardia = observe only.
          </p>
        </div>
        <div className="bg-red-50 border border-red-300 rounded-lg p-4">
          <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Atropine vs Pacing
          </h4>
          <p className="text-sm text-red-800">
            Atropine first-line for sinus/junctional bradycardia. Pacing for AV blocks (Type II/III) or if atropine fails.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Find the Cause
          </h4>
          <p className="text-sm text-blue-800">
            Always assess for underlying causes: AV block, MI, toxins, hypothermia, hyperkalemia, medications.
          </p>
        </div>
      </div>
    </div>
  );
}
