import { site } from '../content/site';

/** Query param set when the user starts from “Interviewers — start here”. */
export const INTERVIEW_PATH_PARAM = 'interview';
export const INTERVIEW_PATH_VALUE = '1';

export type InterviewerStep = 'case-study' | 'experience' | 'resume' | 'contact';

export type InterviewPathStep = {
  id: InterviewerStep;
  label: string;
  path: string;
  short: string;
};

export const INTERVIEW_PATH_STEPS: InterviewPathStep[] = [
  {
    id: 'case-study',
    label: 'Flagship case study',
    path: `/projects/${site.flagshipSlug}`,
    short: 'Case study',
  },
  { id: 'experience', label: 'Experience log', path: '/experience', short: 'Experience' },
  { id: 'resume', label: 'Resume', path: '/resume', short: 'Resume' },
  { id: 'contact', label: 'Contact', path: '/contact', short: 'Contact' },
];

export type InterviewGuideStep = InterviewPathStep & { description: string };

/** First three steps shown on the home “Interviewers — start here” cards. */
export const INTERVIEW_GUIDE_STEPS: InterviewGuideStep[] = [
  {
    ...INTERVIEW_PATH_STEPS[0],
    description: 'Performance work with measurable impact',
  },
  {
    ...INTERVIEW_PATH_STEPS[1],
    description: 'Git-style career timeline',
  },
  {
    ...INTERVIEW_PATH_STEPS[2],
    description: 'Online view + PDF download',
  },
];

export function isInterviewPathActive(
  searchParams: URLSearchParams | string
): boolean {
  const params =
    typeof searchParams === 'string' ? new URLSearchParams(searchParams) : searchParams;
  return params.get(INTERVIEW_PATH_PARAM) === INTERVIEW_PATH_VALUE;
}

/** Append the interview-path param so guided navigation stays in sync. */
export function withInterviewPath(path: string): string {
  const [pathname, search = ''] = path.split('?');
  const params = new URLSearchParams(search);
  params.set(INTERVIEW_PATH_PARAM, INTERVIEW_PATH_VALUE);
  return `${pathname}?${params.toString()}`;
}

/** sessionStorage key — prompt is hidden for the rest of the browser tab session. */
export const INTERVIEW_PATH_PROMPT_SESSION_KEY = 'interview-path-start-prompt-dismissed';

export function isInterviewPathPromptDismissed(): boolean {
  try {
    return sessionStorage.getItem(INTERVIEW_PATH_PROMPT_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function markInterviewPathPromptDismissed(): void {
  try {
    sessionStorage.setItem(INTERVIEW_PATH_PROMPT_SESSION_KEY, '1');
  } catch {
    // Private mode / blocked storage — prompt may reappear; acceptable fallback.
  }
}

export function getInterviewPathFirstStepHref(): string {
  return withInterviewPath(INTERVIEW_PATH_STEPS[0].path);
}

/** Add `?interview=1` to the current route (pathname + existing search). */
export function enableInterviewPathForLocation(pathname: string, search = ''): string {
  return withInterviewPath(`${pathname}${search}`);
}
