import { createContext, useContext, type ReactNode } from 'react';
import { applySiteRoutePrefix } from '../lib/sitePaths';

export const SiteRoutePrefixContext = createContext('');

export function SiteRoutePrefixProvider({
  prefix,
  children,
}: {
  prefix: string;
  children: ReactNode;
}) {
  return <SiteRoutePrefixContext.Provider value={prefix}>{children}</SiteRoutePrefixContext.Provider>;
}

export function useSiteRoutePrefix(): string {
  return useContext(SiteRoutePrefixContext);
}

export function useSitePath(pathWithQuery: string): string {
  const prefix = useContext(SiteRoutePrefixContext);
  return applySiteRoutePrefix(prefix, pathWithQuery);
}
