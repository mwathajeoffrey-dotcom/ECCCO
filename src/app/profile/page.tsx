'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import {
  User as UserIcon,
  Mail,
  Briefcase,
  Building,
  Target,
  BookOpen,
  Settings,
  Bell,
  ChevronLeft,
  Save,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Profile {
  specialty: string | null;
  experienceLevel: string | null;
  organization: string | null;
  role: string | null;
  focusAreas: string | null;
  difficultyPreference: string;
  studyGoals: string | null;
  preferredMode: string;
  dailyGoal: number;
  emailNotifications: boolean;
  weeklyDigest: boolean;
}

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  const [profile, setProfile] = useState<Profile>({
    specialty: null,
    experienceLevel: null,
    organization: null,
    role: null,
    focusAreas: null,
    difficultyPreference: 'medium',
    studyGoals: null,
    preferredMode: 'practice',
    dailyGoal: 10,
    emailNotifications: true,
    weeklyDigest: true
  });

  useEffect(() => {
    if (isLoaded && user) {
      loadProfile();
    } else if (isLoaded && !isSignedIn) {
      // User is not signed in, stop loading
      setLoading(false);
    }
  }, [isLoaded, user, isSignedIn]);

  const loadProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      
      if (data.success && data.profile) {
        setProfile({
          ...data.profile,
          focusAreas: data.profile.focusAreas ? JSON.parse(data.profile.focusAreas) : null
        });
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.primaryEmailAddress?.emailAddress,
          ...profile
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to update profile' });
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to view and edit your profile.</p>
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserIcon className="w-5 h-5" />
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-sm text-gray-600">Personalize your learning experience</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
            message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <p className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {message.text}
            </p>
          </div>
        )}

        {/* Account Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <UserIcon className="w-5 h-5 mr-2 text-blue-600" />
            Account Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={user?.primaryEmailAddress?.emailAddress || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
              <p className="text-xs text-gray-500 mt-1">Managed by your account settings</p>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
            Professional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty
              </label>
              <select
                value={profile.specialty || ''}
                onChange={(e) => setProfile({...profile, specialty: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select specialty...</option>
                <option value="ACLS">ACLS Only</option>
                <option value="PALS">PALS Only</option>
                <option value="Both">Both ACLS & PALS</option>
                <option value="BLS">BLS</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                value={profile.experienceLevel || ''}
                onChange={(e) => setProfile({...profile, experienceLevel: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select level...</option>
                <option value="Student">Medical Student</option>
                <option value="Resident">Resident</option>
                <option value="Attending">Attending Physician</option>
                <option value="Nurse">Nurse</option>
                <option value="Paramedic">Paramedic</option>
                <option value="Other">Other Healthcare Professional</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4 inline mr-2" />
                Organization
              </label>
              <input
                type="text"
                value={profile.organization || ''}
                onChange={(e) => setProfile({...profile, organization: e.target.value})}
                placeholder="Hospital or institution name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role/Title
              </label>
              <input
                type="text"
                value={profile.role || ''}
                onChange={(e) => setProfile({...profile, role: e.target.value})}
                placeholder="Your job title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-green-600" />
            Learning Preferences
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Difficulty
              </label>
              <select
                value={profile.difficultyPreference}
                onChange={(e) => setProfile({...profile, difficultyPreference: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="mixed">Mixed (Recommended)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Mode
              </label>
              <select
                value={profile.preferredMode}
                onChange={(e) => setProfile({...profile, preferredMode: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="practice">Practice Mode</option>
                <option value="exam">Exam Mode</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Target className="w-4 h-4 inline mr-2" />
                Daily Goal (Questions per day)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={profile.dailyGoal}
                onChange={(e) => setProfile({...profile, dailyGoal: parseInt(e.target.value) || 10})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Study Goals
              </label>
              <textarea
                value={profile.studyGoals || ''}
                onChange={(e) => setProfile({...profile, studyGoals: e.target.value})}
                placeholder="What are you working towards? (e.g., ACLS certification, residency prep)"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-orange-600" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive updates about your progress</p>
              </div>
              <button
                onClick={() => setProfile({...profile, emailNotifications: !profile.emailNotifications})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  profile.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    profile.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Weekly Digest</p>
                <p className="text-sm text-gray-600">Get a summary of your weekly progress</p>
              </div>
              <button
                onClick={() => setProfile({...profile, weeklyDigest: !profile.weeklyDigest})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  profile.weeklyDigest ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    profile.weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
