import { Link } from 'react-router-dom';
import { Mail, ExternalLink } from 'lucide-react';
import { socialsProfessional } from '../components/shared/SocialHover/SocialHover';
import PageHeader from '../components/shared/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';
import { site } from '../content/site';

const ContactPage = () => {
  usePageTitle('Contact');

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <PageHeader
        title="Contact"
        description="Open to full-stack opportunities. Reach out via email or professional profiles."
        backTo={{ label: 'Back to home', path: '/' }}
      />

      <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-900/80">
        <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Email</h2>
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2 text-lg font-semibold text-teal-600 hover:underline dark:text-teal-400"
        >
          <Mail size={20} />
          {site.email}
        </a>
      </div>

      <div className="mb-10">
        <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Professional profiles</h2>
        <ul className="space-y-3">
          {socialsProfessional.map((s) => (
            <li key={s.id}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-slate-700 hover:text-teal-600 dark:text-slate-200 dark:hover:text-teal-400"
              >
                {s.icon}
                {s.name}
                <ExternalLink size={14} className="opacity-60" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        Prefer a PDF?{' '}
        <a href="/resume.pdf" download={site.resumeFileName} className="font-semibold text-teal-600 hover:underline dark:text-teal-400">
          Download resume
        </a>
        {' '}or view the{' '}
        <Link to="/resume" className="font-semibold text-teal-600 hover:underline dark:text-teal-400">
          online resume
        </Link>
        .
      </p>
    </div>
  );
};

export default ContactPage;
