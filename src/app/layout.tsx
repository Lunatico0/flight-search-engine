import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Flight Search Engine',
    template: '%s · Flight Search Engine',
  },
  description:
    'Search, filter and analyze flight prices with a modern, responsive flight search engine.',
  keywords: [
    'flight search',
    'flight prices',
    'airlines',
    'travel',
    'flight comparison',
  ],
  authors: [{ name: 'Patricio Pittana' }],
  creator: 'Patricio Pittana',

  metadataBase: new URL('https://flightsearch-challenge.vercel.app/'),

  openGraph: {
    title: 'Flight Search Engine',
    description:
      'Search, filter and analyze flight prices across airlines.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Flight Search Engine',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Flight Search Engine',
    description:
      'Search, filter and analyze flight prices across airlines.',
  },

  icons: {
    icon: '/AirPlane.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-text`}
      >
        {children}
      </body>
    </html>
  )
}
