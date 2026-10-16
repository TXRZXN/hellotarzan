import { ProjectItem } from "@/features/projects/types/project.types"

export const projectsData: ProjectItem[] = [
  {
    id: "candle-pattern-winrate",
    title: "Candle Pattern Winrate Stats",
    description:
      "An automated indicator published on TradingView that transforms candlestick patterns from subjective signals into objective, data-driven statistics by evaluating the historical performance and winrate of multiple candlestick patterns directly on the chart.",
    technologies: ["Pine Script v5", "TradingView", "Technical Analysis", "Quantitative Statistics"],
    category: "Trading",
    liveUrl: "https://th.tradingview.com/script/V7zrJCBC/",
  },
  {
    id: "avg-daily-pct-weekday",
    title: "Average Daily % Change by Weekday",
    description:
      "A quantitative TradingView indicator that calculates and displays the average daily percentage change for each weekday (Monday through Sunday) based on customizable historical price data, helping traders identify day-of-week bullish and bearish seasonality.",
    technologies: ["Pine Script v5", "TradingView", "Seasonality Analysis", "Quantitative Statistics"],
    category: "Trading",
    liveUrl: "https://th.tradingview.com/script/m0KdniVv/",
  },
  {
    id: "schematic",
    title: "Schematic Application",
    description:
      "An internal mobile application developed for HomePro staff to inspect and report monthly product display compliance according to Planogram standards across branches.",
    technologies: ["Flutter", "Dart", "C#", "MySQL", "Gitlab"],
    category: "Mobile",
    images: [
      { src: "/schematic/schematic1.jpg", alt: "Example Image Schematic 1" },
      { src: "/schematic/schematic2.jpg", alt: "Example Image Schematic 2" },
      { src: "/schematic/schematic3.jpg", alt: "Example Image Schematic 3" },
      { src: "/schematic/schematic4.jpg", alt: "Example Image Schematic 4" },
      { src: "/schematic/schematic5.jpg", alt: "Example Image Schematic 5" },
      { src: "/schematic/schematic6.jpg", alt: "Example Image Schematic 6" },
      { src: "/schematic/schematic7.jpg", alt: "Example Image Schematic 7" },
    ],
  },
  {
    id: "dc-app",
    title: "DC Application",
    description:
      "A warehouse management app for the DC Service team, used to review and report product logistics including delivery and pickup operations.",
    technologies: ["Flutter", "Dart", "C#", "MySQL", "Gitlab"],
    category: "Mobile",
    images: [
      { src: "/mbdc/mbdc1.jpg", alt: "Example Image DC 1" },
      { src: "/mbdc/mbdc2.jpg", alt: "Example Image DC 2" },
      { src: "/mbdc/mbdc3.jpg", alt: "Example Image DC 3" },
      { src: "/mbdc/mbdc4.jpg", alt: "Example Image DC 4" },
      { src: "/mbdc/mbdc5.jpg", alt: "Example Image DC 5" },
      { src: "/mbdc/mbdc6.jpg", alt: "Example Image DC 6" },
      { src: "/mbdc/mbdc7.jpg", alt: "Example Image DC 7" },
      { src: "/mbdc/mbdc8.jpg", alt: "Example Image DC 8" },
      { src: "/mbdc/mbdc9.jpg", alt: "Example Image DC 9" },
    ],
  },
  {
    id: "register-member",
    title: "Register Member",
    description:
      "An internal registration system used by HomePro staff to onboard customers into the HomeCard membership program quickly and efficiently.",
    technologies: ["Flutter", "Dart", "C#", "MySQL", "Gitlab"],
    category: "Mobile",
    images: [
      { src: "/rmm/rmm1.jpg", alt: "Example Image Register Member 1" },
      { src: "/rmm/rmm2.jpg", alt: "Example Image Register Member 2" },
      { src: "/rmm/rmm3.jpg", alt: "Example Image Register Member 3" },
      { src: "/rmm/rmm4.jpg", alt: "Example Image Register Member 4" },
      { src: "/rmm/rmm5.jpg", alt: "Example Image Register Member 5" },
    ],
  },
  {
    id: "portal",
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
    category: "Web",
    images: [
      { src: "/portal/portal1.png", alt: "Example Image Portal 1" },
      { src: "/portal/portal2.png", alt: "Example Image Portal 2" },
      { src: "/portal/portal3.png", alt: "Example Image Portal 3" },
      { src: "/portal/portal4.png", alt: "Example Image Portal 4" },
      { src: "/portal/portal5.png", alt: "Example Image Portal 5" },
      { src: "/portal/portal7.png", alt: "Example Image Portal 7" },
    ],
  },
  {
    id: "dog-lover",
    title: "Dog Lover",
    description:
      "A social networking app for dog enthusiasts to share photos, connect with other pet lovers, and discover the dog breeds that best match their lifestyle.",
    technologies: ["Flutter", "Dart", "Firebase", "Google Map Api"],
    category: "Mobile",
    images: [
      { src: "/doglover/doglover1.png", alt: "Example Image Dog Lover 1" },
      { src: "/doglover/doglover2.png", alt: "Example Image Dog Lover 2" },
      { src: "/doglover/doglover3.png", alt: "Example Image Dog Lover 3" },
      { src: "/doglover/doglover4.png", alt: "Example Image Dog Lover 4" },
      { src: "/doglover/doglover5.png", alt: "Example Image Dog Lover 5" },
      { src: "/doglover/doglover6.png", alt: "Example Image Dog Lover 6" },
      { src: "/doglover/doglover7.png", alt: "Example Image Dog Lover 7" },
      { src: "/doglover/doglover8.png", alt: "Example Image Dog Lover 8" },
      { src: "/doglover/doglover9.png", alt: "Example Image Dog Lover 9" },
    ],
    githubUrl: "https://github.com/TXRZXN/DogLover_MobileApp",
  },
  {
    id: "portfolio-v1",
    title: "Portfolio Website (V1)",
    description:
      "A personal portfolio application developed using Flutter as a self-practice project to showcase my programming works, skills, and contact information. Built with responsive design principles and smooth UI animations.",
    technologies: ["Flutter", "Dart"],
    category: "Mobile",
    images: [
      { src: "/port/port1.png", alt: "Example Image Port 1" },
      { src: "/port/port2.png", alt: "Example Image Port 2" },
      { src: "/port/port3.png", alt: "Example Image Port 3" },
      { src: "/port/port4.png", alt: "Example Image Port 4" },
      { src: "/port/port5.png", alt: "Example Image Port 5" },
      { src: "/port/port6.png", alt: "Example Image Port 6" },
    ],
    githubUrl: "https://github.com/TXRZXN/hellotarzan",
  },
  {
    id: "tictactoe",
    title: "TicTacToe",
    description:
      "A university project implementing a classic two-player Tic Tac Toe game using Java and Java Socket programming. Enables real-time gameplay between two clients over a TCP network connection with game synchronization.",
    technologies: [
      "Java",
      "Java Socket",
      "TCP/IP",
      "Object-Oriented Programming",
    ],
    category: "Other",
    githubUrl: "https://github.com/TXRZXN/Tictactoe_javasocket",
  },
  {
    id: "calculator",
    title: "Calculator",
    description:
      "A basic calculator application built as a university project using Kotlin. Supports standard arithmetic operations with clean user interface, real-time input validation, and native Android state handling.",
    technologies: ["Kotlin", "Android SDK", "XML Layout"],
    category: "Mobile",
    githubUrl: "https://github.com/TXRZXN/Calculator_Kotlin",
  },
]
