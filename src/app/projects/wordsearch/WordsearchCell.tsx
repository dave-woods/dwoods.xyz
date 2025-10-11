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
      onPointerDown={() => handleWordSelectStart(cell)}
      onPointerUp={handleWordSelectEnd}
      onPointerEnter={() => handleWordSelectContinue(cell)}
      className={`${styles.cell} ${styles[cellState]}`}
    >
      <span>{cell.letter}</span>
    </div>
  )
}
