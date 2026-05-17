import type { SkillGroup } from '../../data/skills';

const SkillPills = ({ skills, variant }: { skills: string[]; variant: 'production' | 'familiar' }) => (
  <div className="flex flex-wrap gap-2">
    {skills.map((skill) => (
      <div
        key={skill}
        className={`rounded-md border px-3 py-1.5 text-sm shadow-sm transition-colors ${
          variant === 'production'
            ? 'border-teal-200 bg-white text-slate-700 hover:border-teal-500 dark:border-teal-800 dark:bg-slate-800 dark:text-slate-200'
            : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400'
        }`}
      >
        {skill}
      </div>
    ))}
  </div>
);

const SkillGroupBlock = ({ title, group }: { title: string; group: SkillGroup }) => (
  <div className="space-y-3">
    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">{title}</h4>
    {group.production.length > 0 && (
      <div>
        <p className="mb-2 text-xs font-semibold text-teal-700 dark:text-teal-400">Production</p>
        <SkillPills skills={group.production} variant="production" />
      </div>
    )}
    {group.familiar.length > 0 && (
      <div>
        <p className="mb-2 text-xs font-semibold text-slate-500">Familiar</p>
        <SkillPills skills={group.familiar} variant="familiar" />
      </div>
    )}
  </div>
);

const SkillsSection = ({ skillsData }: { skillsData: Record<string, SkillGroup> }) => {
  const labels: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Tools & AI',
    core: 'Core concepts',
  };

  return (
    <div className="rounded-2xl bg-slate-50 p-8 dark:bg-slate-900/50">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Technical arsenal</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {Object.entries(skillsData).map(([key, group]) => (
          <SkillGroupBlock key={key} title={labels[key] ?? key} group={group} />
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
