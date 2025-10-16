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
              "This is a complete rewrite of my personal website for 2025. It's built using NextJS (React) and TypeScript, CI/CD with Github and Vercel, and Jest for testing."
            }
          </p>
        </Card>
        <Card className='highlight'>
          <h3>Check out some things I built</h3>
          <p>{`Just a few demos or ideas that I wanted to build for myself.`}</p>
          <div className={styles.buttonRow}>
            <Button href='/projects' level={1}>
              Projects
            </Button>
            <Button href='https://github.com/dave-woods' level={2}>
              Github
            </Button>
          </div>
        </Card>
        <Card>
          <h3>Get in touch</h3>
          <p>{'Chat with me on LinkedIn or drop me an email.'}</p>
          <div className={styles.buttonRow}>
            <Button href='https://www.linkedin.com/in/dwoodscs/' level={1}>
              LinkedIn
            </Button>
            <Button href='/contact' level={2}>
              Email
            </Button>
          </div>
        </Card>
      </div>
    </main>
  )
}
