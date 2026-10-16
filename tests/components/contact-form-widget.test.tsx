import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactFormWidget from '@/features/contact/components/contact-form-widget'

const sampleContactInfo = {
  email: 'test@example.com',
  phone: '+66 12 345 6789',
  location: 'Bangkok, Thailand',
}

describe('ContactFormWidget', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders contact information correctly', () => {
    render(<ContactFormWidget contactInfo={sampleContactInfo} />)

    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByText('+66 12 345 6789')).toBeInTheDocument()
    expect(screen.getByText('Bangkok, Thailand')).toBeInTheDocument()
  })

  it('handles input changes and submits form successfully', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: async () => ({ success: true }),
    })
    vi.stubGlobal('fetch', mockFetch)

    render(<ContactFormWidget contactInfo={sampleContactInfo} />)

    fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByPlaceholderText('Your Email'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Subject'), { target: { value: 'Inquiry' } })
    fireEvent.change(screen.getByPlaceholderText('Your Message'), { target: { value: 'Hello there!' } })

    const submitBtn = screen.getByRole('button', { name: /Send Message/i })
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/send-email', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }))
    })

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument()
      expect(screen.getByText(/Message sent successfully/i)).toBeInTheDocument()
    })
  })

  it('handles submit failure gracefully', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: async () => ({ success: false, error: 'SMTP Failed' }),
    })
    vi.stubGlobal('fetch', mockFetch)

    render(<ContactFormWidget contactInfo={sampleContactInfo} />)

    fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByPlaceholderText('Your Email'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Subject'), { target: { value: 'Inquiry' } })
    fireEvent.change(screen.getByPlaceholderText('Your Message'), { target: { value: 'Hello' } })

    const submitBtn = screen.getByRole('button', { name: /Send Message/i })
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText('SMTP Failed')).toBeInTheDocument()
    })
  })
})
