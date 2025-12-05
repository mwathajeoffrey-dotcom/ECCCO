'use client';

import React from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function FlowchartsPage() {
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

      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Coming Soon Card */}
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Clock className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          
          <p className="text-xl text-gray-600 mb-6">
            We're redesigning our clinical decision flowcharts to provide you with the best possible experience. New, improved flowcharts will be available shortly.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-blue-800">
              In the meantime, please refer to the official guidelines:
            </p>
            <ul className="mt-4 space-y-3 text-left">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 font-bold">•</span>
                <a href="https://doi.org/10.1161/CIR.0000000000001144" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                  AHA Advanced Cardiac Life Support (ACLS) Guidelines 2024
                </a>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 font-bold">•</span>
                <a href="https://doi.org/10.1097/CCM.0000000000005928" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                  Surviving Sepsis Campaign Guidelines
                </a>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 font-bold">•</span>
                <a href="https://doi.org/10.1161/STR.0000000000000386" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                  AHA/ASA Acute Ischemic Stroke Guidelines
                </a>
              </li>
            </ul>
          </div>
          
          <Link 
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
