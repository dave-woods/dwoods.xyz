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
          <Card.Title>Wordsearch</Card.Title>
          <Card.Content>
            {
              "Here's a basic wordsearch generator, where you can edit and set your own words to find within the grid. Still a few tweaks I'd like to make, but have a go!"
            }
          </Card.Content>
          <Card.Buttons>
            <Button href='/projects/wordsearch' level={2}>
              Wordsearch
            </Button>
          </Card.Buttons>
        </Card>
        <Card>
          <Card.Title>YouTube Searcher</Card.Title>
          <Card.Content>
            {`This is a Linux tool which lets a user view their YouTube feeds from their desktop or terminal, using Rofi and youtube-dlp.`}{' '}
          </Card.Content>
          <Card.Buttons>
            <Button
              href={'https://github.com/dave-woods/yt-search-play'}
              level={3}
            >
              <img src='/icons/github-mark.svg' /> View on Github
            </Button>
          </Card.Buttons>
        </Card>
      </div>
    </main>
  )
}
