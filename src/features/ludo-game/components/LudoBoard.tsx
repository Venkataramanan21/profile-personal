import {
  FINISH_COORDS,
  HOME_COORDS,
  SAFE_TRACK_INDICES,
  TRACK_COORDS,
  YARD_COORDS,
  type GridCoord,
} from '../boardLayout';
import { getMovablePieceIds } from '../gameLogic';
import type { LudoGameState, Piece, PlayerColor } from '../types';

const COLOR_STYLES: Record<PlayerColor, { bg: string; piece: string; yard: string; home: string }> =
  {
    red: {
      bg: 'bg-red-500',
      piece: 'bg-red-600 ring-red-800',
      yard: 'bg-red-200 dark:bg-red-900/50',
      home: 'bg-red-400',
    },
    green: {
      bg: 'bg-green-500',
      piece: 'bg-green-600 ring-green-800',
      yard: 'bg-green-200 dark:bg-green-900/50',
      home: 'bg-green-400',
    },
    yellow: {
      bg: 'bg-yellow-400',
      piece: 'bg-yellow-500 ring-yellow-700',
      yard: 'bg-yellow-200 dark:bg-yellow-900/50',
      home: 'bg-yellow-300',
    },
    blue: {
      bg: 'bg-blue-500',
      piece: 'bg-blue-600 ring-blue-800',
      yard: 'bg-blue-200 dark:bg-blue-900/50',
      home: 'bg-blue-400',
    },
  };

const GRID_SIZE = 15;

interface LudoBoardProps {
  state: LudoGameState;
  onSelectPiece: (pieceId: number) => void;
}

export function LudoBoard({ state, onSelectPiece }: LudoBoardProps) {
  const cells = buildCellMap(state);

  return (
    <div
      className="inline-grid gap-0 border-2 border-slate-700 dark:border-slate-400 rounded-lg overflow-hidden shadow-xl"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
        width: 'min(92vw, 420px)',
        aspectRatio: '1',
      }}
    >
      {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
        const row = Math.floor(i / GRID_SIZE);
        const col = i % GRID_SIZE;
        const key = `${row},${col}`;
        const cell = cells.get(key);
        return (
          <div
            key={key}
            className={`relative border border-slate-200/40 dark:border-slate-700/40 ${cell?.baseClass ?? 'bg-white dark:bg-slate-900'}`}
          >
            {cell?.isSafe ? (
              <span className="absolute inset-0 flex items-center justify-center text-[8px] opacity-40">
                ★
              </span>
            ) : null}
            {cell?.pieces.map(({ piece, color, canMove }) => (
              <button
                key={`${color}-${piece.id}`}
                type="button"
                disabled={!canMove}
                onClick={() => onSelectPiece(piece.id)}
                className={`absolute w-[42%] h-[42%] rounded-full ring-2 transition-transform ${COLOR_STYLES[color].piece} ${
                  canMove ? 'scale-110 z-10 cursor-pointer animate-pulse' : 'cursor-default'
                } ${pieceOffset(piece.id)}`}
                aria-label={`${color} piece ${piece.id + 1}`}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function pieceOffset(id: number): string {
  const offsets = [
    'top-[8%] left-[8%]',
    'top-[8%] right-[8%]',
    'bottom-[8%] left-[8%]',
    'bottom-[8%] right-[8%]',
  ];
  return offsets[id] ?? offsets[0];
}

interface CellData {
  baseClass: string;
  isSafe: boolean;
  pieces: { piece: Piece; color: PlayerColor; canMove: boolean }[];
}

function buildCellMap(state: LudoGameState): Map<string, CellData> {
  const map = new Map<string, CellData>();
  const current = state.players[state.currentPlayerIndex];
  const movableIds = getMovablePieceIds(state);

  const setCell = (row: number, col: number, baseClass: string, isSafe = false) => {
    const key = `${row},${col}`;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, { baseClass, isSafe, pieces: [] });
    } else if (existing.baseClass === 'bg-white dark:bg-slate-900') {
      existing.baseClass = baseClass;
      existing.isSafe = isSafe || existing.isSafe;
    }
  };

  for (let i = 0; i < TRACK_COORDS.length; i++) {
    const { row, col } = TRACK_COORDS[i];
    const isSafe = SAFE_TRACK_INDICES.has(i);
    setCell(row, col, isSafe ? 'bg-slate-100 dark:bg-slate-700' : 'bg-slate-50 dark:bg-slate-800', isSafe);
  }

  for (const color of ['red', 'green', 'yellow', 'blue'] as const) {
    const styles = COLOR_STYLES[color];
    YARD_COORDS[color].forEach(({ row, col }) => setCell(row, col, styles.yard));
    HOME_COORDS[color].forEach(({ row, col }) => setCell(row, col, styles.home));
  }

  FINISH_COORDS.forEach(({ row, col }) =>
    setCell(row, col, 'bg-gradient-to-br from-red-300 via-green-300 to-blue-300'),
  );

  for (const player of state.players) {
    for (const piece of player.pieces) {
      const coord = pieceCoord(piece, player.color);
      if (!coord) continue;
      const key = `${coord.row},${coord.col}`;
      let cell = map.get(key);
      if (!cell) {
        cell = { baseClass: 'bg-white dark:bg-slate-900', isSafe: false, pieces: [] };
        map.set(key, cell);
      }
      const canMove =
        player.color === current.color &&
        movableIds.includes(piece.id) &&
        state.hasRolled;
      cell.pieces.push({ piece, color: player.color, canMove });
    }
  }

  return map;
}

function pieceCoord(
  piece: Piece,
  color: PlayerColor,
): GridCoord | null {
  if (piece.location.kind === 'yard') {
    const yardIndex = piece.id;
    return YARD_COORDS[color][yardIndex] ?? null;
  }
  if (piece.location.kind === 'track') {
    return TRACK_COORDS[piece.location.pos] ?? null;
  }
  if (piece.location.kind === 'home') {
    return HOME_COORDS[color][piece.location.step] ?? null;
  }
  if (piece.location.kind === 'finished') {
    return FINISH_COORDS[0];
  }
  return null;
}
