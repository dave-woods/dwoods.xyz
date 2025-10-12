import Button from '@/components/Button'
import styles from './wordsearch.module.css'

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
  const frequencies = found.reduce<Record<string, number>>((acc, cur) => {
    acc[cur] = acc[cur] ? acc[cur] + 1 : 1
    return acc
  }, {})

  return updateable ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gridColumn: '1 / -1',
        gap: '1rem'
      }}
    >
      <textarea
        style={{
          width: '100%',
          maxWidth: '40vw',
          minHeight: '250px',
          height: '100%',
          background: 'var(--bg)',
          color: 'var(--fg)',
          lineHeight: 2,
          padding: '0.5rem 1rem',
          fontFamily: 'inherit',
          fontSize: '1rem',
          resize: 'none',
          border: 'none',
          borderRadius: '5px'
        }}
        name={'wordlist-textarea'}
        defaultValue={wordlist.join('\n')}
      ></textarea>
      <Button
        onClick={() => {
          const newWordlist = document
            .getElementsByTagName('textarea')[0]
            .value.split(/\s+/)
          updateWordlist(newWordlist)
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
