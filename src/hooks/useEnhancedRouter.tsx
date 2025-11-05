'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

interface NavigationState {
  isNavigating: boolean;
  previousPath?: string;
  currentPath: string;
  navigationHistory: string[];
  error?: Error;
}

interface NavigationOptions {
  replace?: boolean;
  scroll?: boolean;
  trackAnalytics?: boolean;
  retryOnError?: boolean;
  maxRetries?: number;
}

export function useEnhancedRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const [navigationState, setNavigationState] = useState<NavigationState>({
    isNavigating: false,
    currentPath: pathname,
    navigationHistory: [pathname]
  });

  // Track route changes
  useEffect(() => {
    setNavigationState(prev => ({
      ...prev,
      previousPath: prev.currentPath,
      currentPath: pathname,
      navigationHistory: [...prev.navigationHistory.slice(-10), pathname], // Keep last 10 routes
      error: undefined
    }));
  }, [pathname]);

  const navigate = useCallback(async (
    path: string, 
    options: NavigationOptions = {}
  ) => {
    const {
      replace = false,
      scroll = true,
      trackAnalytics = true,
      retryOnError = true,
      maxRetries = 2
    } = options;

    setNavigationState(prev => ({ ...prev, isNavigating: true, error: undefined }));

    let attempts = 0;
    const attemptNavigation = async (): Promise<void> => {
      try {
        attempts++;
        
        // Track navigation if enabled
        if (trackAnalytics) {
          // Analytics tracking would go here
          console.log(`Navigating from ${pathname} to ${path}`);
        }

        // Perform navigation
        if (replace) {
          router.replace(path, { scroll });
        } else {
          router.push(path, { scroll });
        }

      } catch (error) {
        const navigationError = error as Error;
        
        // Log navigation error
        console.error('Navigation failed:', {
          type: 'component',
          message: `Navigation failed: ${pathname} -> ${path}`,
          componentName: 'Router',
          severity: 'medium',
          context: {
            fromPath: pathname,
            toPath: path,
            error: navigationError.message,
            stack: navigationError.stack,
            timestamp: new Date().toISOString()
          }
        });

        // Retry if enabled and we haven't exceeded max attempts
        if (retryOnError && attempts < maxRetries) {
          console.warn(`Navigation failed (attempt ${attempts}), retrying...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts)); // Exponential backoff
          return attemptNavigation();
        }

        // Set error state
        setNavigationState(prev => ({ 
          ...prev, 
          isNavigating: false, 
          error: navigationError 
        }));

        throw navigationError;
      }
    };

    try {
      await attemptNavigation();
    } finally {
      setNavigationState(prev => ({ ...prev, isNavigating: false }));
    }
  }, [router, pathname]);

  const goBack = useCallback((fallbackPath = '/') => {
    const history = navigationState.navigationHistory;
    if (history.length > 1) {
      const previousPath = history[history.length - 2];
      navigate(previousPath, { replace: true });
    } else {
      navigate(fallbackPath);
    }
  }, [navigate, navigationState.navigationHistory]);

  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const prefetch = useCallback((path: string) => {
    try {
      router.prefetch(path);
    } catch (error) {
      console.warn('Prefetch failed:', error);
    }
  }, [router]);

  return {
    navigate,
    goBack,
    refresh,
    prefetch,
    navigationState,
    isNavigating: navigationState.isNavigating,
    currentPath: navigationState.currentPath,
    previousPath: navigationState.previousPath,
    navigationError: navigationState.error,
    canGoBack: navigationState.navigationHistory.length > 1
  };
}

// Hook for route protection and redirects
export function useRouteGuard(
  condition: () => boolean | Promise<boolean>,
  redirectPath: string,
  options: { 
    immediate?: boolean;
    onRedirect?: () => void;
    loading?: boolean;
  } = {}
) {
  const { navigate } = useEnhancedRouter();
  const [isChecking, setIsChecking] = useState(options.loading ?? true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkCondition = async () => {
      if (!options.immediate && !isChecking) return;
      
      setIsChecking(true);
      try {
        const result = await condition();
        setIsAuthorized(result);
        
        if (!result) {
          options.onRedirect?.();
          await navigate(redirectPath, { replace: true });
        }
      } catch (error) {
        console.error('Route guard check failed:', error);
        setIsAuthorized(false);
        await navigate(redirectPath, { replace: true });
      } finally {
        setIsChecking(false);
      }
    };

    checkCondition();
  }, [condition, redirectPath, navigate, options, isChecking]);

  return { isChecking, isAuthorized };
}

// Enhanced Link component with error handling
import Link from 'next/link';
import { ReactNode, MouseEvent } from 'react';

interface EnhancedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  fallbackHref?: string;
  trackAnalytics?: boolean;
}

export function EnhancedLink({
  href,
  children,
  className,
  replace = false,
  scroll = true,
  prefetch = true,
  onClick,
  fallbackHref = '/',
  trackAnalytics = true,
  ...props
}: EnhancedLinkProps) {
  const { navigate } = useEnhancedRouter();

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    onClick?.(e);

    // Don't interfere with special clicks
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.defaultPrevented) {
      return;
    }

    e.preventDefault();

    try {
      await navigate(href, { replace, scroll, trackAnalytics });
    } catch (error) {
      console.error('Navigation failed, falling back:', error);
      
      // Fallback to regular navigation
      if (fallbackHref !== href) {
        try {
          await navigate(fallbackHref, { replace: true });
        } catch (fallbackError) {
          console.error('Fallback navigation also failed:', fallbackError);
          // Force page reload as last resort
          window.location.href = fallbackHref;
        }
      }
    }
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      prefetch={prefetch}
      {...props}
    >
      {children}
    </Link>
  );
}