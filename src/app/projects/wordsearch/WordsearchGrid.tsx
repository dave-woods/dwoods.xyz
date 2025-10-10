'use client'

import React, { useEffect, useRef, useState } from 'react'
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

  const [cellSize, setCellSize] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      const width = entry.contentRect.width
      const cols = grid.length
      setCellSize(width / cols)
    })
    observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [grid])

  const foundCells = found.flatMap((f) => f.cells)

  // onmousedown
  function handleWordSelectStart(cell: Cell) {
    if (!selectedCells.length) setSelectedCells([cell])
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

  function cellToGridPixelPos(cell: Cell, cellSize: number): Cell {
    return {
      row: cell.row * cellSize + cellSize / 2,
      col: cell.col * cellSize + cellSize / 2,
      letter: cell.letter
    }
  }

  function capsulePath(start: Cell, end: Cell, radius: number) {
    const dx = end.col - start.col
    const dy = end.row - start.row
    const len = Math.sqrt(dx * dx + dy * dy)

    // in case of single cell
    if (len === 0) {
      // Draw a circle centered at the cell
      return `
      M ${start.col - radius} ${start.row}
      a ${radius},${radius} 0 1,0 ${radius * 2},0
      a ${radius},${radius} 0 1,0 -${radius * 2},0
    `
    }

    const angle = Math.atan2(dy, dx)
    const offsetX = (radius * dy) / len
    const offsetY = (-radius * dx) / len

    // Define 4 points around the capsule line
    const p1 = { x: start.col + offsetX, y: start.row + offsetY }
    const p2 = { x: end.col + offsetX, y: end.row + offsetY }
    const p3 = { x: end.col - offsetX, y: end.row - offsetY }
    const p4 = { x: start.col - offsetX, y: start.row - offsetY }

    // Use arcs for rounded ends
    return `
    M ${p1.x} ${p1.y}
    L ${p2.x} ${p2.y}
    A ${radius} ${radius} ${angle} 0 1 ${p3.x} ${p3.y}
    L ${p4.x} ${p4.y}
    A ${radius} ${radius} ${angle} 0 1 ${p1.x} ${p1.y}
    Z
  `
  }

  return (
    <div
      ref={gridRef}
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
      <svg className={styles['selection-overlay']}>
        {selectedCells.length && cellSize && (
          <path
            d={capsulePath(
              cellToGridPixelPos(selectedCells[0], cellSize),
              cellToGridPixelPos(
                selectedCells[selectedCells.length - 1],
                cellSize
              ),
              cellSize / 2
            )}
            fill='rgb(from var(--accent) r g b / 0.3)'
            stroke='rgb(from var(--accent) r g b / 0.8)'
            strokeWidth='0'
          />
        )}
        {found.length &&
          cellSize &&
          found.map((f, idx) => (
            <path
              key={idx}
              d={capsulePath(
                cellToGridPixelPos(f.cells[0], cellSize),
                cellToGridPixelPos(f.cells[f.cells.length - 1], cellSize),
                cellSize / 2
              )}
              fill='rgba(0,200,0,0.5)'
              stroke='green'
              strokeWidth={0}
            />
          ))}
      </svg>
    </div>
  )
}
