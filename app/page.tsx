import HeroWidget from "@/components/hero-widget";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto">
        <HeroWidget
          name="Hello Tarzan"
          title="Full Stack Developer & Trading Script Creator"
          description="Passionate about building clean, efficient, and user-friendly applications. I specialize in full stack web development and Pinescript strategies, turning complex challenges into simple, elegant solutions with a modern and approachable style."
          showDownloadCV={true}
          showSocialLinks={true}
          animationType="stagger" // เปลี่ยนได้เป็น "typewriter", "fadeIn", "gradient"
        />
        {/* <h1 className="sr-only">Naruechat Buranasombat – Full Stack Developer & Trading Script Creator</h1> */}
      </div>
    </div>
  );
}
