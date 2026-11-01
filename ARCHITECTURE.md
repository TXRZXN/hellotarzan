# 🏛️ Hello Tarzan (`hellotarzan`) — Architecture & System Design Guide

## 1. Executive Overview & Business Domain

**Hello Tarzan** (`hellotarzan`) คือระบบเว็บไซต์พอร์ตโฟลิโอส่วนตัวและศูนย์รวมผลงานเชิงวิศวกรรมซอฟต์แวร์ของ **Naruechat Buranasombat (Hello Tarzan)** พัฒนาด้วยสถาปัตยกรรม **Next.js 15 (App Router)**, **React 18**, และ **TypeScript 5** โดยจัดระเบียบโครงสร้างโค้ดแบบ **Feature-Sliced Modular Architecture** ที่แยกส่วน Routing, UI Components, Business Hooks, และ Static Data Repositories ออกจากกันอย่างชัดเจน

### ขอบเขตโดเมนหลัก (Core Business Capabilities)
1. **Personal Branding & Dynamic Hero (`features/home`):** นำเสนอข้อมูลตัวตน ตำแหน่งงาน ลิงก์โซเชียลมีเดีย ระบบดาวน์โหลดเรซูเม่ (`CV_Naruechatbu.pdf`) และเอฟเฟกต์แอนิเมชันข้อความ 4 รูปแบบ (`stagger`, `typewriter`, `gradient`, `fadeInUp`)
2. **Professional Journey & Biography (`features/about`):** แสดงประวัติส่วนตัว สถานะการรับงาน ประสบการณ์ทำงานจริง (HomePro) และประวัติการศึกษาตั้งแต่ระดับมัธยมศึกษา อาชีวศึกษา ปริญญาตรีวิศวกรรมศาสตร์ จนถึงปริญญาโท MBA (Digital Financial Management)
3. **Interactive Filterable Project Showcase (`features/projects`):** รวบรวมผลงาน 10 โปรเจกต์ ครอบคลุม 4 หมวดหมู่ (`Trading`, `Web`, `Mobile`, `Other`) พร้อมระบบกรองหมวดหมู่แบบเรียลไทม์ (Category Filter Pills) และ Image Carousel อัตโนมัติ (หมุนภาพทุก 5 วินาที พร้อมปุ่มควบคุมและจุด Indicator)
4. **Categorized Technical Skills Matrix (`features/skills`):** แสดงทักษะทางเทคนิค 33 รายการ แบ่งตาม 6 หมวดหมู่ (`Frontend`, `Backend`, `Database`, `DevOps & Tools`, `Mobile`, `Other`) และ 4 ระดับความเชี่ยวชาญ (`Expert`, `Advanced`, `Intermediate`, `Beginner`) รองรับการแสดงผลทั้งแบบ `grid` และ `list`
5. **Hardened Contact & Notification Pipeline (`features/contact` + `app/api/send-email`):** ระบบฟอร์มติดต่อกลับพร้อมการป้องกันสแปมและบอทแบบหลายชั้น (In-Memory IP Rate Limiting, Honeypot Field, Input/Length Validation, CR/LF Header Sanitization) ก่อนส่งอีเมลผ่าน **Zoho Mail SMTP (TLS Port 465)** และแจ้งผลลัพธ์ผ่านระบบ `Toast` แบบ Accessible

---

## 2. Interactive Architecture Diagrams (Archify)

โปรเจกต์นี้มาพร้อมกับแผนภาพแบบ Interactive Standalone HTML ที่สร้างและตรวจสอบความถูกต้องของ Source Evidence ด้วย **Archify** (สามารถเปิดไฟล์ `.html` ในเบราว์เซอร์เพื่อสำรวจโหนด เส้นทางข้อมูล โหมด Dark/Light และคลิกลิงก์ไปยังบรรทัดโค้ดจริงได้ทันที):

| แผนภาพ (Diagram) | ประเภท | ไฟล์ Interactive HTML | คำอธิบาย |
| :--- | :--- | :--- | :--- |
| **System Architecture Overview** | `architecture` | [`.archify/architecture-hellotarzan-system-20261101-153500/hellotarzan-system.html`](.archify/architecture-hellotarzan-system-20261101-153500/hellotarzan-system.html) | แผนผังสถาปัตยกรรมภาพรวม แสดงความสัมพันธ์ระหว่าง Visitor/Crawler, Next.js App Router, Shared Shell, Feature Pages, Typed Data Layer, Contact API, Rate Limit Guard และ Zoho Mail SMTP |
| **Contact & SMTP Security Sequence** | `sequence` | [`.archify/sequence-contact-email-flow-20261101-153630/contact-email-flow.html`](.archify/sequence-contact-email-flow-20261101-153630/contact-email-flow.html) | ลำดับการทำงานตั้งแต่ผู้ใช้กดส่งฟอร์ม การตรวจสอบ Rate Limit 3 ครั้ง/10 นาที, Honeypot, Regex & Length Validation, การส่งผ่าน Zoho SMTP จนถึงการแสดงผล Toast |
| **Repository & Feature-Sliced Module Tree** | `tree` | [`.archify/tree-hellotarzan-modules-20261101-153740/hellotarzan-modules.html`](.archify/tree-hellotarzan-modules-20261101-153740/hellotarzan-modules.html) | โครงสร้างการแบ่งเลเยอร์ของโปรเจกต์ (`src/app`, `src/features/*`, `src/shared/*`, `tests/*` และ GitHub Actions CI) |

### แผนผังสถาปัตยกรรมเชิงเลเยอร์ (High-Level Layer Topology)

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│                            Visitor Browser / SEO Crawler                          │
└───────────────────┬───────────────────────────────────────────┬───────────────────┘
                    │ HTTPS GET (/, /about, /skills, /projects) │ POST /api/send-email
                    ▼                                           ▼
┌───────────────────────────────────────────┐ ┌─────────────────────────────────────┐
│        Thin Routing & SEO (`src/app`)     │ │   Backend Route Handler (`src/app`) │
│  • RootLayout + Schema.org JSON-LD        │ │  • IP Rate Limiter (3 req / 10 min) │
│  • Dynamic Sitemap & Robots.txt           │ │  • Hidden Honeypot Trap             │
│  • Custom 404 (`not-found.tsx`)           │ │  • Payload Regex & Length Validator │
│  • Route Group `(src)/*` Page Entries     │ │  • Nodemailer Zoho SMTP (TLS :465)  │
└───────────────────┬───────────────────────┘ └─────────────────▲───────────────────┘
                    │ Delegates Rendering                       │ JSON Fetch
                    ▼                                           │
┌───────────────────────────────────────────────────────────────┴───────────────────┐
│                      Feature-Sliced Domain Layer (`src/features`)                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────┐ │
│  │     home     │ │    about     │ │   projects   │ │    skills    │ │ contact  │ │
│  │ • HeroWidget │ │ • AboutPage  │ │ • ProjectsPg │ │ • SkillsPage │ │ • Widget │ │
│  │ • TextAnims  │ │ • about.data │ │ • ProjectWdg │ │ • SkillsWdg  │ │ • Hook   │ │
│  │              │ │ • about.type │ │ • proj.data  │ │ • skill.data │ │ • data   │ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────┘ │
└───────────────────────────────────────────┬───────────────────────────────────────┘
                                            │ Consumes Shared UI & Theme Context
                                            ▼
┌───────────────────────────────────────────────────────────────────────────────────┐
│                    Shared Infrastructure & UI Layer (`src/shared`)                │
│  • App Shell: `Navigation` (Desktop/Mobile), `ThemeProvider`, `ThemeToggle`       │
│  • UI Primitives (`shadcn/ui`): `Button`, `Card`, `Badge`, `Input`, `Textarea`    │
│  • Feedback & Utilities: Accessible `Toast` (`role="status"|"alert"`), `cn()`     │
└───────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Complete Tech Stack & Dependency Matrix

### 3.1 Production Dependencies (`package.json`)

| หมวดหมู่ | แพ็กเกจ | เวอร์ชัน | หน้าที่ในระบบ |
| :--- | :--- | :--- | :--- |
| **Core Framework** | `next` | `15.4.5` | App Router, Server/Client Components, Route Handlers, Metadata API, Image Optimization (`avif`/`webp`) |
| **UI Runtime** | `react` / `react-dom` | `^18.3.1` | Component rendering, Hooks (`useState`, `useEffect`) |
| **Theme Engine** | `next-themes` | `^0.2.1` | จัดการโหมดสี Light / Dark / System ผ่านคลาส `dark` บน `<html>` |
| **UI Primitives** | `@radix-ui/react-slot` | `^1.2.3` | รองรับ Polymorphic rendering (`asChild`) ในคอมโพเนนต์ `Button` |
| **Variant Styling** | `class-variance-authority` | `^0.7.0` | กำหนดรูปแบบ Variant และ Size ของ UI Primitives (`Button`, `Badge`) |
| **Class Utilities** | `clsx` + `tailwind-merge` | `^2.0.0` / `^1.14.0` | รวมคลาส CSS แบบมีเงื่อนไขและป้องกันคลาส Tailwind ชนกันผ่านฟังก์ชัน `cn()` |
| **Animations** | `tailwindcss-animate` | `^1.0.7` | Keyframe และ Transition utilities สำหรับ Tailwind CSS |
| **Icons** | `lucide-react` | `^0.263.1` | ไอคอน SVG มาตรฐาน (ปรับแต่ง Tree-shaking ผ่าน `optimizePackageImports`) |
| **Email Transport** | `nodemailer` | `^7.0.5` | ส่งอีเมลแจ้งเตือนผ่านโปรโตคอล SMTP (Zoho Mail Port 465) |

### 3.2 Development, Linting & Testing Dependencies

| หมวดหมู่ | แพ็กเกจ | เวอร์ชัน | หน้าที่ในระบบ |
| :--- | :--- | :--- | :--- |
| **Type System** | `typescript` | `^5.0.0` | Strict static type checking (`strict: true`, `noEmit: true`) |
| **Styling Compiler** | `tailwindcss` / `postcss` / `autoprefixer` | `^3.4.17` / `^8.4.31` | คอมไพล์ Utility CSS และ CSS Variables |
| **Linter** | `eslint` / `eslint-config-next` | `^8.0.0` / `15.0.0` | ตรวจสอบคุณภาพโค้ดและกฎของ Next.js / React Hooks |
| **Test Runner** | `vitest` / `@vitest/coverage-v8` | `^5.0.5` | รันชุดทดสอบ Unit, Component, และ API พร้อมวัด Coverage ด้วย V8 |
| **DOM Testing** | `@testing-library/react` / `jsdom` | `^16.3.3` / `^29.1.1` | จำลองสภาพแวดล้อมเบราว์เซอร์และทดสอบพฤติกรรมของ React Components |
| **Assertion Matchers**| `@testing-library/jest-dom` | `^7.0.1` | Custom DOM matchers เช่น `toBeInTheDocument()`, `toHaveAttribute()` |

---

## 4. Layer Separation & Complete Directory Map

```text
hellotarzan/
├── .agents/
│   └── config.json                         # Workspace metadata, verification commands & doc registry
├── .archify/                               # Interactive standalone HTML architecture diagrams & receipts
│   ├── architecture-hellotarzan-system-20261101-153500/
│   │   ├── candidate.json
│   │   └── hellotarzan-system.html         # Interactive System Architecture Diagram
│   ├── sequence-contact-email-flow-20261101-153630/
│   │   ├── candidate.json
│   │   └── contact-email-flow.html         # Interactive Contact & SMTP Sequence Diagram
│   └── tree-hellotarzan-modules-20261101-153740/
│       ├── candidate.json
│       └── hellotarzan-modules.html        # Interactive Module & Test Hierarchy Diagram
├── .github/
│   └── workflows/
│       └── ci.yml                          # GitHub Actions CI pipeline (Typecheck, Lint, Test, Build)
├── docs/                                   # Deep-dive technical documentation guides
│   ├── FEATURES_AND_COMPONENTS.md          # Complete specification of all features, widgets & hooks
│   ├── API_AND_SECURITY.md                 # Complete specification of /api/send-email & security guards
│   └── TESTING_AND_DEPLOYMENT.md           # Complete guide to Vitest suites, mocking, CI & Vercel deploy
├── public/                                 # Static assets served at root URL (/)
│   ├── cv/CV_Naruechatbu.pdf               # Downloadable CV document
│   ├── doglover/                           # Dog Lover project screenshots (doglover1.png - doglover9.png)
│   ├── mbdc/                               # DC Application screenshots (mbdc1.jpg - mbdc9.jpg)
│   ├── port/                               # Portfolio V1 screenshots (port1.png - port6.png)
│   ├── portal/                             # Enterprise Portal screenshots (portal1.png - portal7.png)
│   ├── rmm/                                # Register Member screenshots (rmm1.jpg - rmm5.jpg)
│   ├── schematic/                          # Schematic Application screenshots (schematic1.jpg - schematic7.jpg)
│   ├── Me_Image.jpg                        # Hero profile portrait
│   ├── mark-github.png                     # GitHub mark icon used in ProjectWidget
│   └── placeholder.svg                     # Fallback image asset
├── src/
│   ├── app/                                # 🚦 Layer 1: Thin Routing, Metadata & API Route Handlers
│   │   ├── (src)/                          # Route group (omitted from URL path)
│   │   │   ├── about/page.tsx              # GET /about -> renders <AboutPage />
│   │   │   ├── contact/page.tsx            # GET /contact -> renders <ContactPage />
│   │   │   ├── projects/page.tsx           # GET /projects -> renders <ProjectsPage />
│   │   │   └── skills/page.tsx             # GET /skills -> renders <SkillsPage />
│   │   ├── api/
│   │   │   └── send-email/route.ts         # POST /api/send-email -> Rate limit, validate & Zoho SMTP
│   │   ├── globals.css                     # Tailwind directives, HSL design tokens & custom keyframes
│   │   ├── icon.svg                        # Vector SVG application icon (favicon replacement)
│   │   ├── layout.tsx                      # Root HTML shell, SEO Metadata, JSON-LD, ThemeProvider, Navigation
│   │   ├── not-found.tsx                   # Branded 404 Not Found boundary page
│   │   ├── page.tsx                        # GET / -> renders <HomePage />
│   │   ├── robots.ts                       # Dynamic /robots.txt generator
│   │   └── sitemap.ts                      # Dynamic /sitemap.xml generator
│   │
│   ├── features/                           # 📦 Layer 2: Feature-Sliced Domain Modules
│   │   ├── home/
│   │   │   ├── components/
│   │   │   │   ├── animated-text.tsx       # Delayed entrance text wrapper (fadeInUp, slideInLeft, etc.)
│   │   │   │   ├── hero-widget.tsx         # Profile avatar, animated headings, CV download & social buttons
│   │   │   │   ├── stagger-text.tsx        # Per-character staggered reveal animation
│   │   │   │   └── typewriter-text.tsx     # Sequential character typing effect with pulsing cursor
│   │   │   └── pages/
│   │   │       └── home-page.tsx           # Home feature page container
│   │   ├── about/
│   │   │   ├── data/about.data.ts          # personalInfoData, experiencesData, educationData
│   │   │   ├── pages/about-page.tsx        # Bio card, Work Experience timeline, Education cards
│   │   │   └── types/about.types.ts        # ExperienceItem, EducationItem, PersonalInfo interfaces
│   │   ├── projects/
│   │   │   ├── components/
│   │   │   │   └── project-widget.tsx      # Project card with 5s auto-carousel, tech badges & links
│   │   │   ├── data/projects.data.ts       # 10 typed project items across Trading, Web, Mobile, Other
│   │   │   ├── pages/projects-page.tsx     # Interactive category filter pills + 2-column project grid
│   │   │   └── types/project.types.ts      # ProjectImage, ProjectCategory, ProjectItem types
│   │   ├── skills/
│   │   │   ├── components/
│   │   │   │   └── skills-widget.tsx       # Dual-mode (grid / list) skill renderer with level color badges
│   │   │   ├── data/skills.data.ts         # 33 skills across 6 categories
│   │   │   ├── pages/skills-page.tsx       # Combines category grid view and full list overview
│   │   │   └── types/skill.types.ts        # SkillLevel, SkillCategory, SkillItem types
│   │   └── contact/
│   │       ├── components/
│   │       │   └── contact-form-widget.tsx # 2-column contact info card + form with hidden honeypot
│   │       ├── data/contact.data.ts        # contactInfoData (email, phone, location)
│   │       ├── hooks/
│   │       │   └── use-contact-form.ts     # Form state, async fetch to /api/send-email & Toast trigger
│   │       ├── pages/contact-page.tsx      # Contact page layout container
│   │       └── types/contact.types.ts      # ContactFormData, ContactInfo, ContactApiResponse interfaces
│   │
│   └── shared/                             # 🌐 Layer 3: Shared Components, UI Primitives & Utilities
│       ├── components/
│       │   ├── ui/                         # Reusable UI building blocks (shadcn/ui New York style)
│       │   │   ├── badge.tsx               # Status and tag pill primitive
│       │   │   ├── button.tsx              # Polymorphic button primitive with CVA variants
│       │   │   ├── card.tsx                # Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
│       │   │   ├── input.tsx               # Styled form text input primitive
│       │   │   ├── textarea.tsx            # Styled multi-line text input primitive
│       │   │   └── toast.tsx               # Floating auto-dismiss notification banner
│       │   ├── navigation.tsx              # Fixed top navbar with active route highlight & mobile drawer
│       │   ├── theme-provider.tsx          # Client wrapper around NextThemesProvider
│       │   └── theme-toggle.tsx            # Hydration-safe Sun/Moon theme switch button
│       └── lib/
│           └── utils.ts                    # `cn(...inputs)` class merge helper
│
├── tests/                                  # 🧪 Automated Verification Suite (13 Suites, 39 Tests)
│   ├── api/
│   │   └── send-email.test.ts              # 4 API tests: valid 200, honeypot 200, invalid email 400 & rate limit 429
│   ├── components/
│   │   ├── contact-form-widget.test.tsx    # Contact info render, form submit success (status toast) & API error (alert toast)
│   │   ├── feature-pages.test.tsx          # Smoke & integration tests for all 5 feature pages + category filtering
│   │   ├── hero-widget.test.tsx            # Hero props, stagger/gradient/fadeIn variants & CV download trigger
│   │   ├── navigation.test.tsx             # Desktop links, active route mock & mobile drawer toggle
│   │   ├── not-found.test.tsx              # Custom 404 page rendering & navigation links
│   │   ├── project-widget.test.tsx         # Project card rendering, external links & Prev/Next carousel buttons
│   │   ├── skills-widget.test.tsx          # Grid/list layouts, category grouping & level badge colors
│   │   ├── text-animations.test.tsx        # AnimatedText, StaggerText, and TypewriterText fake-timer tests
│   │   ├── theme-provider.test.tsx         # ThemeProvider context wrapper test
│   │   └── theme-toggle.test.tsx           # Light/dark toggle interaction test
│   ├── unit/
│   │   ├── data-contracts.test.ts          # Schema integrity tests for all static data repositories
│   │   └── utils.test.ts                   # Unit tests for `cn()` class merging
│   └── setup.ts                            # Vitest global setup: jest-dom matchers, next/image & next/link mocks
├── .env.example                            # Template for required SMTP environment variables
├── components.json                         # shadcn/ui configuration mapped to `@/shared/*`
├── eslint.config.mjs                       # Flat ESLint configuration extending next/core-web-vitals
├── next.config.mjs                         # Next.js config: AVIF/WebP images & lucide-react import optimization
├── package.json                            # Scripts and dependencies manifest
├── tailwind.config.js                      # Tailwind theme extensions, CSS variable colors & animations
├── tsconfig.json                           # TypeScript strict configuration and `@/*` path alias
└── vitest.config.ts                        # Vitest test runner and V8 80% coverage threshold configuration
```

---

## 5. Deep-Dive: Routing, SEO & Metadata Architecture (`src/app/`)

เลเยอร์ `src/app/` ถูกออกแบบตามหลักการ **Thin Routing Layer** คือทำหน้าที่เฉพาะการกำหนด URL Route, การตั้งค่า SEO Metadata, การฝัง Schema.org Structured Data และการส่งต่อ (Delegate) การเรนเดอร์ไปยัง Feature Pages ใน `src/features/*/pages/`

### 5.1 ตารางเส้นทาง (Route Table)

| URL Path | ไฟล์ต้นทาง | ชนิด | คอมโพเนนต์หลักที่เรียกใช้ | Metadata Title |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | Static Page | `<HomePage />` | `Hello Tarzan - Naruechat Buranasombat \| Portfolio` |
| `/about` | `src/app/(src)/about/page.tsx` | Static Page | `<AboutPage />` | `About Me \| Hello Tarzan` |
| `/skills` | `src/app/(src)/skills/page.tsx` | Static Page | `<SkillsPage />` | `Skills & Technologies \| Hello Tarzan` |
| `/projects` | `src/app/(src)/projects/page.tsx` | Static Page | `<ProjectsPage />` | `Projects \| Hello Tarzan` |
| `/contact` | `src/app/(src)/contact/page.tsx` | Static Page | `<ContactPage />` | `Contact \| Hello Tarzan` |
| `/api/send-email` | `src/app/api/send-email/route.ts` | Dynamic API (`POST`) | `POST(request: Request)` | N/A (JSON API) |
| `/robots.txt` | `src/app/robots.ts` | Metadata Route | `robots()` | N/A |
| `/sitemap.xml` | `src/app/sitemap.ts` | Metadata Route | `sitemap()` | N/A |
| `/*` (404) | `src/app/not-found.tsx` | Error Boundary | `<NotFound />` | Default |

> **หมายเหตุเรื่อง Route Group `(src)`:** โฟลเดอร์ `src/app/(src)/` ใช้ฟีเจอร์ Route Group ของ Next.js App Router เพื่อจัดกลุ่มหน้าย่อย (`about`, `contact`, `projects`, `skills`) แยกจากไฟล์ระดับ Root (`page.tsx`, `layout.tsx`, `robots.ts`, `sitemap.ts`) โดยที่ชื่อ `(src)` จะไม่ปรากฏใน URL จริง

### 5.2 SEO, OpenGraph & Schema.org JSON-LD (`src/app/layout.tsx`)
- **Metadata Base:** กำหนด `metadataBase: new URL("https://hellotarzan.vercel.app")`
- **Title Template:** ใช้รูปแบบ `%s | Hello Tarzan` ทำให้หน้าย่อยที่กำหนด `title: "Projects"` แสดงผลเป็น `"Projects | Hello Tarzan"` โดยอัตโนมัติ
- **OpenGraph & Twitter Cards:** กำหนดรูปภาพพรีวิว `/og-image.jpg` (1200×630), `type: "profile"`, และข้อมูลผู้เขียน
- **Structured Data (JSON-LD):** ฝังสคริปต์ `application/ld+json` จำนวน 2 บล็อกลงใน `<body>`:
  1. `@type: "Person"` — ระบุชื่อ `Hello Tarzan`, ตำแหน่ง `Full-Stack Developer (Web & Mobile)`, ลิงก์ `sameAs` (GitHub, LinkedIn) และทักษะ `knowsAbout`
  2. `@type: "WebSite"` — ระบุชื่อเว็บไซต์ URL และภาษา (`en-US`)
- **Dynamic Sitemap (`src/app/sitemap.ts`):** สร้างรายการ URL ทั้ง 5 หน้าหลักพร้อมค่า `priority` (`1.0` สำหรับ `/`, `0.9` สำหรับ `/projects`, `0.8` สำหรับ `/about` และ `/skills`, `0.7` สำหรับ `/contact`)

---

## 6. Deep-Dive: Feature-Sliced Domain Modules (`src/features/`)

แต่ละโดเมนภายใต้ `src/features/<feature-name>/` มีความเป็นอิสระต่อกัน (High Cohesion, Low Coupling) โดยแบ่งโครงสร้างภายในออกเป็น `components/`, `data/`, `hooks/`, `pages/`, และ `types/`

### 6.1 Feature: `home` (`src/features/home/`)
- **`HomePage` (`pages/home-page.tsx`):** จัดวางเลย์เอาต์กึ่งกลางหน้าจอ (`min-h-[calc(100vh-4rem)]`) และส่ง Props มาตรฐานเข้าสู่ `<HeroWidget />`
- **`HeroWidget` (`components/hero-widget.tsx`):**
  - แสดงรูปโปรไฟล์ `/Me_Image.jpg` ด้วย `next/image` (`priority` เพื่อเพิ่มประสิทธิภาพ LCP)
  - รองรับโหมดแอนิเมชันชื่อ 4 รูปแบบผ่าน Prop `animationType`:
    - `"stagger"` (ค่าเริ่มต้น): ใช้ `<StaggerText />` แยกตัวอักษรทีละตัว (`delay=500ms`, `staggerDelay=100ms`)
    - `"typewriter"`: ใช้ `<TypewriterText />` พิมพ์ตัวอักษรทีละตัว (`speed=150ms`) และเรียก `onComplete` เพื่อแสดงหัวข้อย่อย คำอธิบาย และปุ่มกดตามลำดับ
    - `"gradient"`: ใช้ `<AnimatedText animation="scaleIn" />` พร้อมคลาสสีไล่เฉด `.text-gradient`
    - `"fadeIn"` (default case): ใช้ `<AnimatedText animation="fadeInUp" />`
  - **CV Download Handler (`handleDownloadCV`):** สร้าง `<a href="/cv/CV_Naruechatbu.pdf" download="CV_Naruechatbu.pdf">` แบบโปรแกรมเมติกและสั่ง `.click()`
  - **Social Links:** ปุ่มไอคอนพร้อม `aria-label` เชื่อมต่อไปยัง GitHub (`https://github.com/TXRZXN`), LinkedIn และ `mailto:naruechat.b@gmail.com`

### 6.2 Feature: `about` (`src/features/about/`)
- **Data Contracts (`types/about.types.ts`):**
  - `PersonalInfo`: `{ location: string; availability: string; tags: string[]; bioParagraphs: string[] }`
  - `ExperienceItem`: `{ title: string; company: string; period: string; description: string }`
  - `EducationItem`: `{ degree: string; school: string; period: string; description: string }`
- **Data Repository (`data/about.data.ts`):**
  - `personalInfoData`: ข้อมูลที่อยู่ (`Nonthaburi, Thailand`), สถานะการรับงาน, ป้ายกำกับ 4 รายการ และบทแนะนำตัว 3 ย่อหน้า
  - `experiencesData`: ประสบการณ์ทำงานที่ **Homepro** (Full Stack Developer `07/2022 - Present` และ Junior Developer `01/2022 - 06/2022`)
  - `educationData`: ประวัติการศึกษา 4 ระดับ (ปริญญาโท MBA Digital Financial Management `2026 - Present`, ปริญญาตรีวิศวกรรมศาสตร์ KMUTNB `2019 - 2022`, ปวช. RMUTP `2016 - 2018`, มัธยมต้น Mathayomprachaniwet `2013 - 2015`)
- **Presentation (`pages/about-page.tsx`):** เรนเดอร์ข้อมูลทั้งหมดผ่าน `<Card />` และ `<Badge />` โดยไม่มีการ Hardcode เนื้อหาลงใน JSX

### 6.3 Feature: `projects` (`src/features/projects/`)
- **Data Contracts (`types/project.types.ts`):**
  - `ProjectCategory`: `"All" | "Trading" | "Web" | "Mobile" | "Other"`
  - `ProjectItem`: `{ id, title, description, technologies: string[], images?: ProjectImage[], liveUrl?: string, githubUrl?: string, category: ProjectCategory }`
- **Data Repository (`data/projects.data.ts`):** เก็บข้อมูล 10 โปรเจกต์:
  - **หมวด `Trading` (2 โปรเจกต์):** `Candle Pattern Winrate Stats` และ `Average Daily % Change by Weekday` (พร้อม `liveUrl` บน TradingView)
  - **หมวด `Web` (1 โปรเจกต์):** `Portal` (Next.js, ASP.NET Core, SQL Server)
  - **หมวด `Mobile` (6 โปรเจกต์):** `Schematic Application`, `DC Application`, `Register Member`, `Dog Lover`, `Portfolio Website (V1)`, `Calculator`
  - **หมวด `Other` (1 โปรเจกต์):** `TicTacToe` (Java Socket TCP/IP)
- **Filterable Page (`pages/projects-page.tsx`):**
  - เก็บสถานะหมวดหมู่ที่เลือกด้วย `useState<ProjectCategory>("All")`
  - แสดงปุ่ม Filter Pills พร้อมจำนวนโปรเจกต์ในแต่ละหมวดหมู่แบบไดนามิก เช่น `All (10)`, `Trading (2)`, `Web (1)`, `Mobile (6)`, `Other (1)`
- **Carousel Card (`components/project-widget.tsx`):**
  - หากโปรเจกต์มีหลายรูปภาพ (`images.length > 1`) จะตั้งเวลา `setInterval` เลื่อนภาพอัตโนมัติทุกๆ `5000ms` และล้าง Timer เมื่อ Unmount
  - มีปุ่มเลื่อนซ้าย/ขวา (`aria-label="Previous project image"`, `"Next project image"`) และปุ่มจุด (`aria-label="Go to slide N"`)

### 6.4 Feature: `skills` (`src/features/skills/`)
- **Data Contracts (`types/skill.types.ts`):**
  - `SkillLevel`: `"Beginner" | "Intermediate" | "Advanced" | "Expert"`
  - `SkillCategory`: `"Frontend" | "Backend" | "Database" | "DevOps & Tools" | "Mobile" | "Other"`
- **Dual-Layout Widget (`components/skills-widget.tsx`):**
  - สกัดหมวดหมู่ที่ไม่ซ้ำกันด้วย `[...new Set(skills.map((s) => s.category))]`
  - ฟังก์ชัน `getLevelColor(level)` กำหนดสี Badge ตามระดับความเชี่ยวชาญ (`Expert` = สีเขียว, `Advanced` = สีน้ำเงิน, `Intermediate` = สีเหลือง, `Beginner` = สีเทา)
  - รองรับ `layout="grid"` (แสดงเป็น Card แยกตามหมวดหมู่ 3 คอลัมน์) และ `layout="list"` (แสดงเป็นแถว Badge สรุปรวม)

### 6.5 Feature: `contact` (`src/features/contact/`)
- **State & Dispatch Hook (`hooks/use-contact-form.ts`):**
  - จัดการ `formData` (`name`, `email`, `subject`, `message`, `honeypot`), สถานะกำลังส่ง `isSubmitting`, และสถานะแจ้งเตือน `toast` (`isOpen`, `type`, `message`)
  - ฟังก์ชัน `submitForm` ส่ง `POST /api/send-email` และแปลผลลัพธ์เป็น Toast แจ้งเตือนภาษาไทย/อังกฤษ พร้อมล้างฟอร์ม (`resetForm()`) เมื่อส่งสำเร็จ
- **Form Widget (`components/contact-form-widget.tsx`):**
  - แสดงการ์ดข้อมูลติดต่อ (`email`, `phone`, `location`) คู่กับการ์ดฟอร์มส่งข้อความ
  - ฝังช่อง `<input name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />` สำหรับดักจับบอทสแปม
  - จำกัดความยาวอินพุตฝั่ง Client ด้วย `maxLength` (`name: 100`, `email: 100`, `subject: 200`, `message: 2500`) สอดคล้องกับการตรวจสอบความยาวฝั่ง Server (`name <= 100`, `subject <= 200`, `message <= 2500` และตรวจสอบ `email` ด้วย `EMAIL_REGEX`)

---

## 7. Deep-Dive: Shared Infrastructure & UI Primitives (`src/shared/`)

| คอมโพเนนต์ / โมดูล | พาธ | รายละเอียดการทำงาน |
| :--- | :--- | :--- |
| **`Navigation`** | `src/shared/components/navigation.tsx` | แถบเมนูด้านบนแบบ `fixed top-0 z-50` พร้อม `backdrop-blur-md` อ่านพาธปัจจุบันด้วย `usePathname()` เพื่อไฮไลต์เมนูที่กำลังเปิดอยู่ รองรับเมนู Hamburger สำหรับหน้าจอมือถือ (`md:hidden`) |
| **`ThemeProvider`** | `src/shared/components/theme-provider.tsx` | ห่อหุ้ม `NextThemesProvider` จาก `next-themes` โดยกำหนด `attribute="class"`, `defaultTheme="light"`, `enableSystem` ใน `RootLayout` |
| **`ThemeToggle`** | `src/shared/components/theme-toggle.tsx` | ปุ่มสลับธีม Light/Dark ที่ใช้สถานะ `mounted` เพื่อป้องกันปัญหา Hydration Mismatch ระหว่าง Server กับ Client |
| **`Toast`** | `src/shared/components/ui/toast.tsx` | กล่องแจ้งเตือนลอยมุมขวาล่าง (`fixed bottom-6 right-6 z-50`) ตั้งเวลาปิดอัตโนมัติใน `4000ms` กำหนด `role="alert"` เมื่อเป็น `error` และ `role="status"` เมื่อเป็น `success`/`info` |
| **`shadcn/ui` Primitives**| `src/shared/components/ui/*` | ประกอบด้วย `Button`, `Card`, `Badge`, `Input`, `Textarea` ที่ปรับแต่งด้วย Tailwind CSS Variables และ `cn()` |
| **`cn` Utility** | `src/shared/lib/utils.ts` | ผสาน `clsx` และ `tailwind-merge` เพื่อจัดการคลาส Tailwind แบบไดนามิกโดยไม่มีปัญหา Specificity ค้าง |

---

## 8. Deep-Dive: Backend Email API & Security Architecture (`POST /api/send-email`)

Endpoint `src/app/api/send-email/route.ts` ทำหน้าที่รับข้อความจากหน้า Contact และส่งต่อไปยังอีเมลปลายทางผ่าน Zoho Mail SMTP โดยมีระบบป้องกันความปลอดภัย 4 ชั้นเรียงตามลำดับการประมวลผล:

### 8.1 ลำดับการตรวจสอบความปลอดภัย (4-Stage Security Pipeline)
1. **Stage 1 — In-Memory IP Rate Limiting (`isRateLimited`):**
   - สกัด IP ของผู้เรียกจาก Header `x-forwarded-for` (ตัวแรกสุด) หรือใช้ค่าปริยาย `127.0.0.1`
   - เก็บสถิติใน `rateLimitMap` (`Map<string, { count: number, resetAt: number }>`)
   - กฎ: อนุญาตสูงสุด **3 คำขอ ต่อหน้าต่างเวลา 10 นาที** (`10 * 60 * 1000 ms`) ต่อ 1 IP
   - หากเกินกำหนด จะตอบกลับ `HTTP 429 Too Many Requests` ทันทีโดยไม่อ่าน Body
2. **Stage 2 — Honeypot Anti-Spam Trap:**
   - หากฟิลด์ `honeypot` ใน JSON Body มีค่าไม่ว่างเปล่า ระบบจะถือว่าเป็นบอทสแปมและตอบกลับ `HTTP 200 { success: true }` แบบเงียบๆ (Silent Drop) โดยไม่เชื่อมต่อ SMTP
3. **Stage 3 — Strict Payload & Length Validation:**
   - `name`: ต้องเป็น string ที่ไม่ว่างเปล่า และมีความยาว `<= 100` ตัวอักษร
   - `email`: ต้องเป็น string ที่ตรงตามรูปแบบ `EMAIL_REGEX` (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
   - `subject`: (ถ้ามี) ต้องมีความยาว `<= 200` ตัวอักษร
   - `message`: ต้องเป็น string ที่ไม่ว่างเปล่า และมีความยาว `<= 2500` ตัวอักษร
   - หากไม่ผ่านเกณฑ์ข้อใดข้อหนึ่ง จะตอบกลับ `HTTP 400 Bad Request` พร้อมข้อความอธิบาย
4. **Stage 4 — Header Sanitization & Zoho SMTP Dispatch:**
   - ทำความสะอาดหัวข้ออีเมลด้วย `.replace(/[\r\n]/g, ' ')` เพื่อป้องกันโจมตีแบบ **SMTP Header Injection**
   - ส่งอีเมลผ่าน `nodemailer.createTransport` ไปยัง `smtp.zoho.com` พอร์ต `465` (`secure: true`) โดยดึงข้อมูลรับรองจาก Environment Variables (`EMAIL_USERNAME`, `EMAIL_PASSWORD`, `EMAIL_RECEIVER`)

---

## 9. Testing Strategy, Quality Gates & CI/CD Pipeline

โปรเจกต์บังคับใช้เกณฑ์ Coverage ขั้นต่ำ **80%** ทุกมิติ (Lines, Branches, Functions, Statements) ใน `vitest.config.ts` โดยผลลัพธ์การวัดจริงอยู่ที่ **Line Coverage ~92.01% / Branch Coverage ~85.27%** (13 Test Suites, 39 Tests ผ่านครบ 100%)

### 9.1 โครงสร้างชุดทดสอบ (`tests/`)
- **Unit Tests (`tests/unit/`):**
  - `utils.test.ts`: ทดสอบการรวมคลาสและการตัดคลาสซ้ำของ `cn()`
  - `data-contracts.test.ts`: ตรวจสอบความถูกต้องของข้อมูลทุกชุดใน `about.data.ts`, `projects.data.ts`, `skills.data.ts`, และ `contact.data.ts`
- **Component & Integration Tests (`tests/components/`):**
  - ทดสอบการเรนเดอร์ การโต้ตอบของผู้ใช้ การกรองโปรเจกต์ตามหมวดหมู่ การกดปุ่มเลื่อนภาพ Carousel การสลับธีม การเปิด/ปิดเมนูมือถือ และการส่งฟอร์มติดต่อ (ทั้งกรณีสำเร็จและกรณีเซิร์ฟเวอร์แจ้ง Error)
- **API Route Tests (`tests/api/send-email.test.ts`):**
  - จำลอง `nodemailer` ด้วย `vi.mock('nodemailer')` และทดสอบ 4 กรณีหลัก: ส่งสำเร็จ (`200`), Honeypot ดักบอท (`200` โดยไม่เรียก `sendMail`), อีเมลผิดรูปแบบ (`400`), และส่งซ้ำเกิน 3 ครั้งจาก IP เดียวกันติด Rate Limit (`429`)

### 9.2 ไปป์ไลน์ CI/CD อัตโนมัติ (`.github/workflows/ci.yml`)
ทำงานอัตโนมัติบน Ubuntu (`Node.js 20`) ทุกครั้งที่มีการ `push` หรือเปิด `pull_request` ไปยังกิ่ง `main` หรือ `master`:
1. `npm ci --legacy-peer-deps` — ติดตั้ง Dependencies ตาม Lockfile
2. `npx tsc --noEmit` — ตรวจสอบความถูกต้องของ TypeScript (ต้องเป็น 0 Errors)
3. `npx eslint src/` — ตรวจสอบมาตรฐานโค้ดด้วย ESLint (ต้องเป็น 0 Errors)
4. `npm run test:coverage` — รัน Vitest พร้อมตรวจสอบเกณฑ์ Coverage ≥ 80%
5. `npm run build` — ทดสอบการคอมไพล์ Production Build ของ Next.js

---

## 10. Coding Conventions & Extension Guide

1. **การเพิ่มผลงานโปรเจกต์ใหม่:**
   - เพิ่มรูปภาพตัวอย่างใน `public/<project-folder>/`
   - เพิ่มอ็อบเจกต์ภายใต้สัญญา `ProjectItem` ลงใน `src/features/projects/data/projects.data.ts`
   - ระบบ Filter Pills บนหน้า `/projects` และชุดทดสอบ `data-contracts.test.ts` จะรับรู้และตรวจสอบข้อมูลใหม่อัตโนมัติ
2. **การเพิ่มทักษะหรือประวัติการทำงาน:**
   - แก้ไขเฉพาะไฟล์ข้อมูล `src/features/skills/data/skills.data.ts` หรือ `src/features/about/data/about.data.ts` โดยไม่ต้องแก้ไขโค้ด UI
3. **การเพิ่ม Feature ใหม่:**
   - สร้างโฟลเดอร์ `src/features/<new-feature>/` พร้อมแยก `components/`, `data/`, `pages/`, `types/`
   - สร้างไฟล์ Route บางๆ ใน `src/app/(src)/<new-feature>/page.tsx` เพื่อกำหนด `metadata` และเรนเดอร์ Page Component จาก Feature นั้น
   - เพิ่มชุดทดสอบใน `tests/components/` และรัน `npm run test:coverage` เพื่อยืนยันว่า Coverage ไม่ต่ำกว่า 80%

---

## 11. Related Documentation Links

- 📘 [**README.md**](README.md) — คู่มือการติดตั้ง การตั้งค่า Environment Variables และคำสั่งใช้งานเบื้องต้น
- 🧩 [**docs/FEATURES_AND_COMPONENTS.md**](docs/FEATURES_AND_COMPONENTS.md) — เอกสารอ้างอิงระดับคอมโพเนนต์ Props, State, Hooks และ Data Contracts ทุกไฟล์
- 🔐 [**docs/API_AND_SECURITY.md**](docs/API_AND_SECURITY.md) — เอกสารข้อมูลจำเพาะของ API ส่งอีเมล กฎการตรวจสอบข้อมูล และมาตรการความปลอดภัย
- 🧪 [**docs/TESTING_AND_DEPLOYMENT.md**](docs/TESTING_AND_DEPLOYMENT.md) — คู่มือการเขียนและรันชุดทดสอบ Vitest, โครงสร้าง Mocks, CI/CD และการ Deploy บน Vercel
- 📋 [**TASK.md**](TASK.md) — บันทึกความคืบหน้าของงานและแผนพัฒนาต่อยอด (Milestones & Roadmap)
