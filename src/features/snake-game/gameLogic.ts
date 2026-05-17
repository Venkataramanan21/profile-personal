import type { Direction, Position, SnakeGameConfig, SnakeGameState } from './types';

export const DEFAULT_GRID_COLS = 20;
export const DEFAULT_GRID_ROWS = 20;
export const DEFAULT_TICK_MS = 120;
export const DEFAULT_INITIAL_LENGTH = 3;

const DIRECTION_DELTAS: Record<Direction, Position> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE: Record<Direction, Direction> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};

export function isOppositeDirection(a: Direction, b: Direction): boolean {
  return OPPOSITE[a] === b;
}

export function positionsEqual(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}

export function isOnSnake(pos: Position, snake: Position[]): boolean {
  return snake.some((segment) => positionsEqual(segment, pos));
}

export function getHead(snake: Position[]): Position {
  return snake[0];
}

export function getNextHead(head: Position, direction: Direction): Position {
  const delta = DIRECTION_DELTAS[direction];
  return { x: head.x + delta.x, y: head.y + delta.y };
}

export function isWallCollision(head: Position, gridCols: number, gridRows: number): boolean {
  return head.x < 0 || head.y < 0 || head.x >= gridCols || head.y >= gridRows;
}

export function isSelfCollision(head: Position, snake: Position[]): boolean {
  return snake.some((segment) => positionsEqual(segment, head));
}

export function spawnFood(
  snake: Position[],
  gridCols: number,
  gridRows: number,
): Position | null {
  const occupied = new Set(snake.map((s) => `${s.x},${s.y}`));
  const freeCells: Position[] = [];

  for (let y = 0; y < gridRows; y += 1) {
    for (let x = 0; x < gridCols; x += 1) {
      if (!occupied.has(`${x},${y}`)) {
        freeCells.push({ x, y });
      }
    }
  }

  if (freeCells.length === 0) return null;

  const index = Math.floor(Math.random() * freeCells.length);
  return freeCells[index];
}

function createInitialSnake(
  gridCols: number,
  gridRows: number,
  length: number,
): Position[] {
  const centerX = Math.floor(gridCols / 2);
  const centerY = Math.floor(gridRows / 2);
  const snake: Position[] = [];

  for (let i = 0; i < length; i += 1) {
    snake.push({ x: centerX - i, y: centerY });
  }

  return snake;
}

export function resolveConfig(config: SnakeGameConfig = {}) {
  return {
    gridCols: config.gridCols ?? DEFAULT_GRID_COLS,
    gridRows: config.gridRows ?? DEFAULT_GRID_ROWS,
    tickMs: config.tickMs ?? DEFAULT_TICK_MS,
    initialLength: config.initialLength ?? DEFAULT_INITIAL_LENGTH,
  };
}

export function createInitialState(config: SnakeGameConfig = {}): SnakeGameState {
  const { gridCols, gridRows, tickMs, initialLength } = resolveConfig(config);
  const snake = createInitialSnake(gridCols, gridRows, initialLength);
  const food = spawnFood(snake, gridCols, gridRows);

  return {
    snake,
    direction: 'right',
    pendingDirection: 'right',
    food,
    score: 0,
    status: 'idle',
    gridCols,
    gridRows,
    tickMs,
  };
}

export function queueDirection(
  current: Direction,
  pending: Direction,
  next: Direction,
): Direction {
  if (isOppositeDirection(pending, next)) return pending;
  if (isOppositeDirection(current, next)) return pending;
  return next;
}

export function tick(state: SnakeGameState): SnakeGameState {
  if (state.status !== 'running') return state;

  const direction = state.pendingDirection;
  const head = getHead(state.snake);
  const nextHead = getNextHead(head, direction);

  if (isWallCollision(nextHead, state.gridCols, state.gridRows)) {
    return { ...state, status: 'gameOver' };
  }

  const willEat = state.food !== null && positionsEqual(nextHead, state.food);
  const bodyToCheck = willEat ? state.snake : state.snake.slice(0, -1);

  if (isSelfCollision(nextHead, bodyToCheck)) {
    return { ...state, status: 'gameOver' };
  }

  const snake = [nextHead, ...state.snake];
  if (!willEat) {
    snake.pop();
  }

  let score = state.score;
  let food = state.food;

  if (willEat) {
    score += 1;
    food = spawnFood(snake, state.gridCols, state.gridRows);
    if (food === null) {
      return {
        ...state,
        snake,
        direction,
        pendingDirection: direction,
        food: null,
        score,
        status: 'gameOver',
      };
    }
  }

  return {
    ...state,
    snake,
    direction,
    pendingDirection: direction,
    food,
    score,
  };
}

export function directionFromKey(key: string): Direction | null {
  switch (key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      return 'up';
    case 'ArrowDown':
    case 's':
    case 'S':
      return 'down';
    case 'ArrowLeft':
    case 'a':
    case 'A':
      return 'left';
    case 'ArrowRight':
    case 'd':
    case 'D':
      return 'right';
    default:
      return null;
  }
}
