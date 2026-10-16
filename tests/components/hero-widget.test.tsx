import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import HeroWidget from '@/features/home/components/hero-widget'

describe('HeroWidget', () => {
  it('renders hero image, title, and description with stagger animation', () => {
    render(
      <HeroWidget
        name="Hello Tarzan"
        title="Full Stack Developer"
        description="Building clean applications"
        showDownloadCV={true}
        showSocialLinks={true}
        animationType="stagger"
      />
    )

    expect(screen.getByRole('img', { name: /Naruechat Buranasombat/i })).toBeInTheDocument()
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument()
    expect(screen.getByText('Building clean applications')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Download CV/i })).toBeInTheDocument()
  })

  it('renders with gradient animation', () => {
    render(
      <HeroWidget
        name="Hello Tarzan"
        title="Full Stack Developer"
        description="Building clean applications"
        animationType="gradient"
      />
    )
    expect(screen.getByText('Hello Tarzan')).toBeInTheDocument()
  })

  it('renders with default animation', () => {
    render(
      <HeroWidget
        name="Hello Tarzan"
        title="Full Stack Developer"
        description="Building clean applications"
        animationType="fadeIn"
      />
    )
    expect(screen.getByText('Hello Tarzan')).toBeInTheDocument()
  })

  it('handles CV download click', () => {
    const clickSpy = vi.fn()
    const originalCreateElement = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      const el = originalCreateElement(tagName)
      if (tagName === 'a') {
        el.click = clickSpy
      }
      return el
    })

    render(
      <HeroWidget
        name="Hello Tarzan"
        title="Full Stack Developer"
        description="Building clean applications"
        showDownloadCV={true}
      />
    )

    const downloadBtn = screen.getByRole('button', { name: /Download CV/i })
    fireEvent.click(downloadBtn)

    expect(clickSpy).toHaveBeenCalled()
    vi.restoreAllMocks()
  })
})
