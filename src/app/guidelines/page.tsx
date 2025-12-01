'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Download, AlertCircle, ZoomIn, ZoomOut, Copy } from 'lucide-react';
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
  const [zoomLevels, setZoomLevels] = useState<Record<string, number>>({});
  const [touchStartDistance, setTouchStartDistance] = useState<number>(0);
  const containerRefs = useRef<Record<string, HTMLDivElement>>({});

  const getZoom = (flowchartId: string) => zoomLevels[flowchartId] || 1;

  const handleZoomIn = (flowchartId: string) => {
    setZoomLevels(prev => ({
      ...prev,
      [flowchartId]: Math.min((prev[flowchartId] || 1) + 0.2, 2)
    }));
  };

  const handleZoomOut = (flowchartId: string) => {
    setZoomLevels(prev => ({
      ...prev,
      [flowchartId]: Math.max((prev[flowchartId] || 1) - 0.2, 0.5)
    }));
  };

  const handleZoomReset = (flowchartId: string) => {
    setZoomLevels(prev => ({
      ...prev,
      [flowchartId]: 1
    }));
  };

  const handleTouchStart = (e: React.TouchEvent, flowchartId: string) => {
    if (e.touches.length === 2) {
      // Pinch gesture - calculate distance between two touch points
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      setTouchStartDistance(distance);
    }
  };

  const handleTouchMove = (e: React.TouchEvent, flowchartId: string) => {
    if (e.touches.length === 2 && touchStartDistance > 0) {
      // Two-finger touch move - pinch zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      // Calculate pinch ratio
      const ratio = distance / touchStartDistance;
      const currentZoom = getZoom(flowchartId);
      let newZoom = currentZoom * ratio;

      // Clamp between 0.5 and 2
      newZoom = Math.max(0.5, Math.min(2, newZoom));

      setZoomLevels(prev => ({
        ...prev,
        [flowchartId]: newZoom
      }));

      setTouchStartDistance(distance);
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setTouchStartDistance(0);
  };

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
            flowchartId="cardiac-arrest"
            title="ACLS: Cardiac Arrest"
            description="Ventricular fibrillation, pulseless ventricular tachycardia, asystole, pulseless electrical activity, and post-resuscitation care"
            category="ACLS"
            isExpanded={expandedFlowchart === 'cardiac-arrest'}
            onToggle={() => setExpandedFlowchart(expandedFlowchart === 'cardiac-arrest' ? null : 'cardiac-arrest')}
            zoom={getZoom('cardiac-arrest')}
            onZoomIn={() => handleZoomIn('cardiac-arrest')}
            onZoomOut={() => handleZoomOut('cardiac-arrest')}
            onZoomReset={() => handleZoomReset('cardiac-arrest')}
            onTouchStart={(e) => handleTouchStart(e, 'cardiac-arrest')}
            onTouchMove={(e) => handleTouchMove(e, 'cardiac-arrest')}
            onTouchEnd={handleTouchEnd}
          >
            <ACLSFlowchart />
          </FlowchartCard>

          <FlowchartCard
            flowchartId="bradycardia"
            title="ACLS: Bradycardia"
            description="Symptomatic bradycardia assessment and management including atropine, transcutaneous pacing, and AV block classification"
            category="ACLS"
            isExpanded={expandedFlowchart === 'bradycardia'}
            onToggle={() => setExpandedFlowchart(expandedFlowchart === 'bradycardia' ? null : 'bradycardia')}
            zoom={getZoom('bradycardia')}
            onZoomIn={() => handleZoomIn('bradycardia')}
            onZoomOut={() => handleZoomOut('bradycardia')}
            onZoomReset={() => handleZoomReset('bradycardia')}
            onTouchStart={(e) => handleTouchStart(e, 'bradycardia')}
            onTouchMove={(e) => handleTouchMove(e, 'bradycardia')}
            onTouchEnd={handleTouchEnd}
          >
            <ACLSBradycardiaFlowchart />
          </FlowchartCard>

          <FlowchartCard
            flowchartId="tachycardia"
            title="ACLS: Tachycardia"
            description="Stable and unstable tachycardia management including SVT, ventricular tachycardia, and atrial fibrillation with RVR"
            category="ACLS"
            isExpanded={expandedFlowchart === 'tachycardia'}
            onToggle={() => setExpandedFlowchart(expandedFlowchart === 'tachycardia' ? null : 'tachycardia')}
            zoom={getZoom('tachycardia')}
            onZoomIn={() => handleZoomIn('tachycardia')}
            onZoomOut={() => handleZoomOut('tachycardia')}
            onZoomReset={() => handleZoomReset('tachycardia')}
            onTouchStart={(e) => handleTouchStart(e, 'tachycardia')}
            onTouchMove={(e) => handleTouchMove(e, 'tachycardia')}
            onTouchEnd={handleTouchEnd}
          >
            <ACLSTachycardiaFlowchart />
          </FlowchartCard>

          <FlowchartCard
            flowchartId="sepsis"
            title="Sepsis Management"
            description="Early recognition and management of sepsis including fluid resuscitation, lactate clearance, and antibiotic timing"
            category="Medical"
            isExpanded={expandedFlowchart === 'sepsis'}
            onToggle={() => setExpandedFlowchart(expandedFlowchart === 'sepsis' ? null : 'sepsis')}
            zoom={getZoom('sepsis')}
            onZoomIn={() => handleZoomIn('sepsis')}
            onZoomOut={() => handleZoomOut('sepsis')}
            onZoomReset={() => handleZoomReset('sepsis')}
            onTouchStart={(e) => handleTouchStart(e, 'sepsis')}
            onTouchMove={(e) => handleTouchMove(e, 'sepsis')}
            onTouchEnd={handleTouchEnd}
          >
            <SepsisFlowchart />
          </FlowchartCard>

          <FlowchartCard
            flowchartId="stroke"
            title="Acute Ischemic Stroke"
            description="Stroke assessment and intervention including time windows, thrombolysis eligibility, and mechanical thrombectomy"
            category="Medical"
            isExpanded={expandedFlowchart === 'stroke'}
            onToggle={() => setExpandedFlowchart(expandedFlowchart === 'stroke' ? null : 'stroke')}
            zoom={getZoom('stroke')}
            onZoomIn={() => handleZoomIn('stroke')}
            onZoomOut={() => handleZoomOut('stroke')}
            onZoomReset={() => handleZoomReset('stroke')}
            onTouchStart={(e) => handleTouchStart(e, 'stroke')}
            onTouchMove={(e) => handleTouchMove(e, 'stroke')}
            onTouchEnd={handleTouchEnd}
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
  flowchartId: string;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
}

function FlowchartCard({
  title,
  description,
  category,
  isExpanded,
  onToggle,
  children,
  flowchartId,
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onTouchStart,
  onTouchMove,
  onTouchEnd
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
        <div className="border-t border-gray-200 bg-gray-50">
          {/* Zoom Controls */}
          <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <button
                onClick={onZoomOut}
                disabled={zoom <= 0.5}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Zoom out"
              >
                <ZoomOut className="h-4 w-4 text-gray-600" />
              </button>
              <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium text-gray-700 w-16 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={onZoomIn}
                disabled={zoom >= 2}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Zoom in"
              >
                <ZoomIn className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={onZoomReset}
                className="ml-2 px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                title="Reset zoom"
              >
                Reset
              </button>
            </div>
            <p className="text-xs text-gray-500">💡 Pinch to zoom or use buttons (works on mobile & desktop)</p>
          </div>
          
          {/* Flowchart Container with Zoom and Touch Support */}
          <div 
            className="p-6 overflow-x-auto touch-none"
            style={{ userSelect: 'none' }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', transition: 'transform 0.2s ease' }}>
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}