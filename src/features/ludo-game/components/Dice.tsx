interface DiceProps {
  value: number | null;
  onRoll: () => void;
  disabled: boolean;
}

export function Dice({ value, onRoll, disabled }: DiceProps) {
  const dots = value ? DOT_PATTERNS[value] : [];

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={onRoll}
        disabled={disabled}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 shadow-md grid grid-cols-3 grid-rows-3 gap-1 p-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition"
        aria-label={value ? `Dice showing ${value}` : 'Roll dice'}
      >
        {value ? (
          dots.map((on, i) => (
            <span
              key={i}
              className={`rounded-full ${on ? 'bg-slate-900 dark:bg-slate-100' : 'bg-transparent'}`}
            />
          ))
        ) : (
          <span className="col-span-3 row-span-3 flex items-center justify-center text-sm font-semibold text-slate-500">
            ?
          </span>
        )}
      </button>
      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
        {disabled ? 'Select a piece' : 'Tap to roll'}
      </span>
    </div>
  );
}

const DOT_PATTERNS: Record<number, boolean[]> = {
  1: [false, false, false, false, true, false, false, false, false],
  2: [true, false, false, false, false, false, false, false, true],
  3: [true, false, false, false, true, false, false, false, true],
  4: [true, false, true, false, false, false, true, false, true],
  5: [true, false, true, false, true, false, true, false, true],
  6: [true, false, true, true, false, true, true, false, true],
};
