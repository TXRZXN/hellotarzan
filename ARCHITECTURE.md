# 🏛️ Hello Tarzan Portfolio Architecture & Design Guide

## 1. Overview & Business Domain

**Hello Tarzan** (`hellotarzan`) is a modern personal portfolio website built with **Next.js 15 (App Router)** and **TypeScript 5**. It showcases full-stack web applications, mobile apps, technical skills, and algorithmic trading scripts (Pine Script / MQL5), backed by automated SMTP email notifications and an evidence-backed test safety net.

---

## 2. Tech Stack & Dependencies

| Category | Technology | Notes |
| :--- | :--- | :--- |
| **Framework** | Next.js 15.4.5 (App Router) | React Server Components & Client Widgets |
| **Frontend Runtime** | React 18.3.1 | Core UI engine |
| **Language** | TypeScript 5.x | Strict typing (0 compile errors) |
| **Styling** | Tailwind CSS 3.4.17 + PostCSS | Utility-first CSS, dark mode support |
| **UI Components** | shadcn/ui primitives | Radix UI (`@radix-ui/react-slot`), Lucide React icons |
| **Theming** | `next-themes` 0.2.1 | Light / Dark mode toggle |
| **Backend / API** | Next.js Route Handlers | `/api/send-email` using `nodemailer` |
| **Testing Engine** | Vitest + React Testing Library | V8 coverage provider (Line 94.14%, Branch 85.71%) |
| **Deployment Target**| Vercel | Production URL: `https://hellotarzan.vercel.app` |

---

## 3. Layer Separation & Folder Structure (Feature-Based)

```
hellotarzan/
├── .agents/
│   └── config.json           # Agent workspace configuration & verification commands
├── src/
│   ├── app/                  # 🚦 Thin Routing Layer (Page Entry & Route Handlers)
│   │   ├── (src)/            # Route group for secondary pages
│   │   │   ├── about/page.tsx     # Delegates to <AboutPage /> from features/about
│   │   │   ├── contact/page.tsx   # Delegates to <ContactPage /> from features/contact
│   │   │   ├── projects/page.tsx  # Delegates to <ProjectsPage /> from features/projects
│   │   │   └── skills/page.tsx    # Delegates to <SkillsPage /> from features/skills
│   │   ├── api/
│   │   │   └── send-email/route.ts # SMTP handler for contact submissions
│   │   ├── favicon.ico
│   │   ├── globals.css       # Tailwind base, utilities & color tokens
│   │   ├── layout.tsx        # Root layout, ThemeProvider, Schema.org LD+JSON, Navigation
│   │   ├── page.tsx          # Landing page delegating to <HomePage /> from features/home
│   │   ├── robots.ts         # SEO robots.txt generator
│   │   └── sitemap.ts        # SEO dynamic sitemap generator
│   │
│   ├── features/             # 📦 Feature-Sliced Domain Modules
│   │   ├── home/
│   │   │   ├── components/   # HeroWidget, AnimatedText, StaggerText, TypewriterText
│   │   │   └── pages/home-page.tsx
│   │   ├── about/
│   │   │   ├── data/about.data.ts # Decoupled work experiences & education
│   │   │   ├── types/about.types.ts
│   │   │   └── pages/about-page.tsx
│   │   ├── projects/
│   │   │   ├── components/   # ProjectWidget (Carousel & Badges)
│   │   │   ├── data/projects.data.ts # Typed project repository
│   │   │   ├── types/project.types.ts
│   │   │   └── pages/projects-page.tsx # Impeccable Filterable Project Showcase
│   │   ├── skills/
│   │   │   ├── components/   # SkillsWidget
│   │   │   ├── data/skills.data.ts # Categorized skills & proficiencies
│   │   │   ├── types/skill.types.ts
│   │   │   └── pages/skills-page.tsx
│   │   └── contact/
│   │       ├── components/   # ContactFormWidget
│   │       ├── data/contact.data.ts
│   │       ├── hooks/use-contact-form.ts # Form validation & dispatch state
│   │       ├── types/contact.types.ts
│   │       └── pages/contact-page.tsx
│   │
│   └── shared/               # 🌐 Shared Primitives & Infrastructure
│       ├── components/
│       │   ├── ui/           # shadcn/ui primitives (badge, button, card, input, textarea)
│       │   ├── navigation.tsx
│       │   ├── theme-provider.tsx
│       │   └── theme-toggle.tsx
│       └── lib/
│           └── utils.ts      # `cn` helper (clsx + tailwind-merge)
│
├── tests/                    # 🧪 12 Test Suites (36 Tests, 100% Passing)
│   ├── unit/                 # utils.test.ts, data-contracts.test.ts
│   ├── components/           # feature-pages, hero, projects, skills, contact-form, navigation, theme
│   ├── api/                  # send-email.test.ts (mocked nodemailer)
│   └── setup.ts              # JSDOM, jest-dom, Next mocks
├── test-audit-report/        # 📊 Test Coverage Audit Report (HTML & JSON)
├── vitest.config.ts          # Vitest and V8 coverage configuration
├── components.json           # shadcn config pointing to src/shared
└── tsconfig.json             # Path alias: @/* -> ./src/*
```

---

## 4. Key Architectural Patterns

1. **Decoupled Data Layer:**
   - ข้อมูลทั้งหมดแยกตัวออกมาอยู่ใน `src/features/*/data/*.data.ts` ภายใต้ Type Interfaces ใน `types/*.types.ts`
   - สามารถขยายเชื่อมต่อไปยัง Headless CMS, Supabase หรือ REST/GraphQL API ได้โดยไม่ต้องแก้ Presentation Layer
2. **Feature Isolation (Open/Closed Principle):**
   - การเพิ่ม Feature ใหม่ทำได้โดยการสร้างโฟลเดอร์ใน `src/features/<feature-name>/` โดยไม่กระทบ Feature เดิม
3. **Thin Routing:**
   - โฟลเดอร์ `src/app/` ทำหน้าที่เฉพาะ Router, Route Handler, และ SEO Metadata
4. **Safety Net (Test-First):**
   - ทุก Feature มีการทดสอบคลุมทั้ง Happy path, Error path, และ Data contract ผ่าน Vitest

---

## 5. Development & Verification Commands

```bash
# Start local dev server (http://localhost:3000)
npm run dev

# Run Vitest test suite
npm run test

# Run Vitest with coverage report
npm run test:coverage

# Run TypeScript typecheck
npx tsc --noEmit

# Run ESLint check
npx eslint src/

# Run clean production build
npm run build
```
