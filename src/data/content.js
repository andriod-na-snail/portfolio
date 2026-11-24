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
    projects: { index: '03', eyebrow: 'SELECTED FRAMES', title: 'Work in progress.', note: 'Five concept placeholders. Swap in the real stories, details, and links when ready.', conceptFrame: 'CONCEPT FRAME', designStudy: 'DESIGN STUDY — REPLACE', liveLink: 'Live placeholder', githubLink: 'GitHub placeholder', viewDetails: 'View project details', explore: 'USE PREV / NEXT OR SWIPE TO BROWSE', frames: 'PROJECTS', carouselLabel: 'Selected project carousel', previous: 'PREV', next: 'NEXT', previousLabel: 'Go to previous project', nextLabel: 'Go to next project', chooseProject: 'Choose a project', showProject: 'Go to project' },
    projectDetail: { eyebrow: 'CONCEPT PROJECT / SAMPLE COPY', pageLabel: 'PROJECT', overview: 'Concept overview', category: 'Category', role: 'Role', builtWith: 'Built with', placeholderBadge: 'SAMPLE CONTENT — REPLACE BEFORE LAUNCH', placeholderNote: 'This is a sample concept page. Replace the story, outcomes, and links with verified project details before publication.', backToProjects: 'Back to all projects', projectPagesLabel: 'Project pages', previous: 'Previous project', next: 'Next project', notFoundTitle: 'Project not found.', notFoundMessage: 'That project page is not available. Return to the portfolio to browse the current concepts.', returnToPortfolio: 'Return to portfolio' },
    experience: { index: '04', eyebrow: 'THE TIMELINE', title: 'Good work, in layers.', note: 'A few chapters that shaped the way I approach the work.', period: '2019 — NOW / PH', line: 'Curiosity became craft. The craft keeps getting sharper.', city: 'PUERTO PRINCESA CITY', country: 'PALAWAN, PHILIPPINES' },
    contact: {
      index: '05', eyebrow: 'OPEN CHANNEL', titleFirst: 'Let’s work', titleSecond: 'together.',
      prompt: 'Have a project, a question or a collaboration in mind? Share a little context and I’ll take it from there.',
      directLine: 'CONTACT EMAIL', elsewhere: 'ELSEWHERE', availabilityLabel: 'AVAILABILITY',
      locationLabel: 'BASED IN', timeZoneLabel: 'LOCAL TIME', timeZone: 'PHT · UTC+8',
      workFocusLabel: 'GOOD FIT FOR', workFocus: ['Web systems', 'Interface craft', 'Motion details'],
      formHeading: 'SEND A PROJECT NOTE', formStatus: 'LOCAL PREVIEW · NO SERVER',
      name: 'Name', email: 'Email', message: 'Project / message',
      namePlaceholder: 'Your name', emailPlaceholder: 'you@example.com',
      messagePlaceholder: 'A goal, question, timeline or collaboration idea…',
      send: 'Preview note', formFootnote: 'This preview is not sent or stored. Use the email link above to reach me directly.',
      successTitle: 'Draft ready to review.', successMessage: 'This stays in the current tab only; nothing has been sent.',
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
    { value: 4, suffix: '+', label: 'Years exploring the web', placeholder: true },
    { value: 5, suffix: '+', label: 'Projects in the reel', placeholder: true },
    { value: 10, suffix: '', label: 'Tools in the kit', placeholder: true }
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
      live: 'https://example.com',
      github: 'https://github.com/'
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
      live: 'https://example.com',
      github: 'https://github.com/'
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
      live: 'https://example.com',
      github: 'https://github.com/'
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
      live: 'https://example.com',
      github: 'https://github.com/'
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
      live: 'https://example.com',
      github: 'https://github.com/'
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
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' }
  ],
  footerCredit: 'Independent by nature. Collaborative by choice.'
}
