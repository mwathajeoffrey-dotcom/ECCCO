'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Wind,
  Heart,
  Droplets,
  Activity,
  Brain,
  Skull,
  Pill,
  Ambulance,
  Stethoscope,
  ArrowRight,
  Zap,
  Baby,
} from 'lucide-react';

export default function InteractiveTopicExplorer() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const topics = [
    {
      icon: Wind,
      name: 'Airway Management',
      questions: '450+',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      href: '/practice',
    },
    {
      icon: Heart,
      name: 'Cardiac Emergencies',
      questions: '380+',
      color: 'red',
      gradient: 'from-red-500 to-pink-500',
      href: '/practice',
    },
    {
      icon: Brain,
      name: 'Neurological',
      questions: '420+',
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-500',
      href: '/practice',
    },
    {
      icon: Ambulance,
      name: 'Trauma',
      questions: '350+',
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
      href: '/practice',
    },
    {
      icon: Droplets,
      name: 'Sepsis & Shock',
      questions: '290+',
      color: 'green',
      gradient: 'from-green-500 to-teal-500',
      href: '/practice',
    },
    {
      icon: Baby,
      name: 'OB/GYN',
      questions: '180+',
      color: 'pink',
      gradient: 'from-pink-500 to-rose-500',
      href: '/practice',
    },
    {
      icon: Stethoscope,
      name: 'Respiratory',
      questions: '310+',
      color: 'cyan',
      gradient: 'from-cyan-500 to-blue-500',
      href: '/practice',
    },
    {
      icon: Pill,
      name: 'Toxicology',
      questions: '260+',
      color: 'violet',
      gradient: 'from-violet-500 to-purple-500',
      href: '/practice',
    },
    {
      icon: Activity,
      name: 'ACLS',
      questions: '220+',
      color: 'indigo',
      gradient: 'from-indigo-500 to-blue-500',
      href: '/practice/acls',
    },
    {
      icon: Zap,
      name: 'PALS',
      questions: '200+',
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-500',
      href: '/practice/pals',
    },
    {
      icon: Skull,
      name: 'Critical Care',
      questions: '380+',
      color: 'gray',
      gradient: 'from-gray-600 to-gray-700',
      href: '/practice',
    },
    {
      icon: Activity,
      name: 'Procedures',
      questions: '150+',
      color: 'teal',
      gradient: 'from-teal-500 to-green-500',
      href: '/practice',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
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
            Explore Topics
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            5,000+ questions across all emergency and critical care topics. Click to start practicing.
          </p>
        </motion.div>

        {/* Topics Grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8"
        >
          {topics.map((topic) => (
            <motion.div key={topic.name} variants={item}>
              <Link
                href={topic.href}
                className="group block relative bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-12 h-12 bg-${topic.color}-100 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 transform group-hover:scale-110`}>
                    <topic.icon className={`w-6 h-6 text-${topic.color}-600 group-hover:text-white transition-colors duration-300`} />
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-white text-sm sm:text-base mb-1 transition-colors duration-300">
                    {topic.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 group-hover:text-white/80 transition-colors duration-300 flex items-center gap-1">
                    {topic.questions} questions
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" />
                  </p>
                </div>

                {/* Hover shine effect */}
                <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-full transition-all duration-700" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
          >
            View All Topics & Start Practicing
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
