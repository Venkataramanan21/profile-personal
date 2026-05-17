import { Link } from 'react-router-dom';
import { LudoGame } from '../features/ludo-game';

export function LudoGamePage() {
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-widest text-teal-800 dark:text-teal-200">
              Board game
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl">Ludo</h1>
            <p className="mt-2 max-w-xl text-slate-700 dark:text-slate-200">
              Classic four-player Ludo. Roll the dice, move your pieces, and race all four home.
            </p>
          </div>
          <Link
            to="/lab"
            className="inline-flex items-center justify-center rounded-full border-2 border-teal-600 px-4 py-2 font-semibold text-teal-800 transition hover:bg-teal-50 dark:text-teal-200 dark:hover:bg-teal-900/30"
          >
            Back to lab
          </Link>
        </header>
        <LudoGame config={{ playerCount: 4 }} />
      </div>
    </div>
  );
}
