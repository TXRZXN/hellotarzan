import HeroWidget from "@/features/home/components/hero-widget";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl mx-auto w-full">
        <HeroWidget
          name="Hello Tarzan"
          title="Full Stack Developer & Trading Script Creator"
          description="Passionate about building clean, efficient, and user-friendly applications. I specialize in full stack web development and Pinescript strategies, turning complex challenges into simple, elegant solutions with a modern and approachable style."
          showDownloadCV={true}
          showSocialLinks={true}
          animationType="stagger"
        />
      </div>
    </div>
  );
}
