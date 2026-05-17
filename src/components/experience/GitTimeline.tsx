import { motion } from 'framer-motion';
import { timelineItems } from '../../data/timeline';
import GitTimelineBranch from './GitTimelineBranch';
import GitTimelineEntry from './GitTimelineEntry';

const GitTimeline = () => {
  const branchCount = new Set(timelineItems.map((i) => i.branch)).size;

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 overflow-hidden rounded-xl border border-slate-300/80 bg-slate-900 px-4 py-3 font-mono text-sm shadow-lg dark:border-slate-600"
      >
        <p className="text-emerald-400">
          <span className="text-slate-500">$</span> git log --oneline --graph --all --experience
        </p>
        <p className="mt-1 text-slate-400">
          {timelineItems.length} commits across {branchCount} branches
        </p>
      </motion.div>

      <div className="space-y-0">
        {timelineItems.map((item, index) => {
          const prevBranch = index > 0 ? timelineItems[index - 1].branch : null;
          const showBranchLabel = item.branch !== prevBranch;

          return (
            <motion.div key={item.id} className="flex gap-3 sm:gap-5">
              <GitTimelineBranch
                item={item}
                isFirst={index === 0}
                isLast={index === timelineItems.length - 1}
                showBranchLabel={showBranchLabel}
              />
              <div className="min-w-0 flex-1 pb-2">
                <GitTimelineEntry item={item} index={index} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default GitTimeline;
