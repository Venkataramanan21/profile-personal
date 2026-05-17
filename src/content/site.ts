export const site = {
  name: 'Venkataramanan B',
  title: 'Full-Stack Developer',
  tagline:
    'Enterprise web · performance & reliability · Java, React & SQL · CI/CD and AI-assisted delivery',
  email: 'venkatbala214@gmail.com',
  resumeFileName: 'Venkataramanan Resume.pdf',
  flagshipSlug: 'ats-performance-overhaul',
  description:
    'Full-stack developer portfolio — case studies in performance, architecture, and developer experience. Zoho & Infosys experience.',
  url: 'https://venkataramanan21.github.io/profile-personal/',
} as const;

export const primaryNav = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'How I build', path: '/engineering' },
  { label: 'Resume', path: '/resume' },
  { label: 'Contact', path: '/contact' },
] as const;

export const footerNav = [
  ...primaryNav,
  { label: 'About', path: '/about' },
  { label: 'Lab', path: '/lab' },
  { label: 'Now', path: '/now' },
] as const;
