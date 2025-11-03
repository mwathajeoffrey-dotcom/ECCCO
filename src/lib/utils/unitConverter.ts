// Medical Unit Conversion Utilities for ECCCO Platform
export interface UnitConversion {
  value: number;
  unit: string;
  alternatives?: { value: number; unit: string }[];
}

export interface ConversionRule {
  from: string;
  to: string;
  factor?: number;
  formula?: (value: number) => number;
  reverseFormula?: (value: number) => number;
}

// Comprehensive medical unit conversion rules
const CONVERSION_RULES: ConversionRule[] = [
  // Glucose
  { from: 'mg/dL', to: 'mmol/L', formula: (val) => val / 18.0 },
  { from: 'mmol/L', to: 'mg/dL', formula: (val) => val * 18.0 },
  
  // Temperature
  { from: '°F', to: '°C', formula: (val) => (val - 32) * 5/9 },
  { from: '°C', to: '°F', formula: (val) => (val * 9/5) + 32 },
  
  // Cholesterol
  { from: 'mg/dL', to: 'mmol/L', formula: (val) => val / 38.67 },
  { from: 'mmol/L', to: 'mg/dL', formula: (val) => val * 38.67 },
  
  // Triglycerides
  { from: 'mg/dL', to: 'mmol/L', formula: (val) => val / 88.57 },
  { from: 'mmol/L', to: 'mg/dL', formula: (val) => val * 88.57 },
  
  // Creatinine
  { from: 'mg/dL', to: 'μmol/L', formula: (val) => val * 88.4 },
  { from: 'μmol/L', to: 'mg/dL', formula: (val) => val / 88.4 },
  
  // Urea/BUN
  { from: 'mg/dL', to: 'mmol/L', formula: (val) => val / 2.8 },
  { from: 'mmol/L', to: 'mg/dL', formula: (val) => val * 2.8 },
  
  // Bilirubin
  { from: 'mg/dL', to: 'μmol/L', formula: (val) => val * 17.1 },
  { from: 'μmol/L', to: 'mg/dL', formula: (val) => val / 17.1 },
  
  // Hemoglobin
  { from: 'g/dL', to: 'g/L', factor: 10 },
  { from: 'g/L', to: 'g/dL', factor: 0.1 },
  
  // Weight
  { from: 'lbs', to: 'kg', factor: 0.453592 },
  { from: 'kg', to: 'lbs', factor: 2.20462 },
  
  // Height
  { from: 'ft', to: 'cm', formula: (val) => val * 30.48 },
  { from: 'cm', to: 'ft', formula: (val) => val / 30.48 },
  { from: 'in', to: 'cm', factor: 2.54 },
  { from: 'cm', to: 'in', factor: 0.393701 },
  
  // Pressure
  { from: 'mmHg', to: 'kPa', factor: 0.133322 },
  { from: 'kPa', to: 'mmHg', factor: 7.50062 },
];

// Common medical value patterns with their potential units
const MEDICAL_VALUE_PATTERNS = [
  { 
    pattern: /(\d+\.?\d*)\s*(mg\/dL|mg\/dl)\s*glucose/gi,
    primaryUnit: 'mg/dL',
    alternativeUnit: 'mmol/L',
    type: 'glucose'
  },
  {
    pattern: /(\d+\.?\d*)\s*(mmol\/L|mmol\/l)\s*glucose/gi,
    primaryUnit: 'mmol/L',
    alternativeUnit: 'mg/dL',
    type: 'glucose'
  },
  {
    pattern: /(\d+\.?\d*)\s*°F/gi,
    primaryUnit: '°F',
    alternativeUnit: '°C',
    type: 'temperature'
  },
  {
    pattern: /(\d+\.?\d*)\s*°C/gi,
    primaryUnit: '°C',
    alternativeUnit: '°F',
    type: 'temperature'
  },
  {
    pattern: /(\d+\.?\d*)\s*(mg\/dL|mg\/dl)\s*(cholesterol|ldl|hdl)/gi,
    primaryUnit: 'mg/dL',
    alternativeUnit: 'mmol/L',
    type: 'cholesterol'
  },
  {
    pattern: /(\d+\.?\d*)\s*(mg\/dL|mg\/dl)\s*(creatinine)/gi,
    primaryUnit: 'mg/dL',
    alternativeUnit: 'μmol/L',
    type: 'creatinine'
  },
  {
    pattern: /(\d+\.?\d*)\s*(g\/dL|g\/dl)\s*(hemoglobin|hgb)/gi,
    primaryUnit: 'g/dL',
    alternativeUnit: 'g/L',
    type: 'hemoglobin'
  }
];

export class MedicalUnitConverter {
  private static instance: MedicalUnitConverter;
  private userPreferences: { [key: string]: string } = {};

  private constructor() {
    // Load user preferences from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('eccco_unit_preferences');
      if (saved) {
        try {
          this.userPreferences = JSON.parse(saved);
        } catch (e) {
          console.warn('Failed to parse unit preferences');
        }
      }
    }
  }

  static getInstance(): MedicalUnitConverter {
    if (!MedicalUnitConverter.instance) {
      MedicalUnitConverter.instance = new MedicalUnitConverter();
    }
    return MedicalUnitConverter.instance;
  }

  /**
   * Convert a value from one unit to another
   */
  convert(value: number, fromUnit: string, toUnit: string): number | null {
    const rule = CONVERSION_RULES.find(r => 
      (r.from.toLowerCase() === fromUnit.toLowerCase() && r.to.toLowerCase() === toUnit.toLowerCase())
    );

    if (!rule) return null;

    if (rule.formula) {
      return rule.formula(value);
    } else if (rule.factor) {
      return value * rule.factor;
    }

    return null;
  }

  /**
   * Get all available conversions for a given unit
   */
  getAvailableConversions(unit: string): string[] {
    return CONVERSION_RULES
      .filter(r => r.from.toLowerCase() === unit.toLowerCase())
      .map(r => r.to);
  }

  /**
   * Format a number with appropriate decimal places for medical values
   */
  formatMedicalValue(value: number, unit: string): string {
    let decimals = 1;
    
    // Special formatting rules for different types
    if (unit.includes('°')) decimals = 1; // Temperature
    else if (unit.includes('mmol')) decimals = 1; // mmol units
    else if (unit.includes('μmol')) decimals = 0; // μmol units (whole numbers)
    else if (unit.includes('mg/dL') && value > 100) decimals = 0; // Large glucose values
    else if (unit.includes('g/L')) decimals = 0; // Hemoglobin in g/L
    
    return value.toFixed(decimals);
  }

  /**
   * Set user preference for a specific measurement type
   */
  setUserPreference(type: string, unit: string): void {
    this.userPreferences[type] = unit;
    if (typeof window !== 'undefined') {
      localStorage.setItem('eccco_unit_preferences', JSON.stringify(this.userPreferences));
    }
  }

  /**
   * Get user preference for a specific measurement type
   */
  getUserPreference(type: string): string | null {
    return this.userPreferences[type] || null;
  }

  /**
   * Parse text and identify medical values with units, providing conversions
   */
  parseAndConvertText(text: string): {
    originalText: string;
    conversions: Array<{
      originalValue: number;
      originalUnit: string;
      convertedValue: number;
      convertedUnit: string;
      type: string;
      position: { start: number; end: number };
    }>;
  } {
    const conversions: any[] = [];
    let processedText = text;

    MEDICAL_VALUE_PATTERNS.forEach(pattern => {
      let match;
      const regex = new RegExp(pattern.pattern.source, pattern.pattern.flags);
      
      while ((match = regex.exec(text)) !== null) {
        const value = parseFloat(match[1]);
        const unit = match[2] || pattern.primaryUnit;
        
        // Determine target unit based on user preference or default alternative
        const userPref = this.getUserPreference(pattern.type);
        const targetUnit = userPref || pattern.alternativeUnit;
        
        if (unit.toLowerCase() !== targetUnit.toLowerCase()) {
          const convertedValue = this.convert(value, unit, targetUnit);
          
          if (convertedValue !== null) {
            conversions.push({
              originalValue: value,
              originalUnit: unit,
              convertedValue,
              convertedUnit: targetUnit,
              type: pattern.type,
              position: { start: match.index, end: match.index + match[0].length }
            });
          }
        }
      }
    });

    return {
      originalText: text,
      conversions
    };
  }

  /**
   * Get common unit pairs for UI selection
   */
  getCommonUnitPairs(): Array<{
    type: string;
    label: string;
    units: string[];
    description: string;
  }> {
    return [
      {
        type: 'glucose',
        label: 'Blood Glucose',
        units: ['mg/dL', 'mmol/L'],
        description: 'Blood sugar measurements'
      },
      {
        type: 'temperature',
        label: 'Temperature',
        units: ['°F', '°C'],
        description: 'Body temperature'
      },
      {
        type: 'cholesterol',
        label: 'Cholesterol',
        units: ['mg/dL', 'mmol/L'],
        description: 'Cholesterol, LDL, HDL levels'
      },
      {
        type: 'creatinine',
        label: 'Creatinine',
        units: ['mg/dL', 'μmol/L'],
        description: 'Kidney function marker'
      },
      {
        type: 'hemoglobin',
        label: 'Hemoglobin',
        units: ['g/dL', 'g/L'],
        description: 'Blood hemoglobin levels'
      },
      {
        type: 'weight',
        label: 'Weight',
        units: ['kg', 'lbs'],
        description: 'Patient weight'
      },
      {
        type: 'height',
        label: 'Height',
        units: ['cm', 'ft'],
        description: 'Patient height'
      }
    ];
  }
}

export const unitConverter = MedicalUnitConverter.getInstance();