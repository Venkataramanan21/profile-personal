import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isInterviewPathActive, withInterviewPath } from '../lib/interviewPath';

export function useInterviewPath() {
  const [searchParams] = useSearchParams();

  const isActive = useMemo(() => isInterviewPathActive(searchParams), [searchParams]);

  const pathTo = useCallback((path: string) => withInterviewPath(path), []);

  return { isActive, pathTo };
}
