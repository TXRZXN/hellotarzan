import SkillsWidget from "@/components/skills-widget"

export default function Skills() {
  const skills = [
    // Frontend
    { name: "React", level: "Intermediate"as const, category: "Frontend" },
    { name: "Next.js", level: "Intermediate" as const, category:"Frontend" },
    { name: "TypeScript", level: "Intermediate" as const, category: "Frontend" },
    { name: "Tailwind CSS", level: "Advanced" as const, category: "Frontend" },
    { name: "JavaScript", level: "Intermediate" as const, category: "Frontend" },
    { name: "HTML", level: "Advanced" as const, category: "Frontend" },
    { name: "CSS", level: "Beginner" as const, category: "Frontend" },
    { name: "Bootstrap", level: "Intermediate" as const, category: "Frontend" },


    // Backend
    { name: "C# / .NET Core 8.0", level: "Intermediate" as const, category: "Backend" },
    { name: "ASP.NET Core", level: "Intermediate" as const, category: "Backend" },
    { name: "Node.js", level: "Beginner" as const, category: "Backend" },
    { name: "Express.js", level: "Beginner" as const, category: "Backend" },
    { name: "Python", level: "Beginner" as const, category: "Backend" },
    { name: "PHP", level: "Beginner" as const, category: "Backend" },
    { name: "REST APIs", level: "Intermediate" as const, category: "Backend" },

    // Database
    { name: "SQL Server (MSSQL)", level: "Intermediate" as const, category: "Database" },
    { name: "MySQL", level: "Intermediate" as const, category: "Database" },
    { name: "Firebase", level: "Beginner" as const, category: "Database" },

    // DevOps & Tools
    { name: "Docker", level: "Beginner" as const, category: "DevOps & Tools" },
    { name: "AWS", level: "Beginner" as const, category: "DevOps & Tools" },
    { name: "Git", level: "Intermediate" as const, category: "DevOps & Tools" },
    { name: "GitHub", level: "Intermediate" as const, category: "DevOps & Tools" },
    { name: "GitLab", level: "Intermediate" as const, category: "DevOps & Tools" },
    { name: "CI/CD", level: "Beginner" as const, category: "DevOps & Tools" },
    { name: "Swagger", level: "Beginner" as const, category: "DevOps & Tools" },
    { name: "Postman", level: "Intermediate" as const, category: "DevOps & Tools" },


    // Mobile
    { name: "React Native", level: "Beginner" as const, category: "Mobile" },
    { name: "Flutter", level: "Advanced" as const, category: "Mobile" },
    { name: "Xamarin", level: "Beginner" as const, category: "Mobile" },
    { name: "Kotlin", level: "Beginner" as const, category: "Mobile" },

    // Other
    { name: "TradingView Pine Script", level: "Intermediate" as const, category: "Other" },
    { name: "MQL5", level: "Intermediate" as const, category: "Other" },
    { name: "MQL4", level: "Intermediate" as const, category: "Other" },

  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Skills & Technologies</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Here are the technologies and tools I work with to bring ideas to life.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="animate-fade-in">
        <SkillsWidget skills={skills} layout="grid" showCategories={true} />
      </div>

      {/* Skills List Alternative */}
      <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">All Skills Overview</h2>
        <SkillsWidget skills={skills} layout="list" showCategories={true} />
      </div>
    </div>
  )
}
