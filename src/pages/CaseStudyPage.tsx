import { Link, useParams } from 'react-router-dom';
import { getProjectBySlug } from '../content/projects';
import PageHeader from '../components/shared/PageHeader';
import ArchitectureDiagram from '../components/shared/ArchitectureDiagram';
import { usePageTitle } from '../hooks/usePageTitle';
import { Zap } from 'lucide-react';

const sectionClass = 'mb-10';
const headingClass = 'mb-3 text-xl font-bold text-slate-900 dark:text-white';
const listClass = 'list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300';

const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  usePageTitle(project?.title ?? 'Project');

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">Project not found</h1>
        <Link to="/projects" className="font-semibold text-teal-600 hover:underline dark:text-teal-400">
          ← Back to all work
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <PageHeader
        title={project.title}
        description={project.hook}
        backTo={{ label: 'All work', path: '/projects' }}
        eyebrow={project.category}
      />

      <div className="mb-10 rounded-xl border-l-4 border-teal-500 bg-slate-50 p-5 dark:bg-slate-900/50">
        <p className="mb-1 text-xs font-bold uppercase text-slate-500">Key impact</p>
        <p className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
          <Zap className="h-5 w-5 fill-yellow-500 text-yellow-500" />
          {project.impact}
        </p>
      </div>

      <section className={sectionClass}>
        <h2 className={headingClass}>Context</h2>
        <p className="text-slate-600 dark:text-slate-300">{project.context}</p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Constraints</h2>
        <ul className={listClass}>
          {project.constraints.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>My role</h2>
        <p className="text-slate-600 dark:text-slate-300">{project.role}</p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Approach</h2>
        <ul className={listClass}>
          {project.approach.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        {project.diagram && <ArchitectureDiagram diagram={project.diagram} />}
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Trade-offs</h2>
        <ul className={listClass}>
          {project.tradeoffs.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Results</h2>
        <ul className={listClass}>
          {project.results.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Learnings</h2>
        <ul className={listClass}>
          {project.learnings.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-violet-200 bg-violet-50/80 p-6 dark:border-violet-900/50 dark:bg-violet-950/30">
        <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
          Questions I&apos;d love to discuss
        </h2>
        <ul className={listClass}>
          {project.talkingPoints.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </section>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          to="/experience"
          className="rounded-full bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
        >
          View experience log
        </Link>
        <Link
          to="/resume"
          className="rounded-full border-2 border-teal-600 px-6 py-3 font-semibold text-teal-700 hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-900/30"
        >
          Resume
        </Link>
      </div>
    </article>
  );
};

export default CaseStudyPage;
