import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSitePath } from '../../context/SiteRoutePrefixContext';
import { INTERVIEW_PATH_STEPS, type InterviewerStep } from '../../lib/interviewPath';
import { useInterviewPath } from '../../hooks/useInterviewPath';

interface InterviewerNextStepsProps {
  current: InterviewerStep;
  className?: string;
}

const InterviewerNextSteps = ({ current, className = '' }: InterviewerNextStepsProps) => {
  const { pathTo } = useInterviewPath();
  const homePath = useSitePath('/');
  const index = INTERVIEW_PATH_STEPS.findIndex((s) => s.id === current);
  const prev = index > 0 ? INTERVIEW_PATH_STEPS[index - 1] : null;
  const next = index < INTERVIEW_PATH_STEPS.length - 1 ? INTERVIEW_PATH_STEPS[index + 1] : null;

  return (
    <nav
      aria-label="Interview path navigation"
      className={`rounded-2xl border border-violet-200/80 bg-gradient-to-r from-violet-50/90 to-teal-50/60 p-5 dark:border-violet-900/50 dark:from-violet-950/30 dark:to-slate-900/50 ${className}`}
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-violet-700 dark:text-violet-300">
        Interview path · Step {index + 1} of {INTERVIEW_PATH_STEPS.length}
      </p>
      <ol className="mb-4 flex flex-wrap gap-2">
        {INTERVIEW_PATH_STEPS.map((step) => (
          <li key={step.id}>
            {step.id === current ? (
              <span
                aria-current="step"
                className="rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white"
              >
                {step.short}
              </span>
            ) : (
              <Link
                to={pathTo(step.path)}
                className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-teal-400 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-teal-600 dark:hover:text-teal-400"
              >
                {step.short}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap gap-3">
        {prev && (
          <Link
            to={pathTo(prev.path)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-violet-400 hover:text-violet-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-violet-500 dark:hover:text-violet-300"
          >
            <ArrowLeft size={16} aria-hidden />
            {prev.label}
          </Link>
        )}
        {next && (
          <Link
            to={pathTo(next.path)}
            className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-teal-700"
          >
            Next: {next.label}
            <ArrowRight size={16} aria-hidden />
          </Link>
        )}
        {!next && (
          <Link
            to={homePath}
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:underline dark:text-violet-400"
          >
            Back to home overview
          </Link>
        )}
      </div>
    </nav>
  );
};

export default InterviewerNextSteps;
