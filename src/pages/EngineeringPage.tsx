import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { engineeringPractices } from '../content/engineering';
import PageHeader from '../components/shared/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';

const EngineeringPage = () => {
  usePageTitle('How I build');
  const [openId, setOpenId] = useState<string | null>(engineeringPractices[0]?.id ?? null);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <PageHeader
        title="How I build"
        description="Practices I use to ship full-stack work with quality — testing, CI/CD, code review, and responsible AI-assisted development."
        backTo={{ label: 'Back to home', path: '/' }}
        eyebrow="Engineering"
      />

      <div className="space-y-3">
        {engineeringPractices.map((practice) => {
          const isOpen = openId === practice.id;
          return (
            <div
              key={practice.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/80"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : practice.id)}
              >
                <div>
                  <h2 className="font-bold text-slate-900 dark:text-white">{practice.title}</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{practice.summary}</p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-400 transition ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-slate-100 px-5 pb-5 pt-2 dark:border-slate-800">
                  <ul className="mb-4 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
                    {practice.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {practice.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-800 dark:bg-teal-900/40 dark:text-teal-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EngineeringPage;
