/**
 * Centralized Configuration
 * All app configuration in one place
 */

export const APP_CONFIG = {
  name: "ECCCO",
  fullName: "Emergency & Critical Care Competency Online",
  description:
    "Master emergency medicine with 5000+ practice questions, evidence-based guidelines, and clinical algorithms",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://eccco.vercel.app",

  // Exam settings
  exam: {
    defaultDuration: 45 * 60, // 45 minutes in seconds
    questionsPerExam: 30,
    maxQuestionsPerSession: 100,
  },

  // Search settings
  search: {
    evidenceLibrarySize: "170M+",
    guidelinesCount: "1,500+",
    questionsCount: "5,000+",
    defaultSearchLimit: 30,
    maxSearchLimit: 100,
  },

  // Mobile settings
  mobile: {
    minTouchTargetSize: 44, // pixels (Apple HIG standard)
  },

  // Performance settings
  performance: {
    debounceDelay: 300, // ms
    searchDebounceDelay: 500, // ms
    imageQuality: 85,
  },

  // Analytics
  analytics: {
    enabled: process.env.NODE_ENV === "production",
  },

  // Feature flags
  features: {
    evidenceSearch: true,
    guidelinesSearch: true,
    algorithms: true,
    analytics: true,
    socialSharing: false, // Not yet implemented
    offlineMode: false, // Not yet implemented
  },
} as const;

export const ROUTES = {
  HOME: "/",
  EXAM: "/exam",
  PRACTICE: "/practice",
  PRACTICE_ACLS: "/practice/acls",
  PRACTICE_PALS: "/practice/pals",
  EVIDENCE_SEARCH: "/evidence-search",
  GUIDELINES_SEARCH: "/guidelines-search",
  DASHBOARD: "/dashboard",
  BOOKMARKS: "/bookmarks",
  ANALYTICS: "/dashboard/analytics",
  EMERGENCY_REFERENCES: "/emergency-references",
  SUPPORT: "/support",
} as const;

export const API_ROUTES = {
  QUESTIONS: "/api/questions",
  TOPICS: "/api/topics",
  EVIDENCE: "/api/evidence/search",
  GUIDELINES: "/api/guidelines/search",
  EXAM_SAVE: "/api/exam/save",
  ANALYTICS: "/api/analytics/record",
} as const;
