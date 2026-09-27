import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Building,
  Award,
  Terminal,
  Calculator,
  CheckCircle2
} from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-neutral-900/30 dark:bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>04. EDUCATION & ACADEMICS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Academic Foundation & Statistical Rigor
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Blending mathematical statistics with computer science theory to build efficient, scalable computational systems.
          </p>
        </div>

        {/* Degree Showcase Card */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-3xl bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-xl relative overflow-hidden group"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-400" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Institution Details */}
              <div className="lg:col-span-6 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center shadow-inner">
                  <GraduationCap className="w-7 h-7" />
                </div>

                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {EDUCATION_DATA.period} • {EDUCATION_DATA.status}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
                    {EDUCATION_DATA.degree}
                  </h3>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-sm font-semibold mt-1">
                    <Calculator className="w-4 h-4" />
                    <span>Specialization: {EDUCATION_DATA.specialization}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300 font-medium">
                  <Building className="w-4 h-4 text-emerald-500" />
                  <span>{EDUCATION_DATA.institution}</span>
                </div>

                {/* Highlights List */}
                <div className="space-y-2 pt-2">
                  {EDUCATION_DATA.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coursework Matrix */}
              <div className="lg:col-span-6 bg-neutral-200/50 dark:bg-neutral-950/60 p-6 rounded-2xl border border-neutral-300/40 dark:border-neutral-800">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-300 dark:border-neutral-800">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-500" />
                    <span>Key Coursework</span>
                  </h4>
                  <span className="text-xs font-mono text-emerald-500 font-semibold">
                    8 Core Modules
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {EDUCATION_DATA.coursework.map((course) => (
                    <div
                      key={course}
                      className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:border-emerald-500/40 transition-colors flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="truncate">{course}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                  <Award className="w-5 h-5 text-emerald-500 shrink-0" />
                  <p className="text-xs text-neutral-700 dark:text-neutral-300">
                    Applying mathematical proofs, matrix calculations, and statistical hypothesis tests directly into code and database schema optimization.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
