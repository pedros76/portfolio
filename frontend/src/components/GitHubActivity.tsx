import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, GitPullRequest, Star, Terminal, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const GitHubActivity: React.FC = () => {
  // 52 weeks simulated activity heatmap intensities (0 to 4)
  const heatmapData = [
    [1, 2, 3, 2, 1, 0, 2], [2, 3, 4, 3, 2, 1, 2], [1, 2, 2, 3, 4, 2, 3],
    [3, 4, 3, 2, 1, 3, 4], [2, 1, 3, 4, 3, 2, 2], [4, 3, 4, 3, 2, 1, 3],
    [1, 2, 3, 4, 2, 3, 1], [2, 3, 4, 2, 1, 0, 2], [3, 4, 3, 2, 4, 3, 2],
    [2, 3, 1, 4, 3, 2, 3], [1, 2, 3, 4, 3, 2, 1], [3, 4, 4, 3, 2, 3, 4],
    [2, 3, 2, 1, 3, 4, 2], [4, 3, 2, 3, 4, 2, 1], [1, 2, 4, 3, 2, 1, 3],
    [3, 4, 3, 2, 1, 4, 2]
  ];

  const getColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-emerald-950 border-emerald-900';
      case 2:
        return 'bg-emerald-800 border-emerald-700';
      case 3:
        return 'bg-emerald-600 border-emerald-500';
      case 4:
        return 'bg-emerald-400 border-emerald-300';
      default:
        return 'bg-neutral-800/40 border-neutral-800';
    }
  };

  const topRepos = [
    {
      name: "tsafari-transit-core",
      desc: "Full-stack transport reservation engine with Django Channels & M-Pesa",
      stars: 18,
      forks: 5,
      language: "Python",
      langColor: "#3572A5"
    },
    {
      name: "cisco-enterprise-topologies",
      desc: "Validated Packet Tracer PKT simulation files, VLAN configs & ACLs",
      stars: 24,
      forks: 8,
      language: "Cisco IOS",
      langColor: "#059669"
    },
    {
      name: "agrovet-pos-react",
      desc: "Cloud veterinary inventory system with batch expiry alerts & POS receipting",
      stars: 14,
      forks: 3,
      language: "TypeScript",
      langColor: "#3178c6"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-neutral-900/20 dark:bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>OPEN SOURCE & CODE ACTIVITY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
              GitHub Contributions & Repositories
            </h2>
          </div>

          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:text-emerald-400 text-xs font-mono text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 transition-colors w-fit"
          >
            <span>Visit @petermisik</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Heatmap & Metrics Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-xl backdrop-blur-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <GitCommit className="w-5 h-5 text-emerald-500" />
                <span>684 Contributions in the last year</span>
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Continuous integration across personal software stacks and network simulation repos
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-6 text-xs font-mono">
              <div>
                <span className="text-neutral-400 block">Current Streak</span>
                <span className="text-emerald-500 font-bold text-base">21 Days</span>
              </div>
              <div>
                <span className="text-neutral-400 block">Longest Streak</span>
                <span className="text-emerald-500 font-bold text-base">48 Days</span>
              </div>
              <div>
                <span className="text-neutral-400 block">Pull Requests</span>
                <span className="text-emerald-500 font-bold text-base">92 Merged</span>
              </div>
            </div>
          </div>

          {/* Heatmap Grid Visual */}
          <div className="pt-6 overflow-x-auto pb-2">
            <div className="flex gap-1.5 min-w-[500px]">
              {heatmapData.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((level, dIdx) => (
                    <div
                      key={dIdx}
                      className={`w-3.5 h-3.5 rounded-sm border ${getColor(level)} transition-all hover:scale-125 cursor-pointer`}
                      title={`Activity Level: ${level}`}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 text-[11px] font-mono text-neutral-500">
              <span>Less</span>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-neutral-800 border border-neutral-700" />
                <span className="w-3 h-3 rounded-sm bg-emerald-950 border border-emerald-900" />
                <span className="w-3 h-3 rounded-sm bg-emerald-800 border border-emerald-700" />
                <span className="w-3 h-3 rounded-sm bg-emerald-600 border border-emerald-500" />
                <span className="w-3 h-3 rounded-sm bg-emerald-400 border border-emerald-300" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Top Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topRepos.map((repo, idx) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-5 rounded-2xl bg-neutral-100/90 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm mb-2">
                  <GitBranch className="w-4 h-4" />
                  <span className="truncate">{repo.name}</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                  {repo.desc}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: repo.langColor }}
                  />
                  <span>{repo.language}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400" /> {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitPullRequest className="w-3.5 h-3.5" /> {repo.forks}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
