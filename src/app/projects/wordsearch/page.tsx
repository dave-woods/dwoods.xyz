'use client'

import { useState } from 'react'
// import WordsearchGrid from './WordsearchGrid'
import dynamic from 'next/dynamic'
const WordsearchGrid = dynamic(() => import('./WordsearchGrid'), {
  ssr: false,
  loading: () => (
    <div
      style={{ gridTemplateColumns: `repeat(${15}, 1fr)` }}
      className={styles.grid}
    >
      {Array.from({ length: 15 }, () =>
        Array.from({ length: 15 }, () => '?')
      ).map((gridRow, rowIdx) =>
        gridRow.map((dummy, dummyIdx) => (
          <div
            style={{ color: 'transparent' }}
            key={`dummy-${rowIdx}-${dummyIdx}`}
            className={styles.cell}
          >
            {dummy}
          </div>
        ))
      )}
    </div>
  )
})

import styles from './wordsearch.module.css'
import Button from '@/components/Button'

export default function Wordsearch() {
  console.log('Wordsearch page rendered')
  const wordlist = ['wordsearch', 'javascript', 'trampoline']
  const longwords = [
    'example',
    'goes',
    'here',
    'test',
    'wordsearch',
    'puzzle',
    'nextjs',
    'react',
    'typescript',
    'javascript',
    'css',
    'html',
    'frontend',
    'backend',
    'fullstack'
  ]
  const gridSize = 15

  const [found, setFound] = useState<string[]>([])
  const [gameFinished, setGameFinished] = useState(false)
  const [shouldRegenerate, setShouldRegenerate] = useState(false)

  function handleWordFind(word: string) {
    if (wordlist.includes(word) && !found.includes(word)) {
      setFound((prev) => [...prev, word])
      if (found.length + 1 === wordlist.length) {
        finishGame()
      }
      return true
    }
    return false
  }

  function finishGame() {
    setGameFinished(true)
  }

  function reset() {
    setFound([])
    setGameFinished(false)
    setShouldRegenerate(true)
  }

  return (
    <main className={styles.main}>
      <h1>Wordsearch</h1>
      {gameFinished ? (
        <div className={styles.congratulations}>
          <h2>Congratulations! You found all the words!</h2>
          <Button level={1} onClick={reset}>
            Play Again
          </Button>
        </div>
      ) : (
        <ul className={styles.wordlist}>
          {wordlist.map((word) => (
            <li
              key={word}
              className={`${styles.word} ${
                found.includes(word) ? styles.found : ''
              }`}
            >
              {word}
            </li>
          ))}
        </ul>
      )}
      <WordsearchGrid
        onWordFind={handleWordFind}
        gridSize={gridSize}
        wordlist={wordlist}
        shouldRegenerate={shouldRegenerate}
        setShouldRegenerate={setShouldRegenerate}
      />
    </main>
  )
}
