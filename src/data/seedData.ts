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
  email: "contact@yourdomain.com",
  phone: "+1 (555) 019-2834",
  whatsapp: "+1 (555) 019-2834",
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
    qualification: "Bachelor of Science in Computer Science & Engineering",
    institution: "[University / Institute Name Placeholder]",
    subject: "Computer Science & Software Systems",
    startYear: 2018,
    endYear: 2022,
    grade: "First Class / High Distinction",
    description:
      "Core coursework in Data Structures, Algorithms, Distributed Systems, Database Management Systems, Computer Networks, and Software Architecture.",
    displayOrder: 1,
  },
  {
    qualification: "Advanced Web Engineering Certification",
    institution: "[Specialized Technical Academy Placeholder]",
    subject: "Modern Full-Stack Systems & Cloud Deployment",
    startYear: 2022,
    endYear: 2023,
    description:
      "Focused practical research in real-time socket architectures, microservices containerization, and modern App Router patterns.",
    displayOrder: 2,
  },
];

export const defaultProjects: Project[] = [
  {
    title: "KRONOS // COMMERCE",
    slug: "kronos-commerce",
    subtitle: "High-Performance Modular Headless E-Commerce System",
    description:
      "[DEMO DATA - EXAMPLE PROJECT] A modern e-commerce application featuring dynamic inventory synchronization, multi-tier cart calculations, Stripe payments, and a bespoke brutalist design system.",
    overview:
      "Kronos was engineered to explore ultra-fast e-commerce shopping workflows without heavy third-party bloat. Built with Next.js App Router and MongoDB, it couples sub-second page transitions with robust transactional checkout reliability.",
    problem:
      "Traditional online retail platforms often suffer from slow server-side response times, fragmented inventory state between client and backend, and visually interchangeable generic templates.",
    goals:
      "Establish an editorial-driven shopping experience with instant client-side cart updates, secure checkout pipelines, and full inventory management backed by MongoDB transactions.",
    features: [
      "Optimistic cart state manipulation with server synchronization",
      "Stripe payment gateway integration with webhook validation",
      "Categorized catalog filtering with dynamic URL query reflection",
      "Admin order dispatch dashboard and live inventory controls",
      "Editorial product zoom gallery with high-res aspect framing",
    ],
    technologies: ["Next.js", "TypeScript", "MongoDB", "Mongoose", "Tailwind CSS", "Stripe API"],
    category: "E-Commerce",
    coverImage: "/images/project-kronos.svg",
    gallery: [
      "/images/project-kronos-1.svg",
      "/images/project-kronos-2.svg",
      "/images/project-kronos-3.svg",
      "/images/project-kronos-4.svg",
    ],
    role: "Lead Full-Stack Architect & UI Designer",
    developmentProcess:
      "Started with low-fidelity editorial wireframes in Figma, translated the design tokens into Tailwind CSS, implemented MongoDB schemas with compound indexes, and deployed edge-cached routes via Next.js.",
    challenges:
      "Handling real-time race conditions when multiple users attempt to purchase low-stock inventory simultaneously.",
    solutions:
      "Implemented MongoDB atomic condition updates (`$inc` with stock guard checks) paired with idempotent payment webhook processors.",
    lessonsLearned:
      "Optimistic UI updates deliver significant perceived speed improvements, but server-side rollback guards must be ironclad.",
    futurePlans:
      "Multi-currency automatic conversion and localized regional warehouse delivery routing.",
    liveUrl: "https://example.com/demo-kronos",
    githubUrl: "https://github.com/example/kronos-commerce",
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    title: "PULSE // TASK ENGINE",
    slug: "pulse-task-engine",
    subtitle: "Keyboard-First Asynchronous Project & Workflow Manager",
    description:
      "[DEMO DATA - EXAMPLE PROJECT] A high-velocity task management and productivity application designed for creative studios, incorporating real-time kanban boards and keyboard command palettes.",
    overview:
      "Pulse delivers a zero-friction workflow manager for teams that prioritize keyboard velocity over complex nesting. Features interactive kanban columns, markdown note attachments, and automated state transitions.",
    problem:
      "Most enterprise task software is encumbered by slow UI re-renders, convoluted configuration menus, and poor offline resiliency.",
    goals:
      "Build a focused, editorial task cockpit that operates at 60 FPS, supports keyboard navigation shortcuts, and maintains state continuity across distributed collaborators.",
    features: [
      "Drag-and-drop Kanban workflow columns with optimistic positioning",
      "Global command palette (Cmd+K) for instant item discovery and actions",
      "Real-time update broadcast using event streams",
      "Granular project tagging, priority flags, and time tracking logs",
      "Comprehensive team audit history and revision snapshots",
    ],
    technologies: ["React", "Next.js", "Node.js", "Express.js", "MongoDB", "Framer Motion"],
    category: "Productivity",
    coverImage: "/images/project-pulse.svg",
    gallery: [
      "/images/project-pulse-1.svg",
      "/images/project-pulse-2.svg",
      "/images/project-pulse-3.svg",
      "/images/project-pulse-4.svg",
    ],
    role: "Full Stack Engineer",
    developmentProcess:
      "Architected the relational document references in MongoDB, built custom drag-drop primitives with Framer Motion, and engineered keyboard event traps for desktop-grade fluidity.",
    challenges:
      "Maintaining fluid 60fps animations during complex board re-order operations with dozens of nested tasks.",
    solutions:
      "Separated UI position state from server persistence payloads, batching backend synchronization via debounced server mutations.",
    lessonsLearned:
      "Prioritizing keyboard accessibility dramatically benefits power users and improves overall DOM semantic hygiene.",
    futurePlans:
      "Offline sync via Service Worker IndexedDB cache and bi-directional GitHub Issue synchronization.",
    liveUrl: "https://example.com/demo-pulse",
    githubUrl: "https://github.com/example/pulse-task-engine",
    featured: true,
    published: true,
    displayOrder: 2,
  },
  {
    title: "SYNTAX // CREATIVE CMS",
    slug: "syntax-creative-cms",
    subtitle: "Editorial Content Platform & Visual Analytics Cockpit",
    description:
      "[DEMO DATA - EXAMPLE PROJECT] An editorial publishing platform and analytics dashboard built for independent writers, art directors, and design-led media studios.",
    overview:
      "Syntax reimagines web publishing by marrying magazine-grade typography with live content performance telemetry. Includes markdown live previewing, asset management, and reader engagement metrics.",
    problem:
      "Modern content platforms force creative publications into standardized rigid column formats that strip away editorial individuality.",
    goals:
      "Create a dynamic digital publication platform offering customizable typography grids, rich media framing, and private self-hosted content ownership.",
    features: [
      "Custom block-based editorial editor with live typography scaling",
      "Reader heatmaps, scroll-depth analytics, and read-ratio tracking",
      "Role-based editorial approval workflows and scheduled publishing",
      "Automated Open Graph cover generation and dynamic social previews",
      "Multi-tenant asset library with automated Sharp image optimization",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Sharp", "Lucide React"],
    category: "Dashboard & CMS",
    coverImage: "/images/project-syntax.svg",
    gallery: [
      "/images/project-syntax-1.svg",
      "/images/project-syntax-2.svg",
      "/images/project-syntax-3.svg",
      "/images/project-syntax-4.svg",
    ],
    role: "Creator & System Architect",
    developmentProcess:
      "Conceptualized the visual language around Swiss and brutalist editorial traditions. Implemented custom Mongoose schemas with draft versioning, and built real-time SVG charting for the admin analytics cockpit.",
    challenges:
      "Dynamically computing reading time and generating server-rendered typography without layout shift.",
    solutions:
      "Pre-calculated content AST trees on save, pre-rendering typography metrics at build and edge-cache time.",
    lessonsLearned:
      "Editorial aesthetics and strict accessibility standards can coexist harmoniously with deliberate contrast and focus ring tokens.",
    futurePlans:
      "ActivityPub / Fediverse distribution protocol integration for decentralized publishing.",
    liveUrl: "https://example.com/demo-syntax",
    githubUrl: "https://github.com/example/syntax-creative-cms",
    featured: true,
    published: true,
    displayOrder: 3,
  },
];

