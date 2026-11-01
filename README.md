# 🌐 Hello Tarzan (`hellotarzan`) — Personal Portfolio & Engineering Showcase

เว็บไซต์พอร์ตโฟลิโอส่วนตัวของ **Naruechat Buranasombat (Hello Tarzan)** พัฒนาด้วยสถาปัตยกรรม **Next.js 15 (App Router)**, **React 18**, **TypeScript 5**, และ **Tailwind CSS** จัดโครงสร้างแบบ **Feature-Sliced Modular Architecture** เพื่อแสดงผลงานพัฒนาเว็บแอปพลิเคชัน โมบายล์แอปพลิเคชัน (Flutter / Kotlin) และอินดิเคเตอร์/กลยุทธ์เทรดเชิงปริมาณ (TradingView Pine Script v5 / MQL5)

- **Production URL:** [https://hellotarzan.vercel.app](https://hellotarzan.vercel.app)
- **GitHub Repository:** [https://github.com/TXRZXN/hellotarzan](https://github.com/TXRZXN/hellotarzan)

---

## ✨ คุณสมบัติหลัก (Key Features)

- **🏠 Dynamic Hero & CV Download (`/`):** หน้าแรกพร้อมแอนิเมชันข้อความ (`StaggerText`, `TypewriterText`, `AnimatedText`) ลิงก์โซเชียลมีเดีย และระบบดาวน์โหลดเรซูเม่ (`CV_Naruechatbu.pdf`)
- **👤 Professional Journey (`/about`):** แสดงประวัติส่วนตัว ประสบการณ์ทำงานจริง และประวัติการศึกษาแบบแยกชั้นข้อมูล (`about.data.ts`)
- **🚀 Filterable Project Showcase (`/projects`):** แสดงผลงาน 10 โปรเจกต์พร้อมตัวกรองหมวดหมู่แบบอินเทอร์แอคทีฟ (`All`, `Trading`, `Web`, `Mobile`, `Other`) และระบบสไลด์รูปภาพอัตโนมัติทุก 5 วินาที (Image Carousel)
- **🛠️ Categorized Skills Matrix (`/skills`):** แสดงทักษะทางเทคนิค 33 รายการ แบ่งตาม 6 หมวดหมู่ และ 4 ระดับความเชี่ยวชาญ (`Expert`, `Advanced`, `Intermediate`, `Beginner`) ทั้งในมุมมองการ์ด (`grid`) และรายการสรุป (`list`)
- **✉️ Hardened Contact & SMTP Pipeline (`/contact` + `/api/send-email`):** ฟอร์มติดต่อกลับพร้อมระบบแจ้งเตือน `Toast` แบบ Accessible และการป้องกันสแปมฝั่งเซิร์ฟเวอร์ 4 ชั้น (In-Memory IP Rate Limit 3 ครั้ง/10 นาที, Honeypot Bot Trap, Regex/Length Validation, และ Header Sanitization) ก่อนส่งผ่าน **Zoho Mail SMTP (TLS Port 465)**
- **🌗 Dark / Light Theme & SEO Ready:** รองรับการสลับโหมดมืด/สว่างด้วย `next-themes`, Schema.org JSON-LD (`Person` & `WebSite`), OpenGraph/Twitter Cards, `sitemap.xml` และ `robots.txt`
- **🧪 High Test Coverage (~92% Lines):** มีชุดทดสอบอัตโนมัติ **13 Test Suites (39 Tests)** ด้วย Vitest + React Testing Library พร้อมไปป์ไลน์ GitHub Actions CI

---

## 🗺️ สารบัญเอกสารและแผนภาพสถาปัตยกรรม (Documentation & Archify Diagrams)

### เอกสารหลัก (Core Documentation)
| เอกสาร | รายละเอียด |
| :--- | :--- |
| 🏛️ [**ARCHITECTURE.md**](ARCHITECTURE.md) | สถาปัตยกรรมระบบแบบละเอียด การแบ่งเลเยอร์ โครงสร้างโฟลเดอร์ การตั้งค่า SEO และแนวทางการขยายระบบ |
| 🧩 [**docs/FEATURES_AND_COMPONENTS.md**](docs/FEATURES_AND_COMPONENTS.md) | ข้อมูลจำเพาะของทุก Feature (`home`, `about`, `projects`, `skills`, `contact`), Props, State, Hooks และ Data Contracts |
| 🔐 [**docs/API_AND_SECURITY.md**](docs/API_AND_SECURITY.md) | ข้อมูลจำเพาะของ Endpoint `POST /api/send-email`, อัลกอริทึม Rate Limit, Honeypot, และการตั้งค่า Zoho Mail SMTP |
| 🧪 [**docs/TESTING_AND_DEPLOYMENT.md**](docs/TESTING_AND_DEPLOYMENT.md) | คู่มือชุดทดสอบ Vitest ทั้ง 13 ไฟล์, โครงสร้าง Mocks, เกณฑ์ Coverage 80%, GitHub Actions CI และการ Deploy บน Vercel |
| 📋 [**TASK.md**](TASK.md) | บันทึกความคืบหน้าของแต่ละ Milestone และแผนงานในอนาคต (Roadmap) |

### แผนภาพ Interactive HTML (สร้างด้วย Archify)
สามารถเปิดไฟล์ HTML ด้านล่างในเว็บเบราว์เซอร์เพื่อสำรวจสถาปัตยกรรมแบบอินเทอร์แอคทีฟ (รองรับการซูม ค้นหาโหนด สลับธีมมืด/สว่าง และคลิกดูไฟล์โค้ดต้นทาง):
1. 🏗️ [**System Architecture Diagram**](.archify/architecture-hellotarzan-system-20261101-153500/hellotarzan-system.html) — แผนภาพสถาปัตยกรรมภาพรวมทั้งระบบ (`architecture`)
2. 🔄 [**Contact & SMTP Security Sequence**](.archify/sequence-contact-email-flow-20261101-153630/contact-email-flow.html) — ลำดับการตรวจสอบความปลอดภัยและการส่งอีเมล (`sequence`)
3. 🌳 [**Feature-Sliced Module & Test Hierarchy**](.archify/tree-hellotarzan-modules-20261101-153740/hellotarzan-modules.html) — แผนผังโครงสร้างโมดูลและชุดทดสอบ (`tree`)

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Framework:** Next.js `15.4.5` (App Router)
- **UI Library:** React `18.3.1` + TypeScript `5.x`
- **Styling & UI:** Tailwind CSS `3.4.17`, `shadcn/ui` (Radix UI Slot + CVA), `lucide-react`, `next-themes`
- **Backend / Email:** Next.js Route Handlers + `nodemailer` `7.0.5` (Zoho Mail SMTP)
- **Testing & Quality:** Vitest `5.0.5`, React Testing Library, JSDOM, V8 Coverage, ESLint

---

## 🚀 การติดตั้งและรันโปรเจกต์ในเครื่อง (Getting Started)

### 1. ความต้องการของระบบ (Prerequisites)
- **Node.js:** เวอร์ชัน `20.x` ขึ้นไป
- **npm:** มาพร้อมกับ Node.js

### 2. โคลนโปรเจกต์และติดตั้ง Dependencies
```bash
git clone https://github.com/TXRZXN/hellotarzan.git
cd hellotarzan
npm install --legacy-peer-deps
```

### 3. ตั้งค่าตัวแปรสภาพแวดล้อม (Environment Variables)
คัดลอกไฟล์ `.env.example` ไปเป็น `.env` และกรอกข้อมูลสำหรับเชื่อมต่อ Zoho Mail SMTP:
```bash
cp .env.example .env
```

รายละเอียดตัวแปรในไฟล์ `.env`:
```env
# บัญชี Zoho Mail สำหรับใช้ส่งอีเมลแจ้งเตือนจากหน้า Contact
EMAIL_USERNAME=your_zoho_account@zohomail.com
EMAIL_PASSWORD=your_zoho_app_specific_password
EMAIL_RECEIVER=your_destination_email@gmail.com
```

### 4. เริ่มต้นเซิร์ฟเวอร์พัฒนา (Start Dev Server)
```bash
npm run dev
```
เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

---

## 📜 คำสั่งใช้งานทั้งหมด (Available Scripts)

| คำสั่ง | คำอธิบาย |
| :--- | :--- |
| `npm run dev` | รันเซิร์ฟเวอร์พัฒนาที่ `http://localhost:3000` |
| `npm run build` | ล้างโฟลเดอร์ `.next` (`rimraf .next`) และคอมไพล์ Production Build |
| `npm run start` | รันเซิร์ฟเวอร์ Production หลังจากสั่ง `npm run build` แล้ว |
| `npx eslint src/` | ตรวจสอบโค้ดด้วย ESLint Flat Config (`eslint.config.mjs`) ตามที่ใช้ใน CI |
| `npm run lint` | รันคำสั่ง `next lint` ของ Next.js CLI (แนะนำให้ใช้ `npx eslint src/` แทนเพื่อหลีกเลี่ยงการติดตั้ง TypeScript ซ้ำโดยไม่ติดแฟล็ก `--legacy-peer-deps`) |
| `npx tsc --noEmit` | ตรวจสอบความถูกต้องของชนิดข้อมูล TypeScript ทั้งโปรเจกต์ |
| `npm run test` | รันชุดทดสอบ Vitest ทั้งหมด (13 ไฟล์, 39 ข้อทดสอบ) |
| `npm run test:coverage` | รันชุดทดสอบพร้อมวัด V8 Code Coverage และสร้างรายงานใน `coverage/` |

---

## 📂 โครงสร้างโปรเจกต์โดยย่อ (Project Structure)

```text
hellotarzan/
├── .agents/                 # การตั้งค่า Workspace สำหรับ AI Agent (config.json)
├── .archify/                # แผนภาพสถาปัตยกรรม Interactive HTML (Architecture, Sequence, Tree)
├── .github/workflows/       # ไปป์ไลน์ CI อัตโนมัติ (ci.yml)
├── docs/                    # เอกสารอ้างอิงเชิงลึก (Features, API & Security, Testing & Deploy)
├── public/                  # ไฟล์รูปภาพโปรเจกต์ รูปโปรไฟล์ และไฟล์เรซูเม่ PDF
├── src/
│   ├── app/                 # Thin Routing Layer (/, /about, /skills, /projects, /contact, /api/send-email)
│   ├── features/            # Feature-Sliced Domain Modules (home, about, projects, skills, contact)
│   └── shared/              # คอมโพเนนต์ส่วนกลาง (Navigation, Theme, Toast, shadcn/ui, utils)
└── tests/                   # ชุดทดสอบอัตโนมัติ (unit, components, api)
```
