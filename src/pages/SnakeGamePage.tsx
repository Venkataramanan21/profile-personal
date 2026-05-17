import { Link } from 'react-router-dom';
import { SnakeGame } from '../features/snake-game';

export function SnakeGamePage() {
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-10 sm:py-14">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-teal-800 dark:text-teal-200 mb-2">
              Arcade
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold">Snake Game</h1>
            <p className="mt-2 text-slate-700 dark:text-slate-200 max-w-xl">
              Guide the snake to food without hitting the walls or your own tail. How high can you
              score?
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-full border-2 border-teal-600 text-teal-800 dark:text-teal-200 font-semibold hover:bg-teal-50 dark:hover:bg-teal-900/30 transition"
          >
            Back to profile
          </Link>
        </header>
        <SnakeGame />
      </div>
    </div>
  );
}
