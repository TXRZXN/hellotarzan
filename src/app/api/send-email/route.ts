import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// In-Memory Rate Limiter (IP -> { count, resetAt })
interface RateLimitRecord {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitRecord>()
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 3

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  record.count += 1
  return false
}

// Simple email regex validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    // 1. IP Detection for Rate Limiting
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'ส่งข้อความบ่อยเกินไป กรุณารอ 10 นาทีก่อนลองใหม่อีกครั้ง (Too many requests)',
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, subject, message, honeypot } = body

    // 2. Honeypot Anti-Spam Check (Bots tend to fill hidden fields)
    if (honeypot) {
      // Silently accept without sending email
      return NextResponse.json({ success: true })
    }

    // 3. Strict Input Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอกชื่อของคุณ (Name is required)' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'รูปแบบอีเมลไม่ถูกต้อง (Valid email is required)' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอกข้อความ (Message is required)' },
        { status: 400 }
      )
    }

    if (name.length > 100 || (subject && subject.length > 200) || message.length > 2500) {
      return NextResponse.json(
        { success: false, error: 'ข้อความหรือข้อมูลมีความยาวเกินกำหนด (Input exceeds length limit)' },
        { status: 400 }
      )
    }

    // 4. Send via Nodemailer SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const cleanSubject = (subject || 'New Contact Message').replace(/[\r\n]/g, ' ')
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.EMAIL_RECEIVER,
      subject: `[Contact Form] ${cleanSubject}`,
      text: `From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send email error:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
