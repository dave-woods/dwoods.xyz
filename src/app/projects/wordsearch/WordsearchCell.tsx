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
      style={{
        touchAction: 'none'
      }}
      onPointerDown={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId)
        }
        handleWordSelectStart(cell)
      }}
      onPointerEnter={() => handleWordSelectContinue(cell)}
      onPointerUp={handleWordSelectEnd}
      className={`${styles.cell} ${styles[cellState]}`}
    >
      <span>{cell.letter}</span>
    </div>
  )
}
