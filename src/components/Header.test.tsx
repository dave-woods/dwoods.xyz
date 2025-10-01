import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Header from './Header'
 
describe('Header', () => {
  it('renders a nav', () => {
    render(<Header />)
 
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('renders a link to the homepage', () => {
    render(<Header />)
    const link = screen.getByRole('link', { name: 'David Woods' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

    it('renders a link to the about page', () => {
    render(<Header />)
    const link = screen.getByRole('link', { name: 'About' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/about')
  })
})