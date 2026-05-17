import type { GameStatus } from '../types';

interface GameOverlayProps {
  status: GameStatus;
  score: number;
  onStart: () => void;
  onResume: () => void;
  onRestart: () => void;
}

export function GameOverlay({ status, score, onStart, onResume, onRestart }: GameOverlayProps) {
  if (status === 'running') return null;

  const isGameOver = status === 'gameOver';
  const isPaused = status === 'paused';

  const title = isGameOver ? 'Game Over' : isPaused ? 'Paused' : 'Snake';
  const message = isGameOver
    ? `Final score: ${score}`
    : isPaused
      ? 'Press resume or Space to continue'
      : 'Eat the food. Avoid walls and yourself.';

  const handleAction = () => {
    if (isGameOver) onRestart();
    else if (isPaused) onResume();
    else onStart();
  };

  const actionLabel = isGameOver ? 'Play again' : isPaused ? 'Resume' : 'Start game';

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-slate-900/50 dark:bg-slate-950/60 backdrop-blur-sm p-6 text-center"
      role="dialog"
      aria-live="polite"
      aria-label={title}
    >
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="text-slate-100/90 max-w-xs text-sm">{message}</p>
      <button
        type="button"
        onClick={handleAction}
        className="px-6 py-2.5 rounded-full bg-teal-500 text-white font-semibold hover:bg-teal-400 transition"
      >
        {actionLabel}
      </button>
    </div>
  );
}
