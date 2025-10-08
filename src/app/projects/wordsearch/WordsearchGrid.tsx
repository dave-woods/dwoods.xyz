'use client'

import React, { useCallback, useEffect, useState } from 'react'
import styles from './wordsearch.module.css'

import { WordsearchCell } from './WordsearchCell'
import { Cell } from './types'
import { useGrid } from './useGrid'
import { normalise2DVector } from '@/utils/lib'

export default function WordsearchGrid({
  gridSize,
  wordlist,
  onWordFind,
  shouldRegenerate,
  setShouldRegenerate
}: {
  gridSize: number
  wordlist: string[]
  shouldRegenerate: boolean
  setShouldRegenerate: (value: boolean) => void
  onWordFind: (word: string) => boolean
}) {
  const { grid, regenerateGrid } = useGrid(gridSize, wordlist)

  const [selectedLetters, setSelectedLetters] = useState<string[]>([])
  const [selectedCells, setSelectedCells] = useState<Cell[]>([])
  const [foundCells, setFoundCells] = useState<Cell[]>([])

  // onmousedown
  function handleWordSelectStart(
    e: React.MouseEvent,
    cell: Cell,
    letter: string = ''
  ) {
    setSelectedCells([cell])
    setSelectedLetters([letter])
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
    const homeVector = normalise2DVector([
      cell.row - selectedCells[0].row,
      cell.col - selectedCells[0].col
    ])
    const selectedVector = normalise2DVector([
      cell.row - selectedCells[selectedCells.length - 1].row,
      cell.col - selectedCells[selectedCells.length - 1].col
    ])
    if (
      homeVector[0] !== selectedVector[0] ||
      homeVector[1] !== selectedVector[1]
    ) {
      return // not in the same direction as the initial vector
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
      setSelectedCells([])
      setSelectedLetters([])
    }
  }

  function getCellState(cell: Cell) {
    if (selectedCells.find((c) => c.row === cell.row && c.col === cell.col)) {
      return 'selected'
    } else if (
      foundCells.find((c) => c.row === cell.row && c.col === cell.col)
    ) {
      return 'found'
    } else {
      return 'default'
    }
  }

  useEffect(() => {
    if (shouldRegenerate) {
      setFoundCells([])
      regenerateGrid()
      setShouldRegenerate(false)
    }
  }, [shouldRegenerate])

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
            cellState={getCellState({ row: rowIndex, col: colIndex })}
            handleWordSelectStart={handleWordSelectStart}
            handleWordSelectContinue={handleWordSelectContinue}
            handleWordSelectEnd={handleWordSelectEnd}
          >
            {cellLetter}
          </WordsearchCell>
        ))
      )}
    </div>
  )
}
