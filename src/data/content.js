export const content = {
  name: 'Joshua Bacay',
  role: 'Software Engineer',
  tagline: 'I build fast, expressive web experiences with a little feeling in the details.',
  location: 'Puerto Princesa City, Palawan, Philippines',
  email: 'hello@joshuarizal.dev', // Replace with Joshua’s preferred contact email.
  copy: {
    nav: { start: 'Start', about: 'About', skills: 'Skills', work: 'Work', path: 'Path', talk: 'Let’s talk', menu: 'MENU', close: 'CLOSE', themeLight: 'LIGHT MODE', themeDark: 'DARK MODE' },
    hero: { stamp: 'PORTFOLIO / 2025—26', availability: 'AVAILABLE FOR SELECT WORK', kicker: 'INDEPENDENT DEVELOPER', roleLabel: 'ROLE / 01', viewWork: 'View work', contact: 'Contact', scrollCue: 'SCROLL TO SCRUB' },
    about: { index: '01', eyebrow: 'A LITTLE CONTEXT', title: 'Built with intent.', note: 'A little engineering. A little instinct. Always the right amount of care.', fieldNotes: 'FIELD NOTES / 001', manifestoFirst: 'Engineer by training.', manifestoSecond: 'Creative by instinct.', basedIn: 'BASED IN', region: 'PALAWAN', coordinates: '09° 44′ N · 118° 44′ E', currentlyInto: 'CURRENTLY INTO', interests: ['Front-end craft', 'Practical systems', 'Motion'] },
    skills: { index: '02', eyebrow: 'THE TOOLKIT', title: 'A flexible stack.', note: 'Comfortable moving from a first sketch to the last thoughtful detail.', intro: 'Tools are only the start. The useful part is knowing when to use them.' },
    projects: { index: '03', eyebrow: 'SELECTED CONCEPT STUDIES', title: 'Designed for real needs.', note: 'Concept work exploring clear flows, useful systems, and maintainable builds.', conceptFrame: 'CONCEPT STUDY', designStudy: 'DESIGN APPROACH', liveLink: 'Live demo', githubLink: 'Source code', viewDetails: 'Explore the concept', explore: 'USE PREV / NEXT OR SWIPE TO BROWSE', frames: 'PROJECTS', carouselLabel: 'Selected project carousel', previous: 'PREV', next: 'NEXT', previousLabel: 'Go to previous project', nextLabel: 'Go to next project', chooseProject: 'Choose a project', showProject: 'Go to project' },
    projectDetail: { eyebrow: 'INDEPENDENT CONCEPT STUDY', pageLabel: 'PROJECT', overview: 'Problem & approach', category: 'Category', role: 'Role', builtWith: 'Built with', placeholderBadge: 'CONCEPT STUDY · NOT A CLIENT CASE STUDY', placeholderNote: 'This is an independent concept, not a commissioned client project. No business results or performance metrics are claimed.', backToProjects: 'Back to all projects', projectPagesLabel: 'Project pages', previous: 'Previous project', next: 'Next project', notFoundTitle: 'Project not found.', notFoundMessage: 'That project page is not available. Return to the portfolio to browse the current concepts.', returnToPortfolio: 'Return to portfolio' },
    experience: { index: '04', eyebrow: 'THE TIMELINE', title: 'Good work, in layers.', note: 'A few chapters that shaped the way I approach the work.', period: '2019 — NOW / PH', line: 'Curiosity became craft. The craft keeps getting sharper.', city: 'PUERTO PRINCESA CITY', country: 'PALAWAN, PHILIPPINES' },
    contact: {
      index: '05', eyebrow: 'LET’S TALK BUSINESS', titleFirst: 'Let’s solve', titleSecond: 'the right thing.',
      prompt: 'Tell me who the product is for, what is getting in the way, and what a good result would look like. We can start with a clear, no-pressure conversation.',
      directLine: 'CONTACT EMAIL', elsewhere: 'ELSEWHERE', availabilityLabel: 'AVAILABILITY',
      locationLabel: 'BASED IN', timeZoneLabel: 'LOCAL TIME', timeZone: 'PHT · UTC+8',
      workFocusLabel: 'GOOD FIT FOR', workFocus: ['Web systems', 'Interface craft', 'Motion details'],
      formHeading: 'START WITH A SHORT BRIEF', formStatus: 'PRIVATE · LOCAL DRAFT',
      name: 'Name', email: 'Email', message: 'Project / message',
      namePlaceholder: 'Your name', emailPlaceholder: 'you@example.com',
      messagePlaceholder: 'A goal, question, timeline or collaboration idea…',
      send: 'Review your note', formFootnote: 'Your note stays in this browser. Nothing is sent until you open your email app and press Send.',
      successTitle: 'Your email draft is ready.', successMessage: 'Review it in your email app before sending. Nothing has been sent or stored by this site.',
      openEmail: 'Open email draft', writeAnother: 'Edit note', copyEmail: 'Copy email',
      emailCopied: 'Copied', copyUnavailable: 'Use email link'
    },
    footer: { shortLocation: 'PALAWAN, PH', backToTop: 'BACK TO TOP', timeZone: 'PHT', credit: 'DESIGNED IN THE MOMENT. BUILT TO LAST.', endline: 'BUILT WITH CURIOSITY × CARE', portfolio: 'PORTFOLIO / 001' }
  },
  intro: 'Engineer by training. Creative by instinct. I turn thoughtful ideas into clear, fast, human-friendly digital experiences.',
  about: [
    'I’m an Information Technology graduate from Palawan State University, based in Puerto Princesa City, Palawan. My work lives where solid engineering meets a strong sense of visual rhythm.',
    'From building for the web to troubleshooting a stubborn problem, I bring curiosity and calm focus to the details. I value good teamwork, thoughtful time management, and staying steady when the pressure is on.'
  ],
  stats: [
    { value: 'IT', label: 'Information Technology graduate · Palawan State University' },
    { value: '05', label: 'Independent concept studies in this portfolio' },
    { value: 'PH', label: 'Based in Puerto Princesa City, Palawan' }
  ],
  skills: [
    { group: 'Frontend', number: '01', items: ['React', 'Vite', 'JavaScript', 'TypeScript', 'HTML / CSS'] },
    { group: 'Backend', number: '02', items: ['Django', 'Supabase', 'REST APIs'] },
    { group: 'Tools', number: '03', items: ['Git', 'GitHub', 'VS Code'] },
    { group: 'Design / Motion', number: '04', items: ['Three.js', 'anime.js', 'Figma'] }
  ],
  technologyIcons: {
    React: ['react-original'],
    Vite: ['vitejs-plain'],
    JavaScript: ['javascript-plain'],
    TypeScript: ['typescript-plain'],
    'HTML / CSS': ['html5-plain', 'css3-plain'],
    HTML: ['html5-plain'],
    CSS: ['css3-plain'],
    Django: ['django-plain'],
    Supabase: ['supabase-plain'],
    Git: ['git-plain'],
    GitHub: ['github-original'],
    'VS Code': ['vscode-plain'],
    'Three.js': ['threejs-original'],
    Python: ['python-plain'],
    Figma: ['figma-plain']
  },
  projects: [
    {
      number: '01',
      slug: 'daily-ritual',
      title: 'Daily Ritual',
      category: 'SERVICE SYSTEM',
      role: 'Full-stack concept',
      description: 'A warm, streamlined coffee shop web system with a dedicated employee portal for the daily moving parts.',
      stack: ['React', 'Django', 'CSS'],
      theme: 'coffee',
      live: null,
      github: null
    },
    {
      number: '02',
      slug: 'open-road',
      title: 'Open Road',
      category: 'BOOKING PLATFORM',
      role: 'Backend + interface',
      description: 'A booking experience for cars and motorcycles, shaped around a clear journey from browsing to reservation.',
      stack: ['Django', 'Python', 'JavaScript'],
      theme: 'road',
      live: null,
      github: null
    },
    {
      number: '03',
      slug: 'counterpoint',
      title: 'Counterpoint',
      category: 'POINT OF SALE',
      role: 'System development',
      description: 'A practical point-of-sale concept connecting a Django workflow with Supabase-backed data.',
      stack: ['Django', 'Supabase', 'JavaScript'],
      theme: 'counter',
      live: null,
      github: null
    },
    {
      number: '04',
      slug: 'recall-club',
      title: 'Recall Club',
      category: 'LEARNING TOOL',
      role: 'Product + frontend',
      description: 'A gamified reviewer for turning study sessions into small wins, visible progress, and better recall.',
      stack: ['React', 'Vite', 'CSS'],
      theme: 'recall',
      live: null,
      github: null
    },
    {
      number: '05',
      slug: 'maison-noire',
      title: 'Maison Noire',
      category: 'E-COMMERCE CONCEPT',
      role: 'Design + frontend',
      description: 'A quiet luxury storefront concept where typography, generous space, and product storytelling lead.',
      stack: ['React', 'Figma', 'Motion'],
      theme: 'maison',
      live: null,
      github: null
    }
  ],
  experience: [
    {
      date: 'ADD DATES',
      title: 'Web Development OJT',
      organization: 'Palawan State University',
      description: 'Applied web development practice in a university setting, collaborating on digital tools and building confidence across the product cycle.'
    },
    {
      date: 'ADD DATES',
      title: 'Administrative & Customer Service',
      organization: 'Professional experience',
      description: 'Supported people and day-to-day operations through clear communication, careful coordination, and calm problem-solving.'
    },
    {
      date: '2019 — 2024',
      title: 'Freelance Design & Web Work',
      organization: 'Independent',
      description: 'Worked across visual design and web projects, bringing practical implementation and an eye for detail to each brief.'
    }
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/andriod-na-snail' }
  ],
  footerCredit: 'Independent by nature. Collaborative by choice.'
}
