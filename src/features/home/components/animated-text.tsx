"use client"

import { useState, useEffect } from "react"

interface AnimatedTextProps {
  text: string
  delay?: number
  className?: string
  animation?: "fadeInUp" | "slideInLeft" | "bounceIn" | "scaleIn"
}

export default function AnimatedText({ text, delay = 0, className = "", animation = "fadeInUp" }: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const getAnimationClass = () => {
    switch (animation) {
      case "fadeInUp":
        return isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
      case "slideInLeft":
        return isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-8"
      case "bounceIn":
        return isVisible ? "animate-bounce-in" : "opacity-0 scale-50"
      case "scaleIn":
        return isVisible ? "animate-scale-in" : "opacity-0 scale-0"
      default:
        return isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
    }
  }

  return <div className={`transition-all duration-700 ease-out ${getAnimationClass()} ${className}`}>{text}</div>
}
