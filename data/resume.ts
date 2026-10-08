// Edit this file to update the whole site. Entries marked "placeholder" need your real details.

export type Job = {
  period: string;
  title: string;
  company: string;
  points: string[];
};

export type Project = {
  name: string;
  summary: string;
  tags: string[];
  role: string;
  year: string;
  description: string;
  highlights: string[];
  /** Path under /public, e.g. "/projects/one.png". Leave undefined to show a gradient placeholder. */
  image?: string;
  liveUrl?: string;
  sourceUrl?: string;
  /** Gradient style for the closed card thumbnail. */
  variant?: 'a' | 'b' | 'c';
};

export const profile = {
  name: 'Chanon Wasusopon',
  handle: 'chanon-wasusopon',
  headline: 'Software engineer who ships.',
  intro:
    'I build fast, accessible web apps with Node.js and TypeScript. Placeholder: replace this with a two-sentence introduction.',
  status: 'Open to new roles',
  email: 'cwasusopon@gmail.com',
  github: 'https://github.com/chanonwa',
  linkedin: 'https://www.linkedin.com/in/chanon-wasusopon/',
  resumePdf: '/resume.pdf', // Put your PDF at public/resume.pdf
};

export const experience: Job[] = [
  {
    period: '2023 — Present',
    title: 'Senior Software Engineer',
    company: 'Company Name (placeholder)',
    points: [
      'Led migration of a monolith to Node.js services, cutting p95 latency by 40%.',
      'Mentored four engineers and introduced CI checks that halved release time.',
    ],
  },
  {
    period: '2020 — 2023',
    title: 'Full-Stack Developer',
    company: 'Another Company (placeholder)',
    points: [
      'Built a customer dashboard in React and Express used by 20k monthly users.',
      'Designed the REST API and PostgreSQL schema.',
    ],
  },
];

export const projects: Project[] = [
  {
    name: 'Project One',
    summary: 'Short description of what it does and why it matters.',
    tags: ['Next.js', 'TypeScript'],
    role: 'Lead developer',
    year: '2024',
    description:
      'A longer description goes here: the problem, the approach, and the result in two or three sentences.',
    highlights: [
      'Built a realtime analytics dashboard used by 20k monthly users.',
      'Cut load time by 35% with caching and code splitting.',
      'Shipped with CI, tests and preview deployments.',
    ],
    liveUrl: '#projects',
    sourceUrl: '#projects',
    variant: 'a',
  },
  {
    name: 'Project Two',
    summary: 'Short description of what it does and why it matters.',
    tags: ['Node.js', 'PostgreSQL'],
    role: 'Backend engineer',
    year: '2023',
    description:
      'A longer description goes here: the problem, the approach, and the result in two or three sentences.',
    highlights: [
      'Designed a REST API that handles 5M requests per day.',
      'Modelled the PostgreSQL schema and migrations.',
      'Added rate limiting and structured logging.',
    ],
    liveUrl: '#projects',
    sourceUrl: '#projects',
    variant: 'b',
  },
  {
    name: 'Project Three',
    summary: 'Short description of what it does and why it matters.',
    tags: ['React', 'Tailwind'],
    role: 'Frontend engineer',
    year: '2022',
    description:
      'A longer description goes here: the problem, the approach, and the result in two or three sentences.',
    highlights: [
      'Rebuilt a design system shared across four product teams.',
      'Documented 40 components with usage examples.',
      'Reached WCAG AA contrast across both themes.',
    ],
    liveUrl: '#projects',
    sourceUrl: '#projects',
    variant: 'c',
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'SQL'] },
  { group: 'Frameworks', items: ['Next.js', 'React', 'Express', 'Tailwind CSS'] },
  { group: 'Tools', items: ['Git', 'Docker', 'GitHub Actions', 'Vercel'] },
];

export const education = [
  { degree: 'B.Eng. Computer Engineering', school: 'University Name (placeholder)', period: '2016 — 2020' },
];
