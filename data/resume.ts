// Edit this file to update the whole site.

export type Job = {
  period: string;
  title: string;
  company: string;
  location: string;
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
  /** Big number shown beside the details when there is no image. */
  stat?: { value: string; label: string };
  /** Path under /public, e.g. "/projects/one.png". When set it replaces the stat panel. */
  image?: string;
  liveUrl?: string;
  sourceUrl?: string;
  /** Gradient style for the closed card thumbnail. */
  variant?: 'a' | 'b' | 'c';
};

export const profile = {
  name: 'Chanon Wasusopon',
  handle: 'chanon-wasusopon',
  headline: 'Business intelligence, from SQL to strategy.',
  intro:
    'Business Intelligence Consultant Manager with four years at LINE Thailand, covering pricing, user segmentation and revenue forecasting. Earlier, a business analyst on telecom projects at Detecon.',
  status: 'MSc Business Analytics, Bayes Business School',
  email: 'cwasusopon@gmail.com',
  github: 'https://github.com/chanonwa',
  linkedin: 'https://www.linkedin.com/in/chanon-wasusopon/',
};

export const experience: Job[] = [
  {
    period: '2021 – 2025',
    title: 'Business Intelligence Consultant Manager',
    company: 'LINE Company (Thailand) Co., Ltd.',
    location: 'Bangkok, Thailand',
    points: [
      'Analyzed conversion, churn, campaign impact, purchase behavior and quarterly revenue forecasts for senior executives, supporting major business decisions.',
      'Led work with the strategy team on an optimized messaging pricing model: 20% year-over-year revenue increase with high client retention.',
      'Built 100+ SQL user segments from user logs, billing and demographic data: 70% adoption in two months, 15% uplift in annual revenue.',
      'Defined KPIs for B2C and B2B services with global PMO, Sales, Marketing and Engineering teams, and built automated reports for business units.',
      'Led workshops and coached junior analysts on data visualization and interpretation.',
    ],
  },
  {
    period: '2017 – 2021',
    title: 'Business Analyst',
    company: 'Detecon Asia-Pacific Ltd.',
    location: 'Bangkok, Thailand',
    points: [
      "Optimized network equipment acceptance for Thailand's largest communication service provider, on projects valued over THB 100 million (about GBP 2.3 million).",
      "Built and maintained a system to monitor and benchmark service quality for Thailand's telecom regulator, surveying signal quality nationwide for all providers.",
    ],
  },
  {
    period: '2017',
    title: 'Application Support Analyst, Trainee (SAP CS)',
    company: 'Atos IT Solutions and Services Limited',
    location: 'Bangkok, Thailand',
    points: [
      'Analyzed customer specifications and helped construct a project plan and solution.',
      'Supported and provided solutions to customer tickets daily concerning the SAP system.',
    ],
  },
  {
    period: '2016',
    title: 'Marketing Intern',
    company: 'WorkVenture Technologies Co., Ltd.',
    location: 'Bangkok, Thailand',
    points: [
      'Benchmarked advertising products across traditional and digital markets to optimize marketing spend and maximize ROI.',
    ],
  },
];

// The Projects cards are drawn from the experience above. Add an `image` (in public/projects/) to any card to show a photo instead of the big number.
export const projects: Project[] = [
  {
    name: 'Messaging pricing model',
    summary: 'Optimized pricing for the application messaging scheme, driving a 20% year-over-year revenue increase.',
    tags: ['Pricing', 'Strategy'],
    role: 'Business Intelligence Consultant Manager, LINE Thailand',
    year: '2021 – 2025',
    description:
      'Worked with the strategy team to develop an optimized pricing model for the application messaging scheme, using historical data.',
    highlights: [
      'Led the collaboration with the strategy team.',
      'Drove a 20% year-over-year revenue increase.',
      'Maintained high client retention.',
    ],
    stat: { value: '20%', label: 'year-over-year revenue increase' },
    variant: 'a',
  },
  {
    name: 'User segmentation',
    summary: 'More than 100 SQL-built user segments, adopted at 70% within two months.',
    tags: ['SQL', 'Segmentation'],
    role: 'Business Intelligence Consultant Manager, LINE Thailand',
    year: '2021 – 2025',
    description:
      'Built user segments from multiple data sources and services to capture end-user behavior patterns.',
    highlights: [
      'Combined user logs, billing transactions and demographic data.',
      'Reached a 70% adoption rate within the first two months.',
      'Drove a 15% uplift in annual revenue.',
    ],
    stat: { value: '70%', label: 'adoption within the first two months' },
    variant: 'b',
  },
  {
    name: 'Executive analysis and forecasting',
    summary: 'Complex analysis and quarterly revenue forecasts for senior executives.',
    tags: ['Forecasting', 'Executive reporting'],
    role: 'Business Intelligence Consultant Manager, LINE Thailand',
    year: '2021 – 2025',
    description:
      'Provided key insights to senior executives to support major business decisions and strategic optimization.',
    highlights: [
      'Conversion rate and churn patterns.',
      'Marketing campaign impact and internal service cannibalization.',
      'Purchase behavior and the quarterly revenue forecast.',
    ],
    stat: { value: 'Quarterly', label: 'revenue forecast for senior executives' },
    variant: 'c',
  },
  {
    name: 'Terms of Service breach detection',
    summary: 'Queries that flag accounts breaching the Terms of Service.',
    tags: ['Queries', 'Policy enforcement'],
    role: 'Business Intelligence Consultant Manager, LINE Thailand',
    year: '2021 – 2025',
    description:
      'Created queries to detect user accounts breaching the Terms of Service.',
    highlights: [
      'Identified illegal or suspicious accounts.',
      'Used messaging patterns, account age and naming conventions as key indicators.',
    ],
    stat: { value: '3', label: 'key indicators: messaging patterns, account age, naming conventions' },
    variant: 'a',
  },
  {
    name: 'Network equipment acceptance',
    summary: 'Modeled and optimized how all network equipment is accepted, on projects over THB 100 million.',
    tags: ['Telecom', 'Process design'],
    role: 'Business Analyst, Detecon',
    year: '2017 – 2021',
    description:
      "Provided solutions to projects for Thailand's largest communication service provider, focused on the acceptance process for all network equipment.",
    highlights: [
      'Modeled and optimized the acceptance process operations.',
      'Improved efficiency and quality using international and local industry practices.',
      'Projects valued over THB 100 million (about GBP 2.3 million).',
    ],
    stat: { value: 'THB 100M+', label: 'project value, about GBP 2.3 million' },
    variant: 'b',
  },
  {
    name: 'Telecom quality-of-service monitoring',
    summary: "An IT solution to monitor and benchmark service quality for Thailand's telecommunication regulator.",
    tags: ['Telecom', 'Data visualization'],
    role: 'Business Analyst, Detecon',
    year: '2017 – 2021',
    description:
      "Developed an IT solution to monitor and benchmark the quality of service for Thailand's telecommunication regulator.",
    highlights: [
      'Designed a new system architecture to survey signal quality across the country for all service providers.',
      'Conducted data visualization and analysis.',
      'Performed system maintenance and provided daily customer support.',
    ],
    stat: { value: 'Nationwide', label: 'signal-quality survey across all service providers' },
    variant: 'c',
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Programming',
    items: ['Python', 'SQL', 'R', 'Visual Basic for Application', 'JSON', 'Java', 'Bash', 'PHP', 'HTML'],
  },
  { group: 'BI tools', items: ['Confluence', 'Datalore', 'Redash', 'Tableau'] },
  { group: 'Languages', items: ['Thai (Native)', 'English (Advanced)', 'Chinese (Basic)'] },
];

export const education = [
  { degree: 'MSc Business Analytics', school: 'Bayes Business School, United Kingdom', period: '2025 – 2026' },
  {
    degree: 'BSc Computer Science (Upper second-class)',
    school: 'University of Essex, United Kingdom',
    period: '2013 – 2016',
  },
  {
    degree: 'International Baccalaureate Certificate',
    school: 'Concordian International School, Thailand',
    period: '2008 – 2013',
  },
];
