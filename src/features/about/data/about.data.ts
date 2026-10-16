import { ExperienceItem, EducationItem, PersonalInfo } from "@/features/about/types/about.types"

export const personalInfoData: PersonalInfo = {
  location: "Nonthaburi, Thailand",
  availability: "Open to freelance or side projects",
  tags: ["Problem Solver", "Algo Trading", "Continuous Learner", "Tech Enthusiast"],
  bioParagraphs: [
    "I’m a developer who loves solving problems through code — whether it’s building scalable web apps, crafting smooth mobile experiences, or designing trading strategies.",
    "With 3 years of full-stack and mobile development experience, I’ve worked with technologies like Dart, C#, Next.js, Flutter, and React. I take pride in writing clean, secure code and learning fast in challenging environments.",
    "Outside of client work, I explore algorithmic trading and automate strategies using Pine Script and MQL5. I’m currently open to freelance collaborations, and continuing to grow my trading system projects.",
  ],
}

export const experiencesData: ExperienceItem[] = [
  {
    title: "Full Stack Developer",
    company: "Homepro",
    period: "07/2022 - Present",
    description:
      "Developed responsive web applications and collaborated with design teams to create exceptional user experiences.",
  },
  {
    title: "Junior Developer",
    company: "Homepro",
    period: "01/2022 - 06/2022",
    description:
      "Built and maintained web and mobile applications while learning modern development practices and technologies.",
  },
]

export const educationData: EducationItem[] = [
  {
    degree: "Master of Business Administration (MBA) in Digital Financial Management",
    school: "MBA - Digital Financial Management",
    period: "2026 - Present",
    description:
      "Currently pursuing a Master's degree in Digital Financial Management, focusing on modern financial technology, quantitative analytics, digital asset strategies, and financial management.",
  },
  {
    degree: "Bachelor of Engineering Program in Electronic Engineering Technology",
    school: "King Mongkut's University of Technology North Bangkok",
    period: "2019 - 2022",
    description:
      "Gained strong foundational knowledge in software engineering and algorithmic thinking. Developed programming skills in Java, HTML, PHP, and Dart, which sparked continued interest in web and mobile development.",
  },
  {
    degree: "Vocational Certificate in Electronic Engineering",
    school: "Rajamangala University of Technology Phra Nakhon",
    period: "2016 - 2018",
    description:
      "Studied fundamental electronics including DC/AC circuits and hands-on microcontroller programming with Arduino, which sparked a passion for coding and embedded systems.",
  },
  {
    degree: "Lower Secondary Education (Math & Science Program)",
    school: "Mathayomprachaniwet School",
    period: "2013 - 2015",
    description:
      "Completed a gifted program focused on mathematics and science, building critical thinking and problem-solving skills that laid the foundation for later studies in engineering and software development.",
  },
]
