import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Radio,
  Share2
} from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import { PROJECTS_DATA, PERSONAL_INFO } from '../data/portfolioData';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const projectIndex = PROJECTS_DATA.findIndex((p) => p.id === id);
  const project = PROJECTS_DATA[projectIndex];

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-500 mb-4">
          <Terminal className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          Project Not Found
        </h2>
        <p className="text-sm text-neutral-500 max-w-md mb-6">
          The project identifier "{id}" does not exist in the catalog or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    );
  }

  const prevProject =
    projectIndex > 0 ? PROJECTS_DATA[projectIndex - 1] : PROJECTS_DATA[PROJECTS_DATA.length - 1];
  const nextProject =
    projectIndex < PROJECTS_DATA.length - 1 ? PROJECTS_DATA[projectIndex + 1] : PROJECTS_DATA[0];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${project.title} - ${PERSONAL_INFO.name}`,
        text: project.subtitle,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <article className="min-h-screen pt-28 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar / Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/#projects')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-neutral-600 dark:text-neutral-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-emerald-500 text-xs font-mono transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Case Study</span>
          </button>
        </div>

        {/* Project Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 space-y-4"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Layers className="w-3 h-3" />
              {project.category.toUpperCase()}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500 text-black">
                <Sparkles className="w-3 h-3" /> FEATURED SPECIFICATION
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-emerald-600 dark:text-emerald-400 font-medium">
            {project.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-medium text-xs sm:text-sm border border-neutral-300 dark:border-neutral-700 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Source Repository</span>
            </a>

            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demonstration</span>
              </a>
            )}
          </div>
        </motion.header>

        {/* Featured Hero Image / Mockup Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl mb-12 aspect-[16/9] bg-neutral-950 relative"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
        </motion.div>

        {/* Performance & Engineering Metrics Banner */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-14">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-5 rounded-2xl bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-center"
              >
                <div className="text-xl sm:text-3xl font-extrabold text-emerald-500 font-mono">
                  {metric.value}
                </div>
                <div className="text-xs font-mono uppercase text-neutral-500 mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Content Grid */}
        <div className="space-y-12">
          
          {/* Overview Section */}
          <section className="p-7 sm:p-9 rounded-3xl bg-neutral-100/80 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-500" />
              <span>Project Overview & Engineering Scope</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              {project.longDescription}
            </p>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Designed and implemented following clean architecture principles, strict unit testing, and modular separation of concerns.
            </p>
          </section>

          {/* Key Features Section */}
          <section className="p-7 sm:p-9 rounded-3xl bg-neutral-100/80 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <span>Core Features & Implementation</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feat, fIdx) => (
                <div
                  key={fIdx}
                  className="p-4 rounded-2xl bg-neutral-200/50 dark:bg-neutral-950/60 border border-neutral-300/50 dark:border-neutral-800/80 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* System & Network Architecture */}
          {project.architecture && (
            <section className="p-7 sm:p-9 rounded-3xl bg-neutral-100/80 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                <Radio className="w-5 h-5 text-emerald-500" />
                <span>System & Network Architecture</span>
              </h2>
              <ul className="space-y-3">
                {project.architecture.map((arch, aIdx) => (
                  <li
                    key={aIdx}
                    className="p-4 rounded-2xl bg-neutral-200/50 dark:bg-neutral-950/60 border border-neutral-300/50 dark:border-neutral-800/80 flex items-start gap-3"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-2" />
                    <span className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
                      {arch}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Technical Challenges & Engineered Solutions */}
          {project.challenges && (
            <section className="p-7 sm:p-9 rounded-3xl bg-neutral-100/80 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>Technical Challenges & Solutions</span>
              </h2>
              <div className="space-y-3">
                {project.challenges.map((chal, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 flex items-start gap-3"
                  >
                    <span className="font-mono text-amber-500 font-bold">[{cIdx + 1}]</span>
                    <span>{chal}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Lessons Learned */}
          {project.lessonsLearned && (
            <section className="p-7 sm:p-9 rounded-3xl bg-neutral-100/80 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-500" />
                <span>Engineering Takeaways & Lessons Learned</span>
              </h2>
              <div className="space-y-3">
                {project.lessonsLearned.map((lesson, lIdx) => (
                  <div
                    key={lIdx}
                    className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{lesson}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technologies Used Grid */}
          <section className="p-7 sm:p-9 rounded-3xl bg-neutral-100/80 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-500" />
              <span>Technologies & Tools Employed</span>
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium bg-neutral-200 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

        </div>

        {/* Project Pagination Navigator */}
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to={`/project/${prevProject.id}`}
            className="p-5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/40 transition-colors group flex flex-col justify-between"
          >
            <span className="text-xs font-mono text-neutral-500 flex items-center gap-1 group-hover:text-emerald-500">
              <ArrowLeft className="w-3.5 h-3.5" /> Previous Project
            </span>
            <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mt-1 group-hover:text-emerald-500">
              {prevProject.title}
            </span>
          </Link>

          <Link
            to={`/project/${nextProject.id}`}
            className="p-5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/40 transition-colors group flex flex-col justify-between text-right"
          >
            <span className="text-xs font-mono text-neutral-500 flex items-center justify-end gap-1 group-hover:text-emerald-500">
              Next Project <ExternalLink className="w-3.5 h-3.5" />
            </span>
            <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mt-1 group-hover:text-emerald-500">
              {nextProject.title}
            </span>
          </Link>
        </div>

      </div>
    </article>
  );
};
