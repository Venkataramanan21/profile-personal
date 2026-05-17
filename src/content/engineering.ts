export const engineeringPractices = [
  {
    id: 'testing',
    title: 'Testing',
    summary: 'Confidence through automated checks at the right layers.',
    details: [
      'Unit and integration tests with Jest and React Testing Library for UI behavior and regressions.',
      'Cypress for critical user journeys on high-traffic flows where end-to-end coverage adds the most value.',
      'Tests tied to acceptance criteria — especially during migrations and refactors.',
    ],
    tags: ['Jest', 'React Testing Library', 'Cypress'],
  },
  {
    id: 'cicd',
    title: 'CI/CD',
    summary: 'Fast feedback without sacrificing stability.',
    details: [
      'Unified branch testing so developers get signal earlier in the cycle.',
      'Pipeline optimizations that reduced resource use and improved feedback speed (reported ~5x faster loops in recent work).',
      'Treat failing builds as blocking — fix or revert before piling on changes.',
    ],
    tags: ['Jenkins', 'Git/GitHub', 'Docker'],
  },
  {
    id: 'quality',
    title: 'Code quality',
    summary: 'Structure that scales with the team.',
    details: [
      'Refactor redundant patterns into modular, reusable components (reported ~71% maintainability improvement on a large codebase).',
      'Design patterns where they clarify intent — not ceremony.',
      'Pagination, bounded APIs, and list-view guardrails to prevent performance regressions.',
    ],
    tags: ['Design Patterns', 'Modularization', 'Code Review'],
  },
  {
    id: 'ai',
    title: 'AI-assisted development',
    summary: 'Speed with standards, not shortcuts.',
    details: [
      'GitHub Copilot and Cursor for boilerplate, exploration, and refactors — always human-reviewed.',
      'Team guidelines for what to generate vs. hand-write, and how to review AI diffs.',
      'AI amplifies engineers with clear conventions; it does not replace domain judgment.',
    ],
    tags: ['GitHub Copilot', 'Cursor', 'Review Standards'],
  },
  {
    id: 'mentoring',
    title: 'Mentoring & collaboration',
    summary: 'Raise the bar as a team sport.',
    details: [
      'Mentored developers on React patterns, testing, and PR quality.',
      'Pair on complex changes; document decisions for async reviewers.',
      'Prefer small, reviewable changes over large surprise diffs.',
    ],
    tags: ['Mentoring', 'Agile/Scrum', 'PR Discipline'],
  },
];
