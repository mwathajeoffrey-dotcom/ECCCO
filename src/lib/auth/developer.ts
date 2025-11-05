// Developer authentication system for ECCCO analytics and guideline management
export interface DeveloperAuth {
  isAuthenticated: boolean;
  accessLevel: 'full' | 'read-only' | 'none';
  sessionToken?: string;
}

// Developer access codes for different environments
const DEVELOPER_CODES = [
  'dev_analytics_2024',
  'eccco_admin_access', 
  'medical_platform_dev',
  'dev_guidelines_2024'
];

/**
 * Check if current environment allows developer access
 */
export function isDeveloperEnvironment(): boolean {
  // In development, allow automatic access
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  // In production, require explicit authentication
  return false;
}

/**
 * Validate developer access code
 */
export function validateDeveloperCode(code: string): boolean {
  return DEVELOPER_CODES.includes(code);
}

/**
 * Check if user has developer access
 */
export async function isDeveloper(): Promise<boolean> {
  try {
    // Check environment first
    if (isDeveloperEnvironment()) {
      return true;
    }
    
    // Check for stored session
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('eccco_dev_session');
      if (session) {
        const parsed = JSON.parse(session);
        const isValid = parsed.expires > Date.now();
        return isValid;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Developer auth check failed:', error);
    return false;
  }
}

/**
 * Authenticate developer with access code
 */
export function authenticateDeveloper(code: string): boolean {
  if (!validateDeveloperCode(code)) {
    return false;
  }
  
  // Store session (expires in 24 hours)
  if (typeof window !== 'undefined') {
    const session = {
      authenticated: true,
      expires: Date.now() + (24 * 60 * 60 * 1000),
      code: code
    };
    localStorage.setItem('eccco_dev_session', JSON.stringify(session));
  }
  
  return true;
}

/**
 * Clear developer session
 */
export function clearDeveloperSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('eccco_dev_session');
  }
}

/**
 * Validate user from request (simple implementation for now)
 */
export async function validateUser(_request?: unknown): Promise<{ id: string } | null> {
  try {
    // For now, return a mock user or check developer status
    const isDev = await isDeveloper();
    if (isDev) {
      return { id: 'developer_user' };
    }
    
    // In production, this would validate JWT tokens, session cookies, etc.
    // For now, return a default user
    return { id: 'anonymous_user' };
  } catch (error) {
    console.warn('User validation failed:', error);
    return null;
  }
}

/**
 * Check if request is authorized for analytics access
 */
export async function isAuthorizedForAnalytics(request?: { headers?: { get: (name: string) => string | null } }): Promise<boolean> {
  try {
    // In development, allow access
    if (isDeveloperEnvironment()) {
      return true;
    }
    
    // Check for authorization headers
    if (request?.headers) {
      const authHeader = request.headers.get('authorization');
      const devHeader = request.headers.get('x-dev-access');
      
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        return validateDeveloperCode(token);
      }
      
      if (devHeader && validateDeveloperCode(devHeader)) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Authorization check failed:', error);
    return false;
  }
}

const developerAuth = {
  isDeveloper,
  authenticateDeveloper,
  validateDeveloperCode,
  clearDeveloperSession,
  isDeveloperEnvironment
};

export default developerAuth;