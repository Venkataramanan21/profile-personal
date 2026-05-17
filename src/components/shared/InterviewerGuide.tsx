import { Link } from 'react-router-dom';
import { ArrowRight, Clock, FileText, GitBranch, Zap } from 'lucide-react';
import { site } from '../../content/site';

const steps = [
  {
    icon: Zap,
    label: 'Flagship case study',
    to: `/projects/${site.flagshipSlug}`,
    description: 'Performance work with measurable impact',
  },
  {
    icon: GitBranch,
    label: 'Experience log',
    to: '/experience',
    description: 'Git-style career timeline',
  },
  {
    icon: FileText,
    label: 'Resume',
    to: '/resume',
    description: 'Online view + PDF download',
  },
];

const InterviewerGuide = () => {
  return (
    <section
      aria-label="Interviewers start here"
      className="mb-12 rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-50 to-teal-50/80 p-6 shadow-sm dark:border-violet-900/50 dark:from-violet-950/40 dark:to-slate-900/80"
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Clock className="h-5 w-5 text-violet-600 dark:text-violet-400" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Interviewers — start here
        </h2>
        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
          ~2 min path
        </span>
      </div>
      <p className="mb-5 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
        A quick route to proof of impact, career history, and resume — optimized for screening calls.
      </p>
      <ol className="grid gap-3 sm:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.to}>
            <Link
              to={step.to}
              className="group flex h-full flex-col rounded-xl border border-white/80 bg-white/90 p-4 transition hover:border-teal-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/90 dark:hover:border-teal-600"
            >
              <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                Step {i + 1}
                <step.icon className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
              </span>
              <span className="mb-1 font-semibold text-slate-900 group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-400">
                {step.label}
              </span>
              <span className="mb-3 flex-1 text-xs text-slate-500 dark:text-slate-400">
                {step.description}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 dark:text-violet-400">
                Open <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default InterviewerGuide;
