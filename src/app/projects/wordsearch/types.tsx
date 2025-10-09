export type Cell = { row: number; col: number; letter: string }
export type CellState = 'default' | 'selected' | 'found'
export type Word = { word: string; cells: Cell[] }
export type WordsearchCellProps = {
  cell: Cell
  cellState: CellState
  handleWordSelectStart: (cell: Cell) => void
  handleWordSelectContinue: (cell: Cell) => void
  handleWordSelectEnd: () => void
}
export type WordsearchGridProps = {
  grid: string[][]
  found: Word[]
  onWordFind: (cells: Cell[]) => boolean
}
