import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  User,
  MapPin,
  GraduationCap,
  Calendar,
  Languages,
  CheckCircle2,
  Code2,
  Network,
  Cpu,
  Target,
  Terminal,
  Activity
} from 'lucide-react';
import { PERSONAL_INFO, STATS } from '../data/portfolioData';

export const About: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15
  });

  const detailsList = [
    { label: "Name", value: PERSONAL_INFO.name, icon: User },
    { label: "Location", value: PERSONAL_INFO.location, icon: MapPin },
    { label: "University", value: PERSONAL_INFO.university, icon: GraduationCap },
    { label: "Degree Program", value: PERSONAL_INFO.degree, icon: GraduationCap },
    { label: "Specialization", value: PERSONAL_INFO.specialization, icon: Activity },
    { label: "Year of Study", value: PERSONAL_INFO.yearOfStudy, icon: Calendar },
    { label: "Languages", value: PERSONAL_INFO.languages.join(", "), icon: Languages },
    { label: "Availability", value: PERSONAL_INFO.availability, icon: CheckCircle2 }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>01. ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Bridging Software Logic & Network Infrastructure
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            A comprehensive look into my academic journey, software engineering passion, and enterprise networking expertise.
          </p>
        </div>

        {/* Stats Row */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-5 sm:p-6 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm hover:border-emerald-500/40 transition-all hover:-translate-y-1 shadow-sm"
            >
              <div className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-mono flex items-center">
                <span className="text-emerald-500">{stat.value}</span>
                <span className="text-emerald-400 text-xl sm:text-2xl">{stat.suffix}</span>
              </div>
              <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-2">
                {stat.label}
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main About Grid: Narrative Cards + Personal Profile Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-100/60 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-500" />
                <span>The Software Engineering Journey</span>
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed mb-4">
                {PERSONAL_INFO.aboutDetailed.personalIntro} {PERSONAL_INFO.aboutDetailed.journey}
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
                By combining mathematics, statistical distribution models, and algorithmic problem-solving with cutting-edge tools like React, TypeScript, and Django, I build software that is both logically airtight and delightful to use.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-neutral-100/60 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
                  <Network className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-neutral-900 dark:text-white mb-2 text-sm sm:text-base">
                  Enterprise Networking
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Proficient in Cisco Packet Tracer simulations, VLAN trunking, Router-on-a-Stick architectures, sub-netting, and campus network security access lists.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-100/60 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-neutral-900 dark:text-white mb-2 text-sm sm:text-base">
                  Problem-Solving Mindset
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {PERSONAL_INFO.aboutDetailed.mindset}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-neutral-800 dark:text-neutral-200">
              <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Career Horizon
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                {PERSONAL_INFO.aboutDetailed.careerGoals}
              </p>
            </div>
          </div>

          {/* Details Matrix Column */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 shadow-md">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <Terminal className="w-5 h-5 text-emerald-500" />
                <span>Profile Snapshot</span>
              </h3>

              <div className="space-y-4">
                {detailsList.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 text-xs sm:text-sm py-1 border-b border-neutral-200/50 dark:border-neutral-800/60 last:border-0"
                    >
                      <div className="p-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-emerald-500 shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-neutral-500 dark:text-neutral-400 text-xs">
                          {item.label}
                        </div>
                        <div className="font-semibold text-neutral-800 dark:text-neutral-100">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span>Location Status: Active</span>
                  <span className="text-emerald-500 font-bold">UTC+3 (EAT)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
