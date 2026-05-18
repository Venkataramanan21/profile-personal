import { useCallback, useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SiteRoutePrefixContext } from '../context/SiteRoutePrefixContext';
import { isInterviewPathActive, withInterviewPath } from '../lib/interviewPath';
import { applySiteRoutePrefix } from '../lib/sitePaths';

export function useInterviewPath() {
  const [searchParams] = useSearchParams();
  const prefix = useContext(SiteRoutePrefixContext);

  const isActive = useMemo(() => isInterviewPathActive(searchParams), [searchParams]);

  const pathTo = useCallback(
    (path: string) => applySiteRoutePrefix(prefix, withInterviewPath(path)),
    [prefix]
  );

  return { isActive, pathTo };
}
