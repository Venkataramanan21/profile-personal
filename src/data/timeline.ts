import { achievements } from './achievements';
import { experience } from './experience';
import { projects } from './projects';
import type { TimelineCategory, TimelineItem } from '../types/timeline';

function toHash(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h << 5) - h + id.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(16).slice(0, 7).padStart(7, '0');
}

function branchForCategory(category: TimelineCategory, company?: string): string {
  if (category === 'work' && company) {
    const slug = company.toLowerCase().replace(/\s+/g, '-');
    return `main/${slug}`;
  }
  if (category === 'project') return 'feature/projects';
  return 'tag/recognition';
}

const workItems: TimelineItem[] = experience.map((exp, index) => ({
  id: exp.id,
  hash: toHash(exp.id),
  branch: branchForCategory('work', exp.company),
  category: 'work' as const,
  title: exp.role,
  subtitle: exp.company,
  date: exp.date,
  location: exp.location,
  description: exp.description,
  tags: exp.tech,
  sortOrder: index === 0 ? 100 : 70,
}));

const projectItems: TimelineItem[] = projects.map((project, index) => ({
  id: project.id,
  hash: toHash(project.id),
  branch: branchForCategory('project'),
  category: 'project' as const,
  title: project.title,
  subtitle: project.category,
  date: project.impact,
  description: [project.summary],
  tags: project.tags,
  projectSlug: project.slug,
  sortOrder: 85 - index * 3,
}));

const milestoneItems: TimelineItem[] = achievements.map((ach, index) => ({
  id: ach.id,
  hash: toHash(ach.id),
  branch: branchForCategory('milestone'),
  category: 'milestone' as const,
  title: ach.title,
  subtitle: ach.date,
  date: ach.date,
  description: [ach.description],
  sortOrder: 90 - index * 5,
}));

export const timelineItems: TimelineItem[] = [
  ...workItems,
  ...projectItems,
  ...milestoneItems,
].sort((a, b) => b.sortOrder - a.sortOrder);

export const categoryStyles: Record<
  TimelineCategory,
  {
    label: string;
    dot: string;
    dotRing: string;
    line: string;
    branchBadge: string;
    categoryBadge: string;
    tag: string;
    cardAccent: string;
  }
> = {
  work: {
    label: 'work',
    dot: 'bg-teal-500',
    dotRing: 'ring-teal-200 dark:ring-teal-900',
    line: 'bg-teal-400/70',
    branchBadge:
      'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-700',
    categoryBadge:
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300',
    tag: 'bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800',
    cardAccent: 'border-l-teal-500',
  },
  project: {
    label: 'project',
    dot: 'bg-violet-500',
    dotRing: 'ring-violet-200 dark:ring-violet-900',
    line: 'bg-violet-400/70',
    branchBadge:
      'bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-700',
    categoryBadge:
      'bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300',
    tag: 'bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800',
    cardAccent: 'border-l-violet-500',
  },
  milestone: {
    label: 'milestone',
    dot: 'bg-amber-500',
    dotRing: 'ring-amber-200 dark:ring-amber-900',
    line: 'bg-amber-400/70',
    branchBadge:
      'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700',
    categoryBadge:
      'bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300',
    tag: 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    cardAccent: 'border-l-amber-500',
  },
};

export const branchColors: Record<string, string> = {
  'main/zoho': 'text-teal-600 dark:text-teal-400',
  'main/infosys': 'text-blue-600 dark:text-blue-400',
  'feature/projects': 'text-violet-600 dark:text-violet-400',
  'tag/recognition': 'text-amber-600 dark:text-amber-400',
};
