import Button from '@/components/Button'
import styles from './wordsearch.module.css'
import { useState } from 'react'

export function WordsearchWordlist({
  updateable,
  updateWordlist,
  wordlist,
  found
}: {
  updateable: boolean
  updateWordlist: (newWordlist: string[]) => void
  wordlist: string[]
  found: string[]
}) {
  const [textareaContent, setTextareaContent] = useState(wordlist.join('\n'))
  const frequencies = found.reduce<Record<string, number>>((acc, cur) => {
    acc[cur] = acc[cur] ? acc[cur] + 1 : 1
    return acc
  }, {})

  return updateable ? (
    <div className={styles['update-words']}>
      <textarea
        name={'wordlist-textarea'}
        value={textareaContent}
        onChange={(e) => {
          e.preventDefault()
          if (e.target.value.match(/^[a-zA-Z\s]*$/)) {
            setTextareaContent(e.target.value.toLowerCase())
          }
        }}
      ></textarea>
      <Button
        onClick={() => {
          const newWordlist = textareaContent
            .split(/\s+/)
            .filter((w) => w.length > 1)
          if (newWordlist.length > 0) {
            updateWordlist(newWordlist)
          }
        }}
        level={3}
      >
        Update
      </Button>
    </div>
  ) : (
    <ul className={styles.wordlist}>
      {wordlist.map((word, idx) => {
        const markFound = frequencies[word] && frequencies[word] > 0
        if (markFound) frequencies[word] -= 1
        return (
          <li
            key={`wordlist-${idx}-${word}`}
            className={`${styles.word} ${markFound ? styles.found : ''}`}
          >
            {word}
          </li>
        )
      })}
    </ul>
  )
}
