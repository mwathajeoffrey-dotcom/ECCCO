'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Award,
  TrendingUp,
  Heart,
  Brain,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function EvidenceShowcase() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle system
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        const colors = ['rgba(168, 85, 247, 0.4)', 'rgba(34, 211, 238, 0.4)', 'rgba(236, 72, 153, 0.4)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvasWidth) this.x = 0;
        if (this.x < 0) this.x = canvasWidth;
        if (this.y > canvasHeight) this.y = 0;
        if (this.y < 0) this.y = canvasHeight;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const featuredTrials = [
    {
      icon: Heart,
      title: 'CRASH-2',
      subtitle: 'Tranexamic acid in trauma',
      impact: 'Changed global trauma care',
      journal: 'Lancet',
      year: '2010',
      gradient: 'from-red-500 via-pink-500 to-rose-500',
    },
    {
      icon: Brain,
      title: 'PROSEVA',
      subtitle: 'Prone positioning in ARDS',
      impact: 'Reduced mortality by 50%',
      journal: 'NEJM',
      year: '2013',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    },
    {
      icon: TrendingUp,
      title: 'TTM2',
      subtitle: 'Temperature management',
      impact: 'Reshaped post-arrest care',
      journal: 'NEJM',
      year: '2021',
      gradient: 'from-purple-500 via-violet-500 to-indigo-500',
    },
    {
      icon: Award,
      title: 'CLOVERS',
      subtitle: 'Septic shock fluids',
      impact: 'Refined resuscitation',
      journal: 'NEJM',
      year: '2023',
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
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
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section className="relative py-32 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 overflow-hidden">
      {/* Particle canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
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
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-6 py-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-bold">
                EVIDENCE-BASED LEARNING
              </span>
            </div>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Learn From{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
              Landmark Trials
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Study the groundbreaking research that shaped modern emergency medicine
          </p>
        </motion.div>

        {/* Featured Trials - Floating Glass Cards */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {featuredTrials.map((trial, index) => (
            <motion.div key={trial.title} variants={item}>
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 h-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${trial.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity`} />
                
                {/* Content */}
                <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-14 h-14 bg-gradient-to-br ${trial.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-2xl`}
                  >
                    <trial.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-black text-white mb-2">
                    {trial.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-300 mb-3">
                    {trial.subtitle}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold text-white bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      {trial.journal}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold">
                      {trial.year}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-400 font-medium">
                    {trial.impact}
                  </p>
                </div>

                {/* Sparkle decoration */}
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-4 right-4"
                >
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section - Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="relative"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-cyan-500/20 animate-pulse" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-3xl font-black text-white mb-3">
                  Explore the Full Library
                </h3>
                <p className="text-lg text-gray-300">
                  Access <span className="text-blue-400 font-bold">30+ landmark trials</span> with DOI references from top journals
                </p>
              </div>
              
              <Link href="/emergency-references">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl"
                >
                  Browse Library
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {[
              { icon: Award, text: 'Top Journal Publications' },
              { icon: TrendingUp, text: 'High Impact Trials' },
              { icon: Brain, text: 'Evidence-Based Content' },
            ].map((badge, i) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center gap-2 backdrop-blur-md bg-white/5 px-4 py-2 rounded-full border border-white/10"
              >
                <badge.icon className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-semibold text-gray-300">{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
