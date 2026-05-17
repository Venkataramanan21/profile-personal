import { GitBranch } from 'lucide-react';
import GitTimeline from '../components/experience/GitTimeline';
import InterviewerPathFooter from '../components/shared/InterviewerPathFooter';
import PageHeader from '../components/shared/PageHeader';
import { branchColors, categoryStyles } from '../data/timeline';
import { usePageTitle } from '../hooks/usePageTitle';

const ExperiencePage = () => {
  usePageTitle('Experience');

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <PageHeader
        title="Experience log"
        description="A git-style timeline of work, projects, and milestones — newest commits first."
        backTo={{ label: 'Back to home', path: '/' }}
        eyebrow="career-history.git"
      />

      <div className="mb-4 flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
        <GitBranch size={14} className="text-teal-500" />
        career-history.git
      </div>

      <section aria-label="Branch and category legend" className="mb-10 flex flex-wrap gap-2">
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

      <InterviewerPathFooter step="experience" className="mt-12" />
    </div>
  );
};

export default ExperiencePage;
