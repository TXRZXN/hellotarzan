# 🔐 Backend Email API & Security Specification

เอกสารฉบับนี้อธิบายรายละเอียดของ Endpoint **`POST /api/send-email`** (`src/app/api/send-email/route.ts`) รวมถึงสถาปัตยกรรมการป้องกันสแปม การตรวจสอบความถูกต้องของข้อมูล และการเชื่อมต่อ Zoho Mail SMTP

---

## 1. Endpoint Overview

- **URL Path:** `/api/send-email`
- **HTTP Method:** `POST`
- **Content-Type:** `application/json`
- **Source File:** [`src/app/api/send-email/route.ts`](../src/app/api/send-email/route.ts)
- **Interactive Sequence Diagram:** [`.archify/sequence-contact-email-flow-20261101-153630/contact-email-flow.html`](../.archify/sequence-contact-email-flow-20261101-153630/contact-email-flow.html)

---

## 2. Request & Response Contract

### 2.1 Request Payload (`ContactFormData`)
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "subject": "Project Collaboration Inquiry",
  "message": "Hello, I would like to discuss a full-stack web application project.",
  "honeypot": ""
}
```

| ฟิลด์ | ชนิดข้อมูล | จำเป็น (Required) | ข้อจำกัดความยาว / รูปแบบ | คำอธิบาย |
| :--- | :--- | :--- | :--- | :--- |
| `name` | `string` | ✅ ใช่ | `1 - 100` ตัวอักษร (ตรวจสอบทั้งใน UI `maxLength={100}` และใน API `name.length <= 100`) | ชื่อผู้ติดต่อ |
| `email` | `string` | ✅ ใช่ | ตรงตาม `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` ใน API (และจำกัด `maxLength={100}` ในฟอร์ม UI) | อีเมลสำหรับติดต่อกลับ |
| `subject` | `string` | ❌ ไม่บังคับ (ใน API) / ✅ บังคับในฟอร์ม UI | `<= 200` ตัวอักษร (หากไม่ส่งมาจะใช้ `"New Contact Message"`) | หัวข้อข้อความ |
| `message` | `string` | ✅ ใช่ | `1 - 2500` ตัวอักษร (ตรวจสอบทั้งใน UI `maxLength={2500}` และใน API `message.length <= 2500`) | รายละเอียดข้อความ |
| `honeypot`| `string` | ❌ ไม่บังคับ | ต้องเป็นค่าว่าง `""` หรือ `undefined` สำหรับผู้ใช้จริง | ช่องดักจับบอทสแปมที่ซ่อนอยู่ในฟอร์ม |

### 2.2 Response Codes & Payloads (`ContactApiResponse`)

| HTTP Status | สถานการณ์ | ตัวอย่าง JSON Response |
| :--- | :--- | :--- |
| **`200 OK`** | ส่งอีเมลสำเร็จ (หรือดักจับบอทผ่าน Honeypot แบบเงียบๆ) | `{ "success": true }` |
| **`400 Bad Request`** | ไม่ได้ระบุชื่อ (`name` ว่างเปล่า) | `{ "success": false, "error": "กรุณากรอกชื่อของคุณ (Name is required)" }` |
| **`400 Bad Request`** | รูปแบบอีเมลไม่ถูกต้อง | `{ "success": false, "error": "รูปแบบอีเมลไม่ถูกต้อง (Valid email is required)" }` |
| **`400 Bad Request`** | ไม่ได้ระบุข้อความ (`message` ว่างเปล่า) | `{ "success": false, "error": "กรุณากรอกข้อความ (Message is required)" }` |
| **`400 Bad Request`** | ข้อมูลเกินความยาวสูงสุด (`name > 100`, `subject > 200`, หรือ `message > 2500`) | `{ "success": false, "error": "ข้อความหรือข้อมูลมีความยาวเกินกำหนด (Input exceeds length limit)" }` |
| **`429 Too Many Requests`**| ส่งคำขอเกิน 3 ครั้งภายในเวลา 10 นาทีจาก IP เดียวกัน | `{ "success": false, "error": "ส่งข้อความบ่อยเกินไป กรุณารอ 10 นาทีก่อนลองใหม่อีกครั้ง (Too many requests)" }` |
| **`500 Internal Server Error`**| เกิดข้อผิดพลาดในการเชื่อมต่อ SMTP หรือ JSON Parse ล้มเหลว | `{ "success": false, "error": "<Error Message>" }` |

---

## 3. Defense-in-Depth Security Controls

### 3.1 In-Memory IP Rate Limiting
- **การระบุ IP:** อ่านค่าแรกจาก Header `x-forwarded-for` (`forwardedFor.split(',')[0].trim()`) หากไม่มีจะใช้ `127.0.0.1`
- **พารามิเตอร์:**
  - `RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000` (10 นาที)
  - `MAX_REQUESTS_PER_WINDOW = 3` (สูงสุด 3 ครั้งต่อหน้าต่างเวลา)
- **อัลกอริทึม (`isRateLimited`):**
  1. หากยังไม่มีประวัติของ IP นี้ หรือเวลาปัจจุบันเกิน `record.resetAt` แล้ว ระบบจะรีเซ็ตตัวนับเป็น `{ count: 1, resetAt: now + 600000 }` และอนุญาตให้ผ่าน (`false`)
  2. หาก `record.count >= 3` ระบบจะบล็อกทันที (`true`) และคืนค่า `429`
  3. มิฉะนั้นจะเพิ่ม `record.count += 1` และอนุญาตให้ผ่าน (`false`)

### 3.2 Honeypot Bot Trap
- ใน `ContactFormWidget` มีฟิลด์ `<input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />`
- ผู้ใช้งานจริงที่เปิดผ่านเบราว์เซอร์จะไม่เห็นและไม่กรอกช่องนี้ แต่สคริปต์บอทอัตโนมัติมักกรอกทุก `<input>` ในฟอร์ม
- เมื่อเซิร์ฟเวอร์พบว่า `if (honeypot)` เป็นจริง จะคืนค่า `{ "success": true }` ทันทีโดยไม่ส่งอีเมล เพื่อไม่ให้บอททราบว่าถูกบล็อกและช่วยประหยัดโควตา SMTP

### 3.3 SMTP Header Injection Prevention
- ก่อนนำ `subject` ไปประกอบเป็นหัวข้ออีเมล ระบบทำความสะอาดตัวอักษรขึ้นบรรทัดใหม่ด้วย:
  ```ts
  const cleanSubject = (subject || 'New Contact Message').replace(/[\r\n]/g, ' ')
  ```
- ป้องกันไม่ให้ผู้ไม่หวังดีแทรก `\r\nBcc:` หรือ Header แปลกปลอมลงในคำสั่ง SMTP

### 3.4 Secure Zoho Mail SMTP Transport
- เชื่อมต่อกับ `smtp.zoho.com` บนพอร์ต `465` (`secure: true` — Implicit TLS)
- ข้อมูลรับรองทั้งหมดถูกดึงจาก Environment Variables ฝั่งเซิร์ฟเวอร์เท่านั้น ไม่มีการเปิดเผยสู่ฝั่งไคลเอนต์ (`NEXT_PUBLIC_*` ไม่ถูกใช้งานสำหรับความลับ):
  - `EMAIL_USERNAME`: บัญชีอีเมลผู้ส่งของ Zoho Mail
  - `EMAIL_PASSWORD`: รหัสผ่านหรือ App-Specific Password ของ Zoho Mail
  - `EMAIL_RECEIVER`: อีเมลปลายทางสำหรับรับข้อความติดต่อ

---

## 4. ตัวอย่างการทดสอบเรียก API ด้วย cURL

```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -H "x-forwarded-for: 203.0.113.10" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Hello from cURL",
    "message": "Testing the contact endpoint."
  }'
```
