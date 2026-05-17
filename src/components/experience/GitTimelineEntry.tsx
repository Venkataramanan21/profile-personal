import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, GitCommit, MapPin } from 'lucide-react';
import { branchColors, categoryStyles } from '../../data/timeline';
import type { TimelineItem } from '../../types/timeline';

interface GitTimelineEntryProps {
  item: TimelineItem;
  index: number;
}

const GitTimelineEntry = ({ item, index }: GitTimelineEntryProps) => {
  const style = categoryStyles[item.category];
  const branchColor = branchColors[item.branch] ?? 'text-slate-500';

  return (
    <motion.article
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className={`mb-8 rounded-xl border border-slate-200/90 bg-white/95 p-5 shadow-md backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/90 dark:shadow-lg sm:p-6 border-l-4 ${style.cardAccent}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-3 flex flex-wrap items-center gap-2 font-mono text-xs"
      >
        <span className="rounded bg-slate-900 px-2 py-1 font-semibold text-emerald-400 dark:bg-slate-950">
          {item.hash}
        </span>
        <span className={`font-semibold ${branchColor}`}>{item.branch}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style.categoryBadge}`}
        >
          {style.label}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
      >
        <motion.div className="flex items-start gap-2">
          <GitCommit className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
          <h3 className="text-lg font-bold leading-snug text-slate-900 dark:text-white sm:text-xl">
            {item.projectSlug ? (
              <Link
                to={`/projects/${item.projectSlug}`}
                className="text-teal-700 underline-offset-2 hover:text-teal-800 hover:underline dark:text-teal-300 dark:hover:text-teal-200"
              >
                {item.title}
              </Link>
            ) : (
              item.title
            )}
            {item.subtitle && (
              <span className="mt-1 block text-base font-normal text-slate-500 dark:text-slate-400 sm:inline sm:mt-0">
                {' '}
                <span className="hidden sm:inline">— </span>
                {item.subtitle}
              </span>
            )}
          </h3>
        </motion.div>
        <time className="shrink-0 rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {item.date}
        </time>
      </motion.div>

      {item.location && (
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <MapPin size={14} className="text-rose-500" />
          {item.location}
        </div>
      )}

      <ul className="mb-4 space-y-2">
        {item.description.map((line, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
          >
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
            {line}
          </li>
        ))}
      </ul>

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-md px-2 py-0.5 font-mono text-xs ${style.tag}`}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {item.projectSlug && (
        <Link
          to={`/projects/${item.projectSlug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
        >
          Read case study
          <ArrowRight size={14} aria-hidden />
        </Link>
      )}
    </motion.article>
  );
};

export default GitTimelineEntry;
