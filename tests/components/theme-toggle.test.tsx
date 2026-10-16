import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '@/shared/components/theme-toggle'

const mockSetTheme = vi.fn()

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
  }),
}))

describe('ThemeToggle', () => {
  it('renders theme toggle button and switches theme on click', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: /Toggle theme/i })
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })
})
