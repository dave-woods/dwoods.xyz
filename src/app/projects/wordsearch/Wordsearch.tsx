'use client'

import { useState } from 'react'
import WordsearchGrid from './WordsearchGrid'
import styles from './wordsearch.module.css'
import Button from '@/components/Button'
import { WordsearchWordlist } from './WordsearchWordlist'
import { Cell, Word } from './types'

export default function Wordsearch({
  initialGrid,
  initialWordlist,
  regenerate
}: {
  initialGrid: string[][]
  initialWordlist: string[]
  regenerate: (wordlist: string[], size: number) => Promise<string[][]>
}) {
  const [wordlist, setWordlist] = useState<string[]>([...initialWordlist])
  const [grid, setGrid] = useState(initialGrid)

  const [found, setFound] = useState<Word[]>([])
  const [gameFinished, setGameFinished] = useState(false)

  function handleWordFind(cells: Cell[]) {
    const word = cells.map((c) => c.letter).join('')
    if (wordlist.includes(word) && !found.map((f) => f.word).includes(word)) {
      setFound((prev) => [...prev, { word, cells }])
      if (found.length + 1 === wordlist.length) {
        setGameFinished(true)
      }
      return true
    }
    return false
  }

  async function reset() {
    regenerate(wordlist, grid.length).then((newGrid) => {
      setFound([])
      setGrid(newGrid)
      setGameFinished(false)
    })
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
        <WordsearchWordlist
          wordlist={wordlist}
          found={found.map((f) => f.word)}
        />
      )}
      <WordsearchGrid grid={grid} found={found} onWordFind={handleWordFind} />
    </main>
  )
}
