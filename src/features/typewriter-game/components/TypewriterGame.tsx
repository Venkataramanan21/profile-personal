import type { TypewriterGameConfig } from '../types';
import { useTypewriterGame } from '../useTypewriterGame';
import { ProgressBar } from './ProgressBar';
import { StatsBar } from './StatsBar';
import { TextDisplay } from './TextDisplay';

interface TypewriterGameProps {
  config?: TypewriterGameConfig;
  className?: string;
}

export function TypewriterGame({ config, className = '' }: TypewriterGameProps) {
  const { chars, status, stats, inputRef, handleKeyDown, reset, focusInput } =
    useTypewriterGame(config);

  return (
    <section className={`flex flex-col gap-6 ${className}`.trim()}>
      <StatsBar stats={stats} status={status} />
      <ProgressBar progress={stats.progress} />
      <TextDisplay chars={chars} status={status} onClick={focusInput} />
      <textarea
        ref={inputRef}
        className="sr-only"
        aria-label="Hidden typing input"
        value=""
        onChange={() => undefined}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
        <button
          type="button"
          onClick={reset}
          className="px-5 py-2.5 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
