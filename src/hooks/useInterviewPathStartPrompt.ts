import { useCallback, useEffect, useState } from 'react';
import {
  getInterviewPathFirstStepHref,
  isInterviewPathPromptDismissed,
  markInterviewPathPromptDismissed,
  type InterviewerStep,
} from '../lib/interviewPath';
import { useInterviewPath } from './useInterviewPath';

export function useInterviewPathStartPrompt(step: InterviewerStep) {
  const { isActive } = useInterviewPath();
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

  const firstStepHref = getInterviewPathFirstStepHref();

  return { isOpen, dismiss, firstStepHref };
}
