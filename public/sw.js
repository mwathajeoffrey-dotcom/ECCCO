/**
 * ECCCO Service Worker
 * 
 * Advanced PWA service worker with intelligent caching strategies,
 * offline functionality, background sync, and push notifications.
 */

const CACHE_VERSION = 'eccco-v1.0.0';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const API_CACHE = `${CACHE_VERSION}-api`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// Cache storage limits (in bytes)
const MAX_DYNAMIC_CACHE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_API_CACHE_SIZE = 20 * 1024 * 1024;     // 20MB
const MAX_IMAGE_CACHE_SIZE = 30 * 1024 * 1024;   // 30MB

// Cache expiration times (in milliseconds)
const CACHE_EXPIRATION = {
  static: 7 * 24 * 60 * 60 * 1000,      // 7 days
  dynamic: 24 * 60 * 60 * 1000,         // 24 hours
  api: 30 * 60 * 1000,                  // 30 minutes
  images: 7 * 24 * 60 * 60 * 1000,      // 7 days
};

// Essential files to cache immediately
const STATIC_FILES = [
  '/',
  '/exam',
  '/practice',
  '/dashboard',
  '/manifest.json',
  '/offline',
  // Add your essential CSS and JS files here
  // These would be determined by your build process
];

// API endpoints to cache
const CACHE_API_PATTERNS = [
  '/api/topics',
  '/api/questions',
  '/api/analytics',
];

// Files that should always be fetched from network
const NETWORK_ONLY_PATTERNS = [
  '/api/auth',
  '/api/sessions',
  '/api/user',
];

/**
 * Service Worker Installation
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    (async () => {
      try {
        // Cache essential static files
        const staticCache = await caches.open(STATIC_CACHE);
        await staticCache.addAll(STATIC_FILES);
        
        // Initialize other caches
        await caches.open(DYNAMIC_CACHE);
        await caches.open(API_CACHE);
        await caches.open(IMAGE_CACHE);
        
        console.log('[SW] Installation successful');
        
        // Take control immediately
        await self.skipWaiting();
      } catch (error) {
        console.error('[SW] Installation failed:', error);
      }
    })()
  );
});

/**
 * Service Worker Activation
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    (async () => {
      try {
        // Clean up old caches
        const cacheNames = await caches.keys();
        const oldCaches = cacheNames.filter(name => 
          name.startsWith('eccco-') && name !== STATIC_CACHE && 
          name !== DYNAMIC_CACHE && name !== API_CACHE && name !== IMAGE_CACHE
        );
        
        await Promise.all(oldCaches.map(cache => caches.delete(cache)));
        
        // Take control of all clients
        await self.clients.claim();
        
        console.log('[SW] Activation successful');
      } catch (error) {
        console.error('[SW] Activation failed:', error);
      }
    })()
  );
});

/**
 * Fetch Event Handler - Main caching logic
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }
  
  event.respondWith(handleFetch(request));
});

/**
 * Main fetch handling with intelligent caching strategies
 */
async function handleFetch(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Network-only patterns (auth, sessions, etc.)
    if (NETWORK_ONLY_PATTERNS.some(pattern => pathname.includes(pattern))) {
      return await networkOnly(request);
    }
    
    // API requests
    if (pathname.startsWith('/api/')) {
      return await handleAPIRequest(request);
    }
    
    // Images
    if (isImageRequest(request)) {
      return await cacheFirst(request, IMAGE_CACHE);
    }
    
    // Static assets (JS, CSS, fonts)
    if (isStaticAsset(request)) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // HTML pages - Network first with cache fallback
    if (request.headers.get('accept')?.includes('text/html')) {
      return await networkFirstWithOffline(request);
    }
    
    // Default: Network first
    return await networkFirst(request, DYNAMIC_CACHE);
    
  } catch (error) {
    console.error('[SW] Fetch error:', error);
    return await handleOfflineError(request);
  }
}

/**
 * API Request handling with intelligent caching
 */
async function handleAPIRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Check if this API should be cached
  const shouldCache = CACHE_API_PATTERNS.some(pattern => pathname.includes(pattern));
  
  if (!shouldCache) {
    return await networkOnly(request);
  }
  
  // For cacheable APIs, use stale-while-revalidate
  return await staleWhileRevalidate(request, API_CACHE);
}

/**
 * Caching Strategies
 */

// Cache First - Good for static assets
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse && !isExpired(cachedResponse)) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
      await enforceStorageLimit(cacheName);
    }
    return networkResponse;
  } catch (error) {
    if (cachedResponse) {
      return cachedResponse; // Return expired cache as fallback
    }
    throw error;
  }
}

// Network First - Good for dynamic content
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      await cache.put(request, networkResponse.clone());
      await enforceStorageLimit(cacheName);
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Network First with Offline Page
async function networkFirstWithOffline(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Try cache first
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page
    const offlineResponse = await cache.match('/offline');
    if (offlineResponse) {
      return offlineResponse;
    }
    
    // Fallback offline response
    return new Response(
      generateOfflineHTML(),
      {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
}

// Stale While Revalidate - Good for APIs
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Fetch fresh data in background
  const fetchPromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
      await enforceStorageLimit(cacheName);
    }
    return networkResponse;
  }).catch(error => {
    console.warn('[SW] Background fetch failed:', error);
    return null;
  });
  
  // Return cached version immediately if available
  if (cachedResponse && !isExpired(cachedResponse)) {
    // Don't wait for background fetch
    fetchPromise.catch(() => {}); // Prevent unhandled rejection
    return cachedResponse;
  }
  
  // Wait for network if no cache or expired
  try {
    return await fetchPromise;
  } catch (error) {
    if (cachedResponse) {
      return cachedResponse; // Return expired cache as fallback
    }
    throw error;
  }
}

// Network Only
async function networkOnly(request) {
  return await fetch(request);
}

/**
 * Utility Functions
 */

function isImageRequest(request) {
  return request.destination === 'image' || 
         /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(new URL(request.url).pathname);
}

function isStaticAsset(request) {
  return request.destination === 'script' || 
         request.destination === 'style' || 
         request.destination === 'font' ||
         /\.(js|css|woff|woff2|ttf|eot)$/i.test(new URL(request.url).pathname);
}

function isExpired(response) {
  const cachedTime = response.headers.get('sw-cached-time');
  if (!cachedTime) return false;
  
  const age = Date.now() - parseInt(cachedTime);
  const pathname = new URL(response.url).pathname;
  
  if (pathname.startsWith('/api/')) {
    return age > CACHE_EXPIRATION.api;
  } else if (isImageRequest({ url: response.url })) {
    return age > CACHE_EXPIRATION.images;
  } else if (isStaticAsset({ url: response.url })) {
    return age > CACHE_EXPIRATION.static;
  } else {
    return age > CACHE_EXPIRATION.dynamic;
  }
}

async function enforceStorageLimit(cacheName) {
  const cache = await caches.open(cacheName);
  const requests = await cache.keys();
  
  let totalSize = 0;
  const sizePromises = requests.map(async (request) => {
    const response = await cache.match(request);
    const size = response ? await estimateResponseSize(response) : 0;
    return { request, size };
  });
  
  const requestSizes = await Promise.all(sizePromises);
  totalSize = requestSizes.reduce((sum, item) => sum + item.size, 0);
  
  const limits = {
    [DYNAMIC_CACHE]: MAX_DYNAMIC_CACHE_SIZE,
    [API_CACHE]: MAX_API_CACHE_SIZE,
    [IMAGE_CACHE]: MAX_IMAGE_CACHE_SIZE,
  };
  
  const limit = limits[cacheName] || MAX_DYNAMIC_CACHE_SIZE;
  
  if (totalSize > limit) {
    // Sort by cache time (oldest first)
    requestSizes.sort((a, b) => {
      const aTime = getCacheTime(a.request);
      const bTime = getCacheTime(b.request);
      return aTime - bTime;
    });
    
    // Remove oldest entries until under limit
    let currentSize = totalSize;
    for (const { request, size } of requestSizes) {
      if (currentSize <= limit) break;
      await cache.delete(request);
      currentSize -= size;
    }
  }
}

async function estimateResponseSize(response) {
  const cloned = response.clone();
  const arrayBuffer = await cloned.arrayBuffer();
  return arrayBuffer.byteLength;
}

function getCacheTime(request) {
  // This would be set when we cache the response
  return parseInt(request.headers.get('sw-cached-time') || '0');
}

async function handleOfflineError(request) {
  const url = new URL(request.url);
  
  if (request.headers.get('accept')?.includes('text/html')) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const offlineResponse = await cache.match('/offline');
    if (offlineResponse) {
      return offlineResponse;
    }
    
    return new Response(generateOfflineHTML(), {
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
  return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
}

function generateOfflineHTML() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ECCCO - Offline</title>
      <style>
        body {
          font-family: system-ui, -apple-system, sans-serif;
          margin: 0;
          padding: 2rem;
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          max-width: 400px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        h1 { margin-top: 0; font-size: 2rem; }
        .icon { font-size: 4rem; margin-bottom: 1rem; }
        button {
          background: white;
          color: #667eea;
          border: none;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 1rem;
        }
        button:hover { background: #f0f0f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">📚</div>
        <h1>ECCCO</h1>
        <h2>You're Offline</h2>
        <p>Some cached content may still be available. Check your internet connection and try again.</p>
        <button onclick="window.location.reload()">Try Again</button>
      </div>
    </body>
    </html>
  `;
}

/**
 * Background Sync
 */
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  try {
    // Sync any pending data
    const pendingData = await getPendingData();
    
    for (const data of pendingData) {
      try {
        await syncData(data);
        await removePendingData(data.id);
      } catch (error) {
        console.error('[SW] Failed to sync data:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

async function getPendingData() {
  // This would retrieve data from IndexedDB or similar storage
  return [];
}

async function syncData(data) {
  // This would sync specific data to the server
  const response = await fetch('/api/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Sync failed');
  }
}

async function removePendingData(id) {
  // Remove synced data from local storage
}

/**
 * Push Notifications
 */
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event);
  
  const options = {
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Study Now',
        icon: '/icons/study-action.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/close-action.png'
      }
    ]
  };
  
  let title = 'ECCCO';
  let body = 'New content available!';
  
  if (event.data) {
    const payload = event.data.json();
    title = payload.title || title;
    body = payload.body || body;
    Object.assign(options, payload.options || {});
  }
  
  event.waitUntil(
    self.registration.showNotification(title, { body, ...options })
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click:', event);
  
  event.notification.close();
  
  const action = event.action;
  
  if (action === 'close') {
    return;
  }
  
  // Default action or 'explore' action
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Try to focus existing window
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Open new window
      if (clients.openWindow) {
        const url = action === 'explore' ? '/practice' : '/';
        return clients.openWindow(url);
      }
    })
  );
});

/**
 * App Update Available
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Service worker loaded successfully');