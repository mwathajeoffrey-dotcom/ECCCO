// Guideline monitoring system for ECCCO medical platform
import { Question } from '../questions/types';

export interface GuidelineStatus {
  name: string;
  organization: string;
  currentVersion: string;
  yearReleased: number;
  nextUpdateExpected?: number;
  criticalityLevel: 'high' | 'medium' | 'low';
  medicalDomains: string[];
}

export interface OutdatedReference {
  questionId: string;
  topicId: string;
  currentReference: string;
  suggestedUpdate: string;
  severity: 'critical' | 'moderate' | 'minor';
  lastReviewed?: Date;
}

// Current major medical guidelines (as of November 2025)
export const CURRENT_GUIDELINES: GuidelineStatus[] = [
  {
    name: 'AHA Guidelines for CPR and ECC',
    organization: 'American Heart Association',
    currentVersion: '2025',
    yearReleased: 2025,
    nextUpdateExpected: 2030,
    criticalityLevel: 'high',
    medicalDomains: ['cardiology', 'emergency', 'critical-care', 'resuscitation']
  },
  {
    name: 'AHA/ACC Heart Failure Guidelines',
    organization: 'AHA/ACC',
    currentVersion: '2024',
    yearReleased: 2024,
    nextUpdateExpected: 2027,
    criticalityLevel: 'high',
    medicalDomains: ['cardiology', 'critical-care']
  },
  {
    name: 'Surviving Sepsis Campaign',
    organization: 'Society of Critical Care Medicine',
    currentVersion: '2024',
    yearReleased: 2024,
    nextUpdateExpected: 2028,
    criticalityLevel: 'high',
    medicalDomains: ['infectious-disease', 'critical-care', 'emergency']
  },
  {
    name: 'ATLS Guidelines',
    organization: 'American College of Surgeons',
    currentVersion: '11th Edition',
    yearReleased: 2024,
    nextUpdateExpected: 2028,
    criticalityLevel: 'high',
    medicalDomains: ['trauma', 'surgery', 'emergency']
  },
  {
    name: 'Brain Trauma Foundation Guidelines',
    organization: 'Brain Trauma Foundation',
    currentVersion: '2023',
    yearReleased: 2023,
    nextUpdateExpected: 2028,
    criticalityLevel: 'high',
    medicalDomains: ['neurology', 'trauma', 'critical-care']
  },
  {
    name: 'ASA Difficult Airway Guidelines',
    organization: 'American Society of Anesthesiologists',
    currentVersion: '2022',
    yearReleased: 2022,
    nextUpdateExpected: 2027,
    criticalityLevel: 'high',
    medicalDomains: ['anesthesia', 'airway', 'emergency']
  }
];

export class GuidelineMonitor {
  
  /**
   * Scan all questions for outdated guideline references
   */
  static scanForOutdatedReferences(questions: Question[]): OutdatedReference[] {
    const outdated: OutdatedReference[] = [];
    
    questions.forEach(question => {
      question.references.forEach(reference => {
        const outdatedRef = this.checkReferenceAge(reference, question);
        if (outdatedRef) {
          outdated.push(outdatedRef);
        }
      });
    });
    
    return outdated.sort((a, b) => {
      const severityOrder = { critical: 3, moderate: 2, minor: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });
  }
  
  /**
   * Check if a specific reference is outdated
   */
  private static checkReferenceAge(reference: string, question: Question): OutdatedReference | null {
    // Extract years from reference string
    const yearMatches = reference.match(/\b(19|20)\d{2}\b/g);
    if (!yearMatches) return null;
    
    const referenceYear = Math.max(...yearMatches.map(Number));
    const currentYear = new Date().getFullYear();
    const ageInYears = currentYear - referenceYear;
    
    // Determine severity based on age and medical domain
    let severity: 'critical' | 'moderate' | 'minor' = 'minor';
    
    if (ageInYears >= 10) {
      severity = 'critical';
    } else if (ageInYears >= 5) {
      severity = 'moderate';
    } else if (ageInYears >= 3) {
      severity = 'minor';
    } else {
      return null; // Reference is current
    }
    
    // Check if it's a high-priority guideline domain
    const highPriorityTerms = ['AHA', 'ACLS', 'BLS', 'PALS', 'sepsis', 'ATLS', 'trauma'];
    const isHighPriority = highPriorityTerms.some(term => 
      reference.toLowerCase().includes(term.toLowerCase())
    );
    
    if (isHighPriority && ageInYears >= 3) {
      severity = severity === 'minor' ? 'moderate' : 'critical';
    }
    
    // Find suggested update
    const suggestedUpdate = this.findSuggestedUpdate(reference);
    
    return {
      questionId: question.id,
      topicId: question.topicId,
      currentReference: reference,
      suggestedUpdate,
      severity,
      lastReviewed: new Date()
    };
  }
  
  /**
   * Suggest updated guideline version
   */
  private static findSuggestedUpdate(reference: string): string {
    const currentGuidelines = CURRENT_GUIDELINES;
    
    for (const guideline of currentGuidelines) {
      // Check if reference matches this guideline domain
      const matchTerms = [
        guideline.name.toLowerCase(),
        guideline.organization.toLowerCase(),
        ...guideline.medicalDomains
      ];
      
      const referenceText = reference.toLowerCase();
      const matches = matchTerms.some(term => referenceText.includes(term));
      
      if (matches) {
        return `${guideline.name} ${guideline.currentVersion} (${guideline.organization})`;
      }
    }
    
    // Generic suggestion if no specific match found
    return `Consider updating to latest ${new Date().getFullYear()} guidelines`;
  }
  
  /**
   * Generate guideline currency report
   */
  static generateCurrencyReport(questions: Question[]): {
    totalQuestions: number;
    questionsWithOutdatedRefs: number;
    criticalUpdatesNeeded: number;
    moderateUpdatesNeeded: number;
    minorUpdatesNeeded: number;
    topicBreakdown: Record<string, number>;
    recommendations: string[];
  } {
    const outdatedRefs = this.scanForOutdatedReferences(questions);
    
    const critical = outdatedRefs.filter(ref => ref.severity === 'critical').length;
    const moderate = outdatedRefs.filter(ref => ref.severity === 'moderate').length;
    const minor = outdatedRefs.filter(ref => ref.severity === 'minor').length;
    
    // Count by topic
    const topicBreakdown: Record<string, number> = {};
    outdatedRefs.forEach(ref => {
      topicBreakdown[ref.topicId] = (topicBreakdown[ref.topicId] || 0) + 1;
    });
    
    // Generate recommendations
    const recommendations: string[] = [];
    if (critical > 0) {
      recommendations.push(`🚨 URGENT: ${critical} questions have critically outdated references (>5+ years old)`);
    }
    if (moderate > 0) {
      recommendations.push(`⚠️ MODERATE: ${moderate} questions need updates for recent guideline changes`);
    }
    if (minor > 0) {
      recommendations.push(`📋 MINOR: ${minor} questions could benefit from newer references`);
    }
    
    // Add topic-specific recommendations
    Object.entries(topicBreakdown)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .forEach(([topic, count]) => {
        recommendations.push(`🎯 Focus on "${topic}" topic: ${count} questions need updates`);
      });
    
    return {
      totalQuestions: questions.length,
      questionsWithOutdatedRefs: [...new Set(outdatedRefs.map(ref => ref.questionId))].length,
      criticalUpdatesNeeded: critical,
      moderateUpdatesNeeded: moderate,
      minorUpdatesNeeded: minor,
      topicBreakdown,
      recommendations
    };
  }
  
  /**
   * Get questions that need immediate attention
   */
  static getPriorityUpdates(questions: Question[]): Question[] {
    const outdatedRefs = this.scanForOutdatedReferences(questions);
    const criticalQuestionIds = outdatedRefs
      .filter(ref => ref.severity === 'critical')
      .map(ref => ref.questionId);
    
    return questions.filter(q => criticalQuestionIds.includes(q.id));
  }
}

// Utility function to check guideline currency across all questions
export async function checkGuidelineCurrency(): Promise<void> {
  try {
    // This would be called from your admin dashboard
    const allQuestions: Question[] = []; // Load from your question files
    
    const report = GuidelineMonitor.generateCurrencyReport(allQuestions);
    const priorityQuestions = GuidelineMonitor.getPriorityUpdates(allQuestions);
    
    console.log('📊 Guideline Currency Report:');
    console.log(`Total Questions: ${report.totalQuestions}`);
    console.log(`Questions Needing Updates: ${report.questionsWithOutdatedRefs}`);
    console.log(`Critical Updates: ${report.criticalUpdatesNeeded}`);
    console.log(`Priority Questions: ${priorityQuestions.length}`);
    
    report.recommendations.forEach(rec => console.log(rec));
    
  } catch (error) {
    console.error('Error checking guideline currency:', error);
  }
}

export default GuidelineMonitor;