'use client';

import React, { useState } from 'react';
import { ArrowLeft, Download, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { ACLSFlowchart } from '@/components/flowcharts/ACLSFlowchart';
import { ACLSBradycardiaFlowchart } from '@/components/flowcharts/ACLSBradycardiaFlowchart';
import { ACLSTachycardiaFlowchart } from '@/components/flowcharts/ACLSTachycardiaFlowchart';
import { SepsisFlowchart } from '@/components/flowcharts/SepsisFlowchart';
import { StrokeFlowchart } from '@/components/flowcharts/StrokeFlowchart';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function GuidelinesPage() {
  const [expandedFlowchart, setExpandedFlowchart] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Clinical Decision Flowcharts</h1>
              <p className="text-gray-600 mt-1">Quick reference guides for emergency protocols and clinical decision-making</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Guidelines Currency Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Guidelines Current as of 2024</h3>
            <p className="text-sm text-blue-800">All flowcharts are based on the latest AHA/ACC, Sepsis Alliance, and American Stroke Association guidelines. For the most current protocols, always consult your local protocols and the original guideline documents.</p>
          </div>
        </div>

        {/* Flowcharts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FlowchartCard
            title="ACLS: Cardiac Arrest"
            description="Ventricular fibrillation, pulseless ventricular tachycardia, asystole, pulseless electrical activity, and post-resuscitation care"
            category="ACLS"
            isExpanded={expandedFlowchart === 'cardiac-arrest'}
            onToggle={() => setExpandedFlowchart(expandedFlowchart === 'cardiac-arrest' ? null : 'cardiac-arrest')}
          >
            <ACLSFlowchart />
          </FlowchartCard>

          <FlowchartCard
            title="ACLS: Bradycardia"
            description="Symptomatic bradycardia assessment and management including atropine, transcutaneous pacing, and AV block classification"
            category="ACLS"
            isExpanded={expandedFlowchart === 'bradycardia'}
            onToggle={() => setExpandedFlowchart(expandedFlowchart === 'bradycardia' ? null : 'bradycardia')}
          >
            <ACLSBradycardiaFlowchart />
          </FlowchartCard>

          <FlowchartCard
            title="ACLS: Tachycardia"
            description="Stable and unstable tachycardia management including SVT, ventricular tachycardia, and atrial fibrillation with RVR"
            category="ACLS"
            isExpanded={expandedFlowchart === 'tachycardia'}
            onToggle={() => setExpandedFlowchart(expandedFlowchart === 'tachycardia' ? null : 'tachycardia')}
          >
            <ACLSTachycardiaFlowchart />
          </FlowchartCard>

          <FlowchartCard
            title="Sepsis Management"
            description="Early recognition and management of sepsis including fluid resuscitation, lactate clearance, and antibiotic timing"
            category="Medical"
            isExpanded={expandedFlowchart === 'sepsis'}
            onToggle={() => setExpandedFlowchart(expandedFlowchart === 'sepsis' ? null : 'sepsis')}
          >
            <SepsisFlowchart />
          </FlowchartCard>

          <FlowchartCard
            title="Acute Ischemic Stroke"
            description="Stroke assessment and intervention including time windows, thrombolysis eligibility, and mechanical thrombectomy"
            category="Medical"
            isExpanded={expandedFlowchart === 'stroke'}
            onToggle={() => setExpandedFlowchart(expandedFlowchart === 'stroke' ? null : 'stroke')}
          >
            <StrokeFlowchart />
          </FlowchartCard>
        </div>

        {/* References and Guidelines */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reference Guidelines</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-red-500 pl-6">
              <h3 className="font-semibold text-gray-900 mb-2">Cardiac Life Support (ACLS)</h3>
              <p className="text-sm text-gray-600 mb-3">
                American Heart Association Advanced Cardiac Life Support algorithms updated 2024
              </p>
              <a 
                href="https://doi.org/10.1161/CIR.0000000000001144"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View AHA Guidelines →
              </a>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6">
              <h3 className="font-semibold text-gray-900 mb-2">Sepsis Management</h3>
              <p className="text-sm text-gray-600 mb-3">
                Surviving Sepsis Campaign guidelines for the management of sepsis and septic shock
              </p>
              <a 
                href="https://doi.org/10.1097/CCM.0000000000005928"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Guidelines →
              </a>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="font-semibold text-gray-900 mb-2">Acute Ischemic Stroke</h3>
              <p className="text-sm text-gray-600 mb-3">
                American Heart Association/American Stroke Association guidelines for acute ischemic stroke
              </p>
              <a 
                href="https://doi.org/10.1161/STR.0000000000000386"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Guidelines →
              </a>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-semibold text-gray-900 mb-2">Emergency Medicine Protocols</h3>
              <p className="text-sm text-gray-600 mb-3">
                ACEP and emergency medicine consensus guidelines for critical procedures
              </p>
              <a 
                href="https://www.acep.org/how-we-serve/sections-and-councils/clinical-emergency-medicine-committee/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Resources →
              </a>
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-8 text-center text-sm text-gray-600 bg-gray-50 rounded-lg p-6">
          <p>
            <strong>Disclaimer:</strong> These flowcharts are provided for educational purposes and should always be used in conjunction with current institutional protocols, physician judgment, and the most recent clinical evidence. Always consult your local protocols and medical director for current treatment algorithms.
          </p>
        </div>
      </div>
    </div>
  );
}

interface FlowchartCardProps {
  title: string;
  description: string;
  category: 'ACLS' | 'Medical';
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FlowchartCard({
  title,
  description,
  category,
  isExpanded,
  onToggle,
  children
}: FlowchartCardProps) {
  const categoryColor = category === 'ACLS' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700';

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all ${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}`}>
      <div className="p-6 cursor-pointer hover:bg-gray-50 transition-colors" onClick={onToggle}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColor}`}>
                {category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="ml-4 p-2 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Download className={`h-5 w-5 text-blue-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="overflow-x-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}