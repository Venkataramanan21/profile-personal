import type { CharState, CharStatus, TypewriterStats } from './types';

export function buildCharStates(text: string): CharState[] {
  if (text.length === 0) return [];
  return text.split('').map((char, index) => ({
    char,
    status: index === 0 ? 'current' : 'pending',
  }));
}

export function calculateWpm(correctChars: number, elapsedMs: number): number {
  if (elapsedMs <= 0 || correctChars <= 0) return 0;
  const minutes = elapsedMs / 60_000;
  return Math.round(correctChars / 5 / minutes);
}

export function calculateAccuracy(correctChars: number, totalKeystrokes: number): number {
  if (totalKeystrokes === 0) return 100;
  return Math.round((correctChars / totalKeystrokes) * 100);
}

export function computeStats(
  correctChars: number,
  incorrectChars: number,
  totalKeystrokes: number,
  elapsedMs: number,
  cursor: number,
  textLength: number,
): TypewriterStats {
  const elapsedSeconds = Math.floor(elapsedMs / 1000);
  return {
    wpm: calculateWpm(correctChars, elapsedMs),
    accuracy: calculateAccuracy(correctChars, totalKeystrokes),
    correctChars,
    incorrectChars,
    elapsedSeconds,
    progress: textLength === 0 ? 0 : Math.min(100, Math.round((cursor / textLength) * 100)),
  };
}

export function applyKeystroke(
  chars: CharState[],
  cursor: number,
  key: string,
): { chars: CharState[]; cursor: number; isCorrect: boolean } | null {
  if (cursor >= chars.length) return null;

  const expected = chars[cursor].char;
  const isCorrect = key === expected;
  const nextStatus: CharStatus = isCorrect ? 'correct' : 'incorrect';

  const nextChars: CharState[] = chars.map((item, index) => {
    if (index === cursor) return { ...item, status: nextStatus };
    if (index === cursor + 1) return { ...item, status: 'current' as const };
    return item;
  });

  return { chars: nextChars, cursor: cursor + 1, isCorrect };
}

export function applyBackspace(
  chars: CharState[],
  cursor: number,
): { chars: CharState[]; cursor: number } | null {
  if (cursor <= 0) return null;

  const index = cursor - 1;
  const nextChars: CharState[] = chars.map((item, i) => {
    if (i === index) return { ...item, status: 'current' as const };
    if (i >= cursor) return { ...item, status: 'pending' as const };
    return item;
  });

  return { chars: nextChars, cursor: index };
}
