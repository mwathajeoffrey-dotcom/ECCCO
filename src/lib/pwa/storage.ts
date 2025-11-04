/**
 * Offline Storage Manager
 * 
 * Manages offline data storage using IndexedDB for comprehensive
 * offline functionality including questions, sessions, and analytics.
 */

interface OfflineQuestion {
  id: string;
  topic: string;
  difficulty: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  tags: string[];
  metadata: any;
  cachedAt: number;
  expiresAt: number;
}

interface OfflineSession {
  id: string;
  userId: string;
  examType: string;
  questions: string[];
  answers: Record<string, number>;
  startTime: number;
  endTime?: number;
  progress: {
    currentQuestion: number;
    answeredQuestions: number;
    totalQuestions: number;
  };
  syncStatus: 'pending' | 'synced' | 'failed';
  lastModified: number;
}

interface OfflineAnalytics {
  id: string;
  userId: string;
  eventType: string;
  data: any;
  timestamp: number;
  syncStatus: 'pending' | 'synced' | 'failed';
}

class OfflineStorageManager {
  private db: IDBDatabase | null = null;
  private readonly dbName = 'ECCCOOffline';
  private readonly dbVersion = 1;
  
  // Storage quotas (in items)
  private readonly maxQuestions = 1000;
  private readonly maxSessions = 100;
  private readonly maxAnalytics = 1000;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    try {
      this.db = await this.openDatabase();
      console.log('[Offline] Storage initialized');
    } catch (error) {
      console.error('[Offline] Storage initialization failed:', error);
    }
  }

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        reject(new Error('Failed to open database'));
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Questions store
        if (!db.objectStoreNames.contains('questions')) {
          const questionsStore = db.createObjectStore('questions', { keyPath: 'id' });
          questionsStore.createIndex('topic', 'topic', { unique: false });
          questionsStore.createIndex('difficulty', 'difficulty', { unique: false });
          questionsStore.createIndex('cachedAt', 'cachedAt', { unique: false });
          questionsStore.createIndex('expiresAt', 'expiresAt', { unique: false });
        }

        // Sessions store
        if (!db.objectStoreNames.contains('sessions')) {
          const sessionsStore = db.createObjectStore('sessions', { keyPath: 'id' });
          sessionsStore.createIndex('userId', 'userId', { unique: false });
          sessionsStore.createIndex('examType', 'examType', { unique: false });
          sessionsStore.createIndex('syncStatus', 'syncStatus', { unique: false });
          sessionsStore.createIndex('lastModified', 'lastModified', { unique: false });
        }

        // Analytics store
        if (!db.objectStoreNames.contains('analytics')) {
          const analyticsStore = db.createObjectStore('analytics', { keyPath: 'id' });
          analyticsStore.createIndex('userId', 'userId', { unique: false });
          analyticsStore.createIndex('eventType', 'eventType', { unique: false });
          analyticsStore.createIndex('timestamp', 'timestamp', { unique: false });
          analyticsStore.createIndex('syncStatus', 'syncStatus', { unique: false });
        }

        // Metadata store
        if (!db.objectStoreNames.contains('metadata')) {
          db.createObjectStore('metadata', { keyPath: 'key' });
        }
      };
    });
  }

  /**
   * Questions Management
   */
  public async cacheQuestions(questions: any[], topic: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['questions'], 'readwrite');
    const store = transaction.objectStore('questions');
    const now = Date.now();
    const expirationTime = 24 * 60 * 60 * 1000; // 24 hours

    for (const question of questions) {
      const offlineQuestion: OfflineQuestion = {
        id: question.id,
        topic: topic,
        difficulty: question.difficulty || 1,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        tags: question.tags || [],
        metadata: question.metadata || {},
        cachedAt: now,
        expiresAt: now + expirationTime
      };

      await this.putInStore(store, offlineQuestion);
    }

    await this.enforceQuestionsLimit();
    console.log(`[Offline] Cached ${questions.length} questions for topic: ${topic}`);
  }

  public async getOfflineQuestions(topic?: string, difficulty?: number): Promise<OfflineQuestion[]> {
    if (!this.db) return [];

    const transaction = this.db.transaction(['questions'], 'readonly');
    const store = transaction.objectStore('questions');
    
    let questions: OfflineQuestion[];

    if (topic) {
      const index = store.index('topic');
      questions = await this.getAllFromIndex(index, topic);
    } else {
      questions = await this.getAllFromStore(store);
    }

    // Filter by difficulty if specified
    if (difficulty !== undefined) {
      questions = questions.filter(q => q.difficulty === difficulty);
    }

    // Filter out expired questions
    const now = Date.now();
    questions = questions.filter(q => q.expiresAt > now);

    return questions;
  }

  public async removeExpiredQuestions(): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction(['questions'], 'readwrite');
    const store = transaction.objectStore('questions');
    const index = store.index('expiresAt');
    const now = Date.now();

    const expiredKeys = await this.getKeysFromIndex(index, IDBKeyRange.upperBound(now));
    
    for (const key of expiredKeys) {
      await this.deleteFromStore(store, key);
    }

    console.log(`[Offline] Removed ${expiredKeys.length} expired questions`);
  }

  private async enforceQuestionsLimit(): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction(['questions'], 'readwrite');
    const store = transaction.objectStore('questions');
    const index = store.index('cachedAt');
    
    const allKeys = await this.getKeysFromStore(store);
    
    if (allKeys.length > this.maxQuestions) {
      // Get oldest questions
      const oldestKeys = await this.getKeysFromIndex(
        index, 
        undefined, 
        allKeys.length - this.maxQuestions
      );
      
      for (const key of oldestKeys) {
        await this.deleteFromStore(store, key);
      }
      
      console.log(`[Offline] Removed ${oldestKeys.length} old questions`);
    }
  }

  /**
   * Sessions Management
   */
  public async saveOfflineSession(session: Omit<OfflineSession, 'id' | 'lastModified'>): Promise<string> {
    if (!this.db) throw new Error('Database not initialized');

    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const offlineSession: OfflineSession = {
      ...session,
      id: sessionId,
      lastModified: Date.now()
    };

    const transaction = this.db.transaction(['sessions'], 'readwrite');
    const store = transaction.objectStore('sessions');
    
    await this.putInStore(store, offlineSession);
    await this.enforceSessionsLimit();
    
    console.log('[Offline] Session saved:', sessionId);
    return sessionId;
  }

  public async updateOfflineSession(sessionId: string, updates: Partial<OfflineSession>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['sessions'], 'readwrite');
    const store = transaction.objectStore('sessions');
    
    const session = await this.getFromStore<OfflineSession>(store, sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const updatedSession: OfflineSession = {
      ...session,
      ...updates,
      lastModified: Date.now()
    };

    await this.putInStore(store, updatedSession);
    console.log('[Offline] Session updated:', sessionId);
  }

  public async getOfflineSession(sessionId: string): Promise<OfflineSession | null> {
    if (!this.db) return null;

    const transaction = this.db.transaction(['sessions'], 'readonly');
    const store = transaction.objectStore('sessions');
    
    return await this.getFromStore<OfflineSession>(store, sessionId);
  }

  public async getUserSessions(userId: string): Promise<OfflineSession[]> {
    if (!this.db) return [];

    const transaction = this.db.transaction(['sessions'], 'readonly');
    const store = transaction.objectStore('sessions');
    const index = store.index('userId');
    
    return await this.getAllFromIndex(index, userId);
  }

  public async getPendingSessions(): Promise<OfflineSession[]> {
    if (!this.db) return [];

    const transaction = this.db.transaction(['sessions'], 'readonly');
    const store = transaction.objectStore('sessions');
    const index = store.index('syncStatus');
    
    return await this.getAllFromIndex(index, 'pending');
  }

  private async enforceSessionsLimit(): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction(['sessions'], 'readwrite');
    const store = transaction.objectStore('sessions');
    const index = store.index('lastModified');
    
    const allKeys = await this.getKeysFromStore(store);
    
    if (allKeys.length > this.maxSessions) {
      const oldestKeys = await this.getKeysFromIndex(
        index, 
        undefined, 
        allKeys.length - this.maxSessions
      );
      
      for (const key of oldestKeys) {
        await this.deleteFromStore(store, key);
      }
      
      console.log(`[Offline] Removed ${oldestKeys.length} old sessions`);
    }
  }

  /**
   * Analytics Management
   */
  public async saveOfflineAnalytics(analytics: Omit<OfflineAnalytics, 'id'>): Promise<string> {
    if (!this.db) throw new Error('Database not initialized');

    const analyticsId = `analytics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const offlineAnalytics: OfflineAnalytics = {
      ...analytics,
      id: analyticsId
    };

    const transaction = this.db.transaction(['analytics'], 'readwrite');
    const store = transaction.objectStore('analytics');
    
    await this.putInStore(store, offlineAnalytics);
    await this.enforceAnalyticsLimit();
    
    return analyticsId;
  }

  public async getPendingAnalytics(): Promise<OfflineAnalytics[]> {
    if (!this.db) return [];

    const transaction = this.db.transaction(['analytics'], 'readonly');
    const store = transaction.objectStore('analytics');
    const index = store.index('syncStatus');
    
    return await this.getAllFromIndex(index, 'pending');
  }

  public async markAnalyticsSynced(analyticsIds: string[]): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction(['analytics'], 'readwrite');
    const store = transaction.objectStore('analytics');
    
    for (const id of analyticsIds) {
      const analytics = await this.getFromStore<OfflineAnalytics>(store, id);
      if (analytics) {
        analytics.syncStatus = 'synced';
        await this.putInStore(store, analytics);
      }
    }
  }

  private async enforceAnalyticsLimit(): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction(['analytics'], 'readwrite');
    const store = transaction.objectStore('analytics');
    const index = store.index('timestamp');
    
    const allKeys = await this.getKeysFromStore(store);
    
    if (allKeys.length > this.maxAnalytics) {
      const oldestKeys = await this.getKeysFromIndex(
        index, 
        undefined, 
        allKeys.length - this.maxAnalytics
      );
      
      for (const key of oldestKeys) {
        await this.deleteFromStore(store, key);
      }
      
      console.log(`[Offline] Removed ${oldestKeys.length} old analytics`);
    }
  }

  /**
   * Metadata Management
   */
  public async setMetadata(key: string, value: any): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction(['metadata'], 'readwrite');
    const store = transaction.objectStore('metadata');
    
    await this.putInStore(store, { key, value, timestamp: Date.now() });
  }

  public async getMetadata(key: string): Promise<any> {
    if (!this.db) return null;

    const transaction = this.db.transaction(['metadata'], 'readonly');
    const store = transaction.objectStore('metadata');
    
    const result = await this.getFromStore(store, key);
    return result?.value || null;
  }

  /**
   * Storage Statistics
   */
  public async getStorageStats(): Promise<{
    questions: number;
    sessions: number;
    analytics: number;
    totalSize: number;
  }> {
    if (!this.db) {
      return { questions: 0, sessions: 0, analytics: 0, totalSize: 0 };
    }

    const [questions, sessions, analytics] = await Promise.all([
      this.getStoreCount('questions'),
      this.getStoreCount('sessions'),
      this.getStoreCount('analytics')
    ]);

    // Estimate total size (rough calculation)
    const estimatedSize = (questions * 2000) + (sessions * 5000) + (analytics * 500);

    return {
      questions,
      sessions,
      analytics,
      totalSize: estimatedSize
    };
  }

  private async getStoreCount(storeName: string): Promise<number> {
    if (!this.db) return 0;

    const transaction = this.db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.count();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Cleanup Operations
   */
  public async clearExpiredData(): Promise<void> {
    await this.removeExpiredQuestions();
    console.log('[Offline] Expired data cleanup completed');
  }

  public async clearAllData(): Promise<void> {
    if (!this.db) return;

    const storeNames = ['questions', 'sessions', 'analytics', 'metadata'];
    const transaction = this.db.transaction(storeNames, 'readwrite');
    
    for (const storeName of storeNames) {
      const store = transaction.objectStore(storeName);
      await this.clearStore(store);
    }
    
    console.log('[Offline] All data cleared');
  }

  /**
   * Generic IndexedDB Utilities
   */
  private putInStore<T>(store: IDBObjectStore, data: T): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private getFromStore<T>(store: IDBObjectStore, key: any): Promise<T | null> {
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  private getAllFromStore<T>(store: IDBObjectStore): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  private getAllFromIndex<T>(index: IDBIndex, query?: any): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const request = index.getAll(query);
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  private getKeysFromStore(store: IDBObjectStore): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const request = store.getAllKeys();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  private getKeysFromIndex(index: IDBIndex, query?: any, count?: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const request = index.getAllKeys(query, count);
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  private deleteFromStore(store: IDBObjectStore, key: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private clearStore(store: IDBObjectStore): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

// Create singleton instance
const offlineStorage = new OfflineStorageManager();

export default offlineStorage;
export type { OfflineQuestion, OfflineSession, OfflineAnalytics };