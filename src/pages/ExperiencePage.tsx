import { Link } from 'react-router-dom';
import { ArrowLeft, GitBranch } from 'lucide-react';
import Footer from '../components/shared/Footer';
import GitTimeline from '../components/experience/GitTimeline';
import { branchColors, categoryStyles } from '../data/timeline';

const ExperiencePage = () => {
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100">
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-12">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-teal-500 hover:text-teal-700 dark:border-slate-600 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:border-teal-500 dark:hover:text-teal-400"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
            <GitBranch size={14} className="text-teal-500" />
            career-history.git
          </div>
        </nav>

        <header className="mb-10">
          <h1 className="mb-3 text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            Experience Log
          </h1>
          <p className="max-w-2xl text-slate-600 dark:text-slate-300">
            A git-style timeline of work, projects, and milestones — newest commits first.
          </p>
        </header>

        <section
          aria-label="Branch and category legend"
          className="mb-10 flex flex-wrap gap-2"
        >
          {Object.entries(categoryStyles).map(([key, style]) => (
            <span
              key={key}
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${style.categoryBadge}`}
            >
              {style.label}
            </span>
          ))}
          {Object.entries(branchColors).map(([branch, colorClass]) => (
            <span
              key={branch}
              className={`rounded-md border border-slate-200 bg-white/90 px-2 py-1 font-mono text-[10px] dark:border-slate-700 dark:bg-slate-900/80 ${colorClass}`}
            >
              {branch}
            </span>
          ))}
        </section>

        <GitTimeline />
      </div>

      <Footer />
    </div>
  );
};

export default ExperiencePage;
