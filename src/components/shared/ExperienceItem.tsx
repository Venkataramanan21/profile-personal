import { motion } from 'framer-motion';
import {  MapPin } from 'lucide-react';

const ExperienceItem = ({ exp, index }: { exp: any; index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 pb-12 border-l-2 border-slate-200 dark:border-slate-700 last:pb-0"
    >
      {/* Timeline Dot */}
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900" />
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {exp.role} <span className="text-slate-400 font-normal">@ {exp.company}</span>
        </h3>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
          {exp.date}
        </span>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <MapPin size={14} />
        {exp.location}
      </div>

      <ul className="space-y-2">
        {exp.description.map((item: string, i: number) => (
          <li key={i} className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ExperienceItem;