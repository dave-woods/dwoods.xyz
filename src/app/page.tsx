import { merriweather } from '@/utils/fonts'
import styles from './homepage.module.css'
import Card from '@/components/Card'
import Link from 'next/link'
import Button from '@/components/Button'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{"Hi! I'm David."}</h1>
      <h2>{'Learner · Teacher · Creator'}</h2>
      <p className={`${styles.description} ${merriweather.className}`}>
        {
          'I love to make things: code 💻, gymnasts 🤸, and fictional worlds 🗺️. Welcome to my digital space.'
        }
      </p>
      <div className={styles.grid}>
        <Card>
          <h3>Latest Project: This site!</h3>
          <p>
            {
              "This is a complete rewrite of my personal website for 2025. It's built using NextJS (React), CI/CD with Github and Vercel, and Jest for testing."
            }
          </p>
          <p>
            Feel free to check out my other recent projects{' '}
            <Link href='/projects'>here</Link>
          </p>
        </Card>
        <Card className='highlight'>
          <h3>This card has a button</h3>
          <div className={styles.buttonRow}>
            <Button level={3}>Click Me</Button>
          </div>
        </Card>
        <Card>
          <h3>This card has 2 buttons!</h3>
          <div className={styles.buttonRow}>
            <Button level={1}>Primary</Button>
            <Button href='/projects' level={2}>
              Secondary
            </Button>
          </div>
        </Card>
      </div>
    </main>
  )
}
