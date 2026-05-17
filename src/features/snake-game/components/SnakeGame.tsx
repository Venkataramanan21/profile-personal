import type { SnakeGameConfig } from '../types';
import { useSnakeGame } from '../useSnakeGame';
import { ControlsHint } from './ControlsHint';
import { DirectionPad } from './DirectionPad';
import { GameBoard } from './GameBoard';
import { GameOverlay } from './GameOverlay';
import { ScoreDisplay } from './ScoreDisplay';

interface SnakeGameProps {
  config?: SnakeGameConfig;
  className?: string;
}

export function SnakeGame({ config, className = '' }: SnakeGameProps) {
  const { state, setDirection, start, togglePause, restart, playAgain } = useSnakeGame(config);
  const controlsDisabled = state.status !== 'running' && state.status !== 'paused';

  const handleResume = () => {
    if (state.status === 'paused') togglePause();
  };

  return (
    <section className={`flex flex-col gap-6 ${className}`.trim()}>
      <ScoreDisplay score={state.score} status={state.status} />
      <div className="relative max-w-md mx-auto w-full">
        <GameBoard
          gridCols={state.gridCols}
          gridRows={state.gridRows}
          snake={state.snake}
          food={state.food}
          status={state.status}
        />
        <GameOverlay
          status={state.status}
          score={state.score}
          onStart={start}
          onResume={handleResume}
          onRestart={playAgain}
        />
      </div>
      <ControlsHint />
      <DirectionPad onDirection={setDirection} disabled={controlsDisabled} />
      <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
        {state.status === 'running' ? (
          <button
            type="button"
            onClick={togglePause}
            className="px-5 py-2.5 rounded-full border-2 border-teal-600 text-teal-800 dark:text-teal-200 font-semibold hover:bg-teal-50 dark:hover:bg-teal-900/30 transition"
          >
            Pause
          </button>
        ) : null}
        <button
          type="button"
          onClick={restart}
          className="px-5 py-2.5 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
        >
          Restart
        </button>
      </div>
    </section>
  );
}
