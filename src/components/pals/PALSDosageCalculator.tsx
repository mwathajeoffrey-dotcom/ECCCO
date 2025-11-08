/**
 * PALS Pediatric Dosage Calculator
 * Interactive tool for calculating weight-based drug dosages in pediatric emergencies
 */

'use client';

import { useState } from 'react';
import { Calculator, Baby, AlertTriangle, Info } from 'lucide-react';

interface DrugDosage {
  name: string;
  indication: string;
  dose: string;
  calculation: (weight: number) => { dose: number; unit: string; max?: number };
  route: string;
  notes?: string;
  category: 'cardiac' | 'respiratory' | 'neurological' | 'general';
}

const palsDrugs: DrugDosage[] = [
  {
    name: 'Epinephrine',
    indication: 'Cardiac Arrest',
    dose: '0.01 mg/kg IV/IO (0.1 mL/kg of 1:10,000)',
    calculation: (weight) => ({ dose: weight * 0.01, unit: 'mg', max: 1 }),
    route: 'IV/IO',
    notes: 'Maximum single dose: 1 mg. May repeat every 3-5 minutes.',
    category: 'cardiac'
  },
  {
    name: 'Epinephrine (ET)',
    indication: 'Cardiac Arrest (Endotracheal)',
    dose: '0.1 mg/kg ET (0.1 mL/kg of 1:1,000)',
    calculation: (weight) => ({ dose: weight * 0.1, unit: 'mg', max: 2.5 }),
    route: 'Endotracheal',
    notes: 'Use only if IV/IO access not available. Dilute in 3-5 mL normal saline.',
    category: 'cardiac'
  },
  {
    name: 'Amiodarone',
    indication: 'VF/VT',
    dose: '5 mg/kg IV/IO',
    calculation: (weight) => ({ dose: weight * 5, unit: 'mg', max: 300 }),
    route: 'IV/IO',
    notes: 'Maximum single dose: 300 mg. May repeat up to 15 mg/kg total.',
    category: 'cardiac'
  },
  {
    name: 'Adenosine (1st dose)',
    indication: 'SVT',
    dose: '0.1 mg/kg IV/IO',
    calculation: (weight) => ({ dose: weight * 0.1, unit: 'mg', max: 6 }),
    route: 'IV/IO (rapid push)',
    notes: 'Maximum 1st dose: 6 mg. Follow immediately with 20 mL saline flush.',
    category: 'cardiac'
  },
  {
    name: 'Adenosine (2nd dose)',
    indication: 'SVT (if 1st dose ineffective)',
    dose: '0.2 mg/kg IV/IO',
    calculation: (weight) => ({ dose: weight * 0.2, unit: 'mg', max: 12 }),
    route: 'IV/IO (rapid push)',
    notes: 'Maximum 2nd dose: 12 mg. Follow immediately with 20 mL saline flush.',
    category: 'cardiac'
  },
  {
    name: 'Albuterol',
    indication: 'Bronchospasm/Asthma',
    dose: '2.5 mg (< 20 kg) or 5 mg (≥ 20 kg)',
    calculation: (weight) => ({ 
      dose: weight < 20 ? 2.5 : 5, 
      unit: 'mg',
      max: 5 
    }),
    route: 'Nebulized',
    notes: 'May repeat every 20 minutes for 3 doses, then every 1-4 hours.',
    category: 'respiratory'
  },
  {
    name: 'Lorazepam',
    indication: 'Status Epilepticus',
    dose: '0.1 mg/kg IV/IO',
    calculation: (weight) => ({ dose: weight * 0.1, unit: 'mg', max: 4 }),
    route: 'IV/IO/IM',
    notes: 'Maximum single dose: 4 mg. May repeat once after 5-10 minutes.',
    category: 'neurological'
  },
  {
    name: 'Midazolam (IM)',
    indication: 'Status Epilepticus (no IV access)',
    dose: '0.2 mg/kg IM',
    calculation: (weight) => ({ dose: weight * 0.2, unit: 'mg', max: 10 }),
    route: 'Intramuscular',
    notes: 'Maximum single dose: 10 mg. Use when IV/IO access not available.',
    category: 'neurological'
  },
  {
    name: 'Normal Saline',
    indication: 'Fluid Resuscitation',
    dose: '20 mL/kg IV/IO',
    calculation: (weight) => ({ dose: weight * 20, unit: 'mL' }),
    route: 'IV/IO',
    notes: 'May repeat up to 60 mL/kg total. Reassess after each bolus.',
    category: 'general'
  }
];

export function PALSDosageCalculator() {
  const [weight, setWeight] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDrug, setSelectedDrug] = useState<DrugDosage | null>(null);

  const weightNum = parseFloat(weight) || 0;
  
  const filteredDrugs = selectedCategory === 'all' 
    ? palsDrugs 
    : palsDrugs.filter(drug => drug.category === selectedCategory);

  const categories = [
    { value: 'all', label: 'All Drugs', icon: '💊' },
    { value: 'cardiac', label: 'Cardiac', icon: '💗' },
    { value: 'respiratory', label: 'Respiratory', icon: '🫁' },
    { value: 'neurological', label: 'Neurological', icon: '🧠' },
    { value: 'general', label: 'General', icon: '🏥' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Calculator className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">PALS Dosage Calculator</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate weight-based medication dosages for pediatric emergencies following 
          current PALS guidelines. Always verify calculations and consult protocols.
        </p>
      </div>

      {/* Weight Input */}
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <div className="flex items-center mb-4">
          <Baby className="w-5 h-5 text-blue-600 mr-2" />
          <label className="text-lg font-semibold text-gray-900">
            Patient Weight
          </label>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            min="0"
            step="0.1"
          />
          <span className="text-lg font-medium text-gray-700">kg</span>
        </div>
        {weightNum > 0 && (
          <p className="mt-2 text-sm text-gray-600">
            Weight: {weight} kg ({(weightNum * 2.2).toFixed(1)} lbs)
          </p>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Drug Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon} {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Drug List */}
      <div className="grid gap-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Select Medication ({filteredDrugs.length} available)
        </h2>
        
        {filteredDrugs.map((drug, index) => {
          const calculation = weightNum > 0 ? drug.calculation(weightNum) : null;
          const isMaxDoseReached = calculation && calculation.max && calculation.dose > calculation.max;
          
          return (
            <div
              key={index}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedDrug === drug
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedDrug(selectedDrug === drug ? null : drug)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{drug.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{drug.indication}</p>
                  <p className="text-sm text-blue-600">{drug.dose}</p>
                  <p className="text-xs text-gray-500">Route: {drug.route}</p>
                </div>
                
                {calculation && (
                  <div className="text-right ml-4">
                    <div className={`text-lg font-bold ${
                      isMaxDoseReached ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {isMaxDoseReached ? calculation.max : calculation.dose.toFixed(2)} {calculation.unit}
                    </div>
                    {isMaxDoseReached && (
                      <div className="flex items-center text-xs text-red-600 mt-1">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Max dose
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {selectedDrug === drug && drug.notes && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="flex items-start">
                    <Info className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-yellow-800">{drug.notes}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Safety Warning */}
      <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-800 mb-1">Important Safety Information</h3>
            <p className="text-sm text-red-700">
              This calculator is for educational purposes only. Always verify calculations, 
              check local protocols, and consult with medical supervision before administering 
              medications. Dosing recommendations may vary by institution and clinical situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}