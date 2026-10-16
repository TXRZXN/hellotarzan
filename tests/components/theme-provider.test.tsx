import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@/shared/components/theme-provider'

vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }: any) => <div data-testid="theme-provider">{children}</div>,
}))

describe('ThemeProvider component', () => {
  it('renders children wrapped inside provider', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <span>Child Content</span>
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme-provider')).toBeInTheDocument()
    expect(screen.getByText('Child Content')).toBeInTheDocument()
  })
})
