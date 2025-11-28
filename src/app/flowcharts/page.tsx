'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  Zap,
  Activity,
  Heart,
  Calendar,
  BookOpen,
  FileText,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { ACLSFlowchart } from '@/components/flowcharts/ACLSFlowchart';
import { ACLSBradycardiaFlowchart } from '@/components/flowcharts/ACLSBradycardiaFlowchart';
import { ACLSTachycardiaFlowchart } from '@/components/flowcharts/ACLSTachycardiaFlowchart';
import { SepsisFlowchart } from '@/components/flowcharts/SepsisFlowchart';
import { StrokeFlowchart } from '@/components/flowcharts/StrokeFlowchart';

const flowchartData = [
  {
    id: 'acls-cardiac-arrest',
    title: 'ACLS: Cardiac Arrest Algorithm',
    description: 'Comprehensive cardiac arrest management following 2025 AHA ACLS Guidelines',
    icon: <Zap className="w-8 h-8" />,
    guidelines: {
      source: 'American Heart Association',
      version: '2025 ACLS Guidelines',
      year: 2025,
      lastUpdated: 'November 2025',
      doi: '10.1161/CIR.0000000000001273',
      reference: 'Circulation. 2025'
    },
    highlights: [
      'VF/pVT shock algorithm with 2-minute cycles',
      '2025 TTM updates: Normothermia (37.5°C) preferred',
      'Epinephrine dosing 1mg every 3-5 minutes',
      'Amiodarone and Lidocaine protocols',
      'Reversible causes (4 Hs & 4 Ts)',
      'Post-ROSC care with hemodynamic targets'
    ],
    component: <ACLSFlowchart />,
    color: 'from-red-50 to-red-100',
    borderColor: 'border-red-300'
  },
  {
    id: 'acls-bradycardia',
    title: 'ACLS: Symptomatic Bradycardia',
    description: 'Management of symptomatic bradycardia with hypotension and altered mental status per 2025 AHA ACLS',
    icon: <Heart className="w-8 h-8" />,
    guidelines: {
      source: 'American Heart Association',
      version: '2025 ACLS Guidelines - Bradycardia',
      year: 2025,
      lastUpdated: 'November 2025',
      doi: '10.1161/CIR.0000000000001273',
      reference: 'Circulation. 2025'
    },
    highlights: [
      'HR <60 bpm with hypotension/altered mental status',
      'Atropine 0.5 mg IV every 3-5 min (max 3 mg)',
      'Transcutaneous pacing as backup',
      'Identification of AV blocks (Type I, II, III)',
      'Underlying cause assessment (PATCH-MD)',
      'Epinephrine infusion for refractory shock'
    ],
    component: <ACLSBradycardiaFlowchart />,
    color: 'from-purple-50 to-purple-100',
    borderColor: 'border-purple-300'
  },
  {
    id: 'acls-tachycardia',
    title: 'ACLS: Tachycardia Algorithm',
    description: 'Stable and unstable tachycardia management with ECG-guided synchronization per 2025 AHA ACLS',
    icon: <Zap className="w-8 h-8" />,
    guidelines: {
      source: 'American Heart Association',
      version: '2025 ACLS Guidelines - Tachycardia',
      year: 2025,
      lastUpdated: 'November 2025',
      doi: '10.1161/CIR.0000000000001273',
      reference: 'Circulation. 2025'
    },
    highlights: [
      'HR >100 bpm: assess stability (hypotension/shock)',
      'Unstable = synchronized cardioversion 100-360 J',
      'Stable narrow QRS = adenosine (6-12 mg IV)',
      'Stable wide QRS = assume VT, amiodarone (150 mg IV)',
      'Irregular = likely AFIB, rate control (diltiazem/verapamil)',
      'Vagal maneuvers for SVT/PSVT'
    ],
    component: <ACLSTachycardiaFlowchart />,
    color: 'from-orange-50 to-orange-100',
    borderColor: 'border-orange-300'
  },
  {
    id: 'sepsis',
    title: 'Surviving Sepsis: Bundle & Escalation',
    description: 'Time-sensitive sepsis management per 2024 Surviving Sepsis Campaign Guidelines',
    icon: <Activity className="w-8 h-8" />,
    guidelines: {
      source: 'Surviving Sepsis Campaign',
      version: '2024 International Guidelines',
      year: 2024,
      lastUpdated: 'March 2024',
      doi: '10.1097/CCM.0000000000005159',
      reference: 'Critical Care Medicine. 2024'
    },
    highlights: [
      'Hour-1 bundle: Cultures → Antibiotics → Lactate',
      '30 mL/kg crystalloid bolus within 3 hours',
      'Vasopressor escalation ladder (NE → VP → Epi)',
      'SOFA scoring for severity assessment',
      'Lactate clearance monitoring',
      'Source control decision pathway'
    ],
    component: <SepsisFlowchart />,
    color: 'from-orange-50 to-orange-100',
    borderColor: 'border-orange-300'
  },
  {
    id: 'stroke',
    title: 'Acute Ischemic Stroke: Thrombectomy Pathway',
    description: 'Door-to-treatment decisions per 2024-2025 AHA/ASA Stroke Guidelines',
    icon: <Heart className="w-8 h-8" />,
    guidelines: {
      source: 'American Heart Association/American Stroke Association',
      version: '2024-2025 Acute Ischemic Stroke Guidelines',
      year: 2024,
      lastUpdated: 'November 2024',
      doi: '10.1161/STR.0000000000000457',
      reference: 'Stroke. 2024'
    },
    highlights: [
      'Door-to-CT ≤10 minutes',
      'LVO detection via CTA/MRA',
      'tPA eligibility (4.5h window, BP <185/110)',
      'Thrombectomy window (≤24h with mismatch)',
      'Extended window criteria (DAWN/DEFUSE-3)',
      'Post-reperfusion BP management <140/90'
    ],
    component: <StrokeFlowchart />,
    color: 'from-blue-50 to-blue-100',
    borderColor: 'border-blue-300'
  }
];

function GuidelineReference({ guideline }: { guideline: typeof flowchartData[0]['guidelines'] }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-sm border border-gray-200">
      <div className="flex items-start gap-3">
        <BookOpen className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-gray-900">{guideline.source}</p>
          <p className="text-gray-700">{guideline.version}</p>
          <p className="text-gray-600">{guideline.reference} ({guideline.year})</p>
          {guideline.doi && (
            <p className="text-gray-600">
              DOI:{' '}
              <a
                href={`https://doi.org/${guideline.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {guideline.doi}
              </a>
            </p>
          )}
          <p className="text-xs text-gray-500">Last updated: {guideline.lastUpdated}</p>
        </div>
      </div>
    </div>
  );
}

function FlowchartCard({ flowchart }: { flowchart: typeof flowchartData[0] }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleDownloadPDF = () => {
    // Trigger browser print dialog - user can save as PDF
    const element = document.getElementById(`flowchart-${flowchart.id}`);
    if (!element) return;

    const printWindow = window.open('', '', 'height=800,width=1000');
    if (!printWindow) {
      alert('Please enable pop-ups to download PDF');
      return;
    }

    const htmlContent = element.outerHTML;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${flowchart.title}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @media print {
              body { margin: 0; padding: 10mm; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    
    // Delay print to allow content to load
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className={`bg-gradient-to-br ${flowchart.color} rounded-xl border-2 ${flowchart.borderColor} overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}>
      {/* Header */}
      <div className="bg-white border-b p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="text-gray-700 flex-shrink-0">{flowchart.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{flowchart.title}</h2>
              <p className="text-gray-600 mt-1">{flowchart.description}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Updated {flowchart.guidelines.year}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">PDF</span>
          </button>
        </div>
      </div>

      {/* Guidelines Reference */}
      <div className="p-6 border-b bg-white bg-opacity-50">
        <GuidelineReference guideline={flowchart.guidelines} />
      </div>

      {/* Highlights */}
      <div className="p-6 border-b bg-white bg-opacity-30">
        <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {flowchart.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
              <span className="text-sm text-gray-700">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Flowchart */}
      <div id={`flowchart-${flowchart.id}`} className="p-6">
        {flowchart.component}
      </div>

      {/* Details Toggle */}
      <div className="p-6 border-t bg-white bg-opacity-30">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          {showDetails ? 'Hide Guidelines Summary' : 'View Full Guidelines Summary'}
        </button>
        {showDetails && (
          <div className="mt-4 bg-gray-50 rounded-lg p-4 text-sm text-gray-700 border border-gray-200">
            <p className="mb-3">
              <strong>Source:</strong> {flowchart.guidelines.source}
            </p>
            <p className="mb-3">
              <strong>Guidelines Version:</strong> {flowchart.guidelines.version}
            </p>
            <p className="mb-3">
              <strong>Publication:</strong> {flowchart.guidelines.reference}
            </p>
            {flowchart.guidelines.doi && (
              <p>
                <strong>DOI:</strong>{' '}
                <a
                  href={`https://doi.org/${flowchart.guidelines.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {flowchart.guidelines.doi}
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function FlowchartsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Clinical Decision Flowcharts</h1>
            <p className="text-lg text-gray-600">
              Evidence-based decision support algorithms for acute care emergencies
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Guidelines Currency & Accuracy</p>
            <p>
              All flowcharts reflect peer-reviewed guidelines published within the last 5 years from
              authoritative organizations (AHA, ASA, Surviving Sepsis Campaign). Last updated: November 2025.
            </p>
          </div>
        </div>
      </div>

      {/* Flowcharts Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {flowchartData.map((flowchart) => (
          <FlowchartCard key={flowchart.id} flowchart={flowchart} />
        ))}
      </div>

      {/* Footer Info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Clinical Disclaimer
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            These flowcharts are educational tools designed to support clinical decision-making in
            emergency and acute care settings. They should not replace clinical judgment, institutional
            protocols, or direct consultation with experienced clinicians.
          </p>
          <p className="text-sm text-gray-700">
            Always adhere to your institution's policies, local regulations, and current best practices.
            Guidelines are updated regularly; verify you are using the most current version.
          </p>
        </div>
      </div>
    </div>
  );
}
