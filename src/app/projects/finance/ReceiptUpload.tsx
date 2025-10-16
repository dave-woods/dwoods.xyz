import { useEffect, useState } from 'react'
import Tesseract from 'tesseract.js'

function ImageUploader() {
  const [image, setImage] = useState<string | null>(null)
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const i = e.target.files?.[0]
    setImage(i ? URL.createObjectURL(i) : '')
  }

  return (
    <div>
      <input
        name='imageInput'
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
      />
      {image && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            position: 'relative',
            height: '400px'
          }}
        >
          <img
            src={image}
            alt='Uploaded image'
            style={{ objectFit: 'contain', maxWidth: '100%' }}
          />
          <TextRecogniser image={image} />
        </div>
      )}
    </div>
  )
}

function parseReceipt(lines: string[]) {
  const receipt: {
    merchant: string | null
    date: string | null
    items: { name: string; price: number }[]
    total: number | null
  } = {
    merchant: null,
    date: null,
    items: [],
    total: null
  }

  const dateRegex = /\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b/
  const priceRegex = /(\d+\.\d{2})$/i

  // Assume first line(s) before date = merchant name
  for (let i = 0; i < lines.length; i++) {
    if (dateRegex.test(lines[i])) {
      receipt.date = lines[i].match(dateRegex)?.[0] ?? ''
      receipt.merchant = lines.slice(0, i).join(' ')
      break
    }
  }

  // Find line items
  lines.forEach((line) => {
    if (priceRegex.test(line) && !/total/i.test(line)) {
      const m = line.match(priceRegex)
      if (m) {
        const [, price] = m
        const name = line.replace(priceRegex, '').trim()
        receipt.items.push({ name, price: parseFloat(price) })
      }
    }
  })

  // Find total
  const totalLine = lines.find((l) => /total/i.test(l))
  if (totalLine && priceRegex.test(totalLine)) {
    const m = totalLine.match(priceRegex)
    if (m) {
      const [, total] = m
      receipt.total = parseFloat(total)
    }
  }

  return receipt
}

function TextRecogniser({ image }: { image: string }) {
  const [text, setText] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function recogniseText(imageData: string) {
      if (imageData) {
        setLoading(true)
        const result = await Tesseract.recognize(imageData)
        const lines = result.data.text
          .split('\n')
          .map((l) => l.trim())
          .filter((l) => l.length > 0)
        console.log(lines)
        console.log(parseReceipt(lines))
        setText(lines)
        setLoading(false)
      }
    }
    recogniseText(image)
  }, [image])
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div
      style={{
        overflowY: 'auto',
        paddingInline: '1rem',
        background: 'var(--bg)'
      }}
    >
      {text.map((line, idx) => (
        <p key={`ocr-line-${idx}`}>{line}</p>
      ))}
    </div>
  )
}

export default function ReceiptUpload() {
  return (
    <div>
      <ImageUploader />
    </div>
  )
}
