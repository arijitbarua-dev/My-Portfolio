import { Profile, Skill, Education, Experience, Project } from "@/types";

export const defaultProfile: Profile = {
  name: "Arijit Barua Turza",
  slug: "portfolio-owner",
  designation: "Full Stack Engineer & Creative Developer",
  headline: "CRAFTING HIGH-IMPACT WEB EXPERIENCES WITH ARCHITECTURAL PRECISION.",
  introduction:
    "I am an independent developer focusing on production-grade web systems, resilient backends, and creative editorial user interfaces. Open for selected engineering contracts and full-time opportunities.",
  about:
    "My programming journey began with a curiosity for how complex systems translate into intuitive interfaces. Over the years, I've developed deep proficiency across both frontend and backend technologies—specializing in React, Next.js, Node.js, and MongoDB.\n\nI believe in clean architecture, strong typing, deliberate design systems, and building digital products that balance technical rigor with bold visual personality. When I'm not writing code, I explore typography, system architecture, open-source tooling, and algorithmic design.",
  location: "Available Worldwide (Remote / Hybrid)",
  portrait: "/images/person.jpg",
  resumeUrl: "/resume.pdf",
  email: "arijit.barua.turza@g.bracu.ac.bd",
  phone: "+88 01601712244",
  whatsapp: "+88 01601712244",
  availability: "Available for new projects & opportunities",
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/arijitbarua-dev", label: "github.com/arijitbarua-dev" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/arijit-barua-turza", label: "linkedin.com/in/arijit-barua-turza" },
    { platform: "Facebook", url: "https://www.facebook.com/arijit.barua.2024", label: "facebook.com/arijit.barua.2024" },
  ],
};

export const defaultSkills: Skill[] = [
  // 1. Frontend
  { name: "HTML5", category: "Frontend", icon: "Layout", image: "/images/html5.jpg", displayOrder: 1 },
  { name: "CSS3", category: "Frontend", icon: "Palette", image: "/images/css3.jpg", displayOrder: 2 },
  { name: "JavaScript", category: "Frontend", icon: "FileCode", image: "/images/javascript.jpg", displayOrder: 3 },
  { name: "TypeScript", category: "Frontend", icon: "Code2", image: "/images/typescript.jpg", displayOrder: 4 },
  { name: "React", category: "Frontend", icon: "Boxes", image: "/images/react.jpg", displayOrder: 5 },
  { name: "Next.js", category: "Frontend", icon: "Layers", displayOrder: 6 },
  { name: "Tailwind CSS", category: "Frontend", icon: "Palette", image: "/images/tailwind-css.jpg", displayOrder: 7 },

  // 2. Backend
  { name: "Node.js", category: "Backend", icon: "Server", image: "/images/node-js.jpg", displayOrder: 8 },
  { name: "Express.js", category: "Backend", icon: "Cpu", image: "/images/server.jpg", displayOrder: 9 },
  { name: "Python", category: "Backend", icon: "Terminal", image: "/images/python.jpg", displayOrder: 10 },
  { name: "REST APIs", category: "Backend", icon: "Network", displayOrder: 11 },

  // 3. Database
  { name: "MongoDB", category: "Database", icon: "Database", displayOrder: 12 },

  // 4. Tools
  { name: "VS Code", category: "Tools", icon: "Terminal", displayOrder: 13 },
  { name: "Git", category: "Tools", icon: "GitBranch", image: "/images/git.jpg", displayOrder: 14 },
  { name: "GitHub", category: "Tools", icon: "Github", image: "/images/github.jpg", displayOrder: 15 },
  { name: "npm", category: "Tools", icon: "Boxes", image: "/images/npm.jpg", displayOrder: 16 },

  // 5. Workflow
  { name: "Responsive Design", category: "Workflow", icon: "Layout", displayOrder: 17 },
  { name: "Component-Based Development", category: "Workflow", icon: "Boxes", image: "/images/component-based-development.jpg", displayOrder: 18 },
  { name: "RESTful API Integration", category: "Workflow", icon: "Network", displayOrder: 19 },
  { name: "Version Control", category: "Workflow", icon: "GitBranch", displayOrder: 20 },
  { name: "Debugging", category: "Workflow", icon: "Terminal", image: "/images/debug.jpg", displayOrder: 21 },
  { name: "AI-Assisted Development", category: "Workflow", icon: "Cpu", displayOrder: 22 },
];

export const defaultExperience: Experience[] = [
  {
    title: "Senior Full Stack Developer",
    company: "[Company Name Placeholder]",
    employmentType: "Full-Time",
    location: "Remote / Hybrid",
    startDate: "2023",
    endDate: "Present",
    current: true,
    description:
      "Leading full-stack development initiatives, architecting modular React & Next.js client systems, and orchestrating scalable backend microservices and databases.",
    achievements: [
      "Engineered high-throughput API endpoints reducing latency by 35%",
      "Spearheaded design token migration across enterprise web suites",
      "Mentored junior engineers in TypeScript and robust testing methodologies",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
    displayOrder: 1,
  },
  {
    title: "Frontend Software Engineer",
    company: "[Creative Agency Placeholder]",
    employmentType: "Full-Time",
    location: "On-site / Hybrid",
    startDate: "2021",
    endDate: "2023",
    current: false,
    description:
      "Constructed interactive, pixel-perfect digital experiences, bespoke e-commerce storefronts, and performance-tuned web applications for international clients.",
    achievements: [
      "Delivered 12+ production client web apps on schedule with 99+ Lighthouse performance scores",
      "Created reusable accessible UI component libraries reducing build times by 40%",
    ],
    technologies: ["React", "JavaScript", "REST APIs", "Tailwind CSS", "Framer Motion"],
    displayOrder: 2,
  },
];

export const defaultEducation: Education[] = [
  {
    qualification: "Undergraduate",
    institution: "BRAC University",
    subject: "Computer Science & Software Systems",
    startYear: 2022,
    endYear: 2026,
    grade: "Active",
    description:
      "Building a strong foundation in software engineering, data structures, algorithms, databases, and computer networks while exploring full-stack web development, AI integration, and scalable application design through hands-on projects.",
    displayOrder: 1,
  },
  // {
  //   qualification: "Advanced Web Engineering Certification",
  //   institution: "[Specialized Technical Academy Placeholder]",
  //   subject: "Modern Full-Stack Systems & Cloud Deployment",
  //   startYear: 2022,
  //   endYear: 2023,
  //   description:
  //     "Focused practical research in real-time socket architectures, microservices containerization, and modern App Router patterns.",
  //   displayOrder: 2,
  // },
];

export const defaultProjects: Project[] = [
  {
    title: "BAZARDOR",
    slug: "bazardor",
    subtitle: "Daily Commodity & Market Price Tracking Platform",
    description:
      "A comprehensive daily commodity price tracking application designed to monitor essential bazaar item rates, market fluctuations, and commodity updates with responsive accessibility.",
    overview:
      "BazarDor provides a reliable, streamlined platform for consumers and sellers to track fluctuating market commodity prices. Built with modern web technologies, it delivers up-to-date pricing data, search and categorization, and transparent price records.",
    problem:
      "Daily commodity and grocery prices fluctuate constantly, making it difficult for everyday shoppers to stay informed and budget accurately across different market segments.",
    goals:
      "Deliver a fast, responsive, and intuitive web application providing daily updated prices for essential bazaar goods, category filtering, and clean accessibility across mobile and desktop devices.",
    features: [
      "Daily commodity price updates and detailed catalog listings",
      "Categorized filtering across essentials, vegetables, meat, and grocery items",
      "Instant real-time search and item price lookups",
      "Mobile-first responsive layout optimized for on-the-go price checks",
      "Clean data presentation with clear units and price comparisons",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    category: "Web Application",
    coverImage: "/images/bazardor1.jpg",
    gallery: [
      "/images/bazardor2.jpg",
      "/images/bazardor3.jpg",
      "/images/bazardor4.jpg",
      "/images/bazardor5.jpg",
    ],
    role: "Full-Stack Developer & UI Designer",
    developmentProcess:
      "Engineered the application starting from interface wireframing to responsive component development, integrating dynamic price updates, and deploying to Vercel for fast edge delivery.",
    challenges:
      "Presenting dense commodity pricing data clearly on smaller mobile screens while maintaining high readability and fast loading speeds.",
    solutions:
      "Structured modular card components with compact data badges, intuitive category filters, and edge caching for sub-second page loads.",
    lessonsLearned:
      "Clean component hierarchy and deliberate typography significantly reduce cognitive load for users scanning frequent price updates.",
    futurePlans:
      "Historical price graph trends, multi-market comparison, and SMS/push price alert notifications.",
    liveUrl: "https://bazar-dor-app-phi.vercel.app/",
    githubUrl: "https://github.com/arijitbarua-dev/BazarDor",
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    title: "FITLOG",
    slug: "fitlog",
    subtitle: "Workout Logging & Fitness Progression Platform",
    description:
      "An intuitive fitness tracking and workout logging platform engineered to record exercises, monitor training routines, track progress over time, and help athletes stay consistent.",
    overview:
      "FitLog delivers a friction-free workout tracking application tailored for fitness enthusiasts and athletes. It enables users to record sets, reps, and weights, monitor workout history, and maintain training consistency with clean visual feedback.",
    problem:
      "Most generic workout apps are bloated with ads, complex paywalls, and slow input workflows that interrupt intense training sessions at the gym.",
    goals:
      "Create an ultra-clean, fast-loading workout companion that lets users log exercises in seconds, review workout history, and stay motivated.",
    features: [
      "Fast workout logging with set, rep, and weight inputs",
      "Exercise library with categorized movement tracking",
      "Training history and milestone progression overview",
      "Mobile-first responsive interface designed for gym sessions",
      "Visual progress feedback and workout consistency tracking",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    category: "Fitness & Health",
    coverImage: "/images/fitlog1.jpg",
    gallery: [
      "/images/fitlog2.jpg",
      "/images/fitlog3.jpg",
      "/images/fitlog4.jpg",
      "/images/fitlog5.jpg",
    ],
    role: "Frontend & Full-Stack Developer",
    developmentProcess:
      "Designed a minimalist aesthetic optimized for gym environments, implemented component state management for active workout tracking, and deployed to Vercel.",
    challenges:
      "Designing an input workflow simple enough to use between sets without disrupting exercise momentum.",
    solutions:
      "Utilized large touch targets, streamlined quick-increment controls, and persistent local caching to guarantee uninterrupted logging.",
    lessonsLearned:
      "User experience in fitness applications depends entirely on minimal friction during physical exertion.",
    futurePlans:
      "Custom workout routine templates, progress photo logs, and rest timer integration.",
    liveUrl: "https://fit-log-iota-seven.vercel.app/",
    githubUrl: "https://github.com/arijitbarua-dev/FitLog",
    featured: true,
    published: true,
    displayOrder: 2,
  },
  {
    title: "WANDERLUST",
    slug: "wanderlust",
    subtitle: "Full-Stack Travel Exploration & Destination Booking Platform",
    description:
      "A modern travel booking and destination discovery platform offering curated itineraries, real-time travel search, trip reservations, and comprehensive destination management.",
    overview:
      "WANDERLUST is an end-to-end travel exploration and booking web platform that connects travelers with curated destinations worldwide. Built with Next.js 16, React 19, Express 5, and MongoDB, the system features dynamic search filtering, user authentication, reservation management, and full administrative destination CRUD workflows.",
    problem:
      "Travel discovery and booking platforms are frequently cluttered with confusing navigation, opaque pricing, and fragmented booking processes that make vacation planning overwhelming and tedious.",
    goals:
      "Build an ultra-responsive, visually captivating travel portal that empowers users to explore world-class destinations, filter trips effortlessly by budget and group size, manage personal bookings, and administer listings with secure controls.",
    features: [
      "Curated destination showcase with high-resolution imagery and itinerary insights",
      "Multi-criteria travel search filtering by location, duration, budget, and group size",
      "End-to-end trip booking workflow with personal reservation tracking under My Bookings",
      "Secure authentication and session management powered by JWT and JOSE tokens",
      "Full CRUD destination administration with interactive modal editing and deletion",
      "Responsive mobile-first layout with smooth transitions, modern typography, and Base UI primitives",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Vercel",
    ],
    category: "Travel & Hospitality",
    coverImage: "/images/wanderlust1.jpg",
    gallery: [
      "/images/wanderlust2.jpg",
      "/images/wanderlust3.jpg",
      "/images/wanderlust4.jpg",
      "/images/wanderlust5.jpg",
    ],
    role: "Full-Stack Developer & UI Architect",
    developmentProcess:
      "Architected the full-stack system separating the client (Next.js 16 App Router, React 19, Tailwind CSS v4, Base UI) and server (Express 5 REST API, MongoDB native driver, JOSE token validation). Designed intuitive user flows for browsing destinations, booking trips, and managing listings before deploying both tiers to Vercel.",
    challenges:
      "Ensuring seamless coordination between the Next.js client-side state and Express REST endpoints, alongside maintaining responsive grid layouts with rich destination media without degrading page load speeds.",
    solutions:
      "Engineered modular React components with optimized image delivery, clean async data fetching patterns, and resilient REST API routes with secure token-based authorization and schema validations.",
    lessonsLearned:
      "Building a travel platform highlights how critical typography, visual hierarchy, and frictionless booking feedback loops are in keeping travelers engaged and confident in their choices.",
    futurePlans:
      "Interactive map integration, integrated payment gateway processing, real-time destination weather forecasts, and community user review systems.",
    liveUrl: "https://wanderlust-ten-dun.vercel.app/",
    githubUrl: "https://github.com/arijitbarua-dev/WANDERLUST",
    featured: true,
    published: true,
    displayOrder: 3,
  },
];

