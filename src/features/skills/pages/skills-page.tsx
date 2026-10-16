import SkillsWidget from "@/features/skills/components/skills-widget"
import { skillsData } from "@/features/skills/data/skills.data"

export default function SkillsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Skills & Technologies</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Here are the technologies, languages, and trading tools I work with to build robust solutions.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="animate-fade-in">
        <SkillsWidget skills={skillsData} layout="grid" showCategories={true} />
      </div>

      {/* Skills List Overview */}
      <div className="animate-fade-in pt-8 border-t border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">All Skills Overview</h2>
        <SkillsWidget skills={skillsData} layout="list" showCategories={true} />
      </div>
    </div>
  )
}
