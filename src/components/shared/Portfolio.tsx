import { Link } from "react-router-dom";
import { Award, Briefcase } from "lucide-react";
import { projects } from "../../data/projects";
import ProjectCard from "./ProjectCard";
import ExperienceItem from "./ExperienceItem";
import { experience } from "../../data/experience";
import { skills } from "../../data/skills";
import SkillsSection from "./SkillSection";
import { achievements } from "../../data/achievements";
import AchievementCard from "./AchievementCard";

const Portfolio = () => {
  return (
    <div className="max-w-8xl mx-auto px-0 py-12 space-y-20">
      
      {/* Hero Section Placeholder */}
      <section id="featured-work">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">Featured Work</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Experience (Takes up 2/3 width) */}
        <section className="lg:col-span-2 bg-white/95 dark:bg-slate-900/90 p-8 rounded-2xl shadow-lg dark:shadow-none border border-slate-200/80 dark:border-transparent">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <Briefcase className="text-blue-500" /> Work Experience
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

        {/* Right Column: Skills & Achievements (Takes up 1/3 width) */}
        <div className="space-y-12">
          <section>
            <SkillsSection skillsData={skills} />
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
              <Award className="text-yellow-500" /> Recognition
            </h2>
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-2 shadow-sm">
              {achievements.map(ach => (
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