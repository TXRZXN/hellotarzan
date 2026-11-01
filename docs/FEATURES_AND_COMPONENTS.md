# 🧩 Features, Components & Data Contracts Reference

เอกสารฉบับนี้อธิบายรายละเอียดเชิงลึกของทุกฟีเจอร์ (`src/features/*`) และคอมโพเนนต์ส่วนกลาง (`src/shared/*`) ในโปรเจกต์ **Hello Tarzan (`hellotarzan`)** ครอบคลุม Props, State, Lifecycle, Animations, และ Data Schemas ทุกตัว

---

## 1. Feature: `home` (`src/features/home/`)

### 1.1 `HomePage` (`src/features/home/pages/home-page.tsx`)
- **ประเภท:** Server Component (Page View)
- **หน้าที่:** จัดวางเลย์เอาต์กึ่งกลางหน้าจอ (`min-h-[calc(100vh-4rem)]`) และเรียกใช้ `<HeroWidget />` ด้วยค่าเริ่มต้นของเจ้าของพอร์ตโฟลิโอ:
  - `name`: `"Hello Tarzan"`
  - `title`: `"Full Stack Developer & Trading Script Creator"`
  - `animationType`: `"stagger"`
  - `showDownloadCV`: `true`
  - `showSocialLinks`: `true`

### 1.2 `HeroWidget` (`src/features/home/components/hero-widget.tsx`)
- **ประเภท:** Client Component (`"use client"`)
- **Props Interface (`HeroWidgetProps`):**
  ```ts
  export interface HeroWidgetProps {
    name: string;
    title: string;
    description: string;
    showDownloadCV?: boolean;
    showSocialLinks?: boolean;
    animationType?: "typewriter" | "stagger" | "fadeIn" | "gradient";
  }
  ```
- **Internal State:**
  - `showTitle: boolean` — ควบคุมการแสดงผลตำแหน่งงานเมื่อใช้โหมด `typewriter`
  - `showDescription: boolean` — ควบคุมการแสดงผลคำอธิบายเมื่อใช้โหมด `typewriter`
  - `showButtons: boolean` — ควบคุมการแสดงผลปุ่มแอ็กชันเมื่อใช้โหมด `typewriter`
- **พฤติกรรมสำคัญ:**
  - **รูปโปรไฟล์:** แสดง `/Me_Image.jpg` ขนาด `350×350` พิกเซลในกรอบวงกลมพร้อม `priority` เพื่อให้โหลดทันทีใน First Contentful Paint (FCP/LCP)
  - **การดาวน์โหลด CV (`handleDownloadCV`):** สร้าง DOM Element `<a>` ชี้ไปยัง `/cv/CV_Naruechatbu.pdf` กำหนดแอตทริบิวต์ `download="CV_Naruechatbu.pdf"` และสั่ง `.click()`
  - **ปุ่มโซเชียลมีเดีย:**
    - GitHub: `https://github.com/TXRZXN` (`aria-label="GitHub Profile"`)
    - LinkedIn: `https://www.linkedin.com/in/naruechat-buranasombat/` (`aria-label="LinkedIn Profile"`)
    - Email: `mailto:naruechat.b@gmail.com` (`aria-label="Send Email"`)

### 1.3 Text Animation Components (`src/features/home/components/`)

| คอมโพเนนต์ | ไฟล์ | Props | กลไกการทำงาน |
| :--- | :--- | :--- | :--- |
| **`AnimatedText`** | `animated-text.tsx` | `text: string`, `delay?: number` (0), `className?: string`, `animation?: "fadeInUp" \| "slideInLeft" \| "bounceIn" \| "scaleIn"` | ใช้ `setTimeout` ตามค่า `delay` เพื่อสลับสถานะ `isVisible` จาก `opacity-0` ไปยังคลาสแอนิเมชัน (`animate-fade-in-up` ฯลฯ) และล้าง Timer เมื่อ Unmount |
| **`StaggerText`** | `stagger-text.tsx` | `text: string`, `delay?: number` (0), `staggerDelay?: number` (100), `className?: string` | แยกข้อความเป็นอาร์เรย์ตัวอักษร เก็บสถานะ `visibleChars: boolean[]` และตั้งเวลาเปิดแสดงตัวอักษรที่ `i` ณ เวลา `delay + i * staggerDelay` (แปลงช่องว่าง `" "` เป็น `"\u00A0"`) |
| **`TypewriterText`** | `typewriter-text.tsx` | `text: string`, `delay?: number` (0), `speed?: number` (100), `className?: string`, `onComplete?: () => void` | รอเวลาเริ่มต้นตาม `delay` จากนั้นเพิ่มตัวอักษรเข้าสู่ `displayText` ทีละตัวทุกๆ `speed` มิลลิวินาที พร้อมแสดงเคอร์เซอร์กะพริบ `<span className="animate-pulse">\|</span>` และเรียก `onComplete()` เมื่อพิมพ์ครบ |

---

## 2. Feature: `about` (`src/features/about/`)

### 2.1 Data Contracts (`src/features/about/types/about.types.ts`)
```ts
export interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string
}

export interface EducationItem {
  degree: string
  school: string
  period: string
  description: string
}

export interface PersonalInfo {
  location: string
  availability: string
  tags: string[]
  bioParagraphs: string[]
}
```

### 2.2 Static Data (`src/features/about/data/about.data.ts`)
- **`personalInfoData`:**
  - `location`: `"Nonthaburi, Thailand"`
  - `availability`: `"Open to freelance or side projects"`
  - `tags`: `["Problem Solver", "Algo Trading", "Continuous Learner", "Tech Enthusiast"]`
  - `bioParagraphs`: 3 ย่อหน้าอธิบายประสบการณ์ 3 ปีด้าน Full-Stack / Mobile (Dart, C#, Next.js, Flutter, React) และการพัฒนากลยุทธ์เทรดอัตโนมัติ (Pine Script, MQL5)
- **`experiencesData` (2 รายการ):**
  1. `Full Stack Developer` @ `Homepro` (`07/2022 - Present`)
  2. `Junior Developer` @ `Homepro` (`01/2022 - 06/2022`)
- **`educationData` (4 รายการ):**
  1. `Master of Business Administration (MBA) in Digital Financial Management` (`2026 - Present`)
  2. `Bachelor of Engineering Program in Electronic Engineering Technology` — KMUTNB (`2019 - 2022`)
  3. `Vocational Certificate in Electronic Engineering` — RMUTP (`2016 - 2018`)
  4. `Lower Secondary Education (Math & Science Program)` — Mathayomprachaniwet School (`2013 - 2015`)

### 2.3 `AboutPage` (`src/features/about/pages/about-page.tsx`)
- แบ่งการแสดงผลออกเป็น 3 ส่วนหลัก:
  1. **Personal Information Card:** แสดง `bioParagraphs`, ที่อยู่พร้อมไอคอน `MapPin`, สถานะรับงานพร้อมไอคอน `Calendar`, และป้ายกำกับ `tags`
  2. **Work Experience Section:** แสดงรายการ `experiencesData` พร้อมป้ายกำกับช่วงเวลาสีน้ำเงิน
  3. **Education Section:** แสดงรายการ `educationData` เรียงลำดับจากปัจจุบันไปอดีต

---

## 3. Feature: `projects` (`src/features/projects/`)

### 3.1 Data Contracts (`src/features/projects/types/project.types.ts`)
```ts
export interface ProjectImage {
  src: string
  alt: string
}

export type ProjectCategory = "All" | "Trading" | "Web" | "Mobile" | "Other"

export interface ProjectItem {
  id: string
  title: string
  description: string
  technologies: string[]
  images?: ProjectImage[]
  liveUrl?: string
  githubUrl?: string
  category: ProjectCategory
}
```

### 3.2 รายการโปรเจกต์ในระบบ (`src/features/projects/data/projects.data.ts`)

| ID | ชื่อโปรเจกต์ | หมวดหมู่ | เทคโนโลยีหลัก | ลิงก์ / รูปภาพ |
| :--- | :--- | :--- | :--- | :--- |
| `candle-pattern-winrate` | **Candle Pattern Winrate Stats** | `Trading` | Pine Script v5, TradingView, Quantitative Statistics | [TradingView Script](https://th.tradingview.com/script/V7zrJCBC/) |
| `avg-daily-pct-weekday` | **Average Daily % Change by Weekday** | `Trading` | Pine Script v5, TradingView, Seasonality Analysis | [TradingView Script](https://th.tradingview.com/script/m0KdniVv/) |
| `schematic` | **Schematic Application** | `Mobile` | Flutter, Dart, C#, MySQL, Gitlab | 7 รูปภาพ (`/schematic/*`) |
| `dc-app` | **DC Application** | `Mobile` | Flutter, Dart, C#, MySQL, Gitlab | 9 รูปภาพ (`/mbdc/*`) |
| `register-member` | **Register Member** | `Mobile` | Flutter, Dart, C#, MySQL, Gitlab | 5 รูปภาพ (`/rmm/*`) |
| `portal` | **Portal** | `Web` | Next.js, React, TailwindCSS, ASP.NET Core, C#, GitLab, SQL Server, Swagger | 6 รูปภาพใน `projects.data.ts` (`portal1.png`–`portal5.png`, `portal7.png` จาก 7 ไฟล์ใน `/portal/*`) |
| `dog-lover` | **Dog Lover** | `Mobile` | Flutter, Dart, Firebase, Google Map Api | 9 รูปภาพ + [GitHub Repo](https://github.com/TXRZXN/DogLover_MobileApp) |
| `portfolio-v1` | **Portfolio Website (V1)** | `Mobile` | Flutter, Dart | 6 รูปภาพ + [GitHub Repo](https://github.com/TXRZXN/hellotarzan) |
| `tictactoe` | **TicTacToe** | `Other` | Java, Java Socket, TCP/IP, OOP | [GitHub Repo](https://github.com/TXRZXN/Tictactoe_javasocket) |
| `calculator` | **Calculator** | `Mobile` | Kotlin, Android SDK, XML Layout | [GitHub Repo](https://github.com/TXRZXN/Calculator_Kotlin) |

### 3.3 `ProjectsPage` (`src/features/projects/pages/projects-page.tsx`)
- **ประเภท:** Client Component (`"use client"`)
- **State:** `selectedCategory: ProjectCategory` (ค่าเริ่มต้น `"All"`)
- **การกรองข้อมูล:**
  - เมื่อ `selectedCategory === "All"` จะแสดง `projectsData` ทั้งหมด (10 รายการ)
  - เมื่อเลือกหมวดหมู่อื่น จะกรองเฉพาะ `p.category === selectedCategory`
  - ปุ่ม Filter Pills แสดงจำนวนรายการในวงเล็บเสมอ เช่น `Trading (2)`, `Mobile (6)`

### 3.4 `ProjectWidget` (`src/features/projects/components/project-widget.tsx`)
- **ประเภท:** Client Component (`"use client"`)
- **State:** `currentImageIndex: number` (ค่าเริ่มต้น `0`)
- **Auto-Carousel Lifecycle:**
  - หาก `images.length > 1` จะตั้ง `setInterval` ทุกๆ `5000ms` เพื่อเลื่อน `currentImageIndex` แบบวนลูป `(prevIndex + 1) % images.length`
  - มีฟังก์ชัน `goToNextImage()` และ `goToPreviousImage()` พร้อมปุ่มลูกศรและจุดเลือกสไลด์ (`aria-label="Go to slide N"`)
- **Action Footer:**
  - แสดงปุ่ม **Live Demo** เมื่อมี `liveUrl`
  - แสดงปุ่ม **GitHub Repo** เมื่อมี `githubUrl`

---

## 4. Feature: `skills` (`src/features/skills/`)

### 4.1 Data Contracts (`src/features/skills/types/skill.types.ts`)
```ts
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert"
export type SkillCategory = "Frontend" | "Backend" | "Database" | "DevOps & Tools" | "Mobile" | "Other"

export interface SkillItem {
  name: string
  level: SkillLevel
  category: SkillCategory
}
```

### 4.2 `SkillsPage` & `SkillsWidget`
- **`SkillsPage` (`pages/skills-page.tsx`):** เรียกใช้ `<SkillsWidget />` 2 ครั้งในหน้าเดียวกัน:
  1. ส่วนบน: `layout="grid"` แสดงการ์ดแยกตามหมวดหมู่ 6 หมวดหมู่
  2. ส่วนล่าง (`All Skills Overview`): `layout="list"` แสดงป้ายกำกับเรียงเป็นรายการสรุป
- **การกำหนดสีตามระดับทักษะ (`getLevelColor`):**
  - `Expert`: สีเขียว (`bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`)
  - `Advanced`: สีน้ำเงิน (`bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400`)
  - `Intermediate`: สีเหลือง (`bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400`)
  - `Beginner`: สีเทา (`bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400`)

---

## 5. Feature: `contact` (`src/features/contact/`)

### 5.1 Data Contracts (`src/features/contact/types/contact.types.ts`)
```ts
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  honeypot?: string
}

export interface ContactInfo {
  email: string
  phone: string
  location: string
}

export interface ContactApiResponse {
  success: boolean
  error?: string
}
```

### 5.2 Custom Hook: `useContactForm` (`src/features/contact/hooks/use-contact-form.ts`)
- **ค่าที่ส่งกลับ (Return Contract):**
  - `formData: ContactFormData`
  - `isSubmitting: boolean`
  - `toast: { isOpen: boolean; type: "success" | "error"; message: string }`
  - `closeToast: () => void`
  - `handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void`
  - `submitForm: (e: React.FormEvent) => Promise<void>`
  - `resetForm: () => void`
- **พฤติกรรมการส่งข้อมูล (`submitForm`):**
  1. เรียก `e.preventDefault()` และตั้งค่า `isSubmitting = true`
  2. ส่ง `fetch("/api/send-email", { method: "POST", body: JSON.stringify(formData) })`
  3. หาก `data.success === true`: เปิด Toast สีเขียว (`type: "success"`) และเรียก `resetForm()`
  4. หาก `data.success === false`: เปิด Toast สีแดง (`type: "error"`) แสดงข้อความ `data.error` จากเซิร์ฟเวอร์
  5. หากเกิดข้อผิดพลาดระดับเครือข่าย (`catch`): เปิด Toast สีแดงแจ้งเตือนปัญหาการเชื่อมต่อ
  6. คืนค่า `isSubmitting = false` ในบล็อก `finally` เสมอ

---

## 6. Shared Components & Primitives (`src/shared/`)

### 6.1 `Navigation` (`src/shared/components/navigation.tsx`)
- รายการเมนู (`navItems`): `Home (/)`, `About (/about)`, `Skills (/skills)`, `Projects (/projects)`, `Contact (/contact)`
- ไฮไลต์ลิงก์ปัจจุบันเมื่อ `pathname === item.href`
- บนหน้าจอมือถือ (`md:hidden`) มีปุ่มสลับเมนู (`aria-label="Toggle navigation menu"`) และจะปิดเมนูอัตโนมัติเมื่อผู้ใช้คลิกลิงก์ใดๆ (`onClick={() => setIsOpen(false)}`)

### 6.2 `ThemeProvider` & `ThemeToggle` (`src/shared/components/`)
- `ThemeToggle` ใช้ `const [mounted, setMounted] = React.useState(false)` ร่วมกับ `useEffect` เพื่อเรนเดอร์ปุ่ม Placeholder ก่อน Hydration เสร็จสิ้น ป้องกันปัญหา React Hydration Mismatch จากธีมฝั่งไคลเอนต์

### 6.3 `Toast` (`src/shared/components/ui/toast.tsx`)
- รองรับ 3 ประเภท: `"success"`, `"error"`, `"info"`
- ตั้งเวลาปิดตัวเองอัตโนมัติหลังครบ `duration` (ค่าเริ่มต้น `4000ms`)
- รองรับ Accessibility ด้วย `role={isError ? "alert" : "status"}` และ `aria-live="polite"` พร้อมปุ่มปิด (`aria-label="Close notification"`)
