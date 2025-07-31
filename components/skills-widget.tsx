import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Skill {
  name: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  category: string
}

interface SkillsWidgetProps {
  skills: Skill[]
  layout?: "grid" | "list"
  showCategories?: boolean
}

export default function SkillsWidget({ skills, layout = "grid", showCategories = true }: SkillsWidgetProps) {
  const categories = [...new Set(skills.map((skill) => skill.category))]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "Advanced":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "Beginner":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400"
    }
  }

  if (layout === "list") {
    return (
      <div className="space-y-6">
        {showCategories ? (
          categories.map((category) => (
            <div key={category} className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <Badge
                      key={skill.name}
                      className={`${getLevelColor(skill.level)} border border-gray-200 dark:border-gray-700`}
                    >
                      {skill.name} • {skill.level}
                    </Badge>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill.name}
                className={`${getLevelColor(skill.level)} border border-gray-200 dark:border-gray-700`}
              >
                {skill.name} • {skill.level}
              </Badge>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Card key={category} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 dark:text-white">{category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <div key={skill.name} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <Badge
                      className={`text-xs ${getLevelColor(skill.level)} border border-gray-200 dark:border-gray-700`}
                    >
                      {skill.level}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
