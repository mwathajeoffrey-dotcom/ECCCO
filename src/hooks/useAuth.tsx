/**
 * Authentication Hook
 * Provides user authentication state and methods
 */

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { SessionManager } from '@/lib/session/SessionManager';

interface User {
  id: string;
  email?: string;
  name?: string;
  sessionId: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    setIsLoading(true);
    try {
      const userId = SessionManager.getUserId();
      const sessionId = SessionManager.getSessionId();

      if (userId) {
        // User is authenticated, fetch user data
        // For now, we'll create a basic user object
        setUser({
          id: userId,
          sessionId,
          name: 'Anonymous User' // This would come from a real API
        });
      } else {
        // Anonymous user
        setUser({
          id: 'anonymous',
          sessionId,
          name: 'Anonymous'
        });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      // Fallback to anonymous user
      setUser({
        id: 'anonymous',
        sessionId: SessionManager.getSessionId(),
        name: 'Anonymous'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This would be a real API call in production
      // For now, we'll simulate a successful login
      const mockUserId = 'user-' + Date.now();
      
      SessionManager.setUserId(mockUserId);
      
      setUser({
        id: mockUserId,
        email,
        name: email.split('@')[0], // Use email prefix as name
        sessionId: SessionManager.getSessionId()
      });
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      // This would be a real API call in production
      // For now, we'll simulate a successful registration
      const mockUserId = 'user-' + Date.now();
      
      SessionManager.setUserId(mockUserId);
      
      setUser({
        id: mockUserId,
        email,
        name: name || email.split('@')[0],
        sessionId: SessionManager.getSessionId()
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    SessionManager.clearSession();
    setUser({
      id: 'anonymous',
      sessionId: SessionManager.getSessionId(),
      name: 'Anonymous'
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user?.id !== 'anonymous',
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for dashboard-specific functionality
export function useDashboard() {
  const { user } = useAuth();
  
  const getDashboardData = async () => {
    return await SessionManager.getDashboardData();
  };
  
  const recordSession = async (sessionData: Parameters<typeof SessionManager.recordExamSession>[0]) => {
    return await SessionManager.recordExamSession(sessionData);
  };
  
  return {
    user,
    getDashboardData,
    recordSession
  };
}