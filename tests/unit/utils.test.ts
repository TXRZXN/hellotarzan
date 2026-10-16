import { describe, it, expect } from 'vitest'
import { cn } from '@/shared/lib/utils'

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('should handle conditional and falsy values', () => {
    const isHidden = false
    const isActive = true
    const result = cn('base', isHidden && 'hidden', isActive && 'active', null, undefined)
    expect(result).toBe('base active')
  })

  it('should override conflicting tailwind classes with tailwind-merge', () => {
    const result = cn('p-4', 'p-8', 'text-sm', 'text-lg')
    expect(result).toBe('p-8 text-lg')
  })
})
