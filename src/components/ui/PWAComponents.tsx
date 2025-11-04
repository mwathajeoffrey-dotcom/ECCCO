'use client';

import React, { useState, useEffect } from 'react';
import { X, Download, Refresh, Wifi, WifiOff, Smartphone, Monitor } from 'lucide-react';
import pwaManager from '@/lib/pwa/manager';

interface PWAPromptProps {
  className?: string;
}

export function PWAInstallPrompt({ className = '' }: PWAPromptProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    const handleShowPrompt = () => setShowPrompt(true);
    const handleHidePrompt = () => setShowPrompt(false);
    const handleAppInstalled = () => {
      setShowPrompt(false);
      setIsInstalling(false);
    };

    window.addEventListener('pwa-show-install-prompt', handleShowPrompt);
    window.addEventListener('pwa-hide-install-prompt', handleHidePrompt);
    window.addEventListener('pwa-app-installed', handleAppInstalled);

    return () => {
      window.removeEventListener('pwa-show-install-prompt', handleShowPrompt);
      window.removeEventListener('pwa-hide-install-prompt', handleHidePrompt);
      window.removeEventListener('pwa-app-installed', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    setIsInstalling(true);
    const success = await pwaManager.install();
    
    if (success) {
      setShowPrompt(false);
    }
    
    setIsInstalling(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    pwaManager.hideInstallPrompt();
  };

  if (!showPrompt) return null;

  return (
    <div className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <Smartphone className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Install ECCCO</h3>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Install ECCCO as an app for a better experience with offline access and quick launch.
      </p>
      
      <div className="flex space-x-2">
        <button
          onClick={handleInstall}
          disabled={isInstalling}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center"
        >
          {isInstalling ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          {isInstalling ? 'Installing...' : 'Install'}
        </button>
        
        <button
          onClick={handleDismiss}
          className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-sm font-medium"
        >
          Later
        </button>
      </div>
    </div>
  );
}

export function PWAUpdatePrompt({ className = '' }: PWAPromptProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const handleShowPrompt = () => setShowPrompt(true);
    
    window.addEventListener('pwa-show-update-prompt', handleShowPrompt);
    
    return () => {
      window.removeEventListener('pwa-show-update-prompt', handleShowPrompt);
    };
  }, []);

  const handleUpdate = () => {
    setIsUpdating(true);
    pwaManager.skipWaiting();
    // Page will reload automatically after service worker update
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className={`fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg shadow-lg p-4 z-50 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <Refresh className="h-6 w-6 text-green-600 mr-2" />
          <h3 className="font-semibold text-green-900 dark:text-green-100">Update Available</h3>
        </div>
        <button
          onClick={handleDismiss}
          className="text-green-400 hover:text-green-600 dark:hover:text-green-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <p className="text-sm text-green-700 dark:text-green-200 mb-4">
        A new version of ECCCO is available with improvements and bug fixes.
      </p>
      
      <div className="flex space-x-2">
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center"
        >
          {isUpdating ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          ) : (
            <Refresh className="h-4 w-4 mr-2" />
          )}
          {isUpdating ? 'Updating...' : 'Update Now'}
        </button>
        
        <button
          onClick={handleDismiss}
          className="px-3 py-2 text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100 text-sm font-medium"
        >
          Later
        </button>
      </div>
    </div>
  );
}

export function PWAStatusIndicator({ className = '' }: PWAPromptProps) {
  const [status, setStatus] = useState({
    isOffline: !navigator.onLine,
    isInstalled: false,
    canInstall: false
  });

  useEffect(() => {
    const handleStatusChange = (event: CustomEvent) => {
      setStatus(event.detail);
    };

    window.addEventListener('pwa-status-change', handleStatusChange as EventListener);
    
    // Initialize status
    setStatus({
      isOffline: pwaManager.isOffline,
      isInstalled: pwaManager.isInstalled,
      canInstall: pwaManager.canInstall
    });

    return () => {
      window.removeEventListener('pwa-status-change', handleStatusChange as EventListener);
    };
  }, []);

  if (!status.isOffline && !status.isInstalled) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {status.isOffline && (
        <div className="flex items-center text-orange-600 dark:text-orange-400">
          <WifiOff className="h-4 w-4 mr-1" />
          <span className="text-xs font-medium">Offline</span>
        </div>
      )}
      
      {!status.isOffline && (
        <div className="flex items-center text-green-600 dark:text-green-400">
          <Wifi className="h-4 w-4 mr-1" />
          <span className="text-xs font-medium">Online</span>
        </div>
      )}
      
      {status.isInstalled && (
        <div className="flex items-center text-blue-600 dark:text-blue-400">
          <Monitor className="h-4 w-4 mr-1" />
          <span className="text-xs font-medium">App</span>
        </div>
      )}
    </div>
  );
}

interface PWAShareButtonProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PWAShareButton({ 
  title, 
  text, 
  url = window.location.href, 
  className = '',
  children 
}: PWAShareButtonProps) {
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare('share' in navigator);
  }, []);

  const handleShare = async () => {
    const shareData = { title, text, url };
    
    const success = await pwaManager.share(shareData);
    
    if (!success) {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(`${title}\n${text}\n${url}`);
        // Show toast notification
      } catch (error) {
        console.error('Share failed:', error);
      }
    }
  };

  if (!canShare) return null;

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center ${className}`}
    >
      {children}
    </button>
  );
}

// Combined PWA component for easy integration
export function PWAComponents({ className = '' }: PWAPromptProps) {
  return (
    <div className={className}>
      <PWAInstallPrompt />
      <PWAUpdatePrompt />
    </div>
  );
}