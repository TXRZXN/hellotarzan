export interface ProjectImage {
  src: string
  alt: string
}

export type ProjectCategory = "All" | "Trading" | "Web" | "Mobile" | "Other"

export interface ProjectItem {
  id: string
  title: string
  description: string
  technologies: string[]
  images?: ProjectImage[]
  liveUrl?: string
  githubUrl?: string
  category: ProjectCategory
}
