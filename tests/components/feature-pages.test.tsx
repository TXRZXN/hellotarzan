import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import HomePage from '@/features/home/pages/home-page'
import AboutPage from '@/features/about/pages/about-page'
import ProjectsPage from '@/features/projects/pages/projects-page'
import SkillsPage from '@/features/skills/pages/skills-page'
import ContactPage from '@/features/contact/pages/contact-page'

describe('Feature Page Views', () => {
  it('renders HomePage view', () => {
    render(<HomePage />)
    expect(screen.getByAltText('Naruechat Buranasombat')).toBeInTheDocument()
    expect(screen.getByText(/Full Stack Developer/i)).toBeInTheDocument()
  })

  it('renders AboutPage view with experiences and education', () => {
    render(<AboutPage />)
    expect(screen.getByText('About Me')).toBeInTheDocument()
    expect(screen.getByText('Work Experience')).toBeInTheDocument()
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getAllByText('Homepro').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/MBA - Digital Financial Management/i)).toBeInTheDocument()
  })

  it('renders ProjectsPage view and filters by category', () => {
    render(<ProjectsPage />)
    expect(screen.getByText('My Projects')).toBeInTheDocument()

    // Filter to Trading
    const tradingFilterBtn = screen.getByRole('button', { name: /Trading/i })
    fireEvent.click(tradingFilterBtn)
    expect(screen.getByText(/Candle Pattern Winrate Stats/i)).toBeInTheDocument()

    // Filter to Web
    const webFilterBtn = screen.getByRole('button', { name: /Web/i })
    fireEvent.click(webFilterBtn)
    expect(screen.getByText('Portal')).toBeInTheDocument()

    // Filter to All
    const allFilterBtn = screen.getByRole('button', { name: /All/i })
    fireEvent.click(allFilterBtn)
    expect(screen.getByText('Schematic Application')).toBeInTheDocument()
  })

  it('renders SkillsPage view with all sections', () => {
    render(<SkillsPage />)
    expect(screen.getByText('Skills & Technologies')).toBeInTheDocument()
    expect(screen.getByText('All Skills Overview')).toBeInTheDocument()
  })

  it('renders ContactPage view', () => {
    render(<ContactPage />)
    expect(screen.getByText('Contact Me')).toBeInTheDocument()
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    expect(screen.getAllByText('Send Message').length).toBeGreaterThanOrEqual(1)
  })
})
