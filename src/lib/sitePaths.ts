/**
 * Prefix internal routes for the /3d mirror (e.g. /projects → /3d/projects).
 * Handles paths that include a query string (e.g. interview mode).
 */
export function applySiteRoutePrefix(prefix: string, pathWithQuery: string): string {
  if (!prefix) return pathWithQuery;
  const qIndex = pathWithQuery.indexOf('?');
  const pathname = qIndex === -1 ? pathWithQuery : pathWithQuery.slice(0, qIndex);
  const search = qIndex === -1 ? '' : pathWithQuery.slice(qIndex);
  const normalized = pathname === '' ? '/' : pathname;
  const prefixed = normalized === '/' ? prefix : `${prefix}${normalized}`;
  return search ? `${prefixed}${search}` : prefixed;
}

export const SITE_3D_PATH_PREFIX = '/3d' as const;
