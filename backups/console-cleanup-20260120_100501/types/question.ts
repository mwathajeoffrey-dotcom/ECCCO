/**
 * Shared Question Type
 * Use this interface across ALL components to ensure consistency
 */

export interface PatientPresentation {
  age: number | string;
  gender: string;
  chiefComplaint: string;
  vitalSigns?: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    respiratoryRate: number;
    oxygenSaturation: number;
  };
  vitals?: string; // Backward compatibility
  currentMedications?: string[];
  allergies?: string[];
  pastMedicalHistory?: string[];
  physicalExam?: string;
  labsImaging?: string;
}

export interface GuidelineVersion {
  name: string;
  year: number;
  organization: string;
  lastUpdated: Date;
}

export interface Question {
  id: string;
  question: string;  // ✅ Standardized field name
  options: string[] | string;  // Allow both formats (API may return string)
  correctIndex: number;
  explanation: string;
  references: string[] | string;  // Allow both formats
  difficulty: 'easy' | 'medium' | 'hard';
  topicId: string;
  
  // Optional enhanced fields
  category?: string;
  topic?: string;
  clinicalScenario?: string;
  patientPresentation?: PatientPresentation;
  imageDescription?: string;
  clinicalPearls?: string[];
  learningObjectives?: string[];
  guidelineVersion?: GuidelineVersion;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  questionCount?: number;
  category?: string;
}
