import React from 'react';

const SkillGroup = ({ title, skills }) => (
  <div className="space-y-3">
    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <div 
          key={skill}
          className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm text-slate-700 dark:text-slate-200 shadow-sm hover:border-blue-500 hover:text-blue-500 transition-colors cursor-default"
        >
          {skill}
        </div>
      ))}
    </div>
  </div>
);

const SkillsSection = ({ skillsData }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Technical Arsenal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SkillGroup title="Frontend" skills={skillsData.frontend} />
        <SkillGroup title="Backend" skills={skillsData.backend} />
        <SkillGroup title="Tools & AI" skills={skillsData.tools} />
        <SkillGroup title="Core Concepts" skills={skillsData.core} />
      </div>
    </div>
  );
};

export default SkillsSection;