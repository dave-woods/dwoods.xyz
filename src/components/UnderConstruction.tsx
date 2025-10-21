'use client'

import { useState } from 'react'

export default function UnderConstruction() {
  const [hide, setHide] = useState(false)
  return (
    !hide && (
      <div
        title='Click or tap to dismiss'
        onClick={() => setHide(true)}
        className='under-construction'
      >
        {'This site is currently under reconstruction. Sorry for the mess!'}
      </div>
    )
  )
}
