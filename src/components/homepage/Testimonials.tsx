'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Emergency Medicine Physician',
      hospital: 'Johns Hopkins Hospital',
      rating: 5,
      text: 'The evidence library is incredible! Having access to landmark trials like CRASH-2 and PROSEVA with clinical pearls has completely changed how I prepare for exams and practice.',
      avatar: 'SJ',
      color: 'blue',
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Critical Care Fellow',
      hospital: 'Mayo Clinic',
      rating: 5,
      text: 'The AI-powered analytics helped me identify my weak areas and focus my study time effectively. I passed my boards on the first try thanks to ECCCO!',
      avatar: 'MC',
      color: 'green',
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'EM Resident',
      hospital: 'Massachusetts General',
      rating: 5,
      text: 'Best question bank available for emergency medicine. The explanations are detailed, evidence-based, and directly applicable to clinical practice.',
      avatar: 'ER',
      color: 'purple',
    },
    {
      name: 'Dr. John Williams',
      role: 'ICU Attending',
      hospital: 'Cleveland Clinic',
      rating: 5,
      text: 'The 5,000+ question database covers everything. I use it to keep my knowledge current and prepare my residents for their exams. Highly recommend!',
      avatar: 'JW',
      color: 'orange',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold text-sm mb-4">
            <Star className="w-4 h-4 fill-current" />
            10,000+ Happy Users
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of physicians, residents, and fellows who have improved their knowledge with ECCCO
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={item}
              className="bg-white rounded-2xl shadow-lg p-8 relative hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-gray-400" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-6 relative z-10 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${colorClasses[testimonial.color as keyof typeof colorClasses]} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-xs text-gray-500">{testimonial.hospital}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { label: 'Average Rating', value: '4.9/5', icon: '⭐' },
            { label: 'Active Users', value: '10,000+', icon: '👥' },
            { label: 'Questions Answered', value: '2M+', icon: '✅' },
            { label: 'Pass Rate', value: '95%', icon: '🎓' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
