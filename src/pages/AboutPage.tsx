import { Link } from 'react-router-dom';
import { aboutContent } from '../content/about';
import PageHeader from '../components/shared/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';

const AboutPage = () => {
  usePageTitle('About');

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <PageHeader
        title="About"
        description="Full-stack developer focused on reliable, performant enterprise web systems."
        backTo={{ label: 'Back to home', path: '/' }}
      />

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Background</h2>
        <p className="leading-relaxed text-slate-600 dark:text-slate-300">{aboutContent.background}</p>
      </section>

      <section className="mb-10">
        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">What I optimize for</h2>
        <div className="space-y-4">
          {aboutContent.optimizesFor.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900/80"
            >
              <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">What I&apos;m looking for</h2>
        <p className="leading-relaxed text-slate-600 dark:text-slate-300">{aboutContent.lookingFor}</p>
      </section>

      <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
        Screening this profile? Follow the path on the{' '}
        <Link to="/" className="font-semibold text-teal-600 hover:underline dark:text-teal-400">
          home page
        </Link>
        {' '}— case study, experience log, then{' '}
        <Link to="/resume" className="font-semibold text-teal-600 hover:underline dark:text-teal-400">
          resume
        </Link>
        .
      </p>
    </div>
  );
};

export default AboutPage;
