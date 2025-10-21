const WORDS_URL =
  'https://raw.githubusercontent.com/first20hours/google-10000-english/master/20k.txt'

let cachedWords: string[] = []

export async function getExternalWordList(): Promise<string[]> {
  if (!cachedWords.length) {
    const res = await fetch(WORDS_URL)
    if (!res.ok) {
      console.error('Failed to fetch remote word list, using fallback:', {
        err: res.statusText
      })
      return []
    }
    const text = await res.text()
    cachedWords = text
      .split('\n')
      .slice(0, 10000)
      .map((w) => w.trim())
      .filter((w) => w.length >= 3)
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
