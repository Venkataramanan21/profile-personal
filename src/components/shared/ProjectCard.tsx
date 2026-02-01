import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Server, Code } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 relative overflow-hidden group"
    >
      {/* Decorative Gradient Blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-blue-500/20" />

      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
          {project.category}
        </span>
        <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
      </div>

      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
        {project.title}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
        {project.summary}
      </p>

      {/* Key Metric Highlight */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-blue-500 mb-6">
        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Key Impact</p>
        <p className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          {project.impact}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, i) => (
          <span key={i} className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// Usage Example
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//   {projects.map(p => <ProjectCard key={p.id} project={p} />)}
// </div>

export default ProjectCard;