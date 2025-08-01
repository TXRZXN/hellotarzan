import ProjectWidget from "@/components/project-widget";

export default function Projects() {
  const projects = [
    {
      title: "Schematic Application",
      description:
        "An internal mobile application developed for HomePro staff to inspect and report monthly product display compliance according to Planogram standards across branches.",
      technologies: ["Flutter", "Dart", "C#", "MySQL", "Gitlab"],
      images: [
        { src: "/schematic/schematic1.jpg", alt: "Example Image Schemtaic" },
        { src: "/schematic/schematic2.jpg", alt: "Example Image Schemtaic" },
        { src: "/schematic/schematic3.jpg", alt: "Example Image Schemtaic" },
        { src: "/schematic/schematic4.jpg", alt: "Example Image Schemtaic" },
        { src: "/schematic/schematic5.jpg", alt: "Example Image Schemtaic" },
        { src: "/schematic/schematic6.jpg", alt: "Example Image Schemtaic" },
        { src: "/schematic/schematic7.jpg", alt: "Example Image Schemtaic" },
      ],
    },
    {
      title: "DC Application",
      description:
        "A warehouse management app for the DC Service team, used to review and report product logistics including delivery and pickup operations.",
      technologies: ["Flutter", "Dart", "C#", "MySQL", "Gitlab"],
      images: [
        { src: "/mbdc/mbdc1.jpg", alt: "Example Image DC" },
        { src: "/mbdc/mbdc2.jpg", alt: "Example Image DC" },
        { src: "/mbdc/mbdc3.jpg", alt: "Example Image DC" },
        { src: "/mbdc/mbdc4.jpg", alt: "Example Image DC" },
        { src: "/mbdc/mbdc5.jpg", alt: "Example Image DC" },
        { src: "/mbdc/mbdc6.jpg", alt: "Example Image DC" },
        { src: "/mbdc/mbdc7.jpg", alt: "Example Image DC" },
        { src: "/mbdc/mbdc8.jpg", alt: "Example Image DC" },
        { src: "/mbdc/mbdc9.jpg", alt: "Example Image DC" },
      ],
    },
    {
      title: "Register Member",
      description:
        "An internal registration system used by HomePro staff to onboard customers into the HomeCard membership program quickly and efficiently.",
      technologies: ["Flutter", "Dart", "C#", "MySQL", "Gitlab"],
      images: [
        { src: "/rmm/rmm1.jpg", alt: "Example Image Register Member" },
        { src: "/rmm/rmm2.jpg", alt: "Example Image Register Member" },
        { src: "/rmm/rmm3.jpg", alt: "Example Image Register Member" },
        { src: "/rmm/rmm4.jpg", alt: "Example Image Register Member" },
        { src: "/rmm/rmm5.jpg", alt: "Example Image Register Member" },
      ],
    },
    {
      title: "Portal",
      description:
        "An internal web application designed as a centralized hub for employees to access internal news, announcements, and frequently used internal systems or services. It helps improve communication and workflow efficiency across departments.",
      technologies: [
        "Next.js",
        "React",
        "TailwindCSS",
        "ASP.NET Core",
        "C#",
        "GitLab",
        "SQL Server",
        "Swagger",
      ],
      images: [
        { src: "/portal/portal1.png", alt: "Example Image" },
        { src: "/portal/portal2.png", alt: "Example Image" },
        { src: "/portal/portal3.png", alt: "Example Image" },
        { src: "/portal/portal4.png", alt: "Example Image" },
        { src: "/portal/portal5.png", alt: "Example Image" },
        { src: "/portal/portal7.png", alt: "Example Image" },
      ],
    },
    {
      title: "Dog Lover",
      description:
        "A social networking app for dog enthusiasts to share photos, connect with other pet lovers, and discover the dog breeds that best match their lifestyle.",
      technologies: ["Flutter", "Dart", "Firebase", "Google Map Api"],
      images: [
        { src: "/doglover/doglover1.png", alt: "Example Image Dog Lover" },
        { src: "/doglover/doglover2.png", alt: "Example Image Dog Lover" },
        { src: "/doglover/doglover3.png", alt: "Example Image Dog Lover" },
        { src: "/doglover/doglover4.png", alt: "Example Image Dog Lover" },
        { src: "/doglover/doglover5.png", alt: "Example Image Dog Lover" },
        { src: "/doglover/doglover6.png", alt: "Example Image Dog Lover" },
        { src: "/doglover/doglover7.png", alt: "Example Image Dog Lover" },
        { src: "/doglover/doglover8.png", alt: "Example Image Dog Lover" },
        { src: "/doglover/doglover9.png", alt: "Example Image Dog Lover" },
      ],
      githubUrl: "https://github.com/TXRZXN/DogLover_MobileApp",
    },
    {
      title: "Portfolio Website(V1)",
      description:
        "A personal portfolio application developed using Flutter as a self-practice project to showcase my programming works, skills, and contact information. This first version was built with responsive design principles, smooth UI animations, and modular code structure to prepare for future iterations and scalability.",
      technologies: ["Flutter", "Dart"],
      images: [
        { src: "/port/port1.png", alt: "Example Image" },
        { src: "/port/port2.png", alt: "Example Image" },
        { src: "/port/port3.png", alt: "Example Image" },
        { src: "/port/port4.png", alt: "Example Image" },
        { src: "/port/port5.png", alt: "Example Image" },
        { src: "/port/port6.png", alt: "Example Image" },
      ],
      githubUrl: "https://github.com/TXRZXN/Calculator_Kotlin",
    },
    {
      title: "TicTacToe",
      description:
        "A university project implementing a classic two-player Tic Tac Toe game using Java and Java Socket programming. The application enables real-time gameplay between two clients over a TCP network connection, with basic server-client communication and game synchronization.",
      technologies: [
        "Java",
        "Java Socket",
        "TCP/IP",
        "Object-Oriented Programming",
      ],

      githubUrl: "https://github.com/TXRZXN/Tictactoe_javasocket",
    },
    {
      title: "Calculator",
      description:
        "A basic calculator application built as a university project using Kotlin. It supports standard arithmetic operations (addition, subtraction, multiplication, division) with a clean user interface and real-time input validation. The project was designed to practice Kotlin syntax, state handling, and UI design principles in Android development.",
      technologies: ["Kotlin", "Android SDK", "XML Layout"],

      githubUrl: "https://github.com/TXRZXN/Calculator_Kotlin",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          My Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A collection of my recent work showcasing my skills and passion for
          development.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
        {projects.map((project, index) => (
          <ProjectWidget key={index} {...project} />
        ))}
      </div>
    </div>
  );
}
