import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { experience } from '../data/experience';
import { projects } from '../content/projects';
import { skills } from '../data/skills';
import PageHeader from '../components/shared/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';
import { site } from '../content/site';

const skillGroupLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools & AI',
  core: 'Core concepts',
};

const ResumePage = () => {
  usePageTitle('Resume');

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <article className="rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/95 dark:shadow-black/20 sm:p-8 md:p-10">
        <PageHeader
          title="Resume"
          description="Online summary — download the PDF for applications and ATS systems."
          backTo={{ label: 'Back to home', path: '/' }}
        />

        <a
          href="/resume.pdf"
          download={site.resumeFileName}
          className="mb-10 inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          <Download size={18} aria-hidden />
          Download PDF
        </a>

        <section className="mb-10" aria-labelledby="resume-experience">
          <h2
            id="resume-experience"
            className="mb-6 border-b border-slate-200 pb-2 text-xl font-bold tracking-tight text-slate-900 dark:border-slate-700 dark:text-slate-50"
          >
            Experience
          </h2>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {experience.map((exp) => (
              <div key={exp.id} className="py-6 first:pt-0 last:pb-0">
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 sm:text-lg">
                    {exp.role}
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      {' '}
                      @ {exp.company}
                    </span>
                  </h3>
                  <time className="shrink-0 text-sm font-medium text-slate-600 dark:text-slate-400">
                    {exp.date}
                  </time>
                </div>
                <p className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                  {exp.location}
                </p>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  {exp.description.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-medium text-teal-800 dark:text-teal-300">
                  {exp.tech.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10" aria-labelledby="resume-projects">
          <h2
            id="resume-projects"
            className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold tracking-tight text-slate-900 dark:border-slate-700 dark:text-slate-50"
          >
            Selected projects
          </h2>
          <ul className="space-y-3">
            {projects.map((p) => (
              <li
                key={p.id}
                className="rounded-lg border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-800/50"
              >
                <Link
                  to={`/projects/${p.slug}`}
                  className="font-semibold text-teal-700 underline-offset-2 hover:text-teal-800 hover:underline dark:text-teal-300 dark:hover:text-teal-200"
                >
                  {p.title}
                </Link>
                <span className="text-slate-700 dark:text-slate-300"> — {p.impact}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="resume-skills">
          <h2
            id="resume-skills"
            className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold tracking-tight text-slate-900 dark:border-slate-700 dark:text-slate-50"
          >
            Skills
          </h2>
          <div className="space-y-4">
            {Object.entries(skills).map(([group, tiers]) => (
              <div
                key={group}
                className="rounded-lg border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/50"
              >
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-800 dark:text-slate-200">
                  {skillGroupLabels[group] ?? group}
                </h3>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">Production: </span>
                  {tiers.production.join(', ')}
                </p>
                {tiers.familiar.length > 0 && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Familiar: </span>
                    {tiers.familiar.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};

export default ResumePage;
