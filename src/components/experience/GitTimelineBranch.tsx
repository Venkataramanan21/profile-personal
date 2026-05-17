import { motion } from 'framer-motion';
import { categoryStyles } from '../../data/timeline';
import type { TimelineItem } from '../../types/timeline';

interface GitTimelineBranchProps {
  item: TimelineItem;
  isFirst: boolean;
  isLast: boolean;
  showBranchLabel: boolean;
}

const GitTimelineBranch = ({
  item,
  isFirst,
  isLast,
  showBranchLabel,
}: GitTimelineBranchProps) => {
  const style = categoryStyles[item.category];

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0.6 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="relative flex w-12 shrink-0 flex-col items-center sm:w-16"
    >
      {!isFirst && <motion.div className={`w-0.5 flex-1 min-h-6 ${style.line}`} />}

      <div className="relative z-10 flex flex-col items-center">
        {showBranchLabel && (
          <span
            className={`mb-2 hidden max-w-[4.5rem] truncate rounded border px-1.5 py-0.5 font-mono text-[9px] font-semibold sm:block ${style.branchBadge}`}
            title={item.branch}
          >
            {item.branch.split('/').pop()}
          </span>
        )}

        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.05 }}
          className={`h-4 w-4 rounded-full ring-4 ${style.dot} ${style.dotRing}`}
        />
      </div>

      {!isLast && <motion.div className={`w-0.5 flex-1 min-h-10 ${style.line}`} />}
    </motion.div>
  );
};

export default GitTimelineBranch;
