export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert"

export type SkillCategory = "Frontend" | "Backend" | "Database" | "DevOps & Tools" | "Mobile" | "Other"

export interface SkillItem {
  name: string
  level: SkillLevel
  category: SkillCategory
}
