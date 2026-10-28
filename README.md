# EDITORIAL // Full-Stack Creative Developer Portfolio

> **A bold, minimal, editorial digital portfolio & case-study platform** crafted with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **MongoDB (Mongoose)**, and **Better-Auth**.
> Designed with agency-grade creative art direction: warm ivory cream canvas (`#FFFBEA`), brutalist offset shadows, heavy black borders (`#111111`), vivid orange (`#FF5722`) and lime-green (`#83E52B`) accents, and magazine-quality typography.

---

## ✦ Table of Contents
1. [Key Features](#-key-features)
2. [Technology Stack](#-technology-stack)
3. [Design System & Visual Language](#-design-system--visual-language)
4. [Project Structure](#-project-structure)
5. [Quick Start & Setup](#-quick-start--setup)
6. [Environment Variables](#-environment-variables)
7. [Database Seeder & Initial Admin](#-database-seeder--initial-admin)
8. [Admin CMS Dashboard](#-admin-cms-dashboard)
9. [Contact Form & Email Configuration](#-contact-form--email-configuration)
10. [Personalization: Replacing Demo Data](#-personalization-replacing-demo-data)
11. [Deploying to Vercel](#-deploying-to-vercel)

---

## ✦ Key Features

- **Editorial Creative Direction**: Inspired by premium Behance agency case studies, poster grids, folder tabs, and brutalist offset shadows.
- **Full App Router Architecture**: Built with Server Components for zero-bundle data fetching and Client Components only for interactions.
- **Resilient Fallback Data Layer**: Public pages never crash if MongoDB is temporarily connecting or offline—they fall back gracefully to structured demo data.
- **Interactive Pill Navigation**: Desktop pill navigation with scroll spy highlighting active sections in lime/orange; responsive mobile collapsible menu.
- **Dynamic Case-Study Detail Pages (`/projects/[slug]`)**: Complete case-study breakdown with problem statements, architectural goals, engineering challenges, solutions, retro lessons, and numbered gallery captures (`GALLERY 01`, `02`).
- **Protected Admin CMS (`/admin`)**: Fully secured with **Better-Auth** using server-side session guards and Next.js Server Actions for instant ISR cache revalidation.
- **Zod-Validated Contact System**: Anti-spam honeypot detection, in-memory IP rate limiting, MongoDB persistence, and transactional email dispatch via Nodemailer.
- **Accessible & Performance-Tuned**: Strict semantic tags, visible focus rings, `prefers-reduced-motion` support for Framer Motion, and Next.js Sharp image optimization.

---

## ✦ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack, React 19) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Tailwind CSS v4 with custom theme tokens & brutalist utilities |
| **Database** | MongoDB with Mongoose ODM (cached global connection) |
| **Authentication** | **Better-Auth** (email & password with MongoDB adapter) |
| **Animations** | Framer Motion (subtle entrance reveals, reduced-motion aware) |
| **Icons** | Lucide React + custom inline SVG brand glyphs |
| **Forms & Validation** | React Hook Form + Zod v4 |
| **Email Provider** | Nodemailer (SMTP / Gmail App Passwords / SendGrid) |
| **Image Optimization**| Next.js `<Image />` + Sharp |

---

## ✦ Design System & Visual Language

- **Primary Canvas**: `#FFFBEA` (Warm Ivory Cream) with a subtle CSS SVG paper-grain noise filter (`.grain-overlay`).
- **Secondary Surfaces**: `#F5F3E9` and `#FFFFFF`.
- **Text & Borders**: `#111111` (Deep Ink Black, 2px–3px solid borders).
- **Accent Orange**: `#FF5722` (Tags, primary call-to-actions, section badges).
- **Accent Lime**: `#83E52B` (Active states, verified status indicators, featured cards).
- **Offset Brutalist Shadows**:
  - `shadow-brutal`: `4px 4px 0px #111111`
  - `shadow-brutal-md`: `6px 6px 0px #111111`
  - `shadow-brutal-lg`: `8px 8px 0px #111111`
- **Typography**:
  - **Headlines**: `Archivo Black` (Condensed, uppercase, heavy impact)
  - **Body Copy**: `Space Grotesk` (Technical, readable sans-serif)
  - **Decorative Accents**: `Playfair Display` (Italic, high-contrast editorial serif)

---

## ✦ Project Structure

```
my-portfolio/
├── .env.example                    # Environment variable template
├── .env.local                      # Local development secrets (ignored by git)
├── README.md                       # Comprehensive documentation
├── package.json                    # Project dependencies and npm scripts
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── eslint.config.mjs               # ESLint configuration
├── scripts/
│   ├── seed.ts                     # Database seeder script
│   └── generate-svgs.js            # Offline SVG demo asset generator
├── public/
│   ├── images/                     # SVG placeholder assets & project covers
│   ├── favicon.ico
│   └── resume.pdf                  # Place your real resume PDF here
└── src/
    ├── app/
    │   ├── globals.css             # Tailwind v4 theme, grain, brutalist shadows
    │   ├── layout.tsx              # Root layout + Google fonts + grain overlay
    │   ├── page.tsx                # Homepage Server Component
    │   ├── loading.tsx             # Editorial skeleton loader
    │   ├── not-found.tsx           # Custom 404 editorial page
    │   ├── sitemap.ts              # Dynamic sitemap (includes all project slugs)
    │   ├── robots.ts               # Robots.txt (blocks /admin from crawlers)
    │   ├── projects/[slug]/        # Individual case-study detail pages
    │   ├── admin/                  # Protected CMS Dashboard
    │   │   ├── layout.tsx          # Dynamic admin layout with session check
    │   │   ├── page.tsx            # CMS Overview with content counters
    │   │   ├── login/page.tsx      # Better-Auth admin login
    │   │   ├── profile/page.tsx    # Bio and coordinates editor
    │   │   ├── skills/page.tsx     # Skills CRUD
    │   │   ├── experience/page.tsx # Career journey timeline CRUD
    │   │   ├── education/page.tsx  # Academic credentials CRUD
    │   │   ├── projects/           # Case studies CRUD + status toggles
    │   │   └── messages/page.tsx   # Contact form inbox
    │   └── api/
    │       ├── auth/[...all]/      # Better-Auth route handler
    │       └── contact/route.ts    # Zod-validated rate-limited contact API
    ├── components/
    │   ├── layout/                 # Navbar, MobileMenu, Footer
    │   ├── sections/               # Hero, About, Skills, Experience, Education, Projects, Contact
    │   ├── projects/               # ProjectCard, ProjectCover, ProjectMeta, ProjectGallery
    │   ├── ui/                     # SectionLabel, SectionHeading, SectionDivider, EditorialCard, Button, Badge, Modal
    │   └── admin/                  # AdminSidebar, AdminHeader
    ├── data/
    │   └── seedData.ts             # Default fallback & seed datasets
    ├── lib/
    │   ├── mongodb.ts              # Cached Mongoose & MongoClient connections
    │   ├── auth.ts                 # Better-Auth server configuration
    │   ├── auth-client.ts          # Better-Auth client hooks (signIn, signOut)
    │   ├── auth-server.ts          # Server session getter
    │   ├── actions.ts              # Server Actions for admin mutations
    │   ├── data.ts                 # Server-side data fetching with graceful fallbacks
    │   ├── email.ts                # Nodemailer email dispatcher
    │   └── validations.ts          # Zod schemas for contact, profile, projects
    ├── models/                     # Mongoose models: Profile, Skill, Experience, Education, Project, ContactMessage
    └── types/                      # Shared TypeScript interfaces
```

---

## ✦ Quick Start & Setup

### 1. Clone & Install Dependencies
```bash
cd D:\PORTFHOLIO\my-portfolio
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✦ Environment Variables

Configure these variables inside `.env.local`:

```env
# MongoDB Connection URI (Local or MongoDB Atlas)
MONGODB_URI=mongodb://localhost:27017/portfolio
# Atlas example:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority

# Better-Auth Configuration
BETTER_AUTH_SECRET=your_super_secret_32_character_string_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Admin Credentials for Seeder
ADMIN_EMAIL=admin@portfolio.local
ADMIN_PASSWORD=AdminPassword123!

# Email Provider Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
CONTACT_EMAIL=you@example.com
```

---

## ✦ Database Seeder & Initial Admin

To populate MongoDB with starter case studies, categorized skills, experience entries, education, and create the initial admin user:

```bash
npm run seed
```

This runs `scripts/seed.ts`, which:
1. Clears and populates the `profiles` collection with placeholder bio data.
2. Seeds 20 categorized skills (Frontend, Backend, Database, Tools).
3. Seeds 2 professional experience entries.
4. Seeds 2 academic records.
5. Seeds 3 full case studies (`KRONOS // COMMERCE`, `PULSE // TASK ENGINE`, `SYNTAX // CREATIVE CMS`).
6. Registers the administrator user via Better-Auth using `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

---

## ✦ Admin CMS Dashboard

Access the protected dashboard at:
👉 **[http://localhost:3000/admin](http://localhost:3000/admin)**

1. **Sign In**: Use the `ADMIN_EMAIL` and `ADMIN_PASSWORD` defined in `.env.local`.
2. **Profile & Coordinates**: Edit your name, professional designation, headline, bio paragraphs, phone, and social links.
3. **Toolkit & Skills**: Add or edit skills with categorized icons and custom order.
4. **Experience Timeline**: Add job positions, key achievements, and stack tags.
5. **Education**: Add degrees, certifications, and institutions.
6. **Case Studies**: Create, edit, toggle visibility (Published/Draft), and mark projects as Featured on the homepage.
7. **Inbox**: Read incoming contact inquiries, mark them as read or replied, and send direct replies.

---

## ✦ Contact Form & Email Configuration

The contact form at the bottom of the homepage features:
- **Client & Server Zod Validation**: Validates name, valid email format, subject, and message length.
- **Spam Bot Honeypot**: Hidden honeypot input field that silently ignores automated spam bots.
- **Rate Limiting**: Protects against rapid abuse (maximum 5 requests per IP per minute).
- **Database Backup**: Inquiries are saved to MongoDB even if SMTP is offline.
- **Nodemailer Dispatch**: Sends formatted HTML emails with full sender coordinates.

### Setting up Gmail SMTP:
1. Enable 2-Factor Authentication on your Google account.
2. Go to **Security → App Passwords**.
3. Generate a new App Password for "Mail".
4. Set in `.env.local`:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   CONTACT_EMAIL=where-you-want-to-receive-emails@domain.com
   ```

---

## ✦ Personalization: Replacing Demo Data

1. **Your Resume**:
   - Place your real PDF inside `public/resume.pdf`.
   - The "Resume" buttons in the Navbar and Hero will immediately detect the file and trigger direct downloads. If missing, a helpful modal is shown.
2. **Your Portrait**:
   - Place your photo inside `public/images/portrait.jpg` (or any image path).
   - Log into `/admin/profile` and update the portrait path.
3. **Your Projects & Screenshots**:
   - Log into `/admin/projects`.
   - Update the existing demo projects with your real project details, live URLs, GitHub repos, and screenshots.

---

## ✦ Deploying to Vercel

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Root Directory to `my-portfolio` (if in a subfolder).
4. In the Vercel project settings, add the environment variables from `.env.example`:
   - `MONGODB_URI` (from MongoDB Atlas)
   - `BETTER_AUTH_SECRET` (generate a random 32+ character string)
   - `BETTER_AUTH_URL` (your production URL, e.g. `https://your-portfolio.vercel.app`)
   - `NEXT_PUBLIC_SITE_URL` (`https://your-portfolio.vercel.app`)
   - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`, `CONTACT_EMAIL`
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`
5. Deploy! Vercel will build the production application with sub-second page delivery and edge caching.
