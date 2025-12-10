import type { Metadata } from 'next'
import './globals.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { merriweatherSans } from '@/utils/fonts'
import UnderConstruction from '@/components/UnderConstruction'

export const metadata: Metadata = {
  title: 'David Woods',
  description: 'Personal website of David Woods.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={merriweatherSans.className}>
      <body>
        <UnderConstruction />
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  )
}
