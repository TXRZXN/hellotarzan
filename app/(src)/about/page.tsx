import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, GraduationCap, Briefcase } from "lucide-react";

export default function About() {
  const experiences = [
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
  ];

  const education = [
    {
      degree:
        "Bachelor of Engineering Program in Electronic Engineering Technology",
      school: "Kinh Mongkut's University of Technology North Bangkok",
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
        "Completed a gifted program focused on mathematics and science, building critical thinking and problem-solving skills that laid the foundation for later studies in engineering and software development.", //Mathmatic and Science Program
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          About Me
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Learn more about my journey, experience, and what drives me as a
          developer.
        </p>
      </div>

      {/* Personal Info */}
      <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            I’m a developer who loves solving problems through code — whether
            it’s building scalable web apps, crafting smooth mobile experiences,
            or designing trading strategies.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            With 3 years of full-stack and mobile development experience, I’ve
            worked with technologies like Dart, C#, Next.js, Flutter, and React.
            I take pride in writing clean, secure code and learning fast in
            challenging environments.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Outside of client work, I explore algorithmic trading and automate
            strategies using Pine Script and MQL5. I’m currently open to
            freelance collaborations, and continuing to grow my trading system
            projects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">
                Nonthaburi, Thailand
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">
                Open to freelance or side projects
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-4">
            <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
              Problem Solver
            </Badge>
            <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
              Algo Trading
            </Badge>
            <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
              Continuous Learner
            </Badge>
            <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
              Tech Enthusiast
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <Briefcase className="h-6 w-6" />
          <span>Work Experience</span>
        </h2>
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-lg text-gray-900 dark:text-white">
                    {exp.title}
                  </CardTitle>
                  <Badge className="w-fit mt-2 sm:mt-0 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                    {exp.period}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {exp.company}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  {exp.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <GraduationCap className="h-6 w-6" />
          <span>Education</span>
        </h2>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <Card
              key={index}
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-lg text-gray-900 dark:text-white">
                    {edu.degree}
                  </CardTitle>
                  <Badge className="w-fit mt-2 sm:mt-0 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                    {edu.period}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {edu.school}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  {edu.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
