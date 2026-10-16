import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  ExternalLink,
  Search,
  ArrowRight,
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { PROJECTS_DATA } from '../data/portfolioData';
import type { ProjectCategory } from '../types';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'networking', label: 'Cisco Networking' },
    { id: 'backend', label: 'Backend & Data' },
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>05. FEATURED PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Engineering Projects & Network Simulations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Explore live production applications, transport booking platforms, inventory suites, and Cisco Packet Tracer network topologies.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20 scale-105'
                      : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, title, or tag..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
            <FolderGit2 className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-200">
              No matching projects found
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Try adjusting your search query or switching category filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group flex flex-col rounded-3xl bg-neutral-100/80 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10"
                >
                  {/* Project Image Mockup */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-neutral-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                        <Layers className="w-3 h-3" />
                        {project.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Featured Star */}
                    {project.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500 text-black shadow-md">
                          <Sparkles className="w-3 h-3" /> FEATURED
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-3">
                        {project.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-neutral-200/50 dark:bg-neutral-800/50 text-neutral-500">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Card Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
                        <Link
                          to={`/project/${project.id}`}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 group/link"
                        >
                          <span>Case Study</span>
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>

                        <div className="flex items-center gap-2">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`GitHub for ${project.title}`}
                            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                          {project.liveUrl && project.liveUrl !== '#' && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Live demo for ${project.title}`}
                              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};
