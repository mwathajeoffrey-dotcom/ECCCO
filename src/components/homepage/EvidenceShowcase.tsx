'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Library, ExternalLink, Award, TrendingUp, ArrowRight } from 'lucide-react';

export default function EvidenceShowcase() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const featuredTrials = [
    {
      name: 'CRASH-2',
      year: '2010',
      description: 'Tranexamic acid in trauma hemorrhage',
      impact: 'n=20,211',
      journal: 'Lancet',
      highlight: 'Landmark RCT',
    },
    {
      name: 'PROSEVA',
      year: '2013',
      description: 'Prone positioning in ARDS',
      impact: 'NNT=6',
      journal: 'NEJM',
      highlight: 'Practice-changing',
    },
    {
      name: 'TTM2',
      year: '2021',
      description: 'Temperature management post-arrest',
      impact: 'n=1,861',
      journal: 'NEJM',
      highlight: 'Recent evidence',
    },
    {
      name: 'CLOVERS',
      year: '2023',
      description: 'Fluid strategy in septic shock',
      impact: 'n=1,563',
      journal: 'NEJM',
      highlight: 'Latest data',
    },
  ];

  const journals = [
    { name: 'NEJM', count: 12 },
    { name: 'Lancet', count: 8 },
    { name: 'JAMA', count: 6 },
    { name: 'Circulation', count: 4 },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full opacity-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-semibold text-sm mb-4">
            <Library className="w-4 h-4" />
            Evidence-Based Learning
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Access 30+ Landmark Trials & Guidelines
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn from the best evidence with comprehensive trial summaries, clinical pearls, and NNT calculations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Featured Trials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-indigo-600" />
                Featured Landmark Trials
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {featuredTrials.map((trial, index) => (
                  <motion.div
                    key={trial.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">
                          {trial.name}
                        </h4>
                        <span className="text-xs text-gray-500">{trial.year} • {trial.journal}</span>
                      </div>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                        {trial.highlight}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{trial.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        {trial.impact}
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Journals & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Top Journals */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Top Journals
              </h3>
              <div className="space-y-3">
                {journals.map((journal) => (
                  <div key={journal.name} className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">{journal.name}</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
                      {journal.count} trials
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">What's Included</h3>
              <ul className="space-y-3">
                {[
                  'Full trial summaries',
                  'Clinical pearls',
                  'NNT calculations',
                  'DOI links to papers',
                  'Key takeaways',
                  'Application tips',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/emergency-references"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            Explore All 30 Trials
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
