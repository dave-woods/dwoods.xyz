'use server'

import { getBaseURL } from '@/utils/lib'
import Wordsearch from './Wordsearch'

const fillRemainingCells = (grid: string[][]) => {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid.length; c++) {
      if (grid[r][c] === '?') {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)]
      }
    }
  }
  return grid
}

function canPlaceWord(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: 'H' | 'V',
  diagonal: boolean
) {
  if (direction === 'H') {
    if (col + word.length > grid.length) return false
    if (diagonal && row + word.length > grid.length) return false
    for (let i = 0; i < word.length; i++) {
      if (
        diagonal &&
        grid[row + i][col + i] !== '?' &&
        grid[row + i][col + i] !== word[i]
      )
        return false
      if (grid[row][col + i] !== '?' && grid[row][col + i] !== word[i])
        return false
    }
  } else {
    if (row + word.length > grid.length) return false
    if (diagonal && col - word.length < 0) return false
    for (let i = 0; i < word.length; i++) {
      if (
        diagonal &&
        grid[row + i][col - i] !== '?' &&
        grid[row + i][col - i] !== word[i]
      )
        return false
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
    const diagonal = Math.random() < 0.5
    const row = Math.floor(
      Math.random() *
        (grid.length - (direction === 'V' ? wordToPlace.length : 0))
    )
    const col = Math.floor(
      Math.random() *
        (grid.length - (direction === 'H' ? wordToPlace.length : 0))
    )
    if (canPlaceWord(grid, wordToPlace, row, col, direction, diagonal)) {
      for (let i = 0; i < wordToPlace.length; i++) {
        if (direction === 'H') {
          if (diagonal) {
            // diagonal H -> \
            grid[row + i][col + i] = wordToPlace[i]
          } else {
            grid[row][col + i] = wordToPlace[i]
          }
        } else {
          if (diagonal) {
            // diagonal V -> /
            grid[row + i][col - i] = wordToPlace[i]
          } else {
            grid[row + i][col] = wordToPlace[i]
          }
        }
      }
      placed = true
    }
  }
  return placed
}

async function generateGrid(wordlist: string[], size: number) {
  'use server'
  const newGrid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => '?')
  )
  for (const word of wordlist.toSorted((a, b) => b.length - a.length)) {
    placeWord(newGrid, word)
  }
  fillRemainingCells(newGrid)
  return newGrid
}

import { GET as getWordsAPI } from '@/app/api/words/route'
import { NextRequest } from 'next/server'

async function getRandomWords(
  count: number,
  minLength: number,
  maxLength: number
) {
  'use server'
  console.log(
    'fetching from:',
    `${getBaseURL()}/api/words?count=${count}&min=${minLength}&max=${maxLength}`
  )
  // const res = await fetch(`${getBaseURL()}/api/words?count=${count}&min=${minLength}&max=${maxLength}`)
  const res = await getWordsAPI(
    new NextRequest(
      `${getBaseURL()}/api/words?count=${count}&min=${minLength}&max=${maxLength}`
    )
  )
  const data = await res.json()
  return data.words
}

export default async function WordsearchPage() {
  const fallbackWords = [
    'example',
    'fallback',
    'elements',
    'testing',
    'wordsearch',
    'puzzle',
    'creation',
    'react',
    'typescript',
    'javascript',
    'project',
    'develop',
    'frontend',
    'backend',
    'fullstack'
  ]
  const initialWordlist = [...(await getRandomWords(15, 4, 10))]
  const initialGridSize = 15
  const initialGrid = await generateGrid(initialWordlist, initialGridSize)

  return (
    <Wordsearch
      initialGrid={initialGrid}
      initialWordlist={
        initialWordlist.length > 0 ? initialWordlist : fallbackWords
      }
      regenerate={generateGrid}
      randomWords={getRandomWords}
    />
  )
}
