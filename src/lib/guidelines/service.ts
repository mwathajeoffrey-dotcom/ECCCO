/**
 * Medical Guidelines and References Management
 * 
 * Comprehensive system for managing PDF guidelines, medical references,
 * and clinical protocols with search, categorization, and offline access.
 */

export interface MedicalGuideline {
  id: string;
  title: string;
  organization: string;
  category: GuidelineCategory;
  specialty: MedicalSpecialty;
  publicationDate: string;
  lastUpdated: string;
  version: string;
  description: string;
  fileUrl: string;
  fileSize: number;
  pageCount: number;
  tags: string[];
  difficulty: 'basic' | 'intermediate' | 'advanced';
  evidenceLevel: 'A' | 'B' | 'C' | 'D';
  thumbnail?: string;
  downloadCount: number;
  rating: number;
  reviews: number;
  relatedQuestionIds: string[];
  bookmarked?: boolean;
  lastAccessed?: number;
  offline?: boolean;
}

export interface GuidelineCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface MedicalSpecialty {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
}

export interface GuidelineBookmark {
  id: string;
  userId: string;
  guidelineId: string;
  pageNumber?: number;
  note?: string;
  createdAt: number;
  tags: string[];
}

export interface GuidelineNote {
  id: string;
  userId: string;
  guidelineId: string;
  pageNumber: number;
  content: string;
  type: 'highlight' | 'note' | 'question';
  position?: { x: number; y: number };
  createdAt: number;
  updatedAt: number;
}

class GuidelinesService {
  private guidelines: MedicalGuideline[] = [];
  private categories: GuidelineCategory[] = [];
  private specialties: MedicalSpecialty[] = [];
  private bookmarks: GuidelineBookmark[] = [];
  private notes: GuidelineNote[] = [];

  constructor() {
    this.initializeGuidelines();
    this.loadUserData();
  }

  private initializeGuidelines(): void {
    // Initialize categories
    this.categories = [
      {
        id: 'emergency',
        name: 'Emergency Medicine',
        description: 'Acute care and emergency protocols',
        icon: '🚨',
        color: '#ef4444'
      },
      {
        id: 'critical-care',
        name: 'Critical Care',
        description: 'ICU management and protocols',
        icon: '🏥',
        color: '#f59e0b'
      },
      {
        id: 'cardiology',
        name: 'Cardiology',
        description: 'Cardiovascular guidelines',
        icon: '❤️',
        color: '#dc2626'
      },
      {
        id: 'trauma',
        name: 'Trauma',
        description: 'Trauma management protocols',
        icon: '🩹',
        color: '#7c2d12'
      },
      {
        id: 'pediatric',
        name: 'Pediatric Emergency',
        description: 'Pediatric emergency care',
        icon: '👶',
        color: '#06b6d4'
      },
      {
        id: 'toxicology',
        name: 'Toxicology',
        description: 'Poisoning and overdose management',
        icon: '☠️',
        color: '#7c3aed'
      },
      {
        id: 'procedures',
        name: 'Procedures',
        description: 'Clinical procedures and techniques',
        icon: '🔧',
        color: '#059669'
      },
      {
        id: 'pharmacology',
        name: 'Pharmacology',
        description: 'Drug protocols and dosing',
        icon: '💊',
        color: '#9333ea'
      }
    ];

    // Initialize specialties
    this.specialties = [
      { id: 'em', name: 'Emergency Medicine', abbreviation: 'EM', description: 'Emergency Department' },
      { id: 'ccm', name: 'Critical Care Medicine', abbreviation: 'CCM', description: 'Intensive Care' },
      { id: 'card', name: 'Cardiology', abbreviation: 'CARD', description: 'Heart and Circulation' },
      { id: 'trauma', name: 'Trauma Surgery', abbreviation: 'TRAUMA', description: 'Surgical Trauma Care' },
      { id: 'peds', name: 'Pediatrics', abbreviation: 'PEDS', description: 'Child Healthcare' },
      { id: 'tox', name: 'Medical Toxicology', abbreviation: 'TOX', description: 'Poison Control' },
      { id: 'anes', name: 'Anesthesiology', abbreviation: 'ANES', description: 'Perioperative Care' },
      { id: 'neuro', name: 'Neurology', abbreviation: 'NEURO', description: 'Neurological Care' }
    ];

    // Initialize sample guidelines
    this.guidelines = this.getSampleGuidelines();
  }

  private getSampleGuidelines(): MedicalGuideline[] {
    return [
      {
        id: 'aha-acls-2025',
        title: 'Advanced Cardiovascular Life Support (ACLS) Guidelines 2025',
        organization: 'American Heart Association',
        category: this.categories.find(c => c.id === 'emergency')!,
        specialty: this.specialties.find(s => s.id === 'em')!,
        publicationDate: '2025-01-15',
        lastUpdated: '2025-01-15',
        version: '2025.1',
        description: 'Comprehensive ACLS protocols for advanced cardiac life support, including new 2025 updates for drug dosing and compression techniques.',
        fileUrl: '/guidelines/pdfs/aha-acls-2025.pdf',
        fileSize: 15728640, // 15MB
        pageCount: 124,
        tags: ['ACLS', 'cardiac arrest', 'resuscitation', 'algorithms', 'AHA'],
        difficulty: 'intermediate',
        evidenceLevel: 'A',
        downloadCount: 15420,
        rating: 4.8,
        reviews: 342,
        relatedQuestionIds: ['cardiac-1', 'cardiac-15', 'cardiac-23']
      },
      {
        id: 'atls-10th-edition',
        title: 'Advanced Trauma Life Support (ATLS) 10th Edition',
        organization: 'American College of Surgeons',
        category: this.categories.find(c => c.id === 'trauma')!,
        specialty: this.specialties.find(s => s.id === 'trauma')!,
        publicationDate: '2024-03-20',
        lastUpdated: '2024-10-15',
        version: '10.2',
        description: 'Latest ATLS protocols for trauma management including primary and secondary surveys, with updated evidence-based practices.',
        fileUrl: '/guidelines/pdfs/atls-10th-edition.pdf',
        fileSize: 23456789, // 23MB
        pageCount: 186,
        tags: ['ATLS', 'trauma', 'surgery', 'emergency', 'protocols'],
        difficulty: 'advanced',
        evidenceLevel: 'A',
        downloadCount: 12890,
        rating: 4.9,
        reviews: 278,
        relatedQuestionIds: ['trauma-5', 'trauma-12', 'trauma-18']
      },
      {
        id: 'sepsis-guidelines-2024',
        title: 'Surviving Sepsis Campaign Guidelines 2024',
        organization: 'Society of Critical Care Medicine',
        category: this.categories.find(c => c.id === 'critical-care')!,
        specialty: this.specialties.find(s => s.id === 'ccm')!,
        publicationDate: '2024-06-10',
        lastUpdated: '2024-09-22',
        version: '2024.2',
        description: 'Evidence-based guidelines for the management of sepsis and septic shock in adult patients.',
        fileUrl: '/guidelines/pdfs/sepsis-guidelines-2024.pdf',
        fileSize: 8945632, // 8.5MB
        pageCount: 76,
        tags: ['sepsis', 'septic shock', 'antibiotics', 'critical care', 'ICU'],
        difficulty: 'advanced',
        evidenceLevel: 'A',
        downloadCount: 9845,
        rating: 4.7,
        reviews: 156,
        relatedQuestionIds: ['sepsis-3', 'sepsis-8', 'sepsis-14']
      },
      {
        id: 'pals-2025',
        title: 'Pediatric Advanced Life Support (PALS) 2025',
        organization: 'American Heart Association',
        category: this.categories.find(c => c.id === 'pediatric')!,
        specialty: this.specialties.find(s => s.id === 'peds')!,
        publicationDate: '2025-02-01',
        lastUpdated: '2025-02-01',
        version: '2025.1',
        description: 'Comprehensive pediatric resuscitation guidelines with age-specific protocols and updated drug dosing charts.',
        fileUrl: '/guidelines/pdfs/pals-2025.pdf',
        fileSize: 12567890, // 12MB
        pageCount: 98,
        tags: ['PALS', 'pediatric', 'resuscitation', 'children', 'AHA'],
        difficulty: 'intermediate',
        evidenceLevel: 'A',
        downloadCount: 7654,
        rating: 4.6,
        reviews: 123,
        relatedQuestionIds: ['peds-emergency-2', 'peds-cardiac-5']
      },
      {
        id: 'stroke-guidelines-2024',
        title: 'Acute Stroke Management Guidelines 2024',
        organization: 'American Stroke Association',
        category: this.categories.find(c => c.id === 'emergency')!,
        specialty: this.specialties.find(s => s.id === 'neuro')!,
        publicationDate: '2024-08-15',
        lastUpdated: '2024-11-01',
        version: '2024.3',
        description: 'Updated guidelines for acute stroke recognition, treatment, and management including new thrombolytic protocols.',
        fileUrl: '/guidelines/pdfs/stroke-guidelines-2024.pdf',
        fileSize: 14789123, // 14MB
        pageCount: 112,
        tags: ['stroke', 'neurology', 'thrombolysis', 'emergency', 'brain'],
        difficulty: 'advanced',
        evidenceLevel: 'A',
        downloadCount: 11234,
        rating: 4.8,
        reviews: 198,
        relatedQuestionIds: ['neuro-stroke-1', 'neuro-emergency-7']
      },
      {
        id: 'poisoning-protocols-2024',
        title: 'Clinical Toxicology Protocols 2024',
        organization: 'American Association of Poison Control Centers',
        category: this.categories.find(c => c.id === 'toxicology')!,
        specialty: this.specialties.find(s => s.id === 'tox')!,
        publicationDate: '2024-05-20',
        lastUpdated: '2024-10-10',
        version: '2024.2',
        description: 'Comprehensive protocols for managing poisoning and overdose cases with antidote guidelines and decontamination procedures.',
        fileUrl: '/guidelines/pdfs/toxicology-protocols-2024.pdf',
        fileSize: 18945612, // 18MB
        pageCount: 156,
        tags: ['poisoning', 'overdose', 'antidotes', 'toxicology', 'decontamination'],
        difficulty: 'advanced',
        evidenceLevel: 'B',
        downloadCount: 6789,
        rating: 4.5,
        reviews: 89,
        relatedQuestionIds: ['tox-overdose-3', 'tox-antidotes-8']
      },
      {
        id: 'airway-management-2024',
        title: 'Difficult Airway Management Guidelines 2024',
        organization: 'American Society of Anesthesiologists',
        category: this.categories.find(c => c.id === 'procedures')!,
        specialty: this.specialties.find(s => s.id === 'anes')!,
        publicationDate: '2024-04-12',
        lastUpdated: '2024-09-05',
        version: '2024.1',
        description: 'Evidence-based algorithms for difficult airway management including new techniques and equipment recommendations.',
        fileUrl: '/guidelines/pdfs/airway-management-2024.pdf',
        fileSize: 11234567, // 11MB
        pageCount: 89,
        tags: ['airway', 'intubation', 'anesthesia', 'procedures', 'algorithms'],
        difficulty: 'intermediate',
        evidenceLevel: 'A',
        downloadCount: 8901,
        rating: 4.7,
        reviews: 134,
        relatedQuestionIds: ['airway-difficult-2', 'procedures-intubation-5']
      },
      {
        id: 'emergency-drugs-2025',
        title: 'Emergency Drug Dosing Reference 2025',
        organization: 'Emergency Medicine Pharmacology Society',
        category: this.categories.find(c => c.id === 'pharmacology')!,
        specialty: this.specialties.find(s => s.id === 'em')!,
        publicationDate: '2025-01-08',
        lastUpdated: '2025-01-08',
        version: '2025.1',
        description: 'Quick reference for emergency drug dosing including pediatric and adult formulations with renal/hepatic adjustments.',
        fileUrl: '/guidelines/pdfs/emergency-drugs-2025.pdf',
        fileSize: 6789123, // 6.5MB
        pageCount: 45,
        tags: ['drugs', 'dosing', 'pharmacy', 'emergency', 'reference'],
        difficulty: 'basic',
        evidenceLevel: 'A',
        downloadCount: 19876,
        rating: 4.9,
        reviews: 456,
        relatedQuestionIds: ['pharm-dosing-1', 'pharm-emergency-12']
      }
    ];
  }

  /**
   * Search and Filtering
   */
  public searchGuidelines(query: string, filters?: {
    category?: string;
    specialty?: string;
    difficulty?: string;
    evidenceLevel?: string;
    tags?: string[];
  }): MedicalGuideline[] {
    let results = [...this.guidelines];

    // Text search
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      results = results.filter(guideline => 
        guideline.title.toLowerCase().includes(searchTerm) ||
        guideline.description.toLowerCase().includes(searchTerm) ||
        guideline.organization.toLowerCase().includes(searchTerm) ||
        guideline.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply filters
    if (filters) {
      if (filters.category) {
        results = results.filter(g => g.category.id === filters.category);
      }
      
      if (filters.specialty) {
        results = results.filter(g => g.specialty.id === filters.specialty);
      }
      
      if (filters.difficulty) {
        results = results.filter(g => g.difficulty === filters.difficulty);
      }
      
      if (filters.evidenceLevel) {
        results = results.filter(g => g.evidenceLevel === filters.evidenceLevel);
      }
      
      if (filters.tags && filters.tags.length > 0) {
        results = results.filter(g => 
          filters.tags!.some(tag => 
            g.tags.some(gTag => gTag.toLowerCase().includes(tag.toLowerCase()))
          )
        );
      }
    }

    return results;
  }

  /**
   * Guideline Management
   */
  public getGuideline(id: string): MedicalGuideline | null {
    return this.guidelines.find(g => g.id === id) || null;
  }

  public getGuidelinesByCategory(categoryId: string): MedicalGuideline[] {
    return this.guidelines.filter(g => g.category.id === categoryId);
  }

  public getGuidelinesBySpecialty(specialtyId: string): MedicalGuideline[] {
    return this.guidelines.filter(g => g.specialty.id === specialtyId);
  }

  public getFeaturedGuidelines(limit: number = 6): MedicalGuideline[] {
    return this.guidelines
      .sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews))
      .slice(0, limit);
  }

  public getRecentlyUpdated(limit: number = 5): MedicalGuideline[] {
    return this.guidelines
      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
      .slice(0, limit);
  }

  /**
   * Bookmarks Management
   */
  public async bookmarkGuideline(userId: string, guidelineId: string, note?: string): Promise<void> {
    const bookmark: GuidelineBookmark = {
      id: `bookmark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      guidelineId,
      note,
      createdAt: Date.now(),
      tags: []
    };

    this.bookmarks.push(bookmark);
    await this.saveBookmarks();

    // Update guideline bookmark status
    const guideline = this.guidelines.find(g => g.id === guidelineId);
    if (guideline) {
      guideline.bookmarked = true;
    }
  }

  public async removeBookmark(userId: string, guidelineId: string): Promise<void> {
    this.bookmarks = this.bookmarks.filter(
      b => !(b.userId === userId && b.guidelineId === guidelineId)
    );
    await this.saveBookmarks();

    // Update guideline bookmark status
    const guideline = this.guidelines.find(g => g.id === guidelineId);
    if (guideline) {
      guideline.bookmarked = false;
    }
  }

  public getUserBookmarks(userId: string): GuidelineBookmark[] {
    return this.bookmarks.filter(b => b.userId === userId);
  }

  public isBookmarked(userId: string, guidelineId: string): boolean {
    return this.bookmarks.some(b => b.userId === userId && b.guidelineId === guidelineId);
  }

  /**
   * Notes Management
   */
  public async addNote(
    userId: string,
    guidelineId: string,
    pageNumber: number,
    content: string,
    type: GuidelineNote['type'] = 'note',
    position?: { x: number; y: number }
  ): Promise<string> {
    const note: GuidelineNote = {
      id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      guidelineId,
      pageNumber,
      content,
      type,
      position,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.notes.push(note);
    await this.saveNotes();

    return note.id;
  }

  public async updateNote(noteId: string, content: string): Promise<void> {
    const note = this.notes.find(n => n.id === noteId);
    if (note) {
      note.content = content;
      note.updatedAt = Date.now();
      await this.saveNotes();
    }
  }

  public async deleteNote(noteId: string): Promise<void> {
    this.notes = this.notes.filter(n => n.id !== noteId);
    await this.saveNotes();
  }

  public getGuidelineNotes(userId: string, guidelineId: string): GuidelineNote[] {
    return this.notes.filter(n => n.userId === userId && n.guidelineId === guidelineId);
  }

  public getPageNotes(userId: string, guidelineId: string, pageNumber: number): GuidelineNote[] {
    return this.notes.filter(
      n => n.userId === userId && n.guidelineId === guidelineId && n.pageNumber === pageNumber
    );
  }

  /**
   * Access Tracking
   */
  public async trackAccess(guidelineId: string): Promise<void> {
    const guideline = this.guidelines.find(g => g.id === guidelineId);
    if (guideline) {
      guideline.lastAccessed = Date.now();
      guideline.downloadCount += 1;
      await this.saveAccessData();
    }
  }

  public getRecentlyAccessed(userId: string, limit: number = 10): MedicalGuideline[] {
    return this.guidelines
      .filter(g => g.lastAccessed)
      .sort((a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0))
      .slice(0, limit);
  }

  /**
   * Offline Management
   */
  public async downloadForOffline(guidelineId: string): Promise<void> {
    const guideline = this.guidelines.find(g => g.id === guidelineId);
    if (guideline) {
      // In a real implementation, this would download the PDF file
      guideline.offline = true;
      await this.saveOfflineData();
      console.log(`Downloaded ${guideline.title} for offline access`);
    }
  }

  public async removeFromOffline(guidelineId: string): Promise<void> {
    const guideline = this.guidelines.find(g => g.id === guidelineId);
    if (guideline) {
      guideline.offline = false;
      await this.saveOfflineData();
      console.log(`Removed ${guideline.title} from offline storage`);
    }
  }

  public getOfflineGuidelines(): MedicalGuideline[] {
    return this.guidelines.filter(g => g.offline);
  }

  /**
   * Data Persistence
   */
  private async loadUserData(): Promise<void> {
    try {
      const bookmarksData = localStorage.getItem('guidelines_bookmarks');
      if (bookmarksData) {
        this.bookmarks = JSON.parse(bookmarksData);
      }

      const notesData = localStorage.getItem('guidelines_notes');
      if (notesData) {
        this.notes = JSON.parse(notesData);
      }

      // Update bookmark status in guidelines
      this.guidelines.forEach(guideline => {
        guideline.bookmarked = this.bookmarks.some(b => b.guidelineId === guideline.id);
      });

    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  private async saveBookmarks(): Promise<void> {
    localStorage.setItem('guidelines_bookmarks', JSON.stringify(this.bookmarks));
  }

  private async saveNotes(): Promise<void> {
    localStorage.setItem('guidelines_notes', JSON.stringify(this.notes));
  }

  private async saveAccessData(): Promise<void> {
    localStorage.setItem('guidelines_access', JSON.stringify(
      this.guidelines.map(g => ({ id: g.id, lastAccessed: g.lastAccessed, downloadCount: g.downloadCount }))
    ));
  }

  private async saveOfflineData(): Promise<void> {
    localStorage.setItem('guidelines_offline', JSON.stringify(
      this.guidelines.filter(g => g.offline).map(g => ({ id: g.id, offline: g.offline }))
    ));
  }

  /**
   * Utility Methods
   */
  public getCategories(): GuidelineCategory[] {
    return [...this.categories];
  }

  public getSpecialties(): MedicalSpecialty[] {
    return [...this.specialties];
  }

  public getPopularTags(): string[] {
    const tagCounts: Record<string, number> = {};
    
    this.guidelines.forEach(guideline => {
      guideline.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([tag]) => tag);
  }

  public formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  public getGuidelineStats(): {
    total: number;
    byCategory: Record<string, number>;
    bySpecialty: Record<string, number>;
    totalSize: string;
  } {
    const totalSize = this.guidelines.reduce((sum, g) => sum + g.fileSize, 0);
    
    return {
      total: this.guidelines.length,
      byCategory: this.categories.reduce((acc, cat) => {
        acc[cat.name] = this.guidelines.filter(g => g.category.id === cat.id).length;
        return acc;
      }, {} as Record<string, number>),
      bySpecialty: this.specialties.reduce((acc, spec) => {
        acc[spec.name] = this.guidelines.filter(g => g.specialty.id === spec.id).length;
        return acc;
      }, {} as Record<string, number>),
      totalSize: this.formatFileSize(totalSize)
    };
  }
}

// Create singleton instance
const guidelinesService = new GuidelinesService();

export default guidelinesService;

// Export utility functions
export const {
  searchGuidelines,
  getGuideline,
  getGuidelinesByCategory,
  getGuidelinesBySpecialty,
  getFeaturedGuidelines,
  getRecentlyUpdated,
  bookmarkGuideline,
  removeBookmark,
  getUserBookmarks,
  isBookmarked,
  addNote,
  updateNote,
  deleteNote,
  getGuidelineNotes,
  trackAccess,
  downloadForOffline,
  getOfflineGuidelines,
  getCategories,
  getSpecialties,
  getPopularTags
} = guidelinesService;