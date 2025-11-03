// Utility functions for analytics tracking
export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop';
  os: string;
  browser: string;
  version: string;
}

export interface LocationInfo {
  country?: string;
  city?: string;
  region?: string;
  timezone?: string;
  lat?: number;
  lon?: number;
}

export interface ScreenInfo {
  width: number;
  height: number;
  pixelRatio: number;
}

export interface AnalyticsData {
  sessionId: string;
  deviceInfo: DeviceInfo;
  screenInfo: ScreenInfo;
  userAgent: string;
  timezone: string;
  referrer: string;
  location?: LocationInfo;
}

// Generate unique session ID
export function generateSessionId(): string {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Detect device type and browser info
export function getDeviceInfo(userAgent: string): DeviceInfo {
  const ua = userAgent.toLowerCase();
  
  // Detect device type
  let type: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    type = 'mobile';
  } else if (/tablet|ipad|playbook|silk|kindle/i.test(ua)) {
    type = 'tablet';
  }
  
  // Detect OS
  let os = 'Unknown';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  
  // Detect browser
  let browser = 'Unknown';
  let version = '';
  
  if (/chrome/i.test(ua) && !/edge|edg/i.test(ua)) {
    browser = 'Chrome';
    const match = ua.match(/chrome\/(\d+\.\d+)/);
    version = match ? match[1] : '';
  } else if (/firefox/i.test(ua)) {
    browser = 'Firefox';
    const match = ua.match(/firefox\/(\d+\.\d+)/);
    version = match ? match[1] : '';
  } else if (/safari/i.test(ua) && !/chrome/i.test(ua)) {
    browser = 'Safari';
    const match = ua.match(/version\/(\d+\.\d+)/);
    version = match ? match[1] : '';
  } else if (/edge|edg/i.test(ua)) {
    browser = 'Edge';
    const match = ua.match(/edg?\/(\d+\.\d+)/);
    version = match ? match[1] : '';
  }
  
  return { type, os, browser, version };
}

// Get screen information
export function getScreenInfo(): ScreenInfo {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0, pixelRatio: 1 };
  }
  
  return {
    width: window.screen.width,
    height: window.screen.height,
    pixelRatio: window.devicePixelRatio || 1
  };
}

// Get timezone
export function getTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
  } catch {
    return 'Unknown';
  }
}

// Hash IP address for privacy
export function hashIP(ip: string): string {
  // Simple hash function (in production, use a proper crypto hash)
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
}

// Get session ID from localStorage or create new one
export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return generateSessionId();
  
  const stored = localStorage.getItem('eccco_session_id');
  if (stored) {
    // Check if session is still valid (24 hours)
    const sessionData = JSON.parse(stored);
    const now = Date.now();
    if (now - sessionData.created < 24 * 60 * 60 * 1000) {
      return sessionData.id;
    }
  }
  
  // Create new session
  const sessionId = generateSessionId();
  localStorage.setItem('eccco_session_id', JSON.stringify({
    id: sessionId,
    created: Date.now()
  }));
  
  return sessionId;
}

// Collect all analytics data
export function collectAnalyticsData(): Omit<AnalyticsData, 'location'> {
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const deviceInfo = getDeviceInfo(userAgent);
  const screenInfo = getScreenInfo();
  const timezone = getTimezone();
  const referrer = typeof document !== 'undefined' ? document.referrer : '';
  const sessionId = getOrCreateSessionId();
  
  return {
    sessionId,
    deviceInfo,
    screenInfo,
    userAgent,
    timezone,
    referrer
  };
}