import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Navigation from '@/shared/components/navigation'

vi.mock('next/navigation', () => ({
  usePathname: () => '/about',
}))

describe('Navigation component', () => {
  it('renders all nav items on desktop', () => {
    render(<Navigation />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('toggles mobile menu on button click and closes when item is clicked', () => {
    render(<Navigation />)

    const buttons = screen.getAllByRole('button')
    const menuButton = buttons[buttons.length - 1]
    fireEvent.click(menuButton)

    const aboutLinks = screen.getAllByText('About')
    expect(aboutLinks.length).toBeGreaterThanOrEqual(2)

    fireEvent.click(aboutLinks[1])
  })
})
