import React from 'react';
import {
  Terminal,
  ArrowUp,
  Mail,
  Heart
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, WhatsAppIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'AI Assistant', href: '#ai-assistant' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-950 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Brand & Bio */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-black font-bold">
                <Terminal className="w-4 h-4 text-neutral-950" />
              </div>
              <span className="font-mono text-lg font-bold text-neutral-900 dark:text-white">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
              BSc in Information Technology at Taita Taveta University. Passionate about software architecture, Cisco networking, and scalable web solutions.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-neutral-200 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-emerald-500 transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-neutral-200 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-emerald-500 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-neutral-200 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-emerald-500 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-500" />
              </a>
              <a
                href={PERSONAL_INFO.socials.email}
                className="p-2 rounded-xl bg-neutral-200 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-emerald-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-neutral-200 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-emerald-500 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-900 dark:text-white font-bold mb-4">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Back to top action */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-200 dark:bg-neutral-900 hover:bg-emerald-500 hover:text-black text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-800 transition-all shadow-sm group"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p className="flex items-center gap-1.5">
            © {currentYear} {PERSONAL_INFO.name}. Crafted with
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            using React 19 & Tailwind CSS.
          </p>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Deployment Ready • Linux Environment</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
