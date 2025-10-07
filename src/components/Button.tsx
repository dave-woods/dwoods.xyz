import Link from 'next/link'
import styles from './Button.module.css'

type ButtonProps = {
  href?: string
  level: 1 | 2 | 3
  children: React.ReactNode
  onClick?: () => void
}

export default function Button({
  href,
  level,
  children,
  onClick
}: ButtonProps) {
  return href ? (
    <Link
      href={href}
      className={`${styles.button} ${
        styles[level === 1 ? 'primary' : level === 2 ? 'secondary' : 'tertiary']
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  ) : (
    <button
      className={`${styles.button} ${
        styles[level === 1 ? 'primary' : level === 2 ? 'secondary' : 'tertiary']
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
