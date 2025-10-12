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
  const [updateable, setUpdateable] = useState(false)

  const [found, setFound] = useState<Word[]>([])
  const [gameFinished, setGameFinished] = useState(false)

  // TODO: each word should have an ID, so if there are multiple of the same word, they can each be tracked individually
  function handleWordFind(cells: Cell[]) {
    const word = cells.map((c) => c.letter).join('')
    if (
      wordlist.filter((w) => w === word).length >
      found.filter((f) => f.word === word).length
    ) {
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

  async function updateWordlist(newWordlist: string[]) {
    regenerate(newWordlist, grid.length).then((newGrid) => {
      setFound([])
      setWordlist(newWordlist)
      setGrid(newGrid)
      setGameFinished(false)
      setUpdateable(false)
    })
  }

  return (
    <main className={styles.main}>
      <h1>
        Wordsearch{' '}
        <label style={{ fontSize: '0.8rem' }}>
          Update wordlist?{' '}
          <input
            type='checkbox'
            checked={updateable}
            onChange={(e) => setUpdateable(e.target.checked)}
          ></input>
        </label>
      </h1>
      {gameFinished ? (
        <div className={styles.congratulations}>
          <h2>Congratulations! You found all the words!</h2>
          <Button level={1} onClick={reset}>
            Play Again
          </Button>
        </div>
      ) : (
        <WordsearchWordlist
          updateable={updateable}
          updateWordlist={updateWordlist}
          wordlist={wordlist}
          found={found.map((f) => f.word)}
        />
      )}
      {updateable ? (
        ''
      ) : (
        <WordsearchGrid grid={grid} found={found} onWordFind={handleWordFind} />
      )}
    </main>
  )
}
