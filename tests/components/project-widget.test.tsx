import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ProjectWidget from '@/features/projects/components/project-widget'

const sampleProject = {
  title: 'Test Project',
  description: 'This is a test project description',
  technologies: ['Next.js', 'TypeScript', 'TailwindCSS'],
  images: [
    { src: '/test1.jpg', alt: 'Test image 1' },
    { src: '/test2.jpg', alt: 'Test image 2' },
  ],
  liveUrl: 'https://example.com/demo',
  githubUrl: 'https://github.com/example/repo',
}

describe('ProjectWidget', () => {
  it('renders project title, description, and technology badges', () => {
    render(<ProjectWidget {...sampleProject} />)

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('This is a test project description')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('TailwindCSS')).toBeInTheDocument()
  })

  it('renders live demo and github repo buttons when provided', () => {
    render(<ProjectWidget {...sampleProject} />)

    const liveLink = screen.getByRole('link', { name: /Live Demo/i })
    expect(liveLink).toHaveAttribute('href', 'https://example.com/demo')

    const githubLink = screen.getByRole('link', { name: /GitHub Repo/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/example/repo')
  })

  it('renders image carousel and navigates images on button click', () => {
    render(<ProjectWidget {...sampleProject} />)

    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThanOrEqual(2)

    // Find previous and next buttons
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)

    // Click next button
    fireEvent.click(buttons[1])
    // Click prev button
    fireEvent.click(buttons[0])
  })
})
