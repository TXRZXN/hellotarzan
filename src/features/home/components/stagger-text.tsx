"use client"

import { useState, useEffect } from "react"

interface StaggerTextProps {
  text: string
  delay?: number
  staggerDelay?: number
  className?: string
}

export default function StaggerText({ text, delay = 0, staggerDelay = 100, className = "" }: StaggerTextProps) {
  const [visibleChars, setVisibleChars] = useState<boolean[]>(new Array(text.length).fill(false))

  useEffect(() => {
    const chars = text.split("")

    chars.forEach((_, index) => {
      setTimeout(
        () => {
          setVisibleChars((prev) => {
            const newVisible = [...prev]
            newVisible[index] = true
            return newVisible
          })
        },
        delay + index * staggerDelay,
      )
    })
  }, [text, delay, staggerDelay])

  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ease-out ${
            visibleChars[index] ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-50"
          }`}
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}
