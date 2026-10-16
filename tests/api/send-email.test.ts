import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from '@/app/api/send-email/route'

const mockSendMail = vi.fn()

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: mockSendMail,
    })),
  },
}))

describe('/api/send-email route handler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('sends email successfully with valid payload', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: '12345' })

    const req = new Request('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.1.100',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Inquiry',
        message: 'Hello world',
      }),
    })

    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json).toEqual({ success: true })
    expect(mockSendMail).toHaveBeenCalled()
  })

  it('silently ignores spam when honeypot is filled', async () => {
    const req = new Request('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.1.101',
      },
      body: JSON.stringify({
        name: 'Bot Spammer',
        email: 'bot@spam.com',
        subject: 'Spam Offer',
        message: 'Buy now',
        honeypot: 'I am a bot',
      }),
    })

    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.success).toBe(true)
    expect(mockSendMail).not.toHaveBeenCalled()
  })

  it('returns 400 error when email format is invalid', async () => {
    const req = new Request('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.1.102',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'invalid-email-format',
        subject: 'Inquiry',
        message: 'Hello world',
      }),
    })

    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.success).toBe(false)
  })

  it('rate limits requests after exceeding maximum attempts from same IP', async () => {
    const testIp = '10.0.0.99'
    mockSendMail.mockResolvedValue({ messageId: 'ok' })

    const sendReq = () =>
      POST(
        new Request('http://localhost:3000/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': testIp,
          },
          body: JSON.stringify({
            name: 'Rate Tester',
            email: 'tester@example.com',
            subject: 'Ping',
            message: 'Hello',
          }),
        })
      )

    // Request 1, 2, 3 should pass
    const res1 = await sendReq()
    const res2 = await sendReq()
    const res3 = await sendReq()
    expect(res1.status).toBe(200)
    expect(res2.status).toBe(200)
    expect(res3.status).toBe(200)

    // Request 4 should be 429 Rate Limited
    const res4 = await sendReq()
    expect(res4.status).toBe(429)
    const json4 = await res4.json()
    expect(json4.success).toBe(false)
  })
})
