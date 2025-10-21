const WORDS_URL =
  'https://raw.githubusercontent.com/first20hours/google-10000-english/master/20k.txt'
const FILTER_WORDS_URL =
  'https://raw.githubusercontent.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words/refs/heads/master/en'

let cachedWords: string[] = []

export async function getExternalWordList(): Promise<string[]> {
  if (!cachedWords.length) {
    try {
      const [resWords, resFilter] = await Promise.all([
        fetch(WORDS_URL),
        fetch(FILTER_WORDS_URL)
      ])
      if (!resWords.ok || !resFilter.ok) {
        throw new Error(
          `Failed to fetch remote word lists, using fallback: ${
            !resWords.ok
              ? resWords.statusText
              : !resFilter.ok
              ? resFilter.statusText
              : ''
          }`
        )
      }
      const [text, filterText] = await Promise.all([
        resWords.text(),
        resFilter.text()
      ])
      const filterSet = new Set(filterText.split('\n').map((w) => w.trim()))
      cachedWords = text
        .split('\n')
        .slice(0, 10000)
        .map((w) => w.trim())
        .filter((w) => w.length >= 3 && !filterSet.has(w))
    } catch (err) {
      console.error(err)
      return []
    }
  }
  return cachedWords
}

export async function getRandomWords(
  count: number,
  minLength: number,
  maxLength: number
) {
  'use server'
  const words = await getExternalWordList()

  const filtered = words.filter(
    (w) => w.length >= minLength && w.length <= maxLength
  )

  // Shuffle & pick
  const shuffled = filtered.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
