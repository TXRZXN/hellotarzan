import { describe, it, expect } from 'vitest'
import { personalInfoData, experiencesData, educationData } from '@/features/about/data/about.data'
import { projectsData } from '@/features/projects/data/projects.data'
import { skillsData } from '@/features/skills/data/skills.data'
import { contactInfoData } from '@/features/contact/data/contact.data'

describe('Data Contracts & Decoupled Integrity', () => {
  it('validates personal information data integrity', () => {
    expect(personalInfoData.location).toBeTruthy()
    expect(personalInfoData.bioParagraphs.length).toBeGreaterThan(0)
    expect(personalInfoData.tags.length).toBeGreaterThan(0)
  })

  it('validates experience and education history', () => {
    expect(experiencesData.length).toBeGreaterThan(0)
    experiencesData.forEach((exp) => {
      expect(exp.title).toBeTruthy()
      expect(exp.company).toBeTruthy()
      expect(exp.period).toBeTruthy()
    })

    expect(educationData.length).toBeGreaterThan(0)
    educationData.forEach((edu) => {
      expect(edu.degree).toBeTruthy()
      expect(edu.school).toBeTruthy()
    })
  })

  it('validates projects data and categories', () => {
    expect(projectsData.length).toBeGreaterThanOrEqual(8)
    projectsData.forEach((project) => {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.technologies.length).toBeGreaterThan(0)
      expect(['All', 'Trading', 'Web', 'Mobile', 'Other']).toContain(project.category)
    })
  })

  it('validates skills data categories and levels', () => {
    expect(skillsData.length).toBeGreaterThan(20)
    const validLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    skillsData.forEach((skill) => {
      expect(skill.name).toBeTruthy()
      expect(validLevels).toContain(skill.level)
    })
  })

  it('validates contact information', () => {
    expect(contactInfoData.email).toContain('@')
    expect(contactInfoData.phone).toBeTruthy()
    expect(contactInfoData.location).toBeTruthy()
  })
})
