import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Chineze Ononye | Teacher · Mentor · Motivational Speaker',
  description: 'Empowering individuals and organizations to discover their purpose, unlock their potential, and live with intention.',
  keywords: ['Chineze Ononye', 'motivational speaker', 'mentor', 'teacher', 'Nigeria', 'education'],
  openGraph: {
    title: 'Chineze Ononye',
    description: 'Teacher · Mentor · Motivational Speaker',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#FEFCF7',
              border: '1px solid #C9A227',
              borderRadius: '8px',
            },
          }}
        />
      </body>
    </html>
  )
}
