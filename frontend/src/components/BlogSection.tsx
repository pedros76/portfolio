import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, Terminal } from 'lucide-react';
import { BLOG_POSTS } from '../data/portfolioData';

export const BlogSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>TECHNICAL WRITING & INSIGHTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Recent Articles & Engineering Notes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Documenting architectural decisions, network topology breakdowns, and mathematical applications in software development.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="p-6 sm:p-7 rounded-3xl bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50 backdrop-blur-md transition-all hover:-translate-y-1.5 flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <div className="mb-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white group-hover:text-emerald-500 transition-colors mb-3 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:underline">
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <BookOpen className="w-4 h-4 text-neutral-400" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
