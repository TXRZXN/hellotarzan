"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { ProjectImage } from "@/features/projects/types/project.types";

export interface ProjectWidgetProps {
  title: string;
  description: string;
  technologies: string[];
  images?: ProjectImage[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function ProjectWidget({
  title,
  description,
  technologies,
  images = [],
  liveUrl,
  githubUrl,
}: ProjectWidgetProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasImages = images && images.length > 0;

  useEffect(() => {
    if (!hasImages || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images, hasImages]);

  const goToNextImage = () => {
    if (!hasImages) return;
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    if (!hasImages) return;
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-xs hover:border-gray-300 dark:hover:border-gray-600 transition-all flex flex-col justify-between">
      <div>
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {hasImages && (
            <div className="relative w-full h-60 md:h-72 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "contain" }}
                  className={`transition-opacity duration-500 ease-in-out ${
                    index === currentImageIndex
                      ? "opacity-100"
                      : "opacity-0 absolute pointer-events-none"
                  }`}
                />
              ))}

              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full h-8 w-8"
                    onClick={goToPreviousImage}
                    aria-label="Previous project image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full h-8 w-8"
                    onClick={goToNextImage}
                    aria-label="Next project image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  <div className="absolute bottom-2 flex space-x-1">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`block h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          index === currentImageIndex
                            ? "bg-white w-4"
                            : "bg-gray-400/80 w-2"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <Badge
                key={index}
                className="bg-gray-100 text-gray-800 dark:bg-gray-700/60 dark:text-gray-200 border-0"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </div>

      <div className="px-6 pb-6 pt-0 flex flex-wrap gap-3">
        {liveUrl && (
          <Button asChild size="sm" className="group">
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              Live Demo
            </a>
          </Button>
        )}
        {githubUrl && (
          <Button
            variant="outline"
            asChild
            size="sm"
            className="group bg-transparent"
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Image
                src="/mark-github.png"
                alt="GitHub"
                width={16}
                height={16}
                className="mr-2 h-4 w-4 dark:invert"
              />
              GitHub Repo
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
}
