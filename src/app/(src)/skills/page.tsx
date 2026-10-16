import SkillsPage from "@/features/skills/pages/skills-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills & Technologies",
  description: "Technical skills, backend languages, frontend frameworks, and trading script proficiencies.",
};

export default function Skills() {
  return <SkillsPage />;
}
