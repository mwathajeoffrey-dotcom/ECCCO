// SERVICE WORKER CACHE CLEANER
// This script runs immediately and clears ALL cached assets
// Forces browsers to fetch fresh JavaScript bundles

(function() {
  'use strict';
  
  console.log('🧹 Cache Cleaner: Starting...');
  
  // 1. Clear Service Worker caches
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        console.log('🗑️ Unregistering service worker:', registration.scope);
        registration.unregister();
      }
    });
  }
  
  // 2. Clear Cache API
  if ('caches' in window) {
    caches.keys().then(function(names) {
      for (let name of names) {
        console.log('🗑️ Deleting cache:', name);
        caches.delete(name);
      }
    });
  }
  
  // 3. Clear localStorage for this app
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('navigation') || key.includes('drawer') || key.includes('sidebar'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => {
      console.log('🗑️ Removing localStorage:', key);
      localStorage.removeItem(key);
    });
  } catch (e) {
    console.warn('Could not clear localStorage:', e);
  }
  
  // 4. Force reload if we detect old code
  const CURRENT_DEPLOYMENT = '20260204100849';
  const lastDeployment = sessionStorage.getItem('lastDeployment');
  
  if (lastDeployment && lastDeployment !== CURRENT_DEPLOYMENT) {
    console.log('🔄 New deployment detected! Force reloading...');
    sessionStorage.setItem('lastDeployment', CURRENT_DEPLOYMENT);
    // Wait a moment for cache clearing, then hard reload
    setTimeout(() => {
      window.location.reload(true);
    }, 100);
  } else {
    sessionStorage.setItem('lastDeployment', CURRENT_DEPLOYMENT);
    console.log('✅ Cache cleared. Current deployment:', CURRENT_DEPLOYMENT);
  }
})();
