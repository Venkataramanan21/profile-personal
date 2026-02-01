import { Award } from 'lucide-react';

interface Achievement {
  id: string | number;
  title: string;
  date: string;
  description: string;
}

const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
    <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg shrink-0">
      <Award size={24} />
    </div>
    <div>
      <h4 className="font-bold text-slate-900 dark:text-white">{achievement.title}</h4>
      <p className="text-xs text-slate-400 mb-1">{achievement.date}</p>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        {achievement.description}
      </p>
    </div>
  </div>
);

export default AchievementCard;