export interface CaseStudySection {
  title: string;
  body: string | string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  impact: string;
  summary: string;
  tags: string[];
  flagship?: boolean;
  hook: string;
  context: string;
  constraints: string[];
  role: string;
  approach: string[];
  tradeoffs: string[];
  results: string[];
  learnings: string[];
  talkingPoints: string[];
  diagram?: string;
}
