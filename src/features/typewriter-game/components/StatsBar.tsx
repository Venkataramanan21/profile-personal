import type { GameStatus, TypewriterStats } from '../types';

interface StatsBarProps {
  stats: TypewriterStats;
  status: GameStatus;
}

function StatItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center min-w-[4.5rem]">
      <span className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300">{label}</span>
      <span className="text-2xl font-semibold tabular-nums text-slate-900 dark:text-white">{value}</span>
    </div>
  );
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function StatsBar({ stats, status }: StatsBarProps) {
  const timeLabel = status === 'idle' ? '0:00' : formatTime(stats.elapsedSeconds);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
      <StatItem label="Time" value={timeLabel} />
      <StatItem label="WPM" value={stats.wpm} />
      <StatItem label="Accuracy" value={`${stats.accuracy}%`} />
      <StatItem label="Progress" value={`${stats.progress}%`} />
    </div>
  );
}
