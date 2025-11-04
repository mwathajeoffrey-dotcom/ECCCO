'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Cookie, X, Check, AlertTriangle } from 'lucide-react';
import dataProtection, { ConsentRecord } from '@/lib/privacy/dataProtection';

interface ConsentBannerProps {
  userId?: string;
  onConsentChange?: (consents: Record<string, boolean>) => void;
}

export function ConsentBanner({ userId, onConsentChange }: ConsentBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consents, setConsents] = useState({
    essential: true, // Always required
    analytics: false,
    marketing: false,
    cookies: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkConsentStatus();
  }, [userId]);

  const checkConsentStatus = async () => {
    if (!userId) {
      // Show banner for anonymous users
      const hasConsent = localStorage.getItem('anonymous_consent');
      setShowBanner(!hasConsent);
      return;
    }

    try {
      // Check if user has provided consents
      const userConsents = await dataProtection.getUserConsents(userId);
      const hasRecentConsent = userConsents.some(
        consent => Date.now() - consent.timestamp < 365 * 24 * 60 * 60 * 1000 // 1 year
      );

      if (!hasRecentConsent) {
        setShowBanner(true);
      }
    } catch (error) {
      console.error('Failed to check consent status:', error);
      setShowBanner(true);
    }
  };

  const handleAcceptAll = async () => {
    const allConsents = {
      essential: true,
      analytics: true,
      marketing: true,
      cookies: true
    };

    await recordConsents(allConsents);
  };

  const handleAcceptSelected = async () => {
    await recordConsents(consents);
  };

  const handleRejectAll = async () => {
    const minimalConsents = {
      essential: true,
      analytics: false,
      marketing: false,
      cookies: true // Required for functionality
    };

    await recordConsents(minimalConsents);
  };

  const recordConsents = async (consentChoices: Record<string, boolean>) => {
    setLoading(true);

    try {
      if (userId) {
        // Record consents for authenticated user
        await Promise.all([
          dataProtection.recordConsent(userId, 'analytics', consentChoices.analytics),
          dataProtection.recordConsent(userId, 'marketing', consentChoices.marketing),
          dataProtection.recordConsent(userId, 'cookies', consentChoices.cookies),
          dataProtection.recordConsent(userId, 'essential', consentChoices.essential)
        ]);
      } else {
        // Store consent for anonymous user
        localStorage.setItem('anonymous_consent', JSON.stringify({
          ...consentChoices,
          timestamp: Date.now()
        }));
      }

      onConsentChange?.(consentChoices);
      setShowBanner(false);
      
      // Initialize analytics if consented
      if (consentChoices.analytics) {
        initializeAnalytics();
      }
      
      // Initialize marketing if consented
      if (consentChoices.marketing) {
        initializeMarketing();
      }

    } catch (error) {
      console.error('Failed to record consents:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializeAnalytics = () => {
    // Initialize analytics services
    console.log('[Consent] Analytics initialized');
  };

  const initializeMarketing = () => {
    // Initialize marketing services
    console.log('[Consent] Marketing initialized');
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto p-4">
        {!showDetails ? (
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-start flex-1 min-w-0">
              <Cookie className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  We value your privacy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  We use cookies and similar technologies to enhance your learning experience, 
                  analyze performance, and provide personalized content. You can manage your 
                  preferences at any time.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 flex-shrink-0">
              <button
                onClick={() => setShowDetails(true)}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 underline"
              >
                Customize
              </button>
              <button
                onClick={handleRejectAll}
                disabled={loading}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
              >
                Essential Only
              </button>
              <button
                onClick={handleAcceptAll}
                disabled={loading}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 flex items-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <ConsentDetails
            consents={consents}
            onConsentsChange={setConsents}
            onAccept={handleAcceptSelected}
            onReject={handleRejectAll}
            onBack={() => setShowDetails(false)}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}

function ConsentDetails({
  consents,
  onConsentsChange,
  onAccept,
  onReject,
  onBack,
  loading
}: {
  consents: Record<string, boolean>;
  onConsentsChange: (consents: Record<string, boolean>) => void;
  onAccept: () => void;
  onReject: () => void;
  onBack: () => void;
  loading: boolean;
}) {
  const handleToggle = (key: string, value: boolean) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    
    onConsentsChange({
      ...consents,
      [key]: value
    });
  };

  const consentOptions = [
    {
      key: 'essential',
      title: 'Essential Cookies',
      description: 'Required for basic functionality, authentication, and security. These cannot be disabled.',
      required: true,
      icon: Shield
    },
    {
      key: 'analytics',
      title: 'Analytics & Performance',
      description: 'Help us understand how you use the platform to improve your learning experience.',
      required: false,
      icon: AlertTriangle
    },
    {
      key: 'marketing',
      title: 'Marketing & Communication',
      description: 'Personalized content recommendations and promotional communications.',
      required: false,
      icon: Cookie
    },
    {
      key: 'cookies',
      title: 'Functional Cookies',
      description: 'Remember your preferences and settings for a better user experience.',
      required: false,
      icon: Cookie
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Customize Privacy Settings
        </h3>
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid gap-4 max-h-60 overflow-y-auto">
        {consentOptions.map(({ key, title, description, required, icon: Icon }) => (
          <div
            key={key}
            className="flex items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <Icon className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {title}
                  {required && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Required
                    </span>
                  )}
                </h4>
                <div className="ml-4">
                  <button
                    onClick={() => handleToggle(key, !consents[key])}
                    disabled={required}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      consents[key] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    } ${required ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        consents[key] ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onReject}
          disabled={loading}
          className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
        >
          Essential Only
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Back
          </button>
          <button
            onClick={onAccept}
            disabled={loading}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            ) : (
              <Check className="h-4 w-4 mr-2" />
            )}
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieNotice() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('cookie_notice_dismissed');
    setDismissed(!!isDismissed);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('cookie_notice_dismissed', 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="fixed top-4 right-4 max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-40">
      <div className="flex items-start">
        <Cookie className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This website uses cookies to enhance your experience.{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Learn more
            </a>
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}