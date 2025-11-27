'use client';

import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FileText,
  Clock,
  Library,
  BarChart3,
  Users,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

export default function QuickActions() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const actions = [
    {
      icon: FileText,
      title: 'Practice',
      description: '30 Questions',
      subtitle: 'Topic-focused practice',
      href: '/practice',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    },
    {
      icon: Clock,
      title: 'Exam',
      description: 'Full Timed',
      subtitle: '300 questions',
      href: '/exam',
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
    },
    {
      icon: Library,
      title: 'Study',
      description: 'Review Evidence',
      subtitle: '30+ landmark trials',
      href: '/emergency-references',
      gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
      iconBg: 'bg-gradient-to-br from-purple-500 to-fuchsia-600',
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'View Progress',
      subtitle: 'AI-powered insights',
      href: '/learning-analytics',
      gradient: 'from-violet-500 via-purple-500 to-indigo-500',
      iconBg: 'bg-gradient-to-br from-violet-500 to-purple-600',
    },
    {
      icon: Users,
      title: 'Live Quiz',
      description: 'Join/Host',
      subtitle: 'Multiplayer mode',
      href: '/live-quiz',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      iconBg: 'bg-gradient-to-br from-orange-500 to-red-600',
    },
    {
      icon: BookOpen,
      title: 'Guidelines',
      description: 'Browse',
      subtitle: 'Clinical guidelines',
      href: '/guidelines',
      gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
      iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600',
    },
  ];

  function TiltCard({ children, href, gradient }: { children: React.ReactNode; href: string; gradient: string }) {
    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(event.clientX - centerX);
      y.set(event.clientY - centerY);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    };

    return (
      <Link href={href}>
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative group"
        >
          <motion.div
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
          >
            {/* Animated gradient border */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity`} />
            
            {/* Content with 3D effect */}
            <div style={{ transform: 'translateZ(50px)' }} className="relative z-10">
              {children}
            </div>

            {/* Sparkle effect on hover */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute top-4 right-4"
              >
                <Sparkles className="w-6 h-6 text-blue-400" />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </Link>
    );
  }

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
    hidden: { opacity: 0, y: 30, rotateX: -20 },
    show: { opacity: 1, y: 0, rotateX: 0 },
  };

  return (
    <section className="relative py-32 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block mb-6"
          >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-6 py-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-bold">
                ⚡ QUICK ACCESS
              </span>
            </div>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            What Would You Like To{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
              Do Today?
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Jump right into your learning journey with instant access to all tools
          </p>
        </motion.div>

        {/* Action Cards Grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {actions.map((action) => (
            <motion.div key={action.title} variants={item}>
              <TiltCard href={action.href} gradient={action.gradient}>
                <div className={`w-16 h-16 ${action.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-2xl`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-3xl font-black text-white mb-2">
                  {action.title}
                </h3>
                <p className="text-xl font-semibold text-gray-300 mb-1">
                  {action.description}
                </p>
                <p className="text-sm text-gray-500">
                  {action.subtitle}
                </p>

                {/* Hover indicator */}
                <motion.div 
                  className="mt-6 flex items-center text-blue-400 text-sm font-semibold"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  Get Started →
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
