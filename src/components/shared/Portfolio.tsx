import { Link } from 'react-router-dom';
import { Award, Briefcase } from 'lucide-react';
import { projects } from '../../content/projects';
import ProjectCard from './ProjectCard';
import ExperienceItem from './ExperienceItem';
import { experience } from '../../data/experience';
import { skills } from '../../data/skills';
import SkillsSection from './SkillSection';
import { achievements } from '../../data/achievements';
import AchievementCard from './AchievementCard';

const Portfolio = () => {
  return (
    <div className="mx-auto max-w-8xl space-y-20 px-0 py-12">
      <section id="featured-work">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Featured work</h2>
          <Link
            to="/projects"
            className="text-sm font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
          >
            View all work →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <section className="rounded-2xl border border-slate-200/80 bg-white/95 p-8 shadow-lg dark:border-transparent dark:bg-slate-900/90 lg:col-span-2">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
              <Briefcase className="text-blue-500" /> Work experience
            </h2>
            <Link
              to="/experience"
              className="text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
            >
              View git log →
            </Link>
          </div>
          <div className="space-y-0">
            {experience.map((exp, index) => (
              <ExperienceItem key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </section>

        <div className="space-y-12">
          <section>
            <SkillsSection skillsData={skills} />
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
              <Award className="text-yellow-500" /> Recognition
            </h2>
            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              {achievements.map((ach) => (
                <AchievementCard key={ach.id} achievement={ach} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
