import ProjectsPage from "@/features/projects/pages/projects-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore selected full-stack, mobile, and algorithmic trading projects by Naruechat Buranasombat.",
};

export default function Projects() {
  return <ProjectsPage />;
}
