# 🧪 Testing, Coverage & Deployment Guide

เอกสารฉบับนี้อธิบายสถาปัตยกรรมการทดสอบอัตโนมัติ (Automated Testing Safety Net), การจำลองสภาพแวดล้อม (Mocks), ไปป์ไลน์ CI/CD บน GitHub Actions และขั้นตอนการนำโปรเจกต์ **Hello Tarzan (`hellotarzan`)** ขึ้นใช้งานจริงบน Production

---

## 1. ภาพรวมระบบทดสอบ (Testing Architecture)

- **Test Runner:** Vitest `5.0.5`
- **DOM Environment:** `jsdom` + `@testing-library/react` + `@testing-library/jest-dom`
- **Coverage Engine:** `@vitest/coverage-v8`
- **จำนวนชุดทดสอบทั้งหมด:** **13 Test Suites (39 Tests)** — ผ่านครบ 100%
- **ผลลัพธ์ Coverage ล่าสุด:**
  - **Lines:** `92.01%` (เกณฑ์ขั้นต่ำ `80%`)
  - **Functions:** `92.59%` (เกณฑ์ขั้นต่ำ `80%`)
  - **Statements:** `90.78%` (เกณฑ์ขั้นต่ำ `80%`)
  - **Branches:** `85.27%` (เกณฑ์ขั้นต่ำ `80%`)

---

## 2. การตั้งค่าสภาพแวดล้อมการทดสอบ (`vitest.config.ts` & `tests/setup.ts`)

### 2.1 ขอบเขตการวัด Coverage (`vitest.config.ts`)
- **ไฟล์ที่นำมาคำนวณ (`include`):**
  - `src/features/**/*.{ts,tsx}`
  - `src/shared/**/*.{ts,tsx}`
  - `src/app/api/**/*.{ts,tsx}`
- **ไฟล์ที่ยกเว้น (`exclude`):**
  - `src/shared/components/ui/**` (UI Primitives มาตรฐานจาก shadcn/ui ยกเว้นส่วนที่ทดสอบผ่าน Component Tests)
  - `src/**/*.types.ts` (ไฟล์ประกาศ Type Interfaces ล้วนที่ไม่มีโค้ดรันไทม์)

### 2.2 Global & Per-Suite Mocks (`tests/setup.ts` และไฟล์ทดสอบ)
ไฟล์ `tests/setup.ts` ถูกโหลดก่อนรันทุกไฟล์ทดสอบ เพื่อตั้งค่า DOM Matchers และจำลองคอมโพเนนต์หลักของ Next.js:
1. **`@testing-library/jest-dom/vitest` (`tests/setup.ts`):** เพิ่มตัวตรวจสอบ DOM เช่น `toBeInTheDocument()`, `toHaveAttribute()`
2. **`next/image` Mock (`tests/setup.ts`):** แปลง `<Image />` ของ Next.js (ตัดพร็อพ `fill`, `priority` ออก) ให้เรนเดอร์เป็น `<img>` มาตรฐานใน JSDOM
3. **`next/link` Mock (`tests/setup.ts`):** แปลง `<Link href="...">` ของ Next.js ให้เรนเดอร์เป็น `<a href="...">` มาตรฐาน
4. **Per-Suite Mocks (ในแต่ละไฟล์ทดสอบ):**
   - `next/navigation` (`usePathname: () => '/about'`) จำลองใน `tests/components/navigation.test.tsx`
   - `next-themes` (`ThemeProvider`, `useTheme`) จำลองใน `tests/components/theme-provider.test.tsx` และ `tests/components/theme-toggle.test.tsx`
   - `nodemailer` (`createTransport` / `sendMail`) จำลองใน `tests/api/send-email.test.ts`

---

## 3. รายละเอียดชุดทดสอบทั้ง 13 ไฟล์ (`tests/`)

| หมวดหมู่ | ไฟล์ทดสอบ | จำนวนข้อ | สิ่งที่ทดสอบจริง (Verified Test Cases) |
| :--- | :--- | :---: | :--- |
| **API** | `tests/api/send-email.test.ts` | 4 | • ส่งอีเมลสำเร็จด้วย Payload ที่ถูกต้อง (`200`)<br>• ดักจับบอทด้วย `honeypot` (`200` โดยไม่เรียก `sendMail`)<br>• รูปแบบอีเมลไม่ถูกต้อง (`400`)<br>• ส่งเกิน 3 ครั้งใน 10 นาทีจาก IP เดียวกันติด Rate Limit (`429`) |
| **Unit** | `tests/unit/utils.test.ts` | 3 | • การรวมคลาสปกติ, คลาสตามเงื่อนไข (`falsy`), และการยุบคลาส Tailwind ที่ขัดแย้งกันด้วย `cn()` |
| **Unit** | `tests/unit/data-contracts.test.ts` | 5 | • ตรวจสอบความครบถ้วนและชนิดข้อมูลของ `about.data.ts`, `projects.data.ts`, `skills.data.ts`, และ `contact.data.ts` |
| **Component** | `tests/components/feature-pages.test.tsx` | 5 | • เรนเดอร์หน้า `HomePage`, `AboutPage`, `SkillsPage`, `ContactPage`<br>• ทดสอบการกดปุ่มกรองหมวดหมู่ (`Trading`, `Web`, `All`) บนหน้า `ProjectsPage` |
| **Component** | `tests/components/hero-widget.test.tsx` | 4 | • แสดงรูปโปรไฟล์ ชื่อ ตำแหน่ง คำอธิบาย และปุ่มในโหมด `stagger`<br>• ทดสอบโหมดแอนิเมชัน `gradient` และ `fadeIn`<br>• ทดสอบการคลิกปุ่ม `Download CV` (สร้าง `<a>` และสั่ง `.click()`) |
| **Component** | `tests/components/project-widget.test.tsx` | 3 | • แสดงชื่อ คำอธิบาย และป้ายเทคโนโลยี (`technologies`)<br>• แสดงปุ่มลิงก์ `Live Demo` และ `GitHub Repo`<br>• เรนเดอร์ Image Carousel และกดปุ่มเลื่อนภาพ Next / Previous |
| **Component** | `tests/components/skills-widget.test.tsx` | 3 | • ทดสอบโหมด `layout="grid"` และ `layout="list"` (ทั้งแบบ `showCategories={true}` และ `showCategories={false}`) |
| **Component** | `tests/components/contact-form-widget.test.tsx` | 3 | • เรนเดอร์ข้อมูลติดต่อ (`email`, `phone`, `location`)<br>• กรอกและส่งฟอร์มสำเร็จ แสดง Toast (`role="status"`)<br>• ส่งฟอร์มล้มเหลว (`{ success: false, error: 'SMTP Failed' }`) แสดง Toast (`role="alert"`) |
| **Component** | `tests/components/navigation.test.tsx` | 2 | • แสดงลิงก์เมนูทั้งหมดบน Desktop (`Home`, `About`, `Skills`, `Projects`, `Contact`)<br>• เปิดเมนูมือถือ (Mobile Drawer) และปิดเมื่อคลิกลิงก์ |
| **Component** | `tests/components/not-found.test.tsx` | 2 | • แสดงข้อความ `404` / `Page Not Found`<br>• ตรวจสอบลิงก์กลับหน้าหลัก (`/`) และหน้าผลงาน (`/projects`) |
| **Component** | `tests/components/text-animations.test.tsx` | 3 | • ทดสอบ Fake Timers ของ `TypewriterText` (พร้อม `onComplete`), `AnimatedText` (`slideInLeft`, `bounceIn`, `scaleIn`), และ `StaggerText` |
| **Component** | `tests/components/theme-provider.test.tsx` | 1 | • ทดสอบการห่อหุ้ม Children ด้วย `ThemeProvider` |
| **Component** | `tests/components/theme-toggle.test.tsx` | 1 | • ทดสอบการคลิกปุ่มสลับธีม (`setTheme('dark')`) |

---

## 4. คำสั่งตรวจสอบคุณภาพ (Verification Commands)

```bash
# 1. รันชุดทดสอบทั้งหมดแบบรวดเร็ว
npm run test

# 2. รันชุดทดสอบพร้อมสร้างรายงาน Coverage (Text + HTML ในโฟลเดอร์ coverage/)
npm run test:coverage

# 3. ตรวจสอบ Type Safety ด้วย TypeScript Compiler
npx tsc --noEmit

# 4. ตรวจสอบมาตรฐานโค้ดด้วย ESLint
npx eslint src/

# 5. ทดสอบการคอมไพล์ Production Build
npm run build
```

---

## 5. CI/CD Pipeline (`.github/workflows/ci.yml`)

ทุกการ `push` หรือ `pull_request` ไปยังกิ่ง `main` หรือ `master` จะรันงาน **`verify` (`Typecheck, Lint & Test`)** บน GitHub Actions (`ubuntu-latest`, `Node.js 20`):

```yaml
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: 20
      cache: 'npm'
  - run: npm ci --legacy-peer-deps
  - run: npx tsc --noEmit
  - run: npx eslint src/
  - run: npm run test:coverage
  - run: npm run build
```

---

## 6. ขั้นตอนการ Deploy ขึ้น Production (Vercel)

1. เชื่อมต่อ Repository `https://github.com/TXRZXN/hellotarzan` เข้ากับโปรเจกต์บน **Vercel**
2. ตั้งค่า **Environment Variables** ในหน้า Project Settings ของ Vercel:
   - `EMAIL_USERNAME` = อีเมลบัญชี Zoho Mail
   - `EMAIL_PASSWORD` = App-Specific Password ของ Zoho Mail
   - `EMAIL_RECEIVER` = อีเมลปลายทางสำหรับรับแจ้งเตือน
3. ตั้งค่า Build & Output Settings (ค่ามาตรฐานของ Next.js):
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install --legacy-peer-deps` (หรือ `npm ci --legacy-peer-deps`)
4. เมื่อ Deploy สำเร็จ ตรวจสอบการทำงานของ:
   - หน้าเว็บหลัก `https://hellotarzan.vercel.app`
   - แผนผังเว็บไซต์ `https://hellotarzan.vercel.app/sitemap.xml` และ `https://hellotarzan.vercel.app/robots.txt`
   - การส่งข้อความผ่านหน้า `/contact`
