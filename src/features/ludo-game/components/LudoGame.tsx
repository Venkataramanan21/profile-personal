import type { LudoGameConfig } from '../types';
import { useLudoGame } from '../useLudoGame';
import { Dice } from './Dice';
import { LudoBoard } from './LudoBoard';

const COLOR_LABEL: Record<string, string> = {
  red: 'Red',
  green: 'Green',
  yellow: 'Yellow',
  blue: 'Blue',
};

interface LudoGameProps {
  config?: LudoGameConfig;
  className?: string;
}

export function LudoGame({ config, className = '' }: LudoGameProps) {
  const { state, handleRoll, handleSelectPiece, reset } = useLudoGame(config);
  const current = state.players[state.currentPlayerIndex];
  const canRoll = state.status === 'playing' && !state.hasRolled;

  return (
    <section className={`flex flex-col gap-6 ${className}`.trim()}>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white/70 dark:bg-slate-900/50 px-4 py-3 border border-slate-200 dark:border-slate-700">
        <p className="font-semibold text-slate-800 dark:text-slate-100">{state.message}</p>
        {state.status === 'won' ? (
          <span className="text-sm font-bold text-teal-700 dark:text-teal-300">Game over</span>
        ) : (
          <span
            className={`text-sm font-bold uppercase px-3 py-1 rounded-full bg-${current.color}-100 text-${current.color}-800`}
            style={{
              backgroundColor:
                current.color === 'red'
                  ? '#fecaca'
                  : current.color === 'green'
                    ? '#bbf7d0'
                    : current.color === 'yellow'
                      ? '#fef08a'
                      : '#bfdbfe',
            }}
          >
            {COLOR_LABEL[current.color]}
          </span>
        )}
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        <LudoBoard state={state} onSelectPiece={handleSelectPiece} />
        <Dice
          value={state.diceValue}
          onRoll={handleRoll}
          disabled={!canRoll}
        />
      </div>

      <div className="text-sm text-slate-600 dark:text-slate-300 space-y-1 max-w-lg">
        <p>Pass-and-play for 2–4 players on one device.</p>
        <p>Roll a 6 to leave the yard. Capture opponents off safe squares. Land exactly in home.</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={reset}
          className="px-5 py-2.5 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
        >
          New game
        </button>
      </div>
    </section>
  );
}
