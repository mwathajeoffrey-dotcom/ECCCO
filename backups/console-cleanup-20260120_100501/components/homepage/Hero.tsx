'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { BookOpen, Users, Trophy, Library, Sparkles, Zap, Award } from 'lucide-react';

export default function Hero() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [startCounting, setStartCounting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (inView) {
      setStartCounting(true);
    }
  }, [inView]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { icon: BookOpen, label: 'Questions', value: 5000, suffix: '+', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Library, label: 'Landmark Trials', value: 30, suffix: '+', gradient: 'from-purple-500 to-pink-500' },
    { icon: Trophy, label: 'Pass Rate', value: 95, suffix: '%', gradient: 'from-green-500 to-emerald-500' },
    { icon: Users, label: 'Active Users', value: 10000, suffix: '+', gradient: 'from-orange-500 to-red-500' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 blur-3xl"
        />
      </div>

      {/* Floating particles */}
      {typeof window !== 'undefined' && [...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.3
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            opacity: [null, Math.random() * 0.5 + 0.3, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Floating badge with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-6 py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full shadow-2xl mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-blue-400" />
            </motion.div>
            <span className="text-sm font-semibold text-white">
              Trusted by 10,000+ Healthcare Professionals Worldwide
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
          </motion.div>

          {/* Main heading with gradient animation */}
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="block text-white mb-2">Master Emergency</span>
            <span className="block">
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Critical Care Medicine
              </motion.span>
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            AI-powered learning platform with <span className="text-blue-400 font-semibold">5,000+ evidence-based questions</span>, 
            <span className="text-cyan-400 font-semibold"> 30+ landmark trials</span> from NEJM, Lancet, JAMA, and 
            <span className="text-indigo-400 font-semibold"> personalized analytics</span>
          </motion.p>

          {/* CTA Buttons with 3D effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
          >
            <Link
              href="/practice"
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Start Learning Free
              </span>
            </Link>
            <Link
              href="/emergency-references"
              className="group px-10 py-5 backdrop-blur-xl bg-white/10 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                <Library className="w-5 h-5" />
                Evidence Library
              </span>
            </Link>
          </motion.div>

          {/* Stats cards with glassmorphism */}
          <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, rotateX: -20 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: 1 + index * 0.1, type: "spring" }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  transition: { duration: 0.2 }
                }}
                className="group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity`} />
                
                <div className={`relative w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl font-black text-white mb-2">
                  {startCounting && (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix}
                    />
                  )}
                </div>
                <div className="text-sm text-gray-300 font-semibold uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm"
          >
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <span>Evidence-Based</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-pink-400" />
              <span>95% Pass Rate</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
