"use client";

/**
 * Cross-Device Answer Visibility Test Page
 * 
 * This page tests answer visibility across different devices, browsers, and rendering scenarios
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, Monitor, Smartphone, Tablet } from 'lucide-react';

export default function AnswerVisibilityTestPage() {
  const [deviceInfo, setDeviceInfo] = useState<{
    userAgent: string;
    screenWidth: number;
    screenHeight: number;
    pixelRatio: number;
    browser: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getBrowser = () => {
        const ua = navigator.userAgent;
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        return 'Unknown';
      };

      setDeviceInfo({
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        pixelRatio: window.devicePixelRatio,
        browser: getBrowser()
      });
    }
  }, []);

  const sampleOptions = [
    "Continue intubation attempts",
    "Insert supraglottic airway", 
    "Immediate surgical airway",
    "Bag-mask ventilation with two providers"
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cross-Device Answer Visibility Test</h1>
        
        {/* Device Information */}
        {deviceInfo && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              <Monitor className="inline w-5 h-5 mr-2" />
              Device Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Browser:</strong> {deviceInfo.browser}
              </div>
              <div>
                <strong>Screen:</strong> {deviceInfo.screenWidth} × {deviceInfo.screenHeight}
              </div>
              <div>
                <strong>Pixel Ratio:</strong> {deviceInfo.pixelRatio}
              </div>
              <div className="col-span-full">
                <strong>User Agent:</strong> 
                <code className="block mt-1 p-2 bg-gray-100 rounded text-xs">
                  {deviceInfo.userAgent}
                </code>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Answer Options Test */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            ✅ Enhanced Answer Options (Fixed Version)
          </h2>
          <p className="text-gray-600 mb-6">
            These options use enhanced CSS with inline styles and !important declarations for maximum cross-device compatibility.
          </p>
          
          <div className="space-y-3">
            {sampleOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 touch-manipulation shadow-lg answer-option-default ${
                  selectedIndex === index
                    ? 'border-blue-600 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 shadow-xl ring-4 ring-blue-300 transform scale-[1.02] font-bold shadow-blue-200'
                    : 'border-gray-800 bg-white hover:bg-blue-50 hover:border-blue-600 hover:shadow-xl text-gray-900 font-bold shadow-gray-200'
                } cursor-pointer hover:scale-[1.01] active:scale-[0.99]`}
                style={{
                  // Force styles for cross-device compatibility
                  color: selectedIndex === index ? '#1e3a8a' : '#111827',
                  backgroundColor: selectedIndex === index ? '#dbeafe' : '#ffffff',
                  borderColor: selectedIndex === index ? '#2563eb' : '#374151',
                  fontWeight: 'bold',
                  minHeight: '60px'
                }}
              >
                <div className="flex items-start">
                  <span 
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold mr-3 sm:mr-4 text-sm sm:text-base flex-shrink-0 answer-badge ${
                      selectedIndex === index 
                        ? 'bg-blue-600 text-white ring-2 ring-blue-300' 
                        : 'bg-gray-800 text-white hover:bg-blue-600 hover:text-white'
                    }`}
                    style={{
                      // Force badge visibility across all devices
                      backgroundColor: selectedIndex === index ? '#2563eb' : '#374151',
                      color: '#ffffff',
                      fontWeight: 'bold',
                      width: '32px',
                      height: '32px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      marginRight: '12px'
                    }}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span 
                    className={`text-sm sm:text-base leading-relaxed flex-1 font-bold answer-text ${
                      selectedIndex === index 
                        ? 'font-bold text-blue-900' 
                        : 'font-bold text-gray-900'
                    }`}
                    style={{
                      // Force text visibility across all devices
                      color: selectedIndex === index ? '#1e3a8a' : '#111827',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      lineHeight: '1.5'
                    }}
                  >
                    {option}
                  </span>
                  {selectedIndex === index && (
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center ml-2 flex-shrink-0">✓</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Original Answer Options Test (for comparison) */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            ❌ Original Answer Options (Problem Version)
          </h2>
          <p className="text-gray-600 mb-6">
            These options show the original styling that was causing visibility issues on some devices.
          </p>
          
          <div className="space-y-2">
            {sampleOptions.map((option, index) => (
              <button
                key={index}
                className="w-full text-left p-3 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400"
              >
                <div className="flex items-start">
                  <span className="font-medium mr-2 text-sm text-gray-600">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="text-sm text-gray-500">{option}</span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              ⚠️ Issues: Very faint text, poor contrast, inconsistent rendering across devices
            </p>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🔧 Technical Implementation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">CSS Enhancements:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Inline styles with !important declarations</li>
                <li>• High specificity CSS selectors</li>
                <li>• Device-specific media queries</li>
                <li>• Browser-specific vendor prefixes</li>
                <li>• Fallback styles for older browsers</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Cross-Device Fixes:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Force minimum font sizes and weights</li>
                <li>• Guaranteed color contrast ratios</li>
                <li>• Touch-friendly sizing (44px+ targets)</li>
                <li>• High DPI display optimizations</li>
                <li>• WebKit and Firefox specific rules</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link 
              href="/exam"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Test in Actual Exam Interface
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}