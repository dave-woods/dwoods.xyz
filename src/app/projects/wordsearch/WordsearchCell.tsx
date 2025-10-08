import styles from './wordsearch.module.css'

import { WordsearchCellProps } from './types'

export function WordsearchCell({
  children,
  cell,
  cellState = 'default',
  handleWordSelectStart,
  handleWordSelectContinue,
  handleWordSelectEnd
}: WordsearchCellProps) {
  return (
    <div
      draggable={false}
      onMouseDown={(e) => handleWordSelectStart(e, cell, children?.toString())}
      onMouseEnter={(e) =>
        handleWordSelectContinue(e, cell, children?.toString())
      }
      onMouseUp={handleWordSelectEnd}
      className={`${styles.cell} ${styles[cellState]}`}
    >
      {children}
    </div>
  )
}
