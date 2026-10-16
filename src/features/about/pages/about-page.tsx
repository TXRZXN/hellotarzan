import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Calendar, MapPin, GraduationCap, Briefcase } from "lucide-react";
import { personalInfoData, experiencesData, educationData } from "@/features/about/data/about.data";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          About Me
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Learn more about my journey, experience, and what drives me as a developer.
        </p>
      </div>

      {/* Personal Info */}
      <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {personalInfoData.bioParagraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraph}
            </p>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">
                {personalInfoData.location}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">
                {personalInfoData.availability}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            {personalInfoData.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
              >
                {tag}
              </Badge>
            ))}
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
          {experiencesData.map((exp, index) => (
            <Card
              key={index}
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xs hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
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
          {educationData.map((edu, index) => (
            <Card
              key={index}
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xs hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
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
