import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { Header, Footer } from '@/components/shell'

export const metadata: Metadata = {
  title: 'Storion',
  description: 'A global marketplace connecting stories with opportunities, with African storytelling at its heart.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body><a className="skip-link" href="#content">Skip to content</a><Header/><div id="content">{children}</div><Footer/></body>
    </html>
  )
}

