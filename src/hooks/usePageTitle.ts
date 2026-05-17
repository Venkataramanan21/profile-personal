import { useEffect } from 'react';
import { site } from '../content/site';

export function usePageTitle(pageTitle?: string) {
  useEffect(() => {
    const full = pageTitle ? `${pageTitle} | ${site.name}` : `${site.name} — ${site.title}`;
    document.title = full;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', site.description);
    }
  }, [pageTitle]);
}
