/**
 * PALS Emergency Drug Reference Guide
 * Quick reference for pediatric emergency medications
 */

'use client';

import { useState } from 'react';
import { Search, Pill, AlertTriangle, Clock, Droplets, Zap, Heart } from 'lucide-react';

interface EmergencyDrug {
  name: string;
  genericName?: string;
  category: 'cardiac' | 'respiratory' | 'neurological' | 'anesthesia' | 'antiarrhythmic' | 'vasopressor' | 'reversal';
  indications: string[];
  pediatricDose: {
    dose: string;
    route: string;
    concentration?: string;
    maxDose?: string;
    notes?: string;
  };
  contraindications: string[];
  sideEffects: string[];
  monitoring: string[];
  onset: string;
  duration: string;
  preparation: string;
  emergencyNotes: string;
  color: string;
}

const emergencyDrugs: EmergencyDrug[] = [
  {
    name: 'Epinephrine',
    genericName: 'Adrenaline',
    category: 'cardiac',
    indications: [
      'Cardiac arrest (asystole, PEA, VF/VT)',
      'Severe anaphylaxis',
      'Severe bronchospasm unresponsive to bronchodilators'
    ],
    pediatricDose: {
      dose: '0.01 mg/kg IV/IO (cardiac arrest), 0.01 mg/kg IM (anaphylaxis)',
      route: 'IV/IO/IM/ET',
      concentration: '1:10,000 (IV/IO), 1:1,000 (IM)',
      maxDose: '1 mg (IV/IO), 0.5 mg (IM)',
      notes: 'ET dose: 0.1 mg/kg (1:1,000)'
    },
    contraindications: ['None in emergency situations'],
    sideEffects: ['Tachycardia', 'Hypertension', 'Arrhythmias', 'Anxiety'],
    monitoring: ['Heart rate', 'Blood pressure', 'ECG rhythm'],
    onset: '1-3 minutes (IV), 5-10 minutes (IM)',
    duration: '5-10 minutes',
    preparation: 'Ready to use ampules. Dilute 1:1,000 for IV use.',
    emergencyNotes: 'First-line drug for cardiac arrest. May repeat every 3-5 minutes.',
    color: 'red'
  },
  {
    name: 'Amiodarone',
    category: 'antiarrhythmic',
    indications: [
      'VF/VT (pulseless)',
      'Supraventricular tachycardia with hemodynamic instability',
      'Wide-complex tachycardia'
    ],
    pediatricDose: {
      dose: '5 mg/kg IV/IO (loading dose)',
      route: 'IV/IO',
      concentration: '50 mg/mL',
      maxDose: '300 mg (loading), 15 mg/kg/day (total)',
      notes: 'May repeat up to 15 mg/kg total daily dose'
    },
    contraindications: ['Severe sinus node dysfunction', 'AV block (without pacemaker)'],
    sideEffects: ['Hypotension', 'Bradycardia', 'Heart block', 'Phlebitis'],
    monitoring: ['Blood pressure', 'Heart rate', 'ECG', 'Liver function'],
    onset: '15-30 minutes (IV)',
    duration: '6-12 hours',
    preparation: 'Dilute in D5W or NS. Avoid in saline for peripheral IV.',
    emergencyNotes: 'Preferred antiarrhythmic for shock-refractory VF/VT in children.',
    color: 'purple'
  },
  {
    name: 'Adenosine',
    category: 'antiarrhythmic',
    indications: [
      'SVT with narrow QRS complex',
      'Wide-complex tachycardia (diagnostic/therapeutic)'
    ],
    pediatricDose: {
      dose: '0.1 mg/kg IV/IO (1st dose), 0.2 mg/kg IV/IO (2nd dose)',
      route: 'IV/IO (rapid push)',
      concentration: '3 mg/mL',
      maxDose: '6 mg (1st dose), 12 mg (2nd dose)',
      notes: 'Follow immediately with 20 mL saline flush'
    },
    contraindications: ['2nd/3rd degree AV block', 'Sick sinus syndrome', 'Known accessory pathway'],
    sideEffects: ['Transient chest pain', 'Dyspnea', 'Flushing', 'Brief asystole'],
    monitoring: ['Continuous ECG monitoring', 'Blood pressure'],
    onset: '30-60 seconds',
    duration: '1-2 minutes',
    preparation: 'Draw up with saline flush ready. Use largest, most proximal IV.',
    emergencyNotes: 'Must give rapid IV push followed immediately by saline flush.',
    color: 'green'
  },
  {
    name: 'Atropine',
    category: 'cardiac',
    indications: [
      'Symptomatic bradycardia',
      'AV block',
      'Organophosphate poisoning'
    ],
    pediatricDose: {
      dose: '0.02 mg/kg IV/IO',
      route: 'IV/IO/IM/ET',
      concentration: '0.1 mg/mL (pediatric), 1 mg/mL (adult)',
      maxDose: '1 mg',
      notes: 'Minimum dose 0.1 mg to avoid paradoxical bradycardia'
    },
    contraindications: ['Tachycardia', 'Myocardial ischemia', 'Glaucoma'],
    sideEffects: ['Tachycardia', 'Dry mouth', 'Confusion', 'Urinary retention'],
    monitoring: ['Heart rate', 'Blood pressure', 'Mental status'],
    onset: '1-2 minutes (IV)',
    duration: '30-60 minutes',
    preparation: 'Use pediatric concentration to avoid dosing errors.',
    emergencyNotes: 'Avoid doses <0.1 mg which may cause paradoxical bradycardia.',
    color: 'blue'
  },
  {
    name: 'Lorazepam',
    genericName: 'Ativan',
    category: 'neurological',
    indications: [
      'Status epilepticus',
      'Seizures',
      'Severe agitation'
    ],
    pediatricDose: {
      dose: '0.1 mg/kg IV/IO/IM',
      route: 'IV/IO/IM',
      concentration: '2 mg/mL, 4 mg/mL',
      maxDose: '4 mg',
      notes: 'May repeat once after 5-10 minutes'
    },
    contraindications: ['Respiratory depression', 'Severe hepatic impairment'],
    sideEffects: ['Respiratory depression', 'Sedation', 'Confusion', 'Hypotension'],
    monitoring: ['Respiratory rate', 'Oxygen saturation', 'Blood pressure', 'Mental status'],
    onset: '1-3 minutes (IV), 15-30 minutes (IM)',
    duration: '6-8 hours',
    preparation: 'May dilute with equal volume of saline for IV administration.',
    emergencyNotes: 'First-line benzodiazepine for status epilepticus. Have airway support ready.',
    color: 'yellow'
  },
  {
    name: 'Midazolam',
    genericName: 'Versed',
    category: 'neurological',
    indications: [
      'Status epilepticus (when IV access unavailable)',
      'Procedural sedation',
      'Severe agitation'
    ],
    pediatricDose: {
      dose: '0.2 mg/kg IM (seizures), 0.1-0.2 mg/kg IV',
      route: 'IV/IO/IM/IN',
      concentration: '1 mg/mL, 5 mg/mL',
      maxDose: '10 mg (IM), 5 mg (IV)',
      notes: 'Intranasal: 0.2 mg/kg using 5 mg/mL concentration'
    },
    contraindications: ['Respiratory depression', 'Severe hepatic impairment', 'Myasthenia gravis'],
    sideEffects: ['Respiratory depression', 'Sedation', 'Confusion', 'Amnesia'],
    monitoring: ['Respiratory rate', 'Oxygen saturation', 'Blood pressure', 'Mental status'],
    onset: '1-2 minutes (IV), 5-10 minutes (IM), 10-15 minutes (IN)',
    duration: '2-4 hours',
    preparation: 'For IN use: Use 5 mg/mL concentration with atomizer.',
    emergencyNotes: 'Preferred for IM route when IV access unavailable. Reversible with flumazenil.',
    color: 'orange'
  },
  {
    name: 'Albuterol',
    genericName: 'Salbutamol',
    category: 'respiratory',
    indications: [
      'Bronchospasm',
      'Asthma exacerbation',
      'Anaphylaxis with bronchospasm'
    ],
    pediatricDose: {
      dose: '2.5 mg (<20 kg), 5 mg (≥20 kg) nebulized',
      route: 'Inhalation (nebulizer/MDI)',
      concentration: '0.5% (5 mg/mL) for nebulization',
      maxDose: '5 mg per dose',
      notes: 'May repeat every 20 minutes × 3 doses initially'
    },
    contraindications: ['Hypersensitivity to albuterol'],
    sideEffects: ['Tachycardia', 'Tremor', 'Hypokalemia', 'Hyperglycemia'],
    monitoring: ['Heart rate', 'Respiratory rate', 'Oxygen saturation', 'Peak flow'],
    onset: '5-15 minutes',
    duration: '4-6 hours',
    preparation: 'Dilute in 3 mL normal saline for nebulization.',
    emergencyNotes: 'First-line bronchodilator. Monitor for paradoxical bronchospasm.',
    color: 'lightblue'
  },
  {
    name: 'Naloxone',
    genericName: 'Narcan',
    category: 'reversal',
    indications: [
      'Opioid overdose',
      'Respiratory depression from opioids',
      'Altered mental status (suspected opioid)'
    ],
    pediatricDose: {
      dose: '0.1 mg/kg IV/IO/IM/IN',
      route: 'IV/IO/IM/IN',
      concentration: '0.4 mg/mL, 1 mg/mL',
      maxDose: '2 mg',
      notes: 'May repeat every 2-3 minutes if no response'
    },
    contraindications: ['Hypersensitivity to naloxone'],
    sideEffects: ['Withdrawal symptoms', 'Agitation', 'Hypertension', 'Arrhythmias'],
    monitoring: ['Respiratory rate', 'Mental status', 'Blood pressure', 'Heart rate'],
    onset: '1-2 minutes (IV), 5 minutes (IM/IN)',
    duration: '30-90 minutes',
    preparation: 'Shorter duration than most opioids - may need repeated doses.',
    emergencyNotes: 'May precipitate withdrawal in opioid-dependent patients. Be prepared for agitation.',
    color: 'pink'
  }
];

export function PALSDrugReference() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDrug, setSelectedDrug] = useState<EmergencyDrug | null>(null);

  const categories = [
    { value: 'all', label: 'All Drugs', icon: Pill },
    { value: 'cardiac', label: 'Cardiac', icon: Heart },
    { value: 'respiratory', label: 'Respiratory', icon: Droplets },
    { value: 'neurological', label: 'Neurological', icon: Zap },
    { value: 'antiarrhythmic', label: 'Antiarrhythmic', icon: Zap },
    { value: 'reversal', label: 'Reversal', icon: AlertTriangle }
  ];

  const filteredDrugs = emergencyDrugs.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drug.indications.some(indication => 
                           indication.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = selectedCategory === 'all' || drug.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Pill className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">PALS Drug Reference</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Quick reference guide for pediatric emergency medications with dosing, 
          contraindications, and administration notes.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search drugs or indications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Drug List or Detail View */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Drug List */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Emergency Drugs ({filteredDrugs.length})
          </h2>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredDrugs.map((drug, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedDrug === drug
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedDrug(drug)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{drug.name}</h3>
                    {drug.genericName && (
                      <p className="text-sm text-gray-600">({drug.genericName})</p>
                    )}
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full`}
                    style={{ backgroundColor: drug.color }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {drug.indications[0]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Drug Detail */}
        <div className="lg:col-span-2">
          {selectedDrug ? (
            <div className="space-y-6">
              {/* Drug Header */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedDrug.name}</h2>
                    {selectedDrug.genericName && (
                      <p className="text-lg text-gray-600">({selectedDrug.genericName})</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize text-white`}
                        style={{ backgroundColor: selectedDrug.color }}>
                    {selectedDrug.category}
                  </span>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded p-4">
                  <h4 className="font-semibold text-red-900 mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Emergency Notes
                  </h4>
                  <p className="text-red-800 text-sm">{selectedDrug.emergencyNotes}</p>
                </div>
              </div>

              {/* Dosing Information */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Pediatric Dosing</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold">Dose:</span> {selectedDrug.pediatricDose.dose}
                  </div>
                  <div>
                    <span className="font-semibold">Route:</span> {selectedDrug.pediatricDose.route}
                  </div>
                  {selectedDrug.pediatricDose.concentration && (
                    <div>
                      <span className="font-semibold">Concentration:</span> {selectedDrug.pediatricDose.concentration}
                    </div>
                  )}
                  {selectedDrug.pediatricDose.maxDose && (
                    <div>
                      <span className="font-semibold">Maximum Dose:</span> {selectedDrug.pediatricDose.maxDose}
                    </div>
                  )}
                  {selectedDrug.pediatricDose.notes && (
                    <div className="bg-blue-100 border border-blue-200 rounded p-3 mt-3">
                      <span className="font-semibold">Notes:</span> {selectedDrug.pediatricDose.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Clinical Information */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Indications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Indications</h3>
                  <ul className="space-y-2">
                    {selectedDrug.indications.map((indication, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{indication}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contraindications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Contraindications</h3>
                  <ul className="space-y-2">
                    {selectedDrug.contraindications.map((contraindication, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{contraindication}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Side Effects */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Side Effects</h3>
                  <ul className="space-y-2">
                    {selectedDrug.sideEffects.map((effect, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{effect}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Monitoring */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Monitoring</h3>
                  <ul className="space-y-2">
                    {selectedDrug.monitoring.map((parameter, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{parameter}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pharmacokinetics */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 text-gray-600 mr-2" />
                    <span className="font-semibold text-gray-900">Onset</span>
                  </div>
                  <p className="text-sm text-gray-700">{selectedDrug.onset}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 text-gray-600 mr-2" />
                    <span className="font-semibold text-gray-900">Duration</span>
                  </div>
                  <p className="text-sm text-gray-700">{selectedDrug.duration}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Pill className="w-4 h-4 text-gray-600 mr-2" />
                    <span className="font-semibold text-gray-900">Preparation</span>
                  </div>
                  <p className="text-sm text-gray-700">{selectedDrug.preparation}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Pill className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Drug</h3>
              <p className="text-gray-600">
                Choose a drug from the list to view detailed information including dosing, 
                contraindications, and administration guidelines.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Safety Warning */}
      <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-800 mb-1">Medical Disclaimer</h3>
            <p className="text-sm text-red-700">
              This reference is for educational purposes only. Always verify dosing calculations, 
              check local protocols, and consult with medical supervision before administering 
              any medications. Drug information may vary by manufacturer and institution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}