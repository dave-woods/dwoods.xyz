'use client'

import React, { useEffect, useState } from 'react'
import styles from './wordsearch.module.css'

type Cell = { row: number; col: number }
type CellState = 'default' | 'selected' | 'found'
type WordsearchCellProps = {
  children: React.ReactNode
  cell: Cell
  cellState?: CellState
  handleWordSelectStart?: (e: React.MouseEvent) => void
  handleWordSelectContinue?: (e: React.MouseEvent) => void
  handleWordSelectEnd?: (e: React.MouseEvent) => void
}

export function WordsearchCell({
  children,
  cell,
  cellState = 'default',
  handleWordSelectStart,
  handleWordSelectContinue,
  handleWordSelectEnd
}: WordsearchCellProps) {
  return (
    <div
      draggable={false}
      onMouseDown={handleWordSelectStart}
      onMouseEnter={handleWordSelectContinue}
      onMouseUp={handleWordSelectEnd}
      className={`${styles.cell} ${
        cellState === 'selected'
          ? styles.selected
          : cellState === 'found'
          ? styles.found
          : ''
      }`}
    >
      {children}
    </div>
  )
}

function useGrid({ size, wordlist }: { size: number; wordlist: string[] }) {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  const [grid, setGrid] = useState<string[][]>(
    Array.from({ length: size }, () => Array.from({ length: size }, () => '?'))
  )

  function canPlaceWord(
    word: string,
    row: number,
    col: number,
    direction: 'H' | 'V'
  ) {
    if (direction === 'H') {
      if (col + word.length > size) return false
      for (let i = 0; i < word.length; i++) {
        if (grid[row][col + i] !== '?' && grid[row][col + i] !== word[i])
          return false
      }
    } else {
      if (row + word.length > size) return false
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col] !== '?' && grid[row + i][col] !== word[i])
          return false
      }
    }
    return true
  }

  function placeWord(word: string) {
    let placed = false
    const maxAttempts = size * size
    let attempts = 0
    while (!placed && attempts < maxAttempts) {
      attempts++

      const direction = Math.random() < 0.5 ? 'H' : 'V'
      const row = Math.floor(Math.random() * size)
      const col = Math.floor(Math.random() * size)
      if (canPlaceWord(word, row, col, direction)) {
        for (let i = 0; i < word.length; i++) {
          if (direction === 'H') {
            grid[row][col + i] = word[i]
          } else {
            grid[row + i][col] = word[i]
          }
        }
        placed = true
      }
    }
    return placed
  }
  for (const word of wordlist.toSorted((a, b) => b.length - a.length)) {
    placeWord(word)
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '?') {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)]
      }
    }
  }
  return grid
}

export function WordsearchGrid({
  gridSize,
  wordlist,
  foundWords,
  onWordFind
}: {
  gridSize: number
  wordlist: string[]
  foundWords: string[]
  onWordFind: (word: string) => boolean
}) {
  const grid = useGrid({ size: gridSize, wordlist })

  const [selectedLetters, setSelectedLetters] = useState<string[]>([])
  const [selectedCells, setSelectedCells] = useState<Cell[]>([])
  const [foundCells, setFoundCells] = useState<Cell[]>([])

  // onmousedown
  function handleWordSelectStart(
    e: React.MouseEvent,
    cell: Cell,
    letter: string = ''
  ) {
    // console.log('Drag start:', letter)
    setSelectedCells([cell])
    setSelectedLetters([letter])
  }

  function normaliseVector([x, y]: [number, number]): [number, number] {
    if (x === 0 && y === 0) return [0, 0]
    const divisor = Math.sqrt(x * x + y * y)
    const fixedNums = 10000 // to avoid floating point issues
    return [
      Math.round(fixedNums * (x / divisor)) / fixedNums,
      Math.round(fixedNums * (y / divisor)) / fixedNums
    ]
  }

  // onmouseenter
  function handleWordSelectContinue(
    e: React.MouseEvent,
    cell: Cell,
    letter: string = ''
  ) {
    e.preventDefault()
    e.stopPropagation()
    if (!selectedCells.length) return // error, no start cell
    const homeVector = normaliseVector([
      cell.row - selectedCells[0].row,
      cell.col - selectedCells[0].col
    ])
    const selectedVector = normaliseVector([
      cell.row - selectedCells[selectedCells.length - 1].row,
      cell.col - selectedCells[selectedCells.length - 1].col
    ])
    if (
      homeVector[0] !== selectedVector[0] ||
      homeVector[1] !== selectedVector[1]
    ) {
      return // not in the same direction as the initial vector

      // allow changing to straight direction on the second cell
      //   if (
      //     !(
      //       selectedCells.length === 2 ||
      //       Math.abs(selectedVector[0]) !== Math.abs(selectedVector[1])
      //     )
      //   ) {
      //     return // not in the same direction as the initial vector
      //   }
      //   setSelectedCells((prev) => [prev[0]])
      //   setSelectedLetters((prev) => [prev[0]])
    }
    if (
      Math.abs(cell.col - selectedCells[selectedCells.length - 1].col) > 1 ||
      Math.abs(cell.row - selectedCells[selectedCells.length - 1].row) > 1
    )
      return // within one cell of the last selection
    if (selectedCells.find((c) => c.row === cell.row && c.col === cell.col))
      return // already selected
    setSelectedCells((prev) => [...prev, cell])
    setSelectedLetters((prev) => [...prev, letter])
  }

  // onmouseup / onmouseleave
  function handleWordSelectEnd(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (selectedLetters.length > 1) {
      if (onWordFind(selectedLetters.join(''))) {
        // mark cells as found
        setFoundCells((prev) => [...prev, ...selectedCells])
      }
    }
    setSelectedCells([])
    setSelectedLetters([])
  }

  useEffect(() => {
    if (foundWords.length === 0) {
      setFoundCells([])
    }
  }, [foundWords])

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      className={`${styles.grid} ${
        selectedCells.length ? styles.selecting : ''
      }`}
      onMouseLeave={handleWordSelectEnd}
    >
      {grid.map((gridRow, rowIndex) =>
        gridRow.map((cellLetter, colIndex) => (
          <WordsearchCell
            key={`cell-${rowIndex}-${colIndex}`}
            cell={{ row: rowIndex, col: colIndex }}
            {...(selectedCells.find(
              (c) => c.row === rowIndex && c.col === colIndex
            )
              ? { cellState: 'selected' }
              : foundCells.find((c) => c.row === rowIndex && c.col === colIndex)
              ? { cellState: 'found' }
              : {})}
            handleWordSelectStart={(e) =>
              handleWordSelectStart(
                e,
                { row: rowIndex, col: colIndex },
                cellLetter
              )
            }
            handleWordSelectContinue={(e) =>
              handleWordSelectContinue(
                e,
                { row: rowIndex, col: colIndex },
                cellLetter
              )
            }
            handleWordSelectEnd={(e) => handleWordSelectEnd(e)}
          >
            {cellLetter}
          </WordsearchCell>
        ))
      )}
    </div>
  )
}
