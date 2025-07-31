import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // สร้าง transporter ของ Nodemailer (ตัวอย่างใช้ Gmail SMTP)
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,          
        secure: true,       
        auth: {
            user: process.env.EMAIL_USERNAME, 
            pass: process.env.EMAIL_PASSWORD, 
        },
    })

    // กำหนดข้อมูลอีเมลที่จะส่ง
    const mailOptions = {
      from: process.env.EMAIL_USERNAME, // อีเมลผู้ส่ง
      to: process.env.EMAIL_RECEIVER, // อีเมลที่จะรับข้อความนี้
      subject: `[Contact Form] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }

    // ส่งอีเมล
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send email error:', error)
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
