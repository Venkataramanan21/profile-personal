import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  backTo?: { label: string; path: string };
  eyebrow?: string;
}

const PageHeader = ({ title, description, backTo, eyebrow }: PageHeaderProps) => {
  return (
    <header className="mb-10">
      {backTo && (
        <Link
          to={backTo.path}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-teal-500 hover:text-teal-700 dark:border-slate-600 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:border-teal-500 dark:hover:text-teal-400"
        >
          <ArrowLeft size={16} />
          {backTo.label}
        </Link>
      )}
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">
          {eyebrow}
        </p>
      )}
      <h1 className="mb-3 text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">{title}</h1>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {description}
        </p>
      )}
    </header>
  );
};

export default PageHeader;
