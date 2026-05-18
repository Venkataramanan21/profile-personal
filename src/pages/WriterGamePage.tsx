import { Link } from 'react-router-dom';
import { TypewriterGame } from '../features/typewriter-game';
import { useSitePath } from '../context/SiteRoutePrefixContext';

export function WriterGamePage() {
  const labPath = useSitePath('/lab');
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-10 sm:py-14">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-teal-800 dark:text-teal-200 mb-2">
              Practice
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold">Typewriter Game</h1>
            <p className="mt-2 text-slate-700 dark:text-slate-200 max-w-xl">
              Type the passage as accurately as you can. Your timer starts on the first keystroke.
            </p>
          </div>
          <Link
            to={labPath}
            className="inline-flex items-center justify-center rounded-full border-2 border-teal-600 px-4 py-2 font-semibold text-teal-800 transition hover:bg-teal-50 dark:text-teal-200 dark:hover:bg-teal-900/30"
          >
            Back to lab
          </Link>
        </header>
        <TypewriterGame />
      </div>
    </div>
  );
}
