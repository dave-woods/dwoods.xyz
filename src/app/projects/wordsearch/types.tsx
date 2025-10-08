export type Cell = { row: number; col: number }
export type CellState = 'default' | 'selected' | 'found'
export type WordsearchCellProps = {
  children: React.ReactNode
  cell: Cell
  cellState: CellState
  handleWordSelectStart: (
    e: React.MouseEvent,
    cell: Cell,
    letter?: string
  ) => void
  handleWordSelectContinue: (
    e: React.MouseEvent,
    cell: Cell,
    letter?: string
  ) => void
  handleWordSelectEnd: (e: React.MouseEvent) => void
}
