import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createInitialState,
  directionFromKey,
  queueDirection,
  tick,
} from './gameLogic';
import type { Direction, SnakeGameConfig, SnakeGameState } from './types';

export function useSnakeGame(config: SnakeGameConfig = {}) {
  const [state, setState] = useState<SnakeGameState>(() => createInitialState(config));
  const stateRef = useRef(state);
  stateRef.current = state;

  const setDirection = useCallback((direction: Direction) => {
    setState((prev) => {
      if (prev.status !== 'running' && prev.status !== 'paused') return prev;
      return {
        ...prev,
        pendingDirection: queueDirection(prev.direction, prev.pendingDirection, direction),
      };
    });
  }, []);

  const start = useCallback(() => {
    setState((prev) => (prev.status === 'idle' ? { ...prev, status: 'running' } : prev));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => (prev.status === 'running' ? { ...prev, status: 'paused' } : prev));
  }, []);

  const togglePause = useCallback(() => {
    setState((prev) => {
      if (prev.status === 'running') return { ...prev, status: 'paused' };
      if (prev.status === 'paused') return { ...prev, status: 'running' };
      return prev;
    });
  }, []);

  const restart = useCallback(() => {
    setState(createInitialState(config));
  }, [config]);

  const playAgain = useCallback(() => {
    setState({ ...createInitialState(config), status: 'running' });
  }, [config]);

  useEffect(() => {
    if (state.status !== 'running') return undefined;

    const intervalId = window.setInterval(() => {
      setState((prev) => tick(prev));
    }, state.tickMs);

    return () => window.clearInterval(intervalId);
  }, [state.status, state.tickMs]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const direction = directionFromKey(event.key);
      if (direction) {
        event.preventDefault();
        setDirection(direction);
        return;
      }

      if (event.key === ' ' || event.key === 'p' || event.key === 'P') {
        event.preventDefault();
        const current = stateRef.current;
        if (current.status === 'idle') {
          start();
        } else if (current.status === 'running' || current.status === 'paused') {
          togglePause();
        }
        return;
      }

      if (event.key === 'Enter' && stateRef.current.status === 'gameOver') {
        event.preventDefault();
        playAgain();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playAgain, restart, setDirection, start, togglePause]);

  return {
    state,
    setDirection,
    start,
    pause,
    togglePause,
    restart,
    playAgain,
  };
}
