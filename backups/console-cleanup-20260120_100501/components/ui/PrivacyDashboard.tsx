'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, Download, Trash2, Settings, AlertTriangle, CheckCircle } from 'lucide-react';
import dataProtection, { PrivacySettings, ConsentRecord } from '@/lib/privacy/dataProtection';

interface PrivacyDashboardProps {
  userId: string;
  onSettingsChange?: (settings: PrivacySettings) => void;
}

export function PrivacyDashboard({ userId, onSettingsChange }: PrivacyDashboardProps) {
  const [settings, setSettings] = useState<PrivacySettings | null>(null);
  const [consents, setConsents] = useState<ConsentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'settings' | 'consents' | 'data' | 'audit'>('settings');

  useEffect(() => {
    loadPrivacyData();
  }, [userId]);

  const loadPrivacyData = async () => {
    try {
      const [privacySettings, userConsents] = await Promise.all([
        dataProtection.getPrivacySettings(userId),
        dataProtection.getUserConsents(userId)
      ]);
      
      setSettings(privacySettings);
      setConsents(userConsents);
    } catch (error) {
      console.error('Failed to load privacy data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = async (key: keyof PrivacySettings, value: boolean | string) => {
    if (!settings) return;

    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    
    try {
      await dataProtection.updatePrivacySettings(userId, updatedSettings);
      onSettingsChange?.(updatedSettings);
    } catch (error) {
      console.error('Failed to update privacy settings:', error);
    }
  };

  const handleExportData = async () => {
    try {
      const userData = await dataProtection.exportUserData(userId);
      const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `eccco-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export data:', error);
    }
  };

  const handleDeleteAllData = async () => {
    if (!confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      return;
    }

    try {
      await dataProtection.deleteAllUserData(userId);
      alert('All your data has been deleted successfully.');
      // Redirect to home or logout
    } catch (error) {
      console.error('Failed to delete data:', error);
      alert('Failed to delete data. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <Shield className="h-6 w-6 text-blue-600 mr-3" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Privacy & Data Protection</h1>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'settings', label: 'Privacy Settings', icon: Settings },
            { id: 'consents', label: 'Consent Management', icon: CheckCircle },
            { id: 'data', label: 'Your Data', icon: Eye },
            { id: 'audit', label: 'Activity Log', icon: AlertTriangle }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'settings' && (
        <PrivacySettingsTab
          settings={settings}
          onSettingChange={handleSettingChange}
        />
      )}

      {activeTab === 'consents' && (
        <ConsentManagementTab
          userId={userId}
          consents={consents}
          onConsentsChange={setConsents}
        />
      )}

      {activeTab === 'data' && (
        <DataManagementTab
          onExportData={handleExportData}
          onDeleteAllData={handleDeleteAllData}
        />
      )}

      {activeTab === 'audit' && (
        <AuditLogTab userId={userId} />
      )}
    </div>
  );
}

function PrivacySettingsTab({ 
  settings, 
  onSettingChange 
}: { 
  settings: PrivacySettings | null;
  onSettingChange: (key: keyof PrivacySettings, value: boolean | string) => void;
}) {
  if (!settings) return null;

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Privacy Controls</h3>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Control how your data is used and processed. These settings affect your experience and the features available to you.
        </p>
      </div>

      <div className="grid gap-6">
        <SettingCard
          title="Analytics & Performance"
          description="Allow collection of anonymous usage data to improve the platform"
          checked={settings.allowAnalytics}
          onChange={(checked) => onSettingChange('allowAnalytics', checked)}
        />

        <SettingCard
          title="Marketing Communications"
          description="Receive emails about new features, courses, and promotions"
          checked={settings.allowMarketing}
          onChange={(checked) => onSettingChange('allowMarketing', checked)}
        />

        <SettingCard
          title="Cookies & Local Storage"
          description="Allow storing preferences and session data locally"
          checked={settings.allowCookies}
          onChange={(checked) => onSettingChange('allowCookies', checked)}
        />

        <SettingCard
          title="Data Sharing with Partners"
          description="Share anonymized data with educational partners for research"
          checked={settings.shareWithPartners}
          onChange={(checked) => onSettingChange('shareWithPartners', checked)}
        />

        <SettingCard
          title="Personalized Content"
          description="Allow profiling for personalized study recommendations"
          checked={settings.allowProfiling}
          onChange={(checked) => onSettingChange('allowProfiling', checked)}
        />

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Data Retention Period
          </label>
          <select
            value={settings.dataRetention}
            onChange={(e) => onSettingChange('dataRetention', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="minimal">Minimal (6 months)</option>
            <option value="standard">Standard (2 years)</option>
            <option value="extended">Extended (5 years)</option>
          </select>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            How long we keep your learning progress and exam data
          </p>
        </div>
      </div>
    </div>
  );
}

function SettingCard({ 
  title, 
  description, 
  checked, 
  onChange 
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      </div>
      <div className="ml-4">
        <button
          onClick={() => onChange(!checked)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              checked ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function ConsentManagementTab({ 
  userId, 
  consents, 
  onConsentsChange 
}: {
  userId: string;
  consents: ConsentRecord[];
  onConsentsChange: (consents: ConsentRecord[]) => void;
}) {
  const handleRevokeConsent = async (consentType: ConsentRecord['consentType']) => {
    try {
      await dataProtection.revokeConsent(userId, consentType);
      const updatedConsents = await dataProtection.getUserConsents(userId);
      onConsentsChange(updatedConsents);
    } catch (error) {
      console.error('Failed to revoke consent:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
        <h3 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Consent History</h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          View and manage all consent records. You can revoke consent at any time.
        </p>
      </div>

      {consents.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No consent records found.
        </p>
      ) : (
        <div className="space-y-3">
          {consents.map((consent, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                  {consent.consentType.replace('_', ' ')}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {consent.granted ? 'Granted' : 'Revoked'} on{' '}
                  {new Date(consent.timestamp).toLocaleDateString()}
                </p>
                {consent.expiresAt && (
                  <p className="text-xs text-gray-400">
                    Expires: {new Date(consent.expiresAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    consent.granted
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}
                >
                  {consent.granted ? 'Active' : 'Revoked'}
                </span>
                {consent.granted && (
                  <button
                    onClick={() => handleRevokeConsent(consent.consentType)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Revoke
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DataManagementTab({ 
  onExportData, 
  onDeleteAllData 
}: {
  onExportData: () => void;
  onDeleteAllData: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">Your Rights</h3>
        <p className="text-sm text-green-700 dark:text-green-300">
          You have the right to access, export, and delete your personal data at any time.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex items-start">
            <Download className="h-6 w-6 text-blue-600 mr-3 mt-1" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Export Your Data</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Download all your personal data in JSON format. This includes your profile, exam results, 
                progress data, and consent records.
              </p>
              <button
                onClick={onExportData}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Download Data Export
              </button>
            </div>
          </div>
        </div>

        <div className="border border-red-200 dark:border-red-700 rounded-lg p-6 bg-red-50 dark:bg-red-900/10">
          <div className="flex items-start">
            <Trash2 className="h-6 w-6 text-red-600 mr-3 mt-1" />
            <div className="flex-1">
              <h3 className="font-medium text-red-900 dark:text-red-100 mb-2">Delete All Data</h3>
              <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                Permanently delete all your personal data from our systems. This action cannot be undone 
                and you will lose all your progress and exam history.
              </p>
              <button
                onClick={onDeleteAllData}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Delete All My Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuditLogTab({ userId }: { userId: string }) {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuditLogs();
  }, [userId]);

  const loadAuditLogs = async () => {
    try {
      const logs = dataProtection.getAuditLogs(userId);
      setAuditLogs(logs.slice(0, 50)); // Show recent 50 logs
    } catch (error) {
      console.error('Failed to load audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading audit logs...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Activity Log</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Track all activities related to your data and privacy settings.
        </p>
      </div>

      {auditLogs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No audit logs found.
        </p>
      ) : (
        <div className="space-y-2">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
            >
              <div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {log.action.replace('_', ' ')}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  on {log.resource}
                </span>
              </div>
              <div className="text-right">
                <div className="text-gray-500 dark:text-gray-400">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full mt-1 ${
                    log.severity === 'high' || log.severity === 'critical'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      : log.severity === 'medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                  }`}
                >
                  {log.severity}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}