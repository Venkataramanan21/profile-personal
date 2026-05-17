export type TimelineCategory = 'work' | 'project' | 'milestone';

export interface TimelineItem {
  id: string;
  hash: string;
  branch: string;
  category: TimelineCategory;
  title: string;
  subtitle?: string;
  date: string;
  location?: string;
  description: string[];
  tags?: string[];
  sortOrder: number;
  /** When set, timeline entry title links to this case study */
  projectSlug?: string;
}

export interface CategoryStyle {
  dot: string;
  dotRing: string;
  line: string;
  branchBadge: string;
  categoryBadge: string;
  tag: string;
  cardAccent: string;
}
