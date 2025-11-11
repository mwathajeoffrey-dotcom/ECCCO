'use client';

import Link from 'next/link';
import { BookOpen, ArrowLeft, Calendar, Shield, Scale, Users } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ECCCO</h1>
                <p className="text-sm text-gray-600">Medical Training Platform</p>
              </div>
            </Link>
            
            <Link
              href="/"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Scale className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Last updated: November 11, 2025</span>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-blue-50 rounded-lg p-6 mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { id: 'acceptance', title: '1. Acceptance of Terms' },
                { id: 'description', title: '2. Service Description' },
                { id: 'eligibility', title: '3. User Eligibility' },
                { id: 'account', title: '4. User Accounts' },
                { id: 'educational', title: '5. Educational Use' },
                { id: 'content', title: '6. Content and Intellectual Property' },
                { id: 'conduct', title: '7. User Conduct' },
                { id: 'privacy', title: '8. Privacy and Data Protection' },
                { id: 'medical', title: '9. Medical Disclaimer' },
                { id: 'payment', title: '10. Payment Terms' },
                { id: 'liability', title: '11. Limitation of Liability' },
                { id: 'termination', title: '12. Termination' },
                { id: 'modifications', title: '13. Modifications' },
                { id: 'governing', title: '14. Governing Law' },
                { id: 'contact', title: '15. Contact Information' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          {/* Terms Content */}
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <section id="acceptance" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-blue-600" />
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 mb-4">
                Welcome to ECCCO (Emergency & Critical Care Comprehensive Online). By accessing or using our medical training platform, 
                you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our service.
              </p>
              <p className="text-gray-700">
                These Terms constitute a legally binding agreement between you and ECCCO. By creating an account or using our services, 
                you acknowledge that you have read, understood, and agree to be bound by these Terms.
              </p>
            </section>

            {/* Section 2 */}
            <section id="description" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-700 mb-4">
                ECCCO is an online medical education platform that provides:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Interactive medical training modules and examinations</li>
                <li>Emergency and critical care educational content</li>
                <li>Performance tracking and analytics</li>
                <li>Certification and assessment tools</li>
                <li>Educational resources and documentation</li>
              </ul>
              <p className="text-gray-700">
                Our platform is designed for educational purposes to support medical professionals in their continuous learning and development.
              </p>
            </section>

            {/* Section 3 */}
            <section id="eligibility" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Eligibility</h2>
              <p className="text-gray-700 mb-4">
                To use ECCCO, you must:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Be a licensed medical professional, medical student, or healthcare educator</li>
                <li>Have the legal capacity to enter into these Terms</li>
                <li>Provide accurate and complete registration information</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
              <p className="text-gray-700">
                We reserve the right to verify your professional credentials and may request documentation to confirm your eligibility.
              </p>
            </section>

            {/* Section 4 */}
            <section id="account" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Accounts</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Creation</h3>
                  <p>You are responsible for maintaining the security of your account and password. You agree to notify us immediately of any unauthorized use of your account.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Information</h3>
                  <p>You agree to provide accurate, current, and complete information during registration and to update such information as necessary.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Security</h3>
                  <p>You are solely responsible for all activities that occur under your account. We recommend using a strong, unique password and enabling two-factor authentication when available.</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="educational" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Educational Use</h2>
              <p className="text-gray-700 mb-4">
                ECCCO is designed exclusively for educational purposes. You agree that:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>The platform is for professional medical education and training only</li>
                <li>Content should not be used as a substitute for professional medical advice</li>
                <li>You will use the platform in accordance with medical professional standards</li>
                <li>You will not use the platform for any commercial purposes without written permission</li>
                <li>You understand that completing courses does not guarantee certification or licensure</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="content" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Content and Intellectual Property</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Content</h3>
                  <p>All content provided on ECCCO, including but not limited to text, graphics, logos, videos, and software, is owned by ECCCO or our licensors and is protected by intellectual property laws.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">License to Use</h3>
                  <p>We grant you a limited, non-exclusive, non-transferable license to access and use our content for personal educational purposes only.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">User-Generated Content</h3>
                  <p>Any content you submit to ECCCO remains your property, but you grant us a license to use, display, and distribute such content in connection with our services.</p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section id="conduct" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. User Conduct</h2>
              <p className="text-gray-700 mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Share your account credentials with others</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Upload malicious code or viruses</li>
                <li>Engage in any form of harassment or discrimination</li>
                <li>Copy, distribute, or modify our content without permission</li>
                <li>Use automated tools to access our platform</li>
                <li>Interfere with the normal operation of our services</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section id="privacy" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our 
                <Link href="/privacy" className="text-blue-600 hover:underline"> Privacy Policy</Link>, 
                which is incorporated into these Terms by reference.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Privacy Points:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>We collect only necessary information for educational purposes</li>
                  <li>Your progress and performance data is securely stored</li>
                  <li>We comply with applicable data protection regulations</li>
                  <li>You have rights regarding your personal data</li>
                </ul>
              </div>
            </section>

            {/* Section 9 */}
            <section id="medical" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Medical Disclaimer</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-yellow-800 font-semibold">Important Medical Disclaimer</p>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>ECCCO IS FOR EDUCATIONAL PURPOSES ONLY.</strong> The content provided on our platform is not intended to be a substitute 
                  for professional medical advice, diagnosis, or treatment.
                </p>
                <p>
                  Always seek the advice of qualified healthcare providers with any questions you may have regarding medical conditions or treatment. 
                  Never disregard professional medical advice or delay seeking it because of information obtained through ECCCO.
                </p>
                <p>
                  The educational scenarios and case studies presented are for learning purposes and should not be applied to real patients 
                  without proper clinical judgment and supervision.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section id="payment" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Payment Terms</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Subscription Services</h3>
                  <p>Some features of ECCCO may require payment. Subscription fees are billed in advance and are non-refundable except as required by law.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Price Changes</h3>
                  <p>We reserve the right to change our pricing with 30 days' notice. Price changes will not affect existing subscription periods.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Cancellation</h3>
                  <p>You may cancel your subscription at any time. Cancellation will take effect at the end of your current billing period.</p>
                </div>
              </div>
            </section>

            {/* Section 11 */}
            <section id="liability" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  TO THE FULLEST EXTENT PERMITTED BY LAW, ECCCO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                  CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF OUR SERVICES.
                </p>
                <p>
                  Our total liability for any claims arising from or relating to these Terms shall not exceed the amount you paid to us 
                  in the twelve months preceding the claim.
                </p>
                <p>
                  Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so some of the above 
                  limitations may not apply to you.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section id="termination" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Termination</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Either party may terminate this agreement at any time. We may suspend or terminate your access to ECCCO immediately, 
                  without prior notice, for any violation of these Terms.
                </p>
                <p>
                  Upon termination, your right to access and use ECCCO will cease immediately. We may retain certain information as required by law or for legitimate business purposes.
                </p>
              </div>
            </section>

            {/* Section 13 */}
            <section id="modifications" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Modifications to Terms</h2>
              <p className="text-gray-700 mb-4">
                We may modify these Terms from time to time. We will notify you of any material changes by posting the updated Terms on our platform 
                and updating the "Last updated" date.
              </p>
              <p className="text-gray-700">
                Your continued use of ECCCO after the effective date of any changes constitutes your acceptance of the modified Terms.
              </p>
            </section>

            {/* Section 14 */}
            <section id="governing" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. 
                Any disputes arising from these Terms shall be resolved in the courts of [Your Jurisdiction].
              </p>
            </section>

            {/* Section 15 */}
            <section id="contact" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-3 text-blue-600" />
                15. Contact Information
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> legal@eccco.app</p>
                  <p><strong>Support:</strong> support@eccco.app</p>
                  <p><strong>Website:</strong> <Link href="/" className="text-blue-600 hover:underline">https://eccco.vercel.app</Link></p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-sm text-gray-600">
                By using ECCCO, you agree to these Terms of Service
              </div>
              <div className="flex gap-4">
                <Link
                  href="/privacy"
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="mailto:support@eccco.app"
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}