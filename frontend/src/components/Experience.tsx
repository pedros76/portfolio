import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Terminal,
  Server,
  Layers
} from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>03. WORK EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Professional Experience & Industrial Attachment
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Proven track record in systems administration, technical training, computer maintenance, and enterprise network design.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central spine line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500 via-green-600 to-neutral-800 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-12">
            {EXPERIENCE_DATA.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline center node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-neutral-950 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 z-10 shadow-lg shadow-emerald-500/20 hidden sm:flex">
                    <Briefcase className="w-4 h-4" />
                  </div>

                  {/* Card Container */}
                  <div className="w-full sm:w-[calc(100%-48px)] sm:ml-12 md:ml-0 md:w-[calc(50%-32px)]">
                    <div className="p-6 sm:p-7 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/40 backdrop-blur-sm transition-all hover:shadow-xl group">
                      
                      {/* Badge / Type */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <Layers className="w-3 h-3" /> {item.type}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.period}
                        </span>
                      </div>

                      {/* Role & Org */}
                      <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                        {item.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 mb-4">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Server className="w-3.5 h-3.5" />
                          {item.organization}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mb-5 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Responsibilities list */}
                      <div className="space-y-2 mb-6">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                          Core Responsibilities:
                        </h4>
                        <ul className="space-y-1.5">
                          {item.responsibilities.map((resp, rIdx) => (
                            <li
                              key={rIdx}
                              className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies used */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-neutral-200/60 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
