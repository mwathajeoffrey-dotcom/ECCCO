<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ECCCO - Offline</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .container {
      text-align: center;
      max-width: 500px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 3rem 2rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .icon {
      font-size: 4rem;
      margin-bottom: 1.5rem;
      display: block;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    .subtitle {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      font-weight: 300;
    }

    .offline-message {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      line-height: 1.6;
      opacity: 0.9;
    }

    .features {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 1.5rem;
      margin: 2rem 0;
      text-align: left;
    }

    .features h3 {
      margin-bottom: 1rem;
      font-size: 1.2rem;
      text-align: center;
    }

    .features ul {
      list-style: none;
      padding: 0;
    }

    .features li {
      padding: 0.5rem 0;
      display: flex;
      align-items: center;
      font-size: 0.95rem;
    }

    .features li::before {
      content: "✓";
      margin-right: 0.75rem;
      color: #4ade80;
      font-weight: bold;
      font-size: 1.1rem;
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .btn-primary {
      background: white;
      color: #667eea;
    }

    .btn-primary:hover {
      background: #f8fafc;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }

    .status {
      margin-top: 2rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      font-size: 0.9rem;
      opacity: 0.8;
    }

    .status-indicator {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #f59e0b;
      animation: pulse 2s infinite;
    }

    .status-dot.online {
      background: #10b981;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .storage-info {
      margin-top: 1rem;
      font-size: 0.85rem;
      opacity: 0.7;
    }

    @media (max-width: 640px) {
      .container {
        padding: 2rem 1.5rem;
      }
      
      h1 {
        font-size: 2rem;
      }
      
      .subtitle {
        font-size: 1rem;
      }
      
      .actions {
        gap: 0.75rem;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <span class="icon">📚</span>
    <h1>ECCCO</h1>
    <p class="subtitle">Emergency & Critical Care Comprehensive Online</p>
    
    <div class="offline-message">
      <strong>You're currently offline</strong><br>
      But don't worry! You can still access cached content and continue your studies.
    </div>

    <div class="features">
      <h3>Available Offline Features</h3>
      <ul>
        <li>Continue your current exam session</li>
        <li>Access recently viewed questions</li>
        <li>Review cached practice materials</li>
        <li>Your progress is automatically saved</li>
        <li>Seamless sync when back online</li>
      </ul>
    </div>

    <div class="actions">
      <button class="btn btn-primary" onclick="checkConnection()">
        <span>🔄</span>
        Check Connection
      </button>
      
      <a href="/" class="btn btn-secondary">
        <span>🏠</span>
        Go to Home
      </a>
      
      <button class="btn btn-secondary" onclick="viewCachedContent()">
        <span>📖</span>
        View Cached Content
      </button>
    </div>

    <div class="status">
      <div class="status-indicator">
        <div class="status-dot" id="connectionDot"></div>
        <span id="connectionStatus">Checking connection...</span>
      </div>
      
      <div class="storage-info" id="storageInfo">
        Loading offline storage information...
      </div>
    </div>
  </div>

  <script>
    // Connection status monitoring
    function updateConnectionStatus() {
      const isOnline = navigator.onLine;
      const statusDot = document.getElementById('connectionDot');
      const statusText = document.getElementById('connectionStatus');
      
      if (isOnline) {
        statusDot.classList.add('online');
        statusText.textContent = 'Connection restored! You can refresh the page.';
      } else {
        statusDot.classList.remove('online');
        statusText.textContent = 'No internet connection detected';
      }
    }

    function checkConnection() {
      updateConnectionStatus();
      
      if (navigator.onLine) {
        // Try to fetch a small resource to verify actual connectivity
        fetch('/favicon.ico', { method: 'HEAD', cache: 'no-cache' })
          .then(() => {
            window.location.reload();
          })
          .catch(() => {
            alert('Connection test failed. Please check your internet connection.');
          });
      } else {
        alert('No internet connection detected. Please check your network settings.');
      }
    }

    function viewCachedContent() {
      // This would open a page showing cached content
      // For now, just navigate to the main app
      window.location.href = '/';
    }

    async function loadStorageInfo() {
      try {
        // Check if IndexedDB is available
        if ('indexedDB' in window) {
          const request = indexedDB.open('ECCCOOffline', 1);
          
          request.onsuccess = function(event) {
            const db = event.target.result;
            
            // Get storage estimates
            if ('storage' in navigator && 'estimate' in navigator.storage) {
              navigator.storage.estimate().then(estimate => {
                const used = estimate.usage || 0;
                const quota = estimate.quota || 0;
                const usedMB = (used / (1024 * 1024)).toFixed(1);
                const quotaMB = (quota / (1024 * 1024)).toFixed(0);
                
                document.getElementById('storageInfo').innerHTML = 
                  `Offline storage: ${usedMB} MB used of ${quotaMB} MB available`;
              });
            } else {
              document.getElementById('storageInfo').textContent = 
                'Offline storage: Available';
            }
            
            db.close();
          };
          
          request.onerror = function() {
            document.getElementById('storageInfo').textContent = 
              'Offline storage: Not available';
          };
        } else {
          document.getElementById('storageInfo').textContent = 
            'Offline storage: Not supported';
        }
      } catch (error) {
        document.getElementById('storageInfo').textContent = 
          'Offline storage: Error loading info';
      }
    }

    // Initialize
    updateConnectionStatus();
    loadStorageInfo();

    // Listen for connection changes
    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);

    // Auto-refresh when connection is restored
    window.addEventListener('online', function() {
      setTimeout(() => {
        if (navigator.onLine) {
          window.location.reload();
        }
      }, 2000);
    });

    // Handle service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', function() {
        window.location.reload();
      });
    }
  </script>
</body>
</html>