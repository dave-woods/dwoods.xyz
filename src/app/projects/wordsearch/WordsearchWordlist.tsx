import styles from './wordsearch.module.css'

export function WordsearchWordlist({
  wordlist,
  found
}: {
  wordlist: string[]
  found: string[]
}) {
  return (
    <ul className={styles.wordlist}>
      {wordlist.map((word) => (
        <li
          key={word}
          className={`${styles.word} ${
            found.includes(word) ? styles.found : ''
          }`}
        >
          {word}
        </li>
      ))}
    </ul>
  )
}
