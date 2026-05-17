import type { GameStatus } from '../types';

interface ScoreDisplayProps {
  score: number;
  status: GameStatus;
}

export function ScoreDisplay({ score, status }: ScoreDisplayProps) {
  const statusLabel =
    status === 'idle'
      ? 'Press Start or Space'
      : status === 'paused'
        ? 'Paused'
        : status === 'gameOver'
          ? 'Game Over'
          : 'Playing';

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-baseline gap-2">
        <span className="text-sm uppercase tracking-widest text-teal-800 dark:text-teal-200">
          Score
        </span>
        <span className="text-3xl font-bold tabular-nums">{score}</span>
      </div>
      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{statusLabel}</span>
    </div>
  );
}
