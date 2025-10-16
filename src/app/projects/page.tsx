'use client'

import Button from '@/components/Button'
import Card from '@/components/Card'

export default function Projects() {
  return (
    <main>
      <h1>Projects</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: '1rem'
        }}
      >
        <Card>
          <h3>Wordsearch</h3>
          <p>
            {
              "Here's a basic wordsearch generator, where you can edit and set your own words to find within the grid. Still a few tweaks I'd like to make, but have a go!"
            }
          </p>
          <Button href='/projects/wordsearch' level={2}>
            Wordsearch
          </Button>
        </Card>
        <Card>
          <h3>YouTube Searcher</h3>
          <p>
            {`This is a Linux tool which lets a user view their YouTube feeds from their desktop or terminal, using Rofi and youtube-dlp.`}{' '}
          </p>
          <Button
            href={'https://github.com/dave-woods/yt-search-play'}
            level={3}
          >
            <img src='/icons/github-mark.svg' /> View on Github
          </Button>
        </Card>
      </div>
    </main>
  )
}
