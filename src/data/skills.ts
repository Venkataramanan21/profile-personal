export type SkillTier = 'production' | 'familiar';

export interface SkillGroup {
  production: string[];
  familiar: string[];
}

export const skills: Record<string, SkillGroup> = {
  frontend: {
    production: ['React', 'Redux Toolkit', 'Tailwind CSS', 'HTML/CSS', 'Jest/RTL'],
    familiar: ['Next.js', 'Cypress'],
  },
  backend: {
    production: ['Java', 'Spring Boot', 'REST APIs', 'MySQL', 'SQL'],
    familiar: ['Hibernate ORM', 'Node.js', 'GraphQL'],
  },
  tools: {
    production: ['Git/GitHub', 'GitHub Copilot', 'Cursor', 'Docker', 'Jenkins'],
    familiar: ['Windsurf'],
  },
  core: {
    production: ['CI/CD', 'Agile/Scrum', 'Design Patterns', 'Micro-Frontends'],
    familiar: ['DSA'],
  },
};

/** Flat list for resume / legacy consumers */
export const skillsFlat = {
  frontend: [...skills.frontend.production, ...skills.frontend.familiar],
  backend: [...skills.backend.production, ...skills.backend.familiar],
  tools: [...skills.tools.production, ...skills.tools.familiar],
  core: [...skills.core.production, ...skills.core.familiar],
};
