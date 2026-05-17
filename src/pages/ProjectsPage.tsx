import { useMemo, useState } from 'react';
import { projects, projectCategories } from '../content/projects';
import ProjectCard from '../components/shared/ProjectCard';
import PageHeader from '../components/shared/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';

const ProjectsPage = () => {
  usePageTitle('Work');
  const [filter, setFilter] = useState<string>('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <PageHeader
        title="Work"
        description="Case studies in performance, architecture, and developer experience — high-level, sanitized for public sharing."
        backTo={{ label: 'Back to home', path: '/' }}
        eyebrow="Portfolio"
      />

      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={filter === cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              filter === cat
                ? 'bg-teal-600 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
