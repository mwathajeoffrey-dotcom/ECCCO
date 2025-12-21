'use client';

import { GitBranch, Search, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const flowcharts = [
  {
    id: 1,
    title: 'ACLS Algorithms',
    category: 'Cardiac',
    description: 'Advanced Cardiac Life Support protocols and decision trees'
  },
  {
    id: 2,
    title: 'Sepsis Management',
    category: 'Critical Care',
    description: 'Sepsis recognition and treatment pathway'
  },
  {
    id: 3,
    title: 'Trauma Assessment',
    category: 'Trauma',
    description: 'Primary and secondary survey protocols'
  },
  {
    id: 4,
    title: 'Stroke Protocol',
    category: 'Neurology',
    description: 'Acute stroke assessment and management'
  }
];

export default function FlowchartsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = flowcharts.filter(fc =>
    fc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GitBranch className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Clinical Flowcharts</h1>
          </div>
          <p className="text-gray-600">
            Visual guides for emergency protocols and clinical decision-making
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search flowcharts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Flowcharts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((flowchart) => (
            <div
              key={flowchart.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  {flowchart.category}
                </span>
                <GitBranch className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {flowchart.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {flowchart.description}
              </p>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                View Flowchart
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <GitBranch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No flowcharts found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
