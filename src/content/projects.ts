import type { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: 'proj-1',
    slug: 'ats-performance-overhaul',
    title: 'ATS Performance Overhaul',
    category: 'Performance Optimization',
    impact: '98.8% Latency Reduction',
    summary:
      'Engineered a massive reduction in page load time from 25s to 300ms for data-intensive pages via pagination.',
    tags: ['Performance', 'Pagination', 'Optimization', 'Java', 'React', 'SQL'],
    flagship: true,
    hook: 'Cut data-heavy page load from 25s to 300ms through pagination and query discipline.',
    context:
      'An applicant-tracking product surface loaded large record sets in a single request, causing multi-second waits and poor usability for recruiters reviewing high-volume pipelines.',
    constraints: [
      'Large datasets without degrading search or filter behavior',
      'Existing API contracts and shared components across teams',
      'Production stability — changes had to roll out incrementally',
    ],
    role: 'Full-stack owner for performance fixes across UI, API usage patterns, and data-fetch strategy.',
    approach: [
      'Profiled end-to-end latency and identified over-fetching as the primary bottleneck',
      'Introduced server-side pagination with bounded page sizes and stable sort keys',
      'Aligned frontend table/virtualization patterns with paginated APIs',
      'Added guardrails in code review for list endpoints (max page size, indexed filters)',
    ],
    tradeoffs: [
      'Chose paginated loads over full client-side caching — simpler ops and predictable memory',
      'Deferred real-time push updates in favor of explicit refresh for list views in v1',
    ],
    results: [
      'Page load reduced from ~25s to ~300ms on the heaviest views',
      'Improved recruiter workflow completion without architecture rewrites',
      'Established reusable patterns for other data-dense modules',
    ],
    learnings: [
      'Measure before optimizing — the bottleneck was data volume, not framework choice',
      'Pagination is a product decision as much as a technical one (page size, UX)',
    ],
    talkingPoints: [
      'How did you validate the 25s → 300ms improvement?',
      'How do you prevent regression on list endpoints?',
      'What would you do next for real-time or offline scenarios?',
    ],
    diagram: `flowchart LR
  user[User] --> ui[React_UI]
  ui -->|"page + pageSize"| api[REST_API]
  api --> db[(Database)]
  db --> api
  api --> ui`,
  },
  {
    id: 'proj-2',
    slug: 'legacy-jamstack-migration',
    title: 'Legacy to JAMstack Migration',
    category: 'Architecture',
    impact: 'Modernized Architecture',
    summary:
      'Executed a seamless migration from legacy CMS to a JAMstack micro-frontend architecture for a high-traffic B2C eCommerce platform.',
    tags: ['JAMstack', 'Micro-Frontend', 'React', 'Redux Toolkit'],
    hook: 'Migrated a legacy CMS stack to JAMstack micro-frontends without disrupting peak retail traffic.',
    context:
      'A B2C retail platform relied on a monolithic CMS for marketing and product landing experiences. Releases were slow, coupling was high, and front-end teams needed independent deploy paths.',
    constraints: [
      'Zero-downtime expectations during peak campaigns',
      'SEO and performance budgets for landing pages',
      'Mixed skill levels across vendor and internal teams',
    ],
    role: 'Senior front-end engineer — config-driven UI, state management, and migration sequencing.',
    approach: [
      'Strangler pattern: new JAMstack routes alongside legacy until parity',
      'Micro-frontend boundaries aligned to business domains (campaign, product, checkout-adjacent content)',
      'Config-driven UI so marketing could adjust layouts without redeploying code',
      'Redux Toolkit store for predictable data flow on high-traffic pages',
    ],
    tradeoffs: [
      'More moving parts in build/deploy vs. single CMS publish — traded for team autonomy',
      'Shared design system enforced at component level to avoid visual drift',
    ],
    results: [
      'Modernized delivery model with faster iteration on landing experiences',
      'Improved testability via component-level unit tests (React Testing Library)',
      'Mentored junior developers on patterns and testing standards',
    ],
    learnings: [
      'Migration success is as much about governance and contracts as technology',
      'Config-driven UI pays off only with validation and schema discipline',
    ],
    talkingPoints: [
      'How did you slice micro-frontend boundaries?',
      'How did config-driven UI reduce release risk?',
      'What testing strategy did you use during migration?',
    ],
    diagram: `flowchart TB
  subgraph legacy [Legacy_CMS]
    aem[Monolithic_Pages]
  end
  subgraph modern [JAMstack_MFE]
    mfe1[Campaign_MFE]
    mfe2[Product_MFE]
    shared[Shared_Design_System]
  end
  aem -->|"strangler"| mfe1
  aem --> mfe2
  mfe1 --> shared
  mfe2 --> shared`,
  },
  {
    id: 'proj-3',
    slug: 'ai-native-workflow-integration',
    title: 'AI-Native Workflow Integration',
    category: 'Developer Experience',
    impact: 'Accelerated Release',
    summary:
      'Led adoption of GitHub Copilot and AI-native tools to accelerate sprint velocity while keeping code review quality high.',
    tags: ['AI Tools', 'Cursor', 'GitHub Copilot', 'Developer Experience'],
    hook: 'Scaled AI-assisted development with guardrails — speed without sacrificing review standards.',
    context:
      'Teams wanted faster delivery on repetitive boilerplate and test scaffolding, but leadership needed confidence that AI output would not weaken security or maintainability.',
    constraints: [
      'Enterprise compliance and code-review requirements',
      'Mixed experience levels with AI tooling',
      'No substitute for domain knowledge on business-critical paths',
    ],
    role: 'Champion and practitioner — pilots, guidelines, and hands-on integration in daily workflow.',
    approach: [
      'Piloted Copilot on bounded tasks (tests, types, docs) before wider rollout',
      'Documented prompts and review checklist for AI-generated diffs',
      'Integrated Cursor for refactors and exploration with human-in-the-loop review',
      'Paired mentoring so juniors learned to verify, not paste, AI suggestions',
    ],
    tradeoffs: [
      'Slower initial adoption vs. immediate blanket usage — reduced bad-merge risk',
      'AI for acceleration, not architecture decisions on greenfield modules',
    ],
    results: [
      'Faster iteration on boilerplate and test coverage',
      'Consistent team habits around reviewing AI-assisted PRs',
      'Maintained security and style standards through explicit checklists',
    ],
    learnings: [
      'AI multiplies engineers who already have clear standards',
      'Review discipline matters more as generation speed increases',
    ],
    talkingPoints: [
      'How do you review AI-generated code differently?',
      'Where do you refuse to use AI assistance?',
      'How did you measure productivity without gaming metrics?',
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectCategories = [
  'All',
  ...Array.from(new Set(projects.map((p) => p.category))),
] as const;
