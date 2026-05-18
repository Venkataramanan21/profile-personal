import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  getInterviewPathFirstStepHref,
  isInterviewPathPromptDismissed,
  markInterviewPathPromptDismissed,
  type InterviewerStep,
} from '../lib/interviewPath';
import { SiteRoutePrefixContext } from '../context/SiteRoutePrefixContext';
import { applySiteRoutePrefix } from '../lib/sitePaths';
import { useInterviewPath } from './useInterviewPath';

export function useInterviewPathStartPrompt(step: InterviewerStep) {
  const { isActive } = useInterviewPath();
  const prefix = useContext(SiteRoutePrefixContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Guided path (`?interview=1`) — user already chose “Interviewers — start here”.
    if (isActive || step === 'case-study') {
      setIsOpen(false);
      return;
    }
    if (isInterviewPathPromptDismissed()) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  }, [isActive, step]);

  const dismiss = useCallback(() => {
    markInterviewPathPromptDismissed();
    setIsOpen(false);
  }, []);

  const firstStepHref = useMemo(
    () => applySiteRoutePrefix(prefix, getInterviewPathFirstStepHref()),
    [prefix]
  );

  return { isOpen, dismiss, firstStepHref };
}
