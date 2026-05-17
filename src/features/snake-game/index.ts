export { SnakeGame } from './components/SnakeGame';
export { useSnakeGame } from './useSnakeGame';
export { GameBoard } from './components/GameBoard';
export { ScoreDisplay } from './components/ScoreDisplay';
export {
  createInitialState,
  tick,
  directionFromKey,
  spawnFood,
  DEFAULT_GRID_COLS,
  DEFAULT_GRID_ROWS,
  DEFAULT_TICK_MS,
  DEFAULT_INITIAL_LENGTH,
} from './gameLogic';
export type {
  Direction,
  GameStatus,
  Position,
  SnakeGameConfig,
  SnakeGameState,
} from './types';
