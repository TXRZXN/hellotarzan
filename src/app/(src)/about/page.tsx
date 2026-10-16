import AboutPage from "@/features/about/pages/about-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn more about Naruechat Buranasombat's background, education, and full-stack development experience.",
};

export default function About() {
  return <AboutPage />;
}
