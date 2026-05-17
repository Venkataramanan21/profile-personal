export type Direction = 'up' | 'down' | 'left' | 'right';

export type GameStatus = 'idle' | 'running' | 'paused' | 'gameOver';

export interface Position {
  x: number;
  y: number;
}

export interface SnakeGameConfig {
  gridCols?: number;
  gridRows?: number;
  tickMs?: number;
  initialLength?: number;
}

export interface SnakeGameState {
  snake: Position[];
  direction: Direction;
  pendingDirection: Direction;
  food: Position | null;
  score: number;
  status: GameStatus;
  gridCols: number;
  gridRows: number;
  tickMs: number;
}
