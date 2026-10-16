import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import TypewriterText from '@/features/home/components/typewriter-text'
import AnimatedText from '@/features/home/components/animated-text'
import StaggerText from '@/features/home/components/stagger-text'

describe('Text Animation Components', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('TypewriterText', () => {
    it('types out characters sequentially and calls onComplete', () => {
      const onComplete = vi.fn()
      render(<TypewriterText text="Hello" delay={100} speed={50} onComplete={onComplete} />)

      // Advance delay
      act(() => {
        vi.advanceTimersByTime(100)
      })

      // Advance each character step by step
      for (let i = 0; i <= 5; i++) {
        act(() => {
          vi.advanceTimersByTime(60)
        })
      }

      expect(screen.getByText(/Hello/)).toBeInTheDocument()
      expect(onComplete).toHaveBeenCalled()
    })
  })

  describe('AnimatedText', () => {
    it('renders with slideInLeft, bounceIn, and scaleIn animations', () => {
      const { rerender } = render(<AnimatedText text="Slide" delay={50} animation="slideInLeft" />)
      act(() => {
        vi.advanceTimersByTime(50)
      })
      expect(screen.getByText('Slide')).toBeInTheDocument()

      rerender(<AnimatedText text="Bounce" delay={50} animation="bounceIn" />)
      act(() => {
        vi.advanceTimersByTime(50)
      })
      expect(screen.getByText('Bounce')).toBeInTheDocument()

      rerender(<AnimatedText text="Scale" delay={50} animation="scaleIn" />)
      act(() => {
        vi.advanceTimersByTime(50)
      })
      expect(screen.getByText('Scale')).toBeInTheDocument()
    })
  })

  describe('StaggerText', () => {
    it('renders each character with delay', () => {
      render(<StaggerText text="Hi" delay={50} staggerDelay={50} />)

      act(() => {
        vi.advanceTimersByTime(200)
      })

      expect(screen.getByText('H')).toBeInTheDocument()
      expect(screen.getByText('i')).toBeInTheDocument()
    })
  })
})
