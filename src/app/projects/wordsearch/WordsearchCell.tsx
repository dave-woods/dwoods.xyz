import styles from './wordsearch.module.css'

import { WordsearchCellProps } from './types'

export function WordsearchCell({
  cell,
  cellState = 'default',
  handleWordSelectStart,
  handleWordSelectContinue,
  handleWordSelectEnd
}: WordsearchCellProps) {
  return (
    <div
      draggable={false}
      onMouseDown={() => handleWordSelectStart(cell)}
      onMouseEnter={() => handleWordSelectContinue(cell)}
      onMouseUp={handleWordSelectEnd}
      className={`${styles.cell} ${styles[cellState]}`}
    >
      {cell.letter}
    </div>
  )
}
