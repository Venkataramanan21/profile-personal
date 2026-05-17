import type { CharState, GameStatus } from '../types';

interface TextDisplayProps {
  chars: CharState[];
  status: GameStatus;
  onClick: () => void;
}

function charClassName(status: CharState['status']): string {
  switch (status) {
    case 'correct':
      return 'text-teal-700 dark:text-teal-300';
    case 'incorrect':
      return 'text-rose-600 dark:text-rose-400 bg-rose-100/80 dark:bg-rose-900/40';
    case 'current':
      return 'text-slate-900 dark:text-white bg-teal-200/70 dark:bg-teal-800/60 underline decoration-teal-600 decoration-2 underline-offset-4';
    default:
      return 'text-slate-500 dark:text-slate-400';
  }
}

export function TextDisplay({ chars, status, onClick }: TextDisplayProps) {
  return (
    <div
      role="textbox"
      aria-label="Typing passage"
      tabIndex={-1}
      onClick={onClick}
      className="glass-element w-full p-6 sm:p-8 min-h-[10rem] cursor-text select-none"
    >
      <p className="font-mono text-lg sm:text-xl leading-relaxed tracking-wide break-words">
        {chars.map((item, index) => (
          <span key={`${index}-${item.char}`} className={charClassName(item.status)}>
            {item.char}
          </span>
        ))}
      </p>
      {status === 'finished' && (
        <p className="mt-4 text-sm text-teal-800 dark:text-teal-200 font-medium">
          Complete! Press Enter or Reset for another round.
        </p>
      )}
      {status === 'idle' && (
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          Click here and start typing to begin the timer.
        </p>
      )}
    </div>
  );
}
