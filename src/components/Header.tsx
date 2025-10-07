'use client'

import Link from 'next/link'
import '../app/globals.css'

import styles from './Header.module.css'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const navLinks = [
    { href: '/about', label: 'About', ariaLabel: 'About Me' },
    { href: '/projects', label: 'Projects', ariaLabel: 'My Projects' },
    { href: '/teaching', label: 'Teaching', ariaLabel: 'My Teaching' },
    { href: '/creative', label: 'Creative', ariaLabel: 'My Creative Work' },
    { href: '/contact', label: 'Contact', ariaLabel: 'Contact Me' }
  ]
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href='/' aria-label='David Woods Homepage'>
        David Woods
      </Link>
      <nav className={styles.nav}>
        {navLinks.map(({ href, label, ariaLabel }) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? styles.active : ''}
            aria-label={ariaLabel}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
