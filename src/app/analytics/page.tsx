'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { Calendar, Users, Globe, Clock, Smartphone, Monitor, 
         Tablet, MapPin, Activity, Lock, Key, TrendingUp, BookOpen, Award } from 'lucide-react';
import Link from 'next/link';
import { isDeveloperEnvironment, isDeveloper } from '@/lib/auth/developer';

interface OverviewStats {
  uniqueDevices: number;
  pageViews: number;
  examsStarted: number;
  examsCompleted: number;
  completionRate: string;
}

interface DeviceStats {
  devices: Record<string, number>;
  operatingSystems: Record<string, number>;
  browsers: Record<string, number>;
}

interface LocationStats {
  countries: Record<string, number>;
  cities: Record<string, number>;
}

interface TopicStats {
  [topicId: string]: {
    starts: number;
    selections: number;
    name: string;
  };
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export default function AnalyticsPage() {
  const [overview, setOverview] = useState<OverviewStats | null>(null);
  const [devices, setDevices] = useState<DeviceStats | null>(null);
  const [locations, setLocations] = useState<LocationStats | null>(null);
  const [topics, setTopics] = useState<TopicStats | null>(null);
  const [period, setPeriod] = useState('7');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [authError, setAuthError] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if in development environment
        if (isDeveloperEnvironment()) {
          setIsAuthenticated(true);
          setCheckingAuth(false);
          return;
        }

        // Check if already authenticated
        const authenticated = await isDeveloper();
        setIsAuthenticated(authenticated);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

    const handleLogin = async () => {
    setAuthError('');
    try {
      const devCodes = ['Gm@12345'];
      
      if (devCodes.includes(accessCode)) {
        setIsAuthenticated(true);
        // Store authentication in localStorage for persistence
        localStorage.setItem('eccco_analytics_auth', 'true');
      } else {
        setAuthError('Invalid access code');
      }
    } catch {
      setAuthError('Authentication failed');
    }
  };

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch all analytics data
      const [overviewRes, devicesRes, locationsRes, topicsRes] = await Promise.all([
        fetch(`/api/analytics?type=overview&period=${period}`),
        fetch(`/api/analytics?type=devices&period=${period}`),
        fetch(`/api/analytics?type=locations&period=${period}`),
        fetch(`/api/analytics?type=topics&period=${period}`)
      ]);

      const [overviewData, devicesData, locationsData, topicsData] = await Promise.all([
        overviewRes.json(),
        devicesRes.json(),
        locationsRes.json(),
        topicsRes.json()
      ]);

      setOverview(overviewData);
      setDevices(devicesData);
      setLocations(locationsData);
      setTopics(topicsData);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const formatChartData = (data: Record<string, number>, limit = 10) => {
    return Object.entries(data)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([name, value]) => ({ name, value }));
  };

  const formatPieData = (data: Record<string, number>) => {
    return Object.entries(data)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([name, value], index) => ({
        name,
        value,
        color: COLORS[index % COLORS.length]
      }));
  };

  // Show loading while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <Activity className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
            <p className="text-gray-600 mt-2">Developer access required for analytics administration</p>
          </div>
          
          {authError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {authError}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Code
              </label>
              <input
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter developer access code"
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Access Analytics
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <Link href="/guidelines" className="text-blue-600 hover:text-blue-700 text-sm mr-4">
              ← Guidelines Management
            </Link>
            <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm">
              Home
            </Link>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
              <strong>Dev Mode:</strong> Access code: Gm@12345
            </div>
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
                ← Back to Home
              </Link>
              <Link href="/guidelines" className="text-blue-600 hover:text-blue-700 mb-2 inline-block ml-4">
                Guidelines Management →
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Platform usage and user insights</p>
            </div>
            <div>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
              >
                <option value="1">Last 24 hours</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
              </select>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        {overview && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Unique Devices</p>
                  <p className="text-2xl font-bold text-gray-900">{overview.uniqueDevices}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <Globe className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Page Views</p>
                  <p className="text-2xl font-bold text-gray-900">{overview.pageViews}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Exams Started</p>
                  <p className="text-2xl font-bold text-gray-900">{overview.examsStarted}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <Award className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Exams Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{overview.examsCompleted}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-red-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{overview.completionRate}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Device Types */}
          {devices && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Types</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={formatPieData(devices.devices)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {formatPieData(devices.devices).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-4">
                {formatPieData(devices.devices).map((entry) => (
                  <div key={entry.name} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Countries */}
          {locations && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Countries</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={formatChartData(locations.countries, 8)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Operating Systems */}
          {devices && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Operating Systems</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={formatChartData(devices.operatingSystems)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Popular Topics */}
          {topics && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Topics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={Object.entries(topics)
                  .sort(([, a], [, b]) => b.starts - a.starts)
                  .slice(0, 8)
                  .map(([, data]) => ({
                    name: data.name.length > 20 ? data.name.substring(0, 20) + '...' : data.name,
                    starts: data.starts
                  }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="starts" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Raw Data Tables */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cities Table */}
          {locations && Object.keys(locations.cities).length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Cities</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Users
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(locations.cities)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 10)
                      .map(([city, count]) => (
                        <tr key={city}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{city}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{count}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Browsers Table */}
          {devices && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Browsers</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Browser
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Users
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(devices.browsers)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 10)
                      .map(([browser, count]) => (
                        <tr key={browser}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{browser}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{count}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}