import { Link } from 'react-router-dom';
import { Mail, ArrowUp } from 'lucide-react';
import { useSitePath } from '../../context/SiteRoutePrefixContext';
import { footerNav, site } from '../../content/site';
import { socialsProfessional } from './SocialHover/SocialHover';

function FooterNavLink({ path, label }: { path: string; label: string }) {
  const to = useSitePath(path);
  return (
    <Link to={to} className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">
      {label}
    </Link>
  );
}

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-50 pt-12 pb-8 dark:border-slate-800 dark:bg-slate-800">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Let&apos;s connect</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Open to full-stack development opportunities.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
            >
              <Mail size={18} />
              {site.email}
            </a>
          </div>

          <div className="flex gap-4">
            {socialsProfessional.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="rounded-full border border-slate-100 bg-white p-3 text-slate-600 shadow-sm transition-all hover:scale-110 hover:text-blue-600 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <nav className="mb-8 flex flex-wrap gap-x-4 gap-y-2 text-sm" aria-label="Footer">
          {footerNav.map((item) => (
            <FooterNavLink key={item.path} path={item.path} label={item.label} />
          ))}
        </nav>

        <div className="mb-8 h-px w-full bg-slate-200 dark:bg-slate-800" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="hidden md:block">Built with React, Tailwind & Framer Motion</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="rounded-lg bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
