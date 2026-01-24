/**
 * PALS Algorithms - Interactive Clinical Flowcharts
 * Evidence-based pediatric emergency algorithms from AHA PALS Guidelines 2020
 */

"use client";

import { useState } from "react";
import { ChevronRight, AlertCircle, Clock, Heart, Activity, Zap } from "lucide-react";

interface AlgorithmStep {
  id: string;
  title: string;
  description: string;
  actions: string[];
  timing?: string;
  critical?: boolean;
  branchCondition?: string;
  nextSteps?: string[];
}

interface Algorithm {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  steps: AlgorithmStep[];
  references: string[];
}

const algorithms: Algorithm[] = [
  {
    id: "pediatric-cardiac-arrest",
    title: "Pediatric Cardiac Arrest",
    category: "Cardiac",
    icon: <Heart className="w-5 h-5" />,
    color: "red",
    steps: [
      {
        id: "step-1",
        title: "Verify Cardiac Arrest",
        description: "Assess responsiveness and breathing",
        actions: [
          "Check for responsiveness (tap and shout)",
          "Look for normal breathing (no breathing or only gasping)",
          "Check pulse for <10 seconds (brachial in infants, carotid/femoral in children)",
        ],
        timing: "< 10 seconds",
        critical: true,
      },
      {
        id: "step-2",
        title: "Activate Emergency Response",
        description: "Get help and equipment",
        actions: ["Shout for help / Activate emergency response", "Get AED/defibrillator", "Return to patient"],
        timing: "Immediately",
        critical: true,
      },
      {
        id: "step-3",
        title: "Start CPR",
        description: "High-quality chest compressions",
        actions: [
          "Compression depth: At least 1/3 AP diameter (5 cm in children, 4 cm in infants)",
          "Compression rate: 100-120/min",
          "Allow full chest recoil",
          "Minimize interruptions (<10 seconds)",
          "Compression-ventilation ratio: 30:2 (single rescuer) or 15:2 (2 rescuers)",
        ],
        timing: "Continuous",
        critical: true,
      },
      {
        id: "step-4",
        title: "Attach Monitor/Defibrillator",
        description: "Rhythm assessment",
        actions: ["Attach pads/ECG leads", "Minimize CPR interruptions", "Assess rhythm"],
        branchCondition: "Check rhythm - Shockable (VF/pVT) or Non-shockable (Asystole/PEA)?",
      },
      {
        id: "step-5-shockable",
        title: "VF/pVT - Defibrillation",
        description: "Shockable rhythm protocol",
        actions: [
          "Give 1 shock: 2-4 J/kg (use 4 J/kg for subsequent shocks)",
          "Resume CPR immediately for 2 minutes",
          "Establish IV/IO access",
          "Give epinephrine every 3-5 minutes (0.01 mg/kg, max 1 mg)",
          "Consider amiodarone 5 mg/kg bolus after 2nd shock",
        ],
        timing: "2-minute cycles",
        critical: true,
      },
      {
        id: "step-5-nonshockable",
        title: "Asystole/PEA Protocol",
        description: "Non-shockable rhythm protocol",
        actions: [
          "Resume CPR immediately",
          "Establish IV/IO access",
          "Give epinephrine every 3-5 minutes (0.01 mg/kg, max 1 mg)",
          "Treat reversible causes (Hs and Ts)",
        ],
        timing: "Every 2 minutes",
        critical: true,
      },
      {
        id: "step-6",
        title: "Reversible Causes (Hs and Ts)",
        description: "Identify and treat",
        actions: [
          "Hypovolemia - Volume resuscitation",
          "Hypoxia - Ensure oxygenation/ventilation",
          "Hydrogen ion (acidosis) - Ventilation, consider bicarb",
          "Hypo/Hyperkalemia - Check labs, treat accordingly",
          "Hypothermia - Rewarm",
          "Tension pneumothorax - Needle decompression",
          "Tamponade (cardiac) - Pericardiocentesis",
          "Toxins - Antidotes/supportive care",
          "Thrombosis (pulmonary) - Consider tPA",
          "Thrombosis (coronary) - Rare in pediatrics",
        ],
        critical: true,
      },
    ],
    references: [
      "AHA PALS Guidelines 2020",
      "Pediatric Advanced Life Support Provider Manual",
      "Circulation. 2020;142(suppl 2):S469–S523",
    ],
  },
  {
    id: "bradycardia",
    title: "Pediatric Bradycardia with Pulse",
    category: "Cardiac",
    icon: <Activity className="w-5 h-5" />,
    color: "blue",
    steps: [
      {
        id: "step-1",
        title: "Identify Bradycardia",
        description: "Heart rate assessment",
        actions: [
          "Infant (<1 year): HR <100 bpm",
          "Child (1-8 years): HR <60 bpm",
          "Adolescent (>8 years): HR <50 bpm",
          "Assess for signs of shock or altered mental status",
        ],
        critical: true,
      },
      {
        id: "step-2",
        title: "Support ABCs",
        description: "Basic life support",
        actions: [
          "Ensure airway patency",
          "Give supplemental oxygen",
          "Establish cardiac monitoring",
          "Obtain IV/IO access",
        ],
        timing: "Immediate",
      },
      {
        id: "step-3",
        title: "Assess: Is child symptomatic?",
        description: "Clinical decision point",
        actions: ["Signs of poor perfusion?", "Altered mental status?", "Hypotension?", "Respiratory distress?"],
        branchCondition: "Symptomatic with poor perfusion despite oxygenation/ventilation?",
      },
      {
        id: "step-4-symptomatic",
        title: "Emergency Treatment",
        description: "Medications for symptomatic bradycardia",
        actions: [
          "Epinephrine IV/IO: 0.01 mg/kg (0.1 mL/kg of 1:10,000), max 1 mg",
          "Repeat every 3-5 minutes",
          "If increased vagal tone or AV block: Atropine 0.02 mg/kg IV/IO (min 0.1 mg, max 0.5 mg single dose)",
          "Consider cardiac pacing if medications ineffective",
        ],
        critical: true,
        timing: "Every 3-5 minutes",
      },
      {
        id: "step-4-asymptomatic",
        title: "Supportive Care",
        description: "Monitor and identify cause",
        actions: ["Continue monitoring", "Identify and treat underlying cause", "Consider expert consultation"],
      },
      {
        id: "step-5",
        title: "Treat Underlying Causes",
        description: "Common etiologies",
        actions: [
          "Hypoxia - Improve oxygenation",
          "Hypothermia - Rewarm",
          "Head injury/increased ICP - Neurosurgical consultation",
          "Heart block - Pacing",
          "Toxins/drugs - Specific antidotes",
        ],
        critical: true,
      },
    ],
    references: ["AHA PALS Guidelines 2020", "Pediatric Advanced Life Support Provider Manual"],
  },
  {
    id: "tachycardia",
    title: "Pediatric Tachycardia with Pulse",
    category: "Cardiac",
    icon: <Zap className="w-5 h-5" />,
    color: "yellow",
    steps: [
      {
        id: "step-1",
        title: "Identify Tachycardia",
        description: "Heart rate assessment",
        actions: [
          "Infant (<1 year): HR >160 bpm",
          "Child (1-8 years): HR >150 bpm",
          "Adolescent (>8 years): HR >100 bpm",
          "Assess QRS width: Narrow (<0.09 sec) or Wide (≥0.09 sec)",
        ],
        critical: true,
      },
      {
        id: "step-2",
        title: "Support ABCs",
        description: "Initial stabilization",
        actions: [
          "Maintain airway",
          "Give supplemental oxygen",
          "Establish cardiac monitoring",
          "Obtain IV/IO access",
          "12-lead ECG if available",
        ],
        timing: "Immediate",
      },
      {
        id: "step-3",
        title: "Assess: Is child stable?",
        description: "Clinical decision point",
        branchCondition: "Signs of shock/poor perfusion?",
        actions: ["Hypotension?", "Altered mental status?", "Signs of shock?"],
      },
      {
        id: "step-4-unstable-narrow",
        title: "Unstable - Narrow QRS",
        description: "Synchronized cardioversion",
        actions: [
          "Consider sedation if time permits",
          "Synchronized cardioversion: 0.5-1 J/kg",
          "If unsuccessful, increase to 2 J/kg",
          "Sedate if possible, don't delay if critical",
        ],
        critical: true,
        timing: "Immediate",
      },
      {
        id: "step-4-unstable-wide",
        title: "Unstable - Wide QRS",
        description: "Assume VT - Cardioversion",
        actions: [
          "Synchronized cardioversion: 0.5-1 J/kg",
          "If unsuccessful, increase to 2 J/kg",
          "If VT with no pulse → Defibrillate (see Cardiac Arrest algorithm)",
          "Consider expert consultation",
        ],
        critical: true,
        timing: "Immediate",
      },
      {
        id: "step-5-stable-narrow",
        title: "Stable - Narrow QRS SVT",
        description: "Vagal maneuvers and adenosine",
        actions: [
          "Try vagal maneuvers (if appropriate for age)",
          "Adenosine 0.1 mg/kg IV/IO rapid push (max 6 mg)",
          "May repeat once at 0.2 mg/kg (max 12 mg)",
          "Follow with saline flush",
          "Consider expert consultation",
        ],
        timing: "Staged approach",
      },
      {
        id: "step-5-stable-wide",
        title: "Stable - Wide QRS",
        description: "Expert consultation recommended",
        actions: [
          "Obtain 12-lead ECG",
          "Consider adenosine if regular rhythm",
          "Consider amiodarone 5 mg/kg IV over 20-60 min",
          "Expert consultation strongly recommended",
        ],
        critical: true,
      },
    ],
    references: ["AHA PALS Guidelines 2020", "Pediatric Advanced Life Support Provider Manual"],
  },
  {
    id: "respiratory-distress",
    title: "Pediatric Respiratory Distress/Failure",
    category: "Respiratory",
    icon: <Activity className="w-5 h-5" />,
    color: "green",
    steps: [
      {
        id: "step-1",
        title: "Recognize Respiratory Distress",
        description: "Initial assessment",
        actions: [
          "Increased work of breathing (retractions, nasal flaring, grunting)",
          "Abnormal airway sounds (stridor, wheezing)",
          "Tachypnea or bradypnea",
          "Altered mental status",
          "Decreased oxygen saturation",
        ],
        critical: true,
      },
      {
        id: "step-2",
        title: "Position and Oxygenate",
        description: "Initial interventions",
        actions: [
          "Position for comfort (allow child to find position of comfort)",
          "Administer oxygen to maintain SpO2 >94%",
          "Pulse oximetry and cardiac monitoring",
          "Allow parent to stay with child if possible",
        ],
        timing: "Immediate",
      },
      {
        id: "step-3",
        title: "Identify Severity",
        description: "Assess level of respiratory compromise",
        branchCondition: "Respiratory Distress or Respiratory Failure?",
        actions: [
          "Distress: Increased work, compensating",
          "Failure: Inadequate effort, altered mental status, poor perfusion",
        ],
      },
      {
        id: "step-4-distress",
        title: "Respiratory Distress Management",
        description: "Support and monitor",
        actions: [
          "Continue oxygen therapy",
          "Consider specific treatments:",
          "  - Bronchodilators for wheezing",
          "  - Racemic epinephrine for croup/stridor",
          "  - Corticosteroids for inflammation",
          "Monitor closely for progression to failure",
          "Prepare for escalation if needed",
        ],
      },
      {
        id: "step-4-failure",
        title: "Respiratory Failure Management",
        description: "Advanced airway management",
        actions: [
          "Prepare for assisted ventilation",
          "Bag-mask ventilation if needed",
          "Consider advanced airway (intubation)",
          "Call for expert help/anesthesia",
          "Use appropriate equipment sizes",
        ],
        critical: true,
        timing: "Urgent",
      },
      {
        id: "step-5",
        title: "Treat Specific Causes",
        description: "Etiology-directed therapy",
        actions: [
          "Upper airway obstruction: Consider foreign body removal, croup treatment",
          "Lower airway obstruction: Bronchodilators, steroids",
          "Lung tissue disease: Antibiotics, supportive care",
          "Disordered control: Treat underlying cause",
        ],
      },
    ],
    references: ["AHA PALS Guidelines 2020", "Pediatric Advanced Life Support Provider Manual"],
  },
];

const colorClasses = {
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    icon: "text-red-600",
    badge: "bg-red-100 text-red-800",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    icon: "text-blue-600",
    badge: "bg-blue-100 text-blue-800",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    icon: "text-yellow-600",
    badge: "bg-yellow-100 text-yellow-800",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    icon: "text-green-600",
    badge: "bg-green-100 text-green-800",
  },
};

export function PALSAlgorithms() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!selectedAlgorithm) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">PALS Clinical Algorithms</h2>
          <p className="text-lg text-gray-600">Evidence-based step-by-step protocols for pediatric emergencies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {algorithms.map((algorithm) => {
            const colors = colorClasses[algorithm.color as keyof typeof colorClasses];
            return (
              <button
                key={algorithm.id}
                onClick={() => {
                  setSelectedAlgorithm(algorithm);
                  setCurrentStepIndex(0);
                }}
                className={`${colors.bg} ${colors.border} border-2 rounded-xl p-6 text-left hover:shadow-lg transition-all hover:scale-105`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${colors.icon} p-3 rounded-lg bg-white`}>{algorithm.icon}</div>
                  <span className={`${colors.badge} text-xs px-3 py-1 rounded-full font-medium`}>
                    {algorithm.category}
                  </span>
                </div>
                <h3 className={`text-xl font-bold ${colors.text} mb-2`}>{algorithm.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{algorithm.steps.length} steps</p>
                <div className="flex items-center text-sm font-medium text-gray-700">
                  View Algorithm
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Evidence-Based Guidelines
          </h3>
          <p className="text-sm text-blue-800">
            All algorithms are based on the American Heart Association PALS Guidelines 2020 and are updated regularly to
            reflect current evidence-based practices.
          </p>
        </div>
      </div>
    );
  }

  // Algorithm viewer
  const currentStep = selectedAlgorithm.steps[currentStepIndex];
  const colors = colorClasses[selectedAlgorithm.color as keyof typeof colorClasses];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => setSelectedAlgorithm(null)}
          className="text-blue-600 hover:text-blue-700 font-medium mb-4 flex items-center"
        >
          ← Back to Algorithms
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedAlgorithm.title}</h2>
            <p className="text-gray-600">
              Step {currentStepIndex + 1} of {selectedAlgorithm.steps.length}
            </p>
          </div>
          <div className={`${colors.icon}`}>{selectedAlgorithm.icon}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex space-x-1">
          {selectedAlgorithm.steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStepIndex(index)}
              className={`flex-1 h-2 rounded-full transition-colors ${
                index === currentStepIndex ? "bg-blue-600" : index < currentStepIndex ? "bg-green-500" : "bg-gray-200"
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className={`${colors.bg} ${colors.border} border-2 rounded-xl p-6 mb-6`}>
        <div className="flex items-start justify-between mb-4">
          <h3 className={`text-xl font-bold ${colors.text}`}>{currentStep.title}</h3>
          {currentStep.critical && (
            <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-medium flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              Critical
            </span>
          )}
        </div>

        <p className="text-gray-700 mb-4">{currentStep.description}</p>

        {currentStep.timing && (
          <div className="flex items-center text-sm font-medium text-gray-600 mb-4 bg-white rounded-lg p-3">
            <Clock className="w-4 h-4 mr-2" />
            Timing: {currentStep.timing}
          </div>
        )}

        {currentStep.branchCondition && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="font-semibold text-yellow-900 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Decision Point
            </p>
            <p className="text-sm text-yellow-800 mt-1">{currentStep.branchCondition}</p>
          </div>
        )}

        <div className="space-y-2">
          <p className="font-semibold text-gray-900">Actions:</p>
          <ul className="space-y-2">
            {currentStep.actions.map((action, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span className="flex-1">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
          disabled={currentStepIndex === 0}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStepIndex(Math.min(selectedAlgorithm.steps.length - 1, currentStepIndex + 1))}
          disabled={currentStepIndex === selectedAlgorithm.steps.length - 1}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* References */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <p className="font-semibold text-gray-900 mb-2">References:</p>
        <ul className="text-sm text-gray-600 space-y-1">
          {selectedAlgorithm.references.map((ref, index) => (
            <li key={index}>• {ref}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
