import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  ExternalLink,
  Terminal,
  Network,
  Code2,
  Globe,
  Database
} from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';

export const Certifications: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Network':
        return <Network className="w-6 h-6 text-emerald-500" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-emerald-500" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-emerald-500" />;
      case 'Database':
        return <Database className="w-6 h-6 text-emerald-500" />;
      default:
        return <Award className="w-6 h-6 text-emerald-500" />;
    }
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-neutral-900/30 dark:bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>06. CERTIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Credentials & Professional Accreditations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Validated credentials in networking topologies, object-oriented Python, full-stack architectures, and SQL databases.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 sm:p-7 rounded-3xl bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50 backdrop-blur-md transition-all hover:-translate-y-1 shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    {getIcon(cert.icon)}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold">
                      {cert.year}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white group-hover:text-emerald-500 transition-colors mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                  {cert.issuer}
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                  {cert.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer / Credential ID */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span className="truncate max-w-[200px]">ID: {cert.credentialId}</span>
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 font-semibold transition-colors"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
