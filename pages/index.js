import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>David Woods | Personal site and portfolio</title>
        <meta name="description" content="David Woods | Personal site and portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello!
        </h1>

        <p className={styles.description}>
          My name's David.
        </p>

        <div className={styles.grid}>
          <a href="https://github.com/dave-woods" className={styles.card}>
            <h2>Code &rarr;</h2>
            <p>Here's my GitHub profile with some of my past projects.</p>
          </a>

          <a href="https://linkedin.com/in/dwoodscs" className={styles.card}>
            <h2>CV &rarr;</h2>
            <p>Want to hire me? Here's my history.</p>
          </a>

          <a
            href="https://scholar.google.com/citations?user=cVRKKRMAAAAJ&hl=en"
            className={styles.card}
          >
            <h2>Research &rarr;</h2>
            <p>My publications are available here.</p>
          </a>

          <a
            href="https://twitter.com/dwoodscs"
            className={styles.card}
          >
            <h2>Twitter &rarr;</h2>
            <p>I occasionally share some thoughts and feelings here.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
