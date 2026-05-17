import { useLocation, useNavigate } from 'react-router-dom';
import { Route } from 'lucide-react';
import { enableInterviewPathForLocation } from '../../lib/interviewPath';
import { useInterviewPath } from '../../hooks/useInterviewPath';

interface InterviewerPathEnableButtonProps {
  className?: string;
}

const InterviewerPathEnableButton = ({ className = '' }: InterviewerPathEnableButtonProps) => {
  const { isActive } = useInterviewPath();
  const location = useLocation();
  const navigate = useNavigate();

  if (isActive) {
    return null;
  }

  const handleClick = () => {
    navigate(enableInterviewPathForLocation(location.pathname, location.search));
  };

  return (
    <div
      className={`rounded-2xl border border-dashed border-violet-300/90 bg-violet-50/50 p-5 text-center dark:border-violet-800 dark:bg-violet-950/20 ${className}`}
    >
      <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">
        Following the interviewer walkthrough?
      </p>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
      >
        <Route size={16} aria-hidden />
        Show interview steps
      </button>
    </div>
  );
};

export default InterviewerPathEnableButton;
