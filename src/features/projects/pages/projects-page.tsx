"use client";

import { useState } from "react";
import ProjectWidget from "@/features/projects/components/project-widget";
import { projectsData } from "@/features/projects/data/projects.data";
import { ProjectCategory } from "@/features/projects/types/project.types";
import { Button } from "@/shared/components/ui/button";

const categories: ProjectCategory[] = ["All", "Trading", "Web", "Mobile", "Other"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");

  const filteredProjects = selectedCategory === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          My Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A showcase of full-stack web applications, internal enterprise tools, mobile experiences, and quantitative trading scripts.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full px-4 text-xs tracking-wide transition-all cursor-pointer"
            >
              {category}
              {category === "All" ? ` (${projectsData.length})` : ` (${projectsData.filter((p) => p.category === category).length})`}
            </Button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
        {filteredProjects.map((project) => (
          <ProjectWidget key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}
