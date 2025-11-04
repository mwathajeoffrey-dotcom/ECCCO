import React from 'react';
import { Shield, Lock, Eye, FileText, Users, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 mr-3" />
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-blue-100 text-lg">
              Your privacy is fundamental to our mission of providing excellent medical education.
            </p>
            <p className="text-blue-200 text-sm mt-2">
              Last updated: November 4, 2025 | Effective Date: November 4, 2025
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-8 space-y-8">
            
            {/* Quick Summary */}
            <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Privacy at a Glance
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-800 dark:text-blue-200">
                    We only collect data necessary for your medical education
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-800 dark:text-blue-200">
                    Your learning progress is encrypted and secure
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-800 dark:text-blue-200">
                    You control your data and can export or delete it anytime
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-800 dark:text-blue-200">
                    We comply with GDPR, CCPA, and medical privacy standards
                  </span>
                </div>
              </div>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FileText className="h-6 w-6 mr-2 text-blue-600" />
                Information We Collect
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Account Information
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                    <li>• Email address and name for account creation</li>
                    <li>• Professional credentials and specialization (optional)</li>
                    <li>• Institution affiliation (if applicable)</li>
                    <li>• Password (encrypted and never stored in plain text)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Learning Data
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                    <li>• Exam scores and performance metrics</li>
                    <li>• Question responses and time spent</li>
                    <li>• Study progress and learning paths</li>
                    <li>• Practice session history and preferences</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Technical Information
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                    <li>• Device type, browser, and operating system</li>
                    <li>• IP address and general location (country/state)</li>
                    <li>• Usage patterns and feature interactions</li>
                    <li>• Error logs and performance metrics</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="h-6 w-6 mr-2 text-blue-600" />
                How We Use Your Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Essential Services
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                    <li>✓ Provide access to medical education content</li>
                    <li>✓ Track your learning progress and performance</li>
                    <li>✓ Authenticate and secure your account</li>
                    <li>✓ Provide customer support and assistance</li>
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Enhancement & Analytics
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                    <li>✓ Personalize your learning experience</li>
                    <li>✓ Improve platform performance and features</li>
                    <li>✓ Generate anonymized usage statistics</li>
                    <li>✓ Develop new educational content and tools</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Protection & Security */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Lock className="h-6 w-6 mr-2 text-blue-600" />
                Data Protection & Security
              </h2>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">
                      Encryption & Storage
                    </h3>
                    <ul className="text-green-800 dark:text-green-200 space-y-1 text-sm">
                      <li>• AES-256 encryption for sensitive data</li>
                      <li>• Secure HTTPS connections for all traffic</li>
                      <li>• Regular security audits and penetration testing</li>
                      <li>• Encrypted database storage and backups</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">
                      Access Controls
                    </h3>
                    <ul className="text-green-800 dark:text-green-200 space-y-1 text-sm">
                      <li>• Multi-factor authentication support</li>
                      <li>• Role-based access controls</li>
                      <li>• Regular access reviews and audit logs</li>
                      <li>• Secure API endpoints with rate limiting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Retention & Deletion */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Clock className="h-6 w-6 mr-2 text-blue-600" />
                Data Retention & Your Rights
              </h2>
              
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 dark:border-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Data Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Retention Period
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Purpose
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">Account Data</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Until account deletion</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Account management</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">Learning Progress</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">2 years after last activity</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Progress tracking</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">Analytics Data</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">6 months (anonymized after 30 days)</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Platform improvement</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">Audit Logs</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">3 years</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Security and compliance</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Your Privacy Rights</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-blue-800 dark:text-blue-200">Access:</strong>
                      <span className="text-blue-700 dark:text-blue-300"> Request a copy of your data</span>
                    </div>
                    <div>
                      <strong className="text-blue-800 dark:text-blue-200">Rectification:</strong>
                      <span className="text-blue-700 dark:text-blue-300"> Correct inaccurate information</span>
                    </div>
                    <div>
                      <strong className="text-blue-800 dark:text-blue-200">Erasure:</strong>
                      <span className="text-blue-700 dark:text-blue-300"> Delete your account and data</span>
                    </div>
                    <div>
                      <strong className="text-blue-800 dark:text-blue-200">Portability:</strong>
                      <span className="text-blue-700 dark:text-blue-300"> Export your data in standard formats</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies & Tracking */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Cookies & Tracking Technologies
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  We use cookies and similar technologies to enhance your experience and understand how you use our platform.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Essential</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Required for authentication, security, and basic functionality.
                    </p>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Analytics</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Help us understand usage patterns and improve the platform.
                    </p>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Preferences</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Remember your settings and personalize your experience.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                International Data Transfers
              </h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                      Your data may be processed in countries with different privacy laws. We ensure appropriate 
                      safeguards are in place, including Standard Contractual Clauses and adequacy decisions 
                      where applicable.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Privacy Questions</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      Email: privacy@eccco.edu
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Response time: Within 30 days (GDPR) / 45 days (CCPA)
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Data Protection Officer</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      Email: dpo@eccco.edu
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      For GDPR-related inquiries and data subject requests
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This privacy policy is effective as of November 4, 2025. We may update this policy periodically, 
                and we will notify you of any material changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}