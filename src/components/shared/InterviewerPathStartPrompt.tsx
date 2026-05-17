import { useNavigate } from 'react-router-dom';
import type { InterviewerStep } from '../../lib/interviewPath';
import { useInterviewPathStartPrompt } from '../../hooks/useInterviewPathStartPrompt';

interface InterviewerPathStartPromptProps {
  step: InterviewerStep;
}

const InterviewerPathStartPrompt = ({ step }: InterviewerPathStartPromptProps) => {
  const navigate = useNavigate();
  const { isOpen, dismiss, firstStepHref } = useInterviewPathStartPrompt(step);

  if (!isOpen) {
    return null;
  }

  const handleYes = () => {
    dismiss();
    navigate(firstStepHref);
  };

  const handleNo = () => {
    dismiss();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      role="presentation"
      onClick={handleNo}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="interview-path-prompt-title"
        aria-describedby="interview-path-prompt-desc"
        className="w-full max-w-md rounded-2xl border border-violet-200 bg-white p-6 shadow-xl dark:border-violet-900/60 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="interview-path-prompt-title"
          className="mb-2 text-lg font-bold text-slate-900 dark:text-white"
        >
          Start from the beginning?
        </h2>
        <p
          id="interview-path-prompt-desc"
          className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
        >
          This page is part of the interviewer walkthrough. Would you like to start from the first
          step — the flagship case study — or continue browsing here?
        </p>
        <div className="flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={handleNo}
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            No, stay here
          </button>
          <button
            type="button"
            onClick={handleYes}
            className="rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-teal-700"
          >
            Yes, start at step 1
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewerPathStartPrompt;
