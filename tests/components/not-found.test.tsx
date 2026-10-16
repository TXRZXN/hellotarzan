import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NotFound from '@/app/not-found'

describe('NotFound Component', () => {
  it('renders 404 header and friendly message', () => {
    render(<NotFound />)
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Page Not Found')).toBeInTheDocument()
    expect(screen.getByText(/ขออภัย ไม่พบหน้าที่คุณกำลังค้นหา/i)).toBeInTheDocument()
  })

  it('renders navigation links to home and projects', () => {
    render(<NotFound />)
    const homeLink = screen.getByRole('link', { name: /กลับหน้าหลัก/i })
    expect(homeLink).toHaveAttribute('href', '/')

    const projectsLink = screen.getByRole('link', { name: /ดูผลงานทั้งหมด/i })
    expect(projectsLink).toHaveAttribute('href', '/projects')
  })
})
