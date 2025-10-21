import styles from './wordsearch.module.css'

import { WordsearchCellProps } from './types'
import { useState } from 'react'

export function WordsearchCell({
  cell,
  cellState = 'default',
  handleWordSelectStart,
  handleWordSelectContinue,
  handleWordSelectEnd
}: WordsearchCellProps) {
  const [showPopout, setShowPopout] = useState(false)
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
      onPointerEnter={(e) => {
        if (e.pointerType === 'touch') {
          setShowPopout(true)
        }
        handleWordSelectContinue(cell)
      }}
      onPointerLeave={(e) => {
        setShowPopout(false)
      }}
      onPointerUp={() => {
        setShowPopout(false)
        handleWordSelectEnd()
      }}
      className={`${styles.cell} ${styles[cellState]}`}
    >
      {showPopout && <span className={styles.popout}>{cell.letter}</span>}
      <span className={styles.content}>{cell.letter}</span>
    </div>
  )
}
