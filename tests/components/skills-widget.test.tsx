import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SkillsWidget from '@/features/skills/components/skills-widget'
import { SkillItem } from '@/features/skills/types/skill.types'

const sampleSkills: SkillItem[] = [
  { name: 'React', level: 'Intermediate', category: 'Frontend' },
  { name: 'HTML', level: 'Advanced', category: 'Frontend' },
  { name: 'C#', level: 'Expert', category: 'Backend' },
  { name: 'Python', level: 'Beginner', category: 'Backend' },
]

describe('SkillsWidget', () => {
  it('renders categories and skills correctly in grid layout', () => {
    render(<SkillsWidget skills={sampleSkills} layout="grid" />)
    
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('HTML')).toBeInTheDocument()
    expect(screen.getByText('C#')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
  })

  it('renders in list layout with categories', () => {
    render(<SkillsWidget skills={sampleSkills} layout="list" showCategories={true} />)
    
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('React • Intermediate')).toBeInTheDocument()
    expect(screen.getByText('HTML • Advanced')).toBeInTheDocument()
  })

  it('renders in list layout without categories', () => {
    render(<SkillsWidget skills={sampleSkills} layout="list" showCategories={false} />)
    
    expect(screen.getByText('React • Intermediate')).toBeInTheDocument()
    expect(screen.getByText('C# • Expert')).toBeInTheDocument()
  })
})
