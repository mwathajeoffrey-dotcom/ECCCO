'use client';

import { useState, useEffect } from 'react';
import { Calculator, Settings, RefreshCw } from 'lucide-react';
import { unitConverter, MedicalUnitConverter } from '@/lib/utils/unitConverter';

interface UnitConversionDisplayProps {
  text: string;
  className?: string;
  showConversions?: boolean;
}

interface UnitSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UnitConversionDisplay({ text, className = '', showConversions = true }: UnitConversionDisplayProps) {
  const [parsedData, setParsedData] = useState<any>(null);
  const [showAlternative, setShowAlternative] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const data = unitConverter.parseAndConvertText(text);
    setParsedData(data);
  }, [text]);

  if (!parsedData || parsedData.conversions.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const handleToggleUnit = (conversionIndex: number) => {
    setShowAlternative(prev => ({
      ...prev,
      [conversionIndex]: !prev[conversionIndex]
    }));
  };

  let displayText = parsedData.originalText;
  const sortedConversions = [...parsedData.conversions].sort((a, b) => b.position.start - a.position.start);

  // Replace text with convertible values
  sortedConversions.forEach((conversion, index) => {
    const isShowingAlternative = showAlternative[index];
    const value = isShowingAlternative ? conversion.convertedValue : conversion.originalValue;
    const unit = isShowingAlternative ? conversion.convertedUnit : conversion.originalUnit;
    const formattedValue = unitConverter.formatMedicalValue(value, unit);
    
    const replacement = showConversions ? (
      `<span class="inline-flex items-center">
        <button 
          class="text-blue-600 hover:text-blue-800 underline decoration-dotted cursor-pointer font-medium"
          data-conversion-index="${index}"
          title="Click to toggle between ${conversion.originalUnit} and ${conversion.convertedUnit}"
        >
          ${formattedValue} ${unit}
        </button>
        <span class="ml-1 text-xs text-gray-500">
          (${unitConverter.formatMedicalValue(
            isShowingAlternative ? conversion.originalValue : conversion.convertedValue,
            isShowingAlternative ? conversion.originalUnit : conversion.convertedUnit
          )} ${isShowingAlternative ? conversion.originalUnit : conversion.convertedUnit})
        </span>
      </span>`
    ) : `${formattedValue} ${unit}`;

    displayText = displayText.substring(0, conversion.position.start) + 
                 replacement + 
                 displayText.substring(conversion.position.end);
  });

  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: displayText }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        const conversionIndex = target.getAttribute('data-conversion-index');
        if (conversionIndex !== null) {
          handleToggleUnit(parseInt(conversionIndex));
        }
      }}
    />
  );
}

export function UnitSettings({ isOpen, onClose }: UnitSettingsProps) {
  const [preferences, setPreferences] = useState<{ [key: string]: string }>({});
  const unitPairs = unitConverter.getCommonUnitPairs();

  useEffect(() => {
    // Load current preferences
    const currentPrefs: { [key: string]: string } = {};
    unitPairs.forEach(pair => {
      const pref = unitConverter.getUserPreference(pair.type);
      if (pref) {
        currentPrefs[pair.type] = pref;
      } else {
        currentPrefs[pair.type] = pair.units[0]; // Default to first unit
      }
    });
    setPreferences(currentPrefs);
  }, [isOpen]);

  const handlePreferenceChange = (type: string, unit: string) => {
    setPreferences(prev => ({ ...prev, [type]: unit }));
    unitConverter.setUserPreference(type, unit);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calculator className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Unit Preferences</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Choose your preferred units for medical measurements. The platform will automatically show 
            values in your preferred units and provide conversions when needed.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {unitPairs.map((pair) => (
            <div key={pair.type} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{pair.label}</h3>
                  <p className="text-sm text-gray-500">{pair.description}</p>
                </div>
                <RefreshCw className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {pair.units.map((unit) => (
                  <label
                    key={unit}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      preferences[pair.type] === unit
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name={pair.type}
                      value={unit}
                      checked={preferences[pair.type] === unit}
                      onChange={(e) => handlePreferenceChange(pair.type, e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      preferences[pair.type] === unit
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {preferences[pair.type] === unit && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                    <span className="font-medium">{unit}</span>
                  </label>
                ))}
              </div>

              {/* Example conversions */}
              <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                <span className="font-medium text-gray-700">Example: </span>
                {pair.type === 'glucose' && (
                  <span>100 mg/dL = 5.6 mmol/L</span>
                )}
                {pair.type === 'temperature' && (
                  <span>98.6°F = 37.0°C</span>
                )}
                {pair.type === 'cholesterol' && (
                  <span>200 mg/dL = 5.2 mmol/L</span>
                )}
                {pair.type === 'creatinine' && (
                  <span>1.0 mg/dL = 88.4 μmol/L</span>
                )}
                {pair.type === 'hemoglobin' && (
                  <span>14.0 g/dL = 140 g/L</span>
                )}
                {pair.type === 'weight' && (
                  <span>70 kg = 154.3 lbs</span>
                )}
                {pair.type === 'height' && (
                  <span>170 cm = 5.6 ft</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Your preferences are saved locally and will persist across sessions.
            </div>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UnitConverterButton() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowSettings(true)}
        className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="Unit Conversion Settings"
      >
        <Calculator className="w-4 h-4 mr-1" />
        <span>Units</span>
      </button>
      
      <UnitSettings 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </>
  );
}