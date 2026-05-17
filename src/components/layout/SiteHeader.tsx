import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { primaryNav, site } from '../../content/site';
import ThemeToggle from '../shared/ThemeToggle';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-200'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
  }`;

const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      id="site-header"
      className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/85"
      style={{ ['--site-header-height' as string]: '3.5rem' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link
          to="/"
          className="shrink-0 font-semibold text-slate-900 dark:text-white"
          onClick={() => setOpen(false)}
        >
          {site.name.split(' ')[0]}
          <span className="text-teal-600 dark:text-teal-400">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {primaryNav.map((item) => (
            <NavLink key={item.path} to={item.path} className={navLinkClass} end={item.path === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle embedded />
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-slate-200 px-4 py-3 md:hidden dark:border-slate-800"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {primaryNav.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={navLinkClass}
                  end={item.path === '/'}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
