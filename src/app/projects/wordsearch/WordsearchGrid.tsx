'use client'

import React, { useState } from 'react'
import styles from './wordsearch.module.css'

import { WordsearchCell } from './WordsearchCell'
import { Cell, WordsearchGridProps } from './types'
import { normalise2DVector } from './lib'

export default function WordsearchGrid({
  grid,
  found,
  onWordFind
}: WordsearchGridProps) {
  const [selectedCells, setSelectedCells] = useState<Cell[]>([])
  const foundCells = found.flatMap((f) => f.cells)

  // onmousedown
  function handleWordSelectStart(cell: Cell) {
    setSelectedCells([cell])
  }

  // onmouseenter
  function handleWordSelectContinue(cell: Cell) {
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
  }

  // onmouseup / onmouseleave
  function handleWordSelectEnd() {
    if (selectedCells.length > 1) {
      onWordFind(selectedCells)
      setSelectedCells([])
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

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}
      className={`${styles.grid} ${
        selectedCells.length ? styles.selecting : ''
      }`}
      onMouseLeave={handleWordSelectEnd}
    >
      {grid.map((gridRow, row) =>
        gridRow.map((letter, col) => {
          const cell = { row, col, letter }
          return (
            <WordsearchCell
              key={`cell-${row}-${col}`}
              cell={cell}
              cellState={getCellState(cell)}
              handleWordSelectStart={handleWordSelectStart}
              handleWordSelectContinue={handleWordSelectContinue}
              handleWordSelectEnd={handleWordSelectEnd}
            />
          )
        })
      )}
    </div>
  )
}
