import styles from './Card.module.css'

export default function Card({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={`${styles.card} ${className ? styles[className] : ''}`}>
      {children}
    </div>
  )
}

Card.Title = function Title({
  children
}: {
  children: Readonly<React.ReactNode>
}) {
  return <h3 className={styles['card-title']}>{children}</h3>
}

Card.Content = function Content({
  children
}: {
  children: Readonly<React.ReactNode>
}) {
  return <p className={styles['card-content']}>{children}</p>
}

Card.Image = function Image({ src }: { src: Readonly<string> }) {
  return <img className={styles['card-img']} src={src} />
}

import { ButtonProps } from './Button'
type OneOrTwoButtons =
  | React.ReactElement<ButtonProps>
  | [React.ReactElement<ButtonProps>, React.ReactElement<ButtonProps>]

Card.Buttons = function Buttons({ children }: { children: OneOrTwoButtons }) {
  return <div className={styles.buttonRow}>{children}</div>
}
