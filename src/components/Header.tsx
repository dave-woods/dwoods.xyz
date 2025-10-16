'use client'

import Link from 'next/link'
import '../app/globals.css'

import styles from './Header.module.css'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const navLinks = [
    { href: '/about', label: 'About', ariaLabel: 'About Me' },
    { href: '/projects', label: 'Projects', ariaLabel: 'My Projects' },
    { href: '/teaching', label: 'Teaching', ariaLabel: 'My Teaching' },
    { href: '/creative', label: 'Creative', ariaLabel: 'My Creative Work' },
    { href: '/contact', label: 'Contact', ariaLabel: 'Contact Me' }
  ]
  return (
    <header className={styles.header}>
      <Link
        className={styles.logo}
        href='/'
        aria-label='David Woods Homepage'
        onClick={() => setMenuOpen(false)}
      >
        David Woods
      </Link>
      <button
        className={`${styles.menuButton} ${menuOpen ? styles.open : ''}`}
        aria-label='Toggle navigation menu'
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
      <nav className={`${styles.nav} ${menuOpen ? styles.showNav : ''}`}>
        {navLinks.map(({ href, label, ariaLabel }) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? styles.active : ''}
            aria-label={ariaLabel}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
