export const PLAYER_COLORS = ['red', 'green', 'yellow', 'blue'] as const;
export type PlayerColor = (typeof PLAYER_COLORS)[number];

export const START_POSITION: Record<PlayerColor, number> = {
  red: 0,
  green: 13,
  yellow: 26,
  blue: 39,
};

export const SAFE_POSITIONS = new Set([0, 8, 13, 21, 26, 34, 39, 47]);

export type PieceLocation =
  | { kind: 'yard' }
  | { kind: 'track'; pos: number }
  | { kind: 'home'; step: number }
  | { kind: 'finished' };

export interface Piece {
  id: number;
  location: PieceLocation;
}

export interface PlayerState {
  color: PlayerColor;
  pieces: Piece[];
}

export type GameStatus = 'playing' | 'won';

export interface LudoGameState {
  players: PlayerState[];
  currentPlayerIndex: number;
  diceValue: number | null;
  hasRolled: boolean;
  selectedPieceId: number | null;
  winner: PlayerColor | null;
  status: GameStatus;
  message: string;
  grantExtraTurn: boolean;
}

export interface LudoGameConfig {
  /** Number of human players (2–4). Remaining seats are skipped in turn order. */
  playerCount?: number;
}
