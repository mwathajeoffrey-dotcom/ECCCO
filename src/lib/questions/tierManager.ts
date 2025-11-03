import { Question } from './types';

export interface QuestionTier {
  tier: number;
  name: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced' | 'Expert' | 'Master' | 'Specialist' | 'Consultant';
  description: string;
  questions: Question[];
  prerequisites?: number[]; // Previous tiers that should be completed
  estimatedTime: number; // in minutes
  passingScore: number; // percentage
}

export interface TierManager {
  totalQuestions: number;
  questionsPerTier: number;
  totalTiers: number;
  tiers: QuestionTier[];
}

export class OncologicEmergencyTierManager {
  private allQuestions: Question[] = [];
  private readonly QUESTIONS_PER_TIER = 30;
  private readonly TOTAL_TIERS = 7;
  private readonly TOTAL_QUESTIONS = 210;

  constructor(questions: Question[]) {
    this.allQuestions = [...questions]; // Create a copy to avoid mutations
    this.validateQuestionCount();
  }

  private validateQuestionCount(): void {
    if (this.allQuestions.length < this.TOTAL_QUESTIONS) {
      console.warn(`Warning: Only ${this.allQuestions.length} questions available. Need ${this.TOTAL_QUESTIONS} for complete tier system.`);
    }
  }

  /**
   * Shuffle array using Fisher-Yates algorithm to ensure randomness
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Organize questions by difficulty level
   */
  private organizeByDifficulty(): { easy: Question[], medium: Question[], hard: Question[] } {
    const organized = {
      easy: this.allQuestions.filter(q => q.difficulty === 'easy' || !q.difficulty),
      medium: this.allQuestions.filter(q => q.difficulty === 'medium'),
      hard: this.allQuestions.filter(q => q.difficulty === 'hard')
    };

    // If no difficulty is set, distribute evenly
    if (organized.easy.length === this.allQuestions.length) {
      const shuffled = this.shuffleArray(this.allQuestions);
      const third = Math.ceil(shuffled.length / 3);
      organized.easy = shuffled.slice(0, third);
      organized.medium = shuffled.slice(third, third * 2);
      organized.hard = shuffled.slice(third * 2);
    }

    return organized;
  }

  /**
   * Create balanced tiers with progressive difficulty
   */
  public createTiers(): QuestionTier[] {
    const organized = this.organizeByDifficulty();
    const tiers: QuestionTier[] = [];

    // Shuffle each difficulty level to ensure randomness
    const shuffledEasy = this.shuffleArray(organized.easy);
    const shuffledMedium = this.shuffleArray(organized.medium);
    const shuffledHard = this.shuffleArray(organized.hard);

    // Calculate questions per tier for each difficulty
    const easyPerTier = Math.floor(shuffledEasy.length / this.TOTAL_TIERS);
    const mediumPerTier = Math.floor(shuffledMedium.length / this.TOTAL_TIERS);
    const hardPerTier = Math.floor(shuffledHard.length / this.TOTAL_TIERS);

    for (let tierIndex = 0; tierIndex < this.TOTAL_TIERS; tierIndex++) {
      const tierQuestions: Question[] = [];
      
      // Progressive difficulty distribution
      let easyCount, mediumCount, hardCount;
      
      if (tierIndex < 2) {
        // Tiers 1-2: Mostly easy, some medium
        easyCount = 20;
        mediumCount = 8;
        hardCount = 2;
      } else if (tierIndex < 4) {
        // Tiers 3-4: Balanced
        easyCount = 10;
        mediumCount = 15;
        hardCount = 5;
      } else {
        // Tiers 5-7: Mostly medium/hard
        easyCount = 5;
        mediumCount = 12;
        hardCount = 13;
      }

      // Add questions from each difficulty level
      const startEasy = tierIndex * easyPerTier;
      const startMedium = tierIndex * mediumPerTier;
      const startHard = tierIndex * hardPerTier;

      tierQuestions.push(
        ...shuffledEasy.slice(startEasy, startEasy + Math.min(easyCount, shuffledEasy.length - startEasy)),
        ...shuffledMedium.slice(startMedium, startMedium + Math.min(mediumCount, shuffledMedium.length - startMedium)),
        ...shuffledHard.slice(startHard, startHard + Math.min(hardCount, shuffledHard.length - startHard))
      );

      // Fill remaining slots if needed
      const remaining = this.QUESTIONS_PER_TIER - tierQuestions.length;
      if (remaining > 0) {
        const allRemaining = [
          ...shuffledEasy.slice(startEasy + easyCount),
          ...shuffledMedium.slice(startMedium + mediumCount),
          ...shuffledHard.slice(startHard + hardCount)
        ].filter(q => !tierQuestions.includes(q));
        
        tierQuestions.push(...allRemaining.slice(0, remaining));
      }

      // Final shuffle of tier questions
      const finalTierQuestions = this.shuffleArray(tierQuestions.slice(0, this.QUESTIONS_PER_TIER));

      tiers.push(this.createTier(tierIndex + 1, finalTierQuestions));
    }

    return tiers;
  }

  private createTier(tierNumber: number, questions: Question[]): QuestionTier {
    const tierConfigs = [
      {
        name: 'Foundation Tier',
        difficulty: 'Foundation' as const,
        description: 'Basic oncologic emergency recognition and initial management principles',
        prerequisites: [],
        estimatedTime: 45,
        passingScore: 70
      },
      {
        name: 'Core Emergency Tier',
        difficulty: 'Intermediate' as const,
        description: 'Common oncologic emergencies with standard treatment protocols',
        prerequisites: [1],
        estimatedTime: 50,
        passingScore: 75
      },
      {
        name: 'Advanced Management Tier',
        difficulty: 'Advanced' as const,
        description: 'Complex scenarios requiring advanced decision-making skills',
        prerequisites: [1, 2],
        estimatedTime: 55,
        passingScore: 80
      },
      {
        name: 'Critical Care Tier',
        difficulty: 'Expert' as const,
        description: 'ICU-level oncologic emergencies and multi-organ complications',
        prerequisites: [1, 2, 3],
        estimatedTime: 60,
        passingScore: 80
      },
      {
        name: 'Specialist Tier',
        difficulty: 'Master' as const,
        description: 'Rare emergencies and drug-specific toxicities requiring specialist knowledge',
        prerequisites: [1, 2, 3, 4],
        estimatedTime: 65,
        passingScore: 85
      },
      {
        name: 'Consultant Tier',
        difficulty: 'Specialist' as const,
        description: 'Complex multi-system emergencies requiring consultant-level expertise',
        prerequisites: [1, 2, 3, 4, 5],
        estimatedTime: 70,
        passingScore: 85
      },
      {
        name: 'Master Clinician Tier',
        difficulty: 'Consultant' as const,
        description: 'Most challenging scenarios requiring mastery of all oncologic emergency principles',
        prerequisites: [1, 2, 3, 4, 5, 6],
        estimatedTime: 75,
        passingScore: 90
      }
    ];

    const config = tierConfigs[tierNumber - 1];

    return {
      tier: tierNumber,
      name: config.name,
      difficulty: config.difficulty,
      description: config.description,
      questions,
      prerequisites: config.prerequisites,
      estimatedTime: config.estimatedTime,
      passingScore: config.passingScore
    };
  }

  /**
   * Get a specific tier
   */
  public getTier(tierNumber: number): QuestionTier | null {
    const tiers = this.createTiers();
    return tiers.find(tier => tier.tier === tierNumber) || null;
  }

  /**
   * Get all tiers
   */
  public getAllTiers(): QuestionTier[] {
    return this.createTiers();
  }

  /**
   * Check if user is eligible for a tier
   */
  public isEligibleForTier(tierNumber: number, completedTiers: number[]): boolean {
    const tier = this.getTier(tierNumber);
    if (!tier || !tier.prerequisites) return true;
    
    return tier.prerequisites.every(prereq => completedTiers.includes(prereq));
  }

  /**
   * Get next available tier for user
   */
  public getNextAvailableTier(completedTiers: number[]): QuestionTier | null {
    const allTiers = this.getAllTiers();
    
    for (const tier of allTiers) {
      if (!completedTiers.includes(tier.tier) && this.isEligibleForTier(tier.tier, completedTiers)) {
        return tier;
      }
    }
    
    return null; // All tiers completed
  }

  /**
   * Validate no duplicate questions across tiers
   */
  public validateNoDuplicates(): { isValid: boolean; duplicates: string[] } {
    const allTiers = this.getAllTiers();
    const allQuestionIds = new Set<string>();
    const duplicates: string[] = [];

    for (const tier of allTiers) {
      for (const question of tier.questions) {
        if (allQuestionIds.has(question.id)) {
          duplicates.push(question.id);
        } else {
          allQuestionIds.add(question.id);
        }
      }
    }

    return {
      isValid: duplicates.length === 0,
      duplicates
    };
  }

  /**
   * Get progress statistics
   */
  public getProgressStats(completedTiers: number[]): {
    totalTiers: number;
    completedTiers: number;
    progressPercentage: number;
    nextTier: QuestionTier | null;
    totalQuestions: number;
    questionsCompleted: number;
  } {
    const allTiers = this.getAllTiers();
    const nextTier = this.getNextAvailableTier(completedTiers);
    const questionsCompleted = completedTiers.length * this.QUESTIONS_PER_TIER;

    return {
      totalTiers: this.TOTAL_TIERS,
      completedTiers: completedTiers.length,
      progressPercentage: (completedTiers.length / this.TOTAL_TIERS) * 100,
      nextTier,
      totalQuestions: this.TOTAL_QUESTIONS,
      questionsCompleted
    };
  }
}

// Export utility functions
export const createOncologicTierManager = (questions: Question[]): OncologicEmergencyTierManager => {
  return new OncologicEmergencyTierManager(questions);
};

export const shuffleQuestions = (questions: Question[]): Question[] => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};