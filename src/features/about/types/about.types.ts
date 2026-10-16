export interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string
}

export interface EducationItem {
  degree: string
  school: string
  period: string
  description: string
}

export interface PersonalInfo {
  location: string
  availability: string
  tags: string[]
  bioParagraphs: string[]
}
