import { useCallback, useState } from 'react';
import {
  applyMove,
  createInitialState,
  rollDice,
  tryAutoMove,
} from './gameLogic';
import type { LudoGameConfig, LudoGameState } from './types';

export function useLudoGame(config: LudoGameConfig = {}) {
  const [state, setState] = useState<LudoGameState>(() =>
    createInitialState(config.playerCount),
  );

  const handleRoll = useCallback(() => {
    setState((prev) => {
      const rolled = rollDice(prev);
      return tryAutoMove(rolled);
    });
  }, []);

  const handleSelectPiece = useCallback((pieceId: number) => {
    setState((prev) => {
      if (prev.status === 'won' || !prev.hasRolled) return prev;
      const moved = applyMove({ ...prev, selectedPieceId: pieceId }, pieceId);
      return tryAutoMove(moved);
    });
  }, []);

  const reset = useCallback(() => {
    setState(createInitialState(config.playerCount));
  }, [config.playerCount]);

  return {
    state,
    handleRoll,
    handleSelectPiece,
    reset,
  };
}
