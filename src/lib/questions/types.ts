export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  references: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  topicId: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

export const emergencyTopics: Topic[] = [
  {
    id: 'airway-management',
    name: 'Airway Management',
    description: 'Comprehensive airway management in emergency and critical care settings',
    questions: []
  },
  {
    id: 'mechanical-ventilation',
    name: 'Mechanical Ventilation',
    description: 'Principles and management of mechanical ventilation',
    questions: []
  },
  {
    id: 'shock-resuscitation',
    name: 'Shock and Resuscitation',
    description: 'Recognition and management of different types of shock',
    questions: []
  },
  {
    id: 'sepsis-management',
    name: 'Sepsis Management',
    description: 'Early recognition and evidence-based treatment of sepsis',
    questions: []
  },
  {
    id: 'cardiac-emergencies',
    name: 'Cardiac Emergencies',
    description: 'Acute cardiac conditions and interventions',
    questions: []
  },
  {
    id: 'neurological-emergencies',
    name: 'Neurological Emergencies',
    description: 'Acute neurological conditions and management',
    questions: []
  },
  {
    id: 'toxicology',
    name: 'Toxicology',
    description: 'Poisoning and overdose management',
    questions: []
  },
  {
    id: 'trauma-management',
    name: 'Trauma Management',
    description: 'Primary and secondary trauma assessment and management',
    questions: []
  },
  {
    id: 'respiratory-emergencies',
    name: 'Respiratory Emergencies',
    description: 'Acute respiratory conditions and interventions',
    questions: []
  },
  {
    id: 'renal-emergencies',
    name: 'Renal Emergencies',
    description: 'Acute kidney injury and renal replacement therapy',
    questions: []
  },
  {
    id: 'endocrine-emergencies',
    name: 'Endocrine Emergencies',
    description: 'Diabetic emergencies and endocrine crises',
    questions: []
  },
  {
    id: 'pharmacology',
    name: 'Critical Care Pharmacology',
    description: 'Drug dosing, interactions, and monitoring in critical illness',
    questions: []
  },
  {
    id: 'procedures',
    name: 'Procedures',
    description: 'Common emergency and critical care procedures',
    questions: []
  },
  {
    id: 'infection-control',
    name: 'Infection Control',
    description: 'Hospital-acquired infections and antimicrobial stewardship',
    questions: []
  },
  {
    id: 'ethical-legal',
    name: 'Ethical and Legal Issues',
    description: 'End-of-life care, consent, and legal considerations',
    questions: []
  }
];

export const getQuestionsByTopic = (topicId: string): Question[] => {
  const topic = emergencyTopics.find(t => t.id === topicId);
  return topic?.questions || [];
};

export const getAllQuestions = (): Question[] => {
  return emergencyTopics.flatMap(topic => topic.questions);
};