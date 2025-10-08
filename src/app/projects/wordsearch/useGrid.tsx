import { useCallback, useEffect, useState } from 'react'

function canPlaceWord(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: 'H' | 'V'
) {
  if (direction === 'H') {
    if (col + word.length > grid.length) return false
    for (let i = 0; i < word.length; i++) {
      if (grid[row][col + i] !== '?' && grid[row][col + i] !== word[i])
        return false
    }
  } else {
    if (row + word.length > grid.length) return false
    for (let i = 0; i < word.length; i++) {
      if (grid[row + i][col] !== '?' && grid[row + i][col] !== word[i])
        return false
    }
  }
  return true
}

function placeWord(grid: string[][], word: string) {
  let placed = false
  const maxAttempts = grid.length * grid.length
  let attempts = 0
  while (!placed && attempts < maxAttempts) {
    attempts++

    const wordToPlace =
      Math.random() < 0.33 ? word.split('').toReversed().join('') : word
    const direction = Math.random() < 0.5 ? 'H' : 'V'
    const row = Math.floor(Math.random() * grid.length)
    const col = Math.floor(Math.random() * grid.length)
    if (canPlaceWord(grid, wordToPlace, row, col, direction)) {
      for (let i = 0; i < wordToPlace.length; i++) {
        if (direction === 'H') {
          grid[row][col + i] = wordToPlace[i]
        } else {
          grid[row + i][col] = wordToPlace[i]
        }
      }
      placed = true
    }
  }
  return placed
}

function fillRemainingCells(grid: string[][]) {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid.length; c++) {
      if (grid[r][c] === '?') {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)]
      }
    }
  }
}

export function useGrid(size: number, wordlist: string[]) {
  console.log('useGrid called with size:', size, 'and wordlist:', wordlist)
  const generateGrid = useCallback(() => {
    const newGrid = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => '?')
    )
    for (const word of wordlist.toSorted((a, b) => b.length - a.length)) {
      console.log('Placing word:', word)
      placeWord(newGrid, word)
    }
    fillRemainingCells(newGrid)
    return newGrid
  }, [size, wordlist])

  const [grid, setGrid] = useState<string[][]>(() => generateGrid())
  // useEffect(() => {
  //   setGrid(generateGrid())
  // }, [size, wordlist])
  const regenerateGrid = () => setGrid(generateGrid())

  return { grid, setGrid, regenerateGrid }
}
