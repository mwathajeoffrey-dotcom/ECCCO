import { Question } from '@/lib/questions/types';

export interface CaseScenario {
  id: string;
  title: string;
  presentation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  learningPoints: string[];
}

export const allCases: CaseScenario[] = [];

export const getCaseById = (id: string) => allCases.find((c) => c.id === id);
export const getCasesByCategory = (category: string) => allCases.filter((c) => c.category.toLowerCase() === category.toLowerCase());
export const getCasesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => allCases.filter((c) => c.difficulty === difficulty);
