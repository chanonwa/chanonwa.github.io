// Edit this file to update the whole site.

export type Job = {
  period: string;
  /** Short employer name used on the career chart. */
  short: string;
  /** Years used to place the role on the career chart. A role with start equal to end is drawn as a dot. */
  start: number;
  end: number;
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
  /** Small label shown on the card, for example "In progress". */
  status?: string;
  /** Extra screenshots, shown as thumbnails under the details. Each opens full size in a new tab. */
  gallery?: { src: string; caption: string }[];
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
    'Business Intelligence Consultant Manager with 8+ years of experience, including 4 years in data at LINE Thailand, the messaging application, covering pricing, user segmentation and revenue forecasting, and 4 years as a business analyst at Detecon, a German IT consultancy specializing in telecommunications.',
  status: 'MSc Business Analytics, Bayes Business School',
  email: 'cwasusopon@gmail.com',
  github: 'https://github.com/chanonwa',
  linkedin: 'https://www.linkedin.com/in/chanon-wasusopon/',
};

export const experience: Job[] = [
  {
    period: '2021 – 2025',
    short: 'LINE Thailand',
    start: 2021,
    end: 2025,
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
    short: 'Detecon',
    start: 2017,
    end: 2021,
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
    short: 'Atos',
    start: 2017,
    end: 2017,
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
    short: 'WorkVenture',
    start: 2016,
    end: 2016,
    title: 'Marketing Intern',
    company: 'WorkVenture Technologies Co., Ltd.',
    location: 'Bangkok, Thailand',
    points: [
      'Benchmarked advertising products across traditional and digital markets to optimize marketing spend and maximize ROI.',
    ],
  },
];

// The "Key results" tiles at the top of Experience are drawn from the roles above. Each shows its `stat` (the big number).
export const highlights: Project[] = [
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
    stat: { value: '3', label: 'key indicators for flagging accounts' },
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
    stat: { value: 'Nationwide', label: 'signal-quality survey, all providers' },
    variant: 'c',
  },
];

// Personal projects. Each can have an `image` (in public/projects/), a `liveUrl` and a `sourceUrl`.
// A project with an `image` shows it at the top of its card; otherwise the `stat` is shown there.
export const projects: Project[] = [
  {
    name: 'HongDee',
    summary: 'Apartment and hostel management in one data model, with built-in analytics.',
    tags: ['Python', 'FastAPI', 'SQLAlchemy', 'Property analytics'],
    role: 'Personal project',
    year: '2026',
    description:
      'A working draft of a property management system that covers long-stay lettings (apartments, leases, monthly rent) and short-stay hostel trading (dorms, beds, nightly bookings). Both settle into a single invoice and payment ledger, which makes portfolio-wide analytics possible.',
    highlights: [
      'Analytics for occupancy, monthly recurring rent, collection rate, aged debt, ADR, RevPAR, channel mix and net operating income per property.',
      'A rule-based advisor that names the empty units, under-market rents, overdue accounts and stale repairs costing money right now.',
      'FastAPI and SQLAlchemy backend with JWT login, four user roles and 29 end-to-end API tests.',
      'Seeded with a demo portfolio of 3 properties, 46 units and 14 months of history.',
    ],
    image: '/projects/hongdee-dashboard.png',
    status: 'In progress',
    gallery: [
      { src: '/projects/hongdee-dashboard.png', caption: 'Dashboard' },
      { src: '/projects/hongdee-frontdesk.png', caption: 'Front desk' },
      { src: '/projects/hongdee-analytics.png', caption: 'Analytics' },
    ],
    sourceUrl: 'https://github.com/chanonwa/hongdee',
    variant: 'a',
  },
  // Placeholder. When the project is ready, replace this entry with its real description,
  // highlights, an `image` and a `sourceUrl`.
  {
    name: 'Expense tracker',
    summary: 'A simple app for recording personal expenses and keeping to a monthly budget.',
    tags: ['Personal finance', 'Budgeting', 'Spending analysis'],
    role: 'Personal project',
    year: '2026',
    description:
      'A personal expense tracker: record each expense with an amount, category, date and note, see spending by category and over time, and set monthly budgets. The project is being set up, and the details and source link will be added here once it is ready.',
    highlights: [],
    stat: { value: 'Budget', label: 'spending by category and over time' },
    status: 'In progress',
    variant: 'b',
  },
  // Placeholder with only the basics. Add the approach, results, tools, year, an `image` and a `sourceUrl`
  // (for example the Kaggle notebook or a GitHub repo) when you have them.
  {
    name: 'Customer churn prediction',
    summary: 'Predicting which customers are likely to leave, using a public customer churn dataset from Kaggle.',
    tags: ['Machine learning', 'Classification', 'Customer retention', 'Kaggle'],
    role: 'Personal project',
    year: '',
    description:
      'A customer churn prediction project built on a public dataset from Kaggle. The approach and results will be added here.',
    highlights: [],
    stat: { value: 'Kaggle', label: 'customer churn prediction' },
    status: 'In progress',
    variant: 'c',
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Programming',
    items: ['Python', 'SQL', 'R', 'Visual Basic for Applications', 'JSON', 'Java', 'Bash', 'PHP', 'HTML'],
  },
  { group: 'BI tools', items: ['Confluence', 'Datalore', 'Redash', 'Tableau'] },
  { group: 'Languages', items: ['Thai (Native)', 'English (Advanced)', 'Chinese (Basic)'] },
];
