import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Header from '../components/Header'
 
describe('Header', () => {
  it('renders a nav', () => {
    render(<Header />)
 
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('renders the correct links', () => {
    render(<Header />)
    const links = [
      { name: 'David Woods', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Projects', href: '/projects' },
      { name: 'Teaching', href: '/teaching' },
      { name: 'Creative', href: '/creative' },
      { name: 'Contact', href: '/contact' },
    ]
    links.forEach(({ name, href }) => {
      const link = screen.getByRole('link', { name })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', href)
    })
  })
})