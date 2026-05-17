import type { Direction } from '../types';

interface DirectionPadProps {
  onDirection: (direction: Direction) => void;
  disabled?: boolean;
}

const buttonClass =
  'min-h-11 min-w-11 rounded-xl bg-teal-600/90 text-white font-bold text-lg shadow-md active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition';

export function DirectionPad({ onDirection, disabled = false }: DirectionPadProps) {
  return (
    <div className="grid grid-cols-3 gap-2 w-fit mx-auto sm:hidden" aria-label="Direction controls">
      <span />
      <button
        type="button"
        className={buttonClass}
        disabled={disabled}
        aria-label="Move up"
        onClick={() => onDirection('up')}
      >
        ↑
      </button>
      <span />
      <button
        type="button"
        className={buttonClass}
        disabled={disabled}
        aria-label="Move left"
        onClick={() => onDirection('left')}
      >
        ←
      </button>
      <button
        type="button"
        className={`${buttonClass} opacity-0 pointer-events-none`}
        tabIndex={-1}
        aria-hidden
      >
        ·
      </button>
      <button
        type="button"
        className={buttonClass}
        disabled={disabled}
        aria-label="Move right"
        onClick={() => onDirection('right')}
      >
        →
      </button>
      <span />
      <button
        type="button"
        className={buttonClass}
        disabled={disabled}
        aria-label="Move down"
        onClick={() => onDirection('down')}
      >
        ↓
      </button>
      <span />
    </div>
  );
}
