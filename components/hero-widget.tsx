"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import TypewriterText from "@/components/typewriter-text";
import AnimatedText from "@/components/animated-text";
import StaggerText from "@/components/stagger-text";

interface HeroWidgetProps {
  name: string;
  title: string;
  description: string;
  showDownloadCV?: boolean;
  showSocialLinks?: boolean;
  animationType?: "typewriter" | "stagger" | "fadeIn" | "gradient";
}

export default function HeroWidget({
  name,
  title,
  description,
  showDownloadCV = true,
  showSocialLinks = true,
  animationType = "stagger",
}: HeroWidgetProps) {
  const [showTitle, setShowTitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv/CV_Naruechatbu.pdf";
    link.download = "CV_Naruechatbu.pdf";
    link.click();
  };

  const renderAnimatedName = () => {
    switch (animationType) {
      case "typewriter":
        return (
          <TypewriterText
            text={name}
            delay={500}
            speed={150}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-red-500"
            onComplete={() => setShowTitle(true)}
          />
        );
      case "stagger":
        return (
          <StaggerText
            text={name}
            delay={500}
            staggerDelay={100}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white"
          />
        );
      case "gradient":
        return (
          <AnimatedText
            text={name}
            delay={500}
            className="text-4xl md:text-6xl font-bold text-gradient dark:text-gradient-dark"
            animation="scaleIn"
          />
        );
      default:
        return (
          <AnimatedText
            text={name}
            delay={500}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-green-500"
            animation="fadeInUp"
          />
        );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-center space-y-6">
      {/* <div className="w-[350px] h-[350px] rounded-full overflow-hidden">
        <Image
          src="/Me_Image.jpg"
          alt="Naruechat Buranasombat"
          width={350}
          height={350}
          className="object-cover object-bottom w-full h-full"
        />
      </div> */}

      <div className="space-y-4">
        {/* Animated Name */}
        <h1 className="min-h-[4rem] md:min-h-[6rem] flex items-center justify-center">
          {renderAnimatedName()}
        </h1>

        {/* Animated Title */}
        {(showTitle || animationType !== "typewriter") && (
          <AnimatedText
            text={title}
            delay={animationType === "typewriter" ? 0 : 1000}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium"
            animation="slideInLeft"
          />
        )}

        {/* Animated Description */}
        <div className="min-h-[3rem] flex items-center justify-center">
          {(showDescription || animationType !== "typewriter") && (
            <AnimatedText
              text={description}
              delay={animationType === "typewriter" ? 0 : 1500}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
              animation="fadeInUp"
            />
          )}
        </div>
      </div>

      {/* Animated Buttons */}
      <div
        className={`transition-all duration-700 ease-out ${
          showButtons || animationType !== "typewriter"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
        style={{
          transitionDelay: animationType === "typewriter" ? "0ms" : "2000ms",
        }}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {showDownloadCV && (
            <Button
              onClick={handleDownloadCV}
              size="lg"
              className="w-full sm:w-auto group"
            >
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              Download CV
            </Button>
          )}

          {showSocialLinks && (
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hover:scale-110 transition-transform bg-transparent"
              >
                <a
                  href="https://github.com/TXRZXN"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hover:scale-110 transition-transform bg-transparent"
              >
                <a
                  href="https://www.linkedin.com/in/naruechat-buranasombat/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hover:scale-110 transition-transform bg-transparent"
              >
                <a href="mailto:naruechat.b@gmail.com">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
