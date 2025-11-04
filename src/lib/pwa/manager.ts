/**
 * PWA Registration and Management
 * 
 * Handles service worker registration, update management,
 * offline detection, and app installation prompts.
 */

export interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export interface PWAManager {
  isSupported: boolean;
  isInstalled: boolean;
  isOffline: boolean;
  canInstall: boolean;
  install: () => Promise<boolean>;
  checkForUpdates: () => Promise<boolean>;
  skipWaiting: () => void;
  showInstallPrompt: () => void;
  hideInstallPrompt: () => void;
}

class PWAService implements PWAManager {
  private swRegistration: ServiceWorkerRegistration | null = null;
  private installPrompt: PWAInstallPrompt | null = null;
  private updateAvailable = false;
  private installPromptShown = false;

  public isSupported = false;
  public isInstalled = false;
  public isOffline = false;
  public canInstall = false;

  constructor() {
    this.isSupported = 'serviceWorker' in navigator;
    this.isInstalled = this.checkIfInstalled();
    this.isOffline = !navigator.onLine;
    
    this.init();
  }

  private async init() {
    if (!this.isSupported) {
      console.warn('[PWA] Service workers not supported');
      return;
    }

    await this.registerServiceWorker();
    this.setupEventListeners();
    this.setupInstallPrompt();
    this.setupOfflineDetection();
    this.setupUpdateDetection();
  }

  /**
   * Service Worker Registration
   */
  private async registerServiceWorker(): Promise<void> {
    try {
      this.swRegistration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none' // Always check for updates
      });

      console.log('[PWA] Service worker registered:', this.swRegistration);

      // Check for immediate updates
      if (this.swRegistration.waiting) {
        this.handleUpdateAvailable();
      }

      // Listen for updates
      this.swRegistration.addEventListener('updatefound', () => {
        const newWorker = this.swRegistration?.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.handleUpdateAvailable();
            }
          });
        }
      });

    } catch (error) {
      console.error('[PWA] Service worker registration failed:', error);
    }
  }

  /**
   * App Installation
   */
  private setupInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.installPrompt = event as any;
      this.canInstall = true;
      
      // Show install prompt after a delay if not already installed
      if (!this.isInstalled && !this.installPromptShown) {
        setTimeout(() => this.showInstallPrompt(), 30000); // 30 seconds
      }
    });

    window.addEventListener('appinstalled', () => {
      console.log('[PWA] App installed');
      this.isInstalled = true;
      this.canInstall = false;
      this.installPrompt = null;
      this.hideInstallPrompt();
      this.showInstallConfirmation();
    });
  }

  public async install(): Promise<boolean> {
    if (!this.installPrompt) {
      console.warn('[PWA] No install prompt available');
      return false;
    }

    try {
      await this.installPrompt.prompt();
      const { outcome } = await this.installPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('[PWA] User accepted install prompt');
        return true;
      } else {
        console.log('[PWA] User dismissed install prompt');
        return false;
      }
    } catch (error) {
      console.error('[PWA] Install prompt failed:', error);
      return false;
    }
  }

  private checkIfInstalled(): boolean {
    // Check if running in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    // Check if running in PWA mode on iOS
    const isIOSStandalone = (window.navigator as any).standalone === true;
    
    return isStandalone || isIOSStandalone;
  }

  /**
   * Offline Detection
   */
  private setupOfflineDetection(): void {
    const updateOnlineStatus = () => {
      this.isOffline = !navigator.onLine;
      this.broadcastStatusChange();
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  }

  /**
   * Update Management
   */
  private setupUpdateDetection(): void {
    // Check for updates periodically
    setInterval(() => {
      this.checkForUpdates();
    }, 60000); // Check every minute

    // Check for updates when app becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.checkForUpdates();
      }
    });
  }

  public async checkForUpdates(): Promise<boolean> {
    if (!this.swRegistration) return false;

    try {
      await this.swRegistration.update();
      return this.updateAvailable;
    } catch (error) {
      console.error('[PWA] Update check failed:', error);
      return false;
    }
  }

  private handleUpdateAvailable(): void {
    this.updateAvailable = true;
    this.showUpdatePrompt();
  }

  public skipWaiting(): void {
    if (this.swRegistration?.waiting) {
      this.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }

  /**
   * Event Listeners
   */
  private setupEventListeners(): void {
    // Listen for messages from service worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      const { type, payload } = event.data;
      
      switch (type) {
        case 'UPDATE_AVAILABLE':
          this.handleUpdateAvailable();
          break;
        case 'CACHE_UPDATED':
          console.log('[PWA] Cache updated:', payload);
          break;
      }
    });

    // Listen for service worker controller change (after update)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  }

  /**
   * UI Management
   */
  public showInstallPrompt(): void {
    if (this.installPromptShown || this.isInstalled || !this.canInstall) {
      return;
    }

    this.installPromptShown = true;
    this.dispatchEvent('show-install-prompt');
  }

  public hideInstallPrompt(): void {
    this.installPromptShown = false;
    this.dispatchEvent('hide-install-prompt');
  }

  private showUpdatePrompt(): void {
    this.dispatchEvent('show-update-prompt');
  }

  private showInstallConfirmation(): void {
    this.dispatchEvent('app-installed');
  }

  private broadcastStatusChange(): void {
    this.dispatchEvent('status-change', {
      isOffline: this.isOffline,
      isInstalled: this.isInstalled,
      canInstall: this.canInstall
    });
  }

  private dispatchEvent(type: string, detail?: any): void {
    window.dispatchEvent(new CustomEvent(`pwa-${type}`, { detail }));
  }

  /**
   * Push Notifications
   */
  public async requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('[PWA] Notifications not supported');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  public async subscribeToPushNotifications(): Promise<boolean> {
    if (!this.swRegistration) {
      console.warn('[PWA] Service worker not registered');
      return false;
    }

    try {
      const subscription = await this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.getVapidPublicKey()
      });

      // Send subscription to server
      await this.sendSubscriptionToServer(subscription);
      
      console.log('[PWA] Push subscription successful');
      return true;
    } catch (error) {
      console.error('[PWA] Push subscription failed:', error);
      return false;
    }
  }

  private getVapidPublicKey(): Uint8Array {
    // Replace with your actual VAPID public key
    const vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa40HI0DLLIuG7f4YxoF8LNbzs5jH6n8s_vZQk3J3y8WyVH8L7_5J1d2W8Cx_M';
    return this.urlBase64ToUint8Array(vapidPublicKey);
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  private async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    const response = await fetch('/api/push-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });

    if (!response.ok) {
      throw new Error('Failed to send subscription to server');
    }
  }

  /**
   * Background Sync
   */
  public async scheduleBackgroundSync(tag: string): Promise<void> {
    if (!this.swRegistration || !('sync' in this.swRegistration)) {
      console.warn('[PWA] Background sync not supported');
      return;
    }

    try {
      await this.swRegistration.sync.register(tag);
      console.log('[PWA] Background sync scheduled:', tag);
    } catch (error) {
      console.error('[PWA] Background sync registration failed:', error);
    }
  }

  /**
   * Share API
   */
  public async share(data: ShareData): Promise<boolean> {
    if (!('share' in navigator)) {
      console.warn('[PWA] Web Share API not supported');
      return false;
    }

    try {
      await navigator.share(data);
      return true;
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        console.log('[PWA] User cancelled share');
      } else {
        console.error('[PWA] Share failed:', error);
      }
      return false;
    }
  }

  /**
   * Shortcuts
   */
  public async updateShortcuts(shortcuts: any[]): Promise<void> {
    if (!('getInstalledRelatedApps' in navigator)) {
      console.warn('[PWA] App shortcuts not supported');
      return;
    }

    try {
      // This would update dynamic shortcuts
      // Implementation depends on the specific PWA capabilities
      console.log('[PWA] Shortcuts updated:', shortcuts);
    } catch (error) {
      console.error('[PWA] Failed to update shortcuts:', error);
    }
  }
}

// Create singleton instance
const pwaManager = new PWAService();

export default pwaManager;

// Export commonly used functions
export const {
  install: installApp,
  checkForUpdates,
  requestNotificationPermission,
  subscribeToPushNotifications,
  scheduleBackgroundSync,
  share: shareContent
} = pwaManager;