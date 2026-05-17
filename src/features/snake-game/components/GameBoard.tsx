import { useMemo } from 'react';
import { getHead, positionsEqual } from '../gameLogic';
import type { GameStatus, Position } from '../types';

type CellKind = 'empty' | 'snake-head' | 'snake-body' | 'food';

interface GameBoardProps {
  gridCols: number;
  gridRows: number;
  snake: Position[];
  food: Position | null;
  status: GameStatus;
}

function cellClass(kind: CellKind): string {
  switch (kind) {
    case 'snake-head':
      return 'bg-teal-500 shadow-inner ring-2 ring-teal-300/80';
    case 'snake-body':
      return 'bg-teal-600/90';
    case 'food':
      return 'bg-rose-500 rounded-full scale-75 shadow-md';
    default:
      return 'bg-slate-900/5 dark:bg-white/5';
  }
}

export function GameBoard({ gridCols, gridRows, snake, food, status }: GameBoardProps) {
  const head = snake.length > 0 ? getHead(snake) : null;

  const cells = useMemo(() => {
    const result: CellKind[] = [];
    for (let y = 0; y < gridRows; y += 1) {
      for (let x = 0; x < gridCols; x += 1) {
        const pos = { x, y };
        if (food && positionsEqual(pos, food)) {
          result.push('food');
        } else if (head && positionsEqual(pos, head)) {
          result.push('snake-head');
        } else if (snake.some((segment) => positionsEqual(segment, pos))) {
          result.push('snake-body');
        } else {
          result.push('empty');
        }
      }
    }
    return result;
  }, [food, gridCols, gridRows, head, snake]);

  const isDimmed = status === 'idle' || status === 'paused' || status === 'gameOver';

  return (
    <div
      className={`glass-element p-3 sm:p-4 transition-opacity ${isDimmed ? 'opacity-70' : 'opacity-100'}`}
      role="img"
      aria-label={`Snake game board, ${gridCols} by ${gridRows}`}
    >
      <div
        className="grid gap-0.5 sm:gap-1 w-full max-w-md mx-auto aspect-square"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((kind, index) => (
          <div
            key={index}
            className={`aspect-square rounded-sm ${cellClass(kind)}`}
          />
        ))}
      </div>
    </div>
  );
}
