import styles from './wordsearch.module.css'

export function WordsearchWordlist({
  wordlist,
  found
}: {
  wordlist: string[]
  found: string[]
}) {
  const frequencies = found.reduce<Record<string, number>>((acc, cur) => {
    acc[cur] = acc[cur] ? acc[cur] + 1 : 1
    return acc
  }, {})

  return (
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
