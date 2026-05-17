interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full h-2 rounded-full bg-white/40 dark:bg-slate-800/50 overflow-hidden">
      <div
        className="h-full rounded-full bg-teal-600 transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
