export type GameStatus = 'idle' | 'running' | 'finished';

export type CharStatus = 'pending' | 'current' | 'correct' | 'incorrect';

export interface CharState {
  char: string;
  status: CharStatus;
}

export interface TypewriterStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  elapsedSeconds: number;
  progress: number;
}

export interface TypewriterGameConfig {
  text?: string;
  durationSeconds?: number;
}

export interface TypewriterGameState {
  targetText: string;
  chars: CharState[];
  cursor: number;
  status: GameStatus;
  startTime: number | null;
  elapsedMs: number;
  correctChars: number;
  incorrectChars: number;
  totalKeystrokes: number;
}
