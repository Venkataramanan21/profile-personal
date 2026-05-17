import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  applyBackspace,
  applyKeystroke,
  buildCharStates,
  computeStats,
} from './gameLogic';
import { pickRandomSampleText } from './sampleTexts';
import type { GameStatus, TypewriterGameConfig, TypewriterStats } from './types';

function createInitialState(text: string) {
  return {
    targetText: text,
    chars: buildCharStates(text),
    cursor: 0,
    status: 'idle' as GameStatus,
    startTime: null as number | null,
    elapsedMs: 0,
    correctChars: 0,
    incorrectChars: 0,
    totalKeystrokes: 0,
  };
}

export function useTypewriterGame(config: TypewriterGameConfig = {}) {
  const initialText = config.text ?? pickRandomSampleText();
  const [state, setState] = useState(() => createInitialState(initialText));
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const stats: TypewriterStats = useMemo(
    () =>
      computeStats(
        state.correctChars,
        state.incorrectChars,
        state.totalKeystrokes,
        state.elapsedMs,
        state.cursor,
        state.targetText.length,
      ),
    [
      state.correctChars,
      state.incorrectChars,
      state.totalKeystrokes,
      state.elapsedMs,
      state.cursor,
      state.targetText.length,
    ],
  );

  const reset = useCallback(() => {
    const nextText = config.text ?? pickRandomSampleText();
    setState(createInitialState(nextText));
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [config.text]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (state.status === 'finished') {
        if (event.key === 'Enter') reset();
        return;
      }

      if (event.key === 'Backspace') {
        event.preventDefault();
        setState((prev) => {
          const result = applyBackspace(prev.chars, prev.cursor);
          if (!result) return prev;

          const reverted = prev.chars[result.cursor];
          const wasCorrect = reverted?.status === 'correct';
          const wasIncorrect = reverted?.status === 'incorrect';

          return {
            ...prev,
            chars: result.chars,
            cursor: result.cursor,
            correctChars: wasCorrect ? prev.correctChars - 1 : prev.correctChars,
            incorrectChars: wasIncorrect ? prev.incorrectChars - 1 : prev.incorrectChars,
            totalKeystrokes: Math.max(0, prev.totalKeystrokes - 1),
          };
        });
        return;
      }

      if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      event.preventDefault();

      setState((prev) => {
        if (prev.cursor >= prev.chars.length) return prev;

        const now = Date.now();
        const startTime = prev.startTime ?? now;
        const result = applyKeystroke(prev.chars, prev.cursor, event.key);
        if (!result) return prev;

        const finished = result.cursor >= prev.chars.length;

        return {
          ...prev,
          chars: result.chars,
          cursor: result.cursor,
          status: finished ? 'finished' : prev.status === 'idle' ? 'running' : prev.status,
          startTime,
          elapsedMs: finished ? now - startTime : prev.elapsedMs,
          correctChars: prev.correctChars + (result.isCorrect ? 1 : 0),
          incorrectChars: prev.incorrectChars + (result.isCorrect ? 0 : 1),
          totalKeystrokes: prev.totalKeystrokes + 1,
        };
      });
    },
    [reset, state.status],
  );

  useEffect(() => {
    if (state.status !== 'running' || state.startTime === null) return;

    const interval = window.setInterval(() => {
      setState((prev) => {
        if (prev.status !== 'running' || prev.startTime === null) return prev;
        return { ...prev, elapsedMs: Date.now() - prev.startTime };
      });
    }, 250);

    return () => window.clearInterval(interval);
  }, [state.status, state.startTime]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return {
    chars: state.chars,
    status: state.status,
    stats,
    inputRef,
    handleKeyDown,
    reset,
    focusInput,
    targetText: state.targetText,
  };
}
