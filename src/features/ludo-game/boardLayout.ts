/** 15×15 grid coordinates for rendering the classic Ludo board. */

export interface GridCoord {
  row: number;
  col: number;
}

/** Shared outer track, indices 0–51 clockwise from red start. */
export const TRACK_COORDS: GridCoord[] = [
  { row: 6, col: 1 },
  { row: 6, col: 2 },
  { row: 6, col: 3 },
  { row: 6, col: 4 },
  { row: 6, col: 5 },
  { row: 5, col: 6 },
  { row: 4, col: 6 },
  { row: 3, col: 6 },
  { row: 2, col: 6 },
  { row: 1, col: 6 },
  { row: 0, col: 6 },
  { row: 0, col: 7 },
  { row: 0, col: 8 },
  { row: 1, col: 8 },
  { row: 2, col: 8 },
  { row: 3, col: 8 },
  { row: 4, col: 8 },
  { row: 5, col: 8 },
  { row: 6, col: 8 },
  { row: 6, col: 9 },
  { row: 6, col: 10 },
  { row: 6, col: 11 },
  { row: 6, col: 12 },
  { row: 6, col: 13 },
  { row: 7, col: 13 },
  { row: 8, col: 13 },
  { row: 8, col: 12 },
  { row: 8, col: 11 },
  { row: 8, col: 10 },
  { row: 8, col: 9 },
  { row: 8, col: 8 },
  { row: 9, col: 8 },
  { row: 10, col: 8 },
  { row: 11, col: 8 },
  { row: 12, col: 8 },
  { row: 13, col: 8 },
  { row: 14, col: 8 },
  { row: 14, col: 7 },
  { row: 14, col: 6 },
  { row: 13, col: 6 },
  { row: 12, col: 6 },
  { row: 11, col: 6 },
  { row: 10, col: 6 },
  { row: 9, col: 6 },
  { row: 8, col: 6 },
  { row: 8, col: 5 },
  { row: 8, col: 4 },
  { row: 8, col: 3 },
  { row: 8, col: 2 },
  { row: 8, col: 1 },
  { row: 7, col: 1 },
  { row: 7, col: 2 },
];

export const YARD_COORDS: Record<'red' | 'green' | 'yellow' | 'blue', GridCoord[]> = {
  red: [
    { row: 10, col: 1 },
    { row: 10, col: 2 },
    { row: 11, col: 1 },
    { row: 11, col: 2 },
  ],
  green: [
    { row: 1, col: 1 },
    { row: 1, col: 2 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ],
  yellow: [
    { row: 1, col: 12 },
    { row: 1, col: 13 },
    { row: 2, col: 12 },
    { row: 2, col: 13 },
  ],
  blue: [
    { row: 10, col: 12 },
    { row: 10, col: 13 },
    { row: 11, col: 12 },
    { row: 11, col: 13 },
  ],
};

export const HOME_COORDS: Record<'red' | 'green' | 'yellow' | 'blue', GridCoord[]> = {
  red: [
    { row: 7, col: 1 },
    { row: 7, col: 2 },
    { row: 7, col: 3 },
    { row: 7, col: 4 },
    { row: 7, col: 5 },
    { row: 7, col: 6 },
  ],
  green: [
    { row: 1, col: 7 },
    { row: 2, col: 7 },
    { row: 3, col: 7 },
    { row: 4, col: 7 },
    { row: 5, col: 7 },
    { row: 6, col: 7 },
  ],
  yellow: [
    { row: 7, col: 8 },
    { row: 7, col: 9 },
    { row: 7, col: 10 },
    { row: 7, col: 11 },
    { row: 7, col: 12 },
    { row: 7, col: 13 },
  ],
  blue: [
    { row: 8, col: 7 },
    { row: 9, col: 7 },
    { row: 10, col: 7 },
    { row: 11, col: 7 },
    { row: 12, col: 7 },
    { row: 13, col: 7 },
  ],
};

export const FINISH_COORDS: GridCoord[] = [
  { row: 7, col: 7 },
];

export const SAFE_TRACK_INDICES = new Set([0, 8, 13, 21, 26, 34, 39, 47]);
