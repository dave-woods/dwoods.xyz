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
      onMouseUp={handleWordSelectEnd}
      className={`${styles.cell} ${styles[cellState]}`}
    >
      <span
        style={{
          minWidth: '70%',
          textAlign: 'center'
        }}
        onMouseEnter={() => handleWordSelectContinue(cell)}
      >
        {cell.letter}
      </span>
    </div>
  )
}
