import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Layout,
  Server,
  Database,
  Radio,
  Wrench,
  Terminal,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';

type SkillCategory = 'all' | 'programming' | 'frontend' | 'backend' | 'databases' | 'networking' | 'tools';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');

  const categories = [
    { id: 'all', label: 'All Technologies', icon: Sparkles },
    { id: 'programming', label: 'Programming', icon: Code2 },
    { id: 'frontend', label: 'Frontend', icon: Layout },
    { id: 'backend', label: 'Backend', icon: Server },
    { id: 'databases', label: 'Databases', icon: Database },
    { id: 'networking', label: 'Networking', icon: Radio },
    { id: 'tools', label: 'DevOps & Tools', icon: Wrench },
  ];

  const filteredSkills = activeCategory === 'all'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-neutral-900/30 dark:bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>02. TECHNICAL SKILLS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Core Competencies & Toolchain
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            A comprehensive overview of programming languages, frontend/backend frameworks, database engines, and Cisco network engineering tools I command.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as SkillCategory)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20 scale-105'
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative p-5 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50 backdrop-blur-sm transition-all hover:-translate-y-1 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
                    <h3 className="font-bold text-neutral-900 dark:text-white text-sm sm:text-base group-hover:text-emerald-500 transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 font-semibold">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400"
                  />
                </div>

                <div className="flex items-center justify-between mt-3 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                  <span className="uppercase tracking-wider">
                    {skill.category}
                  </span>
                  {skill.highlight && (
                    <span className="inline-flex items-center gap-1 text-emerald-500 font-medium">
                      <CheckCircle2 className="w-3 h-3" /> Core
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Networking Highlights Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-emerald-500/30 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/5 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono">
                <Radio className="w-3.5 h-3.5" /> Cisco Certified Simulation Environment
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                Specialized in Cisco Packet Tracer & Enterprise Topologies
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                Capable of designing complex multi-building enterprise networks, implementing 802.1Q trunking, configuring OSPF dynamic routing, and setting up strict perimeter firewall ACLs.
              </p>
            </div>
            <a
              href="#projects"
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm whitespace-nowrap transition-colors shadow-md shadow-emerald-500/20"
            >
              Inspect Network Labs
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
