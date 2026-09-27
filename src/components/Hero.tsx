import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  FolderGit2,
  Mail,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Cpu,
  Database,
  Radio,
  Sparkles
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, WhatsAppIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = PERSONAL_INFO.roles[roleIndex];
    const typingSpeed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentRole.substring(0, text.length + 1));
        if (text.length + 1 === currentRole.length) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        setText(currentRole.substring(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden matrix-grid"
    >
      {/* Ambient background glow & radial gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-green-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Introduction & Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-mono mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for Hire & ICT Attachments</span>
            </div>

            {/* Greeting & Heading */}
            <p className="text-base sm:text-lg font-mono text-neutral-600 dark:text-neutral-400 mb-2">
              {PERSONAL_INFO.greeting}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight mb-4">
              <span className="block">{PERSONAL_INFO.name}</span>
            </h1>

            {/* Dynamic Typewriter Title */}
            <div className="h-10 sm:h-12 flex items-center mb-5 font-mono text-xl sm:text-2xl md:text-3xl font-bold">
              <span className="text-neutral-700 dark:text-neutral-300 mr-2">I build as a</span>
              <span className="text-emerald-500 dark:text-emerald-400 border-b-2 border-emerald-500">
                {text}
              </span>
              <span className="w-2.5 h-6 bg-emerald-500 ml-1 inline-block animate-pulse" />
            </div>

            {/* Subtitle / Focus Areas */}
            <p className="text-sm sm:text-base font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase font-mono mb-4">
              {PERSONAL_INFO.title}
            </p>

            {/* Professional Description */}
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mb-8 leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto">
              {/* Direct Download CV */}
              <a
                href={PERSONAL_INFO.cvPath}
                download="Peter_Kiplagat_Misik_CV.pdf"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm sm:text-base shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>

              {/* View Projects */}
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-200/80 dark:bg-neutral-800/80 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-medium text-sm sm:text-base border border-neutral-300 dark:border-neutral-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <FolderGit2 className="w-4 h-4 text-emerald-500" />
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Quick Resume Preview */}
              <button
                onClick={onOpenResume}
                className="text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-emerald-500 dark:hover:text-emerald-400 underline underline-offset-4 transition-colors"
              >
                [Preview Resume]
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-500 mr-2">
                Connect:
              </span>
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-neutral-200/70 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-all hover:-translate-y-0.5"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-neutral-200/70 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-all hover:-translate-y-0.5"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.email}
                aria-label="Send Direct Email"
                className="p-2.5 rounded-xl bg-neutral-200/70 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-all hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="p-2.5 rounded-xl bg-neutral-200/70 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-all hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-500" />
              </a>
              <a
                href={PERSONAL_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
                className="p-2.5 rounded-xl bg-neutral-200/70 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-all hover:-translate-y-0.5"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Linux-Style Terminal Avatar with Floating Badges & Matrix Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            {/* Outer Animated Glowing Frame */}
            <div className="relative w-72 sm:w-84 md:w-96 aspect-square">
              {/* Rotating glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-500/30 via-green-600/10 to-teal-400/20 blur-xl animate-pulse" />

              {/* Linux Terminal Box Container */}
              <div className="relative w-full h-full rounded-3xl bg-neutral-950 border-2 border-emerald-500/40 shadow-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden group">
                
                {/* Matrix Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.04] to-transparent pointer-events-none -translate-y-full group-hover:translate-y-full transition-transform duration-1000" />

                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>misik@ttu-core:~</span>
                  </div>
                  <div className="w-6" />
                </div>

                {/* Terminal Body with Linux Avatar Visual */}
                <div className="flex-1 py-4 flex flex-col justify-center items-center text-center font-mono">
                  {/* Avatar Centerpiece */}
                  <div className="relative mb-3">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border-2 border-emerald-500/60 p-2 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <div className="w-full h-full rounded-xl bg-neutral-900 flex flex-col items-center justify-center text-emerald-400">
                        <Terminal className="w-10 h-10 mb-1" />
                        <span className="text-[10px] text-neutral-400 font-bold">ARCH / DEBIAN</span>
                      </div>
                    </div>
                    {/* Verified badge */}
                    <div className="absolute -bottom-1.5 -right-1.5 p-1 rounded-full bg-emerald-500 text-black shadow-md">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Terminal Log Statements */}
                  <div className="text-left w-full space-y-1 text-xs px-2">
                    <p className="text-neutral-400">
                      <span className="text-emerald-400">$</span> whoami
                    </p>
                    <p className="text-emerald-300 font-bold pl-3">
                      &gt; Peter Kiplagat Misik [BSc Information Technology]
                    </p>
                    <p className="text-neutral-400">
                      <span className="text-emerald-400">$</span> cat skills.json
                    </p>
                    <p className="text-neutral-300 pl-3 text-[11px]">
                      &gt; [Django, React, Cisco, SQL, Python]
                    </p>
                    <p className="text-neutral-400">
                      <span className="text-emerald-400">$</span> status --active
                    </p>
                    <p className="text-emerald-400 font-bold pl-3 text-[11px] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      &gt; Ready to engineer solutions.
                    </p>
                  </div>
                </div>

                {/* Terminal Footer Indicator */}
                <div className="border-t border-neutral-800/80 pt-2 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>RAM: 16GB / SWAP: OK</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> System Optimal
                  </span>
                </div>
              </div>

              {/* Floating Tech Badges around Image */}
              {/* Badge 1: React / Frontend */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-neutral-900/90 border border-emerald-500/40 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-white">React 19</span>
              </motion.div>

              {/* Badge 2: Cisco / Networking */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-neutral-900/90 border border-emerald-500/40 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Radio className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-white">Cisco VLANs</span>
              </motion.div>

              {/* Badge 3: PostgreSQL / Backend */}
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 -right-6 -translate-y-1/2 bg-neutral-900/90 border border-emerald-500/40 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg hidden sm:flex"
              >
                <Database className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-mono font-bold text-white">PostgreSQL</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
