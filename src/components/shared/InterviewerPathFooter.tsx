import type { InterviewerStep } from '../../lib/interviewPath';
import { useInterviewPath } from '../../hooks/useInterviewPath';
import InterviewerNextSteps from './InterviewerNextSteps';
import InterviewerPathEnableButton from './InterviewerPathEnableButton';
import InterviewerPathStartPrompt from './InterviewerPathStartPrompt';

interface InterviewerPathFooterProps {
  step: InterviewerStep;
  className?: string;
}

/**
 * - Start prompt: when the user landed without `?interview=1` (header, deep link, etc.)
 * - Step footer: only when `?interview=1` is present (guided path from home)
 */
const InterviewerPathFooter = ({ step, className }: InterviewerPathFooterProps) => {
  const { isActive } = useInterviewPath();

  return (
    <>
      <InterviewerPathStartPrompt step={step} />
      {isActive ? (
        <InterviewerNextSteps current={step} className={className} />
      ) : (
        <InterviewerPathEnableButton className={className} />
      )}
    </>
  );
};

export default InterviewerPathFooter;
