import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap } from 'lucide-react';
import type { Project } from '../../types/project';

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link to={`/projects/${project.slug}`} className="block h-full">
      <motion.article
        whileHover={{ y: -5 }}
        className="group relative h-full overflow-hidden rounded-xl border border-slate-100 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl transition-all group-hover:bg-blue-500/20" />

        <div className="mb-4 flex items-start justify-between">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            {project.category}
          </span>
          <ArrowUpRight className="h-5 w-5 text-slate-400 transition-colors group-hover:text-blue-500" />
        </div>

        <h3 className="mb-2 text-xl font-bold text-slate-800 dark:text-white">{project.title}</h3>

        <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.summary}
        </p>

        <div className="mb-6 rounded-lg border-l-4 border-blue-500 bg-slate-50 p-4 dark:bg-slate-900/50">
          <p className="mb-1 text-xs font-bold uppercase text-slate-500">Key impact</p>
          <p className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <Zap className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            {project.impact}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-500 dark:bg-slate-700 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.article>
    </Link>
  );
};

export default ProjectCard;
