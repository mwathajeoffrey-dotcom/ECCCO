'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FileText,
  Clock,
  Library,
  BarChart3,
  Users,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export default function QuickActions() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const actions = [
    {
      icon: FileText,
      title: 'Practice',
      description: '30 Questions',
      subtitle: 'Topic-focused practice',
      href: '/practice',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Clock,
      title: 'Exam',
      description: 'Full Timed',
      subtitle: '300 questions',
      href: '/exam',
      color: 'green',
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: Library,
      title: 'Study',
      description: 'Review Evidence',
      subtitle: '30+ landmark trials',
      href: '/emergency-references',
      color: 'indigo',
      gradient: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'View Progress',
      subtitle: 'AI-powered insights',
      href: '/learning-analytics',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: Users,
      title: 'Live Quiz',
      description: 'Join/Host',
      subtitle: 'Multiplayer mode',
      href: '/live-quiz',
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      icon: BookOpen,
      title: 'Guidelines',
      description: 'Browse',
      subtitle: 'Clinical guidelines',
      href: '/guidelines',
      color: 'red',
      gradient: 'from-red-500 to-red-600',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Would You Like To Do Today?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quick access to all your study tools and resources
          </p>
        </motion.div>

        {/* Action Cards Grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {actions.map((action) => (
            <motion.div key={action.title} variants={item}>
              <Link
                href={action.href}
                className="group block relative bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-${action.color}-100 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors duration-300`}>
                      <action.icon className={`w-7 h-7 text-${action.color}-600 group-hover:text-white transition-colors duration-300`} />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white mb-1 transition-colors duration-300">
                    {action.title}
                  </h3>
                  <p className="text-lg font-semibold text-gray-700 group-hover:text-white/90 mb-1 transition-colors duration-300">
                    {action.description}
                  </p>
                  <p className="text-sm text-gray-500 group-hover:text-white/70 transition-colors duration-300">
                    {action.subtitle}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
