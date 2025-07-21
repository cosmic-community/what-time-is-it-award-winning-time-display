import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '⏰ What Time Is It?',
  description: 'An award-winning time display that creates a unique visual experience every visit',
  keywords: ['time', 'clock', 'design', 'award-winning', 'visual', 'dynamic'],
  authors: [{ name: 'Built with Cosmic' }],
  openGraph: {
    title: '⏰ What Time Is It?',
    description: 'An award-winning time display that creates a unique visual experience every visit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '⏰ What Time Is It?',
    description: 'An award-winning time display that creates a unique visual experience every visit',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}