import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

const WORDS_URL =
  'https://raw.githubusercontent.com/first20hours/google-10000-english/master/20k.txt'

let cachedWords: string[] = []

async function getWordList(): Promise<string[]> {
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const count = parseInt(searchParams.get('count') ?? '10') || 10
  const minLength = parseInt(searchParams.get('min') ?? '3') || 3
  const maxLength = parseInt(searchParams.get('max') ?? '15') || 15

  const words = await getWordList()

  const filtered = words.filter(
    (w) => w.length >= minLength && w.length <= maxLength
  )

  // Shuffle & pick
  const shuffled = filtered.sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, count)

  return NextResponse.json({ words: selected })
}
