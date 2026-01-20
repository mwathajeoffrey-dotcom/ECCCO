/**
 * Interactive PALS CPR Training Simulator
 * Provides real-time feedback for pediatric CPR scenarios
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Heart, Timer, CheckCircle, AlertCircle, Baby } from 'lucide-react';

interface CPRScenario {
  id: string;
  title: string;
  description: string;
  patientAge: string;
  patientWeight: string;
  compressionRate: number;
  compressionDepth: string;
  ventilationRate: number;
  compressionToVentilationRatio: string;
  handPosition: string;
  scenario: string;
}

const palsScenarios: CPRScenario[] = [
  {
    id: 'infant-cardiac-arrest',
    title: 'Infant Cardiac Arrest',
    description: 'Unresponsive 6-month-old infant in cardiac arrest',
    patientAge: '6 months',
    patientWeight: '7 kg',
    compressionRate: 120,
    compressionDepth: '4 cm (1.5 inches)',
    ventilationRate: 8,
    compressionToVentilationRatio: '15:2',
    handPosition: 'Two-finger technique or two-thumb encircling hands',
    scenario: 'A 6-month-old infant is found unresponsive. No pulse is detected. Begin CPR immediately.'
  },
  {
    id: 'child-cardiac-arrest',
    title: 'Child Cardiac Arrest',
    description: 'Unresponsive 5-year-old child in cardiac arrest',
    patientAge: '5 years',
    patientWeight: '18 kg',
    compressionRate: 110,
    compressionDepth: '5 cm (2 inches)',
    ventilationRate: 6,
    compressionToVentilationRatio: '15:2',
    handPosition: 'One or two hands on lower half of breastbone',
    scenario: 'A 5-year-old child collapsed during recess. No pulse is palpable. Initiate pediatric CPR.'
  },
  {
    id: 'adolescent-cardiac-arrest',
    title: 'Adolescent Cardiac Arrest',
    description: 'Unresponsive 14-year-old in cardiac arrest',
    patientAge: '14 years',
    patientWeight: '45 kg',
    compressionRate: 110,
    compressionDepth: '5-6 cm (2-2.4 inches)',
    ventilationRate: 6,
    compressionToVentilationRatio: '30:2',
    handPosition: 'Two hands on lower half of breastbone',
    scenario: 'A 14-year-old athlete collapsed during practice. No pulse detected. Begin resuscitation.'
  }
];

export function PALSCPRSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<CPRScenario>(palsScenarios[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [compressionCount, setCompressionCount] = useState(0);
  const [ventilationCount, setVentilationCount] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [lastCompressionTime, setLastCompressionTime] = useState<number>(0);
  const [compressionRate, setCompressionRate] = useState<number>(0);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(time => time + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Calculate compression rate
  useEffect(() => {
    if (compressionCount > 0 && elapsedTime > 0) {
      const rate = Math.round((compressionCount / elapsedTime) * 60);
      setCompressionRate(rate);
    }
  }, [compressionCount, elapsedTime]);

  const startSimulation = () => {
    setIsRunning(true);
    addFeedback(`CPR simulation started for ${selectedScenario.title}`);
  };

  const pauseSimulation = () => {
    setIsRunning(false);
    addFeedback('CPR simulation paused');
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setCompressionCount(0);
    setVentilationCount(0);
    setCurrentCycle(1);
    setCompressionRate(0);
    setFeedback([]);
    addFeedback('CPR simulation reset');
  };

  const addFeedback = useCallback((message: string) => {
    setFeedback(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
  }, []);

  const recordCompression = () => {
    if (!isRunning) return;

    const now = Date.now();
    const timeSinceLastCompression = now - lastCompressionTime;
    
    setCompressionCount(prev => prev + 1);
    setLastCompressionTime(now);

    // Rate feedback
    if (lastCompressionTime > 0 && timeSinceLastCompression > 0) {
      const instantRate = 60000 / timeSinceLastCompression; // Convert to compressions per minute
      
      if (instantRate < selectedScenario.compressionRate - 10) {
        addFeedback('Compressions too slow - increase rate');
      } else if (instantRate > selectedScenario.compressionRate + 10) {
        addFeedback('Compressions too fast - slow down');
      }
    }

    // Check for ventilation reminder
    const ratio = selectedScenario.compressionToVentilationRatio;
    const [compressions, ventilations] = ratio.split(':').map(Number);
    
    if (compressionCount % compressions === compressions - 1) {
      addFeedback(`Give ${ventilations} ventilation(s) now!`);
    }
  };

  const recordVentilation = () => {
    if (!isRunning) return;
    
    setVentilationCount(prev => prev + 1);
    addFeedback('Ventilation recorded');

    // Check if cycle is complete
    const ratio = selectedScenario.compressionToVentilationRatio;
    const [compressions, ventilations] = ratio.split(':').map(Number);
    
    if (compressionCount >= compressions * currentCycle && ventilationCount >= ventilations * currentCycle) {
      setCurrentCycle(prev => prev + 1);
      addFeedback(`Cycle ${currentCycle} complete - continue CPR`);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getRateFeedbackColor = () => {
    const targetRate = selectedScenario.compressionRate;
    const diff = Math.abs(compressionRate - targetRate);
    
    if (diff <= 5) return 'text-green-600';
    if (diff <= 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-red-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">PALS CPR Simulator</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Practice pediatric CPR techniques with real-time feedback and timing. 
          Select a scenario and begin your simulation.
        </p>
      </div>

      {/* Scenario Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Training Scenario</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {palsScenarios.map((scenario) => (
            <div
              key={scenario.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedScenario.id === scenario.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedScenario(scenario)}
            >
              <h3 className="font-semibold text-gray-900 mb-2">{scenario.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{scenario.description}</p>
              <div className="text-xs text-gray-500">
                <p>Age: {scenario.patientAge} • Weight: {scenario.patientWeight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Scenario Details */}
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Baby className="w-5 h-5 mr-2" />
          {selectedScenario.title}
        </h3>
        <p className="text-blue-800 mb-4">{selectedScenario.scenario}</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-semibold">Compression Rate:</span>
            <br />
            {selectedScenario.compressionRate} per minute
          </div>
          <div>
            <span className="font-semibold">Compression Depth:</span>
            <br />
            {selectedScenario.compressionDepth}
          </div>
          <div>
            <span className="font-semibold">Ratio:</span>
            <br />
            {selectedScenario.compressionToVentilationRatio}
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <span className="font-semibold">Hand Position:</span>
            <br />
            {selectedScenario.handPosition}
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Timer and Controls */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {formatTime(elapsedTime)}
            </div>
            <div className="text-sm text-gray-600">Elapsed Time</div>
          </div>

          <div className="flex justify-center space-x-4">
            {!isRunning ? (
              <button
                onClick={startSimulation}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play className="w-5 h-5 mr-2" />
                Start CPR
              </button>
            ) : (
              <button
                onClick={pauseSimulation}
                className="flex items-center px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </button>
            )}
            
            <button
              onClick={resetSimulation}
              className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getRateFeedbackColor()}`}>
                {compressionRate}
              </div>
              <div className="text-sm text-gray-600">Rate/min</div>
              <div className="text-xs text-gray-500">
                Target: {selectedScenario.compressionRate}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {currentCycle}
              </div>
              <div className="text-sm text-gray-600">Cycles</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {compressionCount}
              </div>
              <div className="text-sm text-gray-600">Compressions</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {ventilationCount}
              </div>
              <div className="text-sm text-gray-600">Ventilations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={recordCompression}
          disabled={!isRunning}
          className="flex items-center justify-center py-8 text-xl font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <Heart className="w-8 h-8 mr-3" />
          COMPRESSION
        </button>
        
        <button
          onClick={recordVentilation}
          disabled={!isRunning}
          className="flex items-center justify-center py-8 text-xl font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <Timer className="w-8 h-8 mr-3" />
          VENTILATION
        </button>
      </div>

      {/* Feedback Panel */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
          Real-time Feedback
        </h3>
        
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {feedback.length === 0 ? (
            <p className="text-gray-500 text-sm">Start simulation to see feedback...</p>
          ) : (
            feedback.map((message, index) => (
              <div
                key={index}
                className="flex items-start text-sm"
              >
                <AlertCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                <span className="text-gray-700">{message}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}