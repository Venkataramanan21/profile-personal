import {
  PLAYER_COLORS,
  SAFE_POSITIONS,
  START_POSITION,
  type LudoGameState,
  type Piece,
  type PieceLocation,
  type PlayerColor,
  type PlayerState,
} from './types';

const TRACK_LENGTH = 52;
const TRACK_LAP = 51;
const HOME_STEPS = 6;

export function createInitialState(playerCount = 4): LudoGameState {
  const count = Math.min(4, Math.max(2, playerCount));
  const players: PlayerState[] = PLAYER_COLORS.slice(0, count).map((color) => ({
    color,
    pieces: [0, 1, 2, 3].map((id) => ({
      id,
      location: { kind: 'yard' } as PieceLocation,
    })),
  }));

  return {
    players,
    currentPlayerIndex: 0,
    diceValue: null,
    hasRolled: false,
    selectedPieceId: null,
    winner: null,
    status: 'playing',
    message: `${capitalize(players[0].color)} — roll the dice`,
    grantExtraTurn: false,
  };
}

export function rollDice(state: LudoGameState): LudoGameState {
  if (state.status === 'won' || state.hasRolled) return state;

  const value = Math.floor(Math.random() * 6) + 1;
  const player = state.players[state.currentPlayerIndex];
  const movable = player.pieces.filter((p) => getValidMoves(p, player.color, value).length > 0);

  if (movable.length === 0) {
    const next = advanceTurn(state, false);
    return {
      ...next,
      diceValue: value,
      message:
        value === 6
          ? `${capitalize(player.color)} rolled 6 but has no moves — turn passes`
          : `${capitalize(player.color)} rolled ${value} — no moves, turn passes`,
    };
  }

  return {
    ...state,
    diceValue: value,
    hasRolled: true,
    selectedPieceId: movable.length === 1 ? movable[0].id : null,
    message:
      movable.length === 1
        ? `${capitalize(player.color)} rolled ${value} — moving piece ${movable[0].id + 1}`
        : `${capitalize(player.color)} rolled ${value} — select a piece`,
  };
}

export function getValidMoves(
  piece: Piece,
  color: PlayerColor,
  dice: number,
): { location: PieceLocation; capture: boolean }[] {
  if (piece.location.kind === 'finished') return [];

  if (piece.location.kind === 'yard') {
    if (dice !== 6) return [];
    return [{ location: { kind: 'track', pos: START_POSITION[color] }, capture: false }];
  }

  if (piece.location.kind === 'home') {
    const nextStep = piece.location.step + dice;
    if (nextStep > HOME_STEPS - 1) return [];
    if (nextStep === HOME_STEPS - 1) {
      return [{ location: { kind: 'finished' }, capture: false }];
    }
    return [{ location: { kind: 'home', step: nextStep }, capture: false }];
  }

  const dist = trackDistance(piece.location.pos, color);
  const remainingOnTrack = TRACK_LAP - dist;

  if (dice <= remainingOnTrack) {
    const newPos = (piece.location.pos + dice) % TRACK_LENGTH;
    return [{ location: { kind: 'track', pos: newPos }, capture: true }];
  }

  const homeStep = dice - remainingOnTrack - 1;
  if (homeStep > HOME_STEPS - 1) return [];

  if (homeStep === HOME_STEPS - 1) {
    return [{ location: { kind: 'finished' }, capture: false }];
  }

  return [{ location: { kind: 'home', step: homeStep }, capture: false }];
}

export function applyMove(
  state: LudoGameState,
  pieceId: number,
): LudoGameState {
  if (state.status === 'won' || !state.hasRolled || state.diceValue === null) {
    return state;
  }

  const player = state.players[state.currentPlayerIndex];
  const piece = player.pieces.find((p) => p.id === pieceId);
  if (!piece) return state;

  const moves = getValidMoves(piece, player.color, state.diceValue);
  if (moves.length === 0) return state;

  const { location: newLocation, capture: canCapture } = moves[0];
  let nextPlayers = state.players.map((pl, idx) => {
    if (idx !== state.currentPlayerIndex) return pl;
    return {
      ...pl,
      pieces: pl.pieces.map((p) =>
        p.id === pieceId ? { ...p, location: newLocation } : p,
      ),
    };
  });

  let captured = false;
  if (canCapture && newLocation.kind === 'track' && !SAFE_POSITIONS.has(newLocation.pos)) {
    nextPlayers = nextPlayers.map((pl, idx) => {
      if (idx === state.currentPlayerIndex) return pl;
      return {
        ...pl,
        pieces: pl.pieces.map((p) => {
          if (p.location.kind === 'track' && p.location.pos === newLocation.pos) {
            captured = true;
            return { ...p, location: { kind: 'yard' } };
          }
          return p;
        }),
      };
    });
  }

  const updatedPlayer = nextPlayers[state.currentPlayerIndex];
  const allFinished = updatedPlayer.pieces.every((p) => p.location.kind === 'finished');
  if (allFinished) {
    return {
      ...state,
      players: nextPlayers,
      winner: updatedPlayer.color,
      status: 'won',
      message: `${capitalize(updatedPlayer.color)} wins!`,
      diceValue: null,
      hasRolled: false,
      selectedPieceId: null,
      grantExtraTurn: false,
    };
  }

  const extraTurn = state.diceValue === 6 || captured;

  if (extraTurn) {
    const reason = state.diceValue === 6 ? 'rolled a 6' : 'captured a piece';
    return {
      ...state,
      players: nextPlayers,
      diceValue: null,
      hasRolled: false,
      selectedPieceId: null,
      grantExtraTurn: true,
      message: `${capitalize(updatedPlayer.color)} ${reason} — roll again`,
    };
  }

  const next = advanceTurn({ ...state, players: nextPlayers }, false);
  return {
    ...next,
    grantExtraTurn: false,
    message: `${capitalize(next.players[next.currentPlayerIndex].color)} — roll the dice`,
  };
}

export function tryAutoMove(state: LudoGameState): LudoGameState {
  if (
    state.status === 'won' ||
    !state.hasRolled ||
    state.diceValue === null ||
    state.selectedPieceId === null
  ) {
    return state;
  }

  return applyMove(state, state.selectedPieceId);
}

function advanceTurn(state: LudoGameState, keepMessage: boolean): LudoGameState {
  const nextIndex = (state.currentPlayerIndex + 1) % state.players.length;
  return {
    ...state,
    currentPlayerIndex: nextIndex,
    diceValue: null,
    hasRolled: false,
    selectedPieceId: null,
    grantExtraTurn: false,
    message: keepMessage
      ? state.message
      : `${capitalize(state.players[nextIndex].color)} — roll the dice`,
  };
}

function trackDistance(pos: number, color: PlayerColor): number {
  const start = START_POSITION[color];
  return (pos - start + TRACK_LENGTH) % TRACK_LENGTH;
}

function capitalize(color: PlayerColor): string {
  return color.charAt(0).toUpperCase() + color.slice(1);
}

export function getMovablePieceIds(state: LudoGameState): number[] {
  if (!state.hasRolled || state.diceValue === null || state.status === 'won') {
    return [];
  }
  const player = state.players[state.currentPlayerIndex];
  return player.pieces
    .filter((p) => getValidMoves(p, player.color, state.diceValue!).length > 0)
    .map((p) => p.id);
}
