/**
 * PWA Offline Sync Service
 * 
 * Handles background synchronization of offline data when connection is restored.
 * Ensures data integrity and provides seamless offline-to-online experience.
 */

import offlineStorage, { OfflineSession, OfflineAnalytics } from './storage';

export interface SyncResult {
  success: boolean;
  synced: number;
  failed: number;
  errors: string[];
}

export interface SyncProgress {
  type: 'sessions' | 'analytics';
  current: number;
  total: number;
  item?: string;
}

class OfflineSyncService {
  private syncInProgress = false;
  private syncQueue: Array<() => Promise<void>> = [];
  private progressCallback?: (progress: SyncProgress) => void;

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Listen for online events
    window.addEventListener('online', () => {
      console.log('[Sync] Connection restored, starting sync...');
      this.startSync();
    });

    // Listen for visibility change (tab becomes active)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && navigator.onLine && !this.syncInProgress) {
        this.startSync();
      }
    });

    // Listen for background sync events from service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'BACKGROUND_SYNC_REQUEST') {
          this.startSync();
        }
      });
    }
  }

  /**
   * Start the synchronization process
   */
  public async startSync(onProgress?: (progress: SyncProgress) => void): Promise<SyncResult> {
    if (this.syncInProgress) {
      console.log('[Sync] Sync already in progress');
      return { success: false, synced: 0, failed: 0, errors: ['Sync already in progress'] };
    }

    if (!navigator.onLine) {
      console.log('[Sync] Device is offline, skipping sync');
      return { success: false, synced: 0, failed: 0, errors: ['Device is offline'] };
    }

    this.syncInProgress = true;
    this.progressCallback = onProgress;
    
    const result: SyncResult = {
      success: true,
      synced: 0,
      failed: 0,
      errors: []
    };

    try {
      console.log('[Sync] Starting comprehensive sync...');

      // Sync sessions
      const sessionResult = await this.syncSessions();
      result.synced += sessionResult.synced;
      result.failed += sessionResult.failed;
      result.errors.push(...sessionResult.errors);

      // Sync analytics
      const analyticsResult = await this.syncAnalytics();
      result.synced += analyticsResult.synced;
      result.failed += analyticsResult.failed;
      result.errors.push(...analyticsResult.errors);

      // Process sync queue
      await this.processSyncQueue();

      result.success = result.failed === 0;
      
      console.log('[Sync] Sync completed:', result);
      
      // Notify about completion
      this.notifySyncComplete(result);
      
      return result;

    } catch (error) {
      console.error('[Sync] Sync failed:', error);
      result.success = false;
      result.errors.push(error instanceof Error ? error.message : 'Unknown error');
      return result;
    } finally {
      this.syncInProgress = false;
      this.progressCallback = undefined;
    }
  }

  /**
   * Sync offline sessions
   */
  private async syncSessions(): Promise<SyncResult> {
    const result: SyncResult = { success: true, synced: 0, failed: 0, errors: [] };
    
    try {
      const pendingSessions = await offlineStorage.getPendingSessions();
      
      if (pendingSessions.length === 0) {
        console.log('[Sync] No sessions to sync');
        return result;
      }

      console.log(`[Sync] Syncing ${pendingSessions.length} sessions...`);

      for (let i = 0; i < pendingSessions.length; i++) {
        const session = pendingSessions[i];
        
        this.reportProgress({
          type: 'sessions',
          current: i + 1,
          total: pendingSessions.length,
          item: `Session ${session.id}`
        });

        try {
          await this.syncSession(session);
          result.synced++;
          
          // Mark as synced
          await offlineStorage.updateOfflineSession(session.id, {
            syncStatus: 'synced'
          });
          
        } catch (error) {
          console.error(`[Sync] Failed to sync session ${session.id}:`, error);
          result.failed++;
          result.errors.push(`Session ${session.id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
          
          // Mark as failed
          await offlineStorage.updateOfflineSession(session.id, {
            syncStatus: 'failed'
          });
        }
      }

    } catch (error) {
      console.error('[Sync] Sessions sync failed:', error);
      result.success = false;
      result.errors.push(`Sessions sync: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }

  /**
   * Sync offline analytics
   */
  private async syncAnalytics(): Promise<SyncResult> {
    const result: SyncResult = { success: true, synced: 0, failed: 0, errors: [] };
    
    try {
      const pendingAnalytics = await offlineStorage.getPendingAnalytics();
      
      if (pendingAnalytics.length === 0) {
        console.log('[Sync] No analytics to sync');
        return result;
      }

      console.log(`[Sync] Syncing ${pendingAnalytics.length} analytics events...`);

      // Group analytics by batch for efficient syncing
      const batchSize = 10;
      const batches = this.chunkArray(pendingAnalytics, batchSize);

      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        
        this.reportProgress({
          type: 'analytics',
          current: i + 1,
          total: batches.length,
          item: `Batch ${i + 1} (${batch.length} events)`
        });

        try {
          await this.syncAnalyticsBatch(batch);
          result.synced += batch.length;
          
          // Mark batch as synced
          await offlineStorage.markAnalyticsSynced(batch.map(a => a.id));
          
        } catch (error) {
          console.error(`[Sync] Failed to sync analytics batch ${i + 1}:`, error);
          result.failed += batch.length;
          result.errors.push(`Analytics batch ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

    } catch (error) {
      console.error('[Sync] Analytics sync failed:', error);
      result.success = false;
      result.errors.push(`Analytics sync: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }

  /**
   * Sync individual session
   */
  private async syncSession(session: OfflineSession): Promise<void> {
    const response = await fetch('/api/sessions/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: session.id,
        userId: session.userId,
        examType: session.examType,
        questions: session.questions,
        answers: session.answers,
        startTime: session.startTime,
        endTime: session.endTime,
        progress: session.progress,
        offlineSession: true
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    console.log(`[Sync] Session ${session.id} synced successfully`);
  }

  /**
   * Sync analytics batch
   */
  private async syncAnalyticsBatch(analytics: OfflineAnalytics[]): Promise<void> {
    const response = await fetch('/api/analytics/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        events: analytics.map(a => ({
          id: a.id,
          userId: a.userId,
          eventType: a.eventType,
          data: a.data,
          timestamp: a.timestamp,
          offlineEvent: true
        }))
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    console.log(`[Sync] Analytics batch of ${analytics.length} events synced successfully`);
  }

  /**
   * Add item to sync queue
   */
  public addToSyncQueue(syncFunction: () => Promise<void>): void {
    this.syncQueue.push(syncFunction);
    
    // If online and not currently syncing, start sync
    if (navigator.onLine && !this.syncInProgress) {
      this.startSync();
    }
  }

  /**
   * Process sync queue
   */
  private async processSyncQueue(): Promise<void> {
    while (this.syncQueue.length > 0) {
      const syncFunction = this.syncQueue.shift();
      if (syncFunction) {
        try {
          await syncFunction();
        } catch (error) {
          console.error('[Sync] Queue item failed:', error);
        }
      }
    }
  }

  /**
   * Check if sync is currently in progress
   */
  public isSyncing(): boolean {
    return this.syncInProgress;
  }

  /**
   * Force a sync check
   */
  public async forceSyncCheck(): Promise<SyncResult> {
    return this.startSync();
  }

  /**
   * Get sync status
   */
  public async getSyncStatus(): Promise<{
    pendingSessions: number;
    pendingAnalytics: number;
    lastSyncTime?: number;
  }> {
    const [pendingSessions, pendingAnalytics, lastSyncTime] = await Promise.all([
      offlineStorage.getPendingSessions(),
      offlineStorage.getPendingAnalytics(),
      offlineStorage.getMetadata('lastSyncTime')
    ]);

    return {
      pendingSessions: pendingSessions.length,
      pendingAnalytics: pendingAnalytics.length,
      lastSyncTime
    };
  }

  /**
   * Schedule background sync with service worker
   */
  public async scheduleBackgroundSync(): Promise<void> {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register('background-sync');
        console.log('[Sync] Background sync scheduled');
      } catch (error) {
        console.error('[Sync] Background sync registration failed:', error);
      }
    }
  }

  /**
   * Utility functions
   */
  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  private reportProgress(progress: SyncProgress): void {
    if (this.progressCallback) {
      this.progressCallback(progress);
    }
  }

  private notifySyncComplete(result: SyncResult): void {
    // Update last sync time
    offlineStorage.setMetadata('lastSyncTime', Date.now());

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('pwa-sync-complete', {
      detail: result
    }));

    // Show notification if appropriate
    if (result.synced > 0) {
      this.showSyncNotification(result);
    }
  }

  private showSyncNotification(result: SyncResult): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      const message = result.success 
        ? `Synced ${result.synced} items successfully`
        : `Synced ${result.synced} items, ${result.failed} failed`;

      new Notification('ECCCO - Sync Complete', {
        body: message,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        tag: 'sync-notification',
        silent: true
      });
    }
  }
}

// Create singleton instance
const syncService = new OfflineSyncService();

export default syncService;

// Export utility functions
export const {
  startSync,
  addToSyncQueue,
  isSyncing,
  forceSyncCheck,
  getSyncStatus,
  scheduleBackgroundSync
} = syncService;